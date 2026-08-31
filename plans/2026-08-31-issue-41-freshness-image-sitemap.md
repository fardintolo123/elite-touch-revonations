# Plan — Issue #41 visible freshness + image sitemap

**Issue:** #41 — visible freshness dates, project completion years, image sitemap entries, quarterly review cadence.
**Date:** 2026-08-31

## Implementation plan

1. Add explicit content dates to the source data used by pages and the sitemap.
2. Render honest visible freshness on `/packages/`, gallery project pages, and published hubs.
3. Add absolute project/service/hub image URLs to `app/sitemap.ts` without using build time.
4. Add a quarterly review checklist template and link it from the SEO/AEO/GEO checklist.
5. Verify build, served HTML date text, sitemap image entries, and sitemap stability across rebuilds.

## Checklist

- [ ] Route and issue brief read; #23 dependency checked.
- [ ] Static, service, project, and region content dates added.
- [ ] `/packages/` renders “Package prices current as of August 2026”.
- [ ] Gallery project pages render a completion-year caption.
- [ ] Published hubs render a reviewed date.
- [ ] Sitemap emits stable `lastmod` values from content data, not `new Date()`.
- [ ] Sitemap emits image entries for gallery pages, published hubs, and evidenced service hero photos.
- [ ] Quarterly review checklist added under `plans/` and linked from `docs/SEO_AEO_GEO_CHECKLIST.md`.
- [ ] Audit/registry docs updated for #23/#41.
- [ ] Build/typecheck and HTML/sitemap validation completed.

## Date evidence

- Package prices: owner-supplied package revision from 2026-08-19.
- Gallery projects: all live gallery records are already evidenced as completed project photography supplied in 2026. Exact project completion dates are not recorded in the repo, so the visible caption uses “Completed by 2026” rather than inventing an exact completion year.
- Hub review date: reviewed as part of this implementation on 2026-08-31.
