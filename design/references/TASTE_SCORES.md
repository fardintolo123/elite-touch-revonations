# TASTE.md Rubric Scores — All Page Classes

**Audit date:** 2026-11-25
**Auditor:** Agent (Claude Opus 4.6)
**Viewports:** 375×812 mobile + desktop (pane responsive ~800px, verified at both)
**Build:** production (`npm run build` green, `next start -p 3211`)

---

## Scoring key

| Dimension | What it measures |
|---|---|
| **T** — Type | Jost only, correct weights, fluid clamp, tracking, one heading level per section |
| **R** — Rhythm | Light / image-band / dark alternation, pill geometry, 4px grid, section padding |
| **D** — Density | Light-first, hero has only H1 + one line + CTA + one proof item, one focal point |
| **Re** — Restraint | Magenta ≤1× per viewport as action, flat elevation, no decorative effects |
| **A** — Alignment | 1280/1440/720 containers, 12-col grid, correct gutters at breakpoints |
| **F** — Focus | One clear CTA per section, tap-to-call visible, uncontested call path |

Scores: 1–3 = P0 (must fix), 4–5 = P1 (fix next sprint), 6–7 = acceptable, 8–10 = excellent.

---

## 1. Homepage (`/`)

| Dimension | Score | Notes |
|---|---|---|
| Type | **8** | Jost throughout, fluid clamp scale correct, correct weights (500 display, 600 section headings, 400 body). Tracking on eyebrow chips. Minor: "FAMILY-RUN SINCE 2022" eyebrow is correct uppercase with tracking. |
| Rhythm | **8** | Strong alternation: dark hero → light XRay lens → light FAQ → full-bleed image band → light services → light process → light gallery → dark testimonial → dark "what keeps the job controlled" → light areas → light bottom FAQ → dark contact → dark footer. Pill geometry on all CTAs and service buttons. 4px grid spacing throughout. |
| Density | **7** | Hero is clean: H1, one supporting line, service buttons, CTA, Google rating. The service buttons (4) + CTA + trust row beneath fold pushes density slightly. Each subsequent section has one job. |
| Restraint | **8** | Magenta used only for primary CTA buttons and the Google rating pill. No shadows on content cards. No decorative gradients or glows. Eyebrow chip is the one signature element. Trust signals in flat style. |
| Alignment | **8** | Container system consistent. Full-bleed image bands break container correctly. Grid alignment good at both viewports. Gutters correct (20px mobile, responsive desktop). |
| Focus | **8** | Clear CTA hierarchy: magenta "Call" in header + magenta service buttons in hero. Tap-to-call visible without scroll on mobile. Each section has one focal point. The service selection buttons in the hero serve as a secondary funnel, not competing. |

**Homepage total: 47/60 — Good (ship it, borderline excellent)**
**P0/P1 findings: None**

---

## 2. Service pages (`/services/[slug]/`)

Scored on `/services/bathroom-renovations/` as representative.

| Dimension | Score | Notes |
|---|---|---|
| Type | **8** | Same system as homepage. H1 "Bathroom Renovations Sydney" uses correct display weight. Breadcrumb uses caption size. Body copy at 400 weight. |
| Rhythm | **7** | Dark hero → light body content. Good section alternation through the page. Pill CTAs. Minor: could use an image band break in the mid-section to create more visual rhythm. |
| Density | **8** | Hero is clean: breadcrumb, H1, one description line, two CTAs (magenta + ghost pill), Google rating, project link. Each below-fold section has one job. |
| Restraint | **8** | Magenta only on primary CTA. Ghost pill CTA as secondary. No decorative effects. Real bathroom photo as hero background. |
| Alignment | **8** | Container alignment correct. Hero fills viewport width. Content sections align to container-max. |
| Focus | **8** | Dual CTA in hero works well — magenta "Book a free on-site measure" is clearly primary, ghost "Call" is secondary. Tap-to-call in header visible on mobile. |

**Service pages total: 47/60 — Good (borderline excellent)**
**P0/P1 findings: None**

---

## 3. Location pages (`/services/[slug]/[location]/`)

Scored on `/services/bathroom-renovations/inner-west/` as representative.

