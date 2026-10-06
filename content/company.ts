/**
 * Company-level content and brand configuration.
 *
 * IMPORTANT (spec §75, §61, §62): No factual credibility claim (company name,
 * years of experience, certifications, locations, partnerships, contact details,
 * metrics) may be presented as fact until confirmed by the client.
 *
 * Every value below marked `PLACEHOLDER` must be replaced with client-verified
 * data before production launch. Placeholders are intentionally rendered in a
 * visibly-provisional style in the UI so they cannot be mistaken for real data.
 */

export const company = {
  /** Brand name. */
  name: "Northbridge Global Resources",
  /** Short wordmark used in the logo lockup. */
  wordmark: "NORTHBRIDGE RESOURCES",
  legalName: "Northbridge Global Resources",
  year: new Date().getFullYear(),

  /** Primary brand statement (spec §3). One line chosen; alternatives kept in messaging. */
  tagline: "Connecting Aviation. Delivering Solutions.",

  supportingStatement:
    "Northbridge Global Resources provides aviation parts sourcing, procurement, and supply-chain solutions to customers across global markets. From everyday requirements to hard-to-find and time-sensitive components, we help connect aviation businesses with reliable supply sources around the world.",

  /** Contact placeholders (spec §35). Replace with client-confirmed details. */
  contact: {
    address: "228 Park Ave S #162377, New York, NY 10003",
    phone: "[MAIN PHONE]",
    generalEmail: "[GENERAL EMAIL]",
    partsEmail: "[PARTS EMAIL]",
    aogContact: "[AOG CONTACT]",
    rfqEmail: "[RFQ EMAIL]",
  },

  social: {
    linkedin: "[LINKEDIN URL]",
  },
} as const;

/** Alternative brand statements retained for client selection (spec §3). */
export const brandStatementAlternatives = [
  "Aviation, engineered around your operation.",
  "Built around uptime. Driven by precision.",
  "Global aviation support. Delivered with precision.",
  "Smarter aviation decisions. Stronger operations.",
  "Where aviation capability meets commercial clarity.",
] as const;

export const brandValues = [
  "Integrity",
  "Precision",
  "Accountability",
  "Responsiveness",
  "Expertise",
  "Long-term Partnerships",
] as const;

export const aboutApproach = [
  {
    "title": "Supplier Reliability",
    "body": "Northbridge is committed to responsible sourcing practices with a focus on supplier reliability and customer requirements."
  },
  {
    "title": "Product Information",
    "body": "Quality and documentation matter at every stage of aviation procurement."
  },
  {
    "title": "Documentation & Traceability",
    "body": "Our sourcing approach focuses on product information, documentation, and traceability."
  },
  {
    "title": "Clear Communication",
    "body": "We believe clear communication and transparency are essential to building trusted, long-term aviation partnerships."
  }
] as const;

export const whyUsPillars = [
  {
    "title": "Global Reach",
    "body": "Access to expanding domestic and international sourcing channels."
  },
  {
    "title": "Responsive Service",
    "body": "Clear and timely communication throughout the sourcing process."
  },
  {
    "title": "Flexible Solutions",
    "body": "Support for individual parts, multi-line RFQs, recurring requirements, and difficult-to-source products."
  },
  {
    "title": "Customer Focus",
    "body": "Every requirement is different. We tailor our sourcing approach accordingly. Our goal is to build lasting relationships with customers and suppliers around the world."
  }
] as const;

/**
 * Metrics are intentionally NOT published (spec §7 credibility, §24 Section 7).
 * Every metric must be client-verified. Populate this array only with confirmed
 * numbers; until then the credibility counter section is omitted entirely.
 */
export const verifiedMetrics: { value: string; label: string }[] = [];
