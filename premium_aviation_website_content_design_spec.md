# Premium Aviation Website — Content, Page Architecture & Design Specification

> **Purpose of this document**  
> This file is intended to be used as a complete content and design specification for building a premium aviation parts/services website.
>
> **Content reference:** The service structure and subject matter were derived from the current public content of **American Aeronex (americanaeronex.com)**. The wording below is intentionally rewritten and reorganized rather than copied.  
> **Design reference:** Do **not** reproduce American Aeronex's visual design. The design must follow the premium **Aero Titanium** direction described in this specification: restrained, free-flowing, cinematic, technically precise, and comparable in polish to premium technology and automotive websites.
>
> **Important:** Any factual claim about the client's business—years of experience, certifications, locations, partnerships, OEM relationships, stock levels, response times, customer names, testimonials, team biographies, etc.—must be confirmed by the client before publication. Never invent credibility claims.

---

# 1. Website Objective

The website should position the company as a **premium, globally capable aviation partner** rather than as a generic spare-parts seller.

The visitor should quickly understand that the company can support aviation businesses in areas such as:

- Aircraft acquisition and sales
- Aircraft leasing
- Engine and aircraft parts sourcing/trading
- AOG and urgent aviation support
- Aviation consultancy
- Fleet and transaction advisory
- Procurement and sourcing
- Commercial aviation support
- Business aviation support
- Technical coordination
- Global aviation network access

The website must communicate four qualities above everything else:

1. **Precision**
2. **Trust**
3. **Operational capability**
4. **Global reach**

The visual experience should feel expensive and confident, but never flashy for the sake of being flashy.

---

# 2. Core Brand Positioning

## Recommended Brand Personality

The company should feel:

- Premium
- Precise
- Experienced
- Calm
- Highly technical
- International
- Trustworthy
- Responsive
- Commercially intelligent
- Operationally competent

Avoid making the company feel:

- Like a startup SaaS landing page
- Like a flight school
- Like a travel agency
- Like a military-themed website
- Like a generic logistics company
- Like a low-cost aircraft-parts marketplace
- Overly futuristic
- Overly aggressive
- Overly animated

---

# 3. Recommended Brand Messaging Direction

The current American Aeronex content revolves around intelligent aviation decisions, asset value, aircraft transactions, leasing, engine/parts trading, and strategic consultancy.

For this website, the language should be simplified and strengthened.

## Primary Brand Statement

**Precision that keeps aviation moving.**

Alternative options:

- **Aviation, engineered around your operation.**
- **Built around uptime. Driven by precision.**
- **Global aviation support. Delivered with precision.**
- **Smarter aviation decisions. Stronger operations.**
- **Where aviation capability meets commercial clarity.**

Choose one final line after the client's brand identity is confirmed.

## Supporting Statement

> Aircraft, engines, parts, leasing and aviation support delivered through technical expertise, market intelligence and a trusted global network.

---

# 4. Primary Audiences

Design and content decisions should be made for professional B2B users such as:

- Airlines
- Aircraft operators
- Lessors
- MRO organizations
- Charter companies
- Corporate flight departments
- Business jet operators
- Aircraft owners
- Aviation brokers
- Procurement teams
- Technical departments
- Maintenance departments
- Fleet planning teams
- Aviation investors
- Government or institutional aviation buyers, where applicable

The site should assume that many visitors already understand aviation terminology.

Do not over-explain standard industry terms, but provide enough context for commercial decision-makers who may not be engineers.

---

# 5. Complete Website Sitemap

## Primary Pages

1. `/` — Home
2. `/about` — About
3. `/team` — Leadership / Team
4. `/services` — Services Overview
5. `/services/aircraft-acquisition-sales` — Aircraft Acquisition & Sales
6. `/services/aircraft-leasing` — Aircraft Leasing
7. `/services/engines-parts` — Engines & Parts
8. `/services/aviation-consultancy` — Aviation Consultancy
9. `/aog-support` — AOG Support
10. `/request-rfq` — Request for Quote
11. `/careers` — Careers
12. `/contact` — Contact
13. `/privacy` — Privacy Policy

## Recommended Supporting Pages

14. `/terms` — Terms of Use
15. `/thank-you` — Successful Inquiry / RFQ Submission
16. `/404` — Custom Not Found Page

## Optional Future Pages

17. `/inventory` — Searchable Parts Inventory
18. `/aircraft` — Aircraft Available for Sale or Lease
19. `/insights` — Aviation Market Insights / Articles
20. `/case-studies` — Client Work / Transactions
21. `/certifications` — Quality, Compliance & Certifications
22. `/locations` — Global Offices / Coverage
23. `/partners` — Approved Partners / OEM / MRO Network, only if legally permitted

---

# 6. Global Navigation

## Desktop Navigation

Recommended structure:

```text
[LOGO]

Company
  About
  Leadership
  Careers

Capabilities
  Aircraft Acquisition & Sales
  Aircraft Leasing
  Engines & Parts
  Aviation Consultancy
  AOG Support

Contact

                                      [ REQUEST RFQ ]
```

### Navigation Behaviour

At page load:

- Navbar is transparent over the hero.
- White or light text is used over a dark hero.
- Navbar should be approximately 76–88 px tall on desktop.
- Logo should remain visually restrained.
- Do not make the logo excessively large.

After the visitor scrolls:

- Navbar becomes a floating or edge-to-edge semi-transparent titanium/graphite surface.
- Apply subtle backdrop blur.
- A 1 px border can appear.
- Navbar height may reduce slightly.
- Transition should feel soft rather than dramatic.

Suggested desktop treatment:

```css
background: rgba(8, 10, 13, 0.72);
backdrop-filter: blur(18px);
border-bottom: 1px solid rgba(255,255,255,0.08);
```

### Dropdown Design

Do not use traditional small dropdown menus.

For "Capabilities", use a premium wide dropdown / mini mega-menu.

Example:

```text
CAPABILITIES

01  Aircraft Acquisition & Sales        →
02  Aircraft Leasing                     →
03  Engines & Parts                      →
04  Aviation Consultancy                 →
05  AOG Support                          →
```

Each item may have a very subtle image preview or technical label.

### Mobile Navigation

- Hamburger icon in top right.
- Full-screen menu overlay.
- Dark graphite background.
- Large navigation labels.
- Secondary items slide/fade in.
- RFQ action remains clearly visible.
- Avoid overly complex nested accordion behavior.

---

# 7. Global CTA Strategy

The website should have three main actions:

## Primary CTA

**Request RFQ**

Used for:

- Aircraft parts
- Engines
- Components
- Procurement
- Availability
- Pricing
- Technical requests

## Secondary CTA

**Discuss a Requirement**

Used for:

- Aircraft sales
- Aircraft acquisitions
- Leasing
- Consultancy
- Complex commercial requirements

## Urgent CTA

**AOG Support**

Used for time-critical aviation requirements.

AOG should be visually differentiated but should **not** use aggressive emergency-red everywhere.

A restrained amber, ice-blue highlight, or small status indicator is preferable.

---

# 8. Design Direction — "Aero Titanium"

The visual design should feel like:

> Premium consumer technology × aerospace engineering × high-end automotive presentation.

The website should feel **free-flowing**.

It must not look like a collection of independent rectangular web sections.

Each page should feel like a continuous visual sequence in which the user moves from one "chapter" to another.

---

# 9. Colour System

## Core Dark Palette

| Token | Colour | Hex | Usage |
|---|---|---:|---|
| Carbon | Near Black | `#080A0D` | Primary dark background |
| Graphite | Deep Graphite | `#11161D` | Secondary background |
| Titanium | Elevated Graphite | `#1A2028` | Cards / surfaces |
| Metal | Medium Metal | `#303843` | Dividers / borders |
| Slate | Technical Grey | `#66717D` | Muted interface text |

## Light Palette

