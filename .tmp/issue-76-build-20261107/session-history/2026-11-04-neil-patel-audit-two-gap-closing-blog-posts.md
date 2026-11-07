# Session Summary

## 1. Session Objective
The owner shared two Neil Patel checklists (screenshots): "25 things AI looks at to judge your business"
and "34 ways customers search for you". Task: audit the current site against both lists, then close the
genuine on-site content gaps the owner approved.

## 2. Work Completed
- **Audit (read-only)** of both checklists against the real code (`lib/schema.ts`, `lib/businessInfo.ts`,
  `lib/blog.ts`, `app/page.tsx`, `app/blog/[slug]/page.tsx`, `app/packages/page.tsx`,
  `components/layout/SiteFooter.tsx`, `components/GoogleRating.tsx`).
- **Two new blog posts** added to `lib/blog.ts` (took the count 78 → 80):
  1. `how-long-does-a-bathroom-renovation-last` — category *Planning and cost*. Closes query #2
     ("how long does X **last**" / lifespan). Has `quickAnswer` (answer-first + lifespan table),
     6 sections, 5 FAQ.
  2. `repair-or-replace-bathroom-renovation` — category *Compare your options*. Closes queries #4
     ("when should I get X") and #10 ("should I repair or replace X"). Has `quickAnswer` (repair-vs-replace
     table), 6 sections, 5 FAQ.
- **`scripts/check-readability.mjs`** — added the two new `/blog/...` slugs to the hand-maintained `ROUTES`
  array (the only inventory not auto-derived from `blogPosts`).
- **`DECISIONS.md`** — added row **D-179** recording what was added, what was deliberately not, and why.
- **Verification run:** local production build (`npm run build --ignore-scripts`), `check:readability`,
  `check:design`, and grep of the built HTML + sitemap.

No files were deleted. No dependencies added. No design-system or component changes.

