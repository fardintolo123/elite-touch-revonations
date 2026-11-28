# Issue #114 — agent-side verification, 2026-11-28

Run from the repo checkout, against live production. Commands are reproducible as written.

## 1. Tagged URL: status, redirects, query string

```
curl -sS -o /dev/null -w '%{http_code} %{num_redirects} %{url_effective}' "https://www.elitetouchrenovations.au/?utm_source=google&utm_medium=organic&utm_campaign=gbp-listing"
200 0 https://www.elitetouchrenovations.au/?utm_source=google&utm_medium=organic&utm_campaign=gbp-listing
```

## 2. Canonical, og:url and title on the tagged URL

```
<link rel="canonical" href="https://www.elitetouchrenovations.au/"/>
<meta property="og:url" content="https://www.elitetouchrenovations.au/"/>
<title>Bathroom Renovations Near You in Sydney | Elite Touch</title>
```

## 3. Live CSP connect-src (the #113 fix)

```
content-security-policy: default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; script-src-attr 'none'; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.google.com https://*.g.doubleclick.net https://*.googletagmanager.com; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-src https://www.googletagmanager.com; frame-ancestors 'none'
analytics.google.com present: True
www.google.com present:        True
```

## 4. /contact-us/ (issue #103 re-check)

```
200 https://www.elitetouchrenovations.au/contact-us/ redirects=0
```

## 5. Code checks

- `proxy.ts` matcher is `['/elementor-hf', '/elementor-hf/:path*']` — it cannot touch `/`, so it cannot strip the query string.
- `next.config.ts` `REDIRECTS_301` contains no rule whose `source` is `/` (rules are the WordPress/staging paths plus `/staging/:path*`).
- `grep -r page_location app components lib` returns nothing, so GA4's `page_view` records the full document URL, query string included.

## What this does NOT cover

- Whether the Business Profile's Website button carries the tag. The `share.google` profile link redirects to a JS-rendered Google search page that contains no reference to the domain in its HTML, so it cannot be read from here. Owner-only step.
- Whether GA4 lists `gbp-listing` sessions. Needs the owner's edit first, then up to 7 days, and no GA4 connector reaches agent sessions.
