# Technical SEO Audit — Elite Touch Renovations (GitHub issue #15)

**Task:** `/seo-technical` — full technical SEO audit. The audit itself was **planning only** — no
files changed, nothing committed or deployed. This document is the deliverable, written to be
consolidated with the other SEO audits later (issue #5 performance, issue #8 GEO, issue #16
indexation).

**Update 2026-08-31:** owner greenlit implementation. The 13 numbered steps below are now GitHub
issues **#17–#28** — see the **Implementation tracker** section at the end of this file. Each issue
traces back to its finding + phase/step here and must be closed alongside its tracker checkbox.

**Date:** 2026-08-31
**Method:** static read of the whole codebase + inspection of the current production build output in
`.next/server/app/**.html` (built 2026-08-30, 24 page routes). The live domain
`https://www.elitetouchrenovations.au/` was **not** hit from this session and Core Web Vitals field
data was **not** pulled (no Google API credentials configured here, non-interactive session) — see
L-8.

**Routing followed (`CLAUDE.md`):** `docs/SEO_AEO_GEO_CHECKLIST.md` (Phases 0–2), `docs/PERFORMANCE_BUDGET.md`,
`PROJECT_CONTEXT.md` §4 + §6, `DECISIONS.md`. Cross-checked against the concurrent issue #16 triage
(`plans/2026-08-30-issue-16-gsc-not-indexed-triage.md`) to avoid overlap.

---

## Technical Score: 84 / 100

