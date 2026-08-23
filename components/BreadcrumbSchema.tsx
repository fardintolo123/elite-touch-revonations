/**
 * BreadcrumbList JSON-LD — structured data only, no visible UI.
 *
 * GitHub issue #8's GEO audit flagged `BreadcrumbList` as a missing
 * recommended schema. It is mechanical: every crumb below is derived from a
 * route that already exists and is already published (CLAUDE.md: publication
 * = content + an internal link + a sitemap entry — every crumb target here
 * meets all three). Never add a crumb for a page that is not actually live.
 */

type Crumb = { name: string; url: string }

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
