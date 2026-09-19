# Plan - Issue #62 keyword-gap PDF: timeline article CTR fix

**Issue:** #62, "check this pdf"

**PDF finding:** Search Console question queries around "how long does a bathroom renovation take" are getting impressions but no clicks. The ranking page is `/blog/bathroom-renovation-timeline-sydney/`; the report recommends adding a number-led quick answer and duration table near the top of the article.

**Routed docs read:** `CLAUDE.md`, `DECISIONS.md`, `PROJECT_CONTEXT.md`, `DESIGN.md`, `docs/SEO_CONTENT_GUIDE.md`, `docs/CONTENT_QUALITY_CHECKLIST.md`, `docs/SEO_AEO_GEO_CHECKLIST.md`, `docs/PERFORMANCE_BUDGET.md`, and the local Next 16 docs for `generateStaticParams`, `generateMetadata`, and `Link`.

## Verdict

Status: **IMPROVE**.

The page already exists and owns the query. Do not create a new page. The requested week ranges are already settled in `businessInfo.buildDurations` / D-75, so the fix can ship without inventing a business fact.

## Implementation Plan

1. Add an optional blog `quickAnswer` data shape with paragraphs, a duration table and CTA.
2. Populate it only on `bathroom-renovation-timeline-sydney`, using the existing `businessInfo.buildDurations` data.
3. Render the block above the normal article sections in always-rendered server HTML.
4. Style it with existing design tokens and the existing comparison-table pattern so it behaves on mobile.
5. Verify typecheck, build, readability, and served/static HTML for the target phrase.
6. Record the issue-62 verdict in `DECISIONS.md`, write the session handoff, and close the issue if verification passes.

## Checklist

- [x] Plan written before edits.
- [x] Quick answer added to the timeline article using existing duration data.
- [x] No unsupported "refresh" service or invented timeline added.
- [x] Copy is answer-first and visible in server-rendered HTML.
- [x] Typecheck passes.
- [x] Build passes with no route-count drop.
- [x] Readability passes.
- [x] Served/static HTML contains the new answer.
- [x] `DECISIONS.md` updated.
- [x] Issue #62 closed after verification.
- [ ] Session handoff written.
