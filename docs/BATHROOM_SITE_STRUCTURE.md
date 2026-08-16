# Bathroom Renovations — Site Structure Plan
**Business:** Elite Touch Renovations
**Service:** Bathroom renovations (Sydney, NSW)
**Last updated:** August 12, 2026

## How this was built

Suburb-level search volume was pulled from two sources and cross-checked:
- **Ahrefs Free Keyword Generator** — volume shown as buckets (`<100` / `>100`), country-level only, one seed keyword per search.
- **Google Keyword Planner** (free, no ad spend) — volume shown as finer brackets (`10–100`, `100–1K`), can batch multiple keywords per search.

A suburb was assigned a **dedicated page (Tier 1)** only when both tools showed it clearly above the base bucket — a genuine, repeatable step up in demand, not noise from one tool's rounding. Every other suburb is grouped into a **regional hub page (Tier 2)** rather than given a thin, near-duplicate page of its own. This avoids the thin/duplicate-content pattern search engines penalize when a site has dozens of near-identical suburb pages with no real distinguishing demand.

Note: Ahrefs' "KD" measures organic ranking difficulty. Google Keyword Planner's "Competition" measures paid-ad bidding competition. They are not the same metric — don't read one as a substitute for the other.

---

## Tier 1 — Dedicated Suburb Pages (6)

These get a full, unique page each: local project photos if available, suburb-specific copy (not templated), testimonials/reviews from that area if you have them, an embedded map, and a strong CTA.

| Suburb | Region | Postcode | Suggested URL | Volume signal |
|---|---|---|---|---|
| Baulkham Hills | Hills District | 2153 | `/bathroom-renovations/baulkham-hills` | Ahrefs >100 (Easy KD) · GKP 500/mo |
| Castle Hill | Hills District | 2154 | `/bathroom-renovations/castle-hill` | Ahrefs >100 (Easy KD) · GKP 500/mo |
| Kellyville | Hills District | 2155 | `/bathroom-renovations/kellyville` | Ahrefs >100 (Easy KD) · GKP 500/mo |
| Marrickville | Inner West | 2204 | `/bathroom-renovations/marrickville` | GKP 100–1K (clear standout) |
| Ryde | North-Western Sydney | 2112 | `/bathroom-renovations/ryde` | GKP 100–1K (clear standout) |
| Randwick | Eastern Suburbs | 2031 | `/bathroom-renovations/randwick` | GKP 100–1K (clear standout) |

---

## Tier 2 — Regional Hub Pages (4)

One page per region. Each briefly covers the whole area, links out to that region's Tier 1 page(s), and lists every smaller suburb (for local relevance and "we also service..." coverage) without giving each one a separate URL.

### Hub: Hills District — `/bathroom-renovations/hills-district`
**Links to:** Baulkham Hills, Castle Hill, Kellyville (Tier 1)
**Also covers:** West Pennant Hills, Cherrybrook, Bella Vista, Crestwood, Winston Hills, Beaumont Hills, Kellyville Ridge, Rouse Hill, Annangrove, Glenhaven, Kenthurst, Canoelands, Forest Glen, Glenorie, Hillside, Middle Dural, Arcadia, Berrilee, Fiddletown, Galston, Acacia Gardens, Quakers Hill, Glenwood, Parklea, Stanhope Gardens

### Hub: Inner West — `/bathroom-renovations/inner-west`
**Links to:** Marrickville (Tier 1)
**Also covers:** Forest Lodge, Glebe, Annandale, Rozelle, Leichhardt, Lilyfield, Balmain, Balmain East, Birchgrove, Newtown, St Peters, Sydenham, Tempe, Haberfield, Abbotsford, Canada Bay, Chiswick, Five Dock, Rodd Point, Russell Lea, Wareemba, Drummoyne, Stanmore, Lewisham, Petersham, Camperdown, Ashfield, Croydon, Enfield South, Croydon Park, Burwood, Strathfield, Burwood Heights, Enfield, Strathfield South, Breakfast Point, Cabarita, Concord, Mortlake, North Strathfield, Dulwich Hill, Clemton Park, Earlwood, Undercliffe

### Hub: North-Western Sydney — `/bathroom-renovations/north-western-sydney`
**Links to:** Ryde (Tier 1)
**Also covers:** Hunters Hill, Hunters Hill West, Woolwich, Gladesville, Henley, Huntleys Cove, Huntleys Point, Tennyson Point, Denistone East, Putney, Blenheim Road, East Ryde, Macquarie Park, North Ryde, Denistone, Denistone West, Meadowbank, Melrose Park, West Ryde, Beecroft, Cheltenham, Pennant Hills, Thornleigh, Westleigh, Epping, North Epping, Eastwood, Marsfield

