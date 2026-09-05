# Issue #20 implementation plan - og:image / twitter:image sitewide

**Date:** 2026-09-04
**Issue:** #20 - `[seo-tech] H-3 · Add og:image / twitter:image sitewide`
**Source:** `plans/2026-08-31-issue-15-seo-technical-audit.md` H-3; unblocked by #19 (`buildMetadata()`)
**Status:** SHIPPED 2026-09-04 (partial scope — see "Not done" below)

## Problem

The homepage, services index, all 4 service pages, packages, about, contact, gallery index and all 3
hubs shipped no `og:image` / `twitter:image` at all — a bare text card on every social/messaging
share. The 11 gallery project pages had an image but no `og:image:width`/`height`, forcing
`twitter:card` to the small `summary` variant everywhere.

## Plan

1. Generate one committed default 1200x630 share image rather than render it per-request (a static
   asset costs nothing at runtime; `docs/PERFORMANCE_BUDGET.md` rule 19 already anticipated this).
   Used `sharp` (already a `next/image` dependency) to composite: the Artarmon bathroom + ensuite
   project photo (already one of `businessInfo.schema.images` — no new photo asset), a bottom dark
   gradient scrim, the light ETR mark, a headline, and a subline of facts already published elsewhere
   (D-06 — nothing invented for the image either).
2. Font: DESIGN.md specifies Jost as the one typeface. Spent real effort trying to honour that —
   embedding the WOFF2 via `@font-face`, decompressing to a static TTF instance via `fonttools` and
   embedding that, and registering Jost through a custom `FONTCONFIG_FILE` — all three produced
   either a generic fallback or full tofu (`.notdef`) glyphs; sharp's bundled SVG renderer has no
   working custom-font path on this machine. Tested every generic CSS family keyword too
   (`sans-serif`, `Helvetica`, `Roboto`, `Noto Sans`) — same failure. Only exact Windows-installed
   family names resolved (`Segoe UI`, `Arial`, `Verdana`), because libvips-on-Windows reads those
   directly from the OS font system. Used "Segoe UI" — documented as a narrow, asset-scoped exception
   in the script's own header comment, not a DESIGN.md change.
3. `app/layout.tsx`: set the default image on `openGraph.images` + `twitter.card:
   'summary_large_image'` as the sitewide baseline.
4. `lib/metadata.ts` `buildMetadata()`: default `images` to the same asset when a page doesn't pass
   its own — so all 10 non-gallery pages get it with no per-page code change, since they already
   route through this helper from #19.
5. `app/gallery/[slug]/page.tsx`: pass the existing lead photo as a full `{url, width, height, alt}`
   object (the data already exists in `lib/projects.ts`) instead of a bare URL string, so
   `og:image:width`/`height` are populated. Did NOT generate a dedicated 1200x630 crop of each
   project's lead photo — noted as follow-up scope, not blocking the sitewide fix.
6. Verify: typecheck, build, full sweep of every built page's `og:image` + dimensions + `twitter:card`,
   file size, thumbnail-scale legibility check, readability (unaffected).
7. Performance: no fresh Lighthouse run — `og:image`/`twitter:image` are never fetched by a visitor's
   browser during a normal page load, only by crawlers building a link preview, so there is
   structurally nothing for a page-weight budget to measure. Recorded that reasoning in
   `docs/PERFORMANCE_BUDGET.md` §4 rather than running a redundant pass.
8. Update the audit tracker, master-plan registry, `DECISIONS.md`. Close #20 with the font exception
   and the deferred-crop scope both stated plainly.

## Checklist

- [x] `scripts/generate-og-image.mjs` added; generates `public/og/default.jpg` (1200x630, 64 KB).
- [x] Font limitation investigated and documented (not silently accepted) before choosing "Segoe UI".
- [x] `app/layout.tsx` sets the default image + `twitter.card: summary_large_image`.
- [x] `lib/metadata.ts` `buildMetadata()` defaults `images` to the same asset.
- [x] Gallery detail pages pass real `width`/`height`/`alt` instead of a bare URL string.
- [x] `npx tsc --noEmit` clean.
- [x] `npm run build` green — 32 routes, no drop.
- [x] Served HTML: all 26 checked pages carry `og:image` + `og:image:width`/`height` +
      `twitter:card: summary_large_image`.
- [x] Thumbnail-scale (400px) legibility check on the default image.
- [x] `npm run check:readability` 26/26 >= 60 (unaffected — no visible copy touched).
- [x] `docs/PERFORMANCE_BUDGET.md` §4 entry recorded (zero render-path impact, reasoned not measured).
- [x] Audit tracker + master-plan registry updated.
- [x] `DECISIONS.md` D-128 recorded, including the font exception and the deferred-crop note.
- [x] GitHub issue #20 closed with verification notes and the two follow-up items named.

## Not done (documented follow-up, not blocking)

- A dedicated 1200x630 crop of each gallery project's own lead photo — they still use the raw ~3:2
  asset (now with correct `width`/`height`, which they lacked before).
- Per-page image overrides for packages / each service / each hub (issue text: "override per-page
  where a better image exists") — all of them now inherit the sitewide default instead, which is a
  complete fix for the "bare text card" defect the finding was about.
