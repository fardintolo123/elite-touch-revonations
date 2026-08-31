# Issue #43 - Packages Comparison Table

**Date:** 2026-08-31
**Status:** in progress

## Implementation Plan

Add a real comparison table to `/packages/` so the Basic, Standard and Premium tiers are easier to
scan and easier for search/answer engines to extract. Keep the existing tier cards for narrative
detail, and add the table as the quick comparison before them.

## Checklist

- [x] Route task through `CLAUDE.md` and read mapped docs.
- [x] Confirm issue #43 acceptance criteria.
- [x] Check `DECISIONS.md`, package source copy, `DESIGN.md`, SEO/content/performance docs.
- [x] Add a table pattern decision to `DESIGN.md`.
- [x] Implement package comparison table in `app/packages/page.tsx`.
- [x] Add responsive table styles in `app/globals.css`.
- [x] Update the C-6 audit and master plan registry.
- [ ] Run build and readability checks.
- [ ] Verify served HTML contains a real table.
- [ ] Browser check at 390px, 768px, and 1280px.
