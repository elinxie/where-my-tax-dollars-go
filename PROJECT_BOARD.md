# Project board — Where My Tax Dollars Go

Updated: 2026-07-21 15:38 PDT

## Objective

Maintain a trustworthy, privacy-first tax explainer while expanding it through small, independently verifiable releases.

## Team and decision rights

| Role | Owner | Responsibility |
| --- | --- | --- |
| Product owner | Eric Linxie | Product priorities, tradeoffs, and final acceptance |
| Project manager | Codex task `019f866e-2765-7b42-a9c1-573fd075a4f6` | Intake, sequencing, dependencies, schedule, risk, and status synthesis |
| Migration and company systems architect | Codex task `019f8677-9674-74c2-b2c5-5e39c97c6c6e` | Design and, after owner approval, implement an agent-agnostic operating system for project data, handoffs, provenance, worker visibility, storage, backup, and migration |
| Finance manager / accountant / resource/token manager | Codex task `019f8677-9461-7432-9f20-b71a59acae3d` | Treat AI usage limits, agents, models, platforms, and connected capacity as operating resources; maintain a truthful cost/capacity ledger; recommend workload routing and savings without analyzing the site's tax-dollar values |
| Lead QA | Codex task `019f86ce-0dd3-7e80-87fa-05da576f309e` | Independently test completed code work, coordinate bounded specialist QA through the Project Manager, preserve reproducible evidence, and issue the signed QA summary required for release |
| Drill-down implementation and integration owner | Codex task `019f866b-5037-7d30-a25d-c6ca3c2d0733` | Resolve review findings and control the existing combined P0/P1 working-tree candidate without discarding either feature |
| Drill-down research | Federal, California, and county specialist subagents | Primary-source research and evidence handoff to the implementation owner |
| Spouse-breakdown implementation | Codex task `019f866b-ef3c-74a1-ad73-550960f77e13` | Per-spouse and household tax burden explanation |
| Independent reviewer | Drill-down independent-review agent | Source interpretation and material calculation review before release |
| P2 data-verification owner | Codex task `019f86b4-b135-7131-94ed-f3e0d8c82c47` in an isolated worktree | Audit current federal, California, and Santa Clara sources and tests without changing production values or publishing |
| P2 independent reviewer | Existing independent-review Codex task `019f867e-8eb4-7d43-add6-401b720a628e` | Reproduce material audit findings, verify impact calculations and invariant tests, and confirm production behavior is unchanged |

## Work

| Priority | State | Deliverable | Owner | Depends on | Completion evidence |
| --- | --- | --- | --- | --- | --- |
| P0 | done | Deep spending drill-down with payout/obligation/estimate labels | Drill-down integration owner | None | Published; independent review and release gate passed; live Medicare drill-down verified at the production URL |
| P1 | done | Per-spouse and combined-household tax burden | Spouse implementation; integration controlled by P0 owner | None | Published; independent allocation review and release gate passed; live two-income joint allocation verified and reconciled |
| P1 | done | Independent review of drill-down sources and calculation language | Drill-down independent-review agent | P0 implementation ready | Review requested four changes and confirmed same-basis federal, California top-level, and county reconciliation |
| P2 | done | Verify current tax brackets and federal/California/Santa Clara spending shares | P2 data-verification owner | None | Audit integrated as `3010c4e`; four confirmed mismatches; independent review passed; lint/build/diff check and 14 tests pass |
| P2 | done | Independent review of P2 source-freshness audit | Project Manager acting as independent reviewer | Audit report and checkpoint complete in isolated worktree | PASS: official thresholds/formula and impact math reproduced; narrow test diff and unchanged production behavior confirmed; 14/14 tests pass |
| P2 | blocked | Correct federal/California Tax Table treatment and California exemption-credit phaseout | Unassigned correction owner | Agent-agnostic architecture and resource/token-manager deliverables are accepted; Eric then explicitly reauthorizes correction work | Source-backed patch, boundary/table tests, regression/build gates, independent review, and explicit publication approval |
| P3 | active | Current #1: repository-local agent-agnostic continuation system usable this week | Migration and company systems architect | Preserve repository authority; no external migration/account/storage changes | Working cross-platform continuation guide, portable task/handoff format, worker registry, startup prompts, data map, and fresh-session validation |
| P3 | queued | AI platform budget, resource/token ledger, worker-capacity model, and savings policy | Finance manager / accountant / resource-token manager | Tabled by Eric until the portability kit is usable or Eric reactivates it | No invented balances; documented cost/capacity bands and reserves; platform/worker inventory; routing and savings options; scheduling gates; CEO/investor reporting template |
| P3 | blocked | Nationwide expansion automation | Project manager | Eric confirms cadence; data review capacity exists | Approved cadence and bounded automation activated |
| P4 | queued | Independent QA campaign for completed code work | Lead QA; specialist QA assignments coordinated through Project Manager | Finance Manager / Accountant / Resource Manager deliverables accepted; agent-agnostic architecture and validated first-phase handoff accepted | Automated gates pass; critical journeys receive manual browser and accessibility coverage; blocking defects are resolved and retested or explicitly accepted by Eric; signed Lead QA summary completed |
| P4 | queued | Open FI$Cal expenditure-led spending and company-flow research | Unassigned; Project Manager schedules after both P3 prerequisites | Resource Manager deliverables accepted; agent-agnostic architecture and validated first-phase handoff accepted | Reproducible as-of expenditure analysis, department/vendor flow map, separately sourced company financial context, downstream-funding caveats, source provenance, and independent methodology review |