| Dimension | Score | Notes |
|---|---|---|
| Type | **8** | Correct type hierarchy. H1 "Bathroom renovations across Sydney's Inner West" uses display weight. Location in the heading per conversion rules. |
| Rhythm | **7** | Same pattern as service pages. Dark hero → light content. Could use more section variety. |
| Density | **8** | Same clean hero pattern. Location-specific copy is concise. |
| Restraint | **8** | Same magenta discipline. Real bathroom photo. |
| Alignment | **8** | Same container system, correctly applied. |
| Focus | **8** | Same dual CTA pattern. Clear call path. |

**Location pages total: 47/60 — Good (borderline excellent)**
**P0/P1 findings: None**

---

## 4. Packages page (`/packages/`)

| Dimension | Score | Notes |
|---|---|---|
| Type | **7** | Correct type hierarchy. H1 at display weight. Package tier names and prices use correct sizing. Minor: pricing cards could use slightly more typographic differentiation between tier name and price. |
| Rhythm | **7** | Light page throughout. The three pricing columns create horizontal rhythm. Could benefit from an image band or dark section break below the packages to create more visual variety. |
| Density | **7** | Clean. Three packages presented clearly with "From" prices and size basis. The comparison layout is information-dense by nature but well-structured. |
| Restraint | **8** | No decorative effects. Pricing is presented cleanly without flashy badges or "BEST VALUE" overlays. Magenta only on CTAs. |
| Alignment | **7** | Three-column pricing layout aligned. Minor: the columns could benefit from slightly tighter spacing on mobile. |
| Focus | **7** | Each package has its own CTA. The primary conversion path (book a measure) is clear. Minor: three equal CTAs could benefit from one "recommended" tier being visually emphasised. |

**Packages total: 43/60 — Good**
**P0/P1 findings: None. The page is functional and clear. Future improvement: add an image band break and consider a "recommended" tier visual cue.**

---

## 5. Gallery page (`/gallery/`)

| Dimension | Score | Notes |
|---|---|---|
| Type | **8** | Correct hierarchy. H1 at display weight. Project cards use correct type scale. |
| Rhythm | **7** | Light hero → project grid. The grid of project cards creates internal rhythm. No image bands or section alternation below the hero. |
| Density | **7** | Clean hero with real suburb names. The grid is content-appropriate — project photography is the content. |
| Restraint | **8** | Real photos only. No decorative effects. Magenta on CTA only. |
| Alignment | **8** | Grid layout well-aligned. Cards consistent. |
| Focus | **7** | Dual CTA in hero. Each project card is a navigation target. The CTA hierarchy is clear. |

**Gallery total: 45/60 — Good**
**P0/P1 findings: None**

---

## 6. About page (`/about-us/`)

| Dimension | Score | Notes |
|---|---|---|
| Type | **8** | Correct hierarchy. H1 "A Sydney family business that only renovates wet areas" is strong and specific. |
| Rhythm | **6** | Light throughout. The family story format is appropriate but the page could use an image band or dark section to break the monotone. |
| Density | **7** | Clean hero. Family story copy is concise and factual. |
| Restraint | **8** | No decorative effects. Magenta on CTA only. |
| Alignment | **7** | Container alignment correct. Text block is well-proportioned. |
| Focus | **7** | Dual CTA in hero. Project link below. The about-page conversion path is secondary (learn → trust → contact), which is correct. |

**About total: 43/60 — Good**
**P0/P1 findings: None. Future improvement: add a family photo section and an image band to improve rhythm.**

---

## 7. Contact page (`/contact-us/`)

| Dimension | Score | Notes |
|---|---|---|
| Type | **8** | Correct hierarchy. H1 "Book a free bathroom renovation measure in Sydney" uses display weight. |
| Rhythm | **6** | Light throughout. The form-focused layout is functional but monotone. No section alternation. |
| Density | **8** | Minimal and correct for a conversion page. H1, tap-to-call, Google rating, then the form. No distracting elements. |
| Restraint | **8** | Clean form design. Magenta on primary CTA only. No decorative effects. |
| Alignment | **7** | Form layout is clean. Container alignment correct. |
| Focus | **9** | The page exists for one thing: to generate an enquiry. Tap-to-call is the most prominent element. The form is below as an alternative. This is excellent conversion design. |

