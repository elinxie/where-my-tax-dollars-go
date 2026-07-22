# Resume checkpoint — Off-Codex portability & migration

## Objective

Make the whole project — site and data, not just coordination docs — buildable, runnable, deployable, and
updatable by any AI agent or human without Codex/OpenAI, while keeping the move fully reversible (able to
return to Codex on demand).

## Owner role

Migration and Company Systems Architect (see `PROJECT_BOARD.md`). Product owner and required decider: Eric.

## State

Proposal + reversible repository-local scaffolding drafted. No external move executed. No accounts, spend,
data movement, or production change. Awaiting Eric's target decision and execution authorization.

## Authorized scope

- Write repository-local proposal, comparison, round-trip guide, and portable records.
- Stage (not apply) reversible, behavior-preserving code scaffolding.

## Forbidden without Eric's approval

Connecting accounts, deploying to a new host, moving/exporting data, spending, changing subscriptions,
retiring the `sites` remote, or any destructive removal of the OpenAI/Codex files.

## Key findings (evidence)

- No live database to migrate: `db/schema.ts` empty (`export {}`); `drizzle/meta/_journal.json` entries
  `[]`; `.openai/hosting.json` has `d1: null, r2: null`; no `getDb()` use in `app/`.
- Data is in-repo and versioned: `app/spending-data.ts`, `app/tax-estimator.mjs`, `data/coverage.json`,
  `research/*.md`, `SOURCES.md`, `docs/`.
- App is client-rendered: `app/page.tsx` is `"use client"`; no runtime server data. `app/layout.tsx` uses
  `headers()` only for metadata origin.
- ChatGPT auth is dead code: `app/chatgpt-auth.ts` imported nowhere.
- Real couplings only: `sites` remote, `.openai/hosting.json` import in `vite.config.ts`, `vinext`,
  `build/sites-vite-plugin.ts`, `CODEX_SANDBOX` branch (inert off Codex).

## Files owned / added by this task

- `docs/PORTABILITY_MIGRATION.md` (inventory, target comparison + recommendation, staged patches,
  round-trip guide, owner decisions).
- `docs/PORTABILITY_MIGRATION_PROMPT.md` (optional kickoff prompt for a Codex PM, if delegating instead).
- This checkpoint.
- Proposed rows appended to `coordination/DECISIONS.md` (OPS-004..006, status `proposed`).
- Staged + VALIDATED static-deploy path (additive, reversible, client-only): `static.html`,
  `build/static-entry.tsx`, `vite.static.config.ts`, `build/finish-static.mjs`, `build:static` script in
  `package.json`, and `.github/workflows/deploy-pages.yml` (deploys `dist-static/`). Built and rendered on
  the owner's machine 2026-07-21: full site + live receipt math, no console errors. The earlier
  vinext-output prerender was abandoned — vinext is RSC and needs a live server, so a client-only build is
  required for a static host. Inert until GitHub Pages is enabled.

Do not concurrently edit `vite.config.ts`, `package.json`, or `app/` shared files with another writer.

## Recommendation to Eric

Static export + GitHub Pages (fallback: Cloudflare Pages). Rationale in
`docs/PORTABILITY_MIGRATION.md` §3. Keep all Codex/OpenAI files dormant (do not delete) so round-trip
stays a `git revert` + remote re-add, never a rebuild.

## Validation

Documentation-only; no app/data/dependency file changed. `git diff --check` expected clean. The staged
code patches in §4 must be validated with `pnpm run lint && pnpm test && git diff --check` before any
commit.

## Proposed board delta (for the Project Manager to apply — not applied here)

Add under Work:

```
| P3 | proposed | Off-Codex portability: static/neutral deploy + reversible round-trip | Migration & systems architect | Eric picks target and authorizes execution | docs/PORTABILITY_MIGRATION.md; RESUME-PORTABILITY-MIGRATION.md; DECISIONS OPS-004..006 |
```

## Next safe action

Eric answers the six decisions in `docs/PORTABILITY_MIGRATION.md` §6. On a target choice + execution
authorization, implement the additive deploy path in a branch, validate, verify parity against P0/P1
evidence, then record the deploy decision and update the board.

## Handoff — 2026-07-21

- Role and platform: Migration & Systems Architect; drafted off-platform with repo access.
- State: review — proposal + staged scaffolding, no execution.
- Authorized scope completed: inventory, target comparison, round-trip guide, portable records, staged
  reversible patches.
- Repository evidence: `docs/PORTABILITY_MIGRATION.md`, `docs/PORTABILITY_MIGRATION_PROMPT.md`, this file,
  proposed `coordination/DECISIONS.md` rows.
- Validation: docs-only; `git diff --check` expected clean; code patches gated on toolchain validation.
- Uncommitted-work safety: added new files only; did not edit `PROJECT_BOARD.md` or existing checkpoints.
- Next safe action: Eric decides §6; then additive execution in a branch.
- Blockers / owner decisions: target platform + execution authorization (Eric).
- Forbidden next actions: account connection, new-host deploy, data move, `sites`-remote retirement,
  destructive file removal — all until Eric authorizes.
