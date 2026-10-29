---
target: live site (www.elitetouchrenovations.au, = main @ 4c1d106) against docs/DISTINCTIVE_DESIGN_CHECKLIST.md
scope: 12 representative routes at 390×844 and 1440×900 (contact page blocked, see S1)
p0_count: 0
p1_count: 10
timestamp: 2026-10-29
tracker: #73 (sub-issues #74–#78); performance routed to #86
evidence: tmp/design-audit-2026-10-29/ (untracked; screenshots, mocks, metrics). Do not commit it.
status: audit + two directions delivered; WAITING ON OWNER at the gate (A, B, or A now and B later)
---

# Sitewide design audit, 2026-10-29

Phase 1 of the merged prompt in `session-history/2026-10-29-design-audit-prompt-review.md`.
No site code changed. The live site serves the same commit as `main`, so live screenshots are the
"before" record.

## Evidence used

| Source | What it established |
|---|---|
| Playwright, live site, 12 routes × 390/1440, full page + first screen (`live/`) | What visitors actually see |
| `metrics.js` (photo share of page area, cards, eyebrows, first photo position) | Repetition and photo use as numbers |
| Photo contact sheet, all 60 files in `public/images/` | What any direction can be built from |
| `Customer Reviews.md`, theme counts | What customers actually praise |
| Search Console notes (`plans/long-tail-buyer-queries-2026-10.md`) | Blog posts earn almost every organic click; service/location pages sit at positions 25–50 |
| Supabase enquiry tables | Only 5 + 1 stored enquiries: too few to rank pages by leads |
| Live PageSpeed Insights, mobile | Lab speed per route (Google returned one cached result per URL) |
| 4 competitors from `docs/BATHROOM_SITE_STRUCTURE.md` | Structure only (D-05) |
| Independent `vision-auditor` critique of the screenshots | Second opinion that did not build anything (appended below) |

### Key numbers (1440 unless stated)

| Route | Photo share of page | First photo (390) | Eyebrows / H2s | Cards |
|---|---|---|---|---|
| `/` | 3.1 % | 1,096 px | 10 / 8 | 27 |
| `/services/` | 6.6 % | 666 px | 4 / 7 | 13 |
| `/services/bathroom-renovations/` | 3.5 % | 641 px | 10 / 8 | 22 |
| `/services/bathroom-renovations/castle-hill/` | 23.2 % | 114 px | 7 / 6 | 6 |
| `/services/bathroom-renovations/hills-district/` | 11.1 % | 114 px | 10 / 8 | 15 |
| `/gallery/` | 10.6 % | 779 px | 5 / 4 | 19 |
| `/gallery/the-rocks-bathroom/` | 19.7 % | 1,260 px | 6 / 5 | 13 |
| `/packages/` | 3.4 % | 795 px | 9 / 7 | 14 |
| `/about-us/` | 2.7 % | 782 px | 7 / 6 | 41 |
| `/blog/` | **0 %** | none | 75 / 74 | 74 |
| `/blog/bathroom-renovation-cost-sydney/` | **0 %** | none | 2 / 8 | 1 |

**Photos:** 60 files, 55 used. Widest is 1,349 px; 30 are 1180×680. The 6 published before photos are
black-and-white, 867–887 px, with "BEFORE" burned in, and shot from a different angle than the after
photos. Only 5 portrait-format photos exist.

**Reviews (19):** professional 8 · on time 7 · communication 7 · Omar or Adam named 7 · attention
to detail 6 · price/value 4 · **clean/tidy 1**.

**PageSpeed (mobile, lab, single cached run):** `/` 91 (LCP 1.35 s, **TBT 358 ms**, over the 300 ms
hard cap) · cost post 89 (**TBT 320 ms**) · The Rocks project 98 · `/services/bathroom-renovations/`
**76 (LCP 5.3 s)**. No field data. CLS 0 on all four. → #86.

## Findings (checklist §6 format)

