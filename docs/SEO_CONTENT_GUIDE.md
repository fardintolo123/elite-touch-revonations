# SEO_CONTENT_GUIDE — content & SEO playbook

The standing playbook for **any page, guide, case study or content task** on this site: what to
create, what not to, and in what order.

**How to invoke:** instead of a long brief, say *"write the Marrickville page per the SEO guide"* or
*"draft the cost guide per the SEO guide"*. This file supplies the workflow, the decision rules and
the guardrails.

> This guide **routes and decides**. Exact readability and copy thresholds live in
> [CONTENT_QUALITY_CHECKLIST.md](CONTENT_QUALITY_CHECKLIST.md); the per-page technical gate lives in
> [SEO_AEO_GEO_CHECKLIST.md](SEO_AEO_GEO_CHECKLIST.md); which location pages exist at all is already
> settled in [BATHROOM_SITE_STRUCTURE.md](BATHROOM_SITE_STRUCTURE.md). Read them; obey them over any
> default.

---

## 1. Read first

| For | Read |
|---|---|
| Business facts, services, package pricing | [PROJECT_CONTEXT.md](../PROJECT_CONTEXT.md) |
| What is already decided or rejected | [DECISIONS.md](../DECISIONS.md) |
| Which suburb pages exist, routes, volumes, competitors | [BATHROOM_SITE_STRUCTURE.md](BATHROOM_SITE_STRUCTURE.md) |
| Brand, colour, type, components | [DESIGN.md](../DESIGN.md) |
| Real testimonials | [Customer Reviews.md](../Customer%20Reviews.md) |
| Copy quality + readability rules | [CONTENT_QUALITY_CHECKLIST.md](CONTENT_QUALITY_CHECKLIST.md) |
| Per-page ship gate | [SEO_AEO_GEO_CHECKLIST.md](SEO_AEO_GEO_CHECKLIST.md) |
| Weight budgets (content adds weight too) | [PERFORMANCE_BUDGET.md](PERFORMANCE_BUDGET.md) |

---

## 2. Publishing priority

The site exists to produce **bathroom renovation enquiries in Sydney**. Rank content by how directly
it supports one:

1. **The four service pages** — bathroom · ensuite · bathroom+laundry · powder room. Draft copy for
   all four already exists on **issue #2**; start there rather than from scratch.
2. **The "near me" target** — the home page / main service page. **1K–10K searches/month, the single
   largest opportunity in the project** ([DECISIONS.md](../DECISIONS.md) D-12).
3. **The six Tier-1 suburb pages**, each with genuinely local substance.
4. **The four regional hubs.**
5. **Real case studies** — The Rocks, Hunters Hill, Artarmon. Real photos, real decisions, real
   trades, real standards. These are the strongest asset the business has after the reviews, and the
   thing competitors mostly fake or omit.
6. **The cost/pricing guide and the small-bathroom page** — both GKP-confirmed at 100–1K.
7. **Buyer-support guides** — choosing a renovator, what a quote should include, how long it takes,
   what to expect while the bathroom is out of action.
8. **Design-inspiration content** (colour schemes, tapware) — **fold into existing pages**, not
   standalone URLs, unless volume says otherwise.

**Search volume alone never justifies a page.** Before approving a new topic, compare it against
improving an existing service or suburb page, or documenting a real project. Choose whichever has the
clearer line to an actual enquiry.

---

## 3. Rules that decide CREATE vs IMPROVE

Assign exactly one status per page, with a one-line reason: **KEEP · IMPROVE · MERGE · DELETE ·
REDIRECT · CREATE**.

- **Check the page does not already exist first**, and that it is actually *published* — content **+**
  an internal link from a hub **+** a sitemap entry. Default to **IMPROVE**, not CREATE.
- **CREATE only when a specific, evidenced query has no existing home.** "Evidenced" means volume
  data, not a competitor's page and not intuition.
- **One term, one page.** Two pages targeting the same query compete with each other. The Tier-1 /
  Tier-2 split exists precisely to prevent this at suburb level.
- **Never build a page for a service we do not sell** — see [DECISIONS.md](../DECISIONS.md) D-01/D-02.
- **MERGE / DELETE / REDIRECT need first-party evidence** (Search Console: one query returning two
  URLs), never a tool's title-similarity guess.

