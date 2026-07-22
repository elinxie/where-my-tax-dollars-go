# Portability & migration kit — moving the whole project off Codex/OpenAI

**Status:** proposal + reversible, repository-local scaffolding. Nothing here connects accounts, spends
money, moves data, or changes production behavior. Execution of any external move is gated on Eric's
approval per `AGENTS.md`.

**Audience:** Eric, or any repo-capable agent (Codex, Claude Code, or other) continuing this work.

**Read `START-HERE.md` first.** The repository and Git history remain canonical. This document is a
proposal that ends in decisions Eric must make; it does not override `PROJECT_BOARD.md` or
`coordination/DECISIONS.md`.

---

## 1. The headline: this move is small and low-risk

The coordination layer (board, checkpoints, continuation kit) is already agent-agnostic. The only thing
still tied to Codex/OpenAI is the **hosting and build wrapper** — and once you look at what the site
actually runs, the coupling is thin:

- **There is no live database to migrate.** `db/schema.ts` is intentionally empty (`export {}`),
  `drizzle/meta/_journal.json` has zero entries, and `.openai/hosting.json` declares `d1: null, r2: null`.
  Nothing in `app/` calls `getDb()`. There is no D1 or R2 state to export.
- **The "data" is already in the repo, in Git.** The tax and spending content lives in
  `app/spending-data.ts` (~62 KB of typed data), `app/tax-estimator.mjs`, `data/coverage.json`,
  `research/*.md`, `SOURCES.md`, and `docs/`. All portable, all versioned.
- **The app is effectively a static/client site.** `app/page.tsx` is `"use client"` — the entire
  estimator computes in the browser from bundled TypeScript. There is no runtime server fetch and no
  server-side data dependency. `app/layout.tsx` only reads request headers to build an absolute metadata
  URL.
- **The ChatGPT auth shim is dead code.** `app/chatgpt-auth.ts` (the `oai-authenticated-*` header /
  `signin-with-chatgpt` logic) is imported nowhere. It ships with the starter but is not wired into the
  public site.

**Conclusion:** "move the whole project, site and data" reduces to "stop deploying through the OpenAI
Sites wrapper and deploy the same repo somewhere neutral." No data export, no auth rebuild, no schema
migration.

---

## 2. Lock-in inventory

| Coupling | Where | What it does | Verdict |
| --- | --- | --- | --- |
| `sites` git remote | `git remote -v` → `git.chatgpt-team.site/…/appgprj_….git` | Deploy/push target for OpenAI Sites hosting | **Removable** — `origin` (GitHub) is already the canonical remote; the `sites` remote is only a deploy path. |
| `.openai/hosting.json` | repo root; imported by `vite.config.ts` | Carries `project_id` + D1/R2 binding names | **Must-abstract** — hard `import` breaks a build if the file is absent. D1/R2 are null, so only the import needs a fallback. |
| `vinext` | `package.json`, `dev/build/start` scripts | OpenAI's Vite-based Next-on-Cloudflare framework | **Replaceable** — swap for Next.js + `@cloudflare/next-on-pages`, or prerender to static. Largest single work item. |
| `build/sites-vite-plugin.ts` | `vite.config.ts` plugins | Copies `.openai` + `drizzle` into `dist/.openai` on build | **Removable** — only needed by OpenAI Sites packaging. |
| `CODEX_SANDBOX=seatbelt` branch | `vite.config.ts` | Enables HMR polling inside Codex's macOS sandbox | **Harmless / keep** — a no-op off Codex; leave it or delete it. |
| Cloudflare Workers + Wrangler + D1/R2 bindings | `worker/index.ts`, `wrangler`, `vite.config.ts` | Runtime + image optimization | **Keep or replace** — this is a genuine runtime choice, independent of OpenAI. See §3. |
| `app/chatgpt-auth.ts` | `app/` | ChatGPT-provided auth headers | **Removable (dead code)** — not imported. Delete or ignore. |

---

## 3. Where site + data should land — options and recommendation

Because the app is client-rendered with in-repo data, every option below is viable. They differ mainly in
how much of the current Cloudflare runtime you keep.

| Target | What changes | Vendor lock-in | Cost | Agent-friendliness | Rework | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| **Static export + GitHub Pages** *(recommended)* | Prerender the client app to static HTML/JS/CSS; drop Workers, vinext, `.openai`, `sites` remote. Deploy via a GitHub Action already-adjacent to `origin`. | Effectively none | Free | Highest — every agent understands "build static, push to Pages" | Moderate: switch build to a static Vite/Next export; replace the header-based metadata origin with a configured site URL | No server, no DB, no secrets. Matches the site's real nature. Cheapest and most portable. |
| **Cloudflare Pages (direct, via Wrangler)** | Keep the Cloudflare runtime and image optimization; drop only the OpenAI Sites wrapper (`.openai`, `sites-vite-plugin`, `sites` remote). Deploy with `wrangler pages deploy`. | Low (Cloudflare) | Free tier ample | High | Low: closest to today's setup; keeps SSR + `/_vinext/image` | Best if you want to keep edge SSR and image optimization with minimal change. |
| **Vercel / Netlify (Next.js)** | Move to stock Next.js hosting; adopt their build. | Medium | Free tier, then paid | High (very common) | Higher: reconcile vinext's RSC/Vite setup with the platform's Next build | Most "mainstream," but the most rework relative to the current Vite/Workers stack. |

