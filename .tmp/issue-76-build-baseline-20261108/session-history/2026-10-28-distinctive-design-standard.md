# Session Summary — distinctive design standard ("no AI-generated look")

## 1. Session Objective
Adopt the owner's PDF playbook *"Build websites that don't look AI-generated"* as a rule for every
page and section of this site (and the two sibling sites), and create GitHub issues to apply it now
and prevent AI slop later.

## 2. Work Completed
- Created `docs/DISTINCTIVE_DESIGN_CHECKLIST.md`:
  - rule; what an ETR page is made of; AI-default patterns mapped to this codebase with DESIGN.md
    allowances; section test
  - workflow (390 + 1440 screenshots, independent critique); findings format; evidence gate
  - route-class tracker; baseline scan
- CLAUDE.md: doc map entry, three routing rows (UI, design audit, new page), a new "Design Standard"
  section, a Testing Workflow gate, and a Review Checklist line.
- AGENTS.md, `.github/copilot-instructions.md`, `.github/instructions/specialist-agents.instructions.md`
  and `docs/SPECIALIST_AGENTS.md` (Vision Auditor = independent critic, Designer, Copywriter) point at
  the checklist.
- DESIGN.md §0 got one bullet: correct tokens can still read as a template. PRODUCT.md got one
  anti-reference.
- DECISIONS.md: new §3ad with **D-158**, and **O-12** in the Open table.
- `plans/distinctive-design-rollout.md`.
- GitHub: tracker **#73**; **#74** homepage, **#75** service + location, **#76** proof + company,
  **#77** blog, **#78** shared components + reveal motion, **#79** `check:design` scanner + workflow.
  Comments on #63 (now covered by #74/#75/#78) and #70 (standard applies; form ownership stays with
  #68 → #69 → #70).

## 3. Important Decisions
- **DESIGN.md stays authoritative.** Pills, card radii and eyebrow chips are system choices; the test
  is volume and repetition. The eyebrow-above-every-H2 tension goes to the owner (O-12) after
  screenshots.
- **Start from the 2026-09-29 critique** (33/40, "not generic AI"). The issues target repetition,
  motion and proof order. This is not a redesign.
- **Issues split by route class with disjoint file ownership.** `EnquiryForm.tsx` / `lib/actions.ts`
  stay with #68–#70; `lib/businessInfo.ts` service copy belongs to #75 only.
- **The scanner ratchets; it is not a hard phrase ban.** "Seamless" is literal in tiling copy, and
  reviews are verbatim.
- **Git:** D-157 (no new branches) followed; committed on `main`. The owner approved the push.

## 4. Permanent Rules / Lessons
- Judge design from rendered screenshots by a reviewer that did not build it.
- Check open issues for owned/frozen files before assigning ownership in new issues.

## 5. Things We Explicitly Decided NOT To Do
- No site code or design changes this session.
- No DESIGN.md rule changes (only a pointer).
- #63 not closed (left to the owner).
- The PDF not committed (this repo is public).

## 6. Current Project State
Standard adopted; #74–#79 open, none started. Suggested order: #79 → #78 → #74 → #75 → #76 → #77.

## 7. Files Changed
CLAUDE.md, AGENTS.md, DESIGN.md, DECISIONS.md, PRODUCT.md, `.github/copilot-instructions.md`,
`.github/instructions/specialist-agents.instructions.md`, `docs/SPECIALIST_AGENTS.md`.

## 8. Files Created
`docs/DISTINCTIVE_DESIGN_CHECKLIST.md`, `plans/distinctive-design-rollout.md`, this file.

## 9. Files Deleted
None.

## 10. Tests and Validation
Docs only, so no build. Routes and slugs in the issues were verified from code:
- 4 services from `lib/businessInfo.ts`
- 5 hubs + 6 suburbs from `service-areas.json` publication flags
- 11 gallery projects

## 11. Performance Impact
None now.

## 12. SEO Impact
None now. The issues require URLs/metadata/schema/publication gates to be preserved.

## 13. Remaining Tasks
#74–#79; O-12.

## 14. Open Questions
O-12 (eyebrow per section).

## 15. Next Session Handoff
Start with #79, then #78. Re-measure the mobile header first; the 2026-09-29 P1 may already be fixed.

## 16. Potential Documentation Updates
When #79 lands, replace "until then, grep" in checklist §7.

## 17. Conversation-Derived Insights
The same standard is in 4 Elements Painting (D-89, #539) and Manawatū Car Removal (#1). Keep the three
checklists' structure aligned when one changes.
