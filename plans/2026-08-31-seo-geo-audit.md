# GEO / AI-Search Visibility Audit — Elite Touch Renovations

**Task:** `/seo-geo` — visibility in AI answer surfaces (Google AI Overviews, Google AI Mode,
ChatGPT, Perplexity, Bing Copilot). **Planning only.** No files changed, nothing implemented,
committed, or deployed, no implementation issues opened here.

**Date:** 2026-08-31
**Context:** GitHub issue #8 (2026-08-29, `session-history/2026-08-29-issue-8-geo-audit-schema-and-metadata.md`,
`DECISIONS.md` D-90/D-91/D-92) already ran a *reactive* GEO pass — triaging a SEOmator report and
implementing `llms.txt`, the `Organization` type, the `WebSite` node, `BreadcrumbList` on 8 page
types, and shortening the homepage title/description. **This audit is the proactive pass**: it
confirms that work is live and correct, then focuses on what it did not cover. Per Google's own
position, GEO findings are framed as **SEO fundamentals applied to AI surfaces**, not a separate
discipline.

**Heavy overlap** with the technical, content, schema, and local audits — GEO shares almost all its
levers with them. This document does **not** restate those as new work; it maps them and adds the
two genuinely GEO-specific items.

---

## GEO Readiness Score: 74 / 100

