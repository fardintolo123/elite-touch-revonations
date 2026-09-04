# Issue #33 - Show Google Rating On Site

**Date:** 2026-09-04
**Status:** in progress

## Route

Issue #33 maps to `plans/2026-08-31-seo-master-plan.md`: **Show the Google rating on-site + `aggregateRating`**, sourced from the local SEO audit action #3.

Read before implementation:

- `CLAUDE.md` task, issue, testing and reporting workflow
- `DECISIONS.md` D-03/D-18/D-52/D-33/D-34 and current schema decisions
- `PROJECT_CONTEXT.md` K2 and codebase mechanics
- `DESIGN.md` tokens/components for the visible rating block
- `docs/SEO_AEO_GEO_CHECKLIST.md` schema and proof rules
- `docs/CONTENT_QUALITY_CHECKLIST.md` review/trust rules
- `plans/2026-08-31-seo-local-audit.md` action #3
- `plans/2026-08-31-seo-schema-audit.md` aggregateRating gate
- `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`

## Implementation Plan

1. Verify the live public GBP rating/count and record the evidence date.
2. Put the verified Google-only reputation numbers in `lib/businessInfo.ts`.
3. Add a small server-rendered Google rating component that displays only when `verifiedLive` is true.
4. Render it near the fold on the homepage, each published location hub, and `/contact-us/`.
5. Add `aggregateRating` to the sitewide LocalBusiness schema, without adding `Review` schema for unmapped testimonials.
6. Record the shipped decision/mechanic in `DECISIONS.md` and `PROJECT_CONTEXT.md`.
7. Verify with typecheck, build, readability, served HTML/schema checks, and browser checks at desktop and 390px.

## Checklist

- [x] Route found in master plan and local/schema audits.
- [x] Live public rating evidence checked: public result shows 5.0 from 19 Google Maps reviews as of 2026-09-04.
- [x] `businessInfo.googleBusinessProfile` updated with verified rating/count/date/source note.
- [x] Reusable visible rating component added.
- [x] Homepage rating visible near the fold.
- [x] Published location hubs show the rating near the fold.
- [x] Contact page shows the rating near the fold.
- [x] LocalBusiness JSON-LD emits `aggregateRating` and no `Review` nodes.
- [x] `DECISIONS.md` / `PROJECT_CONTEXT.md` updated.
- [ ] Typecheck green.
- [ ] Build green, no route-count drop.
- [ ] Served HTML confirms visible rating and schema.
- [ ] Browser verified desktop and 390px.
