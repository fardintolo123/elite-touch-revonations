# Session Summary

## 1. Session Objective

Fix the reported full-bleed hero gap shown in the attached screenshots, audit other hero variants for
the same viewport issue, make normal page navigation start at the top, and add the verified behavior
as a durable rule in `CLAUDE.md`.

## 2. Work Completed

- Read `CLAUDE.md`, `DESIGN.md`, `DECISIONS.md`, `docs/DISTINCTIVE_DESIGN_CHECKLIST.md`,
  `docs/SPECIALIST_AGENTS.md`, and the applicable `impeccable` and Playwright instructions.
- Measured the baseline on a fresh production build:
  - At 1440×900, the header was 80.8px and photographed/location heroes were only 560px tall,
    leaving the visible content viewport short.
  - Internal navigation from a scrolled page retained a non-zero scroll position (`237.6px` in the
    baseline test).
- Updated `app/globals.css` so `.et-hero-backdrop` and `.et-location-hero` fill the remaining
  viewport below the responsive header, using `100svh` with a `100vh` fallback and preserving the
  existing minimum heights and natural content growth.
- Applied the same viewport-edge behavior to the mobile full-bleed variants; the mobile location
  hero remains photo-first with the copy below it.
- Added `components/layout/ScrollToTop.tsx`, a client leaf that resets normal route navigation to
  the top immediately, temporarily disabling smooth scrolling so Next's own scroll handling cannot
  animate the new page from the old position. Hash links remain target-based.
- Mounted `ScrollToTop` in `app/layout.tsx`.
- Added the full-bleed hero and navigation verification rule to `CLAUDE.md` under the browser testing
  workflow.
- Added the single-context visual review record at
  `.impeccable/critique/2026-11-04-hero-fold-scroll-reset.md` because no sub-agent tool was exposed.
- No dependencies, copy, metadata, schema, URLs, or business facts were changed.

## 3. Important Decisions

### Decision: use remaining viewport height below the header

- **Decision:** Size full-bleed first-screen heroes with `max(existing minimum, viewport minus header
  flow height)`.
- **Reason:** The defect was a measurable geometry mismatch, not an image or content problem.
- **Alternatives considered:** Applying `100vh` blindly, forcing every `.et-hero` to full-screen, or
  hiding the bottom overflow.
- **Why preferred:** The chosen rule targets only full-bleed heroes, accounts for the header, works
  on mobile and desktop, and lets content-heavy heroes grow instead of clipping content.

### Decision: use a root-layout scroll-reset leaf

- **Decision:** Reset normal route changes from a small client component using `usePathname`.
- **Reason:** The root layout is shared by every route, while the existing `history.scrollRestoration`
  script only addressed reload restoration and did not reliably reset App Router transitions.
- **Alternatives considered:** Adding handlers to every navigation link, removing smooth scrolling
  globally, or relying on Next's default scroll behavior.
- **Why preferred:** One shared behavior covers route navigation, reload, back, and forward without
  duplicating handlers; hash navigation is explicitly preserved.

### Decision: do not alter ordinary content-driven heroes

- **Decision:** Leave the homepage and standard side-by-side/text-only `.et-hero` compositions
  content-driven.
- **Reason:** They are not full-bleed first-screen heroes and their measured height is determined by
  legitimate content/layout rather than an unexplained band under a full-bleed image.
- **Alternative rejected:** Applying the viewport rule to every `.et-hero`, which would change
  unrelated page compositions.

## 4. Permanent Rules / Lessons

- Full-bleed first-screen heroes must be checked against the actual CSS viewport after accounting for
  the responsive sticky header; do not infer dimensions from screenshots that include browser chrome.
- Test every shared hero variant and representative generated route, not only the page in the report.
- Normal route navigation must land at the page top unless the link contains an intentional hash.
- Keep smooth scrolling for in-page anchors, but route scroll resets must be immediate.

## 5. Things We Explicitly Decided NOT To Do

- Do not force standard content-driven heroes to `100vh`.
- Do not clip content, hide overflow, or redesign hero copy/images to conceal the gap.
- Do not remove global smooth scrolling, because intentional hash navigation still needs it.
- Do not change mobile photo/copy order, CTA content, image treatment, or business facts.
- Do not commit, push, deploy, or modify unrelated pre-existing worktree changes.

## 6. Current Project State

