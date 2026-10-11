# CSP hardening

Outcome: apply low-risk production CSP hardening without changing GTM/GA4 endpoint behavior before
owner verification.

Status: Deferred follow-up remains for nonce/hash migration and analytics endpoint verification.

- [x] Confirm the enforced header, inline-script requirements, and Next.js 16 CSP trade-offs.
- [x] Keep enforcement in place; do not weaken it to report-only without an explicit security decision.
- [x] Remove production `unsafe-eval` and disallow inline event-handler attributes.
- [x] Verify the diff and run the narrowest relevant checks.
- [ ] Migrate inline scripts to nonce/hash-based CSP after the owner accepts the dynamic-rendering and
  caching trade-off.
- [ ] Verify GTM/GA4 endpoints and expand `connect-src` only as needed.

Relevant files: `next.config.ts`, `DECISIONS.md`, `docs/PERFORMANCE_BUDGET.md`.
