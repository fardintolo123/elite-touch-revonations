import { businessInfo, services } from '@/lib/businessInfo'
import { projects } from '@/lib/projects'
import { LOCATION_PARENT_SLUG, publishedRegions } from '@/lib/locations'

/**
 * Served at `/llms.txt` — the llmstxt.org convention for a curated,
 * crawler-friendly index of what the site is and where things are.
 *
 * GitHub issue #7 supplied a draft made by feeding page content through an
 * LLM to write one-line descriptions. That draft is unusable as-is: it is
 * full of leftover model chatter ("Please let me know which one to keep",
 * stray ```python fences, repeated Title:/Description: blocks, apologetic
 * rewrites of the same sentence). None of it is real page copy, so none of
 * it ships (CLAUDE.md: never invent or launder a fact).
 *
 * Instead this pulls the same descriptions the actual pages already use —
 * `service.summary`, `project.blurb`, and the location description template
 * from `app/services/[slug]/[location]/page.tsx` — via the same lib/ data
 * sitemap.ts reads, so an llms.txt entry can never say something the site
 * itself doesn't. The four hand-written lines below (home/services-index/
 * packages/gallery-index) are each copied verbatim from that page's own
 * `metadata.description` — keep them in sync if that copy changes.
 */

export async function GET() {
  const base = businessInfo.siteUrl
  const lines: string[] = []

  lines.push(`# ${businessInfo.name}`)
  lines.push('')
  lines.push(
    `> Sydney bathroom renovation specialists, run by the Dawood family. Bathroom, ensuite, bathroom-and-laundry and powder room renovations, NSW Builder Licence ${businessInfo.builderLicence}, free on-site measures across Sydney, fixed-scope written quotes, and a ${businessInfo.workmanshipWarrantyYears}-year workmanship warranty.`
  )
  lines.push('')

  lines.push('## Overview')
  lines.push(
    `- [Home](${base}/): Sydney bathroom, ensuite, powder room and bathroom-laundry renovations by the Dawood family. NSW-licensed, built to current Australian Standards, with fixed-scope written quotes.`
  )
  lines.push(
    `- [About Us](${base}/about-us/): Elite Touch Renovations is a family-run Sydney bathroom renovation business, founded in ${businessInfo.foundedYear} by the Dawood family. NSW Builder Licence ${businessInfo.builderLicence}.`
  )
  lines.push(
    `- [Contact Us](${base}/contact-us/): Book a free on-site bathroom renovation measure anywhere in Sydney. Call Elite Touch Renovations on ${businessInfo.phone.display} or send us your details.`
  )
  lines.push('')

  lines.push('## Services')
  lines.push(
    `- [Our Services](${base}/services/): Bathroom, ensuite, bathroom and laundry, and powder room renovations across Sydney. Fixed-scope written quotes and waterproofing to AS 3740.`
  )
  for (const service of services) {
    lines.push(
      `- [${service.h1}](${base}/services/${service.slug}/): ${service.summary}`
    )
  }
  lines.push('')

  lines.push('## Packages & pricing')
  lines.push(
    `- [Bathroom Renovation Packages & Pricing](${base}/packages/): Elite Touch Renovations bathroom renovation packages. Basic from $18,000, Standard from $25,000, Premium from $30,000 — each tied to a stated bathroom size, with a fixed-scope written quote.`
  )
  lines.push('')

  const regions = publishedRegions()
  if (regions.length > 0) {
    lines.push('## Locations')
    for (const region of regions) {
      lines.push(
        `- [Bathroom Renovations ${region.name}](${base}/services/${LOCATION_PARENT_SLUG}/${region.slug}/): Bathroom renovations across Sydney's ${region.name} by Elite Touch Renovations. Free on-site measure, fixed-scope written quotes, waterproofing to AS 3740 and a ${businessInfo.workmanshipWarrantyYears}-year workmanship warranty.`
      )
    }
    lines.push('')
  }

  lines.push('## Our work')
  lines.push(
    `- [Our Work](${base}/gallery/): Bathroom renovation projects by Elite Touch Renovations across Sydney — including Artarmon, Castle Hill, Hornsby and Randwick. Real photographs of completed work.`
  )
  for (const project of projects) {
    lines.push(
      `- [${project.name}](${base}/gallery/${project.slug}/): ${project.blurb}`
    )
  }

  const body = lines.join('\n') + '\n'

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
