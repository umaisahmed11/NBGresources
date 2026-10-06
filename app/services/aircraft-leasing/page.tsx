import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { RFQCTA } from "@/components/sections/RFQCTA";
import { FeatureGrid, SupportList, LabelChips } from "@/components/sections/ServiceBlocks";
import { leasingTypes, leasingSupportAreas, leasingUseCases } from "@/content/services";
import { buildMetadata } from "@/lib/seo/config";
import { jsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Aircraft Leasing | Northbridge Global Resources",
  description:
    "Aircraft leasing support across dry, wet, ACMI and structured arrangements — aligned with capacity, timeline and financial requirements.",
  path: "/services/aircraft-leasing",
});

export default function AircraftLeasingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema(
            "Aircraft Leasing",
            "Dry, wet, ACMI and other lease structures aligned with capacity, timeline and financial requirements.",
            "/services/aircraft-leasing",
          ),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Capabilities", path: "/services" },
            { name: "Aircraft Leasing", path: "/services/aircraft-leasing" },
          ]),
        )}
      />

      <PageHero
        eyebrow="Capability / 02"
        heading="Flexible aircraft capacity. Structured around the operation."
        copy="We support aircraft leasing requirements with commercial and operational guidance across short- and long-term structures."
        theme="graphite"
        primaryCta={{ label: "Discuss a Leasing Requirement", href: "/contact" }}
      />

      <Section theme="arctic">
        <FeatureGrid
          eyebrow="Leasing Types"
          heading="Structures aligned with operational responsibility."
          items={leasingTypes}
          columns={2}
        />
        <p className="mt-6 text-[13px] italic text-steel">
          Damp lease and any other structure is published only where the client
          actually offers or supports it.
        </p>
      </Section>

      <Section theme="frost">
        <SupportList eyebrow="Support Areas" heading="Where we support the lease lifecycle." items={leasingSupportAreas} />
      </Section>

      <Section theme="graphite">
        <LabelChips eyebrow="Use Cases" heading="Common leasing scenarios." labels={leasingUseCases} dark />
      </Section>

      <RFQCTA
        heading="Need aircraft capacity?"
        copy="Discuss your leasing requirement with our team."
        secondaryLabel="Discuss a Requirement"
        secondaryHref="/contact"
        microcopy={undefined}
      />
    </>
  );
}
