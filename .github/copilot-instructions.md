# GitHub Copilot Instructions

This repository is the Elite Touch Renovations Next.js 16 site. The authoritative project operating
system is `CLAUDE.md`; follow it for workflow, source-of-truth hierarchy, business rules, issue
workflow, testing, browser verification, git safety, reporting, and session handoff.

Use `docs/SPECIALIST_AGENTS.md` as the canonical specialist-role contract. GitHub Copilot cannot run
the Claude Code `.claude/agents/*.md` files as named subagents, so treat the roles as instruction
modes and apply only the relevant ones.

## Specialist Routing

- Visual/UI issue: use Designer + Vision Auditor guidance.
- Technical implementation: use Developer guidance.
- Copy/content issue: use Copywriter - eliminate AI-slop guidance.
- Image/media issue: use Media Creator guidance.
- Complex UI implementation: use Designer + Developer + Vision Auditor guidance.
- Landing-page or conversion work: combine only the relevant Designer, Copywriter, Media Creator,
  Developer, and Vision Auditor guidance.

Do not apply all five roles automatically. The main agent remains responsible for integrating the
work and verifying the final result.

## Parallel Issue Planning

When breaking larger work into GitHub issues, prefer independent issues that can safely be executed
in parallel by separate coding-agent sessions. Each issue must state scope, file ownership,
dependencies, acceptance criteria, and independent verification where practical.

Include a `## Parallelization` section in every issue created from a larger task:

- Can run in parallel: YES or NO.
- Depends on: `None` or specific issue numbers.
- Files owned: exact expected paths.
- Must not modify: exact paths owned by other in-progress or dependent issues when relevant.
- Acceptance criteria: concrete results that prove the issue is done.
- Verification: the narrowest useful independent checks.
- Reason: required when the issue cannot safely run in parallel.

If files overlap or one issue depends on another, sequence them instead of recommending concurrent
work.
