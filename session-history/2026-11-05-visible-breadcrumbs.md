# Session Summary

## 1. Session Objective

Add a visible breadcrumb trail to the site. This came from the 4 Elements Painting gap list in
`session-history/2026-11-02-owner-4ep-parity-nav-faq-form-heroes.md` — ETR emitted `BreadcrumbList`
schema on every page but rendered no trail for a human to see. The owner picked it off that list
("Yes, add breadcrumbs").

## 2. Work Completed

**New `components/Breadcrumbs.tsx`** — a server component taking `readonly SchemaCrumb[]`, the same
type and the same array the page already passes to `<SchemaGraph breadcrumbs={...}>`. It converts
each absolute schema URL to a relative `href`, renders the last crumb as a non-link
`<span aria-current="page">`, and returns `null` below two items.

**Wired three ways**, because the site has three hero families:
- `components/PageHero.tsx` gained a `breadcrumbs` prop, rendered at the top of its `copy` block —
  this covers both its plain and `backdrop` layouts at once. Used by `/blog/`, `/blog/[slug]/`,
  `/privacy/`, `/services/`, `/services/[slug]/`, `/terms/`.
- `components/LocationHero.tsx` gained the same prop, and the trail **replaced** its single
  "← back" link.
- Direct `<Breadcrumbs items={breadcrumbs} />` insertion on the five pages that build their own
  hero markup: `/about-us/`, `/contact-us/`, `/gallery/`, `/gallery/[slug]/`, `/packages/`.

**Every page's crumb array was hoisted to one `const`** and passed to both consumers, so the trail
and the schema read from one source.

**Two now-redundant back links removed**: `LocationHero`'s "← back" and the "← All projects" link on
gallery project pages. Both duplicated a step the trail now shows, which is the duplication D-174
forbids. Both also lived inside a scored `<p>`, so removing them took two blocks off the readability
gate. The dead `.et-location-hero-back` CSS was deleted with them.

**Sizing pass**: the trail first shipped at `--et-text-caption` (13px, 18.2px hit area). Measured in
the browser against the site's other links, that was both smaller than anything else and under the
24px WCAG 2.5.8 AA target-size floor. Changed to `--et-text-sm` + `padding-block: var(--et-space-1)`
→ 27.6px.

## 3. Important Decisions

**No `<ol>`/`<li>`, which is the usual breadcrumb markup.** `scripts/check-readability.mjs` scores
every `<p>`, `<li>` and `<dd>` inside `<main>`. Four `<li>`s per page would have added roughly 460
two-word "sentences" of long nouns across the site — the exact mechanism that failed the Flesch gate
on every page and got the per-post Blogs menu deleted in `ad6d3fa` (D-173). A bare `<nav>` holding
anchors contributes zero scored blocks, which was **measured, not assumed**: extracting the scored
blocks from the built `about-us.html` with and without the trail gives an identical 64 blocks /
1484 words.

Teaching the checker to skip `<nav>` would have been the tidier fix and matches its own stated
intent — but `plans/blog-readability-and-answers-2026-11.md` is actively reworking that script and
the blog index score, and changing the gate underneath that work would corrupt its measurements.
**That change belongs in that plan, not here.**

**The component emits no schema of its own.** 4EP's `Breadcrumbs.tsx`, which this was modelled on,
renders its own `BreadcrumbList` JSON-LD — correct there, because that project has no page-level
graph. Here `lib/schema.ts` already puts one in every page's graph keyed by
`schemaIds.breadcrumb(path)`, so copying 4EP directly would have published two competing breadcrumb
nodes per page.

**The 44×44 question.** DESIGN.md says "Interactive targets ≥44×44px". Measured in the browser,
every inline text link on the site is ~20.8px (`.et-link`, footer links, body links) while buttons
are 48px — so that rule is the button rule, and the trail follows the text-link precedent rather
than inventing a new standard. 44px would push the H1 down a full line on a phone.

**The last crumb repeats the H1** on blog posts and project pages. Considered and kept: that is what
a breadcrumb's final step is, and D-174 targets repeated section compositions, not this.

## 4. Permanent Rules / Lessons

