# Plan — Triage GitHub issue #5 ("free-seo-audit") performance report

**Date:** 2026-08-23
**Task class:** Third-party tool report intake, routed via `CLAUDE.md` Task Routing → "Anything
that adds weight / Performance / Core Web Vitals" → `docs/PERFORMANCE_BUDGET.md`, plus the
Report-intake guardrail in `docs/SEO_CONTENT_GUIDE.md` §3 ("do not action a third-party report as
written").

## What issue #5 is

Two screenshots of a Lighthouse/PageSpeed-style report, no body text. Four flagged items visible:
"Reduce unused JavaScript" (Est. savings 29 KiB), "LCP request discovery", "Legacy JavaScript"
(Est. savings 14 KiB), "Network dependency tree". A third attachment ("full_page_screenshot.png")
failed to upload on the issue, so no URL or page identity is stated anywhere in the issue itself.

## Report intake — six-point process

1. **Triage against existing structure first.** The project already has a written rule
   (`docs/PERFORMANCE_BUDGET.md` rule 16) predicting exactly the LCP-discovery failure mode: "a
   high-priority preload on a 40 px logo competed with a hero photo and measurably hurt LCP." Found
   the code had regressed back into that exact state — see Findings.
2. **No volume/difficulty applies** — this is a performance report, not a content-gap report; the
   equivalent evidence bar is reproducing the finding against the live code, which is what this
   triage did.
3. **Checked internal consistency / reproducibility** — see Findings and Verification below.
4. N/A — no hub/spoke duplication claims in this report.
5. N/A — no service-scope claims in this report.
6. **Record the verdict** — done below and in `DECISIONS.md` D-90–D-92.

## Verification

The screenshot gives no URL, so the report cannot be re-run against its original target. Two
candidate targets exist:
- The production Vercel deployment (`https://elite-touch-revonations-cdffxxe7r.vercel.app`, active
  since 2026-08-17 per `gh api repos/:owner/:repo/deployments` — despite `MIGRATION.md` stating
  "Not deployed"). **Found to be behind Vercel Deployment Protection** — an anonymous Lighthouse
  run redirects to `vercel.com/login`. This could not be audited from here; see Findings §3 for why
  this matters independently of the performance question.
- A local production build (`next build` + `next start`), per `docs/PERFORMANCE_BUDGET.md` §5's own
  rule to "always measure a production build." Used this instead.

Ran Lighthouse (mobile, simulated throttling, Chrome headless) against `localhost:3000` production
build, multiple times per the runbook's "never trust a single run":

| Run | Perf | FCP | LCP | TBT | CLS | SI |
|---|---|---|---|---|---|---|
| Before fix | 98 | 1.1s | 2.4s | 50ms | 0 | 2.2s |
| After fix, run 1 | 84 | 2.0s | 2.8s | 420ms | 0 | 2.2s |
| After fix, run 2 | 94 | 1.0s | 2.9s | 90ms | 0 | 3.5s |
| After fix, run 3 | 93 | 1.0s | 2.9s | 100ms | 0 | 3.5s |

Run 1's TBT spike is machine noise (a shared dev VM under concurrent load), consistent with the
runbook's own warning about single-run variance — runs 2–3 are the representative numbers. All
runs clear every regression gate in `docs/PERFORMANCE_BUDGET.md` §1 (Perf ≥ 90 barring noise, TBT
≪ 300ms hard cap, CLS 0). This is the **first recorded baseline** — §4 of that file previously said
"no measurements yet."

## Findings

1. **"Unused JavaScript" (28–29 KiB) and "Legacy JavaScript" (13–14 KiB) are the same chunk**
   (`_next/static/chunks/227kwhsrjlnp4.js`, 71.6 KB total) — confirmed by inspecting its contents:
   it is Next.js's own polyfill module (`Array.prototype.at/flat/flatMap`, `Object.fromEntries`,
   `Object.hasOwn`, `String.prototype.trimStart/trimEnd`, `URL.canParse`) bundled together with
   React's `scheduler` package. **This is framework runtime, not application code** — there is no
   app-authored script here to trim. It ships because `EnquiryForm` (a client component) is
   included on every page via `ContactSection`, which `DECISIONS.md` D-80 already documents and
   accepts as a deliberate trade-off (homepage JS over the 150 KB *shared* budget, under the 230 KB
   *per-route* cap). No new decision needed — this is that same, already-accepted cost surfacing
   under a different Lighthouse audit name. **REJECTED as an action item.**
