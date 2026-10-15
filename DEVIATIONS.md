# Deviations & Verification Log

This document records **every deviation** from
`premium_aviation_website_content_design_spec.md`, plus every placeholder that
must be **client-verified** before launch. The specification explicitly requires
that any deviation be recorded separately — this is that record.

Nothing here changes the *intent* of the spec; deviations were made either
because (a) a required real-world asset/fact was unavailable in this build
environment, or (b) the spec marked something optional/future, or (c) a
technically superior, spec-compliant alternative was chosen. Each item notes how
to bring it fully to spec.

---

## A. Deviations from the specification

### A1. Project scaffolding done manually (not `create-next-app`)
`create-next-app` refuses to run because the workspace folder name (`aviation 2.0`)
contains a space and is not an npm-valid package name. The Next.js project was
therefore scaffolded manually with equivalent config (App Router, TS, Tailwind,
ESLint). **Impact:** none functionally. The `package.json` name is
`aero-titanium-aviation`.

### A2. Brand name is a placeholder ("Aero Titanium")
Spec §75/§61 forbids inventing a company name. A working wordmark was still
required for the header/footer/titles, so the design-direction codename
**"Aero Titanium"** is used as an explicitly-marked placeholder.
**To fix:** set `company.name` / `company.wordmark` in `content/company.ts` to
the client-confirmed brand, and update page `<title>`s / metadata strings.

### A3. Photography replaced with premium CSS placeholder frames
Spec §14 calls for real cinematic aviation photography, and §61/§74 forbid
using unlicensed photos or low-quality AI imagery. No licensed assets were
available in this environment. Rather than ship generic/unlicensed stock, all
imagery uses the `TechnicalImage` component — a cinematically-graded CSS/SVG
placeholder frame with decorative technical annotations, clearly labelled as
provisional.
**To fix:** license high-resolution aviation photography (image asset checklist,
spec §63) and pass real `src` values / swap `TechnicalImage` for `next/image`.

### A4. No hero/atmospheric video
Spec §15 lists a hero background video as a "best use" (but says use video
sparingly and always provide an image fallback). No licensed footage was
available, so the hero uses an animated cinematic gradient/grid surface instead
of a video element.
**To fix:** add a compressed, muted, poster-backed hero video with the existing
visual as the reduced-motion / mobile fallback.

