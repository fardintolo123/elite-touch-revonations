# Session Summary

## 1. Session Objective

Correct issue #61 after the owner pointed out that the PDF's "How to Use This" section should have been implemented, not only triaged. The concrete goal was to publish the report's FAQ coverage and turn the ten suggested blog topics into live, crawlable advice coverage while preserving ETR's business rules.

## 2. Work Completed

- Rechecked issue #61 with `gh issue view 61`; it was closed with the earlier triage-only comment.
- Confirmed the existing homepage FAQ now covers the report's FAQ set:
  - cost
  - fixed quotes vs estimates
  - waterproofing certification
  - timeline
  - strata/apartment renovations
  - licence and insurance
  - warranty
  - free on-site measure
  - managed trades
  - hidden issues after demolition
- Expanded the issue #61 blog-topic coverage in `lib/blog.ts` so all ten PDF topics have 600+ word advice coverage by the source-data counter:
  - `bathroom-renovation-cost-sydney`
  - `how-to-compare-bathroom-renovation-quotes`
  - `bathroom-waterproofing-certificate-sydney`
  - `bathroom-renovation-timeline-sydney`
  - `first-time-bathroom-renovation-sydney`
  - `ensuite-vs-bathroom-vs-powder-room-renovation`
  - `bathroom-laundry-combo-renovation-worth-it`
  - `bathroom-renovation-hidden-costs-sydney`
  - `strata-bathroom-renovation-sydney`
  - `questions-to-ask-a-bathroom-renovator`
- Added/updated issue #61 plan tracking in `plans/2026-09-20-issue-61-how-to-use-this-correction.md`.
- Updated `DECISIONS.md`:
  - D-143 now explicitly says it is superseded.
  - D-147 records the corrected issue #61 implementation.
  - D-146 already belongs to issue #63 and was left intact.
- Verified static HTML contains the new blog pages, homepage FAQ terms and sitemap entries.
- Ran TypeScript, production build, readability and browser checks.

## 3. Important Decisions

- Decision: Owner correction overrides the earlier triage-only issue #61 decision.
  - Reason: The owner explicitly said the "How to Use This" section should have been implemented.
  - Alternatives considered: Keep D-143 and only add a note; rejected because it would preserve a misleading record.
  - Preferred approach: Supersede D-143 and add D-147 with the corrected shipped outcome.

- Decision: Waterproofing certificate content is published only as renovation-process advice, not as a standalone waterproofing service.
  - Reason: D-02 says waterproofing is a process inside bathroom renovation, not a separate service claim.
  - Alternatives considered: Create/position a waterproofing service article; rejected as scope drift.
  - Preferred approach: "Waterproofing certificates explained" article framed around AS 3740 and handover paperwork inside a full renovation.

- Decision: Strata copy omits slab-scan/core-hole wording from the PDF.
  - Reason: The repo has no first-party evidence that ETR handles those tasks.
  - Alternatives considered: Publish the PDF's wording; rejected as unsupported.
  - Preferred approach: Cover approvals, access, lift/common-area protection, working hours and paperwork.

## 4. Permanent Rules / Lessons

- If an owner corrects a prior report triage, record the supersession in `DECISIONS.md`; do not leave the old "reopen only if..." logic standing as the final word.
- Third-party PDFs can be implemented when the owner explicitly says to do so, but business facts and scope guardrails still control the wording.
- For issue #61 specifically, do not reintroduce slab-scan/core-hole claims or standalone waterproofing service positioning without first-party evidence.

## 5. Things We Explicitly Decided NOT To Do

- Did not claim standalone waterproofing services.
- Did not claim standalone laundry renovations.
- Did not publish the PDF's unsupported strata slab-scan/core-hole language.
- Did not add dependencies, scripts, images or client-side code.
- Did not push or deploy.

## 6. Current Project State

