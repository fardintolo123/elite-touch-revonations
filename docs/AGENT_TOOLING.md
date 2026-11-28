# Agent tooling — skills and where each agent looks

Reference detail for [CLAUDE.md](../CLAUDE.md) → *Specialist Agents → Skills*. It lives here rather
than in the entry point because `CLAUDE.md` is capped by the agent instruction budget (see
`CLAUDE.md` → *Documentation Workflow*): anything past the cap is silently truncated when loaded, and
that had been dropping the Next.js rules block at the end of the file. `CLAUDE.md` keeps the defaults
and the pointer; the inventory and platform quirks stay here.

## Recommended by default

Design/UX → **`impeccable`** (run its `context` first; `PRODUCT.md` and `DESIGN.md` are at the repo
root) · SEO audits → **`seo`**, **`seo-audit`** · code review → **`code-review`** · run the app →
**`run`**.

## Full skill inventory

| Group | Skills | Use here for |
|---|---|---|
| Design | `impeccable` · `taste-design` · `emil-design-eng` · `ui-ux-pro-max` · `huashu-design` · `shadcn-ui` · `design-md` | Design work, critique, audit, polish. `impeccable` is the independent critique step |
| Browser / testing | `playwright-skill` · `webmcp` (project) | 390 + 1440 screenshots, form and flow checks, WebMCP tools |
| SEO | `seo` · `seo-audit` · `seo-technical` · `seo-local` · `seo-schema` · `seo-sitemap` · `seo-page` · `seo-content` · `seo-content-brief` · `seo-geo` · `seo-images` · `seo-image-gen` · `seo-plan` · `seo-cluster` · `seo-programmatic` · `seo-competitor-pages` · `seo-maps` · `seo-sxo` · `seo-backlinks` · `seo-google` · `seo-drift` · `seo-flow` · `seo-dataforseo` | Audits, schema, local SEO, clusters, GSC. `seo-programmatic` never overrides the Tier-1 suburb rule |
| Blog | `blog` · `blog-write` · `blog-rewrite` · `blog-analyze` · `blog-audit` · `blog-brief` · `blog-outline` · `blog-calendar` · `blog-cannibalization` · `blog-cluster` · `blog-decay` · `blog-discourse` · `blog-factcheck` · `blog-flow` · `blog-geo` · `blog-google` · `blog-image` · `blog-schema` · `blog-seo-check` · `blog-strategy` · `blog-taxonomy` · `blog-brand` · `blog-persona` · `blog-style` · `blog-repurpose` · `blog-chart` · `blog-audio` · `blog-notebooklm` | The 78 blog posts: write, audit, fact-check, schema |
| Stitch | `stitch-code-to-design` · `stitch-extract-design-md` · `stitch-generate-design` · `stitch-loop` · `stitch-manage-design-system` | Need a Google Stitch project; not used here |
| Not applicable | `seo-ecommerce` · `seo-hreflang` · `blog-translate` · `blog-localize` · `blog-multilingual` · `blog-locale-audit` | Single-language, non-shop site |
| Discovery | `find-skills` | Finding a skill that is not installed |
| Claude Code only | `code-review` · `simplify` · `security-review` · `run` · `loop` · `schedule` | Built into Claude Code, not portable |

## Where each agent looks (checked against the official docs, 2026-11-03)

| | Claude Code | OpenAI Codex | VS Code Copilot |
|---|---|---|---|
| Instructions | `CLAUDE.md` | `AGENTS.md` (32 KiB cap; `CLAUDE.md` only via `project_doc_fallback_filenames`) | `.github/copilot-instructions.md`, `AGENTS.md`, `.github/instructions/*.instructions.md`; `CLAUDE.md` if `chat.useClaudeMdFile` is on |
| User skills | `~/.claude/skills` | `~/.agents/skills` | `~/.copilot/skills`, `~/.claude/skills`, `~/.agents/skills` |
| Project skills | `.claude/skills` | `.agents/skills` only | `.github/skills`, `.claude/skills`, `.agents/skills` |
| Specialist agents | `.claude/agents` (native subagents) | none native; use `docs/SPECIALIST_AGENTS.md` as a role contract | `.github/agents`, `.claude/agents`; else the same role contract |

## Consequences and platform quirks

`AGENTS.md` and `.github/copilot-instructions.md` stay short adapters that point here. `webmcp` sits
in `.claude/skills`, so Codex does not discover it (its `AGENTS.md` names the path). The `blog-*`
skills live in `~/.claude/skills`; Windows junctions in `~/.agents/skills` (made 2026-11-03) expose
them to Codex, so a newly installed `blog-*` skill needs its own junction.

Tool support differs:

- **Claude Code:** project subagents live in `.claude/agents/` and can be invoked as real subagents.
- **OpenAI Codex:** use `AGENTS.md` as the project instruction adapter; do not assume Claude subagent
  files are loaded by Codex.
- **GitHub Copilot:** use `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`;
  Copilot can follow the specialist roles as instructions, not as Claude Code subagents.
