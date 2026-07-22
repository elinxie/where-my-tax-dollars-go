# Portable continuation kit

## Purpose and scope

This kit lets Eric, a human developer, or a fresh agent on any platform continue from the repository alone. It is intentionally repository-local: no database, dashboard, external storage, service, account connection, or recurring automation is part of this first phase.

Read [`START-HERE.md`](../START-HERE.md) first. The repository and Git history are the system of record. A platform's task/thread memory may add context but may never override repository records.

## Canonical-source rules

1. `PROJECT_BOARD.md` is the authoritative current status, priority, owner, dependency, and gate record. Do not fork it into a platform-specific tracker.
2. A task-specific `RESUME-*.md` file is the authoritative detailed recovery record for that task: scope, non-goals, evidence, validation, and next safe action.
3. Tracked code, data, source files, release manifests, and Git commits are authoritative product artifacts. Published data releases are immutable; corrections create a new release.
4. `coordination/DECISIONS.md` records operational decisions. It must link to the approval/evidence and must not silently supersede product, methodology, or budget decisions owned by Eric.
5. `coordination/WORKERS.md` identifies humans/roles/platform tasks without credentials or private chat content. It is an index, not a second task board.
6. If records conflict, stop work. Report the conflict and the commit/file evidence to the Project Manager; do not choose the convenient version.

## Portable record conventions

### Task record

Use the board row for status and a `RESUME-<TASK>.md` file for detail. A new task checkpoint must include: objective; owner role (not only a vendor task ID); state; authorized scope; forbidden actions; dependencies/gates; files owned or overlap risks; evidence/source links; validation commands/results; next safe action; blockers and Eric/PM decisions needed; update time.

### Decision record

Add a compact entry to [`coordination/DECISIONS.md`](../coordination/DECISIONS.md) before treating a material decision as settled. Include a stable ID, status (`proposed`, `approved`, `rejected`, or `superseded`), decider, date, decision, scope/consequences, evidence, and rollback/revisit condition. Only Eric can approve priority, publication, budget/spending, storage/services/accounts, or material tax/budget/methodology decisions.

### Worker record

Use [`coordination/WORKERS.md`](../coordination/WORKERS.md) to record a role, owner/handle, platform reference if useful, authority, active/paused state, and handoff checkpoint. Never include passwords, API keys, personal tax input, private prompt content, or a vendor-only link as the sole reference.

### Handoff record

Paste this block into the task checkpoint or a short repository Markdown handoff when a worker stops:

```md
## Handoff — YYYY-MM-DD HH:MM TZ

- Role and platform: <role; platform is optional context>
- State: <active | review | blocked | paused | done>
- Authorized scope completed: <facts only>
- Repository evidence: <commit(s), file paths, source/research paths>
- Validation: `<command>` — <result or not run and why>
- Uncommitted-work safety: <git status summary; files another worker owns>
- Next safe action: <one bounded action>
- Blockers / owner decisions: <explicit question, decider, and why>
- Forbidden next actions: <anything still gated>
```

## Safe Git and worktree coordination

1. Before any edit: run `git status --short --branch`, read the board and relevant checkpoint, then inspect the target file immediately before patching.
2. Never overwrite, reset, clean, stash, or reformat another worker's uncommitted work without that owner's direction.
3. One integration owner writes a shared file at a time. For independent work, create a named worktree/branch and document its target commit plus integration owner in the checkpoint.
4. Make small, reviewable commits after validation. A commit is not publication and does not replace Eric's release approval.
5. Before handoff: run the appropriate checks, `git diff --check`, record exact results, then update the owned checkpoint. Report any needed board change to the Project Manager.

## Platform adapters

All platforms begin with the same repository reading order and end with the same portable handoff.

| Platform | Use it for | Required adaptation |
| --- | --- | --- |
| Codex | Repository edits, tests, bounded task coordination | Treat Codex thread/task IDs as optional worker metadata only. Read repository records first; write handoff/checkpoint before a task ends. |
| Claude Code | Repository edits and terminal work | Give it the coding-agent prompt from `START-HERE.md`; keep its session summary in the checkpoint, not only Claude memory. |
| Hermes | Coding/research assistance where repository access is available | Supply the same startup prompt and files; require file/commit evidence and the common handoff block. |
| Google Antigravity | Coding/research assistance where repository access is available | Provide the same repository paths and constraints; export conclusions into a tracked checkpoint or decision record. |
| Generic/free chat tools | Planning, review, or drafting without repository authority | Use the chat-only prompt. Paste current records; treat output as a proposal until a repository-capable owner verifies it. |
| Human-only development | Direct editing and review | Follow the five-minute resume procedure, use Git commits, and record decisions/handoffs in the same files. |

If a named platform cannot access the repository, it is a chat-only assistant for this project. Do not grant it authority based on a remembered conversation.

## Remote work baseline

Remote continuity requires only: a Git clone, Node 22.13+ and pnpm for code work, an authenticated Git remote configured by Eric, and access to any separately approved deployment/secret mechanism. The repository contains no credentials and does not prescribe a remote desktop, cloud IDE, or vendor. Those choices, any external backup, and account access remain owner decisions.

## CEO/investor snapshot

For a quick owner view, read the top of `PROJECT_BOARD.md`, then the current task checkpoint. Report only: current priority and owner; delivery state; capacity known vs unknown; material risks; approvals needed; repository/commit evidence; and next gate. Do not turn inferred platform balances into financial facts.

## First-phase validation checklist

A fresh reader should be able to answer yes to every item using only repository files:

- [ ] I found the current priority, owner, and status in `PROJECT_BOARD.md`.
- [ ] I found the relevant checkpoint and know the next safe action.
- [ ] I know which work is paused/gated and who can reopen it.
- [ ] I can identify product/data/source records, disposable build output, and secret boundaries.
- [ ] I know the relevant files and verification commands before editing.
- [ ] I know how to avoid colliding with another worker's Git changes.
- [ ] I can create a portable task, decision, worker, or handoff record without a vendor-specific tool.
- [ ] I can use a coding agent or chat-only assistant without granting it undocumented authority.

## Deferred architecture decisions

This MVP does not select an external project database, dashboard, backup provider, cloud IDE, secret manager, or agent platform. Before a later migration, Eric must approve the target, data classification, retention/export plan, cost owner, access model, backup/restore test, rollback path, and the repository record that remains canonical. Record the approved decision and staged migration plan in `coordination/DECISIONS.md`.
