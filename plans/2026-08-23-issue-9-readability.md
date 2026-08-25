# Plan — Issue #9: readability of every page ≥ Flesch 60

**Date:** 2026-08-23
**Task class:** Copywriting / content quality. Routed via `CLAUDE.md` → Task Routing:
`docs/CONTENT_QUALITY_CHECKLIST.md` §2 (readability is already a stated rule, not a new one).

## What issue #9 is

Owner-filed issue titled "make sure readablitity of each page is 60", body a screenshot of a
third-party SEO tool scoring `/packages/` at Flesch Reading Ease **51.4** ("Fairly Difficult"),
flagging "Word Complexity" red.

## Why this wasn't a rule change

`docs/CONTENT_QUALITY_CHECKLIST.md` §2 already states the target — **Flesch Reading Ease ≥ 60 on
body copy** — and already gives the correct fix technique: *"Word length is the lever, sentence
length usually is not."* Nothing enforced it, so it drifted. This issue is a bug report against an
existing rule, not a request for a new one.

## Method

1. Built `scripts/check-readability.mjs` (`npm run check:readability`) — standard Flesch Reading
   Ease (206.835 − 1.015×words/sentence − 84.6×syllables/word), scored only on the text inside
   `<main id="main">` (header/footer nav excluded — that isn't "body copy"). Every tag boundary is
   treated as a soft sentence break before stripping tags, so short elements (list items, headings)
   aren't run together into one artificially long sentence.
2. Ran it against a clean `npm run build` to get a baseline across all 18 content routes.
3. Read every page's source (all `app/**/page.tsx`, `lib/businessInfo.ts`, `lib/projects.ts`,
   `lib/reviews.ts`, and the shared `PageHero` / `ContactSection` / `WorkStrip` components) to know
   exactly what is editable copy vs. a locked fact (price, credential, testimonial, H1/keyword).
4. Fixed the pages below 60 by swapping long words for short ones per the checklist's own table and
   philosophy, and splitting a few long comma-spliced sentences at a natural clause boundary. Edited
   shared data (`services[].summary`, `principals[].detail`, `ContactSection`'s intro,
   `projects[].blurb`) where the same text feeds multiple pages, so one fix lifted several routes.
5. Rebuilt and re-ran the checker after every batch of edits until all 18 routes passed.
6. Verified: `npm run build` green (24 routes, unchanged), `npm run typecheck` clean, spot-checked
   the built HTML for the edited strings and for rendering artifacts (stray `undefined`, broken
   interpolation) — none found.

## A live-server complication (unrelated to the fix itself)

This repo currently has ~9 other agent sessions working the same working tree in parallel (visible
via `ListAgents`), most on other GitHub issues (#3, #4, #5, #7, #8 were all mid-flight or just
closed). A `next start` server held open for measurement got its served output silently corrupted
mid-check by a concurrent `next build` from another session — no crash, no error, just wrong content
(the homepage briefly measured 4,600 words instead of 700; several routes 404'd). This is exactly
the failure mode `CLAUDE.md`'s Testing Workflow warns about ("Never run two builds against the same
build directory at once... fail with misleading errors that look exactly like code faults").

**Fix:** `scripts/check-readability.mjs` reads prerendered HTML straight from
`.next/server/app/**.html` on disk by default instead of fetching a live server — a single file read
right after your own build, not a server process left sitting there for several more commands.
Documented in `PROJECT_CONTEXT.md` §6 item 18 so the next session doesn't lose time to the same
false lead. No server is needed to run the checker at all now; `npm run build` is sufficient.

## What was NOT touched

- **H1s, page titles, meta descriptions, keyword placement.** This was a readability pass, not an
  SEO or positioning change — `docs/SEO_CONTENT_GUIDE.md` governs those separately.
- **Every price, credential, licence number, warranty term, and testimonial** — all verbatim, per
  `docs/CONTENT_QUALITY_CHECKLIST.md` §6 and D-03.
- **The D-67-quoted sentence** on `/about-us/` ("both residential and commercial projects, though
  most of our work is family homes") — `DECISIONS.md` records this as the owner's own specific
  wording, not just a fact, so it was left exactly as written even though it contains a 5-syllable
  word ("residential").
- **Sentence fragmentation.** No sentence was chopped into a fragment to game the score — only
  genuine word-length swaps and splitting already-long comma-spliced sentences at a real clause
  boundary, per the checklist's explicit instruction not to do this.

## Checklist

- [x] Read `docs/CONTENT_QUALITY_CHECKLIST.md` §2 and confirmed the target (≥60) and technique
      (word length, not sentence length) were already specified
- [x] Built `scripts/check-readability.mjs`, added `npm run check:readability`
- [x] Baseline measured: 11/18 pages below 60
- [x] Read every page's source and every shared data file before editing anything
- [x] Edited only editable marketing/connective copy — no fact, price, credential or testimonial
      changed
- [x] Re-measured after each batch of edits; iterated until 18/18 pages ≥ 60
- [x] `npm run build` green, route count unchanged (24)
- [x] `npm run typecheck` clean
- [x] Spot-checked built HTML for the edited copy and for rendering artifacts
- [x] `DECISIONS.md` D-96/D-97 recorded
- [x] `PROJECT_CONTEXT.md` §6 updated (script location, verification command, concurrent-build gotcha)
- [x] Close GitHub issue #9 with this summary as a comment
