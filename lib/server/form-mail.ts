import "server-only";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, rfqSchema, aogSchema, careersSchema, MAX_UPLOAD_BYTES } from "@/lib/validation/schemas";
import { generateReference } from "@/lib/utils";

type FormKind = "contact" | "rfq" | "aog" | "careers";
const schemas = { contact: contactSchema, rfq: rfqSchema, aog: aogSchema, careers: careersSchema };
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

function formatFields(data: Record<string, unknown>): string[] {
  return Object.entries(data).flatMap(([key, value]) => {
    if (key === "website" || value === undefined || value === "") return [];
    const label = key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase());
    if (typeof value === "string") return [`${label}: ${value}`];
    if (value && typeof value === "object") return ["", `${label}:`, ...formatFields(value as Record<string, unknown>)];
    return [];
  });
}

/** Shared validation, attachment handling and SMTP delivery for every website form. */
export async function submitForm(request: Request, kind: FormKind) {
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
      const fields: Record<string, unknown> = Object.fromEntries(form.entries());
      if (kind === "rfq") {
        const details = form.get("detailsJson");
        if (details !== null && typeof details !== "string") return invalid();
        fields.details = details ? JSON.parse(details) : {};
      }
      payload = fields;
      const file = form.get(kind === "careers" ? "cv" : "attachment");
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

  const parsed = schemas[kind].safeParse(payload);
  if (!parsed.success) return invalid();
  const data: Record<string, unknown> = parsed.data;
  const name = String(data.name ?? data.contactName);
  const email = String(data.email);
  const isAog = kind === "aog" || (kind === "contact" && data.inquiryType === "AOG");
  const reference = kind === "aog" || kind === "rfq" ? generateReference(kind === "aog" ? "AOG" : "RFQ") : undefined;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  const port = Number(SMTP_PORT);
  const missing = Object.entries({ SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL })
    .filter(([, value]) => !value?.trim()).map(([key]) => key);
  if (!Number.isInteger(port) || port < 1 || port > 65535) missing.push("SMTP_PORT (invalid)");
  if (SMTP_SECURE !== "true" && SMTP_SECURE !== "false") missing.push("SMTP_SECURE (invalid)");
  if (missing.length) {
    // Names only: never print environment values or credentials.
    console.error(`Form mail: missing or invalid SMTP configuration: ${missing.join(", ")}`);
    return failed();
  }

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
        from: { name: "Website Contact Form", address: SMTP_USER! },
        to: CONTACT_TO_EMAIL,
        replyTo: { address: email },
        subject: isAog ? "AOG Enquiry" : `New website enquiry from ${name.replace(/[\r\n]+/g, " ")}`,
        text: [
          `New ${kind} form submission`,
          ...(reference ? [`Reference: ${reference}`] : []),
          "", ...formatFields(data),
        ].join("\n"),
        attachments: attachment ? [{
          filename: attachment.name.split(/[\\/]/).pop()?.replace(/[\r\n]/g, "") || "attachment",
          content: Buffer.from(await attachment.arrayBuffer()),
          contentType: attachment.type || "application/octet-stream",
        }] : [],
      });
      if (!result.accepted.length || result.rejected.length) {
        console.error("Form mail: SMTP did not accept all configured recipients.");
        return failed();
      }
      return NextResponse.json({ success: true, message: "Message sent successfully", ...(reference ? { reference } : {}) });
    } finally {
      transporter.close();
    }
  } catch {
    console.error("Form mail: SMTP delivery failed.");
    return failed();
  }
}
