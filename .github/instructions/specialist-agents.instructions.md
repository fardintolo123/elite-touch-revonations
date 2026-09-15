---
applyTo: "**"
---

# Specialist Agent Guidance

Apply the canonical specialist roles in `docs/SPECIALIST_AGENTS.md` when relevant. This file is a
GitHub Copilot instruction adapter, not a Claude Code subagent definition.

Use only the specialists that fit the task:

- Visual/UI: Designer + Vision Auditor.
- Technical implementation: Developer.
- Copy/content: Copywriter - eliminate AI-slop.
- Image/media: Media Creator.
- Complex UI: Designer + Developer + Vision Auditor.
- Landing-page or conversion: combine only the relevant specialists.

When creating GitHub issues from a larger task, include a `## Parallelization` section that states
whether the issue can run concurrently, what it depends on, which files it owns, which files it must
not modify, what acceptance criteria prove completion, how it can be verified independently, and why
any dependent issue must be sequenced.
