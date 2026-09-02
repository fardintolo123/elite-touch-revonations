# Issue #36 — Homepage FAQ block

**Issue:** [#36](https://github.com/fardintolo123/elite-touch-revonations/issues/36)
**Source:** `plans/2026-08-31-seo-master-plan.md` §4 Phase C · `plans/2026-08-31-seo-page-audit.md` **P-1**
**Date:** 2026-09-02
**Status:** in progress

## Plan

The homepage targets "bathroom renovations near me" (1K–10K/mo, D-12) and has no FAQ block. Add
2–3 high-intent Q&As to `app/page.tsx` in always-rendered markup (`<details>` + `<summary>`), plus
`FAQPage` JSON-LD via the existing `components/FaqSchema.tsx`. Mirror the `/packages/` FAQ pattern
exactly (visible answer string === schema `text`).

Questions (from the P-1 finding):
1. **How much does a bathroom renovation cost in Sydney?** — 40–60 words, real "from" prices with
   size basis, link to `/packages/`. Figures copied from `app/packages/page.tsx` `TIERS` / `FAQS`.
2. **How long does a bathroom renovation take?** — the three `businessInfo.buildDurations` ranges,
   verbatim (`3–4` / `5–6` / `5–7 weeks`), link to `/services/bathroom-renovations/`.
3. **Which areas of Sydney do you cover?** — "across Sydney", owner's residential+commercial
   wording (`businessInfo.clientTypes`), link to `/services/bathroom-renovations/`. No suburb
   invented; the existing `AreasServedLinks` block on the page carries the hub links (formal
   homepage→hub linking is #40's job — coordinated, not duplicated here).

Every figure traces to `app/packages/page.tsx` + `lib/businessInfo.ts` — never restated from memory
(same rule as the `/packages/` FAQ). FAQ rich results are retired (schema F-1 / #46) — this is for
AEO / AI-answer value, not a SERP feature.

## Checklist

- [ ] Route task through `CLAUDE.md`; read `DESIGN.md`, `docs/SEO_CONTENT_GUIDE.md`,
      `docs/CONTENT_QUALITY_CHECKLIST.md`, `docs/SEO_AEO_GEO_CHECKLIST.md`, `docs/PERFORMANCE_BUDGET.md`.
- [ ] Confirm #36 acceptance criteria + check `DECISIONS.md` (D-12, F-1).
- [ ] Add `HOME_FAQS` + FAQ `<section>` + `<FaqSchema>` to `app/page.tsx`.
- [ ] Verify every price/duration matches `/packages/` and `lib/businessInfo.ts` exactly.
- [ ] `npm run build` green; route count not dropped; `/` First Load JS unchanged.
- [ ] `npm run check:readability` — `/` still ≥ 60.
- [ ] `curl` / grep served HTML — 3 questions + answers present; `FAQPage` JSON-LD present and matching.
- [ ] Browser check desktop + 390px — `<details>` collapses via native UI, answer text in DOM when collapsed.
- [ ] Update `plans/2026-08-31-seo-page-audit.md` (P-1) + master-plan registry.
- [ ] Record decision in `DECISIONS.md` (D-117).
- [ ] Close GitHub issue #36.
