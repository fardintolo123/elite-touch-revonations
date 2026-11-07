# Issue #75 independent vision review — 2026-11-05

Reviewer: independent Vision Auditor; did not implement the location-page change.

## Findings

| # | Priority | Problem | Where | Why it weakens the page | Replace with | Expected benefit | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | P2 — fixed in evidence capture | The first after full-page screenshots skipped text-only sections using reveal motion. | Initial after captures, all representative routes | Blank gaps made the evidence incomplete, though manual scrolling showed the sections rendered. | Recapture with reduced motion so all sections are present in the full-page images. | Complete, reviewable page evidence. | Final after screenshots were recaptured with `reducedMotion: reduce`; all route content is visible. |

No remaining P0/P1 design findings. The location split follows DESIGN.md §4.4: proof image precedes location copy on mobile, alternates sides on desktop, and captions and links preserve the photographed suburb. Service pages show distinct project proof and mobile first views retain tap-to-call.

## Location swap test

| Route | Distinguishing evidence | Result |
|---|---|---|
| Hills District | Castle Hill proof; established homes, newer slab homes, and acreage properties. | Pass |
| Inner West | Balmain proof; terraces, apartments, tight access, older plumbing and timber floors. | Pass |
| Eastern Suburbs | Randwick and other attributed projects; heritage terraces, older services, apartments and strata. | Pass |
| North Shore | Hornsby and Artarmon proof; timber floors, heritage areas and apartment access. | Pass |
| North-Western Sydney | Gladesville proof with its project scope and tiling challenge. | Pass |
| Castle Hill | Local photographed project and specific finish details. | Pass |
| Baulkham Hills | 1970s–1990s brick homes and separate toilets; Castle Hill labelled nearby. | Pass |
| Kellyville | Newer slab estates and upstairs bathrooms; Castle Hill labelled nearby. | Pass |
| Marrickville | Older plumbing and timber floors; Balmain labelled nearby. | Pass |
| Ryde | Gladesville explicitly presented as nearby, not Ryde. | Pass |
| Randwick | Local photographed project and terrace, heritage and apartment context. | Pass |

All 11 location pages fail a name-swap: the location heading plus its housing/access detail or named project would become false or visibly mismatched.
