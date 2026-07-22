# Resume checkpoint — Migration and Company Systems Architect

## Role objective

Make the project operable from Codex, Claude Code, Hermes, Google Antigravity, free chat tools, and direct human development without making any one platform the only source of truth. Keep Eric informed as product owner, CEO, and investor.

## Current state

- Codex task: `019f8677-9674-74c2-b2c5-5e39c97c6c6e`.
- State: active proposal-only phase, reprioritized by Eric on 2026-07-21 after P0/P1 publication and P2 audit completion.
- Work concurrently with the Resource/Token Manager, using separate deliverables and checkpoints. Coordinate dependencies and shared-state decisions through the Project Manager.
- The initial assignment is read-only discovery and architecture. No migration is authorized yet.

## Required deliverables

### Minimum viable handoff first

Before deeper architecture analysis, create a repository-local continuation kit Eric can use this week from Codex, Claude Code, Hermes, Google Antigravity, another chat tool, or direct human development. It must include:

- one obvious start-here guide with prerequisites and exact resume steps;
- a portable project-state, task, decision, worker, and handoff convention;
- copyable startup prompts for a full coding agent and a chat-only assistant;
- a map of code, checkpoints, sources, artifacts, secrets boundaries, and canonical records;
- rules preventing two platforms from becoming competing sources of truth;
- a fresh-session validation showing that a new agent can identify the current priority, constraints, files, and next safe action without private Codex history.

Keep the first version small enough to finish before remaining Codex capacity is exhausted. Defer optional services, databases, dashboards, and external storage.

1. Map where project code, research, decisions, sources, task state, artifacts, credentials, and backups currently live.
2. Recommend a canonical system of record and portable, repository-readable formats for tasks, decisions, provenance, handoffs, worker/platform identity, and status.
3. Give Eric a concise CEO/investor view of active work, ownership, cost/capacity, risks, decisions, and stored data.
4. Compare storage and backup options, including privacy, portability, cost, failure modes, retention, export, and vendor lock-in.
5. Propose a phased migration with validation, rollback, and a way to prevent two platforms from creating conflicting project state.
6. Identify decisions that require Eric's approval. Research may be delegated to bounded subagents when scheduled.

## Guardrails

- Do not connect accounts, copy or move data, provision services, expose credentials, incur costs, or change repository authority without Eric's approval.
- Never place secrets in the repository or task checkpoints.
- Treat platform-specific memory and thread history as supplementary evidence, not the sole project record.
- Coordinate all implementation sequencing and shared-file changes through the Project Manager.

## Acceptance criteria

- Eric can locate each category of project data and understand who or what platform is working on each task.
- A human can resume work from repository documentation without access to a prior agent's private context.
- The proposal includes explicit tradeoffs, owner decisions, staged validation, backup, and rollback.
- The Project Manager approves the handoff before implementation begins.

## Resume gate

Resume now as the sole active specialist priority. Repository-local, reversible implementation of the minimum viable handoff kit is authorized. Stop at review after fresh-session validation. Re-read `AGENTS.md`, `PROJECT_BOARD.md`, this checkpoint, and `git status` before acting. External migration, account connection, service provisioning, and storage changes still require Eric's explicit approval.

## Implementation checkpoint — 2026-07-21

- Authorization: Project Manager authorized the minimum viable repository-local continuation kit; Eric confirmed 40% Codex capacity remains. No recurring automation is authorized.
- Scope: create a root start-here guide plus portable conventions, templates, and lightweight worker/decision records. Do not change application behavior, data, deployment, credentials, accounts, storage, billing, or subscriptions. Do not edit `PROJECT_BOARD.md` directly.
- Design constraint: the repository and Git history remain canonical. `PROJECT_BOARD.md` is the canonical current cross-task state; task-specific `RESUME-*.md` files are the canonical recovery detail. New kit files must link to those records rather than duplicate task state.
- Planned validation: confirm a fresh reader can locate current priority, gates, relevant checkpoints, safe next action, verification commands, and secret boundaries from `START-HERE.md`; then run Markdown-link/path checks and `git diff --check`.

## Review handoff — 2026-07-21

- State: review-ready. The working tree contains pre-existing manager/deferred artifacts; this role added only the portability-kit files listed below and this checkpoint update.
- Added: `START-HERE.md`; `docs/CONTINUATION_KIT.md`; `coordination/WORKERS.md`; and `coordination/DECISIONS.md`.
- Fresh-session evidence: `START-HERE.md` directs a zero-context reader through `git status`, `AGENTS.md`, the canonical board, the task checkpoint, conventions, worker/decision records, and a stated safe-next-action check. It includes copyable repository-capable and chat-only startup prompts. The kit provides platform adapters, secret/data/artifact boundaries, worktree rules, and an explicit checklist.
- Validation: all referenced kit, coordination, board, and required checkpoint paths existed; required zero-context headings/records were found with `rg`; `git diff --check` passed. Product lint/build/test was intentionally not run because this change is documentation-only and no app/data/dependency file changed.
- Required Project Manager action: review the kit, then update `PROJECT_BOARD.md` from P3 `active` to the appropriate review/accepted state if accepted. This role did not edit the board as directed.
- Remaining owner decisions: whether to adopt any external backup/storage/dashboard/secret-manager/remote-IDE service. Those are explicitly deferred and require Eric's approval plus retention/export, access, cost, backup/restore, and rollback decisions.
