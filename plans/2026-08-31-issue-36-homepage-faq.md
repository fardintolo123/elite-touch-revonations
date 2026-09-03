# Issue #36 — Homepage FAQ block

**Issue:** [#36](https://github.com/fardintolo123/elite-touch-revonations/issues/36)
**Source:** `plans/2026-08-31-seo-master-plan.md` §4 Phase C · `plans/2026-08-31-seo-page-audit.md` **P-1**
**Date:** 2026-09-02
**Status:** code implemented + committed in `867e30c`; verification + doc bookkeeping PENDING (blocked: a
concurrent agent session was actively editing `DECISIONS.md` / `seo-master-plan.md` and running the
dev server on :3210 — a competing `next build` or shared-doc edit would have collided).

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

- [x] Route task through `CLAUDE.md`; read `DESIGN.md`, `docs/SEO_CONTENT_GUIDE.md`,
      `docs/CONTENT_QUALITY_CHECKLIST.md`, `docs/SEO_AEO_GEO_CHECKLIST.md`, `docs/PERFORMANCE_BUDGET.md`.
- [x] Confirm #36 acceptance criteria + check `DECISIONS.md` (D-12, schema F-1).
- [x] Add `HOME_FAQS` + FAQ `<section>` + `<FaqSchema>` to `app/page.tsx` — landed in `867e30c`
      (swept into a parallel session's `commit -a`; diff is exactly the intended change, nothing else).
- [x] Verify every price/duration matches `/packages/` and `lib/businessInfo.ts` exactly — Q1 figures
      = `app/packages/page.tsx` `TIERS`/`FAQS`; Q2 `3–4`/`5–6`/`5–7 weeks` = `businessInfo.buildDurations`;
      Q3 wording = `businessInfo.clientTypes` + `serviceArea.coverage`. No suburb invented.
- [x] `npm run typecheck` — clean.
- [ ] `npm run build` green; route count not dropped; `/` First Load JS unchanged. — NOT RUN
      (concurrent `next dev` on :3210; a competing build risks corrupting both — CLAUDE.md Testing Workflow).
- [ ] `npm run check:readability` — `/` still ≥ 60. — NOT RUN (needs the build above).
- [ ] `curl` / grep served HTML — 3 questions + answers present; `FAQPage` JSON-LD present and matching. — NOT RUN.
- [ ] Browser check desktop + 390px — `<details>` collapses via native UI, answer text in DOM when collapsed. — NOT RUN.
- [ ] Update `plans/2026-08-31-seo-page-audit.md` (P-1 ★NEW findings table) + master-plan registry
      (line ~78 "Homepage: add an FAQ block", line ~129 "#36 homepage FAQ"). — DEFERRED: both files were
      being edited by the concurrent session (#40/#41 work). Do in the same quiet pass as verification.
- [ ] Record decision in `DECISIONS.md` — next free number is **D-120** (D-119 taken by the parallel
      #41 work). Suggested `## 3u.` subsection. — DEFERRED for the same reason.
- [ ] Close GitHub issue #36 — only after the build/readability/HTML/browser gates pass.

## Handoff note

The only thing actually done and committed is the `app/page.tsx` change. Everything else waits for a
window when no other session holds the tree / build dir. The change is low-risk (text + one JSON-LD
`<script>`, zero JS/dep/image/font added — same class as the D-107 powder-room FAQ, which
`docs/PERFORMANCE_BUDGET.md` §4 recorded as structurally weightless), so verification should be a
formality, but it has not been done.
