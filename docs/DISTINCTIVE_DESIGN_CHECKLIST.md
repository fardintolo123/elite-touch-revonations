# Distinctive Design Checklist — the site must not look AI-generated

**Status:** standing QA gate for every page, section and component, new and existing. Owner
instruction 2026-10-28 ([DECISIONS.md](../DECISIONS.md) D-158).

**Source:** the owner's playbook *"Build websites that don't look AI-generated"* (PDF supplied in chat,
2026-10-28). This file is our adaptation of it to Elite Touch Renovations.

**How it relates to the other docs.** [DESIGN.md](../DESIGN.md) stays authoritative for tokens,
components, motion and section recipes. [PRODUCT.md](../PRODUCT.md) stays authoritative for users
and anti-references. This file adds two things:
- **the AI-look lens**: what "generic" looks like here.
- **the rendered-page gate**: proof from screenshots, not from reading code.

When this file and DESIGN.md seem to disagree, DESIGN.md wins. Raise the conflict as an owner
question, with screenshots; do not quietly redesign the system.

---

## 1. The rule

> Before building or changing any page, section or component, write down what makes it specific to
> Elite Touch Renovations: which real project photo, verbatim review or verifiable fact leads. Avoid
> the AI-default patterns in §3 unless one genuinely serves the content. Inspect the **rendered**
> page at 390px and 1440px. Keep real proof, the call/enquiry path, SEO, accessibility and speed
> intact. Refine until it reads as designed for this family business, not filled in from a template.
> Code that builds is not "done". The rendered page is what gets judged.

The playbook's caveat applies: **no pattern is banned outright.** A pattern fails when it is used by
default, with no reason tied to the business. When you keep one, write the reason in the issue or
PR.

## 2. What an Elite Touch page is made of

Lead with these. Effects never replace them.

1. **Real project photography, identified honestly.** Imagery is evidence, not decoration
   (PRODUCT.md). Use the documented case studies and gallery projects. Follow the image pipeline in
   CLAUDE.md; never imply a suburb or a before/after pair we cannot evidence.
2. **The family and the process.** The four Dawood family members and their roles, the
   written-scope quote, AS 3740 waterproofing, managed trades, care in the home. Reviews repeatedly
   praise communication, punctuality and cleanliness, so lead with those.
3. **Verifiable facts.** Licence 475204C, 10-year workmanship warranty, "family-run since 2022",
   package from-prices with their size basis, verbatim reviews from `Customer Reviews.md` only.
4. **DESIGN.md's identity.** Magenta as the one loud colour, used only for the primary action. Jost
   headings at medium weight. Flat tone elevation. The light / full-bleed image / ink band rhythm.
5. **Careful, warm, accountable voice.** A considered high-value purchase, not urgency.

**Signature elements: one or two per page.** DESIGN.md already defines the site's signatures: the
hero's floating info card overhanging the image edge, and full-bleed image bands under a scrim. Add
nothing beyond them without a reason written in the issue. Every other section stays plain and is
carried by photos, facts and reviews.

## 3. AI-default patterns: how they show up here

