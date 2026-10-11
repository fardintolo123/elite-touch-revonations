# Session Summary

## 1. Session Objective

Review the Lighthouse screenshots, confirm the reported CSP problems against the repository, and
apply the safe non-analytics hardening while leaving GTM/GA4 event verification for the owner.

## 2. Work Completed

- Confirmed the screenshots show Google Analytics requests blocked by the active `connect-src` policy.
- Confirmed the active policy was enforcing `Content-Security-Policy`, while D-132 documents a
  report-only transition plan.
- Read the installed Next.js 16 CSP guidance.
- Audited the app's inline scripts in `app/layout.tsx` and JSON-LD in `components/SchemaGraph.tsx`.
- Did not switch to report-only mode because that would weaken active security enforcement.
- Updated `next.config.ts` to:
  - make `unsafe-eval` development-only;
  - add `script-src-attr 'none'` to block inline HTML event-handler attributes; and
  - keep the existing GTM/GA4 `connect-src` allowlist unchanged for owner verification.
- Added `plans/csp-hardening.md` with the deferred nonce/hash migration and GTM/GA4 verification steps.

## 3. Important Decisions

- **Decision:** Keep the `Content-Security-Policy` header enforced.
  **Reason:** Switching to report-only would weaken security and was rejected by the safety review.
  **Alternative:** Restore report-only mode to match D-132. **Why rejected:** It would broaden the
  security regression while the owner asked for other fixes to proceed.
- **Decision:** Make `unsafe-eval` development-only.
  **Reason:** Next.js guidance states it is needed by React development tooling but not production.
- **Decision:** Defer nonce/hash migration.
  **Reason:** Next.js 16 requires dynamic rendering for nonce-based CSP, which could affect static
  generation, CDN caching, and performance. The owner should verify analytics and accept that trade-off
  before this larger change.
- **Decision:** Leave analytics endpoints unchanged.
  **Reason:** The owner will verify GTM/GA4 events separately.

## 4. Permanent Rules / Lessons

- Do not weaken an active security policy to match stale documentation without an explicit security
  decision.
- `unsafe-eval` should not be present in the production CSP.
- Use `script-src-attr 'none'` when the application does not rely on inline HTML event handlers.
- A nonce/hash CSP migration in Next.js 16 may force dynamic rendering and has a measurable performance
  and caching trade-off.
- Verify analytics behavior after changing CSP endpoint allowlists or script policies.

## 5. Things We Explicitly Decided NOT To Do

- Did not switch the active CSP to report-only.
- Did not add `analytics.google.com` or `stats.g.doubleclick.net` to `connect-src`.
- Did not migrate inline scripts to nonces or hashes.
- Did not run GTM Preview, Tag Assistant, or GA4 event validation.
- Did not deploy or push changes.

## 6. Current Project State

- Production CSP remains enforced.
- Production no longer allows `unsafe-eval`; development retains it for React tooling.
- Inline HTML event-handler attributes are disallowed.
- The existing analytics endpoint mismatch remains for owner verification and follow-up.
- Full nonce/hash migration remains deferred in `plans/csp-hardening.md`.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `next.config.ts` | Added development-only `unsafe-eval` and `script-src-attr 'none'` to the CSP construction | Harden production policy without changing analytics endpoints |
| `plans/csp-hardening.md` | Added a live follow-up checklist | Track nonce/hash migration and GTM/GA4 verification |
| `session-history/2026-10-09-csp-hardening.md` | Added this handoff | Preserve the security-review context |

## 8. Files Created

- `plans/csp-hardening.md` — active CSP follow-up checklist.
- `session-history/2026-10-09-csp-hardening.md` — this session handoff.

## 9. Files Deleted

- None.

## 10. Tests and Validation

- `npm run typecheck` — passed.
- `npm run build --ignore-scripts` — passed.
- Production build generated all 114 static pages.
- Git diff whitespace validation — passed; Git emitted only the repository's existing LF/CRLF warning.
- Confirmed the built configuration contains `script-src-attr 'none'` and retains `Content-Security-Policy`.
- GTM/GA4 events were not tested, per owner instruction.

## 11. Performance Impact

- No dynamic rendering or nonce migration was introduced.
- Static generation remains enabled; the build generated 114 static pages.
- No new dependency was added.

## 12. SEO Impact

No SEO routes, metadata, schema, sitemap, or content were changed.

## 13. Remaining Tasks

### High Priority

- Owner verifies GTM/GA4 events and identifies which blocked analytics endpoints are actually required.

### Medium Priority

- Decide whether to migrate inline scripts and JSON-LD to a nonce/hash-compatible CSP. Assess the impact
  on static rendering, CDN caching, and Core Web Vitals before implementing.

