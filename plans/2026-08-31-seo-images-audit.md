# Image SEO Audit — Elite Touch Renovations

**Task:** `/seo-images` — image optimisation, alt text, formats, responsive delivery, CLS, image
discoverability. **Planning only.** No files changed, nothing implemented, committed, or deployed,
no implementation issues opened here.

**Date:** 2026-08-31
**Method:** inventoried every image in `public/`, every `alt` string in `lib/projects.ts`, and the
rendered `<img>` markup in the 2026-08-30 production build.
**Overlap note:** AVIF format support and the OG-image gap are already in the technical audit
(L-3, H-3); the `@id`/`ImageObject` markup is in the schema audit (S-2). Not re-raised as new work.

---

## Image Audit Summary

| Metric | Status | Detail |
|---|---|---|
| Total images | — | 55 project photos + 4 brand assets, all `.webp` |
| Delivery | ✅ | `next/image` on every one → Vercel edge CDN (`/_next/image`), auto `srcset`, auto `decoding="async"` |
| Missing alt text | ✅ none | Every project photo has a hand-written factual `alt` (D-36/§4.9). Decorative header logo correctly `alt=""`; footer logo has a meaningful alt. |
| Dimensions (CLS) | ✅ | `width` + `height` on every image (from `lib/projects.ts`) — zero layout shift risk |
| Lazy loading | ✅ | `loading="lazy"` on all below-fold; first image per page is `priority` (eager + `fetchpriority=high` + preload). `lazy_method: native`. |
| File size | ✅ | Largest source file 96 KB; most 40–80 KB; total `public/images` ≈ 2.8 MB. Within the content-image budget and `docs/PERFORMANCE_BUDGET.md`. |
| File names | ✅ | Descriptive, hyphenated, lowercase, inside project-slug folders (`castle-hill-bathroom/double-vanity-led-mirror.webp`) |
| Format | ⚠️ | All WebP, no AVIF variant — **already tracked as technical audit L-3** |
| Alt text length | ✅ improved | Extreme alts trimmed in issue #44; published gallery alts now max 196 chars with 0 over 200 — see I-3 |
| Image sitemap | ❌ | No `<image:image>` entries anywhere — see I-1 |
| IPTC / XMP metadata | ✅ fixed | Issue #44 embedded XMP Creator / Credit / Rights on all 60 current project WebPs — see I-2 |
| `sizes` accuracy | ⚠️ | The gallery-detail lead image claims `100vw` on all breakpoints — see I-4 |

**Image SEO score: 82 / 100.** The *delivery* is genuinely excellent — this is a well-built
`next/image` implementation. The gaps are discoverability (no image sitemap), provenance (no
embedded metadata), and two refinements (alt length, one `sizes` value).

---

## Findings

### I-1 · No image sitemap / no image entries in `sitemap.xml`  ·  MEDIUM

**What.** `app/sitemap.ts` emits page URLs only. `MetadataRoute.Sitemap` supports a per-entry
`images: string[]` array, which Next renders as `<image:image>` — none is used.

