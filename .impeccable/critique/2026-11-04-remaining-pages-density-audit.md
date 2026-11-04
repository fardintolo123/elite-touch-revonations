# Density and hierarchy audit — homepage below the hero, packages, gallery, project pages, About, Contact, blog

Date: 2026-11-04. Rule applied: DECISIONS.md D-174 to D-178. Audit only: nothing on these pages was changed.
Measured on a production build (port 3345, Playwright, 390 and 1440, reduced motion). Reviewer: `vision-auditor`
subagent, which did not build the pages. Grey image cards in the full-page captures are lazy images that had not
loaded; they are not defects.

## Measurements

| Page | Words | Height 1440 / 390 | Hero words |
|---|---|---|---|
| Homepage | 1,218 | 9,436 / 13,407 px | 65 |
| `/packages/` | 1,230 | 7,183 / 10,146 px | 92 |
| `/gallery/` | 788 | 6,233 / 10,566 px | 35 |
| Project page (Castle Hill) | 428 | 6,478 px at 1440 | 47 |
| Project page (The Rocks) | 473 | 5,639 px at 1440 | 105 |
| `/about-us/` | 1,666 | 10,294 / 14,972 px | 45 |
| `/contact-us/` | 290 | 2,171 / 3,709 px | 54 |
| `/blog/` | 3,072 | 10,897 / 20,796 px | 51 |
| Blog post | 908 | 4,438 / 6,545 px | 55 |

## Findings, ranked (no P0; tap-to-call exists on every page)

1. **P1 — Copy that reads like internal notes is live on project pages.** Castle Hill and Randwick say "The
   source notes describe this as…" (`lib/projects.ts` lines 163 and 284, confirmed in the served HTML). Every
   project page says "This gallery page shows one real project in {suburb}…" (`app/gallery/[slug]/page.tsx`
   line 299). The Rocks heading reads "How the The Rocks bathroom renovation came together" (line 231). "Completed
   by 2026" is shown where only the year is recorded. Fix with copy edits only; check the year wording with the owner.
2. **P1 — Packages hero buries the three prices** in a 92-word paragraph with no Book button or rating on the
   highest-intent page. Reuse the `AnswerBlock` price strip, add Book + Call and the inline rating, merge the two
   deposit lines.
3. **P1 — Packages comparison table shows only the Basic column at 390.** Below about 640px use three stacked tier
   cards with the fittings in a native `<details>`; keep the table on desktop.
4. **P1 — The packages cost answer is told four times** (hero, "How much", "Is $30,000 the minimum", FAQ; two
   sections are 359 words). Keep one visible answer; move the rest into the FAQ or a `<details>`, never delete.
5. **P1 — Project pages: filler and no proof.** "More project photos" is 10 near-identical cards (3,738 px at 390
   for 26 words); licence, warranty and AS 3740 appear three times in one scroll; no rating or Book button until the
   last 1,297 px; The Rocks stacks two photos so the H1 is in the second screen at 390.
6. **P1 — About: the 19 reviews are one 1,022-word wall** (61% of the page, 3,638 px at 1440). Keep all 19
   verbatim: show three as large quotes chosen from the evidenced themes (communication, punctuality,
   cleanliness) and put the other 16 in a native `<details>`.
7. **P1 — Homepage: the pink "three questions we put in writing" band repeats the FAQ and the process section.**
   About 102 words and 881 px at 390. Remove the band, trim the dark checklist.
8. **P1 — Gallery index: 10 look-alike cards** (367 words, 5,134 px at 390), no CTA or proof until the bottom, and
   a "Two more projects… no photography cleared" block under a grid that already shows The Rocks and Hunters Hill
   (an open owner question, K14 in `app/gallery/page.tsx`).
9. **P1 — Contact: the rating chip is below the fold at both sizes** and the same message appears three times; the
   form card has about 320 px of empty space under it at 1440.
10. **P2 — About credentials split across two sections** (the six standards rows take about 100 px each); the
    family section is four text rows with the right 55% empty. Do not invent portraits.
11. **P2 — Homepage repeats one composition** (H2, lead, ruled rows ×5); the Rocks block, regions list and
    "Recent bathrooms" are 1,100–1,400 px each at 390.
12. **P2 — Blog index is 78 equal text rows, about 24.6 screens at 390.** Show the first six per group and the rest
    in a `<details>`; titles in ink, not magenta underline (DESIGN.md §8.2).
13. **P2 — Blog post template (78 posts):** text only, about 260 px of dead space after the hero, two left edges
    (hero at x=120, body at x=394), breadcrumb below the hero, three bold meta labels, only an end-of-page CTA.
14. **P2 — Shared:** the Book block (`ContactSection`) is 174–186 words and about 1,300 px at 390 on five or more
    pages; `WorkStrip` is 1,383 px at 390 on three pages; the region list is identical on `/` and `/gallery/`.
15. **P2 — Gallery hero pill labels the photo, not the page** ("ARTARMON · BATHROOM RENOVATION" above an H1 about
    all of Sydney).
16. **P3 — Owner questions:** are the two "text-only" gallery projects the same as The Rocks and Hunters Hill
    (K14)? Should the project budget carry a room size like package prices? Does "Completed by 2026" mean more
    than the year?

## Preserve

The About fold; The Rocks' honest "Before" caption and budget disclaimer; the interactive before/after block; the
Castle Hill photo mosaic; all 19 reviews verbatim with "By Name"; the packages table with a size basis per column
at desktop width and the "from" wording; collapsed FAQ lists; the contact form's two steps and rating chip; blog
topic chips, reading time, breadcrumb and author box; licence, ABN, AS 3740 and the 10-year warranty visible at
least once per page.

## Fix once versus per page

Shared: `PageHero` (Book + Call + rating), `ContactSection` (trim the form header and repeated trust row),
`WorkStrip` (scroll-snap strip on phones), `AreasServedLinks` (chips, suburbs in `<details>`), `GoogleRating`,
the `AnswerBlock` price strip on packages, blog list link colour, blog post hero and body alignment.
Per page: packages table and cost sections, gallery index captions, project-page wording and "More project
photos", About reviews and credentials, homepage pink band, contact layout.

## Constraints for the fix

Reviews stay verbatim. Every price stays "from" with its room size. No Business Rules fact leaves the site.
Cut copy is collapsed into a native `<details>`, never deleted. No invented photos, portraits or reviews. After
changes: `check:design`, `check:readability` (the hand-maintained route list), 390 + 1440 screenshots, an
independent critique, and a served-HTML grep for each shortened section.
