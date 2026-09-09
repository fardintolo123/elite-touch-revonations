# Session Summary

## 1. Session Objective

The owner asked why the site has **no blog** and **no dedicated service page for each area served**,
and whether either can be implemented. They asked for relevant Claude skills/commands to be used and
for the repo's own files to be checked. This was a diagnostic + planning session — **no site code was
changed.**

## 2. Work Completed

- Routed the task per `CLAUDE.md`: suburb/location → `docs/BATHROOM_SITE_STRUCTURE.md` +
  `service-areas.json`; content strategy → `docs/SEO_CONTENT_GUIDE.md`; settled matters → `DECISIONS.md`.
- Audited the live route tree (`app/`), `lib/locations.ts`, `lib/projects.ts`, `lib/hubContent.ts`,
  `app/sitemap.ts`, `service-areas.json` and all Tier-1/hub decision records.
- Invoked the **`/seo-cluster`** skill. Used its *strategy-import* path rather than its keyword-expansion
  path, because the project already holds cross-checked Ahrefs + GKP volume data; search budget was spent
  on the one thing not on file — **SERP-overlap evidence** (skill Step 2).
- Ran 4 WebSearches to measure SERP overlap between suburb terms and their hub terms, and to check the
  format that ranks for a representative blog-shaped query.
- Confirmed against `lib/projects.ts` which Tier-1 suburbs and which dark regions now have photographed,
  suburb-attributed work.
- Wrote `plans/2026-09-09-blog-and-location-page-gap-analysis.md` (the plan + checklist required by
  `CLAUDE.md` Per-Task Workflow step 1).
- **Opened GitHub issues #48–#55** per `CLAUDE.md` Issue Workflow, after the owner pointed out that
  section had been referenced but not followed. Each issue cites the specific `plans/*.md` line it was
  raised from, lists the files it expects to touch, states its dependency, and carries its own
  verification checklist. The set is ordered by dependency, not discovery order, and the two blocked
  items are recorded **as blocked issues** rather than left silently stalled.
- Wired the issue numbers back into the plan file (Tier tables, checklist, and a dependency-ordered
  issue-set table), so plan and tracker cannot drift.

**No build was run** — nothing was compiled or changed on the site. No dependencies added. No commits
made. No code, content, route or flag was touched.

## 3. Important Decisions

**Decision: use `/seo-cluster` in strategy-import mode, not full keyword expansion.**
Reason: the site's volume data is already two-source cross-checked (Ahrefs + GKP) and better than
anything a fresh WebSearch expansion would produce. Alternatives considered: `/seo-plan` (too broad —
the site already has a master plan), `/blog-strategy` (presupposes a blog decision that is gated),
`/seo-content-brief` (premature — no scope approved yet). Chosen because the actual missing input was
SERP overlap, which is `/seo-cluster`'s core differentiator.

**Decision: do NOT declare the blog gate cleared.**
Reason: the SERP check showed process-question queries are won by articles, but ETR already answers
the strongest such query ("how long does a bathroom renovation take") on all three hubs. Per
`docs/SEO_CONTENT_GUIDE.md` §3 that is IMPROVE, not CREATE, so it does not satisfy D-86's "no home on
an existing page" condition. Alternatives considered: treating SERP format as sufficient evidence —
rejected, because the standing gate (D-86/D-105/D-113) specifies **volume** evidence plus owner sign-off.

**Decision: flag D-74 as revisitable on new evidence rather than silently leaving the two hubs dark.**
Reason: D-74's stated blocker was "no photographed project" in Inner West / North-Western Sydney. That
condition is now factually false. Recording the change is not re-litigating a decision — `CLAUDE.md`
permits revisiting with new evidence, which this is.

## 4. Permanent Rules / Lessons

- **A decision's blocker can expire without anyone noticing.** D-74 gated two hubs on a condition
  (photographed local project) that later work quietly satisfied. When new projects land in
  `lib/projects.ts`, re-check every decision that was blocked on "no photographed project".
- **Third-party/skill output still goes through report intake.** `/seo-cluster` would have happily
  generated a blog cluster plan; its output was triaged against `DECISIONS.md` before any of it was
  treated as actionable, per `docs/SEO_CONTENT_GUIDE.md` §3.
- **SERP overlap is the right test for "will these two pages cannibalise each other?"** — cheaper and
  more direct than reasoning about keyword similarity.

## 5. Things We Explicitly Decided NOT To Do

- **Did not build a blog**, and did not reopen D-86/D-88/D-105/D-106/D-113. The gate is volume evidence
  for a cluster with no existing home, plus owner sign-off. Neither half is satisfied.
- **Did not use `blog-write` or any `claude-blog` sub-skill to draft ETR-facing copy.** D-113 restricts
  that toolchain to internal drafting only.
- **Did not build the four Tier-B suburb pages** (Baulkham Hills, Kellyville, Marrickville, Ryde).
  They clear D-10's volume bar but have **no photographed project**, so they would ship as templated
  copy — the exact page D-10 exists to prevent.
