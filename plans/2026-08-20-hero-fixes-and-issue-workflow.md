# Plan — Hero image fixes, sitewide imagery, CLAUDE.md Issue Workflow

**Date:** 2026-08-20
**Task class:** UI/design fix + documentation. Routed via `CLAUDE.md` → Task Routing:
`DESIGN.md` (visual), `docs/PERFORMANCE_BUDGET.md` (images add weight), `DECISIONS.md` (D-83, D-06 —
which pages may show project photography).

## Reported by owner

1. Homepage hero image ratio looks wrong — awkward tight crop.
2. Empty space on the left side of the hero section and the contact section.
3. Not enough images across the site's pages/sections — add images properly.
4. Use skills to improve the design.
5. `CLAUDE.md` has no section on creating GitHub issues from the plan/checklist, structured for
   one-by-one execution without losing track — add one.

## Root causes found

- **Hero crop:** `.et-hero-media` in `app/globals.css` forced a **portrait 3/4** box on desktop.
  Every real project photo in `lib/projects.ts` is landscape (~3/2). `object-fit: cover` on a
  landscape source inside a portrait frame throws away most of the width — the tight zoom the owner
  saw.
- **Contact section dead space:** `ContactSection`'s two-column grid had no vertical alignment
  override, so it defaulted to `align-items: stretch`. The shorter "Get in touch" text column sat
  top-anchored while the taller form ran on below it, leaving a block of empty white space at the
  foot of the short column once scrolled past.
- **Image-sparse pages:** `/services/`, `/about-us/`, `/packages/`, and each `/services/[slug]/`
  page had a text-only hero — zero imagery above the fold, despite 23 real, suburb-attributed
  project photos existing in `lib/projects.ts`.

## Decisions made (recorded in DECISIONS.md D-84)

- Fix `.et-hero-media` to a fixed 4/3 ratio at all breakpoints (DESIGN.md §9's own "feature image"
  token) instead of switching to portrait on desktop.
- Fixing the ratio also closes most of the hero's dead-space symptom (image column shrinks ~260px).
- Add a scoped `.et-grid-align-center` utility class (not a global `.et-grid-2` default — most
  `.et-grid-2` uses are symmetric card grids that want the stretch) and apply it only to
  `ContactSection`, which appears on every page.
- Add `components/PageHero.tsx` — one renderer, optional real photo — instead of copy-pasting a
  new hero-with-image block into four page files (Architecture Rules: "content is data").
- Only give a hero photo to pages with evidenced photography: `/services/`, `/about-us/`,
  `/packages/`, `bathroom-renovations`, `ensuite-bathroom-renovations`. `laundry-renovations` and
  `powder-room-renovations` keep the text-only hero — no photo of either exists (D-83/D-06).
- Ran the `impeccable` design skill for general craft guidance (contrast, layout balance, avoid
  dead whitespace). Did not run its full `init` flow (would generate a competing `PRODUCT.md` /
  token set) — this repo's `DESIGN.md` is already the single authoritative design system and
  `CLAUDE.md` forbids starting a second one.
- Added the "Issue Workflow" section to `CLAUDE.md` (between Per-Task Workflow and Testing
  Workflow) plus one Review Checklist line, using the owner's own five requirements verbatim.

## Checklist

- [x] Fix `.et-hero-media` aspect-ratio (remove the desktop 3/4 override)
- [x] Add `.et-grid-align-center` and apply to `ContactSection`
- [x] Build `components/PageHero.tsx`
- [x] Wire `PageHero` into `/services/` (Hornsby bathroom photo)
- [x] Wire `PageHero` into `/about-us/` (Artarmon bathroom photo)
- [x] Wire `PageHero` into `/packages/` (Castle Hill bathroom photo, `facts` list preserved)
- [x] Wire `PageHero` into `/services/[slug]/` for `bathroom-renovations` (Randwick) and
      `ensuite-bathroom-renovations` (Hornsby ensuite) only
- [x] Confirm `laundry-renovations` / `powder-room-renovations` render with NO hero image
- [x] `tsc --noEmit` clean
- [x] `npm run build` green, route count unchanged (23 routes)
- [x] Server-rendered HTML checked with `curl` for all 4 changed page types + both photo-free
      service pages
- [x] Browser-verified (Playwright): desktop 1440px and mobile 390px, homepage/about/packages hero
      + contact section
- [x] `DECISIONS.md` D-84 recorded
- [x] `PROJECT_CONTEXT.md` §6 updated (new file, two new "things that will bite you" entries)
- [x] `CLAUDE.md` Issue Workflow section + Review Checklist line added
