# Session Summary

## 1. Session Objective

The owner gave eight items in one message: find out from Search Console why the site does not
show for "bathroom renovations sydney" and fix it; port 4 Elements Painting's image fade (they
attached a screenshot of it); make the enquiry form short and step-based "like 4EP"; use images
as backgrounds in heroes; shrink the oversized FAQs on `/packages/`; fix the "Blogs" nav item
showing nothing on hover; and report what else 4EP has that this site could use.

## 2. Work Completed

**Search Console diagnosis (no code fix was warranted).**
- 90-day query pull for `sc-domain:elitetouchrenovations.au`. The site DOES appear for the Sydney
  money terms, deep: "bathroom renovation in sydney" position 31.3, "affordable bathroom
  renovations sydney" 57.3, "bathroom renovations artarmon" 24.9 on 350 impressions,
  "ensuite renovations" 40.2 on 128 impressions, "bathroom renovation packages sydney" 17.3.
- Verified the target page live: `https://www.elitetouchrenovations.au/services/bathroom-renovations/`
  returns 200, title `Bathroom Renovations Sydney | Elite Touch Renovations`, H1
  `Bathroom Renovations Sydney`, self-referencing canonical. `app/robots.ts` and `proxy.ts` are
  both narrowly scoped; nothing blocks it.
- Conclusion: this is a ranking/authority problem on a head term, not an indexing bug. No
  technical defect to fix was found. TTFB on that live request was 2.85s (single sample,
  probably a cold Vercel start — not investigated).

**Blogs nav menu (D-173).** `components/layout/SiteHeader.tsx` gains `BlogsPanel` /
`BlogsMenu` / `BlogsHoverMenu`. Root cause: there was no panel at all — commit `ad6d3fa`
(2026-10-09, "Improve readability across published pages") deleted the per-post version because
78 long headlines repeated in sitewide chrome failed the Flesch gate on every page. The menu now
lists the seven topic groups with their guide counts, linking to the anchors the blog index
already renders. `lib/blog.ts` gains `blogTopics` + `getBlogTopicId`, and `app/blog/page.tsx`
was refactored to consume them so index and menu cannot drift.

**Shared FAQ accordion (D-169).** New `components/FaqList.tsx`; `/packages/`,
`/services/[slug]/` and `/blog/[slug]/` all use it. Replaces three inlined copies of
`<details className="et-card"><summary className="et-h4">`.

**Image surface fade (D-170).** New `.et-image-fade` utility in `app/globals.css`, ported from
4EP's `src/components/ui/ImageSurfaceFade.tsx`. Applied to the homepage services photo
(`app/page.tsx`) and `PageHero`'s column image.

**Backdrop hero (D-171).** `components/PageHero.tsx` gains a `backdrop` prop rendering a
full-bleed photo behind an ink scrim. Enabled on `/services/` and gated on `Boolean(heroProject)`
for `/services/[slug]/`.

**Two-step enquiry form (D-172).** `components/EnquiryForm.tsx` + `.module.css`: step 1 is a
one-tap room choice, step 2 is contact details, with a "Step 1 of 2" progress bar, a Back button,
and a "Skip - I am not sure yet" button.

**Commands run:** `npx tsc --noEmit` (clean), `npm run build --ignore-scripts` (green, 29 route
groups, no drop), `npm run check:design` (see section 3), `npm run check:readability` (see
section 6), `curl` against the built HTML, and browser verification at 1440 and 375.

## 3. Important Decisions

**Blogs menu lists categories, not posts.** Restoring the deleted per-post panel verbatim would
have re-broken the readability gate it was deleted for. Alternatives considered: restore it and
re-exclude nav from the readability script (rejected — the script was already changed in that same
commit to score prose over interface labels, so the gate is not the thing to keep editing); add
per-category blog routes (rejected — the index already has anchors, no new routes needed).

**The backdrop hero reuses the suburb hero's scrim, not DESIGN.md section 9's bottom-up one.**
ETR already had a working background-image hero in `.et-location-hero`. Using the `to top`
gradient would have created a second recipe for the same job. The 90deg wash
(0.96 to 0.82 at 42% to 0.38) also suits left-aligned copy over white tile far better. The button
and eyebrow treatments now share one selector list with the suburb hero.

**Literal `#ffffff` in the backdrop hero, not `--et-text-inverse`.** That token flips to
near-black under `prefers-color-scheme: dark`, but a photo behind an ink scrim is dark in both
schemes — which is exactly why `.et-location-hero-content .et-h1` already hard-codes white.

