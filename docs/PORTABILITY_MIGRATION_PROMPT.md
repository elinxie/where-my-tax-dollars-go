# Portability & migration kickoff prompt

Paste the block below into the **Project Manager** task (the pinned Codex PM). It is written to be
platform-neutral: it works verbatim in Codex, Claude Code, or any repo-capable agent. It respects the
project's existing guardrails in `AGENTS.md` and treats the repository as canonical.

Owner decisions this prompt will force to the surface are listed at the end under "Decisions I (Eric) must make."

---

You are the Project Manager for the **Where My Tax Dollars Go** repository. Do not rely on any prior
chat or platform memory. Work only from repository records.

**Read first, in this order, before proposing anything:** `START-HERE.md`, `AGENTS.md`,
`PROJECT_BOARD.md`, `docs/CONTINUATION_KIT.md`, `coordination/DECISIONS.md`, `coordination/WORKERS.md`,
`RESUME-SYSTEMS-ARCHITECT.md`, and `git status --short --branch`. Preserve every uncommitted change as
another worker's until its owner says otherwise.

**Context / why I'm asking.** The coordination layer of this project is already agent-agnostic (the
continuation kit, board, checkpoints, and startup prompts). What is NOT portable is the **site, data,
and hosting layer**, which is still bound to OpenAI/Codex infrastructure. Concretely, the lock-in points
are: the `sites` git remote (`git.chatgpt-team.site/.../appgprj_….git`); `.openai/hosting.json`
(project_id `appgprj_6a5fd0ca…`, D1/R2 bindings) which `vite.config.ts` imports directly; the `vinext`
framework and `build/sites-vite-plugin.ts` that packages `.openai` on build; the `CODEX_SANDBOX=seatbelt`
handling; and the Cloudflare Workers/Wrangler + D1/R2 runtime. Your own kit currently **defers** all of
this (`DECISIONS.md` OPS-003 = deferred; CONTINUATION_KIT "Deferred architecture decisions"). That is why
this decision has never been surfaced to me. I want it surfaced and planned now.

**My goal.** Move the *whole* project — site and data, not just the coordination docs — to a home where
**any** AI agent or a human can build, run, deploy, and update progress without OpenAI/Codex. I also want
the move to be **reversible**: I must be able to bring progress back to Codex if I choose. Give me
confidence that I am moving the whole project without waste and that I can keep iterating efficiently.

**Constraints (do not violate).** Per `AGENTS.md`, connecting accounts, moving/copying data, provisioning
services, spending money, changing subscriptions, or changing repository authority all require my explicit
approval first. So this task is **proposal + reversible, repository-local scaffolding only**. Do not
execute an external migration, create accounts, or move data in this pass. Never place secrets in the
repo or a checkpoint. Keep Codex capacity in mind — I have roughly 40% remaining — so produce the
decision-ready, portable outputs first and defer anything heavy or irreversible.

**Deliverables (all repository-readable, in priority order):**

1. **Lock-in inventory.** A short table of every OpenAI/Codex-specific coupling (remote, config,
   framework, build step, runtime binding, sandbox flag), what each does, and whether it is *removable*,
   *replaceable*, or *must-abstract*.

2. **Migration target comparison.** Compare realistic destinations for site + data — at minimum:
   Cloudflare direct via Wrangler (drop the `.openai`/vinext wrapper, keep the Workers/D1/R2 runtime the
   site already uses), a mainstream Next.js host (Vercel/Netlify), and a fully-static/GitHub-Pages option
   if the tax data can be prebuilt. For each: portability, vendor lock-in, privacy, cost, data-storage
   story (D1/R2 vs static vs other), agent-friendliness, failure modes, and rework required. End with a
   single **recommended** target and why.

3. **Round-trip (forward + back) guide.** Exact, tested-on-paper steps to (a) stand the project up on the
   recommended neutral target, and (b) bring it back to Codex/OpenAI Sites later. Call out what stays
   canonical in the repo across both directions, how to avoid split-brain, and how to verify each
   direction succeeded.

4. **Reversible repository-local scaffolding.** Only changes that are safe now and require no accounts or
   spend: e.g., abstract the hosting config so it is not hard-imported from `.openai/hosting.json`;
   document/parameterize the `sites` remote and Cloudflare bindings; add a neutral `deploy`/`run` path
   alongside the existing one. Every change must be reversible and must not alter application behavior,
   data, or production tax/spending values. Show validation: `pnpm run lint`, `pnpm test`,
   `git diff --check`.

5. **Portable task records.** Create/update a `RESUME-PORTABILITY-MIGRATION.md` checkpoint in the
   project's standard format, add proposed `coordination/DECISIONS.md` entries (including one that
   **supersedes OPS-003** with the new proposal), and update `PROJECT_BOARD.md` to show this as the
   current portability priority with owner, gates, and evidence. Re-task the **Migration & Systems
   Architect** role to own execution once I approve.

6. **Fix the surfacing gap.** As PM, present me a concise CEO/owner view: current priority, the
   recommended target, capacity cost of each phase, risks, rollback, and the exact **decisions you need
   from me** to authorize execution. Do not infer my approval — ask.

**Acceptance criteria.** I can (1) see every codex/OpenAI coupling and its removal path; (2) pick a target
from a real tradeoff comparison; (3) follow a forward-and-back guide without prior chat context; (4) trust
that nothing irreversible or billable happened without my say-so; and (5) resume this from the repo alone
on any platform. When you stop, write the portable handoff block from `docs/CONTINUATION_KIT.md`.

**Decisions I (Eric) must make — list them explicitly and wait for my answer:** target platform; data
classification and where D1/R2 data goes (or whether it becomes static); who owns any cost; retention/
export and backup-restore plan; the access model; and confirmation before any account connection, spend,
or storage move.
