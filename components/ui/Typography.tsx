import { cn } from "@/lib/utils";

/**
 * Typography primitives (spec §11).
 * Restrained scale — huge type reserved for major statements only.
 */

/** Small uppercase eyebrow above a heading. */
export function SectionEyebrow({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em]",
        accent ? "text-glacier" : "text-slate",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6", accent ? "bg-glacier" : "bg-current opacity-40")} />
      {children}
    </span>
  );
}

/** Technical label (spec §11 technical labels, §40). Decorative unless data is real. */
export function TechnicalLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.16em] text-slate",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Large display heading. Sizes follow the hero/section scale in spec §11. */
export function DisplayHeading({
  children,
  className,
  as: Tag = "h2",
  size = "section",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "section" | "medium";
}) {
  const sizes = {
    hero: "text-[42px] leading-[0.98] sm:text-[64px] lg:text-[88px] xl:text-[104px] tracking-[-0.045em]",
    section: "text-[34px] leading-[1.02] sm:text-[44px] lg:text-[60px] tracking-[-0.035em]",
    medium: "text-[26px] leading-[1.08] sm:text-[32px] lg:text-[40px] tracking-[-0.03em]",
  };
  return (
    <Tag
      className={cn(
        "font-display font-medium text-balance",
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Constrained body copy — never wider than ~680px (spec §11). */
export function Lead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("max-w-[680px] text-[17px] leading-relaxed sm:text-[19px]", className)}>
      {children}
    </p>
  );
}
