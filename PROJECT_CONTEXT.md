# PROJECT_CONTEXT.md — Elite Touch Renovations

**Purpose.** The business facts and the codebase mechanics, in one place. [CLAUDE.md](CLAUDE.md) holds
the *rules*; [DECISIONS.md](DECISIONS.md) holds the *verdicts*; this file holds the *facts and the
"why does it behave like that"*.

> **Status: Next.js 16 App Router codebase exists and the site is live in production on Vercel**
> at `https://www.elitetouchrenovations.au/` (owner-confirmed 2026-08-24; D-68, D-98). See §6 for
> how it is wired and [MIGRATION.md](MIGRATION.md) for the WordPress → Next.js redirect layer.
> §1–§2 are real, sourced facts. §4 is carried over from a sibling trade-business site that hit each
> of those traps in production — they are framework behaviour, not that project's quirks. **Never
> invent a value to fill a gap.**

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
| Founded | **2022** — owner-corrected 2026-08-19 (D-57). Earlier docs and the About PDF's opening line say 2023; the owner's direct answer wins |
| Market | **Sydney, NSW** |
| NSW Builder Licence | **475204C** |
| Phone | **0411 752 334** |
| Standards | **AS 3740** waterproofing + current Australian Standards |
| Offer | **Free on-site measure** across Sydney · **fixed-scope written quotes** |
| Primary CTA | "Book a free on-site measure" · Secondary: "Call 0411 752 334" |
| Workmanship warranty | ✅ **10 years** — owner-confirmed 2026-08-19 (D-58), closing D-19/K2b. Distinct from the supplier's product warranty on fittings and from the statutory defects period. ⚠️ Contractual: state as written, never embellish |
| Google Business Profile | ✅ https://share.google/PLJDhhWBCrWAq6GVH — **5.0 across 17 Google reviews** as at the issue-#2 PDF. ⚠️ **Not verified live; not displayed and not in schema** (D-52). Note 17 Google reviews ≠ the 19 testimonials |
| ABN · ACN | **92 679 016 721** · **679 016 721** (D-51) |
| Email | **info@elitetouchrenovations.au** — owner-nominated 2026-08-19 (D-59) and now published. `Elitetouchrenovations@gmail.com` is retained in `businessInfo` as `legacyGmail` but is not shown. ⚠️ **Confirm the .au address is actually receiving before launch** |
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

⭐ **Source of truth: [`docs/source-copy/packages-2026-08-19.md`](docs/source-copy/packages-2026-08-19.md)**
— the revision the owner supplied on 2026-08-19. It **supersedes** the issue-#2 sheet
(`docs/source-copy/packages.md`), which had four tiers and different inclusions.

**Three tiers. All three are "from" prices** (D-60). Each is tied to a **stated bathroom size** — a
price quoted without its size basis is misleading (D-07).

| Tier | Price | Size basis |
|---|---|---|
| **Basic** | **from $18,000** | approx. 1.5 m × 1.8 m × 2.4 m |
| **Standard** | **from $25,000** | approx. 1.8 m × 2.4 m × 2.4 m |
| **Premium** | **from $30,000** | approx. 2.4 m × 2.4 m × 2.4 m |

> ⚠️ **The ORIGINAL tier no longer exists** — that closes the old K7 question about its price.
> ⚠️ The current sheet also **changed inclusions**: Premium is a **900 mm** vanity and cabinet (not
> 1200 mm), gains a **freestanding bath**, and keeps a back-to-wall toilet rather than an in-wall
> cistern; Basic gains a **semi-frameless** screen; all tiers gain **aluminium angles** around the
> shower and door plus **painting of bathroom ceilings**. Do not reintroduce the old sheet's values.

**Included in every tier:** planning & design · demolition (floor protection, disconnection and
removal of existing PC items, floor and wall tiles including old cement bedding, complete off-site
rubbish removal) · electrical (safe disconnection, replacement power points and light switch) ·
plumbing (safe disconnection, installation of new PC items — toilet, vanity, towel rail, toilet roll
holder, shower head, shower mixer, vanity mixer) · render / re-sheet walls · **waterproofing to
Australian standards, primer plus two coats, certificate included** · tiling (new screed to create
falls to drains, all glues, tile trims, grouts and silicone) · final clean before handover.

