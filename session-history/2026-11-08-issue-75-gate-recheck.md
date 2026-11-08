# Issue #75 gate recheck — 2026-11-08

## Scope and revision

Continued the owner-authorized closeout of GitHub issue #75. The local branch is at `1e14bbdaed56f7c4e7bf71a148fe80b912a00b1b` (`1e14bbd`), five commits ahead of `origin/main` at `257424a`. The latest build was made in a detached worktree from `1e14bbd`. No shared source, service/location source, or issue #76 source was changed during this recheck.

## Verification at `1e14bbd`

- `npm --ignore-scripts run build`: passed; 122 static routes.
- `npm run check:readability`: 116/116 routes pass.
- `npm run check:design`: passed.
- Browser sweep: all 16 #75 routes return 200, contain one H1 and the route's distinctive H2, show a telephone link, and have no horizontal overflow at 390px. The four representatives also pass desktop checks at 1440px.
- Refreshed screenshot manifest records `scrollY: 0`, visible header bounds, and a decoded hero image for all 16 mobile strips.
- Independent visual critique: no P0/P1. Two P2 findings remain: Eastern Suburbs proof attribution is clipped at the first-screen edge; North-Western Sydney breadcrumb truncates the region name. Reviewer retracted an earlier header omission finding after direct inspection of all 16 PNGs.
- GitHub comment #6717754347 contains embedded screenshots from remote `main` evidence at `257424a`. Refreshed `1e14bbd` screenshots remain local at `session-history/evidence/issue-75-service-location/after-2026-11-08/`.

## Performance and remaining blocker

Three Lighthouse 13.4.1 mobile runs on `/services/bathroom-renovations/baulkham-hills/` at `1e14bbd`:

| Run | Performance | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|
| 1 | 97 | 2.491s | 48ms | 0 | 1.096s |
| 2 | 98 | 2.497s | 21ms | 0 | 1.065s |
| 3 | 97 | 2.503s | 32ms | 0 | 1.069s |
| Median | 97 | 2.497s | 32ms | 0 | 1.069s |

The numeric median targets pass. However, the Lighthouse request log marks both the location hero and `SiteHeader` logo as high priority, violating the project rule that each page has exactly one high-priority image. `SiteHeader` belongs to #78 and is outside #75 scope. Remote `origin/main` at `257424a` has the earlier three-run median LCP of 2.575s. The issue remains OPEN and the §8 row remains `fixed` until the shared priority rule is resolved or the owner explicitly accepts it, and refreshed evidence is available on GitHub. No push was made; project instructions require owner sign-off before pushing, and the local branch also contains four other commits ahead of origin.

## Evidence paths

- Current screenshots and manifest: `session-history/evidence/issue-75-service-location/after-2026-11-08/`
- Current Lighthouse reports: `session-history/evidence/issue-75-service-location/performance-1e14bbd-2026-11-08/`
- Independent critique: `.impeccable/critique/issue-75-final-vision-review-2026-11-08.md`
- Updated plan: `plans/issue-75-service-location-design.md`
