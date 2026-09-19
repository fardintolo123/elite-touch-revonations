# Issue 61 - Competitor analysis PDF triage

## Source

- GitHub issue #61: "check this pdf"
- Attachment: `Elite_Touch_Renovations_Competitor_Analysis.pdf`
- Local review copy: `tmp/issues/61/Elite_Touch_Renovations_Competitor_Analysis.pdf`

## Routing

- `CLAUDE.md` issue workflow
- `DECISIONS.md`
- `docs/SEO_CONTENT_GUIDE.md` report intake rules
- `docs/CONTENT_QUALITY_CHECKLIST.md`
- `docs/SEO_AEO_GEO_CHECKLIST.md`
- `docs/BATHROOM_SITE_STRUCTURE.md`
- `PROJECT_CONTEXT.md`
- Next 16 local docs:
  - `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`

## PDF Findings

The PDF recommends:

- Ten blog topics around cost, fixed quotes, waterproofing certificates, timelines, first-time renovators, service-scope comparison, bathroom + laundry work, demolition surprises, strata apartments, and choosing a Sydney renovator.
- A homepage or FAQ-page FAQ section covering cost, fixed quotes, waterproofing, timelines, strata, licence/insurance, warranty, free measure, trade coordination, and hidden demolition issues.
- Quarterly competitor-review revisit.

## Triage

- Most blog-topic recommendations are already covered by live blog posts from the issue #58/D-139 first wave: cost, timeline, quote comparison, renovator questions, planning checklist, strata, hidden costs, warranty, fast renovation, and small bathrooms.
- `Waterproofing Certificates Explained` is useful as a trust/process theme, but not approved as a standalone page because D-02 rejects standalone waterproofing/leak-repair service positioning and `docs/BATHROOM_SITE_STRUCTURE.md` shows only 10-100/mo for `bathroom waterproofing sydney`.
- `Bathroom + Laundry Combo Renovations` is already an existing service page and GKP found no measurable volume for `bathroom and laundry renovation sydney`, so it should be improved in place only when there is a real service-page gap.
- The report's strata answer mentions slab scans and core holes. Do not publish that wording without first-party evidence that ETR handles those tasks.
- The report's generic insurance wording should be replaced with the exact evidenced insurance facts in `lib/businessInfo.ts`.

## Implementation Plan

1. Add evidence-backed homepage FAQ entries for the PDF's recurring objections:
   - fixed quote vs estimate
   - certified AS 3740 waterproofing
   - licence and insurance
   - managed trade coordination
   - hidden issues found after demolition
2. Keep unsupported strata/slab-scan/core-hole claims out of the homepage FAQ.
3. Do not create new blog posts from this report without volume/difficulty evidence or owner exception.
4. Record the triage decision in `DECISIONS.md`.
5. Verify TypeScript, build, readability, and served HTML/schema presence.
6. Comment on and close issue #61 only after verification passes.

## Checklist

- [x] Issue #61 read.
- [x] PDF downloaded and text extracted.
- [x] Existing blog/service/homepage coverage checked.
- [x] Plan written before implementation.
- [x] Homepage FAQ expanded with evidenced answers.
- [x] Unsupported PDF claims rejected in `DECISIONS.md`.
- [x] TypeScript check passes.
- [x] Build passes.
- [x] Readability check passes.
- [x] Served HTML/schema check confirms new FAQ copy is present.
- [x] Browser check passes at desktop and 390 px mobile.
- [x] Session handoff written.
- [x] GitHub issue #61 commented and closed if verified.
