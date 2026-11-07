# Breadcrumb trail (D-180) — rendered evidence, 2026-11-05

`after-*` were taken before the final sizing pass (13px caption, 18.2px hit area).
`final-*` are the shipped state: 14px, matching every other text link on the site,
with a 27.6px hit area that clears the 24px WCAG 2.5.8 AA target-size floor.

Measured, not eyeballed:
- 114 of 115 customer-facing pages carry exactly one trail; the homepage carries none
  (it is the trail's root) and `_not-found` / `_global-error` carry none by design.
- All 9 distinct crumb hrefs return HTTP 200.
- 0 label mismatches between the visible trail and the page's `BreadcrumbList` JSON-LD,
  0 duplicate `BreadcrumbList` nodes, 0 pages missing one (all 114 compared).
- Clicking a crumb navigates and lands at scrollY 0.
