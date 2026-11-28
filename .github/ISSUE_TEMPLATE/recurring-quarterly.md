---
name: Quarterly freshness review
about: The dated quarterly cycle issue — the SEO freshness sweep, with every visible date change justified.
title: "[Recurring] Quarterly sweep — YYYY-Qn"
labels: recurring
---

**Period:** {{PERIOD}} · **Opened:** {{DATE}} · **Due by:** {{DUE}}

The robot opens this on the 20th of March, June, September and December, and the work is due by the
5th of the following month. If the issue was opened by hand, fill in the three values above from
`docs/recurring-tasks.md`.

### Checklist

- [ ] Work through every item in `plans/seo-quarterly-review.md`: package prices, service copy, hub local detail, the project list, `app/sitemap.ts` `lastModified` and the `/sitemap.xml` spot-check.
- [ ] **Change a visible date only where the content genuinely changed** (D-119). A page that was reviewed and needed no change keeps its date.
- [ ] Package prices are owner facts. Ask the owner whether the published prices still hold before changing the "current as of" month.
- [ ] Re-check the guides and suburb routes changed since the last quarter against fresh Search Console data. Comment keep or iterate on each closed issue.
- [ ] Record what was reviewed and what changed in a dated section at the end of `plans/seo-quarterly-review.md`, then close this issue.

## Execution

- Read only: `plans/seo-quarterly-review.md`; DECISIONS D-119 and D-151; `app/packages/page.tsx`; `service-areas.json`; `lib/projects.ts`.
- Quick check between edits: `npx tsc --noEmit`.
- Final gate, once before commit: `npm run build --ignore-scripts`, then `npm run check:readability`.
- Data: a fresh 28-day Search Console pull for the guides and routes the last quarter changed, committed under `plans/gsc-exports/<date>/`.
- Owner-only steps: confirm package prices; supply any new completed projects with photos.
- Stop and report if: a price or project fact can't be confirmed. Leave the old date and wording in place.
- Executor settings: `deepseek-v4-pro`, effort High; agent teamwork off.
