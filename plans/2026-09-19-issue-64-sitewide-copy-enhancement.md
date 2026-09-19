# Issue #64 — sitewide copy enhancement

GitHub: https://github.com/fardintolo123/elite-touch-revonations/issues/64

## Goal

Audit the major customer-facing pages and selectively improve copy that is generic, repetitive,
unclear, unsupported, or weak at moving a Sydney homeowner from uncertainty to a free on-site
measure. Preserve the existing site structure, facts, SEO intent, structured data, internal links,
forms, accessibility, and design.

## Plan

1. Inventory every major page and trace its copy to the page, shared component, or data source that
   owns it.
2. Classify each page or page class as KEEP or IMPROVE. Prefer focused edits over wholesale rewrites.
3. Strengthen the highest-value conversion path: homepage, bathroom service, the other three service
   pages, enquiry, about/trust, packages, project pages, locations, and supporting content.
4. Keep every claim traceable to repository evidence. Do not add services, project details, prices,
   timelines, reviews, credentials, or promises that are not already approved.
5. Verify type safety, production build, readability, metadata/schema/internal-link stability, served
   HTML, and desktop/mobile rendering. Close the issue only after all checks pass.

## Checklist

- [x] Read issue #64, `CLAUDE.md`, `DECISIONS.md`, and the routed content/SEO guidance.
- [x] Confirm the existing dirty-worktree item is unrelated and leave it untouched.
- [ ] Complete the page-by-page copy inventory and KEEP/IMPROVE audit.
- [ ] Implement the focused copy improvements.
- [ ] Update durable decision/mechanics documentation where the issue changes a standing approach.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build` and confirm the route count does not drop.
- [ ] Run `npm run check:readability` and resolve failures without deleting useful content.
- [ ] Verify distinctive updated copy is present in served HTML.
- [ ] Verify structured data and internal links still use the same data paths.
- [ ] Inspect representative desktop and 390 px mobile pages in a real browser.
- [ ] Review every issue requirement and acceptance criterion against the final site.
- [ ] Close GitHub issue #64 after verification passes.
- [ ] Write the required session handoff.

