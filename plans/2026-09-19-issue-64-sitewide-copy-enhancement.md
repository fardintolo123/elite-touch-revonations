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
- [x] Complete the page-by-page copy inventory and KEEP/IMPROVE audit.
- [x] Implement the focused copy improvements.
- [x] Update durable decision/mechanics documentation where the issue changes a standing approach.
- [x] Run `npm run typecheck`.
- [x] Run `npm run build` and confirm the route count does not drop.
- [x] Run `npm run check:readability` and resolve failures without deleting useful content.
- [x] Verify distinctive updated copy is present in served HTML.
- [x] Verify structured data and internal links still use the same data paths.
- [x] Inspect representative desktop and 390 px mobile pages in a real browser.
- [x] Review every issue requirement and acceptance criterion against the final site.
- [ ] Close GitHub issue #64 after verification passes.
- [ ] Write the required session handoff.

## Audit verdict

### IMPROVE

- Homepage hero, process framing and proof heading: make the customer problem and written-scope
  differentiator clear sooner.
- Services index and all four service pages: give each service its own problem, desired result and
  question-shaped explanation instead of one long technical paragraph.
- Contact page and shared enquiry section: explain what the customer should tell ETR and what happens
  after the enquiry.
- Project detail copy: remove generic adjectives and correct the Balmain bath attribution.
- Advice/supporting surfaces: correct publication dates, realistic reading-time labels, the timeline
  CTA, and over-length search titles.
- Verification tooling: include all 48 customer-facing routes in readability checks.

### KEEP

- About and Packages body copy: already specific, evidenced and strong on trust and inclusions.
- Regional hubs and suburb-page body copy: already differentiated and tied to real local proof.
- Gallery index, legal pages and advice-article bodies: already clear and useful; no rewrite justified.
- Reviews, URLs, image alt text, package figures, service scope, forms, schema architecture and
  internal-link structure: preserve exactly.
