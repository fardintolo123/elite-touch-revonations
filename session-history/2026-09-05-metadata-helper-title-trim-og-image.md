# Session Summary

## 1. Session Objective

Continue working the SEO master-plan backlog (`plans/2026-08-31-seo-master-plan.md`) in a shared,
multi-session working tree. This session shipped, in order: issue #39 (gallery meta descriptions),
issue #19 (`buildMetadata()` helper / `og:url` fix), issue #21 (two over-length `<title>` tags), issue
#20 (sitewide `og:image`/`twitter:image`), and a same-day follow-up to #20 (dedicated share images for
`/packages/` and the 3 published hubs).

## 2. Work Completed

**Issue #39 — gallery meta descriptions (audit M-3 / page-audit P-3b):**
- `lib/projects.ts`: added an optional `metaDescription?: string` field to `Project`, a hand-written
  ≤155-char value on 9 of the 11 projects, and a `projectMetaDescription(project)` helper that falls
  back to `blurb` trimmed at a word boundary for the other 2 (already short enough).
- `app/gallery/[slug]/page.tsx` `generateMetadata` and `app/gallery/page.tsx` `metadata.description`
  wired to use the helper. `blurb` itself (the visible lead paragraph + gallery card text) was never
  changed.

**Issue #19 — `lib/metadata.ts` `buildMetadata()` helper (tech-audit H-2):**
- New `lib/metadata.ts` exporting `buildMetadata({ path, title, description, type?, images? })`,
  returning `title`, `description`, `alternates.canonical`, and a full `openGraph` object
  (`type`, `locale: 'en_AU'`, `siteName`, `url`, optional `images`).
- Migrated all 11 page metadata sources to it: `app/page.tsx`, `app/about-us/page.tsx`,
  `app/contact-us/page.tsx`, `app/packages/page.tsx`, `app/services/page.tsx`,
  `app/terms/page.tsx`, `app/privacy/page.tsx`, `app/gallery/page.tsx`,
  `app/gallery/[slug]/page.tsx`, `app/services/[slug]/page.tsx`,
  `app/services/[slug]/[location]/page.tsx`. Pure refactor — no title/description string changed.
- Root cause (confirmed from the vendored Next 16 docs and empirically from built HTML, not
  assumed): Next merges metadata **shallowly** between `layout.tsx` and a page — duplicate keys are
  *replaced*, not deep-merged. `app/layout.tsx` set `openGraph.url: businessInfo.siteUrl` once; any
  page that didn't set its own `openGraph` shipped the homepage's `og:url`. The 11 gallery pages,
  which DID set their own `openGraph` (for `og:type: 'article'`), had the opposite problem — that
  replaced the whole object, so they served no `og:site_name`, no `og:locale`, no `og:url`, and an
  un-templated `og:title` (missing the `" | Elite Touch Renovations"` suffix).
- `buildMetadata()` deliberately does NOT set `openGraph.title`/`description` — Next auto-fills both
  from the page's own already-templated `title`/`description` when `openGraph` sets neither
  (confirmed in `next/dist/lib/metadata/resolve-metadata.js` `postProcessMetadata`), and that
  auto-fill also feeds `twitter:title`/`description`.

**Issue #21 — two over-length `<title>` tags (tech-audit M-5):**
- `app/packages/page.tsx`: title → `"Bathroom Renovation Cost, Sydney"` (58 chars with the brand
  tail, was 61 with a pixel-widening `&`).
- `lib/businessInfo.ts`: added an optional `metaTitle?: string` to the `laundry-renovations` service
  record (`'Bathroom + Laundry Renovations'`, reusing the existing `title` field value — no new
  copy).
- `app/services/[slug]/page.tsx` `generateMetadata`: `title: 'metaTitle' in service ?
  service.metaTitle : service.h1` — TypeScript `in`-narrowing on the literal union from
  `(typeof services)[number]` (the array is a plain `as const` literal, not a hand-written
  interface, so this narrowing pattern is required rather than an optional-field type check).
- Neither page's H1, meta description, or any visible copy changed.

