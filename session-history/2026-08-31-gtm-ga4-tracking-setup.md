# Session Handoff — GTM / GA4 Tracking Setup
**Date:** 2026-08-31
**Session scope:** Steps 1–12 of the GTM/GA4 audit and setup brief

---

## Executive Summary

**What happened**
- GTM container GTM-MVGQB9FW configured from scratch: 4 tags, 3 triggers, 9 variables — all in one workspace (11 changes)
- GTM snippet added to `app/layout.tsx` (Script `strategy="afterInteractive"`, noscript iframe fallback); container ID in `.env.local` as `NEXT_PUBLIC_GTM_ID`
- GTM container Version 2 published (2026-08-31, 10:37 AM)
- Tag Assistant validation confirmed: base Google tag fires on page load, 2 Google tags detected (GTM-MVGQB9FW + G-06GQGHHP0X)
- `NEXT_PUBLIC_GTM_ID=GTM-MVGQB9FW` added to Vercel (all environments)
- Code pushed to origin/main; Vercel auto-deployed
- D-112 recorded in DECISIONS.md; K4 closed in PROJECT_CONTEXT.md

**Why it matters**
Every phone call, email click, and contact form submission on the live site is now tracked in GA4. The owner can see exactly how many enquiries the site is generating.

**What's finished**
- GTM container Version 2 live ✓
- Code deployed to Vercel ✓
- Env var set in Vercel (all environments) ✓
- D-112 recorded ✓
- K4 closed in PROJECT_CONTEXT.md ✓

**What's still a problem**
Nothing technical. One owner action remains (see below).

**What I need to decide**
Nothing — no decision is needed from you.

**What should happen next**
1. In GA4 (analytics.google.com → property G-06GQGHHP0X) → Admin → Events → find `phone_call_click` and `generate_lead` → toggle "Mark as key event" — this makes them show as conversions in reports
2. Verify live: open www.elitetouchrenovations.au, click "Call 0411 752 334", then check GA4 → Reports → Realtime to confirm the `phone_call_click` event appears

---

## Technical Detail

### Architecture (D-112)
Website → GTM (GTM-MVGQB9FW) → Google tag → GA4 (G-06GQGHHP0X)

The standalone Google tag GT-MBNT4TKH is deliberately NOT installed — installing both would double-count every event (D-32).

### GTM container contents (Version 2)
**Tags:**
| Name | Type | Firing trigger |
|---|---|---|
| GA4 - Google tag | Google Tag | Initialization - All Pages |
| GA4 Event - phone_call_click | GA4 Event | Click - Phone Call |
| GA4 Event - email_click | GA4 Event | Click - Email |
| GA4 Event - generate_lead | GA4 Event | Form Submit - Contact |

**Triggers:**
| Name | Type | Condition |
|---|---|---|
| Click - Phone Call | Click - Just Links | Click URL starts with `tel:` |
| Click - Email | Click - Just Links | Click URL starts with `mailto:` |
| Form Submit - Contact | Form Submission - Some Forms | Page URL contains `/contact-us/` |

**Built-in variables enabled:** Click URL · Click Text · Click Element · Form ID

### Code changes
- `app/layout.tsx` — noscript iframe (first child of `<body>`) + `<Script id="gtm-script" strategy="afterInteractive">` with inline GTM loader
- `.env.local` — `NEXT_PUBLIC_GTM_ID=GTM-MVGQB9FW` (line 1)

### Decisions recorded
- **D-112** — GTM/GA4 architecture (DECISIONS.md §3o)

### Docs updated
- `PROJECT_CONTEXT.md` item 15 — K4 closed, Version 2 published noted, remaining steps listed

---

## Files touched this session
- `app/layout.tsx`
- `.env.local`
- `DECISIONS.md`
- `PROJECT_CONTEXT.md`
- `session-history/2026-08-31-gtm-ga4-tracking-setup.md` (this file)
