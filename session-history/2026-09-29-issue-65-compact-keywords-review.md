# Session Summary

## 1. Session Objective

Review GitHub issue #65, which proposed Edward Sturm's Compact Keywords course and methodology, and
decide how Elite Touch Renovations could benefit without duplicating existing SEO work, creating
unsupported pages, or treating marketing claims as established search-engine rules.

## 2. Work Completed

- Read issue #65 in full. It was an exploratory strategy request with no implementation acceptance
  criteria or linked repository plan.
- Read the current SEO/content rules, the location strategy, the active quarterly SEO checklist,
  relevant decisions through D-150, current route/data sources, and recent Search Console handoffs.
- Reviewed the course's public sales page, curriculum, FAQ and linked checkout. The page lists $1,199;
  the linked checkout currently applies the `CONVERSION` coupon and shows a $499 total. The course
  also recommends a keyword tool and names Moz from $49/month.
- Checked the course's GEO, page-length, query-page and omnichannel claims against Google's current
  primary AI-search and spam guidance.
- Confirmed that the useful core idea—prioritise high-purchase-intent pages with a direct conversion
  path—is already the site's strategy across services, packages, published locations, projects and
  Search Console-led improvements.
- Added a five-part high-intent keyword gate to `docs/SEO_CONTENT_GUIDE.md`: service fit, intent,
  existing page ownership, demand plus real proof, and a measurable conversion path.
- Extended the standing quarterly SEO review to inspect commercial queries together with their
  landing pages, compare organic landings with calls/forms, and review Google's Generative AI
  performance report without treating GEO as a separate ranking system.
- Recorded the durable verdict as D-151 in `DECISIONS.md`.
- Posted the evidence-backed verdict to GitHub issue #65 and closed it as resolved.

## 3. Important Decisions

### Adopt the prioritisation principle, not a new strategy

- Decision: use Compact Keywords only as a five-check gate for future high-intent opportunities.
- Reason: the site already implements the method's valuable parts and has stronger project-specific
  safeguards around service scope, location evidence, real proof and conversion measurement.
- Alternative: rebuild the content strategy around the course.
- Why rejected: it would duplicate current service, package, location, technical SEO, CTA and
  measurement work without evidence of incremental value.

### Do not recommend buying the course now

- Decision: no purchase recommendation for ETR, including at the currently discounted $499 checkout.
- Reason: the visible curriculum overlaps work already implemented and documented in this repo.
- Alternative: buy it for templates, keyword research and GEO guidance.
- Why rejected: those capabilities already exist here; the course also depends on a separate keyword
  tool, while its most useful principle has now been captured directly in the project guide.

### Keep useful buyer-support articles

- Decision: do not delete or devalue an article solely because it lives under `/blog/`.
- Reason: several existing posts address purchase decisions and some already have Search Console
  evidence. Page intent and value matter more than the URL label.
- Alternative: follow the course's broad "blog SEO is dead" framing.
- Why rejected: it is too absolute and contradicts the evidence-led improve-before-create rule.

### Do not start an omnichannel mention campaign

- Decision: issue #65 does not authorize Reddit, LinkedIn, Medium or X posting.
- Reason: Google's primary guidance warns against inauthentic mention-seeking. For a Sydney local
  renovator, genuine Business Profile activity, reviews, citations and project proof are more useful.
- Alternative: publish repeated high-intent content across external platforms to influence AI.
- Why rejected: it risks low-value repetition and reopens owner-deferred off-site work in D-142.

## 4. Permanent Rules / Lessons

- Purchase intent is a prioritisation signal, not automatic permission to create a URL.
- A new commercial page needs service fit, distinct intent, no existing page owner, demand evidence,
  real ETR proof and a measurable conversion path.
- If an existing page owns the intent, improve it rather than create a competing page.
- There is no target word count. Use the shortest page that fully answers the decision and passes the
  existing content, SEO and conversion gates.
- Treat Google AI visibility as another Search surface. Do not create AI-only pages, markup or copy.
- Evaluate external SEO frameworks against primary guidance and the current site before paying for or
  implementing them.

## 5. Things We Explicitly Decided NOT To Do