| Token | Colour | Hex | Usage |
|---|---|---:|---|
| Arctic | Arctic White | `#F5F7F9` | Main light section |
| Frost | Frost White | `#F9FBFC` | Cards / very light surfaces |
| Silver | Cool Silver | `#DCE2E7` | Borders |
| Steel Text | Steel Grey | `#626D78` | Secondary text |

## Accent Palette

| Token | Colour | Hex | Usage |
|---|---|---:|---|
| Glacier | Glacier Blue | `#72B9D6` | Main accent |
| Ice | Ice Blue | `#B7E3F3` | Highlight |
| Deep Ice | Desaturated Blue | `#397A99` | Strong accents |
| AOG Accent | Soft Amber | `#D9A65A` | AOG only, used sparingly |

## Colour Rules

- Do not use saturated corporate blue everywhere.
- Avoid strong gradients across entire sections.
- Use gradients only for atmospheric lighting or subtle glows.
- 80–90% of the website should rely on neutral materials.
- Accent blue should feel like light reflecting from metal.
- Amber should be reserved for urgency/AOG contexts.
- Avoid neon.
- Avoid purple SaaS gradients.
- Avoid large red areas unless the client's brand specifically requires them.

---

# 10. Light/Dark Section Rhythm

Do not make the entire website dark.

Recommended sequence on the homepage:

```text
DARK HERO
   ↓
DARK / GRAPHITE TRANSITION
   ↓
LIGHT INTRODUCTION
   ↓
LIGHT SERVICES
   ↓
DARK CINEMATIC PARTS / ENGINE SECTION
   ↓
LIGHT GLOBAL CAPABILITY
   ↓
DARK AOG SECTION
   ↓
LIGHT TRUST / TEAM SECTION
   ↓
DARK RFQ CTA
```

The change between themes should be gradual.

Possible techniques:

- Background colour interpolation on scroll
- Full-width section transition
- Large image entering the next colour environment
- Soft mask/reveal
- Layered gradient overlap

Never use sudden black-white-black changes without transition spacing.

---

# 11. Typography

## Primary Recommendation

Use a clean premium grotesk/sans-serif family.

Recommended options:

- Satoshi
- Neue Montreal
- Manrope
- Inter / Inter Display
- Geist
- General Sans

Use a font with excellent variable-font support.

## Typography Hierarchy

### Hero Display

Desktop:

- 80–112 px
- Weight: 450–600
- Line height: 0.92–1.02
- Letter spacing: -0.035em to -0.055em

Tablet:

- 64–82 px

Mobile:

- 42–56 px

### Main Section Heading

Desktop:

- 52–72 px

Mobile:

- 34–44 px

### Medium Heading

Desktop:

- 30–44 px

Mobile:

- 26–34 px

### Body Copy

Desktop:

- 17–20 px
- Line height: 1.5–1.65

Mobile:

- 16–18 px

### Technical Labels

- 11–13 px
- Uppercase
- Letter spacing: 0.10–0.16em

Example:

```text
CAPABILITY / 03
ENGINE & PARTS

GLOBAL SOURCING / TECHNICAL VERIFICATION / DELIVERY SUPPORT
```

## Typography Rules

- Never make every heading enormous.
- Huge typography should be reserved for major statements.
- Use short lines of text.
- Avoid blocks wider than approximately 650–760 px.
- Keep body copy concise.
- Use visual hierarchy rather than excessive bold text.
- Do not use aviation-themed novelty fonts.

---

# 12. Layout System

## Desktop Grid

Use a 12-column grid.

Recommended:

- Maximum content width: 1440–1520 px
- Standard content width: 1280–1360 px
- Side padding at large screens: 56–80 px
- Side padding at standard desktop: 32–48 px

## Tablet

- 24–32 px side padding

## Mobile

- 18–24 px side padding

## Vertical Spacing

Premium spacing should be generous.

Recommended section spacing:

- Desktop: 140–220 px
- Tablet: 100–150 px
- Mobile: 72–110 px

Hero should generally occupy 90–100 svh.

---

# 13. Border Radius

Avoid excessive rounded SaaS cards.

Suggested:

- Buttons: 999 px pill OR 10–14 px
- Form inputs: 10–14 px
- Large imagery: 20–30 px where appropriate
- Information cards: 14–20 px
- Floating nav: 16–24 px

Do not make every container a rounded rectangle.

---

# 14. Imagery Direction

Use photography that communicates engineering and operational reality.

## Preferred Subjects

- Jet engine close-ups
- Turbine blades
- Aircraft fuselage details
- Landing gear
- Avionics
- Aircraft components
- Maintenance facilities
- Warehouses with aviation components
- Mechanics / technical inspection
- Aircraft under maintenance
- Business jets
- Commercial aircraft
- Engine interiors
- Cockpit systems
- Certified parts packaging
- Parts inspection
- Global freight/aviation logistics where relevant

## Avoid

- Generic smiling pilot stock photos
- Airport tourist photography
- Business handshake stock images
- Clouds behind every section
- Cartoon airplanes
- Overused runway-at-sunset photos
- Generic travel photography
- Low-quality AI imagery that creates technically incorrect aircraft/components

## Image Style

Images should be:

- High resolution
- Slightly cinematic
- High dynamic range but natural
- Cool neutral colour grading
- Technically believable
- Consistent in treatment

---

# 15. Video Direction

Use video sparingly.

Best uses:

1. Hero background
2. One full-width atmospheric transition
3. Optional engine/component macro clip

Videos should:

- Be muted
- Autoplay only when performance allows
- Have mobile image fallback
- Be heavily compressed
- Avoid excessive text baked into video
- Have poster frames
- Respect reduced-motion preferences

---

# 16. Animation Philosophy

The website must not look "animated".

It should feel alive.

The rule:

> **Motion should communicate continuity, precision and depth.**

Avoid:

- Bouncing text
- Constant floating elements
- Random rotations
- Excessive mouse-follow effects
- Every element fading upward
- Large spinning logos
- Aggressive parallax
- Repeated animation patterns
- Scroll hijacking
- Long intro loaders

---

# 17. Recommended Frontend / Animation Stack

Use current stable versions at implementation time rather than pinning the project to the versions written in this brief.

