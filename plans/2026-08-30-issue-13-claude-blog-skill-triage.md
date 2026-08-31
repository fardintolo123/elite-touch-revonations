# Plan — Issue #13: "install ai blog writing and seo optimization skill [claude blog]"

**Date:** 2026-08-30
**Task class:** Tooling / process — not a website change. Routed via `CLAUDE.md` → Issue Workflow
(does this issue trace to a plan?) and → Task Routing "SEO / content strategy" +
`docs/SEO_CONTENT_GUIDE.md` §2–3 (does ETR need a blog at all?).

## What issue #13 is

Owner-filed issue. Title: *"install ai blog writing and seo optimization skill for claude code
[claude blog]"*. Body is one link: `https://github.com/AgriciDaniel/claude-blog`.

**Issue #14 ("install it")** is the same request with the install commands spelled out:

```
git clone --depth 1 https://github.com/AgriciDaniel/claude-blog.git
powershell -ExecutionPolicy Bypass -File claude-blog\install.ps1
```

Both issues name a **development tool** to add to the local Claude Code environment. Neither is a
change to the ETR website, and neither cites a `plans/` line.

## Read first

- `CLAUDE.md` → Issue Workflow ("an issue with no plan behind it is exactly how the sibling project
  lost track of *why* work was queued") and → Source-of-Truth Hierarchy (never invent a fact).
- `docs/SEO_CONTENT_GUIDE.md` §2 (publishing priority — a blog is nowhere on it), §3 (CREATE only on
  volume evidence; default IMPROVE), § Report intake.
- `DECISIONS.md` D-86, D-88, D-104, D-105, D-106, D-107 — the standing position on a blog.

## Findings

**1. The skill is already installed.** `C:\Users\Administrator\.claude\skills\` contains `blog` plus
31 `blog-*` sub-skills (`blog-write`, `blog-rewrite`, `blog-analyze`, `blog-schema`, `blog-geo`,
`blog-factcheck`, …). `blog/SKILL.md` frontmatter: `author: AgriciDaniel`, `version: "2.2.0"`,
`license: MIT` — this is the exact repo from issue #13, already cloned and installed (skill dirs
dated 2026-08-30). **As a tooling task, #13 and #14 are already done — there is nothing to install.**

**2. Installing the tool decides nothing about the site.** The repo's settled position is recorded
five times:
- **D-86 / D-88** — a general blog is a *candidate*, not a commitment; gated on real GKP/Ahrefs
  search-volume evidence.
- **D-104 / D-105** (issue #11) — the three "blog questions" folded into the already-planned cost
  guide; *"no standalone blog section is created."*
- **D-106 / D-107** (issue #12) — none of 10 AnswerThePublic clusters became a blog post;
  *"D-86/D-88/D-104/D-105 stand unchanged."*

There is **no `/blog` route** anywhere in `app/`, and **no `plans/` line** that calls for one.
Having an AI blog engine on the laptop does not change the D-86 gate. The tool sits upstream of a
content decision the owner has not made.

**3. The issue does not trace to the plan.** `CLAUDE.md`'s Issue Workflow requires every issue to
come from a `plans/` checklist line or a `DECISIONS.md` anchor. Issue #13 comes from neither — it is
an idea dropped in from an outside chat session, the same pattern as #14 (install steps), #15
(pasted `/seo-technical` prompt) and #16 (pasted ChatGPT HTML). Per the workflow this is exactly the
kind of issue that should be reconciled against the plan before any work starts.

**4. Risk profile — high, and specific to this repo.** This project's entire content history is a
fight against invented facts: fabricated testimonials, invented prices, thin location pages, an
AI-generated issue body that could not ship (issue #7, D-90). `blog-write` auto-generates full
articles with *"sourced statistics," "SVG charts,"* and *`FAQPage` schema*. Pointed at a trade site
with load-bearing **legal** claims — licence `475204C`, ABN `92 679 016 721`, the **10-year
workmanship warranty**, `AS 3740` — and only **19 real reviews**, it is the highest-fabrication-risk
tool that could be added here.
- It is not unusable — it ships `blog-factcheck` and `blog-analyze` sub-skills, and its SKILL.md
  is explicit about evidence-backed claims.
- But it must **never** write or edit ETR-facing copy unsupervised, and must **never** touch
  reviews, prices, credentials, project details or review schema (the standing Business Rules apply
  to tool output exactly as to hand-written copy).

**5. Minor security note.** The install path in #14 —
`powershell -ExecutionPolicy Bypass -File claude-blog\install.ps1` — runs a script from a personal
(non-Anthropic-marketplace) GitHub repo with execution policy bypassed. It has already been run.
The installed skill contents look like ordinary skill files (one `analyze_blog.py`, JSON data,
templates), but the install method was not vetted before it ran. Worth a quick look at what
`install.ps1` placed and where, if that record is wanted.

## Verdict

**As a tooling request:** already satisfied. Close #13 and #14 as *"already installed"* — or keep
one open only long enough to rename it to reflect reality.

**As a content-strategy signal:** **do not build a blog.** The engine may stay installed as an
*internal drafting aid only*. It changes nothing about the standing gate:

- Any blog post still requires **(a)** specific GKP/Ahrefs volume evidence for the target query and
  **(b)** explicit owner sign-off — the same bar as every page on this site (`SEO_CONTENT_GUIDE.md`
  §3, D-86/D-88).
- Default remains **IMPROVE an existing page over CREATE a new one** — which is how issues #11 and
  #12 were resolved.
- Any draft the tool produces goes through `docs/CONTENT_QUALITY_CHECKLIST.md` +
  `docs/SEO_AEO_GEO_CHECKLIST.md` and every Business Rule on facts before it ships — no exception
  for machine-generated copy.

**What would reopen "build a blog":** real volume + difficulty data for a cluster of related queries
with a credible line to an enquiry, that has no home on an existing service / suburb / cost page —
checked the same way every other content decision on this site has been.

## Checklist

- [x] Read the full body of issues #13 and #14
- [x] Confirmed the `blog` skill (AgriciDaniel, v2.2.0) + 31 sub-skills are already installed
- [x] Confirmed no `/blog` route in `app/` and no `plans/` line calling for a blog
- [x] Checked `DECISIONS.md` D-86/D-88/D-104/D-105/D-106/D-107 — blog is a candidate, not a commitment
- [x] Assessed fabrication risk against the standing Business Rules (legal claims, 19 real reviews)
- [ ] Verdict recorded in `DECISIONS.md` (next number **D-112** — DECISIONS.md currently has
      uncommitted D-111 from the issue #16 session; add D-112 once that lands to avoid a merge mess)
- [ ] Issues #13 and #14 closed (or #13 renamed) with a link to this plan
- [ ] Owner decision on point 5 (review what `install.ps1` did) — optional
