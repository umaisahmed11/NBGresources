import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Button + link primitives (spec §21).
 * Restrained hover: arrow shifts a few px, fill inverts — no bounce.
 */

type CommonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  cursorLabel?: string;
};

/** Primary CTA — frost-white background, dark text, diagonal arrow. */
export function PrimaryButton({
  children,
  href,
  className,
  onClick,
  type = "button",
  disabled,
  cursorLabel = "OPEN",
}: CommonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full bg-frost px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-carbon transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ice disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );
  const inner = (
    <>
      {children}
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes} data-cursor={cursorLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {inner}
    </button>
  );
}

/** Secondary CTA — transparent with thin border. */
export function SecondaryButton({
  children,
  href,
  className,
  onClick,
  type = "button",
  disabled,
  dark = false,
  cursorLabel = "VIEW",
}: CommonProps & { dark?: boolean }) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-50",
    dark
      ? "border-silver/70 text-text-dark hover:border-deepice hover:text-deepice"
      : "border-white/20 text-text-light hover:border-glacier hover:text-ice",
    className,
  );
  const inner = (
    <>
      {children}
      <ArrowRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes} data-cursor={cursorLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {inner}
    </button>
  );
}

/** Inline text link with animated underline + arrow (spec §21, §43). */
export function TextLink({
  children,
  href,
  className,
  accent = true,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      data-cursor="VIEW"
      className={cn(
        "group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight transition-colors duration-200",
        accent ? "text-glacier hover:text-ice" : "text-current",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
        />
      </span>
      <ArrowRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      />
    </Link>
  );
}