Recommended stack:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Base UI primitives
Motion
GSAP + ScrollTrigger
Lenis
Three.js
React Three Fiber
Lucide icons
```

## Responsibility Split

### Motion

Use for:

- Button interactions
- Navbar
- Menus
- Modal transitions
- Small reveals
- Layout changes
- Hover states
- Shared-element transitions
- Page transition details

### GSAP + ScrollTrigger

Use for:

- Hero choreography
- Complex scroll sequences
- Pinned sections
- Image masks
- Section transitions
- Text-line reveals
- Scroll-scrubbed component movement

### Lenis

Use only as the smooth-scroll layer.

Do not use Lenis to create scroll hijacking.

Scrolling must remain intuitive.

### React Three Fiber / Three.js

Optional.

Use for one significant experience only, for example:

- Jet-engine cutaway
- Turbine component
- Aircraft model
- Rotating engine
- Exploded technical component

Do not render 3D on every page.

---

# 18. Motion Timing System

## Micro interactions

```text
160–260 ms
```

Use for:

- Buttons
- Icons
- Link underline
- Small hover effects

## Card / navigation transitions

```text
280–450 ms
```

## Text reveals

```text
500–800 ms
```

## Major section transitions

```text
700–1200 ms
```

## Scroll-linked effects

Should be linked naturally to the scroll position, not played as long blocking timelines.

## Preferred Ease

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Other easing may be used where physically appropriate.

---

# 19. Reduced Motion

Mandatory.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

and application-level reduced-motion state.

With reduced motion enabled:

- Disable smooth-scroll interpolation
- Disable 3D camera travel
- Disable large parallax
- Disable scroll-scrub transformations
- Keep content visible
- Use simple opacity changes where needed
- Do not remove functionality

---

# 20. Cursor

A custom cursor may be used on desktop only.

Rules:

- Default system cursor must be visually hidden only when custom cursor is active and working.
- Never show both at the same time.
- Do not use custom cursor on touch devices.
- Cursor should remain small and restrained.
- Hovering links may expand the cursor slightly or show `VIEW`, `OPEN`, or an arrow.
- Do not create a huge blob following the pointer.
- Disable custom cursor under reduced-motion mode if needed.

---

# 21. Button Design

## Primary Dark Button

```text
REQUEST RFQ     ↗
```

- Frost-white background
- Dark text
- Pill or restrained rounded rectangle
- Arrow shifts 3–6 px on hover

## Secondary Button

Transparent with thin border.

## Text Link

```text
Explore capability      →
```

On hover:

- line extends
- arrow moves slightly
- text colour transitions

No bouncing.

---

# 22. Form Design

Forms are critical because RFQs are a business objective.

## General Rules

- Large touch-friendly fields
- Strong labels
- Example placeholder text
- Clear required/optional distinction
- Inline validation
- No tiny fields
- Avoid overwhelming one-page RFQ forms
- Use progressive sections if many fields are required

## Form Input Height

Desktop: 52–58 px  
Mobile: 50–56 px

## Field Treatment

Light form:

```text
background: #FFFFFF
border: 1px solid #DCE2E7
```

Dark form:

```text
background: rgba(255,255,255,0.04)
border: 1px solid rgba(255,255,255,0.12)
```

Focus should use glacier-blue outline/ring.

---

# 23. Page Transition Design

Transitions should be subtle.

Recommended:

1. User clicks page.
2. Existing content fades/moves 8–16 px.
3. Thin titanium mask or atmospheric fade briefly crosses screen.
4. Next page enters.
5. Scroll resets appropriately.

Target transition length:

```text
350–650 ms
```

Do not delay route navigation unnecessarily.

---

# 24. PAGE 1 — HOME

Route:

```text
/
```

## Goal

Within 10 seconds the visitor should understand:

- What the company does
- That it operates in aviation
- That it supports global/commercial requirements
- That parts/engines are a major capability
- That the visitor can request an RFQ
- That the company offers high-level services beyond simple parts sales

---

## Section 1 — Hero

### Eyebrow

```text
AVIATION / GLOBAL CAPABILITY
```

### Main Heading

Recommended:

```text
Precision that keeps
aviation moving.
```

Alternative:

```text
Aviation engineered
around your operation.
```

### Supporting Copy

```text
Aircraft, engines, components, leasing and aviation support delivered through technical expertise, commercial insight and a trusted global network.
```

### CTAs

```text
[ REQUEST RFQ ]
[ EXPLORE CAPABILITIES → ]
```

### Optional micro-copy

```text
COMMERCIAL / BUSINESS AVIATION / GLOBAL SUPPORT
```

### Hero Visual

Preferred:

- Close-up engine, turbine or aircraft surface
- Full-viewport cinematic photography/video
- Object should have room for typography

### Hero Motion

As user scrolls:

- Background image/video scales from 1.02 to 1.06 very slowly
- Hero copy moves upward only 20–50 px
- Opacity reduces gently
- Technical grid/labels may become visible
- Next section gradually enters
- Avoid large zooms

---

## Section 2 — Introduction

### Eyebrow

```text
WHO WE ARE
```

### Heading

```text
Intelligent aviation support.
Built around long-term value.
```

### Copy

```text
We support airlines, operators, lessors and aviation businesses across aircraft transactions, leasing, engines, parts and strategic advisory. Every requirement is approached with technical scrutiny, market awareness and a focus on operational and commercial value.
```

### CTA

```text
About the company →
```

### Design

- Light Arctic background
- Large left-aligned statement
- Smaller copy on right
- Thin technical divider
- Optional cropped image of component inspection

---

## Section 3 — Capability Index

### Eyebrow

```text
CAPABILITIES / 01–05
```

### Heading

```text
Built for complex aviation requirements.
```

### Capabilities

#### 01 Aircraft Acquisition & Sales

```text
Strategic sourcing and remarketing of commercial aircraft and business jets, supported by technical evaluation and market intelligence.
```

#### 02 Aircraft Leasing

```text
Flexible dry, wet, ACMI and other structured leasing support aligned with operational, financial and fleet requirements.
```

#### 03 Engines & Parts

```text
Engine, APU, landing gear, avionics and aircraft-component sourcing supported by verification, procurement and global supplier access.
```

#### 04 Aviation Consultancy

```text
Commercial and operational guidance for fleet planning, airline restructuring, transactions, sourcing and aviation strategy.
```

#### 05 AOG Support

```text
Time-critical sourcing and coordination for urgent aircraft-on-ground requirements.
```

### Design

Do not use five generic cards.

Use a vertically stacked interactive list.

Desktop example:

```text
01   Aircraft Acquisition & Sales                         →
──────────────────────────────────────────────────────────
02   Aircraft Leasing                                     →
──────────────────────────────────────────────────────────
03   Engines & Parts                                      →
──────────────────────────────────────────────────────────
04   Aviation Consultancy                                 →
──────────────────────────────────────────────────────────
05   AOG Support                                          →
```

Hover:

- Selected row expands slightly
- Related image appears on right
- Arrow moves
- Technical subtext appears

Mobile:

- Image appears inside selected item or below title

---

## Section 4 — Engines & Parts Cinematic Feature

### Eyebrow

```text
ENGINE & PARTS / 03
```

### Heading

```text
The right component.
The right documentation.
The right time.
```

### Copy

```text
From engines and APUs to avionics, landing gear and hard-to-source components, our sourcing approach is built around traceability, technical verification, commercial clarity and dependable delivery.
```

### Supporting Categories

```text
ENGINES
APUs
LANDING GEAR
AVIONICS
ROTATABLES
CONSUMABLES
EXPENDABLES
```

### CTA

```text
Explore engines & parts →
```

### Design

This should be one of the most memorable sections.

Recommended:

- Dark graphite
- Large engine/component imagery
- Optional 3D turbine/engine asset
- Subtle annotation lines
- Technical labels
- No fake technical specifications

### Scroll Motion

Possible sequence:

1. Component enters from right.
2. Rotates 2–6 degrees during scroll.
3. Category labels reveal.
4. Camera/object settles.
5. CTA appears.

Keep the movement slow.

---

## Section 5 — Global Reach

### Eyebrow

```text
GLOBAL NETWORK
```

### Heading

```text
Connected across the aviation ecosystem.
```

### Copy

```text
We work across international aviation markets and coordinate with operators, suppliers, lessors, maintenance organizations and other industry stakeholders to help clients move quickly when opportunities or operational requirements arise.
```

### IMPORTANT

Only mention:

- OEM relationships
- MRO partnerships
- authorized distribution
- specific geographic offices
- supplier numbers
- customer counts

if the client verifies them.

### Design

Prefer an abstract global network visualization rather than a cliché world map.

Possible design:

- Minimal globe/grid
- Fine longitude/latitude arcs
- Small city labels
- Animated routing lines

Use actual office/coverage locations only after confirmation.

---

## Section 6 — Why Choose Us

### Eyebrow

```text
WHY US
```

### Heading

```text
Technical understanding.
Commercial discipline.
Clear execution.
```

### Four pillars

#### Operational Perspective

```text
Aviation decisions are evaluated with real operational requirements in mind—not only transaction value.
```

#### Commercial Insight

```text
Market context, timing and commercial structure are considered throughout each engagement.
```

#### Global Access

```text
International relationships help expand sourcing, transaction and support options.
```

#### Transparent Communication

```text
Clear communication and accountability remain central from initial requirement through execution.
```

### Design

Use a large light section.

Four pillars can be shown along a horizontal timeline/grid.

Avoid icons unless they add meaning.

---

## Section 7 — Experience / Credibility

### Heading

```text
Experience should be visible in the decisions.
Not just in the numbers.
```

Potential metrics:

```text
[XX]+ YEARS COMBINED EXPERIENCE
[XX] MARKETS SUPPORTED
[XX] GLOBAL PARTNERS
24/7 AOG RESPONSE
```

### IMPORTANT

Every metric must be client-verified.

If the client cannot verify numerical data, omit the counter section entirely.

Never animate fake statistics.

---

## Section 8 — Leadership Preview

### Eyebrow

```text
LEADERSHIP
```

### Heading

```text
Experience across the aviation lifecycle.
```

### Copy

```text
Our team brings together aviation operations, technical knowledge, commercial experience and international market understanding.
```

### CTA

```text
Meet the team →
```

### Design

Use 2–3 selected leadership images.

Do not show every team member on the home page.

---

## Section 9 — AOG Feature

### Background

Carbon black.

### Label

```text
AOG / TIME CRITICAL
```

### Heading

```text
Aircraft do not wait.
Neither should support.
```

### Copy

```text
For urgent component, engine or technical sourcing requirements, contact the AOG team with the aircraft, part and delivery information available.
```

### CTA

```text
[ START AOG REQUEST ]
```

### Design

- Soft amber status dot
- Minimal interface
- Very large `AOG`
- No emergency sirens, flashing red, or distracting animation

---

## Section 10 — Final RFQ CTA

### Heading

```text
Tell us what the operation needs.
```

### Copy

```text
Send your aircraft, engine, component or aviation-service requirement and our team will review the request.
```

### CTA

```text
REQUEST RFQ     ↗
```

Optional:

```text
Part number available? Include it to help us respond efficiently.
```

---

# 25. PAGE 2 — ABOUT

Route:

```text
/about
```

## Purpose

Build trust and explain the company's approach without filling the page with marketing language.

---

## Hero

### Eyebrow

```text
COMPANY / ABOUT
```

### Heading

```text
Aviation expertise shaped around better decisions.
```

### Copy

```text
We provide aviation support across aircraft, engines, parts, leasing and advisory services, combining technical understanding with commercial and market insight.
```

---

## Section — Who We Are

### Heading

```text
A practical approach to complex aviation requirements.
```

### Content

```text
Aviation transactions and operational decisions demand more than access to an asset or supplier. They require the right technical information, market context, commercial structure and execution.

