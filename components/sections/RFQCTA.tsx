import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

/**
 * Final RFQ call-to-action band (spec §24 Section 10).
 * Calm, dark, minimal — the closing chapter of a page sequence.
 */
export function RFQCTA({
  heading = "Need a Part? Let's Find It.",
  copy = "Send us your aviation requirement and our team will review available sourcing options.",
  microcopy = "Have multiple parts? Upload your complete RFQ or parts list and we'll review it.",
  secondaryHref = "/contact",
  secondaryLabel = "Contact Us",
}: {
  heading?: string;
  copy?: string;
  microcopy?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-graphite py-[72px] text-text-light md:py-[110px] lg:py-[160px]">
      <div
        aria-hidden
        className="absolute right-[-10%] top-1/2 h-[50vh] w-[50vh] -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, #397a99 0%, transparent 70%)" }}
      />
      <Container>
        <Reveal className="relative max-w-[760px]">
          <h2 className="font-display text-[34px] font-medium leading-[1.03] tracking-[-0.035em] sm:text-[48px] lg:text-[60px]">
            {heading}
          </h2>
          <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-text-muted-dark sm:text-[19px]">
            {copy}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton href="/request-rfq">Request a Quote</PrimaryButton>
            <SecondaryButton href={secondaryHref}>{secondaryLabel}</SecondaryButton>
          </div>
          {microcopy ? (
            <p className="mt-8 text-[13px] text-slate">{microcopy}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
