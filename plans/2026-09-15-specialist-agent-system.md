# 2026-09-15 Specialist Agent System

## Objective

Update the repository operating instructions so larger GitHub issue sets are planned for safe
parallel execution, and define five consistent specialist roles across Claude Code, OpenAI Codex,
and GitHub Copilot.

## Existing Configuration Found

- `CLAUDE.md` is the project operating-system entry point.
- `.claude/` exists but only contains `scheduled_tasks.lock`; there are no project subagents yet.
- No project `.codex/`, `.github/`, `.agents/`, `AGENTS.md`, `copilot-instructions.md`, or
  `*.instructions.md` files existed before this work.
- No project `SKILL.md` files were found.
- `session-history/2026-09-09-github-issue-autonomy-instructions.md` records the current autonomous
  GitHub issue workflow.

## Implementation Plan

- [x] Inspect existing project instructions and agent/configuration files.
- [x] Check decision/session history for existing agent, parallel-session, and issue-workflow rules.
- [x] Add a canonical specialist-role contract in `docs/`.
- [x] Update `CLAUDE.md` with specialist routing and parallel issue-planning requirements.
- [x] Create Claude Code subagent files in `.claude/agents/`.
- [x] Create Codex-compatible project instructions in `AGENTS.md`.
- [x] Create GitHub Copilot repository instructions in `.github/`.
- [x] Verify the changed instruction files for consistency, contradictions, and expected paths.
- [x] Write the session handoff file.

## Verification Plan

- Confirm the five specialist roles exist in the canonical contract, Claude subagent files, Codex
  adapter, and Copilot adapter.
- Confirm `CLAUDE.md` still preserves the existing autonomy, routing, source-of-truth, business,
  issue, testing, git, reporting, and Next.js rules.
- Confirm the parallelization block requires actual file ownership, dependencies, acceptance
  criteria, and non-concurrent sequencing for overlapping work.
- Use repository text search and `git diff --check` as documentation/config validation.