- Did not recommend purchasing Compact Keywords.
- Did not create a landing page, location page, service page, blog post or new route.
- Did not delete existing buyer-support articles.
- Did not add new schema, `llms.txt` work, crawler directives or AI-specific markup.
- Did not start Reddit, LinkedIn, Medium, X, directory or citation work.
- Did not alter D-139's owner-approved first-wave article exception or D-142's deferral of off-site
  citation work.
- Did not run a build or browser test because no application code, page output, metadata, schema,
  route or visual behavior changed.

## 6. Current Project State

Issue #65 is closed with a detailed GitHub comment. The site itself is unchanged. The project now has
a durable five-part gate for future high-intent keyword proposals and a recurring measurement step
covering Search Console query/page data, conversions and Google's Generative AI report.

The existing conversion-first architecture remains authoritative: four confirmed services, packages
and cost intent, evidence-gated locations, real project pages, direct enquiry CTAs and selected
buyer-support articles. Off-site citations and Business Profile-related authority work remain outside
this issue and are still deferred under D-142.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `DECISIONS.md` | Added D-151 with the issue verdict, price check, accepted principle and rejected claims | Prevent repeat course/strategy reconsideration without new evidence |
| `docs/SEO_CONTENT_GUIDE.md` | Added the five-part high-intent keyword gate | Make the useful method operational and safe for future content decisions |
| `plans/seo-quarterly-review.md` | Added high-intent query/page, conversion and Google AI visibility checks | Measure commercial and AI-search outcomes instead of assuming them |

## 8. Files Created

- `session-history/2026-09-29-issue-65-compact-keywords-review.md` — this handoff.
- A temporary issue plan was used during the review and removed after completion.

## 9. Files Deleted

- `plans/2026-09-29-issue-65-compact-keywords-review.md` — completed working plan; durable outcomes
  now live in D-151, the SEO guide and this handoff.

## 10. Tests and Validation

- `git diff --check` passed; only line-ending warnings were reported.
- Documentation assertions passed for all five guide checks, the two new quarterly measurement areas,
  and exactly one D-151 entry.
- The course page and linked checkout were independently inspected for curriculum and current pricing.
- Google's current AI optimization guide, AI Search reporting announcement and spam policies were
  checked as primary sources.
- GitHub confirmed issue #65 was closed successfully.
- No build, typecheck, readability run or browser pass was needed because there was no application or
  rendered-page change.

## 11. Performance Impact

None. No code, dependency, script, client boundary, asset, request or page output changed. No
performance measurement was taken.

## 12. SEO Impact

- Future commercial-keyword proposals now have a stricter create/improve gate.
- Quarterly review now measures high-intent Search Console performance together with landing pages and
  conversions.
- Google's dedicated Generative AI report is now part of the evidence cadence.
- No current page, target keyword, metadata, schema, canonical, sitemap entry, internal link or
  indexation directive changed.

## 13. Remaining Tasks

### High Priority

None for issue #65.

### Medium Priority

None for issue #65. Run the new checks at the next scheduled quarterly review.

### Low Priority

- Revisit a course purchase only if the owner wants structured SEO training for a human team member,
  not because the site lacks the strategy itself.

## 14. Open Questions

None. No owner-only decision blocks this issue.

## 15. Next Session Handoff

- Read D-151 and the high-intent gate before proposing a new commercial landing page.
- For any candidate, identify the target query, current page owner, evidence, real ETR proof, primary
  CTA and measurement method before implementation.
- Preserve D-139's narrow owner exception and D-142's off-site-work deferral.
- Do not reopen issue #65 for generic course claims; reopen only with a specific evidenced query that
  has no existing page home and can support real proof plus a measurable enquiry path.

## 16. Potential Documentation Updates

No further permanent documentation update is needed. D-151, the SEO content guide and the quarterly
review already contain the durable outcome.

## 17. Conversation-Derived Insights

### Confirmed decisions

- The course is not recommended for purchase for ETR now.
- The conversion-first principle is retained as a five-part gate.
- Existing useful advice content remains in place.
- Issue #65 is resolved and closed.

### Strong recommendations

- Spend future effort on evidenced commercial queries, conversion tracking and genuine local
  authority before additional generic content.
- Use Google's Generative AI report as measurement, not as justification for AI-specific hacks.

### Ideas/proposals

- If the owner later wants to train an employee in SEO from first principles, the course could be
  reconsidered as education rather than as a missing site tactic.

### Unresolved opinions

None.