- **Before adding any repeated element inside `<main>`, check it against
  `scripts/check-readability.mjs`.** It scores `<p>`, `<li>` and `<dd>` between `<main>` and
  `</main>`. Anything chrome-like that uses those tags is counted as prose on every page it appears
  on. This has now caused one deletion (D-173) and shaped one design (D-180).
- **Prove a change is neutral to a gate instead of asserting it.** Extracting the scored blocks with
  and without the new markup took one short script and turned "it shouldn't affect readability" into
  a fact — which mattered, because the failing page changed during this session for an unrelated
  reason and it would otherwise have looked like mine.
- **Check a design rule against what the codebase actually ships before treating it as binding.**
  DESIGN.md's 44px line reads absolute; one `getBoundingClientRect()` sweep showed it is applied to
  buttons only.
- **A dead rule deleted can pay for a new one added.** Removing `.et-location-hero-back` offset the
  two new `#ffffff` literals exactly, so `check:design` passed with no baseline change. Look for
  that before reaching for `--update-baseline`.
- **When porting from the 4EP sibling, check what ETR already does centrally.** 4EP's breadcrumb
  component is right for 4EP and would have double-published schema here.

## 5. Things We Explicitly Decided NOT To Do

- **Did not touch `scripts/check-readability.mjs`** — another session owns it this week.
- **Did not put a trail on the homepage** — it is the trail's root.
- **Did not truncate or collapse the trail on mobile.** A five-level suburb trail wraps to two lines
  at 390px. All levels stay visible and tappable, which keeps the trail identical to the schema;
  horizontal scroll would hide the parent link, which is the one people actually tap.
- **Did not fix the `/about-us/` readability failure** (59.8, see section 6) — not this session's
  work.
- **Did not touch the location hero's scrim or height**, which another session is mid-change on.
- **Did not push or deploy.**

## 6. Current Project State

The trail is on 114 of 115 customer-facing pages (homepage excluded by design; `_not-found` and
`_global-error` also carry none). Build green, 29 route groups, no drop. `npm run check:design`
passes with no baseline change. `npm run check:readability` is 114/115.

**Known issue, not from this session:** `/about-us/` now fails readability at 59.8. On 2026-11-04 the
single failure was `/blog/` at 53.2; another session's uncommitted work has since fixed `/blog/` and
`/about-us/` has dropped below 60. `/about-us/` imports `lib/businessInfo.ts` and `lib/projects.ts`,
both uncommitted-modified by that session. The trail is proven not to be the cause (section 3).

**Also observed, not actioned:** the location hero was mid-change throughout this session — its
scrim went from `0.96/0.82/0.38` to `0.95/0.90/0.72/0.25` and its layout changed between two of my
builds. At one point the Castle Hill hero rendered as a near-black band at 1440. That is the
in-flight work in `session-history/2026-11-04-full-bleed-hero-scroll-fix.md`, not a breadcrumb
problem, but it is worth a look at 390 before that work is called done.

**Still open from the previous session:** O-13, `/contact-us/` serving a Cloudflare challenge.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `components/PageHero.tsx` | `breadcrumbs` prop, rendered above the eyebrow | Covers plain + backdrop in one place |
| `components/LocationHero.tsx` | `breadcrumbs` prop replaces `backHref`/`backLabel` | Trail supersedes the single back link |
| `app/globals.css` | `.et-breadcrumb` rules; removed dead `.et-location-hero-back` | D-180 |
| `app/services/[slug]/[location]/page.tsx` | Hoisted both crumb arrays; wired both `LocationHero`s | One source |
| `app/{blog,blog/[slug],privacy,services,services/[slug],terms}/page.tsx` | Hoisted array; `breadcrumbs` prop on `PageHero` | One source |
| `app/{about-us,contact-us,gallery,gallery/[slug],packages}/page.tsx` | Hoisted array; direct `<Breadcrumbs>` | Custom hero markup |
| `app/gallery/[slug]/page.tsx` | Removed "← All projects" | Duplicated the trail |
| `DECISIONS.md` | D-180 | Record |

## 8. Files Created

- `components/Breadcrumbs.tsx`
- `session-history/evidence/2026-11-05-breadcrumbs/` — 390 and 1440 screenshots plus a README
  recording the measured results
