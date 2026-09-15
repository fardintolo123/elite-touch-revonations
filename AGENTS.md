# Codex Project Instructions

This file is the OpenAI Codex adapter for the Elite Touch Renovations repository. The repository's
main operating system is `CLAUDE.md`; read it first and treat it as authoritative for workflow,
source-of-truth hierarchy, business rules, issue workflow, testing, browser verification, git safety,
reporting, and session handoff.

Also read `docs/SPECIALIST_AGENTS.md` when a task may benefit from specialist review.

## Specialist Roles

Use the same five specialist roles defined in `docs/SPECIALIST_AGENTS.md`:

- Vision Auditor: observable visual QA, layout, hierarchy, spacing, responsive behavior, UX and
  conversion problems.
- Developer: implementation, architecture, components, data flow, bug fixes, testing, build/type/lint
  verification, and production readiness.
- Designer: layout, visual hierarchy, typography, spacing, component composition, responsive design,
  CTA placement, and `DESIGN.md` consistency.
- Media Creator: image/media requirements, asset selection, treatment, cropping, aspect ratios,
  organization, and deciding when new media is needed.
- Copywriter - eliminate AI-slop: headlines, body copy, CTAs, UX copy, service-page copy, metadata,
  conversion copy, and removing generic AI-sounding language.

Codex should delegate to available multi-agent tools when that would improve quality or save time,
but the main Codex agent remains responsible for coordination, integration, verification, and final
handoff. Do not assume `.claude/agents/*.md` files are native Codex subagents.

## Parallel Issue Planning

When breaking larger work into GitHub issues, prefer independent issues that can safely be executed
in separate coding-agent sessions. Analyze file overlap, data dependencies, and verification needs
before calling work parallel.

Every issue created from a larger task must include a `## Parallelization` section with:

- Can run in parallel: YES or NO.
- Depends on: `None` or specific issue numbers.
- Files owned: exact expected paths.
- Must not modify: exact paths owned by other in-progress or dependent issues when relevant.
- Acceptance criteria: concrete results that prove the issue is done.
- Verification: the narrowest useful independent checks.
- Reason: required when the issue cannot safely run in parallel.

If two issues share files or depend on each other, mark the dependency, identify which issue must land
first, and do not recommend concurrent execution.
