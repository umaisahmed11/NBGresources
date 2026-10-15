"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, TextArea, Honeypot } from "./fields";
import { FileUpload } from "./FileUpload";
import { aogSchema } from "@/lib/validation/schemas";
import { ArrowUpRight } from "lucide-react";

type Errors = Partial<Record<string, string>>;

/**
 * AOG request form (spec §32).
 * Prioritized fields (Part Number, Company, Contact, Email/Phone, Quantity,
 * Delivery Location) are required; aircraft details may be left unknown.
 */
export function AOGForm() {
  const router = useRouter();
  const sending = useRef(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current || status === "submitting") return;
    const element = e.currentTarget;
    setStatus("submitting");
    setErrors({});

    const form = new FormData(element);
    const payload = Object.fromEntries(
      Array.from(form.entries()).filter(([, v]) => typeof v === "string"),
    );

    const parsed = aogSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    sending.current = true;
    try {
      const res = await fetch("/api/aog", { method: "POST", body: form });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { success?: boolean; reference?: string };
      if (data.success !== true || !data.reference) throw new Error("Request failed");
      router.push(`/thank-you?ref=${encodeURIComponent(data.reference)}&type=aog`);
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Honeypot />

      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-aog">
        Priority contact details
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Company" name="company" required error={errors.company} theme="dark" autoComplete="organization" />
        <TextField label="Contact Name" name="contactName" required error={errors.contactName} theme="dark" autoComplete="name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" name="email" type="email" required error={errors.email} theme="dark" autoComplete="email" />
        <TextField label="Phone / WhatsApp" name="phone" required error={errors.phone} theme="dark" autoComplete="tel" />
      </div>

      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-slate">
        Part &amp; delivery
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Part Number" name="partNumber" required error={errors.partNumber} theme="dark" />
        <TextField label="Quantity" name="quantity" required error={errors.quantity} theme="dark" />
      </div>
      <TextField label="Part Description" name="partDescription" optional theme="dark" />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Required Delivery Airport" name="deliveryAirport" required error={errors.deliveryAirport} theme="dark" />
        <TextField label="Required By" name="requiredBy" type="text" placeholder="e.g. ASAP / date / time" required error={errors.requiredBy} theme="dark" />
      </div>
      <TextField label="Condition Accepted" name="conditionAccepted" optional theme="dark" placeholder="e.g. NEW / OH / SV / AR" />

      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-slate">
        Aircraft details (optional if unknown)
      </p>
      <div className="grid gap-5 sm:grid-cols-3">
        <TextField label="Aircraft Type" name="aircraftType" optional theme="dark" />
        <TextField label="Registration" name="aircraftRegistration" optional theme="dark" />
        <TextField label="MSN" name="msn" optional theme="dark" />
      </div>

      <FileUpload name="attachment" label="Upload RFQ / Documentation" theme="dark" />
      <TextArea label="Additional Notes" name="notes" optional theme="dark" />

      {status === "error" ? (
        <p className="text-[13px] text-aog" role="alert">
          We couldn&apos;t submit the request. Please review the highlighted
          fields and try again.
        </p>
      ) : null}

      <div className="mt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full border border-aog/60 bg-aog/15 px-7 py-4 text-[13px] font-medium uppercase tracking-[0.12em] text-aog transition-colors duration-200 hover:bg-aog/25 disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting request…" : "Submit an Urgent RFQ"}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