**What separates the tiers** (current sheet) is tile coverage — shower enclosure only on Basic vs.
full floor-to-ceiling on Standard and Premium — and the fittings schedule: shaving cabinet and vanity
(600 mm → 900 mm → 900 mm), shower head (standard → rain head with hand rail), screen (semi-frameless
→ fully frameless → fully frameless), power points (1 → 2 → 3), and Premium alone adding a
**freestanding bath, heated towel rail, heated flooring, 2 LED downlights and an exhaust fan**.

> ⚠️ **Do not paraphrase this list into marketing copy without checking it.** "Includes everything"
> and "premium fittings throughout" are the kinds of claims that turn a fixed-scope quote into a
> dispute. If a claim is not in the current sheet, it is not in the package.

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
- **Tier 2 — FIVE regional hubs:** Hills District, Inner West, North-Western Sydney, Eastern Suburbs,
  and **North Shore** (added 2026-08-19, D-72 — 50 suburbs, Lower + Upper). Every other suburb is
  *listed* on its hub, not given a URL — the deliberate guard against thin, near-duplicate pages.
- **Routes (D-71, supersedes D-11):** `/services/bathroom-renovations/` →
  `/services/bathroom-renovations/{suburb-or-region}/`. Locations are children of the service page,
  so there is exactly one canonical bathroom page.
