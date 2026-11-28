---
name: Monthly maintenance check
about: The dated monthly cycle issue — owner numbers, the agent pass and one summary per month.
title: "[Recurring] Monthly check — YYYY-MM"
labels: recurring
---

**Period:** {{PERIOD}} · **Opened:** {{DATE}} · **Due by:** {{DUE}}

The robot opens this on the 1st of the month. If it did not, open it by hand from this template and
fill in the three values above from `docs/recurring-tasks.md`.

### Owner (about 10 minutes)

- [ ] Google Business Profile performance for the last three months: calls, direction requests, website clicks and top search terms. Paste the numbers or screenshots in a comment.
- [ ] Today's Google rating and review count.
- [ ] GBP posts and photos added this month.
- [ ] GA4 Admin (property 453254013): confirm `generate_lead` and `phone_call_click` are still marked as key events.

### Agent

- [ ] **Rating snapshot:** compare the rating block in `lib/businessInfo.ts` with the owner's numbers. Change the numbers and the date together, in a separate commit. If they already match, say so and change nothing.
- [ ] **GA4**, from the first clean day after the analytics fix (2026-11-26): users, leads, call clicks and leads per 100 users.
- [ ] **Page-two sweep:** positions 8–20 with at least 10 impressions, skipping owned queries and pages changed in the last 28 days. From January 2027 this lands here; #115 owns the first one.
- [ ] `npm run check:readability` and `npm run check:design` against `main`, and record any new failures.
- [ ] `npm audit --omit=dev`: record the high and critical count, and open an issue for each new finding.
- [ ] Count the files in `session-history/` (rule: 20 or fewer). Consolidate before adding more.
- [ ] Write a five-line summary in `plans/recurring/{{PERIOD}}-monthly.md`, then close this issue.

## Execution

- Read only: the rating block in `lib/businessInfo.ts`; `docs/recurring-tasks.md`.
- Quick check between edits: `npx tsc --noEmit` after the snapshot edit.
- Final gate, once before commit: `npm run build --ignore-scripts`, only if code changed.
- Data: GA4 property 453254013 and the GBP numbers come from the owner's comment on this issue.
- Owner-only steps: the Owner block.
- Stop and report if: the live Google count is lower than the snapshot. Check that you are reading the right profile before editing.
- Executor settings: `deepseek-flash` (it reads the owner's screenshots), effort Low; agent teamwork off.
