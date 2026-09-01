# Plan — Restore the green build (finish issue #41's project data layer)

**Date:** 2026-09-01
**Task class:** Build repair. Routes via `CLAUDE.md` → Testing Workflow ("the build must be green
before commit") and → issue **#41** (`plans/2026-08-31-issue-41-freshness-image-sitemap.md`,
step 1: "add explicit content dates to the source data").

## Why this is the next step

Commit `3d92daa` ("SEO master plan … partial implementation") shipped a **known red build**:
`lib/projects.ts` tightened the `Project` type to require `updated: string` and
`completedByYear: number`, but none of the 11 project records set them. `tsc --noEmit` fails on all
11. Every other file in that commit compiles — verified: the only typecheck errors are the 11
missing-field errors in `lib/projects.ts`.

Nothing else in the issue #40–#46 set can be shipped or verified on top of a tree that does not
compile, so this is the blocker in front of the whole backlog.

## Scope (deliberately minimal)

**In:** populate the two already-declared required fields on all 11 records.
**Out:** the render layer of #41 (visible "Completed by 2026" captions, `/packages/` "prices current
as of" line, hub reviewed-date) and the sitemap rework (#23/#41 — real per-content `lastmod`,
image entries). Those touch page files + `app/sitemap.ts` and need browser + sitemap-stability
verification; they are the clearly-defined next step, not this one.

## Values and their evidence

- **`completedByYear: 2026`** for all 11. Evidenced: every project's photographs were owner-supplied
  in 2026 (batch 1 on 2026-08-19, batch 2 on 2026-08-25 — see `lib/projects.ts` provenance header
  and `plans/2026-08-25-new-project-photos-intake.md`). Issue #41's plan already reasoned this
  through: "Exact project completion dates are not recorded in the repo, so the visible caption uses
  'Completed by 2026' rather than inventing an exact completion year." No fact is invented — the
  field name and the copy pattern are both "by {year}".
- **`updated: '2026-08-31'`** for all 11. That is the date each record's page content last
  meaningfully changed: commit `3d92daa` added the owner-supplied `story` paragraph (a new visible
  "About this project" block) to every project. Matches how `lib/businessInfo.ts` services carry a
  real `updated` date rather than a build timestamp.

## Checklist

- [x] Task routed; `CLAUDE.md` Testing Workflow + issue #41 plan re-read
- [x] `DECISIONS.md` checked — no settled decision reversed (this finishes planned work)
- [x] `updated` + `completedByYear` added to all 11 records in `lib/projects.ts`
- [x] `npx tsc --noEmit` clean
- [x] `npm run build` green; 30 static pages generated, full route tree present (home, about,
      contact, gallery + 11 projects, packages, services + 4, 3 hubs, sitemap, robots, llms.txt) —
      no drop
- [x] Issue #41 plan updated with a progress note; render + sitemap layer explicitly still open
- [x] Master-plan / technical-audit tracker: red build noted as cleared
- [x] Commit with explicit pathspec

## Result

`tsc --noEmit` exits 0; `next build` compiles and prerenders 30 pages. The known red build from
commit `3d92daa` is cleared.

Bonus verification while in the built output: the H-1 / issue #17 dead links (hub pages linking to
unbuilt Tier-1 suburb URLs) are **not present** — `hills-district.html` and `eastern-suburbs.html`
link only to the parent service page and the two published sibling hubs; every Tier-1 suburb renders
as plain text. The `publishedLocationSet.has(suburb.slug)` guard added in `3d92daa` covers this,
though the guard compares a suburb slug against the set of published *region* slugs, so it works by
never matching rather than by intent — issue #17 should still close with a clearer guard.

