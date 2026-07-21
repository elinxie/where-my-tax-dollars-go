# Project board — Where My Tax Dollars Go

Updated: 2026-07-21 14:25 PDT

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
| P0 | review | Deep spending drill-down with payout/obligation/estimate labels | Drill-down integration owner | Eric approves combined scope for publication | All four spending findings resolved; independent re-review passed; complete reconciliation tests, browser drill-down QA, and full build pass |
| P1 | review | Per-spouse and combined-household tax burden already present in combined candidate | Spouse implementation; integration controlled by P0 owner | Eric approves combined scope for publication | Independent allocation re-review passed; joint interaction and desktop/mobile visual QA passed; limitations are explicit |
| P1 | done | Independent review of drill-down sources and calculation language | Drill-down independent-review agent | P0 implementation ready | Review requested four changes and confirmed same-basis federal, California top-level, and county reconciliation |
| P2 | queued | Verify current tax brackets and federal/California/Santa Clara spending shares | Unassigned | Current feature releases settle | Source freshness report and passing boundary/total tests |
| P3 | queued | Agent-agnostic project migration and company-system architecture | Migration and company systems architect | P0 and P1 releases finish; Eric approves any storage or account changes | Approved architecture, portable handoff standard, data/storage map, worker registry, migration/rollback plan, and validated first-phase handoff |
| P3 | queued | Platform budget, resource ledger, and scheduling policy | Finance manager / accountant / resource manager | P0 and P1 releases finish; available usage/account data is explicitly supplied or authorized | No invented balances, documented cost bands and reserves, platform inventory, scheduling gates, and CEO/investor reporting template |
| P3 | blocked | Nationwide expansion automation | Project manager | Eric confirms cadence; data review capacity exists | Approved cadence and bounded automation activated |

## Schedule and automations

| Automation | State | Cadence | Purpose | Gate |
| --- | --- | --- | --- | --- |
| `resume-tax-spending-drill-down` | active | Hourly recovery | Resume the P0 build after interruption | Stop changing files after successful validation and publication |
| `resume-spouse-tax-breakdown` | paused | Hourly definition retained | Preserve P1 recovery without concurrent writes | Resume only after P0 stabilizes shared files |
| New architecture/resource-role scheduling | deferred | No automation created | Preserve capacity for P0 and P1 completion | Revisit only after both current releases finish or Eric reprioritizes |

## Current risks

- Both feature tasks share one checkout and likely overlap in `app/page.tsx`; parallel writes risk lost work or a difficult merge.
- The exact validated source is already a combined P0/P1 candidate. Publishing it would expose the spouse feature before its remaining QA, independent review, and owner scope approval.
- The drill-down uses mixed fiscal years and different meanings of money. UI labels must distinguish paid/outlay, obligated/awarded, and ceiling/estimate figures.
- The resolved spending findings and spouse-allocation language must remain unchanged between the reviewed candidate and publication.
- Publication of the exact source would expose both P0 and P1, so Eric must explicitly approve that combined scope before the public deploy.
- No reliable platform usage meter is available; use the existing bounded-work ledger for scheduled expansion work.
- Exact plan limits and connected-account capacity may be unavailable to agents; the resource manager must label unknowns and never infer balances.
- Cross-platform migration could expose credentials or create split-brain project state unless the repository remains the approved source of truth during a staged migration.

## Manager recommendation

Keep the exact reviewed combined working tree intact. Ask Eric to approve public publication of the combined P0 spending drill-down and P1 spouse allocation. If Eric declines the scope change, create and fully revalidate an isolated P0-only release state. Keep the two new operating-model roles and nationwide expansion deferred until the current release is published or explicitly redirected.

## Next manager review

- After Eric approves or declines combined publication.
