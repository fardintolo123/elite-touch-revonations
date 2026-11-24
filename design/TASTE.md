# TASTE.md — Elite Touch Renovations Design Taste Guide

**Status:** authoritative for brand feel and visual judgement. Read before any UI work.
Tokens: [`tokens.css`](tokens.css). System rules: [`../DESIGN.md`](../DESIGN.md).
AI-look gate: [`../docs/DISTINCTIVE_DESIGN_CHECKLIST.md`](../docs/DISTINCTIVE_DESIGN_CHECKLIST.md).

---

## Brand identity in one sentence

A family-run Sydney bathroom renovation business that proves its craft through real project
photography, verifiable credentials and a warm, accountable voice — not through effects.

## Design language

**Vibrant · rounded · flat · light-first.**

One loud colour (magenta `#DD0880`), used sparingly — the primary action and nothing else.
Jost headings at medium weight. Flat tone elevation (white cards on off-white canvas, no shadows
in the content layer). Full-bleed image bands under a scrim alternate with light sections to create
rhythm. Generous vertical space; density lives inside cards, never between sections.

## Voice

Careful, warm, accountable. A considered high-value purchase, not urgency. Process, timeline,
warranty and "what it's like to have us in your home" convert better than adjectives. The
testimonials repeatedly praise communication, punctuality and cleanliness — lead with those.

---

## The 6-dimension scoring rubric

Score each page 1–10 on every dimension. A page scoring **≤ 3** on any dimension is a **P0**
(must fix before shipping). A score of **4–5** is a **P1** (fix in the next design sprint).
**6–7** is acceptable. **8–10** is excellent.

### 1. Type

Jost is the only typeface. Correct weights: 500 display headings, 600 section headings and buttons,
400 body, 700 emphasis only. Fluid clamp scale from DESIGN.md §3.1 is used. Negative tracking on
large sizes. Uppercase only for eyebrow and caption labels with ≥ 0.1em tracking. One heading level
per section — never stack h2 + h3 as title/subtitle (use h2 + lead).

| Score | Meaning |
|---|---|
| 1–3 | Wrong font, wrong weights, broken scale, uppercase body text |
| 4–5 | Right font but inconsistent weights or missing fluid clamp |
| 6–7 | Correct across the page with minor tracking/leading issues |
| 8–10 | Perfect type hierarchy, every token in use, measure within 60–75ch |

### 2. Rhythm

The page alternates light sections, full-bleed image bands and dark ink sections — this
alternation is the layout. Pill geometry on CTAs and inputs (radius 999px). Eyebrow chips above
section headings, but only when they carry a fact (suburb, step number, price, date) per D-159.
4px grid spacing throughout. Section padding follows the spacing scale (80px mobile → 120px
desktop).

| Score | Meaning |
|---|---|
| 1–3 | No band alternation, broken spacing, non-pill CTAs |
| 4–5 | Band rhythm exists but adjacent same-background sections, or spacing off-grid |
| 6–7 | Correct rhythm with minor spacing inconsistencies |
| 8–10 | Perfect alternation, every spacing value on the 4px grid, pill geometry everywhere |

### 3. Density

Light-first. Sections breathe with generous vertical padding. The hero holds only the H1
(service + location), one supporting line, the primary CTA with tap-to-call and one real proof
item. Three visible hierarchy levels and one focal point per viewport. Content density lives
inside cards, never between sections.

| Score | Meaning |
|---|---|
| 1–3 | Crowded hero, competing CTAs, too many elements above the fold |
| 4–5 | Generally clean but hero has extra elements or competing focal points |
| 6–7 | Good density with one or two sections slightly heavy |
| 8–10 | Each section has one job, one focal point, generous breathing room |

### 4. Restraint

Magenta `#DD0880` appears at most once per viewport as an action element. No drop shadows on
content-layer elements. No decorative gradients, glows or glassmorphism. No second saturated hue.
Trust content (awards, certifications) in grayscale. One or two signature elements per page
(hero's floating card, full-bleed image band); everything else is plain.

| Score | Meaning |
|---|---|
| 1–3 | Multiple magenta actions competing, shadows on cards, decorative effects |
| 4–5 | Mostly restrained but magenta used too often or a stray shadow |
| 6–7 | Good restraint with minor violations |
| 8–10 | Perfect single-action magenta, flat elevation, no competing effects |

### 5. Alignment

Consistent grid: 1280px content container, 1440px wide container for image bands, 720px narrow
for prose. 12-col grid with 24px desktop / 20px mobile gap. Gutters: 20px mobile → 32px tablet →
40px desktop. Nothing floats outside the system. Full-bleed images break the container but their
content aligns to `container-max`.

| Score | Meaning |
|---|---|
| 1–3 | Elements outside the grid, inconsistent gutters, broken container |
| 4–5 | Grid mostly works but some elements overflow or misalign |
| 6–7 | Correct grid with minor inconsistencies at breakpoints |
| 8–10 | Perfect grid alignment at all breakpoints, every element in the system |

### 6. Focus

One clear CTA per section. The call/enquiry path is visible and uncontested. Tap-to-call visible
without scrolling on mobile. Service + location in the H1. Real social proof visible early. No
competing focal points per viewport. The primary action is always the magenta button; secondary
actions use the secondary or ghost button variant.

| Score | Meaning |
|---|---|
| 1–3 | No clear CTA, competing actions, buried call path |
| 4–5 | CTA exists but competes with other elements or is secondary |
| 6–7 | Clear primary CTA with minor competing elements |
| 8–10 | Perfect single focal point per section, uncontested CTA hierarchy |

---

## Scoring a page

1. Take screenshots at **390×844** (mobile) and **1440×900** (desktop).
2. Score each dimension 1–10. Record the score with a one-line justification.
3. Calculate the total (max 60). Record any P0 (≤ 3) or P1 (4–5) findings.
4. For any P0/P1, file a follow-up issue with the finding in the
   `docs/DISTINCTIVE_DESIGN_CHECKLIST.md` §6 format.

| Total | Rating |
|---|---|
| 48–60 | Excellent — ship it |
| 36–47 | Good — address P1s in the next sprint |
| 24–35 | Needs work — fix P0s and P1s before shipping |
| < 24 | Redesign needed |

---

## What makes an Elite Touch page (not a template)

1. **Real project photography.** Imagery is evidence. The documented case studies and gallery
   projects. Never infer subject, location or before/after from a filename.
2. **The family and the process.** The four Dawood family members and their roles. The
   written-scope quote. AS 3740 waterproofing. Communication, punctuality, cleanliness.
3. **Verifiable facts.** Licence 475204C. 10-year workmanship warranty. Family-run since 2022.
   Package from-prices with size basis. Verbatim reviews from `Customer Reviews.md` only.
4. **The design system's identity.** Magenta as the one loud colour. Jost headings at medium
   weight. Flat tone elevation. Light / image band / ink band rhythm.
5. **Warm, accountable voice.** A considered high-value purchase, not urgency.

---

## References

The `references/` directory should contain 8–15 curated reference screenshots showing the
design standard at its best — pages that score 48+ on the rubric. These are the visual north
star for future work.
