# Session Summary

## 1. Session Objective
Update `CLAUDE.md` and the project's agent/instruction configuration so larger task breakdowns
produce parallel-safe GitHub issues, and so five consistent specialist roles are available as much as
each supported coding tool allows.

## 2. Work Completed
- Inspected the existing project instruction structure before editing.
- Confirmed `CLAUDE.md` was the only active project operating-system file.
- Confirmed `.claude/` existed but had no project subagents, only `scheduled_tasks.lock`.
- Confirmed no project `.codex/`, `.github/`, `.agents/`, `AGENTS.md`, Copilot instructions, or
  project `SKILL.md` files existed.
- Added `docs/SPECIALIST_AGENTS.md` as the canonical definition for five specialist roles.
- Added five Claude Code project subagents under `.claude/agents/`.
- Added `AGENTS.md` as the OpenAI Codex project instruction adapter.
- Added GitHub Copilot repository and modular instruction adapters under `.github/`.
- Updated `CLAUDE.md` with specialist routing and tool-specific support notes.
- Updated `CLAUDE.md` Issue Workflow so larger task breakdowns require file ownership, dependency
  analysis, acceptance criteria, verification scope, and explicit parallelization metadata.
- Created `plans/2026-09-15-specialist-agent-system.md` and kept its checklist current.

## 3. Important Decisions
- Decision: Keep the five specialist roles in one canonical file, `docs/SPECIALIST_AGENTS.md`.
  Reason: Claude Code, Codex, and Copilot do not all support the same subagent mechanism, so a shared
  contract prevents three independent versions drifting apart.
  Alternatives considered: Define each tool's roles separately. Rejected because the same role names
  could slowly diverge and create conflicting behavior.
- Decision: Use `.claude/agents/*.md` for Claude Code.
  Reason: Claude Code supports project subagent Markdown files with frontmatter, and no existing
  project subagents were present to reuse.
  Alternatives considered: Put all behavior only in `CLAUDE.md`. Rejected because the request asked
  for specialist roles to be available as real subagents where supported.
- Decision: Use root `AGENTS.md` as the Codex adapter.
  Reason: No project Codex config existed, and a root agent-instruction file is the closest
  repository-native adapter for Codex-style coding agents.
  Alternatives considered: Invent a `.codex/agents/` directory. Rejected because no existing local
  project convention showed that would be loaded.
- Decision: Use `.github/copilot-instructions.md` plus a broad `.github/instructions/*.instructions.md`
  file for Copilot.
  Reason: GitHub Copilot supports repository and path/modular custom instructions, but not Claude
  Code subagent files as invokable named subagents.
  Alternatives considered: Rely on `CLAUDE.md` alone. Rejected because the request explicitly asked
  for GitHub Copilot configuration where appropriate.

## 4. Permanent Rules / Lessons
- When breaking larger tasks into GitHub issues, actively analyze file overlap and dependencies
  before calling issues independent.
- Each issue created from a larger task should state whether it can run in parallel, what it depends
  on, which files it owns, which files it must not modify, acceptance criteria, and verification.
- Claude Code subagents, Codex instructions, and Copilot instructions are not interchangeable; use
  each tool's native mechanism and document limitations.
- The main agent remains responsible for coordinating specialists and verifying final output.

## 5. Things We Explicitly Decided NOT To Do
- Did not remove or weaken existing `CLAUDE.md` rules.
- Did not create a `.codex/agents/` folder because no native project convention was present.
- Did not treat Claude Code subagent files as automatically usable by Codex or Copilot.
- Did not change runtime application code, content pages, dependencies, or build configuration.

## 6. Current Project State
The repository now has one canonical specialist role contract plus tool-specific adapters. Claude Code
has five project subagent files. Codex has root `AGENTS.md` guidance. GitHub Copilot has repository
and modular instruction files. The application behavior is unchanged.

## 7. Files Changed
| File | Change | Reason |
|------|--------|--------|
| `CLAUDE.md` | Added Specialist Agents section and strengthened issue parallelization requirements | Make main-agent routing and parallel issue planning explicit |
| `plans/2026-09-15-specialist-agent-system.md` | Added and updated implementation checklist | Preserve the required task plan |

## 8. Files Created
- `docs/SPECIALIST_AGENTS.md` - canonical five-role specialist contract.
- `.claude/agents/vision-auditor.md` - Claude Code visual QA subagent.
- `.claude/agents/developer.md` - Claude Code implementation subagent.
- `.claude/agents/designer.md` - Claude Code design subagent.
- `.claude/agents/media-creator.md` - Claude Code media subagent.
- `.claude/agents/copywriter-eliminate-ai-slop.md` - Claude Code copy subagent.
- `AGENTS.md` - Codex project instruction adapter.
- `.github/copilot-instructions.md` - GitHub Copilot repository instructions.
- `.github/instructions/specialist-agents.instructions.md` - GitHub Copilot modular instruction adapter.
- `session-history/2026-09-15-specialist-agent-system.md` - this handoff.

## 9. Files Deleted
None.

## 10. Tests and Validation
- Ran `git diff --check`; it passed with only the existing Windows line-ending warning for
  `CLAUDE.md`.
- Verified all expected instruction files exist.
- Verified exactly five Claude Code subagent Markdown files exist.
- Verified each Claude subagent includes `name:`, `description:`, and `model:` frontmatter.
- Verified the five specialist role names appear in `CLAUDE.md`, `docs/SPECIALIST_AGENTS.md`,
  `AGENTS.md`, `.github/copilot-instructions.md`, and the Copilot modular instruction file.
- Verified the parallelization metadata terms appear in `CLAUDE.md`, `AGENTS.md`, and `.github/`.
- Re-read the touched `CLAUDE.md` sections to confirm the existing operating rules remained intact.
- No application build, type check, lint, browser, performance, or SEO validation was needed because
  no runtime code, route, content, asset, metadata, schema, or dependency changed.

## 11. Performance Impact
No performance impact. No application code, runtime dependency, route, asset, script, or rendering
behavior changed.

## 12. SEO Impact
No SEO impact. No public page copy, metadata, schema, sitemap, robots behavior, canonical URL, or
indexation behavior changed.

## 13. Remaining Tasks
### High Priority
None.

### Medium Priority
None.

### Low Priority
None.

## 14. Open Questions
None.

## 15. Next Session Handoff
Future sessions should read `CLAUDE.md` first, then `docs/SPECIALIST_AGENTS.md` when specialist
review is relevant. Use `.claude/agents/` for real Claude Code subagents, `AGENTS.md` for Codex
instruction adaptation, and `.github/` instructions for Copilot. When creating multiple GitHub
issues from a larger task, fill in the parallelization block with real paths, dependencies,
acceptance criteria, and verification steps.

## 16. Potential Documentation Updates
No further permanent documentation update is recommended. The new rules are already recorded in
`CLAUDE.md`, and the canonical specialist contract is in `docs/SPECIALIST_AGENTS.md`.

## 17. Conversation-Derived Insights
### Confirmed decisions
- The owner wants independent GitHub issues planned so separate coding-agent sessions can work safely
  in parallel.
- The owner wants five named specialist roles available across Claude Code, OpenAI Codex, and GitHub
  Copilot as consistently as each tool allows.

### Strong recommendations
- Keep specialist role changes in `docs/SPECIALIST_AGENTS.md` first, then update adapters only when
  the canonical contract changes.
- Do not let tool-specific adapter files accumulate different role definitions.

### Ideas/proposals
None.

### Unresolved opinions
None.