### A5. 3D component experience not implemented
Spec §17/§46 list React Three Fiber / Three.js as **optional** ("Use for one
significant experience only… Do not render 3D on every page"). To honour spec
§74.25 ("Do not install libraries that are not actually used") and the
performance targets, no 3D dependency was installed. The Engines & Parts
cinematic section instead uses an abstract CSS/SVG turbine visualization driven
by GSAP ScrollTrigger.
**To fix (optional):** add `three` + `@react-three/fiber`, lazy-load a
Draco-compressed turbine GLB into the Engines & Parts feature with a static
fallback.

### A6. Custom UI primitives instead of shadcn/ui + Base UI
Spec §17 recommends shadcn/ui and Base UI primitives. Bespoke, fully accessible
primitives (buttons, fields, select, file upload, mega-menu, dialog-style mobile
nav) were built instead, to keep the design bespoke and avoid unused-dependency
bloat (spec §74.25). All accessibility requirements (§49) are still met.
**Impact:** none functionally; can be migrated to shadcn/ui later if desired.

### A7. Page transition is an entry mask (not a full exit→mask→enter sequence)
Spec §23 describes a 5-step transition. The Next.js App Router does not natively
support route **exit** animations, so `PageTransition` implements a short
(~0.5s) titanium mask + fade **on entry** keyed to the pathname. It is disabled
under reduced motion. This preserves the spirit (subtle, <650ms) without
delaying navigation.

### A8. Tailwind CSS v4 (CSS-first tokens)
The design tokens from spec §69 are implemented via Tailwind v4's `@theme`
(CSS-first) rather than a `tailwind.config.js`. This is the current stable
approach (spec §17/§76 say to use current stable versions). All token values
match §69 exactly.

### A9. Fonts: Manrope + Inter
Spec §11 lists several options (Satoshi, Neue Montreal, Manrope, Inter, Geist,
General Sans). Manrope (display) and Inter (body) were chosen because both are in
the recommended list and available via `next/font/google` (self-hosted, no extra
dependency, good variable-font support).

### A10. Backend email delivery implemented
All forms now use `lib/server/form-mail.ts` and the configured server-side SMTP
environment. Success requires SMTP acceptance. RFQ/AOG references, submitted
fields, and attachments are included in the email; AOG uses subject `AOG Enquiry`.
CRM/Slack/SMS integrations are not implemented.

### A11. File uploads delivered by email; no virus scan
Attachments are validated for extension, MIME and size and sent from memory.
They are not retained in local storage. Virus scanning and an attachment archive
are not implemented; add private storage and scanning if required.

### A12. Cookie-consent panel not implemented
Spec §60 says a consent panel is needed **"if analytics or marketing cookies
require consent"**. No analytics or marketing cookies are currently loaded, so
no consent panel is shown.
**To fix:** add a branded, non-deceptive consent panel when analytics/marketing
tooling is introduced.

### A13. Turbopack disabled for builds
The build uses the stable webpack pipeline (`--no-turbopack` at scaffold) for
maximum reliability. Dev/build behaviour is otherwise standard.

---

## B. Spec-compliant omissions (called out to avoid ambiguity)

- **B1. Credibility metrics section (spec §24 §7):** Omitted entirely because no
  client-verified numbers exist — the spec instructs to omit the counter section
  rather than animate fake statistics. Re-enable by populating `verifiedMetrics`
  in `content/company.ts`.
- **B2. Optional/future pages (spec §5 items 17–23):** `/inventory`,
  `/aircraft`, `/insights`, `/case-studies`, `/certifications`, `/locations`,
  `/partners` are **not** built — they are listed as optional/future and several
  depend on unverified data or permissions.
- **B3. Contact map (spec §35):** Omitted per the spec's own guidance (include a
  map only when office directions add real value).
- **B4. `JobPosting` / `Article` structured data (spec §51):** Not emitted
  because there are no real vacancies or articles yet. Only Organization,
  WebSite, Service and BreadcrumbList schemas are output.
- **B5. Damp lease & optional consultancy areas:** Rendered but explicitly
  marked "if offered", per spec §29/§31, pending client confirmation.

---

## C. Placeholders requiring client verification (spec §62/§63)

All of the following are shown in the UI in a **visibly-provisional style** and
must be replaced with confirmed data before production launch:

- Company / brand name and legal entity name
- Address, phone, general email, parts email, AOG contact, RFQ email
- LinkedIn / social URLs
- Team members: names, titles, expertise labels, biographies, portraits,
  locations (`content/team.ts`, all `isPlaceholder: true`)
- Vision & mission statements (marked "client approval required")
- Any metrics / years of experience / markets / partners
- Certifications, OEM/MRO relationships, partner logos
- Office locations and specific geographic coverage
- Effective date & jurisdiction in Privacy / Terms (require legal review)
- Real career vacancies (none are published; no fake openings — spec §34)

---

## D. Where things live (for the client's developer)

| Concern | File |
| --- | --- |
| Brand, contact, values, metrics | `content/company.ts` |
| Services / process / categories | `content/services.ts` |
| Team | `content/team.ts` |
| Careers vacancies | `content/careers.ts` |
| Navigation & footer | `content/navigation.ts` |
| Design tokens | `app/globals.css` (`@theme`) |
| Form validation | `lib/validation/schemas.ts` |
| Submission handling / delivery | `lib/server/form-mail.ts` |
| SEO / structured data | `lib/seo/*` |