| Dimension | Weight | Score | Note |
|---|---|---|---|
| Citability (self-contained, front-loaded answers) | 25% | 62 | `/packages/` + `/powder-room/` are strong; service pages, hubs and the homepage bury the substance below shared scaffolding and don't open with an extractable answer. |
| Structural readability | 20% | 82 | Clean H1→H2→H3, question-shaped H2s on the two good pages, lists used well, short paragraphs. Missing: a real comparison `<table>`, question-H2s on the rest. |
| Multi-modal content | 15% | 78 | Text + genuine first-party photography on every page (156% higher AI selection). No video, no interactive tool. |
| Authority & brand signals | 20% | 58 | Real credentials on the About page, HIA membership, `sameAs` to 5 platforms. **No dates anywhere, no refresh cadence, no bylines, no primary-source links, no Reddit/Wikipedia presence.** |
| Technical accessibility | 20% | 92 | **Full SSR — every word and every schema block is in the initial HTML.** AI crawlers (which don't run JS) get the complete page. All AI crawlers allowed in `robots.txt`. `llms.txt` present. This is the part ETR nails. |

---

## 1. AI crawler access — ✅ correct

`robots.txt` (`app/robots.ts`) serves `User-agent: *` / `Allow: /` — so **every** AI crawler is
allowed: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot,
Bytespider. For a small local business whose upside is being cited in AI answers, allow-all is the
right call and matches `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 0.

**Optional, low value:** ETR *could* block `CCBot` and `Bytespider` (pure training crawlers, no
search-citation benefit) while keeping the search bots. There is no strong reason to — no bandwidth
problem, and the owner's stated position favours citability. Leave as-is unless the owner wants to.

## 2. `llms.txt` — ✅ present, correctly built

`app/llms.txt/route.ts` generates `/llms.txt` from the same `services` / `projects` /
`publishedRegions()` data the sitemap reads, so it can never state a fact the site doesn't (D-90).
Format matches the llmstxt.org spec (title, blockquote summary, sectioned link list).

**Caveat worth recording:** per Google (Mueller, Illyes) and the SE Ranking 300k-domain + OtterlyAI
server-log studies, `llms.txt` is **not currently a citation lever** for any major AI search system —
none of them fetch it. It costs nothing to keep and may matter later, but **do not invest further
in it** and don't expect it to move AI visibility. This should be noted in
`docs/SEO_AEO_GEO_CHECKLIST.md` alongside the D-90 record so a future session doesn't over-weight it.

## 3. Server-side rendering — ✅ excellent

The single most important technical GEO factor. Every audited page renders its full copy, headings,
FAQ answers, testimonials, and all 3–4 JSON-LD blocks in the **initial HTML response** (verified
across 24 routes in the technical audit). The one `'use client'` component is the enquiry form, and
all its surrounding copy is server-rendered. An AI crawler that executes zero JavaScript sees 100%
of the content. Nothing to do.

## 4. Entity clarity — ⚠️ good, with known schema gaps

Business name, licence, ABN/ACN, service area, the four principals, and `sameAs` to GBP + 5 social
platforms are all in structured data and plain text. Gaps (all already logged in the **schema
audit**): no `@graph`/`@id` connecting the nodes (F-2), no per-service `Service` node (S-1), no
`geo`/`logo`/`image` on the business node (S-3). Fixing F-2 + S-1 is the highest-leverage entity
work for AI.

## 5. Brand-mention footprint — ⚠️ weak (off-site)

Ahrefs' 75k-brand study: brand mentions correlate ~3× more strongly with AI citation than backlinks
(YouTube ~0.74, Reddit high, Wikipedia high; Domain Rating only ~0.27). ETR's footprint:

| Platform | State | Action |
|---|---|---|
| YouTube | Channel exists (`@EliteTouchRenovations`), in `sameAs` | Publish project walkthroughs / a founder video (owner content ask K11). Strongest AI-citation signal. |
| LinkedIn | Company page exists, in `sameAs` | Keep active; link individual Dawood profiles from Person schema (schema S-5). |
| Reddit | None | Genuine, non-spammy participation in r/sydney, r/AusRenovation, r/bathrooms when relevant. Perplexity (46.7% Reddit) and ChatGPT (11.3%) lean heavily on it. |
| Wikipedia / Wikidata | None | **Skip.** ETR is not notable enough for a Wikipedia article; attempting one wastes effort and risks a speedy-deletion. A Wikidata item is marginal — revisit only if press coverage accumulates. |
| Bing index | Unknown | **Claim Bing Places** (local audit #8) — Bing feeds ChatGPT and Copilot. |

All of this is off-site owner work and is already captured in the local audit's authority section —
**not a new code issue.**

---

## Net-new GEO findings (not covered by the other audits)

### G-1 · No content-freshness signal and no refresh cadence  ·  HIGH (for GEO)

**What.** No page shows a publication or "last updated" date. There is no scheduled content-review
process.

**Why it matters.** SE Ranking's 1.3M-citation study: content under 3 months old is ~3× more likely
to be cited in AI answers, and pages left untouched 6+ months lose citation eligibility. Google's
own guidance calls a scheduled refresh program one of the highest-leverage AI-search plays. ETR is a
brand-new post-migration domain with zero freshness signals — it is starting from the worst position
on the factor that is cheapest to fix.

**Recommended solution.**
1. Render a real "Last updated {Month YYYY}" on the pages where recency is a query signal —
   `/packages/` (a "cost" query), the hubs, and each `/gallery/{slug}/` (a completion year).
   Driven by a real `updated` field per content record, never an auto "today" (this is the same data
   the technical audit's M-2 sitemap `lastmod` fix and content C-5 need — **one piece of work feeds
   all three**).
2. Adopt a **quarterly content-review cadence**: a `plans/` checklist that revisits the packages
   prices, the service copy, the hub local detail, and the project list every 3 months, bumps the
   `updated` date only where something genuinely changed, and records it. Add it to the
   `docs/` workflow.

**Priority:** High (GEO) / Medium (overall). **Effort:** S for the dates, S for the cadence doc.
**Risk:** low. **Dependency:** shares the data model with technical M-2 + content C-5 + images I-1.

### G-2 · Answer blocks are not front-loaded into the first 30% of the page  ·  MEDIUM

**What.** SE Ranking: ~44% of AI citations come from the first 30% of a page, and the optimal
citable passage is 134–167 words. On ETR's service and hub pages, the first 30% is the hero
(tagline + one-sentence summary) then a shared "what's included" list — the substantive, quotable
material (durations, method, what turns up in old homes, pricing context) is lower down or on
another page.

**Why it matters.** This sharpens the content audit's C-3 ("not answer-first") with a concrete
spec: it's not just *have* an answer-first paragraph, it's have a **self-contained 130–170 word
answer block in the first screen** that an AI can lift whole — naming the service, the rough cost
with size basis, the rough duration, the licence and the warranty, in plain declarative sentences.

**Recommended solution.** When implementing C-3 / local #4, make the lead block a deliberate
134–167 word self-contained answer, not just a short intro. One per service page, one per hub.
Model: the opening of `/packages/` ("With Elite Touch, a bathroom renovation starts from $18,000
for a small bathroom about 1.5 × 1.8 × 2.4 m…").

**Priority:** Medium. **Effort:** S (folds into C-3 / local #4). **Risk:** low.
**Dependency:** content C-2/C-3, local #4.

### G-3 · No interactive tool  ·  LOW (opportunity, not a gap)

A **bathroom renovation cost estimator** (room size + tier + a few options → an indicative "from"
range that always resolves to "firm after a free on-site measure") would be a genuinely unique,
citable, link-worthy asset — the skill's highest-impact GEO play ("develop unique tools or
calculators"). It also serves the "bathroom renovation cost sydney" intent better than static copy.

**Caveats:** it's a real build, it needs the owner to sign off on the estimation logic (a wrong
estimate is a lead-quality and trust problem — same class as D-104's "$10,000 renovation"
reasoning), and it adds client-side JS (`docs/PERFORMANCE_BUDGET.md` — keep it a small local
component, no library). **Priority:** Low / backlog. **Effort:** L. **Dependency:** owner input on
the formula; do the C-2/C-6 packages work first.

### G-4 · RSL 1.0 licensing — note and skip

**Shipped 2026-08-31 via #46.** `docs/SEO_AEO_GEO_CHECKLIST.md` now records RSL 1.0 as a considered
skip for ETR unless the site later publishes premium research, a data product or an original tool.

The Really Simple Licensing standard (Dec 2025) for machine-readable AI-content licensing is not
implemented. For a small local service business with no premium content to license, there is no
case for it. Recorded here so it's a considered skip, not an oversight. Revisit only if ETR ever
publishes substantial original research/tools it wants to control.

---

## Platform-specific summary

| Surface | ETR's position | Lever |
|---|---|---|
| **Google AI Overviews** | Ranking-correlated — ETR must rank first (new domain). | The whole SEO backlog feeds this; nothing AI-specific. |
| **Google AI Mode** (Gemini 3.5 Flash) | Broader pool, freshness + entity authority weighted over raw position. | G-1 (freshness) + schema F-2/S-1 (entity) are the direct levers. |
| **ChatGPT** | Wikipedia (skip) + Reddit + Bing index. | Bing Places (local #8), Reddit presence, citable passages (G-2). |
| **Perplexity** | Reddit-heavy (46.7%). | Reddit presence; strong self-contained answers (G-2). |
| **Bing Copilot** | Bing SEO + IndexNow. | Bing Places (local #8) + IndexNow (technical L-2). |

---

## Dedupe map for the master plan

| GEO item | Status |
|---|---|
| SSR, AI-crawler access, `llms.txt` | ✅ already done (issue #8 + migration) — no action |
| Schema `@graph`/`@id`, per-`Service`, `geo`/`logo`/`image` | = schema F-2 / S-1 / S-3 |
| Answer-first + question H2s on service/hub pages | = content C-3 + local #4, **refined by G-2** |
| Comparison `<table>` on packages | = content C-6 |
| Visible dates | = content C-5 / technical M-2 / images I-1 — **G-1 adds the refresh cadence** |
| Author bylines / Person schema | = content C-2 / schema S-5 |
| External primary-source links | = content C-4 |
| Bing Places, Reddit, YouTube, off-site mentions | = local audit authority section |
| IndexNow | = technical L-2 |
| **Refresh cadence (G-1)** | **net-new — own small issue (doc + data field)** |
| **Front-loaded 134–167 word answer blocks (G-2)** | **net-new — folds into the C-3 / local-#4 issue as an explicit spec** |
| **Cost estimator tool (G-3)** | **net-new — backlog opportunity, not scheduled** |

---

## Confirmation

- Audit complete. All five GEO dimensions assessed; issue #8's prior GEO work verified as live and
  correct; AI-crawler access, `llms.txt`, SSR, entity clarity and brand footprint checked;
  de-duplicated against the technical, content, schema, and local audits.
- Findings saved to `plans/2026-08-31-seo-geo-audit.md`.
- No files modified, nothing implemented, committed, or deployed; no implementation issues opened.
