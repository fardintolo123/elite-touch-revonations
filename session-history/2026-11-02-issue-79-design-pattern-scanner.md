# Session Summary

## 1. Session Objective

Implement GitHub issue #79: add a baseline-ratcheted design-pattern scanner, npm script, GitHub
Actions workflow, and the requested documentation updates.

## 2. Work Completed

- Added `scripts/check-design.mjs`, using Node built-ins only. It scans `app/`, `components/`, and
  `lib/` for the mechanical CSS/inline-style signals, motion declarations, route-page eyebrow
  counts, and the checklist's generic phrases.
- Added `scripts/check-design-baseline.json` with per-file existing counts and a recorded reason.
  Eyebrow counts are informational; other counts fail only when they exceed their file baseline.
- Added `.github/workflows/check-design.yml` to run `npm ci --ignore-scripts` and
  `npm run check:design` on pushes and pull requests, without a build or secrets.
- Added the npm script to `package.json`.
- Updated §7 and the #79 row in `docs/DISTINCTIVE_DESIGN_CHECKLIST.md`, and added the check to
  `CLAUDE.md`'s Testing Workflow.
- Left issue #79 open. No commit or push was made.

## 3. Important Decisions

- **Use per-file, per-pattern counts.** This makes the baseline a ratchet while allowing existing
  patterns to remain until separately reviewed.
- **Keep eyebrow counts advisory.** The checklist explicitly defers the visual repetition decision
  to rendered review.
- **Exclude `lib/reviews.ts` and explicitly quoted review passages from phrase hits.** Reviews are
  verbatim; literal tiling use of “seamless” is not in the generic phrase list.
- **Require a non-empty reason for every baseline update.** The reason is stored in the JSON so
  baseline changes have an audit explanation.
- **Do not push.** The repository requires explicit owner approval before pushing. As a result, the
  newly added GitHub Actions workflow has not yet run remotely.

## 4. Permanent Rules / Lessons

- The scanner covers mechanical signals only. Screenshot and layout judgement remains part of the
  checklist's human review.
- Baselines are keyed by file and pattern, so moving a file with existing hits requires a deliberate
  baseline update with a reason.

## 5. Things We Explicitly Decided NOT To Do

- Did not fix existing signal hits; issue #79 explicitly keeps fixes out of scope.
- Did not add dependencies or change `package-lock.json`.
- Did not build the site or run browser checks; no UI behavior was changed.
- Did not commit, push, or close issue #79.

## 6. Current Project State

- The scanner and baseline check pass locally.
- A temporary `backdrop-filter` probe in `app/globals.css` was detected with a `file:line` report
  and then removed. The file has no net change.
- A temporary lowered phrase baseline reported the expected non-quoted phrase at
  `lib/blog.ts:1210`; the quoted review occurrence at line 4520 was not reported. The baseline was
  restored.
- The worktree had unrelated concurrent edits during this task, including `lib/blog.ts` and plan
  files. They were not changed or reverted.
- Remote workflow status is unknown until an authorized push triggers GitHub Actions.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `scripts/check-design.mjs` | Added scanner and baseline update/check commands | Ratchet mechanical design signals |
| `scripts/check-design-baseline.json` | Added per-file baseline counts and reason | Preserve the starting point for the ratchet |
| `.github/workflows/check-design.yml` | Added push/PR workflow | Run only the scanner in CI |
| `package.json` | Added `check:design` script | Provide the repository check command |
| `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` | Replaced the temporary grep instruction; marked #79 row verified | Document the check and its status |
| `CLAUDE.md` | Added the scanner to Testing Workflow | Keep project operating instructions current |

## 8. Files Created

- `scripts/check-design.mjs`
- `scripts/check-design-baseline.json`
- `.github/workflows/check-design.yml`
- This handoff file.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `node --check scripts/check-design.mjs` — passed.
- `npm run check:design` — passed in approximately 2.4 seconds.
- Temporary `backdrop-filter` probe — expected failure with `app/globals.css:1943` and exit code 1;
  probe removed afterward.
- Missing baseline-update reason — expected failure with exit code 1.
- Temporary phrase baseline check — expected failure at `lib/blog.ts:1210`; the quoted review text
  did not appear as a hit. Baseline restored and final scanner check passed.
- `git diff --check` on the edited documentation and package manifest — passed.
- `package-lock.json` and `app/globals.css` have no net changes.
- No build, type check, browser test, or remote GitHub Actions run was performed.

## 11. Performance Impact

No runtime site code or dependencies were added. The scanner completed in approximately 2.4 seconds
locally. No Lighthouse or performance-budget measurement was needed.

## 12. SEO Impact

None. No pages, copy, metadata, schema, links, or indexation settings were changed.

## 13. Remaining Tasks

### High Priority

- After explicit owner approval to push, verify that the GitHub Actions workflow completes
  successfully. Do not push without that approval.

### Medium Priority

- Keep issue #79 open until its remaining CI evidence is available. Do not close it unless explicitly
  requested.

### Low Priority

None.

## 14. Open Questions

- Whether the owner authorizes a push so the workflow can receive its first remote run.

## 15. Next Session Handoff

- First inspect `git status --short` and preserve concurrent work.
- Run `npm run check:design` after any scanner or baseline changes.
- If an authorized push occurs, inspect the #79 workflow run and report its result.
- Do not alter the baseline without a reason, or edit the existing unrelated `lib/blog.ts` and plan
  changes unless separately requested.
- Do not close issue #79 without explicit owner instruction.

## 16. Potential Documentation Updates

No further permanent documentation update is proposed. The relevant checklist and testing workflow
were updated in this task.

## 17. Conversation-Derived Insights

- **Confirmed:** issue #79's expected checklist and project files were present in the current
  checkout, despite an earlier file lookup failing.
- **Confirmed:** a local positive and negative check were both exercised; the negative check reported
  an exact source location.
- **Unresolved:** GitHub Actions has not run because no push was authorized.
