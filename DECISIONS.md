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
| **D-03** | **The 19 testimonials in `Customer Reviews.md` are the only permitted review copy.** Verbatim, attributed as written. | **CONFIRMED** | They are real, named and specific. Never write a testimonial, invent a customer, inflate a count, or emit `Review` schema for a review that does not exist. The sibling project had to delete **54 fabricated case studies with invented customer quotes** — an entirely self-inflicted trust and legal problem. Kieran C's review was added 2026-08-17 — sourced from a pre-made testimonial graphic, not originally in the file, and confirmed genuine by the owner (Omar) before being added. |
| **D-04** | **Licence `475204C`, phone `0411 752 334`, `AS 3740`, and "family-run since 2023" are reproduced exactly.** | **CONFIRMED** | A builder's licence number is legally significant. Approximating any of these is worse than omitting them. |
| **D-05** | **Competitor sites may be used as a layout/structure reference only — never as a source of copy, specifications or claims.** | **AGENT** | Issue #1 links `sheinerconstruction.com/design-services/` with *"we can use these pages same info just change to our photos."* Reusing another firm's **layout** is fine and normal. Reusing their **words** is duplicate content that will not rank, and reusing their **specifications, inclusions, warranty terms or process claims** would put statements on our site that are not true of our business. Every claim must trace to the issue-#2 PDFs, `Customer Reviews.md`, or the owner. |
| **D-06** | **Never invent a project location, budget, duration, or before/after pairing.** | **AGENT** | Only three real projects are documented (The Rocks, Hunters Hill, Artarmon). Photos without an evidenced location get no suburb label; nothing is called "before/after" without a genuine matched pair. |
| **D-07** | **Every price is quoted with its bathroom-size basis**, and "starts from" is never shortened to a flat price. | **AGENT** | The packages are explicitly sized ($17,999 at ~1.5 × 1.8 × 2.4 m, etc.). A size-free price is the fastest route to a disputed fixed-scope quote. |

---

## 2. Site structure and SEO

| # | Decision | Status | Why · alternatives rejected |
|---|---|---|---|
| **D-10** | **Six Tier-1 suburb pages; every other suburb lives on one of four regional hubs.** | **AGENT** | Settled in `docs/BATHROOM_SITE_STRUCTURE.md` from **two cross-checked volume sources** (Ahrefs + Google Keyword Planner); a suburb earned a page only where both showed a genuine step up. *Rejected:* a page per suburb — that is the thin/doorway-page pattern, and dozens of near-identical location pages is a known penalty risk. **Do not add a Tier-1 page without new volume evidence.** |
| **D-11** | **Routes are `/bathroom-renovations/{suburb-or-region}`**, with Tier 1 ↔ hub links in both directions. | **AGENT — ⚠️ NOW IN CONFLICT, see D-44** | Keeps the service term in every location URL and makes hubs genuinely useful rather than link-farms. **The 2026-08-17 migration built the bathroom service page at `/services/bathroom-renovations/` on owner instruction, which collides with this.** Both cannot be canonical. Resolve before any location page is built — see D-44 and `MIGRATION.md` §6 flag 1. |
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
| **D-36** | **Every image follows one pipeline before it reaches the site — the 33 initial ETR photos and every image added afterward: Detect → Inventory → Verify → Flag issues → Approve → Add to repo → Commit → Use public asset URL → Add accurate alt text.** | **CONFIRMED** | Owner directive 2026-08-16. Filenames, folder names, existing alt text and the target page never reliably describe what a photo shows — verify independently (interior/exterior, room/feature, which project or case study, genuine before/after pairing) before any use, per D-06. Full workflow detail lives in `PROJECT_CONTEXT.md` K5; this is the standing rule so it does not need re-stating each session. |
| ~~**D-37**~~ | ~~The Dawood family has three principals: Omar and Adam (Projects Managers) and Farah Dawood (Architectural Designer).~~ **SUPERSEDED BY D-50 — there are FOUR, and two of these role titles were wrong.** | **SUPERSEDED 2026-08-17** | Was confirmed by the owner from a marketing graphic. The owner's own About page copy (GitHub issue #2, now `docs/source-copy/about-revision.md`) names **four** family members and gives different roles for Omar and Adam. The Home copy independently says *"The four Dawoods running Elite Touch"*. See D-50. |
| **D-38** | **The seven "___ Luxe" template graphics with no matching raw photo (see `docs/IMAGE_INVENTORY.md`) are ETR's own project photography, not licensed/stock imagery.** | **CONFIRMED** | Owner (Omar) confirmed 2026-08-17, resolving Flag 4. |
| **D-39** | **The owner has customer consent to publish every photo in `docs/IMAGE_INVENTORY.md`.** But **neither the owner nor the repo knows which suburb, street or project any individual photo belongs to.** | **CONFIRMED** | Owner (Omar) confirmed 2026-08-17. Resolves K6. **Consequence:** these photos may be used as general, unattributed project/gallery imagery, but per D-06 must never be labelled with an invented suburb, matched to The Rocks / Hunters Hill / Artarmon, or captioned as a specific project unless the owner later supplies that detail. |

