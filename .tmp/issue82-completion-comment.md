Implemented issue #82 on the two existing service pages.

- `/services/laundry-renovations/` now has a separate area section naming the supported regions and example suburbs, plus a combined bathroom-and-laundry FAQ.
- `/services/powder-room-renovations/` now uses “toilet renovations in Sydney” once in an H2 and has a separate powder-room FAQ.
- Both titles and H1s are unchanged; no new route was added.

Verification: the isolated production build passed; both changed routes pass readability, both FAQ questions are in visible page content and FAQPage JSON-LD, the phrase count is one, the design pattern check passed, and browser checks returned HTTP 200 without horizontal overflow at 390px and 1440px. An independent screenshot-only critique found no remaining P0/P1 findings. Captures and review are in `.impeccable/critique/2026-11-04-issue-82/`.

The full readability check has one unrelated `/blog/` failure (114/115 pages pass); both issue routes pass. The Search Console figures in the issue summary were not recalculated because the raw export was not available. This issue remains open for deployment and the planned post-ship query follow-up.
