# PROJECT_CONTEXT.md — Elite Touch Renovations

**Purpose.** The business facts and the codebase mechanics, in one place. [CLAUDE.md](CLAUDE.md) holds
the *rules*; [DECISIONS.md](DECISIONS.md) holds the *verdicts*; this file holds the *facts and the
"why does it behave like that"*.

> **Status: MVP codebase exists as of 2026-08-17.** Next.js 16 App Router, built and verified
> locally, **not deployed** (D-35). See §6 for how it is wired and [MIGRATION.md](MIGRATION.md) for
> the WordPress → Next.js redirect layer. §1–§2 are real, sourced facts. §4 is carried over from a
> sibling trade-business site that hit each of those traps in production — they are framework
> behaviour, not that project's quirks. **Never invent a value to fill a gap.**

**Sources of the facts below:** the eight page-copy and package PDFs attached to **GitHub issue #2**,
[docs/BATHROOM_SITE_STRUCTURE.md](docs/BATHROOM_SITE_STRUCTURE.md), and
[Customer Reviews.md](Customer%20Reviews.md).

---

## 1. Business facts

| Fact | Value |
|---|---|
| Business name | **Elite Touch Renovations** (customers also write **ETR**) |
| Legal entity name | **Elite Touch Renovations Pty Ltd** — from the business's own logo file, `docs/IMAGE_INVENTORY.md` |
| Owners | **The Dawood family — FOUR members** (D-50, supersedes D-37): **Omar Dawood** (Licensed Builder & Civil Engineer, founder, holds the licence) · **Adam Dawood** (Licensed Tiler & Projects Manager, 25+ years, **the father**) · **Farah Dawood** (Architectural Designer) · **Mohammed Dawood** (Assistant Project Manager) |
| Positioning | Family-run, small focused team, *"done once and done properly"* |
| Founded | **2023** |
| Market | **Sydney, NSW** |
| NSW Builder Licence | **475204C** |
| Phone | **0411 752 334** |
| Standards | **AS 3740** waterproofing + current Australian Standards |
| Offer | **Free on-site measure** across Sydney · **fixed-scope written quotes** |
| Primary CTA | "Book a free on-site measure" · Secondary: "Call 0411 752 334" |
| Workmanship warranty | ✅ **Offered and to be stated on the site** — ⚠️ **term not yet supplied. Never write a number until the owner gives it** ([DECISIONS.md](DECISIONS.md) D-19) |
| Google Business Profile | ✅ https://share.google/PLJDhhWBCrWAq6GVH — **5.0 across 17 Google reviews** as at the issue-#2 PDF. ⚠️ **Not verified live; not displayed and not in schema** (D-52). Note 17 Google reviews ≠ the 19 testimonials |
| ABN · ACN | **92 679 016 721** · **679 016 721** (D-51) |
| Email | **Elitetouchrenovations@gmail.com** (live). `info@elitetouchrenovations.au` is preferred but the owner marked it *"currently being set up"* — **not published until confirmed receiving** |
| Office · hours | **Granville, NSW (by appointment)** · Mon–Fri 7:00am–5:30pm, Sat 8:00am–3:30pm |
| Insurance · memberships | Public Liability **$20M** · Workers' Comp **Allianz** · HBCF certificates · **HIA** member · HIA fixed-price renovation contract |
| Payment terms | **30% deposit**, then a **30 / 40 / 30** progressive schedule |
| Second phone | **0423 305 852** (Mohammed) — not currently surfaced on the site |

### The four services
1. **Bathroom renovations** — full strip-out and rebuild of the main bathroom
2. **Ensuite renovations** — small-footprint master-suite work, ventilation + acoustic detailing
3. **Bathroom and laundry renovations** — two wet areas in a single program
4. **Powder room renovations** — the smallest room

**That is the whole service list.** Waterproofing is performed *within* a renovation (to AS 3740); it
is **not** sold as a standalone service, and neither is leak repair. See [DECISIONS.md](DECISIONS.md) D-02.

