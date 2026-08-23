# Plan — Triage GitHub issue #8 ("geo audti") GEO audit report

**Date:** 2026-08-23
**Task class:** Third-party SEO tool report intake. Routed via `CLAUDE.md` → Task Routing:
"Third-party SEO tool report (cannibalisation · gap · audit PDF) → `docs/SEO_CONTENT_GUIDE.md` →
*Report intake*. **Do not action one as written**." Also touches `docs/SEO_AEO_GEO_CHECKLIST.md`
Phase 1 (schema) and Phase 0 (AI crawler access).

## What issue #8 is

Owner-filed issue titled "geo audti" (typo for "geo audit"), body is a single attachment: a
SEOmator "GEO Audit Report" for `www.elitetouchrenovations.au`, generated 2026-08-20, scoring
81/100 overall across six weighted categories (Citability 25%, Brand Authority 20%, Content
E-E-A-T 20%, Technical SEO 15%, Schema Markup 10%, Platform Readiness 10%). Preserved at
`docs/source-copy/pdf/geo-audit-report-2026-08-20.pdf`.

## Report intake — applying `docs/SEO_CONTENT_GUIDE.md` §3, six rules

1. **Triage against existing structure first.** Cross-checked every claim against the live
   codebase before acting on it (see Verification below). Two claims turned out to already be
   handled: AI crawler access (14/14 allowed — `app/robots.ts` already allows `*`) and most of
   `sameAs` (LinkedIn, YouTube etc. already populated in `lib/businessInfo.ts` → `socialProfiles`
   and already emitted in `app/layout.tsx`'s schema — the report's own "sameAs Links" table
   confirms `linkedin: Linked`, `youtube: Linked`).
2. **No volume/difficulty needed here** — this rule targets CREATE/gap claims; a GEO audit's
   technical findings (schema types, crawler access, title length) are independently verifiable
   against the live site, which is the equivalent evidence bar for this report type.
3. **Checked the report's own internal consistency**, since there is no competitor to cross-check
   against. Found it fails this test badly — see Verdict.
4. N/A — no hub-vs-spoke duplication claims in this report.
5. **Brand/marketing-presence decisions (Reddit, Wikidata) are an owner question**, same principle
   as service-scope decisions — not something this report can settle by itself, and especially not
   one built on a broken query (see Verdict).
6. **Record the verdict** — done below and in `DECISIONS.md` D-90–D-92, O-10.

## Verification against the live codebase

- `app/robots.ts` — `allow: '/'` for `userAgent: '*'`, matching the report's "14/14 AI crawlers
  allowed." Already correct; nothing to change.
- `app/layout.tsx` — one `HomeAndConstructionBusiness` JSON-LD node existed, with a real,
  fully-populated `sameAs` array. `Organization` and `WebSite` were genuinely absent as literal
  `@type` values.
