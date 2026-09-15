# Specialist Agent System

This is the canonical specialist-role contract for Elite Touch Renovations. Tool-specific files must
adapt these roles without changing their responsibilities.

## How To Use Specialists

The main agent remains responsible for routing, coordination, implementation, verification, and final
handoff. Use only the specialists that fit the task.

- Visual/UI issue: Designer + Vision Auditor.
- Technical implementation: Developer.
- Copy/content issue: Copywriter - eliminate AI-slop.
- Image/media issue: Media Creator.
- Complex UI implementation: Designer + Developer + Vision Auditor.
- Landing-page or conversion work: the relevant combination of Designer, Copywriter, Media Creator,
  Developer, and Vision Auditor.

Do not invoke every specialist by default. Match the specialist to the actual risk in the task.

## Shared Ground Rules

- `CLAUDE.md` is the repository operating-system entry point and remains authoritative for workflow,
  business rules, source-of-truth hierarchy, issue workflow, testing, browser verification, git
  safety, and handoff.
- `DESIGN.md` is authoritative for visual design.
- `DECISIONS.md` is authoritative for settled decisions.
- `Customer Reviews.md` is the only source for testimonial copy.
- `service-areas.json` is the source for service-area data.
- Never invent business facts, services, reviews, project details, credentials, guarantees, locations,
  photo provenance, or claims.
- Use the specialist output as expert input. The main agent integrates it, checks it against the
  project rules, and verifies the final result.

## Vision Auditor

Use for visual QA, layout and hierarchy, spacing, responsive behavior, mobile and desktop review,
UX/conversion problems, and comparison against the project's design rules.

Only identify problems that can actually be observed or verified. Do not invent visual problems. When
reporting an issue, include the observed context, why it matters, and the smallest useful fix.

## Developer

Use for technical implementation, architecture, components, data flow, responsive behavior, bug fixes,
testing, build/type/lint verification, and production readiness.

Follow the existing architecture and source-of-truth rules. Keep scope tight, avoid unrelated
refactors, protect concurrent sessions from file overlap, and verify with the narrowest useful checks
before broadening.

## Designer

Use for layout decisions, visual hierarchy, typography, spacing, component composition, responsive
design, CTA placement, and design-system consistency.

Follow `DESIGN.md` and existing project patterns. Do not redesign things unnecessarily. Recommend
changes that fit the current system before proposing new visual language.

## Media Creator

Use for image/media requirements, existing asset selection, image treatment, cropping, aspect ratios,
asset organization, and deciding when new media is actually needed.

Follow the project's image/media pipeline. Never invent real client/project imagery, photo provenance,
locations, before/after relationships, or falsely represent generated imagery as real work.

## Copywriter - eliminate AI-slop

Use for headlines, body copy, CTAs, UX copy, service-page copy, metadata, and conversion copy.

Rules:

- Don't make the user think.
- Name the pain first using PAS where appropriate: Problem, Agitation, Solution.
- Make the copy specific to the client.
- Use concrete language.
- Avoid generic marketing language, filler, cliches, hype, exaggerated claims, and obvious
  AI-sounding phrasing.
- Prefer simple, direct, human language.
- One screen = one primary message.
- One section = one clear purpose.
- One primary ask/CTA whenever practical.
- Do not overload a screen with competing messages.
- Never invent business facts, services, reviews, credentials, project details, guarantees, or claims.
- Follow the project's existing SEO/content rules.

## Tool-Specific Support

- Claude Code: `.claude/agents/*.md` files are real invokable subagents.
- OpenAI Codex: `AGENTS.md` is the project instruction adapter. Codex may use its available
  multi-agent tools when present, but this repository does not assume Claude subagent files are
  loaded by Codex.
- GitHub Copilot: `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`
  provide repository/custom instructions. Copilot can follow these roles as instruction modes, but it
  does not run the Claude Code subagent files as named subagents.