Our role is to help clients navigate those decisions across aircraft acquisition and sales, leasing, engine and component sourcing, and aviation consultancy.

We work with airlines, operators, lessors, MROs, owners and other aviation stakeholders to identify suitable options, assess risk, coordinate requirements and support execution.
```

---

## Section — Our Approach

Four principles:

### Technical Verification

```text
Aircraft, engines and components should be evaluated using relevant technical documentation, condition information and traceability.
```

### Market Intelligence

```text
Commercial decisions should reflect current market conditions, availability and timing.
```

### Commercial Precision

```text
Every structure should support the operational and financial objective behind the requirement.
```

### Execution

```text
Clear communication, documentation and coordination are essential from opportunity through completion.
```

---

## Vision

Placeholder:

```text
To become a globally trusted aviation partner known for precise, transparent and commercially intelligent aviation solutions.
```

Client must approve.

---

## Mission

Placeholder:

```text
To support aviation businesses with reliable aircraft, engine, parts, leasing and advisory solutions built on technical understanding, market intelligence and strong industry relationships.
```

Client must approve.

---

## Values

Recommended:

```text
INTEGRITY
PRECISION
ACCOUNTABILITY
RESPONSIVENESS
EXPERTISE
LONG-TERM PARTNERSHIPS
```

---

## Final CTA

```text
Have a requirement?
Discuss it with our team.
```

Buttons:

```text
REQUEST RFQ
CONTACT US
```

---

# 26. PAGE 3 — LEADERSHIP / TEAM

Route:

```text
/team
```

## Hero

### Eyebrow

```text
PEOPLE / LEADERSHIP
```

### Heading

```text
Aviation experience behind every decision.
```

### Copy

```text
Our team combines operational, technical and commercial aviation experience across aircraft transactions, leasing, parts, maintenance coordination and strategic advisory.
```

---

## Team Member Template

Each team member needs:

```text
FULL NAME
ROLE / TITLE

EXPERTISE LABEL
Example:
COMMERCIAL AVIATION / AIRCRAFT SALES / LEASING

SHORT BIO
70–130 words

OPTIONAL:
LinkedIn
Location
Years of experience
Relevant credentials
```

### Bio Style

Biographies should communicate:

- What the person actually does
- Relevant aviation experience
- Technical/commercial specialization
- Major market experience
- Role at the company

Do not write empty executive phrases such as:

> "A visionary leader with a passion for excellence."

---

## Team Design

Desktop:

- Large editorial portraits
- Alternating left/right image layouts
- Plenty of whitespace
- Job title displayed as small technical text
- Bio expands on click if long

Alternative:

Use a refined 3-column image grid with detail drawer.

Do not use tiny circular profile photos.

---

# 27. PAGE 4 — SERVICES OVERVIEW

Route:

```text
/services
```

## Hero

### Eyebrow

```text
CAPABILITIES
```

### Heading

```text
Aviation support across assets, operations and strategy.
```

### Copy

```text
From aircraft transactions and leasing to engine sourcing, components and strategic advisory, our capabilities are designed around operational continuity and long-term asset value.
```

---

## Service Index

### Aircraft Acquisition & Sales

```text
Sourcing, transaction support and remarketing for commercial aircraft and business jets.
```

### Aircraft Leasing

```text
Dry, wet, ACMI and other lease structures aligned with capacity, timeline and financial requirements.
```

### Engines & Parts

```text
Global sourcing and trading support across engines, APUs, landing gear, avionics and aircraft components.
```

### Aviation Consultancy

```text
Strategic guidance across fleet planning, transactions, restructuring, sourcing and operational improvement.
```

### AOG Support

```text
Urgent sourcing and coordination for aircraft-on-ground requirements.
```

---

# 28. PAGE 5 — AIRCRAFT ACQUISITION & SALES

Route:

```text
/services/aircraft-acquisition-sales
```

## Hero

### Technical label

```text
CAPABILITY / 01
```

### Heading

```text
Aircraft decisions backed by technical and commercial clarity.
```

### Copy

```text
We support aircraft acquisition and sales requirements across commercial aviation and business aviation, helping clients identify suitable assets, evaluate opportunities and navigate transactions from sourcing through delivery.
```

### CTA

```text
DISCUSS AN AIRCRAFT REQUIREMENT
```

---

## Section — What We Support

### Business Jets

```text
Targeted sourcing and sales support for private, corporate and charter aviation requirements.
```

### Commercial Aircraft

```text
Aircraft sourcing and remarketing aligned with fleet, route, capacity and commercial objectives.
```

### Technical Review Coordination

```text
Support for evaluating available aircraft information, records, condition and transaction requirements.
```

### Market Access

```text
International market engagement to identify available aircraft and connect relevant transaction opportunities.
```

---

## Section — Process

```text
01 REQUIREMENT
Define aircraft type, mission, timeline and commercial parameters.

02 MARKET SEARCH
Identify suitable aircraft and transaction opportunities.

03 INITIAL REVIEW
Review available commercial and technical information.

04 DUE DILIGENCE
Coordinate deeper technical, documentation and commercial assessment.

05 NEGOTIATION
Support commercial discussions and transaction structure.

