"use client";

import { useRef, useState } from "react";
import { TextField, TextArea, SelectField, Honeypot } from "./fields";
import { FileUpload } from "./FileUpload";
import { PrimaryButton } from "@/components/ui/Button";
import { contactSchema, inquiryTypes } from "@/lib/validation/schemas";

type Errors = Partial<Record<string, string>>;

/** Contact form (spec §35). */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sending = useRef(false);
  const [resetKey, setResetKey] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    const element = e.currentTarget;
    setErrors({});

    const form = new FormData(element);
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

    sending.current = true;
    setStatus("submitting");
    try {
      const attachment = form.get("attachment");
      const hasAttachment = attachment instanceof File && attachment.size > 0;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: hasAttachment ? undefined : { "Content-Type": "application/json" },
        body: hasAttachment ? form : JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || data.success !== true) throw new Error("Request failed");
      element.reset();
      setResetKey((key) => key + 1);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === "submitting"} className="relative grid gap-5">
      <fieldset disabled={status === "submitting"} className="contents">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" required error={errors.name} autoComplete="name" />
        <TextField label="Email" name="email" type="email" required error={errors.email} autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Company" name="company" optional error={errors.company} autoComplete="organization" />
        <TextField label="Phone" name="phone" optional error={errors.phone} autoComplete="tel" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Subject" name="subject" optional error={errors.subject} />
        <SelectField label="Inquiry Type" name="inquiryType" options={inquiryTypes} optional error={errors.inquiryType} />
      </div>
      <TextArea label="Message" name="message" required error={errors.message} placeholder="Describe your requirement…" />
      <FileUpload key={resetKey} name="attachment" />
      </fieldset>

      {status === "success" ? (
        <p role="status" className="rounded-xl border border-silver bg-frost p-4 text-[15px] text-deepice">
          Message sent successfully. We’ll get back to you soon.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="text-[13px] text-aog" role="alert">
          Unable to send your message. Please try again or contact us directly.
        </p>
      ) : null}

      <div className="mt-2">
        <PrimaryButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Message"}
        </PrimaryButton>
      </div>
    </form>
  );
}
