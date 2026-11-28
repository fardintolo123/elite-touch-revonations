# Conversion: leaks and baseline first (2026-11)

Status 2026-11-28: no page changed. #103 and #113 are done and verified live; #114's tag is saved and only
its GA4 read is outstanding (due by 2026-12-05); #111 and #109 are date-gated to **on or after 2026-12-24**
(28 complete days of clean GA4 data from 2026-11-26). Source of the `Batch: Conversion — leaks & baseline`
(tracker #112) milestone.

## Why

The owner's mentor (2026-11-25): "You overexplain too much → information overload for new visitors.
Also you need seriously optimise the conversion rate." The owner also pasted a local-site playbook:
get found, get trusted, get the call. It is recorded in `tips.md`.

## Evidence (measured 2026-11-25, live production, Playwright at 390×844 and 1440×900)

| Page | Words | Phone screens | Sections (H2) | Call/enquiry controls |
|---|---|---|---|---|
| `/` | 1,216 | 15.6 | 9 | 2 |
| `/services/` | 432 | 8.7 | 7 | 3 |
| `/services/bathroom-renovations/eastern-suburbs/` | 984 | 11.8 | 8 | 3 |
| `/packages/` | 798 | 10.7 | 7 | 3 |
| `/gallery/castle-hill-bathroom/` | 413 | 9.0 | 5 | 2 |
| `/blog/aging-in-place-bathroom-design/` | 1,058 | 8.7 | 10 | 5 |
| `/contact-us/` | — | — | — | **HTTP 403 (Cloudflare challenge), #103** |

What this shows:

- **Over-explaining is not the main problem on this site.** Word counts are moderate. The homepage's
  length comes mostly from photos (before/after, recent work), not text. The first phone screen
  already carries service + Sydney in the H1, the 5.0 Google rating (19 reviews), a room chooser and
  a call button. `docs/SEO_CONTENT_GUIDE.md` already says there is no ideal word count. So there is no
  copy rule to undo here (unlike 4 Elements Painting).
- **The real leak was the contact page.** `/contact-us/` returned 403 to people and AI crawlers while
  Cloudflare challenged it (#103). Closed: re-checked live 2026-11-28, it returns 200.
- **Nobody knows which pages produce enquiries.** GA4 holds the events, but no report splits
  enquiries and calls by landing page. Without that, any cut is a guess. The last committed Search
  Console sample (query × page, 2026-08-05 → 11-02, named queries only) shows 21 clicks. `/services/`
  had 3,851 impressions and no clicks. A fresh export is needed.
- Watch items for after the baseline: the Eastern Suburbs page has 3 paragraphs over 60 words.

## Checklist → issues

- [x] **#103** Fix the `/contact-us/` 403 (owner-side Cloudflare). Closed; re-checked live 2026-11-28 —
      `/contact-us/` now returns **200**, so the only sitemap URL that was not 200 is now fine.
- [ ] **E1 · #111** Enquiries and calls by landing page, 90 days. This sets the pre-change baseline and
      names the 3 pages to fix first. **Waiting on data, not on code:** run on/after **2026-12-24**.
- [x] **E2 · #113** Fix the CSP so GA4 hits to `analytics.google.com` and `www.google.com` are not refused
      (found 2026-11-26 while running E1; blocks #111 and #109 until 28 days of clean data exist).
      Re-confirmed live 2026-11-28: both hosts are in `connect-src`.
- [ ] **#109** GA4 hour-of-day report, to set phone cover (moved here; it is the same export session).
      Same **2026-12-24** gate.
- [ ] **#114** Tag the Business Profile website link (`utm_campaign=gbp-listing`, medium stays `organic`)
      so Maps visits can be counted separately. Agent side **verified 2026-11-28** (D-194): tagged URL is
      200 with no redirect and a clean canonical. **Owner saved the tag 2026-11-28 14:05** (confirmed in the
      editor's Contact → Website field). Remaining check: GA4 listing `gbp-listing` sessions under Organic
      Search — **due by 2026-12-05**. The public panel's Website button still showed the untagged URL at
      14:05, so the panel is not the evidence; GA4 is.

After E1: open page issues only for pages the data names, each with a before/after measurement
(words, phone screens, first-screen controls) and a 28-day enquiries-per-100-users comparison.

## How to run E1 and #109 on 2026-12-24 (so the run is mechanical)

No GA4 connector reaches agent sessions — checked again 2026-11-28: the only Google API config on this
machine points at the sibling project (`sc-domain:4elementspainting.com.au`) and its service-account key
file is absent. So the owner's export, or a session with the owner's GA4 open, is still the only input.

1. GA4 → property `453254013` → Admin → Data display → Events. `phone_call_click` **is already a key
   event** (starred 2026-11-28). Check `generate_lead` on the **Recent events** tab: it only becomes
   starrable once it has fired inside the 28-day window, i.e. after the first enquiry since 2026-11-26.
2. Explore → Blank. Dimensions: Landing page + query string, Session campaign, Day of week, Hour.
   Metrics: Sessions, Engaged sessions, Key events, plus Event count filtered to the two events above.
   Date range **2026-11-26 → 2026-12-24** (clean data only; do **not** extend to 90 days, the pre-fix weeks
   are an undercount).
3. Group landing pages as home / services / areas / packages / gallery / blog, then report sessions,
   enquiries and calls per 100 sessions with 95% intervals (Wilson), and name the 3 pages with the most
   sessions and the fewest enquiries.
4. Sum-check the totals against the GA4 export totals before recording anything as the baseline.
5. Split the same pull by Hour × Day of week for #109 and write the phone-cover recommendation from it.
6. Record the baseline numbers in #111 (and the hour table in #109), then open page issues only for the
   pages the data names.

## Owner's playbook against this site (short)

Already in place: one site version (`https://www`), entrance links (services, areas, blog), sticky
call on phones, real photos, licence and reviews, schema, a short room-first enquiry start. Open:
contact page blocked (#103), conversion not read by page (E1). Location pages:
`swap-the-city` is already part of the D-158 design standard.