### Proof assets that already exist
- **19 verbatim customer testimonials** with real names — [Customer Reviews.md](Customer%20Reviews.md).
  Recurring, evidenced themes: **communication, responsiveness by phone/SMS, punctuality,
  cleanliness, precision tiling, honest regular updates, fair pricing.** Lead with these; they are
  earned, specific, and repeated across independent reviewers.
- **Three case-study projects:** The Rocks heritage bathroom (original timber-framed window,
  19th-century terrace) · Hunters Hill marble bathroom (full-height marble, custom double vanity,
  freestanding bath) · Artarmon bathroom + ensuite (two wet areas, four-week program, large-format
  porcelain, LED backlit mirrors).

---

## 2. Pricing — the package structure

**Source of truth: the "Elite Touch Renovation Packages" PDF on issue #2.** Four tiers. Each price is
tied to a **stated bathroom size** — a price quoted without its size basis is misleading.

| Tier | Price | Size basis |
|---|---|---|
| ORIGINAL | (entry tier) | approx. 1.5 × 1.5 × 2.4 m and similar |
| **BASIC** | **$17,999** | approx. 1.5 m × 1.8 m × 2.4 m |
| **STANDARD** | **starts from $25,999** | approx. 1.8 m × 2.4 m × 2.4 m |
| **PREMIUM** | **starts from $32,999** | approx. 2.4 m × 2.4 m |

**Included in every tier:** planning & design · demolition (floor protection, disconnection and
removal of existing PC items, floor and wall tiles including old cement bedding, complete off-site
rubbish removal) · electrical (safe disconnection, replacement power points and light switch) ·
plumbing (safe disconnection, installation of new PC items — toilet, vanity, towel rail, toilet roll
holder, shower head, shower mixer, vanity mixer) · render / re-sheet walls · **waterproofing to
Australian standards, primer plus two coats, certificate included** · tiling (new screed to create
falls to drains, all glues, tile trims, grouts and silicone) · final clean before handover.

**What separates the tiers** is tile size and coverage (300×600 ceramic in the shower enclosure vs.
full floor-to-ceiling 300×600 or 600×600) and the fittings schedule — mirror (600 mm pencil edge →
900 mm → 1200 mm shaving cabinet), vanity (600 mm ceramic → 900 mm → 1200 mm stone top), shower head
(standard → rain head with hand rail), screen (framed → semi-frameless → fully framed), towel rail
(standard → heated), toilet (back-to-wall → in-wall cistern), lighting (2 → 3 LED downlights),
exhaust fan, and heated flooring.

> ⚠️ **Do not paraphrase this list into marketing copy without checking it.** "Includes everything"
> and "premium fittings throughout" are the kinds of claims that turn a fixed-scope quote into a
> dispute. If a claim is not in the PDF, it is not in the package.

---

## 3. Planned site structure

Settled in [docs/BATHROOM_SITE_STRUCTURE.md](docs/BATHROOM_SITE_STRUCTURE.md) (the reasoning and the
volume evidence) and **[service-areas.json](service-areas.json) — the machine-readable version, which
is the one to build from.** It carries every suburb with its slug, postcode, tier, and the URL for
Tier-1 entries, plus an `isNotASuburb` flag on non-residential entries that exist for postcode
completeness and **must not** get service-area copy.

**When the site is built, generate location routes from `service-areas.json` — do not retype the
list.** Two hand-maintained copies of the same suburb data will drift, and the drift will be silent.

Summary:

- **Tier 1 — six dedicated suburb pages:** Baulkham Hills, Castle Hill, Kellyville (Hills District),
  Marrickville (Inner West), Ryde (North-Western Sydney), Randwick (Eastern Suburbs).
- **Tier 2 — four regional hubs:** Hills District, Inner West, North-Western Sydney, Eastern Suburbs.
  Every other suburb is *listed* on its hub, not given a URL — this is the deliberate guard against
  thin, near-duplicate location pages.
- **Routes:** `/bathroom-renovations/` overview → `/bathroom-renovations/{suburb-or-region}`.
- **Linking rule:** Tier 1 links up to its hub; each hub links down to its Tier 1 pages; the overview
  links to all four hubs.
