# Issue #35 — Regional hubs: de-template with local content, FAQ, testimonial, answer-first lead

**From:** `plans/2026-08-31-seo-master-plan.md` §4 Phase C · `plans/2026-08-31-seo-local-audit.md` **#4** + §7
· `plans/2026-08-31-seo-content-audit.md` **C-3** · `plans/2026-08-31-seo-geo-audit.md` **G-2**.
**Issue:** #35. **Depends on:** #17 (dead Tier-1 links — CLOSED, verified). Pairs with #31, #40. Mirrors #34.

## Problem (from the audits)

The 3 published regional hubs (`/services/bathroom-renovations/{hills-district,eastern-suburbs,north-shore}/`)
are swap-test-fragile. The hero paragraph and the "What you get, whichever suburb you are in" block read
identically with the region name changed. Only the local project photos and the suburb list are genuinely
non-swappable. No local FAQ, no testimonial, no pricing context, no answer-first lead. This is the thin/
doorway pattern the Tier-1/Tier-2 split (D-10) exists to avoid; the ranking bar competitors clear is
*area-specific detail* (`docs/BATHROOM_SITE_STRUCTURE.md` §"Competitive landscape").

## Route read (CLAUDE.md)

`DESIGN.md` (no new tokens; reuse `et-card` + `<details>` FAQ pattern shipped for powder-room, D-107),
`docs/SEO_CONTENT_GUIDE.md` §5 (how not to make location pages thin), `docs/BATHROOM_SITE_STRUCTURE.md`
(competitive landscape / area angles), `docs/CONTENT_QUALITY_CHECKLIST.md` (Flesch ≥ 60),
`docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 (FAQPage where a real visible FAQ exists),
`Customer Reviews.md` / `lib/reviews.ts` (verbatim testimonial), `DECISIONS.md` D-06 (no invented
suburb/heritage/project claims), D-10/D-73/D-74 (structure settled), D-107 (FAQ pattern precedent).

## Solution

New `lib/hubContent.ts` — a `Record<regionSlug, HubContent>` keyed by `hills-district`,
`eastern-suburbs`, `north-shore`. Same "content is data" shape as `services[].about/faqs` in
`lib/businessInfo.ts`. Rendered by `app/services/[slug]/[location]/page.tsx`. A region with no entry
still renders (progressive) — the new sections just don't appear.

`HubContent` fields:
- `answer`: string[] — the answer-first lead, 2 short paragraphs, **134–167 words total** (G-2 spec):
  names the service, rough cost + size basis + link to `/packages/`, rough duration, licence 475204C
  + 10-yr warranty, and one area-specific line.
- `localAngle`: `{ heading: string; paragraphs: string[] }` — 2–3 paragraphs of **truthful, non-invented**
  local detail. Nothing suburb-specific that can't be evidenced (D-06). General Sydney housing-stock and
  renovation-logistics facts only:
  - Hills District — "Garden Shire" character, larger freestanding homes on bigger blocks, established
    brick homes (Baulkham Hills/Castle Hill/Cherrybrook) vs newer slab-on-ground estate housing
    (Kellyville Ridge/Rouse Hill/Stanhope Gardens), acreage suburbs (Dural/Galston/Kenthurst), easy
    on-site skip/parking access.
  - Eastern Suburbs — Victorian/Federation terraces and semis (Paddington/Woollahra/Randwick/Bronte),
    heritage conservation areas, older clay drainage and galvanised/lead supply lines, timber floors;
    apartment/strata density along the beaches and ridge (Bondi/Bondi Junction/Rose Bay/Coogee) with
    owners-corporation approval, common-property waterproofing, restricted hours; narrow streets and
    permit parking → skip permits and small-truck deliveries.
  - North Shore — leafy established Federation / interwar / mid-century homes, Ku-ring-gai heritage
    conservation areas (Roseville/Lindfield/Killara/Pymble/Wahroonga), suspended timber floors on brick
    piers and sloping bushland blocks (Castlecrag/Northbridge), one small original bathroom + separate
    toilet is common; apartment clusters around the rail line and town centres
    (Chatswood/St Leonards/North Sydney/Hornsby) → strata process and building access.
- `faqs`: `{ question; answer }[]` — 4–6 local-intent Q&A. Answers pull only from real ETR facts
  (package from-prices with size basis, free on-site measure, 3–4 / 5–6 / 5–7 week durations, AS 3740,
  licence 475204C, 10-yr warranty, strata reality). Visible `<details>` + `FaqSchema` (same items).

Page render order after the hero:
1. **Answer-first block** (`et-band-surface`) — `answer` paragraphs, eyebrow + question-shaped H2,
   inline `/packages/` link.
2. Existing local-project section (unchanged).
3. **"Renovating a bathroom in {region}" local-detail section** (`et-band-canvas`) — `localAngle`.
4. **Testimonial** (`et-band-ink`, `et-card-dark` figure) — verbatim, not attributed to the area:
   Hills District → Ken Chen; Eastern Suburbs → Kieran C; North Shore → Huseyin Sumaktas.
5. Existing suburb list (unchanged).
6. Existing "Compare areas and package options" (unchanged — already links `/packages/` + siblings).
7. **Local FAQ** (`et-band-surface`) — visible `<details>` + `FaqSchema`.
8. Existing "What you get, whichever suburb you are in" (kept — carries licence/insurance/warranty
   trust signals, and is now one section among several unique ones, not the only substance).
9. `ContactSection` (unchanged).

`service-areas.json` — bump the 3 published regions' `updated` to `2026-09-02` and the file
`lastUpdated`; this is a genuine content change and flows to the sitemap `lastmod` + the on-page
"Reviewed {month}" caption.

**Out of scope (own issues):** per-hub `Service` schema + `@id` (#31), internal links *into* the hubs
+ gallery→hub links (#40), publishing Inner West / North-Western hubs (deferred, owner-gated D-76).

## Checklist

- [x] Task routed; mapped docs read; `DECISIONS.md` checked (D-06 / D-10 / D-73 / D-107 govern)
- [x] `lib/hubContent.ts` created — 3 regions, all content truthful and non-invented (D-06)
- [x] Answer block 134–167 words per region (154 / 145 / 158); names service, cost+size, duration, licence, warranty, area line
- [x] `app/services/[slug]/[location]/page.tsx` renders answer block, local-detail, testimonial, FAQ
- [x] FAQ visible `<details>` + `FaqSchema` with byte-identical items (5/5, verified in served HTML)
- [x] Testimonials verbatim from `lib/reviews.ts` via `reviewByAuthor()`, not attributed to the area
      (Hills → Ken Chen, Eastern → Kieran C, North Shore → Huseyin Sumaktas)
- [x] Existing local-project section + suburb list retained
- [x] `service-areas.json` `updated` bumped for the 3 published regions + `lastUpdated`
- [x] Manual swap test: each `localAngle` reads wrong with another region's name (grep-confirmed
      distinctive phrases unique per hub)
- [x] `npm run build` green; route count holds (32, no drop)
- [x] `npm run check:readability` — 3 hubs 70.2 / 72.2 / 73.0 (all ≥ 60); 26/26 pages pass
- [x] `curl` the 3 hubs — answer copy, local-detail copy, testimonial, FAQ markup + `FAQPage` JSON-LD,
      `/packages/` link all in the served HTML
- [x] Browser check desktop + 390px (Playwright — correct H2 order, 5 FAQ cards, right testimonial,
      2 `/packages/` links, no horizontal scroll)
- [x] `DECISIONS.md` D-121; `plans/2026-08-31-seo-local-audit.md` (#4) + master-plan registry + `PROJECT_CONTEXT.md` updated
- [ ] Issue #35 closed with a summary comment
- [ ] Committed (note: multiple agent sessions active; issue-#35 code already landed in commit 867e30c
      via the owner's `git add -A`; docs updates remain uncommitted)
