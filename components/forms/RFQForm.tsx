"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Plane, Cog, Package, FileText, Briefcase, CircleHelp } from "lucide-react";
import { TextField, TextArea, SelectField, Honeypot } from "./fields";
import { FileUpload } from "./FileUpload";
import { PrimaryButton } from "@/components/ui/Button";
import { rfqSchema, rfqTypes, type RfqType } from "@/lib/validation/schemas";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

/** Field definition for the adaptive detail section (spec §33). */
type Field =
  | { kind: "text"; name: string; label: string; optional?: boolean; placeholder?: string }
  | { kind: "textarea"; name: string; label: string; optional?: boolean }
  | { kind: "select"; name: string; label: string; options: string[]; optional?: boolean };

const detailFields: Record<RfqType, Field[]> = {
  Aircraft: [
    { kind: "text", name: "aircraftType", label: "Aircraft Type" },
    { kind: "select", name: "requirement", label: "Requirement", options: ["Buy", "Sell"] },
    { kind: "text", name: "yearRange", label: "Year Range", optional: true },
    { kind: "text", name: "mission", label: "Mission / Configuration", optional: true },
    { kind: "text", name: "timeline", label: "Timeline", optional: true },
    { kind: "text", name: "budget", label: "Budget Range", optional: true },
    { kind: "text", name: "location", label: "Location", optional: true },
    { kind: "textarea", name: "notes", label: "Notes", optional: true },
  ],
  Engine: [
    { kind: "text", name: "engineType", label: "Engine Type" },
    { kind: "text", name: "serialNumber", label: "Serial Number", optional: true },
    { kind: "select", name: "requirement", label: "Requirement", options: ["Buy", "Sell", "Lease", "Other"] },
    { kind: "text", name: "aircraftApplication", label: "Aircraft Application", optional: true },
    { kind: "text", name: "timeline", label: "Timeline", optional: true },
    { kind: "text", name: "location", label: "Location", optional: true },
  ],
  "Parts / Components": [
    { kind: "text", name: "partNumber", label: "Part Number" },
    { kind: "text", name: "description", label: "Description", optional: true },
    { kind: "text", name: "quantity", label: "Quantity" },
    { kind: "text", name: "condition", label: "Condition", optional: true, placeholder: "NEW / OH / SV / AR" },
    { kind: "text", name: "aircraftType", label: "Aircraft Type", optional: true },
    { kind: "text", name: "requiredBy", label: "Required By", optional: true },
    { kind: "text", name: "deliveryLocation", label: "Delivery Location", optional: true },
  ],
  Leasing: [
    { kind: "text", name: "aircraftType", label: "Aircraft Type" },
    { kind: "select", name: "leaseType", label: "Lease Type", options: ["Dry", "Wet", "ACMI", "Damp", "Other"] },
    { kind: "text", name: "numberOfAircraft", label: "Number of Aircraft", optional: true },
    { kind: "text", name: "startDate", label: "Start Date", optional: true },
    { kind: "text", name: "duration", label: "Lease Duration", optional: true },
    { kind: "text", name: "region", label: "Operating Region", optional: true },
    { kind: "text", name: "utilization", label: "Estimated Utilization", optional: true },
    { kind: "textarea", name: "notes", label: "Notes", optional: true },
  ],
  Consultancy: [
    { kind: "text", name: "organization", label: "Organization" },
    { kind: "text", name: "areaOfSupport", label: "Area of Support" },
    { kind: "textarea", name: "challenge", label: "Challenge / Objective", optional: true },
    { kind: "text", name: "timeline", label: "Timeline", optional: true },
    { kind: "text", name: "preferredContact", label: "Preferred Contact Method", optional: true },
  ],
  Other: [{ kind: "textarea", name: "requirement", label: "Describe your requirement" }],
};

const typeIcons: Record<RfqType, React.ReactNode> = {
  Aircraft: <Plane className="h-5 w-5" />,
  Engine: <Cog className="h-5 w-5" />,
  "Parts / Components": <Package className="h-5 w-5" />,
  Leasing: <FileText className="h-5 w-5" />,
  Consultancy: <Briefcase className="h-5 w-5" />,
  Other: <CircleHelp className="h-5 w-5" />,
};

export function RFQForm() {
  const router = useRouter();
  const [rfqType, setRfqType] = useState<RfqType | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rfqType) return;
    setStatus("submitting");
    setErrors({});

    const form = new FormData(e.currentTarget);
    const raw = Array.from(form.entries()).filter(([, v]) => typeof v === "string") as [string, string][];

    // Split into common fields + detail record.
    const common: Record<string, string> = { rfqType };
    const details: Record<string, string> = {};
    const commonKeys = new Set(["company", "contactName", "email", "phone", "notes", "website"]);
    for (const [key, value] of raw) {
      if (commonKeys.has(key)) common[key] = value;
      else details[key] = value;
    }

    const parsed = rfqSchema.safeParse({ ...common, details });
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
      form.append("rfqType", rfqType);
      form.append("detailsJson", JSON.stringify(details));
      const res = await fetch("/api/rfq", { method: "POST", body: form });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { reference: string };
      router.push(`/thank-you?ref=${encodeURIComponent(data.reference)}&type=rfq`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-10">
      {/* Step 1 — type selector */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-steel">
          What do you need?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {rfqTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setRfqType(type)}
              data-cursor="SELECT"
              className={cn(
                "flex items-center gap-3 rounded-[14px] border px-4 py-4 text-left text-[14px] font-medium transition-all duration-200",
                rfqType === type
                  ? "border-deepice bg-deepice/8 text-text-dark"
                  : "border-silver bg-white text-steel hover:border-deepice/50 hover:text-text-dark",
              )}
              aria-pressed={rfqType === type}
            >
              <span className={rfqType === type ? "text-deepice" : "text-steel"}>
                {typeIcons[type]}
              </span>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — adaptive form */}
      <AnimatePresence mode="wait">
        {rfqType ? (
          <motion.form
            key={rfqType}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={onSubmit}
            noValidate
            className="relative grid gap-5"
          >
            <Honeypot />

            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-steel">
              {rfqType} requirement
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {detailFields[rfqType].map((field) => {
                if (field.kind === "textarea") {
                  return (
                    <div key={field.name} className="sm:col-span-2">
                      <TextArea label={field.label} name={field.name} optional={field.optional} />
                    </div>
                  );
                }
                if (field.kind === "select") {
                  return (
                    <SelectField
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      options={field.options}
                      optional={field.optional}
                    />
                  );
                }
                return (
                  <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    optional={field.optional}
                    placeholder={field.placeholder}
                  />
                );
              })}
            </div>

            <FileUpload name="attachment" label="Upload your RFQ or parts list" />

            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-steel">
              Your details
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Company" name="company" required error={errors.company} autoComplete="organization" />
              <TextField label="Contact Name" name="contactName" required error={errors.contactName} autoComplete="name" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Email" name="email" type="email" required error={errors.email} autoComplete="email" />
              <TextField label="Phone" name="phone" optional error={errors.phone} autoComplete="tel" />
            </div>

            {status === "error" ? (
              <p className="text-[13px] text-aog" role="alert">
                Something went wrong while processing the request. Please try
                again or contact us directly.
              </p>
            ) : null}

            <div className="mt-2">
              <PrimaryButton type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Submitting request…" : "Submit RFQ"}
              </PrimaryButton>
            </div>
          </motion.form>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
