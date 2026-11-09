# Sunset — checkpoint and hand off

Read the relevant tips/pattern entries and follow [project knowledge maintenance](project-knowledge.md).

Follow [session-management.md](session-management.md), including its compact checkpoint format.
A sunset can finish a session with an open, blocked or approval-pending issue.

1. Re-read current issue/comments, ownership, `git status --short`, actual ref and `git rev-parse HEAD`.
   Inspect relevant diffs and recent commits so another session's work is not attributed to this one.
2. Record what this session actually reviewed/implemented/verified; link decisions and rejected
   approaches in the existing register. Include only useful takeaways and exact remaining criteria.
3. Record verification with the source revision. Separate code changes, local commits, remote pushes,
   deployments and observed outcomes. Do not check off a required unavailable test or close an issue
   as completed with unmet criteria. Record owner-authorized cancellation with its actual closure
   reason and leave unperformed checks unverified. A task can still await publication or review.
4. Save the compact checkpoint at a unique repository-relative path in `session-history/`. Name the
   task/issue, session, code locator, blockers/resume date and one exact next action. Skip an empty
   checkpoint only for a trivial exchange with no durable change, discovery or unfinished task.
5. Preserve recoverability of your unpublished changes. Where safe, save a scoped patch/bundle and
   verify its existence/content; identify any untracked/binary files it excludes and store the required
   files separately. Compare with the session-start snapshot so unrelated existing edits are not
   included. Do not automatically stash, commit other sessions' changes, create branches or deploy.
   **Push to `main` is automatic when the build is green and the task is verified** (per CLAUDE.md
   Zero-Interruption Issue Mode) — no owner approval needed for that specific action. Before pushing,
   ensure scratch/temp files (e.g. `.tmp/`, build artifacts, generated files) are in `.gitignore` and
   untracked from the index; fix that autonomously rather than stopping to ask. If a bundle cannot
   safely be made, document its absence and the exact checkout needed.
6. Post the concise progress checkpoint to the source issue when tracking is authorized, update
   acceptance items supported by evidence, and link the handoff and recovery state. Capture the
   returned comment URL in the local checkpoint. If offline, save the pending update locally and say
   it was not synced. A local-only handoff is not available from GitHub on another machine.
7. Apply the project's issue-closure policy. Release this session's implementation claim on a final
   handoff; keep it active for an intermediate milestone if work continues. Never release or close
   another session's work. Keep named blockers and dates on incomplete issues.
8. Confirm the checkpoint exists and report completed work, actual code/publication state, remaining
   blocker, GitHub sync result and the exact next action. Include the command/prompt needed to resume:
   `sunrise #NUMBER` (or read the issue's latest checkpoint in another agent).

No transcription of the full conversation, fixed review-loop count or mandatory memory service is
required. Keep useful code/decision references and preserve unique evidence when retiring old plans.
