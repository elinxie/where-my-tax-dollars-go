# Decision registry

Operational decisions recorded here are repository-readable. The Project Manager sequences work; Eric is the required decider where noted. This registry does not replace source/methodology documentation or the project board.

| ID | Status | Decider | Date | Decision and scope | Evidence / revisit condition |
| --- | --- | --- | --- | --- | --- |
| OPS-001 | approved | Eric / Project Manager | 2026-07-21 | The repository and Git history are the portable system of record. `PROJECT_BOARD.md` is canonical for current cross-task state and `RESUME-*.md` files are canonical task recovery records. Platform thread history is supplementary only. | [`AGENTS.md`](../AGENTS.md), [`PROJECT_BOARD.md`](../PROJECT_BOARD.md), [`docs/CONTINUATION_KIT.md`](../docs/CONTINUATION_KIT.md). Revisit only for an owner-approved migration. |
| OPS-002 | approved | Eric / Project Manager | 2026-07-21 | Build a small repository-local portability kit this week; do not create services, accounts, storage moves, recurring automation, or external dashboards. | Board P3 authorization and [`RESUME-SYSTEMS-ARCHITECT.md`](../RESUME-SYSTEMS-ARCHITECT.md). Revisit after fresh-session validation. |
| OPS-003 | deferred | Eric | 2026-07-21 | External storage, backup provider, dashboard, secret manager, remote IDE, and platform selection are out of the MVP. | Requires an explicit proposal covering cost, privacy, retention/export, access, backup/restore, and rollback. |
| PROD-001 | blocked | Eric | 2026-07-21 | Do not implement or publish the P2 federal/California Tax Table or California exemption-credit phaseout corrections yet. | [`RESUME-P2-DATA-VERIFICATION.md`](../RESUME-P2-DATA-VERIFICATION.md); only reopen after stated gates and explicit reauthorization. |
| OPS-004 | proposed | Eric | 2026-07-21 | Move site+data deployment off OpenAI Sites to a neutral, agent-agnostic target; recommend static export + GitHub Pages (fallback Cloudflare Pages). Supersedes the deferral posture of OPS-003 once approved. | [`docs/PORTABILITY_MIGRATION.md`](../docs/PORTABILITY_MIGRATION.md) §3, [`RESUME-PORTABILITY-MIGRATION.md`](../RESUME-PORTABILITY-MIGRATION.md). Revisit/rollback: additive first; retirement of `sites` remote is a single revertable commit. |
| OPS-005 | proposed | Eric | 2026-07-21 | Keep all OpenAI/Codex files (`.openai/`, `sites` remote, `vinext`, `build/sites-vite-plugin.ts`, `app/chatgpt-auth.ts`) dormant rather than deleting them, so round-trip back to Codex is a `git revert` + remote re-add with no rebuild. | [`docs/PORTABILITY_MIGRATION.md`](../docs/PORTABILITY_MIGRATION.md) §5. Revisit if Eric decides to fully sever Codex support. |
| OPS-006 | proposed | Eric | 2026-07-21 | Execution is gated: no account connection, new-host deploy, data move, or destructive removal until Eric picks a target and authorizes. Reversible, behavior-preserving repo-local scaffolding may be staged/validated first. | [`docs/PORTABILITY_MIGRATION.md`](../docs/PORTABILITY_MIGRATION.md) §4, §6; [`AGENTS.md`](../AGENTS.md) guardrails. |

## Entry template

```md
| OPS-XXX | proposed | <required decider> | YYYY-MM-DD | <one-sentence decision and scope> | <links to evidence; rollback/revisit trigger> |
```
