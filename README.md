<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/react-19-58c4dc?logo=react&logoColor=white">
    <img alt="Tech Stack Picker" src="https://img.shields.io/badge/react-19-58c4dc?logo=react&logoColor=white">
  </picture>
  <img src="https://img.shields.io/badge/typescript-6.0-3178c6?logo=typescript&logoColor=white" alt="TypeScript 6">
  <img src="https://img.shields.io/badge/vite-8-646cff?logo=vite&logoColor=white" alt="Vite 8">
  <img src="https://img.shields.io/badge/tailwind-4-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/vitest-4-6e9f18?logo=vitest&logoColor=white" alt="Vitest 4">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
</p>

# 🧩 Tech Stack Picker

> Compose your ideal technology stack by browsing ~30 categories of backend and frontend technologies. Select, review, and generate a shareable architecture prompt — all in one place.

## ✨ Features

- **🗂️ Browse by Domain** — Explore 20+ backend and 10+ frontend technology categories
- **🎯 Flexible Selection** — Single-select (radio) and multi-select (checkbox) modes per category
- **🔍 Live Search** — Filter technologies by name, description, or strengths in real time
- **💾 Persistent State** — Selections automatically saved to `localStorage` across sessions
- **📋 Summary & Export** — View your complete stack and copy an architecture prompt to clipboard
- **📱 Responsive Design** — Mobile-first layout with dedicated tab navigation on small screens
- **♿ Accessible** — Keyboard navigation, ARIA attributes, focus management, and reduced-motion support

## 🚀 Quick Start

```bash
# Prerequisites: Node.js ≥ 22, Bun ≥ 1.2

# Install dependencies
bun install

# Start development server
bunx --bun vite

# Run tests
bunx --bun vitest run --environment jsdom

# Type-check and build for production
tsc -b && vite build

# Lint
eslint .
```

## 📦 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [React 19](https://react.dev/) | UI component library |
| **Language** | [TypeScript 6](https://www.typescriptlang.org/) | Type-safe JavaScript |
| **Build** | [Vite 8](https://vite.dev/) + SWC | Fast dev server & bundler |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| **Icons** | [lucide-react](https://lucide.dev/) + [Simple Icons](https://simpleicons.org/) | UI & brand icons |
| **Testing** | [Vitest 4](https://vitest.dev/) + [Testing Library](https://testing-library.com/) | Unit & integration tests |
| **Linting** | [ESLint 10](https://eslint.org/) + [typescript-eslint](https://typescript-eslint.io/) | Code quality |
| **Compiler** | [React Compiler](https://react.dev/learn/react-compiler) | Automatic memoization via Babel plugin |

## 🏗️ Architecture

```
src/
├── main.tsx                     # Application entry point
├── App.tsx                      # Root component — manages pageView state ("picker" | "summary")
├── index.css                    # Tailwind CSS 4 theme (@theme custom palette) + base styles
│
├── types/catalog.ts             # TypeScript type definitions (Domain, SelectionMode, Catalog, etc.)
├── data/technologies.json       # Technology catalog — ~30 categories with single/multi modes
│
├── lib/stack.ts                 # Pure business logic — toggleSelection, filterCatalog, sanitizeSelections
├── hooks/useStackPicker.ts      # State management — useState + localStorage sync (key: "tech-stack-picker:v1")
│
└── components/
    ├── AppHeader.tsx            # App title + navigation toggle
    ├── DomainCatalog.tsx        # Renders a domain section (backend / frontend) with its categories
    ├── CategoryPanel.tsx        # Category group with search input + technology cards
    ├── TechnologyCard.tsx       # Individual technology — radio or checkbox, icon with fallback
    ├── SelectedStack.tsx        # Sidebar showing current selections
    ├── StackSummary.tsx         # Full summary view with copy-to-clipboard prompt
    └── MobileViewTabs.tsx       # Tab switcher for mobile (hidden on lg+)
```

### Component Tree

```
App.tsx
├── StackSummary              (pageView === "summary")
└── AppHeader + DomainCatalog × 2 + SelectedStack   (pageView === "picker")
    ├── DomainCatalog → CategoryPanel → TechnologyCard
    └── MobileViewTabs        (hidden on lg+)
```

### Data Flow

1. `useStackPicker` hook initializes state from `localStorage` (key: `tech-stack-picker:v1`)
2. User interactions call pure functions from `lib/stack.ts` (e.g., `toggleSelection`)
3. Updated `SelectionState` flows down via props to `DomainCatalog` → `CategoryPanel` → `TechnologyCard`
4. `useEffect` syncs every state change back to `localStorage`
5. `StackSummary` reads the same state to render the final report

## 🧪 Testing

```bash
# Run all tests
bunx --bun vitest run --environment jsdom

# Watch mode
bunx --bun vitest --environment jsdom
```

- **Unit tests** (`*.test.ts`) — Pure logic in `lib/stack.ts`
- **Integration tests** (`*.test.tsx`) — Component rendering and user interactions via Testing Library

## 🎨 Design System

The app uses a custom Tailwind CSS 4 theme defined in `src/index.css`:

| Token | Value | Usage |
|---|---|---|
| `paper` | `#fbf9f6` | Page background |
| `ink` | `#191919` | Text color |
| `rule` | `#eae5dc` | Borders, dividers |
| `muted` | `#6f6a62` | Secondary text |
| `coral` | `#c65d3b` | Accent / primary actions |
| `coral-soft` | `#f4e4dc` | Selection highlight |

Typography uses **IBM Plex Sans** (UI) and **Newsreader** (editorial) from Google Fonts.

## 📄 License

[MIT](LICENSE) © 2026 Keeratiy
