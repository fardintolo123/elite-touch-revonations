# CSP hardening

Outcome: apply low-risk production CSP hardening without changing GTM/GA4 endpoint behavior before
owner verification.

Status: Analytics endpoints done (D-162). `style-src 'unsafe-inline'` is a deliberate, accepted
exception (D-190). **`script-src 'unsafe-inline'` is also staying as-is for now (D-192, 2026-11-24,
owner delegated the call)** — neither the dynamic-rendering nonce pattern nor custom edge-side
substitution was judged worth the risk against a known-safe `unsafe-inline` gap with no known
exploitable vector. Re-open only if a real XSS bug surfaces in this app, or the owner specifically
asks to spend a session measuring the dynamic-rendering trade-off.

- [x] Confirm the enforced header, inline-script requirements, and Next.js 16 CSP trade-offs.
- [x] Keep enforcement in place; do not weaken it to report-only without an explicit security decision.
- [x] Remove production `unsafe-eval` and disallow inline event-handler attributes.
- [x] Verify the diff and run the narrowest relevant checks.
- [ ] Migrate inline scripts to nonce/hash-based CSP — **deferred indefinitely (D-192)**, not scheduled
  work; re-open only on new evidence (see Status above).
- [x] Verify GTM/GA4 endpoints and expand `connect-src` only as needed (D-162, 2026-11-02:
  `https://*.analytics.google.com` and `https://*.g.doubleclick.net` added after both were seen
  CSP-blocked live. Verified on an isolated production build with dead-end DNS, so no test hits were
  sent. Owner to confirm in GA4 Realtime once deployed).

Relevant files: `next.config.ts`, `DECISIONS.md`, `docs/PERFORMANCE_BUDGET.md`.
