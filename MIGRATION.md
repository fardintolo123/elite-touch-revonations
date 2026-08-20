# MIGRATION.md — WordPress → Next.js 16

**Site:** Elite Touch Renovations — `https://www.elitetouchrenovations.au`
**From:** WordPress + Elementor + Yoast SEO
**To:** Next.js 16.3.1, App Router, Turbopack
**Status:** Redirect layer built and verified locally. **Not deployed** (DECISIONS.md D-35 — no
push or deploy without owner sign-off).
**Last updated:** 2026-08-17

---

## 1. What the old site actually is

Taken from the live Yoast sitemaps, not assumed:

| Sitemap | URLs |
|---|---|
| `/sitemap_index.xml` | index of the two below |
| `/page-sitemap.xml` | **8** — `/`, `/services/`, `/calendly/`, `/packages-deals/`, `/packages/`, `/artarmon-bathroom-renovation/`, `/gallery/`, `/about-us/` |
| `/elementor-hf-sitemap.xml` | **2** — `/elementor-hf/header/`, `/elementor-hf/footer/` |

Every live URL ends in a **trailing slash**. That single fact drives the most important
configuration decision in this migration (§4.3).

The `/staging/` paths in the table below do **not** appear in either sitemap. See §6, flag 3.

---

## 2. The mapping table

`Verified` = confirmed against a running production build with
`npm run verify:redirects`. 34/34 checks passing as of 2026-08-17.

| Old URL | New URL | Action | Verified |
| :--- | :--- | :--- | :--- |
| `/` | `/` | Keep | ✅ 200 |
| `/services/` | `/services/` | Keep | ✅ 200 |
| `/about-us/` | `/about-us/` | Keep | ✅ 200 |
| `/gallery/` | `/gallery/` | Keep | ✅ 200 |
| `/packages/` | `/packages/` | Keep | ✅ 200 |
| `/packages-deals/` | `/packages/` | 301 | ✅ 301 |
| `/calendly/` | `/contact-us/` | 301 | ✅ 301 |
| `/artarmon-bathroom-renovation/` | `/services/bathroom-renovations/` | 301 | ✅ 301 |
| `/elementor-hf/header/` | — | **410 Gone** | ✅ 410 |
| `/elementor-hf/footer/` | — | **410 Gone** | ✅ 410 |
| `/staging/` | `/` | 301 | ✅ 301 |
| `/staging/about-us/` | `/about-us/` | 301 | ✅ 301 |
| `/staging/services/` | `/services/` | 301 | ✅ 301 |
| `/staging/contact-us/` | `/contact-us/` | 301 | ✅ 301 |
| `/staging/services/laundry-renovations/` | `/services/laundry-renovations/` | 301 | ✅ 301 |
| `/staging/services/ensuite-bathroom-renovations/` | `/services/ensuite-bathroom-renovations/` | 301 | ✅ 301 |
| `/staging/services/powder-room-renovations/` | `/services/powder-room-renovations/` | 301 | ✅ 301 |
| `/staging/services/bathroom-renovations/` | `/services/bathroom-renovations/` | 301 | ✅ 301 |
| `/staging/bathroom-photo-gallery/` | `/gallery/` | 301 | ✅ 301 |
| `/staging/bathroom-renovation-pricing/` | `/packages/` | 301 | ✅ 301 |
| `/staging/projects/` | `/gallery/` | 301 | ✅ 301 |
| `/staging/reviews/` | `/about-us/` | 301 | ✅ 301 |
| `/staging/bathroom-ensuite-renovation-in-artarmon/` | `/services/ensuite-bathroom-renovations/` | 301 | ✅ 301 |
| `/staging/luxury-bathroom-renovation-in-hunters-hill/` | `/services/bathroom-renovations/` | 301 | ✅ 301 |
| `/staging/heritage-house-bathroom-renovation-in-the-rocks/` | `/services/bathroom-renovations/` | 301 | ✅ 301 |

**Added beyond the brief** (one rule, marked in `next.config.ts`):

| Pattern | New URL | Action | Why |
| :--- | :--- | :--- | :--- |
| `/staging/:path*` | `/` | 301 | Catch-all for any staging path never inventoried, so an unknown one cannot become a 404. Must stay **last** in the array. Remove if Search Console confirms no other staging URLs exist. |

---

## 3. Where each rule lives

| Concern | File | Mechanism |
|---|---|---|
| All 301s | `next.config.ts` → `redirects()` | `{ source, destination, statusCode: 301 }` |
| Both 410s | `proxy.ts` | returns `new Response(body, { status: 410 })` |
| Trailing slashes | `next.config.ts` → `trailingSlash: true` | — |
| Sitemap | `app/sitemap.ts` | serves `/sitemap.xml`, replaces Yoast |
| Robots | `app/robots.ts` | serves `/robots.txt` |
| Verification | `scripts/verify-redirects.mjs` | `npm run verify:redirects` |

---

## 4. Three decisions that differ from the brief, and why

### 4.1 410 cannot come from `next.config.js`

