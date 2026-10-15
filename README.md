# Aero Titanium — Premium Aviation Website

A production-quality, premium aviation parts/services website built from
`premium_aviation_website_content_design_spec.md`. It follows the **Aero
Titanium** design direction: restrained, free-flowing, cinematic and
technically precise.

> Brand name, contact details, team, metrics and other credibility facts are
> intentionally **placeholders** pending client confirmation. See
> [`DEVIATIONS.md`](./DEVIATIONS.md) for a full record of every deviation from
> the specification and every item that must be verified before launch.

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** (CSS-first design tokens)
- **Motion** (reveals, menus, transitions), **GSAP + ScrollTrigger** (engine
  scroll sequence), **Lenis** (smooth scroll)
- **Zod** (form + API validation)
- **Lucide** icons

## Getting Started

```bash
npm ci
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

### Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server            |
| `npm run build` | Oxlint, TypeScript, then production build |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Oxlint; warnings fail the check |

## Project Structure

```
app/                 Routes (Home, About, Team, Services, AOG, RFQ, Contact, …)
  api/               RFQ / AOG / Contact / Careers submission endpoints
components/
  layout/            Container, Section
  navigation/        Header, MegaMenu, MobileNavigation, Footer
  motion/            MotionProvider, SmoothScroll, Reveal, CustomCursor, PageTransition
  sections/          Hero, CapabilityList, EngineFeature, GlobalNetwork, …
  forms/             RFQ, AOG, Contact, Careers, Parts quick form + fields
  ui/                Typography, Button, TechnicalImage, Placeholder
content/             Editable content data (company, services, team, careers, navigation)
lib/                 utils, validation (Zod), seo, server (SMTP form delivery)
```

## Forms & Submissions

RFQ (including Parts quick enquiries), AOG, Contact and Careers forms use the
shared SMTP handler in `lib/server/form-mail.ts`. Inputs and attachments are
validated server-side, then all submitted fields and attachments are emailed to
`CONTACT_TO_EMAIL`. Attachments are handled in memory, without local storage.
All forms use the same authenticated sender and visitor reply-to. AOG enquiries
use the exact subject `AOG Enquiry`; other subjects are `New website enquiry from {name}`.
Success requires SMTP acceptance. See [SMTP setup and verification](docs/contact-smtp.md).

## Accessibility & Performance

- Respects `prefers-reduced-motion` and an app-level reduced-motion state.
- Semantic headings, labelled inputs, visible focus, skip link, focus-managed
  mobile menu.
- Transform/opacity-only animations; GSAP ScrollTrigger cleaned up on unmount.

## Deployment

The canonical domain is `https://nbgresources.com`, configured in `lib/seo/config.ts` for sharing metadata, canonical links, structured data, and sitemaps. Rebuild and redeploy after changing it. Configure the six SMTP environment variables in the running server process and use hosting that permits outbound SMTP. See `docs/contact-smtp.md`; attachments require no local storage.

### Runtime and quality checks

Use Node.js **22.23.3** (also pinned in `.nvmrc`) for development, CI, and deployment. The manifest requires a compatible patched Node 22 runtime. If your system uses an older Node version, switch runtimes before running `npm ci`.

- `npm run lint`: native Oxlint rules migrated from the Next.js ESLint presets, with zero warnings allowed.
- `npm run typecheck`: TypeScript compiler checks.
- `npm run build`: runs both checks before Next.js. Hosting must use this command, not `next build` directly.
- `npm audit` and `npm audit --omit=dev`: development and production dependency advisory checks.

See [SECURITY-MIGRATION.md](./SECURITY-MIGRATION.md) for the migration scope and lint coverage differences.

The typecheck command clears stale generated route types in .next/types, regenerates them with Next.js, then runs TypeScript. This prevents cached types for removed pages from breaking deployment. Use npm run build as the deployment build command.
