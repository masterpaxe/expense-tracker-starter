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
- Components live flat in `src/`, one per file, each with a default export. Each one holds only the state it needs:
  - `App.jsx` owns the `transactions` array, seeded with hardcoded sample data in `useState` and lost on reload. It also owns the hardcoded `categories` list, passes both down as props, and adds new transactions through `handleAdd`.
  - `Summary.jsx` receives `transactions` and works out total income, total expenses, and balance on every render.
  - `TransactionForm.jsx` owns the form field state, validates input, builds the new transaction (ID from `Date.now()`, date as `YYYY-MM-DD`), and passes it to the `onAdd` callback.
  - `TransactionList.jsx` owns the type and category filter state and draws the filtered table from the `transactions` prop.
- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. `amount` must be a **number**: the form converts its input with `parseFloat`, and the totals in `Summary` sum it with `reduce`. A string amount concatenates instead of adding.
- Styling: global CSS in `src/App.css` and `src/index.css`. No CSS modules or framework.

## Lint notes

`no-unused-vars` ignores identifiers that start with an uppercase letter or `_`. `react-hooks` and `react-refresh` (Vite) rules are on.