The brief asked for "custom headers for 410 responses" in `next.config.js`. **That is not
possible, and it would have failed silently.**

`headers()` in `next.config` only *appends headers* to a response — it cannot set a status code.
`redirects()` only emits 3xx. A genuine `410 Gone` requires returning a real `Response` object,
and the earliest place to do that is the proxy layer. So the two Elementor stubs are handled in
`proxy.ts`, not in the config.

Had this shipped as a `headers()` rule, the two URLs would have returned **200 OK** with a
decorative header attached, and stayed in Google's index indefinitely.

**Why 410 and not 404:** 404 means "not found, might come back" — Google recrawls it for months.
410 means "gone, permanently" and is dropped far faster. These URLs are never returning.

**Why 410 and not a 301:** there is no equivalent page. Redirecting a header/footer chrome
fragment to the homepage is a soft-404 pattern that Google discounts anyway.

### 4.2 `statusCode: 301`, not `permanent: true`

Next's `permanent: true` emits **308**, not 301. Google treats 301 and 308 identically, but the
brief specified 301, so every rule uses `statusCode: 301` explicitly.

⚠️ `statusCode` and `permanent` are mutually exclusive — supplying both is a build error.

### 4.3 `trailingSlash: true` — the highest-stakes setting here

Every indexed URL on the WordPress site ends in `/`. Next's default (`trailingSlash: false`) would
answer `/about-us/` with a 308 to `/about-us`, putting an extra hop in front of **every existing
backlink and every result already in Google's index** — including the five "Keep" URLs, which are
the pages that actually carry the site's current traffic.

Setting it to `true` preserves the exact indexed form. Measured result:

| Requested | Hops to final page |
|---|---|
| `/packages-deals/` — **the form that is actually indexed** | **1** |
| `/packages-deals` — unslashed, hand-typed or malformed link only | 2 |

The two-hop case is an accepted trade-off: it only affects URL forms that were never published.

**If this is ever flipped to `false`, every row in §2 must be re-verified.**

---

## 5. Cutover runbook

Do these in order. Steps 1–4 are safe to do before launch; step 5 is the irreversible one.

1. **Export the current URL inventory from Search Console** — Pages report, "All known pages".
   This is the only way to find URLs that exist in the index but are in neither sitemap
   (see §6, flag 3). Add any survivors to the table in §2.
2. **Record a baseline.** Current impressions, clicks and average position per page, and current
   Core Web Vitals. Without this you cannot tell a migration dip from a seasonal one.
3. **Deploy to a preview URL** and run `npm run verify:redirects <preview-url>`. All checks must
   pass against the real host, not just localhost.
4. **Confirm the destinations read correctly** — a 301 to a page with the wrong content preserves
   the ranking and loses the customer.
5. **Switch DNS / origin.** ⚠️ Requires explicit owner sign-off (D-35).
6. **Immediately after cutover:**
   - `curl -I` a sample of §2 rows against the live domain.
   - Submit `https://www.elitetouchrenovations.au/sitemap.xml` in Search Console.
   - **Do not redirect the old Yoast sitemap URLs.** Let `/sitemap_index.xml`,
     `/page-sitemap.xml` and `/elementor-hf-sitemap.xml` 404. Google needs to see them go.
   - Use "Validate fix" on the two `/elementor-hf/` URLs once they report as 410.
7. **Week 1–8:** watch Search Console Pages for "Not found (404)" and "Redirect error". A URL
   appearing there that is not in §2 is a rule that was missed — add it, do not ignore it.

---

## 6. Open flags — resolve these, do not assume

1. **Route collision: `/services/bathroom-renovations/` vs `/bathroom-renovations/`.**
   `docs/BATHROOM_SITE_STRUCTURE.md` and DECISIONS.md **D-11** settle the bathroom service at
   `/bathroom-renovations/`, with the six Tier-1 suburb pages beneath it
   (`/bathroom-renovations/marrickville`, etc.). This migration puts it at
   `/services/bathroom-renovations/`.
   Both cannot be the canonical bathroom page — that is self-cannibalisation on the site's single
   most valuable term.
   **Built as specified in the brief** (an owner instruction outranks D-11, which is AGENT-status).
   **Decide before any location page is built.** The cheapest resolution is to keep
   `/services/bathroom-renovations/` as canonical and nest locations under it as
   `/services/bathroom-renovations/{suburb}/`, then amend D-11.

2. **`/services/laundry-renovations/` names a service ETR does not sell.**
   D-01 confirms four services, one of which is **bathroom *and* laundry** renovations — not
   standalone laundry work. The slug is kept because it is the client's existing URL and may hold
   equity, but the page's title, H1 and copy all say **"Bathroom + Laundry Renovations"**. Do not
   let future copy turn this into a laundry-only service page.

3. **The 15 `/staging/` URLs are in neither sitemap.** They may never have been indexed, in which
   case these rules are harmless insurance. Confirm in Search Console (step 1 above) before
   treating them as a fix for a known problem. `robots.txt` also disallows `/staging/` as a second
   line of defence.

