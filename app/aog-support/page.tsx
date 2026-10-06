import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AOGForm } from "@/components/forms/AOGForm";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "AOG Support | Northbridge Global Resources",
  description:
    "Time-critical aircraft-on-ground support. Submit your AOG requirement with the available part, aircraft and delivery information.",
  path: "/aog-support",
});

/**
 * AOG Support page (spec §32).
 * A visitor with an aircraft on ground reaches the form immediately — no
 * marketing scroll first. Form is visible within the first viewport on desktop.
 */
export default function AOGSupportPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-carbon pt-[120px] pb-24 text-text-light md:pt-[150px]">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[40vh] w-[70vw] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #D9A65A 0%, transparent 70%)" }}
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full bg-aog shadow-[0_0_16px_2px_rgba(217,166,90,0.6)]"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-aog">
                AOG Support / Urgent Requirement
              </span>
            </div>
            <h1 className="mt-6 font-display text-[42px] font-medium leading-[1.0] tracking-[-0.04em] sm:text-[56px] lg:text-[68px]">
              When Every Minute Matters
            </h1>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-text-muted-dark sm:text-[18px]">
              Urgent aviation requirements demand fast action and clear communication. Northbridge provides priority sourcing support for AOG and other time-sensitive requirements, working to identify available supply options as quickly as possible.
            </p>
            <p className="mt-8 text-[13px] text-slate">
              Provide the part number, quantity, location, and required delivery timeline so our team can begin the sourcing process.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-titanium/60 p-6 backdrop-blur-sm sm:p-8">
            <AOGForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
