# AI-ready websites + long-tail guide — triage plan (2026-11-08)

**Source (owner, 2026-11-08):** two PDFs, saved in `docs/source-copy/pdf/`:
- `ai-ready-websites-workshop-summary-2026-11.pdf`: six layers (A Human web · B Discovery · C Know your market ·
  D Be evidence · E Agent actions · F the AI front door), plus `/ai`, `/compare` and `/developers`.
- `claude-seo-content-implementation-guide-2026-11.pdf`: long-tail conversion data, edge-case openings,
  intent-matched layouts, backlinks, GBP/MapQuest, "bingeable" archives and a master prompt.

**Owner scope:** list what the site is missing and open issues for it. Leave out backlinks and anything manual or
for another session (GBP, MapQuest, citations, outreach).

**Method:** checked live `www` with curl on 2026-11-08. Read the GSC export of 2026-11-02 (last 3 months) and the
2026-11-05 query-page screening (`session-history/evidence/2026-11-05-gsc-optimization/`). The Search Console
connector had used its monthly quota, so no fresh pull was possible.

## 1. What the site already has (no action)

| Guide item | Evidence on 2026-11-08 |
|---|---|
| A: key facts in HTML | Static pre-rendered pages, and `/llms.txt` 200 is generated from `lib/` (D-90). |
| B: titles, canonicals, sitemap, schema | `SEO_AEO_GEO_CHECKLIST.md`. `/sitemap.xml` has 116 URLs. `Organization` and `BlogPosting` schema (D-91, D-168). |
| B: pricing | `/packages/` (from $18,000 / $25,000 / $30,000, each with its size basis, D-07) and the cost guide. A separate `/pricing` URL would compete with them. |
| B: FAQ | FAQs live on the homepage (D-123), the hubs (D-121) and the guides, with `FAQPage` markup. A standalone `/faq/` would repeat those answers. |
| D: fit statement | The homepage says "Four services. Wet areas are all we do. We are not a general building company…" |
| Long-tail method | 28 Oct tracker #80, plus #92–#96 from the 5 Nov query-page screening. |
| "Bingeable" archive | `/blog/` lists all 80 guides on one page with no pagination, so this is already met. |

## 2. GSC long-query read (export 2026-11-02, last 3 months, brand excluded)

| Query length | Queries | Impressions | Clicks |
|---|---:|---:|---:|
| 1–2 words | 117 | 2,188 | 3 |
| 3 words | 405 | 9,308 | 6 |
| 4–5 words | 388 | 7,262 | 8 |
| 6+ words | 86 | 886 | 0 |

The 6+ word set is mostly "how long does a bathroom renovation take" variants (about 400 impressions, positions
17–25) and DIY questions. All of them have an owner from the 5 Nov screening:
`/blog/bathroom-renovation-timeline-sydney/`, `/blog/diy-or-professional-bathroom-renovation/`,
`/blog/underfloor-heating-bathroom-renovation/` and `/blog/bathroom-renovation-permits-sydney/`. These are tracked in
#92–#96, so no new page or issue is needed.

## 3. Gaps → work

- [ ] **G1: Complete and publish `/ai/` facts page** → issue #98. The route returned 200 on 2026-11-09, but its
  live copy was incomplete and included stale area and package facts. A local rewrite now draws identity, services,
  published areas, packages, evidence, booking and documentation from the existing `lib/` sources. Keep G1 open
  until the code is published and the live route, sitemap, `/llms.txt` and footer are rechecked. No `/developers`
  link, because the site has no agent API (the guide says do not invent one).
- [ ] **G2: Competitor market map (internal, sourced and dated)** → issue #99. D-17 records the competitor bar
  from SERP reading, and D-85/D-87 rejected reports built on non-competitors. Nothing yet records 5–10 real Sydney
  bathroom specialists side by side with sources and dates. The map feeds G1's fit wording and any later `/compare`
  decision.

## 4. Not actioned (reason)

| Item | Why not |
|---|---|
| Public `/compare/` naming competitors | **Owner decision.** Australian Consumer Law comparative-advertising risk. D-166 allows product-type "X vs Y" posts, never brand vs brand. G2 supplies the evidence first. |
| WebMCP / MCP / `/developers` | **Owner decision, not recommended now.** The guide says these are not needed for a brochure site whose only action is an enquiry form. 4EP's code can be ported later if wanted. |
| "100 semantic articles per month" target | D-151: a prioritisation gate, not a page-production programme. |
| Embedded social feeds | They add third-party JS to every resource page (`docs/PERFORMANCE_BUDGET.md`). |
| Backlinks, GBP, MapQuest/BrightLocal | Owner-side or manual (owner scope). |

## 5. Verification for this triage
- Status codes and footer links were re-fetched on 2026-11-08. Every G-item has its own issue with checks. Tick each
  one here when its issue closes.
