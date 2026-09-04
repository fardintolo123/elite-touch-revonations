# Issue #30 — Schema `@graph` + `@id` Foundation

**Date:** 2026-09-04
**Status:** in progress

## Route

- `CLAUDE.md` task routing: schema / structured data.
- Read before implementation:
  - `DECISIONS.md`
  - `PROJECT_CONTEXT.md`
  - `docs/SEO_AEO_GEO_CHECKLIST.md`
  - `plans/2026-08-31-seo-master-plan.md`
  - `plans/2026-08-31-seo-schema-audit.md`

## Scope

Implement master-plan issue #30: consolidate JSON-LD into connected `@graph`
objects with stable `@id`s for the business, website, pages, breadcrumbs, FAQ
blocks, and gallery project nodes.

Out of scope:

- Issue #22: per-service `Service` schema.
- Issue #31: hub `Service` + `OfferCatalog`.
- Issue #32: enriched LocalBusiness properties such as `geo`, `logo`,
  `priceRange`, and E.164 telephone.
- Issue #33: GBP rating / `AggregateRating`.

## Checklist

- [ ] Add a shared schema builder with stable IDs.
- [ ] Replace floating root `LocalBusiness` / `WebSite` scripts with per-page
      graph output.
- [ ] Emit `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage` nodes.
- [ ] Connect `BreadcrumbList`, `FAQPage`, and gallery `CreativeWork` nodes via
      `@id` references.
- [ ] Add `creator` references from gallery image/project schema to the business
      node, closing the #24 deferral.
- [ ] Verify TypeScript and production build.
- [ ] Verify built HTML contains graph IDs and no disconnected root schema.
- [ ] Record the implementation decision.
