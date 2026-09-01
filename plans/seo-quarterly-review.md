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
- [ ] Review outcome recorded in the relevant plan, audit, or decision doc.

## Rule

Never advance a date just because the site was rebuilt or deployed. A freshness date is a content claim.
