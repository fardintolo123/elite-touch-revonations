# Session Summary

## 1. Session Objective

Two pieces of work, done in sequence in one conversation:

- **(a) Triage GitHub issue #11** ("questions for blogs" — three topic titles sourced from
  `findquestions.com`, a third-party question tool) and decide whether they were worth publishing
  as blog content that brings clients, not just traffic. Then, on the user's go-ahead, build
  whatever survived the triage.
- **(b) Fix the gallery-page readability gap (K15)** — a pre-existing, previously-flagged finding
  that all 11 `/gallery/{slug}/` project pages failed the site's own Flesch ≥ 60 readability bar.
  The user asked for this as a follow-up ("2", selecting it from a list of "what should happen
  next" options offered at the end of part (a)).

## 2. Work Completed

**(a) Issue #11 triage + cost/pricing content — IMPLEMENTED**

- Read issue #11 (three question titles, no volume/difficulty data attached) and cross-checked
  each against real pricing facts (`DECISIONS.md` D-07/D-60/D-61) and existing keyword research
  (`docs/BATHROOM_SITE_STRUCTURE.md`: `bathroom renovation cost sydney` is GKP-confirmed at
  100–1K/mo, Medium competition).
- Verdict: fold all three topics into the **existing** `/packages/` page rather than open a new
  URL or a blog — `docs/SEO_CONTENT_GUIDE.md` §3 defaults to IMPROVE over CREATE, and a separate
  cost page would target the same searcher as `/packages/` already does ("one term, one page").
- Built into `app/packages/page.tsx`:
  - Hero lead paragraph now states the three real prices up front (answer-first).
  - New H2 section: "How much does a bathroom renovation cost in Sydney?" — direct answer +
    what drives cost up/down.
  - New H2 section: "Is $30,000 really the minimum for a bathroom renovation?" — answered
    honestly: no, Basic starts at $18,000; $30,000 is where Premium starts.
  - New H3 paragraph inside that section: "What about a $10,000 bathroom renovation?" — honest
    expectations-setting, explicitly does **not** claim ETR offers a $10k tier (it doesn't).
  - New 5-question FAQ block (`<details>/<summary>`, always-rendered, not lazy-mounted) covering
    cost, the $30k question, what's included, whether the price is fixed, and how long a
    renovation takes (durations sourced from `businessInfo.buildDurations`).
  - Updated `metadata.title` (was "Bathroom Renovation Packages & Pricing", now "Bathroom
    Renovation Cost & Packages") and `metadata.description` (149 chars, states the cost-question
    answer directly).
- Created `components/FaqSchema.tsx` — a small, reusable `FAQPage` JSON-LD component (mirrors the
  existing `components/BreadcrumbSchema.tsx` pattern). Takes `items: readonly {question,
  answer}[]`. Wired into `/packages/` via a `FAQS` const in the page file.
- Recorded the triage verdict as **D-104** and **D-105** in `DECISIONS.md`, plus a full plan file
  at `plans/2026-08-26-issue-11-findquestions-triage.md`.

**(b) Gallery-page readability fix (K15) — IMPLEMENTED**

- Baseline measured: 11/24 site routes failing Flesch ≥ 60, all 11 of them the individual
  `/gallery/{slug}/` project pages (scores 49.0–55.3).
- **Root cause found:** not the shared "What every job includes" trust-signal block (the
  original K15 note's guess) — it was the "Other work of ours" related-projects grid at the foot
  of every project page, which rendered **10 other projects' full names** (e.g. "Castle Hill
  bathroom renovation"), so the 4-syllable word "renovation" alone appeared ~10 times per page.
  This block is identical in shape across every gallery page, which is why the failure looked
  uniform and was originally misattributed to the block beside it.
- **Fix, two parts:**
  1. Reworded the `blurb` field for all 11 projects in `lib/projects.ts` — shorter words only,
     same technique/limits as the earlier D-96/D-97 sitewide readability pass (e.g.
     "contemporary" → "modern", "renovated" → "done", "everything" → "things", "fixtures" →
     "taps"/"fittings"). No material, colour, fixture, or project fact was changed.
  2. In `app/gallery/[slug]/page.tsx`, the "Other work of ours" card heading now shows a short
     room-type label ("Bathroom" / "Ensuite", via `item.service.replace(/ renovation$/i, '')`)
     instead of the full project name. This was the larger lever (~+8–10 Flesch points on its
     own) — part 1 alone left every page still short of 60. Nothing is hidden: the suburb badge
     already sits above the card, and the full project name is still that page's own `<h1>`,
     `<title>`, and meta description one click away.
- Recorded as **D-109** in `DECISIONS.md`. Updated the **K15** row in `PROJECT_CONTEXT.md` to
  `~~K15~~ ✅ RESOLVED`, correcting the earlier (wrong) root-cause guess in the same edit.

**Commands/tests run this session:**
- `npm run build` — run repeatedly through the session; stayed green throughout, route count held
  at 30 (no drop) after every change.
- `npx tsc --noEmit` — clean after the `FaqSchema` prop type had to be widened to `readonly
  FaqItem[]` (a `readonly [...] as const` array doesn't satisfy a mutable array type).
- `npm run check:readability` — run before and after; before: 13/24 pass; after: **24/24 pass**.
- Started a local production server (`npm run start -- -p 3210`) once, `curl`'d `/packages/`,
  confirmed HTTP 200 and that the new copy/`FAQPage` schema were present in the actually-served
  HTML (not just the local build artifact), then killed the server (`taskkill`) — avoided leaving
  a second server/build process running per the project's "never run two builds against the same
  build directory at once" rule.
- Spot-checked `.next/server/app/gallery/castle-hill-bathroom.html` directly: confirmed exactly
  8 "Bathroom" + 2 "Ensuite" short labels render (the 10 other projects, correct split) and that
  no full other-project name leaked back in.

## 3. Important Decisions

**Decision: Fold issue #11's three topics into the existing `/packages/` page, not a new URL or a
blog.**
- **Reason:** `docs/SEO_CONTENT_GUIDE.md` §3 defaults to IMPROVE over CREATE when a page already
  targeting the same intent exists. `/packages/` already covers pricing; a new cost-guide URL
  would compete with it for the identical search ("bathroom renovation cost sydney").
- **Alternatives considered:** three separate blog posts (one per findquestions.com topic) —
  rejected, no blog exists on the site and D-86/D-88 already gate a general blog on real
  GKP/Ahrefs volume evidence, which findquestions.com's bare titles didn't supply. A single new
  standalone cost-guide page — rejected for the cannibalisation reason above.
- **Why the chosen approach was preferred:** it uses the one topic that *does* have independent
  volume evidence (the cost question) as the anchor, and safely neutralises the other two
  (the $30k figure and the non-existent $10k tier) as sections of a page that already exists and
  already ranks, rather than inventing new URLs or new pricing claims.

**Decision: Reject "$10,000 bathroom renovation" as a page or a literal claim.**
- **Reason:** ETR's real cheapest package is $18,000 (Basic). Answering the question with ETR's
  own inclusions at $10k would either invent a tier that doesn't exist (forbidden outright) or
  set an expectation the business can't meet, producing unqualified leads.
- **Alternatives considered:** writing generic (non-ETR) content about what $10k typically buys —
  rejected, doesn't serve "bring clients not just traffic" any better and still risks implying
  it's what ETR offers. Ignoring the topic entirely — rejected, it's a real, common search phrase
  and ignoring it leaves the objection unaddressed.
- **Why the chosen approach was preferred:** one short, honestly-framed paragraph that
  explains what that figure typically covers (cosmetic work, not a full reno) and states ETR's
  real starting price — turns a misleading search term into a qualifying moment instead of a
  false promise.

**Decision: Fix the gallery "Other work of ours" grid labels, not just the project blurbs.**
- **Reason:** measured — rewriting only the 11 blurbs improved scores by only ~1.5–2 points each
  (still all failing); the related-projects grid was the dominant driver.
- **Alternatives considered:** rewriting only blurbs (the originally-assumed K15 fix) — tried
  first, proven insufficient by re-measuring. Removing the related-projects grid entirely — not
  seriously considered; it has real internal-linking value and removing it is a bigger UX change
  than the problem warrants.
- **Why the chosen approach was preferred:** shortening the repeated label to a room type removes
  the repeated long word without deleting any information — the suburb badge and the linked
  page's own H1/title still carry the full name.

## 4. Permanent Rules / Lessons

- **When adding cost/pricing-angle content, check whether an existing page already targets the
  term before creating a new URL.** `/packages/` was the right home for issue #11's content; a
  new page would have cannibalised it. Worth checking for other "obvious blog topic" requests too.
- **A shared, repeated component (grid, card list, related-items strip) can single-handedly fail a
  page-wide readability check, even when the unique body copy on the page is fine.** If a
  readability failure looks identical across otherwise-different pages, check the shared/repeated
  elements first, not just the unique prose — this is exactly what caused K15's original
  misdiagnosis.
- **Shortening a repeated label (full name → short type/category label) is a legitimate
  readability/SEO fix as long as the full information still exists one click away and nothing is
  deleted.** Reusable pattern anywhere else a full name/title repeats in a list or grid.
- **`readonly [...] as const` data arrays need their consuming component's prop type to accept
  `readonly T[]`, not `T[]`** — otherwise `tsc` fails at build time even though the runtime
  behaviour is identical. Worth remembering for any future shared data-driven component.
- **`npm run check:readability` should be re-run after any copy change to a page it covers** —
  it's cheap, reads the local build output directly, and catches regressions like K15 before they
  ship.

## 5. Things We Explicitly Decided NOT To Do

- **Did NOT build a standalone blog or a new blog vertical from issue #11.** No independent volume
  evidence existed for a general blog; D-86/D-88 already gate that on real GKP/Ahrefs data.
- **Did NOT create a separate cost-guide URL.** Would have competed with the existing `/packages/`
  page for the same search term.
- **Did NOT answer "what does a $10,000 bathroom renovation include" with an inclusions list.**
  ETR has no $10k tier; doing so would have invented a fact.
- **Did NOT remove the "Other work of ours" related-projects grid** from gallery pages as the fix
  for K15 — kept it for its internal-linking value, shortened its labels instead.
- **Did NOT touch alt text, image files, pricing figures, size bases, licence number, ABN, or the
  workmanship warranty term** anywhere in this session — all of it is either legally significant
  (D-04/D-07) or outside this session's scope.
- **Did NOT run the full `verify:redirects` suite** — it requires a live server on port 3210 and
  this session's changes touched no routing/redirect configuration, so it was judged out of scope;
  a manual `curl` + HTML spot-check was done instead as a lighter substitute.

## 6. Current Project State

- **Working:** Build green, 30 routes, no drop. TypeScript clean. All 24 readability-checked
  routes pass Flesch ≥ 60 (was 13/24 at the start of this session). `/packages/` now answers the
  cost question directly, with real prices, an honest $30k/$10k myth-bust, and an FAQ block with
  `FAQPage` schema. All 11 gallery project pages read more easily with no facts changed.
- **Incomplete:** Nothing from this session was left half-done — both pieces of work were
  completed, verified, and are functioning.
- **Known issues:** None identified in the areas touched this session.
- **Known limitations:** No Lighthouse/PageSpeed pass was run this session (see §11). No real
  desktop/390px browser screenshot was taken for either change — verification instead relied on
  build output, a local server `curl` check for `/packages/`, and direct HTML inspection for the
  gallery pages. `docs/CONTENT_QUALITY_CHECKLIST.md`'s "verify UI changes in a real browser" step
  is technically outstanding for the visual card-label change on gallery pages.
- **Performance:** not measured (see §11).
- **SEO state:** see §12.
- **Design/UI state:** `/packages/` gained several new sections (still within the existing design
  system's `et-section`/`et-band-*`/`et-card` classes, no new CSS). Gallery project cards in the
  "Other work of ours" grid now show a one-word label instead of the full project name.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `app/packages/page.tsx` | Added answer-first cost section, "$30k minimum" myth-bust section, "$10k" honest paragraph, 5-question FAQ block + `FaqSchema`; updated `metadata.title`/`description` | Issue #11 triage — fold cost-question content into the existing pricing page |
| `components/FaqSchema.tsx` | **Created** — reusable `FAQPage` JSON-LD component | Needed for the new FAQ block; no FAQ schema pattern existed on the site before this |
| `DECISIONS.md` | Added **D-104** (issue #11 verdict: fold into `/packages/`), **D-105** (no new blog vertical created), **D-109** (K15 gallery-readability fix, root cause + solution) | Documentation Workflow — record every decision where it will be found again |
| `plans/2026-08-26-issue-11-findquestions-triage.md` | **Created** — full per-topic triage and recommendation | Per-Task Workflow — plan first, keep the checklist live |
| `lib/projects.ts` | Reworded the `blurb` field on all 11 projects (word-length swaps only) | Part 1 of the K15 readability fix |
| `app/gallery/[slug]/page.tsx` | "Other work of ours" card heading now renders a short room-type label instead of the full project name | Part 2 of the K15 readability fix — the larger contributor |
| `PROJECT_CONTEXT.md` | Updated the K15 row to `~~K15~~ ✅ RESOLVED`, corrected the earlier wrong root-cause guess | "A written rule is not evidence it was implemented" — mark shipped, correct the record |

## 8. Files Created

- `components/FaqSchema.tsx` — reusable `FAQPage` JSON-LD component, takes `items: readonly
  {question, answer}[]`. Used by `/packages/`; noted in `DECISIONS.md` D-107 (a different,
  concurrent session's work) that it was reused for the powder-room service page's FAQ too.
- `plans/2026-08-26-issue-11-findquestions-triage.md` — full triage record for issue #11.
- `session-history/` — this directory did not exist at the very start of the day's work; by the
  time this session ran it already contained several other sessions' handoff files (see note in
  §17 on the shared/parallel environment).
- `session-history/2026-08-29-issue-11-cost-guide-and-gallery-readability.md` — this file.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npm run build` — **PASS**, multiple times through the session, 30 routes throughout, no drop.
- `npx tsc --noEmit` — **PASS** after fixing the `FaqSchema` prop type (`readonly FaqItem[]`).
- `npm run check:readability` — **PASS**, 24/24 ≥ Flesch 60 (was 13/24 at session start).
- Local production server (`next start -p 3210`) + `curl http://localhost:3210/packages/` —
  **HTTP 200**, new copy and `FAQPage` schema confirmed present in the actually-served HTML;
  server was stopped afterward.
- Direct inspection of `.next/server/app/gallery/castle-hill-bathroom.html` — confirmed 8
  "Bathroom" + 2 "Ensuite" short labels (correct split of the 10 other projects), suburb badges
  and images unchanged.
- `npm run verify:redirects` — **not run to completion** (needs a live server; judged unnecessary
  since no routing/redirect config changed this session).
- **Not done:** real-browser (desktop + 390px) verification of either visual change, despite
  `CLAUDE.md`'s Testing Workflow calling for it on UI changes. Flagged as a gap in §13.

## 11. Performance Impact

Not measured this session — no Lighthouse/PageSpeed run against either the `/packages/` additions
or the gallery-page changes. Both changes are copy/markup only: no new npm dependency, no new
client component (`FaqSchema` and the reworked gallery grid are both plain server-rendered
markup/JSON-LD, no `'use client'`), no new images, no new third-party script. A regression is
unlikely on that basis but has not been verified against `docs/PERFORMANCE_BUDGET.md`.

## 12. SEO Impact

- **Pages changed:** `/packages/` (new sections + updated title/description) and all 11
  `/gallery/{slug}/` project pages (blurb wording + related-project card labels).
- **Keywords:** `/packages/` now explicitly targets "how much does a bathroom renovation cost in
  Sydney" and the "$30,000 minimum" / "$10,000 bathroom renovation" search variants, alongside its
  existing "packages and pricing" intent.
- **Search intent:** answer-first content added for a clearly commercial-intent query (cost
  research, typically close to a buying decision).
- **Metadata:** `/packages/` title changed from "Bathroom Renovation Packages & Pricing" to
  "Bathroom Renovation Cost & Packages"; description rewritten to 149 characters, states the
  answer directly.
- **Schema:** `FAQPage` JSON-LD added to `/packages/` (new — no FAQ schema existed anywhere on the
  site before this session, as far as this session found).
- **Internal linking:** not changed.
- **Indexation / canonicals:** not changed — `/packages/`'s canonical (`/packages/`) is unchanged;
  no new routes were added or removed (still 30 routes).
- **Content changes:** gallery blurb wording (facts unchanged) on all 11 project pages; related-
  project card labels shortened.
- **Location strategy:** not touched this session.

## 13. Remaining Tasks

### High Priority
- Verify both changes in a real browser, desktop and 390px mobile, per `CLAUDE.md`'s Testing
  Workflow — not done this session (relied on build output + one server `curl` check instead).
- Confirm whether this repo's apparent auto-commit/auto-push process is intentional — this
  session's changes reached `origin/main` without an explicit `git commit`/`git push` call from
  within the conversation, which sits uneasily next to `CLAUDE.md`'s "do not push or deploy
  without explicit owner sign-off" rule. Worth raising with the owner directly.

### Medium Priority
- Run a Lighthouse/PageSpeed pass per `docs/PERFORMANCE_BUDGET.md` to confirm no regression from
  either change (low risk, unverified).
- Consider whether `/packages/`'s new FAQ pattern (`components/FaqSchema.tsx`) should become the
  standard approach for FAQ blocks sitewide, now that at least two pages use it (`/packages/` here,
  and the powder-room service page per a separate, concurrent session's D-107).

### Low Priority
- None identified.

## 14. Open Questions

- None from the owner directly on either piece of work in this session — the user confirmed "1"
  (go ahead and build the cost/pricing content) and later "2" (fix the gallery readability issue)
  from options this agent offered; both were carried out as described.

## 15. Next Session Handoff

- **Inspect first:** run `git status` and `git log -1` — as observed at the end of this session,
  this repo appears to have some automatic commit/push process operating outside explicit
  `git commit`/`git push` calls (multiple "1"-message commits were seen landing on `origin/main`
  during this session without this agent issuing them). Don't assume a clean `git status` means
  nothing changed recently, and don't assume an unfamiliar commit was from a step you can skip
  re-checking — verify file contents directly if anything looks surprising.
- **Continue:** the High Priority items in §13 — real-browser verification of both changes, and
  raising the auto-commit/push question with the owner.
- **Do NOT change:** the real package prices ($18,000/$25,000/$30,000) or their size bases, the
  licence number, ABN, or workmanship warranty term — none were touched this session and none
  should be approximated or "cleaned up" incidentally.
- **Do NOT re-open** whether issue #11's topics deserve a standalone blog post or new URL without
  new GKP/Ahrefs volume evidence — D-104/D-105 already settled this with reasoning recorded.
- **Do NOT re-attribute K15's fix to the trust-signal block** — that was the original, incorrect
  guess; D-109 has the corrected root cause and the actual fix.
- **Important context:** this repo appears to be worked by multiple parallel/concurrent sessions
  (visible via overlapping "1"-message commits touching files this session didn't author, e.g.
  `lib/businessInfo.ts`, `service-areas.json`). A separate session-history file,
  `2026-08-29-little-bay-service-area-and-gallery-readability-fix.md`, also documents the D-109
  gallery-readability fix from a reconstructed/compacted vantage point and bundles it together
  with an unrelated Little Bay service-area task (D-108) that this session did **not** do. Both
  files describe the same real D-109 change; treat this file as the first-hand account of it.
- **Relevant files to read:** `DECISIONS.md` D-104/D-105/D-109 for full reasoning;
  `plans/2026-08-26-issue-11-findquestions-triage.md` for the issue #11 triage detail;
  `docs/CONTENT_QUALITY_CHECKLIST.md` §2 for the Flesch ≥ 60 rule; `app/packages/page.tsx` and
  `components/FaqSchema.tsx` for the shipped pattern.

## 16. Potential Documentation Updates

*(Not applied now — recommendations only, per this task's constraints.)*

- **`docs/SEO_CONTENT_GUIDE.md`**: could note `/packages/` as the canonical home for
  cost/pricing-question content going forward, so a future session doesn't propose a second cost
  page.
- **`docs/CONTENT_QUALITY_CHECKLIST.md`**: could add the lesson that a shared, repeated component
  (grid, card list) can dominate a page's Flesch score even when unique body copy is fine — check
  repeated elements first when a whole page-class fails identically.
- **`PROJECT_CONTEXT.md`**: could note the "Other work of ours" grid's card-label convention
  (short room-type label, not full project name) as a small, reusable UI/content rule — it already
  has the K15 resolution note, but the *pattern* (shorten repeated labels, keep full name one
  click away) is reusable beyond gallery pages.
- **`CLAUDE.md`**: the observed auto-commit/push behaviour (§13 High Priority) may be worth a line
  once the owner confirms whether it's intentional, since it currently reads as a gap against the
  stated "do not push without sign-off" rule.

## 17. Conversation-Derived Insights

**Confirmed decisions:**
- Issue #11's three topics are folded into `/packages/`, not built as separate blog posts or a
  new URL (user said "1" to proceed with this plan as presented).
- Gallery-page readability (K15) is fixed by shortening the related-projects grid labels plus a
  blurb word-choice pass (user said "2" to proceed with this fix as offered).

**Strong recommendations (this agent's, not yet owner-confirmed):**
- Treat `/packages/` as the permanent home for any future cost/pricing-angle content requests,
  rather than opening a new page each time one comes up.
- Re-run `npm run check:readability` after any future edit to project blurbs or the gallery
  template.

**Ideas/proposals:**
- None raised beyond the two pieces of work actually implemented.

**Unresolved opinions:**
- Whether the repo's apparent auto-commit/auto-push behaviour is intentional — flagged, not
  resolved, in this session.

# Accuracy Rules

Everything in §2, §7, §8, and §10 above was directly implemented and verified in this
conversation (build, typecheck, readability check, and a served-HTML check were all run and their
real output is reflected above). §16 and the "strong recommendations" in §17 are explicitly
recommendations, not implemented changes. Facts about other sessions' work (Little Bay/D-108,
issue #12/D-106–107) are mentioned only where directly relevant (shared files, shared git
history) and are clearly attributed as *not* this session's work.