4. **`/artarmon-bathroom-renovation/` was a real case-study page and is being 301'd to a service
   page.** The Artarmon project (bathroom + ensuite, four-week program, large-format porcelain,
   LED backlit mirrors) is one of only three documented case studies. Its content now lives on
   `/gallery/` so the 301 does not simply delete it. If Search Console shows that URL earning
   impressions, reconsider giving it a page of its own rather than redirecting it.

5. **No images anywhere on the new site yet.** 33 project photos exist and the owner has confirmed
   consent (D-38, D-39), but the D-36 pipeline has not cleared Add-to-repo/Commit, and
   PROJECT_CONTEXT.md K9 has not decided where assets live. `/gallery/` currently carries the three
   case studies in words only. This is the largest single gap in the rebuilt site.

6. **The enquiry form has no destination.** PROJECT_CONTEXT.md K1 — no business email has ever been
   supplied. `lib/actions.ts` therefore **fails loudly** and directs the customer to the phone
   number rather than silently accepting and dropping leads. Set `ETR_ENQUIRY_WEBHOOK_URL` and send
   a live test before announcing the form.

---

## 7. Verifying it yourself

```bash
npm run build
npx next start -p 3210          # in one terminal
npm run verify:redirects        # in another
```

The expectation table inside `scripts/verify-redirects.mjs` is transcribed **independently** of
`next.config.ts` — on purpose. A script that imported the config would only prove the config equals
itself, and would pass with a typo in it. The script also follows every 301 to its destination and
asserts a 200, because a redirect pointing at a 404 destroys the equity it exists to preserve.

---

## 8. Hosting: Vercel (decided 2026-08-19)

Vercel is a **verified adapter** for Next.js 16 — it runs the full Next compatibility test suite —
so everything this site uses is supported with no configuration file:

| Feature we depend on | On Vercel |
|---|---|
| `proxy.ts` (the 410s) | ✅ Supported. Node runtime, which is what Next 16 Proxy requires |
| `redirects()` with `statusCode: 301` | ✅ Supported |
| `trailingSlash: true` | ✅ Supported |
| `next/image` optimisation | ✅ Supported (`sharp` is bundled) |
| Server Actions (the enquiry form) | ✅ Supported |

**No `vercel.json` is needed.** Adding one is more likely to break the above than help it.

### ⚠️ The one thing that can go badly wrong: DNS

`elitetouchrenovations.au` currently has **Google Workspace MX records**:

```
aspmx.l.google.com                 (priority 1)
alt1/alt2.aspmx.l.google.com       (priority 5)
alt3/alt4.aspmx.l.google.com       (priority 10)
```

That is what makes `info@elitetouchrenovations.au` able to receive mail at all.

**When you point the domain at Vercel, change ONLY the `A` / `CNAME` records. Do not touch, replace
or "clean up" the `MX` records.** Wiping MX while repointing a domain is one of the most common
migration mistakes, and the symptom is silent — email simply stops arriving, and nobody notices for
days. On a business whose enquiries arrive by email, that is worse than the website being down.

Same applies to any `TXT` records (SPF/DKIM/Google verification) — leave them alone.

### Apex vs www — must match the canonical

Every canonical URL, the sitemap and `businessInfo.siteUrl` use **`https://www.elitetouchrenovations.au`**.

So in Vercel: set **`www.elitetouchrenovations.au` as the primary domain**, and let the apex
`elitetouchrenovations.au` **redirect to www**. If you prefer the apex instead, that is fine — but
then `siteUrl` in `lib/businessInfo.ts` must change with it, and every canonical and sitemap entry
has to be re-verified. Pick one and do not mix them.

### Before the first deploy

1. **Set the enquiry email variables** in Vercel → Project → Settings → Environment Variables
   (Production). Delivery is via **Resend** (D-78):

   | Variable | Value |
   |---|---|
   | `RESEND_API_KEY` | from resend.com → API Keys |
   | `ETR_ENQUIRY_FROM` | e.g. `Elite Touch Renovations <enquiries@elitetouchrenovations.au>` — **must be on a domain verified in Resend** |
   | `ETR_ENQUIRY_TO` | optional; defaults to `info@elitetouchrenovations.au` |

   Until `RESEND_API_KEY` and `ETR_ENQUIRY_FROM` are both set, the form refuses submissions and
   sends the customer to the phone rather than silently dropping the lead (D-47).

   ⚠️ **SPF WARNING.** Verifying a sending domain in Resend means adding SPF/DKIM **TXT** records.
   `elitetouchrenovations.au` already has an SPF record for Google Workspace. **Merge Resend into
   the existing SPF record — do not add a second one.** A domain with two SPF records is invalid,
   and it degrades deliverability for ordinary business email too, not just the form.
   This is separate from the MX warning above: **MX = receiving, SPF/DKIM = sending.** Both must
   survive the migration.
2. Deploy to the **preview URL first** and run `npm run verify:redirects <preview-url>` against it.
   All 34 checks must pass on the real host, not just locally.
3. Only then attach the production domain.
