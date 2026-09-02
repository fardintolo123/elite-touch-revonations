# Issue #37 Privacy policy page + form privacy notice

**Issue:** [#37](https://github.com/fardintolo123/elite-touch-revonations/issues/37)
**Source:** `plans/2026-08-31-seo-master-plan.md` Phase A; `plans/2026-08-31-seo-content-audit.md` C-1 (E-E-A-T Trustworthiness)
**Date:** 2026-09-02

## Plan

The enquiry form (`components/EnquiryForm.tsx`, on every page via `ContactSection`, and directly on
`/contact-us/`) collects name, phone, email, suburb, service and a free-text message, emails it via
Resend and writes a copy to Supabase (`lib/actions.ts`). The site also loads Google Analytics through
GTM (`app/layout.tsx`, D-112). There is no `/privacy/` or `/terms/` page and no privacy statement near
the form — a rater-visible trust gap and a conversion drag for a cautious renovation buyer.

Add:
- `app/privacy/page.tsx` — factual, plain-language, specific to what `lib/actions.ts` and
  `app/layout.tsx` actually do. Names Resend, Supabase and Vercel; covers analytics/cookies, retention,
  and how to request access/correction/deletion. Server component, `DESIGN.md` bands, no invented
  claims, no over-claiming boilerplate.
- `app/terms/page.tsx` — short website terms of use: content ownership, that published prices are
  indicative starting prices (not a quote/offer — D-07/D-60), external-link disclaimer, that project
  photos are consented ETR work not a promised outcome, governing law NSW.
- One-line privacy notice under every enquiry form, in the **server** components (`ContactSection.tsx`
  and `contact-us/page.tsx`) — not in the `'use client'` form leaf (keeps the form leaf minimal per
  PROJECT_CONTEXT §4.14; guarantees the line is in the served HTML).
- Footer links to both, in the "Company" column.
- `app/sitemap.ts` entries for both, with a real content date (2026-09-02), `index, follow` inherited.
- `scripts/check-readability.mjs` ROUTES += both (both must pass Flesch ≥ 60, D-109).
- `lib/businessInfo.ts` — `privacyPolicyUpdated` date for the "last updated" line.

## Checklist

- [x] Add `legalPagesUpdated` to `lib/businessInfo.ts` (named `legalPagesUpdated`, covers both pages).
- [x] `app/privacy/page.tsx` — factual policy, names Resend + Supabase + Vercel + analytics, matches `lib/actions.ts` and `app/layout.tsx`.
- [x] `app/terms/page.tsx` — short, factual website terms.
- [x] Privacy notice line under the form in `components/ContactSection.tsx` and `app/contact-us/page.tsx`.
- [x] Footer links to `/privacy/` and `/terms/` (`components/layout/SiteFooter.tsx`).
- [x] `app/sitemap.ts` — add both routes with their own `businessInfo.legalPagesUpdated` date.
- [x] `scripts/check-readability.mjs` — add both routes.
- [x] Est. readability (mirror of the scorer): privacy 85, terms 84 — clears ≥ 60 comfortably.
- [ ] `npm run build` green; route count up by 2. **Blocked:** another session's untracked WIP `lib/hubContent.ts` (issue #35) currently has a syntax error and fails `tsc`. My files typecheck clean in isolation (`npx tsc --noEmit` → only `hubContent.ts` errors). Retrying build in the background until that tree clears.
- [ ] `npm run check:readability` — `/privacy/` and `/terms/` ≥ 60 (post-build).
- [ ] `npm run verify:redirects` still passes (not touched; re-run once tree is green).
- [ ] Served-HTML check: `/privacy/` self-canonical + names Resend/Supabase; privacy notice line in `/` and `/contact-us/` prerendered HTML.
- [ ] Update `plans/2026-08-31-seo-content-audit.md` C-1 + master-plan registry.
- [ ] Record the new pages in `PROJECT_CONTEXT.md` §6 and a decision in `DECISIONS.md`.
- [ ] Close GitHub issue #37.