---

## 3b. Build decisions — the 2026-08-17 Next.js MVP + WordPress migration

Made while standing up the codebase. Full detail and the verification runbook are in
[MIGRATION.md](MIGRATION.md).

| # | Decision | Status | Why · alternatives rejected |
|---|---|---|---|
| **D-40** | **Stack: Next.js 16.3.1 (App Router, Turbopack) + TypeScript + plain CSS driven by the `DESIGN.md` token block.** Runtime dependencies are exactly three: `next`, `react`, `react-dom`. | **AGENT** | Resolves K3/O-1 for the build. *Rejected:* **Tailwind** — `DESIGN.md` is already a complete CSS-custom-property system and `CLAUDE.md` forbids starting a second design system; adding Tailwind would mean two competing sources for every colour and space value. *Rejected:* any component kit or animation library, per D-30/D-34. **Hosting is still undecided** — that half of O-1 remains open. |
| **D-41** | **`trailingSlash: true`.** | **AGENT** | Every URL indexed from the WordPress site ends in `/`. Next's default would answer `/about-us/` with a 308 to `/about-us`, adding a hop in front of every existing backlink and every indexed result. Measured: the real indexed forms now redirect in **1 hop**; only unslashed variants that were never published take 2. **Flipping this invalidates every redirect test — re-run `npm run verify:redirects`.** |
| **D-42** | **Redirects use `statusCode: 301`, not `permanent: true`.** | **AGENT** | `permanent: true` emits **308**. Google treats them identically, but the brief specified 301. Note the two options are mutually exclusive — supplying both is a build error. |
| **D-43** | **410 Gone is emitted from `proxy.ts`, never from `next.config.ts`.** | **AGENT** | `headers()` can only append headers; it cannot set a status code, and `redirects()` only emits 3xx. The brief asked for 410 via custom headers — **that would have silently returned 200 OK** with a decorative header, leaving the two Elementor stubs indexed forever. Also note Next 16 renamed `middleware.ts` → `proxy.ts` with the export renamed to `proxy`. |
| **D-44** | **Service pages live at `/services/{slug}/`** — `bathroom-renovations`, `ensuite-bathroom-renovations`, `laundry-renovations`, `powder-room-renovations`. | **CONFIRMED (owner instruction) — ⚠️ collides with D-11** | The owner's migration table specified these paths, and an owner instruction outranks D-11 (AGENT status). **But D-11 puts the bathroom service at `/bathroom-renovations/` with suburb pages beneath it.** Both cannot be the canonical bathroom page — that is self-cannibalisation on the project's most valuable term. **Decide before building any location page.** Cheapest resolution: keep `/services/bathroom-renovations/` canonical, nest locations as `/services/bathroom-renovations/{suburb}/`, and amend D-11. |
| **D-45** | **The `laundry-renovations` slug is kept, but the page's title, H1 and copy all say "Bathroom + Laundry Renovations".** | **AGENT** | The slug is the client's existing URL and may hold equity, so it is preserved. But D-01's confirmed service is **bathroom *and* laundry** — not standalone laundry work. The URL is a legacy artefact; the visible copy must never advertise a trade ETR has not confirmed. |
| **D-46** | **Jost is committed to the repo and self-hosted** (`app/fonts/`, latin variable subset, ~26 KB) rather than fetched with `next/font/google`. | **AGENT** | `next/font/google` failed to resolve at build time on Next 16.3.1/Turbopack. Self-hosting also removes any build-time or runtime dependency on Google's CDN and eliminates a third-party connection from the critical path. Latin subset only — cyrillic and latin-ext are dead weight for a Sydney trade site. |
| **D-47** | **The enquiry form FAILS LOUDLY while no delivery destination is configured.** | **AGENT** | K1 — no business email has ever been supplied, so there is nowhere to send an enquiry. The dangerous implementation is one that shows "thanks, we'll be in touch" and drops the lead; on a site whose entire purpose is enquiries, nobody would notice for weeks. Until `ETR_ENQUIRY_WEBHOOK_URL` is set, the form tells the customer it is not connected and sends them to the phone number, which works today. |
| **D-48** | **`/gallery/` ships with the three documented case studies in words and no photographs.** | **AGENT** | 33 photos exist with confirmed consent (D-38/D-39), but the D-36 pipeline has not cleared Add-to-repo/Commit and K9 has not chosen an asset directory. Per D-39/O-4 no photo can be attributed to a suburb or project. A text-only "our work" page is honest; captioning photos with invented locations would breach D-06. **This is the largest content gap in the rebuilt site.** |