| # | P | Problem | Where | Why it weakens the page | Replace with | Expected benefit | Perf | Size | Issue |
|---|---|---|---|---|---|---|---|---|---|
| F1 | P1 | Real photos are a sliver of the page | `/`, `/services/`, service pages, `/packages/`, `/about-us/`: 2.7–6.6 % of page area; at 390 the first photo is 640–1,100 px down | The strongest proof is the least visible thing. Pages read as text templates (pattern 7) | One large photo in the first screen (mobile: straight after the lead). One full-bleed image band per page (DESIGN.md §4.4 recipe, unused on these pages) | Proof inside the 3-second window; visibly this firm's work | Hero photo may become mobile LCP. Keep ≤ 70 KB (640w rung is 18–26 KB), one priority image | M | #74 #75 #76 #78 |
| F2 | P1 | Project pages lead with text; the before photo is the last, smallest tile | All 11 `/gallery/[slug]/`: first photo 1,350 px (1440) / 1,260 px (390) down | The evidence page hides its evidence | Largest after photo as hero; facts row (suburb · budget · weeks · completed); a **then / now** pair for the 6 projects with a before photo; story after | The most persuasive proof (before vs after, real budget) seen first | Neutral: same images reordered | S–M | #76, after the #71 edits in `app/gallery/[slug]/page.tsx` land |
| F3 | P1 | Blog has no photos at all | `/blog/` and every post: 0 % | Posts earn almost every organic click; readers land and see no sign of the business | Post template: one "From our projects" block (real photo + suburb + budget + weeks), chosen by topic. Index: replace 74 chip cards with a grouped typographic list | Proof reaches the most-visited pages; index becomes scannable | One lazy below-fold image per post, ~20–30 KB | M | #77 |
| F4 | P1 | Same section stack everywhere: eyebrow → H2 → lead → card grid | Every route; eyebrows ≥ H2s on every page. Generic labels repeat sitewide ("Get in touch", "Our work", "FAQ", "Areas we serve") | Most repeated template signal (pattern 5) | Answer O-12: keep an eyebrow only when it carries a fact (suburb, step number, price, date); drop the generic ones | Headlines carry; less template feel | None | S per page | O-12, #74–#78 |
| F5 | P1 | Card volume: nearly everything is a rounded bordered card | 27 cards on `/`, 41 on `/about-us/`, 74 on `/blog/`; FAQs, regions, credentials, standards and services are all cards | Pattern 3 is about volume; cards flatten hierarchy | Cards only for clickable items. FAQ → divided list (keep `<details>` + FAQPage). Regions → typographic list with suburb counts. Credentials/standards → one ruled table | Calmer, clearer hierarchy | Neutral | M | #78 (AreasServedLinks, FAQ), #74, #76 |
| F6 | P1 | Services are four identical text cards | `/` "Four services", `/services/` | Fails the swap test: any renovator could say it | Photo-led rows where an approved photo of that room type exists (bathroom, ensuite). Text rows for powder room and bathroom + laundry until real photos exist; never borrow | Specific to this firm | +2 lazy images | S–M | #74 #75 |
| F7 | P1 | Gallery ignores DESIGN.md's own gallery recipe | `/gallery/`: 11 identical light cards | §4.4 defines the gallery as an ink band with an asymmetric grid | §4.4 recipe: one featured project large, asymmetric grid, a "before photo" marker on the 6 projects that have one | Reads as a portfolio, not a listing | Neutral | M | #76 |
| F8 | **P1** (raised after review) | Location heroes darken the photo almost to black: the hero background measures 22–43/255 at 390 and peaks around 134/255 at 1440 (reviewer pixel sampling) | Suburb and hub heroes, worst at 390 | The local project, the page's proof, can't be seen. This is a decorative treatment (PRODUCT.md anti-reference) and goes beyond DESIGN.md §9's bottom-weighted scrim | §9 scrim weighted to the text side at 1440; at 390 show the photo as its own block above the text | The local project is visible | None | S | #75 |
| F13 | P1 | The homepage hero has no visible primary action. The room pills, text link and outline call button carry equal weight, and nothing says what tapping a room does | `/` hero, both viewports | Fails "what happens next" on the busiest page. The pills are the deliberate primary action (D-155 reel handoff), but they don't read as one | Keep the picker (D-155); label it "Choose your room to book a free on-site measure"; make the pills a heavier outline; "Or call" as secondary. See revised mock A | Clearer next step | None | S | #74 |
| F14 | P1 | The mobile header cuts the business name to "Elite Touch Renov…" | Every route, 390 | The brand looks broken on every phone first screen | Two-line wordmark ("Elite Touch / Renovations"), keeping the call button | The name reads in full | None | S | #78 |
| F15 | P2 | `/packages/` sets the three from-prices and size bases inside a 6-line grey paragraph; blog card titles are all magenta | `/packages/` hero; `/blog/` | Prices are hard to scan; extra magenta weakens the one primary action (DESIGN.md §1.1) | Ruled 3-row price / size list; blog titles in ink | Prices scannable; CTA keeps its weight | None | S | #76 #77 |
| F9 | P2 | Reveal motion exceeds DESIGN.md §6 | Every section: 40 px / 700 ms; children 28 px + scale 0.97, stagger to 360 ms | Spec is 16 px / 500 ms / 60 ms. Motion on every section explains nothing (pattern 6) | Bring to spec; drop the child scale | Calmer; slightly less work | Small gain | S | #78 |
| F10 | P2 | Hero photo caption repeats the suburb in a pink underlined pill | `PageHero` ("RANDWICK · RANDWICK BATHROOM RENOVATION") | Chip volume; duplicated word | Plain caption: "Randwick bathroom renovation →" | Cleaner | None | S | #78 |
| F11 | P2 | Google rating card sits alone in its own band | `/services/bathroom-renovations/` (≈ 315 px band) | Looks like a gap | Move into the hero facts | Tighter first scroll | None | S | #75 |
| F12 | P2 | The family as four text cards; 19 reviews as a 4,405 px wall of cards | `/about-us/` | No faces; review wall is hard to read | Owner-supplied family photo (with consent) when available; until then a set list of names and roles. Reviews: first three large, the rest as a two-column list | Personal, readable | None | M | #76 + owner photo |

