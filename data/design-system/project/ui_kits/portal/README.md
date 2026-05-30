# Product Portal UI Kit — Infineon (application / developer)

A high-fidelity recreation of Infineon's denser **application UI** — the kind of
filter-and-table experience behind the **Product Finder** / myInfineon. Open `index.html`.

## What's interactive
- **Filter sidebar** — checkboxes for Market & Lifecycle actually filter the table; "Clear"
  resets; active filters also appear as removable chips above the table.
- **Search** — the app-bar search filters rows live by part number or product name.
- **Sort** — Relevance / Part number / Product name.
- **Row select** — checkboxes select rows; a "Compare (n)" action appears when ≥1 selected.
- **Row click** — opens a **detail drawer** (Esc / click-away to close) with a parameter table.
- Pagination control (visual).

## Components (`*.jsx`)
| File | Exports | Notes |
|------|---------|-------|
| `Primitives.jsx` | `Icon`, `Logo`, `Button`, `Badge`, `ImagePlaceholder` | Same primitives as the website kit (copied so the kit is self-contained). |
| `ProductTable.jsx` | `FilterSidebar`, `ProductTable`, `ROWS` | Sidebar + sortable/filterable data table; `ROWS` is the demo dataset. |
| `PortalShell.jsx` | `PortalApp` | App bar, results header, chips, pagination, detail drawer — wires it together. |

Load order: Primitives → ProductTable → PortalShell.

## Patterns worth reusing
- **Data table:** uppercase tracked caption headers, 1px `--grey-100` row dividers, hover →
  `--grey-50`, selected → `--ocean-50`. Part numbers in **mono** + Ocean.
- **Status:** `Badge` tones map to lifecycle (New / Active / NRND / End of life).
- **App chrome:** 60px sticky app bar, 248px filter rail, content on `--grey-50`, white cards.

## Substitutions (flagged)
Same as the website kit — Lucide icons + typographic logo placeholder stand in for the official
DDS icon set and logo.
