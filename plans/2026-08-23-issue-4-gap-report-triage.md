# Plan — Triage GitHub issue #4 ("gaps") topic-gap report

**Date:** 2026-08-23
**Task class:** Third-party SEO tool report intake. Routed via `CLAUDE.md` → Task Routing:
"Third-party SEO tool report (cannibalisation · gap · audit PDF) → `docs/SEO_CONTENT_GUIDE.md` →
*Report intake*. **Do not action one as written**." Same class of task as issue #3, triaged the
same day — see `plans/2026-08-23-issue-3-gap-report-triage.md` and `DECISIONS.md` D-85/D-86.

## What issue #4 is

Owner-filed issue titled "gaps" (second one filed the same day), body is a single attachment: a
"Topic Gap Analysis Report" (also generated 2026-08-10 — a different run of the same tool),
comparing `www.elitetouchrenovations.au` against `tradeindustriesgroup.com.au`, produced by the
same third-party tool and ending with the same `HeyTony.ca` content-strategy pitch. 20 claimed
gaps, **all 20 are "blog post" gaps, 0 "money page" gaps.**

## Report intake — applying `docs/SEO_CONTENT_GUIDE.md` §3, six rules

1. **Triage against existing structure first.**
   - The report's own site-comparison table claims ETR has "10 total pages, 1 blog post, 9 money
     pages." That is stale/wrong: the live site already has 4 service pages, 6 Tier-1 suburb pages,
     3 published regional hubs, home/about/contact/packages/gallery-index, and 5 gallery project
     pages (D-64) — **23+ pages**, more than double the report's count, with zero blog posts (there
     is no blog yet, correctly noted).
   - Item 18 "Real Renovation Case Studies and Project Examples" is already covered: three
     documented case studies (The Rocks, Hunters Hill, Artarmon) plus five photographed gallery
     projects are live (D-64, D-48).
   - Item 1 "Renovation Cost Guides and Pricing" and item 5 "Small Space and Apartment Renovations"
     both restate work **already on the roadmap**, scoped to bathrooms specifically:
     `docs/SEO_CONTENT_GUIDE.md` §2 priority 6 lists "the cost/pricing guide and the small-bathroom
     page — both GKP-confirmed at 100–1K." The report adds no new evidence for either; it just
     names the same topic in general-renovation terms.
2. **No volume/difficulty per item.** Identical failure to issue #3's report — zero search volume,
   zero difficulty, for any of the 20 items. Per the guide this alone blocks any CREATE.
3. **One-directional, and the "competitor" isn't a real competitor.**
   `tradeindustriesgroup.com.au` is a general renovation **and disaster-restoration** company — 217
   pages spanning kitchens, extensions, commercial/shop fit-outs, offices, attic conversions, and
   water/fire damage restoration — not a bathroom-renovation specialist. Benchmarking a 4-service,
   23-page niche site against a 217-page multi-trade generalist is not a like-for-like gap
   analysis, the same defect as issue #3's report (a different but equally mismatched competitor).
   Money-page gaps show 0/0 — the tool itself found no service-page gap, which is the one number in
   the report actually consistent with the D-01 scope.
4. **A hub that summarises and links down to its spokes is correct, not duplication.** N/A — no
   hub/spoke duplication claims in this report.
5. **Service scope is an owner question.** 6 of the 20 items are services ETR does not offer and
   has not been asked to add — items 2 (kitchen), 4 (extensions), 11 (water/fire damage
   restoration), 12 (commercial/shop fit-out), 16 (office renovation), 19 (attic conversion). Item
   11 in particular would re-litigate D-02 (no standalone waterproofing/repair/restoration
   services) with no new evidence. Building pages for any of these is a trade-scope expansion, not
   an SEO fix.
6. **Record the verdict** — done below, D-87/D-88.

## Item-by-item disposition (all 20)

| # | Topic | Verdict |
|---|---|---|
| 1 | Renovation Cost Guides and Pricing | Already-planned (bathroom cost guide, priority 6) — not new |
| 2 | Kitchen Renovation Planning and Design | Out of scope (D-01) |
| 3 | Timeline and Duration of Renovations | Already covered for bathrooms (D-75); general version unevidenced |
| 4 | Home Extensions and Additions | Out of scope (D-01) |
| 5 | Small Space and Apartment Renovations | Already-planned (small-bathroom page, priority 6) — not new |
| 6 | Renovation vs Rebuilding Decision Guide | Unevidenced, not bathroom-specific |
| 7 | Budget-Friendly Renovation Ideas | Unevidenced, not bathroom-specific |
| 8 | Common Renovation Mistakes | Unevidenced; could fold into a future buyer-support guide with volume evidence |
| 9 | Renovation Material Selection and Quality | Unevidenced, not bathroom-specific |
| 10 | Interior Design and Remodeling Trends | Unevidenced, not bathroom-specific |
| 11 | Water Damage and Fire Damage Restoration | Out of scope; re-litigates D-02 |
| 12 | Commercial Renovation and Shop Fit-Out | Out of scope (trade-scope expansion, owner-only) |
| 13 | Home Preparation for Sale | Unevidenced, not bathroom-specific |
| 14 | Old Home Renovation Strategies | Unevidenced; heritage angle already covered by The Rocks case study |
| 15 | DIY vs Professional Contractors | Unevidenced |
| 16 | Office Renovation and Workplace Design | Out of scope (commercial trade expansion) |
| 17 | Energy Efficiency and Smart Home Features | Unevidenced, not bathroom-specific |
| 18 | Real Renovation Case Studies and Project Examples | Already covered (D-64, D-48) |
| 19 | Attic Conversion and Space Utilization | Out of scope (different room/trade) |
| 20 | Reasons to Renovate Beyond Aesthetics | Unevidenced |

## Verdict

- **Reject all 20 items as written.** None supplies volume/difficulty evidence; 6 are out of
  D-01's service scope; 2 (cost guide, small-bathroom page) merely restate already-planned roadmap
  items with no new evidence; the rest are general-renovation topics with no bathroom-specific
  angle or evidence.
- **No new commitments created.** The two overlapping topics stay exactly where
  `docs/SEO_CONTENT_GUIDE.md` §2 already had them — planned, not started, gated on the same
  GKP/Ahrefs evidence every other content decision here has required.

## Checklist

- [x] Downloaded and read the full PDF (6 pages)
- [x] Cross-checked its page-count claims against `service-areas.json`, `lib/projects.ts`, and the
      live route list
- [x] Applied all six Report-intake rules from `docs/SEO_CONTENT_GUIDE.md`
- [x] Preserved the source PDF at
      `docs/source-copy/pdf/topic-gap-report-2026-08-10-tradeindustriesgroup.pdf`
- [x] Recorded the verdict in `DECISIONS.md` (D-87, D-88)
- [x] Closed GitHub issue #4 with the triage summary as a comment
