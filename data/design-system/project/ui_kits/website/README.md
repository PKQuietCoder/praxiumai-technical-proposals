# Website UI Kit — Infineon (marketing / corporate)

A high-fidelity, interactive recreation of the **infineon.com** marketing surface, built from
the DDS foundations in `../../colors_and_type.css`. Open `index.html` for the live demo.

## What's interactive
- **Header** — sticky, with dropdown nav items, a full-width **search overlay** (click the
  search icon), `myInfineon` button, and a responsive **mobile drawer** (resize below 860px).
- **Product finder** — the filter chips actually filter the product grid by market segment.
- **Product cards** — click any card to open a **slide-in detail drawer** (Esc or click-away to
  close) with key-parameter table and datasheet/CTA buttons.

## Components (`*.jsx`)
| File | Exports | Notes |
|------|---------|-------|
| `Primitives.jsx` | `Icon`, `Logo`, `Button`, `Badge`, `ImagePlaceholder` | Building blocks. `Button` has primary / secondary / tertiary / inverse / ghost variants. |
| `Header.jsx` | `Header` | Utility bar + main nav + search overlay + mobile drawer. |
| `Sections.jsx` | `Hero`, `Segments`, `ProductFinder`, `Highlight`, `Newsroom` | Page sections; `Highlight` is the inverse (engineering-blue) banner. |
| `Footer.jsx` | `Footer`, `ProductDrawer` | Multi-column footer + product detail drawer. |

Each file exports to `window` (Babel scripts don't share scope) — load order matters:
Primitives → Header → Sections → Footer.

## Substitutions (flagged)
- **Icons:** Lucide via CDN (DDS icon set unavailable to copy). Brand/social glyphs use neutral
  Lucide icons since Lucide removed brand marks.
- **Logo:** typographic placeholder wordmark — replace with the official Infineon SVG.
- **Photography:** `ImagePlaceholder` gradient blocks stand in for real Infineon imagery. Drop
  real photos in and swap them.

## Known-good patterns to reuse
- Section rhythm: alternate `--white` and `--grey-50` backgrounds; 64px vertical padding;
  1280px max-width; 24px gutters.
- Cards: 1px `--border` + `--shadow-1`, lift to `--shadow-2` on hover, Ocean title on hover.
- CTAs: verb-first, sentence case, trailing `arrow-right`.