- **Biggest single opportunity: "bathroom renovations near me" / "…contractors near me" at
  1K–10K/month** — bigger than any suburb term. That is a homepage / main-service-page target, not a
  suburb page.
- Also confirmed worth building: a **cost/pricing guide** and a **small-bathroom page** (both 100–1K).

---

## 4. Framework traps carried over — each caused a live defect elsewhere

Applies to any modern React/SSR stack. Read before building the equivalent surface; adapt the names.

1. **Lazy-loading is an SEO defect for anything that must be indexed.** A wrapper gating children
   behind state flipped by an `IntersectionObserver` renders its **fallback** server-side, always.
   The sibling project shipped a skeleton instead of real content **three separate times** — an FAQ,
   a reviews block, and a project gallery — losing headings, body copy, image alt text and anchor IDs
   from the server HTML each time. **Verify with `curl | grep`, not by looking at the browser.**
2. **Rendering eagerly ≠ downloading eagerly.** The usual objection is LCP, and it is usually wrong:
   `loading="lazy"` + `fetchPriority="low"` + `decoding="async"` on non-priority images ships the
   markup while deferring the downloads. *Grep trap:* React renders the attribute capitalised as
   `fetchPriority`, so a lowercase grep returns zero and looks like a bug.
3. **404 bodies inherit the sitewide robots default.** If the layout sets `index, follow` and a
   not-found branch returns only a title, every unmatched URL becomes an **indexable soft 404 at HTTP
   200**. Set `robots: { index: false, follow: false }` explicitly in every not-found branch.
4. **A data record can silently become a URL.** If a dynamic route resolves slugs from a data file,
   every record in that file is a live page. Redirect anything not meant to be one.
5. **Props are serialised into the client payload even when never rendered.** Pass only what you
   render — "not rendered" is **not** "not published".
6. **`'use client'` is contagious.** One shared component with a hook forces every consumer
   client-side. Find which import demanded it before adding the directive.
7. **Publication = content + an internal link from a relevant hub + a sitemap entry.** The sibling
   project had 18 finished pages orphaned and unsitemapped for weeks.
8. **Renaming an asset reference is not uploading the asset.** Nine broken images shipped across two
   incidents from exactly this. After any rename, verify the file resolves.
9. **Alt text drifts toward describing the page instead of the photo.** No automated check catches
   it, and on a trade site a caption claiming work the photo does not show is a false claim.
10. **Concurrent builds corrupt each other**, failing with misleading errors that look like code
    faults. Re-run alone before believing a build error.
11. **Background task exit codes lie** — a wrapped command reports the wrapper's status. Read the
    output.

---

## 5. Open items

