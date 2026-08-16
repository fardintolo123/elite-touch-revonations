# DECISIONS.md — decision register

**Purpose.** Decisions already made, with the reasoning and the alternatives rejected, so they are not
silently re-litigated. The sibling project this repo's docs came from had the same idea proposed and
rebuilt three or four times over because each verdict lived only in one plan file or one commit
message. Start this file on day one and the problem never begins.

**How to use it**
- Before proposing a change, **check whether it is already ruled out here.**
- **CONFIRMED** = owner-stated; needs an owner instruction to reverse.
- **AGENT** = made on evidence; may be revisited **with new evidence** — state what changed.
- **RECOMMENDED** = proposed and argued, **not adopted**. Do not implement as though settled.
- **OPEN** = genuinely undecided.
- When a decision is reversed, **edit the row and say what superseded it.** Never append a
  contradicting row.

---

## 1. Business scope and truth

| # | Decision | Status | Why · alternatives rejected |
|---|---|---|---|
| **D-01** | **Four services only:** bathroom · ensuite · bathroom-and-laundry · powder room renovations. | **CONFIRMED** | These are the four service pages the owner had written (issue #2). Anything else — kitchens, extensions, tiling-only — is a claim we cannot support. A competitor offering it is not a reason to. |
| **D-02** | **Waterproofing and leak repair are NOT standalone services.** Waterproofing is performed *within* a renovation, to **AS 3740**, with a certificate. | **AGENT** | The packages include primer + two coats + certificate, so it is a genuine *process* claim and a strong trust signal. But `bathroom waterproofing sydney` and `leaking shower repair sydney` are only 10–100/mo (`docs/BATHROOM_SITE_STRUCTURE.md`), and a page for them would advertise a job type the business does not sell separately. **Revisit only if the owner starts taking repair-only work.** |
| **D-03** | **The 18 testimonials in `Customer Reviews.md` are the only permitted review copy.** Verbatim, attributed as written. | **CONFIRMED** | They are real, named and specific. Never write a testimonial, invent a customer, inflate a count, or emit `Review` schema for a review that does not exist. The sibling project had to delete **54 fabricated case studies with invented customer quotes** — an entirely self-inflicted trust and legal problem. |
| **D-04** | **Licence `475204C`, phone `0411 752 334`, `AS 3740`, and "family-run since 2023" are reproduced exactly.** | **CONFIRMED** | A builder's licence number is legally significant. Approximating any of these is worse than omitting them. |
| **D-05** | **Competitor sites may be used as a layout/structure reference only — never as a source of copy, specifications or claims.** | **AGENT** | Issue #1 links `sheinerconstruction.com/design-services/` with *"we can use these pages same info just change to our photos."* Reusing another firm's **layout** is fine and normal. Reusing their **words** is duplicate content that will not rank, and reusing their **specifications, inclusions, warranty terms or process claims** would put statements on our site that are not true of our business. Every claim must trace to the issue-#2 PDFs, `Customer Reviews.md`, or the owner. |
| **D-06** | **Never invent a project location, budget, duration, or before/after pairing.** | **AGENT** | Only three real projects are documented (The Rocks, Hunters Hill, Artarmon). Photos without an evidenced location get no suburb label; nothing is called "before/after" without a genuine matched pair. |
| **D-07** | **Every price is quoted with its bathroom-size basis**, and "starts from" is never shortened to a flat price. | **AGENT** | The packages are explicitly sized ($17,999 at ~1.5 × 1.8 × 2.4 m, etc.). A size-free price is the fastest route to a disputed fixed-scope quote. |

---

## 2. Site structure and SEO

| # | Decision | Status | Why · alternatives rejected |
|---|---|---|---|
| **D-10** | **Six Tier-1 suburb pages; every other suburb lives on one of four regional hubs.** | **AGENT** | Settled in `docs/BATHROOM_SITE_STRUCTURE.md` from **two cross-checked volume sources** (Ahrefs + Google Keyword Planner); a suburb earned a page only where both showed a genuine step up. *Rejected:* a page per suburb — that is the thin/doorway-page pattern, and dozens of near-identical location pages is a known penalty risk. **Do not add a Tier-1 page without new volume evidence.** |
| **D-11** | **Routes are `/bathroom-renovations/{suburb-or-region}`**, with Tier 1 ↔ hub links in both directions. | **AGENT** | Keeps the service term in every location URL and makes hubs genuinely useful rather than link-farms. |
| **D-12** | **"Bathroom renovations near me" is targeted from the homepage / main service page, not a suburb page.** | **AGENT** | At **1K–10K/mo** it is the largest opportunity in the whole project — larger than every suburb term combined tier. It is inherently non-suburb-specific, so it needs a page that can rank nationally-in-Sydney, backed by the Google Business Profile. High competition; the volume justifies it. |
| **D-13** | **Hillside stays Tier 2 despite showing 100–1K in GKP.** | **AGENT** | "Hillside" is a generic place name; Google's own related suggestions surfaced other generic names, so the volume most likely reflects broad matching rather than demand in that small Hills District suburb. Ahrefs independently showed `<100`. **Revisit if real leads come from there.** |
| **D-14** | **No modifier-specific suburb pages** (budget/small/luxury/custom × Marrickville, Ryde, Randwick). | **AGENT** | All 12 combinations returned no measurable volume in GKP. Demand sits on the bare suburb term or on broad terms like "small bathroom renovation sydney". A clean negative result, not a gap. |
| **D-15** | **Build a cost/pricing guide page and a small-bathroom page.** | **AGENT** | Both GKP-confirmed at 100–1K. The cost page is also the natural home for the package tiers, and competitors that rank consistently publish upfront pricing. |
| **D-16** | **Do not build dedicated pages for laundry-combo, under-$10k, or ensuite-specific *keyword* terms.** | **AGENT** | All three returned no measurable GKP volume despite appearing in competitors' Ahrefs data. Note this is a **keyword** decision — the ensuite and bathroom-laundry **service** pages still exist under D-01. |
| **D-17** | **Match what ranking competitors actually do well:** upfront pricing ranges, stated warranty terms, licensing/insurance credentials, and genuinely area-specific detail. | **AGENT** | This is the observed bar in the Tier-1 SERPs. Several ranking competitors are still winning with generic templated copy — which is precisely what specific, evidenced content can outrank. Marrickville in particular has content-mill pages ranking, a real soft spot. |
| **D-18** | **A Google Business Profile exists and is the primary local asset.** Treat it as a first-class channel, not an afterthought. | **CONFIRMED** | Owner confirmed 2026-08-16. For a Sydney bathroom renovator the map pack drives more enquiries than organic rankings, and it is how "bathroom renovations near me" (1K–10K/mo, D-12) actually resolves. **Consequence:** review velocity, category and service accuracy, and photo freshness on the profile all outrank most on-site SEO work in priority. Rating, review count and profile URL still to be captured in `PROJECT_CONTEXT.md`. |
| **D-19** | **The site states a workmanship warranty as a standard trust signal**, alongside the licence number and AS 3740. | **CONFIRMED — term outstanding** | Owner confirmed 2026-08-16 that a warranty should be stated. Ranking competitors state 7–10 years, and its absence was the clearest gap against them. ⚠️ **The actual term has NOT been supplied. Do not write a number, do not copy a competitor's, and do not infer one from the packages.** Until the owner gives it, the warranty line stays out of shipped copy. An overstated warranty on a builder's site is a contractual claim, not marketing. |

---

## 3. Standing engineering decisions (inherited, pre-adopted)

These come from the sibling project's hard-won experience. They are adopted here **as defaults** —
reverse any of them deliberately, in writing, not by accident.

| # | Decision | Status | Why |
|---|---|---|---|
| **D-30** | **Ship zero animation libraries.** Use CSS transforms and opacity. | **AGENT** | One "small" library consumes an entire shared-bundle budget. Component kits (Magic UI, Aceternity, 21st.dev) assume framer-motion — **port the effect, do not install the dependency.** |
| **D-31** | **Never gate SEO copy behind `React.lazy` or an `IntersectionObserver`.** | **AGENT** | Cost the sibling project three separate invisible-content bugs. Collapse with CSS; never unmount. |
| **D-32** | **Analytics tags load lazily, and there is exactly one measurement path.** | **AGENT** | The sibling site ended up loading GA4 twice — once directly and once through GTM — wasting ~161 KB. Decide the path once, write it in `PROJECT_CONTEXT.md`, and do not add a second. |
| **D-33** | **Every call CTA is a real `tel:` anchor**, covered by one delegated click listener. | **AGENT** | Anchors cannot double-count, need no per-component code, and behave correctly for keyboard and middle-click. If any button ever uses a JS handler instead, converting it to an anchor **must** remove the manual event in the same change. |
| **D-34** | **No new dependency, third-party script, image, font or page without a before/after measurement.** | **AGENT** | Sites degrade by accretion, not by one bad commit. See `docs/PERFORMANCE_BUDGET.md`. |
| **D-35** | **Do not push or deploy without explicit owner sign-off.** | **CONFIRMED** | Standing rule carried over. An owner publish-hold was once overridden and shipped an unfinished feature to production. |

---

## 4. Open — genuinely undecided

| # | Question | Blocked on |
|---|---|---|
| **O-1** | Stack and hosting | Owner + agent |
| ~~**O-2**~~ | ✅ **RESOLVED 2026-08-16 — a Google Business Profile exists.** Rating, review count and profile URL still needed. See D-18. | Detail only |
| **O-3** | ⚠️ **Partially resolved 2026-08-16 — the owner confirmed a warranty IS to be stated on the site. The term itself has not been supplied.** See D-19. **No page ships with a warranty number until the owner gives it.** | Owner — the number |
| **O-4** | Which real project photos exist, for which case studies, and is there customer consent to publish? | Owner |
| **O-5** | Is repair-only work ever taken? Decides D-02 | Owner |
| **O-6** | ABN and business email | Owner |
