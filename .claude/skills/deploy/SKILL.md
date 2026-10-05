---
name: deploy
description: Deploy the expense tracker to staging - run all tests, build the production bundle, then push to the staging branch. Use when the user asks to deploy or ship to staging.
disable-model-invocation: true
---

# Deploy to staging

Run these steps in order. **Stop at the first failure**, show the user the error output, and do not continue to later steps.

## 1. Pre-flight

- Run `git status`. If there are uncommitted changes, stop and ask the user whether to commit them first. Never deploy a dirty working tree, because the build would not match any commit.
- Note the current branch and commit (`git rev-parse --short HEAD`) for the final report.

## 2. Run all tests

- If `package.json` has a `test` script, run `npm test` and make sure it passes.
- If there is no `test` script, tell the user that no test runner is configured and that this step is limited to lint.
- Always run `npm run lint`. Lint errors fail the deploy.

## 3. Build the production bundle

- Run `npm run build`. It must exit 0 and produce `dist/`.
- The chunk-size warning (bundle over 500 kB) is not a failure, but mention it in the report.

## 4. Push to staging

- Staging is the `staging` branch on the `origin` remote.
- Check that `origin` is a repository the user can push to. If it points to someone else's repo (for example the upstream course repo), stop and ask the user which remote to use.
- Ask the user to confirm before pushing, naming the commit and the target, for example: "Push `abc1234` to `origin/staging`?"
- On confirmation, run `git push origin HEAD:staging`. Never use `--force`. If the push is rejected, report it and ask the user how to proceed.

## 5. Report

Summarize briefly:
- tests/lint result (and whether a real test suite ran)
- build result and bundle size from the Vite output
- the commit pushed and the target branch, or the step where the deploy stopped