| # | Item | Owner |
|---|---|---|
| ~~K1~~ | ✅ **RESOLVED 2026-08-17 from GitHub issue #2** — ABN, ACN, email, Granville office, hours, insurances (D-51). Remaining detail: when `info@elitetouchrenovations.au` goes live, and whether a street address should be published | Detail only |
| K2 | ⚠️ **Mostly resolved 2026-08-17** — profile URL captured, and the issue-#2 PDF states **5.0 across 17 Google reviews**. **Still needed: verify those figures live before displaying them or emitting `aggregateRating` (D-52).** Also note the count settles part of the old question: there are **17 Google reviews but 19 testimonials**, so the two sets are NOT the same and the mapping is unknown | Agent — verify live |
| K2b | **The warranty term.** Confirmed as offered and to be stated; the number is missing and must not be guessed | Owner |
| K3 | ⚠️ **Stack resolved 2026-08-17** (Next.js 16 App Router + TypeScript + DESIGN.md CSS tokens — D-40). **Hosting still open.** It must run the Node runtime: `proxy.ts` serves the 410s and is unsupported on a static export | Owner — hosting |
| K4 | Analytics + call-tracking approach — settle **before** any tag is added | Owner + agent |
| K5 | **Photos exist — 33 files** in `ETR images/` (19) and `ETR images and reviews/` (14), plus a loose `.jpg` at the repo root (the ETR logo, not a photo). Detect/Inventory/Verify/Approve are done — see [docs/IMAGE_INVENTORY.md](docs/IMAGE_INVENTORY.md) — confirmed genuine ETR work with consent (D-38, D-39). **Still open: no suburb, street or project is known for any of them** (O-4) — use as general, unattributed project photography only; never invent or infer an attribution (D-06). **Add to repo / Commit / public asset URL are blocked on K3 + K9.** | Owner + agent |
| ~~K6~~ | ✅ Customer consent to publish photos of their homes — **confirmed by owner 2026-08-17** (D-39) | Resolved |
| K7 | ⚠️ **Still open after re-reading the PDF.** The Packages PDF's page 2 lists an ORIGINAL tier with a *different* size basis (1.5 × 1.5 × 2.4 m) but **shows no prices at all on that page** — page 2 appears to be a separate or older matrix. The figure does not exist in the source. **Owner must supply it**, and should also say which of the two matrices is current | Owner |
| K10 | ⚠️ **Two conflicting build durations in issue #2** — About says "two to four weeks", the Bathroom service page says "three and five weeks". No duration is on the site until this is settled | Owner |
| K11 | ⚠️ **Outstanding content asks from the marketing audit** (`docs/source-copy/action-items.md`), none of which exist yet: professional team photos and head shots, on-site photos, finished-bathroom video, a **downloadable sample quote**, and a founder video. The sample quote in particular is a strong, cheap trust asset for a fixed-scope-quote business | Owner |
| K9 | The repo-root `.jpg` and the two image folders sit outside any structure. Decide where assets live before the first page is built — this is the target directory the "Add to repo" step below moves approved images into | Agent |
| K8 | Does the "family-run since 2023" line risk reading as inexperienced? It is true and must stay true — but the *framing* is a copy decision worth making deliberately | Owner |

