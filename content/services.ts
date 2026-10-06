/**
 * Service / capability content (spec §24 §27–§31).
 *
 * NOTE (spec §28, §30, §31): Process steps, product categories and consultancy
 * areas must be trimmed to the client's actual service boundaries before launch.
 * Do not claim legal, engineering, inspection or certification services unless
 * the client confirms they are offered.
 */

export type Capability = {
  index: string;
  slug: string;
  title: string;
  href: string;
  short: string;
  overview: string;
};

export const capabilities: Capability[] = [
  {
    index: "01",
    slug: "aircraft-acquisition-sales",
    title: "Aircraft Acquisition & Sales",
    href: "/services/aircraft-acquisition-sales",
    short:
      "Strategic sourcing and remarketing of commercial aircraft and business jets, supported by technical evaluation and market intelligence.",
    overview:
      "Sourcing, transaction support and remarketing for commercial aircraft and business jets.",
  },
  {
    index: "02",
    slug: "aircraft-leasing",
    title: "Aircraft Leasing",
    href: "/services/aircraft-leasing",
    short:
      "Flexible dry, wet, ACMI and other structured leasing support aligned with operational, financial and fleet requirements.",
    overview:
      "Dry, wet, ACMI and other lease structures aligned with capacity, timeline and financial requirements.",
  },
  {
    index: "03",
    slug: "engines-parts",
    title: "Engines & Parts",
    href: "/services/engines-parts",
    short:
      "Northbridge supports a wide range of aviation product requirements for operators, MROs, distributors, and other aviation businesses.",
    overview:
      "Aircraft components, avionics, electrical products, engine-related parts, aviation hardware, consumables, expendables, and ground support equipment.",
  },
  {
    index: "04",
    slug: "aviation-consultancy",
    title: "Aviation Consultancy",
    href: "/services/aviation-consultancy",
    short:
      "Global sourcing and procurement support for individual parts, multi-line RFQs, recurring requirements, and difficult-to-source products.",
    overview:
      "From initial inquiry through purchase coordination, we help simplify the procurement process.",
  },
];

/** AOG is treated as an urgent capability, listed in the index but routed separately. */
export const aogCapability = {
  index: "05",
  title: "AOG Support",
  href: "/aog-support",
  short:
    "For time-sensitive requirements, we prioritize sourcing activity and communication to help identify available solutions quickly.",
  overview: "Priority sourcing support for AOG and other time-sensitive requirements.",
};

/* ------------------------------------------------------------------ */
/* Engines & Parts categories (spec §30)                               */
/* ------------------------------------------------------------------ */

export const partCategories = [
  {
    "title": "Aircraft Components",
    "items": [
      "Airframe components",
      "Mechanical components",
      "Hydraulic and pneumatic components"
    ]
  },
  {
    "title": "Avionics & Electrical",
    "items": [
      "Avionics, instruments, and sensors",
      "Switches, connectors, and electrical components"
    ]
  },
  {
    "title": "Engine Components",
    "items": [
      "Engine-related parts",
      "Accessories and components"
    ]
  },
  {
    "title": "Consumables",
    "items": [
      "Adhesives and lubricants",
      "Filters, seals, and O-rings",
      "Maintenance supplies"
    ]
  },
  {
    "title": "Expendables",
    "items": [
      "Gaskets, fasteners, bearings, and hardware"
    ]
  },
  {
    "title": "Aviation Hardware",
    "items": [
      "Specialized hardware and materials for aircraft maintenance and operations"
    ]
  },
  {
    "title": "Ground Support Equipment",
    "items": [
      "Equipment, tools, and supplies for maintenance and ground operations"
    ]
  },
  {
    "title": "Hard-to-Find Parts",
    "items": [
      "Additional sourcing channels for difficult-to-find aircraft parts and aviation products"
    ]
  }
];

export const partCategoryLabels = [
  "Aircraft Components",
  "Avionics & Electrical",
  "Engine Components",
  "Consumables",
  "Expendables",
  "Aviation Hardware",
  "Ground Support Equipment"
];