- `lib/businessInfo.ts` → `socialProfiles` — Instagram, Facebook,
  LinkedIn, YouTube, TikTok are all real, owner-supplied (issue #2) URLs, already in `sameAs`.
- Homepage title (`app/page.tsx`) is 78 characters — genuinely over the 30–60 char rule in our own
  `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 — but it is the owner's own approved wording from
  `docs/source-copy/home.md` (issue #2), and the code comment says so explicitly. Same situation
  for the meta description (~178 chars, over the 50–160 rule). **Not silently rewritten** — see
  Verdict and `DECISIONS.md` O-10.
- **The critical finding:** the Brand Authority section (36/100, 20% of the total score — the
  second-largest weight in the whole report) states **"Brand searched: au"** — not "Elite Touch
  Renovations", not "ETR". The tool's brand-entity lookup parsed the wrong string from the domain
  `elitetouchrenovations.au` (a single-label name under the `.au` ccTLD, not `.com.au`). Every
  downstream result in that section is a false positive against an unrelated brand:
  - "YouTube channel found at youtube.com/@au" — not ETR's real channel
    (`youtube.com/@EliteTouchRenovations`, already in `businessInfo.socialProfiles`).
  - "GitHub: 5 repos found" — meaningless for a bathroom renovation business.
  - Reddit/Wikipedia "not found" — uninformative when the query itself was wrong.
- The **AI Platform Readiness table** (Google AI Overviews / ChatGPT / Perplexity / Gemini / Bing
  Copilot, all listed at 0/100 "Weak") directly contradicts the category breakdown two sections
  earlier in the same report, which scores "Platform Readiness" at 66/100 "Fair". The report's own
  disclaimer explains why: *"AI analysis was unavailable during this audit. The following
  categories used deterministic estimates: content_eeat, platform."* Not real signal either way.
- The one **Core Web Vitals** deduction (INP, -2) is explicitly self-labelled *"estimated from
  script count (12) — not real field data."* `DECISIONS.md` D-80 already documents the one known,
  deliberate script-count driver (`ContactSection` on every page) and its accepted budget
  trade-off. No new evidence here to revisit that decision.
- **"Key Findings: 0 total. No findings recorded."** — the report's own structured findings list is
  empty despite the narrative claims, another sign of a partially-failed audit run.

## Verdict

**Adopted (real, low-risk, zero invented facts):**
- `llms.txt` at `/llms.txt` — already built for GitHub issue #7, from real `lib/` data. Folded into
  this change rather than duplicated; see `DECISIONS.md` D-90.
- `Organization` added alongside `HomeAndConstructionBusiness` as a second `@type` value on the
  existing, already-verified schema node (`app/layout.tsx`) — no new facts, just a second literal
  type string for parsers that string-match rather than resolve schema.org's class hierarchy.
- Minimal `WebSite` schema (name + url only) added. **Deliberately without `SearchAction`** — the
  site has no on-site search, and a fabricated search target would misrepresent the site.
- `BreadcrumbList` schema added to all 8 non-home indexable page types (`/services/`,
  `/services/{slug}/`, `/services/bathroom-renovations/{region}/`, `/gallery/`,
  `/gallery/{slug}/`, `/packages/`, `/about-us/`, `/contact-us/`), mechanically derived from the
  real route hierarchy — no visible UI added, structured data only.

**Rejected — not actioned as written:**
- "Build organic Reddit presence" and "Create a Wikidata entity for brand recognition" — both rest
  entirely on the broken `Brand searched: au` query. No credible evidence of an actual gap.
  Ongoing community/PR activity is also an owner resourcing decision, not a code change.
- No action on Mobile/Page Speed WARN sub-scores — the report gives no itemised detail beyond a
  bare number, not enough to act on without re-litigating already-accepted budget trade-offs
  (D-80) using real field data (PageSpeed Insights/CrUX), per `docs/PERFORMANCE_BUDGET.md`.

**Owner decision, not actioned either way:**
- Homepage title/description length vs. preserving the owner's approved issue-#2 wording verbatim.
  See `DECISIONS.md` O-10.

## Checklist

- [x] Downloaded and read the full PDF (8 pages)
- [x] Cross-checked every claim against the live codebase (schema, robots.txt, businessInfo,
      metadata) before actioning anything
- [x] Applied all six Report-intake rules from `docs/SEO_CONTENT_GUIDE.md`
- [x] Preserved the source PDF at `docs/source-copy/pdf/geo-audit-report-2026-08-20.pdf`
- [x] Shipped `Organization` + `WebSite` schema (`app/layout.tsx`)
- [x] Shipped `BreadcrumbList` schema on all 8 relevant page types (`components/BreadcrumbSchema.tsx`)
- [x] Verified `llms.txt` (issue #7) end-to-end and folded its closure into this change
- [x] `npm run build` green — 24 routes, no drop
- [x] Verified served HTML with `curl` for every changed route (schema + breadcrumbs present)
- [x] Ran `node scripts/verify-redirects.mjs` — 34/34 passed, nothing broken
- [x] Recorded the verdict in `DECISIONS.md` (D-90, D-91, D-92, O-10)
- [ ] Close GitHub issues #7 and #8 with the triage summary as a comment
