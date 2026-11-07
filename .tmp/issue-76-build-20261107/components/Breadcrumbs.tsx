import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import type { SchemaCrumb } from '@/lib/schema'

/**
 * The visible breadcrumb trail.
 *
 * ONE SOURCE (D-180). It takes the SAME `readonly SchemaCrumb[]` the page
 * already passes to `<SchemaGraph breadcrumbs={...}>`, so the trail a visitor
 * reads and the `BreadcrumbList` Google reads can never disagree. Pass the one
 * array to both; never retype the levels here.
 *
 * IT EMITS NO SCHEMA OF ITS OWN. The sibling 4 Elements Painting component this
 * was modelled on renders its own `BreadcrumbList` JSON-LD, which is right
 * there because that project has no page-level graph. Here `lib/schema.ts`
 * already puts a `BreadcrumbList` in every page's graph, keyed by
 * `schemaIds.breadcrumb(path)` — adding a second one would publish two
 * competing breadcrumb nodes per page. This component is visual only.
 *
 * WHY NO `<ol>`/`<li>`, WHICH IS THE USUAL BREADCRUMB MARKUP.
 * `scripts/check-readability.mjs` scores every `<p>`, `<li>` and `<dd>` inside
 * `<main>` as a block of prose. A trail of four `<li>`s would add four
 * two-word "sentences" of long nouns to all 115 pages, which is exactly how the
 * old per-post Blogs menu failed the Flesch gate on every page and got deleted
 * (`ad6d3fa`, see D-173). Teaching the checker to skip `<nav>` would be the
 * tidier fix and matches its own stated intent, but that script and the blog
 * index's score are being worked on in `plans/blog-readability-and-answers-2026-11.md`
 * — changing the gate underneath that work would corrupt its measurements. A
 * named `<nav>` landmark holding ordered links is still conveyed correctly by
 * screen readers, and the machine-readable ordering is in the JSON-LD already.
 *
 * Server component. No `'use client'` — it is a list of links.
 */

/** Crumb URLs are absolute because schema requires it; links must not be. */
function toRelative(url: string) {
  return url.startsWith(businessInfo.siteUrl)
    ? url.slice(businessInfo.siteUrl.length) || '/'
    : url
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: readonly SchemaCrumb[]
  className?: string
}) {
  // A single crumb is just "Home" — a trail to nowhere. The homepage passes no
  // breadcrumbs at all, so this only guards a page that ever gets trimmed to one.
  if (items.length < 2) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={className ? `et-breadcrumb ${className}` : 'et-breadcrumb'}
    >
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1

        return isCurrent ? (
          // The current page is not a link to itself.
          <span key={item.url} aria-current="page" className="et-breadcrumb-current">
            {item.name}
          </span>
        ) : (
          <Link key={item.url} href={toRelative(item.url)}>
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
