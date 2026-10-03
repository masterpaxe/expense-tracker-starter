# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course: a React expense tracker that **intentionally** ships with a bug, poor UI, and messy code, to be fixed incrementally. Expect changes to be refactors/fixes of existing code rather than greenfield work.

## Commands

```bash
npm install
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run lint     # ESLint (flat config, eslint.config.js)
```

There is no test runner configured yet.

## Architecture

- Vite 7 + React 19, plain JavaScript (JSX), ES modules. No router, state library, backend, or persistence.
- `src/main.jsx` mounts `<App />` in `StrictMode`.
- Almost all logic lives in a single component, `src/App.jsx`:
  - Transactions are held in `useState`, seeded with hardcoded sample data, and lost on reload.
  - Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. New IDs come from `Date.now()`.
  - `amount` is stored as a **string**, both in the seed data and from the form's number input. Totals are computed with `reduce((sum, t) => sum + t.amount, 0)`, so keep the numeric conversion in mind when you touch totals.
  - Income, expense, and balance totals and the type/category filters are derived on every render rather than stored in state.
  - The category list is a hardcoded array that both the add form and the filter dropdown use.
- Styling: global CSS in `src/App.css` and `src/index.css`. No CSS modules or framework.

## Lint notes

`no-unused-vars` ignores identifiers that start with an uppercase letter or `_`. `react-hooks` and `react-refresh` (Vite) rules are on.
