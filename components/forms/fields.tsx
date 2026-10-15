"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Accessible form field primitives (spec §22, §49).
 * Large touch-friendly inputs, strong labels, clear required marks, inline
 * error slots, glacier focus ring. Light + dark treatments (spec §22).
 */

type FieldTheme = "light" | "dark";

const baseInput =
  "w-full rounded-[12px] px-4 text-[15px] outline-none transition-colors duration-200 min-h-[54px] focus:ring-2 focus:ring-glacier/70";

const themeInput: Record<FieldTheme, string> = {
  light: "border border-silver bg-white text-text-dark placeholder:text-steel/60",
  dark: "border border-white/12 bg-white/[0.04] text-text-light placeholder:text-slate/70",
};

const themeLabel: Record<FieldTheme, string> = {
  light: "text-text-dark",
  dark: "text-text-light",
};

function Label({
  htmlFor,
  children,
  required,
  optional,
  theme,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  theme: FieldTheme;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-2 flex items-center gap-1.5 text-[13px] font-medium", themeLabel[theme])}
    >
      {children}
      {required ? <span className="text-glacier">*</span> : null}
      {optional ? <span className="text-slate">(optional)</span> : null}
    </label>
  );
}

function ErrorText({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-1.5 text-[12px] text-aog" role="alert">
      {error}
    </p>
  );
}

export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  optional,
  error,
  theme = "light",
  defaultValue,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  theme?: FieldTheme;
  defaultValue?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} required={required} optional={optional} theme={theme}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={cn(baseInput, themeInput[theme])}
      />
      <ErrorText error={error} />
    </div>
  );
}

export function TextArea({
  label,
  name,
  placeholder,
  required,
  optional,
  error,
  theme = "light",
  rows = 5,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  theme?: FieldTheme;
  rows?: number;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} required={required} optional={optional} theme={theme}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={cn(
          "w-full rounded-[12px] px-4 py-3 text-[15px] outline-none transition-colors duration-200 focus:ring-2 focus:ring-glacier/70",
          themeInput[theme],
        )}
      />
      <ErrorText error={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  required,
  optional,
  error,
  theme = "light",
  placeholder = "Select…",
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  optional?: boolean;
  error?: string;
  theme?: FieldTheme;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} required={required} optional={optional} theme={theme}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={cn(baseInput, themeInput[theme])}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ErrorText error={error} />
    </div>
  );
}

/** Honeypot field for spam protection (spec §72). Visually hidden, not tabbable. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