- This handoff file.

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npx tsc --noEmit` clean after every step.
- `npm run build --ignore-scripts` green; 29 route groups, no drop.
- `npm run check:design` PASS, no baseline change.
- `npm run check:readability` 114/115 (the one failure analysed in section 6).
- **Full route sweep** of the built output: 117 HTML files scanned, 114 with exactly one trail,
  0 duplicates, 0 missing, homepage correctly without.
- **Trail vs schema comparison** across all 114: 0 label mismatches, 0 duplicate `BreadcrumbList`
  nodes, 0 pages missing one.
- **Link check**: all 9 distinct crumb hrefs return 200.
- **Browser**, production build at 390 and 1440: trail over a scrimmed photo, on light backgrounds,
  on blog, gallery, packages, about. Clicking a crumb navigates and lands at `scrollY` 0.
- **Accessibility**: `<nav aria-label="Breadcrumb">` landmark, real anchors, `aria-current="page"`
  on the last item, separator is a CSS `::before` so it is not in `textContent`. Hit area 27.6px.

## 11. Next Steps

1. Owner sign-off before pushing — nothing from this session is pushed.
2. `/about-us/` readability (59.8) belongs to whoever lands the `lib/businessInfo.ts` changes.
3. Consider moving the `<nav>` exclusion into `scripts/check-readability.mjs` as part of
   `plans/blog-readability-and-answers-2026-11.md`; the trail would then be free to use `<ol>/<li>`.
4. O-13 (`/contact-us/` Cloudflare challenge) still needs the owner's hosting dashboard.
5. Remaining 4EP gaps if wanted: a `/faq` hub, an `/areas-we-serve` hub, social share on guides,
   an editorial-policy page.

---

## Addendum — independent critique and fixes, 2026-11-08

The `vision-auditor` critique that was outstanding when this handoff was written has now run.
A first attempt stalled (no progress for 600s) because the brief asked it to curl a running
server and read large docs; a leaner screenshot-and-code-only brief completed in 43 seconds.
Worth remembering: give a critique subagent the rendered evidence and the component, not a
research task.

**Verdict: no P0/P1.** Two P2s, both fixed in `app/globals.css`:

1. **Orphaned separator on a wrapped trail.** The "/" was a `::before` on each following crumb,
   so when a five-level trail wrapped at 390 the second line opened with a slash and read as a
   rendering fault. It is now an `::after` on the preceding crumb, so a wrapped line always
   starts with a place name.
2. **Deep and long trails cost two lines on a phone.** Below 640px the trail now hides its middle
   steps — root plus the last two — and the final crumb shrinks with `text-overflow: ellipsis`.
   A suburb page reads "Home / Hills District / Castle Hill"; a blog post shows its title
   truncated. Both are one 27.6px line, measured, with no viewport overflow.

Both changes are display-only. Every step stays in the DOM and in the `BreadcrumbList`, so the
visible trail and the schema still agree — re-verified across 115 pages, 0 mismatches,
0 duplicate nodes, 0 missing.

The critique also flagged, correctly, that none of the saved screenshots showed the trail over a
real photo on a `.et-hero-backdrop` at 1440, so that contrast case rests on the in-session check
rather than a saved artefact.

Gates after the fixes: build green (29 route groups), `check:design` PASS with no baseline
change, `check:readability` **116/116** — the `/about-us/` failure noted in section 6 was fixed
by whoever landed the `lib/businessInfo.ts` work, so that item is closed.

Evidence added: `critique-fixed-390-location.jpg`, `critique-fixed-390-blog-post.jpg`.

**Unrelated fix made in the same session:** `CLAUDE.md` had unresolved merge conflict markers
(`<<<<<<< HEAD`, `=======`, `>>>>>>> 54bb2b8b`) committed at lines 39/76/77 by merge `257424a`.
The "theirs" side was empty, so the resolution was to drop the three marker lines and keep the
"Starting or syncing a session" section. Committed separately as `77fc791`.

**Not verified this session:** production. Outbound HTTPS is blocked from this sandbox —
`example.com` fails the same way — so the live site could not be re-checked. This is a sandbox
limit, not evidence that the site is down.
