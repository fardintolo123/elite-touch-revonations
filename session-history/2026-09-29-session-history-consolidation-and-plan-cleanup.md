# Session Summary

## 1. Session Objective

Review the repository's accumulated `session-history/` handoffs, promote repeated and still-valid
lessons into the permanent operating documentation, correct stale guidance that could cause future
sessions to repeat mistakes, and remove obsolete files from `plans/` without deleting active work.

## 2. Work Completed

- Read `CLAUDE.md`, `docs/SPECIALIST_AGENTS.md`, 63 session handoffs, all 57 pre-existing plan files,
  the decision register, permanent guides, and the current route/data implementations.
- Added a source-of-truth rule that session handoffs and completed plans are historical evidence, not
  current project status.
- Added an active-only plan lifecycle: reconcile old checkboxes against code/decisions/issues, keep
  only actionable or genuinely blocked plans, and delete completed/superseded plans after durable
  knowledge and a handoff are recorded.
- Added shared-worktree safeguards: inspect status/log/diffs before and after work, re-check decision
  IDs immediately before writing, use exact pathspecs, and never assume an empty diff means work was
  lost.
- Added route-publication safeguards for `hubPublished`/`pagePublished`, canonical data helpers,
  navigation/static params/sitemap/schema alignment, and readability-route inventory maintenance.
- Strengthened verification guidance for shared renderers, desktop/mobile navigation, stale servers,
  task-specific ports, Playwright readiness, served HTML, structured data, and page-class sweeps.
- Promoted the image-preload, responsive `sizes`, PSI/CrUX, cache-header, report-intake, metadata,
  schema-graph, data-driven navigation, blog-field, and narrow-client-boundary lessons into their
  correct permanent docs.
- Corrected stale permanent statements about published hubs/suburbs, project counts, analytics
  deployment, client components, navigation behavior, image inventory status, and fixed-port use.
- Removed all 56 dated plan files that existed at the baseline. Retained
  `plans/seo-quarterly-review.md` because it is a recurring operational checklist.
- Repointed permanent references from deleted plans to the matching session handoff where one exists;
  where the decision row itself is the complete record, removed the obsolete plan reference.
- Updated stale comments in `components/layout/SiteHeader.tsx`, `lib/projects.ts`, and
  `lib/businessInfo.ts` so code-level guidance agrees with the permanent documentation.

## 3. Important Decisions

### Decision: `plans/` is an active queue, not a historical archive

- **Reason:** completed plans with unchecked boxes repeatedly looked like current work even after
  later sessions completed, superseded, or deliberately deferred them.
- **Alternative considered:** retain every plan as an audit trail.
- **Why this approach was preferred:** `DECISIONS.md`, git history, and `session-history/` already
  preserve the audit trail; keeping stale plans in the active queue made status less reliable.

### Decision: retain the quarterly SEO checklist

- **Reason:** it is recurring work rather than a completed one-off implementation plan.
- **Alternative considered:** delete every file in `plans/`.
- **Why this approach was preferred:** the checklist is linked from the SEO ship gate and remains
  actionable on a cadence.

### Decision: preserve concurrent-session work

- **Reason:** another session created and completed a GSC project/service intent task while this
  cleanup was running.
- **Alternative considered:** delete every newly observed dated plan as part of the bulk cleanup.
- **Why this approach was preferred:** the new plan was active and outside this task. It was left
  untouched; that session later removed its own plan and wrote
  `session-history/2026-09-29-gsc-project-service-intent.md`.

## 4. Permanent Rules / Lessons

- Session handoffs and old plans are discovery aids, never proof of current status.
- Counts and status statements rot quickly; prefer canonical data helpers and generated output.
- An unchecked box in an old plan is not evidence that work remains.
- `plans/` contains only current work or reusable recurring checklists.
- A route field, Tier-1 label, or URL does not publish a page; publication flags must agree across
  static params, navigation/internal links, sitemap and schema.
- Shared renderer/data changes require representative visual checks plus a sweep of every affected
  generated route.
- A passing readability count is valid only if the route inventory covers all published
  customer-facing pages.
- Use an unused task-specific port and record the PID; do not assume port 3210 belongs to this repo or
  kill an unknown process.
- Against `next dev`, Playwright should wait for `load`, not `networkidle`.
- In Next 16, `loading="eager"` can still create an image preload. Non-LCP images omit both eager
  loading and priority; responsive `sizes` must include the layout's max-width cap.
- The desktop nav uses hover/focus plus click dismissal in a narrow client boundary; mobile uses
  native server-rendered disclosures. Generated links come from canonical data.
- Current schema uses one connected `@graph` through the shared builder; visible FAQ data and schema
  must share one source.
- Third-party reports must be checked for current live facts, comparable competitors, internal
  contradictions, and real metrics. Locked or placeholder values are no evidence.

## 5. Things We Explicitly Decided NOT To Do

- Did not delete `plans/seo-quarterly-review.md`.
- Did not delete or modify the other session's active GSC plan while it was in progress.
- Did not rewrite historical handoffs merely because they mention plan files that existed at the
  time; historical records remain historical.
- Did not run a production build for a documentation/comment-only cleanup, especially while another
  session was actively building and changing the shared worktree.
- Did not commit or push. An external/ambient process committed and pushed part of the shared
  worktree under generic commit `1045da5` while this task was running; this session did not issue a
  commit or push command.

## 6. Current Project State

- Permanent operating guidance now reflects the current data-driven route, navigation, metadata,
  schema, performance and client-boundary architecture.
