# Issue #75 — service and location page design

**Status:** the service/location implementation and current local verification pass, but #75 remains `fixed`. The latest isolated build at local commit `1e14bbd` passes with 122 static routes; all 16 issue routes return 200 with one H1, distinctive H2 copy, and a visible telephone link; `check:design` passes; readability passes 116/116; and mobile screenshots record `scrollY: 0` with the header visible on every route. Three Lighthouse 13.4.1 mobile runs on Baulkham Hills report median LCP 2.497s (target ≤2.5s), median TBT 32ms, CLS 0, median Speed Index 1.069s, and median performance score 97. However, Lighthouse still sees both the location hero and shared header logo at high priority, which breaks the one-high-priority-image rule. The header is owned by #78 and is outside #75 scope. The updated independent critique reports no P0/P1 and two P2 findings: the Eastern Suburbs proof link is clipped at the first-screen edge and the North-Western Sydney breadcrumb truncates the region name. Comment [#6717754347](https://github.com/fardintolo123/elite-touch-revonations/issues/75#issuecomment-6717754347) contains screenshots from remote `main` at `257424a`; current captures/reports from `1e14bbd` remain local because local `main` is five commits ahead of `origin/main` and publication was not authorized. Keep the tracker at `fixed` and #75 open until the shared image-priority rule is resolved or the owner records an explicit exception, and the current evidence is available on GitHub.
**Outcome:** Distinguish the service and published location page compositions while preserving the approved design system, factual content, conversion paths, and publication gates.

## Direction

Use Direction A from D-159: evidence first. The services index leads with the documented Hornsby bathroom photograph; service pages keep only their evidenced hero projects (or text-only heroes) and service-specific copy; location pages lead with their exact local project or an honestly labelled nearby project. Use DESIGN.md's hero, factual lists, real project imagery, and restrained light/ink band rhythm. Remove generic eyebrow labels and repeated three-card layouts without changing business facts or shared components.

For location pages, pair the real local or clearly labelled nearby project photo with that location's own renovation guidance, using DESIGN.md's split-feature recipe and putting the photo first on phones. Hubs keep any additional distinct, suburb-attributed projects as separate proof cards; no new images or unsupported local claims are needed. The service pages keep their existing service-specific price, scope, timeline and project evidence, with shared chrome handed to #78.

## Template section audit (§4)

| Template and section | Job, evidence and swap test | Composition, copy and conversion | Result |
|---|---|---|---|
| `/services/` hero | Names bathroom work across Sydney; Hornsby project photo and Google rating are real proof. The area and service stay true across Sydney, while the photographed job is explicitly credited. | Full-bleed `PageHero` carries the booking and call actions. | Pass |
| `/services/` service navigation | Four actual services, each with its own icon and short need-based summary from `lib/businessInfo.ts`; replacing a card with another service would change its scope. | Two-column navigation grid fits four destinations. No `et-grid-3` remains in the service templates. | Pass |
| `/services/` area links, WorkStrip and contact | Published regions and suburb links, attributed project photos, and the enquiry path each have a separate job. A different renovator could not claim these projects. | Shared components stay in their owner scope; each follows the service navigation with a different content type. | Pass |
| Service detail hero | H1, summary, rating and calls describe the selected service. Bathroom and ensuite use evidenced projects; laundry and powder room stay text-only because no project proof is approved for those services. | One concise service-specific hero; image is omitted where it would imply unsupported proof. | Pass |
| Service detail answer, scope and extra service sections | Service data supplies the answer and any genuinely service-specific sections. Package prices appear only for bathroom and ensuite pages with the stated size basis. The inclusions list is the actual scope, including AS 3740. | AnswerBlock and a factual checklist fit explanatory and sequential content; no repeated three-card grid. | Pass |
| Service detail duration table | Compares scope, on-site time and the factors that change the program; values come from `businessInfo.buildDurations`. | A comparison table fits the data. Hidden only when the service's own timeline would conflict. | Pass |
| Service detail review, area links, other services, FAQ, WorkStrip and contact | Review is verbatim; area links use published proof; service links name actual services; FAQs are service-specific; WorkStrip uses only real attributed projects. | Ink review, plain link/checklist sections, native FAQ details, and proof strip use distinct compositions. For unphotographed services the WorkStrip stays later so it does not imply a matching job. | Pass |
| Suburb hero and cost answer | H1 names the suburb; local project is used when evidenced and nearby work is labelled by its actual suburb. AnswerBlock carries that suburb's sourced copy and package size prices. | Photo-first mobile hero keeps booking and call actions visible; the answer follows in a light band. | Pass |
| Suburb split proof, trust, FAQ and contact | Pairs the attributed local/nearby photograph with the suburb's own housing or access guidance; trust facts come from the approved business source; questions are suburb-specific. | Split feature alternates desktop sides, image leads on mobile; fact band and native FAQ details have different jobs and layouts. | Pass |
| Hub hero and cost answer | Names the region, shows an attributed local project, and provides the sourced regional answer and price basis. | Full-bleed proof hero followed by an answer-first light band. | Pass |
| Hub split feature and additional project cards | First attributed project pairs with regional guidance; further cards appear only for distinct projects and preserve each suburb label. Swap testing passes for all five hubs. | One split feature replaces adjacent proof-card and local-detail stacks; optional project grid is two-column and holds distinct real work. | Pass |
| Hub review, suburbs, related areas, FAQ, trust and contact | Verbatim review is not falsely assigned to a suburb; published suburb list and sibling links use live data; FAQ is regional; trust is verifiable. | Review uses an ink band, the suburb list and related links use separate plain layouts, FAQ uses native details, and the trust band closes before contact. | Pass |