---

## 3c. Intake of GitHub issues #1 and #2 (2026-08-17)

Both issues were reviewed and closed on 2026-08-17. **Their contents are preserved in
[`docs/source-copy/`](docs/source-copy/)** — eight owner-supplied PDFs as verbatim text plus the
originals. The full findings, including every conflict, are in
[`docs/ISSUE_FINDINGS.md`](docs/ISSUE_FINDINGS.md).

| # | Decision | Status | Why · what it changes |
|---|---|---|---|
| **D-49** | **Issue #2's eight PDFs are owner-supplied source copy and rank as owner instruction** for business facts. They are preserved in `docs/source-copy/` and are the provenance for the credentials, contact details and team bios now on the site. | **CONFIRMED** | They are the owner's own approved page copy, package matrix, and a third-party marketing audit. Closing an issue must never destroy the source of truth, hence the in-repo copy. **Where a PDF and this repo disagree, the PDF is newer — but several PDFs contradict themselves, so check `ISSUE_FINDINGS.md` before trusting one.** |
| **D-50** | **There are FOUR Dawoods, and the roles are: Omar Dawood — Licensed Builder & Civil Engineer (founder, holds licence 475204C); Adam Dawood — Licensed Tiler & Projects Manager (25+ years, and the father of the other three); Farah Dawood — Architectural Designer; Mohammed Dawood — Assistant Project Manager.** | **AGENT — supersedes D-37** | From the owner's About copy. Two of D-37's role titles were wrong (Omar is not a Projects Manager) and Mohammed was missing entirely. Applied to the site. **Owner should confirm**, since D-37 was itself owner-confirmed from a graphic. |
| **D-51** | **ABN `92 679 016 721`, ACN `679 016 721`, office `Granville, NSW (by appointment)`, hours Mon–Fri 7:00am–5:30pm / Sat 8:00am–3:30pm, email `Elitetouchrenovations@gmail.com` are published.** | **AGENT** | All from issue #2, and the ABN appears identically in two independent PDFs. Resolves K1/O-6. **`info@elitetouchrenovations.au` is NOT published** — the owner marked it *"currently being set up"*, and an advertised address that bounces loses enquiries silently. Publish it once it is confirmed receiving. |
| **D-52** | **The Google Business Profile URL is published in `sameAs`; the 5.0 rating and 17-review count are NOT displayed and NOT in schema.** | **AGENT** | The figures come from the issue #2 PDF and have not been verified live. A stale rating in structured data is a real problem, not a rounding error. Also note **17 Google reviews vs 19 testimonials** in `Customer Reviews.md` — the two sets are not the same, so the 19 must never be called "Google reviews". Verify live, then add `aggregateRating`. |
| **D-53** | **The warranty term is STILL not resolved. D-19 stands unchanged.** | **CONFIRMED** | Issue #2 supplies only a *"10-year warranty from our trusted supplier"* — a **product warranty on fittings**, not ETR's workmanship warranty — and a reference to *"the statutory defects period under the Home Building Act 1989"*, which is a legal minimum. **Neither is the number D-19 asks for. No warranty number ships.** |
| **D-54** | **Do NOT adopt from issue #2 without owner sign-off:** the indicative pricing *ranges*, the "Refresh package" as a fifth service, commercial work, any build duration, the Greenfleet tree-planting claim, or any service area beyond the four settled regions. | **AGENT** | Each conflicts with a settled decision or with another part of issue #2 itself. Detail and what unblocks each: `ISSUE_FINDINGS.md` §B. In particular the PDFs give **two different durations** (2–4 weeks vs 3–5 weeks) and **two different pricing models** that overlap awkwardly. |
| **D-55** | **The green/sustainability brand direction in the Action Items PDF does not override `DESIGN.md`.** | **AGENT** | That PDF refers to *"the green theme of our website"*. `DESIGN.md` is magenta and is tier-1 authoritative for anything visual (CLAUDE.md). Raise it with the owner if it matters to them; do not repaint the site off a marketing document. |
| **D-56** | **Issue #1 needs no action beyond D-05.** | **CONFIRMED** | It is the `sheinerconstruction.com` reference link with *"we can use these pages same info just change to our photos"*. D-05 already settles it: layout and structure may be referenced; copy, specifications and claims may not. |

