# Long-tail buyer queries — 2026-10 tracker

**Outcome:** improve the commercial pages and buyer-intent blog posts that Search Console shows are already attracting impression share but almost no clicks, then re-check the real conversion signal (enquiries, not traffic).

**Status:** Active tracking: #89 and #90 remain open; #81–#85 and #88 are closed. This tracker owns no code changes; each child issue owns the implementation and measurement.

---

## Summary

The owner shared three SEO sources on 2026-10-28: Neil Patel's "the weird searches are where the money is" talk, the "34 ways customers search for you" list, and a HeyTony backlink video. The owner also shared a Search Console export for this site (Pages + Queries, exported 2026-10-28). The same method was applied to 4 Elements Painting first. This tracker carries the plan for Elite Touch.

## What the method says (sources, not opinions)

- NP Digital, paid-search data from 40 companies: 1-word searches convert at 0.17%, 4-word at 1.61%, 6-word at 1.94%. 7+ word searches drove 51% of 2025 revenue across 1M+ leads. Patel says himself these are ad-campaign numbers, so organic rates can differ.
- AI Overviews cut CTR on informational queries by about 61%. Branded queries gained 18.7%.
- Find buyer searches in your own Search Console data: filter to the longest queries and sort by impressions. Judge pages by leads, not traffic. Start with about 5 pages, not 50.
- Each buyer page names the situation in its first line. It then gives a clear answer, one similar customer, and proof the reader can check.

## What the 2026-10-28 export showed for Elite Touch

The owner supplied separate Search Console exports on 2026-11-02. The latest folder's `Filters.csv` says Web and Last 3 months; its chart runs 2026-08-01 to 2026-10-31. Separate Pages and Queries reports do not include a query-by-page join; do not infer which URL returned for a query. The refreshed #81 evidence is recorded in D-165.

- About 72 blog posts earn almost every click. Service and location pages sit at positions 25–50 with almost no clicks: `/services/` 1,465 impressions at position 50; Eastern Suburbs hub 777 at 33; Hills District hub 421 at 28.
- That matches Patel's warning. The site has strong informational reach, but few pages rank for searches made by people choosing a renovator.

Buyer-intent clusters from the original `Queries.csv` (owner-reported 3-month export; its folder has
no `Filters.csv`, so the date range cannot be checked from the export metadata):

For the cost cluster, case-insensitive matching of `cost|price|budget` against `Top queries` gives
41 queries, 101 impressions and 0 clicks, matching D-163. The earlier 49 / 128 subtotal had no
recorded inclusion rules, so it is not retained as a reproducible total.

| Cluster | Queries | Impr. | Clicks | Current owner | Child issue |
|---|---:|---:|---:|---|---|
| Laundry renovations + suburb (Kellyville, Balmain, Wahroonga, Killara, Hills District…) | 37 | 315 | 0 | `/services/laundry-renovations/` (pos 39) | #82 |
| Bathroom niche | 34 | 300 | 0 | niche post (pos 8.1, 0.64% CTR) | #83 |
| Accessible / disabled / NDIS / seniors | 21 | 206 | 2 | accessible post (pos 34) + ageing-in-place post (pos 15, 6 clicks); neither is a specialist service offer (D-161) | #85 (closed by owner-safe fallback) |
| Strata / apartment bathrooms | 20 | 175 | 0 | strata post (pos 20) + apartment-vs-house post (pos 9) | #84 |
| Packages / fixed price | 15 | 151 | 1 | `/packages/` (pos 21; selected page role in D-163/D-165) | #81 |
| Cost / price / budget (`cost|price|budget`) | 41 | 101 | 0 | `/packages/` is the primary cost owner per D-104/D-163/D-165; cost-driver article supports it. Later separate exports do not prove query overlap. | #81 |
| Toilet renovations | 3 buyer queries | 47 | 0 | none; powder room page is "toilet and hand basin" | #82 |
| Warranty | 3 | 33 | 0 | warranty post (pos 4–6) | #83 |

### Latest #81 export refresh (2026-11-02)

The latest `Pages.csv` shows `/packages/` at 657 impressions / 1 click (position 27.95), the cost article at 36 / 0 (19.33), and legacy `/packages-deals/` at 147 / 1 (31.01). `/packages-deals/` redirects to `/packages/`. The matching query aggregates are 21 package/fixed-price queries (557 impressions / 1 click) and 29 cost/price/budget queries (134 / 0). As the files are separate reports, query-to-page overlap remains unknown. See D-165; do not treat these totals as proof of cannibalisation.

The DIY (309 impressions) and timeline (294) clusters are informational. D-144 already improved the timeline post, so they are left alone here.

## 34-ways coverage (situations this site cannot answer yet)

