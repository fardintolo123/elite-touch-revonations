# Plan — Issue #76 proof and company page audit

**Outcome:** bring `/gallery`, all 11 project pages, `/packages`, `/about-us` and `/contact-us` in
line with D-158 and D-159 without changing shared components, business facts, URLs, schema or lead
tracking.

**Status:** in progress.

## Visual direction

The gallery and project pages lead with their own approved project photography, then identify the
suburb and scope in plain language. Packages use the owner-approved starting prices with their
bathroom-size basis in the comparison table, not a second set of repeated package cards. About Us
leads with the Artarmon vanity photograph and the four named Dawood family members; checkable
credentials and verbatim reviews remain factual, unboxed evidence. Contact Us leads with the real
Google rating, phone link and free-measure process; the form stays the primary task.

Use the existing Jost, neutral surfaces, rounded project photography and alternating section bands
from `DESIGN.md`. Keep clickable project cards and interactive FAQ disclosures; replace non-clickable
card scaffolds with simple ruled rows. Do not edit shared components or global styling owned by #78.

## Checklist

- [ ] Capture baseline screenshots at 390×844 and 1440×900 for the five route types.
- [ ] Recompose the gallery and project-detail pages to put the approved project photo first.
- [ ] Remove repeated non-interactive card layouts and redundant package presentation while retaining
      all source-backed content and current package-size/price details.
- [ ] Audit all project story copy for source notes, repeated phrasing and unsupported facts; change
      only wording that can be improved without altering project claims.
- [ ] Verify all 15 routes, H1s, served copy, project schema, call links, and form behavior.
- [ ] Capture after screenshots, obtain an independent critique, and fix any P0/P1 page-owned issues.
- [ ] Run the design scanner, readability check and isolated production build; review route coverage.
- [ ] Set only the #76 row in the distinctive-design tracker to verified when the evidence passes.
- [ ] Remove this completed plan and write the session handoff.

## Relevant files

- `app/gallery/page.tsx`
- `app/gallery/[slug]/page.tsx`
- `app/packages/page.tsx`
- `app/about-us/page.tsx`
- `app/contact-us/page.tsx`
- `lib/projects.ts`
- `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` (only the #76 tracker row)

## Verification

Serve a fresh production build on a task-specific port in an isolated output directory. Use Playwright
at 390×844 and 1440×900; sweep every generated project route for HTTP 200, H1 and distinctive copy.
Check the source-of-truth package rows and project schema, `npm run check:readability` route coverage,
and `npm run check:design`. Exercise the enquiry form using a clearly marked test entry only if the
local production build can deliver it safely; do not submit an unmarked lead or deploy.
