# Plan — 2026-09-27 Search Console report gap-fill

## Source

Owner supplied two Google Search Console "Performance" screenshots (Pages tab and Queries tab,
28-day window 2026-08-28 → 2026-09-24, property `elitetouchrenovations...`, filter Web (text)):

- Totals: 14 clicks, 5.35K impressions, 0.3% average CTR, 39.2 average position.
- Pages: `elitetouchrenovations.au/` and `www.elitetouchrenovations.au/` both appear separately;
  `/gallery/` (658 impr, 0 clicks, pos 66.3); `/services/` (1,828 impr, 0 clicks, pos 59.0);
  `/services/bathroom-renovations/eastern-suburbs/` (381 impr, 0 clicks, pos 42.3);
  `/gallery/castle-hill-bathroom/` (281 impr, 0 clicks, pos 22.9); `/packages-deals/` (53 impr,
  1 click, pos 33.8).
- Queries: "ensuite renovations" (1 click, 10 impr, pos 31.7), "elite touch massage" (1 click,
  5 impr, pos 2.2 — unrelated brand-confusion query, not actionable), then 0-click suburb/topic
  queries: hornsby (222 impr, pos 34.7), eastern suburbs (185 impr, pos 40.2), artarmon (139 impr,
  pos 32.5), castle hill (109 impr, pos 21.5), pymble (109 impr, pos 68.4), "bathroom lighting
  ideas" (96 impr, pos 18.3), seven hills (79 impr, pos 41.3), "bathroom renovation package"
  (77 impr, pos 35.9).

## Investigation (done before writing any code)

1. Confirmed apex → www redirect is live and correct: `curl -I https://elitetouchrenovations.au/`
   returns `308` to `https://www.elitetouchrenovations.au/`. Both host variants showing separately
   in GSC is expected residual indexing after a migration, not a bug — no fix available on our side.
2. Confirmed `/packages-deals` still 301s to `/packages/` in `next.config.ts`. Its lingering GSC
   impressions are Google's index catching up, not a redirect defect.
3. Checked `service-areas.json`: Castle Hill is a published Tier-1 page
   (`/services/bathroom-renovations/castle-hill/`); Eastern Suburbs is a Tier-2 hub
   (`/services/bathroom-renovations/eastern-suburbs/`). Both already received on-page work in the
   2026-09-14 gap-fill session (`plans/2026-09-14-search-performance-gap-fill.md`).
4. Fetched the live Castle Hill service page: title, H1 and meta description are already
   keyword-aligned and specific. Fetched the live `castle-hill-bathroom` gallery project page:
   already has a real, specific `metaDescription` and per-image alt text.
5. Checked `lib/blog.ts` for a "bathroom lighting ideas" post — one already exists
   (`bathroom-lighting-ideas`, published 2026-09-12) and is almost certainly what ranks for that
   query at position 18.3, the best position of any 0-click query in the report and within striking
   distance of page 1. Fetched it live: it is the thinnest post on the site — 3 sections of 2 short
   paragraphs each (~150 words), no `quickAnswer` block, no FAQ, no photo, "1 min read". Every other
   post of comparable or better ranking has more depth.
6. Checked `app/blog/[slug]/page.tsx`: `BlogPost` supports an optional `quickAnswer` block (used by
   several posts) but has no FAQ field at all — no blog post currently has one, even though
   `docs/SEO_CONTENT_GUIDE.md` §4 requires an FAQ block sitewide. Service pages already have this
   pattern end-to-end (`app/services/[slug]/page.tsx` renders `faqs` as `<details>/<summary>` cards
   and passes the same array to `<SchemaGraph faqs={...}>` for `FAQPage` schema).

## Conclusion

The GSC numbers (avg. position 39.2, 0.3% CTR, 14 clicks) mostly reflect a site that is roughly a
month past its rebuild/migration with limited off-site authority (D-142: off-site citation work is
owner-deferred) — not a defect this session can fix by editing code. Almost all suburb queries sit
at position 20–70, where CTR is near zero regardless of snippet quality; that requires backlinks/
citations and time, both outside this session's scope.

One item is a genuine, evidenced, in-scope improvement: **`/blog/bathroom-lighting-ideas/`** is
already earning page-2 impressions on a thin, sub-checklist post. Strengthening it is a real
quick-win candidate and is squarely a copy/content task under
[docs/SEO_CONTENT_GUIDE.md](../docs/SEO_CONTENT_GUIDE.md) §4 and
[docs/CONTENT_QUALITY_CHECKLIST.md](../docs/CONTENT_QUALITY_CHECKLIST.md).

## Checklist

- [x] Investigate GSC screenshots against live site and codebase (above).
- [x] Add optional `faq` field to `BlogPost` (lib/blog.ts), reusing the exact FAQ pattern and
      `SchemaGraph` wiring already used on service pages.
- [x] Add optional `updated` field to `BlogPost` for genuine content-freshness signals, separate
      from `published` (never backdating, never faking freshness — CLAUDE.md Documentation
      Workflow).
- [x] Render the FAQ block + pass `faqs` to `SchemaGraph` in `app/blog/[slug]/page.tsx`; show
      "Updated" in the `PageHero` facts row when `post.updated` is set.
- [x] Allow a blog post to attach a real project photo as its hero image, reusing `PageHero`'s
      existing `image={{ project, imageIndex }}` prop (already used elsewhere, never a stock/generic
      image — D-83/D-06).
- [x] Rewrite `bathroom-lighting-ideas`: add a `quickAnswer` block, expand sections with concrete,
      generic (non-ETR-specific) lighting-layer guidance, attach the real Castle Hill LED-mirror
      photo (`double-vanity-led-mirror.webp`, already in `lib/projects.ts`) as the hero image, add
      5 real FAQ questions. No invented ETR-specific facts or claims beyond what's already recorded.
- [x] Bump `service-areas.json`/sitemap only if this post's route needs a fresher `lastmod` — check
      `app/sitemap.ts` blog mapping first. (Changed the blog sitemap mapping to read each post's own
      `updated ?? ISSUE_64_CONTENT_PASS`, matching how services/projects already work.)
- [x] Build, typecheck, `check:readability` (this route is already gated at ≥60), served-HTML grep
      for the new copy and `FAQPage` schema, browser check at desktop + 390px.
- [x] Record the FAQ-on-blog-posts pattern as D-148 in `DECISIONS.md`.
- [x] Session handoff.

## Outcome

Implemented and verified 2026-09-27. See `DECISIONS.md` D-148 and
`session-history/2026-09-27-gsc-report-gap-fill.md` for full detail. Build green (58 routes,
no drop), typecheck clean, readability 48/48 ≥ 60 (`bathroom-lighting-ideas` 70.5, 922 words),
served HTML and Playwright screenshots confirmed. No push or deploy performed.

## Explicitly out of scope this session

- No new suburb pages (D-10 still stands; nothing in this report is new volume evidence).
- No off-site/citation/backlink work (owner-deferred, D-142).
- No change to the four-service scope, pricing, licence, warranty or review copy.
- No push or deploy.
