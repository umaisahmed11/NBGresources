import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

/**
 * AOG feature band (spec §24 Section 9, §7 urgent CTA).
 * Carbon background, soft amber status dot, very large "AOG", minimal interface.
 * No emergency red, sirens or flashing (spec §24 design rules, §49 not
 * relying on colour alone — the status is labelled in text too).
 */
export function AOGBanner() {
  return (
    <section className="relative overflow-hidden bg-carbon py-[72px] text-text-light md:py-[110px] lg:py-[150px]">
      {/* Ambient amber glow, very restrained */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[40vh] w-[40vh] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #D9A65A 0%, transparent 70%)" }}
      />
      <Container>
        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full bg-aog shadow-[0_0_16px_2px_rgba(217,166,90,0.6)]"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-aog">
                AOG / Time Critical
              </span>
            </div>
            <p className="mt-6 font-display text-[80px] font-semibold leading-none tracking-[-0.04em] text-text-light sm:text-[120px] lg:text-[160px]">
              AOG
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-[30px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[40px] lg:text-[48px]">
              When Every
              <br />
              Minute Matters
            </h2>
            <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-text-muted-dark sm:text-[18px]">
              Northbridge provides priority sourcing support for AOG and other time-sensitive requirements, working to identify available supply options as quickly as possible.
            </p>
            <Link
              href="/aog-support"
              data-cursor="OPEN"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-aog/60 bg-aog/10 px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-aog transition-colors duration-200 hover:bg-aog/20"
            >
              Submit an Urgent RFQ
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
