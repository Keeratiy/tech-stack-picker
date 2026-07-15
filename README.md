# Tech Stack Picker

A single-page React application for composing technology stacks. Browse ~30 categories of backend and frontend technologies, make your selections, and generate an architecture prompt to share.

Built with **React 19**, **TypeScript 6**, **Vite 8**, **Tailwind CSS 4**, and **Vitest**.

## Quick Start

```bash
bunx --bun vite                    # Start dev server
bunx --bun vitest run --environment jsdom  # Run tests
tsc -b && vite build               # Type-check + build
eslint .                           # Lint
```

## Features

- Browse technologies across 20 backend and 10 frontend categories
- Single-select (radio) and multi-select (checkbox) modes
- Search/filter technologies by name, description, or strengths
- Selections persist in `localStorage`
- Summary view with copy-to-clipboard architecture prompt
- Responsive design with mobile tabs
- Keyboard accessible with ARIA support

## Project Structure

```
src/
├── main.tsx                  # Entry point
├── App.tsx                   # Root component with view routing
├── index.css                 # Tailwind theme + base styles
├── types/catalog.ts          # TypeScript type definitions
├── data/technologies.json    # Technology catalog data
├── lib/stack.ts              # Pure business logic
├── hooks/useStackPicker.ts   # State management hook
└── components/               # UI components
    ├── AppHeader.tsx
    ├── DomainCatalog.tsx
    ├── CategoryPanel.tsx
    ├── TechnologyCard.tsx
    ├── SelectedStack.tsx
    ├── StackSummary.tsx
    └── MobileViewTabs.tsx
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build | Vite 8 + SWC |
| Styling | Tailwind CSS 4 |
| Icons | lucide-react + simpleicons.org |
| Testing | Vitest + Testing Library |
| Linting | ESLint 10 + typescript-eslint |

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
