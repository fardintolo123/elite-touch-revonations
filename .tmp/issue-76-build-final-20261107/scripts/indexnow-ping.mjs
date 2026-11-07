/**
 * IndexNow deploy ping.
 *
 * Issue #28 (seo-technical audit, finding L-2). Owner-approved 2026-09-05 —
 * see DECISIONS.md. Low value for a Google-first Sydney local business
 * (IndexNow is not consumed by Google), but cheap: it gets Bing, Yandex and
 * Naver to re-crawl changed URLs in hours instead of days.
 *
 * WHY THIS DOESN'T IMPORT app/sitemap.ts
 * ---------------------------------------
 * Same reasoning as scripts/verify-redirects.mjs: app/sitemap.ts is a
 * TypeScript module using `@/` path aliases and framework-only APIs
 * (`MetadataRoute`) that a plain .mjs postbuild script can't load without a
 * bundler step. Rather than add one for a "low value" feature, this script
 * fetches the site's OWN sitemap.xml over HTTP and submits the URLs it
 * lists — the sitemap is already the canonical URL list, generated fresh on
 * every build.
 *
 * WHY FETCHING THE LIVE SITEMAP AT POSTBUILD TIME STILL WORKS
 * -------------------------------------------------------------
 * `postbuild` runs during the Vercel build step, before the new deployment
 * is promoted to production. `https://www.elitetouchrenovations.au/sitemap.xml`
 * at that moment still serves the OUTGOING build. That's fine here: IndexNow
 * is a "these URLs may have changed, re-crawl them" signal, not a diff engine.
 * Re-submitting the full known URL set on every production deploy is normal
 * IndexNow usage and keeps this script simple and dependency-free.
 *
 * Silent no-op, never fails the build:
 *   - Skipped entirely outside a Vercel production deploy (VERCEL_ENV !== 'production'),
 *     so local builds and preview deploys never ping a third party.
 *   - Any network error is logged and swallowed — IndexNow is a nice-to-have;
 *     it must never be the reason a deploy goes red.
 *
 * Usage: wired as `postbuild` in package.json. Can also be run manually:
 *   node scripts/indexnow-ping.mjs
 *   node scripts/indexnow-ping.mjs --force   (ping even outside production)
 */

const SITE_URL = 'https://www.elitetouchrenovations.au'
const INDEXNOW_KEY = 'cc9872d076b5d91a53ed1e093272b6be'
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const forced = process.argv.includes('--force')

async function main() {
  if (!forced && process.env.VERCEL_ENV !== 'production') {
    console.log(
      '[indexnow] skipped (not a production deploy — VERCEL_ENV=' +
        `${process.env.VERCEL_ENV ?? 'unset'})`,
    )
    return
  }

  let urls
  try {
    urls = await urlsFromSitemap(`${SITE_URL}/sitemap.xml`)
  } catch (error) {
    console.warn('[indexnow] could not read sitemap.xml, skipping:', error.message)
    return
  }

  if (urls.length === 0) {
    console.warn('[indexnow] sitemap.xml returned no URLs, skipping')
    return
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    })

    // IndexNow returns 200 (or 202) on success; 200 also covers "already submitted".
    if (res.ok) {
      console.log(`[indexnow] submitted ${urls.length} URLs — ${res.status} ${res.statusText}`)
    } else {
      console.warn(`[indexnow] endpoint returned ${res.status} ${res.statusText}`)
    }
  } catch (error) {
    console.warn('[indexnow] ping failed, ignoring:', error.message)
  }
}

async function urlsFromSitemap(sitemapUrl) {
  const res = await fetch(sitemapUrl)
  if (!res.ok) {
    throw new Error(`fetch ${sitemapUrl} → ${res.status}`)
  }
  const xml = await res.text()
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim())
  return matches
}

main()