### Report intake — before actioning any third-party SEO tool output
The sibling project triaged two external reports: between them, **19 recommendations produced 5 real
fixes.** Acting on them as written would have deleted four healthy pages and manufactured
cannibalisation. So:

1. **Triage against the existing structure first.** Several "issues" are deliberate architecture.
2. **A gap report without volume + difficulty per item cannot justify CREATE.** Competitor presence
   is not demand — it is a list of what another business chose to write about.
3. **Require the competitor's real URL list**, not topics inferred from their body copy, and require
   gaps in **both** directions. A report finding zero gaps the other way is not credible.
4. **A hub that summarises and links *down* to its spokes is correct, not duplication.**
5. **Service scope is an owner question, never an SEO inference.**
6. **Record the verdict** in `DECISIONS.md` with what new evidence would reopen it.

---

## 4. What every page must contain

- **Answer-first** — the direct answer in the first paragraph. No warm-up.
- **A keyword-focused title and H1**, service + suburb where applicable.
- **Clear H2/H3 structure**, short paragraphs, scannable.
- **Concrete specifics over adjectives.** "Waterproofed to AS 3740, primer plus two coats,
  certificate supplied" is worth more than any amount of "premium quality craftsmanship" — to
  readers, to Google, and to AI engines deciding what to quote.
- **Real proof** — a named testimonial from `Customer Reviews.md`, a real project, a real photo.
- **Pricing guidance where relevant**, always with its size basis, always "firm after a free on-site
  measure". Never invent a figure.
- **Trust signals** — licence 475204C, AS 3740, family-run since 2022, fixed-scope written quote,
  10-year workmanship warranty.
- **An FAQ block** (4–6 real questions) and a clear CTA.
- **Internal links** to the relevant hub, service and case-study pages.
- **A real photo that shows the page's subject**, with alt text describing **the photograph**, never
  the page topic. That drift is invisible to automated checks and, on a trade site, a caption claiming
  work the photo does not show is a false claim.
- Meets the [CONTENT_QUALITY_CHECKLIST.md](CONTENT_QUALITY_CHECKLIST.md) and the
  [SEO_AEO_GEO_CHECKLIST.md](SEO_AEO_GEO_CHECKLIST.md).

---

## 5. Location pages — how not to make them thin

The whole Tier-1 / Tier-2 design exists to avoid dozens of near-identical suburb pages. That only
works if the six Tier-1 pages are genuinely different from each other. Each needs:

- **A unique opening paragraph** naming the suburb — not a template with the name swapped.
- **Something true about renovating *there*.** This is the bar ranking competitors actually clear:
  heritage and Federation-era plumbing in Marrickville and Randwick, the "Garden Shire" character of
  the Hills District, apartment and strata access constraints, older slab vs. timber-floor
  substrates, parking and skip access on narrow terraces. **If nothing specific can be said truthfully
  about a suburb, that is a signal the page should not exist.**
- **A local project photo or testimonial** where one genuinely exists — and **nothing labelled with a
  suburb we cannot evidence** ([DECISIONS.md](../DECISIONS.md) D-06).
- **A link up to its regional hub**; hubs link back down.

**Marrickville is the identified soft spot** — content-mill pages currently rank there. Specific,
authoritative content has a real chance.

---

## 6. Standing guardrails — never violated by content work

- **No invented facts.** No fabricated reviews, testimonials, case studies, project locations,
  before/after pairs, prices, credentials, team sizes, or years in business.
- **The 19 testimonials are the only permitted review copy**, verbatim and attributed as written.
- **Only the four services** — see D-01. Waterproofing is a process claim, not a product.
- **Prices always carry their size basis**, and "starts from" is never shortened to a flat price.
- **Competitor sites are a layout reference only** — never a source of copy, specifications or
  claims (D-05). Issue #1's *"same info, just change the photos"* means **structure**, not words.
- **Content must not cost speed.** Every page adds images and markup on a site whose LCP will be a
  photo. Reuse the image component with a measured `sizes`; never add a third-party embed, widget or
  animation library to a content page. See [PERFORMANCE_BUDGET.md](PERFORMANCE_BUDGET.md).
- **Do not push or deploy without explicit owner sign-off.**
