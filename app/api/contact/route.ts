import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, MAX_UPLOAD_BYTES } from "@/lib/validation/schemas";

export const runtime = "nodejs";

const invalid = () => NextResponse.json(
  { success: false, message: "Invalid form data" }, { status: 400 },
);
const failed = () => NextResponse.json(
  { success: false, message: "Unable to send message" }, { status: 500 },
);

const attachmentTypes: Record<string, readonly string[]> = {
  pdf: ["application/pdf"],
  xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  xls: ["application/vnd.ms-excel"],
  csv: ["text/csv", "application/csv", "application/vnd.ms-excel", "text/plain"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  txt: ["text/plain"],
};

// Bound actual streamed bytes rather than trusting Content-Length.
async function readBody(request: Request, limit: number) {
  if (!request.body) throw new Error("Missing body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks);
}

export async function POST(request: Request) {
  let payload: unknown;
  let attachment: File | null = null;
  try {
    const contentType = request.headers.get("content-type") ?? "";
    const mediaType = contentType.split(";")[0].trim().toLowerCase();
    if (mediaType === "application/json") {
      payload = JSON.parse((await readBody(request, 64 * 1024)).toString("utf8"));
    } else if (mediaType === "multipart/form-data") {
      const body = await readBody(request, MAX_UPLOAD_BYTES + 64 * 1024);
      const form = await new Response(body, { headers: { "content-type": contentType } }).formData();
      payload = Object.fromEntries(form.entries());
      const file = form.get("attachment");
      if (file !== null && !(file instanceof File)) return invalid();
      attachment = file && file.size > 0 ? file : null;
      if (attachment) {
        const ext = attachment.name.split(".").pop()?.toLowerCase() ?? "";
        const mimeTypes = Object.hasOwn(attachmentTypes, ext) ? attachmentTypes[ext] : undefined;
        if (attachment.size > MAX_UPLOAD_BYTES || !mimeTypes ||
            (attachment.type && !mimeTypes.includes(attachment.type))) return invalid();
      }
    } else {
      return invalid();
    }
  } catch {
    return invalid();
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return invalid();

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  const port = Number(SMTP_PORT);
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL ||
      !Number.isInteger(port) || port < 1 || port > 65535 ||
      (SMTP_SECURE !== "true" && SMTP_SECURE !== "false")) {
    console.error("Contact mail: missing or invalid SMTP environment configuration.");
    return failed();
  }

  const { name, email, message, company, phone, subject, inquiryType } = parsed.data;
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: SMTP_SECURE === "true",
      requireTLS: SMTP_SECURE === "false",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    try {
      const result = await transporter.sendMail({
        from: { name: "Website Contact Form", address: SMTP_USER },
        to: CONTACT_TO_EMAIL,
        replyTo: { address: email },
        subject: `New website enquiry from ${name.replace(/[\r\n]+/g, " ")}`,
        text: [
          "New contact form submission", "", `Name: ${name}`, `Email: ${email}`,
          ...(company ? [`Company: ${company}`] : []),
          ...(phone ? [`Phone: ${phone}`] : []),
          ...(subject ? [`Subject: ${subject}`] : []),
          ...(inquiryType ? [`Inquiry type: ${inquiryType}`] : []),
          "", "Message:", message,
        ].join("\n"),
        attachments: attachment ? [{
          filename: attachment.name.split(/[\\/]/).pop()?.replace(/[\r\n]/g, "") || "attachment",
          content: Buffer.from(await attachment.arrayBuffer()),
          contentType: attachment.type || "application/octet-stream",
        }] : [],
      });
      if (!result.accepted.length || result.rejected.length) {
        console.error("Contact mail: SMTP did not accept all configured recipients.");
        return failed();
      }
      return NextResponse.json({ success: true, message: "Message sent successfully" });
    } finally {
      transporter.close();
    }
  } catch {
    // Never log raw SMTP responses, credentials, or the visitor's message.
    console.error("Contact mail: SMTP delivery failed.");
    return failed();
  }
}
