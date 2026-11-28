<!-- session-checkpoint:v1 -->
# Session handoff — batch "Recurring tasks — setup" (#121)

- **Repository / issue:** `fardintolo123/elite-touch-revonations` · tracker #121, members #116 #117 #120
- **Observed at:** 2026-11-28 10:40 +04:30 (Asia/Kabul)
- **Session:** DeepSeek Harness Web, root agent `lead`; separate DeepSeek session from the #112/#114 conversion batch running in parallel
- **Mode requested / performed:** implement the whole batch, plus a check of `CLAUDE.md`
- **Ownership:** released for review. Files owned: `docs/recurring-tasks.md`, `.github/ISSUE_TEMPLATE/recurring-*.md`,
  `.github/workflows/recurring-issues.yml`, `.github/workflows/health-checks.yml`, `scripts/recurring-cycle-issue.mjs`,
  `scripts/health-checks.mjs`, `scripts/check-instructions.mjs`, `docs/AGENT_TOOLING.md`, `session-history/`,
  `CLAUDE.md` (two lines), `AGENTS.md`, `.agents/workflows/sunrise.md`, `.agents/workflows/session-management.md`,
  `DECISIONS.md` (pointer repairs only)
- **GitHub state:** #116, #117, #120 open and labelled **Ready for review**; tracker #121 open
- **Code:** `a9d0277` → `a3403cf` (#116) → `1362d8f` (#117) → `3f8c8c1` (#120), all pushed to `main`
- **Publication:** on `main`. Both robots were dispatched for real (evidence below).

## What was done

1. **`CLAUDE.md` was past its instruction budget.** 65,688 bytes against a 65,536-byte cap, so the harness
   truncated the tail on load — the auto-generated **Next.js rules block** was never reaching any agent. Moved
   the skill inventory and per-tool lookup tables to `docs/AGENT_TOOLING.md`, added
   `npm run check:instructions` to measure both instruction files, and recorded the rule. Now 62,888 bytes
   with 2,648 bytes headroom; the file loads whole.
2. **#116** — `docs/recurring-tasks.md` (24-row runbook), two issue templates, `recurring-issues.yml`,
   `scripts/recurring-cycle-issue.mjs`. Dispatch proved: skip existing (#118/#119), create once (#122),
   create nothing on the second run.
3. **#117** — `scripts/health-checks.mjs` + `health-checks.yml`, five checks, failure-only issues, recovery
   comment. Healthy run silent (`46113159647`); forced-fail run opened #123–#127 (`46113216090`); repeat run
   commented on the same five and created nothing (`46113281726`); the five test alerts were closed as test
   evidence.
4. **#120** — 88 checkpoints folded and deleted, 12 remain. `session-history/README.md` added. Repaired 9
   `DECISIONS.md` rows + 2 doc links + a `lib/projects.ts` comment that pointed at records an **earlier**
   consolidation had already deleted.

## Decisions worth carrying forward

- **`auto` in the cycle robot reads the UTC date, not the cron string**, so a delayed scheduled run still
  opens the right cycle.
- **An open cycle issue counts as "missed" only once its own due date passed** (monthly: the 7th; quarterly:
  the 5th after the quarter ends). A dry run caught the first version wrongly flagging #118 while December
  was still inside its window.
- **A health run stays green when a check fails.** The open `health-alert` issue is the signal; a red workflow
  on top would duplicate it.
- **Forced-failure alerts say so in their body**, so a test can never be mistaken for a live incident.
- **`evidence/` (111.6 MB) was deliberately not pruned.** Irreversible, and not what the ≤20 rule counts.

## Verified, and what is still true

- `npm run check:instructions` green; `npx tsc --noEmit` green; `yaml.safe_load` on both workflows; the run
  scripts pass `bash -n`.
- Decision logic unit-checked: `plan()` (six scenarios) and `decide()` (five branches).
- **A real finding stands:** the rating snapshot (`verifiedAt: 2026-09-04`) is 85 days old, so the next weekly
  health run will open a genuine `[Health] Rating snapshot age failing`. #118 already owns refreshing it with
  the owner's live number, so no duplicate issue was created by hand.

## Next action

`sunrise #121` → members are ready for review; the owner reviews, then closes #116, #117 and #120. After all
three close, delete the `Batch: Recurring tasks — setup` milestone (CLAUDE.md's finished-batch rule).
