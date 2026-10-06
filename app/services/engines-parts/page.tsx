import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps, LabelChips } from "@/components/sections/ServiceBlocks";
import { PartsQuickForm } from "@/components/forms/PartsQuickForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionEyebrow, DisplayHeading } from "@/components/ui/Typography";
import { partCategories, sourcingApproach, engineLifecycleSupport } from "@/content/services";
import { buildMetadata } from "@/lib/seo/config";
import { jsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Engines & Parts | Northbridge Global Resources",
  description:
    "Aircraft components, avionics, engine-related parts, consumables, aviation hardware, and ground support equipment.",
  path: "/services/engines-parts",
});

export default function EnginesPartsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema(
            "Engines & Parts",
            "Aviation parts sourcing, procurement, and supply-chain solutions.",
            "/services/engines-parts",
          ),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Capabilities", path: "/services" },
            { name: "Engines & Parts", path: "/services/engines-parts" },
          ]),
        )}
      />

      {/* Dark cinematic hero */}
      <PageHero
        eyebrow="Capability / 03"
        heading="Aviation Parts & Supplies"
        copy="Northbridge supports a wide range of aviation product requirements for operators, MROs, distributors, and other aviation businesses."
        primaryCta={{ label: "Submit a Part Number", href: "#parts-rfq" }}
      />

      {/* Category feature — graphite */}
      <Section theme="graphite">
        <Reveal className="mb-12 max-w-[760px]">
          <SectionEyebrow accent>Product Categories</SectionEyebrow>
          <DisplayHeading className="mt-6">Coverage across the component spectrum.</DisplayHeading>
          <p className="mt-6 max-w-[60ch] text-[15px] italic text-slate">
            Aircraft components, avionics, electrical products, engine-related components, aviation hardware, consumables, expendables, maintenance supplies, and ground-support equipment.
          </p>
        </Reveal>
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
          {partCategories.map((cat) => (
            <RevealItem key={cat.title} className="flex flex-col gap-3 bg-titanium p-7">
              <h3 className="font-display text-[18px] font-medium tracking-tight text-text-light">
                {cat.title}
              </h3>
              <ul className="space-y-1.5">
                {cat.items.map((item) => (
                  <li key={item} className="text-[14px] leading-relaxed text-text-muted-dark">
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Sourcing process — light */}
      <Section theme="arctic">
        <ProcessSteps
          eyebrow="Sourcing Approach"
          heading="Quality Through Responsible Sourcing"
          steps={sourcingApproach}
          note="Quality and documentation matter at every stage of aviation procurement."
        />
      </Section>

      {/* Engine lifecycle support */}
      <Section theme="frost">
        <LabelChips
          eyebrow="Industries"
          heading="Supporting the Aviation Industry"
          labels={engineLifecycleSupport}
        />
        <p className="mt-6 text-[13px] italic text-steel">Northbridge works with businesses throughout the aviation supply chain.</p>
      </Section>

      {/* Parts RFQ quick form — dark */}
      <Section theme="graphite" id="parts-rfq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow accent>Hard-to-Find Parts</SectionEyebrow>
            <DisplayHeading className="mt-6 max-w-[14ch]">
              Can’t Find the Part? Let Us Help.
            </DisplayHeading>
            <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-text-muted-dark">
              Limited availability, long lead times, and obsolete components can make aviation sourcing challenging. Northbridge expands the search across multiple sourcing channels to help identify potential solutions for difficult-to-find aircraft parts and aviation products. Send us the part number and your requirements. We’ll take it from there.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-carbon/40 p-6 sm:p-8">
              <PartsQuickForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
