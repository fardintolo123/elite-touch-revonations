# Issue #19 implementation plan - buildMetadata() helper

**Date:** 2026-09-04
**Issue:** #19 - `[seo-tech] H-2 · Per-page og:url via a shared buildMetadata() helper`
**Source:** `plans/2026-08-31-issue-15-seo-technical-audit.md` H-2; `plans/2026-08-31-seo-master-plan.md` Phase B (the "keystone" issue — enables #20, #21, coordinates with #38)
**Status:** SHIPPED 2026-09-04

## Problem

`app/layout.tsx` sets a sitewide `openGraph.url: businessInfo.siteUrl` (the homepage). Next.js
merges metadata SHALLOWLY between layout and page — duplicate keys are replaced, not deep-merged —
and no page set its own `openGraph.url`, so **every page shipped `og:url` = the homepage**. Verified
live in the served HTML on `/packages/`, `/about-us/`, `/services/`, `/contact-us/`, `/gallery/`, the
hub pages. Sharing any of those pages on Facebook/LinkedIn/Slack/WhatsApp produced a card linking back
to the homepage, not the shared page.

The one page family that DID set its own `openGraph` (`/gallery/{slug}/`, for `og:type: 'article'`)
had the opposite problem: setting `openGraph` REPLACED the layout's object entirely, so those 11
pages were serving **no `og:site_name`, no `og:locale`, and no `og:url` at all**, and `og:title` was
frozen at the raw project name (e.g. "Artarmon bathroom renovation") without the templated
" | Elite Touch Renovations" suffix every other page's `og:title` carries.

## Plan

1. Route and read: `CLAUDE.md`, `DECISIONS.md`, the technical audit H-2 finding, the master plan
   Phase B. Read Next 16's metadata-merging docs directly
   (`node_modules/next/dist/docs/.../generate-metadata.md`) rather than assume — this is exactly the
   kind of breaking-change area `CLAUDE.md`'s "this is NOT the Next.js you know" banner warns about.
2. Confirm empirically (not just from docs) how metadata actually resolves in this app: built the
   site once before touching anything, diffed `og:site_name`/`og:locale`/`og:url`/`og:title` between
   a layout-only page and a page-level-`openGraph` page, and confirmed the title-template segment
   rule (`title.template` in the root layout does not apply to `app/page.tsx` because it is the same
   route segment as the layout — that page's title must be self-suffixed; every other page one level
   below auto-suffixes).
3. Add `lib/metadata.ts` — one `buildMetadata({ path, title, description, type?, images? })` helper
   returning `title`, `description`, `alternates.canonical`, and a full `openGraph` object
   (`type`, `locale`, `siteName`, `url`, optional `images`). Deliberately does NOT set
   `openGraph.title`/`description` — Next auto-fills both from the page's own (already
   title-templated) `title`/`description` when `openGraph` sets neither, which is also what feeds
   `twitter:title`/`description`. Setting them explicitly would have frozen `og:title` un-templated,
   the exact bug the gallery pages already had.
4. Migrate every page's `metadata` export / `generateMetadata` return through the helper — all 11
   metadata sources: home, about, contact, packages, services index, terms, privacy, gallery index,
   gallery detail (`type: 'article'`, `images`), service detail, location hub. Pure refactor — every
   title/description string kept byte-identical; only the object construction changed.
   `app/not-found.tsx` and the two dynamic-route "not found" branches are deliberately left alone —
   noindex 404s do not need a canonical `og:url`.
5. Verify: typecheck, production build (32 routes, no drop), a full sweep of every built page's
   `og:url`/`og:site_name`/`twitter:description`, readability (unaffected — no visible copy changed),
   and a byte-check that visible H1/body text is unchanged.
6. Update the audit tracker, master-plan registry, and `DECISIONS.md`. Close #19; note #20/#21/#38
   can now route new/updated titles through `buildMetadata()`.

## Checklist

- [x] Task routed; mapped docs read; Next 16 metadata-merge behaviour confirmed from the vendored
      docs and from the built HTML, not assumed.
- [x] `lib/metadata.ts` `buildMetadata()` added.
- [x] All 11 page metadata sources migrated (home, about-us, contact-us, packages, services index,
      terms, privacy, gallery index, gallery detail, service detail, location hub).
- [x] No title/description copy changed — pure refactor, diffed against the pre-change build.
- [x] `npx tsc --noEmit` clean.
- [x] `npm run build` green — 32 routes, no drop.
- [x] Full-site sweep: every built page's `og:url` matches its own canonical URL (was: homepage on
      every non-gallery page); `og:site_name` present on every page (was: missing on all 11 gallery
      pages); `twitter:description` present on every page (auto-fill confirmed working).
- [x] `og:title` on gallery pages now carries the " | Elite Touch Renovations" suffix (was missing).
- [x] `npm run check:readability` 26/26 ≥ 60 (unaffected, confirmed).
- [x] Audit tracker (`plans/2026-08-31-issue-15-seo-technical-audit.md`) H-2 + Phase 2 checkbox
      updated.
- [x] Master-plan registry (`plans/2026-08-31-seo-master-plan.md`) #19 row updated.
- [x] `DECISIONS.md` decision recorded.
- [x] GitHub issue #19 closed with verification notes.
