# Issue #31 - Hub Service Schema + OfferCatalog

**Date:** 2026-09-04
**Source:** `plans/2026-08-31-seo-master-plan.md` Phase B / registry row #31; `plans/2026-08-31-seo-schema-audit.md` S-1; `plans/2026-08-31-seo-local-audit.md` action #5.

## Plan

Implement the issue #31 slice without claiming the broader #30 `@graph` migration or #22 service-page schema are complete.

1. Add stable schema IDs and JSON-LD helpers in a shared schema module.
2. Replace the sitewide generic `makesOffer` service with a truthful four-service `hasOfferCatalog`.
3. Emit one regional `Service` JSON-LD node on each published bathroom-renovation hub, with `provider` pointing at the business `@id` and `areaServed` set to the region.
4. Validate TypeScript, build output, and served/build HTML JSON-LD for all three published hubs.
5. Update the master plan, schema/local audit status, and `DECISIONS.md` once verified.

## Checklist

- [x] `DECISIONS.md`, `docs/SEO_AEO_GEO_CHECKLIST.md`, schema audit, local audit, master plan, Next JSON-LD guide read.
- [x] Shared schema helper added without a new dependency or client boundary.
- [x] LocalBusiness node has a stable `@id`.
- [x] LocalBusiness node uses `hasOfferCatalog` for the four confirmed services.
- [x] Published hubs emit region-scoped `Service` JSON-LD.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes without a route-count drop.
- [ ] Built HTML check confirms one region-scoped `Service` node on each published hub.
- [ ] Plans and `DECISIONS.md` updated.
