## Summary
Audit and finish the rendered blog index and post template against the distinctive design standard (D-158, D-159). Keep this issue focused on the blog UI; the separate 2026-11 blog plan owns edits to post copy and the readability checker.

## Current source
- The post inventory comes from `generateStaticParams()`; derive the current count from it rather than relying on a fixed count.
- The index currently groups guides by topic and renders article rows. Audit that composition as it exists; do not assume it is a card grid or force the DESIGN.md Insights recipe.
- The post template has conditional quick-answer, project-image, and FAQ sections. Choose representative posts that cover every branch.

## Scope
- [ ] Audit `/blog`: topic navigation, topic sections, article rows, reading times, descriptions, and contact path.
- [ ] Audit `/blog/[slug]`: hero, breadcrumb, quick-answer/table variant, body rhythm, FAQ variant, publisher block, and contact path.
- [ ] Read every generated post's headline and introduction for specificity and generic phrasing. Post a one-line result per post; route copy edits to the blog plan. Reviews remain verbatim and must trace to `Customer Reviews.md`.
- [ ] Write the business-specific visual direction before changes: use approved project imagery where the post supports it, otherwise lead with a verifiable ETR fact and the editorial hierarchy. Do not invent or add unapproved imagery.
- [ ] Apply the section test in `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` and preserve what already works.

**In scope:** `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/blog.module.css`, and this route class's row in §8 of the checklist.

**Out of scope:** `lib/blog.ts` edits (owned by R2/R3 in the current blog plan), slugs, metadata, schema, adding or deleting posts, shared components and global styles. Report shared-component findings for #78.

## Parallelization
- Can run in parallel: YES for template work.
- Depends on: None for implementation. Full readability verification depends on the separate R1/R2 plan work.
- Files owned: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/blog.module.css`, and this issue's own §8 row.
- Must not modify: `lib/blog.ts`, `components/*`, `lib/projects.ts`, `lib/reviews.ts`, `Customer Reviews.md`, `app/sitemap.ts`, `app/globals.css`, or `DESIGN.md`.
- Acceptance: template changes stay within the owned files; editorial findings are reported without editing the separately owned copy.
- Verification: production build, rendered screenshots, route/H1 sweep, design scanner, independent critique, and readability gate after R1/R2.
- Reason: post copy and the readability checker have separate owners in the current plan; touching them here would create file overlap.

## Acceptance Criteria
- [ ] Before and after full-page screenshots at 390×844 and 1440×900 for `/blog` and the smallest representative post set covering quick-answer, project-image, and FAQ branches; attach them here.
- [ ] Independent critique of the index and post template in §6 format from a reviewer who did not implement the changes; no P0/P1 findings remain.
- [ ] One-line editorial sweep result for every post returned by `generateStaticParams()`.
- [ ] Every generated post returns HTTP 200 with exactly one correct H1 in served HTML; no generated route count drop.
- [ ] `npm run check:design` reports no new pattern counts above the committed baseline.
- [ ] `npm run check:readability` covers the published routes with no missing entries, and every generated blog route scores at least 60 after R1/R2. Record unrelated non-blog failures against their owning issue; do not widen #77 scope.
- [ ] `npm run build --ignore-scripts` is green. Check blog-relevant accessibility, conversion, and performance requirements; add no dependency, script, or unnecessary page weight.
- [ ] Set the blog row in checklist §8 to `verified` only after all applicable gates pass.

## Links
- Standard: `docs/DISTINCTIVE_DESIGN_CHECKLIST.md`
- Design system: `DESIGN.md`
- Copy rules: `docs/CONTENT_QUALITY_CHECKLIST.md`
- SEO rules: `docs/SEO_CONTENT_GUIDE.md`
- Current copy/readability plan: `plans/blog-readability-and-answers-2026-11.md`