**Issue #20 — sitewide `og:image`/`twitter:image` (tech-audit H-3), plus same-day follow-up:**
- New `scripts/generate-og-image.mjs` (config-driven, uses `sharp`, already a project dependency via
  `next/image`) composites 5 static JPEGs into `public/og/`:
  - `default.jpg` — sitewide default. Background: `artarmon-bathroom-ensuite/double-vanity-corner-window.webp`
    (already one of `businessInfo.schema.images`). Headline "Sydney Bathroom Renovations".
  - `packages.jpg` — `/packages/` override. Background: `hunters-hill-bathroom/freestanding-bath-shutters.webp`.
    Subline states the real starting price ("From $18,000") instead of the generic trust line.
  - `hills-district.jpg` / `eastern-suburbs.jpg` / `north-shore.jpg` — hub overrides. Each uses a
    project photo of a suburb actually located in that region per `service-areas.json`: Castle Hill
    (Hills District), Randwick (Eastern Suburbs), Artarmon (North Shore — a DIFFERENT Artarmon
    project from the sitewide default's, `artarmon-bathroom/full-room-shower-toilet.webp` vs.
    `artarmon-bathroom-ensuite/...`).
  - Every image: 1200×630 JPEG (quality 82, mozjpeg), a bottom dark linear-gradient scrim, the light
    ETR mark (`public/brand/etr-mark-light.webp`), a headline, a subline of facts already published
    elsewhere on the site (no invented claims), and a magenta accent rule.
- `app/layout.tsx`: sitewide `openGraph.images` default (same asset) + `twitter: { card:
  'summary_large_image' }`.
- `lib/metadata.ts` `buildMetadata()`: `images` parameter now defaults to `[DEFAULT_OG_IMAGE]`
  (`{url:'/og/default.jpg', width:1200, height:630, alt:...}`) when a page doesn't pass its own —
  every page gets a real image with no per-page code needed, except the 4 that now override it.
- `app/gallery/[slug]/page.tsx`: gallery lead photo now passed as a full `{url, width, height, alt}`
  object (data already existed in `lib/projects.ts`) instead of a bare URL string, so
  `og:image:width`/`height` are populated there too (previously missing entirely).
- `app/packages/page.tsx`: passes `images: [{url:'/og/packages.jpg', ...}]`.
- `app/services/[slug]/[location]/page.tsx`: new `HUB_OG_IMAGE: Record<string,string>` slug map
  (`hills-district`, `eastern-suburbs`, `north-shore` → their respective files); a region with no
  entry falls back to the sitewide default through `buildMetadata()`'s own default.

## 3. Important Decisions

**Decision: `buildMetadata()` never sets `openGraph.title`/`description` explicitly.**
- Reason: Next auto-fills both from the page's resolved `title`/`description` (which already went
  through the root layout's title template) whenever `openGraph` doesn't set them itself. Setting
  them explicitly would freeze `og:title` at the RAW, un-templated title string.
- Alternative considered: explicitly duplicate `title`/`description` into the `openGraph` object on
  every call (what the gallery pages did before this session, and what caused their `og:title` to be
  missing the brand suffix).
- Why rejected: it reproduces exactly the gallery-page bug this issue was fixing.

**Decision: laundry service `<title>` drops "Sydney"; packages `<title>` drops "& Packages".**
- Reason: the fixed `" | Elite Touch Renovations"` template tail is 26 characters, leaving a 34-char
  budget for the short title. No phrasing keeping "Bathroom" + "Laundry" + "Renovations" +
  "Sydney" all spelled out fits in 34 chars (tested and measured multiple candidates).
- Alternatives considered: abbreviating "Renovations" to "Reno"/"Renos" to keep Sydney in the title.
- Why rejected: "Reno" appears nowhere else in the site's copy or voice; introducing it for one title
  tag only would be an inconsistent, unprecedented abbreviation. The H1, meta description, and
  breadcrumb schema on that same page all still carry "Sydney", so the location signal isn't lost
  from the page overall, only from that one `<title>` tag.

