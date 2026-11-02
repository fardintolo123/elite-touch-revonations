# Owner request — 4EP parity + nav/FAQ fixes + search visibility (2026-11-02)

**Outcome owned:** the eight things the owner asked for in one session: a search-visibility
answer backed by Search Console, the 4EP image fade, a short step-based enquiry form,
background-image heroes, smaller FAQ rows, a working Blogs nav menu, and a list of other
4EP patterns worth porting.

**Status:** in progress.

## Checklist

- [x] Read CLAUDE.md and route the task
- [x] Pull Search Console query data (90 days) and establish why the site is not seen
      for "bathroom renovations sydney"
- [x] Verify `/services/bathroom-renovations/` technically (live 200, title, H1, canonical)
- [ ] Restore the Blogs nav menu (removed in `ad6d3fa`), grouped by category not 78 titles
- [ ] Shared FAQ component with a smaller question row; apply to packages, services, blog
- [ ] Port 4EP `ImageSurfaceFade` as a DESIGN.md-token CSS utility
- [ ] Background-image hero per DESIGN.md §4.4 hero recipe (image + ink scrim)
- [ ] Two-step enquiry form (4EP `QuoteForm` pattern), progressive-enhancement safe
- [ ] Audit 4EP for other portable wins; report, do not build unasked
- [ ] Build green, `check:design`, `check:readability`
- [ ] 390 + 1440 screenshots before/after, independent critique
- [ ] DECISIONS.md rows (next free id: D-168), handoff file

## Files expected to change

- `components/layout/SiteHeader.tsx` — Blogs hover/mobile menu
- `components/FaqList.tsx` (new) + `app/packages/page.tsx`, `app/services/[slug]/page.tsx`,
  `app/blog/[slug]/page.tsx`
- `components/PageHero.tsx`, `app/globals.css` — fade utility, hero scrim, FAQ row
- `components/EnquiryForm.tsx`, `components/EnquiryForm.module.css` — two-step flow

## Verification

- `npm run build --ignore-scripts` on an unused port (3220; 3214-3216 are other sessions)
- `npm run check:design`, `npm run check:readability`
- Playwright screenshots at 390 and 1440 for homepage, `/packages/`, a service page, a blog post
- `curl` the built HTML to confirm nav links and FAQ answers are in the served markup

## Known constraint

Search Console MCP free quota (15 pulls/day) was exhausted on 2026-11-02 after the
90-day query pull. `inspect_url` could not be run. Resets 2026-11-03 00:00 UTC.
