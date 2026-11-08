# Session Summary

## 1. Session Objective

Resolve issue #85 without inventing a business claim. The repo had accessible and ageing-in-place blog posts but no owner-backed evidence that ETR offers specialist accessible / NDIS-funded bathroom work, so the project needed a safe non-offer fallback rather than adding unsupported service claims.

## 2. Work Completed

- Added a factual non-offer line to the two affected posts in `lib/blog.ts`:
  - `accessible-bathroom-renovation-sydney`
  - `aging-in-place-bathroom-design`
- Recorded the decision in `DECISIONS.md` as `D-161`.
- Updated the tracker in `plans/long-tail-buyer-queries-2026-10.md` to note the safe fallback under issue #85.
- Verified the production build still passes with `npm run build`.
- Confirmed the generated `.next` public output does not contain the `NDIS` claim phrase in the served page output.

## 3. Important Decisions

- Decision: treat accessible / ageing-in-place / NDIS work as a non-offer until the owner confirms that ETR actually does this work and the standard or funding model it follows.
- Reason: issue #85 explicitly says these claims are legally and contractually sensitive and must begin with owner answers. No supporting fact exists in the repo.
- Alternatives considered:
  - Add pricing, funding guidance, or a standards claim to the site — rejected because it would invent or imply unconfirmed business scope.
  - Leave the posts unchanged — rejected because they would imply a service the repo does not support.
- Preferred approach: a plain factual statement that the service is not offered, while keeping the posts as informational background rather than a claim about ETR's actual work.

## 4. Permanent Rules / Lessons

- A high-intent buyer query can still be safe to publish if it is framed as general educational content instead of a service claim.
- Legal, funding and standards statements must be owner-confirmed and stored in the source-of-truth business data before they appear on public pages.
- A missing answer is not a reason to invent a claim; it is a reason to state a non-offer or keep the matter silent.

## 5. Things We Explicitly Decided NOT To Do

- We did not add accessible-bathroom pricing, NDIS or Home Care funding guidance, or a named accessibility standard to the public pages.
- We did not turn the accessible / ageing-in-place posts into buyer-page copy that implied ETR offers the service.
- We did not widen the service list beyond the four confirmed bathroom-related services.

## 6. Current Project State

- The site remains build-clean.
- The accessible and ageing-in-place blog posts are now clearly non-offer informational content.
- The project still lacks owner confirmation for accessible / ageing-in-place / NDIS scope, so those lines remain intentionally conservative.
- No new service claim was introduced.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `lib/blog.ts` | Added non-offer lines to the two accessible/aging-in-place blog posts | Prevent misleading public claims without owner confirmation |
| `DECISIONS.md` | Added `D-161` | Record the owner-safe decision in the canonical project log |
| `plans/long-tail-buyer-queries-2026-10.md` | Updated the issue note | Maintain the issue tracker without claiming a service we cannot support |

## 8. Files Created

- None.

## 9. Files Deleted

- None.

## 10. Tests and Validation

- `npm run build` — passed.
- Generated `.next` output checked for `NDIS` — no public page matches found in the production HTML output.

## 11. Performance Impact

- No meaningful performance change.
- This was a content-only fix; no new dependency or client bundle was added.

## 12. SEO Impact

- Pages changed: `accessible-bathroom-renovation-sydney` and `aging-in-place-bathroom-design`.
- Intent: informational content remains informational; the pages no longer imply a service claim.
- No new corporate claim or funding claim was added.

## 13. Remaining Tasks

### High Priority
- Obtain owner confirmation on whether ETR does accessible / ageing-in-place / NDIS-funded bathroom work before reworking the copy as a service offer.

### Medium Priority
- If the owner confirms the scope, then decide whether to present these as service pages or keep them as strictly informational posts.

### Low Priority
- None.

## 14. Open Questions

- Does ETR actually perform accessible / ageing-in-place bathroom work?
- Does ETR do NDIS-funded or Home Care-funded work, and under what model?
- Is there a named accessibility/standards standard the business actually works to?

## 15. Next Session Handoff

- Read `DECISIONS.md` at `D-161` before changing any accessible/NDIS wording again.
- Review the two posts in `lib/blog.ts` before editing them further.
- Do not add a service claim without owner confirmation and a matching public fact in the business data.
- If the owner answers the questions, the next step is to update the post language and decide whether to add a formal service section on the bathroom page.

## 16. Potential Documentation Updates

- `DECISIONS.md` — already updated with the decision.
- `PROJECT_CONTEXT.md` — could eventually note the owner-safe rule for legal/funding claim gating.
- `CLAUDE.md` — no immediate change, but this session reinforced the rule: do not write pricing, claim, or compliance language without owner confirmation.

## 17. Conversation-Derived Insights

### Confirmed decisions
- The accessible / ageing-in-place pages must not imply an in-scope service without owner approval.
- The repo had no evidence of NDIS or accessible-service work, so a non-offer note was safer than adding unsupported language.

### Strong recommendations
- Keep these topics in general information mode until the business confirms a real scope and standard.
- Use the same rule for any future funding, registration, or accessibility claims.

### Ideas/proposals
- If approved later, add a precise service section to the bathroom page with owner-confirmed wording and a genuine standards claim.

### Unresolved opinions
- None required; the rule is now explicit in the code and decisions log.
