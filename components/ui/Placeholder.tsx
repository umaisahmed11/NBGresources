import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Renders a value that may still be an unconfirmed placeholder (spec §74.23:
 * "Keep placeholders explicitly marked"). A value wrapped in [SQUARE BRACKETS]
 * is treated as provisional and styled distinctly so it can never be mistaken
 * for confirmed client data. Confirmed values render normally.
 */
export function PlaceholderValue({
  value,
  href,
  className,
}: {
  value: string;
  href?: string;
  className?: string;
}) {
  const isPlaceholder = /^\[.*\]$/.test(value.trim());

  if (isPlaceholder) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded border border-dashed border-slate/50 px-1.5 py-0.5 text-[12px] italic text-slate",
          className,
        )}
        title="Placeholder — pending client confirmation"
        data-placeholder="true"
      >
        {value}
      </span>
    );
  }

  if (href && !/^\[.*\]$/.test(href.trim())) {
    return (
      <Link href={href} className={cn("transition-colors hover:text-text-light", className)}>
        {value}
      </Link>
    );
  }

  return <span className={className}>{value}</span>;
}
