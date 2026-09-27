# Session Summary

## 1. Session Objective

The owner shared two Google Search Console "Performance" screenshots (Pages tab and Queries tab,
28-day window 2026-08-28 → 2026-09-24) and asked for site improvements to increase impressions,
rankings and clicks based on that report.

## 2. Work Completed

- Read both GSC screenshots and cross-checked every notable row against the live site and the
  codebase before writing any code (see `plans/2026-09-27-gsc-report-gap-fill.md` for the full
  evidence trail).
- Confirmed two things in the report are **not** bugs: the apex domain already 308-redirects to
  `www` (`curl -I https://elitetouchrenovations.au/`), and `/packages-deals/` already 301s to
  `/packages/` in `next.config.ts`. Both host/URL variants still showing separately in GSC is
  expected residual indexing after the migration, not something fixable in code.
- Identified the one genuine, evidenced, in-scope gap: `/blog/bathroom-lighting-ideas/` was already
  earning page-2 impressions (96 impressions, position 18.3 — the best position of any 0-click query
  in the report) despite being the thinnest post on the site (3 sections, ~150 words, "1 min read",
  no FAQ, no photo, no answer-first block).
- Added three new **optional** fields to `BlogPost` (`lib/blog.ts`): `faq`, `heroProject`, and
  `updated`. These reuse patterns that already exist elsewhere in the codebase (the FAQ
  `<details>/<summary>` + `SchemaGraph` `faqs` pattern from `app/services/[slug]/page.tsx`; the
  `PageHero` `image={{ project, imageIndex }}` pattern already used on service/location pages).
  Every other blog post is unaffected because the fields are optional.
- Rewrote the `bathroom-lighting-ideas` post entry: added a `quickAnswer` block (short answer +
  a 3-row table of lighting layers + a "Book a free on-site measure" CTA, matching the one other
  post that already has a `quickAnswer`), expanded its 3 sections into 5 with concrete detail
  (task/ambient/accent layering, colour temperature 2700K–3000K, wet-area IP-rating guidance
  deferred to a licensed electrician, planning lighting alongside the electrical/tiling stage),
  attached the real Castle Hill project's LED-backlit-mirror photo as the post's hero image, and
  added 5 real FAQ questions.
- Updated `app/blog/[slug]/page.tsx` to render the new optional `faq` block (visually identical to
  the service-page FAQ pattern), pass `post.faq` to `SchemaGraph` as `faqs` (generates `FAQPage`
  schema), resolve and render `post.heroProject` via `PageHero`'s existing `image` prop, and show an
  "Updated" fact in the hero facts row when `post.updated` is set.
- Updated `app/sitemap.ts`'s blog route mapping to use `post.updated ?? ISSUE_64_CONTENT_PASS` per
  post instead of one blanket constant for every blog post — matching how `service.updated` and
  `project.updated` already drive their own sitemap entries.
- Recorded D-148 in `DECISIONS.md`.

## 3. Important Decisions

### Decision: fix the one evidenced content gap, not chase every low-position query

- Reason: avg. position 39.2 and 0.3% CTR sitewide, across ~450 queries mostly sitting at position
  20–70, reflects a young rebuilt site with limited off-site authority — not something fixable by
  editing on-page code. Almost all of the on-page work this report might otherwise suggest (area
  navigation, hub content, suburb pages, schema, trust signals) was already done in prior sessions
  (see `plans/2026-09-14-search-performance-gap-fill.md` and the D-140/D-142 decisions).
- Alternatives considered: rewriting the `/services/` index page again (1,828 impressions, 0 clicks,
  position 59) or the Eastern Suburbs hub (381 impressions, position 42.3). Rejected for this
  session because both already received dedicated on-page work on 2026-09-14 and neither showed a
  content gap on inspection — their titles, H1s and meta descriptions are already keyword-aligned
  and specific. Re-touching them again without new evidence of what's actually wrong would be
  guessing, not evidence-based improvement.
- Why preferred: `bathroom-lighting-ideas` was the only page/query in the report that combined (a)
  a position close enough to page 1 to plausibly move, (b) impressions without a click, and (c) an
  obvious, verifiable, fixable content gap (thinnest post on the site, missing the FAQ/answer-first/
  photo elements every other page-type already has).

### Decision: add `faq`/`heroProject`/`updated` as optional `BlogPost` fields, not a one-off hack

- Reason: `docs/SEO_CONTENT_GUIDE.md` §4 requires an FAQ block, a real photo and internal links on
  "every page" — blog posts were the one page-type missing this entirely (no post has ever had a
  photo or FAQ). Making the fields optional and reusing the exact rendering/schema pattern already
  proven on service pages avoids inventing a second design system for the same feature.
- Alternatives considered: hard-coding FAQ/image JSX directly into `bathroom-lighting-ideas`'s
  render path only. Rejected — `CLAUDE.md`'s Architecture Rules require content-as-data with one
  shared renderer for a repeated page type; a one-off special case for a single post's route would
  violate that and be inconsistent with the rest of the codebase's data model.
