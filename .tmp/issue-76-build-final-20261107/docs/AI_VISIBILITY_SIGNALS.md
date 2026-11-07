# AI visibility signals — coverage matrix

**What this is.** The owner supplied two lists on 2026-11-02 (Neil Patel, Instagram): *"25 Things AI
Looks at to judge Your Business"* and *"34 Ways Customers Search For You"*. This file records, item by
item, what Elite Touch already has, what was built to close a gap, and what cannot be done inside this
repository because it depends on the owner or on the open web.

**How to use it.** Treat it as a checklist, not a scoreboard. A ✅ means the thing exists and was
verified in the served HTML or in the live data — not that it ranks. Re-verify before citing a row;
`CLAUDE.md`'s source-of-truth hierarchy puts the code above this document.

**Related:** [plans/long-tail-buyer-queries-2026-10.md](../plans/long-tail-buyer-queries-2026-10.md)
owns the Search Console workstream behind the 34-ways list (issues #80–#85). This file does not
re-open those; it records their state.

---

## Part 1 — the 25 signals AI uses to judge a business

Twelve of the 25 are on-site and ours. Thirteen are off-site reputation: they are earned, not coded.

### On-site — ours to build

| # | Signal | State | Where |
|---|---|---|---|
| 1 | Answer in the first two sentences | ⚠️ **Partial.** Every post opens with its `description` as a lead paragraph, and 16 of 78 titles are literal questions. Only 7 posts carry the strong `quickAnswer` block (short answer + table + CTA). Service, package, hub and suburb pages all answer above the fold. | `app/blog/[slug]/page.tsx`, `lib/blog.ts` |
| 2 | Question-shaped headings | ✅ 290 FAQ questions across the guides, plus 13 on the homepage, 5 on `/packages/`, 4 per suburb page and 13 across the service pages. 84 of 516 body headings are questions. | `lib/blog.ts`, `lib/businessInfo.ts`, `lib/suburbContent.ts`, `lib/hubContent.ts` |
| 3 | Last-updated date | ✅ **Closed 2026-11-02.** Dates were visible on the page but absent from structured data. Every post now emits `datePublished` and `dateModified`, repeats both in a visible byline, and the sitemap dates each post to its own real date instead of a blanket content-pass date. | `lib/schema.ts` `buildArticleNode`, `app/sitemap.ts` |
| 4 | Real statistics | ⚠️ **Partial, and deliberately so.** Real published figures: three package starting prices against stated room sizes, three build durations, a 10-year workmanship warranty, $20m public liability, 19 reviews. No market statistics are quoted, because none have been sourced. | `lib/businessInfo.ts` |
| 5 | Original data | ❌ **Owner-side.** The business has data nobody else has — completed-job counts by suburb, typical variation causes, how often a hidden problem appears after demolition. None of it has been supplied, and none may be estimated. |
| 6 | Named sources | ✅ External claims link to the authority, not to a blog: NSW licence register, NSW home building contracts, the NCC wet-area provisions, AS 3740-2021, HIA, WELS. | `lib/businessInfo.ts` `authorities`, `components/ExternalLink.tsx` |
| 7 | Author bio | ✅ **Closed 2026-11-02.** The guides had no byline at all. Every post now ends with a block naming the four family members, Omar's NSW Builder Licence, Adam's 25+ years, the publication date and a link to the team page. `author` and `publisher` in schema both resolve to the business entity. **No personal byline was invented** — the guides are published by the business, and claiming a named person wrote or reviewed each one would be a fabricated credential. | `app/blog/[slug]/page.tsx`, `lib/schema.ts` |
| 8 | Pricing page | ✅ `/packages/` publishes three tiers — Basic from $18,000, Standard from $25,000, Premium from $30,000 — each tied to a stated bathroom size, with inclusion lists and five FAQs. | `app/packages/page.tsx` |
| 9 | Comparison pages | ✅ Thirteen "X vs Y" guides: ensuite vs bathroom vs powder room, walk-in shower vs bathtub, porcelain vs ceramic, matt vs gloss, frameless vs semi-frameless, wall-hung vs floor-mounted, wall-hung vs back-to-wall, double vs single vanity, apartment vs house, DIY vs professional, fixed-scope vs provisional sums, bathroom-laundry combo worth it, repair-vs-renovate decisions inside the cost guides. **Competitor-name comparisons are held** — see the 34-ways table below. |
| 10 | Review count | ✅ 5.0 from 19 Google reviews, shown on the homepage, contact page, service pages and location pages, and emitted as `aggregateRating`. The 19 verbatim testimonials are published in full on `/about-us/`. | `components/GoogleRating.tsx`, `lib/reviews.ts` |
| 11 | Review recency | ❌ **Owner-side.** `Customer Reviews.md` carries no dates, so none can be shown. Dating a review that has no date breaks D-03. The fix is more recent reviews on the Google profile, not code. |
| 12 | Owner replies | ❌ **Owner-side.** Replying to Google reviews happens in the Google Business Profile. |
| 13 | What reviews say | ✅ All 19 reviews are rendered verbatim and eagerly on `/about-us/`, with the reviewer's name as written. Hub pages carry a named testimonial each. The reviews repeatedly praise communication, punctuality and cleanliness, and the site leads with those because they are evidenced. | `app/about-us/page.tsx`, `lib/hubContent.ts` |
| 14 | Same name, address, phone everywhere | ✅ On-site: one source of truth. Name, phone `0411 752 334`, email, Granville NSW, ABN and ACN all come from `lib/businessInfo.ts` and appear in the footer, the contact page and `LocalBusiness` schema. ⚠️ Off-site consistency across directories is owner-side and still deferred (D-142). | `lib/businessInfo.ts` |
| 15 | Matching hours | ✅ Mon–Fri 07:00–17:30 and Sat 08:00–15:30 are published on the site and in `openingHoursSpecification`. ⚠️ They must match the Google Business Profile — owner to confirm. | `lib/schema.ts` |
| 24 | Topic depth | ✅ 78 guides across planning, cost, process, materials, fittings, compliance and aftercare, plus 4 service pages, 3 regional hubs, 6 suburb pages and 11 photographed projects. **Closed 2026-11-02:** `/llms.txt` listed none of the guides, so an answer engine reading the AI-facing index saw a 15-page site. All guides are now listed. | `app/llms.txt/route.ts` |
| — | Schema markup | ✅ `HomeAndConstructionBusiness`/`Organization` with licence, ABN, ACN, geo, hours, `aggregateRating` and a service `OfferCatalog` carrying the 10-year `WarrantyPromise`; `WebSite`; per-page `WebPage`/`CollectionPage`; `BreadcrumbList`; `FAQPage`; `Service` per service, hub and suburb; `CreativeWork` + `ImageObject` on projects. **Closed 2026-11-02:** `BlogPosting` on all 78 guides and `CollectionPage` on the blog index, which previously had no structured data at all. | `lib/schema.ts` |

### Off-site — earned, not coded

None of these can be built in this repository. They are recorded so they are not mistaken for site
work, and so the owner can see where the remaining leverage actually sits.

| # | Signal | What moves it |
|---|---|---|
| 16 | YouTube mentions | A channel, or appearing in someone else's video. The site has no YouTube profile in `socialProfiles`. |
| 17 | Reddit mentions | Genuine participation in Sydney and renovation subreddits. Astroturfing is both against Reddit's rules and a reputational risk. |
| 18 | Brand mentions on other sites | Directory listings, supplier pages, trade-association profiles. This is the deferred citation work in **D-142** and remains the largest untouched lever. |
| 19 | News coverage | Local press, trade press, industry awards. |
| 20 | "Best of" lists | Local round-ups of Sydney bathroom renovators. |
| 21 | Backlinks | Follows from 18–20. The site is a new domain (D-142); links are the bottleneck, not on-page work. |
| 22 | People searching your name | Brand search volume. Driven by jobs completed, signage, vehicle livery, word of mouth and the Google profile. |
| 23 | Google ranking | Tracked through Search Console; see `plans/seo-quarterly-review.md`. |
| 25 | How recently you were mentioned | Recency of 16–20. A citation from 2024 is worth less than one from this quarter. |

---

## Part 2 — the 34 ways customers search

`X` = bathroom renovation. Each row says whether a page on this site answers that shape of question.

| # | Query shape | Covered | Where |
|---|---|---|---|
| 1 | How much does X cost? | ✅ | `/packages/`, the cost and hidden-costs guides, a cost FAQ on every suburb and hub page |
| 2 | How long does X last? | ✅ | Warranty guide, grout guide, waterproofing guides, 10-year workmanship warranty |
| 3 | Who's the best X near me? | ✅ | "How to choose a bathroom renovator in Sydney", "Questions to ask a bathroom renovator" |
| 4 | When should I get X? | ⚠️ Partial | Covered inside the checklist and essential-upgrades guides; no standalone "signs it is time" page |
| 5 | Why does my X keep breaking? | ⚠️ Partial | Mould, grout, ventilation and waterproofing guides. Leak repair is **not** a service (D-02), so this stays a renovation-context answer |
| 6 | Which X is best? | ✅ | The thirteen comparison guides |
| 7 | Can I fix X myself? | ✅ | "DIY or professional bathroom renovation" |
| 8 | Will insurance cover my X? | ✅ | "Bathroom renovation insurance in Australia" |
| 9 | Do I ever need X? | ⚠️ Partial | Answered inside the add-value, resale and investment-property guides |
| 10 | Should I repair or replace X? | ⚠️ Partial | Scope and cost guides frame it; no dedicated refresh-vs-full-renovation page |
| 11 | Is X worth it? | ✅ | Add-value, resale-value, investment-property and bathroom-laundry-combo guides |
| 12 | Is X safe? | ✅ | Accessible bathrooms, ageing in place, electrical work, mould prevention, AS 3740 waterproofing |
| 13 | X versus Y | ✅ | The comparison guides |
| 14 | X or Y? | ✅ | Same set |
| 15 | X companies like [competitor] | ⛔ **Held** | Naming competitors carries Australian Consumer Law risk and the search evidence is thin (11 impressions). Decision recorded in `plans/long-tail-buyer-queries-2026-10.md` |
| 16 | Alternatives to X | ⚠️ Partial | The comparison set covers product and scope alternatives, not competitor alternatives |
| 17 | [Your company] reviews | ⚠️ Partial | All 19 reviews are on `/about-us/` and the Google rating links out from four page types. There is no dedicated `/reviews/` destination — an option, not a gap, while the review count is 19 |
| 18 | X near me | ✅ | Settled by D-12/D-138: the homepage and main service page own it, backed by 3 hubs and 6 suburb pages |
| 19 | X open now | ✅ | Hours published and in schema; `/contact-us/` carries the phone and the enquiry form |
| 20 | Same-day X | ❌ **Not offered** | A bathroom renovation takes 3–7 weeks. Claiming same-day work would be false |
| 21 | X for beginners | ✅ | "Your first bathroom renovation", the checklist and the design-process guides |
| 22 | X with bad credit | ❌ **Not offered** | No finance product. The published terms are a 30% deposit and a 30/40/30 progress schedule |
| 23 | X without insurance | ❌ **N/A** | Renovations are not an insurance-claim purchase in the way a repair is |
| 24 | Cheapest X | ⚠️ Partial | Basic from $18,000 is the honest entry point, published with its room size. The site does not compete on "cheapest" and should not |
| 25 | Most popular X | ⚠️ Partial | The trends guide and the Standard package cover it indirectly |
| 26 | Emergency X | ❌ **Not offered** | Rejected under D-02 — no emergency or leak-repair service |
| 27 | Problems with X | ✅ | Mistakes to avoid, hidden costs, scope changes, demolition surprises, neighbours and noise |
| 28 | X mistakes to avoid | ✅ | "Bathroom renovation mistakes to avoid" |
| 29 | X before and after | ✅ | Six projects carry genuine matched before/after pairs; the rest are completed-work photos and are never mislabelled (D-06) |
| 30 | How long does X take? | ✅ | The timeline guide, with a quick answer and duration table (D-144) |
| 31 | What happens after X? | ✅ | Warranty guide, waterproofing certificate guide, handover and aftercare in the process pages |
| 32 | Can I pay for X monthly? | ✅ **Answered honestly** | The 30/40/30 progress schedule is published. No finance is offered and none is implied |
| 33 | Free X quote | ✅ | Free on-site measure across Sydney, fixed-scope written quote — above the fold on every lead page |
| 34 | Is [your company] a scam? | ✅ | Licence 475204C linking to the NSW register, ABN, ACN, $20m public liability, HIA membership, 19 named verbatim reviews, 11 photographed projects, four named family members |

### The four honest "no"s

Rows 20, 22, 23 and 26 are not gaps. The business does not offer same-day work, finance, or an
emergency service, and renovations are not bought through insurance. Writing a page for any of them
would mean publishing a claim that is not true. Row 15 is held on legal risk, not on effort.

---

## What the owner can do that the site cannot

In rough order of leverage:

1. **Keep reviews coming, and reply to every one.** Signals 10, 11, 12, 13 and 17 all move together,
   and three of them are purely owner-side.
2. **Get listed.** Directory and trade-association listings with identical name, phone and address are
   signals 14, 18, 21 and 25 at once. This is the deferred citation work in D-142.
3. **Confirm the Google Business Profile hours match the site** — Mon–Fri 07:00–17:30, Sat
   08:00–15:30. Signal 15.
4. **Supply original numbers** — completed jobs, how often a hidden problem appears after demolition,
   typical variation causes. Signals 4 and 5. Nothing may be estimated on the owner's behalf.
