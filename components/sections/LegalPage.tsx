import { Container } from "@/components/layout/Container";

/**
 * Shared layout for legal/policy pages (spec §36, §37).
 * Constrained measure, clear hierarchy. Content is a reviewable template, not
 * copied from any competitor — legal review is required before publication.
 */
export function LegalPage({
  title,
  eyebrow,
  intro,
  sections,
}: {
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <section className="bg-arctic pt-[120px] pb-24 text-text-dark md:pt-[150px]">
      <Container>
        <div className="max-w-[760px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-deepice">{eyebrow}</p>
          <h1 className="mt-6 font-display text-[40px] font-medium leading-[1.02] tracking-[-0.035em] sm:text-[52px]">
            {title}
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-steel">{intro}</p>

          <div className="mt-6 rounded-xl border border-dashed border-silver bg-frost p-5 text-[13px] italic text-steel">
            This document should be legally reviewed before publication.
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-[22px] font-medium tracking-tight text-text-dark">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="mt-3 text-[15px] leading-relaxed text-steel">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
