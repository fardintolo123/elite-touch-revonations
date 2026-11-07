# Session Summary — homepage hero density audit (D-174 / D-175)

## 1. Session Objective
Turn outside feedback ("too much text, not enough visuals, hero overloaded, generic dropdowns") into a
rule and an audit prompt, then audit and fix the homepage hero using the owner's annotated screenshot
(keep the four room buttons that lead to the enquiry form).

## 2. Work Completed
- Rule in `CLAUDE.md` Design Standard, decision D-174, audit prompt in
  `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` §10 (commit `6b4cc9d`).
- Measured before/after on a fresh production build (port 3345, Playwright, 390 and 1440).
  Hero visible words 130 → 65; lead 18 → 13 words; hero height at 1440 970 → 868 px; hero photo
  483×362 → 515×515 (area +52%); homepage hero H1 stays two lines at ≥1280.
- Hero changes (`app/page.tsx`, `app/page.module.css`, `components/HomeEnquiryStarter.tsx`):
  - photo: Castle Hill double vanity → Hornsby bathroom `shower-bath-lit-niche` (images[1]), square crop,
    `sizes` 780 so the crop stays sharp (image request 640 → 828 rung; +13.5 KB)
  - eyebrow: "Sydney ·" dropped (already in the H1), smaller padding
  - lead cut to "We measure on site, then put the work, exclusions and price in writing."
  - label "Choose your room to book a free on-site measure" → "Book a free on-site measure"
  - removed: "Not sure yet? Request a free measure" link, licence + AS 3740 fact row, hero testimonial card
  - kept: rating, the four room buttons, Call button, "Quotes fixed scope" and 10-year warranty facts
- Checks: build green (twice), `check:design` PASS, `check:readability` home 63.9 PASS (`/blog/` 53.2 FAIL is
  pre-existing and untouched), served HTML still has every kept phrase, exactly one image preload,
  no horizontal overflow at 768/1024.

## 3. Important Decisions
- **D-175 (hero):** licence and AS 3740 leave the hero (owner: "ppl doesn't know what that means or care").
  They stay in the footer, About page, FAQ and schema, so no Business Rules fact is changed.
- The "Not sure yet" link was removed because the owner crossed it out; the form still has the
  "Not sure yet" option and the Call button covers the unsure visitor. Easy to restore.
- Nav dropdown icons (second half of the feedback) were **not** done in this session.

## 4. Permanent Rules / Lessons
- A `cover` crop changes what `sizes` should say: size it for the scaled image, not the visible box.
- Measure the H1 line count whenever hero column widths change; it flipped to three lines at 1.0fr/1.05fr.
- Do not redirect build logs to a path that does not exist (`../tmp`); use the scratchpad.

## 5. Unfinished / Open
- Nav dropdown icons and short labels (D-174) still to do.
- Independent `vision-auditor` critique: no P0/P1. Open P2s (owner's call): no filled primary button in the hero body; "in writing" appears twice (lead + Quotes fact). Crop was moved to `object-position: 38% 50%` after the critique so no fixture is clipped.

## 6. Follow-on: dropdown icons (D-176)
- `components/layout/NavIcon.tsx` (new, server component, inline SVG) + `components/layout/SiteHeader.tsx` + `app/globals.css`.
  Services, Blogs and About panels: icon tile + the same text. Suburb/region links stay plain.
- Row height 56px → 48px after critique; blogs panel ~482 → ~416px tall.
- Icon maps live in `NavIcon.tsx` (`serviceIcon`, `topicIcon`); an unmapped service/category falls back to a neutral icon.
- Wording in CLAUDE.md, D-174 and checklist §10 changed from "every dropdown row" to "every row that names a destination type; suburbs stay plain".
- Verified on a production build: 390 + 1440 dropdown screenshots, 16 icons in each of desktop and mobile menu HTML, `check:design` PASS.

## 7. Follow-on: services and location pages audit and fix (D-177)
- Audit report (kept in repo): `.impeccable/critique/2026-11-03-services-and-location-density-audit.md`.
- Fixed: `components/LocationHero.tsx` (slim, 11 pages), `components/PageHero.tsx` (optional eyebrow, `rating`),
  `components/GoogleRating.tsx` (`compact`), `components/layout/NavIcon.tsx` (`size="lg"`), `app/globals.css`,
  `app/services/page.tsx` (icon cards, inline rating), `app/services/[slug]/page.tsx` (rating in hero, work strip up),
  `app/services/[slug]/[location]/page.tsx` (new leads, no chips).
- Checks: build green, `check:design` PASS, `check:readability` all 16 affected URLs PASS, one H1 and correct preload on each.
- Open (next round): lighten or drop the hero scrim and stop repeating the project photo; number strip for prices/warranty;
  vary section composition; mobile length (work cards, contact block); trust-band duplication; laundry/powder hero gap.
- Not yet audited: packages, gallery and project pages, About, Contact, blog index and posts, homepage below the hero.

## 8. Follow-on: price strip and clearer hero photo (D-178, 2026-11-04)
- New: `lib/packageStarts.ts` (single source for the three from-prices and sizes; `app/packages/page.tsx` now reads it),
  `components/AnswerBlock.tsx` (price strip + closed `<details>` for later paragraphs).
- Edited: `app/globals.css` (strip, details, scrim, mobile photo-first, hero alignment), `components/LocationHero.tsx` unchanged this round,
  `app/services/[slug]/page.tsx` (strip after lead; bathroom + ensuite only), `app/services/[slug]/[location]/page.tsx`
  (AnswerBlock, different project-card frame, hub date moved).
- Lesson: a scratchpad is wiped on session restart; rebuild scripts there rather than assuming they exist.
- Lesson: sample real text contrast behind the brightest pixel, and test candidate scrims in the browser (inject the CSS) before rebuilding.
- Open: suburb project text block, repeated section composition, mobile stacks (work cards, contact block), trust-band duplication,
  laundry/powder hero gap. Not yet audited: packages, gallery and project pages, About, Contact, blog, homepage below the hero.
