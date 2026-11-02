# Plan — AI visibility signals + buyer-query coverage (2026-11-02)

**Outcome owned:** check Elite Touch against the two owner-supplied lists — Neil Patel's "25 Things
AI Looks at to judge Your Business" and "34 Ways Customers Search For You" — and close every gap
that lives in this repository. Owner-side gaps are named, not silently absorbed.

**Status:** DONE 2026-11-02 — audit complete, every repo-side gap closed and verified (D-168). The durable coverage matrix lives
in [docs/AI_VISIBILITY_SIGNALS.md](../docs/AI_VISIBILITY_SIGNALS.md), which is the permanent record —
this plan only tracks the work.

---

## Why this is not a duplicate of #80

`plans/long-tail-buyer-queries-2026-10.md` already owns the **34-ways** list as a Search Console
workstream (child issues #81, #82, #85). That tracker stays the owner of those content gaps. This
plan does not re-open them.

The **25-things** list has never been triaged here. It is a different question: not "what do buyers
type", but "what does an answer engine read before it names you". That is what this plan closes.

## Repo-side findings (2026-11-02)

| # | Signal | State found |
|---|---|---|
| 3 | Last-updated date | Rendered on the post page, but **absent from structured data** — 78 posts carried no `datePublished` / `dateModified` at all |
| 7 | Author bio | **Missing.** No byline, no author block, no `author` in schema on any of 78 posts |
| 24 | Topic depth | 78 guides exist but **`/llms.txt` listed none of them** — the AI-facing index showed a 15-page site |
| — | Schema markup | Blog posts emitted `WebPage` + `FAQPage` only. The blog index emitted **no schema at all** |
| 3 | Freshness accuracy | `app/sitemap.ts` dated un-revised posts to a blanket `ISSUE_64_CONTENT_PASS` (2026-09-20) instead of their real `published` date |

`Article` was deliberately rejected for `/gallery/` pages in **D-125** because there was no exact
publish date, no byline and no logo asset. All three now exist for blog posts: every post carries a
real `published` date, `businessInfo.schema.logo` ships, and the publisher is the business itself.
D-125's reasoning is respected, not reversed — gallery pages keep `CreativeWork`.

## Checklist

- [x] `lib/schema.ts` — `schemaIds.article` + `buildArticleNode()`; wire `article` through `buildPageGraph`
- [x] `components/SchemaGraph.tsx` — pass `article` through
- [x] `app/blog/[slug]/page.tsx` — emit the `BlogPosting` node; render a visible publisher/author block
- [x] `app/blog/page.tsx` — `CollectionPage` + breadcrumb schema on the blog index
- [x] `app/sitemap.ts` — post `lastModified` = `updated ?? published`
- [x] `app/llms.txt/route.ts` — add the `## Guides` section
- [x] `docs/AI_VISIBILITY_SIGNALS.md` — the 25 + 34 coverage matrix, owner-side items separated
- [x] Verify: typecheck, production build, served HTML, readability, redirects
- [x] `DECISIONS.md` row + session handoff

## Explicitly not done (and why)

- **No fabricated author.** The byline is the business, not a person who did not write the post.
  `author` and `publisher` both resolve to the existing business `@id`.
- **No invented `dateModified`.** Posts without a real `updated` fall back to `published`.
- **No review dates** (signal 11, review recency) and **no owner replies** (signal 12). Neither
  exists in `Customer Reviews.md`; inventing either breaks D-03.
- **No statistics or original data** (signals 4, 5) beyond what the owner has already supplied.
- **No competitor or "alternatives to" pages** (34-ways #15, #16) — held on Australian Consumer Law
  risk, per `plans/long-tail-buyer-queries-2026-10.md`.
- **No finance copy** (34-ways #22, #32) — the business offers a 30/40/30 progress schedule and no
  finance. The schedule is already published; implying finance would be false.
- **No emergency or same-day service** (34-ways #20, #26) — D-02.

## Parallelization

- Can run in parallel: NO
- Depends on: None, but `lib/blog.ts` was being edited by another session on 2026-11-02 — this work
  reads that file and must not write to it.
- Files owned:
  - lib/schema.ts
  - components/SchemaGraph.tsx
  - app/blog/[slug]/page.tsx
  - app/blog/page.tsx
  - app/sitemap.ts
  - app/llms.txt/route.ts
  - docs/AI_VISIBILITY_SIGNALS.md
  - plans/ai-visibility-signals-2026-11.md
- Must not modify:
  - lib/blog.ts, lib/businessInfo.ts, lib/reviews.ts, app/globals.css, scripts/check-readability.mjs
- Acceptance criteria:
  - Every `/blog/{slug}/` page serves one `BlogPosting` node carrying `headline`, `datePublished`,
    `dateModified`, `author`, `publisher` and `mainEntityOfPage`.
  - Every post page shows a visible publisher line naming Elite Touch and the NSW licence.
  - `/llms.txt` lists all published guides.
  - `/sitemap.xml` dates each post to its own real date.
- Verification:
  - `npx tsc --noEmit`; `npm run build`; grep `.next/server/app/blog/**.html` for `BlogPosting`,
    `datePublished` and the publisher line across every post; `npm run check:readability`.
