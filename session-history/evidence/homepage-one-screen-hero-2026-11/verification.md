# Homepage one-screen hero verification

Observed: browser verification 2026-11-09; final Lighthouse and release decision 2026-11-10 (Asia/Kabul). Source was based on `96231f0b` on `main`; hero edits are local pending safe publication.

## Browser measurements

Playwright against the local production build at 1× scale; final screenshots and raw metrics are in this folder.

| Viewport | Header | Hero | Hero bottom | Required hero content |
|---|---:|---:|---:|---|
| 390×844 | 113.6px | 730px | 843.6px | H1, rating, room label + 4 choices, call, quote/warranty facts, photo credit all inside |
| 1440×900 | 80.8px | 818px | 898.8px | Same content inside |
| 390×667 | 113.6px | 553.2px | 666.8px | Same content inside; credit stays top-right and does not overlap facts |

At each size the real image loaded, `fetchPriority` was `high`, opacity was 1, and animation name was `none`. Document width matched the available client width; no page errors were observed. Screenshot files: `after-390x844-viewport.png`, `after-1440x900-viewport.png`, and `after-390x667-viewport.png`. Before screenshots use the parent revision's split hero.

The final 1px height guard and these measurements are reflected in the Lighthouse runs below.

Independent screenshot-only Vision Auditor review after the final refinements: no P0, P1 or P2 findings.

## Checks

- `npm run build --ignore-scripts`: passed; 124 routes generated.
- `npm run typecheck`: passed.
- `npm run check:design`: passed.
- `npm run check:readability`: 118/118 routes pass (rerun after `96231f0b` simplified the DIY guide).
- `git diff --check`: passed (Git emitted only the existing `DECISIONS.md` line-ending warning).

## Matched mobile Lighthouse

Lighthouse 13.4.1, performance preset, 412×823, DPR 1.75, simulated throttling; three runs per local production build. Raw JSON reports are saved as `matched-before-1/2/3.json` and `matched-final-guard-after-1/2/3.json`.

- Old split hero LCP: 2.879s, 2.644s, 2.642s; median 2.644s. Performance scores: 95, 97, 97.
- Final hero LCP: 3.064s, 3.083s, 2.881s; median 3.064s. Performance scores: 77, 94, 94.
- Median LCP change: +420ms. Final FCP values: 1.250s, 1.073s and 1.090s; TBT values: 460ms, 36ms and 116ms; CLS is 0 in all runs. The LCP image is the Hornsby project photo; its AVIF request is discoverable, high-priority, 15.7KB transferred, and Lighthouse reports no potential LCP savings from its discovery/breakdown audits.

The final 3.064s median exceeds the 2.5s LCP budget and the +300ms regression allowance. A one-run synchronous-decoding experiment reduced the image render-delay subpart, but measured 3.019s LCP and 627ms TBT; it was reverted. The LCP phase details do not consistently reconcile with the simulated total, so they do not identify a reliable phase-specific fix. The owner explicitly approved publication despite the gate on 2026-11-10. The release is prepared locally; safe push is pending reconciliation of the 13 local main commits and one newer remote main commit.
