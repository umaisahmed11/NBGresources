/** Global navigation model (spec §6). */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  index?: string;
};

export const companyLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const capabilityLinks: NavLink[] = [
  {
    label: "Aircraft Acquisition & Sales",
    href: "/services/aircraft-acquisition-sales",
    index: "01",
    description: "Sourcing, transaction support and remarketing.",
  },
  {
    label: "Aircraft Leasing",
    href: "/services/aircraft-leasing",
    index: "02",
    description: "Dry, wet, ACMI and structured lease support.",
  },
  {
    label: "Engines & Parts",
    href: "/services/engines-parts",
    index: "03",
    description: "Global sourcing across engines and components.",
  },
  {
    label: "Aviation Consultancy",
    href: "/services/aviation-consultancy",
    index: "04",
    description: "Fleet, transaction and operational strategy.",
  },
  {
    label: "AOG Support",
    href: "/aog-support",
    index: "05",
    description: "Time-critical aircraft-on-ground coordination.",
  },
];

/** Footer column model (spec §38). */
export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
  capabilities: [
    { label: "Aircraft Acquisition & Sales", href: "/services/aircraft-acquisition-sales" },
    { label: "Aircraft Leasing", href: "/services/aircraft-leasing" },
    { label: "Engines & Parts", href: "/services/engines-parts" },
    { label: "Aviation Consultancy", href: "/services/aviation-consultancy" },
    { label: "AOG Support", href: "/aog-support" },
  ],
  support: [
    { label: "Request RFQ", href: "/request-rfq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
