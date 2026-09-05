# Issue #34 — Service pages: real per-service content + FAQ + answer-first lead

**From:** `plans/2026-08-31-seo-master-plan.md` §4 Phase C · `plans/2026-08-31-seo-content-audit.md`
C-2/C-3/C-7 · `/seo-geo` G-2 · `/seo-local` #14. **Issue:** #34. **No hard dependency** — chosen as the
best next step after #35 (same pattern, same skills, fully unblocked; #30/#22/#29 which #31 needs are
not yet shipped, so #31 was not picked up now).

## Problem

`bathroom-renovations`, `ensuite-bathroom-renovations` and `laundry-renovations` are near-duplicates —
only the H1 and one-sentence `summary` differ. `powder-room-renovations` already has the bar (D-107):
an `about` paragraph + FAQ. None of the three opens answer-first.

## Solution

Add `about` (string, the answer-first lead) + `faqs` (3–5 Q&A) to the three service records in
`lib/businessInfo.ts` — same optional fields already defined on the `Service` type and already
rendered by `app/services/[slug]/page.tsx` for powder-room. **No renderer change needed** — the
`/packages/` link the answer-first spec calls for already exists immediately below the `about` block
("See how the packages differ"), so `about` names the packages in prose without a duplicate link.

Content sourced from the owner-supplied PDFs (`docs/source-copy/svc-bathroom.md`, `svc-ensuite.md`,
`svc-bath-laundry.md`) for anything service-specific (ensuite ventilation/acoustics, laundry
combination logic and savings, bathroom strip-out realities), with **pricing kept to the current
package from-prices** ($18k/$25k/$30k + size basis) rather than the PDFs' own superseded indicative
dollar ranges and the PDFs' pre-D-75 duration figures where those were owner-corrected. The bathroom
FAQ explicitly answers the two `CONTENT_QUALITY_CHECKLIST.md` §5 objections named in the issue
("nowhere else to wash if it runs long", "looks like the brochure but feels wrong to live in").

## Checklist

- [x] Task routed; `DECISIONS.md` D-01/D-06/D-07/D-75/D-107 checked; source PDFs read
- [x] `about` written per service, 134–167 words (146 / 137 / 142), each: what the service is,
      cost + size basis (packages), duration, licence + warranty, one differentiator
- [x] 5 FAQs per service, sourced from the owner PDFs or already-established site facts — no invention
- [x] Bathroom FAQ answers both named §5 objections
- [x] `lib/businessInfo.ts` updated; `app/services/[slug]/page.tsx` unchanged (renders both already)
- [x] Swap test: service name/detail swapped between pages reads wrong
- [x] `npm run build` green; route count holds (32)
- [x] `npm run check:readability` — bathroom 66.4, ensuite 66.6, laundry 66.1 (all ≥ 60); 26/26 pages pass
- [x] Served-HTML checks — `about` unique per page (swap test), FAQ `<summary>` decode-matches `FAQPage`
      JSON-LD on all 3 + powder-room, packages link present, durations block hidden on laundry only
- [x] Browser check desktop + 390px (Playwright — 5 FAQ cards, about paragraph, packages link, no
      horizontal scroll, no console errors on all 3)
- [x] `plans/2026-08-31-seo-content-audit.md` (C-2/C-3/C-7) + master-plan registry + `DECISIONS.md` D-126
- [ ] Issue #34 closed (comment + close, if the write permission allows)
