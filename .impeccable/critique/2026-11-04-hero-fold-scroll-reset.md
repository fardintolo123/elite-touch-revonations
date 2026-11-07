# Hero fold and route scroll review — 2026-11-04

> ⚠️ DEGRADED: single-context (no sub-agent tool exposed in this Codex session)

## Target

Shared full-bleed heroes and route navigation:

- `app/globals.css`
- `app/layout.tsx`
- `components/layout/ScrollToTop.tsx`
- `components/PageHero.tsx`
- `components/LocationHero.tsx`

## Evidence reviewed

- Fresh production build served at `http://localhost:4337`.
- Playwright screenshots at 1440×900 and 390×844.
- Browser measurements of viewport, sticky-header, hero, and following-section bounds.
- Playwright route tests across all 11 published location routes, the two photographed service
  hero variants, text-only service heroes, and representative company/content pages.
- Playwright navigation checks for internal route changes, reload, back, forward, and a blog hash.
- `impeccable detect --json app/layout.tsx components/layout/ScrollToTop.tsx`: no findings.

## Review

| Priority | Finding | Result |
|---|---|---|
| P0 | Enquiry path or trust content broken | None observed |
| P1 | Hero still leaves an unintended blank band or looks templated | None observed |
| P2 | Desktop full-bleed heroes are intentionally dark on the left to preserve text contrast | Existing DESIGN.md/D-178 treatment; unchanged |

The corrected heroes reach the visible viewport edge without clipping the H1, CTAs, rating, or
project credit. The mobile location composition remains photo-first with copy below it, but its dark
hero background now continues to the viewport edge instead of exposing a canvas strip. Normal route
navigation is immediate and hash navigation remains target-based.

## Verification results

- At 1440×900, the 80.8px header leaves 819.2px of content viewport; full-bleed heroes measured
  819px high and ended at approximately 899.8px.
- At 390×844, the 113.6px header leaves 730.4px of content viewport; both full-bleed mobile heroes
  measured 731px and reached the viewport edge.
- Normal route navigation: scrolled source page → destination `scrollY=0` immediately and through
  600ms of follow-up samples.
- Reload: `scrollY=0`.
- Back/forward: `scrollY=0`.
- Hash link: target section landed at approximately 96px below the viewport top, beneath the sticky
  header.
- `npm run typecheck`: pass.
- `npm run check:design`: pass; no baseline increase.
- `npm run build --ignore-scripts`: pass; 121 static pages generated.

No P0/P1 issue remains from this review.