### Hub: Eastern Suburbs — `/bathroom-renovations/eastern-suburbs`
**Links to:** Randwick (Tier 1)
**Also covers:** Elizabeth Bay, Kings Cross, Potts Point, Rushcutters Bay, Woolloomooloo, Centennial Park, Moore Park, Paddington, Bondi Junction, Queens Park, Bellevue Hill, Bronte, Charing Cross, Waverley, Woollahra, Bondi, Bondi Beach, North Bondi, Tamarama, Point Piper, Darling Point, Edgecliff, Double Bay, Rose Bay, Diamond Bay, Dover Heights, Vaucluse, Watsons Bay, Clovelly, Coogee, South Coogee

---

## Recommended URL / route structure

```
/bathroom-renovations/                       → service overview + links to all 4 hubs
/bathroom-renovations/baulkham-hills         → Tier 1
/bathroom-renovations/castle-hill            → Tier 1
/bathroom-renovations/kellyville             → Tier 1
/bathroom-renovations/marrickville           → Tier 1
/bathroom-renovations/ryde                   → Tier 1
/bathroom-renovations/randwick               → Tier 1
/bathroom-renovations/hills-district         → Tier 2 hub
/bathroom-renovations/inner-west             → Tier 2 hub
/bathroom-renovations/north-western-sydney   → Tier 2 hub
/bathroom-renovations/eastern-suburbs        → Tier 2 hub
```

**Internal linking rule:** every Tier 1 page links back up to its region's hub page; every hub page links down to its region's Tier 1 page(s); the top-level `/bathroom-renovations/` page links out to all 4 hubs.

## Page content checklist

**Tier 1 (dedicated suburb) pages:**
- [ ] Unique intro paragraph naming the suburb specifically (not templated across pages)
- [ ] Local project photo(s) if available
- [ ] Suburb-specific testimonial/review if available
- [ ] Embedded map centered on the suburb
- [ ] Service list + CTA (quote form or phone)
- [ ] Internal link back to the parent region hub page

**Tier 2 (regional hub) pages:**
- [ ] Overview of the region and why it's serviced
- [ ] Links to the Tier 1 page(s) within that region
- [ ] Plain list of all smaller suburbs covered (for relevance — not separate URLs)
- [ ] Same CTA as Tier 1 pages

## Competitive landscape (Tier 1 terms)

All six Tier 1 terms are already competitive — no suburb returned an empty or weak SERP. Patterns worth knowing before writing page copy:

- **Recurring multi-region competitors:** Prestige Bathroom Renovations (dedicated, templated pages for Baulkham Hills, Marrickville, and Ryde — three regions), Jim's Bathrooms (national franchise; Baulkham Hills, Kellyville, West Ryde), Fred Rose Bathrooms (Baulkham Hills, Marrickville), Kellyville Kitchens & Bathrooms (Kellyville, Castle Hill, plus Inner West and Eastern Suburbs — the broadest multi-region player found).
- **Directories rank prominently for Ryde and Randwick** (Yellow Pages, Localsearch) — these two are slightly less locked down by dedicated competitor pages than Marrickville, Baulkham Hills, or Kellyville.
- **Marrickville has generic content-mill pages ranking** (WordPress/Wix blog-style sites, not real local businesses) — a genuine soft spot where specific, authoritative content has a real shot at outranking low-effort competition.
- **What the ranking competitors consistently do well:** upfront pricing ranges, stated warranty terms (7–10 years), licensing/insurance credentials, and genuinely area-specific detail (heritage/Federation-era plumbing callouts for Marrickville and Randwick, "Garden Shire" character references for Hills District). This is the actual bar the Tier 1 content checklist needs to clear — generic templated copy without this kind of specific detail is exactly what's easiest to outrank, and exactly what several competitors are still getting away with today.

## Modifier keyword data (content angles)

Hills District suburbs have modifier data from the original Ahrefs pull (budget, small, luxury, custom, ndis, kitchen-and-bathroom). Marrickville, Ryde, and Randwick were checked in GKP (affordable/small/luxury/custom × each suburb, 12 terms total) — **every single one returned no measurable volume.** This is a real, clean result rather than a gap: demand in these three suburbs isn't split by modifier — it sits on the bare suburb term (already captured in the Tier 1 table above) or on broader non-suburb-specific modifier terms like "small bathroom renovation sydney" (100–1K, see adjacent-opportunities table below). Don't build modifier-specific suburb pages or subheadings for these three; it's not where the searches are.

## Competitor keyword analysis

Cross-referenced against a keyword-ranking export (Ahrefs organic keywords) for 5 competitors. Four are genuinely relevant; one was excluded.

