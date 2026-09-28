# Plan — GSC project/service intent separation

## Evidence

The 2026-09-27 Search Console screenshots show `/gallery/castle-hill-bathroom/`
earning 281 impressions at average position 22.9, while the matching commercial
landing page is `/services/bathroom-renovations/castle-hill/`. Both pages currently
emit the same effective search title, `Castle Hill bathroom renovation | Elite Touch
Renovations`, and the project page links only to the generic Sydney service page and
the Hills District hub—not to the dedicated Castle Hill service page.

The same structural overlap exists for Randwick, the other published Tier-1 suburb
with a photographed project and a dedicated service page. This change stays within
the approved D-10/D-71 page structure and does not create a new URL.

## Implementation

- Add a data-driven lookup for a published suburb by its exact name.
- Give project pages in published Tier-1 suburbs a portfolio-specific search title
  (`{Suburb} bathroom project`) while leaving the dedicated service page title and
  H1 focused on the commercial bathroom-renovation query.
- Make the first related-page card link directly to the dedicated suburb service
  page when one exists; retain the generic bathroom service link for every other
  project.
- Keep the regional hub card so the local hierarchy remains project → suburb →
  region as well as project → region.
- Bump only the affected project `updated` dates so sitemap freshness reflects a
  genuine metadata/internal-link change.
- Record the reusable rule in `DECISIONS.md`.

## Checklist

- [x] Implement exact-name published-suburb lookup.
- [x] Differentiate Tier-1 project titles from service-page titles.
- [x] Link Tier-1 project pages directly to their suburb service pages.
- [x] Update affected project dates and decision record.
- [ ] Typecheck and production build.
- [ ] Verify generated titles, canonicals, links and sitemap lastmod in served HTML.
- [ ] Run readability and redirect regression checks.
- [ ] Browser-check Castle Hill desktop and 390px mobile with no overflow.
- [ ] Write session handoff.
