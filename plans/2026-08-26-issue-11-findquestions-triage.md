# Plan — Issue #11: findquestions.com blog topic triage

**Date:** 2026-08-26
**Task class:** SEO / content strategy. Routed via `CLAUDE.md` → Task Routing: "Third-party SEO tool
report" → `docs/SEO_CONTENT_GUIDE.md` § Report intake ("do not action one as written").

## What issue #11 is

Owner-filed issue titled "questions for blogs", body is three question titles pulled from
`findquestions.com` (a third-party "people also ask"-style question generator), each with a one-line
tagline and no volume, difficulty or source data:

1. "How Much Does a Bathroom Renovation Cost in Sydney?" — *Understanding typical pricing*
2. "Is $30,000 Really the Minimum for a Bathroom Reno?" — *Budget expectations and affordability*
3. "What Does a $10,000 Bathroom Renovation Include?" — *Budget-friendly options*

## Read first

- `docs/SEO_CONTENT_GUIDE.md` §2 (publishing priority — cost guide is priority 6, D-15) and §3
  Report-intake rules.
- `docs/BATHROOM_SITE_STRUCTURE.md` (GKP volume data).
- `DECISIONS.md` D-07/D-60/D-61 (pricing rules), D-86/D-88 (blog is a candidate, not built).
- `docs/source-copy/packages-2026-08-19.md` (real package inclusions and size basis).
- No `/blog` route exists anywhere in `app/` — confirmed by directory listing.

## Per-topic triage

**1. "How much does a bathroom renovation cost in Sydney?"**
Has real, independent evidence: `bathroom renovation cost sydney` is GKP-confirmed at 100–1K
searches/month, Medium competition (`docs/BATHROOM_SITE_STRUCTURE.md` line 124) — evidence that
predates this issue and already justified the cost/pricing guide as a priority-6 roadmap item
(D-15). High commercial intent: someone searching "how much does X cost" is typically close to
contacting a renovator, which makes this the strongest lead-generation angle of the three, not just
a traffic play. **Verdict: build, as the lead section of the cost guide.**

**2. "Is $30,000 really the minimum for a bathroom reno?"**
No independent volume data, but it is a real, common objection — many generic "Sydney bathroom
renovation cost" sources cite $30k+ as a typical figure, and a prospect who has seen that number may
never enquire, assuming they can't afford ETR. The honest answer is genuinely useful: ETR's real
entry point is **Basic, from $18,000** (~1.5 × 1.8 × 2.4 m), not $30,000 — $30,000 is where the
**Premium** tier starts. This is an objection-handling / myth-busting angle that can convert
budget-conscious researchers into enquiries, provided every figure keeps its size basis (D-07) and
"from" wording. **Verdict: build, as a section of the same page — not a separate URL.** Targeting it
as its own page would compete with topic 1 for the same searcher and the same intent
(`docs/SEO_CONTENT_GUIDE.md` "one term, one page").

**3. "What does a $10,000 bathroom renovation include?"**
ETR has no $10,000 offering — the cheapest real package is $18,000. Two ways to action this
literally, both bad: (a) invent a $10k inclusion list — a fabricated fact, forbidden outright by
`CLAUDE.md`'s standing rule against invented prices/inclusions; or (b) write generic industry
content not tied to ETR's real pricing, which brings traffic that expects work ETR doesn't sell at
that price, producing unqualified leads and wasted sales calls — the opposite of what the owner
asked for ("bring clients not just traffic"). **Verdict: do not build as a page or a claim.** Address
only as one short paragraph inside the same cost guide, explicitly reframing the number: what a
$10k search usually finds, and why a compliant AS 3740 Sydney reno realistically starts higher. This
turns a misleading search term into a qualifying moment instead of a false promise.

## Recommendation

Do not open this as three blog posts or a new blog section. Fold all three into the single
already-approved **cost/pricing guide** page (`docs/SEO_CONTENT_GUIDE.md` §2 priority 6 / D-15),
which does not exist yet. Suggested shape:

1. Direct-answer opener: the three real from-prices with size basis, "firm after a free on-site
   measure" (per `docs/SEO_CONTENT_GUIDE.md` §4).
2. What drives cost up or down (tiling extent, fittings tier, layout changes) — grounded in the real
   package inclusion differences (`docs/source-copy/packages-2026-08-19.md`), not generic filler.
3. "Is $30,000 the minimum?" section — states the real $18,000 entry point plainly.
4. Short "what about $10k renovations?" paragraph — honest expectation-setting, no invented tier.
5. FAQ block (4–6 questions, `docs/SEO_CONTENT_GUIDE.md` §4) with `FAQPage` schema — no FAQ schema
   pattern exists in `app/` yet, so this would be new.
6. Trust signals (licence 475204C, AS 3740, 10-year warranty) and a clear CTA to the enquiry form.
7. Gate through `docs/CONTENT_QUALITY_CHECKLIST.md` and `docs/SEO_AEO_GEO_CHECKLIST.md` before ship.

**Not done in this session** — this is analysis and a recorded decision (D-104/D-105) only. Building
the page is a separate, owner-confirmed next step.

## Checklist

- [x] Read `docs/SEO_CONTENT_GUIDE.md`, `docs/BATHROOM_SITE_STRUCTURE.md`, `DECISIONS.md` D-07/D-15/
      D-60/D-61/D-86/D-88, `docs/source-copy/packages-2026-08-19.md`
- [x] Confirmed no `/blog` route or FAQ schema exists yet
- [x] Triaged each of the three topics individually against real pricing facts and GKP evidence
- [x] Verdict recorded in `DECISIONS.md` (D-104, D-105)
- [ ] Owner sign-off to build the cost/pricing guide page
- [ ] Page built, gated through `CONTENT_QUALITY_CHECKLIST.md` and `SEO_AEO_GEO_CHECKLIST.md`
- [ ] Issue #11 closed with a link to this plan and the decision rows
