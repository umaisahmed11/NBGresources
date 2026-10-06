import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Request Received | Northbridge Global Resources",
    description: "Your requirement has been submitted successfully.",
    path: "/thank-you",
  }),
  robots: { index: false, follow: false },
};

/** Successful inquiry / RFQ submission (spec §33 success state). */
export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; type?: string }>;
}) {
  const { ref, type } = await searchParams;
  const isAog = type === "aog";
  const reference = ref ?? "RFQ-XXXXXX";

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-carbon pt-[120px] pb-24 text-text-light">
      <div
        aria-hidden
        className="absolute right-[-5%] top-[15%] h-[50vh] w-[50vh] rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, #397a99 0%, transparent 70%)" }}
      />
      <Container className="relative">
        <div className="max-w-[680px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-glacier">
            {isAog ? "AOG Request Received" : "Request Received"}
          </p>
          <h1 className="mt-6 font-display text-[42px] font-medium leading-[1.0] tracking-[-0.04em] sm:text-[58px] lg:text-[68px]">
            Thank you.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-text-muted-dark sm:text-[19px]">
            Your requirement has been submitted successfully. Our team will
            review the information provided and contact you using the details
            submitted.
          </p>

          <div className="mt-10 inline-flex flex-col gap-1 rounded-2xl border border-white/10 bg-titanium/60 px-6 py-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate">
              Reference
            </span>
            <span className="font-display text-[26px] font-medium tracking-tight text-ice">
              {reference}
            </span>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton href="/">Return Home</PrimaryButton>
            <SecondaryButton href="/request-rfq">New Request</SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