## What works: preserve it

- **Specific, honest copy:** written scope, exclusions, AS 3740, week ranges, from-prices with size
  basis. More specific than every competitor checked.
- **Tap-to-call in the first screen on every page at 390.** The mobile header is now 114 px; the
  September P1 (377 px) is fixed.
- **Project pages already show budget and weeks on site.** No competitor checked does this.
- The packages comparison table.
- Location pages lead with a real local project photo.
- No gradients, glass or glow; one accent colour; CLS 0 on every route measured.

## Side findings (not design; owner to verify)

- **S1** `/contact-us/` returns **403 + Cloudflare challenge** to non-Australian traffic (rule added
  2026-10-28, see `session-history/2026-10-28-cloudflare-freetier-setup.md`). Australian visitors
  should pass. Check Googlebot is exempt (Search Console → URL inspection of `/contact-us/`).
- **S2** Reviews praise cleanliness once in 19. CLAUDE.md and the checklist say reviews "repeatedly
  praise ... cleanliness". Lead with named people (Omar, Adam), detail, timing and communication;
  correct those two docs.
- **S3** The held Mosman/Drummoyne photos (D-102) are reachable by URL in `public/`, though unlinked.
- **S4** DECISIONS.md has **two rows numbered D-155** (consultant tips; homepage room handoff).
  The room-handoff row says its performance gate stayed open ("both versions exceed the TBT cap",
  "publication is not cleared"), yet it is live: today's homepage TBT is 358 ms. Renumber and
  close the gate under #86.

## Competitors (structure only, D-05)

- **Luke's Renovations:** modern "studio" look. Dark video hero, serif-italic headline, numbered
  service cards. Generic copy ("A home you love. Down to the detail.").
- **Vivid Bathrooms:** dated template, but labels every project photo with its street.
- **Avante:** 2016-era site.
- **Passion Built:** blocked by a bot check.
- **Takeaway:** the premium-studio look is already used by a direct Inner West competitor. Elite
  Touch's edge is specificity: prices, weeks, licence, named family, before photos.

## Two directions (mocks: `tmp/design-audit-2026-10-29/mocks/`)

Both mocks use only real photos and real site copy. Each shows the homepage hero plus a The Rocks
project section. The before/after is presented side by side (A) or inset (B), never as a wipe.

| | **A — Evidence first** (evolve DESIGN.md) | **B — Architectural editorial** (owner's note) |
|---|---|---|
| Palette | Unchanged: `#FAFAFA` canvas, white surface, magenta CTA | Warm plaster `#F3EFE8` canvas, `#FBF9F5` paper, ink `#24211D`, secondary `#5E574E` (6.2:1); magenta for the CTA only |
| Type | Jost only | Serif display (mock: Newsreader, OFL) for H1/H2 + Jost for body/UI |
| Shape | Pills, rounded photos (`radius-xl`) | Square-cornered photos bleeding to the page edge; pills stay for buttons |
| Signature | DESIGN.md's hero floating card (defined in §4.4, not on today's homepage) + then / now pair | "Title block" fact panel (like the corner of an architectural drawing) + inset before photo |
| Specific to ETR | Budget and weeks ledger; honest then / now captions | Title block grounded in Farah (architectural designer) and Omar (civil engineer); same real facts |
| DESIGN.md change | None to tokens; composition rules only | New colour tokens, a second font, radius rule for imagery: a DESIGN.md revision |
| Cost | No new font or dependency | +1 self-hosted serif (~20–40 KB, the 2nd and last allowed preloaded font) |
| Main risk | Still reads "friendly trade" rather than premium | Warm cream + serif display is itself a common AI-generated look today; converges with Luke's look; full-bleed photos soft above ~1,350 px without original files; "luxury" positioning vs real project budgets of about $26k–$45k and from-$18k packages |

