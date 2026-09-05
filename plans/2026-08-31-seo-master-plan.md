# Master SEO Plan — Elite Touch Renovations

**Purpose.** One consolidated, de-duplicated, prioritised implementation backlog built from seven
planning-only SEO audits run 2026-08-30 / 31. This is the **plan behind the GitHub issues**
(`CLAUDE.md` → Issue Workflow: every issue traces to a plan line). Nothing here has been
implemented; this document authorises the issue set, not the code.

**Date:** 2026-08-31
**Status:** audits complete · issue set created · implementation started with **#46 doc hygiene**

---

## 1. Audits consolidated

| # | Audit | File | Score | Owns |
|---|---|---|---|---|
| 1 | `/seo-technical` | `plans/2026-08-31-issue-15-seo-technical-audit.md` | 84/100 | crawl, index, canonicals, headers, CWV foundation, OG plumbing |
| 2 | `/seo-local` | `plans/2026-08-31-seo-local-audit.md` | 61/100 | GBP support, NAP, hubs, reviews display, local schema, citations |
| 3 | `/seo-schema` | `plans/2026-08-31-seo-schema-audit.md` | 79/100 | JSON-LD validation, `@graph`/`@id`, Service/ImageObject nodes |
| 4 | `/seo-content` | `plans/2026-08-31-seo-content-audit.md` | 76/100 | E-E-A-T, thin pages, answer-first, trust (privacy), freshness |
| 5 | `/seo-images` | `plans/2026-08-31-seo-images-audit.md` | 82/100 | alt text, formats, image sitemap, IPTC, `sizes` accuracy |
| 6 | `/seo-geo` | `plans/2026-08-31-seo-geo-audit.md` | 74/100 | AI-search visibility, refresh cadence, front-loaded answers |
| 7 | `/seo-page` | `plans/2026-08-31-seo-page-audit.md` | per-template | on-page scorecards, 4 page-specific misses |

**Audits performed / skipped and why** — see §7.

---

## 2. Where the site stands

**Strong, verified, leave alone:** one canonical URL form (`https`/`www`/trailing-slash, D-41);
clean `robots.txt` + `sitemap.xml`; correct 404 (`noindex`) and 410 handling; **full SSR — every
word and every JSON-LD block in the initial HTML**; `HomeAndConstructionBusiness`+`Organization`
dual-typed schema, `WebSite`, `BreadcrumbList` on all sub-pages, `FAQPage` on 2 pages; HTTPS + HSTS
preload; `next/image` everywhere with dimensions, lazy-loading and one preloaded LCP image per page;
`<html lang="en-AU">`; 19 verbatim testimonials; NAP byte-identical across page and schema (one
source file); real first-party project photography with disciplined alt text; readability 24/24
pages ≥ Flesch 60 (D-109); `llms.txt` live (D-90).

**The gap, in one line per theme:**
- **Local:** GBP support signals weak, the site never *displays* its rating, the 3 hub pages are
  swap-test-fragile, 4 internal links 404, off-site citations thin.
- **Content:** no privacy policy behind a live PII form; 3 of 4 service pages are near-duplicates;
  service + hub pages aren't answer-first; no freshness dates anywhere.
- **Schema:** valid but disconnected (no `@graph`/`@id`); no per-page/per-hub `Service`; business
  node missing `geo`/`priceRange`/`logo`/`image`.
