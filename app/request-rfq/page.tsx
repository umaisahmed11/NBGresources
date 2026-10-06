import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { RFQForm } from "@/components/forms/RFQForm";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Request RFQ | Northbridge Global Resources",
  description:
    "Send us your aviation requirement or upload a complete RFQ or parts list for review.",
  path: "/request-rfq",
});

/** Request RFQ page (spec §33). Light, functional, minimal distractions. */
export default function RequestRFQPage() {
  return (
    <section className="min-h-screen bg-arctic pt-[120px] pb-24 text-text-dark md:pt-[150px]">
      <Container>
        <div className="max-w-[760px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-deepice">
            Request / RFQ
          </p>
          <h1 className="mt-6 font-display text-[42px] font-medium leading-[1.0] tracking-[-0.04em] sm:text-[58px] lg:text-[68px]">
            Need a Part? Let’s Find It.
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-steel sm:text-[19px]">
            Send us your aviation requirement and our team will review available sourcing options. For faster service, include the part number, description, manufacturer, quantity, condition, documentation requirements, required date, and delivery location. Have multiple parts? Include these details in your complete RFQ or parts list and upload it with your request.
          </p>
        </div>

        <div className="mt-14 max-w-[900px]">
          <RFQForm />
        </div>
      </Container>
    </section>
  );
}
