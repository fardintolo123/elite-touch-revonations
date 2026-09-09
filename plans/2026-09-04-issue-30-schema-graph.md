# Issue #30 — Schema `@graph` + `@id` Foundation

**Date:** 2026-09-04
**Status:** done (verified 2026-09-07)

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

- [x] Add a shared schema builder with stable IDs (`lib/schema.ts`).
- [x] Replace floating root `LocalBusiness` / `WebSite` scripts with per-page
      graph output — `app/layout.tsx` no longer emits any JSON-LD; all 10 page
      routes (home, packages, services index, 4 service pages, 3 location
      hubs, gallery index, gallery detail, about-us, contact-us, privacy,
      terms) now render one `<SchemaGraph>` each.
- [x] Emit `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage` nodes —
      `/about-us/` → `AboutPage`, `/contact-us/` → `ContactPage`,
      `/gallery/` → `CollectionPage`, everything else → `WebPage`.
- [x] Connect `BreadcrumbList`, `FAQPage`, and gallery `CreativeWork` nodes via
      `@id` references — verified zero dangling `@id`s across 16 sampled
      routes.
- [x] Add `creator` references from gallery image/project schema to the
      business node, closing the #24 deferral — `buildProjectNode` sets
      `creator: { '@id': businessId }` on both the `CreativeWork` and each
      `ImageObject`.
- [x] Verify TypeScript and production build — `tsc --noEmit` clean,
      `next build` green, 32 routes generated, no drop.
- [x] Verify built HTML contains graph IDs and no disconnected root schema —
      `next start` + scripted fetch of all 16 sampled routes: each emits
      exactly one `<script type="application/ld+json">` containing one
      `@graph`, sharing `#business`/`#website` `@id`s, zero dangling
      references. Business-node property set diffed identical to the
      pre-migration root-layout object (no fact lost).
- [x] Retired the now-dead standalone components (`BreadcrumbSchema.tsx`,
      `FaqSchema.tsx`, `ServiceSchema.tsx`, `ProjectSchema.tsx`) — no
      remaining imports anywhere in `app/` or `components/`.
- [x] Record the implementation decision in `DECISIONS.md` — D-131.

**Note:** this migration landed in commit `253cd36` from a concurrent
session (bare "1" commit message, bundled with unrelated issue #28 IndexNow
work) — not cleanly separated, but content verified correct and complete
above. Comment on #22 that the `@id` is now available; close #30.
