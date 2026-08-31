# Issue #44 implementation plan - gallery story copy, image metadata, alt trim

**Date:** 2026-08-31
**Issue:** #44 - `[seo-content] Gallery polish: project story copy + image file metadata + alt-length trim`
**Status:** in progress

## Plan

1. Read the routed docs and source material: `CLAUDE.md`, `DECISIONS.md`, `PROJECT_CONTEXT.md`,
   `DESIGN.md`, `docs/SEO_CONTENT_GUIDE.md`, `docs/CONTENT_QUALITY_CHECKLIST.md`,
   `docs/SEO_AEO_GEO_CHECKLIST.md`, `docs/PERFORMANCE_BUDGET.md`, the master SEO plan, the content
   and image audit files, and the 2026-08-25 project-photo intake plan.
2. Add a sourced `story` field to gallery projects where the owner-supplied project notes provide
   detail beyond the trimmed `blurb`, and render it as an always-server-rendered "About this project"
   paragraph on `/gallery/{slug}/`.
3. Trim only the extreme alt strings over 200 characters, keeping factual photo detail intact.
4. Add a repo-local WebP XMP metadata injector because `exiftool` is not installed in this
   environment, then run it over every current `public/images/projects/**/*.webp` file.
5. Update the issue source/audit docs and decision register with the result and the exiftool
   fallback.
6. Validate: build, readability, metadata samples, and served HTML checks for new story copy.

## Checklist

- [x] Task routed; mapped docs read.
- [x] Issue #44 body read from GitHub.
- [x] Source project notes checked before writing copy.
- [ ] Issue-specific implementation plan saved in `plans/`.
- [ ] Gallery project `story` data added from sourced notes only.
- [ ] Gallery page renders the story paragraph in served markup.
- [ ] Alt text over 200 characters trimmed without dropping load-bearing detail.
- [ ] WebP XMP metadata injection script added.
- [ ] Current project WebP files updated with XMP Creator, Credit and Rights.
- [ ] Image conversion process doc updated for future metadata injection.
- [ ] `DECISIONS.md` records the implementation result.
- [ ] `npm run build` green.
- [ ] `npm run check:readability` passes.
- [ ] Metadata sample check passes.
- [ ] Served HTML contains story paragraphs on sample gallery pages.
