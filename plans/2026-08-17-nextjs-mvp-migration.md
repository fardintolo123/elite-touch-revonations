# Plan — Next.js 16 MVP + WordPress migration/redirect layer

**Date:** 2026-08-17
**Task class:** new codebase + SEO migration. Routed via `CLAUDE.md` → Task Routing:
`DESIGN.md` (visual), `docs/SEO_AEO_GEO_CHECKLIST.md` (indexation/canonicals/schema),
`docs/PERFORMANCE_BUDGET.md` (this adds the entire site's weight), `DECISIONS.md` (D-01, D-11,
D-30, D-34), `Customer Reviews.md` (proof copy), `docs/BATHROOM_SITE_STRUCTURE.md` (routes).

## Goal

Stand up the Next.js 16 App Router MVP (Home, About Us, Contact Us + service routing) and a
migration layer that moves the live WordPress site (`elitetouchrenovations.au`, Yoast + Elementor)
onto it without losing search equity.

## What the live site actually is (from the owner's sitemap screenshots)

`page-sitemap.xml` — 8 URLs: `/`, `/services/`, `/calendly/`, `/packages-deals/`, `/packages/`,
`/artarmon-bathroom-renovation/`, `/gallery/`, `/about-us/`.
`elementor-hf-sitemap.xml` — 2 URLs: `/elementor-hf/header/`, `/elementor-hf/footer/`.

Both are indexable today. The two `elementor-hf` entries are Elementor template stubs that should
never have been in a sitemap — they are the clearest quick win.

## Decisions this plan makes (record in DECISIONS.md on completion)

| # | Decision | Reason |
|---|---|---|
| 1 | **`trailingSlash: true`** | Every live URL ends in `/`. Next's default (`false`) would add a 308 hop to `/about-us` on *every* legacy inbound link and backlink. Preserving the exact indexed URL is worth more than the cosmetic slash-less form. |
| 2 | **Literal `statusCode: 301`, not `permanent: true`** | `permanent: true` emits **308**. Google treats them alike, but the brief specifies 301 and some legacy clients/CDN log pipelines still handle 301 more predictably. Next supports `statusCode` *instead of* `permanent` — never both. |
| 3 | **410 via `proxy.ts`, not `headers()`** | `headers()` in `next.config` can only *add headers*; it cannot set a status code. A 410 requires returning a real `Response`. |
| 4 | **`proxy.ts`, not `middleware.ts`** | Next 16 deprecated and renamed the convention. Function export must be named `proxy`. Node runtime only. |
| 5 | **No Tailwind, no component kit, no animation lib** | `DESIGN.md` is already a complete CSS-custom-property system. Adding Tailwind would be the "second design system" `CLAUDE.md` forbids, and D-30/D-34 forbid the kit + motion deps. Runtime deps: `next`, `react`, `react-dom`. Nothing else. |
| 6 | **Services are data-driven** (`lib/services.ts` + one `[slug]` renderer) | Architecture Rules: "content is data". `dynamicParams = false` so no record can leak an unintended URL (framework trap #4). |

## Conflicts found — flag, don't silently resolve

1. **Route collision with D-11.** `docs/BATHROOM_SITE_STRUCTURE.md` + D-11 settle the bathroom
   service at `/bathroom-renovations/` with suburb pages beneath it. The brief puts it at
   `/services/bathroom-renovations/`. Both cannot be the canonical bathroom page — that is
   self-cannibalisation. Build the brief's structure (owner instruction outranks D-11, which is
   AGENT-status), and surface the collision for a decision before location pages are built.
2. **`/services/laundry-renovations/` vs D-01.** The confirmed service is **bathroom *and* laundry**
   renovations, not standalone laundry. Keep the client's existing slug (it is their URL and may
   hold equity), but the H1 and body copy must say "Bathroom + Laundry Renovations" so the page
   never advertises a trade ETR has not confirmed.
3. **The 15 `/staging/` URLs are not in either sitemap.** They may never have been indexed. The
   redirects are cheap insurance either way, but confirm against Search Console before treating
   this as a fix for a known problem.
4. **A 301 into a 404 is worse than no 301.** Every destination in the table must resolve 200
   *before* this ships. That is why the service subpages are built as real routes now, not later.

## Steps

- [x] 1. Scaffold Next 16 + TS manually (no `create-next-app` bloat); `npm install`
- [x] 2. `app/globals.css` — paste the §11 token block from `DESIGN.md` verbatim; no new tokens
- [x] 3. `lib/businessInfo.ts` — single source of truth for licence/phone/founded/services
- [x] 4. `lib/reviews.ts` — verbatim from `Customer Reviews.md`, attributed as written
      *(caught and fixed: I had normalised 9 straight apostrophes to curly, breaking D-03 verbatim)*
- [x] 5. Layout + header/footer (tel: anchors only, per D-33)
- [x] 6. Pages: `/`, `/about-us`, `/contact-us`, `/services`, `/services/[slug]`, `/gallery`, `/packages`
- [x] 7. `not-found.tsx` with explicit `robots` override (trap #3)
- [x] 8. `next.config.ts` — 19 × 301 + `trailingSlash: true`
- [x] 9. `proxy.ts` — 410 for `/elementor-hf/*`
- [x] 10. `app/sitemap.ts` + `app/robots.ts` — replace Yoast's output
- [x] 11. `MIGRATION.md`
- [x] 12. **Gate:** build green; **34/34 checks pass** against a running production build
      (`npm run verify:redirects`), including following every 301 to assert its destination is 200.
- [x] 13. Browser verification at 1440px and 390px: 0 console errors, no horizontal overflow,
      tap-to-call above the fold, 4 `tel:` anchors and 0 `<button>` call CTAs, all buttons ≥ 44px.
      *(Two real defects found and fixed this way: the header phone number wrapped mid-digits at
      390px, and the header CTA was `sm`/40px when DESIGN.md §8.9 specifies `md` and §10 requires
      ≥44px.)*
- [x] 14. Docs updated — D-40…D-48 recorded, D-11 marked in conflict, O-1/K3 partially resolved,
      `PROJECT_CONTEXT.md` §6 codebase mechanics added, stale "18 reviews" corrected to 19 in two files.

## NOT done — carry forward

- [ ] **Lighthouse baseline.** `docs/PERFORMANCE_BUDGET.md` §4 wants a recorded before/after row and
      it is still empty. Measured so far, homepage, gzipped: **~173 kB JS**, 3.7 kB CSS, 7 kB HTML,
      26 kB font. That is **over the ≤150 kB "shared by all routes" line** and under the ≤230 kB
      per-route cap — but the figure includes prefetched route chunks, so it is not a like-for-like
      comparison with Next's own First Load JS metric. **Do not claim budget compliance until a
      production Lighthouse run is recorded in §4.**
- [ ] Commit. Left uncommitted deliberately — not requested, and D-35 forbids push/deploy.

## Out of scope (say so explicitly in the summary)

Real page copy beyond the MVP three, the 6 Tier-1 + 4 hub location pages, the gallery images
(blocked on K9 — no asset directory decided), package inclusion tables, schema beyond
LocalBusiness, analytics/call tracking (K4 — must be settled before any tag is added).

## Standing constraints that bind this task

- No invented facts. No warranty number (D-19/K2b). No price without its size basis (D-07).
- No testimonial that is not in `Customer Reviews.md` (D-03).
- No image used anywhere — the D-36 pipeline has not cleared Approve→Commit, and K9 has not
  chosen an asset directory. Ship the MVP with typography and colour only.
- Do not push or deploy (D-35).
