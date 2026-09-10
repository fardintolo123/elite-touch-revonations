# Issue 57 — Lighthouse security + contrast follow-up

## Scope
Fix the issues captured in the screenshot set:
- Lighthouse best-practices warnings for missing CSP enforcement and COOP policy
- low-contrast text on the dark footer band

## Root cause
- The site currently sends `Content-Security-Policy-Report-Only` instead of a real enforcing policy, so Lighthouse reports that no enforcement CSP exists.
- The `Cross-Origin-Opener-Policy` header is missing.
- Footer link/body colors on the dark background are too dim for acceptable contrast against the ink band.

## Implementation
1. [x] Replace the report-only CSP header with a working enforcement policy that still allows the site’s GTM and inline styles/scripts.
2. [x] Add `Cross-Origin-Opener-Policy: same-origin` in the shared response headers.
3. [x] Lighten footer text and link colors on the dark band to meet accessibility contrast expectations.

## Verification
- [x] `npm run build`
- [x] Start a local dev server and inspect the response headers for CSP and COOP.
- [x] Confirm the footer text reads clearly in the browser at desktop and mobile widths.

## Status
Shipped and verified on 2026-09-10.
