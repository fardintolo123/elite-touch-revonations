# Density and hierarchy audit — services index, service pages, region hubs, suburb pages

Date: 2026-11-03. Rule applied: DECISIONS.md D-174 / D-175 / D-176. Audit only: nothing on these pages
was changed. Measured on a fresh production build (port 3345, Playwright, 390 and 1440, reduced motion so
scroll reveals render). Reviewer: `vision-auditor` subagent, which did not build the pages. Raw numbers:
page words, height and per-section words were captured to `aud2-data.json` in the session scratchpad.

Pages: `/services/`, `/services/bathroom-renovations/` (the ensuite, laundry and powder-room pages use
the same layout), `/services/bathroom-renovations/hills-district/` (region hub) and
`/services/bathroom-renovations/castle-hill/` (suburb page; all 11 location pages share one template).

## Measurements

| Page | Words | Height 1440 / 390 | Hero words | Photos below hero |
|---|---|---|---|---|
| `/services/` | 481 | 4,534 / 7,064 px | 59 | 3 (last section) |
| Service page | 903 | 7,605 / 9,996 px | 38 | 3 (at 71% down) |
| Region hub | 1,084 | 8,003 / 9,810 px | 90 | 1 |
| Suburb page | 611 | 6,295 / 6,844 px | 93 | 1 |

Repeated claims inside `<main>`: the suburb page says "free on-site measure" 9 times, the licence number
5 times and the 10-year warranty 3 times; the region hub says "free on-site measure" 7 times and the licence
5 times.

## Findings, ranked by effect on enquiries (no P0; the call path is intact)

1. **P1 — Location hero is overloaded (all 11 location pages).** Back link, eyebrow pill, "Reviewed
   September 2026" / "A photographed project" caption, H1, lead, two CTAs, a white rating card, three fact
   chips and a "Featured project" pill: about nine items, 90–93 words, 820–880 px tall, and clipped at 390.
   The white rating card is the brightest object and competes with the CTA. Target: H1, one line of 12 words or
   fewer, Book + Call, one inline rating line (about 40 words). Move chips and the date out of the hero.
2. **P1 — Service page: real photos come last, and the rating sits alone.** The three project photos appear
   71% of the way down; a 315 px band holds only the rating card. Move the rating into the hero, delete the
   band, and move the work strip up.
3. **P1 — `/services/` has no social proof and text-only room cards.** No rating anywhere (checked in the served
   HTML), a four-line lead, and four identical text cards. Add the inline rating; make each card an icon
   (the D-176 `serviceIcon()` set) plus title plus a line of 10 words or fewer. No prices on ensuite, laundry or
   powder-room cards (packages are priced for bathrooms only).
4. **P1 — Facts are in the smallest type.** The "what it costs and involves" sections put the from-prices,
   size basis, licence and warranty in about 13–14 px body text under a large decorative lead. Replace with a
   one-row number strip (from $18,000 / $25,000 / $30,000, each with its size basis; 3–4 weeks on site;
   10-year warranty) and collapse the prose with CSS. Prices stay "from" with their size.
5. **P1 — One repeated composition.** Most sections are an H2 plus left-aligned paragraphs with the right
   40% empty and no photo. Vary consecutive sections: number strip, photo and caption, table, dark band.
6. **P1 — Same claims repeat within a page** (licence, warranty, "in writing", "free on-site measure"). Give
   licence, warranty and AS 3740 one home (the shortened dark trust band); remove the hero chip repeat and the
   cost-paragraph repeat. Footer and schema stay.
7. **P1 — Location pages show the same photo twice and bury it.** The vanity photo is the dimmed hero
   background and again the project card, which sits about 1.9 screens down. Use a clear, un-dimmed photo beside
   the text, put the project section right after the hero, and cut the framing sentences to a caption.
8. **P2 — Eyebrows and captions restate the H1** (suburb page says "Castle Hill · bathroom renovations" three
   times). Drop them, or make the pill carry a new fact.
9. **P2 — Mobile length:** pages run 7–12 screens; the contact block is 1,297 px and 174 words on every
   page (13–19% of each); stacked work cards take 1,383 px on `/services/`. Lead with the form or call button
   and collapse its copy; show work cards two-up or as a snap row.
10. **P2 — One very long review** on the hub (122 words). Use a shorter real review from
    `Customer Reviews.md`; never trim a verbatim review.
11. **P2 — Trust band repeats itself** (H2 lists the three facts, the lists restate them). Short H2, keep
    every fact.
12. **P3 —** Hero Call button duplicates the header Call pill at 390 (D-175 kept it deliberately); Title Case on
    the service H1; the third-tier text link under the hero CTAs.

## Preserve

Header call pill and the Book + Call pair; H1s with service and place; the inline rating in the location hero;
the service page's timeline table, scope list and short dark review band; the suburb page's full-width project
photo section; ruled area rows; collapsed FAQs; the dark trust band as the single home for licence, warranty
and AS 3740; real labelled project photos.

## Where to fix once

Shared: `components/LocationHero.tsx` (11 pages), `components/PageHero.tsx`, `components/GoogleRating.tsx`
(compact inline variant), `components/ContactSection.tsx`, `components/WorkStrip.tsx`,
`components/AreasServedLinks.tsx`, a new fact-strip component, the shared section CSS.
Per page: `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/services/[slug]/[location]/page.tsx`
and the location data.

## Constraints for the fix

Collapse cut copy with CSS and keep it in the served HTML (re-check after). Every price stays "from" with its
size. No Business Rules fact leaves the site. Copy from `Customer Reviews.md` stays verbatim. Re-run
`check:design`, `check:readability` (the hand-maintained route list) and the 390 + 1440 screenshots.

## Not audited yet

Packages, gallery index and project pages, About, Contact, the blog index and the 78 posts, and the homepage
below the hero.