The QA campaign can be executed within the agent-agnostic architecture: its risk-based charters, assignments, environment and revision references, steps, expected-versus-actual results, screenshots or logs, severity and user impact, independent-review decisions, and retest outcomes must remain portable and repository-readable rather than depending on one agent platform's private context.

## Schedule and automations

| Automation | State | Cadence | Purpose | Gate |
| --- | --- | --- | --- | --- |
| `resume-tax-spending-drill-down` | deleted after success | Formerly hourly | P0 recovery completed | Production deployment and live verification succeeded |
| `resume-spouse-tax-breakdown` | deleted after success | Formerly hourly | P1 recovery completed | Combined production deployment and live verification succeeded |
| Agent-agnostic architecture | active, event-driven | No recurring automation | Deliver the minimum viable cross-platform continuation kit before Codex capacity is exhausted | Repository-local scaffolding allowed; no external migration, spending, account connection, storage move, or recurring schedule |
| Resource/token-manager role | tabled | No automation | Preserve remaining Codex capacity for the portability kit | Resume only after the kit is usable or Eric explicitly reprioritizes |
| Open FI$Cal expenditure research activation | deferred | Dependency-driven; no clock automation created | Use official California expenditure and vendor files as the lead source for tracing state spending | Activate only after both the Resource Manager and agent-agnostic architecture acceptance criteria are satisfied |
| Lead QA activation | deferred | Dependency-driven; no clock automation created | Run an independent automated and human-centered quality baseline, then provide reusable QA gates for future code releases | Activate only after both prerequisite roles are accepted; large campaigns require an early checkpoint and capacity approval |

## Current risks

- The drill-down uses mixed fiscal years and different meanings of money. UI labels must distinguish paid/outlay, obligated/awarded, and ceiling/estimate figures.
- Future changes to the reviewed spending methodology or spouse-allocation language require fresh validation and independent review before publication.
- P2 found that the estimator uses continuous federal and California rate schedules where official 2025 instructions require Tax Tables below/at $100,000 taxable income; these appear to cause small dollar-level differences.
- P2 found a material California error: exemption credits are granted in full at all incomes instead of phasing down above the official 2025 AGI thresholds. Production remains unchanged pending the complete audit and a reviewed correction decision.
- No reliable platform usage meter is available; use the existing bounded-work ledger for scheduled expansion work.
- Exact plan limits and connected-account capacity may be unavailable to agents; the resource manager must label unknowns and never infer balances.
- The resource/token manager must not drift into analyzing the site's displayed tax, budget, contractor, or company-financial values; its financial lens applies to AI-platform capacity, worker utilization, usage limits, and cost-saving routes.
- Cross-platform migration could expose credentials or create split-brain project state unless the repository remains the approved source of truth during a staged migration.
- Open FI$Cal files can change as adjustment transactions arrive after a month closes; future analysis must record retrieval time, file/upload metadata, and reproducible snapshots, and must not treat vendor payments alone as proof of how recipients ultimately used state funding.
- Automated checks alone can miss comprehension, navigation, accessibility, responsive-layout, and misuse-path failures; Lead QA coverage must include real-browser manual and exploratory charters with reproducible evidence.
- QA loses independence if testers silently repair implementation or release without retesting; findings stay with implementation owners, and blocking defects require Lead QA retest or explicit owner acceptance.

## Manager recommendation

Combined P0/P1 publication is complete. Preserve the deployed methodology and move to the next owner-approved priority; keep architecture, resource-management, and nationwide-expansion work gated by their existing approval and capacity requirements.

P2 audit evidence passed independent review and is integrated, but correction implementation is tabled by Eric until the portability work is complete and Eric explicitly reopens it. Do not schedule, implement, review, or publish the P2 correction before that gate.

Use the remaining confirmed 40% Codex capacity on one objective: a repository-contained continuation system Eric can use from another platform this week. The architect owns the minimum viable handoff kit and may implement reversible repository-local guides, templates, registries, and startup prompts. Table the resource/token manager and all P2/P4 implementation or research until the kit is usable. No role may move external data, connect accounts, spend money, change subscriptions, edit production behavior, or create recurring work without Eric's approval.

After the Resource Manager and agent-agnostic architecture are both accepted, activate the Lead QA baseline and bounded Open FI$Cal research checkpoint under the Resource Manager's WIP and reserve policy. The Project Manager should sequence them if capacity does not support both. Do not start either while a prerequisite remains queued, active, blocked, or under review.

## Next manager review

- When the architect delivers a usable portability kit, reports a blocker, or needs Eric to choose a target platform.
- After the portability kit is accepted, ask Eric whether to resume the resource/token manager before reopening P2 or P4 work.
- When both P3 prerequisite deliverables are accepted, assign and activate the P4 Open FI$Cal checkpoint.
- When both P3 prerequisite deliverables are accepted, activate `RESUME-LEAD-QA.md` and require its baseline QA summary before the next code publication.
