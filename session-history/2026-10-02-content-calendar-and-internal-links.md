# Session Summary

## 1. Session Objective
Extend the SEO content strategy by adding internal links between the 10 new blog posts (and to
existing posts) and extending the content calendar from weeks 1–5 to weeks 6–10 with 10 more
topic selections.

## 2. Work Completed

### Content calendar extended (weeks 6–10)
Added 10 new topics to `plans/seo-content-strategy.md`:
- Week 6: wet room design, tapware finishes guide
- Week 7: underfloor heating, family-friendly bathroom
- Week 8: vanity guide, permits and approvals
- Week 9: plumbing replacement, renovation and insurance
- Week 10: project management week-by-week, large-format tiles

### Internal links added (12 links across 10 articles in `lib/blog.ts`)
| From article | To article | Context |
|---|---|---|
| bathroom-renovation-add-value-home | bathroom-renovation-budget-planning | Budget planning guide link after package prices |
| bathroom-renovation-add-value-home | bathroom-renovation-resale-value-what-agents-look-for | What agents look for, after overcapitalising section |
| bathroom-colour-schemes-australia | bathroom-tiling-and-finishes-guide | Tiling and finishes guide, in small bathroom section |
| heritage-bathroom-renovation-sydney | bathroom-demolition-what-to-expect | Demolition guide, in "what you find behind walls" section |
| walk-in-shower-vs-bathtub-renovation | accessible-bathroom-renovation-sydney | Accessible bathroom guide, in accessibility paragraph |
| walk-in-shower-vs-bathtub-renovation | small-bathroom-renovation-without-feeling-cramped | Small bathroom guide, in space/layout section |
| bathroom-renovation-budget-planning | how-to-compare-bathroom-renovation-quotes | Comparing quotes guide, in quote comparison section |
| bathroom-renovation-budget-planning | bathroom-renovation-hidden-costs-sydney | Hidden costs guide, in contingency paragraph |
| bathroom-renovation-resale-value-what-agents-look-for | bathroom-renovation-add-value-home | Value article, in opening section |
| bathroom-renovation-resale-value-what-agents-look-for | bathroom-colour-schemes-australia | Colour schemes guide, in FAQ answer |
| bathroom-demolition-what-to-expect | bathroom-renovation-timeline-sydney | Timeline guide, in "what happens after" section |
| bathroom-demolition-what-to-expect | heritage-bathroom-renovation-sydney | Heritage guide, in asbestos section |
| accessible-bathroom-renovation-sydney | walk-in-shower-vs-bathtub-renovation | Walk-in shower guide, in curbless shower section |
| apartment-bathroom-renovation-vs-house | strata-bathroom-renovation-sydney | Strata guide, in opening section |
| bathroom-ventilation-sydney-renovation | bathroom-demolition-what-to-expect | Demolition guide, in fan wiring section |

### Build and readability verification
- `next build` passed green (72 static pages)
- Readability check: 58/58 pages pass Flesch ≥ 60
- All internal links use `class="et-link"` matching existing pattern

## 3. Important Decisions

| Decision | Reason |
|---|---|
| Added links within existing paragraph text, not as standalone "Related articles" blocks | Matches the existing internal linking pattern in the codebase (`et-link` inline anchors) and is better for SEO |
| Selected weeks 6–10 topics by cross-referencing existing 30 slugs against search volume research | Avoids topic duplication; fills genuine content gaps |
| Chose topics that interconnect with existing and new articles | Creates a topical cluster effect for SEO authority |

## 4. Permanent Rules / Lessons

- **Internal links use `<a href="/blog/slug/" class="et-link">anchor text</a>` inline in paragraphs.**
  This is the established pattern across all blog posts in `lib/blog.ts`.
- **Adding link text to paragraphs can affect Flesch scores.** After adding 12 links, all pages
  still passed ≥ 60, but this should be re-checked each time links are added.

## 5. Things We Explicitly Decided NOT To Do

- Did NOT add a "Related articles" component or sidebar — links are inline in context.
- Did NOT add links to/from the original 20 blog posts — scope was limited to the 10 new articles.
  Adding reciprocal links from older posts to new ones is a future opportunity.

## 6. Current Project State

### Working
- 30 blog posts total, all building and passing readability
- 12 new internal links connecting the 10 new articles to each other and to existing posts
- Content calendar covers weeks 1–10 (20 topics); weeks 1–5 complete, weeks 6–10 planned
- Build green at 72 static pages

