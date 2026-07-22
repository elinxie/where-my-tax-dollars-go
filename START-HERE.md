# Start here — continue this project safely

This repository is the portable project record. You do not need Codex, Claude, or any prior chat history to continue safely.

## Current snapshot

- Product: **Where My Tax Dollars Go**, a privacy-first educational tax and spending explainer.
- Current priority: **P3 repository-local agent-agnostic continuation kit**, owned by the Migration and Company Systems Architect. See [`PROJECT_BOARD.md`](PROJECT_BOARD.md).
- Finished: P0/P1 release and P2 source-freshness audit. Production tax/spending values must not be changed as a side effect of continuation work.
- Paused/gated: P2 estimator corrections, resource management, QA, and Open FI$Cal research. Do not start them unless their gates on the board are satisfied.
- Product owner: Eric Linxie. The Project Manager controls sequencing; Eric approves priorities, material methodology changes, publication, services, accounts, spending, and storage moves.

## Five-minute resume procedure

1. Clone/open this repository and run `git status --short --branch`. Treat every uncommitted change as someone else's work until its owner says otherwise.
2. Read [`AGENTS.md`](AGENTS.md), then [`PROJECT_BOARD.md`](PROJECT_BOARD.md). The board is the canonical current cross-task state.
3. Open the checkpoint for the current task (the board names it). For the active portability work, read [`RESUME-SYSTEMS-ARCHITECT.md`](RESUME-SYSTEMS-ARCHITECT.md).
4. Read [`docs/CONTINUATION_KIT.md`](docs/CONTINUATION_KIT.md), [`coordination/WORKERS.md`](coordination/WORKERS.md), and [`coordination/DECISIONS.md`](coordination/DECISIONS.md). They explain portable handoffs, identity, decisions, and safe Git coordination.
5. State the next safe action in your handoff before changing a file. If a gate, owner, or file overlap is unclear, stop and ask the Project Manager—do not infer approval.

## What is canonical

| Need | Canonical record |
| --- | --- |
| Current priorities, ownership, gates, and cross-task status | [`PROJECT_BOARD.md`](PROJECT_BOARD.md) |
| Detailed task recovery and evidence | task-specific `RESUME-*.md` checkpoint |
| Product/code/data/source history | tracked repository files and Git history |
| Public tax/spending source requirements | [`SOURCES.md`](SOURCES.md), [`docs/SOURCE_POLICY.md`](docs/SOURCE_POLICY.md), and data releases |
| Portable operating conventions | [`docs/CONTINUATION_KIT.md`](docs/CONTINUATION_KIT.md) |
| Operational decisions and worker identities | [`coordination/DECISIONS.md`](coordination/DECISIONS.md), [`coordination/WORKERS.md`](coordination/WORKERS.md) |

Platform thread history, cloud chat memory, and local IDE state are supplementary only. Never let them become the only record of a decision, task state, source, or handoff.

## Project map and safety boundaries

| Area | Location | Rule |
| --- | --- | --- |
| App and tests | `app/`, `tests/`, `public/` | Do not edit shared UI files concurrently; use a separate worktree or wait for the integration owner. |
| Data and evidence | `data/`, `research/`, `SOURCES.md`, `docs/` | Primary sources, dates, bases, derivations, and review are required for public values. |
| Coordination | root board/checkpoints and `coordination/` | Update only the records owned by the task; report board updates to the Project Manager when directed not to edit it. |
| Build artifacts | `dist/`, `build/`, `.vinext/`, `.wrangler/`, `outputs/` | Disposable local output unless explicitly committed as a reviewed artifact. |
| Secrets and personal data | **not in this repository** | Never commit tokens, keys, tax returns, addresses, SSNs, employer records, or production credentials. Use local ignored environment files or the approved platform secret store only. |

## Verify before handoff or review

Use Node 22.13+ and pnpm. The standard product gates are:

```sh
pnpm run lint
pnpm test
git diff --check
```

If the bundled runtime has a broken PATH, the successful P2 invocation is preserved in [`RESUME-P2-DATA-VERIFICATION.md`](RESUME-P2-DATA-VERIFICATION.md). Do not install, deploy, or publish merely to make validation work.

## Copyable startup prompts

### Coding agent with repository access

```text
You are continuing the Where My Tax Dollars Go repository. Work only from repository records; do not rely on prior agent-chat memory. First read START-HERE.md, AGENTS.md, PROJECT_BOARD.md, the checkpoint for the current board priority, docs/CONTINUATION_KIT.md, coordination/WORKERS.md, and coordination/DECISIONS.md. Run git status --short --branch before edits and preserve all uncommitted work. State the current priority, owner/gates, relevant files, verification commands, and next safe action. Do not change deployment, external accounts, billing, credentials, services, production data, or publication unless the board and Eric explicitly authorize it. Use the portable handoff format when you stop.
```

### Chat-only assistant (no repository access)

```text
You are assisting the Where My Tax Dollars Go project without repository access. Ask the human to paste START-HERE.md, AGENTS.md, PROJECT_BOARD.md, the relevant RESUME-*.md checkpoint, git status --short --branch, and any files needed for the narrow question. Treat pasted content as the only current evidence; label assumptions. Do not claim to know task status, source values, approvals, files, or deployment state that were not provided. Return a portable handoff with current state, evidence, recommended next safe action, blockers/owner decisions, and exact files/commands for a repository-capable worker.
```

For platform notes, portable record formats, worktree safety, and a zero-context checklist, continue to [`docs/CONTINUATION_KIT.md`](docs/CONTINUATION_KIT.md).
