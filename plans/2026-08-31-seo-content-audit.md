# Content Quality & E-E-A-T Audit — Elite Touch Renovations

**Task:** `/seo-content` — content quality, E-E-A-T, and AI-citation-readiness. **Planning only.**
No files changed, nothing implemented, committed, or deployed, no implementation issues opened here.

**Date:** 2026-08-31
**Method:** read all page copy in the codebase + `.next/server/app/**.html` (2026-08-30 build);
scored against Google's Who/How/Why heuristic, the Sept-2025 QRG E-E-A-T framework, and
`docs/CONTENT_QUALITY_CHECKLIST.md` / `docs/SEO_CONTENT_GUIDE.md`.
**Overlap note:** hub-page thinness and internal linking are covered in the local audit
(`plans/2026-08-31-seo-local-audit.md` §7–8); readability is already solved (D-96 / D-109, 24/24
pages pass Flesch ≥ 60) and is **not** re-raised. This audit adds the content-depth, trust, and
answer-first findings those passes did not cover.

---

## Content Quality Score: 76 / 100

## E-E-A-T breakdown

| Factor | Score | Signals present | Gaps |
|---|---|---|---|
| **Experience** | 21/25 | 61 real project photos, real suburb attribution, genuine matched before/after pairs (2nd batch), first-person process copy ("what it's like to have us in your home"), concrete method detail (AS 3740 primer + 2 coats + certificate, falls to drains, screed). This is the site's strongest asset. | Gallery project pages carry only a 1-sentence blurb — the *story* of each job (scope, what was hard, materials, duration) is missing. The 3 text-only case studies are 2-sentence stubs. |
| **Expertise** | 18/25 | About page names all four Dawoods with real, checkable credentials (Licensed Builder & Civil Engineer; Licensed Tiler, 25+ yrs; Master's in Architecture, UTS + SJB; Grad Cert Construction PM). Technical specificity throughout. | No author attribution on any page (no blog yet, so low stakes now — but a blocker the moment buyer guides get written). No individual bio depth beyond the team cards. |
| **Authoritativeness** | 12/25 | HIA membership stated; Greenfleet partnership (with outbound link). | No press, no awards, no "best of" list placements, no external citations, thin local-authority footprint (see local audit §"Local link & authority"). Mostly off-site work. |
| **Trustworthiness** | 18/25 | HTTPS + HSTS; full NAP; ABN/ACN/licence/insurances on-page; 19 verbatim testimonials; "check our licence on the NSW Fair Trading register" (self-deprecating, good); fixed-scope-quote transparency; honest "older homes need extra days" hedging. | **No privacy policy and no terms page — while running a form that collects name, email, phone, message and writes them to Supabase + Resend.** No visible dates / "last updated" anywhere. Authority links were added under issue #42; the privacy/freshness gaps remain. |

**E-E-A-T total ≈ 69/100.** Experience and Trust are genuinely good for a small trade site; the drag
is Authoritativeness (off-site) and the missing privacy policy.

## AI Citation Readiness: 72 / 100

Good: `/packages/` and `/services/powder-room-renovations/` are answer-first with question-shaped
H2s and self-contained FAQ answers; concrete quotable specifics everywhere (AS 3740, primer + 2
coats, certificate, dimensions, week ranges); `llms.txt` exists (D-90); heading hierarchy clean.
Weak: the other service pages and the hubs are **not** answer-first; the packages tier comparison is
`<div>` cards, not a `<table>`, so AI can't lift it as comparative data; no completion dates on
projects.

---

## Findings

### C-1 · No privacy policy or terms page — with a live PII-collecting form  ·  HIGH (trust)

**What.** The enquiry form (`components/EnquiryForm.tsx`, on every page via `ContactSection`)
collects name, phone, email, suburb and a free-text message, emails it via Resend and writes it to a
Supabase table. There is **no `/privacy/` or `/terms/` page** anywhere in the route list, and no
privacy statement near the form.

**Why it matters.**
- **Trust / E-E-A-T:** Google's QRG explicitly lists a privacy policy and terms as trust signals,
  especially for any site that collects personal information. Its absence is a rater-visible negative.
- **Conversion:** a form with no "what happens to my details" line converts worse — renovation
  buyers are cautious.
- **Compliance:** the Australian Privacy Act's small-business exemption may apply (turnover under
  $3M), but a renovation business handling customer home addresses and contact details is exactly
  the case where a short privacy policy is expected practice, and there is no downside to having one.

