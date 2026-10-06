import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { RFQCTA } from "@/components/sections/RFQCTA";
import { SectionEyebrow, DisplayHeading } from "@/components/ui/Typography";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { aboutApproach, brandValues } from "@/content/company";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "About | Northbridge Global Resources",
  description:
    "Northbridge Global Resources is a New York-based aviation sourcing and trading company connecting customers with reliable products and supply solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company / About"
        heading="Your Global Aviation Sourcing Partner"
        copy="Northbridge Global Resources is a New York-based aviation sourcing and trading company focused on connecting customers with reliable products and supply solutions."
      />

      {/* Who we are — light editorial body */}
      <Section theme="arctic">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow>Who We Are</SectionEyebrow>
            <DisplayHeading className="mt-6 max-w-[16ch]">
              Supporting the Aviation Industry
            </DisplayHeading>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-[17px] leading-relaxed text-steel sm:text-[18px]">
            <p>
              We source aircraft parts, components, consumables, equipment, and operational supplies through domestic and international markets.
            </p>
            <p>
              Our approach is simple: understand the requirement, find the right solution, communicate clearly, and build relationships that last.
            </p>
            <p>
              Northbridge works with businesses throughout the aviation supply chain: commercial aviation, MROs, cargo aviation, business and general aviation, aviation distributors, and ground operations. We support parts, procurement, maintenance supplies, and equipment requirements across these markets.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Our approach — four principles */}
      <Section theme="frost">
        <Reveal className="max-w-[760px]">
          <SectionEyebrow>Quality</SectionEyebrow>
          <DisplayHeading className="mt-6">Quality Through Responsible Sourcing</DisplayHeading>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-silver bg-silver sm:grid-cols-2">
          {aboutApproach.map((item, i) => (
            <RevealItem key={item.title} className="flex flex-col gap-4 bg-frost p-8 lg:p-10">
              <span className="font-display text-sm text-steel">0{i + 1} / 04</span>
              <h3 className="font-display text-[22px] font-medium tracking-tight text-text-dark">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-steel">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Vision + Mission + Values — graphite */}
      <Section theme="graphite">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionEyebrow accent>Vision</SectionEyebrow>
            <p className="mt-6 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-text-light sm:text-[32px]">
              To become a trusted global partner for aviation sourcing, procurement, and supply-chain solutions.
            </p>
            <p className="mt-4 text-[13px] italic text-slate">Connecting Aviation. Delivering Solutions.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionEyebrow accent>Mission</SectionEyebrow>
            <p className="mt-6 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-text-light sm:text-[32px]">
              To simplify aviation sourcing by connecting customers with reliable products, responsive service, and global supply solutions.
            </p>
            <p className="mt-4 text-[13px] italic text-slate">Connecting Aviation. Delivering Solutions.</p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <SectionEyebrow accent>Values</SectionEyebrow>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {brandValues.map((value) => (
              <li
                key={value}
                className="font-display text-[20px] font-medium uppercase tracking-tight text-text-light sm:text-[26px]"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <RFQCTA
        heading="Your Requirement. Our Network."
        copy="Send us your aviation requirement and our team will review available sourcing options."
        microcopy={undefined}
      />
    </>
  );
}
