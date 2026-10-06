import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { RFQCTA } from "@/components/sections/RFQCTA";
import { FeatureGrid, ProcessSteps, LabelChips } from "@/components/sections/ServiceBlocks";
import { consultancyAreas, consultancyEngagement } from "@/content/services";
import { buildMetadata } from "@/lib/seo/config";
import { jsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Aviation Consultancy | Northbridge Global Resources",
  description:
    "Aviation sourcing and procurement support for individual parts, multi-line RFQs, and time-sensitive requirements.",
  path: "/services/aviation-consultancy",
});

const optionalAreas = [
  "Aircraft Components",
  "Avionics",
  "Electrical Products",
  "Engine Components",
  "Aviation Hardware",
  "Consumables",
  "Expendables",
  "Maintenance Supplies",
  "Ground Support Equipment",
];

export default function AviationConsultancyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema(
            "Aviation Consultancy",
            "Responsive and flexible aviation sourcing and procurement support.",
            "/services/aviation-consultancy",
          ),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Capabilities", path: "/services" },
            { name: "Aviation Consultancy", path: "/services/aviation-consultancy" },
          ]),
        )}
      />

      {/* Light / minimal hero */}
      <PageHero
        eyebrow="Capability / 04"
        heading="Aviation Sourcing Made Simple"
        copy="Northbridge helps customers navigate the aviation supply chain through responsive and flexible sourcing solutions."
        theme="arctic"
        primaryCta={{ label: "Send Your Requirement", href: "/contact" }}
      />

      <Section theme="frost">
        <FeatureGrid
          eyebrow="Consultancy Areas"
          heading="A Better Approach to Aviation Sourcing"
          items={consultancyAreas}
          columns={2}
        />
      </Section>

      <Section theme="arctic">
        <LabelChips
          eyebrow="Sourcing Requirements"
          heading="Flexible Solutions"
          labels={optionalAreas}
        />
        <p className="mt-6 text-[13px] italic text-steel">
          Support for individual parts, multi-line RFQs, recurring requirements, and difficult-to-source products.
        </p>
      </Section>

      {/* Graphite engagement process */}
      <Section theme="graphite">
        <ProcessSteps
          eyebrow="Engagement Structure"
          heading="A clear engagement path."
          steps={consultancyEngagement}
          dark
        />
      </Section>

      <RFQCTA
        heading="Your Requirement. Our Network."
        copy="Send us your aviation requirement and our team will review available sourcing options."
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
        microcopy={undefined}
      />
    </>
  );
}