06 CLOSING / DELIVERY
Coordinate final requirements through completion.
```

### IMPORTANT

This process must be adjusted to the client's actual service boundaries.

Do not claim legal, engineering or inspection services unless they are actually offered.

---

## Final CTA

```text
Looking to acquire or remarket an aircraft?
Start a confidential conversation.
```

---

# 29. PAGE 6 — AIRCRAFT LEASING

Route:

```text
/services/aircraft-leasing
```

## Hero

### Label

```text
CAPABILITY / 02
```

### Heading

```text
Flexible aircraft capacity.
Structured around the operation.
```

### Copy

```text
We support aircraft leasing requirements with commercial and operational guidance across short- and long-term structures.
```

---

## Leasing Types

### Dry Lease

```text
Aircraft provided without crew, with operational responsibilities structured according to the lease arrangement.
```

### Wet Lease

```text
Aircraft and operational support provided according to agreed crew, maintenance and insurance arrangements.
```

### ACMI

```text
Aircraft, Crew, Maintenance and Insurance structures for operators requiring additional capacity or operational flexibility.
```

### Damp Lease

Include only if the client actually offers/supports it.

```text
Hybrid leasing arrangements structured around the specific operational responsibilities of the parties.
```

---

## Support Areas

```text
Lease requirement definition
Market search
Lease structuring
Commercial negotiation support
Short-term capacity
Long-term fleet planning
Lease transition support
Lease-end / remarketing advisory
```

---

## Section — Use Cases

```text
SEASONAL CAPACITY
FLEET TRANSITION
ROUTE EXPANSION
TEMPORARY AIRCRAFT REPLACEMENT
GROWTH CAPACITY
LEASE-END PLANNING
```

---

## Final CTA

```text
Need aircraft capacity?
Discuss your leasing requirement.
```

---

# 30. PAGE 7 — ENGINES & PARTS

Route:

```text
/services/engines-parts
```

This should be one of the most commercially important pages.

## Hero

### Label

```text
CAPABILITY / 03
```

### Heading

```text
Global sourcing for engines and aircraft components.
```

### Copy

```text
We support engine and parts requirements through targeted sourcing, supplier engagement, technical-document review and commercial coordination.
```

### CTA

```text
REQUEST A PART / ENGINE
```

---

## Product Categories

Only display categories the client can genuinely support.

Recommended:

### Engines

- Engine sales
- Engine leasing
- Engine sourcing

### APUs

- APU sourcing
- APU trading

### Landing Gear

- Landing gear assemblies
- Related rotable components

### Avionics

- Navigation
- Communication
- Flight-deck and electronic components

### Rotables

- Repairable/serialized aircraft components

### Consumables

- Regularly replaced aviation materials and items

### Expendables

- Single-use or non-repairable parts

### Hard-to-Find Parts

- Targeted global sourcing for difficult requirements

---

## Section — Sourcing Approach

### 01 Requirement

```text
Part number, description, aircraft type, condition, quantity, required date and delivery location are captured.
```

### 02 Supplier Search

```text
Relevant approved or trusted supply channels are contacted based on the requirement.
```

### 03 Documentation Review

```text
Available trace, certification and condition documentation is reviewed according to the transaction requirements.
```

### 04 Commercial Offer

```text
Availability, lead time, commercial terms and relevant documentation are presented.
```

### 05 Delivery Coordination

```text
Shipment and delivery requirements are coordinated after order confirmation.
```

Do not promise specific certification standards unless client confirms them.

---

## Section — Engine Lifecycle Support

Adapted from the American Aeronex subject matter.

Possible services:

```text
Engine sourcing
Engine sale / lease coordination
Maintenance planning support
Repair option coordination
Lifecycle cost discussions
Market intelligence
Asset remarketing
```

Again: publish only actual services.

---

## Section — Parts RFQ Quick Form

Fields:

```text
Part Number *
Description
Aircraft Type
Condition Required
Quantity *
Required By
Delivery Airport / City / Country
Company *
Contact Name *
Email *
Phone
Attachment
Additional Notes
```

Attachment examples:

```text
RFQ
BOM
Parts list
Spreadsheet
PDF
Technical requirement
```

Preferred formats:

```text
PDF
XLSX
XLS
CSV
DOCX
TXT
```

Set reasonable file-size limits.

---

# 31. PAGE 8 — AVIATION CONSULTANCY

Route:

```text
/services/aviation-consultancy
```

## Hero

### Label

```text
CAPABILITY / 04
```

### Heading

```text
Turn aviation complexity into clearer decisions.
```

### Copy

```text
We provide strategic aviation support across fleet, transactions, operations and sourcing, helping clients evaluate options with greater commercial and operational context.
```

---

## Consultancy Areas

### Airline Restructuring & Turnaround

```text
Support for reviewing operational and commercial challenges and identifying potential improvement priorities.
```

### Fleet Planning & Optimization

```text
Evaluation of fleet composition, utilization, transition and capacity requirements.
```

### Aircraft Transaction Market Analysis

```text
Market intelligence to support aircraft acquisition, lease, sale and remarketing decisions.
```

### Engine & Parts Sourcing Strategy

```text
Support for procurement strategy, sourcing options, timing and aftermarket decision-making.
```

### Optional Additional Areas

Only if offered:

- Route economics
- Business planning
- Fleet transition
- Asset valuation coordination
- Technical advisory
- MRO strategy
- Maintenance planning
- Airline startup advisory
- Aircraft induction / redelivery support

---

## Engagement Structure

Recommended:

```text
01 DEFINE
Clarify the operational or commercial challenge.

02 ANALYZE
Review available data, constraints and options.

03 DEVELOP
Create recommended strategies or decision paths.

04 SUPPORT
Assist during implementation, negotiation or execution where applicable.
```

---

# 32. PAGE 9 — AOG SUPPORT

Route:

```text
/aog-support
```

This is a recommended enhancement beyond the American Aeronex page structure.

## Goal

A visitor with an aircraft on ground should reach the submission form immediately.

Do not make an AOG visitor scroll through marketing content first.

---

## Hero

### Status line

```text
AOG SUPPORT / URGENT REQUIREMENT
```

### Heading

```text
Time-critical aircraft support.
```

### Copy

```text
Submit your AOG requirement with the available part, aircraft and delivery information. Our team will review the request through the appropriate sourcing channels.
```

### Primary CTA

```text
START AOG REQUEST
```

---

## AOG Form

Fields:

```text
Company *
Contact Name *
Email *
Phone / WhatsApp *
Aircraft Type
Aircraft Registration
MSN
Part Number *
Part Description
Quantity *
Condition Accepted
Required Delivery Airport *
Required By *
Upload RFQ / Documentation
Additional Notes
```

### Form UX

- Keep form visible within first viewport on desktop if possible.
- Allow users to submit even when some aircraft details are unknown.
- Part Number, Company, Contact, Email/Phone, Quantity and Delivery Location should be prioritized.
- Clearly indicate urgent contact channels if client provides them.

---

# 33. PAGE 10 — REQUEST RFQ

Route:

```text
/request-rfq
```

## Hero

```text
REQUEST / RFQ
```

### Heading

```text
Send us the requirement.
```

### Copy

```text
Provide the available details and documentation for your aircraft, engine, parts, leasing or aviation-service requirement.
```

---

## RFQ Type Selector

First step:

```text
WHAT DO YOU NEED?

[ Aircraft ]
[ Engine ]
[ Parts / Components ]
[ Leasing ]
[ Consultancy ]
[ Other ]
```

Fields should adapt according to selected requirement.

---

## Parts Form

```text
Part Number
Description
Quantity
Condition
Aircraft Type
Required By
Delivery Location
Attachments
```

## Engine Form

```text
Engine Type
Serial Number if applicable
Requirement: Buy / Sell / Lease / Other
Aircraft Application
Timeline
Location
Attachments
```

## Aircraft Form

```text
Aircraft Type
Requirement: Buy / Sell
Year Range
Mission / Configuration
Timeline
Budget Range optional
Location
Notes
Attachments
```

## Leasing Form

```text
Aircraft Type
Lease Type
Number of Aircraft
Start Date
Lease Duration
Operating Region
Estimated Utilization
Notes
Attachments
```

## Consultancy Form

```text
Organization
Area of Support
Challenge / Objective
Timeline
Preferred Contact Method
Attachments
```

---

## RFQ Success State

After successful submission:

```text
REQUEST RECEIVED

Thank you. Your requirement has been submitted successfully.

Reference:
RFQ-XXXXXX

