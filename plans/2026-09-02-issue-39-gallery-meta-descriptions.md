# Issue #39 implementation plan - gallery meta descriptions

**Date:** 2026-09-02
**Issue:** #39 - `[seo-content] Gallery meta descriptions: trim the 6 over-length project + the index description (M-3)`
**Source:** `plans/2026-08-31-seo-master-plan.md` §3 / Phase C; `plans/2026-08-31-issue-15-seo-technical-audit.md` M-3; `plans/2026-08-31-seo-page-audit.md` P-3b
**Status:** SHIPPED 2026-09-03 — committed in `867e30c` (swept in with the shared-tree "1" commit) and pushed; verified against that build.

## Problem

`app/gallery/[slug]/page.tsx` uses `project.blurb` verbatim as the meta description and
`og:description`. 9 of 11 blurbs run 159-221 chars (the audit named 6 at 172-221) and truncate in
SERPs. `app/gallery/page.tsx` index `metadata.description` is 221 chars (a 9-suburb list) and also
truncates. The blurb also serves as the visible lead paragraph and the `/gallery/` card text, so it
cannot just be shortened.

## Plan

1. Route and read: `CLAUDE.md`, `DECISIONS.md` (D-06, O-10), `docs/SEO_CONTENT_GUIDE.md`,
   `docs/CONTENT_QUALITY_CHECKLIST.md`, `docs/SEO_AEO_GEO_CHECKLIST.md` (metadata rule: description
   50-160 chars, unique), the three source plans. No weight added, so no perf re-measure.
2. `lib/projects.ts`: add an optional `metaDescription` field to `Project` and a
   `projectMetaDescription(project)` helper that returns `metaDescription` when set, else the
   `blurb` trimmed at a word boundary to <=155 chars. `blurb` and its rendering are untouched.
3. Hand-write a <=155-char `metaDescription` for the 9 over-length projects. Every fact traces to
   the existing `blurb` / `story` in `lib/projects.ts` (D-06). Where a blurb and its photo alt text
   disagree on a detail (Balmain bath type), the meta description uses the neutral wording.
4. `app/gallery/[slug]/page.tsx`: `generateMetadata` uses `projectMetaDescription(project)` for
   both `description` and `openGraph.description`. `twitter:description` auto-fills from
   `openGraph.description` (Next `postProcessMetadata`), so no twitter block is added.
5. `app/gallery/page.tsx`: rewrite `metadata.description` to a <=155-char line - "photos of
   bathroom renovations across Sydney" plus 5 representative real project suburbs, not the full list.
6. Update M-3 status in `plans/2026-08-31-issue-15-seo-technical-audit.md`, the master-plan
   registry row, and P-3b in `plans/2026-08-31-seo-page-audit.md`. Record the decision in
   `DECISIONS.md` (D-117). Close issue #39.

## Checklist

- [x] Task routed; mapped docs read.
- [x] `DECISIONS.md` checked (D-06 facts rule; O-10 precedent for description length).
- [x] `Project.metaDescription` field + `projectMetaDescription()` helper added.
- [x] 9 hand-written meta descriptions added, each <=155 chars, each fact traced to `blurb`/`story`.
- [x] `app/gallery/[slug]/page.tsx` `generateMetadata` uses the helper for `description` + `og:description`.
- [x] `app/gallery/page.tsx` index `metadata.description` rewritten to <=155 chars (150).
- [x] Visible `blurb` paragraphs and gallery cards unchanged (checked in built HTML).
- [x] `npm run build` green; 32 static pages, 11 gallery paths — route count not dropped.
- [x] Built HTML checked (build `iXdxU0iUw7QGRzycDLHUc`, 2026-09-03): all 11 `/gallery/{slug}/` 135–147 chars, `/gallery/` 150 chars; `description` = `og:description` = `twitter:description` on every one; full `blurb` still the visible lead + index card text.
- [x] `npx tsc --noEmit` clean.
- [x] Source plans + master registry updated for M-3 / P-3b.
- [x] `DECISIONS.md` D-117 recorded.
- [x] Code committed in `867e30c` + pushed (shared-tree sweep commit, not this session's doing).
- [x] GitHub issue #39 closed 2026-09-03 with a verification comment (build `iXdxU0iUw7QGRzycDLHUc`).

## Note — shared tree

This ran alongside ~10 concurrent `elite-touch-revonations-*` sessions. The issue #39 code
(`lib/projects.ts` field + helper + 9 values; `app/gallery/[slug]/page.tsx` + `app/gallery/page.tsx`
wiring) plus D-117 and the M-3 / P-3b / master-plan doc edits were all swept into commit `867e30c`
("1") by whatever session periodically runs `git add -A && commit && push`. The two gallery
`page.tsx` files also carry #38 (`title`) / #24 (`og:type: 'article'`) hunks from another session in
the same commit. Nothing here needs a follow-up commit; the small date-accuracy fixes to D-117 and
the M-3 note will land on the next sweep.