- ⚠️ **Only North Shore is actually published.** The other four are `hubPublished: false` and
  **404 by design** (D-73) — they have no differentiated content yet. Turning one on is a content
  job, not a config flip.
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
| ~~K2b~~ | ✅ **RESOLVED 2026-08-19.** Owner confirmed a **10-year workmanship warranty** (D-58). State it as written; do not embellish it or extend it to third-party fittings | Resolved |
| ~~K3~~ | ✅ **RESOLVED 2026-08-19 / confirmed live 2026-08-24.** Hosting is **Vercel** (D-68) and the production site is publicly live (D-98), so `proxy.ts`, redirects, `next/image` and Server Actions are supported | Resolved |
| K4 | Analytics + call-tracking approach — settle **before** any tag is added | Owner + agent |
| K5 | ⚠️ **Superseded in practice by the 2026-08-19 Gallery folder.** 23 attributed photos across five projects are now live (D-64); see §6. The item below concerns the ORIGINAL 33, which remain unattributed and unused. **Photos exist — 33 files** in `ETR images/` (19) and `ETR images and reviews/` (14), plus a loose `.jpg` at the repo root (the ETR logo, not a photo). Detect/Inventory/Verify/Approve are done — see [docs/IMAGE_INVENTORY.md](docs/IMAGE_INVENTORY.md) — confirmed genuine ETR work with consent (D-38, D-39). **Still open: no suburb, street or project is known for any of them** (O-4) — use as general, unattributed project photography only; never invent or infer an attribution (D-06). **Add to repo / Commit / public asset URL are unblocked by K3/K9, but still require a fresh shortlist and approval before use.** | Owner + agent |
| ~~K6~~ | ✅ Customer consent to publish photos of their homes — **confirmed by owner 2026-08-17** (D-39) | Resolved |
| ~~K7~~ | ✅ **CLOSED 2026-08-19.** The current Packages sheet has **three tiers** — the ORIGINAL tier no longer exists, so there was never a price to find (D-61) | Resolved |
| ~~K10~~ | ✅ **RESOLVED 2026-08-19 (D-75)** — stated as a breakdown by job type (full renovation 3–5 weeks, premium 5–6, reconfigure 5–7) rather than one flat figure. ⚠️ **Owner should confirm these match how jobs actually run** — they are a customer promise |
| K12 | ⚠️ **Partially answered 2026-08-19** — the owner supplied an industry article naming target areas (D-74). It corroborated four existing Tier-1 picks but cites no data, so it is not volume evidence. **Three hubs are now published; Inner West and North-Western Sydney remain dark pending local proof, and Northern Beaches / Western Sydney / Sutherland Shire need keyword research before anything is built (D-76).** Original question: **Which Sydney areas does ETR prefer?** Owner confirmed Sydney-wide *"but we prefer some areas over others"* (D-63). **Still open, and now the main input into which hub gets published next** — four are built as data but deliberately 404 (D-73). ~~Hornsby absent from `service-areas.json`~~ ✅ resolved by D-72. | Owner |
| K13 | ⚠️ **Is the gallery's Artarmon project the same job as the documented "Artarmon bathroom + ensuite" case study?** The case study describes large-format porcelain and LED backlit mirrors over a four-week program; the gallery Artarmon shows gold fixtures and a round gold mirror. They may be two different jobs. **Not merged** (D-06) — owner to confirm. ⚠️ **New evidence 2026-08-25:** a third Artarmon photo set (see K14) matches the case-study description (600×600 porcelain, LED backlit mirror, bathroom+ensuite, 4 weeks) and not the gallery photos — still not enough to merge unilaterally, but worth putting to the owner alongside K14 | Owner |
| K11 | ⚠️ **Outstanding content asks from the marketing audit** (`docs/source-copy/action-items.md`), none of which exist yet: professional team photos and head shots, on-site photos, finished-bathroom video, a **downloadable sample quote**, and a founder video. The sample quote in particular is a strong, cheap trust asset for a fixed-scope-quote business | Owner |
| ~~K14~~ | ✅ **Mostly resolved 2026-08-25.** Consent confirmed by the user for the second photo batch (`Projects Before & After (1)/`). **Six of nine projects shipped** as new gallery entries (D-99): Balmain, Gladesville, Little Bay, Hunters Hill, The Rocks, Artarmon bathroom+ensuite. **Three held, still open:** (1) Enmore and the "North Ryde" laundry project are standalone laundry jobs, outside the confirmed service scope — not published (D-101), owner should confirm if ETR wants to advertise standalone laundry work; (2) the "Mosman" folder's doc says Drummoyne, and the "North Ryde" folder's doc says North Sydney — the user didn't know which was correct for either, so both stay unpublished until the true location is confirmed (D-102). Also open: whether the new Hunters Hill/The Rocks photos are the same jobs as the existing text-only case studies — kept unmerged (D-103), same treatment as K13's Artarmon question | Owner |
| ~~K9~~ | ✅ **RESOLVED 2026-08-19 (D-65).** Project photography lives in **`public/images/projects/{project-slug}/`** as WebP. The repo-root `.jpg` (the logo) and the two original `ETR images*` folders are still unstructured and uncommitted — decide separately whether any of those 33 are still needed now that five attributed projects exist | Agent |
| ~~K8~~ | ✅ **CLOSED by D-57.** The correct line is **family-run since 2022**. Earlier 2023 wording is stale source-copy history, not live guidance | Resolved |
| ~~K15~~ | ✅ **RESOLVED 2026-08-27 (D-109) — 24/24 pages now pass.** The original hypothesis here was wrong: it guessed the shared "What every job includes" trust-signal block was the driver. The real driver was the "Other work of ours" grid repeating each full project name (e.g. "Castle Hill bathroom renovation") across ~10 cards on every page — "renovation" alone landing roughly 10 times per page. Fixed by shortening that grid's heading to a room-type label ("Bathroom"/"Ensuite") plus a D-96/D-97-style word-choice pass on all 11 `blurb`s in `lib/projects.ts`. No fact, material, colour or fixture detail changed. See D-109 for the full before/after and verification. | Resolved |

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
| `lib/reviews.ts` | The 19 testimonials, verbatim (D-03). `reviewByAuthor(name)` pins one to a page (hubs) and throws at build on a typo |
| `lib/locations.ts` | Reads `service-areas.json`. `publishedRegions()` is the **only** thing that turns a region into a page; `publishedRegionForSuburb()` is the safe project-to-hub link helper |
| `lib/hubContent.ts` | ⭐ **Per-region editorial content for the 3 published hubs** (D-121): answer-first lead, "Renovating a bathroom in {region}" local detail, local FAQ, pinned testimonial author. `Record<regionSlug, HubContent>`, same "content is data" shape as `services[].about/faqs`. A region with no entry renders without the extra sections. All copy is truthful/non-invented (D-06) |
| `app/services/[slug]/[location]/` | Regional hub renderer (D-71). Builds only `hubPublished` regions. Renders `lib/hubContent.ts` sections when present (D-121) |
| `lib/projects.ts` | ⭐ **The five photographed projects and every image's alt text.** Alt text describes the PHOTOGRAPH, not the page topic (D-66) |
| `public/images/projects/` | Project photography as WebP, one folder per project slug (D-65) |
| `lib/actions.ts` | Enquiry server action — office email (critical) + customer email (best-effort) + Supabase write (best-effort). ⚠️ **Exports async functions ONLY** — see D-77 |
| `lib/enquiry.ts` | Enquiry types + initial state. Exists precisely so they are NOT exported from a `'use server'` file |
| `components/ContactSection.tsx` | The enquiry block on **every** page (D-80) |
| `components/WorkStrip.tsx` | Project photos, reusable. Every card is suburb-labelled — never decoration (D-83) |
| `components/PageHero.tsx` | Shared hero for every page except home. `image` prop is OPTIONAL — only pass it where a real photo exists (D-84) |
| `public/brand/` | Logo mark + lockup, light and dark variants (D-79). Favicon is `app/icon.png` |
| `next.config.ts` | 19 × 301 + `trailingSlash: true` + security headers |
| `proxy.ts` | The 410s. Next 16 renamed `middleware.ts` → `proxy.ts` |
| `scripts/verify-redirects.mjs` | `npm run verify:redirects` |
| `app/llms.txt/route.ts` | Served at `/llms.txt` (D-90). Generated from `services`, `projects` and `publishedRegions()` — same data `sitemap.ts` reads — so it can never state a fact the rest of the site doesn't |
| `scripts/check-readability.mjs` | `npm run check:readability` — Flesch Reading Ease per page, read straight from `.next/server/app/**.html` (D-96) |

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
6. **The enquiry form sends via Resend** (D-78). Set `RESEND_API_KEY` and `ETR_ENQUIRY_FROM` in
   Vercel, then send a live test before telling anyone it works. Unset, it fails loudly (D-47).
   ⚠️ **Never export a non-function from `lib/actions.ts`** — that exact mistake produced a
   production-only crash on the first real submission (D-77).