- **Did not flip `hubPublished` or change any route.** Scope approval was left to the owner.

## 6. Current Project State

**Working:** 3 of 5 regional hubs live (Hills District, Eastern Suburbs, North Shore), each with real
local content, photographed local projects, FAQ + schema. 4 service pages, 10 gallery projects,
packages/cost content, privacy/terms. Tree clean at session start, on `main`.

**Incomplete / not built:**
- Inner West and North-Western Sydney hubs — `hubPublished: false`, 404 by design. **Their D-74 blocker
  is now cleared** (Balmain and Gladesville projects exist).
- All **6 Tier-1 suburb pages** — approved by D-10 with real volume evidence, never built. Issue #17
  fixed the dead links to them but explicitly deferred the pages as a separate content project.
- No blog. Deliberate.
- **`bathroom renovations near me` (1K–10K/mo — the largest volume figure in the whole project) is
  targeted by no page.** This is the biggest unexploited opportunity found this session.

**Unchanged:** performance, design, schema, build.

## 7. Files Changed

None. No existing file was modified this session.

## 8. Files Created

| File | Purpose |
|---|---|
| `plans/2026-09-09-blog-and-location-page-gap-analysis.md` | The routed plan + live checklist: why no blog / partial area pages, the SERP-overlap evidence gathered, the D-74 blocker-cleared finding, and a three-tier build recommendation (A = build now, B = hold pending photos, C = owner decision on blog vs "near me"). |
| `session-history/2026-09-09-blog-and-location-page-gap-analysis.md` | This handoff. |

## 9. Files Deleted

None.

## 10. Tests and Validation

No build, TypeScript check, lint, Lighthouse or browser test was run — **nothing was changed, so there
was nothing to verify.** Validation performed was read-only:

- Cross-checked every claim against the code (`lib/locations.ts`, `lib/projects.ts`, `app/sitemap.ts`,
  `service-areas.json`, `app/services/[slug]/[location]/page.tsx`) rather than trusting the docs.
- `gh issue list` + `gh issue view 17` to confirm the Tier-1 pages were deferred, not done.
- 4 WebSearches for SERP-overlap measurement.

## 11. Performance Impact

**Not measured — no change was made that could affect performance.** Any Tier-A build that follows
must baseline before and re-measure after, per `docs/PERFORMANCE_BUDGET.md` (new pages add weight).

## 12. SEO Impact

No pages changed, so no live SEO impact. Evidence gathered for future work:

| Query pair | Shared top-10 URLs | Meaning |
|---|---|---|
| `bathroom renovations castle hill` ↔ `bathroom renovations hills district sydney` | 0 | Distinct SERPs — a suburb page will not cannibalise its hub |
| `bathroom renovations randwick` ↔ `bathroom renovations castle hill` | 0 | Distinct SERPs |

Corroboration: Prestige Bathroom Renovations ranks on both, via two separate suburb/region URLs — the
structure D-10 approved is what ranking competitors actually run.

Blog-side: `how long does a bathroom renovation take sydney` returns an all-article top 10 (several on
`/blog/` paths, zero service pages) — but ETR already answers it on all three hubs, so it is an IMPROVE
target, not evidence for a new blog vertical.

## 13. Issues Opened (#48–#55)

Dependency-ordered. Execute top down, keep "in progress" to one.

| Order | Issue | Deliverable | Blocked by |
|---|---|---|---|
| 1 | **#48** | Record the D-74 revisit + SERP-overlap evidence in `DECISIONS.md` | — |
| 2 | **#51** | `pagePublished` suburb routing — capability only, no content, route count unchanged | — *(parallel with #48)* |
| 3 | **#49** | Publish the Inner West hub | #48 |
| 4 | **#50** | Publish the North-Western Sydney hub | #48; do after #49 |
| 5 | **#52** | Build the Castle Hill Tier-1 page | #51 |
| 6 | **#53** | Build the Randwick Tier-1 page | #51; do after #52 |
| — | **#54** | The 4 remaining approved Tier-1 suburbs | **BLOCKED — owner photography** |
| — | **#55** | Blog vs the untargeted "near me" opportunity | **BLOCKED — owner decision** |

**#50 carries a stop condition:** North-Western Sydney has photography but still no independent article
corroboration. If its `localAngle` copy cannot be made genuinely specific from real project detail, stop
and say so rather than ship a templated hub (D-73).

## 14. Next Steps

1. **Owner decides #55** — recommended: no blog; target `bathroom renovations near me` (1K–10K/mo,
   GKP-confirmed, no page owns it) instead. #55 records all three options including an owner override.
2. **Owner action on #54** — one photographed job each in Baulkham Hills, Kellyville, Marrickville and
   Ryde unblocks four already-approved pages. Marrickville first (content-mill soft spot, D-17).
3. **Tier A needs no owner decision** — #48 → #51 → #49 → #50 → #52 → #53 can start immediately.
4. When a plan checklist line is ticked, close or update its linked issue **in the same change**.