**Excluded:** adorebathroomsandkitchens.com — only reaches our terms at position 65–87 (page 7–9 of Google, effectively invisible), and its 22-keyword footprint is mostly brand-comparison terms ("badel kitchens," "aalbor kitchens"), which reads as a showroom/directory site rather than a renovation contractor — different business model from ours.

**Kept — relevant, direct competitors:**
- **lukesrenovations.com.au** — strong Inner West presence (390/mo on multiple variants)
- **passionbuilt.com.au** — dedicated Randwick pages (matches our Tier 1 term directly), plus Balmain, Earlwood, Alexandria
- **avantebathrooms.com.au** — consistent Inner West presence, full-service model (repairs, waterproofing) matching our business type
- **vividbathrooms.com.au** — runs dedicated `/service-areas/` pages for Inner West and Randwick, structurally close to this plan

**Two strategic notes, beyond keywords:**
- Passion Built and Avante both have dedicated pages for Balmain, Earlwood, and Five Dock — suburbs this plan places in Tier 2 based on our own volume data. That doesn't make our data wrong (their pages may be low-traffic too), but it's worth knowing competitors made a different bet there.
- Vivid Bathrooms runs a single blog post reviewing "best bathroom renovators in Sydney" that ranks for dozens of competitor brand-name searches (novale, crystal bathrooms, luke's, etc.) — not something to copy directly, but it confirms a "best bathroom renovator Sydney" comparison/roundup page is a real, working format in this niche.

**Adjacent keyword opportunities — GKP-confirmed volumes:**

| Keyword | Volume | Competition | Bid range |
|---|---|---|---|
| **bathroom renovations near me** | **1K – 10K** | High | $4.31–$19.93 |
| **bathroom renovation contractors near me** | **1K – 10K** | High | $4.31–$19.93 |
| bathroom renovation cost sydney | 100 – 1K | Medium | $3.14–$10.22 |
| bathroom colour schemes | 100 – 1K | Medium | $0.55–$3.47 |
| small bathroom renovation sydney | 100 – 1K | High | $7.10–$18.12 |
| bathroom waterproofing sydney | 10 – 100 | Medium | $6.35–$20.87 |
| leaking shower repair sydney | 10 – 100 | Low | $4.32–$31.50 |
| apartment bathroom renovations sydney | 10 – 100 | High | $8.68–$28.67 |
| bathroom renovation ideas sydney | 10 – 100 | Medium | — |
| bathroom and laundry renovation sydney | No data | — | — |
| bathroom renovations under $10,000 sydney | No data | — | — |
| ensuite renovation sydney | No data | — | — |

**Headline finding: "near me" is the single biggest volume opportunity in this entire project.** Both near-me variants sit at 1K–10K/month — higher than any Tier 1 suburb, including Baulkham Hills, Castle Hill, and Kellyville at 500/month. This isn't suburb-specific, so it points to a well-optimized homepage or main service page targeting "near me" intent directly, distinct from and in addition to the suburb pages. High competition on both means it'll be genuinely competitive to rank, but the volume justifies the effort.

Second-tier confirmed opportunities, both clearing 100–1K and worth building: a **cost/pricing guide page** and a **small-bathroom-specific page**. **Apartment renovations** and **design-inspiration content** (colour schemes, tapware guides) are lower-volume but low-effort additions worth folding into existing pages rather than standalone URLs. Waterproofing and leak-repair sit at the same base tier as most suburbs (10–100) — real but modest; only worth a dedicated page if repairs are an actual offered service, not just renovations. Three terms (laundry combo, under-$10k, ensuite-specific) returned no measurable data in GKP — deprioritize these as dedicated content despite showing some volume in competitors' Ahrefs data.

## Data notes / open items

- All Hills District suburbs are now cross-checked in both tools. Annangrove, Glenhaven, Kenthurst, Glenorie, and Middle Dural are confirmed Tier 2 (10–100 in GKP, matching Ahrefs). Canoelands, Crestwood, and Forest Glen show no measurable volume in either tool — safe to treat as hub-only with no dedicated content investment.
- **Hillside** is a deliberate judgment call, not an oversight. GKP shows 100–1K here (double-confirmed on two separate queries), which would normally mean Tier 1. It's being kept at Tier 2 because "hillside" is a common generic place name — Google's own related-keyword suggestions for this query surfaced other generic names (Hillcrest, Hamilton, Henderson) alongside it, suggesting the volume likely reflects broad/ambiguous keyword matching rather than demand specific to this small Hills District suburb. Ahrefs independently showed `<100` for the same suburb. Revisit if real inbound leads ever start coming from this area.
- The competitor-derived adjacent keyword research is now GKP-confirmed in full (see table above) — this closes out what was previously an open item.
- The Marrickville/Ryde/Randwick modifier keywords are now confirmed too (see above) — no measurable volume on any of the 12. That closes out the last open item from this research phase.
