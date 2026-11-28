# GA4 key events, 2026-11-28

`ga4-key-events-2026-11-28.png` — Analytics property 453254013, Admin → Data display → Events → **Key events** tab, captured 2026-11-28 10:40 +04:30.

It shows the state after `phone_call_click` was starred on the **Recent events** tab:

- `ads_conversion_Book_appointment_1` — key event (pre-existing)
- `phone_call_click` — key event, stream `elitetouchrenovations.au` (**added this session**)
- `purchase` — key event, no stream data (pre-existing)

`generate_lead` is absent from both tabs: the page shows "all key events and only events from the last
28 days", and it has not fired since the CSP fix (#113). It becomes starrable with the first enquiry
after 2026-11-26. Recorded in `PROJECT_CONTEXT.md` §16 and on issue #111.