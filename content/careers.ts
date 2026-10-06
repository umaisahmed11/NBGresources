/**
 * Careers content (spec §34, §61).
 *
 * IMPORTANT: "Do not publish fake openings." `openRoles` is intentionally empty
 * until the client provides real vacancies. The page renders a graceful
 * "no current openings" state plus a speculative application form.
 */

export type Role = {
  slug: string;
  title: string;
  location: string;
  department: string;
  employmentType: string;
  description: string;
  responsibilities: string[];
  requiredExperience: string[];
  preferredExperience: string[];
  compensation: string;
};

/** Populate only with client-confirmed vacancies. */
export const openRoles: Role[] = [];
