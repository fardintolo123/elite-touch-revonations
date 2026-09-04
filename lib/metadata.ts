import type { Metadata } from 'next'
import { businessInfo } from './businessInfo'

type BuildMetadataInput = {
  /** Site-relative path, leading + trailing slash — e.g. '/packages/' or '/'. */
  path: string
  title: string
  description: string
  /** `og:type`. Defaults to 'website'; gallery project pages pass 'article'. */
  type?: 'website' | 'article'
  /**
   * Absolute or metadataBase-relative image URL(s) for `og:image`
   * (`twitter:image` auto-fills from it — see the note below). Omit to leave
   * both unset, matching current behaviour on every page except the gallery
   * project pages; sitewide `og:image` is issue #20 / H-3, not this helper.
   */
  images?: string[]
}

/**
 * One shared page-metadata builder (issue #19 / tech-audit H-2).
 *
 * `app/layout.tsx` sets a sitewide `openGraph` default, including
 * `openGraph.url: businessInfo.siteUrl` — the homepage. Next.js metadata is
 * merged SHALLOWLY between layout and page (duplicate keys are REPLACED, not
 * deep-merged — see "Merging" in Next's `generate-metadata` docs), so any page
 * that does not set its own `openGraph` silently ships the homepage's
 * `og:url`, and any page that DOES set its own `openGraph` (the gallery
 * project pages, for `og:type: 'article'`) REPLACES the whole object —
 * `openGraph.locale` and `openGraph.siteName` vanish from that page's
 * `<meta>` tags entirely. Both were verified missing/wrong in the served HTML
 * before this fix (packages: `og:url` = homepage; gallery detail: no
 * `og:site_name`, no `og:locale`, no `og:url` at all).
 *
 * `openGraph.title` / `openGraph.description` are deliberately left unset.
 * Next auto-fills them from the page's own `title` / `description` — already
 * resolved through the root layout's title template — when `openGraph` sets
 * neither (`postProcessMetadata` in `next/dist/lib/metadata/resolve-metadata.js`).
 * That auto-fill then feeds `twitter:title` / `twitter:description` too.
 * Setting them explicitly here would freeze `og:title` at the RAW page title,
 * losing the " | Elite Touch Renovations" suffix every other page's
 * `og:title` carries — exactly the gap the gallery pages had before this
 * helper existed (confirmed in their served HTML: `og:title` had no suffix).
 */
export function buildMetadata({
  path,
  title,
  description,
  type = 'website',
  images,
}: BuildMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'en_AU',
      siteName: businessInfo.name,
      url: path,
      ...(images ? { images } : {}),
    },
  }
}
