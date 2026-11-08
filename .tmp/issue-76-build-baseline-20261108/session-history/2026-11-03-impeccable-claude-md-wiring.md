# Session Summary — impeccable wired into CLAUDE.md

## 1. Session Objective
Check whether the `impeccable` design skill is installed, whether each project's CLAUDE.md tells
sessions to use it, and bring this project in line with the most complete sibling (4 Elements Painting).

## 2. Work Completed
- Confirmed `impeccable` is installed as a user-level skill at `C:\Users\Administrator\.claude\skills\impeccable`
  (SKILL.md, agents/, reference/, scripts/). Not vendored in any repo. Did not compare against the
  current download at impeccable.style.
- Audited every `D:\1\*\CLAUDE.md`: only CarFlow and manawatu-car-removal named it; ETR did not
  (only `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` lines 96/103 did).
- Compared 4EP (`D:\1\4ElementsPainting\4ElementsPainting-1`) and manawatu. 4EP's wiring: a UI row in
  Task Routing naming the skill, a "Recommended (use by default)" line, and a UI Rules sentence.
  Manawatu already has all of that and more (mandatory row, `context` first, `optimize`/`audit`
  sub-commands, resource map, refused-patterns list), so it was left unchanged.
- Edited `CLAUDE.md` (ETR): Task Routing UI row, Design Standard "Judge the rendered page" bullet,
  and a "Recommended skills" paragraph under Specialist Agents.
- Nothing committed or pushed.

## 3. Important Decisions
- Manawatu left as-is: already more complete than 4EP on this point.
- Did not copy 4EP's `npm run audit:design` routing; ETR has its own `npm run check:design`.

## 4. Permanent Rules / Lessons
- `impeccable` lives at user level; a fresh clone/other machine needs it installed separately.
- ETR already holds `PRODUCT.md`, `DESIGN.md` and `.impeccable/critique/` as the skill's inputs/outputs.

## 5. Unfinished / Open
- CarFlow's mention count (3) was not reviewed for quality.
