# Conversion: leaks and baseline first (2026-11)

Status: issue planning only; no page changed. Source of the `Batch: Conversion — leaks & baseline` (tracker #112)
milestone.

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
- **The real leak is the contact page.** `/contact-us/` returns 403 to people and AI crawlers while
  Cloudflare challenges it (#103, still true today).
- **Nobody knows which pages produce enquiries.** GA4 holds the events, but no report splits
  enquiries and calls by landing page. Without that, any cut is a guess. The last committed Search
  Console sample (query × page, 2026-08-05 → 11-02, named queries only) shows 21 clicks. `/services/`
  had 3,851 impressions and no clicks. A fresh export is needed.
- Watch items for after the baseline: the Eastern Suburbs page has 3 paragraphs over 60 words.

## Checklist → issues

- [ ] **#103** Fix the `/contact-us/` 403 (owner-side Cloudflare). It is the only sitemap URL that
      isn't 200.
- [ ] **E1 · #111** Enquiries and calls by landing page, 90 days. This sets the pre-change baseline and
      names the 3 pages to fix first (needs the owner's GA4 export).
- [ ] **#109** GA4 hour-of-day report, to set phone cover (moved here; it is the same export session).

After E1: open page issues only for pages the data names, each with a before/after measurement
(words, phone screens, first-screen controls) and a 28-day enquiries-per-100-users comparison.

## Owner's playbook against this site (short)

Already in place: one site version (`https://www`), entrance links (services, areas, blog), sticky
call on phones, real photos, licence and reviews, schema, a short room-first enquiry start. Open:
contact page blocked (#103), conversion not read by page (E1). Location pages:
`swap-the-city` is already part of the D-158 design standard.
