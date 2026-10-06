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
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

### Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server            |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | ESLint (next/core-web-vitals)   |

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
lib/                 utils, validation (Zod), seo, server (submissions)
```

## Forms & Submissions

RFQ, AOG, Contact and Careers forms are validated client-side (Zod) and
re-validated server-side. Uploads are validated (extension, MIME, size), given a
safe generated filename, and written to a **private, gitignored `uploads/`**
directory. Each submission creates a structured record (spec §54/§55) that is
currently logged/appended to `uploads/submissions.jsonl`. Wire `deliverRecord`
in `lib/server/submissions.ts` to email/CRM/messaging when the client approves.

## Accessibility & Performance

- Respects `prefers-reduced-motion` and an app-level reduced-motion state.
- Semantic headings, labelled inputs, visible focus, skip link, focus-managed
  mobile menu.
- Transform/opacity-only animations; GSAP ScrollTrigger cleaned up on unmount.

## Deployment

Compatible with Vercel. Set `NEXT_PUBLIC_SITE_URL` and any future integration
secrets as environment variables. Note the local filesystem `uploads/`
directory is for development; use private object storage (signed URLs) in
production (spec §56).
