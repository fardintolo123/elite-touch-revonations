# CLAUDE.md — Elite Touch Renovations · AI Operating System

This file is the **entry point for every task** in this repo. It does **not** repeat what other docs
say — it tells you **which doc is authoritative, when to read it, and how to resolve conflicts.**
Read the linked docs; do not assume their contents.

> **Golden rule:** before starting any task, (1) find it in **[Task Routing](#task-routing)** and read
> the mapped docs, (2) obey the **[Source-of-Truth Hierarchy](#source-of-truth-hierarchy)**, (3) follow
> the **[Per-Task Workflow](#per-task-workflow)**. When a doc names a file, route or flag, **verify it
> still exists in the code before relying on it** — docs go stale faster than anyone expects.

> ⚠️ **This file was seeded from a sibling project (4 Elements Painting) that had been through nine
> performance repairs, three SEO-invisibility bugs and one fabricated-content purge. The rules below
> are what that cost.** Everything business-specific has been stripped. Lines marked **`TODO:`** need
> a real answer before they can be trusted — **do not invent them.**

---

## Project Overview

**Elite Touch Renovations (ETR)** — a renovation business specialising in **bathroom renovations**.
Run by the Dawood family — **Omar, Adam and Farah**. Building a marketing website from scratch.

| Fact | Value |
|---|---|
| Trade focus | **Bathroom renovations**, Sydney NSW |
| Services (4) | **Bathroom · Ensuite · Bathroom + laundry · Powder room** renovations |
| Family / principals | **The Dawood family** — Omar and Adam Dawood (Projects Managers), **Farah Dawood (Architectural Designer)** |
| Founded | **2023** |
| NSW Builder Licence | **475204C** |
| Phone | **0411 752 334** |
| Standards claim | Built to **AS 3740** waterproofing + current Australian Standards |
| Offer | **Free on-site measure** across Sydney · **fixed-scope written quotes** |
| Workmanship warranty | Offered, and stated on the site — ⚠️ **term not yet supplied; never write a number** (D-19) |
| Google Business Profile | **Exists** — rating / review count / URL still to capture |
| Packages | **BASIC $17,999 · STANDARD from $25,999 · PREMIUM from $32,999** (+ an ORIGINAL tier) |
| Real customer reviews | **19, verbatim, in [Customer Reviews.md](Customer%20Reviews.md)** — the only approved source of testimonial copy |
| Case studies (3) | The Rocks heritage bathroom · Hunters Hill marble bathroom · Artarmon bathroom + ensuite |
| ABN · email · address | **TODO** |
| Tech stack + hosting | **TODO** — nothing is built yet |
| Google Business Profile | **TODO** |

Sources: the page-copy and package PDFs on **issue #2**, and
[docs/BATHROOM_SITE_STRUCTURE.md](docs/BATHROOM_SITE_STRUCTURE.md). Full detail, including every
package inclusion, is in [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

**Once the site exists, put all of this in `src/data/businessInfo.ts` (or equivalent) — one file, one
source of truth.** Never let a business fact live only in JSX, only in a doc, or only in a conversation.

---

## Documentation Map

**Root — always relevant:**
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — business facts, architecture, and how the codebase
  actually behaves. The place for "why does it do that".
- [DECISIONS.md](DECISIONS.md) — what was decided, why, and **what was rejected.** Check before
  proposing a change.
- [DESIGN.md](DESIGN.md) — ⭐ **authoritative for brand, colour, type, spacing, components, motion.**
  Already written. Do not contradict it, and do not start a second design system.
- [Customer Reviews.md](Customer%20Reviews.md) — the 19 real testimonials. **The only permitted source
  of review copy.**
- [service-areas.json](service-areas.json) — ⭐ **machine-readable service areas:** every suburb with
  slug, postcode, tier and Tier-1 URL. **Generate location routes from this file; never retype the
  list.** Entries flagged `isNotASuburb` exist for postcode completeness and get no service-area copy.
- `ETR images/` · `ETR images and reviews/` — **33 project photos, uncommitted.** Every image — these
  33 and any added later — follows one standing pipeline before it ships: **Detect → Inventory →
  Verify → Flag issues → Approve → Add to repo → Commit → Use public asset URL → Add accurate alt
  text** (decision record D-36 in [DECISIONS.md](DECISIONS.md)). This is automatic — don't wait to be
  told to run it again.
- [docs/IMAGE_INVENTORY.md](docs/IMAGE_INVENTORY.md) — ⭐ **Detect/Inventory/Verify are done for all 34
  files** (the 33 plus the root logo). **Approve is not** — read the flags before shortlisting anything
  from it (an unverified testimonial not in `Customer Reviews.md`, an undocumented family member,
  unconfirmed provenance on several template graphics).
- [Web Design Research.md](Web%20Design%20Research.md) — background UX/CRO reference. Useful reading,
  **not** a rulebook; where it disagrees with `DESIGN.md`, `DESIGN.md` wins.

**`docs/` — specialised guides:**
- [docs/SEO_CONTENT_GUIDE.md](docs/SEO_CONTENT_GUIDE.md) — how to plan and write pages and posts:
  keyword rules, search intent, local SEO, internal linking, schema, trust signals.
- [docs/PERFORMANCE_BUDGET.md](docs/PERFORMANCE_BUDGET.md) — ⭐ budgets, the before/after regression
  process, and the measurement runbook. Read before **any** change that adds weight.
- [docs/SEO_AEO_GEO_CHECKLIST.md](docs/SEO_AEO_GEO_CHECKLIST.md) — per-page QA gate before shipping.
- [docs/CONTENT_QUALITY_CHECKLIST.md](docs/CONTENT_QUALITY_CHECKLIST.md) — copy quality, readability,
  keyword placement, conversion requirements.
- [docs/BATHROOM_SITE_STRUCTURE.md](docs/BATHROOM_SITE_STRUCTURE.md) — which suburbs get a dedicated
  page (Tier 1) vs. a regional hub (Tier 2), the agreed URL/route structure and internal-linking rule,
  the competitive landscape, and GKP-confirmed keyword volumes. Read before creating any suburb or
  location page.

---

## Source-of-Truth Hierarchy

When two sources disagree, the **higher tier wins**:

0. **Owner's live instruction** — overrides everything.
1. **`DESIGN.md`** for anything visual; **`DECISIONS.md`** for anything already settled.
2. **The code** for "what IS" — `businessInfo`, the sitemap, the config beat any document.
   **The guides** for "what SHOULD be."
3. **`docs/` guides** → background research.

- **Docs may be stale.** If a doc references a file, flag or route, `grep` for it before acting.
- **Never invent a fact.** Prices, reviews, locations, licence numbers, project details, years in
  business, staff counts. If it is not in `Customer Reviews.md`, a business-info file, or an owner
  message — **ask.** An invented fact on a trade website is a trust and liability problem, not a
  copywriting shortcut.
- **Do not re-litigate a rejected approach** without new evidence. Check `DECISIONS.md`, then say what
  changed.

---

## Task Routing

| Task type | Read first |
|---|---|
| **Anything, if unsure whether it's been decided** | [DECISIONS.md](DECISIONS.md) |
| **UI / design / visual / component** | [DESIGN.md](DESIGN.md) — authoritative. Do not invent tokens |
| **New page or section** | `DESIGN.md` → `docs/SEO_CONTENT_GUIDE.md` → `docs/CONTENT_QUALITY_CHECKLIST.md` → `docs/SEO_AEO_GEO_CHECKLIST.md` |
| **Copywriting / readability** | `docs/CONTENT_QUALITY_CHECKLIST.md` |
| **SEO / keywords / content strategy** | `docs/SEO_CONTENT_GUIDE.md` |
| **Suburb / location page** (which suburbs get one, its URL, which hub it links to) | `docs/BATHROOM_SITE_STRUCTURE.md` for the reasoning + [service-areas.json](service-areas.json) for the data. The tier split and routes are already settled; **do not add a suburb page that isn't Tier 1** without new volume evidence |
| **Photos / images** (any image — the initial 33 or any added later) | [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) K5 for the full pipeline — **Detect → Inventory → Verify → Flag issues → Approve → Add to repo → Commit → Use public asset URL → Add accurate alt text.** Never infer subject, location or before/after status from a filename, folder or page topic; alt text describes the photograph, not the keyword |
| **Testimonials / proof / trust signals** | [Customer Reviews.md](Customer%20Reviews.md) — **verbatim only**, attributed as written |
| **Anything that adds weight** (dependency · component kit · animation · third-party script · image · font · `'use client'` · page) | ⭐ `docs/PERFORMANCE_BUDGET.md` — **baseline before, re-measure after.** This is the row that gets skipped, and skipping it is how a site degrades one "small" change at a time |
| **Performance / Core Web Vitals** | `docs/PERFORMANCE_BUDGET.md` |
| **Schema / structured data** | `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 |
| **Sitemap / robots / canonicals / indexation** | `docs/SEO_AEO_GEO_CHECKLIST.md` Phases 0 & 2 + [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) |
| **Third-party SEO tool report** (cannibalisation · gap · audit PDF) | `docs/SEO_CONTENT_GUIDE.md` → *Report intake*. **Do not action one as written** |
| **Pricing / quotes / cost content** | The **Renovation Packages** PDF on issue #2 is the pricing source of truth; the tiers and their inclusion lists are summarised in [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) §2. Always pair a price with its stated bathroom size. A cost/pricing page is a confirmed opportunity (100–1K/mo — `docs/BATHROOM_SITE_STRUCTURE.md`) |
| **Anything sourced from a competitor site** (incl. issue #1's reference link) | [DECISIONS.md](DECISIONS.md) D-05 — **layout and structure may be used as reference; copy, specifications and claims may not.** |

---

## Business Rules

- **Four services, and only four:** bathroom · ensuite · bathroom-and-laundry · powder room
  renovations. Do **not** advertise kitchens, full-home extensions, tiling-only, or standalone
  waterproofing/leak-repair jobs until the owner confirms them. Competitor coverage is not a reason to
  claim a trade. *(Waterproofing is performed **as part of** a renovation, to AS 3740 — that is a
  process claim, not a standalone service.)*
- **The licence number `475204C`, the phone `0411 752 334`, `AS 3740` and "family-run since 2023" are
  real and load-bearing trust signals.** Reproduce them exactly. Never approximate a licence number,
  never round the founding year, never upgrade "family-run" into a team size we cannot evidence.
- **Package prices are `$17,999` / from `$25,999` / from `$32,999`, each tied to a stated bathroom
  size and a specific inclusion list.** Never quote a price without its size basis and never present
  "starts from" as a fixed price. The full inclusion matrix is in `PROJECT_CONTEXT.md` — if a claim
  is not in it, it is not in the package.
- **The only real reviews are the 18 in `Customer Reviews.md`.** Reproduce them verbatim with the
  reviewer's name as written. **Never write a testimonial, never invent a customer, never invent a
  quote, and never generate review schema for a review that does not exist.**
- **Never invent project details** — no suburb, street, budget, duration or "before/after" pairing
  unless it is evidenced. Do not label photos "before/after" without a genuine matched pair.
- **Never state a price** until a pricing source of truth exists (see Task Routing). When it does,
  ranges are indicative and firm only after an on-site quote.
- **Licence, ABN and insurance claims must be real.** These are legally significant on a trade site.
  Leave them out rather than approximate them.
- **Photos of a customer's home are the customer's.** Get consent before publishing, and keep a record
  of it.

---

## Conversion Rules

A renovation site exists to produce enquiries. Rankings without enquiries are worthless.
**Above the fold, on every page that can take a lead:**

- **Service + location in the H1**, once the service area is known.
- **Tap-to-call visible without scrolling** on mobile.
- **Real social proof visible early** — rating, review count, or a named testimonial from
  `Customer Reviews.md`. Never a rounded-up or invented figure.
- **3-second clarity:** what you do · where · what happens next.
- **Call tracking must work and must not double-count.** Decide one mechanism and document it in
  `PROJECT_CONTEXT.md`. The simplest reliable pattern is a **single delegated listener** on `tel:` and
  `mailto:` anchors, with **every** call CTA implemented as a real anchor. If any button uses a JS
  handler instead, it needs its own event — and if it is ever converted to an anchor, that manual
  event must be removed in the same change or every call counts twice.
- **Bathroom renovation is a considered, high-value purchase.** Process, timeline, warranty and
  "what it's like to have us in your home" convert better than adjectives. The testimonials repeatedly
  praise communication, punctuality and cleanliness — lead with those, because they are evidenced.

---

## Architecture Rules

These are framework-level lessons, not preferences. Adjust the names to whatever stack is chosen.

- **Content is data.** Drive repeated page types (services, locations, guides) from a data file plus
  one renderer, not from copy-pasted JSX. Edit the data, not the markup.
- **SEO copy must be in always-rendered markup.** Anything behind a lazy-loader, an
  `IntersectionObserver` or a conditional mount is **invisible to crawlers**, because the fallback is
  what ships in the server HTML. Collapse accordions with CSS, never unmount them.
- **Rendering markup eagerly ≠ downloading images eagerly.** Keep sections in the HTML and let the
  *images* be lazy. Crawlability and image cost are separate levers.
- **A not-found branch must set `robots: { index: false, follow: false }`** explicitly. A sitewide
  `index, follow` default is inherited by 404 bodies, which silently creates indexable soft 404s.
- **Any slug in a services data file may become a live URL automatically.** If a record is not meant
  to be a page, redirect it — or it becomes a duplicate.
- **Props are serialised into the client payload even when never rendered.** Pass only the fields you
  render; "not rendered" is **not** "not published".
- **Publication = content + an internal link from a relevant hub + a sitemap entry.** A sitemap entry
  alone is not publication.
- **`'use client'` is contagious.** One shared component with a hook forces every consumer
  client-side. Before adding the directive, find out which import demanded it.
- **Before enabling any dormant data field or page, audit its copy against the current Business
  Rules.** Dormant content carries stale claims.

---

## Per-Task Workflow

1. **Plan first.** Write a short implementation plan, then a checklist. Keep both in `plans/`.
2. **Route and read** the mapped docs before changing anything.
3. **Implement** per the standing rules.
4. **Keep the checklist live** — tick items as they land, not at the end.
5. **Gate with the right check** for the task class (build green · performance re-measure · browser
   verification · the SEO/AEO/GEO checklist).
6. **Complete:** build green, docs updated, decisions recorded in `DECISIONS.md`.
7. **Report** using one Executive Summary — see below.

## Testing Workflow

- The build must be green before commit. Treat a **drop** in the route count as the red flag; don't
  pin an exact total.
- **Never run two builds against the same build directory at once.** Concurrent builds corrupt each
  other and fail with misleading errors that look exactly like code faults.
- ⚠️ **Do not trust a background task's exit code.** A wrapped command
  (`build > log 2>&1; echo $?`) reports the wrapper's status, not the build's. **Read the output.**
- **Verify UI changes in a real browser**, desktop and mobile (390px). Not by reasoning about the code.
- **Verify SEO copy is in the served HTML** — `curl` the URL and grep for a distinctive phrase.
  If it isn't there, crawlers can't see it.

## Git Workflow

- Commit with an explicit pathspec: `git commit -m "msg" -- <paths>` (options before `--`).
  **Never `git add -A`** — more than one agent session may be working in the tree.
- Clear subject + a body explaining *why*. End with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` — name the model that did the work.
- **Do not push or deploy without explicit owner sign-off.**
- Prefer hand edits over blind `sed`/regex on copy, titles or metadata.

## Documentation Workflow

- **Record a decision where it will be found again.** A verdict or an owner answer goes in
  `DECISIONS.md`; a codebase mechanic goes in `PROJECT_CONTEXT.md`. **A rule recorded only in a code
  comment does not survive** — that is precisely how the sibling project let the same performance bug
  recur for months.
- **A written rule is not evidence it was implemented.** Verify against the code, and mark it shipped
  when you implement it.
- Prefer pointing at a live artefact over hard-coding a number that will rot.

---

## Reporting Format

After every completed task, give **one Executive Summary only.** No separate technical report, no
duplicate summary. Write for the owner: assume they understand their business, their website and
marketing, but are **not** a software engineer. Explain a technical term the moment you need it.

**Required headings, in this order:**

- **What happened** — 2–5 bullets: what you did, what you found, what changed.
- **Why it matters** — the practical impact on the site, enquiries, or the business.
- **What's finished** — completed and verified.
- **What's still a problem** — only real remaining problems. If none: *"Nothing important remains."*
- **What I need to decide** — only genuine owner decisions. If none: *"Nothing — no decision is needed
  from you."*
- **What should happen next** — **always last.** Exact next actions, in order. No vague phrases like
  "review accordingly", "address the issue" or "proceed with the remaining work".

Short sentences. Separate facts from recommendations. No file paths or code detail unless the owner
needs them to act. If the owner reads only this summary, they must know what happened, what's done,
what's wrong, what to decide, and exactly what to do next.

---

## Review Checklist

- [ ] Task routed; mapped docs read.
- [ ] `DECISIONS.md` checked — not silently reversing a settled decision.
- [ ] **No invented facts** — reviews, prices, locations, project details, credentials.
- [ ] `DESIGN.md` honoured; no second design system introduced.
- [ ] SEO copy present in the served HTML.
- [ ] **No performance regression** — budgets in `docs/PERFORMANCE_BUDGET.md` met; no new dependency,
      third-party script or `'use client'` added without justification.
- [ ] Build green; verified in a browser if the UI changed.
- [ ] Decisions and mechanics recorded in the right file.
- [ ] Response follows the Reporting Format, "What should happen next" last.
