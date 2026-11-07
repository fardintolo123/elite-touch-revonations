# Session Summary

## 1. Session Objective

The owner shared two Neil Patel screenshots on 2026-11-02 — *"25 Things AI Looks at to judge Your
Business"* and *"34 Ways Customers Search For You"* — with the instruction "make sure these two are
covered". The objective was to audit Elite Touch against both lists item by item, close every gap that
lives in this repository, and name honestly the gaps that do not.

## 2. Work Completed

**Audit.** Both lists were checked against the live code, not against documentation. Findings:

- The **34-ways list was already owned** by `plans/long-tail-buyer-queries-2026-10.md` (tracker issue
  #80, children #81–#85). It was re-verified, not re-opened. Of the 34 shapes: 20 fully covered, 8
  partially, 4 honest "not offered", 1 held on legal risk, 1 partial by choice (`/reviews/`).
- The **25-things list had never been triaged here.** Thirteen of the 25 are off-site reputation
  signals this repo cannot move. Of the twelve on-site ones, four had real gaps — all on the blog.

**Implemented (all four gaps closed):**

1. **`BlogPosting` structured data on all 78 guides.** `lib/schema.ts` gained `SchemaArticle` and
   `buildArticleNode()`, emitting `headline`, `url`, `mainEntityOfPage`, `isPartOf`, `datePublished`,
   `dateModified`, `author`, `publisher`, `inLanguage: en-AU`, `isAccessibleForFree`, `about`,
   `description`, `articleSection` and an optional `image`. Wired through `buildPageGraph` (new
   `article` param; `mainEntityId` is now `projectId ?? articleId`) and `components/SchemaGraph.tsx`.
   Before this, 78 posts emitted only `WebPage` + `FAQPage` — no publish date, no author, nothing.
2. **A visible publisher/author block** at the foot of every post (`app/blog/[slug]/page.tsx`,
   `.postByline` in `app/blog/blog.module.css`). It names the four Dawood family members, Omar's NSW
   Builder Licence 475204C, Adam's 25+ years, the first-published date, the revision date when one
   exists, a link to `/about-us/` and the tracked phone link.
3. **Sitemap freshness accuracy.** `app/sitemap.ts` dated un-revised posts to the blanket
   `ISSUE_64_CONTENT_PASS` (2026-09-20) — later than many were actually written. Now
   `post.updated ?? post.published`.
4. **`/llms.txt` guides section.** The AI-facing index listed services, locations and projects but
   **none of the 78 guides** — an answer engine reading it saw a 15-page site. `app/llms.txt/route.ts`
   now emits a `## Guides` section using each post's own `description`. Entry count went from ~26 to
   105.

**Also fixed:** `app/blog/page.tsx` had **no structured data at all**. It now emits `CollectionPage` +
`BreadcrumbList` through the same `SchemaGraph`.

**Documentation:** `docs/AI_VISIBILITY_SIGNALS.md` (new, permanent) holds the full 25 + 34 coverage
matrix. `plans/ai-visibility-signals-2026-11.md` (new) tracks the work. `DECISIONS.md` gained **D-168**.

## 3. Important Decisions

**Decision: `author` and `publisher` both reference the business `@id`; no personal byline.**
Reason: the guides are published by the business, and schema.org accepts an `Organization` as
`author`. Alternatives considered: a named `Person` author (Omar, as licence holder), or a
"reviewed by" line. Both were rejected — claiming a specific person wrote or reviewed each of 78
posts is a fabricated credential under CLAUDE.md's Business Rules, and it is exactly the kind of
claim the sibling project had to purge.

**Decision: `BlogPosting` on blog posts, while `/gallery/` keeps `CreativeWork`.**
D-125 rejected `Article` for gallery pages because the repo could not then back `datePublished`, a
byline or `publisher.logo` honestly. That reasoning is respected, not reversed. It no longer applies
to blog posts: every post carries a real `published` date, and `businessInfo.schema.logo` now ships.
Gallery pages were not touched.

**Decision: `dateModified` falls back to `datePublished`.**
`lib/blog.ts` sets `updated` only on genuine revision (8 of 78). A post without one has honestly not
changed. Alternative — bumping every post's date to look fresh — was rejected; it is the sitemap
"crying wolf" problem M-2 already settled for `lastModified`.

**Decision: the byline is a ruled block, not a third card.**
The post already ends with FAQ cards. A third stacked card is the "same section composition repeated"
pattern `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` §3 flags. A top rule inside the prose column was used
instead.

**Decision: byline copy written short-sentenced and plain-worded from the start.**
It renders on all 78 posts. A shared component repeating long words is this repo's documented way of
tanking the Flesch gate, and it has been misdiagnosed as a body-copy problem before. All 78 posts
still pass.

## 4. Permanent Rules / Lessons

- **A list of guides is not visible to an answer engine unless the AI-facing index names them.**
  `/llms.txt` is generated from `lib/` data; when a new content type is added, add it there too, or
  the depth is invisible. This had been missed since the file was written.
- **New generated route collections need a schema decision, not just a template.** The blog index
  shipped with no structured data at all and nobody noticed, because the post pages had some.
- **React splits interpolated text with `<!-- -->` markers in server HTML.** A phrase like
  `NSW Builder Licence {value}` cannot be grepped as one string, and a crawler reading text nodes
  sees it split. Use a single template literal when a load-bearing fact must appear as one phrase.
  This was caught here only because CLAUDE.md requires grepping the served HTML.
- **`author` on an `Article` may be an `Organization`.** There is no need to invent a person to
  satisfy an "author bio" checklist item.

## 5. Things We Explicitly Decided NOT To Do

- **No review dates** (signal 11) and **no owner replies** (signal 12). Neither exists in
  `Customer Reviews.md`; both are owner-side on the Google Business Profile. Inventing either breaks
  D-03.
- **No market statistics or "original data"** (signals 4, 5). Nothing has been supplied and nothing
  may be estimated.
- **No competitor-comparison or "alternatives to" pages** (34-ways #15, #16). Australian Consumer Law
  risk, thin evidence. Already held in `plans/long-tail-buyer-queries-2026-10.md`.
- **No finance copy** (34-ways #22, #32). The published 30/40/30 progress schedule already answers the
  question honestly. The business offers no finance.
- **No same-day or emergency pages** (34-ways #20, #26). D-02, and a renovation takes 3–7 weeks.
- **No dedicated `/reviews/` page** was built. All 19 reviews are already on `/about-us/` and the
  Google rating links out from four page types. It is an option while the count is 19, not a gap.
- **`lib/blog.ts` was not edited.** Another session was actively rewriting it during this work.

## 6. Current Project State

Working: build green at 119 static pages, no route-count drop. All 78 posts carry `BlogPosting` plus
the visible byline. Blog index carries `CollectionPage`. `/llms.txt` lists 105 entries. Sitemap dates
each post to its own real date.

Incomplete / partial, with reasons recorded in `docs/AI_VISIBILITY_SIGNALS.md`: only 7 of 78 posts
carry the strong `quickAnswer` block (signal 1 is partial); the thirteen off-site signals (16–23, 25)
are entirely owner-side; signals 4, 5, 11 and 12 are blocked on owner-supplied facts.

**Known issue, not caused by this work:** `npm run check:readability` reports **111/113**. The two
failures are `/about-us/` (59.7) and `/blog/` (52.4). Neither contains any copy from this change.
`/blog/` is a list page whose score is driven by 78 post descriptions at 21.4 words per sentence, and
it dropped when another session added five new comparison posts to `lib/blog.ts` during this session
(its diff adds those five routes to `scripts/check-readability.mjs`). This is reported, not absorbed.

**Multi-session note:** this tree had at least one other active session throughout. `lib/blog.ts`,
`scripts/check-readability.mjs`, `app/globals.css`, `components/layout/SiteHeader.tsx`,
`app/packages/page.tsx`, `app/services/[slug]/page.tsx` and `plans/seo-content-strategy.md` carry that
session's uncommitted work. It also replaced the inline FAQ `<details>` in `app/blog/[slug]/page.tsx`
with a shared `components/FaqList` **after** this session's build — the two changes coexist cleanly,
but the verified build predates it. Nothing was committed or pushed.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `lib/schema.ts` | Added `SchemaArticle`, `schemaIds.article`, `buildArticleNode()`; `buildPageGraph` takes `article` and prefers `projectId ?? articleId` for `mainEntity` | 78 posts had no article schema (signals 3, 7, schema markup) |
| `components/SchemaGraph.tsx` | Pass `article` through | Wiring only |
| `app/blog/[slug]/page.tsx` | Emit the `BlogPosting` node and `primaryImage`; render the "Who writes these guides" block | Signals 3 and 7 |
| `app/blog/blog.module.css` | New `.postByline` rule | Ruled block, not a third card |
| `app/blog/page.tsx` | Added `CollectionPage` + `BreadcrumbList` schema | The index had none |
| `app/sitemap.ts` | Post `lastModified` = `updated ?? published` | Blanket fallback mis-dated un-revised posts |
| `app/llms.txt/route.ts` | Added the `## Guides` section | 78 guides were invisible to the AI-facing index |
| `DECISIONS.md` | Added D-168 | Record |

## 8. Files Created

- `docs/AI_VISIBILITY_SIGNALS.md` — permanent 25 + 34 coverage matrix, on-site vs off-site split, the
  four honest "no"s, and the owner-side leverage list.
- `plans/ai-visibility-signals-2026-11.md` — work tracker with parallelization metadata.
- `session-history/evidence/2026-11-02-ai-visibility-signals/` — `after-1440-byline.jpg`,
  `after-390-byline.jpg`, `llms-txt-after.txt`.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npx tsc --noEmit` — clean.
- `npm run build --ignore-scripts` — green, 119 static pages, no route-count drop.
- Served HTML, read from `.next/server/app/blog/*.html`: **78/78** contain `"@type":"BlogPosting"`,
  `datePublished`, `dateModified`, `"author":{"@id"`, `"publisher":{"@id"`, `mainEntityOfPage`, and the
  literal strings `Who writes these guides` and `Omar holds NSW Builder Licence 475204C.`
- One full `BlogPosting` node parsed and inspected (timeline post) — all fields correct.
- `/blog/` HTML — `['HomeAndConstructionBusiness','Organization']`, `WebSite`, `CollectionPage`,
  `BreadcrumbList`.
- `/sitemap.xml` — timeline post `2026-09-10` (its `published`), cost post `2026-11-02` (its
  `updated`). Correct.
- `/llms.txt` fetched from `next start` on port **3287** (checked free first): 105 entries across 6
  sections.
- `npm run check:design` — PASS, no baseline exceeded.
- `npm run check:readability` — 111/113. See §6; the two failures are not from this change.
- Browser: 1440 and 390 screenshots of the byline, in the prose column, no overflow, links tappable.

## 11. Performance Impact

Not measured. The change adds no dependency, no `'use client'`, no image and no third-party script.
It adds one JSON-LD node per blog page (a few hundred bytes of inline, non-blocking text) and three
paragraphs of text. No measurable effect expected; `docs/PERFORMANCE_BUDGET.md` was not re-run.

## 12. SEO Impact

- **Schema:** `BlogPosting` on 78 posts; `CollectionPage` + `BreadcrumbList` on the blog index. No
  existing node changed.
- **Metadata:** unchanged. No title, description, canonical or `og:` output was touched.
- **Indexation:** unchanged. No new or removed routes.
- **Sitemap:** 78 `lastmod` values now reflect real content dates.
- **Content:** three new paragraphs per post (the byline). No existing copy changed.
- **Internal linking:** one new link per post to `/about-us/`, plus the tracked `tel:` anchor (a real
  anchor, so the existing delegated call listener covers it — no new tracking code and no
  double-counting).

## 13. Remaining Tasks

### High priority
- Owner-side: keep reviews coming and reply to each (signals 10–13, 17), and confirm the Google
  Business Profile hours match the site (signal 15).
- Owner-side: the deferred citation / directory work in D-142 (signals 14, 18, 21, 25).

### Medium priority
- `/about-us/` (59.7) and `/blog/` (52.4) readability. `/blog/` needs shorter post `description`
  strings, not body-copy edits — it is a list page. Owned by whoever owns `lib/blog.ts` next.
- Signal 1: extend `quickAnswer` beyond the current 7 posts, starting with the buyer-intent ones.
- 34-ways #4, #9, #10: "when should I", "do I need to", "refresh vs full renovation" have no
  dedicated home.

### Low priority
- A `/reviews/` destination for the "[company] reviews" brand query, if the review count grows.
- Signals 4 and 5 once the owner supplies real numbers.

## 14. Open Questions

- Does the Google Business Profile show the same hours as the site? (Signal 15, owner-only.)
- Will the owner supply completed-job counts or variation-frequency data? (Signals 4, 5.)
- Should a `/reviews/` page exist, or does `/about-us/` remain the right home?

## 15. Next Session Handoff

**Inspect first:** `docs/AI_VISIBILITY_SIGNALS.md` — it is the current coverage record and is more
specific than this file. Then `git status --short`; this tree had concurrent sessions and nothing from
this work was committed.

**Continue:** the medium-priority items in §13, in that order.

**Do not change:** the `author`/`publisher` decision (no invented personal byline — D-168); the
`CreativeWork` choice on gallery pages (D-125); the four "not offered" rows in the 34-ways table.

**Context you need:** the 34-ways list is owned by `plans/long-tail-buyer-queries-2026-10.md`, not by
this session's plan. Do not open duplicate issues for it.

**Read:** `docs/AI_VISIBILITY_SIGNALS.md`, `plans/ai-visibility-signals-2026-11.md`,
`plans/long-tail-buyer-queries-2026-10.md`, D-168, D-125, D-03.

## 16. Potential Documentation Updates

Recommended for a later consolidation pass — **not done now**:

- `CLAUDE.md` → Task Routing: add a row mapping "AI visibility / AI citations / answer engines" to
  `docs/AI_VISIBILITY_SIGNALS.md`.
- `CLAUDE.md` → Testing Workflow: the React `<!-- -->` text-splitting lesson belongs next to the
  existing "verify SEO copy is in the served HTML" rule.
- `PROJECT_CONTEXT.md` → the `/llms.txt` mechanic: it is generated from `lib/` data and must be
  extended when a new content type ships.
- `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 → add `BlogPosting` to the expected-schema list for blog
  routes, and `CollectionPage` for index routes.
- `plans/ai-visibility-signals-2026-11.md` → delete once its checklist is fully ticked; its durable
  content already lives in `docs/AI_VISIBILITY_SIGNALS.md` and D-168.

## 17. Conversation-Derived Insights

**Confirmed decisions**
- Both owner-supplied lists are now triaged and recorded; the 25-things list had never been.
- No personal byline, no review dates, no invented statistics.
- Gallery pages keep `CreativeWork`; only blog posts get `BlogPosting`.

**Strong recommendations**
- The remaining leverage is off-site. Thirteen of the 25 signals, and the largest share of the
  outstanding value, sit in reviews and citations — not in more pages.
- `/blog/`'s readability failure is a list-page problem. Fix the post `description` strings; do not go
  hunting through body copy.

**Ideas / proposals (not decided)**
- A `/reviews/` page for the brand query.
- Extending `quickAnswer` across the buyer-intent posts.
- A "refresh vs full renovation" guide for 34-ways #10.

**Unresolved opinions**
- Whether the `quickAnswer` block should become a lighter two-sentence field without the mandatory
  table, so it can reasonably cover all 78 posts rather than 7.
