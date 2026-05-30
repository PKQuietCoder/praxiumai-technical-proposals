# Infineon Design System

A design system reconstructed from **Infineon Technologies'** public digital presence
(infineon.com) and its publicly published **Digital Design System (DDS)**. It exists so a
design agent can produce on-brand Infineon interfaces, slides, and assets — for production
or for throwaway prototypes/mocks.

> ⚠️ **Fidelity note.** This system was built from Infineon's public web identity plus my
> working knowledge of the DDS. The **typeface (Source Sans 3)** and the **primary "Ocean"
> teal-green** are exact. Secondary accents, the neutral grey scale, shadow and radius tokens
> are matched to the DDS *by eye* and are very close, not byte-exact. Infineon publishes the
> real values openly — see **Sources** below. Connect those repos and I'll swap in the exact
> tokens.

---

## Company & product context

**Infineon Technologies AG** is a German semiconductor manufacturer, spun off from Siemens in
1999 and headquartered in Neubiberg near Munich. It is one of the world's largest chipmakers,
with ~58,000 employees. Its products power automotive electronics, industrial and renewable
power, IoT, and security.

Infineon organizes around four operating segments, each of which shows up as a content domain
on infineon.com:

- **Automotive (ATV)** — microcontrollers (AURIX), power, sensors for ADAS, EV powertrain.
- **Green Industrial Power (GIP)** — power semiconductors for renewables, grid, drives.
- **Power & Sensor Systems (PSS)** — power supplies, RF, sensors, audio.
- **Connected Secure Systems (CSS)** — microcontrollers (PSoC), connectivity, security chips.

### Surfaces represented in this system
1. **Marketing / corporate website** (`infineon.com`) — product discovery, solution pages,
   newsroom, careers. The primary surface this system targets. → `ui_kits/website/`
2. **Developer / product portal** patterns (myInfineon, product finder, documentation) —
   denser, table- and filter-heavy application UI built from the same DDS components.
   → `ui_kits/portal/`

---

## Sources

These are the public materials this system is grounded in. The reader may or may not have
access; they are recorded so exact values can be pulled later.

- **infineon.com** — live marketing site (visual reference for layout, color usage, tone).
- **Infineon Digital Design System (DDS)** — the internal/public component system.
  - Design tokens (SCSS): `github.com/Infineon/Infineon-Design-System-Tokens`
    → confirms **Source Sans 3** (Regular/Semibold/Italic) as the system font.
  - Tailwind config: `github.com/Infineon/infineon-design-system-tailwind-config`
    → full color palette + shades, box-shadow, border-radius, font sizes `display-01 … body-06`.
  - npm: `@infineon/design-system-tokens`, web components: `@infineon/infineon-design-system-stencil`.
- No codebase or Figma file was attached to this project — the reconstruction is from the
  public web + DDS docs. **To reach byte-exact tokens, connect the GitHub repos above.**

---

## Content fundamentals

How Infineon writes. The voice is **engineering-credible, plain, and confident** — a serious
B2B semiconductor company, not a consumer brand. It avoids hype and emoji.