> ### Image workflow (D-36) — every image, not just the initial 33
>
> **Detect → Inventory → Verify → Flag issues → Approve → Add to repo → Commit → Use public asset URL → Add accurate alt text.**
> No image is used on the site until it has cleared Approve. This is a standing rule — it applies
> automatically to every future image, not only the 33 currently sitting in the two ETR folders; don't
> wait to be asked to run it again.
>
> 1. **Detect.** A new photo appears in `ETR images/`, `ETR images and reviews/`, or wherever the owner
>    drops it — as a raw, uncommitted local file, not yet part of the repo.
> 2. **Inventory.** Record, per photo: interior or exterior; the room/area/feature/material shown;
>    which of the four services or which of the three documented case studies (The Rocks heritage
>    bathroom, Hunters Hill marble bathroom, Artarmon bathroom + ensuite) it actually represents, if
>    any; whether it is genuinely one half of a matched before/after pair. **Never infer any of this
>    from the filename, folder name, existing alt text, or the page it might end up on** — the WhatsApp
>    export filenames (`WhatsApp Image 2026-08-13 at 7.40.13 AM (1).jpeg`) carry zero descriptive
>    information, and assuming otherwise is exactly how the sibling project's alt-text drift happened
>    (engineering lesson #9, below).
> 3. **Verify.** Cross-check the inventoried claim against what is actually evidenced (a documented
>    project, genuine consent). Do not label a photo with a project or location it cannot be evidenced
>    against — see D-06.
> 4. **Flag issues.** Anything uncertain, mismatched, duplicated, or that would create an unevidenced
>    claim goes back to the owner instead of being guessed. Do not work around a flag.
> 5. **Approve.** Owner or agent sign-off, per photo, once Verify is clean.
> 6. **Add to repo.** Move the approved file into the site's asset directory (see K9) under a
>    consistent, descriptive naming convention — not the WhatsApp export name.
> 7. **Commit.** Track it in git like any other source file.
> 8. **Use public asset URL.** Reference it via the URL the deployment setup actually serves (its
>    public/CDN path). Never a local filesystem path, and never a GitHub `blob` page URL when the
>    deployment setup provides a real asset URL.
> 9. **Add accurate alt text.** Describes the photograph itself — never the page topic or the target
>    keyword.
>
> The sibling project shipped alt text describing the *page topic* instead of the photo across ~155
> image pairs, plus a case study whose "exterior before/after" photos were interiors. On a trade site
> that is a false claim about work performed, not a copywriting slip. An inventory mapping photo →
> subject → where used makes every later audit cheap and stops the same photo being reused on six
> pages.

---

## 6. Codebase mechanics — "why does it behave like that"

Built 2026-08-17. Decisions and their reasoning are D-40 … D-48 in
[DECISIONS.md](DECISIONS.md); the migration runbook is [MIGRATION.md](MIGRATION.md).

### Where things live

| Path | What it is |
|---|---|
| `app/` | App Router. `layout.tsx` · `page.tsx` (home) · `about-us/` · `contact-us/` · `services/` + `services/[slug]/` · `gallery/` · `packages/` · `not-found.tsx` · `sitemap.ts` · `robots.ts` · `globals.css` · `fonts/` |
| `components/` | `layout/SiteHeader.tsx`, `layout/SiteFooter.tsx`, `EnquiryForm.tsx` |
| `lib/businessInfo.ts` | ⭐ **The single source of truth for business facts and the four services.** Never let a fact live only in JSX. |
| `lib/reviews.ts` | The 19 testimonials, verbatim (D-03) |
| `lib/actions.ts` | Enquiry server action |
| `next.config.ts` | 19 × 301 + `trailingSlash: true` + security headers |
| `proxy.ts` | The 410s. Next 16 renamed `middleware.ts` → `proxy.ts` |
| `scripts/verify-redirects.mjs` | `npm run verify:redirects` |

### Things that will bite you

1. **`trailingSlash: true` is load-bearing** (D-41). Every canonical, every sitemap entry and every
   internal `href` carries a trailing slash. Flipping it silently adds a redirect hop to every
   indexed URL. Re-run `npm run verify:redirects` if it ever changes.
2. **`headers()` cannot set a status code.** That is why the 410s are in `proxy.ts` (D-43). Do not
   "simplify" them back into the config — they would become 200s.
3. **Redirect order matters.** `next.config.ts` matches first-wins. The specific `/staging/...`
   rules must stay above the `/staging/:path*` catch-all.
4. **`services` in `lib/businessInfo.ts` is a URL generator.** Every record becomes a live page.
   `dynamicParams = false` makes unknown slugs 404 rather than render, but adding a fifth record
   ships a fifth service page — and D-01 says there are four.
5. **`EnquiryForm.tsx` is the only `'use client'` in the app**, and deliberately a leaf. The contact
   page stays a server component so its copy is in the server HTML. Do not lift the directive up.
6. **The enquiry form has no destination** and fails loudly by design (D-47). Set
   `ETR_ENQUIRY_WEBHOOK_URL` and send a live test before telling anyone the form works.
7. **The reviews render eagerly and in full** on `/about-us/` — verified as 19 `<figcaption>`
   elements in the served HTML, not the React tree. Never wrap them in a lazy-loader (D-31).
8. **Analytics and call tracking are NOT installed** (K4). When they are: one measurement path
   only (D-32), and every call CTA is already a real `tel:` anchor (D-33) — verified as 4 anchors
   and 0 `<button>` call CTAs — so a single delegated listener is all that is needed.

### How it is verified

`npm run build` must be green, then with the server running:

```bash
npx next start -p 3210
npm run verify:redirects          # 34 checks: 5 keep · 18 redirect · 2 gone · 7 new · 2 404
```

The expectation table in that script is transcribed **independently** of `next.config.ts` on
purpose — a script importing the config would only prove the config equals itself. It also follows
every 301 to its destination and asserts 200, because a redirect into a 404 destroys the equity it
exists to preserve.

⚠️ **Stopping the dev/prod server:** killing the background task wrapper does **not** kill the
`next start` child on Windows. It keeps holding the port, and the next `next start` fails with
`EADDRINUSE` while your tests quietly pass against the **stale** build. Check the port owner
(`netstat -ano | grep 3210`) and `Stop-Process` the real PID.
