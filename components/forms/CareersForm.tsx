"use client";

import { useRef, useState } from "react";
import { TextField, TextArea, Honeypot } from "./fields";
import { FileUpload } from "./FileUpload";
import { PrimaryButton } from "@/components/ui/Button";
import { careersSchema } from "@/lib/validation/schemas";

type Errors = Partial<Record<string, string>>;

/** Careers / speculative application form (spec §34). */
export function CareersForm() {
  const sending = useRef(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
    const parsed = careersSchema.safeParse(payload);
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
      const res = await fetch("/api/careers", { method: "POST", body: form });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (data.success !== true) throw new Error("Request failed");
      setStatus("success");
      element.reset();
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-white/10 bg-titanium p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-glacier">
          Application received
        </p>
        <h3 className="mt-3 font-display text-[24px] font-medium tracking-tight text-text-light">
          Thank you for your interest.
        </h3>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-text-muted-dark">
          Your details have been submitted. If your background matches a current
          or upcoming requirement, our team will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" required error={errors.name} theme="dark" autoComplete="name" />
        <TextField label="Email" name="email" type="email" required error={errors.email} theme="dark" autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Phone" name="phone" optional theme="dark" autoComplete="tel" />
        <TextField label="Location" name="location" optional theme="dark" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Role of Interest" name="role" optional theme="dark" />
        <TextField label="LinkedIn" name="linkedin" optional theme="dark" />
      </div>
      <FileUpload name="cv" label="CV / Resume" theme="dark" />
      <TextArea label="Message" name="message" optional theme="dark" />

      {status === "error" ? (
        <p className="text-[13px] text-aog" role="alert">
          Something went wrong. Please try again or email us directly.
        </p>
      ) : null}

      <div className="mt-2">
        <PrimaryButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting…" : "Submit Application"}
        </PrimaryButton>
      </div>
    </form>
  );
}
