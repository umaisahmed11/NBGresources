import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions | Northbridge Global Resources",
  description: "The terms governing use of this website and the information it contains.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal / Terms"
      title="Terms &amp; Conditions"
      intro="Information provided on this website is for general business and informational purposes."
      sections={[
  {
    "heading": "Commercial Terms",
    "body": [
      "Product availability, pricing, lead times, condition, documentation, shipping, and other commercial terms are subject to confirmation through a formal quotation or order."
    ]
  },
  {
    "heading": "Website Information",
    "body": [
      "Website content does not represent a guarantee of product availability, manufacturer authorization, regulatory approval, certification, or contractual commitment unless confirmed in writing by Northbridge Global Resources."
    ]
  },
  {
    "heading": "Individual Transactions",
    "body": [
      "Individual transactions may be subject to additional terms and conditions."
    ]
  },
  {
    "heading": "Publication Review",
    "body": [
      "Final Terms & Conditions should be legally reviewed before publication."
    ]
  }
]}
    />
  );
}
