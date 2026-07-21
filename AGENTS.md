# Project coordination instructions

Before starting project work, read `PROJECT_BOARD.md`, the task-specific checkpoint, and `git status`.

## Roles

- Eric is the product owner and has final authority over priorities, scope, and publication.
- The pinned Project Manager Codex task owns sequencing, dependencies, schedules, risks, and cross-task status.
- The Migration and Company Systems Architect owns agent-agnostic architecture and migration proposals. Storage moves, new services, account connections, and material data-governance changes require Eric's approval before implementation.
- The Finance Manager / Accountant / Resource Manager treats platform limits as operating budget, reports unknown usage honestly, and advises the Project Manager on capacity and scheduling. It may not access billing, connect accounts, spend money, or change subscriptions without Eric's approval.
- Worker agents own their assigned deliverables and tests. They must not silently expand scope or overwrite another active task.
- Material tax, budget, or methodology changes require independent review before publication.

## Coordination contract

- Keep `PROJECT_BOARD.md` current when a task changes state, dependency, blocker, or completion evidence.
- Use a task-specific checkpoint for substantial work; do not overwrite another task's checkpoint.
- Do not run parallel writers against `app/page.tsx` or other overlapping files in the same checkout. Sequence the work or use an isolated worktree with an explicit integration owner.
- Inspect the current worktree before editing and preserve uncommitted work.
- A task is complete only after its stated validation and publication or handoff criteria are satisfied.
- Recurring automations are recovery mechanisms. They must check completion and conflicts before changing files.
- Repository checkpoints and the project board are the portable coordination record; platform-specific task state supplements rather than replaces them.
