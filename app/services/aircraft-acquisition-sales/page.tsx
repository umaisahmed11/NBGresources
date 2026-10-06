import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { RFQCTA } from "@/components/sections/RFQCTA";
import { FeatureGrid, ProcessSteps } from "@/components/sections/ServiceBlocks";
import { acquisitionSupport, acquisitionProcess } from "@/content/services";
import { buildMetadata } from "@/lib/seo/config";
import { jsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Aircraft Acquisition & Sales | Northbridge Global Resources",
  description:
    "Aircraft acquisition and sales support across commercial and business aviation — from sourcing through delivery, backed by technical and commercial clarity.",
  path: "/services/aircraft-acquisition-sales",
});

export default function AircraftAcquisitionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema(
            "Aircraft Acquisition & Sales",
            "Sourcing, transaction support and remarketing for commercial aircraft and business jets.",
            "/services/aircraft-acquisition-sales",
          ),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Capabilities", path: "/services" },
            { name: "Aircraft Acquisition & Sales", path: "/services/aircraft-acquisition-sales" },
          ]),
        )}
      />

      <PageHero
        eyebrow="Capability / 01"
        heading="Aircraft decisions backed by technical and commercial clarity."
        copy="We support aircraft acquisition and sales requirements across commercial aviation and business aviation, helping clients identify suitable assets, evaluate opportunities and navigate transactions from sourcing through delivery."
        primaryCta={{ label: "Discuss an Aircraft Requirement", href: "/contact" }}
      />

      <Section theme="arctic">
        <FeatureGrid
          eyebrow="What We Support"
          heading="Support across the aircraft transaction."
          items={acquisitionSupport}
          columns={2}
        />
      </Section>

      <Section theme="frost">
        <ProcessSteps
          eyebrow="Process"
          heading="A structured path from requirement to delivery."
          steps={acquisitionProcess}
          note="This process is adapted to the client's actual service boundaries. Legal, engineering and inspection services are only offered where explicitly confirmed."
        />
      </Section>

      <RFQCTA
        heading="Looking to acquire or remarket an aircraft?"
        copy="Start a confidential conversation about your aircraft requirement."
        secondaryLabel="Discuss a Requirement"
        secondaryHref="/contact"
        microcopy={undefined}
      />
    </>
  );
}