- #8 "Will insurance cover my X?" is answered by the insurance post. A leaking-shower insurance angle would need owner facts.
- #22 "X with bad credit" / #32 "Can I pay monthly?": the site states a 30/40/30 progress schedule and offers no finance. Do not imply finance.
- #15/#16 competitor and alternatives pages: the site shows up for "fast fitouts vs future fitouts" style queries (11 impressions). That is too little evidence, and naming competitors carries Australian Consumer Law risk. **Hold.**
- #17 reviews / #34 "is X legit": D-52 keeps the GBP rating off the site until it is verified live. **Hold.**
- The homepage self-reference idea (name the exact customers you serve, as NP Digital's +30%-lead homepage test did) belongs in **#74**, which already owns the homepage re-audit. No new issue.
- #2 "how long does X last" and #4/#10 "when should I get / repair or replace X" were closed by the two posts added in D-179 (2026-11-04).
- **Newly actioned (2026-11-05, owner asked to issue the remaining honest gaps):** three open gaps the D-179 audit left for later now have issues — #31 "what happens after X" (aftercare) → **#88**; #5/#27 "why does my X keep breaking / problems with X" → **#89**; #33 "free X quote" → **#90**. Each is one new `lib/blog.ts` post, sequenced on the shared data file (#88 → #89 → #90), honest-facts-only, no finance/competitor/fabricated-review content.
- Still **held** (do not open issues without new evidence/owner input): #15/#16 competitor/alternatives (D-05), #22/#23/#32 finance/no-insurance/bad-credit, #17/#34 reviews/legit (D-52), #19/#20/#26 open-now/same-day/emergency (not this trade). #25 "most popular X" is covered by the trends post — enhance, do not add a new URL.

## Child issues (sequenced: `lib/blog.ts` is shared)

- [x] #81 — `/packages/` remains the primary cost/package page and the cost-driver article supports it (D-163/D-165). Local production build (121 routes), served HTML, target-route readability, and independent 390/1440 review verified 2026-11-05. Query-to-page overlap remains unproven; keep the 90-day Query × Page export as follow-up, not a closure condition.
- [x] #82 — Service pages: name "toilet renovations" and the searched laundry suburbs. Local implementation and acceptance checks verified 2026-11-05; run the 90-day Search Console comparison after deployment as a separate measurement follow-up.
- [x] #83 — Titles and answer blocks for posts in the top 10 with no clicks
- [x] #84 — Make the strata post the strata/apartment buyer page
- [x] #85 — Closed by the owner-safe fallback: no specialist accessible / ageing-in-place / NDIS service claim; related posts remain informational (D-161).
- [x] #88 — 34-ways #31: aftercare/handover/warranty post is live; build, readability, design and served-page checks passed. Closed 2026-11-08; owner will request indexing.
- [ ] #89 — 34-ways #5+#27: "Common bathroom problems and what a renovation fixes" problem-first post (after #88). **Not started as at 2026-11-08 21:40** — no `common-bathroom-problems` slug anywhere in `lib/blog.ts` or `scripts/check-readability.mjs`.
- [ ] #90 — 34-ways #33: "Free on-site bathroom quote — what to expect" conversion post (after #89). **Implemented and verified 2026-11-08** in `4c72ef8`: slug `free-bathroom-renovation-quote-what-to-expect` in `lib/blog.ts` and `scripts/check-readability.mjs`; readability PASS (Flesch 76.0), design ratchet PASS, built HTML carries `BlogPosting` + `FAQPage`, the `/contact-us/` CTA and `tel:`, and the slug is in the built sitemap and listed on the `/blog/` hub. Left unticked only because the GitHub issue is still open, and it landed **before** its declared dependency #89.

## Measurement

About 90 days after each child ships, compare Search Console performance for its target queries with actual enquiries. Use a true Query × Page export when evaluating which URL appeared for a query; separate Pages and Queries totals do not establish overlap. Record the outcome in `plans/seo-quarterly-review.md`. Count enquiries, not traffic: a page with 40 visits and 3 enquiries beats one with 4,000 visits and none.

## Parallelization

- Can run in parallel: YES (tracker only; it owns no code)
- Depends on: None
- Files owned:
  - plans/long-tail-buyer-queries-2026-10.md (new)
- Must not modify:
  - lib/blog.ts, lib/businessInfo.ts, app/packages/page.tsx (owned by the child issues)
- Acceptance criteria:
  - The plan file exists and matches this body. Each child issue is ticked here when it closes.
- Verification:
  - `git log -- plans/long-tail-buyer-queries-2026-10.md` shows the commit, and every child issue links back here.

Source: 4 Elements Painting plan `plans/long_tail_buyer_queries_2026-10_plan.md` (same method, other site).
