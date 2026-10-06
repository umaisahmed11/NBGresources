import { NextResponse } from "next/server";
import { careersSchema } from "@/lib/validation/schemas";
import { storeUpload, deliverRecord, isSpam, type SubmissionRecord } from "@/lib/server/submissions";
import { generateReference } from "@/lib/utils";

export const runtime = "nodejs";

/** Careers application endpoint (spec §34). */
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    if (isSpam(form)) {
      return NextResponse.json({ ok: true });
    }

    const payload = Object.fromEntries(
      Array.from(form.entries()).filter(([, v]) => typeof v === "string"),
    );

    const parsed = careersSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const upload = await storeUpload(form.get("cv") as File | null);
    if (!upload.ok) {
      return NextResponse.json({ error: upload.error }, { status: 400 });
    }

    const record: SubmissionRecord = {
      reference: generateReference("RFQ"),
      kind: "careers",
      priority: "NORMAL",
      status: "NEW",
      submittedAt: new Date().toISOString(),
      data: parsed.data,
      attachment: upload.file,
    };

    await deliverRecord(record);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