| # | Pattern (from the playbook) | Signal in this codebase | Standard | Allowed by DESIGN.md |
|---|---|---|---|---|
| 1 | Purple/blue gradients, glowing backgrounds, glassmorphism | `linear-/radial-gradient` other than the image scrim; `backdrop-filter`; glow shadows | No decorative gradients, glows or glass. Magenta is the only saturated hue (DESIGN.md §1, §2.6) | The §9 image scrim |
| 2 | Template layout: centred hero, then three identical feature cards | `et-grid-3` of look-alike cards straight after a heading | Choose the layout for the content: process → numbered rows, comparison → the §8.11 table, proof → photos and named reviews. Use three-up only when each item carries different real content | §4.4 "Insights" 3-up grid of real articles |
| 3 | Pill badges, large radii, floating cards in every section | `et-eyebrow`, badges, `radius-lg`/`xl` cards, floating cards | Pills and radii are **DESIGN.md system choices**: keep them. What fails is *volume*. One floating card per page (the hero's); badges only where they carry a fact | Pill controls, chips, eyebrows, card radii (§5.1) |
| 4 | Empty marketing copy ("Transforming your vision into reality") | Phrases like *transform your*, *dream bathroom*, *elevate*, *second to none*, *top-notch*, *look and feel*, *peace of mind*, *hassle-free*, *we pride ourselves* | Headlines name the room, the suburb or region, the problem, the process step or the proof. A phrase hit is a prompt to rewrite, not an automatic fail: *seamless* is literal in tiling copy | **Verbatim reviews are never edited** |
| 5 | Repetition: same type, spacing, components and layout everywhere | An `et-eyebrow` above every H2 (56 in source; 7 on the homepage's 6 sections); the same eyebrow → H2 → lead → grid stack in consecutive sections | Each section has one job, with a composition fitted to it. Consecutive sections never share a composition (DESIGN.md §4.4 band rule). If the eyebrow-per-section rule itself reads as templated in screenshots, raise it as owner question O-12. Do not drop eyebrows silently | §8.5 eyebrow chip |
| 6 | Unnecessary movement | `et-section-enter` / `et-child-enter` reveals, hover lifts on non-interactive blocks | Motion must explain or give feedback. Reveals run once, never delay reading, and honour `prefers-reduced-motion` (DESIGN.md §6) | §6 reveals and hover rules |
| 7 | Weak authenticity: stock-looking visuals, few real details | Unapproved images from `ETR images/`, template marketing graphics, icon tiles in place of photos, unattributed numbers | Approved project photos first (`docs/IMAGE_INVENTORY.md`). Every number traces to `lib/businessInfo.ts`, the packages source or `Customer Reviews.md` | — |

## 4. Section test: run it on every section

A section passes only if every answer is acceptable.

1. **Job.** Can you say its one job in one sentence?
2. **Swap test.** Put another Sydney renovator's name where ours is. If the section is still true and
   still looks right, it is generic. Add the real photo, review, family member, process step or fact
   that only we can claim.
3. **Proof.** Does it carry at least one piece of evidence: a project photo, a verbatim review, the
   licence, the warranty, AS 3740, or a package price with its size basis? (Legal pages are exempt.)
4. **Composition.** Is its layout different from the section above? Was the layout chosen for the
   content?
5. **Copy.** Is the headline concrete, with no §3.4 phrases (unless literal)? Does it pass
   [CONTENT_QUALITY_CHECKLIST.md](CONTENT_QUALITY_CHECKLIST.md) and `npm run check:readability`?
6. **Effects.** Does every effect help someone understand or act? Is the page within its signature
   budget?
7. **Conversion.** Does the call/enquiry path stay visible and uncontested? Do CLAUDE.md's
   Conversion Rules still pass?
8. **Cost.** No new dependency or animation library, within
   [PERFORMANCE_BUDGET.md](PERFORMANCE_BUDGET.md).

## 5. Workflow (new work and audits)

1. **Read** PRODUCT.md, DESIGN.md, this file and DECISIONS.md.
2. **Direction before code.** In the issue or PR, write 2–3 sentences: what the page or section must
   prove, which real asset leads, and which DESIGN.md recipe fits.
3. **Build** from DESIGN.md tokens and existing components.
4. **Render.** Fresh production build on an unused port (CLAUDE.md Testing Workflow). Take full-page
   screenshots at **390×844** and **1440×900** with Playwright.
5. **Independent critique.** A reviewer that did not build it (the `vision-auditor` subagent, or an
   `impeccable` critique in a fresh context, saved to `.impeccable/critique/`) gets only the
   screenshots and this file. Findings go in the §6 format.
6. **Fix** the highest-impact findings, re-render and compare before/after. Repeat until no P0/P1
   remains.
7. **Gate** with build, readability, SEO/AEO/GEO and performance checks for the task class.

**For audits of existing pages: preserve what works.** The 2026-09-29 homepage critique
(`.impeccable/critique/`) found the homepage does *not* look AI-generated (33/40). Its problems were
mobile header height and the order of proof. Fix findings; do not redesign. Keep URLs, metadata,
structured data, internal links, call tracking and SEO copy unless a finding is about them.

## 6. Findings format

| # | Priority | Problem | Where (route · section · viewport) | Why it weakens the page | Replace with | Expected benefit | Evidence |
|---|---|---|---|---|---|---|---|

Priority: **P0** breaks trust or the enquiry path · **P1** visibly generic or templated ·
**P2** polish. Rank by effect on trust, clarity and enquiries. Leave out purely subjective
preferences.

## 7. What proves it is right (evidence beyond the agent's opinion)

Required before a design change or audit issue is "done":
- [ ] **Before and after screenshots** at 390 and 1440, attached to the issue or PR.
- [ ] **The pattern scan** (§3 signals) finds no new hits. Use `npm run check:design` once #79
      lands; until then, grep the signals in §3.
- [ ] **An independent critique** reports no remaining P0/P1 findings.
- [ ] **Conversion rules pass:** service + location in the H1, tap-to-call visible on mobile, real
      proof visible early, call tracking intact.
- [ ] **Performance:** mobile Lighthouse at or better than Google's Core Web Vitals (LCP ≤ 2.5 s,
      INP ≤ 200 ms, CLS ≤ 0.1). The stricter budgets in `docs/PERFORMANCE_BUDGET.md` win.
- [ ] **Readability** inventory covers every published route and passes.

Strongest checks, owner-run when a page changes a lot:
- **5-second test** with someone outside the business. Show the page on a phone for 5 seconds. Can
  they say what we do, where, and what happens next? Does it look like a real family business or a
  template? Record their answer in the issue.
- **Enquiry data.** Compare the changed page's enquiry and call events for 4 weeks after the change
  with the 4 weeks before.

## 8. Route-class tracker

One issue per route class, all under tracker #73. Each issue audits, fixes and verifies its own class.
Shared components belong to the sitewide issue (#78). Page issues hand shared findings to it.
Each issue edits only its own row below. Status: `open` → `audited` → `fixed` → `verified`.

| Route class | Routes | Issue | Status |
|---|---|---|---|
| Homepage | `/` | #74 | fixed + verified on a local production build 2026-10-29 (two independent critiques, no P0/P1 left); uncommitted, not deployed |
| Service + location pages | `/services`, 4 × `/services/[slug]`, 11 published `/services/bathroom-renovations/[location]` | #75 | open |
| Proof + company pages | `/gallery`, 11 × `/gallery/[slug]`, `/packages`, `/about-us`, `/contact-us` | #76 | open |
| Blog | `/blog`, `/blog/[slug]` | #77 | open |
| Sitewide chrome + shared components | header, footer, `ContactSection`, `EnquiryForm`, `PageHero`, `WorkStrip`, `GoogleRating`, `AreasServedLinks`, reveal motion, `globals.css` | #78 | open |
| Prevention | `npm run check:design` scanner + workflow | #79 | open |

## 9. Baseline at adoption (source scan, 2026-10-28)

These are starting points for the issues, not a complete audit.

- No decorative gradients, glass or blue/purple in source. DESIGN.md is already strict here.
- **Repetition risk:** 56 `et-eyebrow` uses across the routes. The homepage has 7 eyebrows across 6
  sections, the service page 6 across 7. This needs a rendered check against pattern 5.
- **Motion:** section and child reveal animations in `app/globals.css`. These need a check against
  pattern 6.
- **Copy:** the phrase hits were literal ("seamless" for grout-free surfaces) or verbatim reviews.
  Nothing to change from the scan alone.
- **Known open finding:** P1 mobile sticky header height (~377px at 390×844) in the 2026-09-29
  critique. Re-check it on the current build before acting.
