# Issue #36 — Homepage FAQ block

**Issue:** [#36](https://github.com/fardintolo123/elite-touch-revonations/issues/36)
**Source:** `plans/2026-08-31-seo-master-plan.md` §4 Phase C · `plans/2026-08-31-seo-page-audit.md` **P-1**
**Date:** 2026-09-02
**Status:** DONE — code committed 2026-09-02 (`867e30c`), verified + all bookkeeping closed 2026-09-04.

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
- [x] `npm run build` green — 32 routes, no drop (run 2026-09-04, once the concurrent session's dev
      server on :3210 had gone quiet — checked doc mtimes + `git status` first).
- [x] `npm run check:readability` — 26/26 pages ≥ 60; `/` scored **66.5** (977 words).
- [x] `curl` / grep served HTML — all 3 questions + answers present in `.next/server/app/index.html`;
      one `FAQPage` JSON-LD block with 3 `Question` entities, `acceptedAnswer.text` byte-identical to
      the visible `<p>` for all three; both linked hrefs (`/packages/`, `/services/bathroom-renovations/`)
      present.
- [x] Browser check desktop (1280px) + mobile (390px) via Playwright, against an isolated `next start`
      on port 4321 (not :3210, to avoid the concurrent session's dev server) — accordion opens on click
      (`<details open>` true), closes again on a second click, no horizontal overflow at 390px, all 3
      question tap targets ≥ 48px tall, link visible and correctly hrefed inside the expanded answer.
      Server stopped after the check.
- [x] Update `plans/2026-08-31-seo-page-audit.md` (P-1 in both the scorecard and the ★NEW findings
      table) + master-plan registry (`plans/2026-08-31-seo-master-plan.md` lines ~78, ~129, ~203).
- [x] Record decision in `DECISIONS.md` — **D-123**, new `## 3x.` subsection.
- [x] Close GitHub issue #36.

## Result

Shipped. Homepage FAQ live in always-rendered markup with matching `FAQPage` schema; every fact
sourced, nothing invented; build/readability/HTML/browser gates all pass.