### Pros and cons per target

| Target | Pros | Cons |
| --- | --- | --- |
| **Static + GitHub Pages** *(recommended)* | Free forever; no new vendor (uses GitHub you already have); removes every Codex coupling at once; nothing to run or secure (no server, DB, secrets); easiest for any agent to redeploy; easiest to reverse. | No server-side rendering or on-the-fly image optimization (fine — the app is client-side and ships static assets); custom domain needs a DNS step; build must emit fully static output. |
| **Cloudflare Pages (direct)** | Closest to today's stack (keeps edge SSR + `/_vinext/image`); low rework; free tier is generous; still fully off OpenAI. | Adds/keeps a vendor account (Cloudflare) and its auth/token; more moving parts than static; you carry a runtime you don't currently need. |
| **Vercel / Netlify** | Most mainstream Next.js hosting; every agent and tutorial assumes it; great preview deploys and DX. | Most rework (reconcile vinext's Vite/RSC build with their Next pipeline); new vendor + account; free tier has usage caps that can push you to paid; mild lock-in to their build conventions. |

**Recommendation: static export + GitHub Pages**, with **Cloudflare Pages as the fallback** if you later
add server-rendered features or want to keep the image-optimization worker. Rationale: the site has no
server data, no DB, and dead auth, so paying any runtime tax is waste. Static export removes every
OpenAI/Codex coupling at once, keeps the project on infrastructure you already control (GitHub), costs
nothing, and is the easiest thing for any future agent to run and redeploy. It is also the easiest to
reverse (see §5).

This is the decision Eric owns. The rest of the kit works for whichever target he picks.

---

## 4. Reversible, repository-local scaffolding (safe to apply now)

These are the only changes safe without a target decision, accounts, or spend. Each is reversible and does
not change application behavior. They are **staged here, not yet applied**, because they should be
validated with `pnpm run lint && pnpm test && git diff --check` on a machine with the toolchain before
committing.

**4a. Make the hosting config optional so the repo builds without `.openai/`.** Replace the hard import in
`vite.config.ts`:

```ts
// before
import hostingConfig from "./.openai/hosting.json";
const { d1, r2 } = hostingConfig;

// after — tolerate a missing file so an off-Codex checkout still builds
import { existsSync, readFileSync } from "node:fs";
const hostingConfig = existsSync("./.openai/hosting.json")
  ? JSON.parse(readFileSync("./.openai/hosting.json", "utf8"))
  : { d1: null, r2: null };
const { d1, r2 } = hostingConfig;
```

**4b. Client-only (CSR) static-deploy path — STAGED AND VALIDATED.** A first attempt reused vinext's own
build output, but vinext is an RSC framework: its browser entry fetches an RSC payload from a live server
on boot, which 404s on a static host (`[vinext] Initial RSC fetch returned 404 … aborting hydration`). A
static export therefore requires a **client-only build with no RSC and no server**. That is what is
staged, and it does not touch the `vinext` scripts, the `sites` remote, or `.openai/`:

- `static.html` → the SPA shell (title/description/OG meta, Geist fonts, `#app` root).
- `build/static-entry.tsx` → mounts the existing `app/page.tsx` (already `"use client"`) with
  `createRoot` and imports the app's CSS. Pure CSR; the tax math runs entirely in the browser.
- `vite.static.config.ts` → a standalone Vite + React build (no vinext, no Cloudflare) → `dist-static/`.
- `build/finish-static.mjs` → renames the entry HTML to `index.html`, writes `404.html` and `.nojekyll`.
- `package.json` → `build:static`: `vite build --config vite.static.config.ts && node build/finish-static.mjs`.
- `.github/workflows/deploy-pages.yml` → runs `build:static` and deploys `dist-static/` to GitHub Pages.
  Inert until Pages is enabled (Settings → Pages → Source = GitHub Actions).

**Validation (done on the owner's machine, 2026-07-21).** `pnpm run build:static` built cleanly (23
modules; ~270 kB JS). Served locally and opened in a browser: the full site renders — hero, navigation,
and a live estimated receipt computing `$43,832` on `$140,000` income with federal/California/payroll
breakdown — with correct fonts/styling and **no console errors**. The `#estimate` CTA navigates and the
app is interactive. This confirms the CSR path works as a real static site with no server and no data
store. (Cloudflare Pages remains the §3 fallback if you later want server-side rendering back.)

**4c. Leave `CODEX_SANDBOX` handling in place.** It is inert off Codex and preserves round-trip parity.

Everything else in the inventory (removing the `sites` remote, deleting `.openai/`, `sites-vite-plugin`,
`chatgpt-auth.ts`, `vinext`) should happen **only in the execution phase after Eric picks a target**, so
the two deploy paths never fight and the move stays reversible.

---

## 5. Round-trip guide — off Codex and back

The invariant in both directions: **`origin` (GitHub) and Git history are canonical.** Codex/OpenAI Sites
and any new host are just deploy targets hanging off the same repo. Never let a deploy target hold state
that is not in the repo.

### Forward — Codex → neutral (recommended: static + GitHub Pages)

1. Branch from `main`; do not touch the `sites` remote.
2. Apply scaffolding §4a–4b. Add the static build + Pages workflow.
3. Run `pnpm run lint && pnpm test && git diff --check`; build the static output and preview locally.
4. Verify the live Pages build matches the current site (Medicare drill-down, spouse allocation, source
   labels) — reuse the P0/P1 acceptance evidence in the `RESUME-*.md` files.
5. Record the deploy in a `coordination/DECISIONS.md` entry; update `PROJECT_BOARD.md`. Only after the new
   URL is verified, retire the `sites` remote and `.openai/` wrapper in a separate, revertable commit.

### Back — neutral → Codex

1. The `.openai/hosting.json` (`project_id appgprj_6a5fd0ca…`) and the `sites` remote are preserved in Git
   history; restore them from the pre-retirement commit, or keep them on an untouched branch.
2. Re-add the `sites` remote:
   `git remote add sites https://git.chatgpt-team.site/5a35d276-…/appgprj_6a5fd0ca…git`.
3. Restore `vinext` scripts and `vite.config.ts` §4a to the original import if desired (the fallback
   version still works on Codex, so this is optional).
4. Push to `sites` to redeploy through OpenAI Sites; verify.

Because the forward move is additive first and destructive only in a final, isolated commit, "going back"
is a `git revert` of that commit plus a remote re-add — no data reconstruction, because there is no data
outside the repo.

### Split-brain guard

Only one deploy target should be "live" at a time. Whichever it is, the repo commit it was built from must
be tagged, and the live target + commit recorded on `PROJECT_BOARD.md`. Never edit content on a host; edit
in the repo and redeploy.

---

## 6. Decisions Eric must make (nothing executes until these are answered)

1. **Target platform** — static + GitHub Pages (recommended), Cloudflare Pages, or Vercel/Netlify.
2. **Keep or drop the image-optimization worker** (`/_vinext/image`). Static export drops it; Cloudflare
   Pages keeps it. Do any images need on-the-fly optimization, or are the committed SVG/PNG assets enough?
3. **Custom domain / URL** — Pages/Cloudflare give a default URL; a custom domain is a separate, optional
   choice (and affects the metadata origin in `layout.tsx`).
4. **When to retire the `sites` remote and `.openai/` wrapper** — immediately after verification, or keep
   them dormant for a defined round-trip window.
5. **Authorization to execute** — this document is proposal-only. Confirm before any account connection,
   deploy to a new host, or destructive commit.

No cost, retention/export, or backup decision is required for the recommended path: GitHub already holds
the canonical repo, and there is no external data store.

---

## 7. What you set up by hand vs what the agent automates

An agent can write all the code, build config, deploy workflow, validation, docs, and commits. It **cannot**
create accounts, click OAuth consent screens, add secret tokens, or change DNS — those are yours because
they require your identity and authorization. Here is the full manual list per target.

### Static + GitHub Pages (recommended) — ~2 minutes of clicks, no new account

| You do by hand (once) | Agent automates |
| --- | --- |
| In GitHub → repo **Settings → Pages**, set **Source = GitHub Actions** (one dropdown). | The static build script, the Pages deploy workflow, parity checks, commits, and every future redeploy on push. |
| *(Optional)* custom domain: add a `CNAME`/`A` record at your DNS provider and type the domain into the Pages settings. | Wiring the domain into the app's metadata origin. |
| Approve/merge the PR. | Everything else. |

No new account, no billing, no API token — GitHub Actions uses a built-in token. After the one dropdown,
every future update is just "push to main."

### Cloudflare Pages (fallback) — one account + one authorization

| You do by hand (once) | Agent automates |
| --- | --- |
| Create/log into a **Cloudflare account**. | Build command, output config, `wrangler` deploy config. |
| Either connect the GitHub repo in the Cloudflare dashboard (**OAuth authorize** Cloudflare→GitHub), **or** create a Cloudflare **API token + account ID** and paste them into GitHub repo secrets. | The deploy workflow that consumes those secrets. |
| *(Optional)* custom domain via Cloudflare DNS. | Metadata origin update. |

### Vercel / Netlify — one account + import

| You do by hand (once) | Agent automates |
| --- | --- |
| Create a **Vercel/Netlify account**; **import** the GitHub repo (OAuth authorize). | Build/framework config and any adapter code needed for their pipeline. |
| Confirm build settings in their UI. | Redeploys via Git integration. |
| *(Optional)* custom domain. | Metadata origin update. |

### Independent of target

- **Returning to Codex** uses git credentials you already have (`git remote add sites …` + push). No new
  setup.
- **Nothing requires spend** on the recommended path. Cloudflare/Vercel/Netlify have free tiers; only a
  custom domain or heavy traffic would ever cost money, and that stays your decision.

Bottom line for the recommended path: your entire hands-on job is **flip one GitHub setting and merge a
PR.** The agent does the rest and every subsequent deploy is automatic.
