# Plan — blog index readability + answer-first coverage (2026-11-04)

**Outcome owned:** `/blog/` passes the Flesch gate for the right reason, the gate itself measures what
`docs/CONTENT_QUALITY_CHECKLIST.md` §2 says it measures, and the guides answer in their first two
sentences more often than 9 times in 80.

**Status (2026-11-05):** R1 and R2 were implemented by a concurrent session and are sitting
uncommitted in this tree — they are **not** queued work and must not be issued. Only **R3** remains.

---

## Where this came from

The 2026-11-02 audit against the owner's two Neil Patel lists
([docs/AI_VISIBILITY_SIGNALS.md](../docs/AI_VISIBILITY_SIGNALS.md), D-168) left signal 1 —
*"answer in the first two sentences"* — marked **partial**, and reported `/blog/` failing
`npm run check:readability`. D-179 has since closed the content gaps from that audit (the lifespan
and repair-or-replace guides), so those are **not** re-opened here.

## What was measured, 2026-11-04

Fresh production build, 121 pages. `npm run check:readability` → **114/115**, the single failure
being `/blog/` at **53.2**. Attributing that score by block, from `.next/server/app/blog.html`:

| Scored group | Blocks | Words | Flesch |
|---|---:|---:|---:|
| Everything the checker scored | 102 | 3041 | **53.2** |
| The 80 guide cards (`<li>`) | 80 | 2807 | 48.9 |
| …their `<h3>` title text alone | 80 | 741 | 53.7 |
| …their "N min read" label alone | 80 | 240 | 119.2 |
| …their description paragraph alone | 80 | 1826 | **52.2** |
| Everything that is not a card | 22 | 234 | 78.3 |

Two separate problems: the checker was scoring heading text and a UI label as prose, **and** the
description copy was genuinely dense at 19 words per sentence.

⚠️ Lesson worth keeping: a first attempt at simulating the checker fix skipped container `<li>`s and
silently discarded all 1826 words of real description prose, flattering `/blog/` to 78.3. Any change
here must be checked against the scored **word count**, not just the resulting score.

## Checklist

- [x] **R1** — `scripts/check-readability.mjs`: stop scoring heading and UI-label text as prose.
      **Done by a concurrent session, uncommitted as at 2026-11-05.** It strips `<h1>`–`<h6>` and any
      paragraph matching `N min read` before blocks are selected, keeping the description paragraph
      inside its `<li>`. No issue — already implemented.
- [x] **R2** — `lib/blog.ts`: rewrite the dense guide descriptions. **Done by the same concurrent
      session, uncommitted.** All 80 `description` strings rewritten shorter and plainer (e.g.
      *"See how room size, layout changes, tile coverage, fittings and site conditions can change a
      bathroom renovation quote in Sydney."* → *"Room size, layout, tiles, fittings and site
      conditions all shape a Sydney bathroom quote."*). No issue — already implemented.
- [ ] **R3** — `lib/blog.ts`: extend the quick-answer block beyond 9 of 80 guides → **issue #91**
      (blocked until the uncommitted R2 work in `lib/blog.ts` is committed)

## Sequencing

R1 and R2 are in the working tree and need committing by whoever owns that session, not re-doing.
R3 edits `lib/blog.ts`, the same file R2 is mid-edit on, so **R3 cannot start until that work is
committed**. Issue #77 separately owns the blog template files (`app/blog/page.tsx`,
`app/blog/blog.module.css`, `app/blog/[slug]/page.tsx`); R3 must not touch them.

```
R1 (scripts/)  ── done, uncommitted ─┐
R2 (lib/blog.ts) ── done, uncommitted ─┴─► R3 (lib/blog.ts)
#77 (app/blog/**) runs independently
```

## Out of scope

- The content gaps from the 2026-11-02 audit — closed by D-179.
- The readability route inventory — verified current on 2026-11-04 (115 entries, 0 built routes
  missing). The standing CLAUDE.md warning still applies to future route additions.
- A dedicated `/reviews/` page — declined in D-179; it needs real dated reviews from the owner.
- Off-site signals 16–23 and 25, and signals 4, 5, 11, 12 — owner-side, recorded in the audit doc.

## Parallelization

- Can run in parallel: YES (tracker only; owns no code)
- Depends on: None
- Files owned:
  - plans/blog-readability-and-answers-2026-11.md (new)
- Must not modify:
  - scripts/check-readability.mjs, lib/blog.ts, app/blog/** (owned by the concurrent session, R3 and #77)
- Acceptance criteria:
  - The plan exists and the R3 issue links back to its checklist line above.
- Verification:
  - `git log -- plans/blog-readability-and-answers-2026-11.md`, and the issue references R3.
