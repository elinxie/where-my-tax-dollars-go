# Resume checkpoint — Lead QA

## Role objective

Independently assess all completed code work for correctness, regression risk, accessibility, and real-user usability. Combine automated checks with manual and exploratory testing, and dispatch bounded specialist QA subagents when parallel coverage is useful. The Lead QA owns the integrated strategy, evidence quality, defect triage recommendation, retest status, and final QA recommendation; Eric retains final release authority.

## Current state

- Codex task: `019f86ce-0dd3-7e80-87fa-05da576f309e`.
- State: queued by Eric on 2026-07-21, with activation gated on both prerequisites.
- Do not launch the QA campaign, dispatch specialist QAs, edit product code, or publish while either prerequisite is incomplete.
- No recurring automation has been created. Capacity and plan usage remain unknown until the Resource Manager reports them.

## Prerequisite gate

The Project Manager may activate the Lead QA only after both conditions are recorded as accepted on `PROJECT_BOARD.md`:

1. The Finance Manager / Accountant / Resource Manager deliverables and operating-capacity policy are accepted.
2. The agent-agnostic architecture deliverables, including the validated first-phase handoff, are accepted.

If either prerequisite is queued, active, blocked, or under review, stop without dispatching QAs or changing product files.

## QA organization and delegation contract

When activated, the Lead QA may dispatch bounded QA subagents while remaining integration owner. Every assignment must identify the target build/ref and environment, risk charter, in-scope journeys, forbidden overlaps, evidence format, severity rubric, completion criteria, and handoff location. Use these independent lanes when useful:

1. Automated regression and calculation/data-boundary QA.
2. Browser automation, responsive layout, and cross-browser/device QA.
3. Accessibility QA, combining automation with keyboard-only and screen-reader-oriented manual inspection.
4. Manual exploratory and usability QA focused on first-time users, realistic mistakes, ambiguous language, navigation/backtracking, and unexpected action sequences.
5. Privacy, source/caveat, performance-perception, and failure/empty-state QA.

Specialist QAs report evidence and findings to the Lead QA. They do not silently modify implementation. Product fixes remain with the assigned implementation owner and return to QA for focused retest and relevant regression coverage.

## Required automated coverage

- Existing unit, integration, regression, lint, type, and production-build checks.
- Tax and allocation boundary cases, invariants, reconciliations, and previously fixed regressions.
- Relevant browser end-to-end journeys across supported viewport classes.
- Automated accessibility checks, supplemented by manual testing.
- Stable evidence recording the exact ref, environment, commands, results, and known coverage gaps.

## Required manual and exploratory coverage

- Critical journeys in a real browser for first-time and returning users.
- Keyboard-only operation, focus order/visibility, semantic structure, and screen-reader-oriented labeling.
- Responsive layout, zoom, long/large values, touch-sized controls, and chart/list alternatives.
- Input validation, boundary values, rapid changes, backtracking, reload, error, empty, and partial-data states.
- User comprehension of estimates, fiscal-year mismatches, spending meanings, privacy promises, sources, caveats, and educational-not-tax-advice language.
- Realistic misuse and unexpected action sequences that ordinary users may attempt.
- Perceived responsiveness and usability friction, even when functional assertions pass.

## Evidence and defect standard

Every finding must include the tested ref/environment, reproducible steps, expected and actual behavior, severity, affected users and user impact, supporting screenshot/log where useful, owner, disposition, and retest result. Distinguish confirmed defects, usability risks, test gaps, and suggestions. Store portable QA plans and results in repository-readable formats without personal or sensitive test data.

## Release recommendation gate

The Lead QA may recommend release only when:

- required automated gates pass;
- critical journeys receive documented manual and exploratory coverage;
- material calculation, tax, budget, data-methodology, privacy, and accessibility findings receive the required independent review;
- every blocking defect is fixed and retested, or explicitly accepted by Eric with the residual risk recorded;
- the Lead QA issues a signed summary covering scope, build/ref, environments, results, open risks, deferred coverage, and a clear pass, conditional-pass, or fail recommendation.

## Guardrails

- Read `AGENTS.md`, `PROJECT_BOARD.md`, this checkpoint, relevant implementation checkpoints, and `git status` before work.
- Preserve uncommitted work and never run parallel writers against shared implementation files.
- Coordinate activation, worker assignments, capacity, and scheduling through the Project Manager.
- Do not connect accounts, incur costs, publish, or change production without Eric's approval.
- For a large campaign, checkpoint early and use an owner-approved scheduled recovery run rather than relying on a long interactive session.

## First activation plan

1. Inventory shipped and pending code paths, prior defects, tests, supported browsers/viewports, and release risks.
2. Publish a risk-based master test plan and assign bounded specialist QA lanes.
3. Run the automated baseline, then manual/exploratory charters against the same release candidate.
4. Triage evidence with implementation owners without taking ownership of fixes.
5. Retest fixes, run targeted regression, and issue the baseline QA summary.

## Resume gate

Resume only when the Project Manager confirms both prerequisites are accepted. Until then, remain queued. On activation, re-read the coordination files and current worktree state before dispatching any QA work.
