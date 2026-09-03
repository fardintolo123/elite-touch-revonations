# Issue 40 — internal links to published hubs

**Date:** 2026-08-31
**Status:** complete

## Implementation plan

1. Add a small helper that finds the published region for a project suburb.
2. Add a reusable server-rendered "Areas we serve" section driven by `publishedRegions()`.
3. Add hub links on the homepage and all four service pages.
4. Add sibling-hub and packages links on each published regional hub.
5. Add gallery project links back to the main bathroom service page and to the published region hub where one exists.
6. Build and verify that the new links are present in the prerendered HTML and do not point to unpublished hubs.

## Checklist

- [x] Task routed; `CLAUDE.md`, `DECISIONS.md`, `PROJECT_CONTEXT.md`, `DESIGN.md`, `docs/SEO_CONTENT_GUIDE.md`, `docs/CONTENT_QUALITY_CHECKLIST.md`, `docs/SEO_AEO_GEO_CHECKLIST.md`, and `docs/BATHROOM_SITE_STRUCTURE.md` read.
- [x] Next.js 16 `Link` and dynamic route docs checked before App Router edits.
- [x] Published-region helper added.
- [x] Reusable hub-links section added.
- [x] Homepage and service pages link to published hubs.
- [x] Regional hubs link to sibling hubs and `/packages/`.
- [x] Gallery project pages link to the parent service and published hub where available.
- [x] Build and HTML checks pass.

## Verification

- `npm.cmd run typecheck` passed.
- `npm.cmd run build` passed; route count is 32 in the current worktree because unrelated `/privacy/` and `/terms/` pages are also present.
- Served-HTML checks passed against `http://localhost:3210`: published hub links are present on home, service, hub and gallery pages; unpublished Inner West / North-Western links are absent; unbuilt Tier-1 suburb links are absent from hubs.
- `node scripts/check-readability.mjs http://localhost:3210` passed: 24/24 checked routes are at Flesch 60 or higher.
- Playwright desktop 1440px and mobile 390px checks passed for home, service, hub and gallery representative pages, with no horizontal overflow.