- **Technical:** ~~`og:url` wrong sitewide~~ fixed via `buildMetadata()` (#19, 2026-09-04); no
  `og:image`, ~~sitemap `lastmod` fakes freshness~~ fixed (#23/#41), no CSP. *(All already
  issue-ified — #17–#28.)*
- **GEO:** brand-new domain with zero freshness signals on the cheapest AI-citation factor.

---

## 3. Consolidated finding registry (deduped)

**Legend:** ✅ already an issue (#17–#28) · 🆕 new issue this plan · ⛔ removed/deferred (see §5)

| Finding | Source audit(s) | Disposition |
|---|---|---|
| Dead hub→Tier-1-suburb links (4→6, 404) | tech H-1, local #2, page | ✅ **#17** |
| 404 double-robots meta + robots `Host:` | tech L-1/L-4 | ✅ **#18** |
| `og:url` = homepage sitewide → `buildMetadata()` helper | tech H-2, page | ✅ **#19** shipped 2026-09-04 |
| No `og:image` / `twitter:image` sitewide | tech H-3, page | ✅ **#20** |
| Two `<title>` tags over length | tech M-5 | ✅ **#21** shipped 2026-09-04 |
| No per-page `Service` schema (4 service pages) | tech M-1, schema S-1, local #5 | ✅ **#22** (needs 🆕 #29 for the `@id` it references) |
| Sitemap `lastmod` = build time; add `updated` field | tech M-2 | ✅ **#23** shipped 2026-09-03 via #41 |
| `ImageObject` + `og:type:article` on gallery pages | tech L-5/L-6, schema S-2 | ✅ **#24** shipped 2026-09-04 (L-6 via #38 2026-09-03, L-5 via #24) |
| Report-only CSP + `Permissions-Policy` | tech M-4 | ✅ **#25** |
| Enable AVIF in `next/image` (+ `minimumCacheTTL`) | tech L-3, images I-5 | ✅ **#26** (comment adds cache-TTL line) |
| Measure live-domain CWV (+ `sizes` accuracy) | tech L-8, images I-4, PERF rule 15 | ✅ **#27** (comment adds `sizes` sub-task) |
| IndexNow key + deploy ping | tech L-2 | ✅ **#28** |
| **Verify Google Business Profile** (category, rating, count, NAP) | local #1 | 🆕 **#29** (owner) |
| **Schema: consolidate into `@graph` + `@id` + page-type nodes** | schema F-2/S-4, local #5, geo | 🆕 **#30** |
| **Schema: `Service` on the 3 hubs + `OfferCatalog`** | schema S-1, local #5 | 🆕 **#31** |
| **Enrich LocalBusiness node** (geo, priceRange, contactPoint, logo, image, E.164 phone) | schema S-3, local #6 | 🆕 **#32** |
| **Show the Google rating on-site + `aggregateRating`** | local #3 | 🆕 **#33** (depends #29) |
| **Service pages: real per-service content + FAQ + answer-first** (bathroom/ensuite/laundry) | content C-2/C-3/C-7, local #14, geo G-2, page | 🆕 **#34** |
| **Hubs: de-template — local content, local FAQ, testimonial, answer-first, packages link** | local #4, content C-3, geo G-2, page | ✅ **#35** shipped 2026-09-03 (D-121); `lib/hubContent.ts` |
| **Homepage: add an FAQ block** | page P-1, content | ✅ **#36** shipped 2026-09-04 |
| **Add a privacy policy page + form privacy notice** | content C-1 | ✅ **#37** shipped 2026-09-02 (commit `867e30c`), doc-verified 2026-09-03 (D-122) |
| **On-page copy tidy: keyword-weak `/services/` + `/gallery/` titles, `/about-us/` H1, gallery `og:type`** | page P-2/P-3a/P-4, coord. #21 | ✅ **#38** shipped 2026-09-02 (titles + H1), 2026-09-03 (`og:type`/L-6); L-5 `ImageObject` shipped separately in #24 |
| **Gallery meta descriptions: trim the 6 over-length project + the index description** | tech M-3, page P-3b | ✅ **#39** shipped 2026-09-02 |
| **Spread internal links to the hubs + reciprocal gallery→hub links** | local #7, page | 🆕 **#40** (depends #17, #35) |
| **Visible freshness: render real dates + completion years + image-sitemap entries + quarterly review cadence** | content C-5, geo G-1, images I-1 | ✅ **#41** shipped 2026-09-03 |
| **Link out to authoritative bodies** (NSW Fair Trading, Standards Australia, HIA) | content C-4 | ✅ **#42** |
| **Packages: add a comparison `<table>`** | content C-6, schema, geo | ✅ **#43** shipped 2026-08-31 |
| **Gallery polish: project story paragraphs + IPTC/XMP file metadata + trim over-long alts** | content C-8, images I-2/I-3 | ✅ **#44** shipped 2026-09-01 |
| **Off-site local program: Bing Places, Apple Business Connect, citations, review loop, local authority** | local #8/#9/#11/#12/#15 | 🆕 **#45** (owner) — on-site review prompt shipped 2026-08-31; external listings still owner-paced |
| **Doc hygiene sweep** (2023→2022, 18→19 reviews, warranty, FAQ-rich-result note, RSL skip, 14px-font note) | content C-9, schema F-1, geo G-4, tech L-7 | ✅ **#46** shipped 2026-08-31 |
| Publish Inner West + North-Western hubs | local #13 | ⛔ deferred — #35 depth bar now set (D-121); still owner sign-off (D-76) |
| Bathroom-cost estimator tool | geo G-3 | ⛔ deferred — needs owner formula input; backlog |
| `Person` schema depth (sameAs, credentials) | schema S-5 | ⛔ deferred — no trigger until buyer-guide content exists |
| RSL 1.0 licensing | geo G-4 | ⛔ skip — no premium content to license (noted in #46) |
| 14px body-copy audit | tech L-7 | ⛔ downgraded — a verify-checkbox inside #27, not its own issue (`DESIGN.md` is authoritative for type) |

---

## 4. Prioritised roadmap

Ordered by **SEO impact × business value ÷ (risk × effort)**, then by dependency. Phases group work
that can run in one focused pass. **P0/P1/P2/P3** is the per-issue priority.

### Phase A — unblock & quick wins (no dependencies, low risk)
| Issue | Pri | Why now |
|---|---|---|
| **#29** verify GBP | P0 | 15-min owner task; GBP is 25% of local-pack weight; **blocks #33** |
| **#17** dead hub links | P0 | live 404s + GSC noise; tiny code change |
| ✅ **#37** privacy policy | P1 | shipped 2026-09-02; trust + conversion + compliance; PII form is live |
| **#18** robots/404 tidy | P2 | trivial, no risk |
| ✅ **#46** doc hygiene | P3 | shipped 2026-08-31; removes stale-fact landmines before content work starts |

### Phase B — the metadata & schema layer (do together; #19 is the keystone)
| Issue | Pri | Depends |
|---|---|---|
| ✅ **#19** `buildMetadata()` + `og:url` | P1 | shipped 2026-09-04 — enables #20, #21 |
| **#30** schema `@graph` + `@id` | P1 | — (enables #22, #31, #24, #32) |
| **#20** `og:image` sitewide | P1 | #19 done — unblocked |
| **#32** enrich LocalBusiness node | P1 | #30 (soft), #20 (image asset, soft) |
| **#22** per-page `Service` schema | P1 | #30 (needs the `@id` it references) |
| **#31** hub `Service` + `OfferCatalog` | P2 | #30, #22 |
| ✅ **#21** trim long titles | P2 | shipped 2026-09-04 |
| ✅ **#38** keyword-weak titles/H1 tidy | P2 | shipped 2026-09-02–03 (edited direct — #19 landed after; incl. `og:type`/L-6; L-5 `ImageObject` shipped separately in #24) |

### Phase C — content depth (the biggest organic lever)
| Issue | Pri | Depends |
|---|---|---|
| **#34** service-page content + FAQ | P1 | — (pairs with #22) |
| ✅ **#35** hub de-templating | P1 | shipped 2026-09-03 (D-121); depended #17 (done) |
| **#33** show the rating | P1 | **#29** |
| ✅ **#36** homepage FAQ | P2 | shipped 2026-09-04 (D-123) |
| ✅ **#39** gallery meta descriptions | P2 | shipped 2026-09-02 (wired direct, pre-dates #19; now migrated onto `buildMetadata()` as part of #19, 2026-09-04) |
| ✅ **#42** authority outbound links | P2 | — |

### Phase D — reinforce & measure
| Issue | Pri | Depends |
|---|---|---|
| **#40** internal links to hubs | P2 | #17, #35 |
| ✅ **#41** visible freshness + image sitemap + cadence | P2 | shipped 2026-09-03; closes #23 |
| ✅ **#43** packages comparison table | P2 | shipped 2026-08-31; `DESIGN.md` table decision recorded |
| **#25** report-only CSP | P2 | owner awareness |
| **#26** AVIF + cache TTL | P2 | measure (PERF §3) |
| **#27** live CWV baseline + `sizes` | P2 | live domain / browser |

### Phase E — polish & off-site
| Issue | Pri | Depends |
|---|---|---|
| **#45** off-site local program | P2 | #29 (NAP baseline); review-prompt code slice shipped 2026-08-31 |
| ✅ **#24** gallery `ImageObject` + `article` | P3 | shipped 2026-09-04 — `creator` deferred to #30 (soft dep, `@graph`/`@id` not landed) |
| ✅ **#44** gallery story copy + image metadata + alt trim | P3 | shipped 2026-09-01 |
| **#28** IndexNow | P3 | — |

### Dependency graph (critical paths)
```
#29 ──▶ #33 ──▶ #45(review loop)
#17 ──▶ #35 ──▶ #40
        #35 ──▶ (deferred: publish more hubs)
#19 ──▶ #20 ──▶ #32(image prop)
#30 ──▶ #22 ──▶ #31
#30 ──▶ #32 (✅ #24 shipped 2026-09-04 without waiting — `creator` deferred to #30 instead)
#23 ──▶ #41
DESIGN.md decision ──▶ #43
live domain ──▶ #27 ──▶ #26 (measure order)
```

---

## 5. Removed / deferred — and why (cross-check pass)

Every audit recommendation was re-checked against the code before landing in §3. Removed or held:

- **Publish Inner West / North-Western hubs** — the local audit noted both now have project proof,
  but `DECISIONS.md` D-73/D-76 make this an owner content decision, and it must wait until #35 sets
  the non-templated bar. **Deferred, no issue.**
- **Cost-estimator tool** (geo G-3) — genuinely high-impact for AI citation, but it needs the owner
  to sign off on the estimation logic (a wrong estimate is a lead-quality problem, cf. D-104) and
  adds client JS. **Backlog, no issue yet.**
- **`Person` schema depth** (schema S-5) — only pays off once content is authored under a named
  Dawood byline; there is no such content and none planned. **Deferred.**
- **RSL 1.0 licensing** (geo G-4) — no premium content to license. **Skip** (recorded in #46).
- **14px body-copy concern** (tech L-7) — `DESIGN.md` is authoritative for type (`CLAUDE.md`
  source-of-truth hierarchy); this is "verify in a browser", not "change". **Folded into #27 as a
  checkbox**, not its own issue.
- **`llms.txt` further investment** (geo) — present and correct; per Google + SE Ranking it is not a
  citation lever. **No further work** (note added in #46).
- **Alt-text rewrite at scale** (images I-3) — the length is a *documented deliberate trade-off*
  (D-36 accuracy-first). Issue #44 trimmed only the extreme cases over 200 chars; published gallery
  alts now have 0 over 200 chars and a max of 196.
- **Blog / topic clusters** — repeatedly rejected (D-86/D-88/D-105/D-106). Not reopened.
- **`aggregateRating` before GBP verification** — correctly withheld (D-52); it is the *second half*
  of #33, gated on #29.

---

## 6. Issue set summary

**26 issues total:** #17–#28 (technical, already created) + #29–#46 (this consolidation, 18 new).

| Range | Theme | Label |
|---|---|---|
| #17–#28 | Technical SEO | `seo-technical` |
| #29, #45 | Owner / off-site local | `seo-local` |
| #30, #31, #32 | Structured data | `seo-schema` |
| #33, ✅ #35, #40 | Local on-page | `seo-local` |
| #34, ✅ #36, ✅ #37, ✅ #38, ✅ #39, ✅ #42, ✅ #43, ✅ #44 | Content & on-page | `seo-content` |
| ✅ #41 | Freshness (content + technical) | `seo-content` |
| #46 | Documentation | `documentation` |

Each new issue carries: **From** (this plan + the owning audit finding) · Problem · Goal ·
Recommended solution · Files · Priority · Dependencies · Acceptance criteria · Testing/validation.

---

## 7. Audits performed vs skipped

### Performed (7)
| Audit | Rationale |
|---|---|
| `/seo-technical` | Core. Crawl/index/render foundation. *(→ #17–#28)* |
| `/seo-local` | ETR is a Sydney service-area business; local is its primary channel. |
| `/seo-schema` | Rich-result + AI entity resolution; the site is schema-heavy. |
| `/seo-content` | E-E-A-T + thin-page + trust review across all templates. |
| `/seo-images` | Photo-led renovation site, 55 project images. |
| `/seo-geo` | AI search = ~45% of local discovery (BrightLocal 2026); issue #8 was only a reactive report-triage. |
| `/seo-page` | Per-template on-page scorecards; caught 4 page-specific misses. |

### Skipped (with reason)
| Audit | Why skipped |
|---|---|
| `/seo-audit`, `/seo` (orchestrators) | Would re-run everything and spawn ~15 subagents; the individual passes above cover it without the duplication. |
| `/seo-sitemap` | `docs/SEO_AEO_GEO_CHECKLIST.md` Phases 0 & 2 (robots/sitemap/indexation) were fully covered by `/seo-technical`; a standalone pass would only restate M-2 + I-1. |
| `/seo-backlinks` | Requires external link-index data (Moz/Ahrefs/Common Crawl) not available in this environment; off-site link building is captured in #45. |
| `/seo-hreflang` | Single language (`en-AU`), single country. Not applicable. |
| `/seo-ecommerce` | No products, cart, or checkout. |
| `/seo-programmatic` | The data-driven page model is ~24 pages, and the Tier-1/Tier-2 split (D-10, `BATHROOM_SITE_STRUCTURE.md`) already governs it; `/seo-local` §7 covered location-page quality. |
| `/seo-cluster`, `/seo-competitor-pages`, `/seo-content-brief` | Content-*creation* tools, not audits. Relevant later when building Tier-1 suburb pages / buyer guides — not now. |
| `/seo-drift`, `/seo-decay` | Need Google Search Console time-series; the domain is ~1 week post-migration with no history. |
| `/seo-dataforseo`, `/seo-google` | API-integration enablers; no credentials, non-interactive session. |
| `/seo-maps` | Geo-grid local-pack ranking needs live tools (Local Falcon etc.); flagged as a limitation in `/seo-local`. |
| `/seo-image-gen`, `/seo-flow`, `/seo-plan` | Generators / methodology wrappers, not audits. `/seo-plan`'s output *is* this document. |
| `/seo-sxo` | Search-experience / engagement overlaps `/seo-content` (conversion) + issue #5 (performance) + `CLAUDE.md` Conversion Rules; no distinct findings it would add. |

---

## 8. Confirmation

- **All relevant audits are complete** (7 performed, 12 skipped with reasons).
- **All findings saved** — 7 audit docs + this master plan, all in `plans/`.
- **Implementation started:** issue **#46** doc hygiene shipped on 2026-08-31, and issue **#43**
  packages comparison table shipped on 2026-08-31.
- **Issues created:** #29–#46 (18 new), each traceable to a finding here; coordination comments
  added to #21, #22, #23, #24, #26, #27.
- **Not started:** remaining open issues await owner scheduling.
- **Build health (2026-09-01):** commit `3d92daa` was committed with a known red build (the
  `Project` type required `updated` / `completedByYear` before any record set them). Cleared
  2026-09-01 — all 11 project records populated; `tsc` + `next build` green. See
  `plans/2026-09-01-restore-green-build-issue-41-data-layer.md`. #40–#45 remain partially
  implemented and in progress on top of a now-green tree.
