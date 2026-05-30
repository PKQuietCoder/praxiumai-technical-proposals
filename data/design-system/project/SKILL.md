---
name: infineon-design
description: Use this skill to generate well-branded interfaces and assets for Infineon Technologies, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. If working on production code, you can copy
assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## What's here
- `README.md` — brand context, content & visual foundations, iconography, full file index.
- `colors_and_type.css` — all design tokens (color, type scale, spacing, radii, shadow, motion).
  Link this stylesheet and use the CSS variables; do not invent new colors.
- `assets/` — logo placeholder + any imagery.
- `preview/` — small spec cards (colors, type, components) you can reference.
- `ui_kits/website/` — marketing-site components (`Primitives`, `Header`, `Sections`, `Footer`).
- `ui_kits/portal/` — application/table components (`FilterSidebar`, `ProductTable`, `PortalShell`).

## Non-negotiables
- **Typeface:** Source Sans 3 (Regular 400 / Semibold 600). Headings semibold; body regular.
- **Primary color:** Ocean teal-green `#0A8276` for actions, links, focus. Engineering blue
  `#08266E` for inverse/footer. White-dominant canvases; cool-grey neutrals.
- **Tone:** engineering-credible, plain, confident. Sentence case. Keep product ™ names exact
  (AURIX™, CoolSiC™, OPTIGA™, PSoC™, XENSIV™). No emoji. Verb-first CTAs.
- **Restraint:** small radii (2–6px), subtle cool shadows, quiet 150–200ms motion. No loud
  gradients or textures.

## Known substitutions to fix when assets are provided
- Official Infineon **logo SVG** (currently a typographic placeholder).
- Official **DDS icon set** (currently Lucide via CDN).
- **Exact token values** from Infineon's public GitHub (`Infineon-Design-System-Tokens`,
  `infineon-design-system-tailwind-config`) — current secondary/neutral values are close matches.
- Real Infineon **photography** (currently gradient `ImagePlaceholder` blocks).
