# Checkpoint — gallery index and project pages (D-182)

- **Task:** apply D-174 to the gallery index and the 11 project pages (owner: "Yes, those two", after the
  remaining-pages density audit in `.impeccable/critique/2026-11-04-remaining-pages-density-audit.md`).
- **Session / ref:** Claude Code, 2026-11-08. Worked in a detached git worktree at `257424a` (`D:\tmp\etr-gal`, built with
  `next build --webpack`); applied to `main` (HEAD `f009f68` at the time) as a patch, because other sessions had
  uncommitted edits in `app/globals.css`.
- **Done:** gallery hero (no pill, Book + Call + rating), two-across tiles with a two-line blurb; project hero (no pill,
  Book + rating), 2 x 2 facts row, ruled link rows, six tiles + closed `<details>` for the other four. Files:
  `app/gallery/page.tsx`, `app/gallery/[slug]/page.tsx`, `app/globals.css` (`.et-tiles`, `.et-tile-blurb`,
  `.et-link-rows`, `.et-facts-grid`).
- **Not done / not mine:** About reviews wall was already fixed by another session. Still open: 1440 gallery tile wall
  (orphan tile), tile titles repeat the suburb badge, 1440 gallery hero stacks Call under Book, The Rocks 5-line
  before-caption (an honesty note, leave the wording), and the rest of the audit (Contact, blog index and post
  template, homepage pink band, shared Book block).
- **Verification (source `257424a` + patch):** build green; served HTML sweep of all 12 gallery URLs (one H1, one preload,
  rating, Book, 10 project links, licence); `check:design` PASS; `check:readability` PASS on all 12 (`/blog/` 53.2 fails,
  unrelated); independent `vision-auditor` review, no P0/P1.
- **Blockers:** none. No GitHub issue was named, so nothing was synced; no push.
- **Next exact action:** `sunrise` then pick the next audit finding, for example the Contact page (rating below the fold,
  message said three times).
- **Lessons:** commit with `git apply --cached` then `git apply` when another session has uncommitted edits in the same
  shared file; scratchpad scripts vanish on session restart.