**Why it matters.** This is a photo-led renovation site. Google Images is a real discovery channel
for "bathroom renovation ideas sydney" (GKP 10–100), "small bathroom renovation", and suburb +
"bathroom" image searches. `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 2 also calls for a segmented
sitemap. Listing each gallery page's project photos (absolute URLs) in its sitemap entry is the
cheapest way to get 55 genuinely unique, well-captioned, first-party project images crawled and
considered for Image search.

**Recommended solution.** In `app/sitemap.ts`, add `images: project.images.map(i => \`${base}${i.src}\`)`
to each `/gallery/{slug}/` entry (and the hub entries' local project photos, and the service-page
hero photos). Absolute URLs only.

**Files:** `app/sitemap.ts`, reads from `lib/projects.ts`.
**Priority:** Medium. **Effort:** S. **Risk:** low. **Dependency:** shares the "real content dates"
work with technical M-2 / content C-5 (same file).

### I-2 · Project photos carry no IPTC/XMP metadata (Creator / Credit / Copyright)  ·  LOW–MEDIUM — CLOSED 2026-09-01

**What.** The WebP conversion (D-99: quality 82, alpha stripped) stripped all embedded metadata.
`exiftool` on any project file returns no `Creator`, `Credit`, `Rights`, or `Description`.

**Why it matters.** Google Images displays IPTC `Creator`, `Credit Line`, and `Copyright` in the
image viewer and licensing panel. It is **not a ranking factor**, but for a business publishing
photos of *its own completed work* — where provenance and "this is genuinely our job, not a stock
photo" is the entire point (D-36) — embedding `Creator: Elite Touch Renovations`,
`Credit: Elite Touch Renovations`, `Rights: © Elite Touch Renovations` is a free brand-attribution
and authenticity signal. WebP uses XMP (not IPTC) — `exiftool` handles the mapping.

**Recommended solution.** A one-off batch pass with `exiftool` over `public/images/projects/**/*.webp`
injecting XMP `Creator`, `Credit`, `Rights`, and optionally `Description` = the existing alt text.
Add it as a step in the image-conversion script so future photos get it automatically. Needs
`exiftool` installed (`libimage-exiftool-perl`).

**Files:** `public/images/projects/**` (metadata only, pixels unchanged), the conversion script
(not in the repo — `scripts/` has no image script yet; the conversion process is documented in
`plans/2026-08-25-new-project-photos-intake.md`).
**Priority:** Low–Medium. **Effort:** S (one batch run). **Risk:** low — metadata only; re-verify a
sample renders identically. **Dependency:** none.

**Implemented in issue #44.** `exiftool` was not installed in this environment, so a local script
now handles the same WebP XMP job: `scripts/inject-project-image-xmp.mjs`, exposed as
`npm run images:xmp` and `npm run images:xmp:verify`. The pass updated all 60 current WebPs under
`public/images/projects/` with XMP Creator, Credit and Rights. The 55 published images also receive
their alt text as XMP description; five unreferenced files receive ownership metadata only.

### I-3 · 51 of 55 alt strings exceed the ~125-character comfort limit  ·  LOW — CLOSED 2026-09-01

**What.** Median alt length is 177 chars, max 268 (e.g. Castle Hill's lead image:
*"Light oak wall-hung double vanity with a white stone top, two round white vessel basins, brushed
nickel wall-mounted mixers, and a wide LED backlit mirror above, against large-format grey
stone-look tiles."* — 205 chars).

**Why it's only Low.** This is a **known, deliberate trade-off**. D-36 / PROJECT_CONTEXT §4.9
require alt text to describe the *photograph accurately* so a trade site never makes a false visual
claim — and that produces long, specific strings. Google reads the full alt; the cost is screen-
reader verbosity (some AT truncate around 125–150 chars) and mild redundancy.

**Recommended solution (optional).** Trim only the extreme cases (>200 chars, ~8 images) to ~150 by
dropping the least salient trailing clause (usually the "against … tiles" background), keeping every
load-bearing detail. **Do not gut them** and do not touch the ones already under ~180. If the owner
/ `DECISIONS.md` prefers the current accuracy-first standard as-is, that is a defensible call —
document it and close this.

**Files:** `lib/projects.ts`. **Priority:** Low. **Effort:** S. **Risk:** low (accuracy must be
preserved — hand edit, per §4.9).

**Implemented in issue #44.** Only the extreme `lib/projects.ts` alts over 200 characters were
hand-trimmed. The published gallery now has 55 alt strings with 0 over 200 characters and a max of
196, while the factual photo details remain intact.

### I-4 · Gallery-detail lead image `sizes` over-claims  ·  MEDIUM (perf)

**What.** On `/gallery/{slug}/` the first (`et-photo-wide`) image renders
`sizes="(min-width: 1024px) 100vw, 100vw"` — i.e. `100vw` at every breakpoint. If the photo grid
sits inside a max-width container (~1100–1200 px), a 1920 px viewport requests a ~1920 w image for a
~1150 px slot.

**Why it matters.** `docs/PERFORMANCE_BUDGET.md` rule 15: `sizes` must state the *measured* rendered
width. This image is also the page's LCP candidate, so over-fetching it directly costs LCP on
desktop. The same rule flagged 26 KB of waste on the sibling project.

**Recommended solution.** Measure the rendered element at 390 px / 768 px / 1280 px / 1920 px in a
browser, then set an accurate `sizes` (likely `(min-width: 1200px) 1120px, 100vw` or similar). Do
the same measurement pass for the homepage hero (`(min-width: 1024px) 40vw`) and the hub project
cards while in there — the technical audit's L-8 (live Lighthouse) is the natural moment.

**Files:** `app/gallery/[slug]/page.tsx` (and re-verify `components/PageHero.tsx`,
`components/WorkStrip.tsx`, `app/page.tsx`).
**Priority:** Medium. **Effort:** S (needs a browser). **Risk:** low. **Dependency:** best done with
technical L-8 (live CWV measurement).

### I-5 · `next.config.ts` has no `images` block  ·  LOW (fold into technical L-3)

No `formats` (→ no AVIF), default `minimumCacheTTL` (short — the project photos are immutable and
could cache far longer at the optimiser), default `deviceSizes`/`imageSizes` (fine). Adding:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 2678400, // 31 days — these assets are content-hashed and immutable
}
```

would cut the LCP image ~15–25% and reduce repeat optimisation cost. **Measure before/after** per
`docs/PERFORMANCE_BUDGET.md` §3. **This is the same fix as technical audit L-3** — consolidate there,
just add the `minimumCacheTTL` line to that item.

---

## What is already correct — leave alone

- `next/image` everywhere → automatic `srcset`, `decoding="async"`, lazy loading, edge-CDN
  optimisation. No raw `<img>` tags anywhere.
- `width` + `height` on every image — CLS is a solved problem here.
- Exactly one `priority` / `fetchpriority="high"` image per page (the LCP candidate);
  everything else `loading="lazy"` — matches `docs/PERFORMANCE_BUDGET.md` rules 3, 13, 16.
- Descriptive, hyphenated, lowercase filenames in project-slug folders.
- Real, hand-written, factual alt text on every content image; correct `alt=""` on the one
  decorative image. The D-36 pipeline is doing its job.
- Source files already WebP, pre-compressed (q82), ≤ 96 KB — no oversized originals in the repo
  (D-99's "do not re-add the source PNGs" rule).
- Genuine first-party photography — the single biggest image-SEO asset a renovation site can have.

---

## Dedupe map for the master plan

| Item | Also raised in | Treatment |
|---|---|---|
| AVIF + `minimumCacheTTL` (I-5) | technical L-3 | **Merge into technical L-3 issue**; add the cache-TTL line. |
| `sizes` accuracy (I-4) | technical L-8 (live CWV), PERFORMANCE_BUDGET rule 15 | **Fold into the live-Lighthouse issue** as a concrete sub-task. |
| Image sitemap (I-1) | technical M-2 / content C-5 (same `sitemap.ts` file) | **One issue** — "real content dates + image entries in sitemap.xml". |
| IPTC/XMP metadata (I-2) | — (new) | **Closed in #44** — local WebP XMP script plus one-off batch pass. |
| `ImageObject` schema (schema S-2) | schema audit | Separate — markup, not files. May pair with C-8 (project story copy). |
| Alt length trim (I-3) | — (new) | **Closed in #44** — extreme alts trimmed; accuracy-first rule preserved. |

---

## Confirmation

- Audit complete. Every image asset and every rendered `<img>` assessed against alt-text, format,
  size, responsive, lazy-loading, CLS, filename, metadata, and discoverability criteria;
  de-duplicated against the technical, schema, and content audits.
- Findings saved to `plans/2026-08-31-seo-images-audit.md`.
- No files modified, nothing implemented, committed, or deployed; no implementation issues opened.
