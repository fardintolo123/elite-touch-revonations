# Per-Page (On-Page) SEO Audit — Elite Touch Renovations

**Task:** `/seo-page` — page-by-page on-page SEO scorecards. **Planning only.** No files changed,
nothing implemented, committed, or deployed, no implementation issues opened here.

**Date:** 2026-08-31
**Method:** the site's 24 routes reduce to **10 page templates**. Each was assessed from its source
component + rendered HTML (2026-08-30 build) against title / meta / headings / URL / canonical /
robots / OG / Twitter / schema / content / images / internal links.
**Overlap note:** this audit is deliberately consolidative — most on-page issues are already logged
in the technical, content, schema, local, and images audits. It gives the per-page view and flags
the **four page-specific items those thematic passes missed**, marked ★NEW.

---

## Scorecards

Scores are on-page only (0–100). "Refs" point to the audit + finding ID that owns the fix.

### 1. Homepage `/` — 82/100

| Element | State |
|---|---|
| Title | ✅ "Sydney Bathroom Renovations \| Elite Touch Renovations" (52 chars, keyword + location) |
| Meta description | ✅ 157 chars, specific, keyword-rich |
| H1 | ✅ "Bathroom renovations in Sydney, done once and done properly." — service + location |
| Headings | ✅ 1×H1, 5×H2, logical |
| URL / canonical / robots | ✅ `/`, self-canonical, `index,follow` |
| OG / Twitter | ⚠️ `og:url` = homepage (correct here by luck); **no `og:image`**, `twitter:card=summary` → technical **H-2 / H-3** |
| Schema | ✅ LocalBusiness + WebSite; no breadcrumb (correct for home) |
| Content | ✅ answer-ish lead, process steps, proof, ~700 visible words; ⚠️ not a crisp front-loaded answer block → GEO **G-2** |
| Internal links | ⚠️ links 4 services + gallery (3 via WorkStrip); **links 0 regional hubs** → local **#7** |
| ✅ **P-1** | **Fixed — #36, 2026-09-04.** Homepage now carries a 3-question FAQ ("How much does a bathroom renovation cost in Sydney?", "How long does a bathroom renovation take?", "Which areas of Sydney do you cover?") as visible `<details>` + `FAQPage` schema. |

### 2. Services index `/services/` — 72/100

| Element | State |
|---|---|
| Title | ✅ **P-2 fixed — #38, 2026-09-02.** Was "Our Services \| Elite Touch Renovations" (no keyword); now "Bathroom Renovations Across Sydney \| Elite Touch Renovations" (60 chars). "Across" keeps it distinct from the `/services/bathroom-renovations/` hub title; "Services" dropped only because the full brand tail leaves no room for it under 60. |
| Meta description | ✅ 149 chars, lists all four services + AS 3740 |
| H1 | ✅ "Bathroom renovation services across Sydney." |
| Headings | ⚠️ the 4 service cards use `<h2>` as link text (works, slightly unusual); + WorkStrip + Contact H2s |
| Schema | ✅ BreadcrumbList; ⚠️ no `CollectionPage`/`ItemList` of the services → schema **S-1/S-4** |
| Content | ⚠️ thin — hero + 4 cards + WorkStrip + Contact. A 2–3 sentence intro on the wet-area-only focus would help. |
| Internal links | ✅ 4 services + gallery |

### 3. Service detail `/services/{slug}/` (×4) — 68/100

| Element | State |
|---|---|
| Title | ✅ mostly ("Bathroom Renovations Sydney \| …" 52) — ⚠️ **laundry = 63 chars**, trim → technical **M-5** |
| Meta description | ✅ = `service.summary`, 130–150 chars |
| H1 | ✅ service + "Sydney" on all four |
| Headings | ✅ clean hierarchy |
| Schema | ❌ **no dedicated `Service` node** (only the generic sitewide one) → schema **S-1** |
| Content | ❌ **3 of 4 pages have almost no service-specific content** — shared scaffolding + 1 sentence. Powder-room is the exception. → content **C-2** |
| Answer-first | ❌ opens with brand, not an answer → content **C-3** + GEO **G-2** |
| FAQ | ⚠️ powder-room only → content **C-2** |
| Internal links | ✅ other services + packages + gallery; ⚠️ only the bathroom page links the hubs |
| External links | ❌ AS 3740 / NSW Fair Trading named, not linked → content **C-4** |

