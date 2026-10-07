---
name: project-known-issues
description: Issues the user already knows about in the expense tracker (sample-data bug, Recharts bundle size); mention in one line at most, don't re-report
metadata:
  type: project
---

Known, intentional or accepted issues (as of 2026-10-07, commit b12abe5):
- Sample data in `src/App.jsx` has "Freelance Work" entered as an `expense` in category `salary`. This is the course's intentional bug.
- Recharts pushes the production bundle to about 565 kB. Known and accepted.

**Why:** This is a course starter that ships with a bug and messy code on purpose. The caller told me both of these are known.
**How to apply:** Mention each in one line at most, or skip it. Spend review space on other findings. Check the sample data again before assuming the bug is still there, since fixing it is a course step.
