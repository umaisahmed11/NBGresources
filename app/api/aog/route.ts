import { NextResponse } from "next/server";
import { aogSchema } from "@/lib/validation/schemas";
import { storeUpload, deliverRecord, isSpam, type SubmissionRecord } from "@/lib/server/submissions";
import { generateReference } from "@/lib/utils";

export const runtime = "nodejs";

/** AOG submission endpoint (spec §32, §55). Marked as priority = AOG. */
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    if (isSpam(form)) {
      return NextResponse.json({ reference: generateReference("AOG") });
    }

    const payload = Object.fromEntries(
      Array.from(form.entries()).filter(([, v]) => typeof v === "string"),
    );

    const parsed = aogSchema.safeParse(payload);
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

    const reference = generateReference("AOG");
    const record: SubmissionRecord = {
      reference,
      kind: "aog",
      priority: "AOG",
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
