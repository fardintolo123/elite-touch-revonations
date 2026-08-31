# Local SEO Audit — Elite Touch Renovations

**Task:** `/seo-local` — full local SEO audit. **Planning only.** No files changed, nothing
implemented, committed, or deployed, no GitHub implementation issues opened. This document is the
deliverable, to be consolidated later with the other SEO audits:

- `plans/2026-08-31-issue-15-seo-technical-audit.md` (technical SEO — issue #15)
- `plans/2026-08-30-issue-16-gsc-not-indexed-triage.md` (indexation — issue #16)
- `session-history/2026-08-29-issue-8-geo-audit-schema-and-metadata.md` + `DECISIONS.md` D-90/D-91/D-92 (GEO / AI)
- `plans/2026-08-23-issue-5-performance-audit-triage.md` (performance — issue #5)

**Date:** 2026-08-31
**Method:** static read of the whole codebase + inspection of the current production build output in
`.next/server/app/**.html` (built 2026-08-30, 24 page routes). Cross-referenced `service-areas.json`,
`Customer Reviews.md`, `docs/BATHROOM_SITE_STRUCTURE.md`, `PROJECT_CONTEXT.md`, `DECISIONS.md`.
The live domain and the Google Business Profile were **not** accessed from this session — see
**Limitations** at the end.

**Routing (`CLAUDE.md`):** `docs/SEO_AEO_GEO_CHECKLIST.md` (Local SEO section + Phases 1–4),
`docs/BATHROOM_SITE_STRUCTURE.md` (which location pages exist and why), `docs/SEO_CONTENT_GUIDE.md`
§5 (how not to make location pages thin), `DECISIONS.md` D-06/D-10/D-52/D-71/D-73.

---

## Local SEO Score: 61 / 100

| Dimension | Weight | Status | Score | One-line |
|---|---|---|---|---|
| GBP support signals | 25% | weak | 45 | GBP exists and is in `sameAs`. Not embedded, no visible "find us on Google", rating/count hidden, no posts/photos surfaced. Most GBP optimisation is off-site and could not be assessed. |
| Reviews & reputation | 20% | partial | 55 | 19 named testimonials rendered verbatim on-site — genuinely strong. But no visible star rating or count anywhere, no `aggregateRating` schema, no review dates, no source, no third-party presence, no review-generation mechanism. |
| Local on-page SEO | 20% | good | 70 | City + service in every title/H1, NAP in the footer sitewide, 4 dedicated service pages, 3 published hub pages carrying **real suburb-attributed project photos**. Weakened by templated hub prose, no local FAQ, no map, dead suburb links, shallow interlinking to the hubs. |
| NAP consistency & citations | 15% | good (on-site) | 65 | Name / address / phone are byte-identical across page HTML and schema — one source of truth (`lib/businessInfo.ts`). No street address (correct for a service-area business). Off-site citations, Bing Places and Apple Business Connect could not be verified. |
| Local schema markup | 10% | partial | 62 | Correct subtype (`HomeAndConstructionBusiness` + `Organization`), address, phone, hours, `areaServed`, credential, `sameAs`. Missing `geo`, `priceRange`, `image`/`logo`, `@id`; phone is not in international format; hubs carry no per-area `Service` schema. |
| Local link & authority | 10% | weak | 45 | HIA membership and the Greenfleet partnership are shown on-page — real signals. No local chamber, no press, no "best of" list placements, no visible local-backlink strategy. Mostly off-site work. |

**Weighted total ≈ 61/100.**

**Read this number in context.** The *technical* local foundation is sound — NAP is consistent and
single-sourced, the service pages exist, the hubs are backed by real local photography rather than
spun text, and every trust signal a licensed Sydney trade needs (licence 475204C, ABN, AS 3740,
insurances, 10-year warranty, HIA) is on the page. The gap is concentrated in four places: **(1)**
Google Business Profile support signals, most of which live in the GBP dashboard and cannot be done
from the codebase; **(2)** the fact that the site collects but never *displays* a rating; **(3)** the
depth of the three location pages; and **(4)** off-site citations and local authority. Points 2 and 3
are the ones this repo can move.

---

## 1. Business type & industry vertical

**Business type: Service Area Business (SAB).** Deliberate, and correctly implemented:

- `lib/businessInfo.ts` — `address.street: null`, `address.postcode: null`, `address.note: 'By appointment'`.
- Copy throughout: "Free on-site measure across Sydney", "We come to you, measure the room", "anywhere in Sydney".
- Schema uses `areaServed` (City: Sydney) alongside a street-less `PostalAddress` (locality Granville only).
- **Implication (per the local-SEO method):** SABs correctly *hide* the street address and are not
  penalised for the absence of an embedded map pinned to an office. A map centred on the *service
  area* is still a useful geographic-relevance signal, but it is optional, not a defect.

**Industry vertical: Home Services (bathroom renovation / licensed building).** Signals: named service
area, "free on-site measure", licensed + insured + bonded language, HIA membership, fixed-scope
written quote. The correct schema pattern for this vertical is *subtype + `areaServed` + `Service`* —
the first two are present, per-service `Service` nodes are not (see §8).

---

## 2. GBP optimisation checklist (detected on-site vs missing)

| Signal | State | Note |
|---|---|---|
| GBP listing exists | ✅ | `https://share.google/PLJDhhWBCrWAq6GVH`, 5.0 / 17 reviews as at the issue-#2 PDF (unverified live, D-52). |
| GBP in schema `sameAs` | ✅ | Present on every page. |
| GBP NOT linked from the site's strongest page | ✅ (by omission) | The Sterling Sky "diversity" guidance says *don't* point the GBP website field at your top organic page. ETR doesn't link GBP prominently anywhere — neutral-to-good. |
| Visible "Find / review us on Google" link | ❌ | No path from the site to the GBP at all. |
| GBP reviews widget / rating shown | ❌ | Deliberate pending live verification (D-52 / K2). |
| Primary category verified | ⚠️ unknown | Cannot see the GBP. Page content implies the primary should be **"Bathroom remodeler"** (a real GBP category), not "Renovation", "Construction company" or "Contractor". Incorrect primary category is the single biggest *negative* local-pack factor — this must be confirmed. |
| Secondary categories | ⚠️ unknown | Should include Bathroom remodeler + "Remodeler" + "Bathroom supply store"? no — likely "Remodeler", "Tile contractor", "Waterproofing service" (careful: D-02 — waterproofing is a process, not a sold service; only add if GBP category ≠ public service claim). |
| GBP posts | ⚠️ unknown | No ranking impact, but they trigger "post justifications" in the pack. Not reflected on-site. |
| GBP photos / video | ⚠️ unknown | ETR has 30+ real project photos in the repo — the same assets should be on the GBP (45% more direction requests with photos). |
| Business hours on-page | ✅ | Footer + contact page + `openingHoursSpecification`. "Open now" businesses rank higher. |
| Q&A → FAQ migration (GBP Q&A deprecated Dec 2025) | ⚠️ partial | FAQ blocks exist on `/packages/` and `/services/powder-room-renovations/` only. No FAQ on the hubs, the other 3 service pages, or `/contact-us/`. |

**What can be done in this repo:** add a visible route to the GBP for reviews (§ Reviews),
recreate/expand FAQ content, keep photo assets in sync. **What is owner/GBP-dashboard work:**
verify primary category, secondary categories, posts, photo upload, hours.

---

## 3. Review health snapshot

| Item | State |
|---|---|
| Testimonials on-site | **19**, verbatim, attributed by name — `Customer Reviews.md` → `lib/reviews.ts`. All 19 render on `/about-us/`; 1–2 featured on the homepage and each service page. |
| Visible star rating | ❌ none anywhere on the site |
| Visible review count | ❌ none |
| `aggregateRating` / `Review` schema | ❌ none — deliberate (D-03 / D-52): only 17 of the 19 are confirmed Google reviews, and the 5.0/17 has not been verified live. |
| Review date / recency shown | ❌ none — no way for a visitor (or a crawler) to see these are recent |
| Review source shown | ❌ none — a reader can't tell these are Google reviews |
| Per-review location | ❌ none — **not one of the 19 testimonials names a suburb.** Ken Chen mentions "main bathroom, ensuite and standalone toilet"; Kieran C mentions Carrara marble (matches the Hunters Hill project); none states where. Per D-06 a location cannot be invented. |
| Third-party review platforms | ❌ none referenced (no ProductReview.com.au, Houzz, True Local, Facebook reviews) |
| Review-generation mechanism | ❌ none — no "leave us a review" link, card, or post-enquiry prompt anywhere |
| Review gating | ✅ none (gating is prohibited by Google + FTC — ETR has no gating, which is correct) |

**Assessment.** ETR is *above* the "magic 10" review threshold and sits at a 4.5+ rating that 68% of
consumers require — but a visitor to the website sees none of that. The blocker (live verification of
5.0/17) is a five-minute owner task. The 19 verbatim testimonials are a strong asset; they are just
not doing local-pack or rich-result work because there's no rating figure and no schema.

---

## 4. NAP consistency audit

Single source of truth: `lib/businessInfo.ts`. Every surface reads from it, so drift is structurally
prevented. Cross-source comparison:

| Field | Page HTML (footer / contact) | JSON-LD schema | GBP |
|---|---|---|---|
| **Name** | "Elite Touch Renovations" (legal "…Pty Ltd" in the footer © line) | `name` + `legalName` match | not verified |
| **Address** | "Granville, NSW (by appointment)" — no street | `addressLocality: Granville`, `addressRegion: NSW`, `addressCountry: AU` — no street | not verified |
| **Phone** | `0411 752 334` (display) / `tel:+61411752334` (href) everywhere | `telephone: "0411 752 334"` | not verified |

**On-site: fully consistent.** ✅

**Issues:**
1. **Schema `telephone` is in local format** (`0411 752 334`). Google's structured-data guidance
   wants international format: `+61 411 752 334`. The `tel:` href is already correct. Low severity,
   trivial fix.
2. **GBP ↔ site ↔ directories not verified.** The audit could only compare page vs schema. The owner
   (or a citation tool) must confirm the GBP and every existing directory listing use the exact same
   name string, the same phone, and the same "Granville NSW" locality — byte-identical, including
   whether "Pty Ltd" is present.
3. **Second phone (`0423 305 852`, Mohammed)** is in `businessInfo` but not surfaced on-site — correct
   (a second number on the page would dilute the NAP signal). It must **not** appear on the GBP or in
   citations either.

---

## 5. Citation presence check

Could not be run from this session (no external crawl). Recommended checklist for the owner or a
citation tool, ordered by value for a Sydney bathroom renovator:

| Tier | Directory | Why |
|---|---|---|
| 1 | Google Business Profile | 25%+ of local-pack weight. Verify NAP + category first. |
| 1 | Bing Places | **Powers ChatGPT, Copilot, Alexa.** BrightLocal 2026: the citation source AI assistants lean on. Currently unclaimed as far as can be told. |
| 1 | Apple Business Connect | Usage doubled to 27%. Apple Maps + Siri. |
| 1 | Facebook (business page) | Already in `sameAs` — confirm NAP on the page matches. |
| 2 | ProductReview.com.au | The dominant AU consumer-review site; strong for "[trade] reviews" queries and AI answers. |
| 2 | hipages, Oneflare, ServiceSeeking | AU trade-lead platforms; also citation value. Owner may already be on these. |
| 2 | Houzz | Renovation-specific; portfolio + reviews; ranks well for "bathroom renovation [suburb]". |
| 2 | True Local, Yellow Pages (Sensis), Localsearch | Traditional AU citations; `BATHROOM_SITE_STRUCTURE.md` notes Yellow Pages/Localsearch rank for "Ryde" and "Randwick". |
| 3 | HIA "Find a Member" | ETR is an HIA member — a real, relevant, authoritative directory link. |
| 3 | Foursquare | Global aggregator; feeds downstream data. |

Add the credible ones (ProductReview, Houzz, HIA, Bing) to schema `sameAs` once live.

---

## 6. Local schema status

**Present and correct** (`app/layout.tsx`, sitewide):

- `@type: ["HomeAndConstructionBusiness", "Organization"]` — correct subtype for this vertical,
  dual-typed so string-matching validators credit `Organization` too (D-92).
- `name`, `legalName`, `url`, `email`, `foundingDate`
- `address` (PostalAddress, locality + region + country — street correctly omitted for a SAB)
- `areaServed` (City: Sydney, with nested region/country) — recommended for SABs, present
- `openingHoursSpecification` — weekday + Saturday
- `hasCredential` (NSW Builder Licence 475204C), `founder`, `employee` (4 Dawoods),
  `identifier` (ABN + ACN)
- `makesOffer` → `Offer` → `Service` (generic "Bathroom renovation") + `WarrantyPromise` (10 years)
- `sameAs` — GBP + 5 social profiles
- A minimal `WebSite` node
- `BreadcrumbList` on every non-home page
- `FAQPage` on `/packages/` and `/services/powder-room-renovations/` (matching visible `<details>`)

**Missing / weak:**

| Property | Impact | Fix |
|---|---|---|
| `geo` | Recommended. Coarse point (Granville, or Sydney CBD) still reinforces the geographic entity. | `"geo": { "@type": "GeoCoordinates", "latitude": -33.8xxxx, "longitude": 151.0xxxx }` — 5+ decimals. For a SAB a suburb-centroid point is fine; do not imply a walk-in office. |
| `priceRange` | Recommended; appears in some rich results. ETR has clear pricing. | `"priceRange": "$18,000–$40,000+"` or `"$$$"` (keep < 100 chars). Tie to the `/packages/` figures (D-07 — always with the "from" framing). |
| `image` / `logo` | Recommended. Also the same asset the OG-image gap (technical audit H-3) needs. | Point at a committed 1200×630 brand/OG image and the logo mark. |
| `@id` on the business node | Nothing can reference the business — hub `Service` nodes, breadcrumbs, review nodes all float free. | `"@id": "https://www.elitetouchrenovations.au/#business"`; reference it as `provider` / `publisher` elsewhere. |
| Per-service `Service` schema | The 4 service pages have no `Service` node of their own (only the generic one nested sitewide). Whitespark: dedicated service pages are the #1 local-organic factor — schema should back them. | New `components/ServiceSchema.tsx`; `provider` = `@id` ref; `areaServed` = Sydney; `serviceType`. (Also listed in the technical audit as M-1.) |
| Per-hub area targeting | The 3 hub pages inherit only the sitewide "areaServed: Sydney". A page titled "Bathroom Renovations North Shore" should assert the North Shore as its served area. | On each hub, emit a `Service` node with `areaServed: { "@type": "AdministrativeArea", "name": "North Shore, Sydney" }` (or `Place` with the suburb list), `provider` = `@id` ref. |
| `telephone` format | Minor. | International format. |
| `knowsAbout` / `slogan` | Optional GEO/entity nicety. | Low priority. |

---

## 7. Location-page quality (the multi-location core of this audit)

**Structure (settled — do not reopen):** `docs/BATHROOM_SITE_STRUCTURE.md` + D-71 define
`/services/bathroom-renovations/{region-or-suburb}/`, six Tier-1 suburbs + five Tier-2 regional hubs,
and D-73 makes "a region exists in data" ≠ "its hub is published". **Currently live: 3 regional hubs**
(Hills District, Eastern Suburbs, North Shore). **0 Tier-1 suburb pages.** 2 hubs dark (Inner West,
North-Western).

### What's genuinely good

- **Every published hub carries real, suburb-attributed project photography**, pulled by
  `projectsInRegion()` matching `project.suburb` exactly against the region's suburb list:
  - Hills District → 1 project (Castle Hill)
  - Eastern Suburbs → 2 (Randwick, Little Bay)
  - North Shore → 4 (Artarmon ×2, Hornsby ×2)
  - This is the single thing that lifts these pages above the doorway-page pattern. It is not stock,
    not templated, and not someone else's work.
- Hub H1s carry service + area ("Bathroom renovations on Sydney's North Shore").
- Hub titles/descriptions carry the area and the warranty term.
- Each hub lists every suburb it covers with postcodes (28 / 36 / 50) — real "we also service…" breadth.
- Each hub links **up** to `/services/bathroom-renovations/`.
- 9 click-to-call `tel:` anchors per hub; primary CTA above the fold.
- `BreadcrumbList` schema: Home → Services → Bathroom renovations → {Region}.

### What's weak or missing

| # | Issue | Detail |
|---|---|---|
| a | **Hub prose is largely swappable.** | The hero paragraph ("We strip out, waterproof to AS 3740, tile and fit off across the {region} — and we put the full scope and price in writing…") and the entire "What you get, whichever suburb you are in" section read identically with the region name swapped. `docs/SEO_CONTENT_GUIDE.md` §5 is explicit: *"If nothing specific can be said truthfully about a suburb, that is a signal the page should not exist."* The competitor analysis in `BATHROOM_SITE_STRUCTURE.md` §"Competitive landscape" says the ranking bar is *area-specific detail* — heritage/Federation plumbing (Inner West, Eastern Suburbs), "Garden Shire" character (Hills), strata/apartment access, slab-vs-timber substrates, skip/parking on narrow terraces. **None of that is on any hub today.** |
| b | **No local FAQ on the hubs.** | FAQ + `FAQPage` schema exists on `/packages/` and the powder-room page but not the hubs. "How much is a bathroom renovation on the North Shore?", "Do you work in heritage-listed Hunters Hill homes?", "Can you do strata bathrooms in [area]?" are real local-intent questions with snippet/AI-answer value. |
| c | **No map.** | `BATHROOM_SITE_STRUCTURE.md`'s own Tier-1 checklist calls for "an embedded map centered on the suburb". None exists on any hub or on `/contact-us/`. (A static map *image* would satisfy the geographic signal without the third-party-JS cost — see M-3 and `docs/PERFORMANCE_BUDGET.md`.) |
| d | **Dead internal links to Tier-1 suburb pages.** | The Hills District hub links to `/services/bathroom-renovations/castle-hill/`, `/baulkham-hills/`, `/kellyville/`; the Eastern Suburbs hub links to `/randwick/`. **All four 404** (no Tier-1 pages built; `dynamicParams = false`). Grows to 6 if Inner West / North-Western publish (Marrickville, Ryde). *Identical to the technical audit's finding H-1 — carried here because it is also a local-interlinking defect: the area page links its own target suburbs to dead ends.* |
| e | **Hubs are under-linked.** | The only internal links *into* the hubs are from `/services/bathroom-renovations/` ("Where we work") and `llms.txt`. The homepage, the other 3 service pages, `/about-us/`, `/packages/`, `/gallery/` and every gallery project page link to **zero** hubs. `WorkStrip` (on 4 pages) links to gallery projects but never to the region those projects sit in. Reachable in 2 clicks from home, so the 3-click rule passes — but almost no internal equity flows to the pages meant to rank locally. |
| f | **Gallery project pages have no local link-out.** | `/gallery/castle-hill-bathroom/` never links to the Hills District hub or to `/services/bathroom-renovations/`. A "See more bathroom renovations in the Hills District" link would connect the strongest local proof asset to the page meant to rank for the area. |
| g | **Reviews aren't localised on hubs.** | No testimonial appears on any hub (the service pages show one; the hubs show none), and none could be attributed to the area anyway (§3). |
| h | **No pricing context on hubs.** | Competitors that rank publish pricing; the hubs don't mention it or link to `/packages/`. |

### Tier-1 suburb pages

Not built. `service-areas.json` assigns them a `url` (which is what produces the dead links in *d*),
and `BATHROOM_SITE_STRUCTURE.md` puts them at publishing priority 3 with GKP volume behind each
(Baulkham Hills / Castle Hill / Kellyville 500/mo; Marrickville / Ryde / Randwick 100–1K). Building
them is a content project outside this audit — but the dead links must be neutralised now (see plan
Phase 1).

### Dark hubs now have proof

Inner West and North-Western Sydney are unpublished (D-73/D-76). Both now have real project photos
waiting in their region: **Inner West → Balmain + Drummoyne**; **North-Western → Hunters Hill +
Gladesville**. "Backed by real local work" was the stated bar for publishing a hub. This does not
force the decision, but it removes the original blocker — noted for the roadmap, gated behind fixing
the templated-prose problem (*a*) first so ETR doesn't publish two more swappable pages.

---

## 8. Local internal-linking map (current state)

```
Home ──nav/footer──> Services index, Packages, Gallery, About, Contact
Home ──WorkStrip────> /gallery/{project}/   (never to a hub)
Home ────────────────> (NO link to any regional hub)

/services/ ──cards──> 4 service pages
/services/bathroom-renovations/ ──"Where we work"──> hills-district, eastern-suburbs, north-shore
                                 ──"Our other services"──> other 3 service pages

hub ──"← Bathroom renovations"──> /services/bathroom-renovations/     (up: OK)
hub ──suburb list──> /services/bathroom-renovations/{tier1-suburb}/   (DOWN: 404 — 4 dead links)
hub ──project cards──> /gallery/{project}/                            (down: OK)
hub ────────────────> (NO link to sibling hubs, NO link to /packages/)

/gallery/{project}/ ──> /gallery/, other /gallery/{project}/, /packages/
/gallery/{project}/ ──> (NO link to a hub or to /services/bathroom-renovations/)
```

**Target state:** Home and every service page surface an "Areas we serve" block linking the live
hubs; hubs link to each other and to `/packages/`; each gallery project links to its region hub and
the bathroom service page; the dead Tier-1 links are gated until those pages exist.

---

## 9. Local keyword targeting (vs `BATHROOM_SITE_STRUCTURE.md`)

| Target | Volume (GKP) | Where it's handled now | Assessment |
|---|---|---|---|
| "bathroom renovations near me" / "…contractors near me" | **1K–10K/mo** — the biggest opportunity | Homepage (H1 "Bathroom renovations in Sydney", copy "across Sydney") | Reasonable. "Near me" resolves on proximity + GBP, not on-page text, so the real lever is the GBP + local-pack presence, not homepage copy. The homepage does its part. |
| bathroom renovation [Tier-1 suburb] ×6 | 100–500/mo each | **Not targeted** — no Tier-1 pages; suburb terms only appear in hub suburb-lists | Gap. Priority-3 content work. |
| bathroom renovations [region] ×5 | lower / bundled | 3 hubs live, 2 dark | Partially covered; hubs too thin (§7a). |
| bathroom renovation cost sydney | 100–1K | `/packages/` (D-104) | ✅ handled well. |
| small bathroom renovation sydney | 100–1K | `/services/powder-room-renovations/` (D-107) | ✅ handled. |
| bathroom waterproofing sydney / leaking shower repair sydney | 10–100 | Not targeted (D-02 — not a sold service) | Correctly out of scope. |

No local-keyword *cannibalisation* risk in the current build — the Tier-1/Tier-2 split is designed
to prevent it, and with only hubs live there's nothing competing.

---

## 10. Top prioritised actions

Ordered Critical → High → Medium → Low. Each notes its dependency. **Nothing here is implemented.**

| # | Priority | Action | Depends on | Effort | Where |
|---|---|---|---|---|---|
| **1** | **Critical** | **Verify the GBP live**: exact primary category (target: "Bathroom remodeler"), secondary categories, current rating + review count, NAP string, hours, service-area settings, that photos are uploaded. Record the verified figures in `PROJECT_CONTEXT.md` (closes K2 / D-52). | — | S (owner, ~15 min) | GBP dashboard |
| **2** | **High** | **Neutralise the 4 dead Tier-1 suburb links** on the Hills District + Eastern Suburbs hubs — gate the hub `<Link>` so a suburb renders as plain text (like Tier-2 suburbs) until its page exists. *Same as technical-audit H-1.* | — | S | `app/services/[slug]/[location]/page.tsx`, `lib/locations.ts` / `service-areas.json` |
| **3** | **High** | **Show the rating.** Once #1 confirms 5.0/17 (or the live figure): add a visible rating + count near the fold on the homepage, each hub, and `/contact-us/`, **and** emit `aggregateRating` on the LocalBusiness node. Add a "Reviews on Google" link to the GBP. | #1 | M | `app/layout.tsx`, `app/page.tsx`, hub page, `components/`, `lib/businessInfo.ts` |
| **4** | **High** | **De-template the 3 published hubs** so each passes the swap test: a unique 2–3 paragraph section on renovating *in that area* (heritage/Federation plumbing, strata/apartment access, slab vs timber substrate, terrace parking/skip access — all truthful, none suburb-specific-invented), a 4–6 question **local FAQ** with `FAQPage` schema, a link to `/packages/`, and a testimonial. | #2 (clean links first) | L | `app/services/[slug]/[location]/page.tsx`, `service-areas.json` (per-region copy), `lib/` |
| **5** | **High** | **Per-area `Service` schema + `@id`.** Give the sitewide business node an `@id`; emit a `Service` node on each service page (`provider` ref, `areaServed` Sydney) and on each hub (`areaServed` = the region). *Overlaps technical-audit M-1.* | — | M | new `components/ServiceSchema.tsx`, `app/services/[slug]/page.tsx`, `[location]/page.tsx`, `app/layout.tsx` |
| **6** | **Medium** | **Schema enrichment**: `geo` (suburb-centroid, 5+ decimals), `priceRange`, `image`/`logo`, `telephone` in `+61` format. Quick wins, all in one node. | — | S | `app/layout.tsx`, `lib/businessInfo.ts` |
| **7** | **Medium** | **Spread internal links to the hubs.** Add an "Areas we serve" block (links to the 3 live hubs) to the homepage and the other service pages; link hubs to each other and to `/packages/`; from each gallery project page link to its region hub + the bathroom service page. | #2 | M | `app/page.tsx`, `app/services/[slug]/page.tsx`, `app/gallery/[slug]/page.tsx`, `components/WorkStrip.tsx` |
| **8** | **Medium** | **Claim Bing Places + Apple Business Connect** with byte-identical NAP. Bing Places feeds ChatGPT/Copilot/Alexa. Add both (plus any confirmed directory) to schema `sameAs`. | #1 (NAP baseline) | S–M (owner) | off-site + `lib/businessInfo.ts` |
| **9** | **Medium** | **Review-generation loop.** A Google review/profile link now appears on the enquiry success state (shipped 2026-08-31). Printed handover card and the ≤18-day review cadence remain owner/process work. | #1 | S–M | `components/EnquiryForm.tsx` success state, process |
| **10** | **Medium** | **Map**, done cheaply: a static, lazy-loaded map *image* of the Sydney service area on the hubs and `/contact-us/` (not a Google Maps `<iframe>` — that's third-party JS and needs owner sign-off per `docs/PERFORMANCE_BUDGET.md` rule 11). | #4 | M | hub page, `app/contact-us/page.tsx`, `public/` asset |
| 11 | Low | **Citation audit + build** across the §5 list; fix any NAP drift; add credible ones to `sameAs`. | #1, #8 | M (owner / tool) | off-site |
| 12 | Low | **Local authority**: pursue "best bathroom renovators Sydney" roundup inclusion (#1 AI-citation factor), HIA member directory link, a local business chamber (Granville is Cumberland LGA), and turn the Greenfleet tree-planting into a small "community" content moment. | — | L (owner / outreach) | off-site + light content |
| 13 | Low | **Publish Inner West + North-Western hubs** — both now have local project proof (Balmain/Drummoyne, Hunters Hill/Gladesville). Only after #4 sets the depth bar, and only with owner sign-off per D-76. | #4 | L (content) | `service-areas.json`, `lib/locations.ts` |
| 14 | Low | **Expand FAQ coverage** to the remaining service pages and `/contact-us/` (recreating the value of the deprecated GBP Q&A as on-site FAQ). | — | M | `lib/businessInfo.ts`, `app/services/[slug]/page.tsx` |
| 15 | Low | **Third-party review presence**: get ETR onto ProductReview.com.au and Houzz; once there, surface a badge/link. | #1 | M (owner) | off-site + light UI |

### Dependency summary

- **#1 is the keystone.** #3, #8, #9, #11, #15 all wait on the verified GBP figures / NAP baseline.
- **#2 before #4** — don't add depth to pages that still emit dead links.
- **#4 before #10 and #13** — set the content-quality bar before adding a map or publishing more hubs.
- **#5 (`@id`) before #7's** gallery→business schema references land cleanly.
- **#2, #5, #6 are independent** and can ship in any order (all low-risk).

---

## 11. Limitations — what this audit could NOT assess

Static codebase + build-output analysis only. The following need the live site, the GBP dashboard, or
a paid tool:

| Not assessed | Fill the gap with |
|---|---|
| Geo-grid local-pack rankings (position by point across Sydney) | Local Falcon, BrightLocal Local Rank Tracker, Whitespark |
| Live GBP data — real primary category, current rating/count, posts, photos, attributes, GBP Insights (calls, direction requests, searches) | GBP dashboard directly; BrightLocal / Semrush Listing Management |
| Citation accuracy + coverage across the web (NAP consistency on 3rd-party sites) | Whitespark Local Citation Finder, BrightLocal Citation Tracker, Semrush Listing Management |
| Backlink / local link profile, Domain Authority | Ahrefs, Semrush, Moz |
| Review velocity + the 18-day cadence over time | BrightLocal review monitoring, GBP dashboard |
| Real "near me" / suburb SERP positions and local-pack composition | Local Falcon, manual geo-located checks |
| Whether the two `elementor-hf` / feed legacy URLs still show in local-relevant queries | Google Search Console (see issue #16 triage) |
| AI local visibility (ChatGPT / Perplexity / AI Overviews citing ETR) | Already partly covered by the issue #8 GEO audit; run `/seo-geo` for a full pass |

---

## Confirmation

1. **The audit is complete.** All six local-SEO dimensions assessed against the current codebase and
   the 2026-08-30 production build; business type (SAB) and vertical (Home Services) identified;
   findings cross-checked against `service-areas.json`, `Customer Reviews.md`,
   `docs/BATHROOM_SITE_STRUCTURE.md`, and the settled decisions in `DECISIONS.md`.
2. **The findings were saved** to `plans/2026-08-31-seo-local-audit.md` (this file), alongside the
   other SEO audits in `plans/`, ready for consolidation.
3. **No implementation changes were made.** No source files modified, nothing built, committed,
   deployed, and no GitHub implementation issues opened. This document is planning only.

---

## Checklist

- [x] Task routed; `SEO_AEO_GEO_CHECKLIST.md` (Local section), `BATHROOM_SITE_STRUCTURE.md`,
      `SEO_CONTENT_GUIDE.md` §5, `DECISIONS.md` read
- [x] Business type + industry vertical detected
- [x] GBP support signals inventoried (on-site) + GBP-dashboard items flagged as owner work
- [x] Review health snapshot (19 testimonials, no rating shown, no schema, no localisation)
- [x] NAP cross-source comparison (page HTML vs JSON-LD) — consistent; GBP/directories flagged unverified
- [x] Local schema extracted from the built HTML and assessed against recommended properties
- [x] All 3 published hub pages inspected for local content, proof, map, links, FAQ
- [x] Internal-linking map built; dead links and under-linking identified
- [x] Local keyword coverage checked against the GKP-confirmed table
- [x] Prioritised actions with dependencies; limitations documented
- [x] No files modified, nothing implemented, committed, or deployed; no implementation issues opened
- [x] Issue #45 on-site review-generation prompt implemented in `components/EnquiryForm.tsx`
- [ ] Owner review + consolidation with the technical / GEO / performance / indexation audits
