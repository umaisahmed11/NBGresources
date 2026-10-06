"use client";

import { useState } from "react";
import { TextField, TextArea, SelectField, Honeypot } from "./fields";
import { FileUpload } from "./FileUpload";
import { PrimaryButton } from "@/components/ui/Button";
import { contactSchema, inquiryTypes } from "@/lib/validation/schemas";

type Errors = Partial<Record<string, string>>;

/** Contact form (spec §35). */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(
      Array.from(form.entries()).filter(([, v]) => typeof v === "string"),
    );

    const parsed = contactSchema.safeParse(payload);
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-silver bg-frost p-8 text-text-dark">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-deepice">
          Message received
        </p>
        <h3 className="mt-3 font-display text-[26px] font-medium tracking-tight">
          Thank you.
        </h3>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-steel">
          Your message has been submitted. Our team will review the information
          and respond using the details you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" required error={errors.name} autoComplete="name" />
        <TextField label="Email" name="email" type="email" required error={errors.email} autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Company" name="company" required error={errors.company} autoComplete="organization" />
        <TextField label="Phone" name="phone" optional error={errors.phone} autoComplete="tel" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Subject" name="subject" required error={errors.subject} />
        <SelectField label="Inquiry Type" name="inquiryType" options={inquiryTypes} optional error={errors.inquiryType} />
      </div>
      <TextArea label="Message" name="message" required error={errors.message} placeholder="Describe your requirement…" />
      <FileUpload name="attachment" />

      {status === "error" ? (
        <p className="text-[13px] text-aog" role="alert">
          Something went wrong while processing the request. Please try again or
          contact us directly.
        </p>
      ) : null}

      <div className="mt-2">
        <PrimaryButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting request…" : "Send Message"}
        </PrimaryButton>
      </div>
    </form>
  );
}
