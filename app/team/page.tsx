import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { RFQCTA } from "@/components/sections/RFQCTA";
import { Reveal } from "@/components/motion/Reveal";
import { TechnicalImage } from "@/components/ui/TechnicalImage";
import { leadership } from "@/content/team";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Leadership | Northbridge Global Resources",
  description:
    "Aviation experience across operations, technical knowledge, commercial and international market understanding.",
  path: "/team",
});

export default function TeamPage() {
  const placeholders = leadership.some((m) => m.isPlaceholder);

  return (
    <>
      <PageHero
        eyebrow="People / Leadership"
        heading="Aviation experience behind every decision."
        copy="Our team combines operational, technical and commercial aviation experience across aircraft transactions, leasing, parts, maintenance coordination and strategic advisory."
      />

      <Section theme="arctic">
        {placeholders ? (
          <div className="mb-14 rounded-2xl border border-dashed border-silver bg-frost p-6 text-[14px] text-steel">
            <span className="font-medium text-text-dark">Provisional content:</span>{" "}
            Team names, titles, portraits and biographies are shown as placeholders
            and must be replaced with client-verified details before launch
            (spec §26, §62). Layout and structure are production-ready.
          </div>
        ) : null}

        <div className="space-y-20 lg:space-y-28">
          {leadership.map((member, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={i}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    reverse ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <TechnicalImage
                    tone={i % 2 === 0 ? "titanium" : "carbon"}
                    aspect="aspect-[4/5]"
                    label="Leadership"
                    caption="EDITORIAL PORTRAIT / PLACEHOLDER"
                    className="max-w-[440px]"
                  />
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-deepice">
                      {member.expertise}
                    </p>
                    <h2 className="mt-4 font-display text-[30px] font-medium tracking-tight text-text-dark sm:text-[38px]">
                      {member.name}
                    </h2>
                    <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.14em] text-steel">
                      {member.role}
                    </p>
                    <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-steel">
                      {member.bio}
                    </p>
                    {member.location ? (
                      <p className="mt-4 text-[13px] text-steel">
                        <span className="uppercase tracking-[0.12em] text-slate">Location · </span>
                        {member.location}
                      </p>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <RFQCTA
        heading="Work with a team that understands aviation."
        copy="Discuss an aircraft, engine, component, leasing or advisory requirement with our team."
        microcopy={undefined}
      />
    </>
  );
}
