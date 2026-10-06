import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/sections/Hero";
import { CapabilityList } from "@/components/sections/CapabilityList";
import { EngineFeature } from "@/components/sections/EngineFeature";
import { GlobalNetwork } from "@/components/sections/GlobalNetwork";
import { AOGBanner } from "@/components/sections/AOGBanner";
import { RFQCTA } from "@/components/sections/RFQCTA";
import { SectionEyebrow, DisplayHeading } from "@/components/ui/Typography";
import { TextLink } from "@/components/ui/Button";
import { TechnicalImage } from "@/components/ui/TechnicalImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { whyUsPillars, verifiedMetrics } from "@/content/company";
import { leadership } from "@/content/team";

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero (dark) */}
      <Hero />

      {/* Section 2 — Introduction (light) */}
      <Section theme="arctic">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow>Who We Are</SectionEyebrow>
            <DisplayHeading className="mt-6 max-w-[16ch]">
              Your Global Aviation Sourcing Partner
            </DisplayHeading>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end">
            <p className="max-w-[520px] text-[17px] leading-relaxed text-steel sm:text-[18px]">
              Northbridge Global Resources is a New York-based aviation sourcing and trading company focused on connecting customers with reliable products and supply solutions.
            </p>
            <div className="mt-8">
              <TextLink href="/about" accent={false}>
                About the company
              </TextLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Section 3 — Capability Index (light) */}
      <Section theme="frost">
        <Reveal className="mb-12 max-w-[760px]">
          <SectionEyebrow>Capabilities / 01–05</SectionEyebrow>
          <DisplayHeading className="mt-6">
            Aviation Sourcing Made Simple
          </DisplayHeading>
        </Reveal>
        <CapabilityList />
      </Section>

      {/* Section 4 — Engines & Parts cinematic (dark) */}
      <Section theme="graphite">
        <EngineFeature />
      </Section>

      {/* Section 5 — Global Reach (light) */}
      <Section theme="arctic">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <SectionEyebrow>Global Network</SectionEyebrow>
            <DisplayHeading className="mt-6 max-w-[15ch]">
              Global Reach. Local Attention.
            </DisplayHeading>
            <p className="mt-8 max-w-[520px] text-[17px] leading-relaxed text-steel sm:text-[18px]">
              Aviation is a global business. Your sourcing network should be too. Northbridge works across domestic and international markets to identify supply opportunities based on your specific requirements. From a single part number to a complete RFQ, we focus on availability, condition, documentation, delivery requirements, and competitive sourcing.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <GlobalNetwork />
          </Reveal>
        </div>
      </Section>

      {/* Section 6 — Why Choose Us (light) */}
      <Section theme="frost">
        <Reveal className="max-w-[760px]">
          <SectionEyebrow>Why Northbridge</SectionEyebrow>
          <DisplayHeading className="mt-6">
            A Better Approach to Aviation Sourcing
          </DisplayHeading>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-silver bg-silver sm:grid-cols-2 lg:grid-cols-4">
          {whyUsPillars.map((pillar, i) => (
            <RevealItem
              key={pillar.title}
              className="flex flex-col gap-4 bg-frost p-8"
            >
              <span className="font-display text-sm text-steel">
                0{i + 1} / 04
              </span>
              <h3 className="font-display text-[20px] font-medium tracking-tight text-text-dark">
                {pillar.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-steel">{pillar.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Section 7 — Experience / Credibility.
          Omitted entirely unless the client has verified metrics (spec §24 §7 IMPORTANT). */}
      {verifiedMetrics.length > 0 ? (
        <Section theme="graphite">
          <Reveal className="max-w-[760px]">
            <DisplayHeading>
              Experience should be visible in the decisions. Not just in the numbers.
            </DisplayHeading>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {verifiedMetrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-[44px] font-medium tracking-tight text-ice">
                  {m.value}
                </p>
                <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-slate">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Section 8 — Leadership Preview (light) */}
      <Section theme="arctic">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionEyebrow>Leadership</SectionEyebrow>
            <DisplayHeading className="mt-6 max-w-[14ch]">
              Built on Long-Term Partnerships
            </DisplayHeading>
            <p className="mt-8 max-w-[480px] text-[17px] leading-relaxed text-steel sm:text-[18px]">
              Our approach is simple: understand the requirement, find the right solution, communicate clearly, and build relationships that last.
            </p>
            <div className="mt-8">
              <TextLink href="/team" accent={false}>
                Meet the team
              </TextLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {/* Only 2–3 selected leadership images on the home page (spec §24 §8). */}
            <div className="grid grid-cols-2 gap-4">
              {leadership.slice(0, 2).map((member, i) => (
                <TechnicalImage
                  key={i}
                  tone={i === 0 ? "titanium" : "carbon"}
                  aspect="aspect-[3/4]"
                  label="Leadership"
                  caption="PORTRAIT / PLACEHOLDER"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Section 9 — AOG Feature (dark) */}
      <AOGBanner />

      {/* Section 10 — Final RFQ CTA (dark) */}
      <RFQCTA />

      <span className="sr-only">
        <Link href="/services">All capabilities</Link>
      </span>
    </>
  );
}
