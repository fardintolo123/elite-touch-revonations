# Issue #75 location-page swap test

Reviewed against the after production render, `manifest.json`, `lib/hubContent.ts`,
`lib/suburbContent.ts`, and the suburb/project records in `service-areas.json` and
`lib/projects.ts`. The test is whether another published location could replace the
page name while keeping the guidance and pictured work true.

| Route | Location-specific guidance and proof | Result |
|---|---|---|
| Hills District | Contrasts established brick homes, newer two-storey slab homes, and acreage properties; photographed Castle Hill work is labelled by suburb. | Pass |
| Inner West | Covers terraces, Federation-era homes, apartments, tight access, older plumbing and timber floors; photographed Balmain work is attributed to Balmain. | Pass |
| Eastern Suburbs | Covers heritage terraces and semis, older services, and apartment/strata constraints; Randwick and other projects retain their own suburb labels. | Pass |
| North Shore | Covers timber-framed homes on brick piers, sloping blocks, heritage areas, and older layouts; Hornsby and Artarmon projects remain separately attributed. | Pass |
| North-Western Sydney | Names its wider service area and describes the photographed Gladesville project's work and tiling challenge; Gladesville remains explicit. | Pass |
| Castle Hill | Describes the photographed Castle Hill bathroom's finishes, vanity, basins, mirror, and shower; photo and caption are local. | Pass |
| Baulkham Hills | Describes established 1970s–1990s brick homes and separate toilets; Castle Hill is identified as nearby regional work, not a Baulkham Hills job. | Pass |
| Kellyville | Describes newer estates, concrete slabs, and upstairs bathrooms; Castle Hill is identified as nearby regional work. | Pass |
| Marrickville | Describes older plumbing and timber floors; Balmain is identified as nearby Inner West work, not Marrickville work. | Pass |
| Ryde | Identifies Gladesville as the closest photographed regional example and explicitly says the project is not in Ryde. | Pass |
| Randwick | Covers the local mix of terraces, Federation-era homes, and apartments, with a photographed Randwick project and its specific finishes. | Pass |

All 11 pages fail a location-name swap: the heading plus the housing/access detail or
the named photographed project would become false or visibly mismatched. No new local
claims were added for this change.
