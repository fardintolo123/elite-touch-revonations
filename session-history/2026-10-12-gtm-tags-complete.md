# Session Handoff — 2026-10-12 GTM Tags Complete

## Session type
GTM tag configuration continuation — completed all 3 remaining tag changes.

## What was done

### Tag 2: GA4 Event - form_submit_error (NEW)
- Tag type: Google Analytics: GA4 Event
- Measurement ID: G-06GQGHHP0X
- Event Name: `form_submit_error`
- Event Parameter: `error_code` = `{{DLV - error_code}}`
- Trigger: Custom Event - form_submit_error
- Status: **Saved ✅**

### Tag 3: GA4 Event - generate_lead (MODIFIED)
- Removed trigger: `Form Submit - Contact` (Form Submission, Page URL contains /contact-us/)
- Added trigger: `Custom Event - generate_lead`
- Status: **Saved ✅**

Both are in workspace GTM-MVGQB9FW, container 262743067, workspace 3.

## Workspace state after this session
**Workspace Changes: 9** — all GTM tags are configured and waiting for the owner to publish.

Full change list in workspace:
1. GA4 - Google tag (existing, unchanged)
2. GA4 Event - email_click (existing, unchanged)
3. GA4 Event - Form_start (12 hrs ago — prior session)
4. GA4 Event - form_submit_attempt (9 mins ago — prior session)
5. GA4 Event - form_submit_error (2 mins ago — **this session**)
6. GA4 Event - generate_lead (trigger swapped — **this session**)
7. GA4 Event - phone_call_click (existing, unchanged)
8–9. DLV - error_code variable + Custom Event triggers (created in prior sessions)

## What still needs to be done (owner required)

### GTM publish (owner action required)
- Go to https://tagmanager.google.com/ → container GTM-MVGQB9FW → workspace 3
- Click **Submit** (top-right blue button)
- Version name: e.g. "Form funnel tracking — form_start, form_submit_attempt, form_submit_error, generate_lead"
- Click **Publish**

### Code deploy (owner action required)
- Commit `3dd2783` (form funnel tracking in EnquiryForm.tsx + lib/analytics.ts) is on `main` but has NOT been pushed to production
- Vercel auto-deploys from `main` — once the owner confirms, push with: `git push origin main`
- After deploy, verify dataLayer events by submitting the contact form on the live site

### GA4 custom dimension (owner action)
- GA4 Admin → Custom definitions → Create custom dimension
- Name: `error_code`, Scope: Event, Event parameter: `error_code`

### GA4 key events (owner action)
- Star `phone_call_click` as a key event (should already be visible in GA4 Events)
- After form submission on live site fires `generate_lead`, star that as a key event too
- Decision pending: remove or keep phantom `ads_conversion_Book_appointment_1` key event

## Critical reminders
- **Never push or deploy without explicit owner sign-off**
- **The standalone Google tag GT-MBNT4TKH in the info@ GTM account must NEVER be installed** — it would double-count every event
- All phone CTAs are `tel:` anchors; never JS onclick handlers

## Related files
- `lib/analytics.ts` — trackEvent() helper
- `components/EnquiryForm.tsx` — form_start, form_submit_attempt, form_submit_error, generate_lead events
- `session-history/2026-10-11-gtm-ga4-audit.md` — full prior audit and decisions