**`npm run check:design --update-baseline` rewrites the WHOLE baseline, not just your pattern.**
It absorbed one pre-existing committed-but-unbaselined gradient (the `max-width: 767px` override
of `.et-location-hero-media::after`) into the decorative-gradient count, and re-synced all the
advisory eyebrow counts downward. The `reason` string in `scripts/check-design-baseline.json` was
written to state exactly which hits are new and which were pre-existing drift.

## 4. Permanent Rules / Lessons

- **A deleted feature can look like a broken feature.** The owner reported "hovering Blogs shows
  nothing"; there was no dropdown to break. `git log -S` on the CSS class found the removal commit
  in one step. Check whether a thing ever existed before debugging why it fails.
- **`check:design --update-baseline` is not scoped to your change.** Read `git diff` on
  `scripts/check-design-baseline.json` after running it and make the `reason` string distinguish
  new hits from absorbed pre-existing drift, or the next session cannot tell which is which.
- **A gradient is not automatically a section-3 pattern-1 violation.** `.et-image-fade`
  interpolates `--et-image-fade-to`, the band's own background, so it has no colour of its own.
  The test is whether it adds decoration, not whether it is a `linear-gradient`.
- **Turbopack refuses a `node_modules` junction pointing outside the project root.** The isolated
  build copy in `D:\tmp` failed with "Symlink [project]/node_modules is invalid, it points out of
  the filesystem root". An isolated verification build needs real `node_modules`, not a link.
- **Search Console MCP free quota is 15 data pulls per day, shared across sessions.** It was
  exhausted after two calls in this session, so `inspect_url` could not be run. Plan the pulls
  before starting, not as you go.
- **Progressive enhancement idiom for multi-step forms:** render every step, gate visibility with
  CSS on `data-enhanced`/`data-current-step` (same shape as `HoverNavMenu`). A step behind client
  state drops fields out of the submitted `FormData`.

## 5. Things We Explicitly Decided NOT To Do

- **Did not fix the `/blog/` readability failure.** `npm run check:readability` reports 112/113,
  with `/blog/` at Flesch 53.2. This is not from this session's work: another session's commit
  `b134c87` added five comparison posts (73 to 78), and the index renders every post's title and
  description, so the added listing text pushed it under 60. Left for the session that owns it
  rather than rewriting their new post titles.
- **Did not touch `scripts/check-readability.mjs`.** Excluding the blog index from a gate is a
  decision to record, not a drive-by edit, and another session has that file modified.
- **Did not enable the backdrop hero on `/services/laundry-renovations/` or
  `/powder-room-renovations/`.** No evidenced photo exists for either (D-83/D-06).
- **Did not push or deploy.** Standing rule; no owner sign-off.
- **Did not implement the 4EP feature gaps found in section 6** — they were reported for the owner
  to choose from, not built unasked.

## 6. Current Project State

Working and verified: the Blogs menu opens at 1440 (hover, 8 links) and 375 (`<details>`); the
FAQ accordion renders compactly on `/packages/` and opens correctly; the backdrop hero renders on
`/services/` and the two photographed service pages and is legible at both breakpoints; the image
fade renders a 156px white-to-transparent gradient on the homepage services photo; the two-step
form advances on one tap, records the chosen room, and shows Back plus the real submit button on
step 2.

Known issues: `/blog/` fails the readability gate at 53.2 (cause in section 5, not this session's
work). Two commits are unpushed on `main` (`b134c87`, `d33fdb4`) — another session committed this
session's files bundled with its own work under those messages.

4EP features ETR still lacks, found while auditing and NOT built: visible breadcrumbs (ETR emits
breadcrumb schema but renders no breadcrumb trail on any of its 113 pages); a `/faq` hub route;
an `/areas-we-serve` hub route; social share on guides; an editorial-policy page and per-guide
source list; and the WebMCP/agent surface (`/mcp`, `openapi.json`). ETR's sticky header CTA
already covers what 4EP's `StickyCTA` does, so that one is not a gap.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `components/layout/SiteHeader.tsx` | Added Blogs hover + mobile menus | D-173 |
| `lib/blog.ts` | Added `blogTopics`, `getBlogTopicId` | One source for index + menu |
| `app/blog/page.tsx` | Consume `blogTopics` instead of a local copy | Same |
| `app/globals.css` | FAQ accordion, image fade, backdrop hero, blogs panel; shared scrim/control selectors with `.et-location-hero` | D-169/170/171/173 |
| `app/packages/page.tsx` | Use `FaqList` | D-169 |
| `app/services/[slug]/page.tsx` | Use `FaqList`; `backdrop={Boolean(heroProject)}` | D-169/171 |
| `app/blog/[slug]/page.tsx` | Use `FaqList` | D-169 |
| `app/services/page.tsx` | `backdrop` | D-171 |
| `components/PageHero.tsx` | `backdrop` layout; fade on the column image | D-170/171 |
| `app/page.tsx` | Fade on the services photo | D-170 |
| `components/EnquiryForm.tsx` | Two-step flow | D-172 |
| `components/EnquiryForm.module.css` | Step, progress, room-option styles | D-172 |
| `scripts/check-design-baseline.json` | Raised gradient + hex counts with a reason | D-170/171 |
| `DECISIONS.md` | D-169 to D-173 | Record |

