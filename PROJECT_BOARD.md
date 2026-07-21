# Project board — Where My Tax Dollars Go

Updated: 2026-07-21 14:38 PDT

## Objective

Maintain a trustworthy, privacy-first tax explainer while expanding it through small, independently verifiable releases.

## Team and decision rights

| Role | Owner | Responsibility |
| --- | --- | --- |
| Product owner | Eric Linxie | Product priorities, tradeoffs, and final acceptance |
| Project manager | Codex task `019f866e-2765-7b42-a9c1-573fd075a4f6` | Intake, sequencing, dependencies, schedule, risk, and status synthesis |
| Migration and company systems architect | Codex task `019f8677-9674-74c2-b2c5-5e39c97c6c6e` | Design and, after owner approval, implement an agent-agnostic operating system for project data, handoffs, provenance, worker visibility, storage, backup, and migration |
| Finance manager / accountant / resource manager | Codex task `019f8677-9461-7432-9f20-b71a59acae3d` | Treat platform plan limits as operating budget, maintain a truthful resource ledger, and advise the project manager on sequencing, reserves, and future connected-account capacity |
| Drill-down implementation and integration owner | Codex task `019f866b-5037-7d30-a25d-c6ca3c2d0733` | Resolve review findings and control the existing combined P0/P1 working-tree candidate without discarding either feature |
| Drill-down research | Federal, California, and county specialist subagents | Primary-source research and evidence handoff to the implementation owner |
| Spouse-breakdown implementation | Codex task `019f866b-ef3c-74a1-ad73-550960f77e13` | Per-spouse and household tax burden explanation |
| Independent reviewer | Drill-down independent-review agent | Source interpretation and material calculation review before release |

## Work

| Priority | State | Deliverable | Owner | Depends on | Completion evidence |
| --- | --- | --- | --- | --- | --- |
| P0 | published | Deep spending drill-down with payout/obligation/estimate labels | Drill-down integration owner | None | Independent review passed; release gate passed; live Medicare drill-down verified at the production URL |
| P1 | published | Per-spouse and combined-household tax burden | Spouse implementation; integration controlled by P0 owner | None | Independent allocation review passed; release gate passed; live two-income joint allocation verified and reconciled |
| P1 | done | Independent review of drill-down sources and calculation language | Drill-down independent-review agent | P0 implementation ready | Review requested four changes and confirmed same-basis federal, California top-level, and county reconciliation |
| P2 | queued | Verify current tax brackets and federal/California/Santa Clara spending shares | Unassigned | Current feature releases settle | Source freshness report and passing boundary/total tests |
| P3 | queued | Agent-agnostic project migration and company-system architecture | Migration and company systems architect | P0 and P1 releases finish; Eric approves any storage or account changes | Approved architecture, portable handoff standard, data/storage map, worker registry, migration/rollback plan, and validated first-phase handoff |
| P3 | queued | Platform budget, resource ledger, and scheduling policy | Finance manager / accountant / resource manager | P0 and P1 releases finish; available usage/account data is explicitly supplied or authorized | No invented balances, documented cost bands and reserves, platform inventory, scheduling gates, and CEO/investor reporting template |
| P3 | blocked | Nationwide expansion automation | Project manager | Eric confirms cadence; data review capacity exists | Approved cadence and bounded automation activated |

## Schedule and automations

| Automation | State | Cadence | Purpose | Gate |
| --- | --- | --- | --- | --- |
| `resume-tax-spending-drill-down` | deleted after success | Formerly hourly | P0 recovery completed | Production deployment and live verification succeeded |
| `resume-spouse-tax-breakdown` | paused | Hourly definition retained | Preserve P1 recovery without concurrent writes | Resume only after P0 stabilizes shared files |
| New architecture/resource-role scheduling | deferred | No automation created | Preserve capacity for P0 and P1 completion | Revisit only after both current releases finish or Eric reprioritizes |

## Current risks

- The drill-down uses mixed fiscal years and different meanings of money. UI labels must distinguish paid/outlay, obligated/awarded, and ceiling/estimate figures.
- Future changes to the reviewed spending methodology or spouse-allocation language require fresh validation and independent review before publication.
- No reliable platform usage meter is available; use the existing bounded-work ledger for scheduled expansion work.
- Exact plan limits and connected-account capacity may be unavailable to agents; the resource manager must label unknowns and never infer balances.
- Cross-platform migration could expose credentials or create split-brain project state unless the repository remains the approved source of truth during a staged migration.

## Manager recommendation

Combined P0/P1 publication is complete. Preserve the deployed methodology and move to the next owner-approved priority; keep architecture, resource-management, and nationwide-expansion work gated by their existing approval and capacity requirements.

## Next manager review

- At the next owner priority decision after the combined release.
