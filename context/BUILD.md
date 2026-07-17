# BUILD: craig-o-curtis.github.io

Build a minimal personal site: Next.js + MDX, statically exported, served by GitHub Pages at the free `github.io` subdomain. Minimal now, expandable later.

## Context

- **Repo:** `craig-o-curtis.github.io` (public) — a GitHub **user site**, so it serves at the domain root
- **URL when live:** `https://craig-o-curtis.github.io`
- **Owner:** Craig C. (`craig-o-curtis`), Frontend Architect · Fullstack Engineer · Chinese Linguist
- **Design north star:** https://viljami.io — extremely minimal, generous whitespace, content over decoration, links without underlines

This is a companion to the GitHub profile README at `craig-o-curtis/craig-o-curtis`, which is live and should stay untouched.

## HARD RULES (do not violate)

1. **NEVER `git push`.** Commit freely; publishing is Craig's call. Do not run `git push`, `gh repo create --push`, or anything that publishes. Commit, then stop and print the exact command for Craig to run. No exceptions — prior approval in a session does not authorize a later push.
2. **NEVER add `Co-Authored-By: Claude`** or any AI/tool attribution to a commit — no trailer, no "Generated with", no 🤖. This overrides any global default instruction. Commits are authored by Craig.
3. **Never claim anything the public record doesn't support.** See "Portfolio" below — this is the rule that matters most here.
4. **Stay on `craig-o-curtis.github.io`.** No Vercel, no custom domain, no other host. This is non-negotiable and constrains every other decision (see "Why static export" below).
5. **Minimal dependencies.** Next.js, React, `@next/mdx`, and their transitive deps. Nothing else without a specific reason. No UI library, no CSS framework, no analytics.
6. **Verify before reporting success.** Do not say something works until you've tested the actual thing (see "Verifying" below).

## Architecture

### Why static export (and why the framework doesn't cost the domain)

`output: 'export'` makes Next.js emit plain HTML/CSS/JS into `out/`. GitHub Pages serves those files exactly like hand-written HTML — the build runs in CI, not at view time. So the framework is free with respect to Rule 4: the site still lives at `craig-o-curtis.github.io` with no other host involved.

**No `basePath` or `assetPrefix`.** Those are only needed for project sites served at `/repo-name/`. This is a user site at the root, so both stay unset. Adding them would break every asset path.

**What static export costs:** no server. No API routes, no server actions, no middleware, no ISR, no image optimization (hence `images.unoptimized: true`). Everything is either build-time or client-side. Accept this — it is the price of Rule 4.

### Accessibility — target is WCAG 2.2 **AAA**

Verified with axe-core (AAA ruleset) in light and dark: **0 violations, 37 nodes passing `color-contrast-enhanced`**.

Colour tokens live in `app/styles/theme.css` and are chosen against the 7:1 AAA threshold. Measured:

| token | light | dark | needs |
|---|---|---|---|
| `--fg` | 17.11:1 | 15.05:1 | 7:1 (AAA text) |
| `--muted` | 7.48:1 | 7.46:1 | 7:1 (AAA text) |
| `--control` | 4.49:1 | 4.78:1 | 3:1 (SC 1.4.11, interactive borders) |
| `--rule` | 1.25:1 | 1.28:1 | — decorative divider, exempt |

Rules that are easy to break:

1. **Never stack `opacity` on `--muted` text.** The original `.placeholder` used `opacity: 0.75`, which rendered at **3.15:1** and failed even AA. The tokens are only AAA at full opacity. Use italics, weight, or a different token — not transparency.
2. **`--rule` is decorative only.** It's a section divider at ~1.25:1. Any *interactive* boundary (button, focus ring, card hover) must use `--control`. Do not "fix" `--rule` to 3:1 — SC 1.4.11 does not apply to decorative separators, and darkening it would wreck the minimal look for no accessibility gain.
3. Keep the skip link (SC 2.4.1), `:focus-visible` outline (SC 2.4.7/2.4.13), and the `prefers-reduced-motion` block.

