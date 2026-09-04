import { buildHubServiceSchema, jsonLd } from '@/lib/schema'
import type { Service } from '@/lib/businessInfo'
import type { Region } from '@/lib/locations'

/**
 * Region-scoped Service JSON-LD for published bathroom-renovation hubs
 * (issue #31). The broader per-service-page schema issue (#22) remains
 * separate; this component describes only the hub route it is rendered on.
 */
export function ServiceSchema({
  service,
  region,
}: {
  service: Service
  region: Region
}) {
  const schema = buildHubServiceSchema({ service, region })

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
    />
  )
}
