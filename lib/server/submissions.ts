import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ALLOWED_UPLOAD_EXTENSIONS, MAX_UPLOAD_BYTES } from "@/lib/validation/schemas";

/**
 * Server-side submission handling (spec §54, §55, §56).
 *
 * This is a future-proof structure even though the first deployment simply logs
 * the structured record. To go live, wire `deliverRecord` to email/CRM/Slack/
 * SMS as approved by the client — the record shape stays the same.
 *
 * File uploads are validated (extension, MIME, size), given a safe generated
 * filename, and written to a PRIVATE, gitignored `uploads/` directory. Original
 * filenames/paths are never trusted, and uploads are never exposed publicly
 * (serve later via signed URLs / private storage per spec §56).
 */

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

/** Allowed MIME types mapped to the permitted extensions (spec §56). */
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "application/vnd.ms-excel", // xls
  "text/csv",
  "application/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "text/plain", // txt
]);

export type StoredFile = {
  originalName: string;
  storedName: string;
  size: number;
  mimeType: string;
};

export type UploadResult =
  | { ok: true; file: StoredFile | null }
  | { ok: false; error: string };

/** Validate and store a single uploaded file. Returns null when no file given. */
export async function storeUpload(file: File | null): Promise<UploadResult> {
  if (!file || file.size === 0) return { ok: true, file: null };

  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "File exceeds the maximum allowed size." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_UPLOAD_EXTENSIONS.includes(ext as (typeof ALLOWED_UPLOAD_EXTENSIONS)[number])) {
    return { ok: false, error: "File type is not permitted." };
  }

  // MIME check (best-effort; some browsers send empty type for csv/txt).
  if (file.type && !ALLOWED_MIME.has(file.type)) {
    return { ok: false, error: "File MIME type is not permitted." };
  }

  // Generate a safe, non-guessable storage filename — never trust the original.
  const storedName = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, storedName), buffer);

  return {
    ok: true,
    file: {
      originalName: path.basename(file.name),
      storedName,
      size: file.size,
      mimeType: file.type || "application/octet-stream",
    },
  };
}

export type SubmissionRecord = {
  reference: string;
  kind: "rfq" | "aog" | "contact" | "careers";
  priority?: "AOG" | "NORMAL";
  status: string;
  submittedAt: string;
  data: Record<string, unknown>;
  attachment: StoredFile | null;
};

/**
 * Deliver / persist a submission record. Currently logs a structured record and
 * appends it to a private, gitignored JSONL file for local review. Replace with
 * the client-approved email/CRM integration before launch.
 */
export async function deliverRecord(record: SubmissionRecord): Promise<void> {
  // Never log raw file contents — only metadata.
  console.info("[submission]", JSON.stringify(record));

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.appendFile(
      path.join(UPLOAD_DIR, "submissions.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8",
    );
  } catch {
    // Non-fatal: delivery/logging fallback failure should not break the response.
  }
}

/** Basic honeypot check (spec §72 spam protection). */
export function isSpam(form: FormData): boolean {
  const hp = form.get("website");
  return typeof hp === "string" && hp.trim().length > 0;
}
