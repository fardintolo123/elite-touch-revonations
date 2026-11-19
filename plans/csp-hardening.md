# CSP hardening

Outcome: apply low-risk production CSP hardening without changing GTM/GA4 endpoint behavior before
owner verification.

Status: Analytics endpoints done (D-162). `style-src 'unsafe-inline'` is now a deliberate, accepted
exception (D-190). The `script-src` nonce/hash migration remains deferred, pending the owner's call
on the dynamic-rendering trade-off — tracked explicitly as **O-14** in `DECISIONS.md`, which spells out
the two real implementation paths (full dynamic rendering via Next's documented nonce pattern, or
custom edge-side nonce substitution in `proxy.ts`) and why neither is a safe default to pick alone.

- [x] Confirm the enforced header, inline-script requirements, and Next.js 16 CSP trade-offs.
- [x] Keep enforcement in place; do not weaken it to report-only without an explicit security decision.
- [x] Remove production `unsafe-eval` and disallow inline event-handler attributes.
- [x] Verify the diff and run the narrowest relevant checks.
- [ ] Migrate inline scripts to nonce/hash-based CSP after the owner accepts the dynamic-rendering and
  caching trade-off.
- [x] Verify GTM/GA4 endpoints and expand `connect-src` only as needed (D-162, 2026-11-02:
  `https://*.analytics.google.com` and `https://*.g.doubleclick.net` added after both were seen
  CSP-blocked live. Verified on an isolated production build with dead-end DNS, so no test hits were
  sent. Owner to confirm in GA4 Realtime once deployed).

Relevant files: `next.config.ts`, `DECISIONS.md`, `docs/PERFORMANCE_BUDGET.md`.