**Decision: OG images use "Segoe UI" instead of Jost (DESIGN.md's one typeface).**
- Reason: extensive testing (see "Permanent Rules" below) showed sharp's bundled SVG renderer
  (librsvg → Pango → FreeType) has no working path to embed a custom font. Only exact
  Windows-installed family names resolved to real glyphs.
- Alternatives considered and tried, in order: (1) embed the source `.woff2` via CSS `@font-face`
  with a base64 data URI — rendered as a generic fallback font, not Jost. (2) decompress the WOFF2 to
  a static TTF instance via `fonttools` (`pip install fonttools brotli`) and embed THAT via
  `@font-face` — rendered as full `.notdef` "tofu" boxes. (3) register Jost as a system-visible font
  via a custom `FONTCONFIG_FILE` pointing fontconfig at a directory containing the TTF — also
  rendered as tofu, because the custom fontconfig file replaces sharp's bundled defaults wholesale
  rather than extending them, likely breaking something more fundamental in font resolution. Also
  tested every generic CSS keyword (`sans-serif`, `Helvetica`, `Roboto`, `Noto Sans`) — all fell back
  to the same broken tofu/fallback behavior. Only "Segoe UI", "Arial", "Verdana" (exact
  Windows-installed names) rendered correctly, because libvips-on-Windows reads the OS font system
  directly, bypassing fontconfig.
- Why the chosen approach was preferred: it is the only one that actually produces legible text.
  Scoped narrowly and documented prominently (in the script's own header comment, the plan files, and
  DECISIONS.md D-128) as an exception for these 5 static binary assets only — never seen next to real
  site chrome, so DESIGN.md's typography rule (which governs the rendered site) is not violated in
  spirit, only technically bent for images the rule wasn't written to anticipate.

**Decision: no fresh Lighthouse run recorded for the `og:image` work.**
- Reason: `og:image`/`twitter:image` are `<meta>` tags never fetched by a visitor's browser during a
  normal page load — only social/messaging crawlers request the file, out-of-band, when building a
  link preview. There is structurally nothing for a page-weight/LCP/CWV budget to measure.
- Alternative considered: run a full before/after Lighthouse pass anyway, matching the pattern other
  sessions used for content changes (e.g. the 2026-09-01 powder-room FAQ baseline).
- Why rejected: would have been a redundant, time-costly measurement of something structurally
  incapable of showing a difference. Recorded the reasoning as a `docs/PERFORMANCE_BUDGET.md` §4 row
  instead of a real measurement row, explicitly labeled `n/a` across every metric column.

## 4. Permanent Rules / Lessons

- **Next.js metadata merges SHALLOWLY between `layout.tsx` and a page — duplicate top-level keys
  (like `openGraph`) are REPLACED wholesale, never deep-merged.** Any page that sets its own
  `openGraph` object must re-specify every field it wants to keep from the layout default
  (`type`, `locale`, `siteName`, `url`, `images`), or those fields silently vanish from that page's
  `<meta>` tags. This is exactly the bug the gallery pages had before issue #19.
- **`title.template` set on the root `layout.tsx` does NOT apply to a `title` set in `app/page.tsx`**
  (the homepage) — because they're in the same route segment. Every other page (one level deeper)
  DOES get the template applied automatically. This means the homepage's title must always include
  the full `" | Elite Touch Renovations"` suffix written out by hand; every other page's title should
  be the short form only.
- **`openGraph.title`/`openGraph.description` should be left unset when using a shared metadata
  helper** — Next auto-fills them from the page's own resolved (already-templated) `title`/
  `description` (`postProcessMetadata` in `next/dist/lib/metadata/resolve-metadata.js`), and that
  auto-fill is also what feeds `twitter:title`/`twitter:description`. Setting them explicitly
  bypasses the title template.
- **`twitter.card` only needs to be set ONCE on the root layout** if no page sets its own `twitter`
  object — the un-set top-level key inherits from the layout across the shallow merge. Per-page
  `twitter.title`/`description`/`images` still auto-fill from that page's own `openGraph`.
- **sharp's bundled SVG text renderer cannot reliably use a custom/embedded font on this Windows
  build machine.** If a future task needs custom-font text baked into a `sharp`-composited image,
  budget time to either accept a close system-font substitute (documented as this session did) or
  find/verify a different toolchain (e.g., Next's `ImageResponse`/Satori file-convention
  `opengraph-image.tsx`, which was NOT tried this session and might handle font embedding
  differently — worth trying first next time before repeating the fontconfig detour this session
  went through).
- **In a shared multi-session working tree, another background process periodically runs something
  like `git add -A && git commit -m "1" && git push`,** sweeping in whatever is on disk regardless of
  which session wrote it. Uncommitted work from this session was swept into commits `867e30c` /
  `0811970` / `23fc931` (exact commit landing a given change in is not something this session
  controls or can predict) without this session ever running `git commit` itself. Do not assume work
  is lost just because `git status` goes clean without an explicit commit from this session — check
  `git log` / `git show HEAD:<file>` before concluding anything was lost.

## 5. Things We Explicitly Decided NOT To Do

- **Did not generate a dedicated 1200×630 crop for each of the 11 gallery projects' own lead photo.**
  The issue's other ask, left as explicit follow-up scope. Reason: lower urgency — those pages
  already had a real photo each (just not an ideal crop/no explicit dimensions before this session);
  the bigger defect (money pages with NO image at all) was fixed first and is now fully closed.
- **Did not override the `og:image` for the 4 service pages** (bathroom/ensuite/laundry/powder-room)
  or the services index — they use the sitewide default. Only `/packages/` and the 3 hubs got
  dedicated images this session, per the user's explicit request ("Packages, the 3 area pages").
- **Did not pursue Next's `opengraph-image.tsx` file-convention / `ImageResponse` API** as an
  alternative to the `sharp`-script approach — went with a committed static asset instead, since the
  issue itself suggested "committed under `public/` or a build step" and a static asset costs nothing
  at request time. `ImageResponse`/Satori was not evaluated for whether it would have solved the font
  problem differently; noted above as worth trying in a future session if font fidelity matters more.
- **Did not attempt to install Jost as an actual Windows system font** to solve the rendering
  problem (e.g. via `fc-cache`/registry font installation) — considered too invasive an environment
  change for a one-off asset-generation script.

## 6. Current Project State

- **Working:** All 32 routes build green. Every page now has a correct, per-page `og:url`,
  `og:site_name`, `og:locale`, `og:image` (with real `width`/`height`/`alt`), and
  `twitter:card: summary_large_image`. Two previously over-length `<title>` tags are now ≤ 60 chars.
  All 11 gallery meta descriptions and the gallery index description are ≤ 155 chars.
- **Incomplete / follow-up noted, not blocking anything:** gallery project pages still use their raw
  ~3:2 lead photo as `og:image` rather than a purpose-cropped 1200×630 image (they do now have
  correct `width`/`height`, which they lacked before this session).
- **Known limitation:** the 5 committed OG images (`public/og/*.jpg`) use "Segoe UI" text rendering,
  not the site's Jost typeface, due to a tooling limitation in the image-generation script's
  environment (see §4). This only affects these 5 static images, not the rendered website.
- **Build/perf state:** `npx tsc --noEmit` clean, `npm run build` green (32 routes, unchanged count
  throughout this session), `npm run check:readability` 26/26 ≥ 60 throughout (no visible copy was
  changed by any change in this session). No new npm dependency was added (`sharp` was already
  present via `next/image`). `fonttools`/`brotli` were installed via `pip` (Python, not
  npm/package.json) purely for one-time font-format investigation during this session and do not
  affect the Next.js app's dependency tree at all.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `lib/projects.ts` | Added `metaDescription?` field + `projectMetaDescription()` helper; 9 hand-written values | Issue #39 |
| `app/gallery/page.tsx` | `metadata.description` shortened to ≤155 chars; later migrated to `buildMetadata()` | Issue #39, then #19 |
| `app/gallery/[slug]/page.tsx` | `generateMetadata` uses `projectMetaDescription()`; later migrated to `buildMetadata()`; later image param upgraded to `{url,width,height,alt}` | Issues #39, #19, #20 |
| `app/page.tsx` | Migrated to `buildMetadata()` | Issue #19 |
| `app/about-us/page.tsx` | Migrated to `buildMetadata()` | Issue #19 |
| `app/contact-us/page.tsx` | Migrated to `buildMetadata()` | Issue #19 |
| `app/packages/page.tsx` | Migrated to `buildMetadata()`; title trimmed; dedicated `og:image` added | Issues #19, #21, #20 |
| `app/services/page.tsx` | Migrated to `buildMetadata()` | Issue #19 |
| `app/terms/page.tsx` | Migrated to `buildMetadata()` | Issue #19 |
| `app/privacy/page.tsx` | Migrated to `buildMetadata()` | Issue #19 |
| `app/services/[slug]/page.tsx` | Migrated to `buildMetadata()`; `metaTitle` override read for laundry | Issues #19, #21 |
| `app/services/[slug]/[location]/page.tsx` | Migrated to `buildMetadata()`; `HUB_OG_IMAGE` map added | Issues #19, #20 |
| `app/layout.tsx` | Added default `openGraph.images` + `twitter.card` | Issue #20 |
| `lib/businessInfo.ts` | Added optional `metaTitle` field to `laundry-renovations` | Issue #21 |
| `docs/PERFORMANCE_BUDGET.md` | Added a §4 row documenting zero render-path impact from `og:image` | Issue #20 |
| `plans/2026-08-31-issue-15-seo-technical-audit.md` | M-3, H-2, M-5, H-3 findings marked SHIPPED with detail | All 4 issues |
| `plans/2026-08-31-seo-master-plan.md` | Registry rows + Phase B/C roadmap rows updated for #19/#20/#21/#39 | All 4 issues |
| `DECISIONS.md` | D-117 (#39), D-124 (#19), D-127 (#21), D-128 (#20), D-129 (#20 follow-up) added | All 4 issues |

## 8. Files Created

- `lib/metadata.ts` — the `buildMetadata()` helper (issue #19).
- `scripts/generate-og-image.mjs` — config-driven `sharp` script generating all 5 OG images (issue #20 + follow-up).
- `public/og/default.jpg`, `public/og/packages.jpg`, `public/og/hills-district.jpg`, `public/og/eastern-suburbs.jpg`, `public/og/north-shore.jpg` — the generated share images.
- `plans/2026-09-02-issue-39-gallery-meta-descriptions.md`
- `plans/2026-09-04-issue-19-build-metadata-helper.md`
- `plans/2026-09-04-issue-21-title-trim.md`
- `plans/2026-09-04-issue-20-og-image-sitewide.md`
- This file.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npx tsc --noEmit` — run and clean after every code change in this session.
- `npm run build` — run and green (32 routes, no drop) after every code change in this session.
- `npm run check:readability` — run after every change; 26/26 ≥ 60 every time (no visible copy was
  ever touched).
- Full programmatic sweeps of built HTML (`.next/server/app/**/*.html`) after each change, checking
  `<title>` length, `<meta name="description">`, `og:url`, `og:site_name`, `og:locale`, `og:type`,
  `og:title`, `og:image`, `og:image:width`/`height`, `og:image:alt`, `twitter:card`,
  `twitter:description`, `twitter:image`, and `<link rel="canonical">` — across all 26 built HTML
  pages, repeated after each of the 4 issues.
- Visual inspection of all 5 generated OG images at both full size (1200×630) and a 400px-wide
  thumbnail scale, to confirm legibility.
- No Lighthouse/PageSpeed run this session (deliberately, for the `og:image` work — see §3/§4). No
  Playwright browser test this session (no visible UI changed).

## 11. Performance Impact

Not measured with a fresh Lighthouse/PSI run. Reasoning recorded in
`docs/PERFORMANCE_BUDGET.md` §4 (2026-09-04 row): every change this session was either (a) pure
metadata/`<meta>`-tag content invisible to a real visitor's browser during a normal page load
(`og:*`, `twitter:*`, `<title>`, `<meta name="description">`), or (b) a committed static image file
(`public/og/*.jpg`, 45–70 KB each) that is never linked from any page's HTML and is only fetched by
social/messaging crawlers out-of-band. No script, font, or client-boundary change occurred. No new
npm dependency was added. First Load JS, LCP, and every other CWV metric are structurally unaffected.

## 12. SEO Impact

- **Metadata correctness (site-wide):** every page's `og:url` now matches its own canonical URL
  (was: homepage on every non-gallery page); every page has `og:site_name`/`og:locale` (was: missing
  on all 11 gallery pages); every page's `og:title` carries the full brand-templated string (was:
  missing the suffix on gallery pages).
  Nothing invented (D-06): all image sublines reuse facts already published elsewhere; region-photo
- **Rich share images:** every page now has a real `og:image`/`twitter:image` with correct
  dimensions and `twitter:card: summary_large_image` (was: bare text cards on 14+ pages, small-card
  `summary` everywhere, and missing dimensions on the 11 gallery pages that did have an image).
- **Title-tag length:** 2 titles that risked SERP pixel-truncation are now within the 60-char guide
  limit — `/packages/` and `/services/laundry-renovations/`.
- **Meta description length:** all 11 gallery project pages + the gallery index are now ≤ 155 chars
  (was: 9 of 11 ran 159–221 chars).
  mapping is real and checkable against `service-areas.json`, not asserted from memory.
- **Canonicals, indexation, internal linking:** unaffected by this session — no change to any of
  those mechanisms.
- **Keywords/search intent:** the `/packages/` title change ("Bathroom Renovation Cost, Sydney")
  moved slightly closer to the page's own documented primary keyword target
  (`bathroom renovation cost sydney`, D-104) versus the previous "& Packages" wording.

## 13. Remaining Tasks

### High Priority
- None identified by this session specific to metadata/OG work.

### Medium Priority
- Dedicated 1200×630 crops of each of the 11 gallery projects' own lead photo (currently the raw
  ~3:2 asset, now at least correctly dimensioned in the metadata).
- Consider extending `HUB_OG_IMAGE`-style per-page overrides to the 4 service pages if/when a
  stronger case emerges (not requested this session).

### Low Priority
- Re-investigate whether Next's `opengraph-image.tsx` file convention / `ImageResponse` (Satori)
  would allow genuine Jost-font rendering for these share images, instead of the "Segoe UI" fallback
  documented in `scripts/generate-og-image.mjs`. Not attempted this session — see §5.

## 14. Open Questions

- None raised to the owner this session — every choice made (title wording, font substitution,
  region-photo mapping, no-Lighthouse-run reasoning) was a judgment call within already-established
  project rules (DESIGN.md, D-06, the 60/155-char SEO guides), documented in DECISIONS.md rather than
  escalated, consistent with this project's "decide and record" autonomy model.

## 15. Next Session Handoff

- **Read first if continuing metadata/OG work:** `lib/metadata.ts` (the `buildMetadata()` helper —
  read its header comment fully before changing anything, it documents several non-obvious Next.js
  metadata-merge behaviors) and `scripts/generate-og-image.mjs` (same, for the font-rendering
  limitation).
- **Do NOT** re-attempt embedding Jost into the OG images via `@font-face` in a `sharp`-composited
  SVG on this machine — that path was tried three different ways this session and failed every time
  (see §3/§4). If font fidelity for these images becomes a priority, try Next's
  `opengraph-image.tsx`/`ImageResponse` file convention instead, which was never tried.
- **Do NOT** set `openGraph.title`/`openGraph.description` explicitly inside `buildMetadata()` or on
  any individual page that uses it — this breaks the title-template auto-fill (see §4).
- Issues #39, #19, #21, and #20 (plus its same-day follow-up) are all closed on GitHub with detailed
  verification comments. Their code is committed (via the shared tree's periodic sweep commits, not
  a commit this session ran directly) — confirmed present in `git log`/`git show HEAD:<file>` at
  session end.
- This is a heavily concurrent multi-session repo (~10 parallel `elite-touch-revonations-*` sessions
  were active during this session). Before starting new work, `git status` and re-check any file
  you're about to touch — other sessions land real work in this tree continuously.

## 16. Potential Documentation Updates

- `PROJECT_CONTEXT.md` could gain a short note under its architecture/metadata section describing
  `lib/metadata.ts` `buildMetadata()` as the standard way every page sets metadata, so future
  sessions don't hand-roll a `Metadata` object again.
- `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1 (which already requires `og:image`) could reference that
  the sitewide default + 4 page-specific overrides now exist, with a pointer to
  `scripts/generate-og-image.mjs` for how to add another override.
- `DESIGN.md` might benefit from a short, explicit note (near §3 Typography) that the Jost-typeface
  rule governs the rendered website and does not extend to server-generated static social-share
  images, where a documented font-tooling exception applies — this session's discovery, not
  previously written down anywhere permanent before D-128/D-129.

## 17. Conversation-Derived Insights

**Confirmed decisions:**
- The user explicitly directed, turn by turn, to proceed with each of: gallery meta descriptions
  (#39), then "decide what's the best next step" (this session chose #19 as the highest-leverage
  unblocked item), then explicitly "og:image sitewide" and "title trims" (#20 + #21), then explicitly
  "give Packages and the 3 area pages their own custom share photo" (the #20 follow-up).
- The user's replies were consistently terse ("go ahead", "2") — this session operated in an
  auto-mode-biased pattern, making reasonable calls without stopping for confirmation except where
  CLAUDE.md's own rules call for a genuine owner decision (none arose this session).

**Strong recommendations (this session's, not yet owner-confirmed):**
- Extending dedicated OG images to the 4 service pages, if the owner wants every "money page" fully
  covered (not just packages + hubs).
- Generating real 1200×630 crops of each gallery project's lead photo, closing the one remaining gap
  from the original H-3 finding.

**Ideas/proposals (not committed to):**
- Trying `ImageResponse`/Satori for genuine Jost-font OG images in a future session.

**Unresolved opinions:** none surfaced this session.