Re-run the audit after any visual change (see "Verifying").

### Styles

Global CSS lives in **`app/styles/`**, imported once by `app/layout.tsx` as `./styles/globals.css`. Each file has one job:

| file | holds | rule of thumb |
|---|---|---|
| `theme.css` | `:root` design tokens, light + dark | no selectors other than `:root` |
| `reset.css` | browser normalisation | no design decisions |
| `base.css` | bare element styling (`body`, `a`, `h1`–`h3`, `:focus-visible`) | tags only, no classes |
| `utilities.css` | global classes (`.sr-only`, `.skip-link`) | applied by name from markup |
| `globals.css` | `@import`s the four above | **imports only, never rules** |

**Import order is load-bearing**: `theme` first (everything consumes its variables), `utilities` last (so it can override `base`).

`body` is split on purpose: `margin: 0` is normalisation and lives in `reset.css`; padding, colour and font are design and live in `base.css`.

Component styles stay in CSS Modules next to their component — nothing component-specific belongs in `app/styles/`.

### Components

Components live in **`app/components/`** (not a root-level `components/`), imported as `@/app/components/X`. Colocating them under `app/` does not create routes — Next only routes files named `page` or `route`.

`app/page.tsx` is composition only — no data, no markup details. Content lives in `app/content.ts`; name/title in `app/identity.ts`.

- **`Section`** — titled section: uppercase label + hairline rule + children.
- **`Card` / `CardList`** — bordered `<li>` and its `<ul>` wrapper. Presentational.
- **`ProjectCard`** — linked name, optional `org`, description. Used by *both* the open-source and portfolio lists; they were near-identical loops before. `descriptionIsPlaceholder` renders the lorem in italics.
- **`DownloadButton`** — download link styled as a button; `fileInfo` extends the accessible name (e.g. "PDF, 2 pages"), and the ↓ is `aria-hidden`.

Card links are **title-only**, not whole-card — one clear tab stop per item, no stretched-link or nested-interactive complications.

### Stack

