"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, TextArea, Honeypot } from "./fields";
import { FileUpload } from "./FileUpload";
import { PrimaryButton } from "@/components/ui/Button";

type Errors = Partial<Record<string, string>>;

/**
 * Parts RFQ quick form (spec §30 "Parts RFQ Quick Form").
 * Submits to the shared RFQ endpoint as a "Parts / Components" requirement.
 */
export function PartsQuickForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = new FormData(e.currentTarget);
    const partNumber = String(form.get("partNumber") ?? "").trim();
    const quantity = String(form.get("quantity") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const contactName = String(form.get("contactName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    const fieldErrors: Errors = {};
    if (!partNumber) fieldErrors.partNumber = "Part number is required.";
    if (!quantity) fieldErrors.quantity = "Quantity is required.";
    if (!company) fieldErrors.company = "Company is required.";
    if (!contactName) fieldErrors.contactName = "Contact name is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) fieldErrors.email = "Enter a valid email address.";
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    const details = {
      partNumber,
      description: String(form.get("description") ?? ""),
      aircraftType: String(form.get("aircraftType") ?? ""),
      condition: String(form.get("condition") ?? ""),
      quantity,
      requiredBy: String(form.get("requiredBy") ?? ""),
      deliveryLocation: String(form.get("deliveryLocation") ?? ""),
    };
    form.append("rfqType", "Parts / Components");
    form.append("detailsJson", JSON.stringify(details));

    try {
      const res = await fetch("/api/rfq", { method: "POST", body: form });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { reference: string };
      router.push(`/thank-you?ref=${encodeURIComponent(data.reference)}&type=rfq`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Part Number" name="partNumber" required error={errors.partNumber} theme="dark" />
        <TextField label="Quantity" name="quantity" required error={errors.quantity} theme="dark" />
      </div>
      <TextField label="Description" name="description" optional theme="dark" />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Aircraft Type" name="aircraftType" optional theme="dark" />
        <TextField label="Condition Required" name="condition" optional theme="dark" placeholder="NEW / OH / SV / AR" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Required By" name="requiredBy" optional theme="dark" />
        <TextField label="Delivery Airport / City / Country" name="deliveryLocation" optional theme="dark" />
      </div>

      <div className="mt-2 border-t border-white/10 pt-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Company" name="company" required error={errors.company} theme="dark" autoComplete="organization" />
          <TextField label="Contact Name" name="contactName" required error={errors.contactName} theme="dark" autoComplete="name" />
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <TextField label="Email" name="email" type="email" required error={errors.email} theme="dark" autoComplete="email" />
          <TextField label="Phone" name="phone" optional theme="dark" autoComplete="tel" />
        </div>
      </div>

      <FileUpload name="attachment" label="Attachment (RFQ / BOM / parts list)" theme="dark" />
      <TextArea label="Additional Notes" name="notes" optional theme="dark" />

      {status === "error" ? (
        <p className="text-[13px] text-aog" role="alert">
          Something went wrong while processing the request. Please try again.
        </p>
      ) : null}

      <div className="mt-2">
        <PrimaryButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting request…" : "Submit RFQ"}
        </PrimaryButton>
      </div>
    </form>
  );
}
