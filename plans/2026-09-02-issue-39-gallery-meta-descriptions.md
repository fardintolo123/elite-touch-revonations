# Issue #39 implementation plan - gallery meta descriptions

**Date:** 2026-09-02
**Issue:** #39 - `[seo-content] Gallery meta descriptions: trim the 6 over-length project + the index description (M-3)`
**Source:** `plans/2026-08-31-seo-master-plan.md` §3 / Phase C; `plans/2026-08-31-issue-15-seo-technical-audit.md` M-3; `plans/2026-08-31-seo-page-audit.md` P-3b
**Status:** implemented + verified 2026-09-02 (uncommitted — shared working tree, see note)

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
- [x] Built HTML checked: all 11 `/gallery/{slug}/` 135–147 chars, `/gallery/` 150 chars; `description` + `og:description` + `twitter:description` present on every one.
- [x] Source plans + master registry updated for M-3 / P-3b.
- [x] `DECISIONS.md` D-117 recorded.
- [ ] GitHub issue #39 closed — **deferred: shared working tree.** ~10 concurrent sessions are editing the same files (`app/gallery/page.tsx` and `app/gallery/[slug]/page.tsx` also carry uncommitted #38/#24 hunks). Left uncommitted for a coordinated commit; close #39 when the gallery-metadata commit lands.

## Note — shared tree

`lib/projects.ts` (field + 9 values + helper) is 100% this issue. The two gallery `page.tsx` files
contain this issue's `description` wiring **plus** another session's #38 (`title`) / #24 (`og:type:
'article'`) edits, already present on disk. All build green together. Do not `git add -A`; commit
`lib/projects.ts` + the two gallery pages + these plan/decision doc edits together, and coordinate the
gallery-page hunks with whoever owns #38.