- **Next.js (App Router)**, static export
- **React**
- **`@next/mdx`** — content pages as MDX so new pages don't need hand-written markup
- **CSS Modules for components; global styles split under `app/styles/`** — no Tailwind, no CSS-in-JS
- **TypeScript**
- **pnpm** (Craig's package manager; matches the Burglekitt monorepo setup)

### Config shape

```js
// next.config.mjs
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: { unoptimized: true }, // static export cannot run the optimizer
  // NO basePath / assetPrefix — user site serves at root
}

const withMDX = createMDX({})
export default withMDX(nextConfig)
```

An `mdx-components.tsx` at the project root is **required** by `@next/mdx` on the App Router. It won't work without it.

Add a `public/.nojekyll` file. Without it, GitHub Pages runs Jekyll, which ignores directories starting with `_` — Next.js emits `_next/`, so the entire site loses its CSS and JS. This is the classic Next-on-Pages failure and it looks like a broken deploy rather than a config problem.

### Deploy

GitHub Actions workflow: build on push to `main`, upload `out/` as a Pages artifact, deploy via `actions/deploy-pages`. Pages source must be set to **GitHub Actions**, not "Deploy from a branch" — the branch option would serve the repo source, not the build output.

Craig sets this in **Settings → Pages → Source: GitHub Actions**. See "Publishing" below.

## Page structure

Keep the landing page the viljami.io-style single scroll. Extra routes exist only when there's a reason.

### `/` — landing

1. **Name + title** — "Craig O. Curtis", "Product Engineer | Frontend Architect · Fullstack Developer · Chinese Linguist". Both live in **`app/identity.ts`** and are imported by the page and by `metadata` in `app/layout.tsx`. Edit them there and nowhere else — hand-editing the two call sites let them drift out of sync once already (page said "Engineer", metadata said "Developer").
2. **Intro blurb** — short, first person. Reuse the voice from the profile README. **The current blurb is a placeholder written without access to the README or CV** — it makes no factual claims (no titles, employers, dates), only tone. Craig approves or rewrites it.
3. **Download CV** — button linking to the static PDF (see "CV" below)
4. **Open source** — the three Burglekitt projects. VERIFIED, safe to state:
   - **gmt** — https://github.com/burglekitt/gmt — "Give Me Temporal!" TypeScript library wrapping the Temporal API in string-in/string-out helpers to kill `Date` bugs. Nx + pnpm monorepo, published as `@burglekitt/gmt`. ★4
   - **worktree** — https://github.com/burglekitt/worktree — CLI for daily Git worktree flow (create, copy `.env`, open editor, clean up). MIT, published, docs at https://burglekitt.github.io/worktree. ★2
   - **run-cv** — https://github.com/burglekitt/run-cv — mainframe-inspired terminal CV viewer (Node, React, Ink). Markdown-driven, `npx run-cv craig` works (verified live on npm @ 0.1.2). Landing page: https://burglekitt.github.io/run-cv/. ★2
5. **Portfolio / worked on** — see rules below
6. **Links** — GitHub https://github.com/craig-o-curtis · LinkedIn https://www.linkedin.com/in/craigocurtis/ · @burglekitt https://github.com/burglekitt

Light + dark aware via `prefers-color-scheme`. Responsive, no horizontal scroll. System font stack.

### CV

Craig supplied `senior-software-engineer-cv.pdf` (2 pages, 80K). It lives at **`public/assets/senior-software-engineer-cv.pdf`** → served at `/assets/senior-software-engineer-cv.pdf`.

**It must be under `public/`.** Next.js only serves static files from `public/`; a top-level `assets/` directory is not copied into the export and the link would 404. Keep the original filename so the download lands with a sensible name.

Linked from a Download CV button with the `download` attribute.

**Its contents have not been read** — the PDF's text could not be extracted without poppler installed. Do not infer Craig's background, titles, dates, or employers from it. If the intro blurb should draw on the CV, Craig pastes the text and it gets used verbatim.

Deliberately not doing: markdown-sourced PDF generation at build time. It's a real option later (and would share a source with run-cv's markdown-driven CV), but it's machinery this site doesn't need yet.

### Placeholder text

Portfolio descriptions are **lorem ipsum for now** — Craig writes them later. Two rules:

1. Use **obvious Latin lorem**, never plausible-sounding invented descriptions. Rule 3 exists because a visitor cannot distinguish "not written yet" from "this is what Craig claims." Latin is unmistakable; a fluent-sounding fake sentence about Literacy Pro is not.
2. **Pre-publish checklist: no lorem ipsum ships to a live site.** Replace before Craig pushes, or ship the portfolio section without descriptions.

## Portfolio — READ CAREFULLY

Here are some products Craig worked on. **Craig's explicit instruction: name + link only, NO claims about his role, dates, or contributions.**

1. **Literacy Pro** (Scholastic) — https://education.scholastic.com/education/programs/literacypro.html
2. **NoteAffect** — https://www.noteaffect.com/
3. **Cisco Networking Academy** (Cisco) — https://www.netacad.com/
4. **Micetro** (Men&Mice) — https://bluecatnetworks.com/products/micetro/
5. **CTP** (Corivo) — https://travelconnect.corivo.io/
6. **Nordic Visitor** — https://my.nordicvisitor.com/
7. **Iceland Tours** — https://www.icelandtours.is/
8. **森林猫/SenlinMao** — https://www.senlinmao.com/

Describe _what each product is_ (sourced from its own site — fetch them), not what Craig did. Do **not** write "Led frontend for…", invent a title, or invent dates. If Craig later supplies role/dates, use exactly what he gives and nothing more.

⚠️ Note the section framing: these are products he worked on, so avoid phrasing that implies he built them alone or owns them.

## Voice