7. **The reviews render eagerly and in full** on `/about-us/` — verified as 19 `<figcaption>`
   elements in the served HTML, not the React tree. Never wrap them in a lazy-loader (D-31).
8. **`lib/projects.ts` is a URL generator too.** Every record becomes `/gallery/{slug}/` and a
   sitemap entry. `dynamicParams = false` keeps unknown slugs at 404.
9. **Images are pre-optimised WebP, committed to the repo.** Do NOT re-add the source PNGs — they
   were 20.6 MB for 23 files. The conversion is ≤1400 px wide, quality 82, alpha stripped. Only the
   first image on a page is `priority`; everything else is lazy.
10. **Two suburbs in the gallery are Tier-1** (Castle Hill, Randwick) and one is not in the site
   structure at all (Hornsby). When location pages get built, import from `lib/projects.ts` rather
   than copying image paths.
11. **`service-areas.json` is the ONLY suburb list.** 187 suburbs, 5 regions, verified zero
   duplicates across regions. A suburb in two regions makes two hubs compete — the add script
   checks for this. Never retype the list into a component.
12. **Adding a region does NOT publish it.** `hubPublished: true` does. This is deliberate
   (D-73) and is the guard against §4.4 plus D-10's thin-page rule.
13. **Internal links to location hubs follow publication state.** Use `AreasServedLinks` for
    home/service hub cards and `publishedRegionForSuburb()` for gallery project-to-hub links. Do not
    hand-code a link to a dark hub or an unbuilt Tier-1 suburb page; that recreates the 404-link
    defect fixed in D-118.
14. **Dark surfaces need `--et-text-inverse`.** `.et-quote` hard-sets the light-mode ink colour;
   overrides for `.et-band-ink` / `.et-card-dark` live at the end of `globals.css` (D-81). If you
   add a new component that can sit on an ink band, check its contrast before shipping.
15. **The form's JS is on every route** because `ContactSection` is on every page (D-80). Homepage
   JS is **179 KB gzipped — over the ≤150 KB shared-route budget line.** Accepted deliberately.
   Slim the form if it must come down; do not strip the form from pages.
