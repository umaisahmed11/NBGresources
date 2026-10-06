"use client";

import { useId, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALLOWED_UPLOAD_EXTENSIONS, MAX_UPLOAD_BYTES } from "@/lib/validation/schemas";

/**
 * Accessible file upload (spec §22, §30, §56).
 * Client-side extension + size validation (server re-validates). Preferred
 * formats surfaced to the user; iOS/Android friendly native input.
 */
export function FileUpload({
  name,
  label = "Attachment",
  theme = "light",
  onFile,
}: {
  name: string;
  label?: string;
  theme?: "light" | "dark";
  onFile?: (file: File | null) => void;
}) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const accept = ALLOWED_UPLOAD_EXTENSIONS.map((e) => `.${e}`).join(",");
  const maxMb = Math.round(MAX_UPLOAD_BYTES / (1024 * 1024));

  function validate(file: File | undefined) {
    if (!file) {
      setFileName(null);
      setError(null);
      onFile?.(null);
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_UPLOAD_EXTENSIONS.includes(ext as (typeof ALLOWED_UPLOAD_EXTENSIONS)[number])) {
      setError(
        `This file could not be uploaded. Please use ${ALLOWED_UPLOAD_EXTENSIONS.join(", ").toUpperCase()}.`,
      );
      setFileName(null);
      onFile?.(null);
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(`This file is too large. Keep the file below ${maxMb} MB.`);
      setFileName(null);
      onFile?.(null);
      return;
    }
    setError(null);
    setFileName(file.name);
    onFile?.(file);
  }

  const dark = theme === "dark";

  return (
    <div>
      <label
        htmlFor={id}
        className={cn("mb-2 block text-[13px] font-medium", dark ? "text-text-light" : "text-text-dark")}
      >
        {label} <span className="text-slate">(optional)</span>
      </label>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center justify-between gap-3 rounded-[12px] border border-dashed px-4 py-4 text-[14px] transition-colors duration-200",
          dark
            ? "border-white/15 bg-white/[0.03] text-slate hover:border-glacier/50"
            : "border-silver bg-white text-steel hover:border-deepice/50",
        )}
      >
        <span className="flex items-center gap-3">
          <Upload className="h-4 w-4" />
          {fileName ?? `PDF, XLSX, XLS, CSV, DOCX, TXT · up to ${maxMb} MB`}
        </span>
        {fileName ? (
          <button
            type="button"
            aria-label="Remove file"
            onClick={(e) => {
              e.preventDefault();
              validate(undefined);
              const input = document.getElementById(id) as HTMLInputElement | null;
              if (input) input.value = "";
            }}
            className="rounded-full p-1 hover:text-aog"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => validate(e.target.files?.[0])}
      />
      {error ? (
        <p className="mt-1.5 text-[12px] text-aog" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