- Issue #61 "How to Use This" content is implemented in the data-driven blog system and visible homepage FAQ.
- The production build is green.
- The browser check passed in system Microsoft Edge against `http://localhost:3000`.
- Unrelated dirty files from other in-progress issue work remain in the worktree: `PROJECT_CONTEXT.md`, `docs/PERFORMANCE_BUDGET.md`, `plans/2026-09-20-issue-63-location-photo-heroes.md`, and `session-history/2026-09-20-issue-63-location-photo-heroes.md`. They were not part of this task and were left alone.
- A local `next start` server was started during verification on port 3000.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `lib/blog.ts` | Added final depth sections to the issue #61 topic posts so all ten report topics clear the 600-word source-data floor. | Implement the PDF's blog-post instruction and avoid thin coverage. |
| `DECISIONS.md` | Marked D-143 superseded and added D-147 for the corrected issue #61 implementation. | Preserve the decision trail and prevent future agents from repeating the triage-only mistake. |
| `plans/2026-09-20-issue-61-how-to-use-this-correction.md` | Checked off completed implementation and verification items. | Keep the required issue plan/checklist live. |

## 8. Files Created

- `session-history/2026-09-20-issue-61-how-to-use-this-correction.md` — this handoff file.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npm.cmd run typecheck` — passed.
- `npx.cmd next build` — passed; generated 58 static pages.
- `npm.cmd run check:readability` after build — passed, 48/48 checked pages at Flesch >= 60. The script currently reports 48 routes and does not list the four new posts individually.
- Source-data word count for the ten issue #61 topics — all 600+ words:
  - cost 602
  - fixed quote 622
  - waterproofing certificates 640
  - timeline 666
  - first-time renovation 601
  - ensuite vs bathroom vs powder room 656
  - bathroom + laundry combo 653
  - hidden costs 604
  - strata 615
  - choosing renovator 646
- Served HTML checks:
  - new blog HTML files exist under `.next/server/app/blog/`
  - homepage built HTML contains FAQ terms for strata, warranty, free measure, fixed-scope quote and one-team management
  - `.next/server/app/sitemap.xml.body` contains the four new issue #61 blog slugs
- Browser check:
  - System Microsoft Edge via Playwright against `http://localhost:3000`
  - desktop 1280px and mobile 390px
  - homepage plus four new posts
  - one H1 per page
  - no horizontal overflow
  - required phrases visible

## 11. Performance Impact

- No new dependencies, client boundaries, scripts, images, fonts or third-party assets were added.
- This is text/content expansion only.
- No Lighthouse run was performed; production build and route table passed.
- First Load JS was not expected to change from this content-only work.

## 12. SEO Impact

- Issue #61 blog coverage is now live through crawlable static article pages and sitemap entries.
- Homepage FAQ coverage now answers the report's buyer objections in visible HTML.
- New/expanded search intents include:
  - bathroom renovation cost in Sydney
  - fixed quote vs verbal estimate
  - waterproofing certificates
  - renovation timeline and delay causes
  - first-time renovation steps
  - ensuite vs full bathroom vs powder room
  - bathroom + laundry combo
  - hidden demolition issues
  - strata bathroom renovation
  - choosing a bathroom renovator
- Business-scope guardrails were preserved.

## 13. Remaining Tasks

### High Priority

- Update GitHub issue #61 with the corrective implementation summary.

### Medium Priority

- Consider updating `scripts/check-readability.mjs` in a later task so it includes all newly generated blog routes; this session verified the new pages separately.

### Low Priority

- Quarterly competitor-review cadence can remain as a future content-review process item.

## 14. Open Questions

- None for issue #61.

## 15. Next Session Handoff

- Inspect `CLAUDE.md`, `DECISIONS.md` D-143/D-147, and `plans/2026-09-20-issue-61-how-to-use-this-correction.md` before touching issue #61 again.
- Do not undo D-146; it belongs to unrelated issue #63 work already present in the tree.
- Do not add unsupported strata slab-scan/core-hole claims.
- Do not turn waterproofing into a standalone service.
- Be careful with the dirty worktree; unrelated issue #63 changes are present.

## 16. Potential Documentation Updates

- `scripts/check-readability.mjs` may need a later fix to include every generated blog route in its route list.
- No new permanent rules need to be added to `CLAUDE.md`; D-147 captures the important issue-specific decision.

## 17. Conversation-Derived Insights

### Confirmed decisions

- The owner's correction means issue #61 should be treated as implemented content work, not only triage.
- The earlier D-143 decision is superseded by D-147.

### Strong recommendations

- Keep issue #61 content in the blog data layer rather than creating bespoke page components.
- Keep future competitor-review actions evidence-backed and business-scope safe.

### Ideas/proposals

- Extend readability route detection so future new blog posts are automatically checked.

### Unresolved opinions

- None.
