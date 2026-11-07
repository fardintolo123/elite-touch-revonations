# Sunrise — recover a project or issue

Read the relevant tips/pattern entries and follow [project knowledge maintenance](project-knowledge.md).

Follow [session-management.md](session-management.md) and the repository operating rules.

1. **Locate and inspect.** Confirm repository identity with `git remote get-url origin` and
   `git rev-parse --show-toplevel`. Read the project entrypoints. Record `git branch --show-current`,
   `git rev-parse HEAD` and `git status --short`; a blank branch can mean detached HEAD. Do not alter
   Git state. Identify existing edits and shared-file claims before planning new edits.
2. **Recover the requested scope.** State review/implement/verify mode and the supplied issue. With
   no selected issue, restore the open queue and suggest the next available action within the owner's
   existing task scope. Do not silently start an unrelated backlog item. Reuse the current deliverable's
   issue across sessions; create a new issue only for a real unmatched deliverable when authorized.
3. **Read live records.** Query `repo:OWNER/REPO is:issue is:open` using the connected GitHub tools or
   `gh issue list --repo OWNER/REPO --state open --limit 100`. Exhaust pagination or explicitly state
   the cutoff; if the result hits the limit, use further pages before calling it complete. Read the
   selected issue's full body, comments, dependencies, acceptance criteria and latest checkpoint.
   Fetch an explicitly selected issue even if it is closed or absent from the open queue; record its
   actual closure reason. Closed as not planned does not mean implemented, and absence is not unstarted.
   Read applicable decisions including superseding entries and the linked handoff. Confirm relevant
   published and local revisions; do not automatically pull or merge.
4. **Recover session evidence.** If chat tools exist, list relevant recent/archived sessions and read
   the actual messages for candidate matches. Check issue references in messages, not only titles.
   Record tool/session ID and exact title; do not invent a universal chat URL. If chats are inaccessible,
   use the issue and published handoff, marking that limitation. No chat match is not proof of no work.
5. **Reconcile.** Check claimed changes with scoped diffs, commits and verification records as needed.
   Distinguish reviewed-only from implementation, local from published/deployed, and reported evidence
   from independently checked results. Required missing checks remain pending. Do not guess ownership
   from a chat being idle, unloaded or in error. Resolve conflicting active writers before edits.
6. **Report a short recovery table.** Show issue, GitHub state, actual progress, session/owner, code
   locator/publication, blocker and next action. Include observation time and uncertainty. Date-gated
   or owner-blocked issues stay visibly waiting. Update a dated inventory when useful, not a second
   manually maintained task authority.
7. **Continue within authorization.** When implementation/verification is already requested, record
   this session's claim and file scope on the source issue, re-check for competing claims, and proceed.
   For recovery/review alone, report the next action without claiming execution. Keep a checkpoint
   before substantial work. Follow the project approval boundary for any later external mutation.

If GitHub or the required checkout cannot be reached, report the exact missing source and the local
recovery record available; do not substitute an old snapshot as current state.
