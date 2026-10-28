# Long-tail buyer queries — 2026-10 tracker

**Outcome:** improve the commercial pages and buyer-intent blog posts that Search Console shows are already attracting impression share but almost no clicks, then re-check the real conversion signal (enquiries, not traffic).

**Status:** planning and tracking for the long-tail buyer-query workstream. This tracker owns no code changes; each child issue owns the implementation and measurement.

---

## Summary

The owner shared three SEO sources on 2026-10-28: Neil Patel's "the weird searches are where the money is" talk, the "34 ways customers search for you" list, and a HeyTony backlink video. The owner also shared a Search Console export for this site (Pages + Queries, exported 2026-10-28). The same method was applied to 4 Elements Painting first. This tracker carries the plan for Elite Touch.

## What the method says (sources, not opinions)

- NP Digital, paid-search data from 40 companies: 1-word searches convert at 0.17%, 4-word at 1.61%, 6-word at 1.94%. 7+ word searches drove 51% of 2025 revenue across 1M+ leads. Patel says himself these are ad-campaign numbers, so organic rates can differ.
- AI Overviews cut CTR on informational queries by about 61%. Branded queries gained 18.7%.
- Find buyer searches in your own Search Console data: filter to the longest queries and sort by impressions. Judge pages by leads, not traffic. Start with about 5 pages, not 50.
- Each buyer page names the situation in its first line. It then gives a clear answer, one similar customer, and proof the reader can check.

## What the export shows for Elite Touch

- About 72 blog posts earn almost every click. Service and location pages sit at positions 25–50 with almost no clicks: `/services/` 1,465 impressions at position 50; Eastern Suburbs hub 777 at 33; Hills District hub 421 at 28.
- That matches Patel's warning. The site has strong informational reach, but few pages rank for searches made by people choosing a renovator.

Buyer-intent clusters from `Queries.csv` (impressions, 3 months, regex totals):

| Cluster | Queries | Impr. | Clicks | Current owner | Child issue |
|---|---:|---:|---:|---|---|
| Laundry renovations + suburb (Kellyville, Balmain, Wahroonga, Killara, Hills District…) | 37 | 315 | 0 | `/services/laundry-renovations/` (pos 39) | #82 |
| Bathroom niche | 34 | 300 | 0 | niche post (pos 8.1, 0.64% CTR) | #83 |
| Accessible / disabled / NDIS / seniors | 21 | 206 | 2 | accessible post (pos 34) + ageing-in-place post (pos 15, 6 clicks) | #85 (owner questions) |
| Strata / apartment bathrooms | 20 | 175 | 0 | strata post (pos 20) + apartment-vs-house post (pos 9) | #84 |
| Packages / fixed price | 15 | 151 | 1 | `/packages/` (pos 21) | #81 |
| Cost / price / budget | 49 | 128 | 0 | split: `/packages/` (title "Bathroom Renovation Cost, Sydney") **and** `/blog/bathroom-renovation-cost-sydney/` (3 impressions) | #81 |
| Toilet renovations | 3 buyer queries | 47 | 0 | none; powder room page is "toilet and hand basin" | #82 |
| Warranty | 3 | 33 | 0 | warranty post (pos 4–6) | #83 |

The DIY (309 impressions) and timeline (294) clusters are informational. D-144 already improved the timeline post, so they are left alone here.

## 34-ways coverage (situations this site cannot answer yet)

- #8 "Will insurance cover my X?" is answered by the insurance post. A leaking-shower insurance angle would need owner facts.
- #22 "X with bad credit" / #32 "Can I pay monthly?": the site states a 30/40/30 progress schedule and offers no finance. Do not imply finance.
- #15/#16 competitor and alternatives pages: the site shows up for "fast fitouts vs future fitouts" style queries (11 impressions). That is too little evidence, and naming competitors carries Australian Consumer Law risk. **Hold.**
- #17 reviews / #34 "is X legit": D-52 keeps the GBP rating off the site until it is verified live. **Hold.**
- The homepage self-reference idea (name the exact customers you serve, as NP Digital's +30%-lead homepage test did) belongs in **#74**, which already owns the homepage re-audit. No new issue.

## Child issues (sequenced: `lib/blog.ts` is shared)

- [ ] #81 — Settle the owner of "bathroom renovation cost Sydney" (`/packages/` vs the cost post)
- [ ] #82 — Service pages: name "toilet renovations" and the searched laundry suburbs
- [ ] #83 — Titles and answer blocks for posts in the top 10 with no clicks (after #81)
- [ ] #84 — Make the strata post the strata/apartment buyer page (after #83)
- [ ] #85 — Accessible / NDIS bathrooms: owner answers first

## Measurement

Re-export Search Console Queries + Pages 90 days after each child ships, then compare clicks and enquiries for the target queries. Record the outcome in `plans/seo-quarterly-review.md`. Count enquiries, not traffic: a page with 40 visits and 3 enquiries beats one with 4,000 visits and none.

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
