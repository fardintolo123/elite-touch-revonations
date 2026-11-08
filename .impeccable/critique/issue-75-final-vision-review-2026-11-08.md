# Issue #75 — independent visual critique, 2026-11-08

**Evidence:** `session-history/evidence/issue-75-service-location/after-2026-11-08/`, revision `1e14bbd`. The manifest records `scrollY: 0`, visible header bounds, and decoded hero images for all 16 mobile strips. The four representative routes also have mobile and desktop full-page captures and 1440×900 viewport captures.

| # | Priority | Problem | Where | Why it weakens the page | Replace with | Expected benefit | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | P2 | The Eastern Suburbs project link is partly cut off at the bottom of the first mobile viewport, so its Randwick photo attribution is not immediately readable. | `/services/bathroom-renovations/eastern-suburbs/` · hero proof · 390×844 | Visitors may not know which suburb the photo represents. | Move the existing credit into a compact caption above the CTA, or shorten the lead enough to bring it fully into view. | Makes project provenance clear at first glance. | `services_bathroom-renovations_eastern-suburbs-390-top.png`. |
| 2 | P2 | The last breadcrumb truncates the region name. | `/services/bathroom-renovations/north-western-sydney/` · breadcrumb · 390×844 | The breadcrumb does not show the full current location, although the H1 does. | Allow the final crumb to wrap or provide more room on mobile. | Keeps route context fully readable. | `services_bathroom-renovations_north-western-sydney-390-top.png`. |

The earlier claim that some mobile strips omitted the header was rechecked and withdrawn. All 16 actual PNGs show the logo, menu, and call button, and the refreshed manifest records a top scroll position and visible header for each capture.

## Location swap test

All five hubs have distinct region headings and attributed project photos: Castle Hill, Balmain, Gladesville, Randwick, and Artarmon. The six suburbs use their own named H1s; Castle Hill and Randwick show their own projects, while Baulkham Hills and Kellyville identify nearby Castle Hill work, Marrickville identifies nearby Balmain work, and Ryde identifies nearby Gladesville work. Reused photos are named as their actual project.

**Verdict:** no P0 or P1 remains. Visual gate passes; both findings are P2 refinements.
