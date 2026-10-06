import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderValue } from "@/components/ui/Placeholder";
import { company } from "@/content/company";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Contact | Northbridge Global Resources",
  description:
    "Whether you're looking for an aircraft part, submitting an RFQ, exploring a supplier relationship, or simply want to learn more about Northbridge, our team is ready to help.",
  path: "/contact",
});

const contactBlocks = [
  { label: "Address", value: company.contact.address },
  { label: "Phone", value: company.contact.phone },
  { label: "General Email", value: company.contact.generalEmail },
  { label: "Parts Email", value: company.contact.partsEmail },
  { label: "AOG Contact", value: company.contact.aogContact },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-arctic pt-[120px] pb-16 text-text-dark md:pt-[150px]">
        <Container>
          <div className="max-w-[760px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-deepice">Contact</p>
            <h1 className="mt-6 font-display text-[42px] font-medium leading-[1.0] tracking-[-0.04em] sm:text-[58px] lg:text-[68px]">
              Let’s Connect
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed text-steel sm:text-[19px]">
              Whether you’re looking for an aircraft part, submitting an RFQ, exploring a supplier relationship, or simply want to learn more about Northbridge, our team is ready to help.
            </p>
          </div>
        </Container>
      </section>

      <Section theme="frost" className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-steel">
              Northbridge Global Resources
            </p>
            <dl className="mt-8 space-y-6">
              {contactBlocks.map((block) => (
                <div key={block.label} className="border-b border-silver pb-5">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate">
                    {block.label}
                  </dt>
                  <dd className="mt-2 text-[16px] text-text-dark">
                    <PlaceholderValue value={block.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[13px] italic text-steel">
              Become a Northbridge Supplier. Strong supplier relationships are at the heart of our sourcing network. Northbridge welcomes opportunities to work with aviation manufacturers, distributors, parts suppliers, MROs, equipment providers, and other qualified aviation businesses. If your company is interested in becoming part of the Northbridge supplier network, we’d like to hear from you. Please send your details using the contact form.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-silver bg-white p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