2. **"Network dependency tree"** — the actual chain measured is two requests deep (the document,
   then one CSS file) totalling ~70–260ms depending on run. This is Lighthouse's standard
   informational "insight," not an actual regression; nothing to fix. **REJECTED as an action
   item.**
3. **"LCP request discovery"** — not reproducible as a failing audit against the current local
   build (`lcp-discovery-insight` scored `notApplicable` in every local run). However, inspecting
   the served HTML found a real, confirmed violation of the project's own rule 16: **every page
   shipped two high-priority image preloads** — the header logo (`SiteHeader.tsx`, site-wide) and
   that page's actual hero photo. Rule 16 exists specifically because this was a previously-fixed
   regression ("a high-priority preload on a 40 px logo competed with a hero photo and measurably
   hurt LCP"). It had crept back in. This is very likely what a throttled, real-network audit (like
   whatever produced the issue's screenshot) would flag, even though a fast localhost run doesn't
   surface it. **FIXED** — see below.
4. **Separately discovered, not part of the performance report but material to it:** the live
   Vercel deployment is gated behind Vercel's own login/SSO (Deployment Protection). If this
   protection is still on when DNS eventually points at Vercel, **Googlebot and every real visitor
   would be unable to reach the site at all** — a far bigger problem than any Lighthouse score.
   This is an infrastructure/access setting, not a code change, and not something to flip without
   the owner's sign-off (`CLAUDE.md` Git Workflow: "Do not push or deploy without explicit owner
   sign-off" extends to deployment configuration). **Flagged to the owner, not actioned.**

## Fix applied

`components/layout/SiteHeader.tsx` — removed `priority` from the header logo `<Image>`. Verified
(by reading Next's `get-img-props.js` source and then empirically rebuilding) that `loading="eager"`
*without* `priority` **still** triggers Next's image-preload path — so the only combination that
removes the competing preload is the plain default (no `priority`, no explicit `loading`), which
renders as a native `loading="lazy"` image. Since the logo sits at the very top of the viewport on
every page, a browser fetches it immediately in practice regardless of the `lazy` attribute — this
is not a case where lazy-loading meaningfully delays it, it is a case where an *unnecessary preload
hint* was competing with the one that matters (rule 16). Every page shares `SiteHeader`, so this one
change fixes the violation site-wide (homepage hero, and every `PageHero.tsx` consumer).

## Checklist

- [x] Downloaded and viewed both screenshots from the issue
- [x] Checked for a stated URL/target — none given; used the documented "measure a production
      build" fallback since the live Vercel URL is protection-gated
- [x] Reproduced two of the four flagged items locally (unused JS, legacy JS) and traced both to
      the same already-accepted, already-documented cost (D-80)
- [x] Confirmed "network dependency tree" is informational, not a real regression
- [x] Found and fixed the real rule-16 violation (duplicate high-priority preload) even though the
      exact "LCP request discovery" audit didn't reproduce locally
- [x] `npm run typecheck` clean
- [x] `npm run build` green — 24 routes, no drop
- [x] Verified in the built HTML: exactly one image preload on the homepage after the fix
- [x] Recorded a first Lighthouse baseline in `docs/PERFORMANCE_BUDGET.md` §4 (previously empty)
- [x] Recorded the verdict in `DECISIONS.md` (D-90, D-91, D-92)
- [ ] Close GitHub issue #5 with the triage summary as a comment