- **Tone:** factual, benefit-led, technically precise. Trust and reliability over excitement.
  Sustainability ("decarbonization", "energy efficiency") and enablement ("we drive
  decarbonization and digitalization") are recurring themes.
- **Person:** addresses the reader as **"you"** ("Find your product", "Discover our
  solutions"); speaks for the company as **"we / Infineon"**. Product copy is third-person and
  spec-forward.
- **Casing:** **Sentence case** for headings and buttons ("Explore products", not "Explore
  Products"). Product and family names keep their official casing — **AURIX™, OPTIGA™, PSoC™,
  CoolMOS™, XENSIV™** — almost always with a **™**. The company is always "Infineon".
- **Tagline / motto:** _"Driving decarbonization and digitalization. Together."_
- **CTAs:** short, verb-first — "Learn more", "Read more", "Contact us", "Download", "Find your
  product", "Get started", "Show more".
- **Microcopy / sections:** "Product highlights", "Related products", "Applications",
  "Support", "Documents & resources", "Newsroom", "Investor relations".
- **Numbers & units:** technical and exact — voltages, current, package codes, part numbers
  (e.g. "650 V CoolSiC™ MOSFET"). Stats are sparing and substantiated, never decorative.
- **Emoji:** none. **Icons** (line icons) carry visual meaning instead.
- **Vibe in one line:** *"Quietly authoritative German engineering — clean, exact, useful."*

Example copy patterns:
- Hero: **"Powering the green and digital transformation"** / "We make life easier, safer and
  greener."
- Card: overline category → bold title → one-line description → "Learn more →".
- Product row: part name (™) · key spec · package · status badge.

---

## Visual foundations

The look is **bright, clean, white-dominant, and orderly** — lots of whitespace, a confident
teal-green primary, restrained rounding, and subtle elevation. It reads corporate-modern, not
playful.

- **Color:** White is the dominant canvas. **Ocean teal-green `#0A8276`** is the primary
  action/identity color (links, primary buttons, active states, focus). The **engineering blue
  `#08266E`** (the logo blue) anchors dark/inverse sections, footers, and deep accents.
  Secondary accents — green, orange, berry/magenta — appear sparingly in editorial/marketing
  contexts and data viz. Neutrals are a **cool grey** scale. See `colors_and_type.css`.
- **Type:** **Source Sans 3** throughout — a humanist sans with excellent legibility at small
  sizes. Headings are **Semibold (600)** with slightly tight tracking; body is **Regular (400)**
  at 16px base and generous 1.5–1.55 line-height. Overlines/eyebrows are uppercase, tracked,
  small, in muted grey. No serif, no display face.
- **Layout:** structured 12-column grid, wide max-width (~1280–1440px) with comfortable
  gutters. Generous vertical rhythm between sections. Content is **left-aligned**; centered
  layouts reserved for hero moments. Strong horizontal banding — alternating white and
  `--grey-50` section backgrounds — gives the long marketing pages cadence.
- **Backgrounds:** mostly flat white / pale grey. Photography is used full-bleed for heroes and
  feature cards (industrial, automotive, clean-energy, abstract-tech imagery — typically bright,
  cool-to-neutral, optimistic). Occasional very subtle teal tints behind feature blocks. **No
  loud gradients, no textures, no hand-drawn illustration.** A restrained brand "swoosh/dot"
  motif (from the logo) is the only graphic flourish.
- **Imagery vibe:** crisp, well-lit, modern product and application photography; cool/neutral
  white balance; people-and-technology or clean-tech scenes; never grainy or moody.
- **Corner radii:** small and restrained — buttons and inputs ~2–4px, cards ~4–6px. Nothing
  pill-shaped except tags/chips and toggles. The system feels *engineered*, not soft.
- **Cards:** white surface, 1px `--grey-200` border **or** a soft `--shadow-1/2`, ~4–6px radius,
  generous internal padding (20–24px). Hover lifts a card with `--shadow-2` and may show an
  Ocean title/arrow. Cards rarely combine heavy borders + heavy shadows.
- **Borders & dividers:** thin (1px) cool-grey hairlines structure tables, lists, and section
  edges. Strong reliance on rules and alignment over boxes.
- **Elevation / shadow:** subtle, cool-tinted (`rgba(10,30,40,…)`), low-spread. Used for
  menus, popovers, hovered cards, and sticky headers — never decoratively.
- **Hover states:** links → darker Ocean + underline; primary buttons → darken to
  `--ocean-600`; cards → shadow lift; nav items → Ocean text + underline bar. Subtle, fast.
- **Press/active:** further darken (`--ocean-700`); no large scale bounce. Maybe a 1px nudge.
- **Focus:** visible Ocean focus ring (`--shadow-focus`, a 3px translucent teal halo) — the
  brand takes accessibility seriously.
- **Transparency / blur:** sparing. Sticky header may sit on near-opaque white. Image overlays
  use a soft dark scrim (protection gradient) under hero text rather than a solid capsule.
- **Animation:** quiet and functional — short fades and 150–200ms ease transitions
  (`cubic-bezier(0.4,0,0.2,1)`). No bouncing, no parallax theatrics. Motion communicates state,
  not personality.
- **Fixed elements:** sticky top header/nav; sometimes a sticky in-page sub-nav on long product
  pages; "back to top" affordance.

---

## Iconography

- **Style:** **line (outline) icons**, consistent ~1.5–2px stroke, rounded joins, on a 24px
  grid — matching the clean, technical DDS aesthetic. Icons are monochrome, inheriting
  `currentColor` (usually `--fg-2` or Ocean when interactive). Filled icons are rare and
  reserved for status/toggle states.
- **Source in this system:** Infineon's DDS ships its own icon set (`@infineon/…` design system
  fonts/SVGs). I could **not** download those assets here (no file/Figma access). As a
  **documented substitution**, UI kits and cards use **[Lucide](https://lucide.dev)** via CDN —
  an open line-icon set with the same ~1.75px stroke weight and rounded-join style, which is a
  very close visual match. **Flagged:** swap to the official DDS icon set when its assets are
  available.
- **Emoji:** never used.
- **Unicode glyphs as icons:** avoid; use proper icons. Arrows in CTAs ("Learn more →") use a
  real arrow icon, though an en-arrow `→` is acceptable inline.
- **Logo / brand mark:** the Infineon logo is the **"Infineon" wordmark in engineering blue**
  accompanied by a small **red/orange dot + swoosh** mark. The official trademarked logo SVG was
  **not available to copy** here. `assets/logo-wordmark.html` provides a **typographic
  placeholder** (wordmark set in the brand font) — clearly a stand-in. **Please drop the
  official Infineon logo SVG into `assets/` and I'll wire it in everywhere.**

---

## Index — what's in this system

| Path | What it is |
|------|------------|
| `README.md` | This file — context, content & visual foundations, iconography, index. |
| `colors_and_type.css` | All design tokens: color, type scale, spacing, radii, shadow, motion. |
| `SKILL.md` | Agent-Skill manifest so this folder works as a Claude Skill. |
| `assets/` | Logos (placeholder), brand motif, any copied imagery. |
| `preview/` | Small HTML cards rendered in the Design System tab (colors, type, components…). |
| `ui_kits/website/` | Marketing-site UI kit — header, hero, cards, footer, buttons, fields. `index.html` is an interactive demo. |
| `ui_kits/portal/` | Product/developer-portal UI kit — product finder, tables, filters, status. |

### Open questions / asks for the user
1. **Connect the Infineon GitHub token repos** (or paste `tailwind.config.js`) so I can replace
   the approximated secondary/neutral/shadow tokens with exact DDS values.
2. **Provide the official Infineon logo SVG** and, if you have it, the **DDS icon set** — I'm
   currently using a typographic logo placeholder and Lucide icons as a flagged substitution.
3. Confirm whether you want the **portal/app** surface fleshed out further, or just the
   marketing website.