### Incomplete
- Weeks 6–10 articles not yet written
- No reciprocal links added from the original 20 posts back to the new 10
- No browser verification of link rendering
- The full 6-month target (~52 articles) requires extending the calendar beyond week 10

### Known issues
- `lib/hubContent.ts` and `lib/suburbContent.ts` have uncommitted changes from another session
- `session-history/2026-10-02-internal-linking-matt-strategy.md` is untracked from another session

## 7. Files Changed

| File | Change | Reason |
|---|---|---|
| `lib/blog.ts` | Added 12 internal links across 10 blog post paragraph texts | SEO internal linking between related articles |
| `plans/seo-content-strategy.md` | Added weeks 6–10 content calendar (10 topics), updated status | Content strategy extension |

## 8. Files Created

| File | Purpose |
|---|---|
| `session-history/2026-10-02-content-calendar-and-internal-links.md` | This handoff file |

## 9. Files Deleted
None.

## 10. Tests and Validation

| Test | Result |
|---|---|
| `next build` | Passed, 72 static pages |
| Readability check | 58/58 pages ≥ 60 |
| TypeScript compilation | No errors |
| Browser verification | Not run |

## 11. Performance Impact
No performance impact. No new dependencies, components, images, or client-side code added.
Internal links are plain `<a>` tags in existing server-rendered HTML.

## 12. SEO Impact

### Internal linking
- 12 new contextual internal links added between related blog posts
- Links use descriptive anchor text matching the target article's topic
- Creates topical clusters: cost/budget/value cluster, process/demolition/timeline cluster,
  accessibility/shower cluster, apartment/strata cluster

### Content calendar
- 10 additional topics planned for weeks 6–10, each with a target keyword and intent classification
- Topics chosen to fill gaps in the existing 30-post inventory

## 13. Remaining Tasks

### High Priority
- Write the 10 articles for weeks 6–10 (next batch of content creation)
- Add reciprocal internal links from existing 20 posts to the new 10 where relevant

### Medium Priority
- Extend content calendar beyond week 10 toward the 52-article target
- Add `heroProject` images to articles where relevant project photos exist

### Low Priority
- Monitor Search Console for new keyword impressions after deployment
- Consider a "Related articles" component for the blog post renderer

## 14. Open Questions
- Should reciprocal links (from old posts to new ones) be added in the same session as writing
  new articles, or as a separate linking pass?
- Is the owner satisfied with the topics selected for weeks 6–10, or are there priorities to swap in?

## 15. Next Session Handoff

### Inspect first
- `plans/seo-content-strategy.md` for the weeks 6–10 topics to write
- `lib/blog.ts` for the current 30-post inventory and linking pattern

### Continue
- Write articles for weeks 6–10, following the same workflow (keyword research → competitor
  structure → outline → write → quality gate → add to blog.ts → build check)
- Add internal links to each new article as it is written
- Run readability check after each batch

### Do NOT change
- Existing 30 blog posts' content (unless readability check flags issues)
- Blog renderer (`app/blog/[slug]/page.tsx`)
- The 12 internal links just added

### Important context
- All articles use real ETR data only — no invented facts
- Internal links use `class="et-link"` inline in paragraphs
- `hubContent.ts` and `suburbContent.ts` have uncommitted changes from another session — do not
  commit them with blog work

## 16. Potential Documentation Updates

- `PROJECT_CONTEXT.md` — update blog post count (now 30) when it stabilises
- `DECISIONS.md` — could record the internal linking strategy (inline `et-link` anchors, contextual
  placement, topical clustering approach)

## 17. Conversation-Derived Insights

### Confirmed decisions
- Internal links between blog posts use inline `<a class="et-link">` in paragraph text
- Content calendar extended with topics that fill genuine search-volume gaps

### Strong recommendations
- Add reciprocal links from older posts to newer ones to complete the link graph
- Write weeks 6–10 articles following the same research → write → quality gate workflow

### Ideas/proposals
- A "Related articles" component at the bottom of blog posts could complement inline links
- Some of the weeks 6–10 topics (permits, insurance) are unique angles that few competitors cover

### Unresolved opinions
- Whether to batch-write articles (10 at a time) or write them in smaller groups (2–4)
