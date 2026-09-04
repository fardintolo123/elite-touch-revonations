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
- [x] Code shipped in commit `867e30c` (bundled with #35/#36/#39). `lib/hubContent.ts` landed fixed in the same commit; `tsc --noEmit` now clean.
- [x] `npm run build` green — verified 2026-09-03: `tsc --noEmit` exit 0; fresh `.next` build prerenders `/privacy/` + `/terms/` as static routes; route count 24 → 26 (+2).
- [x] `npm run check:readability` — 26/26 pages ≥ 60; `/privacy/` Flesch 86.6, `/terms/` Flesch 85.4.
- [x] `npm run verify:redirects` still passes — 34 passed, 0 failed (routes untouched).
- [x] Served-HTML check (running server + prerendered `.next/server/app/*.html`): `/privacy/` → 200, `<link rel="canonical" .../privacy/>`, `<meta name="robots" content="index, follow">`, names Resend + Supabase (+ Vercel + Google Analytics/Tag Manager); `/terms/` → 200, self-canonical, `index, follow`; privacy notice line "We use your details only to arrange your measure…" present in served HTML on `/`, `/contact-us/`, and every ContactSection page; footer "Privacy policy" + "Terms of use" links on every page; `/sitemap.xml` lists both with `lastmod 2026-09-02` (26 `<loc>` total).
- [x] Update `plans/2026-08-31-seo-content-audit.md` C-1 + master-plan registry — done 2026-09-03, once the concurrent #38–#41 doc edits had settled onto `main`.
- [x] Record the new pages in `PROJECT_CONTEXT.md` §6 and a decision in `DECISIONS.md` (D-122) — done 2026-09-03.
- [x] Close GitHub issue #37 — closed 2026-09-03 with a summary comment linking this verification.
