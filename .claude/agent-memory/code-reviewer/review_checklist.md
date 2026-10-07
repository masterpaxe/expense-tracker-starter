---
name: review-checklist
description: Recurring issues to check first when reviewing the expense tracker (hardcoded colors vs CSS tokens, duplicated defaults, UTC date, "this month" copy)
metadata:
  type: project
---

Recurring issues found in the first full review (2026-10-07, b12abe5). Before repeating any of them, check that it is still in the code:
- Hex colors hardcoded in JS or CSS when a `:root` token in `src/index.css` already covers them (SpendingChart constants, the `:hover` color in App.css).
- Form defaults (`"expense"`, `"food"`) repeated between `useState` and the reset code. The income/expense `<option>` lists are duplicated in the form and the list.
- Static data (sample transactions, categories) declared inside component bodies.
- The same filter-and-sum of transactions is repeated in Summary and SpendingChart.
- The Summary text says "this month", but the totals cover all transactions.
- `npm run lint` was clean at that point. `public/vite.svg` exists, and `src/assets/react.svg` is not used.

User reactions to these suggestions:
- Accepted: the UTC date bug. It was fixed in 78df5e4 with a local-date `todayLocal()` helper in TransactionForm.jsx. Don't re-report it.
- The rest have no decision yet. Record accepted or rejected suggestions here or in a feedback memory.

**Why:** These come up repeatedly in this codebase, so checking them first speeds up the next review.
**How to apply:** Check this list first, then drop items the code no longer has.
