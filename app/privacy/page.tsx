import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Northbridge Global Resources",
  description: "How information submitted through this website is collected, used and protected.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Privacy"
      title="Privacy Policy"
      intro="Northbridge Global Resources respects the privacy of our customers, suppliers, partners, and website visitors."
      sections={[
  {
    "heading": "Use of Information",
    "body": [
      "Information submitted through our website may be used to respond to inquiries, process RFQs, manage business relationships, improve our services, and support legitimate business activities."
    ]
  },
  {
    "heading": "Responsible Information Handling",
    "body": [
      "We are committed to handling personal and business information responsibly and in accordance with applicable requirements."
    ]
  },
  {
    "heading": "Publication Review",
    "body": [
      "A complete Privacy Policy should be legally reviewed before publication."
    ]
  }
]}
    />
  );
}
