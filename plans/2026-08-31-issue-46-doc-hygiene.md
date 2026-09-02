# Issue #46 - Documentation Hygiene

**Purpose.** Implement the doc-hygiene issue from
`plans/2026-08-31-seo-master-plan.md`: remove stale factual landmines before the next content or
schema session starts.

**Route read.** `CLAUDE.md`, `DECISIONS.md`, `PROJECT_CONTEXT.md`,
`docs/CONTENT_QUALITY_CHECKLIST.md`, `docs/SEO_CONTENT_GUIDE.md`,
`docs/SEO_AEO_GEO_CHECKLIST.md`, `docs/PERFORMANCE_BUDGET.md`, plus the originating audit findings
C-9, F-1, G-4 and L-7.

## Plan

1. Correct stale business facts in standing docs: 2022 founding year, 19 testimonials, and the
   owner-confirmed 10-year workmanship warranty.
2. Update SEO/schema guidance so FAQ blocks are treated as useful visible answer content, while
   `FAQPage` is no longer promised as a Google rich-result feature.
3. Record deliberate non-work: no further `llms.txt` investment, skip RSL 1.0 licensing, and treat
   14px body copy as a browser-verification item governed by `DESIGN.md`.
4. Mark the master plan/checklist so issue #46 is no longer shown as untouched.

## Checklist

- [x] Task routed; mapped docs read.
- [x] `DECISIONS.md` checked; D-57, D-58, D-68, D-90 and D-98 govern the stale facts.
- [x] Source-copy files left unchanged because they preserve original owner/PDF source text.
- [x] Stale 2023 / unresolved-warranty / 18-review guidance removed from standing docs.
- [x] FAQ rich-result status updated from Google Search Central's 2026 changelog.
- [x] RSL 1.0, `llms.txt` and 14px body-copy notes recorded as considered skips/verification items.
- [x] Master SEO plan updated to show #46 shipped.
- [x] Stale-text grep checked; remaining hits are historical/source/audit records, not standing
      guidance.
- [x] `npm.cmd run typecheck` passed.
- [x] `npm.cmd run build` passed after the stale `.next\lock` cleared; route count remained 30.
