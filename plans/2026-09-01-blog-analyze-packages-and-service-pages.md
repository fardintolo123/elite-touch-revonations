# blog-analyze audit — /packages/ + the 4 service pages

**Date:** 2026-09-01
**Tool:** `blog-analyze` (from the `claude-blog` skill installed per issue #13/#14, 2026-08-31).
**Task class:** SEO / content quality. Routed via `CLAUDE.md` → "SEO / keywords / content strategy"
and "Copywriting / readability". Read `docs/SEO_CONTENT_GUIDE.md`, `docs/CONTENT_QUALITY_CHECKLIST.md`,
`docs/SEO_AEO_GEO_CHECKLIST.md`, `DECISIONS.md` D-01/D-06/D-07/D-75/D-104/D-107.

**Scope:** planning / analysis only. **No site files changed. No GitHub issues opened.**
Live production HTML fetched 2026-09-01 for:

- `https://www.elitetouchrenovations.au/packages/`
- `/services/bathroom-renovations/`
- `/services/ensuite-bathroom-renovations/`
- `/services/laundry-renovations/`
- `/services/powder-room-renovations/`

(The slugs `ensuite-renovations` and `bathroom-and-laundry-renovations` do **not** exist — they 404.
The real slugs are `ensuite-bathroom-renovations` and `laundry-renovations`, per `app/sitemap.ts`.
This is expected; noted only so the next session doesn't chase a phantom 404.)

---

## How this relates to the SEO master plan

The `plans/2026-08-31-seo-*` audit set and issues **#17–#46** already cover **almost everything**
below. This pass is an independent second opinion using a different rubric; its job is to (a) confirm
the master plan's content findings and (b) surface anything it missed. **It found one net-new item**
(F-1, the powder-room timeline contradiction). Everything else maps to an existing issue.

---

## Scores (blog-analyze 100-point rubric, Consumer readability band)

> ⚠️ The rubric is built for **blog posts**. Service/commercial pages are penalised for things they
> are not expected to have (author byline, sourced third-party statistics, 3–8 outbound citations).
> Read the category notes, not just the number. Where the rubric and ETR's own docs disagree,
> ETR's docs win (`CLAUDE.md` source-of-truth hierarchy).

| Page | Score | Rating | Content /30 | SEO /25 | E-E-A-T /15 | Tech /15 | AI-cite /15 |
|---|---|---|---|---|---|---|---|
| `/packages/` | **83** | Strong | 26 | 22 | 10 | 11 | 14 |
| `/services/powder-room-renovations/` | **78** | Acceptable | 24 | 21 | 9 | 11 | 13 |
| `/services/bathroom-renovations/` | **73** | Acceptable | 22 | 21 | 10 | 10 | 10 |
| `/services/ensuite-bathroom-renovations/` | **69** | Below Standard | 20 | 20 | 10 | 10 | 9 |
| `/services/laundry-renovations/` | **69** | Below Standard | 20 | 20 | 10 | 10 | 9 |

**Reading the spread:** `/packages/` is the site's best page and needs only polish. The four service
pages score progressively worse the less service-specific content they carry — exactly the C-2
finding in the content audit. `ensuite` and `laundry` are near-duplicates of the bathroom page with
one sentence swapped, which the rubric flags as weak topic/entity clarity.

---

## Findings

### F-1 · NET-NEW · Powder-room page: the timeline section contradicts its own FAQ · HIGH

**What.** `/services/powder-room-renovations/` renders the shared "How long you will have us in the
house" block from `businessInfo.buildDurations` — **"Full renovation · 3–4 weeks"**, "Premium build ·
5–6 weeks", "Reconfigure · 5–7 weeks". Two sections lower, the page's own FAQ (added by D-107) says a
powder-room refresh takes **"three to five working days"** and a full strip-out-and-re-waterproof
"puts the realistic minimum at **around seven working days**".

So the same page tells a reader a powder-room "full renovation" takes both **3–4 weeks** and
**~7 working days**.

**Why it matters.** `buildDurations` was owner-supplied and settled in D-75 **for full bathroom
renovations** (the `businessInfo.ts` comment says so explicitly: "a standard full renovation is 3–4
weeks"). It is correct on `/services/bathroom-renovations/`. It is wrong on the powder-room page,
where it (1) contradicts evidenced copy on the same page, (2) overstates the disruption of a small
job by ~3×, which could cost a lead, and (3) is a factual-coherence hit that AI answer engines and
careful readers both notice. The ensuite and laundry pages inherit the same block; it is closer to
true there (an ensuite is a small full bathroom) but still not verified per-service.

**Recommended solution.** Make the durations block service-specific, the same way D-107 made
`about`/`faqs` service-specific. Either add a `buildDurations` override to the powder-room (and
ideally ensuite/laundry) record in `lib/businessInfo.ts`, or suppress the weeks-based block on
powder-room and let the FAQ carry the timeline. Every number must trace to an owner message or
`docs/source-copy/` — do not invent a powder-room duration (D-06). If the owner has not given
powder-room / ensuite / laundry durations, that is an **owner question**, not a guess.

**Files:** `lib/businessInfo.ts`, `app/services/[slug]/page.tsx`.
**Belongs with:** issue **#34** (service pages: real per-service content). Add as an explicit
acceptance criterion there; do not open a separate issue.

**IMPLEMENTED 2026-09-01 (this session):**
- `lib/businessInfo.ts` — added `hideBuildDurations: true` to the `powder-room-renovations`
  service record, with a comment explaining why (bathroom-scoped weeks contradict this page's own
  D-107 FAQ; no invented powder-room figure).
- `app/services/[slug]/page.tsx` — added a `showBuildDurations` guard
  (`!('hideBuildDurations' in service && service.hideBuildDurations)`) around the
  "How long you will have us in the house" `<section>`. All three other service pages are
  unaffected and still render it.
- **Verification:** `npx tsc --noEmit` clean. A full `npm run build` could **not** be run to
  green — another agent session was holding a concurrent `next build` on this tree
  (`⨯ Another next build process is already running`). **Next session must run `npm run build`
  and confirm the route count holds and `/services/powder-room-renovations/` no longer renders
  the weeks block**, then `curl` the page and grep to confirm "How long you will have us in the
  house" is gone while the FAQ timeline answer remains.
- **Not committed** — the working tree is full of another session's in-flight work on several
  other issues; committing was out of scope for this task anyway.

---

### Confirmed — already tracked in the master plan (no new issue)

| # | Finding (blog-analyze view) | Existing owner |
|---|---|---|
| C-a | **3 of 4 service pages are near-duplicates** — only the H1 + one summary sentence differ; the inclusions list, durations, the single customer review, "other services", work strip and contact block are identical. Drives every service-page score below. | content audit **C-2** → issue **#34**; hubs → **#35** |
| C-b | **Not answer-first.** Service pages open with hero + H1 + one sentence, then a shared list. `/packages/` does lead with a direct answer — the service pages should match. | content audit **C-3** → **#34 / #35** |
| C-c | **Generic, repeated headings.** "What every one of our renovations covers.", and the H3 trio "Full renovation / Premium build / Reconfigure", are identical on all 4 pages — fails "unique descriptive headings". | folds into **#34** |
| C-d | **og:image is broken** (empty/garbled) and **og:url is the homepage on every page**; `twitter:card` is `summary` with no image. | issues **#19** (per-page og:url) + **#20** (og:image sitewide) |
| C-e | **No per-page `Service` schema.** All pages share one `Service` node inside the LocalBusiness `@graph`; nothing distinguishes ensuite from laundry from powder room in structured data. | issue **#22** (+ #30, #31) |
| C-f | **Authoritative bodies named, never linked** — "NSW Fair Trading register", "AS 3740", "National Construction Code", "HIA", "WELS". Only outbound link on the site is Greenfleet. | content audit **C-4** → issue **#42** |
| C-g | **No visible author / reviewer.** `Person` schema for the four Dawoods exists in JSON-LD but no page shows a "who stands behind this" byline. Rubric docks E-E-A-T author points; master plan correctly defers this (schema S-5) until named-byline content exists. | deferred, master plan §5 |
| C-h | **No freshness signal** on `/packages/` — a visible "prices current as of {month} {year}" line matters on a cost page and protects a fixed-scope-quote business from a stale-price dispute. | content audit **C-5** → issue **#41** |
| C-i | **One review, repeated.** The same "Adam was a pleasure to work with… — Simon Andrews" quote is the only testimonial on all four service pages, while 19 verbatim reviews exist in `Customer Reviews.md`. Vary them per page. | `Customer Reviews.md` is the source; fold into **#34** |
| C-j | **Live-domain Core Web Vitals unmeasured** — LCP/INP not verified on the production domain. | issues **#27** (measure) + **#26** (AVIF) |
| C-k | **AS 3740 vs "Australian Standards" inconsistency.** The bathroom page intro says "waterproofing to AS 3740"; its own body scope list says "Waterproofing to Australian Standards"; the powder-room FAQ correctly says "AS 3740-2021". Use the specific code consistently — it is a load-bearing trust signal (`CLAUDE.md` Business Rules). | not explicit anywhere — add to **#34** acceptance criteria |
| C-l | **No privacy policy** while the enquiry form collects name/email/phone/message into Supabase + Resend. | content audit **C-1** → issue **#37** |

### Editorial style diagnostics (advisory only — no score impact, no change recommended)

- **Em dashes (U+2014):** `/packages/` ~26, `/powder-room/` ~25, `/bathroom/` ~14. Heavy, but this
  is the established owner-supplied house voice and **there is no project rule against it**
  (`DESIGN.md` and the content guides are silent). Imposing the blog skill's preference here would
  violate the source-of-truth hierarchy. Noted, not actioned.
- **Style-list phrases** ("Furthermore", "In conclusion", "Let's explore", "delve", etc.): **none
  found** on any of the five pages. Copy is clean.
- **Sentence-length variation:** healthy (short punchy lines mixed with longer explanatory ones).
  The raw stdev figure is unreliable here because the HTML extraction merges nav fragments.

---

## What's genuinely strong (don't "fix" these)

- `/packages/` is answer-first, every price carries its size basis and "from" framing (D-07), the
  `$30,000 minimum?` and `$10,000 renovation?` objections are handled honestly (D-104), and it
  carries valid `FAQPage` + `BreadcrumbList` schema. It is the template the service pages should copy.
- Concrete, quotable method detail throughout — "primer plus two coats, certificate included",
  "new screed to create falls to drains", "1.5–3 square metres". This is exactly what AI answer
  engines cite and what most competitor sites lack.
- Honest hedging ("older Sydney homes can need extra days for … rot, non-compliant plumbing,
  asbestos … we tell you in the quote, not afterwards") reads as experienced, not salesy.

---

## Checklist

- [x] Read `docs/SEO_CONTENT_GUIDE.md`, `docs/CONTENT_QUALITY_CHECKLIST.md`,
      `docs/SEO_AEO_GEO_CHECKLIST.md`, `DECISIONS.md` D-01/D-06/D-07/D-75/D-104/D-107
- [x] Fetched live production HTML for all 5 pages; verified schema, meta, OG, headings, body copy
- [x] Cross-checked every finding against `plans/2026-08-31-seo-*` and issues #17–#46
- [x] One net-new finding (F-1) recorded; all others mapped to existing issues
- [x] GitHub issues opened: none. Nothing committed or deployed.
- [x] **F-1 implemented** — powder-room weeks block suppressed (`lib/businessInfo.ts` +
      `app/services/[slug]/page.tsx`); `tsc --noEmit` clean
- [ ] **F-1 build verification** — `npm run build` blocked by a concurrent build this session;
      next session must run it green and `curl`-verify the powder-room page
- [ ] Owner decision (optional): if a *visible* powder-room timeline is wanted on the page body
      rather than only in the FAQ, the owner needs to supply a real powder-room / ensuite /
      laundry duration figure
- [ ] C-k (AS 3740 wording) + C-i (repeated review) added to issue #34 acceptance criteria