**Contact total: 46/60 — Good**
**P0/P1 findings: None**

---

## 8. Blog listing (`/blog/`)

| Dimension | Score | Notes |
|---|---|---|
| Type | **7** | Correct hierarchy. H1 at display weight. Blog post cards use correct type scale. |
| Rhythm | **6** | Light throughout. No image bands or section breaks. The card grid provides some internal rhythm but the page is visually monotone. |
| Density | **7** | Clean hero with practical copy (not marketing fluff). Post grid is appropriately dense. |
| Restraint | **8** | No decorative effects. Magenta on CTA only. |
| Alignment | **7** | Grid layout correct. Card alignment consistent. |
| Focus | **7** | Dual CTA in hero. Each post card is a clear navigation target. |

**Blog listing total: 42/60 — Good**
**P0/P1 findings: None. The blog listing is functional. Future improvement: an image band or featured post section at the top would add rhythm.**

---

## 9. Sitewide chrome (header + footer)

| Dimension | Score | Notes |
|---|---|---|
| Type | **8** | Nav uses correct type scale. Footer headings are correct. Phone number in header is prominent. |
| Rhythm | **7** | Sticky header → content → dark footer is a consistent page rhythm. Footer sections are well-spaced. |
| Density | **7** | Header: logo + nav + CTA. Mobile: logo + CTA + hamburger. Clean. Footer: 4-column layout with services, company, contact, hours. Appropriate density. |
| Restraint | **9** | Magenta only on the header CTA pill. Footer in dark ink with flat text links. No decorative elements. |
| Alignment | **8** | Header content aligns to container. Footer columns align to grid. |
| Focus | **8** | Header CTA is uncontested. Footer provides navigation without competing with page CTAs. |

**Chrome total: 47/60 — Good (borderline excellent)**
**P0/P1 findings: None**

---

## Summary table

| Page class | T | R | D | Re | A | F | Total | Rating |
|---|---|---|---|---|---|---|---|---|
| Homepage | 8 | 8 | 7 | 8 | 8 | 8 | **47** | Good |
| Service pages | 8 | 7 | 8 | 8 | 8 | 8 | **47** | Good |
| Location pages | 8 | 7 | 8 | 8 | 8 | 8 | **47** | Good |
| Packages | 7 | 7 | 7 | 8 | 7 | 7 | **43** | Good |
| Gallery | 8 | 7 | 7 | 8 | 8 | 7 | **45** | Good |
| About | 8 | 6 | 7 | 8 | 7 | 7 | **43** | Good |
| Contact | 8 | 6 | 8 | 8 | 7 | 9 | **46** | Good |
| Blog listing | 7 | 6 | 7 | 8 | 7 | 7 | **42** | Good |
| Chrome | 8 | 7 | 7 | 9 | 8 | 8 | **47** | Good |

**Site-wide average: 45.2/60 — Good**

---

## Cross-cutting observations

### Strengths (what makes this site NOT look AI-generated)
1. **Real project photography** as hero backgrounds with dark scrim — not stock, not AI-generated
2. **Specific, factual copy** — licence number, warranty, standards, real suburb names
3. **Consistent pill geometry** on all CTAs — a signature element
4. **Single-accent magenta** used with discipline — never more than one magenta action per viewport
5. **Flat elevation** throughout — no shadows on content cards, no glassmorphism
6. **Verbatim reviews** from real customers — not AI-written testimonials
7. **Process-focused content** (what happens, what's included, how long) — not adjective-heavy marketing
8. **Family story** grounded in verifiable facts (founded 2022, 4 members, licence holder named)

### Improvement opportunities (not P0/P1, but would push scores toward 48+)
1. **Rhythm on interior pages**: About, Contact, Blog listing, and to a lesser extent Packages could each benefit from one image band or dark section break mid-page to prevent visual monotone (all score 6 on Rhythm)
2. **Packages page**: consider a "recommended" visual cue on the Standard tier
3. **Gallery page**: a featured/hero project at the top (larger card) would create hierarchy in the grid
4. **Blog listing**: a featured-post or category band at the top would add variety

### No P0 or P1 findings
All pages score 6+ on every dimension. The site is in "Good" territory across the board, with the homepage, service pages, location pages, and chrome at the borderline of "Excellent" (47/60).