**Recommended solution.** Add a `/privacy/` page (what's collected, why, who it's shared with —
Resend, Supabase — retention, contact to request deletion) and a short line under the form ("We use
your details only to arrange your measure — see our privacy policy"). Optionally a light `/terms/`.
Link both from the footer. Keep it factual and specific to what `lib/actions.ts` actually does — no
boilerplate that over-claims.

**Files:** new `app/privacy/page.tsx` (+ maybe `app/terms/page.tsx`), `components/layout/SiteFooter.tsx`,
`components/EnquiryForm.tsx` or `ContactSection.tsx`, `app/sitemap.ts`, `app/robots.ts` (no change
needed), `lib/` if the policy references data handling.
**Priority:** High. **Effort:** M. **Risk:** low. **Dependency:** none.

### C-2 · Three of the four service pages have very little service-specific content  ·  HIGH

**What.** `app/services/[slug]/page.tsx` is one renderer for four pages. The **only** unique content
per service is the H1 + a one-sentence `summary`. Everything else — the standard-inclusions list,
build durations, the customer review, "our other services", the work strip, the contact section — is
**identical across all four pages**. `powder-room-renovations` is the exception: D-107 gave it a
unique `about` paragraph + a 4-question FAQ. `bathroom-renovations`, `ensuite-bathroom-renovations`
and `laundry-renovations` get none of that.

**Why it matters.** `docs/SEO_CONTENT_GUIDE.md` §2 makes the four service pages publishing priority
1, and Whitespark ranks dedicated service pages as the #1 local-organic factor — but only if they
are genuinely *about* their service. `ensuite-bathroom-renovations` and `laundry-renovations` as
they stand are near-duplicates of the bathroom page with one sentence swapped. That is the same
swap-test failure the local audit flagged for the hubs.

**Recommended solution.** Give each of the three a unique section on the model of the powder-room
`about` + `faqs` fields (already supported by the `Service` type as optional fields):
- **Ensuite:** ventilation and acoustic detailing when it shares a bedroom wall; small-footprint
  fixture choices; doing it alongside the main bathroom. FAQ: "Can you renovate an ensuite without
  touching the main bathroom?", "How do you stop noise carrying into the bedroom?"
- **Bathroom + laundry:** why running two wet areas as one program saves a demolition / waterproofing
  stage / disruption; sequencing; what "one trade run" means for the household. FAQ: "Can the laundry
  and bathroom be done at different times?", "Is a combined job cheaper than two separate ones?"
- **Bathroom (main):** the flagship page — expand on strip-out-to-studs, what turns up in older
  Sydney homes (rot, non-compliant plumbing, asbestos) and how it's quoted, the waterproofing stage
  in plain terms. FAQ from `CONTENT_QUALITY_CHECKLIST.md` §5's real hesitations.
- Every claim sourced from the issue-#2 service PDFs (`docs/source-copy/`) or an owner message — no
  invention (D-01/D-06).

**Files:** `lib/businessInfo.ts` (add `about`/`faqs` to the three service records),
`app/services/[slug]/page.tsx` (already renders both when present — minimal change).
**Priority:** High. **Effort:** M–L (copy). **Risk:** low. **Dependency:** none; pairs naturally
with the hub de-templating (local audit #4) and the `Service` schema work (schema audit S-1).

### C-3 · Service and hub pages are not answer-first  ·  MEDIUM

**What.** `/services/bathroom-renovations/` opens with a hero eyebrow + H1 + the one-sentence
summary, then the shared "what's included" block. The hubs open with "We strip out, waterproof…
across the {region}". Neither leads with a direct, extractable answer to the question the searcher
actually has ("what does a bathroom renovation involve / cost / take in Sydney?").

**Why it matters.** `docs/CONTENT_QUALITY_CHECKLIST.md` §3 and `SEO_AEO_GEO_CHECKLIST.md` Phase 3
both require answer-first. It is what gets pulled into a featured snippet or an AI answer. `/packages/`
does this well ("With Elite Touch, a bathroom renovation starts from $18,000 for a small bathroom…")
— the service and hub pages should match that pattern.

**Recommended solution.** Add a short answer-first lead paragraph to each service page and each hub
(2–3 sentences: what it is, roughly what it costs with size basis + link to `/packages/`, roughly
how long, the licence/warranty). Fold into C-2 (service pages) and local audit #4 (hubs).
**Priority:** Medium. **Effort:** S (per page). **Risk:** low. **Dependency:** C-2, local #4.

### C-4 · Authoritative bodies are named but never linked  ·  MEDIUM · CLOSED 2026-09-02 (#42)

**What.** The copy references "NSW Fair Trading register", "AS 3740 / AS 3740-2021", "Home Building
Act 1989", "National Construction Code", "HIA", "WELS" — and links **none** of them. The only
external link on the entire site is `greenfleet.com.au`.

**Why it matters.** Outbound links to authoritative primary sources are an E-E-A-T trust signal and
a citation signal (they show the claims are checkable, which is the whole point on a builder's
site — the About page literally says "check it… before you hire anyone, including us" without
providing the link). Low cost, real credibility.

**Recommended solution.** Link the NSW Fair Trading licence-check page (ideally deep-linked to
verify licence 475204C), the Standards Australia / ABCB pages for AS 3740, the HIA "find a member"
page, and NSW Fair Trading's home-building info page. `rel="noopener"`, and decide `target="_blank"`
consistently (the Greenfleet link uses it). 4–6 links total, placed where the term first appears.
**Files:** `app/about-us/page.tsx`, `app/services/[slug]/page.tsx`, possibly `lib/businessInfo.ts`
(store the URLs). **Priority:** Medium. **Effort:** S. **Risk:** low.

**Implemented 2026-09-02.** Authority URLs now live in `lib/businessInfo.ts`. `/about-us/` links the
NSW licence register, AS 3740, NCC wet-area rules, HIA membership context, WELS and NSW home-building
contract/statutory-warranty guidance. Service pages link the AS 3740 waterproofing mention in the
standard inclusions list. External authority links use `target="_blank"` with
`rel="noopener noreferrer"`, matching the existing Greenfleet handling.

### C-5 · No freshness signals anywhere  ·  MEDIUM

**What.** No page shows a publication date or a "last updated" date. Gallery projects show no
completion year.

**Why it matters.** For evergreen service pages this is low-stakes, but:
- **The packages / cost page** is the one page where a visible "Package prices current as of
  {month year}" line matters — it is a freshness signal for a "cost" query *and* it protects a
  fixed-scope-quote business from a stale-price dispute.
- **Gallery projects** with a completion year ("Completed 2025") read as more credible and current,
  and give AI answer engines a recency anchor.
- Ties to the technical audit's M-2 (`sitemap.xml` `lastmod`) — real content dates would feed both.

**Recommended solution.** A `lastReviewed` / `updated` date on the packages page and a `completed`
year on each project record, rendered as a small caption. Not a fake "updated today" — a real date
that only changes when the content does.
**Files:** `app/packages/page.tsx`, `lib/projects.ts`, `app/gallery/[slug]/page.tsx`.
**Priority:** Medium. **Effort:** S. **Risk:** low. **Dependency:** shares data with technical M-2.

### C-6 · Packages tier comparison is not a real table  ·  MEDIUM

**What.** `/packages/` renders the Basic / Standard / Premium comparison as three `<div className="et-card">`
blocks, not an HTML `<table>`. The FAQ is `<details>`.

**Why it matters.** A genuine `<table>` with the three tiers as columns and the differentiators
(price, size basis, tiling, electrical, vanity, screen, extras) as rows is (a) far more scannable on
desktop, (b) directly extractable by AI answer engines for "compare bathroom renovation packages
Sydney" / "what's the difference between a $18k and $30k bathroom" queries, and (c) snippet-eligible
as a comparison table. The card layout loses all of that.

**Recommended solution.** Add a comparison `<table>` (keep the cards too, or replace — a design call
for `DESIGN.md`). Every cell traces to `docs/source-copy/packages-2026-08-19.md`; keep the "from"
framing and the size basis in the price row (D-07/D-60). Must stay responsive — wrap in
`overflow-x:auto` on mobile.
**Files:** `app/packages/page.tsx`, `app/globals.css` (table styles — check `DESIGN.md` first).
**Priority:** Medium. **Effort:** M. **Risk:** low (content unchanged, presentation only).
**Dependency:** resolved 2026-08-31 — `DESIGN.md` now defines a comparison-table pattern.
**Status:** shipped 2026-08-31 in issue #43. `/packages/` keeps the existing tier cards and adds a
real `<table>` above them, with Basic / Standard / Premium as columns and price, size basis, tiling,
electrical, vanity/cabinet, shower screen and Premium-only extras as rows.

### C-7 · Buyer-objection coverage is incomplete  ·  LOW–MEDIUM

`docs/CONTENT_QUALITY_CHECKLIST.md` §5 names five real hesitations from the owner's own draft copy.
Current coverage:
- ✅ "quotes that aren't really quotes" → fixed-scope written quote messaging is everywhere.
- ✅ "waterproofing behind the wall terrifies me" → AS 3740 + primer + 2 coats + certificate is prominent.
- ⚠️ "I don't trust 'family business' claims" → the About page names all four with credentials, but
  doesn't *directly* answer the skepticism.
- ❌ "we have nowhere else to wash if it runs long" → build durations are stated; the practical
  "here's how we minimise the days you're without a bathroom / what to plan for" answer is missing.
- ❌ "looks like the brochure but feels wrong to live in" → not addressed.

**Recommended solution.** Work the two unaddressed objections into the service-page FAQ blocks from
C-2 and/or a short "living through it" section. **Priority:** Low–Medium. **Effort:** S. **Dependency:** C-2.

### C-8 · Gallery project pages are thin on the story  ·  LOW — CLOSED 2026-09-01

Each `/gallery/{slug}/` page is: H1 + 1-sentence blurb + photos + shared "what every job includes"
and related grid. If the owner's per-project "Project Info" documents (referenced in `lib/projects.ts`
and `plans/2026-08-25-new-project-photos-intake.md`) contain more than the trimmed blurb — scope,
timeline, materials, what was challenging — a 2–3 sentence "About this project" paragraph per page
would turn these into real mini case studies (Experience signal + long-tail + AI-citable detail).
**Only** using owner-supplied detail — no invention, no inferring from photos beyond what alt text
already states (D-06). **Priority:** Low. **Effort:** M (depends on source material). **Dependency:**
check what's in the Project Info docs first.

**Implemented in issue #44.** All 11 published gallery projects now have a `story` field sourced
from the owner-supplied project notes and rendered in always-present HTML on the project page. The
new copy uses only documented scope, timeframe, budget, materials and challenge details; nothing was
inferred from the photographs beyond the existing alt text.

### C-9 · `docs/CONTENT_QUALITY_CHECKLIST.md` contains stale facts  ·  LOW (doc hygiene)

**Shipped 2026-08-31 via #46.** The standing content/SEO checklists now use 19 testimonials,
family-run since 2022, and the owner-confirmed 10-year workmanship warranty.

- §1 line 11: "eighteen independent customers" — there are **19** testimonials.
- §5 line 104: "family-run since 2023" — founded **2022** (D-57).
- §5 lines 105–107: "workmanship warranty ⚠️ the term is not yet supplied — leave the line out" —
  the term **was** supplied: 10 years (D-58, 2026-08-19).

These contradict the current source of truth and will mislead the next content session. Fix in the
doc. **Priority:** Low. **Effort:** S. **Risk:** none. (Same class as the schema audit's F-1 doc fix
and the technical audit's note that `CLAUDE.md`/`DECISIONS.md` still say 2023 in places.)

---

## What is already correct — leave alone

- **Readability** — 24/24 pages pass Flesch ≥ 60 (D-109). Do not re-open; do not "simplify" further.
- **Voice** — plain, specific, no hype; matches `docs/CONTENT_QUALITY_CHECKLIST.md` §1. Concrete
  details over adjectives is consistently applied.
- **No fabrication** — every fact traces to a source; testimonials verbatim; prices carry size basis;
  only the four services; alt text describes photos. The guardrails are working.
- **Heading hierarchy** — one H1 per page, logical H2/H3, no skipped levels (verified in technical audit).
- **`/packages/` and `/powder-room/`** — answer-first, question-shaped H2s, self-contained FAQ
  answers, real pricing with size basis. These two are the template for the rest.
- **Conversion elements** — `tel:` anchors, specific CTA ("Book a free on-site measure"), named
  testimonial early, trust signals in text. All present per `CONTENT_QUALITY_CHECKLIST.md` §5.
- **HTTPS, contact info, testimonials** — Trust fundamentals solid apart from the privacy policy.

---

## Dedupe map for the master plan

| Item | Also raised in | Treatment |
|---|---|---|
| Service-page thin content (C-2) | — (new) | **Own issue**, pairs with schema S-1 + local #4. |
| Answer-first on service/hub pages (C-3) | local #4 (hubs) | Fold into C-2 issue (services) + local #4 issue (hubs). |
| Privacy policy (C-1) | — (new) | **Own issue**, HIGH, no dependency — can ship first. |
| Freshness dates (C-5) | technical M-2 (sitemap lastmod) | **One issue** covering real content dates → feeds sitemap + visible captions. |
| External authority links (C-4) | local (authority, off-site) | ✅ **Closed in #42** — on-site, distinct from off-site link building. |
| Packages comparison table (C-6) | schema (comparative data for AI) | **Own issue**, needs `DESIGN.md` table decision. |
| Doc fixes (C-9) | schema F-1, technical (2023 refs) | **One doc-hygiene issue** sweeping all stale-fact doc updates. |
| Gallery project story depth (C-8) | schema S-2 (ImageObject) | Keep separate — C-8 is copy, S-2 is markup; may share an issue. |

---

## Confirmation

- Audit complete. All page copy assessed against Who/How/Why, the E-E-A-T framework, AI-citation
  signals, and the repo's own content checklist; findings de-duplicated against the technical, local,
  and schema audits.
- Findings saved to `plans/2026-08-31-seo-content-audit.md`.
- No files modified, nothing implemented, committed, or deployed; no implementation issues opened.
