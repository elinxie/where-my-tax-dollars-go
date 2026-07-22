# Resume checkpoint — Open FI$Cal expenditure-led research

## Objective

Use the State of California's official [Open FI$Cal expenditure downloads](https://open.fiscal.ca.gov/download-expenditures.html) as the lead transaction source for explaining where state spending goes, identifying recipient companies, and selecting bounded follow-up research into company financials and the downstream use of state funding.

## State and activation gate

- State: queued by Eric on 2026-07-21; do not begin research or implementation yet.
- Activate only after both prerequisites are complete and accepted on `PROJECT_BOARD.md`:
  1. the Finance Manager / Accountant / Resource Manager has satisfied its acceptance criteria; and
  2. the agent-agnostic project architecture has been accepted, including its validated first-phase handoff.
- A prerequisite in `queued`, `ready`, `active`, `blocked`, or `review` does not satisfy this gate.
- The Project Manager owns activation and assigns a bounded cost/usage class before work begins.

## Planned work

1. Inventory the official monthly and department spending files and their vendor-linked subsets; record fiscal period, upload date, retrieval time, schema, coverage, and file checksum or equivalent reproducibility metadata.
2. Profile expenditure flows by department, program/accounting dimensions, vendor, time, and transaction adjustments; preserve negative and correcting entries.
3. Identify high-value or illustrative recipient companies for follow-up without implying that transaction size alone indicates waste, profit, contract value, or final use of funds.
4. Research selected companies using separately cited primary financial sources where available, clearly distinguishing company-wide revenue and spending from California-funded activity.
5. Where evidence permits, trace how recipients used state funding; otherwise label downstream use as unknown and identify the additional grant, contract, regulatory, audit, or recipient reporting needed.
6. Produce a source-backed handoff for the site, including proposed data lineage, update cadence, caveats, and an independent methodology review before publication.

## Required safeguards

- Treat Open FI$Cal as the lead expenditure source, not the only source for company financials or downstream use.
- The download page states that files can change when adjustment transactions are posted after a month ends. Every result must be as-of dated and reproducible.
- Distinguish posted expenditure transactions from appropriations, budget authority, encumbrances, contract ceilings, awards, cash settlement, company revenue, and recipient spending.
- Do not infer a company's profit, total financial position, or use of state funding from vendor transactions alone.
- Preserve transaction-level provenance and document exclusions, corrections, aggregation rules, and material unmatched amounts.
- Material financial, tax, budget, or methodology claims require independent review before publication.
- Do not publish or modify production data during the discovery phase.

## Completion evidence

- Reproducible, as-of source inventory and expenditure analysis.
- Department-to-vendor flow map with coverage and reconciliation notes.
- Bounded company case studies supported by separate primary financial sources.
- Explicit findings or unknown labels for downstream uses of state funding.
- Data-lineage/update proposal compatible with the accepted agent-agnostic architecture and Resource Manager policy.
- Independent methodology review and Eric's publication approval for any public-facing changes.

## Resume instructions

Before acting, read `AGENTS.md`, `PROJECT_BOARD.md`, `RESUME-RESOURCE-MANAGER.md`, `RESUME-SYSTEMS-ARCHITECT.md`, this checkpoint, and `git status`. Confirm both activation gates from completion evidence rather than task inactivity. If either gate is unmet, update no research or production files and return the task to `queued`.
