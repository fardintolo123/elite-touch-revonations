# Session management

Repository: `fardintolo123/elite-touch-revonations`.

## How to use

Type `sunrise` to recover the queue, `sunrise #NUMBER` to recover one issue, and `sunset`
to save the current session. These are plain-language agent instructions, not installed shell commands.
If your tool does not load the repository instructions, tell it to read
[`sunrise.md`](sunrise.md) or [`sunset.md`](sunset.md). A slash-command integration is optional.

## Project rules

- Read [CLAUDE.md](../../CLAUDE.md) and applicable decisions before implementation.
- Create a branch only when the owner asks. Record the existing branch or detached HEAD truthfully;
  do not switch branches, create worktrees, pull, reset, stash or merge merely to run sunrise/sunset.
- Preserve existing approval requirements for pushes, deployments and destructive operations.
- Close an issue only when the owner requested closure or explicitly included it in the task. Otherwise report ready to close. Closure as completed requires every acceptance criterion and required verification to pass; owner-authorized cancellation is a separate outcome below.
- For changes limited to these instruction files, validate links, scoped diffs and resume behavior.
  Application build/browser/performance gates still apply when application behavior is affected.
- Owner-authorized cancellation, duplication or supersession is a separate outcome: record the
  instruction and closure reason (for example, not planned), and keep unperformed checks unverified.
  Do not describe cancelled work as a completed implementation or close it as completed.

## Durable records and evidence

GitHub issues and published repository files are the shared project record. Live owner instructions
remain highest priority. Record local changes as unpublished; verify actual code against its checkout
and revision, and live behavior against deployment evidence. An old handoff or index is a pointer,
not proof that the state is still current. Missing evidence means unknown, not not-started or complete.
Never copy secrets or customer data into a checkpoint or recovery bundle.

Keep confirmed decisions and rejections in the existing decision register. Use targeted code searches
first. Graphify/MemPalace are optional if available and current; an index must identify its source
revision and cannot override the actual source or a superseding decision.

Reuse one issue for the same deliverable across sessions. Check for an existing issue before creating
another. Track substantive deliverables, not every question, plan file or session checkpoint. Use one
current implementation owner per issue and coordinate shared files across issues. Claims in comments
are not atomic locks: re-read before editing, do not take over solely because a timestamp is old, and
preserve other sessions' work. Independent read-only review can run alongside implementation.

State the task mode: review, implement or verify. A prompt rewrite supports an authorized implementation;
it does not replace execution. Record what actually happened, separately from what was requested.
GitHub open/closed state, task progress, chat read state and agent running/idle/error state are distinct.

## Project learning

Read and maintain this repository's [tips and pattern records](project-knowledge.md) during work.
Keep advice, verified implementation and measured outcomes distinct.

## Compact checkpoint format

Use the same fields in the source issue's progress comment and the saved handoff. Start with
`<!-- session-checkpoint:v1 -->` so another agent can locate checkpoints. Keep it short; include only
applicable detail. Use repository-relative paths for files; a machine path is an additional local locator.

```md
<!-- session-checkpoint:v1 -->
# Session checkpoint
- Repository / issue: owner/repo #NUMBER (or no issue, with reason)
- Observed at: date/time and timezone
- Session: tool + session ID; exact chat title and link if available
- Mode requested / work performed: review | implement | verify; describe actual activity
- Ownership: active | released for handoff; named session; files owned and overlapping claims
- GitHub state / closure reason / work status: open or closed, with actual closure reason; unknown | not started | reviewed only | in progress | blocked | awaiting approval | complete | cancelled/superseded
- Code: actual ref or detached HEAD; full commit SHA; relevant local edits
- Publication: local-only | committed locally | pushed to ref/SHA | deployed ID/SHA; evidence
- Recovery: published ref or verified local bundle path; what is unavailable on another machine
- Completed / takeaways: concrete changes and decisions; link durable decisions/rejections
- Verification: result, command/record, code revision and evidence; required unavailable checks stay pending
- Remaining / blocker: exact unfinished criterion, missing access or resume date
- Next action: one concrete action, with file/command or evidence to inspect first
- Approval: action and recorded authorization, or approval still required
- GitHub sync: posted comment URL, no issue, or failed/offline with local checkpoint location
```

Save meaningful checkpoints to
`session-history/YYYY-MM-DD-HHMM-issue-N-short-session-id.md` (use `no-issue` when applicable).
Include time, timezone and a session suffix to avoid same-day collisions. Link the latest record from
the issue; never overwrite another session's record. Save at useful milestones, before long/rate-limited
operations and at handoff. No routine can promise a save after its process has already crashed or stopped.

A required check marked unavailable is unfinished. A successful push is not deployment evidence, and
deployment is not proof of the task's measured outcome. For completion, keep the issue open while required criteria or
required publication remain pending. Owner-authorized cancellation follows the separate outcome above. Reconcile previous completed/cancelled work by evidence; never
close another issue as a side effect of a queue snapshot.

Publish a concise checkpoint to the issue when the authorized task includes tracking. If GitHub is
unavailable, save locally and report sync failure; retry at the next connected sunrise. Local-only files,
patches and chat links cannot be assumed accessible from a second computer. Never publish unapproved
code to make a handoff portable. If changes cannot yet be shared, record the actual recovery location
and the approval needed to publish them.

Inventories are dated snapshots derived from live issue queries and inspected messages. State source,
query, retrieval scope, cursors/pagination and unavailable chat systems. A title/list summary alone does
not prove execution. Retain important evidence while consolidating old notes; update incoming links
before retiring a duplicate template. Use a fresh-context resume drill after changing this protocol.
