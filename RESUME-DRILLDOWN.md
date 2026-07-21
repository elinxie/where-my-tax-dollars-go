# Resume checkpoint — spending drill-down

## Goal

Expand the live site so federal, California, and Santa Clara County spending categories can be opened into progressively deeper program, agency, recipient, and contractor details. Emphasize Medicare, Medicaid/Medi-Cal, health systems, and other large brackets. Use primary public budget and award sources, label mismatched fiscal years and accounting bases, and never imply that an individual tax payment is literally earmarked.

## Work plan

1. Preserve the current estimator, spouse-breakdown changes, and visual language.
2. Use `research/federal.md`, `research/california.md`, and `research/santa-clara.md` as the evidence handoff.
3. Add keyboard-accessible chart and list drill-down interaction with breadcrumb/back navigation, definitions, dollar equivalents, source links, and coverage caveats.
4. Label every contractor figure as paid/outlay, obligated/awarded, contract value/ceiling, encumbered, posted expenditure, or company financial context.
5. Run build and rendered tests, obtain independent source/method review, then publish to the existing Sites project.

## Integration contract — 2026-07-21

- This task is the integration owner for the existing combined P0 drill-down plus preserved spouse candidate.
- Do not discard or isolate the spouse changes while fixing the spending review.
- P0 re-review must cover the exact combined source after fixing mixed-basis percentage semantics, per-row basis labels, contractor placement, zero-actual status, and Medicare coverage presentation.
- Publication is additionally gated on spouse-specific interaction/visual QA, independent review of the spouse allocation language, and Eric's explicit approval of the combined release scope.
- If spouse review cannot pass or Eric declines the combined scope, hand back to the project manager for a fully revalidated isolated P0-only release state.

## Recovery instructions

- Read `AGENTS.md`, `PROJECT_BOARD.md`, this file, and `git status` before editing.
- Preserve all unfinished user and spouse-feature changes; re-read shared files immediately before patching.
- Keep primary-source URLs and retrieval dates in the site data or `SOURCES.md`.
- Do not replace the current site architecture or estimator.

## Exact candidate evidence — 2026-07-21

- Spending independent re-review: PASS after correcting mixed-basis percentage semantics, vendor placement, zero-actual status, and Medicare Part A/coverage presentation.
- Spouse independent re-review: PASS after constraining joint inputs to W-2 wages used as an AGI proxy, declaring mixed W-2/self-employed households unsupported, and explaining joint-return recomputation before allocation.
- Browser QA: Medicare context view hides percentages and explains the accounting-basis change; the joint two-income interaction reconciles; desktop and 390px mobile layouts have no horizontal overflow.
- Automated gate: production build, lint, `git diff --check`, and 11 tests all pass through `pnpm test` plus `pnpm run lint`.
- Eric approved the combined public release.

## Deployment evidence — 2026-07-21 14:38 PDT

- Published Sites version 2 from reviewed source commit `8314983bdeb2c3d0941b14a33fca702b02c4aabf`.
- Production deployment succeeded at `https://where-my-tax-dollars-go.ericlinxie.chatgpt.site`.
- Live P0 check: opening Medicare shows `Context, not a 100% split`, explains the CY2024 gross-cost versus FY2024 net-outlay basis change, and renders no percentage chart at that level.
- Live P1 check: married filing jointly with $140,000 combined wages and $70,000 spouse wages renders two $15,419 allocated burdens, reconciles to the household result, and shows the reviewed joint-return explanation.
- Final gate immediately before publication: production build, lint, `git diff --check`, and 11/11 tests passed.
- Removed the unused generated duplicate `public/og 2.png`; the reviewed `public/og.png` and application behavior were unchanged.
- Deleted the completed `resume-tax-spending-drill-down` recovery automation.