**The most useful thing in issue #2** is the marketing audit's hard data: the old site took **900 ad
impressions and 72 clicks for $660 and converted zero**. That is the clearest justification for this
rebuild in the entire repo, and the consultant's diagnosis — *"you are making people do all the hard
work and it is all the same stuff people can see on another 200 bathroom renovator websites"* —
is the bar the new site has to clear.

---

## 4. Open — genuinely undecided

| # | Question | Blocked on |
|---|---|---|
| **O-1** | ⚠️ **Partially resolved 2026-08-17 — the stack is settled (D-40: Next.js 16 App Router + TypeScript + DESIGN.md CSS tokens). HOSTING is still undecided.** The choice matters: `proxy.ts` runs on the Node runtime and is not supported on a static export, so a static-only host would break every 410. | Owner — hosting |
| ~~**O-2**~~ | ✅ **RESOLVED 2026-08-16 — a Google Business Profile exists.** Rating, review count and profile URL still needed. See D-18. | Detail only |
| **O-3** | ⚠️ **Partially resolved 2026-08-16 — the owner confirmed a warranty IS to be stated on the site. The term itself has not been supplied.** See D-19. **No page ships with a warranty number until the owner gives it.** | Owner — the number |
| ~~**O-4**~~ | ✅ **RESOLVED 2026-08-17 — the owner confirmed all photos in `docs/IMAGE_INVENTORY.md`, including the "Luxe" template set, are genuine ETR project photography with customer consent to publish (D-38, D-39).** **Owner does not know which suburb or project each photo belongs to, and neither does the repo.** They are **not** to be labelled with a suburb, street, budget or matched to The Rocks / Hunters Hill / Artarmon — that would violate D-06. Use them as general, unattributed project photography (galleries, "our work" sections) only. | Detail only |
| **O-5** | Is repair-only work ever taken? Decides D-02 | Owner |
| ~~**O-6**~~ | ✅ **RESOLVED 2026-08-17 from GitHub issue #2** — ABN `92 679 016 721`, ACN `679 016 721`, email `Elitetouchrenovations@gmail.com`, office Granville NSW (by appointment), plus trading hours and insurances. See D-51. **Remaining detail:** confirm when `info@elitetouchrenovations.au` goes live, and whether a street address should be published. | Detail only |
| **O-7** | ⚠️ **Was the business founded in 2022 or 2023?** The owner's own About PDF says **both** — *"Since 2023, we have been helping homeowners…"* and *"founded in 2022 by the Dawood family"*. D-04 has 2023 as CONFIRMED, and the site currently says 2023 in the hero, the footer and in schema. **Owner must settle it.** | Owner |
| **O-8** | ⚠️ **Which pricing model does the site lead with?** Issue #2 contains two: the fixed package tiers ($17,999 / from $25,999 / from $32,999) and indicative ranges ($8–20k refresh, $25–40k standard, $40–60k premium, $55k+ reconfigure). They overlap awkwardly. Blocks the cost/pricing page (D-15). | Owner |
| **O-9** | ⚠️ **Is the service area really all of Greater Sydney?** The About PDF claims North Shore, Northern Beaches, Sutherland Shire, Parramatta, South Sydney and Western Sydney — **none of which `service-areas.json` or `docs/BATHROOM_SITE_STRUCTURE.md` cover.** Either the site structure is under-scoped or the claim is over-stated. | Owner + agent |
