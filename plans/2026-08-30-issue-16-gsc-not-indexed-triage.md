# Plan — Issue #16: GSC "why pages aren't indexed" report triage

**Date:** 2026-08-30
**Task class:** Third-party SEO tool output (a Google Search Console "Page indexing → not
indexed" export, analysed by ChatGPT). Routed via `CLAUDE.md` → Task Routing: "Third-party SEO
tool report" → `docs/SEO_CONTENT_GUIDE.md` § Report intake ("do not action one as written"), plus
"Sitemap / robots / canonicals / indexation" → `docs/SEO_AEO_GEO_CHECKLIST.md` Phases 0 & 2.

## What issue #16 is

Owner-filed issue titled "fix it". Body is a pasted ChatGPT (gpt-5) conversation analysing a
Google Search Console export of **4 URLs that GSC reports as "not indexed."** ChatGPT's own
verdict in the paste: don't chase the count 4 → 0; the only URL worth SEO time is `/services/`,
and the question to answer is "why isn't `/services/` indexed?" The other 3 are normal
WordPress/Elementor artifacts to ignore.

The 4 URLs:

| URL | ChatGPT's call |
|---|---|
| `https://elitetouchrenovations.au/services/` | Genuine page — investigate why not indexed |
| `https://www.elitetouchrenovations.au/elementor-hf/footer/` | Elementor template — ignore |
| `https://www.elitetouchrenovations.au/elementor-hf/header/` | Elementor template — ignore |
| `https://www.elitetouchrenovations.au/feed/` | WordPress RSS feed — ignore |

## The premise is stale

Three of these four URLs **only ever existed on the old WordPress site.** ETR migrated off
WordPress to a self-hosted Next.js 16 site on Vercel (D-40 / D-68). The Next.js site has no
Elementor and no `/feed/` RSS route. So this GSC export is showing Google's *memory of the old
site* — legacy URLs still in the index that Google has not yet dropped — not a fault in the
current site. This is exactly the migration-cleanup case `MIGRATION.md` §6 and the
`proxy.ts` 410 handler were built for.

ChatGPT correctly guessed the *category* of each URL (Elementor / feed / real page) but was
working only from the URL strings — it never fetched them, and it did not know ETR is no longer
a WordPress site. Its framing ("check your WordPress/Elementor setup is preventing indexing")
does not apply.

## Verification against the live site (not the report's framing)

Every URL was fetched live with a Googlebot user-agent:

| URL | Live result | Assessment |
|---|---|---|
| `https://www.elitetouchrenovations.au/services/` | **HTTP 200**, `<meta name="robots" content="index, follow">`, self-canonical `https://www.elitetouchrenovations.au/services/`, listed in `sitemap.xml`, linked from the main nav on every page (`href="/services/"`), ~1,200 visible words, unique content (hero + 4 service cards + work strip + contact). | **Fully indexable. Nothing is blocking it.** No noindex, no bad canonical, no orphan, not thin. It is a normal "Discovered/Crawled – currently not indexed" case: Google has simply not chosen to index it yet. That resolves itself as the domain accrues crawl trust post-migration; it is not a bug to fix. |
| `https://elitetouchrenovations.au/services/` (non-www) | **HTTP 308** → `https://www.elitetouchrenovations.au/services/` | Correct. `www` is the primary domain (D-68); the non-www form redirects in one hop. The GSC row is the *non-www* URL — it is "not indexed" because it correctly redirects to the canonical www version, which is the desired outcome. |
| `https://www.elitetouchrenovations.au/elementor-hf/header/` | **HTTP 410 Gone** + `X-Robots-Tag: noindex` | Already handled, deliberately. `proxy.ts` returns a genuine 410 for `/elementor-hf/*` precisely so Google drops these permanently (410 = "gone", vs 404 = "maybe later"). The old `elementor-hf-sitemap.xml` that published them now 404s. Nothing to do — Google will de-index on its next crawl. |
| `https://www.elitetouchrenovations.au/elementor-hf/footer/` | **HTTP 410 Gone** + `X-Robots-Tag: noindex` | Same as above. |
| `https://www.elitetouchrenovations.au/feed/` | **HTTP 404** | The Next.js site has no RSS feed. 404 is acceptable here; Google drops 404s eventually (just more slowly than 410s). Optional nicety: add `/feed/` to a 410 list too, so it de-indexes faster — but it is a single low-value URL and 404 already prevents indexing. Not worth a code change on its own. |

Legacy WordPress sitemaps (`/elementor-hf-sitemap.xml`, `/page-sitemap.xml`,
`/sitemap_index.xml`) all **404** — correct, `MIGRATION.md` §6 wanted Google to see them go.

## Verdict

**Nothing to fix. No code change.** The report describes a healthy post-migration state:

1. `/services/` is 100% indexable and correctly configured. Its GSC "not indexed" status is
   the normal "crawled – currently not indexed" holding state a new/migrated domain sits in
   until Google decides the page earns a slot. The remedies for that are *time*, *internal
   links* (already present — it is in the main nav) and *inbound authority* — not a technical
   fix. There is no noindex, no canonical error, no robots block, and the page is not thin.
2. The two `/elementor-hf/*` URLs are **already** returning a deliberate 410 with an explicit
   `noindex` header — the strongest possible "drop this" signal. This was done in `proxy.ts`
   at migration time for exactly these two URLs.
3. `/feed/` returns 404, which also keeps it out of the index.
4. ChatGPT's own conclusion — "don't try to get the count from 4 → 0, that's the wrong goal" —
   is right, and matches this repo's standing Report-intake rule (a tool's list is not a work
   queue).

This is consistent with every prior third-party-report triage in this repo (D-85–D-92,
D-104–D-107, D-110): the tool output is checked against the live site and the real codebase, and
where the live site is already correct, no work is manufactured.

**Optional, non-urgent:** if the owner wants the two legacy URLs and `/feed/` gone from the
index *faster*, the only lever is GSC's "Removals" tool (temporary) plus waiting for the 410/404
to be re-crawled. Not recommended as necessary — they will drop on their own.

## What would reopen this

- `/services/` still absent from `site:elitetouchrenovations.au/services/` **3+ months** from
  now, **with** GSC showing "Crawled – currently not indexed" *and* a specific, verifiable
  technical cause (a real noindex tag, a wrong canonical, a robots block) — checked the same
  way this was, live, not from a tool's summary.
- A *new* crop of machine-generated URLs appearing in GSC that are **not** WordPress legacy and
  **not** already 410'd — i.e. something the current Next.js site is actually emitting.

## Checklist

- [x] Read the full issue #16 body (pasted ChatGPT analysis of a GSC not-indexed export)
- [x] Routed via `CLAUDE.md` → `docs/SEO_CONTENT_GUIDE.md` § Report intake +
      `docs/SEO_AEO_GEO_CHECKLIST.md` Phases 0 & 2; checked `DECISIONS.md` D-68, D-41, D-110,
      `proxy.ts`, `MIGRATION.md` §6
- [x] Fetched all 4 URLs live (Googlebot UA): `/services/` 200 + indexable, `/elementor-hf/*`
      410 + noindex, `/feed/` 404
- [x] Verified `/services/` has `index, follow`, self-canonical, sitemap entry, nav link,
      ~1,200 words of unique content — nothing blocking indexation
- [x] Verified legacy WordPress sitemaps all 404
- [x] Verdict recorded in `DECISIONS.md` (D-111)
- [x] Issue #16 closed with a comment summarising this triage and linking this plan
