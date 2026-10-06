/**
 * Leadership / team content (spec §26, §61, §62).
 *
 * IMPORTANT: Team names, titles, photographs and biographies are credibility
 * facts and MUST be provided/confirmed by the client. The entries below are
 * explicitly-marked PLACEHOLDERS (isPlaceholder: true) so the layout can be
 * built and reviewed without inventing real people. Replace before launch and
 * set isPlaceholder to false once client-verified.
 */

export type TeamMember = {
  name: string;
  role: string;
  expertise: string;
  bio: string;
  location?: string;
  linkedin?: string;
  isPlaceholder: boolean;
};

export const leadership: TeamMember[] = [
  {
    name: "[Full Name]",
    role: "[Role / Title]",
    expertise: "COMMERCIAL AVIATION / AIRCRAFT SALES / LEASING",
    bio: "Placeholder biography pending client confirmation. This space describes what the person actually does, their relevant aviation experience, technical or commercial specialization, major market experience, and their role at the company — written as 70–130 words of substantive detail rather than empty executive phrasing.",
    location: "[Location]",
    isPlaceholder: true,
  },
  {
    name: "[Full Name]",
    role: "[Role / Title]",
    expertise: "ENGINES & PARTS / TECHNICAL SOURCING / PROCUREMENT",
    bio: "Placeholder biography pending client confirmation. This space describes what the person actually does, their relevant aviation experience, technical or commercial specialization, major market experience, and their role at the company — written as 70–130 words of substantive detail rather than empty executive phrasing.",
    location: "[Location]",
    isPlaceholder: true,
  },
  {
    name: "[Full Name]",
    role: "[Role / Title]",
    expertise: "AVIATION CONSULTANCY / FLEET STRATEGY / TRANSACTIONS",
    bio: "Placeholder biography pending client confirmation. This space describes what the person actually does, their relevant aviation experience, technical or commercial specialization, major market experience, and their role at the company — written as 70–130 words of substantive detail rather than empty executive phrasing.",
    location: "[Location]",
    isPlaceholder: true,
  },
];