Our team will review the information provided and contact you using the details submitted.
```

Do not promise a response time unless the company has operationally committed to one.

---

# 34. PAGE 11 — CAREERS

Route:

```text
/careers
```

## Hero

### Label

```text
CAREERS
```

### Heading

```text
Build your career in global aviation.
```

### Copy

```text
We are interested in people who combine professional discipline, commercial curiosity and a genuine understanding of aviation.
```

---

## Culture Section

```text
Our work sits at the intersection of aviation operations, technical understanding, international markets and commercial execution.

Team members may work across aircraft transactions, leasing, parts, client relationships, technical coordination, business development and aviation advisory.
```

---

## Open Roles

Each role card:

```text
JOB TITLE
LOCATION / REMOTE
DEPARTMENT
EMPLOYMENT TYPE

SHORT DESCRIPTION

[ VIEW ROLE ]
```

Do not publish fake openings.

---

## Role Detail Template

```text
ABOUT THE ROLE
RESPONSIBILITIES
REQUIRED EXPERIENCE
PREFERRED EXPERIENCE
LOCATION
COMPENSATION / COMMISSION INFORMATION
HOW TO APPLY
```

---

## Application Form

```text
Name
Email
Phone
Location
Role
LinkedIn
CV / Resume
Message
```

---

# 35. PAGE 12 — CONTACT

Route:

```text
/contact
```

## Hero

### Label

```text
CONTACT
```

### Heading

```text
Start the conversation.
```

### Copy

```text
Contact our team regarding aircraft, engines, components, leasing, aviation advisory or general business requirements.
```

---

## Contact Information

Use placeholders until confirmed:

```text
[COMPANY ADDRESS]
[MAIN PHONE]
[GENERAL EMAIL]
[PARTS EMAIL]
[AOG CONTACT]
```

---

## Form

```text
Name *
Email *
Company *
Phone
Subject *
Inquiry Type
Message *
Attachment
```

Inquiry Type:

```text
Aircraft
Engines
Parts
Leasing
Consultancy
AOG
Partnership
Careers
General
```

---

## Map

Only include if the company has an office where visitors may reasonably need directions.

Do not use a giant map just to fill space.

---

# 36. PAGE 13 — PRIVACY POLICY

Route:

```text
/privacy
```

Do not copy the competitor's policy.

The final policy should be reviewed for the actual website stack, jurisdiction, analytics, CRM, forms, cookies and third-party services.

At minimum cover:

```text
Effective date
Information collected
Contact form / RFQ information
Uploaded documents
Technical / usage information
Cookies
Analytics
How information is used
Service providers
Data retention
Security
User rights
International transfers where relevant
Third-party links
Policy updates
Contact information
```

Use proper legal review where required.

---

# 37. PAGE 14 — TERMS OF USE

Route:

```text
/terms
```

Recommended because the site may contain aviation asset information and RFQs.

Potential topics:

```text
Website informational purpose
No guarantee of availability
No binding offer until formally agreed
Accuracy of information
Third-party information
Intellectual property
Limitation of liability
External links
Applicable law
Contact details
```

Legal review recommended.

---

# 38. FOOTER

Recommended structure:

```text
[LOGO]

Precision that keeps aviation moving.

COMPANY
About
Leadership
Careers

CAPABILITIES
Aircraft Acquisition & Sales
Aircraft Leasing
Engines & Parts
Aviation Consultancy
AOG Support

SUPPORT
Request RFQ
Contact

LEGAL
Privacy
Terms

[EMAIL]
[PHONE]
[ADDRESS]

LinkedIn
Optional other professional networks

© [YEAR] [COMPANY NAME]
```

Do not overcrowd the footer.

---

# 39. Global Visual Components

Build reusable components.

Recommended:

```text
Header
MegaMenu
MobileNavigation
Hero
SectionEyebrow
DisplayHeading
TechnicalLabel
TextLink
PrimaryButton
SecondaryButton
CapabilityList
ServicePreview
ImageReveal
TechnicalImage
Metric
TeamPreview
TeamCard
GlobalNetwork
AOGBanner
RFQCTA
FormField
FileUpload
Select
RadioGroup
RFQTypeSelector
Footer
PageTransition
SmoothScrollProvider
ReducedMotionProvider
CustomCursor
```

---

# 40. Technical Image Treatment

A distinctive visual system should be used around aircraft/component photography.

Possible treatment:

```text
                  PN / REFERENCE
                  ───────────────
         ╭──────────────────────╮
         │                      │
         │      ENGINE IMAGE    │
         │                      │
         ╰──────────────────────╯
   SERIES / ENGINE

                            DETAIL / 03
```

Technical annotations must remain decorative unless the data is real.

Never attach fake part numbers, dimensions or aircraft specifications to images.

---

# 41. Dividers

Avoid excessive horizontal lines.

When used:

```css
1px solid rgba(255,255,255,0.10)
```

or:

```css
1px solid #DCE2E7
```

Technical markers may appear at the beginning/end of a line.

---

# 42. Icons

Use icons sparingly.

Recommended library:

```text
Lucide
```

Do not place a large icon above every service.

Preferred icon use:

- Arrow
- Menu
- Close
- Upload
- Search
- Check
- Phone
- Mail
- External link
- Location

---

# 43. Hover Behaviour

## Links

- text changes slightly
- underline expands
- arrow moves 3–5 px

## Image Cards

- image scale max 1.02–1.04
- no aggressive zoom

## Service Rows

- background changes subtly
- title shifts 4–8 px
- image preview changes
- technical detail fades in

## Buttons

- invert fill or shift fill gradient
- arrow shifts
- no bounce

---

# 44. Scroll Behaviour

Use smooth scroll only if it remains accessible.

Recommended:

- Native-feeling acceleration
- No forced snapping on standard content
- Avoid horizontal scroll sections unless there is a strong visual reason
- Don't lock the user into long animations
- Maintain browser scroll expectations
- Browser back button must restore sensible position

---

# 45. Cinematic Scroll Sequences

Use at most 2–3 major sequences on the homepage.

Recommended candidates:

### Sequence 1 — Hero

Hero image and typography transition into introduction.

### Sequence 2 — Engine / Parts

Component moves/rotates while category content appears.

### Sequence 3 — AOG

Dark section enters with a controlled change in atmosphere.

Do not create pinned scroll sequences on every page.

---

# 46. 3D Guidelines

If using a 3D asset:

## Recommended Subject

- Turbine blade
- Jet engine
- Engine fan
- Aircraft exterior

## Performance Rules

- Optimize GLB/GLTF
- Compress textures
- Use Draco/Meshopt if appropriate
- Lazy load
- Render only while visible
- Provide static image fallback
- Avoid 4K textures where unnecessary
- Reduce quality on mobile
- Disable heavy effects on low-power devices

## Interaction

- Scroll-linked rotation: subtle
- Pointer rotation: max a few degrees
- No free uncontrolled spinning
- Do not require 3D interaction to understand content

---

# 47. Performance Targets

The premium feel depends on performance.

Target:

```text
LCP < 2.5 s on realistic mobile conditions
CLS < 0.1
INP < 200 ms where practical
```

## Rules

- Use `next/image`
- Optimize and size imagery correctly
- Lazy-load below-fold media
- Keep hero assets intentionally optimized
- Avoid multiple autoplay videos
- Dynamically import 3D
- Avoid unnecessary JS animation
- Animate transform and opacity where possible
- Audit GSAP timelines
- Kill ScrollTrigger instances on unmount
- Prevent animation memory leaks
- Use Motion `LazyMotion` if beneficial
- Do not import an entire icon set
- Avoid giant background PNGs

---

# 48. Mobile Design

Mobile must not be a reduced desktop screenshot.

## Hero

- 85–95 svh
- Typography maximum approximately 54 px
- CTA buttons may stack
- Background crop must be manually art-directed

## Navigation

- Full-screen overlay
- Clear RFQ action

## Service Sections

Convert large hover interactions into:

- Tap
- Accordion
- Stacked editorial sections

## 3D

If 3D compromises performance:

- show optimized static render
- or simplified model

## Forms

- Single column
- Large tap targets
- Appropriate keyboard types
- File upload must work on iOS/Android
- Use sticky submit only if it improves usability

---

# 49. Accessibility

Target WCAG 2.2 AA where practical.

Mandatory:

- Semantic headings
- Keyboard navigation
- Visible focus styles
- Label every input
- Correct `aria` usage for custom controls
- Good colour contrast
- Alt text for meaningful imagery
- Decorative imagery should not pollute screen-reader output
- Reduced motion
- Do not rely on hover
- Do not rely only on colour to communicate AOG/validation
- Ensure menus and dialogs trap/manage focus correctly

---

# 50. SEO Structure

Each major service must have its own crawlable route.

## Suggested Homepage Title

```text
[Company Name] | Aircraft, Engines, Parts & Aviation Services
```

## Suggested Homepage Description

```text
Aviation support across aircraft sales and acquisitions, leasing, engines, parts sourcing, AOG requirements and strategic consultancy.
```

## Service Keywords

Use naturally, not as keyword stuffing:

```text
aircraft parts supplier
aviation parts supplier
aircraft component sourcing
aircraft engine sourcing
aircraft engine sales
aircraft engine leasing
aviation AOG support
aircraft parts RFQ
commercial aircraft sales
business jet sales
aircraft leasing
ACMI leasing
aviation consultancy
fleet planning
aviation procurement
```

SEO copy must match services actually offered.

---

# 51. Structured Data

Consider:

- Organization
- WebSite
- BreadcrumbList
- Service
- JobPosting for real vacancies
- Article for future insights

Do not add fake:

- Review schema
- AggregateRating
- awards
- customer ratings

---

# 52. Content Management

Even if the initial site is mostly static, content should be organized so that the following can be changed without rewriting layout logic:

```text
Team members
Job listings
Contact details
Service descriptions
Metrics
Global locations
Partner logos
Aircraft listings
Certifications
FAQs
```

A CMS may be added if the client expects frequent changes.

If changes will be developer-managed initially, keep content in structured TypeScript/JSON data files.

---

# 53. Suggested Project Structure

Example:

```text
app/
  page.tsx
  about/
  team/
  services/
    page.tsx
    aircraft-acquisition-sales/
    aircraft-leasing/
    engines-parts/
    aviation-consultancy/
  aog-support/
  request-rfq/
  careers/
  contact/
  privacy/
  terms/

