# Resume checkpoint — P2 data verification

Updated: 2026-07-21
Owner: verification worker for Project Manager task `019f866e-2765-7b42-a9c1-573fd075a4f6`
Platform usage: unknown; no reliable usage meter is available.

## Scope

Audit the currently deployed release only: 2025 federal and California estimator constants, plus the displayed federal, California FY2025-26, and Santa Clara County FY2025-26 spending data. Use primary government sources, preserve accounting-basis distinctions, and make no production-data or methodology changes.

## Guardrails

- Do not alter production tax constants, spending values, methodology language, or deployment state.
- Do not touch `RESUME-RESOURCE-MANAGER.md` or `RESUME-SYSTEMS-ARCHITECT.md`.
- Record mismatches as evidence for a separately reviewed correction decision.
- Stop at federal, California, and Santa Clara County coverage.

## Work state

- [x] Read project instructions, board, source policy, methodology, inventory, coverage file, current estimator/spending code, tests, and git status.
- [x] Inventory every displayed or calculated constant and spending value.
- [x] Verify federal tax constants against primary federal sources.
- [x] Verify California tax constants against primary California sources.
- [x] Verify federal, California, and county spending values and bases.
- [x] Write compact source-freshness report: `docs/SOURCE_FRESHNESS_AUDIT_2025.md`.
- [x] Add only source-backed invariant tests; no production behavior changed.
- [x] Run boundary, reconciliation, rendered, lint, and production-build gates.
- [x] Update project board and report findings/evidence to the Project Manager.

## Findings

Confirmed mismatches, preserved for a separately reviewed correction decision:

1. The IRS requires the 2025 Tax Table below $100,000 taxable income; the app always uses continuous brackets. All three supported statuses are affected. The maximum whole-dollar difference is $6; single $50,000 wages is understated $3.50 before UI rounding.
2. California requires its 2025 Tax Table at taxable income of $100,000 or less; the app always uses continuous brackets. All three supported statuses are affected. Conservative maximum absolute differences are $5.15 single/head and $3.50 joint.
3. California's 2025 exemption credits phase down above AGI $252,203 single, $504,411 joint, and $378,310 head using `ceil(excess / 2500) × $6` per personal/dependent exemption. The app omits the phaseout. At single AGI $300,000 it overstates a no-dependent credit by $120 and a one-dependent credit by $240; within the UI's 12-dependent cap, maximum overstatement is $5,853 single/head or $6,006 joint.
4. `SOURCES.md` attributes the current federal standard deductions to Revenue Procedure 2024-40, whose original values were superseded. App values match the current 2025 Form 1040 instructions; the inventory citation does not.

All audited raw bracket endpoints, deductions, nominal credit values, payroll constants, spending totals, spending children, vendor/award snapshots, and accounting-status labels otherwise match their named official primary sources. Federal, California, and County complete child sets reconcile exactly. See the source-freshness report for exact publishers, URLs, tables/pages, values, derivations, confidence, impact ranges, interpretation questions, and the minimal correction/independent-review proposal.

## Validation

The first parallel lint/build attempt failed before project lint/build execution because the bundled package runner's postinstall subprocess PATH could not resolve `node` and `npm`. Verbatim failure excerpts from both invocations:

```text
.../node_modules/workerd postinstall: sh: node: command not found
.../esbuild@0.27.3/node_modules/esbuild postinstall: sh: node: command not found
.../sharp@0.34.5/node_modules/sharp install: sh: node: command not found
.../sharp@0.34.5/node_modules/sharp install: sh: npm: command not found
[ELIFECYCLE] Command failed.
[ERROR] Command failed with exit code 1: /Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pnpm/bin/pnpm.mjs install
```

This was an environment/invocation failure, not a product validation failure. No project lint/build code had run. The successful bounded retries used exactly:

```sh
PATH=/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override:/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:/usr/bin:/bin pnpm run lint
PATH=/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override:/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:/usr/bin:/bin pnpm run build
PATH=/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override:/Users/ericlinxie/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:/usr/bin:/bin node --test tests/*.test.mjs
```

Final gate results:

- ESLint: passed.
- Production build: passed; vinext/Vite completed all five phases.
- Boundary/calculation, reconciliation, rendered HTML, and source-invariant tests: 14 passed, 0 failed.
- No deployment or publication was performed.

## Owner decisions still required

- Decide whether the small federal/California Tax Table differences will be implemented as exact table lookups or explicitly accepted and disclosed as educational approximations. They are not filing-accurate under the official instructions.
- Authorize a separately reviewed California exemption-phaseout correction; this is material and not a rounding approximation.
- Decide whether to pin immutable OMB, USAspending, Open FI$Cal, and County register extracts in future release manifests.

## Independent review

PASS, reported by the Project Manager on 2026-07-21. The independent reviewer reproduced the official IRS/FTB thresholds and California phaseout formula, representative and maximum-impact arithmetic, the narrow audit-test diff, the production-unchanged claim, all 14 passing tests, and `git diff --check`. This PASS approves the audit handoff only; it does not authorize correction implementation or publication.

## Initial repository state

- Detached HEAD in the isolated worktree.
- Pre-existing modified `PROJECT_BOARD.md`; changes mark completed P0/P1 work and a deleted recovery automation.
- Pre-existing untracked deferred checkpoints: `RESUME-RESOURCE-MANAGER.md` and `RESUME-SYSTEMS-ARCHITECT.md`.
- These pre-existing changes are not owned by this audit and must be preserved.

## Recovery

The bounded verification is at review. Resume only for an owner-authorized correction or review pass; inspect `git status` and reread this file first. No recovery task was created because the audit finished in this run.
