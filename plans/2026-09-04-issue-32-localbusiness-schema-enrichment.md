# Issue #32 - LocalBusiness schema enrichment

**Status:** in progress
**Date:** 2026-09-04

## Routing

- `CLAUDE.md` task route: schema / structured data.
- Read: `DECISIONS.md`, `PROJECT_CONTEXT.md`, `docs/SEO_AEO_GEO_CHECKLIST.md`,
  `docs/PERFORMANCE_BUDGET.md`, `plans/2026-08-31-seo-master-plan.md`,
  `plans/2026-08-31-seo-schema-audit.md`,
  `plans/2026-08-31-seo-local-audit.md`.
- Skill used: `seo-schema`. Its optional `references/schema-types.md` file was not present, so
  implementation is based on the skill body, the repo audits, Next's vendored JSON-LD guide, and
  current Google Search Central LocalBusiness / Organization structured-data docs.

## Issue Source

Master SEO Plan line: "Enrich LocalBusiness node (geo, priceRange, contactPoint, logo, image,
E.164 phone)" from schema audit S-3 and local audit action #6.

## Implementation Plan

1. Keep the one existing sitewide `HomeAndConstructionBusiness` + `Organization` JSON-LD node.
2. Add only verifiable business facts to `lib/businessInfo.ts`:
   E.164 phone, coarse Granville coordinates, schema logo/image asset URLs, and the schema-safe price
   range.
3. Patch `app/layout.tsx` so the business node emits `@id`, E.164 `telephone`, `logo`, `image`,
   `priceRange`, `geo`, and `contactPoint`.
4. Preserve the existing deliberate omissions: no street address/postcode, no `aggregateRating`, no
   `review`.
5. Verify typecheck, production build, served JSON-LD fields in `.next/server/app/index.html`, and
   readability remains green.
6. Record the shipped decision in `DECISIONS.md`.

## Checklist

- [x] Task routed; mapped docs read.
- [x] `DECISIONS.md` checked.
- [x] Existing schema audited before editing.
- [ ] `lib/businessInfo.ts` enriched with schema-only factual fields.
- [ ] `app/layout.tsx` emits the issue #32 fields.
- [ ] No invented business facts; street/postcode/rating/reviews still omitted.
- [ ] Typecheck clean.
- [ ] Build green; route count does not drop.
- [ ] Served HTML JSON-LD contains the enriched fields.
- [ ] Readability check green.
- [ ] `DECISIONS.md` records the implementation.