### 4. Location hub `/services/bathroom-renovations/{region}/` (×3) — 64/100

| Element | State |
|---|---|
| Title / meta / H1 | ✅ all carry the region + service + warranty |
| Schema | ✅ BreadcrumbList; ❌ no per-area `Service` node → schema **S-1** |
| Content | ⚠️ **largely swappable** — real local *photos* save it, prose doesn't → local **#4** |
| Local detail / FAQ / map | ❌ none → local **#4 / #10** |
| Internal links | ❌ **links Tier-1 suburbs that 404** (Hills ×3, Eastern ×1) → **H-1**; links no sibling hubs, no `/packages/` → local **#7** |
| Answer-first | ❌ → content **C-3** + GEO **G-2** |

### 5. Gallery index `/gallery/` — 76/100

| Element | State |
|---|---|
| Title | ✅ **P-3a fixed — #38, 2026-09-02.** Was "Our Work \| Elite Touch Renovations" (no keyword); now "Bathroom Renovation Photos, Sydney \| Elite Touch Renovations" (60 chars). "Photos" over "Gallery" — one char shorter, and it is what the page actually is. |
| Meta description | ✅ **P-3b fixed — #39, 2026-09-02.** Was ~221 chars (9-suburb list); now 150 chars naming 5 representative real projects. *(Distinct from technical M-3, the per-project descriptions — fixed in the same issue.)* |
| H1 | ✅ "Bathroom renovations we have completed across Sydney." |
| Schema | ✅ BreadcrumbList; ❌ no `CollectionPage`/`ImageGallery` → schema **S-4** |
| Content | ✅ 11 project cards + 2 text-only projects; good local breadth |
| Images | ✅ `next/image`, lazy, first `priority` |

### 6. Gallery detail `/gallery/{slug}/` (×11) — 70/100

| Element | State |
|---|---|
| Title | ✅ = `project.name` + template (~35–55 chars) |
| Meta description | ✅ **fixed — M-3 / #39, 2026-09-02.** Optional `metaDescription` field (≤155) with trimmed-`blurb` fallback; all 11 now 135–147 chars, `blurb` still the visible lead. |
| H1 | ✅ full project name |
| Headings | ⚠️ the "Other work" grid renders 10× `<h3>` "Bathroom"/"Ensuite" — deliberate readability fix (D-109), odd in an outline view but acceptable; leave it |
| Schema | ✅ BreadcrumbList + `og:image` (raw asset, not a 1200×630 crop → technical **H-3**); ✅ **`ImageObject` + `CreativeWork` fixed — #24, 2026-09-04** (schema **S-2** / tech **L-5**) |
| Content | ⚠️ 1-sentence story per project → content **C-8** |
| Images | ⚠️ lead-image `sizes="100vw"` over-claims → images **I-4** |
| Dates | ❌ no completion year → content **C-5** / GEO **G-1** |

### 7. Packages `/packages/` — 84/100

| Element | State |
|---|---|
| Title | ⚠️ 60 chars + `&` — borderline truncation → technical **M-5** |
| Meta / H1 | ✅ "How much does a bathroom renovation cost in Sydney?" framing; H1 clear |
| Content | ✅ **answer-first, question-shaped H2s, real pricing with size basis, objection-handling** — the model page |
| Schema | ✅ FAQPage (AI value; no rich result post-May 2026 → schema **F-1**); ⚠️ no `priceRange` on business node → schema **S-3** |
| Tables | ❌ tier comparison is `<div>` cards, not a `<table>` → content **C-6** |
| Dates | ❌ no "prices current as of" → content **C-5** / GEO **G-1** |

