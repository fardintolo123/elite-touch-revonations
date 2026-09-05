# Issue #21 implementation plan - trim two over-length titles

**Date:** 2026-09-04
**Issue:** #21 - `[seo-tech] M-5 · Trim two over-length <title> tags`
**Source:** `plans/2026-08-31-issue-15-seo-technical-audit.md` M-5; unblocked by #19 (`buildMetadata()`)
**Status:** SHIPPED 2026-09-04

## Problem

`/packages/` `<title>` = "Bathroom Renovation Cost & Packages | Elite Touch Renovations" (61 chars,
and the `&` widens it further in pixels). `/services/laundry-renovations/` `<title>` = "Bathroom and
Laundry Renovations Sydney | Elite Touch Renovations" (65 chars). Both risk pixel-truncation in
SERPs; `docs/SEO_AEO_GEO_CHECKLIST.md` caps titles at 60 chars.

A prior attempt at this issue (2026-09-01, per the issue's own comment thread) was started and
backed out because `lib/businessInfo.ts`, `app/services/[slug]/page.tsx` and `app/packages/page.tsx`
all had large uncommitted concurrent work at the time. Re-checked both files' git status immediately
before editing this time; both were clean.

## Plan

1. Confirm the exact budget: the fixed template tail `" | Elite Touch Renovations"` is 26 chars, so
   any short title must be <= 34 chars total to land at <= 60.
2. `/packages/`: no fact changes needed. New title "Bathroom Renovation Cost, Sydney" (32 chars, 58
   with tail) drops "& Packages" — every heading on the page still says "packages" throughout, and
   the new wording is a closer match to the page's actual primary keyword ("bathroom renovation cost
   sydney", D-104) than the old one was.
3. `/services/laundry-renovations/`: checked every combination that keeps "Bathroom" + "Laundry" +
   "Renovations" + "Sydney" all spelled out — none fits <= 34 chars. Rather than invent an
   abbreviation ("Reno") that appears nowhere else in the site's copy, added an optional
   `metaTitle: 'Bathroom + Laundry Renovations'` field to that one service record (reusing the
   existing, already-displayed `title` value — no new copy) and read it in `generateMetadata` via
   `'metaTitle' in service ? service.metaTitle : service.h1`, so the other three services (whose full
   titles already fit) are untouched. The H1, meta description and breadcrumb schema on the laundry
   page all still say "Sydney" — only the `<title>` tag drops it.
4. Both routed through #19's `buildMetadata()` helper (already in place on both pages), so `og:title`
   picks up the new value automatically.
5. Verify: typecheck, build, served-title character counts on both pages plus one unaffected control
   page, readability (unaffected).
6. Update the audit tracker, master-plan registry, `DECISIONS.md`. Close #21.

## Checklist

- [x] Re-checked `lib/businessInfo.ts` / `app/services/[slug]/page.tsx` / `app/packages/page.tsx`
      git status immediately before editing — all clean (the cause of the earlier backed-out attempt).
- [x] `/packages/` title trimmed to "Bathroom Renovation Cost, Sydney" (58 chars w/ tail).
- [x] `laundry-renovations` `metaTitle` field added; `generateMetadata` reads it via `'in'` narrowing.
- [x] Other three services' titles confirmed unchanged (control check on `bathroom-renovations`).
- [x] No H1, meta description, or visible copy changed on either page.
- [x] `npx tsc --noEmit` clean.
- [x] `npm run build` green — 32 routes, no drop.
- [x] Served HTML: both titles <= 60 chars, `og:title` matches.
- [x] `npm run check:readability` 26/26 >= 60.
- [x] Audit tracker + master-plan registry updated.
- [x] `DECISIONS.md` D-127 recorded.
- [x] GitHub issue #21 closed with verification notes.
