# Session Summary

## 1. Session Objective

Implement GitHub issue #71: show evidenced historical project budgets and time on site on gallery
project pages, keep projects without figures unchanged, retain the firm-quote qualification, and
verify the result in served HTML and a real browser.

## 2. Work Completed

- Read the repository operating rules, specialist contract, design system, content checklist,
  distinctive-design gate, performance budget, SEO/AEO/GEO checklist, PRODUCT.md, the linked plan,
  issue #71, the relevant decision records, and the Next 16 page-routing guide.
- Found that commit `8bf2dec` had already added `priceRange`, `weeksOnSite`, six data records, and a
  first-pass hero row. The issue itself was still open and had no comments.
- Traced the six figures back to owner-supplied Project Info records preserved in the repository and
  historical intake evidence. No new ranges, price years, or package tiers were inferred.
- Treated the owner's live 2026-10-29 instruction, "go ahead", as approval to present the same six
  already-published budget and duration facts more clearly.
- Reworked the first-pass row into the existing semantic `.et-facts` pattern, positioned after the
  project summary. Labels are `Project budget` and `Time on site`.
- Added the required historical-price qualification: the displayed budget belongs to the completed
  project, while the visitor's price becomes firm after a free on-site measure and is set out in a
  fixed-scope written quote.
- Removed the first pass's invalid `--et-color-text-muted` token by relying on the existing fact-list
  styles and the valid `--et-text-secondary` token.
- Updated the six meaningfully changed project records' `updated` dates to 2026-10-29 so sitemap
  `lastmod` reflects the content change. The five unpriced projects kept their existing dates.
- Kept pricing out of `CreativeWork` structured data and did not add package-tier claims.
- Used Developer and Designer/Copywriter specialist reviews before editing, then an independent
  Vision Auditor on the final 390px and 1440px screenshots. The final audit found no P0/P1 issue.

## 3. Important Decisions

- **Decision:** Use only the six approximate budgets and durations already present in the
  owner-supplied Project Info material.
  **Reason:** They are primary project records already published in `lib/projects.ts` stories.
  **Alternatives considered:** invent ranges from the approximate figures, infer package tiers from
  package starting prices, or treat `completedByYear` as the price year. All were rejected because
  none is evidenced.
- **Decision:** Keep the facts early in the gallery hero, after the H1 summary, using `.et-facts`.
  **Reason:** The facts are authentic project proof and help pre-qualify a high-value enquiry. The
  existing pattern is responsive and avoids another card, band, icon set, or AI-default visual.
  **Alternative considered:** add a new facts card inside the About section. Rejected because it
  adds visual furniture without adding evidence.
- **Decision:** Keep the existing full `story` text unchanged.
  **Reason:** `project.story` is also consumed by a location renderer outside issue #71's file
  ownership. Removing its opening budget/duration sentence here would silently alter that route.
  **Trade-off:** the priced gallery page repeats the source-note budget and duration in its About
  paragraph. The independent reviewer rated the awkward/repeated sentence P2 only; no P0/P1 remains.
- **Decision:** Do not close issue #71.
  **Reason:** The owner asked to implement it, but did not explicitly authorize changing the issue
  state. The implementation is ready to close after its evidence comment is posted.

## 4. Permanent Rules / Lessons

- Before treating an issue's blocker as current, inspect live code and history. Issue #71 said the
  gallery had no project prices, but six owner-sourced budgets and durations were already published
  inside project stories.
- Historical project budgets are not package prices. Do not apply package size-basis language to
  them, infer a closest tier, or add price schema without a separate evidenced decision.
- Optional fact UI must render no wrapper, placeholder, or spacing residue when no facts exist.
- On this shared worktree, confirm `.next` ownership/state immediately before starting a server.
  Another session rebuilt the same output directory twice during verification; the first local
  server correctly failed on a missing manifest instead of being treated as a code defect.

## 5. Things We Explicitly Decided NOT To Do

- Did not invent price ranges, pricing years, or closest package tiers.
- Did not use `completedByYear` as an exact completion or pricing year.
- Did not add `Offer`, price, or price-range fields to project JSON-LD.
- Did not add CSS, a new visual component, a card, icons, animation, dependency, client boundary,
  image, font, or third-party script.
- Did not edit the shared location renderer to remove the remaining P2 narrative repetition.
- Did not touch concurrent issue #70/form/privacy/design-audit files.
- Did not push, deploy, or close the GitHub issue.

## 6. Current Project State

- Six gallery projects have optional budget and duration data: Balmain, Gladesville, Little Bay,
  Hunters Hill, The Rocks, and Artarmon bathroom + ensuite.
