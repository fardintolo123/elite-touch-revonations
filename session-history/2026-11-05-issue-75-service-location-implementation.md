# Issue #75 — service and location page design

**Status:** implementation and route review complete; issue remains open because two project-wide design gates are not green. No commit or push was made. The working tree contains unrelated pre-existing edits from other issue work; they were preserved.

## Change

`app/services/[slug]/[location]/page.tsx` now pairs each suburb's local or clearly labelled nearby project photo with that suburb's own guidance in a split feature. The image comes first on mobile and alternates sides on desktop. Hubs use the same pattern with the first attributed project and keep other suburb-attributed project cards. Existing images, alt text, gallery paths, metadata, schema, copy sources, publication gates, phone links, and shared components remain unchanged.

## Verification

- `npm run build --ignore-scripts`: passed; 121 static routes generated, with all 16 issue #75 routes present.
- `npm run typecheck`: passed.
- `npm run check:design`: passed; no pattern count exceeds baseline.
- `impeccable.cmd detect --json "app/services/[slug]/[location]/page.tsx"`: no findings (`[]`).
- Browser pass on the production build: all 16 routes returned 200, had exactly one H1, had distinctive H2 copy, retained `tel:+61411752334`, and exposed a tap-to-call link in the 390px first view.
- Split layout measurements: five representative location pages at 390px and 1440px. Image-first mobile order, alternating desktop order, no horizontal overflow, valid alt text, and loaded project photos passed.
- All 16 mobile first-view strips captured. Full before captures cover `/services/`, one service page, one hub, and one suburb. Full after captures cover those page types plus the nearby-project suburb variation. After captures use reduced motion so scroll-reveal sections are visible.
- Independent Vision Auditor found no P0/P1 findings and passed the location swap test for all 5 hubs and 6 suburbs. Its initial screenshot-capture concern was addressed by recapturing full pages with reduced motion; no UI source changed after the critique.
- `npm run check:readability`: 114/115 routes pass. Every one of the 16 issue #75 routes passes. The sole failure is `/about-us/` at Flesch 59.8, outside #75 and owned by the proof/company page issue #76.
- Mobile Lighthouse 13.4.1 on Baulkham Hills: candidate 82 / LCP 2.648s / TBT 567ms / CLS 0 / Speed Index 1.084s / 518.6KB. A live production comparison of the same route measured 72 / 2.424s / TBT 1,285ms / CLS 0 / Speed Index 3.044s / 653.1KB. This is a contextual comparison across different origins, not a controlled before/after run. The candidate improves the score and TBT, but still misses the checklist's absolute Performance, LCP, and TBT targets.
- `git diff --check`: passed.

## Evidence

Screenshots, manifests, swap-test matrix, Lighthouse JSON reports, and the independent critique are in `session-history/evidence/issue-75-service-location/` and `.impeccable/critique/issue-75-final-vision-review-2026-11-05.md`.

## Remaining before closure

1. Clear the full-site readability gate with `/about-us/` brought to Flesch ≥60 by its owning issue, or have the owner revise the global gate.
2. Clear the absolute mobile Lighthouse targets (Performance ≥90, LCP ≤2.5s, TBT ≤300ms) for the affected class, or have the owner explicitly revise the gate.
3. Attach the captured screenshot evidence to issue #75; it remains in the local evidence directory.
4. Only then set the #75 tracker row to `verified`, reconcile/delete `plans/issue-75-service-location-design.md`, and close #75.

`CLAUDE.md` requires every acceptance criterion to pass before issue closure, so #75 was deliberately left open.
