# Issue #75 — service and location page design

**Status:** in progress  
**Outcome:** Distinguish the service and published location page compositions while preserving the approved design system, factual content, conversion paths, and publication gates.

## Direction

Use Direction A from D-159: evidence first. The services index leads with the documented Hornsby bathroom photograph; service pages keep only their evidenced hero projects (or text-only heroes) and service-specific copy; location pages lead with their exact local project or an honestly labelled nearby project. Use DESIGN.md's hero, factual lists, real project imagery, and restrained light/ink band rhythm. Remove generic eyebrow labels and repeated three-card layouts without changing business facts or shared components.

## Checklist

- [ ] Reconcile issue scope, live publication data, design checklist, and current worktree.
- [ ] Build and capture baseline screenshots at 390px and 1440px for the four representative routes; capture the 390px first-view strip for every in-scope route.
- [ ] Audit service composition and perform a swap test for each published hub and suburb; retain evidence-backed location distinctions.
- [ ] Refine only issue-owned service/location templates and descriptive copy, preserving facts, slugs, metadata, schema, links, calls, and publication gates.
- [ ] Capture after screenshots, run an independent visual critique, and address P0/P1 findings.
- [ ] Build, readability-check, verify every current route's response/H1/distinctive served copy and mobile conversion path, and run the design-pattern scan.
- [ ] Set the issue #75 tracker row to `verified` and reconcile this plan.

## Scope and guardrails

Issue-owned paths: `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/services/[slug]/[location]/page.tsx`, `components/LocationHero.tsx`, `lib/hubContent.ts`, `lib/suburbContent.ts`, `lib/serviceHeroImages.ts`, descriptive service fields in `lib/businessInfo.ts`, and the issue #75 row in `docs/DISTINCTIVE_DESIGN_CHECKLIST.md`.

Do not edit shared chrome/components or style files, service-area publication data, projects/reviews, sitemap, business facts, or package inclusions. Respect the unrelated pre-existing `lib/blog.ts` change and the in-progress issue #78 plan.

## Verification

Use a fresh local production build; inspect 390x844 and 1440x900 renders; review all published service/location routes against built HTML; run `npm run check:readability` and `npm run check:design`. Keep this plan only while work is active; remove it when completed and preserve the session record in `session-history/`.
