# Issue #42 Authority Outbound Links

**Issue:** [#42](https://github.com/fardintolo123/elite-touch-revonations/issues/42)  
**Source:** `plans/2026-08-31-seo-master-plan.md` Phase C; `plans/2026-08-31-seo-content-audit.md` C-4  
**Date:** 2026-08-31

## Plan

Add a small set of authoritative outbound links for the site's load-bearing regulatory and industry claims. Keep the URLs in `lib/businessInfo.ts`, use consistent external-link attributes, and place the links in existing always-rendered markup on `/about-us/` and service pages.

## Checklist

- [x] Confirm authoritative source URLs resolve.
- [x] Store authority URLs in `lib/businessInfo.ts`.
- [x] Add consistent external-link rendering with `target="_blank"` and `rel="noopener noreferrer"`.
- [x] Link the NSW licence check, AS 3740, NCC, HIA, Home Building Act / NSW contracts, and WELS mentions where they are most useful.
- [ ] Update the source audit and master registry for C-4 / #42.
- [ ] Record the implementation decision.
- [ ] Run `npm run build`.
- [ ] Verify `/about-us/` and one service page HTML contains the authority links.
- [ ] Close GitHub issue #42.
