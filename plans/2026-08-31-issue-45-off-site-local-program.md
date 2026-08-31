# Issue #45 Implementation Plan — Off-Site Local SEO Program

**Issue:** GitHub #45 — `[seo-local] Off-site local SEO program: Bing Places, Apple Business Connect, citations, reviews, authority — owner`
**Date:** 2026-08-31
**Status:** code slice implemented; owner/off-site work remains open

## Scope

Issue #45 is mostly an owner / marketing program. The repo can safely ship only the review-generation
prompt on the enquiry success state today. New `sameAs` listings must wait until those listings
exist, and rating/schema work remains blocked by #29.

## Implementation Plan

1. Add a first-party data field for the Google review/profile prompt URL, using the already captured
   Google Business Profile URL and without displaying the unverified rating/count.
2. Show a small review prompt only after a successful enquiry form submission.
3. Update the SEO plan/audit docs so the partial implementation and remaining owner work are clear.
4. Validate with typecheck/build and confirm no new dependencies, scripts, pages, images, or schema
   claims were added.

## Checklist

- [x] Task routed through `CLAUDE.md`; #45 and #29 read from GitHub.
- [x] `DECISIONS.md`, `PROJECT_CONTEXT.md`, `DESIGN.md`, `docs/PERFORMANCE_BUDGET.md`, and Next form/action docs read.
- [x] Add review/profile prompt URL to `lib/businessInfo.ts`.
- [x] Render success-state review prompt in `components/EnquiryForm.tsx`.
- [ ] Update master/local audit plan docs with the partial shipped status and blocked owner items.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Confirm no `aggregateRating` or unverified directory `sameAs` links were added.