## 3. Important Decisions
- **D-179: add exactly two blog posts, not a reviews page or competitor pages.**
  - Reason: these two queries had no honest existing coverage and could be written from general,
    evidenced content.
  - Alternatives: a dedicated `/reviews/` page (#17/#34), competitor-comparison pages (#15/#16),
    pay-monthly/financing content (#32), bad-credit/no-insurance (#22/#23).
  - Why preferred: competitor pages are blocked by D-05; financing/bad-credit/no-insurance are not
    services ETR offers; a reviews page needs real dated reviews the repo does not have and would risk
    fabrication. The two chosen posts carry no invented business facts.
- **Lifespan numbers stated as hedged general ranges** ("usually 15 to 20 years", "roughly"), while the
  one firm business commitment — the 10-year workmanship warranty — is reproduced exactly. This keeps
  the AEO value of answering "how long does it last" without inventing a business-specific guarantee.

## 4. Permanent Rules / Lessons
- The blog is fully data-driven: adding a post to `blogPosts` in `lib/blog.ts` automatically produces the
  page (`generateStaticParams`), the `/blog/` category-hub link (`blogTopics`), the sitemap entry
  (`app/sitemap.ts` maps `blogPosts`) and the `BlogPosting`/`FAQPage` schema. **The one inventory that is
  NOT auto-derived is `scripts/check-readability.mjs`'s `ROUTES` array** — it must be updated by hand for
  every new published route, or the readability run gives a false "all pass" over a smaller set.
- `check:readability` and `check:design` are **separate QA gates, not part of `npm run build`** (build is
  just `next build`). The build stays green independent of them.
- FAQ `answer` fields were kept plain text (no HTML) — they feed FAQPage JSON-LD. Internal links live only
  in `sections[].paragraphs` via `dangerouslySetInnerHTML` with `class="et-link"`.

## 5. Things We Explicitly Decided NOT To Do
- **No competitor-comparison / "alternatives to X" pages** — D-05 forbids using competitor copy/claims;
  naming competitors is out.
- **No pay-monthly / financing content** — ETR publishes only a 30/40/30 progressive schedule; monthly
  finance is not offered.
- **No bad-credit / no-insurance content** — not applicable to this trade.
- **No dedicated reviews page and no review-recency dates** — would need real, dated review data from the
  owner; fabricating dates or a review feed is barred by Business Rules / D-03.
- **Did not try to fix `/blog/` index readability** — pre-existing, out of scope, and a separate list-page
  problem (see §6).

## 6. Current Project State
- Build green; 80 blog posts build as static pages.
- Both new posts verified **in the served HTML** with their body copy and schema; both in the sitemap.
- `check:readability`: both new posts PASS (81.7 and 79.5). `check:design`: PASS.
- **Known pre-existing issue (not introduced here):** `/blog/` index fails readability at 53.2 (was 52.4
  on 2026-11-02 — these two posts nudged it *up*). It is a list-page density problem driven by many
  keyword-dense titles+descriptions; fix is to shorten post `description` strings, tracked since
  2026-11-02. Left untouched deliberately.
- Nothing committed, nothing pushed/deployed this session.

## 7. Files Changed
| File | Change | Reason |
|------|--------|--------|
| `lib/blog.ts` | Added 2 blog post objects (78 → 80) | Close audit queries #2, #4, #10 |
| `scripts/check-readability.mjs` | Added 2 slugs to `ROUTES` | Hand-maintained inventory must cover new routes |
| `DECISIONS.md` | Added row D-179 | Record what was added/not and why |

## 8. Files Created
- `session-history/2026-11-04-neil-patel-audit-two-gap-closing-blog-posts.md` — this handoff.

## 9. Files Deleted
None.

## 10. Tests and Validation
- `npm run build --ignore-scripts` — green; both new routes prerendered (SSG).
- `npm run check:readability` — new posts PASS (81.7, 79.5); `/blog/` 53.2 FAIL is pre-existing/unrelated.
- `npm run check:design` — PASS (no mechanical pattern count over baseline).
- Built HTML grep: confirmed body copy + `BlogPosting` (and `FAQPage` on the repair/replace post) present;
  both slugs in `sitemap.xml`.
- No Lighthouse/PageSpeed run (content-only change, no new weight/dependency). No browser screenshots taken
  (no visual/layout change — reuses the existing blog renderer).

## 11. Performance Impact
Not measured. Content-only: two data entries rendered by the existing blog template; no new dependency,
script, image, font or `'use client'`. No expected CWV impact.

## 12. SEO Impact
- **Pages added:** 2 blog posts (answer-first `quickAnswer`, question-shaped headings, 5 FAQ each).
- **Search intent / keywords:** "how long does a bathroom renovation last" (lifespan/durability);
  "repair or replace bathroom", "signs you need to renovate", "when to renovate" (decision intent).
- **Internal linking:** incoming from the `/blog/` category hub (automatic); outgoing to existing posts
  (waterproofing, mould, grout, small-bathroom, layout changes, cost, hidden costs, warranty, choosing a
  renovator) and to `/packages/`, `/about-us/`, `/contact-us/`.
- **Schema:** `BlogPosting` on both; `FAQPage` where FAQs exist. **Metadata:** `metaTitle` + `description`
  per post. **Sitemap:** both auto-included. **Canonicals:** handled by the shared metadata helper.

## 13. Remaining Tasks
### High Priority
- None blocking.
### Medium Priority
- `/blog/` index readability (53.2) — shorten post `description` strings; pre-existing, tracked since
  2026-11-02.
### Low Priority
- Optional: a few existing related posts could add an outbound link TO the two new posts (currently they
  are reached via the category hub + their own outbound links, which satisfies publication).
- The softer audit gaps left open on purpose: #31 "what happens after X" (aftercare), #25 "most popular X".

## 14. Open Questions
- Does the owner want a dedicated reviews/trust page later? That needs real, consented, dated reviews
  before it can be built honestly.

## 15. Next Session Handoff
- Inspect first: `lib/blog.ts` (the two new posts at the end of `blogPosts`) and D-179 in `DECISIONS.md`.
- Do NOT reconsider: competitor pages, financing/bad-credit/no-insurance content, a fabricated reviews
  page or review dates — all rejected here with reasons.
- If adding any new published route: remember to add it to `scripts/check-readability.mjs` `ROUTES`.
- Nothing here is committed — the owner must approve any commit/push (push = deploy).

## 16. Potential Documentation Updates
- `DECISIONS.md` already updated (D-179). No other permanent doc needs changing from this session.
- Possible (optional) `PROJECT_CONTEXT.md`/`CLAUDE.md` reinforcement: the "readability `ROUTES` must be
  hand-updated per new route" lesson is already stated in CLAUDE.md's Testing Workflow — no change needed.

## 17. Conversation-Derived Insights
- **Confirmed decisions:** add the two posts; do not fabricate reviews/competitor/financing content; keep
  lifespan figures as hedged general ranges with the 10-year warranty exact.
- **Strong recommendations:** fix `/blog/` index readability by trimming `description` strings in a
  dedicated pass.
- **Ideas/proposals (not decided):** a future reviews/trust landing page if the owner supplies real dated
  reviews; light aftercare ("what happens after your renovation") content.
- **Unresolved opinions:** whether the softer audit gaps (#25, #31) are worth their own posts.

# Accuracy note
Everything above marked as done was verified against the built output and the gate scripts. The audit
items reported as "off-site" (Reddit/YouTube/news/backlinks/rankings/name searches) and review-recency
display are not fixable in-repo and were not attempted.