| Category | Status | Score | One-line |
|---|---|---|---|
| Crawlability | pass | 88 | robots.txt clean, sitemap clean, full SSR, AI crawlers allowed. Dead internal links to unbuilt suburb URLs. |
| Indexability | warn | 80 | Canonicals perfect, 404 handling correct, trailing-slash consistent. `lastmod` fakes freshness; 4 links 404; ~~6 meta descriptions overflow~~ **fixed — M-3 / #39, 2026-09-02**. |
| Security | warn | 72 | HTTPS + HSTS preload + 3 baseline headers. No CSP, no Permissions-Policy. |
| URL Structure | pass | 94 | Clean, hierarchical, one canonical form, literal 301s (not 308), no chains. |
| Mobile | pass | 86 | viewport set, responsive, 48px header CTA, 16px base. A lot of 14px body copy — verify vs DESIGN.md. |
| Core Web Vitals | pass | 82 | Local baseline 93–94 mobile (issue #5). LCP image preloaded w/ srcset, one font, zero animation libs. Never measured on the live domain. |
| Structured Data | warn | 78 | LocalBusiness+Organization, WebSite, BreadcrumbList, FAQPage all valid and in the served HTML. No per-page `Service`; `og:image`/`og:url` broken. |
| JS Rendering | pass | 96 | Everything SEO-relevant is server-rendered. One tiny client leaf (the form). Canonical/robots/schema all in initial HTML. |
| IndexNow | warn | 45 | Not implemented. Low value for a Google-first local business, cheap to add for Bing. |

**Verdict:** the foundation is genuinely strong — this is not a site with a crawl or indexation
emergency. The issues below are a short, targeted list. The single item with a real ranking/UX cost
today is the dead internal links (H-1); the rest are polish and hardening.

---

## What is already correct — do not churn this in consolidation

These were checked and pass. Later audits should leave them alone.

- **One canonical URL form.** `https://` + `www` + trailing slash, enforced by `trailingSlash: true`
  (`next.config.ts`, load-bearing per D-41). Every internal `href` in the built HTML carries the
  trailing slash — zero non-slash internal links found. Non-www 308-redirects to www in one hop
  (verified in issue #16).
- **`robots.txt`** (`app/robots.ts`) — allows everything, disallows only `/staging/`, does **not**
  block CSS/JS, references the sitemap. AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended) are all allowed, which matches the owner's "be citable in AI answers" position.
- **`sitemap.xml`** (`app/sitemap.ts`) — 24 URLs, every one a 200-status canonical page. No Tier-1
  suburb URLs leak into it (they are correctly gated behind `publishedRegions()`). No `/elementor-hf/`
  or staging entries.
- **Self-referential canonical on every indexable page** — verified in the built HTML for home,
  services index, all 4 service pages, packages, about, contact, gallery index, all 11 gallery
  projects, all 3 published hubs.
- **404 handling** — `app/not-found.tsx` sets `robots: index:false, follow:true` explicitly; the
  built `_not-found.html` carries `noindex`. Dynamic routes use `dynamicParams = false`, so unknown
  slugs return a real 404, not a soft 200. `/elementor-hf/*` returns a genuine 410 + `X-Robots-Tag:
  noindex` via `proxy.ts`.
- **JavaScript rendering** — full server-side rendering. Title, meta description, canonical, robots,
  Open Graph, and every JSON-LD block are in the initial HTML response, not injected client-side
  (this is exactly what Google's Dec-2025 JS-SEO guidance asks for). The only `'use client'` in the
  app is `EnquiryForm.tsx`, a leaf; all copy around it is server-rendered.
- **Structured data present and valid in the served HTML:** `HomeAndConstructionBusiness` +
  `Organization` (dual-typed on one node, sitewide), `WebSite`, `BreadcrumbList` on every non-home
  page, `FAQPage` on `/packages/` and `/services/powder-room-renovations/` (matching a visible
  `<details>` block on each). No `aggregateRating`/`Review` markup — deliberately omitted until the
  GBP rating is verified live (D-52), correct.
- **One `<h1>` per page**, carrying the service and (on hubs) the region.
- **HTTPS enforced** — `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
  No mixed content — zero `http://` references in the built HTML.
- **Core Web Vitals foundation** — LCP image preloaded with a real responsive `srcset`; exactly one
  preloaded woff2 font; zero animation libraries; `next/image` supplies width/height on every image
  so CLS is controlled; `prefers-reduced-motion` handled in `globals.css`.
- **`metadataBase`** is set, so relative OG image paths resolve to absolute (verified on gallery
  pages).
- **`<html lang="en-AU">`** — set.
- **Legacy migration cleanup** — 19 literal 301s in `next.config.ts` (301, not 308 — deliberate),
  specific-before-catch-all ordering, no redirect chains. Old Yoast sitemaps 404 by design.

---

## Findings by priority

### CRITICAL — none

Nothing is de-indexing the site, blocking crawl, breaking HTTPS, or hiding content from crawlers.
This section is intentionally empty.

---

### HIGH — fix within ~1 week

#### H-1 · Dead internal links from published hub pages to unbuilt Tier-1 suburb URLs

**What.** `service-areas.json` gives six Tier-1 suburbs a `url`
(`/services/bathroom-renovations/{suburb}/`). The hub renderer
(`app/services/[slug]/[location]/page.tsx`, lines ~220–233) renders any suburb with a `url` as a
`<Link>`. But `[location]/page.tsx` only builds pages for **published regions** (`publishedRegions()`
→ `hills-district`, `eastern-suburbs`, `north-shore`), and `dynamicParams = false`. **No Tier-1
suburb page exists.**

Result — verified in the built HTML:

| Live page | Links to (all 404) |
|---|---|
| `/services/bathroom-renovations/hills-district/` | `…/baulkham-hills/`, `…/castle-hill/`, `…/kellyville/` |
| `/services/bathroom-renovations/eastern-suburbs/` | `…/randwick/` |

That is **4 broken internal links today**, rising to **6** the moment the Inner West or
North-Western Sydney hub is published (Marrickville, Ryde).

**Why it matters.** A visitor on the Hills District page who taps "Castle Hill" — a Tier-1 target
suburb — lands on a 404. Google will report these as "Not found (404)" in Search Console (the same
report issue #16 is about), spends crawl budget on them, and sees a hub page linking to dead ends.
It also undercuts the D-10 rationale: the hub is meant to be the *quality* signal for the area.

**Fix (immediate, code-only).** Stop emitting the dead links. Either (a) add
`pagePublished?: boolean` to the Tier-1 suburb entries and have the hub link only when `true`
(sitemap and `generateStaticParams` already ignore these entries, so nothing else changes), or (b)
in the hub renderer compute the set of actually-built location slugs and gate the `<Link>` on
membership — render the suburb as plain text (identical to how Tier-2 suburbs already render) until
its page exists. No redirect needed — these URLs have never been indexed (new route structure,
D-71).

**Fix (strategic).** Build the six Tier-1 suburb pages with genuine local substance
(`docs/SEO_CONTENT_GUIDE.md` §5, priority 3; `docs/BATHROOM_SITE_STRUCTURE.md`). That is a content
project, not part of this technical pass — but it is the reason the `url` fields exist, so it should
be scheduled, not forgotten.

**Files:** `app/services/[slug]/[location]/page.tsx`, `lib/locations.ts`, `service-areas.json`.
**Effort:** S for the interim gate. **Risk:** low.

**SHIPPED / #17 CLOSED 2026-09-01.** The interim gate landed as a side effect of #40 in commit
`3d92daa`: the suburb `<Link>` is now `suburb.url && publishedLocationSet.has(suburb.slug)`, and
`publishedLocationSet` holds *region* slugs, so every Tier-1 suburb renders as plain text until a real
page exists. Verified against the fresh production build — the 4 dead `href`s are gone, the 4 suburb
names remain as text. Strategic fix (build the suburb pages) is still a separate content project.

#### H-2 · `og:url` is hard-coded to the homepage on every page

**What.** `app/layout.tsx` sets `openGraph.url: businessInfo.siteUrl` once. Per-page metadata only
sets `alternates.canonical` — Next does **not** derive `og:url` from the canonical. So every page
ships `<meta property="og:url" content="https://www.elitetouchrenovations.au/">`. Verified on
`/packages/`, `/services/`, `/about-us/`, `/contact-us/`, `/gallery/`, `/services/bathroom-renovations/`,
the hubs — all wrong. (Gallery project pages set their own `openGraph` and are correct.)

**Why it matters.** `og:url` is the canonical URL for the social/answer-engine graph. Sharing
`/packages/` on LinkedIn, Facebook, Slack, or WhatsApp produces a card that links to the homepage,
not the packages page. Some crawlers (and some AI answer engines) treat `og:url` as a canonical
hint that competes with `<link rel="canonical">`.

**Fix.** Introduce one shared `buildMetadata({ path, title, description, image? })` helper in `lib/`
that sets `alternates.canonical` **and** `openGraph.url` (and `openGraph.title`/`description`) from
the same `path`, and use it in every page's `metadata` / `generateMetadata`. Alternatively, delete
`openGraph.url` from the layout entirely (Next then omits the tag rather than emitting a wrong one) —
smaller change, but a correct per-page `og:url` is the better outcome.

**Files:** `app/layout.tsx` + every `app/**/page.tsx` (or a new `lib/metadata.ts`).
**Effort:** M. **Risk:** low.

#### H-3 · No `og:image` / `twitter:image` anywhere except gallery project pages

**What.** The homepage, services index, all 4 service pages, packages, about, contact, gallery
index, and all 3 hubs ship **no** `og:image` and **no** `twitter:image`. `twitter:card` is
`summary` (small card) rather than `summary_large_image`. Only the 11 `/gallery/{slug}/` pages have
an image, and that is a raw project `.webp` (~3:2, ~1180px), not a dedicated 1200×630 crop, with no
`og:image:width`/`height`.

**Why it matters.** `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 requires `og:image` — "a real 1200×630
crop". `docs/PERFORMANCE_BUDGET.md` rule 19 anticipated this exact need. Share links to the
homepage and the money pages (packages, services, contact) currently render a bare text card, which
measurably lowers click-through from social and messaging apps — the channels a family trade
business actually gets shared in — and weakens the preview some AI answer surfaces show.

**Fix.** Generate one default 1200×630 OG image (brand mark + "Sydney Bathroom Renovations" + a
strong project photo) and set it as `openGraph.images` in the layout so every page inherits it;
override per-page where a better image exists (packages, each service, each hub). Give gallery
project pages a proper 1200×630 crop of their lead photo rather than the raw asset. Switch
`twitter:card` to `summary_large_image` once an image exists. Keep every crop within the
`docs/PERFORMANCE_BUDGET.md` image budget — OG images are fetched by crawlers, not users, but still
count as project weight.

**Files:** `app/layout.tsx`, `app/**/page.tsx`, a build step or committed crops under `public/`.
**Effort:** M. **Risk:** low.

---

### MEDIUM — fix within ~1 month

#### M-1 · No per-page `Service` structured data on the four service pages

The only `Service` node in any page is the generic one nested inside the sitewide LocalBusiness
`makesOffer` (`{"@type":"Service","name":"Bathroom renovation","areaServed":"Sydney"}`), which
appears identically on every page. `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 asks for `Service` **on
each service page**. Add a dedicated `Service` JSON-LD per service page — `name` = the service,
`description` = its summary, `provider` = `@id` reference to the LocalBusiness node, `areaServed` =
Sydney, `serviceType` = "Bathroom renovation" — mirroring the existing `BreadcrumbSchema` /
`FaqSchema` component pattern. Files: new `components/ServiceSchema.tsx`, `app/services/[slug]/page.tsx`.
Effort: S. Risk: low.

#### M-2 · `sitemap.xml` `lastmod` is the build timestamp on every URL

`app/sitemap.ts` sets `const lastModified = new Date()` and applies it to all 24 entries. The
current build stamped every page `2026-08-30T04:44:35.557Z`. `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 2
is explicit: "`lastmod` changes only for meaningful content changes … Fake freshness is a trust
signal spent for nothing." Because Vercel rebuilds on every deploy, every unrelated deploy currently
tells Google all 24 pages changed. Fix: carry a real `updated` date on each content record
(`services`, `projects`, region entries) and in a small map for the static routes; emit that.
Files: `app/sitemap.ts`, `lib/businessInfo.ts`, `lib/projects.ts`, `service-areas.json`.
Effort: M. Risk: low.

#### M-3 · Six gallery project meta descriptions exceed 160 characters

**SHIPPED / #39 2026-09-02** (uncommitted at time of writing — shared-tree, see note). `lib/projects.ts`
gained an optional `metaDescription` field + `projectMetaDescription()` helper (hand-written value,
else `blurb` trimmed at a word boundary to ≤155). Hand-wrote 9 descriptions (audit named 6; a
re-count found 3 more at 159–172). `app/gallery/[slug]/page.tsx` `generateMetadata` and
`app/gallery/page.tsx` `metadata.description` now use ≤155-char copy; `twitter:description` auto-fills
from `og:description`. Verified against the fresh production build: all 11 detail pages 135–147 chars,
`/gallery/` 150 chars, all three of `description`/`og:description`/`twitter:description` present; full
`blurb` paragraphs and gallery cards render unchanged. Every fact traces to the existing
`blurb`/`story` (D-06). See D-117 and `plans/2026-09-02-issue-39-gallery-meta-descriptions.md`.

`app/gallery/[slug]/page.tsx` uses `project.blurb` verbatim as the meta description,
`og:description`, and `twitter:description`. Six of eleven blurbs are 172–221 chars (Castle Hill 221,
Randwick 211, The Rocks 204, Hornsby 199, Artarmon b+e 199, Artarmon 193). They will be truncated in
SERPs. The blurb also does duty as the visible lead paragraph and the `/gallery/` card text, so it
cannot just be cut. Fix: add a separate `metaDescription` field (≤155 chars) to each project record
and fall back to a trimmed blurb; keep `blurb` for on-page display. Files: `lib/projects.ts`,
`app/gallery/[slug]/page.tsx`, `app/gallery/page.tsx`. Effort: S–M. Risk: low. (Note: this overlaps
the content-quality remit — flag for consolidation with the CONTENT_QUALITY pass.)

#### M-4 · Security headers: no Content-Security-Policy, no Permissions-Policy

`next.config.ts` sends `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and HSTS —
good. Missing: `Content-Security-Policy` and `Permissions-Policy`. CSP is the meaningful one. It is
non-trivial here because the app emits inline `<script type="application/ld+json">` blocks and one
inline `next/script` (scroll-restoration), so a strict policy needs per-request nonces via
`proxy.ts` or hashes. Recommended: start with a **report-only** CSP plus a restrictive
`Permissions-Policy` (e.g. `camera=(), microphone=(), geolocation=()`), observe, then enforce.
Security headers are a minor trust/ranking signal but a real hardening win on a site that takes
customer contact details. Files: `next.config.ts`, possibly `proxy.ts`. Effort: M. Risk: medium
(a wrong CSP breaks rendering — hence report-only first).

#### M-5 · A couple of `<title>` tags run long

`Bathroom and Laundry Renovations Sydney | Elite Touch Renovations` = 63 chars (over the 60 guide
limit); `Bathroom Renovation Cost & Packages | Elite Touch Renovations` = 60 and the `&` widens it
further. Both risk pixel-truncation in SERPs. Trim the `laundry-renovations` `h1`/title source in
`lib/businessInfo.ts` (e.g. "Bathroom & Laundry Renovations Sydney") and consider "Bathroom
Renovation Cost, Sydney | Elite Touch" for packages. Effort: S. Risk: low (titles are indexed copy —
hand-edit, don't regex).

---

### LOW — backlog

- **L-1 · `_not-found.html` emits two `<meta name="robots">` tags** (`noindex` and `noindex,
  follow`). Both are noindex so there is no indexation risk, but it is untidy and worth tracing
  (likely a Next 16 default for the `/_not-found` segment plus the explicit `metadata` export).
  Files: `app/not-found.tsx`.
  **Traced 2026-08-31 (#18):** confirmed — Next auto-injects `<meta name="robots" content="noindex">`
  for *any* 404-status response (`not-found.md` line 187), and `app/not-found.tsx`'s `metadata.robots`
  adds the second (`noindex, follow`). Removing our export doesn't help: the page then inherits the
  root layout's sitewide `index, follow`, so the second tag becomes the worse-looking
  `<meta name="robots" content="index, follow">` on a 404 (verified via `next dev`). A one-tag result
  needs either dropping the layout-wide `index, follow` default (every page) or a deeper Next
  metadata-merge change. **Deferred — not the quick fix the finding assumed.** #18 stays open for it.
- **L-2 · IndexNow not implemented.** Adding an IndexNow key + ping on deploy gets Bing/Yandex/Naver
  to re-crawl changed URLs in hours instead of days. Low value for a Google-first Sydney local
  business; cheap. Files: new `public/{key}.txt` + a deploy hook.
- **L-3 · `next/image` has no `formats` config**, so only WebP is served (source files are already
  WebP). Adding `images: { formats: ['image/avif', 'image/webp'] }` in `next.config.ts` would shave
  ~15–25% off the LCP image and every other photo, at some build-time cost. Measure per
  `docs/PERFORMANCE_BUDGET.md` §3 before/after. Files: `next.config.ts`.
- **L-4 · `robots.txt` emits a `Host:` directive** (`app/robots.ts` returns `host`). Google ignores
  it; Yandex is the only consumer and it is deprecated there too. Harmless, but noise. Drop `host`
  from the return. **Shipped 2026-08-31 (#18), commit `b21c322`** — `host` removed from
  `app/robots.ts`; `/robots.txt` verified to no longer contain a `Host:` line (`next dev`). `tsc
  --noEmit` green after the parallel #41 fix (`2da16e8`) landed; a full `next build` was skipped to
  avoid a concurrent-build clash with other sessions.
- **L-5 · Gallery project pages carry no `ImageObject` and no `Article`/`CreativeWork` schema.**
  They are de-facto case studies (real photos, real suburb, real scope). `ImageObject` per photo
  (with `contentUrl`, `caption` = the alt text) and treating the page as `Article` would strengthen
  image-search and answer-engine eligibility. Files: `app/gallery/[slug]/page.tsx`.
- **L-6 · `og:type` is `website` on gallery project pages** (could be `article`). Trivial.
- **L-7 · A large share of visible body copy renders at 14px (`.et-body-sm`) or 13px
  (`.et-caption`)** — service summaries, all card descriptions, FAQ answers, footer. The base is a
  correct 16px. `DESIGN.md` is authoritative for type (`CLAUDE.md` source-of-truth hierarchy), so
  this is **not** asserted as a defect — but it should be eyeballed at 390px against `DESIGN.md` §11
  and the mobile-readability bar, since it interacts with the Flesch work already done (K15/D-109).
  **Recorded 2026-08-31 via #46:** `docs/PERFORMANCE_BUDGET.md` now treats this as a browser
  verification item, not an automatic typography change.
- **L-8 · Live-domain Core Web Vitals have never been measured.** The only baseline
  (`docs/PERFORMANCE_BUDGET.md` §4) is a *local* production build from 2026-08-23, taken while the
  Vercel deployment was still behind Deployment Protection. The domain is now confirmed live and
  publicly fetchable (D-98). Run PageSpeed Insights (mobile) + a CrUX check against
  `https://www.elitetouchrenovations.au/` and record it in §4 of the budget doc. Not doable from
  this session (no Google API creds, non-interactive).

---

## Prioritised implementation plan

Ordered by dependency and value, not by discovery order. Each step is build-green + typecheck-clean
+ `curl | grep` the served HTML + (for anything touching weight) the `docs/PERFORMANCE_BUDGET.md`
before/after. Nothing here has been implemented.

### Phase 1 — stop the bleeding (1 sitting, code-only)
1. **H-1 interim** — gate the hub suburb `<Link>` on "page actually built"; Tier-1 suburbs render as
   plain text until their pages exist. Verify the 4 dead links are gone from
   `hills-district.html` / `eastern-suburbs.html` and no new 404-links appear if a hub is toggled.
2. **L-1** — collapse the `_not-found` double robots tag while in that file.
3. **L-4** — drop the `Host:` line from `app/robots.ts`.

### Phase 2 — the metadata layer (1–2 sittings)
4. **H-2** — add `lib/metadata.ts` `buildMetadata()`; migrate every page to it so `canonical` and
   `og:url` always agree. Verify `og:url` on 6 sample pages.
5. **H-3** — commit one default 1200×630 OG image; wire it into the layout; override for packages +
   each service + each hub; give gallery pages a real crop; switch `twitter:card` to
   `summary_large_image`. Re-check image weights against the budget.
6. **M-5** — hand-trim the two long titles.

### Phase 3 — structured data + sitemap (1–2 sittings)
7. **M-1** — `components/ServiceSchema.tsx`; add to the 4 service pages; validate with the Rich
   Results Test.
8. **M-2** — real per-content `lastmod` in `app/sitemap.ts`.
9. **L-5 / L-6** — `ImageObject` + `article` type on gallery project pages (optional, same sitting).

### Phase 4 — hardening + measurement (owner sign-off gates)
10. **M-4** — report-only CSP + `Permissions-Policy` in `next.config.ts`; observe reports; then
    enforce in a follow-up. **Needs owner awareness** (a wrong CSP is user-visible).
11. **L-3** — enable AVIF; measure LCP before/after per the budget.
12. **L-8** — live PSI + CrUX run; update `docs/PERFORMANCE_BUDGET.md` §4. **Do this first if the
    owner wants a "where are we really" number** — it needs no code change.
13. **L-2** — IndexNow, if wanted.

### Not in this plan (content projects, separate track)
- Build the six Tier-1 suburb pages (`docs/SEO_CONTENT_GUIDE.md` priority 3) — the strategic fix
  behind H-1.
- **M-3** rewrite of the six long gallery blurbs — belongs with the content-quality pass, not here.

---

## Implementation tracker

Owner greenlit implementation 2026-08-31. Each step below is one GitHub issue. **Execute top to
bottom.** When an issue ships: tick its box here, add `shipped <date> <commit>` next to the finding
it fixes, and close the issue — all in the same change (per `CLAUDE.md` Issue Workflow).

> **Consolidation note (2026-08-31):** a separate pass merged all seven SEO audits into
> `plans/2026-08-31-seo-master-plan.md` and opened issues **#29–#46**. That plan keeps #17–#28 as-is
> (its §3 registry marks them ✅ already-issued) and adds cross-reference comments to #21–#27. Where
> the master plan and this tracker disagree on ordering, the master plan's Phase A–E roadmap wins.

### Phase 1 — stop the bleeding (code-only, 1 sitting)
- [x] **#17 · H-1 — CLOSED 2026-09-01.** Hub pages stop linking to unbuilt Tier-1 suburb URLs. Fixed as a side effect of #40 in commit `3d92daa` (the `<Link>` is gated on `publishedLocationSet.has(suburb.slug)`; no published-region slug matches a suburb slug, so all four Tier-1 suburbs render as plain text). **Verified** against the fresh production build (`.next`, 2026-09-01 10:47): no `href` to `/services/bathroom-renovations/{baulkham-hills,castle-hill,kellyville,randwick}/` on either published hub; all four suburb names still present as text. Latent follow-up noted at `[location]/page.tsx:227` for when a real Tier-1 suburb page is built. *(Phase 1, step 1.)*
- [~] **#18 · L-1 + L-4** — **L-4 shipped** (`Host:` line removed from `app/robots.ts`; verified absent from `/robots.txt` via `next dev`). **L-1 traced, deferred**: the 404 carries two `<meta name="robots">` tags — our explicit `noindex, follow` plus a `noindex` Next auto-injects for every 404-status response. Both are noindex (no risk). Collapsing to one needs either dropping the sitewide `index, follow` layout default (touches every page) or a deeper Next metadata change — not the "trivial" fix the finding assumed. Keep #18 open for the L-1 decision. *(Phase 1, steps 2–3.)*

### Phase 2 — the metadata layer (1–2 sittings)
- [ ] **#19 · H-2** — `lib/metadata.ts` `buildMetadata()`; per-page `og:url` = canonical. *(Phase 2, step 4. No dep. **Blocks #20.**)*
- [ ] **#20 · H-3** — `og:image` / `twitter:image` sitewide; `summary_large_image`. *(Phase 2, step 5. **Depends on #19.**)*
- [ ] **#21 · M-5** — trim the two over-length `<title>` tags. *(Phase 2, step 6. Fold into #19 if that lands first.)*

### Phase 3 — structured data + sitemap (1–2 sittings)
- [ ] **#22 · M-1** — per-page `Service` JSON-LD on the 4 service pages. *(Phase 3, step 7. No dep.)*
- [ ] **#23 · M-2** — real per-content `lastmod` in `app/sitemap.ts`. *(Phase 3, step 8. No dep.)*
- [ ] **#24 · L-5 + L-6** — `ImageObject` + `article` type on gallery project pages. *(Phase 3, step 9. Optional / lowest; same sitting as #22–#23.)*

### Phase 4 — hardening + measurement (owner / creds gates)
- [ ] **#25 · M-4** — report-only CSP + `Permissions-Policy`. *(Phase 4, step 10. **Blocked: owner awareness before enforce.**)*
- [ ] **#26 · L-3** — enable AVIF; measure LCP + build time before/after. *(Phase 4, step 11.)*
- [ ] **#27 · L-8** — live-domain PSI + CrUX into `PERFORMANCE_BUDGET.md` §4. *(Phase 4, step 12. **Blocked: Google API creds / interactive.** Do first if the owner wants a "where are we really" number — no code.)*
- [ ] **#28 · L-2** — IndexNow key + deploy ping. *(Phase 4, step 13. **Blocked: owner decision — do we want Bing/Yandex fast-crawl?**)*

**Not issued** (deliberately — see "Not in this plan" above): the six Tier-1 suburb pages (content
project behind H-1) and L-7 (14px body copy — `DESIGN.md` is authoritative; flagged for an eyeball,
not asserted as a defect). *(M-3 was later issue-ified by the master plan as #39 and shipped
2026-09-02 — a metadata-only fix, no visible-blurb rewrite.)*

---

## Out of scope / deliberately not flagged

- **`aggregateRating` / `Review` schema** — omitted on purpose until the GBP 5.0/17 is verified live
  (D-52, K2). Not a defect.
- **Analytics / call tracking not installed** — open owner decision K4; not a technical-SEO defect.
- **The Tier-1/Tier-2 suburb split, the 4 unpublished hubs, the `laundry` slug wording** — all
  settled (D-10, D-71, D-73, D-45). Not reopened.
- **Blog / topic clusters** — repeatedly triaged and rejected (D-86, D-88, D-105, D-106).
- **Shared-route JS at 179 KB gzip** — over the 150 KB line, under the 230 KB cap, accepted in
  writing (D-80). Not re-litigated here.
- **Issue #16 (GSC "not indexed")** — already triaged; `/services/` is fully indexable and just in
  the normal post-migration "crawled – currently not indexed" holding state. Nothing to add.

---

## Checklist

- [x] Task routed; `SEO_AEO_GEO_CHECKLIST.md`, `PERFORMANCE_BUDGET.md`, `SEO_CONTENT_GUIDE.md`,
      `PROJECT_CONTEXT.md`, `DECISIONS.md` read
- [x] `DECISIONS.md` checked — no settled decision reversed; overlaps with D-10/D-41/D-52/D-71/D-80
      noted, not reopened
- [x] Whole `app/`, `components/`, `lib/`, `next.config.ts`, `proxy.ts`, `service-areas.json`,
      `globals.css` read
- [x] Current production build output (`.next/server/app/**.html`, 24 routes) inspected for
      canonical, robots, OG/Twitter, JSON-LD, headings, hreflang, internal links
- [x] Concurrent issue #16 triage read to avoid duplicate/conflicting findings
- [x] No files modified, nothing committed, no implementation issues opened
- [x] Findings prioritised Critical / High / Medium / Low with file paths, effort, risk
- [x] Implementation plan is phased and dependency-ordered
- [ ] Owner review + consolidation with issues #5 / #8 / #16 into one SEO work queue
