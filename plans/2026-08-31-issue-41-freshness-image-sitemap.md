# Plan - Issue #41 Visible Freshness + Image Sitemap

**Issue:** #41 - visible freshness dates, project completion years, image sitemap entries, quarterly review cadence.
**Date:** 2026-08-31

**Progress note (2026-09-01):** the data-layer half of step 1 was pulled forward first. All 11
`lib/projects.ts` records already carry `updated: '2026-08-31'` and `completedByYear: 2026`
(see `plans/2026-09-01-restore-green-build-issue-41-data-layer.md`). That restored a green build
after commit `3d92daa` left the type requiring those fields with no record setting them.

## Implementation plan

1. Add explicit content dates to the source data used by pages and the sitemap.
2. Render honest visible freshness on `/packages/`, gallery project pages, and published hubs.
3. Add absolute project/service/hub image URLs to `app/sitemap.ts` without using build time.
4. Add a quarterly review checklist template and link it from the SEO/AEO/GEO checklist.
5. Verify build, served HTML date text, sitemap image entries, and sitemap stability across rebuilds.

## Checklist

- [x] Route and issue brief read; #23 dependency checked.
- [x] Static, service, project, and region content dates added.
- [x] `/packages/` renders "Package prices current as of August 2026".
- [x] Gallery project pages render a completion-year caption.
- [x] Published hubs render a reviewed date.
- [x] Sitemap emits stable `lastmod` values from content data, not `new Date()`.
- [x] Sitemap emits image entries for gallery pages, published hubs, and evidenced service hero photos.
- [x] Quarterly review checklist added under `plans/` and linked from `docs/SEO_AEO_GEO_CHECKLIST.md`.
- [ ] Audit/registry docs updated for #23/#41.
- [ ] Build/typecheck and HTML/sitemap validation completed.

## Date evidence

- Package prices: owner-supplied package revision from 2026-08-19.
- Gallery projects: all live gallery records are already evidenced as completed project photography supplied in 2026. Exact project completion dates are not recorded in the repo, so the visible caption uses "Completed by 2026" rather than inventing an exact completion year.
- Hub review date: reviewed as part of this implementation on 2026-09-01.
