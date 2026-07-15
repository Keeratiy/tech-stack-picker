# Tech Stack Picker — Agent Guide

## Project Overview

A React SPA for composing technology stacks by selecting technologies across ~30 categories. Selections persist in `localStorage`. Users can view a summary report and copy an architecture prompt to clipboard.

**Stack:** React 19 + TypeScript 6.0 + Vite 8 + SWC + Tailwind CSS 4 + Vitest 4

## Quick Start

```bash
bunx --bun vite          # Dev server
bunx --bun vitest run --environment jsdom  # Run tests
tsc -b && vite build     # Type-check + build
eslint .                 # Lint
```

## Architecture

- **Two-page SPA** — `pageView` state (`"picker"` | `"summary"`) in `App.tsx` controls view; no router library
- **Pure business logic** in `src/lib/stack.ts` — `toggleSelection`, `filterCatalog`, `getSelectedCategories`, `sanitizeSelections`
- **State management** via `useStackPicker` hook — `useState` + `useEffect` syncing to `localStorage` (key: `"tech-stack-picker:v1"`)
- **Data** in `src/data/technologies.json` — ~30 categories, each with `mode: "single"` (radio) or `"multi"` (checkbox)

## Key Conventions

- **TypeScript strict mode** with `erasableSyntaxOnly: true` — no enums, no namespaces, no `enum` keyword
- **Tailwind CSS 4** with `@theme` custom palette (paper, ink, rule, muted, coral) — see `src/index.css`
- **Accessibility-first** — `aria-pressed`, `aria-label`, `role`, focus management, `sr-only`, `prefers-reduced-motion`
- **Icons** via `lucide-react` + simpleicons.org CDN (`https://cdn.simpleicons.org/{slug}`) with fallback to first-letter
- **No CSS modules or CSS-in-JS** — pure Tailwind utility classes; `App.css` is legacy/unused
- **Testing** with Vitest + Testing Library + jsdom; unit tests in `*.test.ts`, integration tests in `*.test.tsx`

## Component Tree

```
App.tsx
├── StackSummary (pageView === "summary")
└── AppHeader + DomainCatalog × 2 + SelectedStack (pageView === "picker")
    ├── DomainCatalog → CategoryPanel → TechnologyCard
    └── MobileViewTabs (hidden on lg+)
```

## Data Types (`src/types/catalog.ts`)

- `Domain`: `"backend"` | `"frontend"`
- `SelectionMode`: `"single"` | `"multi"`
- `SelectionState`: `Record<string, string[]>` — `categoryId → technologyId[]`
- `Technology`, `TechnologyCategory`, `Catalog`, `SelectedCategory`

## Important Notes

- The README is the default Vite template — not customized. Refer to this file for project-specific guidance.
- `App.css` contains old Vite template styles and is **not used**; all styling is in Tailwind classes.
- Build uses `bunx --bun` to run Vite with Bun runtime.
- React Compiler is enabled via `babel-plugin-react-compiler`.
