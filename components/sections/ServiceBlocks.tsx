import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, DisplayHeading } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

/** Numbered process / engagement steps (spec §28, §30, §31). */
export function ProcessSteps({
  eyebrow,
  heading,
  steps,
  note,
  dark = false,
}: {
  eyebrow: string;
  heading: string;
  steps: { index: string; title: string; body: string }[];
  note?: string;
  dark?: boolean;
}) {
  return (
    <div>
      <Reveal className="max-w-[760px]">
        <SectionEyebrow accent={dark}>{eyebrow}</SectionEyebrow>
        <DisplayHeading className="mt-6">{heading}</DisplayHeading>
      </Reveal>
      <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <RevealItem
            key={step.index}
            className={cn(
              "flex flex-col gap-3 p-8",
              dark ? "bg-titanium" : "bg-frost",
            )}
          >
            <span className={cn("font-display text-sm", dark ? "text-slate" : "text-steel")}>
              {step.index}
            </span>
            <h3
              className={cn(
                "font-display text-[19px] font-medium tracking-tight",
                dark ? "text-text-light" : "text-text-dark",
              )}
            >
              {step.title}
            </h3>
            <p className={cn("text-[15px] leading-relaxed", dark ? "text-text-muted-dark" : "text-steel")}>
              {step.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
      {note ? (
        <p className={cn("mt-6 text-[13px] italic", dark ? "text-slate" : "text-steel")}>{note}</p>
      ) : null}
    </div>
  );
}

/** Grid of titled feature cards (spec §28 What We Support, §31 areas). */
export function FeatureGrid({
  eyebrow,
  heading,
  items,
  dark = false,
  columns = 2,
}: {
  eyebrow?: string;
  heading?: string;
  items: { title: string; body: string; conditional?: boolean }[];
  dark?: boolean;
  columns?: 2 | 3;
}) {
  return (
    <div>
      {eyebrow || heading ? (
        <Reveal className="mb-12 max-w-[760px]">
          {eyebrow ? <SectionEyebrow accent={dark}>{eyebrow}</SectionEyebrow> : null}
          {heading ? <DisplayHeading className="mt-6">{heading}</DisplayHeading> : null}
        </Reveal>
      ) : null}
      <RevealGroup
        className={cn(
          "grid gap-px overflow-hidden rounded-2xl border",
          columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {items.map((item) => (
          <RevealItem
            key={item.title}
            className={cn("flex flex-col gap-3 p-8 lg:p-10", dark ? "bg-titanium" : "bg-frost")}
          >
            <h3
              className={cn(
                "font-display text-[20px] font-medium tracking-tight",
                dark ? "text-text-light" : "text-text-dark",
              )}
            >
              {item.title}
              {item.conditional ? (
                <span className="ml-2 align-middle text-[11px] font-normal uppercase tracking-[0.12em] text-slate">
                  If offered
                </span>
              ) : null}
            </h3>
            <p className={cn("text-[15px] leading-relaxed", dark ? "text-text-muted-dark" : "text-steel")}>
              {item.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

/** Uppercase technical chips (spec §29 use cases, §30 categories). */
export function LabelChips({
  eyebrow,
  heading,
  labels,
  dark = false,
}: {
  eyebrow?: string;
  heading?: string;
  labels: string[];
  dark?: boolean;
}) {
  return (
    <div>
      {eyebrow || heading ? (
        <Reveal className="mb-10 max-w-[760px]">
          {eyebrow ? <SectionEyebrow accent={dark}>{eyebrow}</SectionEyebrow> : null}
          {heading ? <DisplayHeading className="mt-6">{heading}</DisplayHeading> : null}
        </Reveal>
      ) : null}
      <Reveal>
        <ul className="flex flex-wrap gap-3">
          {labels.map((label) => (
            <li
              key={label}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em]",
                dark
                  ? "border-white/12 bg-white/[0.03] text-text-muted-dark"
                  : "border-silver bg-frost text-steel",
              )}
            >
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/** Simple bulleted support-area list (spec §29 support areas). */
export function SupportList({
  eyebrow,
  heading,
  items,
  dark = false,
}: {
  eyebrow?: string;
  heading?: string;
  items: string[];
  dark?: boolean;
}) {
  return (
    <div>
      {eyebrow || heading ? (
        <Reveal className="mb-10 max-w-[760px]">
          {eyebrow ? <SectionEyebrow accent={dark}>{eyebrow}</SectionEyebrow> : null}
          {heading ? <DisplayHeading className="mt-6">{heading}</DisplayHeading> : null}
        </Reveal>
      ) : null}
      <RevealGroup className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
        {items.map((item, i) => (
          <RevealItem
            key={item}
            as="div"
            className={cn(
              "flex items-center gap-4 border-b py-4 text-[16px]",
              dark ? "border-white/10 text-text-light" : "border-silver text-text-dark",
            )}
          >
            <span className={cn("font-display text-xs", dark ? "text-slate" : "text-steel")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
