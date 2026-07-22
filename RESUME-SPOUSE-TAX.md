# Resume checkpoint — Spouse tax burden and household budget

## Objective

Extend the Tax Dollars Explorer so married users can understand both spouses' tax burdens instead of seeing only a changed household total when spouse income is added.

## Required product behavior

1. When the filing setup includes a spouse, calculate and display:
   - the user's estimated tax burden;
   - the spouse's estimated tax burden;
   - the combined household tax burden;
   - the combined gross household income or budget basis;
   - the share of that household budget consumed by the combined taxes.
2. Break each spouse's burden into the same meaningful tax components already supported by the estimator, while showing joint-return taxes as an allocation rather than falsely claiming they are individually assessed.
3. Explain why adding a spouse can reduce the first spouse's displayed amount (for example, joint brackets, deductions, credits, and payroll-tax treatment) and make the allocation method visible.
4. Preserve privacy: all inputs and calculations stay in the browser.
5. Keep existing single-filer and no-spouse behavior unchanged.

## Coordination with the active drill-down task

- The separate tax-spending drill-down task may be editing the same site at the same time.
- Before editing, inspect `git status`, recent commits, `RESUME.md`, and active changes. Preserve all unfinished work.
- If overlapping edits are still in progress, avoid clobbering them: work in isolated components when possible, re-read touched files immediately before patching, and integrate against the newest state before building.
- The spouse feature should feed the existing spending visualization from the combined household total while also allowing the user to see each spouse's allocated tax burden. Do not duplicate or replace the drill-down hierarchy.

## Validation and completion

- Add or update tests for single, married-with-one-income, and married-with-two-income scenarios, including the case where the original displayed estimate drops from roughly $40k to roughly $25k after spouse details are entered.
- Validate that per-spouse components reconcile exactly to the combined household estimate, subject only to explicit display rounding.
- Run the production build and relevant tests.
- Merge safely with the drill-down work, publish the validated combined result to the existing Sites project, and report the live URL and a concise explanation of the allocation method.

## Paused handoff — 2026-07-21 15:40 PDT

The project manager paused this P1 feature until the P0 spending drill-down stabilizes the shared estimator UI. Preserve this work exactly as-is; do not publish it independently or revert it.

### Files changed for this feature

- `app/page.tsx` — imports the extracted estimator, keeps existing single-filer behavior, adds joint-household input copy, and renders the per-spouse/household breakdown. This file overlaps with the active drill-down task and must be integrated by the designated owner after P0 stabilizes.
- `app/tax-estimator.mjs` — new extracted household estimator with wage-share allocation for joint federal/state/property tax, per-worker payroll calculation, separate Social Security caps, and reconciled user/spouse/household totals.
- `app/spouse.css` — new isolated styles for the household summary, spouse cards, allocation explanation, and mobile layout.
- `app/globals.css` — one added import for `app/spouse.css`.
- `tests/tax-estimator.test.mjs` — new unit coverage for single, one-income joint, two-income joint reconciliation, and separate Social Security wage caps.
- `RESUME-SPOUSE-TAX.md` — this task-specific checkpoint.

Do not treat the concurrent changes in `RESUME.md`, `AGENTS.md`, `PROJECT_BOARD.md`, or `research/` as part of this feature; they belong to project coordination and the spending drill-down task.

### Validation completed

- Unit tests passed: 4 tests, 0 failures using the bundled Node runtime and `node --test tests/tax-estimator.test.mjs`.
- Production build passed using the bundled runtime path and `pnpm run build`.
- No deployment, version save, source push, or publication was performed.
- No browser interaction or visual QA was performed.

### Remaining integration steps after P0 stabilizes

1. Re-read `AGENTS.md`, `PROJECT_BOARD.md`, `RESUME.md`, this checkpoint, `git status`, and the newest `app/page.tsx` before touching shared files.
2. Diff the stabilized drill-down implementation against this task's current `app/page.tsx` edits; port the estimator import, joint input copy, and spouse breakdown into the newest component without replacing drill-down state, hierarchy, or navigation.
3. Confirm the spending visualization continues to use the combined household federal/state totals while the spouse cards remain an explanatory allocation only.
4. Run the spouse unit tests, the full rendered test suite, and a fresh production build. Add an interaction-level check for married filing jointly if the stabilized test setup supports it.
5. Obtain the required independent review for the material tax allocation language and resolve any findings.
6. Update `PROJECT_BOARD.md` with completion evidence, then publish the combined validated release through the existing Sites project only when the project manager clears publication.

