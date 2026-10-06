import { NextResponse } from "next/server";
import { rfqSchema } from "@/lib/validation/schemas";
import { storeUpload, deliverRecord, isSpam, type SubmissionRecord } from "@/lib/server/submissions";
import { generateReference } from "@/lib/utils";

export const runtime = "nodejs";

/** RFQ submission endpoint (spec §33, §54). */
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    if (isSpam(form)) {
      // Silently accept to avoid tipping off bots.
      return NextResponse.json({ reference: generateReference("RFQ") });
    }

    let details: Record<string, string> = {};
    const detailsJson = form.get("detailsJson");
    if (typeof detailsJson === "string") {
      try {
        details = JSON.parse(detailsJson);
      } catch {
        details = {};
      }
    }

    const payload = {
      rfqType: form.get("rfqType"),
      company: form.get("company"),
      contactName: form.get("contactName"),
      email: form.get("email"),
      phone: form.get("phone") ?? "",
      notes: form.get("notes") ?? "",
      details,
    };

    const parsed = rfqSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const upload = await storeUpload(form.get("attachment") as File | null);
    if (!upload.ok) {
      return NextResponse.json({ error: upload.error }, { status: 400 });
    }

    const reference = generateReference("RFQ");
    const record: SubmissionRecord = {
      reference,
      kind: "rfq",
      priority: "NORMAL",
      status: "NEW",
      submittedAt: new Date().toISOString(),
      data: parsed.data,
      attachment: upload.file,
    };

    await deliverRecord(record);
    return NextResponse.json({ reference });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