- Full-bleed services, service, region, and suburb heroes fill the visible viewport at the tested
  desktop and mobile sizes.
- Normal internal navigation, reload, back, and forward all land at `scrollY=0` in browser tests.
- Hash navigation still lands on the requested blog topic below the sticky header.
- Build, TypeScript, and design-pattern checks pass.
- No SEO or performance regression was observed or measured; no new dependency was added.
- The working tree still contains unrelated pre-existing edits in several files. They were preserved.
- The task-owned verification server on port 4337 was stopped after testing.
- No known product issue remains for this task.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `CLAUDE.md` | Added hero-fold and navigation browser-verification rule | Prevent recurrence of the reported defect |
| `app/globals.css` | Added responsive header-flow measurement and full-bleed hero viewport sizing | Remove unintended blank bands on desktop and mobile |
| `app/layout.tsx` | Mounted `ScrollToTop` | Apply shared route-top behavior site-wide |
| `components/layout/ScrollToTop.tsx` | New client route scroll-reset component | Reset normal navigations without breaking hash links |
| `.impeccable/critique/2026-11-04-hero-fold-scroll-reset.md` | Added degraded visual review record | Preserve independent-review evidence and limitations |

## 8. Files Created

- `components/layout/ScrollToTop.tsx` — shared route scroll reset.
- `.impeccable/critique/2026-11-04-hero-fold-scroll-reset.md` — visual review and evidence record.
- `session-history/2026-11-04-full-bleed-hero-scroll-fix.md` — this handoff.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npm run typecheck` — pass.
- `npm run check:design` — pass; no mechanical design pattern count exceeded its baseline.
- `npm run build --ignore-scripts` — pass; 121 static pages generated.
- `impeccable detect --json app/layout.tsx components/layout/ScrollToTop.tsx` — no findings.
- Playwright on a fresh production server at `http://localhost:4337`:
  - Audited all 11 published location routes, both photographed service backdrop variants, the
    text-only service variants, and representative company/content pages.
  - At 1440×900, full-bleed heroes measured 819px below the 80.8px header and ended at about
    899.8px.
  - At 390×844, mobile full-bleed heroes measured 731px below the 113.6px header and reached the
    viewport edge.
  - Normal route navigation stayed at `scrollY=0` from the first sample through 600ms.
  - Reload, back, and forward stayed at `scrollY=0`.
  - Blog hash navigation landed the target at about 96px below the viewport top.
- Screenshots were captured at 390×844 and 1440×900 and visually inspected.

## 11. Performance Impact

No Lighthouse, PageSpeed, Core Web Vitals, or bundle-size measurement was run. The change adds one
small client component and no dependency; no known performance regression was introduced. The hero
images remain the existing priority candidates.

## 12. SEO Impact

SEO was not affected. No route, copy, metadata, schema, canonical, sitemap, or internal-link data
changed.

## 13. Remaining Tasks

### High Priority

None for this task.

### Medium Priority

None for this task.

### Low Priority

None for this task.

## 14. Open Questions

None.

## 15. Next Session Handoff

If continuing this task, inspect `CLAUDE.md`, `app/globals.css`, `app/layout.tsx`, and
`components/layout/ScrollToTop.tsx` first. Do not revert the viewport sizing or route reset without
new browser evidence. Preserve unrelated existing worktree changes, and re-run the 390×844 and
1440×900 Playwright checks after any shared-header or hero change.

## 16. Potential Documentation Updates

- The new `CLAUDE.md` rule is already the appropriate permanent workflow documentation.
- If the team later formalizes a reusable header-flow CSS token, document its relationship to the
  hero viewport rule in `DESIGN.md` or `PROJECT_CONTEXT.md`.
- No SEO or performance documentation update is currently warranted.

## 17. Conversation-Derived Insights

### Confirmed decisions

- The screenshots represented two separate but related UX defects: an incomplete first viewport and
  stale scroll position after navigation.
- The fix must be measured against the page viewport, not the browser window including Chrome UI.

### Strong recommendations

- Keep the browser geometry assertions in future visual regressions for shared heroes.
- Treat a rule written in `CLAUDE.md` as incomplete until the rendered behavior is verified.

### Ideas/proposals

- A future visual-regression harness could persist the hero/header measurements as JSON alongside
  screenshots.

### Unresolved opinions

- None.
