# Issue #56 — location page metadata tidy

**Issue:** GitHub issue #56
**Status:** in progress
**Scope:** trim the over-length metadata and fix the missing route coverage in the readability gate.

## Plan

1. Confirm the exact metadata strings and route list causing the regression.
2. Shorten the homepage and published location-page descriptions to the SEO target while retaining the relevant trust signals.
3. Fix the missing Inner West region `<title>` pattern.
4. Add the four newly published routes to the readability checker.
5. Run the focused verification: build and the readability script.

## Checklist

- [x] Confirm the long description strings and the missing routes.
- [x] Patch the homepage and location-page metadata copy.
- [x] Add the Inner West region title override.
- [x] Update the readability route list.
- [x] Verify with a fresh build and `npm run check:readability`.