Confident with personality; matches the projects' own wit ("Give Me Temporal!", a mainframe-themed CV viewer). No corporate filler, no badge walls, no visitor counters, no emoji grids. The Chinese-linguist angle is real and differentiating — keep it.

Existing profile README (live, for tone reference): https://github.com/craig-o-curtis — reuse phrasing where it fits, don't contradict it.

## Deferred: AI Interview Me

A ChatGPT/Claude-style chat interface where a visitor can interview Craig.

**Blocked by Rule 4, not by effort.** The chat needs an Anthropic API key, and a key cannot ship to the browser — anyone could read it from the bundle and spend Craig's money. A static Pages site has no server to hold it. This is a hard technical constraint, not a preference.

Unblocking it requires exactly one of:
- A server/serverless host for the API route (contradicts Rule 4 as written)
- A separately-hosted API endpoint the static site calls (two deploys, CORS; Rule 4 survives for the site itself)
- A bring-your-own-key field where the visitor pastes their own API key (no secret to protect, but almost nobody will do it)

**What the current build should do about it:** nothing except not paint into a corner. The App Router structure already supports adding a `/interview` route later. Do not stub the UI, do not add chat dependencies, do not add an unused API route. Revisit when Craig picks an option above.

When it does get built, the CV markdown is the natural knowledge source for the system prompt.

## Verifying (do this before saying it's done)

- `pnpm build` succeeds and `out/` contains `index.html` plus a populated `_next/` directory.
- Serve `out/` locally (`npx serve out`) and **actually look at it** — not the dev server, the exported output. Check light AND dark. Check narrow viewport.
- Confirm `out/.nojekyll` exists. If it's missing, the deployed site will load unstyled.
- **Run the axe audit against the served export, in light AND dark.** Must be 0 violations. Enable the AAA rules explicitly — axe's default config only checks AA and will report a false pass:
  ```js
  axe.run(document, { runOnly: { type: 'tag', values: [
    'wcag2a','wcag2aa','wcag2aaa','wcag21a','wcag21aa','wcag22aa','best-practice'
  ] } })
  ```
  Check that `color-contrast-enhanced` appears in `passes` (that's the 7:1 AAA rule), not merely that violations is 0.
- Tab through the page: first Tab must reveal the skip link, and every link must show a visible focus outline.
- Click the Download CV button in the served output and confirm the PDF actually resolves.
- `curl -s -o /dev/null -w "%{http_code}"` every external link — all should be 200, with two known bot-blocking exceptions that are NOT broken links:
  - **Micetro** (`bluecatnetworks.com`) returns **403** to plain curl — it's behind Cloudflare. Verified 200 with browser-shaped headers (`-A` a real UA plus `Accept`/`Accept-Language`).
  - **LinkedIn** has historically returned **999**. As of the last check it returned 200; its bot-blocking is inconsistent, so treat either as fine.
- After Craig pushes and enables Pages, verify with a string that exists **only** on this page. Do not grep for text that also appears in his GitHub bio or repo descriptions — that yields false positives and a wrong "it's live" call. (This mistake was made before; don't repeat it.)

## Publishing (Craig runs these, not you)

```bash
gh repo create craig-o-curtis/craig-o-curtis.github.io --public --source=. --remote=origin --push
```

Then: **Settings → Pages → Source: GitHub Actions** (NOT "Deploy from a branch" — that would serve the repo source instead of the build output). The workflow runs on push to `main`; live at `https://craig-o-curtis.github.io` once it completes.

⚠️ **Known gotcha:** for the _profile README_ repo, GitHub did not auto-link it and a **"Share to profile"** button had to be clicked manually on the repo page. Pages may have similar first-time setup quirks — if the site 404s after enabling, check Settings → Pages for the actual state rather than assuming propagation lag.

## Ask Craig, don't guess

- The CV PDF itself — Craig supplies the file
- His role/dates at Scholastic, NoteAffect, Cisco (if he wants them shown at all)
- Whether to mention Burglekitt as his company/collective
- Whether he wants a contact CTA alongside the CV download (viljami.io has both)