### 8. About `/about-us/` — 78/100

| Element | State |
|---|---|
| Title | ⚠️ "About Us \| …" — no keyword (acceptable for an About page, low priority) |
| Meta description | ✅ 148 chars, founded 2022, licence |
| H1 | ✅ **P-4 fixed — #38, 2026-09-02.** Was "A family business that only renovates wet areas."; now "A Sydney family business that only renovates wet areas." — local signal added, voice unchanged (`docs/CONTENT_QUALITY_CHECKLIST.md` §1). |
| Content | ✅ team with real credentials, 19 verbatim reviews, insurances, standards — strong E-E-A-T |
| Schema | ⚠️ no `AboutPage` type → schema **S-4** |
| External links | ❌ says "check the NSW Fair Trading register" without linking it → content **C-4** |

### 9. Contact `/contact-us/` — 80/100

| Element | State |
|---|---|
| Title / meta | ✅ "Contact Us \| …"; description has phone + "free on-site measure" + Sydney |
| H1 | ✅ "Book a free on-site measure in Sydney." — location + intent |
| Content | ✅ phone first (evidenced channel), what-happens-next, full NAP, hours |
| Schema | ⚠️ no `ContactPage` type → schema **S-4** |
| Trust | ❌ no privacy statement near the form → content **C-1** |
| Local | ❌ no map / directions → local **#10** |

### 10. 404 `/not-found` — 88/100

| Element | State |
|---|---|
| robots | ✅ `noindex` — but **two** `<meta name="robots">` tags emitted → technical **L-1** |
| UX | ✅ helpful links out, phone CTA, clear copy |
| Content | ✅ not a soft 404; returns real 404 status |

---

## ★NEW page-specific findings (not in the other audits)

| # | Page | Finding | Priority | Effort |
|---|---|---|---|---|
| ✅ **P-1** | Homepage | ~~No FAQ block on the site's top "near me" target.~~ **Fixed — #36, 2026-09-04.** 3-question FAQ added (cost, duration, coverage) as visible `<details>` + `FAQPage` schema; see DECISIONS.md D-123. | Medium | S |
| ✅ **P-2** | `/services/` | ~~Title "Our Services" has no keyword.~~ **Fixed — #38, 2026-09-02** → "Bathroom Renovations Across Sydney" (60 chars). | Medium | S |
| **P-3** | `/gallery/` | (a) ✅ **Title fixed — #38, 2026-09-02** → "Bathroom Renovation Photos, Sydney" (60 chars). (b) ✅ **P-3b meta description fixed — #39, 2026-09-02** (221 → 150 chars). | Medium | S |
| ✅ **P-4** | `/about-us/` | ~~H1 has no location signal.~~ **Fixed — #38, 2026-09-02** → "A Sydney family business that only renovates wet areas." | Low | S |

All four are small copy/metadata edits with no dependencies. They can be bundled into one
"metadata & on-page copy tidy-up" issue alongside technical **M-5** (long titles).

---

## Cross-page patterns (already owned elsewhere — listed so the per-page view is complete)

- **`og:url` wrong on every non-home page** → technical **H-2**
- **No `og:image` except gallery detail** → technical **H-3**
- **No per-page `Service` schema** → schema **S-1**
- **Service + hub pages not answer-first** → content **C-3**, GEO **G-2**
- **No visible dates anywhere** → content **C-5**, GEO **G-1**
- **Authoritative bodies named, never linked** → content **C-4**
- **Hubs link to 404 suburb URLs** → technical/local **H-1**
- **Thin hub + 3-of-4 service pages** → content **C-2**, local **#4**
- **No privacy page / statement** → content **C-1**

---

## Confirmation

- Audit complete. All 10 page templates scored on-page; 4 net-new page-specific findings surfaced;
  every cross-page issue mapped to the audit that owns it.
- Findings saved to `plans/2026-08-31-seo-page-audit.md`.
- No files modified, nothing implemented, committed, or deployed; no implementation issues opened.
