# SEO / AEO / GEO Checklist

The final QA pass for **every new page or section** before it ships. Search (SEO), Answer engines
(AEO — featured snippets, voice) and Generative engines (GEO — AI Overviews, ChatGPT, Perplexity).

Companion docs: [SEO_CONTENT_GUIDE.md](SEO_CONTENT_GUIDE.md) for *what to write*,
[CONTENT_QUALITY_CHECKLIST.md](CONTENT_QUALITY_CHECKLIST.md) for *how it should read*,
[BATHROOM_SITE_STRUCTURE.md](BATHROOM_SITE_STRUCTURE.md) for *which location pages exist at all*.

---

## Phase 0 — crawl-control foundations
*Verify once when the site is set up, then re-verify whenever routing changes.*

- [ ] **One canonical URL form** — consistent protocol (https), host (www vs bare), and trailing-slash
      policy. Pick one, redirect the rest, never mix.
- [ ] **`robots.txt` does not block CSS or JS.** Engines must render the page to judge it.
- [ ] **Self-referential canonical on every indexable page**, including any URL reachable with query
      parameters.
- [ ] **`sitemap.xml` contains only 200-status, indexable, canonical URLs.**
- [ ] **Every not-found branch sets `robots: index:false, follow:false`** — see
      [PROJECT_CONTEXT.md](../PROJECT_CONTEXT.md) §4.3. A sitewide `index, follow` default is
      inherited by 404 bodies and creates unbounded soft-404s.
- [ ] **AI crawlers are allowed** (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) unless the owner
      decides otherwise — for a local trade business, being citable in AI answers is upside.
- [ ] **`llms.txt` is present if maintained**, generated from the same source data as the site.
      Google's [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features)
      and [June 2026 changelog](https://developers.google.com/search/updates) say AI-specific files
      are not needed for Search and do not improve or harm visibility, so do not invest further in it
      unless another named system starts using it.

## Phase 1 — in-code foundations

- [ ] **Metadata**: title **30–60 chars**, description **50–160 chars**, unique across the site.
- [ ] **One `<h1>` per page**, carrying the service and — on a location page — the suburb.
- [ ] **JSON-LD for the page type:**
  - [ ] `LocalBusiness` (or `HomeAndConstructionBusiness`) — **declared once sitewide**, not
        re-declared per page. Include the licence number, phone, service area and opening hours.
  - [ ] `Service` on each service page.
  - [ ] `FAQPage` where a real FAQ block exists. Google's
        [May/June 2026 changelog](https://developers.google.com/search/updates) says FAQ rich
        results stopped showing in Search on 7 May 2026 and the FAQ rich-result docs were removed;
        keep the markup for entity clarity and AI/answer extraction, not as a SERP-feature promise.
  - [ ] `Article` on guides and case studies.
  - [ ] `AggregateRating` / `Review` **only if the reviews are real and displayed on the page.**
        The 19 in `Customer Reviews.md` qualify; nothing else does. **Never emit rating markup for a
        rating that is not shown, and never invent a count.**
- [ ] **`og:image`** present, a real 1200×630 crop, not a portrait photo squeezed into the slot.

## Phase 2 — indexation control

- [ ] **Sitemap segmented** — pages vs. case studies/guides.
- [ ] **`lastmod` changes only for meaningful content changes**, not a CSS tweak. Fake freshness is
      a trust signal spent for nothing.
- [ ] **No thin location pages.** Only the six Tier-1 suburbs get a URL; every other suburb is a
      *listing* on its regional hub. This is the deliberate guard against the doorway-page pattern —
      see [DECISIONS.md](../DECISIONS.md) D-10.
- [ ] **Internal links point at the canonical URL form**, never a redirecting variant.
- [ ] **Publication is three things:** body content **+** an internal link from a relevant hub **+** a
      sitemap entry. A sitemap entry alone is not publication.

## Phase 3 — on-page, AEO and GEO

- [ ] **Answer-first.** The direct answer sits in the first paragraph — no throat-clearing intro.
      This is what gets extracted into a snippet or an AI answer.
- [ ] **Question-shaped H2s** that match how people actually ask ("How much does a small bathroom
      renovation cost in Sydney?"), each answered immediately underneath.
- [ ] **Self-contained passages.** An AI engine lifts a paragraph without its context — each one
      should still be true and attributable on its own.
- [ ] **Concrete, checkable specifics beat adjectives.** "Waterproofed to AS 3740 with primer and two
      coats, certificate supplied" is citable. "Premium quality workmanship" is not.
- [ ] **Entity clarity** — business name, suburb, service and licence stated in plain text, not only
      in an image or a logo.
- [ ] **A real FAQ block** (4–6 questions) on commercial pages, in always-rendered markup.
- [ ] **Trust signals visible on the page**, not just in schema: licence number, standards, family-run
      since 2022, free on-site measure, fixed-scope written quote, 10-year workmanship warranty.
- [ ] **RSL 1.0 licensing considered only if relevant.** It is intentionally skipped for ETR while
      the site has no premium research, data product or original tool to license for AI use.

## Phase 4 — conversion (a renovation page that ranks but does not enquire has failed)

- [ ] **Service + suburb in the H1** on location pages.
- [ ] **Tap-to-call visible without scrolling on mobile** — `0411 752 334` as a real `tel:` anchor.
- [ ] **Primary CTA present and specific** — "Book a free on-site measure" beats "Contact us".
- [ ] **Real proof above or near the fold** — a named testimonial from `Customer Reviews.md`, or the
      Google rating once a Business Profile exists.
- [ ] **3-second clarity:** what we do · where · what happens next.
- [ ] **Price context where relevant**, always with its size basis ([DECISIONS.md](../DECISIONS.md)
      D-07). Competitors that rank consistently publish pricing.

## Phase 5 — pre-ship validation

- [ ] **The copy is in the served HTML** — `curl` the URL and grep a distinctive phrase. Lazy-loaded
      or accordion-hidden content is invisible to crawlers and to AI engines.
- [ ] **Structured data validates** (Rich Results Test / schema validator), with no warnings about
      missing required fields.
- [ ] **Rendered in a real browser**, desktop and 390 px mobile.
- [ ] **Performance gate met** — [PERFORMANCE_BUDGET.md](PERFORMANCE_BUDGET.md) §6.
- [ ] **No invented facts.** Every claim traces to the issue-#2 PDFs, `Customer Reviews.md`,
      `PROJECT_CONTEXT.md`, or an owner message.

---

## Local SEO — the channel this business lives on

For a Sydney bathroom renovator, the **Google Business Profile drives more enquiries than organic
rankings do**, and "near me" queries (1K–10K/mo — the largest opportunity in this project) resolve
largely through the map pack. Organic and local are separate channels; do not judge one by the other's
numbers.

- [ ] **NAP consistency** — the business name, `0411 752 334` and the address form are byte-identical
      everywhere they appear: site, Business Profile, and every directory listing.
- [ ] **Business Profile complete** — correct primary category, all four services listed, service
      areas matching the four regions, real project photos, opening hours.
- [ ] **Reviews: Google first.** Do not split review requests across platforms — the map pack is fed
      by Google reviews, and splitting velocity weakens the only listing that matters. The 18 existing
      testimonials suggest customers are willing; the ask is what is missing.
- [ ] **A handful of genuine local signals beats fifty random backlinks** — trade accreditations,
      supplier listings, local business associations. **No paid guest posts, no link schemes, ever.**
- [ ] **Measure both** Business Profile insights (calls, direction requests, profile views) **and**
      on-site phone-click events. Neither alone is the picture.
