# Distinctive design rollout (no AI-generated look)

**Outcome owned:** every page and section passes `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` (D-158), and
new AI-look patterns are caught by `npm run check:design`.
**Status:** standard adopted 2026-10-28; issues open under tracker #73. Delete this plan when #73
closes. The standard itself is permanent.
**Blocked items:** O-12 (eyebrow per section) waits on #74/#75 screenshots, then the owner.

## Why it is shaped this way
- **The PDF was adapted, not pasted.** DESIGN.md already owns the system. The checklist adds the
  AI-look lens, the section test, the rendered-screenshot workflow and the evidence gate.
- **DESIGN.md's pills, card radii and eyebrows are system choices.** The test is *volume and
  repetition*. The one real tension (an eyebrow above every H2) goes to the owner as O-12.
- **The 2026-09-29 critique already rated the homepage "not generic AI" (33/40).** So the issues
  target repetition, motion and proof order. This is not a redesign.
- **Issues split by route class with disjoint file ownership.** The enquiry form stays with
  #68 → #69 → #70.

## Checklist
- [x] PDF read; routed docs read (CLAUDE.md, DESIGN.md, PRODUCT.md, DECISIONS.md, SPECIALIST_AGENTS.md, 2026-09-29 critique)
- [x] Source scan; results in checklist §9
- [x] `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` created
- [x] CLAUDE.md (doc map, routing ×3, Design Standard section, Testing Workflow, Review Checklist), AGENTS.md, Copilot instructions + specialist instructions, `docs/SPECIALIST_AGENTS.md`, DESIGN.md §0, PRODUCT.md
- [x] DECISIONS.md D-158 + O-12
- [x] Issues #73 (tracker), #74–#79 created; ownership reconciled with #68–#70; #63 and #70 told about the standard
- [ ] #79 scanner + workflow
- [ ] #78 shared components (re-check the mobile header P1 first)
- [ ] #74 homepage (+ O-12 evidence)
- [ ] #75 service + location pages
- [ ] #76 proof + company pages
- [ ] #77 blog
- [ ] O-12 answered and recorded
- [ ] #73 closed; this plan deleted

## Files
`docs/DISTINCTIVE_DESIGN_CHECKLIST.md` · `CLAUDE.md` · `DESIGN.md` · `DECISIONS.md` · `AGENTS.md` ·
`.github/copilot-instructions.md` · `.github/instructions/specialist-agents.instructions.md` ·
`docs/SPECIALIST_AGENTS.md` · `PRODUCT.md`

## Verification
Each issue's own §7 evidence (screenshots at 390 + 1440, independent critique, conversion, readability,
performance). Docs-only change this session: no build needed.
