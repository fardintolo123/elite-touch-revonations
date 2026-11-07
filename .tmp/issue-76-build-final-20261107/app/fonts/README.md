# Fonts

## `jost-latin-var.woff2`

- **Family:** Jost (variable, weight axis 400–700)
- **Subset:** latin only
- **Size:** ~26 KB
- **Licence:** SIL Open Font License 1.1 — https://openfontlicense.org/
- **Source:** Google Fonts, Jost v20, latin subset
  (`https://fonts.gstatic.com/s/jost/v20/92zatBhPNqw73oTd4g.woff2`)

Jost is DESIGN.md §3's family. It is committed here and self-hosted rather than
fetched via `next/font/google` so that neither the build nor the runtime
depends on Google's CDN.

**Do not add the cyrillic or latin-ext subsets.** They are dead weight for a
Sydney trade site and would roughly triple the font payload.

To update, re-download the latin subset and replace this file. The weight range
declared in `app/layout.tsx` (`400 700`) must keep matching the axis range of
whatever file is here.
