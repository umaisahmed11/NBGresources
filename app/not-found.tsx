import { Container } from "@/components/layout/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

/** Custom 404 page (spec §59). Dark, tasteful, technical. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-carbon pt-[120px] pb-24 text-text-light">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #397a99 0%, transparent 70%)" }}
      />
      <Container className="relative">
        <p className="font-display text-[120px] font-semibold leading-none tracking-[-0.04em] text-text-light sm:text-[180px] lg:text-[220px]">
          404
        </p>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-glacier">
          Route / Not Found
        </p>
        <p className="mt-6 max-w-[40ch] text-[18px] leading-relaxed text-text-muted-dark">
          This page is no longer on the flight plan.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PrimaryButton href="/">Return Home</PrimaryButton>
          <SecondaryButton href="/request-rfq">Request RFQ</SecondaryButton>
        </div>
      </Container>
    </section>
  );
}