16. **Analytics: GTM-MVGQB9FW is installed** (K4 closed — 2026-08-31). Architecture: Website →
   GTM → Google tag (G-06GQGHHP0X) → GA4. One measurement path (D-32). The standalone Google
   tag GT-MBNT4TKH is NOT installed — it would create a duplicate path. GTM container holds:
   - **Tags:** GA4 - Google tag (Initialization - All Pages) · GA4 Event - phone_call_click
     (Click - Phone Call) · GA4 Event - email_click (Click - Email) · GA4 Event - generate_lead
     (Form Submit - Contact)
   - **Triggers:** Click - Phone Call (Just Links, Click URL starts with tel:) · Click - Email
     (Just Links, Click URL starts with mailto:) · Form Submit - Contact (Form Submission, Page
     URL contains /contact-us/)
   - **Variables:** Click Element · Click URL · Click Text · Form ID (all built-in)
   GTM snippet is in `app/layout.tsx` (Script strategy="afterInteractive" + noscript iframe).
   Container ID in `.env.local` as NEXT_PUBLIC_GTM_ID. All call CTAs are real `tel:` anchors
   (D-33) — verified 4 anchors, 0 button CTAs — so a single delegated listener is all that
   is needed. **GTM Version 2 published 2026-08-31** — confirmed in Tag Assistant: base tag
   fires on page load, 2 Google tags detected (GTM-MVGQB9FW + G-06GQGHHP0X), source
   "On-page gtm.js snippet". Remaining: (1) mark phone_call_click + generate_lead as key
   events in GA4 console; (2) add NEXT_PUBLIC_GTM_ID=GTM-MVGQB9FW to Vercel environment
   variables; (3) owner redeploys to Vercel (D-35).
16. **`.et-hero-media` is a fixed 4/3 ratio at every breakpoint** (D-84). Every source photo in
   `lib/projects.ts` is landscape (~3/2) — do not reintroduce a portrait override for "desktop
   polish"; that exact change was the reported crop bug.
17. **`SERVICE_HERO_IMAGE` in `app/services/[slug]/page.tsx` only has two entries.** Only
   `bathroom-renovations` and `ensuite-bathroom-renovations` have real photography. Adding a third
   entry for `laundry-renovations` or `powder-room-renovations` puts an unevidenced photo on a page
   that has none — check D-83/D-06 before touching this map.
18. **Only the office notification email is allowed to fail the enquiry submission** (D-85). The
   customer confirmation email and the Supabase insert are both wrapped in their own try/catch and
   only `console.error` on failure — never make either of them `return`/`throw` on error, or a
   Resend or Supabase hiccup would turn a successfully-captured lead into an error page.
19. **`SUPABASE_SERVICE_ROLE_KEY` must be set in Vercel for the Supabase write to run at all** —
   when it's unset, `lib/actions.ts` sets its module-level `supabase` client to `null` and the
   insert is skipped (not attempted, not logged as an error). The `enquiries` table has RLS enabled
   with no insert policy, so the `anon` key could not write to it even if used instead.
20. **`.next/` is a shared build directory and this repo is regularly worked by several agent
    sessions at once** (Git Workflow's "never `git add -A`" warning is the same fact). A `next start`
    left running gets its served output silently corrupted the moment another session's `next build`
    lands underneath it — no crash, no error, just wrong content (a homepage that suddenly measures
    4,600 words instead of 700) or routes 404ing that build fine moments later. It is NOT evidence
    your own change broke something. Prefer reading `.next/server/app/**.html` straight off disk
    (`scripts/check-readability.mjs` does this) over holding a live server open — a single file read
    right after your own build has a far smaller collision window than a server process sitting
    there for the next several commands. If you do need `next start`, treat any unexplained 404 or
    nonsense content as a possible collision and re-build-and-recheck once before debugging your own
    code.
21. **Related-projects card labels are shortened to room-types** (e.g. "Bathroom" / "Ensuite") in the "Other work of ours" grid on `/gallery/{slug}/` pages (D-109). This is a deliberate UI/content rule to prevent the 4-syllable word "renovation" from repeating 10 times in the grid on every gallery page, which would single-handedly fail the Flesch readability gate (K15). The full project name is still the page H1, title and meta description, and the suburb badge still sits on the card.

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

Readability (docs/CONTENT_QUALITY_CHECKLIST.md §2, D-96) needs only a build, no server:

```bash
npm run build
npm run check:readability          # reads .next/server/app/**.html directly
```