- All baseline dated plans are removed; the recurring quarterly SEO checklist remains.
- The permanent docs and code comments no longer link to the deleted dated plans.
- The concurrent GSC project/service intent work has its own handoff and plan cleanup; it was not
  incorporated into this task's scope.
- The shared worktree still demonstrates an ambient auto-commit/auto-push behavior with generic `1`
  commit messages. This remains an operational risk even though the new rules reduce accidental
  overlap.

## 7. Files Changed

| File | Change | Reason |
|---|---|---|
| `CLAUDE.md` | Added historical-source handling, plan lifecycle, publication/data alignment, shared-worktree, verification and documentation rules | Prevent repeated workflow and status mistakes |
| `PROJECT_CONTEXT.md` | Corrected stale site state and documented current metadata/schema/navigation/client/port mechanics | Keep the implementation guide aligned with code |
| `DESIGN.md` | Replaced stale full-screen-sheet nav guidance with the current desktop hover/focus and mobile native-disclosure contract | Prevent navigation regressions |
| `docs/PERFORMANCE_BUDGET.md` | Added image preload/`sizes`, port, Playwright, PSI/CrUX and cache interpretation rules | Preserve measured performance lessons |
| `docs/SEO_AEO_GEO_CHECKLIST.md` | Added shared graph, publication-flag, route-sweep and QA-inventory gates | Make generated-page verification complete |
| `docs/SEO_CONTENT_GUIDE.md` | Corrected current content priorities and strengthened report intake | Avoid duplicate pages and low-evidence SEO work |
| `DECISIONS.md` | Replaced deleted-plan references with handoffs or retained-decision wording | Prevent broken permanent references |
| `docs/IMAGE_INVENTORY.md` | Corrected obsolete asset/site status and linked the project-photo handoff | Prevent false image blockers and attribution mistakes |
| `components/layout/SiteHeader.tsx` | Corrected architecture comments | Match the current native mobile/client-leaf implementation |
| `lib/projects.ts` | Repointed the deleted intake-plan comment to its handoff | Preserve provenance traceability |
| `lib/businessInfo.ts` | Removed a deleted-plan wildcard reference | Avoid a dead code comment reference |

## 8. Files Created

- `session-history/2026-09-29-session-history-consolidation-and-plan-cleanup.md` — this handoff.

## 9. Files Deleted

- All 56 dated plan files that existed in `plans/` before this task, covering the 2026-08-17 through
  2026-09-27 implementation/audit history.
- `plans/seo-quarterly-review.md` was deliberately retained.
- The temporary cleanup plan was removed after this handoff was written.

## 10. Tests and Validation

- Permanent Markdown local-link check: passed.
- Search for deleted `plans/2026-*` references outside `session-history/`: zero results.
- Stale-status phrase scan across permanent operating docs: no remaining matches for the targeted
  obsolete hub/project/client/deployment statements.
- `git diff --check`: passed; only line-ending conversion warnings were reported.
- Plan inventory check: only the quarterly recurring checklist remained after temporary-plan cleanup.
- No application build was run because the changes were documentation and comments only, and a
  concurrent session was actively modifying/building the same worktree.

## 11. Performance Impact

No runtime code, dependency, asset, client boundary or request path was added by this cleanup. The
performance guidance was strengthened, but no performance measurement was required for the changes.

## 12. SEO Impact

No customer-facing SEO content, URL, metadata or schema output was changed by this cleanup. The SEO
workflow is safer: publication gates, current route inventories, existing-intent checks and report
triage are now explicit permanent requirements.

## 13. Remaining Tasks

### High Priority

None for this cleanup.

### Medium Priority

- Investigate or disable the ambient process that commits and pushes the whole shared worktree under
  generic `1` messages. It can mix unrelated sessions and bypass the repository's explicit push rule.

### Low Priority

- Continue using `plans/seo-quarterly-review.md` on its intended cadence.

## 14. Open Questions

- Is the ambient auto-commit/auto-push process intentional? This task did not alter or disable it.

## 15. Next Session Handoff

- Read `CLAUDE.md` first; the new plan lifecycle and shared-worktree rules are authoritative.
- Treat `plans/` as the active queue. At handoff time, only the recurring quarterly checklist should
  remain unless a new task is genuinely in progress.
- Before any edit, check `git status --short` and recent `git log`; another session may have changed,
  committed or pushed the same files.
- Do not restore deleted plans for history. Use `DECISIONS.md`, `session-history/`, and git history.
- If investigating the ambient commit process, do so as a separate owner-approved repository/tooling
  task; do not rewrite existing history or revert unrelated concurrent work.

## 16. Potential Documentation Updates

None. The durable lessons identified in this consolidation were moved into their permanent homes
during the task.

## 17. Conversation-Derived Insights

### Confirmed decisions

- The owner asked to update permanent rules from session history and delete unnecessary plans.
- Completed/superseded dated plans are unnecessary once durable outcomes and handoffs exist.
- The quarterly SEO checklist remains useful and should stay.

### Strong recommendations

- Stop or reconfigure the ambient all-tree auto-commit/push process.
- Keep future plan cleanup part of normal task completion rather than a periodic large purge.

### Ideas/proposals

- A small CI check could fail when a deleted plan is still referenced by permanent docs or when the
  readability route inventory omits a published route.

### Unresolved opinions

- Whether historical handoffs should eventually replace plain-text mentions of deleted plan paths
  with non-link wording. They are intentionally unchanged now because they describe the state at the
  time and are not current guidance.
