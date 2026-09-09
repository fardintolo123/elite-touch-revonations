# Issue 53 — Randwick Tier-1 Page

## Plan

1. Add explicit `pagePublished` suburb gating to the location data helpers.
2. Enable the evidenced Randwick Tier-1 record only.
3. Extend the existing bathroom location route to render a dedicated Randwick page using the real Randwick project, Eastern Suburbs hub link, service CTA, trust signals, and suburb-specific metadata/schema.
4. Add published suburb pages to static params and the sitemap.
5. Run typecheck, build, served-HTML checks, and browser verification at desktop and 390px.

## Checklist

- [x] Add `pagePublished` gate and Randwick publication flag.
- [x] Render dedicated Randwick page from existing data.
- [x] Add Randwick sitemap entry and internal-link resolution.
- [x] Typecheck and build pass.
- [x] Verify served HTML and browser layout.
- [x] Write session handoff.
