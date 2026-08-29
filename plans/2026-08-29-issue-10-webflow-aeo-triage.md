# Plan — Issue #10: Webflow "AEO Assessment" report triage

**Date:** 2026-08-29
**Task class:** SEO/AEO tool report. Routed via `CLAUDE.md` → Task Routing: "Third-party SEO tool
report (cannibalisation · gap · audit PDF)" → `docs/SEO_CONTENT_GUIDE.md` § Report intake ("do not
action one as written").

## What issue #10 is

Owner-filed issue titled "aeo", body is a single 1920×19123px screenshot of Webflow's own marketing
tool at webflow.com/aeo — "Your AEO Assessment: elitetouchrenovations.au." Read in full (split into
12 vertical slices for review). Webflow is promoting a **"NEW"** "AEO" product (visible in its own
footer) — this is a lead-gen assessment tool bundled with that launch, not a bespoke technical crawl
audit. **Elite Touch Renovations is not built on Webflow** — it is a self-hosted Next.js 16 site on
Vercel (D-40/D-68) — which matters for what follows.

Headline claim: "Overall AEO Maturity score: 2 out of 5." Three "top priorities": (1) fix broken
links site-wide, (2) publish more/longer content pages, (3) unify brand messaging. Category
breakdowns for Technical (3/5), Authority (1/5), Measurement claims GA4 is "in place."

## Read first

- `docs/SEO_CONTENT_GUIDE.md` §3 (Report-intake rules).
- `DECISIONS.md` D-85–D-92, D-104–D-107 (prior third-party report triage precedent).
- The live production site — `https://www.elitetouchrenovations.au/` (D-98/O-11: confirmed live,
  fetchable anonymously).
- The actual codebase: `app/layout.tsx` (sitewide schema), `lib/projects.ts` (gallery slugs),
  `package.json` (no analytics dependency).

## Verification against the real site (not the report's numbers)

Every checkable, factual claim in the report was independently re-verified rather than trusted:

| Report claim | Verification method | Result |
|---|---|---|
| "Very high broken-link rate," "12 of 14 gates pass," ">20% of all links broken" | Crawled all 21 internal URLs reachable from the 6 seed pages (home, packages, about-us, contact-us, gallery, services) plus all 11 gallery project pages and 4 service pages; checked HTTP status of each | **0 broken. All 21 return 200** (redirect-following). The handful of bare `/path` forms return `308` to their `trailingSlash: true` form — an intentional, documented redirect (D-41), not a break. |
| "No Organization schema markup" on `/`, `/packages`, `/about-us`, `/contact-us`, `/gallery` | Read `app/layout.tsx` | **False.** `localBusinessSchema` renders sitewide (every page shares the root layout) with `'@type': ['HomeAndConstructionBusiness', 'Organization']` — dual-typed specifically to satisfy literal `"Organization"` string-matching crawlers. The code comment at `app/layout.tsx:99-104` names this exact false-positive pattern, because **GitHub issue #8's GEO audit made the identical claim before** and this was the fix. The report's own "Schema Coverage Percentage" chart elsewhere in the same document shows **100%** — directly contradicting its own "Pages to fix" list. |
| "6 content pages averaging ~190 words," 30% question coverage | Fetched and stripped HTML from `/`, `/packages`, `/about-us`, `/contact-us`, `/gallery`, `/services` and counted visible words | **False by 2–10×.** Actual visible word counts: home 861, packages 1429, about-us 1809, contact-us 373, gallery 828, services 446. None is close to ~190. |
| "Elite Touch Renovations has Google Analytics 4 in place... covers about a third of your pages" | Searched the codebase for any analytics tag, GTM snippet, or `@vercel/analytics` / `gtag` reference; checked `package.json` dependencies | **No analytics of any kind exists in the deployed code.** `PROJECT_CONTEXT.md` K4 already tracks this as an **open, unresolved** owner+agent decision ("Analytics + call-tracking approach — settle before any tag is added"). The report's claim that GA4 is already partially deployed is simply wrong for this site. |
| "Unify brand messaging sitewide," "add author bylines," "grow industry mentions" | Not independently falsifiable — generic advice | Not evidence of anything broken; see verdict below. |

## Verdict

**This report is not actionable as written.** Every claim specific enough to check against the real
site is contradicted by the live site, the deployed code, or the report's own internal data (the
schema chart vs. the schema "pages to fix" list). This matches the pattern already established for
issues #4, #9 (partially — see D-93–95), #11 and #12: a third-party tool's generic/templated output
does not override what the code and a live check actually show. Per
`docs/SEO_CONTENT_GUIDE.md` §3 rule 1, "several 'issues' are deliberate architecture" — here, most
aren't even real issues at all.

No fix is applied for broken links (none exist), Organization schema (already present and
dual-typed for exactly this false-positive reason), or content depth (already well above the
report's claimed baseline). K4 (analytics) remains exactly where it already was — an open owner
decision, not newly urgent, since the premise that GA4 is "already in place" is false.

**Not done in this session** — this is analysis and a recorded rejection (D-110) only, matching the
"no invented facts, no manufactured work from an unreliable report" standard this repo has applied
to every prior third-party audit screenshot.

## Checklist

- [x] Downloaded and read the full issue #10 screenshot (split into 12 slices; single image exceeds
      readable height)
- [x] Read `docs/SEO_CONTENT_GUIDE.md` §3, `DECISIONS.md` prior report-intake precedent
- [x] Verified broken-links claim against a live crawl of all 21 real internal URLs — 0 broken
- [x] Verified Organization-schema claim against `app/layout.tsx` — already present, dual-typed
- [x] Verified content-depth claim against live word counts on all 6 flagged pages — 2–10× the
      report's claimed average
- [x] Verified GA4 claim against the codebase and `package.json` — no analytics tag exists anywhere
- [x] Verdict recorded in `DECISIONS.md` (D-110)
- [x] Issue #10 closed with a comment summarising this triage and linking this plan
