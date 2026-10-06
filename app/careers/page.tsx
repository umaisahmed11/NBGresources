import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionEyebrow, DisplayHeading } from "@/components/ui/Typography";
import { CareersForm } from "@/components/forms/CareersForm";
import { openRoles } from "@/content/careers";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Careers | Northbridge Global Resources",
  description:
    "Grow with Northbridge in aviation sales, procurement, aircraft parts, supply chain, logistics, operations, finance, and business development.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        heading="Grow With Northbridge"
        copy="We're building a global business focused on aviation, sourcing, supply chain, and international trade."
      />

      {/* Culture */}
      <Section theme="arctic">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow>Culture</SectionEyebrow>
            <DisplayHeading className="mt-6 max-w-[16ch]">
              Aviation, Sourcing and International Trade
            </DisplayHeading>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-[17px] leading-relaxed text-steel sm:text-[18px]">
            <p>
              We’re building a global business focused on aviation, sourcing, supply chain, and international trade.
            </p>
            <p>
              As Northbridge grows, we look forward to connecting with talented professionals across aviation sales, procurement, aircraft parts, supply chain, logistics, operations, finance, and business development.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Open roles */}
      <Section theme="frost">
        <Reveal className="max-w-[760px]">
          <SectionEyebrow>Open Roles</SectionEyebrow>
          <DisplayHeading className="mt-6">Current opportunities.</DisplayHeading>
        </Reveal>

        {openRoles.length === 0 ? (
          <Reveal className="mt-10 rounded-2xl border border-dashed border-silver bg-frost p-8">
            <p className="text-[16px] text-steel">
              There are no published openings at this time. Interested in growing with us? You are welcome to submit a speculative application below.
            </p>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-4">
            {openRoles.map((role) => (
              <article
                key={role.slug}
                className="flex flex-col gap-4 rounded-2xl border border-silver bg-frost p-8 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-[22px] font-medium tracking-tight text-text-dark">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.12em] text-slate">
                    {role.location} · {role.department} · {role.employmentType}
                  </p>
                  <p className="mt-3 max-w-[60ch] text-[15px] text-steel">{role.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      {/* Speculative application */}
      <Section theme="graphite">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow accent>Apply</SectionEyebrow>
            <DisplayHeading className="mt-6 max-w-[14ch]">Interested in growing with us?</DisplayHeading>
            <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-text-muted-dark">
              Share your background and areas of interest. If it matches a
              current or upcoming requirement, our team will be in touch.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-carbon/40 p-6 sm:p-8">
              <CareersForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
