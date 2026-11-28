# session-history — how this folder is kept

Detailed handoffs and checkpoints from agent sessions. They are **historical evidence, not current
status**: verify every route, count, flag and file claim against the code before acting on one.

## The rule

Keep **20 checkpoint files or fewer**. `evidence/` is archived proof and does not count towards that
number. Past the limit, every `sunrise` pays to read records that no longer describe the code, and
stale claims survive longer than they should. Above it: fold what is still true into the permanent
docs — `CLAUDE.md`, `DECISIONS.md`, `PROJECT_CONTEXT.md`, or the relevant `docs/` guide — then delete
the record. Consolidate by pattern, not by copying every incident.

Keep, whatever their age:

- the latest resume record for each **open** issue;
- any record a permanent document cites as the source of its detail;
- `evidence/` folders that an issue cites;
- anything another session has not published yet — uncommitted local recovery material is not yours
  to remove.

## What the 2026-11-28 consolidation (#120) did

88 checkpoints dated before 2026-11-21 were folded and deleted. Almost every one was a status report
whose durable content had already landed in a `DECISIONS.md` row or a `CLAUDE.md` rule — each record
named the decision it produced, and those rows already carry the verdict. The one lesson that was
missing went into `.agents/workflows/session-management.md` (partial commits when another session
holds uncommitted hunks in the same file). Nothing else needed promoting: the repeated lessons were
already rules.

Deleted records are recoverable from git history:

```sh
git log --diff-filter=D --name-only -- 'session-history/*.md'
git show <commit>^:'session-history/<file>.md'
```

Several `DECISIONS.md` and `docs/` rows pointed at August and September records that an **earlier**
consolidation had already removed — the pointers had outlived their targets. They now say
"consolidated" instead of naming a file that is not there. If you consolidate again, `git grep
"session-history/"` first and repair every link in the same change.

## Naming

`YYYY-MM-DD-HHMM-issue-N-short-id.md`, per [session-management.md](../.agents/workflows/session-management.md).
Use `no-issue` when there is no issue. Start substantive handoffs with `<!-- session-checkpoint:v1 -->`
so another agent can find them.
