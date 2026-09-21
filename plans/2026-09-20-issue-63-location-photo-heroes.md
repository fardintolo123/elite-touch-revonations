# Issue 63 — Location photo heroes

## Plan

1. Add a reusable full-bleed photo hero for location pages that preserves the existing location copy, CTAs, trust facts, and back-links.
2. Use the exact photographed project already associated with each suburb page and the first real project in each regional hub; do not introduce new imagery or unsupported attribution.
3. Keep the current side-by-side `PageHero` treatment on the homepage, services, about, and packages pages because those routes already have image-led heroes and denser copy that benefits from a separate readable text column.
4. Make the hero image a real eager `next/image` with an overlay, responsive crop, descriptive alt text, and a visible gallery link; lazy-load the repeated lower-page proof image so the hero remains the sole LCP candidate.
5. Verify typecheck, production build, served HTML, and desktop/mobile screenshots on representative suburb and hub pages. Update the issue status only after verification passes.

## Checklist

- [x] Read issue 63 and confirm scope against the current routes and image inventory.
- [x] Add the shared location photo hero component and responsive styles.
- [x] Apply it to suburb location pages and regional hub pages.
- [x] Remove duplicate lower-page image preloads on those pages.
- [x] Verify no horizontal overflow and preserve CTA, trust facts, and gallery links at 390px and desktop widths.
- [x] Run typecheck and a clean production build; confirm route count does not drop.
- [x] Confirm the image and distinctive location copy are present in served HTML.
- [x] Update project decision/context notes if the implementation introduces a lasting mechanic.
- [x] Tighten the location hero spacing after owner visual review: lower the content block, separate CTAs/rating/facts/project link into clearer groups, and verify desktop plus 390px mobile.
- [ ] Close issue 63 only after all checks pass.

Issue closure is pending authenticated GitHub access; no push or deployment was performed.
