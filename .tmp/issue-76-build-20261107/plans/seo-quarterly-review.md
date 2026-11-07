# Quarterly SEO Freshness Review

Use this every three months before changing any visible freshness date or sitemap `lastmod`.

## Checklist

- [ ] Package prices checked against the current owner-approved package sheet.
- [ ] `/packages/` “prices current as of” month changed only if the pricing or inclusion content was genuinely reviewed.
- [ ] Service-page copy checked against the four confirmed services and current owner facts.
- [ ] Published hub pages checked for local proof, suburb list accuracy, internal links and project coverage.
- [ ] Gallery project list checked for newly approved photos, held projects, and any owner-confirmed completion-year updates.
- [ ] `updated` dates bumped only for pages whose content changed or was genuinely reviewed.
- [ ] `app/sitemap.ts` checked so no `new Date()` or build timestamp is used for `lastModified`.
- [ ] Served HTML spot-check completed for `/packages/`, one gallery project and one hub.
- [ ] `/sitemap.xml` spot-check completed for stable `lastmod` and `<image:image>` entries.
- [ ] Search Console high-intent review completed: inspect query **and page together**, record the
      commercial queries with impressions/clicks/position, and prefer improving the existing owner
      before proposing a new URL.
- [ ] Google Search Console's Generative AI performance report checked for impressions and cited
      pages. Treat it as another Search surface, not a separate GEO ranking system or a reason to
      create AI-only pages.
- [ ] Organic calls and enquiry-form submissions compared with search landing pages in analytics;
      traffic without an enquiry path is not a win.
- [ ] Review outcome recorded in the relevant plan, audit, or decision doc.

## Rule

Never advance a date just because the site was rebuilt or deployed. A freshness date is a content claim.