components/
  layout/
  navigation/
  sections/
  services/
  forms/
  motion/
  three/
  ui/

content/
  company.ts
  services.ts
  team.ts
  careers.ts
  contact.ts

lib/
  motion/
  validation/
  analytics/
  seo/

public/
  images/
  video/
  models/
  icons/
```

---

# 54. RFQ Backend Requirements

The frontend design should anticipate a proper backend rather than a basic email-only contact form.

At minimum, an RFQ submission should be able to create a structured record containing:

```text
RFQ ID
Submission date
RFQ type
Company
Contact
Email
Phone
Aircraft information
Part / engine information
Required date
Delivery location
Message
Attachment metadata
Status
```

Potential statuses:

```text
NEW
UNDER REVIEW
SOURCING
QUOTED
AWAITING CLIENT
CLOSED
CANCELLED
```

This is a future-proof structure even if the first deployment forwards the request by email.

---

# 55. AOG Backend Requirements

AOG requests should be identifiable separately from ordinary contact submissions.

Recommended priority data:

```text
priority = AOG
submitted_at
required_by
part_number
aircraft_type
aircraft_registration
delivery_location
contact_phone
```

The company may later connect:

- email
- CRM
- Slack/Teams
- SMS
- WhatsApp workflows

Only build integrations approved by the client.

---

# 56. File Upload

For RFQ/AOG forms:

- Virus scan if backend permits
- Validate MIME type
- Validate extension
- Limit size
- Generate safe storage filename
- Never trust original file path/name
- Do not expose private uploaded RFQs publicly
- Use signed URLs/private storage when applicable

---

# 57. Error States

Design all states intentionally.

## Form Error

```text
We couldn't submit the request.
Please review the highlighted fields and try again.
```

## Upload Error

```text
This file could not be uploaded.
Please use PDF, XLSX, XLS, CSV or DOCX and keep the file below [LIMIT].
```

## Server Error

```text
Something went wrong while processing the request.
Please try again or contact us at [CONTACT].
```

Do not show raw stack traces.

---

# 58. Loading States

Avoid generic spinning loaders.

Use:

- subtle progress line
- button state
- skeleton only when necessary

Example:

```text
SUBMITTING REQUEST…
```

Button should become disabled while submitting.

---

# 59. 404 Page

Design:

Dark background.

Large:

```text
404
```

Technical sublabel:

```text
ROUTE / NOT FOUND
```

Message:

```text
This page is no longer on the flight plan.
```

CTA:

```text
RETURN HOME
REQUEST RFQ
```

Keep it tasteful.

---

# 60. Privacy / Cookie UX

If analytics or marketing cookies require consent:

- use a small well-designed consent panel
- do not use deceptive accept-only patterns
- allow preferences
- maintain brand styling
- do not cover the entire site unnecessarily

---

# 61. Things NOT to Copy from the Content Reference

The American Aeronex site includes content patterns that should not be copied blindly.

Do **not** transfer:

- American Aeronex company name
- American Aeronex staff
- American Aeronex address
- American Aeronex phone
- American Aeronex email
- "30+ years" unless the client confirms an equivalent fact
- OEM/MRO relationships unless confirmed
- partner/community logos unless the client owns permission to show them
- testimonials unless provided by the client
- any placeholder/demo testimonials
- any accidental text related to unrelated aviation training
- typos or inconsistent company naming
- competitor's Privacy Policy verbatim

Use their website only to understand the type of services and information architecture.

---

# 62. Credibility Content Checklist

Before production launch ask the client for:

```text
Official company name
Logo files
Registered address
Public phone numbers
Public email addresses
AOG contact
RFQ contact
Years of experience claim
Team names
Job titles
Team photographs
Team bios
Certifications
Accreditations
Supplier approvals
Partner logos
OEM relationships
MRO relationships
Office locations
Markets served
Aircraft types supported
Engine types supported
Part categories
Leasing structures
Actual consultancy services
Customer testimonials
Case studies
Privacy contact
Legal entity information
Social links
```

No unverified item should appear as fact.

---

# 63. Image Asset Checklist

Request:

```text
Logo SVG
Dark logo
Light logo
Aircraft photography
Engine photography
Component photography
Warehouse photography
Team headshots
Office photography
Aircraft transaction imagery
AOG imagery
Any approved brand-partner logos
```

If high-quality assets are unavailable, purchase/licence professional aviation photography.

---

# 64. Recommended Homepage Animation Map

```text
HERO
Text line reveal + slow visual movement
        ↓
INTRODUCTION
Soft background transition
        ↓
CAPABILITIES
Interactive hover list
        ↓
ENGINE / PARTS
One major scroll-linked sequence
        ↓
GLOBAL NETWORK
Subtle routing animation
        ↓
WHY US
Minimal stagger / number reveal
        ↓
TEAM
Image masks / editorial transition
        ↓
AOG
Atmospheric dark transition
        ↓