Across the three service templates, no `et-grid-3` remains. Remaining grids are two-column layouts for service navigation, paired photo/guidance, additional distinct projects, or two factual trust lists. No new dependency or motion effect was added.

## Checklist

- [x] Reconcile issue scope, live publication data, design checklist, and current worktree.
- [x] Build and capture baseline screenshots at 390px and 1440px for the four representative routes; capture the 390px first-view strip for every in-scope route.
- [x] Audit service composition and perform a swap test for each published hub and suburb; retain evidence-backed location distinctions.
- [x] Refine only issue-owned service/location templates and descriptive copy, preserving facts, slugs, metadata, schema, links, calls, and publication gates.
- [x] Capture after screenshots, run an independent visual critique, and address P0/P1 findings.
- [x] Build, verify every current route's response/H1/distinctive served copy and mobile conversion path, and run the design-pattern scan.
- [x] `npm run check:readability` passes across all 116 routes. Fresh result at `77fc791`: 116/116 pass.
- [ ] Performance gate: the latest local three-run median meets the numeric targets (LCP 2.497s, TBT 32ms, CLS 0, Speed Index 1.069s, score 97), but Lighthouse confirms two high-priority images on the location page: its hero and the shared header logo. This violates the one-high-priority-image rule. The shared header belongs to #78 and was not changed here. The remote `origin/main` result at `257424a` remains LCP 2.575s.
- [x] Post the before/after screenshot evidence to issue #75. Representative 390×844 and 1440×900 images are embedded in comment #6717754347, with links to all 16 mobile strips. The refreshed `1e14bbd` captures are local in `session-history/evidence/issue-75-service-location/after-2026-11-08/` and are not yet published.
- [ ] Set the issue #75 tracker row to `verified`; leave it `fixed` until the shared image-priority rule is resolved or the owner explicitly accepts it and the refreshed evidence is available on GitHub.

## Scope and guardrails

Issue-owned paths: `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/services/[slug]/[location]/page.tsx`, `components/LocationHero.tsx`, `lib/hubContent.ts`, `lib/suburbContent.ts`, `lib/serviceHeroImages.ts`, descriptive service fields in `lib/businessInfo.ts`, and the issue #75 row in `docs/DISTINCTIVE_DESIGN_CHECKLIST.md`.

Do not edit shared chrome/components or style files, service-area publication data, projects/reviews, sitemap, business facts, or package inclusions. Respect the unrelated pre-existing `lib/blog.ts` change and the in-progress issue #78 plan.

## Verification

Use a fresh local production build; inspect 390x844 and 1440x900 renders; review all published service/location routes against built HTML; run `npm run check:readability` and `npm run check:design`. Keep this plan only while work is active; remove it when completed and preserve the session record in `session-history/`.
