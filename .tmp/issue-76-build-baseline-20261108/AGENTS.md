# Codex Project Instructions

This file is the OpenAI Codex adapter for the Elite Touch Renovations repository. The repository's
main operating system is `CLAUDE.md`; read it first and treat it as authoritative for workflow,
source-of-truth hierarchy, business rules, issue workflow, testing, browser verification, git safety,
reporting, and session handoff.

Also read `docs/SPECIALIST_AGENTS.md` when a task may benefit from specialist review.

For WebMCP work, use the project skill at `.claude/skills/webmcp/SKILL.md`. Claude Code and GitHub Copilot can discover the project skill from that location; Codex should read it when the task matches.

## Session continuity

Read `CLAUDE.md` and `.agents/workflows/session-management.md` for project rules. Treat `sunrise`
or `sunrise #NUMBER` as a request to follow `.agents/workflows/sunrise.md`; treat `sunset` as a
request to follow `.agents/workflows/sunset.md`. Preserve task mode, issue/session links, actual
code revision, verification, recovery and approval state. Create a branch only when the owner asks.
These words invoke project instructions; no native shell or slash command is implied.

Maintain `tips.md` and `winning-features.md` under
`.agents/workflows/project-knowledge.md`: capture sourced owner advice promptly, and update or retire
verified reusable patterns when they change. Preserve actual evidence and publication status.


## Skills

User-level skills live in `~/.agents/skills` and are invoked with `$name` or `/skills`. The full list,
grouped by use, and the rules for which to prefer are in `CLAUDE.md` under *Specialist Agents →
Skills*. For design work and the independent design critique use `impeccable`; for SEO audits use
`seo` and `seo-audit`. Skill output never overrides the Business Rules.

## Design Standard: Must Not Look AI-Generated

Before building or modifying any UI, define the business-specific visual direction: which real
project photo, verbatim review or verifiable fact leads, and which `DESIGN.md` recipe fits the
content. Avoid generic AI-default patterns unless one serves the content. Inspect the rendered page
at 390px and 1440px, have it critiqued by a reviewer that did not build it, and refine until it looks
deliberately designed for Elite Touch Renovations, not templated. Preserve authentic content,
conversion paths, SEO, accessibility and speed. Full standard, section test and evidence gate:
`docs/DISTINCTIVE_DESIGN_CHECKLIST.md` (DECISIONS.md D-158). `DESIGN.md` stays authoritative for
the design system itself.

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