RFQ
Calm final CTA
```

---

# 65. Animation Acceptance Rules

Every animation must pass these questions:

1. Does it help communicate hierarchy or continuity?
2. Does it maintain 60 fps on realistic hardware?
3. Can the page still be understood without it?
4. Does it respect reduced motion?
5. Does it feel appropriate for a serious aviation company?
6. Is it different enough from nearby animations to avoid repetition?
7. Does it finish quickly enough that the user never waits for it?

If "no" to any relevant item, simplify or remove it.

---

# 66. Page-Specific Background Rhythm

## Home

Dark → Light → Light → Dark → Light → Dark → Light → Dark

## About

Dark hero → Light editorial body → Graphite values → Light CTA

## Team

Light or graphite hero → Light profile sequence → Dark CTA

## Services

Dark hero → Light index → alternating service previews → Dark CTA

## Aircraft Acquisition

Dark hero → Light process → image feature → Light details → Dark CTA

## Leasing

Light hero or muted graphite → light lease types → dark use-case feature → CTA

## Engines & Parts

Dark cinematic hero → dark/graphite category feature → light sourcing process → dark RFQ

## Consultancy

Light/minimal hero → editorial strategy sections → graphite engagement process → CTA

## AOG

Mostly dark, highly focused

## RFQ

Light, functional, minimal distractions

## Contact

Light with dark final section

---

# 67. Overall Visual Rule

The interface should communicate:

```text
LESS UI
MORE EXPERIENCE
```

Do not decorate empty space just because it is empty.

Whitespace is intentional.

---

# 68. Premium Detail Ideas

Use only a few.

Examples:

- Tiny technical section coordinates such as `03 / 07`
- Image masks
- Moving hairline dividers
- Soft metallic light sweeps
- 1–2 px magnetic cursor movement
- Technical photo annotations
- Smooth number changes
- Dynamic navigation theme
- Route-transition mask
- Subtle aircraft/engine silhouette
- Ambient grain at extremely low opacity
- Cursor-changing action labels

Avoid gimmicks such as:

- fake radar sweeps on every page
- blinking cockpit indicators
- constant jet sounds
- airplane cursor
- fake HUD interface
- large terminal text
- unnecessary particle systems

---

# 69. Suggested Design Tokens

Example:

```css
:root {
  --carbon: #080A0D;
  --graphite: #11161D;
  --titanium: #1A2028;
  --metal: #303843;

  --arctic: #F5F7F9;
  --frost: #F9FBFC;
  --silver: #DCE2E7;

  --text-dark: #111318;
  --text-light: #F6F8FA;
  --text-muted-dark: #929BA6;
  --text-muted-light: #626D78;

  --glacier: #72B9D6;
  --ice: #B7E3F3;
  --aog: #D9A65A;

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;

  --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

# 70. Breakpoints

Suggested:

```text
sm     640
md     768
lg     1024
xl     1280
2xl    1536
```

Do not design only around standard breakpoint screenshots.

Test fluid widths.

---

# 71. Browser Support

Target current mainstream versions of:

- Chrome
- Edge
- Safari
- Firefox
- iOS Safari
- Android Chrome

Advanced visuals must degrade gracefully.

---

# 72. QA Checklist

## Visual

- [ ] No unexpected font jumps
- [ ] No stretched aircraft imagery
- [ ] Correct image crops
- [ ] Consistent section spacing
- [ ] Dark/light nav theme works
- [ ] Hover states feel restrained
- [ ] No accidental double cursor
- [ ] No clipping large headings
- [ ] Mobile hero readable
- [ ] Forms fit small screens

## Motion

- [ ] Smooth scroll does not break anchors
- [ ] ScrollTrigger refreshes correctly
- [ ] Route changes clean up animations
- [ ] No page freezes
- [ ] Reduced motion works
- [ ] 3D stops rendering when not needed
- [ ] No mobile jank

## Forms

- [ ] Validation
- [ ] File upload
- [ ] Submission states
- [ ] Spam protection
- [ ] Email/CRM delivery
- [ ] RFQ reference
- [ ] AOG routing
- [ ] Privacy consent if required

## SEO

- [ ] Unique title
- [ ] Unique description
- [ ] One logical H1
- [ ] Correct headings
- [ ] Canonical tags
- [ ] Sitemap
- [ ] robots.txt
- [ ] Open Graph
- [ ] Structured data where appropriate

## Accessibility

- [ ] Keyboard
- [ ] Focus
- [ ] Labels
- [ ] Alt text
- [ ] Contrast
- [ ] Reduced motion
- [ ] Dialog focus
- [ ] Menu accessibility

---

# 73. Implementation Priority

## Phase 1 — Core

Build:

- Global design system
- Header
- Footer
- Home
- About
- Services
- Four core service pages
- AOG
- RFQ
- Contact
- Privacy
- Responsive behavior

## Phase 2 — Trust / Business

Build:

- Team
- Careers
- Terms
- Real metrics
- Certifications
- Partner content
- Better RFQ workflows

## Phase 3 — Premium Interaction

Add:

- Advanced GSAP sequences
- 3D component feature
- Page transitions
- Global network visualization
- Custom cursor
- Advanced service image previews

Do not block the site's basic usability while advanced animation is being built.

---

# 74. Recommended Build Philosophy for Codex / AI Coding Agent

Use this document as the source of truth.

The implementation agent must:

1. Build a production-quality Next.js application.
2. Use TypeScript.
3. Use reusable components.
4. Keep content separate from layout when practical.
5. Implement responsive behavior from the beginning.
6. Avoid hard-coding large repeated content blocks.
7. Use current stable package versions at implementation time.
8. Keep advanced animation isolated in dedicated components/hooks.
9. Keep server and client components separated appropriately.
10. Dynamically import expensive client-only experiences.
11. Build forms with schema validation.
12. Make all functional forms keyboard accessible.
13. Respect `prefers-reduced-motion`.
14. Optimize images and media.
15. Do not expose secrets to the client bundle.
16. Use `.env.example`.
17. Add clean README setup instructions.
18. Keep the project ready for GitHub.
19. Keep the deployment compatible with Vercel unless another host is selected.
20. Add clear comments only where implementation logic is genuinely complex.
21. Do not use lorem ipsum.
22. Do not invent client facts.
23. Keep placeholders explicitly marked.
24. Do not copy competitor branding or design.
25. Do not install UI/animation libraries that are not actually used.
26. Do not over-animate.
27. Maintain excellent Lighthouse/Core Web Vitals performance.
28. Test desktop, tablet and mobile layouts.
29. Ensure uploaded RFQ documents are handled privately and securely.
30. Keep the overall interface premium, calm and technically credible.

---

# 75. Source Reference Notes

The content architecture in this specification was developed after reviewing the public American Aeronex website and its pages, including:

```text
https://americanaeronex.com/
https://americanaeronex.com/about-us/
https://americanaeronex.com/ax-team/
https://americanaeronex.com/our-services/
https://americanaeronex.com/aircraft-acquisition-sales/
https://americanaeronex.com/aircraft-leasing/
https://americanaeronex.com/engines-parts-trading/
https://americanaeronex.com/aviation-solutions-consultancy/
https://americanaeronex.com/careers/
https://americanaeronex.com/contact-us/
https://americanaeronex.com/privacy-policy/
```

The purpose of these references is **content and information-architecture research only**.

Do not reproduce the competitor's:

- branding
- layout
- illustrations
- CSS
- code
- photographs without a valid licence
- employee data
- contact information
- legal text
- testimonials
- company-specific factual claims

---

# 76. Technology Reference Notes — September 2026

The selected stack reflects the current frontend ecosystem at the time this specification was prepared.

Useful official documentation:

```text
Next.js
https://nextjs.org/

Motion
https://motion.dev/docs/react

GSAP ScrollTrigger
https://gsap.com/docs/v3/Plugins/ScrollTrigger/

GSAP SplitText
https://gsap.com/docs/v3/Plugins/SplitText/

Lenis
https://github.com/darkroomengineering/lenis

shadcn/ui
https://ui.shadcn.com/

React Three Fiber
https://r3f.docs.pmnd.rs/
```

Implementation rule:

> Always install and verify the latest stable production-ready versions when development starts. Do not blindly pin versions from a planning document.

---

# 77. Final Creative Direction

The finished website should feel like a company that is comfortable handling high-value aviation requirements.

It should not need visual noise to prove sophistication.

The strongest version of this website will combine:

```text
70% exceptionally clean design
20% sophisticated motion
10% memorable technical/cinematic interaction
```

The user should come away with the feeling:

> **"This company is precise, capable, globally connected and serious about aviation."**

That is the target.