## 8. Files Created

- `components/FaqList.tsx` — the one FAQ accordion for the site.
- `plans/owner-4ep-parity-2026-11.md` — deleted at the end of the session per the plan lifecycle.
- This handoff file.

## 9. Files Deleted

- `plans/owner-4ep-parity-2026-11.md` — complete; durable knowledge moved to `DECISIONS.md`
  (D-169 to D-173) and to this handoff.

## 10. Tests and Validation

- `npx tsc --noEmit` — clean.
- `npm run build --ignore-scripts` — compiled in 4.3s, 29 route groups, no route-count drop.
- `npm run check:design` — PASS after the baseline update described in section 3.
- `npm run check:readability` — 112/113; `/blog/` fails (section 5).
- Served-HTML greps on the built output: 7 `blog/#blog-topic-*` links on `/packages/`,
  12 `et-faq-answer` nodes on `/packages/`, 10 `et-hero-backdrop` hits on `/services/` and
  `/services/bathroom-renovations/`, 0 on laundry and powder-room, H1s intact.
- Browser verification on a production build on port 3220 (3214-3216 belong to other sessions),
  at 1440 and 375: hero legibility, Blogs menu open state via `data-open` and computed
  visibility, FAQ open/close, fade geometry, and the full step-1 to step-2 form transition
  including the recorded radio value.

## 11. Next Steps

1. Decide whether any of the 4EP gaps in section 6 are wanted; visible breadcrumbs is the
   cheapest and applies to all 113 pages.
2. Resolve the `/blog/` readability failure in the session that added the five posts.
3. Re-pull Search Console after the quota resets (2026-11-03 00:00 UTC) and run `inspect_url` on
   `/services/bathroom-renovations/` to confirm its indexed state and last crawl.
4. Owner sign-off before pushing; two commits are waiting on `main`.

---

## Addendum — verified on production, 2026-11-04

The five changes above were pushed and are live. Re-verified against
`https://www.elitetouchrenovations.au` (not a local build, to avoid colliding with another
session's in-flight work):

- `/packages/` — 12 `et-faq-item` rows (compact accordion), 28 `blog/#blog-topic-` links in the
  header menu, "Step 1 of 2" present.
- `/services/bathroom-renovations/` — 10 `et-hero-backdrop` hits, FAQ rows present.
- `D-169` through `D-173` are all still in `DECISIONS.md`; `components/FaqList.tsx`,
  `blogTopics`, `BlogsHoverMenu`, `TOTAL_STEPS`, `.et-image-fade` and `.et-hero-backdrop` all
  still present in source.

Later sessions built directly on this work: D-176 added line icons to the Services, Blogs and
About dropdowns, and D-177/D-178 slimmed the service and location heroes. Nothing from this
session was reverted.

**New finding, recorded as O-13:** `/contact-us/` consistently returns HTTP 403 with
`<title>Just a moment...</title>` — a Cloudflare challenge — to `curl`, with both a default and a
browser user agent, while `/`, `/blog/`, `/gallery/`, `/about-us/`, `/packages/` and
`/services/bathroom-renovations/` all returned 200 in the same runs. The page is in
`sitemap.xml`. Whether Googlebot is also challenged was not tested. This is a hosting/WAF
setting, so it is an owner decision, not a code fix.

Also observed, not investigated: production TTFB was ~5s on the two pages measured. Previous
measurement on 2026-11-02 was 2.85s on one page. Single samples both times — not a trend, and
not enough to act on.

The plan file `plans/owner-4ep-parity-2026-11.md` was deleted at this point, per the plan
lifecycle.