- Their gallery pages render the facts and firm-price qualification in always-rendered server HTML.
- Five projects without figures render no facts list or qualification and retain their prior layout.
- All 11 gallery routes return 200 in the local production server sweep.
- The six changed sitemap entries have `lastmod` 2026-10-29.
- Issue #71 remains open pending an explicit closure instruction. Nothing was pushed or deployed.
- Other unrelated files are modified or untracked by concurrent sessions; they were preserved.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `lib/projects.ts` | Clarified the historical-budget field contract and updated the six priced project records' content-review dates | Prevent inferred ranges/tiers and keep sitemap freshness honest |
| `app/gallery/[slug]/page.tsx` | Replaced the first-pass inline row with semantic conditional facts plus the firm-quote qualification | Make project proof clear, responsive, accessible, and compliant with issue #71 |

## 8. Files Created

- `session-history/2026-10-29-issue-71-project-pricing-facts.md` — this handoff.
- Local untracked evidence under `tmp/issue71-baseline/` and `tmp/issue71-final/` — before/after
  screenshots at 390x844 and 1440x900 for priced and unpriced gallery routes. These are not runtime
  assets and are not intended for deployment.
- Temporary Playwright scripts were created under the Windows temp directory, outside the repo.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npm.cmd run typecheck` — passed.
- `npm.cmd run build --ignore-scripts` — passed; 114 static pages generated, no route-count drop.
- `npm.cmd run check:readability` — passed 108/108 customer-facing routes at Flesch >= 60.
- `git diff --check` on the two implementation paths — no whitespace errors (only the existing
  Windows line-ending notice).
- Distinctive-design pattern scan — no new generic-copy, gradient, glass, or effect hits.
- Visible Playwright against a production build at 390x844 and 1440x900:
  - priced Balmain route: one H1, one facts list, one qualification, no horizontal overflow;
  - unpriced Artarmon route: no facts list, no qualification, no empty residue;
  - project `CreativeWork` schema had no price, `priceRange`, or `offers` field.
- Served-HTML sweep: all six priced routes contained their expected budget, duration, and quote
  qualification; all five unpriced routes omitted the price UI; all 11 returned HTTP 200.
- Sitemap sweep: all six changed project URLs emitted `lastmod` 2026-10-29.
- Independent Vision Auditor: no P0/P1 findings; one P2 about the pre-existing/repeated Project Info
  sentence in the About section.

## 11. Performance Impact

No Lighthouse run was added. The change is server-rendered text and semantic markup only and adds no
render-path request, dependency, script, client boundary, CSS, image, font, animation, or third-party
code. The production build and browser overflow checks passed. This follows the repository's existing
precedent for small server-rendered copy/markup changes where resource cost is structurally unchanged.
No performance regression is known.

## 12. SEO Impact

- Six gallery project pages gained always-rendered, concrete historical budget and duration facts.
- Metadata, canonical URLs, H1s, internal links, route publication, and project schema types were
  unchanged.
- Project pricing was deliberately excluded from structured data.
- The six meaningful content changes now emit sitemap `lastmod` 2026-10-29.
- Readability passed for the complete 108-route customer-facing inventory.

## 13. Remaining Tasks

### High Priority

- None for the code implementation.

### Medium Priority

- Close issue #71 only if the owner explicitly authorizes the external state change.

### Low Priority

- If a future location-page task owns the shared story renderer, consider normalizing the six
  Project Info opening sentences so the gallery fact block and story do not repeat budget/duration.
  Preserve the location page's current evidence when doing so.

## 14. Open Questions

- Exact price years remain unknown.
- Closest package tiers remain unknown and must not be inferred from the budgets.
- The six figures are approximate point budgets, not owner-supplied ranges.

## 15. Next Session Handoff

- Read issue #71 and this handoff first.
- Inspect `lib/projects.ts` and `app/gallery/[slug]/page.tsx`; do not recreate the facts row.
- Check the issue comment and current state before deciding whether any tracker update remains.
- Do not infer price years or package tiers.
- Do not touch unrelated dirty files; concurrent issue #70, privacy, design-audit, and shared-form
  work was active during this session.
- If changing the story duplication, inspect every consumer of `project.story`, especially
  `app/services/[slug]/[location]/page.tsx`, and coordinate with the route-class owner.

## 16. Potential Documentation Updates

- No permanent documentation update is required. The existing D-06/D-07 rules, content checklist,
  distinctive-design checklist, and performance workflow already cover the durable lessons.
- If the owner later supplies price years or package matches, record that owner evidence in the
  issue and update the data; do not turn it into a new general rule.

## 17. Conversation-Derived Insights

### Confirmed decisions

- Owner said "go ahead" after the six existing figures and the missing year/tier evidence were
  surfaced; the six already-published figures may be presented as structured page facts.
- Unknown years and tiers remain omitted.

### Strong recommendations

- Keep historical project pricing visually distinct from current package starting prices.
- Preserve the no-data behavior: no placeholder text or blank fact container.

### Ideas/proposals

- A later story-normalization pass could remove narrative repetition across gallery and location
  consumers if it has coordinated ownership and route-level verification.

### Unresolved opinions

- Whether the remaining P2 repetition is worth touching outside a location-route task.
