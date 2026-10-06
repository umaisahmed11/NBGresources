import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { RFQCTA } from "@/components/sections/RFQCTA";
import { Reveal } from "@/components/motion/Reveal";
import { TechnicalImage } from "@/components/ui/TechnicalImage";
import { capabilities, aogCapability } from "@/content/services";
import { buildMetadata } from "@/lib/seo/config";
import { jsonLd, allServicesSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities | Northbridge Global Resources",
  description:
    "Responsive aviation sourcing, procurement support, hard-to-find parts, multi-line RFQs, and urgent requirements.",
  path: "/services",
});

const tones = ["engine", "titanium", "glacier", "carbon"] as const;

export default function ServicesPage() {
  return (
    <>
      {allServicesSchema().map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(schema)}
        />
      ))}

      <PageHero
        eyebrow="Capabilities"
        heading="Aviation Sourcing Made Simple"
        copy="Northbridge helps customers navigate the aviation supply chain through responsive and flexible sourcing solutions."
      />

      <Section theme="arctic">
        <div className="space-y-16 lg:space-y-24">
          {capabilities.map((cap, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={cap.slug}>
                <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className={reverse ? "lg:order-2" : ""}>
                    <TechnicalImage
                      tone={tones[i % tones.length]}
                      aspect="aspect-[16/11]"
                      label={`Capability / ${cap.index}`}
                      detail={cap.title}
                    />
                  </div>
                  <div className={reverse ? "lg:order-1" : ""}>
                    <span className="font-display text-sm text-steel">{cap.index} / 05</span>
                    <h2 className="mt-3 font-display text-[28px] font-medium tracking-tight text-text-dark sm:text-[38px]">
                      {cap.title}
                    </h2>
                    <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-steel sm:text-[17px]">
                      {cap.short}
                    </p>
                    <Link
                      href={cap.href}
                      data-cursor="VIEW"
                      className="group mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-deepice transition-colors hover:text-glacier"
                    >
                      <span className="relative">
                        Explore capability
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}

          {/* AOG entry */}
          <Reveal>
            <article className="grid items-center gap-8 rounded-2xl border border-silver bg-frost p-8 lg:grid-cols-2 lg:gap-16 lg:p-12">
              <div>
                <span className="font-display text-sm text-steel">{aogCapability.index} / 05</span>
                <h2 className="mt-3 font-display text-[28px] font-medium tracking-tight text-text-dark sm:text-[38px]">
                  {aogCapability.title}
                </h2>
                <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-steel sm:text-[17px]">
                  {aogCapability.short}
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Link
                  href={aogCapability.href}
                  data-cursor="OPEN"
                  className="inline-flex items-center gap-2 rounded-full border border-aog/50 bg-aog/10 px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-[#9a6f2a] transition-colors hover:bg-aog/20"
                >
                  Submit an Urgent RFQ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      <RFQCTA />
    </>
  );
}
