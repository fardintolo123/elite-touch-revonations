# Structured Data (Schema) Audit — Elite Touch Renovations

**Task:** `/seo-schema` — structured-data detection, validation, and gap analysis. **Planning only.**
No files changed, nothing implemented, committed, or deployed, no implementation issues opened here.

**Date:** 2026-08-31
**Method:** parsed every `<script type="application/ld+json">` block from the 2026-08-30 production
build (`.next/server/app/**.html`) and validated it against Google's current requirements + the May
2026 schema-status rules.
**Overlap note:** the technical audit (`plans/2026-08-31-issue-15-seo-technical-audit.md` — item M-1)
and the local audit (`plans/2026-08-31-seo-local-audit.md` — items §6, #5, #6) already raised several
schema gaps. This audit **does not restate them as new work** — it confirms them, adds the
schema-specific detail, and surfaces the items those two passes did not cover. Consolidation will
merge the duplicates.

---

## Schema Score: 79 / 100

The structured data that exists is **valid, truthful, server-rendered, and uses the correct
business subtype** — that is the hard 80%. The missing 20% is connective tissue (`@id` graph),
per-page `Service`/`ImageObject` nodes, and a handful of recommended `Organization` properties.

---

## Detection & validation results

| Schema | Where | Format | Status | Notes |
|---|---|---|---|---|
| `HomeAndConstructionBusiness` + `Organization` (dual-typed, one node) | `app/layout.tsx` → every page | JSON-LD, SSR | ✅ valid | Correct subtype for a renovation/building business. Dual-typed deliberately (D-92). `@context` present, all URLs absolute, no placeholder text, `foundingDate: "2022"` is valid ISO-8601, `openingHoursSpecification` times valid, `WarrantyPromise` `unitCode: "ANN"` correct. |
| `WebSite` | `app/layout.tsx` → every page | JSON-LD, SSR | ✅ valid | Minimal (name + url). No `SearchAction` — correct, there is no on-site search (D-92). |
| `BreadcrumbList` | `components/BreadcrumbSchema.tsx` → all 8 non-home page types | JSON-LD, SSR | ✅ valid | `name` + absolute `item` on every `ListItem`, sequential `position`. Google-compliant. Home correctly has none. |
| `FAQPage` | `components/FaqSchema.tsx` → `/packages/`, `/services/powder-room-renovations/` | JSON-LD, SSR | ⚠️ valid but no longer a rich result | See F-1 below. Question/answer text matches the visible `<details>` block exactly (no hidden-content mismatch). |
| `Service` (dedicated, per page) | — | — | ❌ missing | Only a generic `{"@type":"Service","name":"Bathroom renovation"}` nested inside the sitewide `makesOffer`, repeated identically on every page. See S-1. |
| `ImageObject` (gallery photos) | — | — | ❌ missing | 61 project photos, all with hand-written factual alt text ready to use as `caption`. See S-2. |
| `Review` / `AggregateRating` | — | — | ⛔ deliberately omitted | Correct (D-03 / D-52) — 17 Google reviews vs 19 testimonials, and the 5.0/17 is unverified live. Unblocks once the GBP is verified. |
| Microdata / RDFa | — | — | ✅ none | JSON-LD only, as Google prefers. |
| Deprecated types (HowTo, SpecialAnnouncement, ClaimReview, VehicleListing, CourseInfo…) | — | — | ✅ none in use | Clean. |

**No validation errors.** No syntax faults, no relative URLs, no invalid types, no placeholder
strings, no wrong data types, dates well-formed.

---

## Findings

### F-1 · `FAQPage` no longer produces a rich result (Google retired it for ALL sites, 7 May 2026)

**Shipped 2026-08-31 via #46.** `docs/SEO_AEO_GEO_CHECKLIST.md` now treats `FAQPage` as an
AI/entity-clarity signal only and links to Google's 2026 changelog.

**What.** As of 7 May 2026 Google removed the FAQ rich result for every site (this supersedes the
2023 gov/health-only restriction). `FAQPage` markup now does **nothing** in the classic SERP.

**Why it matters here.** ETR has `FAQPage` on `/packages/` and `/services/powder-room-renovations/`,
and `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 + `DECISIONS.md` D-107 both frame FAQ schema as a
SERP-feature play. That assumption is now stale.

**What to do.**
- **Keep** the existing `FAQPage` markup — it still helps AI Mode / AI Overviews / ChatGPT resolve
  entities and lift answers, and the cost of keeping it is zero.
- **Do not add more FAQ blocks *for the schema*** — add them because the visible `<details>` Q&A is
  genuinely useful to buyers and to answer engines (AEO), which it is.
- **Update the two docs** so a future session doesn't chase a dead SERP feature: note in
  `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 that FAQ rich results are retired and `FAQPage` is now an
  AI-only signal.
- For any genuine user-driven Q&A page (not marketing FAQ), the correct type is `QAPage`, not
  `FAQPage` — not currently relevant to ETR.

**Priority:** Low (doc correction + a mindset fix, no code). **Effort:** S. **Risk:** none.

### F-2 · No connected schema graph — every block floats independently

**What.** Each page emits 3–4 separate top-level `<script>` blocks (LocalBusiness, WebSite,
BreadcrumbList, sometimes FAQPage) with **no `@id` on any node and no cross-references.** Nothing
tells Google that the `BreadcrumbList` on `/packages/` belongs to the same site as the
`HomeAndConstructionBusiness` node, or that the `FAQPage` is `about` the packages service.

**Why it matters.** Google and AI answer engines build an entity graph. Connected nodes
(`@id` + `isPartOf` / `about` / `publisher` / `provider` references) resolve into one coherent
business entity; disconnected nodes are weaker signals and can be parsed as unrelated. This is the
single highest-leverage schema improvement available.

**What to do.** Move to one `@graph` array per page:
- Give the business node a stable `@id`: `https://www.elitetouchrenovations.au/#business`.
- Give the `WebSite` node `@id: …/#website` and `publisher: { "@id": "…/#business" }`.
- Each page adds a `WebPage` node (`@id` = page URL + `#webpage`, `isPartOf` → `#website`,
  `breadcrumb` → the BreadcrumbList `@id`, `primaryImageOfPage` where one exists).
- `Service` and `FAQPage` nodes reference `provider` / `about` → `#business` or the page's
  `Service` `@id`.

**Priority:** Medium. **Effort:** M (refactor `components/` + `app/layout.tsx` into a shared
`lib/schema.ts` builder). **Risk:** low — same facts, better wired. Validate with the Rich Results
Test + Schema.org validator before/after.

### S-1 · No dedicated `Service` schema on the four service pages or the three hubs

Confirmed (technical audit M-1, local audit #5). Schema-specific detail:

- The only `Service` node today is `makesOffer.itemOffered` — generic, name "Bathroom renovation",
  present on *every* page including the About and Contact pages, which is noise.
- **Replace with a cleaner structure:**
  - On the business node, an `hasOfferCatalog: { "@type": "OfferCatalog", "name": "Bathroom
    renovation services", "itemListElement": [ …one Offer per service… ] }` — expresses all four
    services in one place.
  - On each `/services/{slug}/` page, a `Service` node: `name` = the service, `description` =
    `service.summary`, `serviceType` = "Bathroom renovation", `provider: { "@id": "#business" }`,
    `areaServed` = Sydney, `url` = the canonical.
  - On each hub, the same `Service` node but `areaServed` = the region (`{"@type":
    "AdministrativeArea", "name": "North Shore, Sydney"}`) — this is what makes a "Bathroom
    Renovations North Shore" page assert its own geographic scope.

**Priority:** High (it is the #1 local-organic factor's schema backing). **Effort:** M.
**Files:** new `components/ServiceSchema.tsx` or `lib/schema.ts`, `app/services/[slug]/page.tsx`,
`app/services/[slug]/[location]/page.tsx`, `app/layout.tsx`.

### S-2 · No `ImageObject` on gallery project pages

**What.** `/gallery/{slug}/` pages render 3–8 real project photos each, every one with a
hand-written, factual `alt` string (`lib/projects.ts`, enforced by D-36/§4.9). None is marked up as
`ImageObject`.

**Why it matters.** `ImageObject` (with `contentUrl`, `caption` = the alt text, `creator` →
`#business`, `representativeOfPage` on the lead image) is a live rich-result-supporting type. On a
photo-led renovation site it strengthens Google Images eligibility and gives answer engines
captioned, attributed images to cite. The alt text is already written — this is low-cost.

**Priority:** Medium. **Effort:** S–M. **Files:** `app/gallery/[slug]/page.tsx`, `lib/projects.ts`.
**Dependency:** cleaner if F-2's `@graph` lands first (so `creator` can reference `#business`).

### S-3 · `Organization` recommended properties missing

Confirmed (local audit §6). Schema-specific list — all belong on the one business node:

| Property | Value to use | Note |
|---|---|---|
| `logo` | absolute URL to `public/brand/etr-mark.webp` (or a PNG/larger WebP) | Organization rich-result requirement; also feeds the knowledge panel. |
| `image` | the default 1200×630 OG image (technical audit H-3) | Recommended for LocalBusiness. Same asset solves 3 findings. |
| `priceRange` | `"$18,000–$40,000+"` or `"$$$"` | Keep < 100 chars; tie to `/packages/` "from" framing (D-07). |
| `contactPoint` | `{ "@type": "ContactPoint", "telephone": "+61411752334", "contactType": "sales", "areaServed": "AU", "availableLanguage": "en" }` | Cleaner than the bare top-level `telephone`. |
| `geo` | `GeoCoordinates`, suburb-centroid, 5+ decimals | SAB — a coarse point, not implying a walk-in office. |
| `telephone` (existing) | change `"0411 752 334"` → `"+61411752334"` | International format per Google's guidance. |
| `slogan` / `knowsAbout` | optional | Minor GEO/entity nicety — "bathroom waterproofing", "AS 3740", "wet-area renovation". |

**Priority:** Medium (the first four), Low (the rest). **Effort:** S — one node, one file
(`app/layout.tsx` + `lib/businessInfo.ts`).

### S-4 · Page-type schema not used (`WebPage` / `AboutPage` / `ContactPage` / `CollectionPage`)

Minor. `/contact-us/` could carry `ContactPage`, `/about-us/` `AboutPage`, `/gallery/`
`CollectionPage` (or `ImageGallery`), each `isPartOf` the `WebSite`. This mostly matters once F-2's
`@graph` exists — a `WebPage`/`AboutPage` node is the natural hook for `breadcrumb` and
`primaryImageOfPage`. Fold into F-2. **Priority:** Low.

### S-5 · `Person` nodes are thin

The four Dawoods appear as `employee` (and Omar as `founder`) with `name` + `jobTitle` only. Adding
`sameAs` (a LinkedIn profile where one exists) and, for Omar, `hasCredential` (the builder licence,
already on the business node) would strengthen E-E-A-T / author-entity signals — relevant if any
buyer-guide content is ever authored under a named Dawood. **Priority:** Low. **Dependency:** the
`seo-content` audit's E-E-A-T recommendations.

---

## What is already correct — leave alone

- Correct primary subtype (`HomeAndConstructionBusiness`), dual-typed with `Organization`.
- All structured data is in the **server-rendered HTML** (Google's Dec-2025 JS-SEO guidance — no
  JS-injection delay risk).
- `BreadcrumbList` — valid, complete, on every non-home page, home correctly excluded.
- `WebSite` without a fabricated `SearchAction`.
- `Review`/`AggregateRating` correctly withheld pending live GBP verification.
- No deprecated types anywhere.
- `WarrantyPromise` with `QuantitativeValue` + `unitCode: "ANN"` — a genuinely good, uncommon touch.
- `identifier` array carrying ABN + ACN as `PropertyValue` — correct pattern.
- `hasCredential` → `EducationalOccupationalCredential` for the builder licence — correct.

---

## Consolidated schema recommendations (dedupe map for the master plan)

| Schema item | Also raised in | Master-plan treatment |
|---|---|---|
| Per-page / per-hub `Service` schema | technical M-1, local #5 | **One issue**, this audit's S-1 has the fullest spec. |
| `Organization` `logo`/`image`/`priceRange`/`geo`/E.164 phone | local §6, #6 | **One issue** (schema enrichment), S-3 has the property table. |
| `@graph` + `@id` architecture | new here (F-2) | **One issue** — do this first; S-2, S-4, S-5 depend on it. |
| `ImageObject` on gallery | new here (S-2) | **One issue**, or fold into the gallery-image issue from `seo-images`. |
| `aggregateRating` once GBP verified | local #3, technical (noted) | part of the **"show the rating" issue**, gated on GBP verification. |
| FAQ rich-result retirement | new here (F-1) | **Doc-update task**, not a code issue. |

---

## Confirmation

- Audit complete. All JSON-LD on all 24 routes parsed and validated; no errors found; gaps and
  opportunities catalogued and de-duplicated against the technical and local audits.
- Findings saved to `plans/2026-08-31-seo-schema-audit.md`.
- No files modified, nothing implemented, committed, or deployed; no implementation issues opened.