- Why preferred: every other post keeps rendering exactly as before (fields are optional and unused
  elsewhere); the FAQ/image capability is now available to any future post that has real,
  evidenced content to put in it.

### Decision: keep lighting/electrical guidance generic, not an ETR-specific claim

- Reason: Elite Touch Renovations holds a Builder's licence (Omar) and a Tiler's licence (Adam) —
  the business facts file does not record an electrician's licence. Stating specific wet-area
  IP-rating numbers or implying ETR performs electrical certification itself would risk an invented
  or unsupported trade claim (`CLAUDE.md` Business Rules: "Licence, ABN and insurance claims must be
  real... leave them out rather than approximate them").
- Alternatives considered: citing specific AS/NZS 3000 zone/IP numbers for authority/E-E-A-T value.
  Rejected — not verifiable against a business-info source in this repo, and wrong either way if the
  code detail is misstated.
- Why preferred: the post states general, safe, correct guidance ("fittings near water need a
  higher ingress-protection rating; a licensed electrician confirms what's required") without
  claiming ETR itself holds or performs that trade, consistent with how the rest of the site already
  treats waterproofing (a certified stage of the renovation, not a standalone claim).

## 4. Permanent Rules / Lessons

- When a GSC report shows a page/query near page-1 threshold (roughly position 15–25) with
  impressions but no clicks, check that page's actual content depth first — a thin page ranking
  that well on topical relevance alone is a strong signal that modest content investment could move
  it, unlike pages stuck at position 40–70 where content depth alone won't overcome a lack of
  off-site authority.
- The blog post type (`lib/blog.ts`) now supports the same FAQ/hero-image/freshness pattern used by
  service pages — future blog work should use `faq`, `heroProject` and `updated` rather than
  re-inventing per-post markup.
- `app/sitemap.ts` should always prefer a content type's own per-item `updated`/`published` field
  over a shared blanket constant, once that field exists — blanket constants are for content that
  hasn't been touched since the last real pass.

## 5. Things We Explicitly Decided NOT To Do

- Did not create any new suburb page (Hornsby, Pymble, Seven Hills, etc. remain Tier-2/hub-only per
  D-10; nothing in this report is new volume evidence).
- Did not touch `/services/`, the Eastern Suburbs hub, or the Castle Hill service/gallery pages —
  inspected them and found no content gap worth re-touching without new evidence.
- Did not add FAQ/hero images to any blog post other than `bathroom-lighting-ideas`.
- Did not state specific AS/NZS 3000 IP-rating numbers or any ETR electrical-licence claim.
- Did not touch pricing, the four-service scope, reviews, or any legally significant claim.
- Did not push or deploy.

## 6. Current Project State

- Production build is green: 58 routes generated, no drop from the last known-good count.
- `npm.cmd run typecheck` passes.
- `npm.cmd run check:readability` passes 48/48 ≥ 60 — `bathroom-lighting-ideas` improved from a
  ~150-word untested post to 922 words at Flesch 70.5.
- Served HTML for `/blog/bathroom-lighting-ideas/` confirmed: `FAQPage` schema present, the
  quick-answer table, all 5 expanded sections, the FAQ accordion, the hero image, and the "Updated"
  fact.
- Playwright screenshots at 1440px and 390px show the new layout rendering correctly with no
  overflow (saved locally to `/tmp`, not committed).
- Working tree is otherwise clean; nothing else in the repo was touched.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `lib/blog.ts` | Added optional `faq`, `heroProject`, `updated` fields to `BlogPost`; rewrote the `bathroom-lighting-ideas` entry with a `quickAnswer` block, 5 expanded sections, 5 FAQ items, a real project hero image and an `updated` date | Close the evidenced content-depth gap found in the GSC report |
| `app/blog/[slug]/page.tsx` | Render the optional FAQ block and hero image; pass `faqs` to `SchemaGraph`; show "Updated" in the hero facts row | Wire the new optional fields into the shared blog-post renderer |
| `app/sitemap.ts` | Blog route `lastModified` now reads `post.updated ?? ISSUE_64_CONTENT_PASS` per post instead of one blanket constant | Match the per-item freshness pattern already used for services/projects |
| `DECISIONS.md` | Added D-148 | Record the new optional blog-post fields and the reasoning above |
| `plans/2026-09-27-gsc-report-gap-fill.md` | Added plan, evidence, checklist and outcome | Required repo workflow and traceability |

## 8. Files Created

- `plans/2026-09-27-gsc-report-gap-fill.md`: plan, GSC evidence, checklist and outcome.
- This session handoff file.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npm.cmd run typecheck`: passed.
- `npm.cmd run build`: passed; 58 static routes generated; IndexNow skipped locally (expected,
  `VERCEL_ENV` unset).
- `npm.cmd run check:readability` (reads prerendered HTML from `.next/server/app`): 48/48 routes
  ≥ 60; `bathroom-lighting-ideas` at 70.5 (922 words, up from ~150).
- `grep` of the built HTML for `/blog/bathroom-lighting-ideas/`: confirmed `"@type":"FAQPage"`,
  the FAQ question text, the quick-answer table caption, the hero image alt text, and the "Updated"
  fact all present in the served markup.
- Playwright: started a local production server (`npm run start -- -p 3210`) and captured full-page
  screenshots at 1440px and 390px of `/blog/bathroom-lighting-ideas/`. Confirmed visually: hero
  image loads, quick-answer card and table render, all 5 sections show, FAQ accordion renders with
  5 closed `<details>` items, no horizontal overflow on mobile. Server was stopped afterward
  (`taskkill`).
- Confirmed via `curl -I` that `https://elitetouchrenovations.au/` returns a live `308` redirect to
  `https://www.elitetouchrenovations.au/` — ruled out a canonicalization bug before writing any
  plan.

## 11. Performance Impact

- One new `next/image` request was added to this single blog post (the Castle Hill hero photo),
  loaded eager/high-priority as this post's LCP candidate — the same pattern already used for every
  other `PageHero` image on the site, not a new pattern.
- No new dependency, third-party script, font or client component was added.
- Full production build still generated 58 routes with no drop. No Lighthouse run was performed
  this session; the change is in line with the existing image-loading pattern already covered by
  `docs/PERFORMANCE_BUDGET.md`.

## 12. SEO Impact

- `/blog/bathroom-lighting-ideas/`: content depth roughly 6x (from ~150 to 922 words), gained an
  answer-first `quickAnswer` block, a real evidenced photo, 5 FAQ items with `FAQPage` schema, and
  a distinct "Updated" freshness date (2026-09-27) separate from its original `published` date
  (2026-09-12).
- Sitemap `lastmod` for this one blog route now reflects the genuine 2026-09-27 change; every other
  blog route is unaffected (still on the shared `ISSUE_64_CONTENT_PASS` constant until it, too, is
  genuinely revised).
- No new route, no schema type change to other pages, no canonical/redirect change (both were
  checked and are already correct).

## 13. Remaining Tasks

### High Priority

None from this session — the one evidenced, in-scope gap in the report has been closed.

### Medium Priority

- After the next deploy, watch Search Console for `/blog/bathroom-lighting-ideas/` and the query
  "bathroom lighting ideas" specifically over the following 4–6 weeks to see whether the added depth
  moves its position from ~18 toward page 1.
- Consider extending the same `faq`/`heroProject` fields to 2–3 of the other short (~300-word) blog
  posts if a future GSC export shows any of them earning similar page-2 impressions without clicks.

### Low Priority

- The report's sitewide avg. position (39.2) and CTR (0.3%) are unlikely to move materially from
  further on-page work alone. The remaining lever is off-site authority (citations, backlinks,
  reviews) — D-142 already records that the owner deferred this. Worth raising again now that this
  report gives a concrete, current baseline to measure against if/when the owner wants to revisit it.

## 14. Open Questions

- No owner-only decision is required from this session.
- Whether to invest in off-site/citation work (D-142) remains an owner decision, not decided here —
  only re-surfaced because this report's evidence supports it more directly than before.

## 15. Next Session Handoff

- Inspect `plans/2026-09-27-gsc-report-gap-fill.md` first for the full GSC evidence trail.
- If a future GSC export arrives, check position/impression/click numbers for
  `/blog/bathroom-lighting-ideas/` specifically before assuming this change worked or didn't —
  4–6 weeks is a reasonable minimum wait.
- The `faq`/`heroProject`/`updated` fields on `BlogPost` (`lib/blog.ts`) are now available to any
  future post — reuse them rather than adding new one-off markup to `app/blog/[slug]/page.tsx`.
- Do not create new suburb pages, change the four-service scope, or alter pricing/warranty/licence
  copy based on this report alone.

## 16. Potential Documentation Updates

- `docs/SEO_CONTENT_GUIDE.md` could note that blog posts now support the same FAQ/photo pattern as
  service pages, so future posts should use it rather than shipping FAQ-less, photo-less content.
- `PROJECT_CONTEXT.md` could record that `BlogPost` gained `faq`/`heroProject`/`updated` fields, for
  anyone auditing what page-types have FAQ schema coverage.
- Both are recommendations only — neither file was edited this session, per the handoff-writing
  instruction not to touch permanent documentation while producing this file.

## 17. Conversation-Derived Insights

### Confirmed decisions

- The owner wants the site's search performance improved based directly on Search Console data,
  not a generic SEO pass.

### Strong recommendations

- Treat "impressions with 0 clicks near position 15–25" as the highest-value signal in any future
  GSC export — it is the one pattern content work can realistically move in the short term, unlike
  the position 40–70 cluster that dominates this report.
- Revisit the owner-deferred off-site/citation program (D-142) at some point; on-page work for the
  current site structure is largely exhausted.

### Ideas/proposals

- Extending `faq`/`heroProject` to more blog posts opportunistically, keyed off future GSC evidence
  rather than doing all of them speculatively.

### Unresolved opinions

None.