export const sourcingApproach = [
  {
    "index": "01",
    "title": "Your Requirement",
    "body": "From a single part number to a complete RFQ, we focus on availability, condition, documentation, delivery requirements, and competitive sourcing."
  },
  {
    "index": "02",
    "title": "Global Sourcing",
    "body": "We search domestic and international markets to identify sourcing opportunities that match your requirements."
  },
  {
    "index": "03",
    "title": "Responsible Sourcing",
    "body": "Our focus is supplier reliability, product information, documentation, traceability, and customer requirements."
  },
  {
    "index": "04",
    "title": "Procurement Support",
    "body": "From initial inquiry through purchase coordination, we help simplify the procurement process."
  },
  {
    "index": "05",
    "title": "Clear Communication",
    "body": "Product availability, pricing, lead times, condition, documentation, shipping, and other commercial terms are subject to confirmation through a formal quotation or order."
  }
];

export const engineLifecycleSupport = [
  "Commercial Aviation",
  "MRO",
  "Cargo Aviation",
  "Business Aviation",
  "General Aviation",
  "Aviation Distributors",
  "Ground Operations"
];

/* ------------------------------------------------------------------ */
/* Aircraft Acquisition & Sales (spec §28)                             */
/* ------------------------------------------------------------------ */

export const acquisitionSupport = [
  {
    title: "Business Jets",
    body: "Targeted sourcing and sales support for private, corporate and charter aviation requirements.",
  },
  {
    title: "Commercial Aircraft",
    body: "Aircraft sourcing and remarketing aligned with fleet, route, capacity and commercial objectives.",
  },
  {
    title: "Technical Review Coordination",
    body: "Support for evaluating available aircraft information, records, condition and transaction requirements.",
  },
  {
    title: "Market Access",
    body: "International market engagement to identify available aircraft and connect relevant transaction opportunities.",
  },
];

export const acquisitionProcess = [
  { index: "01", title: "Requirement", body: "Define aircraft type, mission, timeline and commercial parameters." },
  { index: "02", title: "Market Search", body: "Identify suitable aircraft and transaction opportunities." },
  { index: "03", title: "Initial Review", body: "Review available commercial and technical information." },
  { index: "04", title: "Due Diligence", body: "Coordinate deeper technical, documentation and commercial assessment." },
  { index: "05", title: "Negotiation", body: "Support commercial discussions and transaction structure." },
  { index: "06", title: "Closing / Delivery", body: "Coordinate final requirements through completion." },
];

/* ------------------------------------------------------------------ */
/* Aircraft Leasing (spec §29)                                         */
/* ------------------------------------------------------------------ */

export const leasingTypes = [
  {
    title: "Dry Lease",
    body: "Aircraft provided without crew, with operational responsibilities structured according to the lease arrangement.",
  },
  {
    title: "Wet Lease",
    body: "Aircraft and operational support provided according to agreed crew, maintenance and insurance arrangements.",
  },
  {
    title: "ACMI",
    body: "Aircraft, Crew, Maintenance and Insurance structures for operators requiring additional capacity or operational flexibility.",
  },
  {
    title: "Damp Lease",
    body: "Hybrid leasing arrangements structured around the specific operational responsibilities of the parties.",
    conditional: true,
  },
];

export const leasingSupportAreas = [
  "Lease requirement definition",
  "Market search",
  "Lease structuring",
  "Commercial negotiation support",
  "Short-term capacity",
  "Long-term fleet planning",
  "Lease transition support",
  "Lease-end / remarketing advisory",
];

export const leasingUseCases = [
  "Seasonal Capacity",
  "Fleet Transition",
  "Route Expansion",
  "Temporary Aircraft Replacement",
  "Growth Capacity",
  "Lease-End Planning",
];

/* ------------------------------------------------------------------ */
/* Aviation Consultancy (spec §31)                                     */
/* ------------------------------------------------------------------ */

export const consultancyAreas = [
  {
    "title": "Global Sourcing",
    "body": "We search domestic and international markets to identify sourcing opportunities that match your requirements."
  },
  {
    "title": "Procurement Support",
    "body": "From initial inquiry through purchase coordination, we help simplify the procurement process."
  },
  {
    "title": "Hard-to-Find Parts",
    "body": "When traditional supply channels come up short, we expand the search to identify additional sourcing opportunities."
  },
  {
    "title": "Multi-Line RFQs",
    "body": "Send us your complete parts list or RFQ, and our team will review your requirements."
  }
];

export const consultancyEngagement = [
  {
    "index": "01",
    "title": "Understand",
    "body": "Understand the requirement."
  },
  {
    "index": "02",
    "title": "Source",
    "body": "Find the right solution through domestic and international markets."
  },
  {
    "index": "03",
    "title": "Communicate",
    "body": "Communicate clearly throughout the sourcing process."
  },
  {
    "index": "04",
    "title": "Partner",
    "body": "Build relationships that last."
  }
];
