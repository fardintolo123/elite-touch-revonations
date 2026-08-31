# Issue 40 — internal links to published hubs

**Date:** 2026-08-31
**Status:** in progress

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
- [ ] Build and HTML checks pass.
