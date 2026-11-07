# Session Handoff — Cloudflare Free-Tier Setup (Both Domains)

**Date:** 2026-10-28  
**Session focus:** Implementing Cloudflare free-tier security and performance capabilities for both domains on the account.

---

## What was done

This session completed the full Cloudflare free-tier implementation for both `elitetouchrenovations.au` (ETR) and `4elementspainting.com.au` (4EP). All work was done via browser automation (Claude in Chrome) using the Cloudflare internal dashboard API (`/api/v4/...`) while authenticated.

### Prior session (context from summary)
- Cloudflare account created; both domains added
- GoDaddy nameservers for ETR changed to Cloudflare (`cameron.ns.cloudflare.com` / `lady.ns.cloudflare.com`)
- ETR DNS orange cloud (proxy) already enabled on root A and www CNAME

### This session completed

#### elitetouchrenovations.au (Zone: `f8fb4ce9e1427072a209cdbc47c0026b`)
1. **Free plan selection** — completed (was pending from prior session)
2. **SSL/TLS** — set to `strict` (Full strict), Always Use HTTPS: `on`, Automatic HTTPS Rewrites: `on`
3. **Cache ruleset** (`fc622115c0a6488eb10650ee863ccdcc`) — caches CSS/JS/fonts/images for 30 days at edge, 1 day browser
4. **WAF custom ruleset** (`a5b4d503b7ba437db70959cdb3fa7279`) — 5 rules:
   - Block bad bot/scanner UAs (sqlmap, nikto, nmap, masscan, zgrab, nuclei, wfuzz)
   - Block sensitive path probes (/.env, /wp-admin, /wp-login, /phpMyAdmin, /.git, /config.php, /.htaccess)
   - Block SQL injection / XSS in query strings
   - Block empty User-Agent on /api/* paths
   - Managed challenge for non-AU traffic hitting /enquiry, /contact, /api/contact
5. **Rate limiting ruleset** (`eb77dba581d34409b8042369ad271c52`) — 10 req/10 sec on /api/*, /enquiry, /contact; blocks for 10s (Free plan limits: period=10s, mitigation_timeout=10s)

#### 4elementspainting.com.au (Zone: `d9c8a87b117978b53fb9792011dd6871`)
1. **DNS proxy** — Root A record already proxied; enabled orange cloud on `www` CNAME (record `dc09ddc648bae2a8c2da61bffda662f4` → `69fa89eb3d467d7b.vercel-dns-017.com`)
   - Note: `blog.` subdomain was left DNS-only (not on Vercel; unknown origin — safer not to proxy)
2. **SSL/TLS** — `strict`, Always Use HTTPS: `on`, Automatic HTTPS Rewrites: `on`
3. **Cache ruleset** (`704e31df3bdd41459b68e080a7deb011`) — same static asset config as ETR
4. **WAF custom ruleset** (`f4cc233442434c00935f126c99cee106`) — same 5 rules as ETR
5. **Rate limiting ruleset** (`1fb931bc6af142c1ae779bf99a5274d3`) — same as ETR

---

## What was NOT done / known gaps

- **Cloudflare Tunnel** — excluded (not applicable to Vercel-hosted sites)
- **Workers / Routes** — optional, not implemented (no specific requirement stated)
- **Workers AI** — optional, not implemented
- **blog.4elementspainting.com.au** — left as DNS-only (grey cloud) since target is unknown; if it's a Vercel deployment, it should be proxied separately after confirming the origin
- **Rate limiting is very tight** — Free plan enforces period=10s, mitigation_timeout=10s. This means >10 requests in 10 seconds from one IP blocks them for 10 seconds. Adjust if legitimate users hit the form quickly (unlikely but possible on mobile)

---

## Decisions made

| ID | Decision | Reason |
|---|---|---|
| - | SSL mode: Full (strict) not Full | Vercel issues valid certs for custom domains; strict is the right mode |
| - | Rate limit period=10s (not 60s) | Cloudflare Free plan only allows period=10 |
| - | blog.4EP left grey cloud | Unknown origin; proxying a CNAME to an unknown target can break things |
| - | WAF rule 5: managed_challenge not block for non-AU | Allows legitimate overseas traffic with friction rather than hard-blocking enquiries |

---

## What the owner should know

All security and CDN rules are **live immediately** for both sites. The WAF rules will silently block scanner traffic and WordPress brute-force probes (which any site receives constantly). The managed challenge for non-AU enquiry traffic means overseas users will see a CAPTCHA-like check — this is intentional to reduce spam without blocking legitimate users entirely.

Rate limiting is conservative (10 req/10 sec) — this is the Free plan's maximum granularity.

---

## Next actions (if any follow-up needed)

1. Verify ETR is live: visit `https://www.elitetouchrenovations.au/` and confirm the padlock shows "Connection is secure" and the certificate issuer is Cloudflare (edge cert) or Let's Encrypt (origin cert)
2. Monitor Cloudflare Analytics → Security for blocked requests to confirm WAF rules are firing (and not blocking legitimate traffic)
3. If the contact form breaks: temporarily disable WAF rule 5 (non-AU challenge) and check if that's the cause — the form submission goes to Vercel server actions, not /api/contact
4. Consider upgrading to Cloudflare Pro ($20/mo) if rate limiting needs longer periods or the WAF needs the managed rulesets (OWASP)