**Recommendation: A now, B later.** A delivers F1–F7 with no token change and low risk. B's title
block can be borrowed into A as a plain ruled table. Revisit B only after the original full-size
photos arrive and the owner chooses premium positioning. Say "premium craft", not "luxury".

### Signature interactions (max 2)

1. **Then / now pair** (both directions). Desktop: side by side. Mobile: stacked, after first
   (the review showed a swipe hid the after photo). No JavaScript. Captions say the angles differ
   and the before photo was supplied in black and white. A true wipe slider needs same-angle,
   unlabelled colour originals.
2. **Room-starter chips** (existing `HomeEnquiryStarter`): keep as the conversion signature.

**Deferred:** the scroll-driven renovation sequence. It needs stage photos from one job; none exist.

### Homepage plan (Direction A; B differences in brackets)

1. **Hero:** keep H1, lead, room chips and call. On mobile the photo comes first, with a caption and
   rating row, then H1 and lead. On desktop the photo takes 7/12 width. Label the picker (F13)
   [B: photo bleeds to the edge; title block under the CTA].
2. **Then / now: The Rocks.** Before + after, budget about $32,000, 4 weeks, the leadlight window
   kept. New band from existing data.
3. **"The three questions we put in writing":** keep.
4. **Recent projects:** asymmetric, one large + two small, with budget and weeks (home only; replaces
   the three equal WorkStrip cards).
5. **Services:** photo-led rows (bathroom, ensuite) + text rows (powder room, bathroom + laundry).
6. **Process:** keep the numbered steps; add the real week ranges (3–4 / 5–6 / 5–7).
7. **Reviews (ink band):** keep; lead with a review that names Omar and Adam.
8. **Areas:** typographic list, no cards.
9. **FAQ:** divided list; keep all 11 and the FAQPage schema.
10. **Contact:** keep.

Eyebrows stay on 1 (fact), 2 (suburb) and 6 (step numbers) only.

**Mobile:** photo in the first screen; 114 px header with the call button; swipeable then / now;
no horizontal page scroll (verified on both mocks at 390).

## Independent review (vision-auditor, screenshots only)

The reviewer agreed with F1, F2, F4, F5 and F8. It raised F8 to P1 with pixel measurements and
added F13 (homepage hero action), F14 (truncated mobile wordmark) and F15 (packages prices, magenta
blog titles). It kept the same "what works" list. Verdict on the directions: **A passes the §4
section test better.** It carries more evidence per screen and stays inside DESIGN.md. Most of
what sets B apart is typeface and background, a trend layer rather than evidence. Its
recommendation: build A, and bring over from B the ruled fact table and the photo-first mobile hero.

Problems it found in the first mocks, and what changed:

| Mock problem | Fix in revised mock A |
|---|---|
| A, 390: the after photo was clipped in a horizontal scroller, so phones saw the black-and-white before first | Stacked, after first on phones; side by side (before, after) at 1440 |
| A: no clear hero action | Labelled picker: "Choose your room to book a free on-site measure"; "Or call" secondary |
| A, 390: rating card covered ~30 % of the photo | Rating moved to a caption row under the photo |
| A: the headline "The leadlight window stayed. Everything around it changed." is a stock two-beat cadence | Descriptive headline: "A heritage terrace bathroom, built around its leadlight window." |
| Both: B&W before beside a colour after exaggerates the change; the window frames go from dark to white | Captions say "supplied in black and white" and "the original leadlight glass stayed" |
| B: the inset before covers the only comparable area; hero photo soft at ~720×770; no project caption | Not fixed. B is not recommended. Recorded as B risks |

## Gate

Owner question: **A, B, or A now and B later?** The answer gets a new DECISIONS.md row (check the
highest D-number immediately before writing) and settles O-12 (F4). Nothing in `app/` or
`components/` changes until then.
