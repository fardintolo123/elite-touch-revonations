import {
  buildPageGraph,
  jsonLd,
  type PageSchemaType,
  type SchemaArticle,
  type SchemaCrumb,
  type SchemaFaqItem,
  type SchemaImage,
} from '@/lib/schema'
import type { Service } from '@/lib/businessInfo'
import type { Region, Suburb } from '@/lib/locations'
import type { Project } from '@/lib/projects'

export function SchemaGraph({
  path,
  name,
  description,
  pageType,
  breadcrumbs,
  faqs,
  project,
  primaryImage,
  service,
  hubService,
  suburbService,
  article,
}: {
  path: string
  name: string
  description?: string
  pageType?: PageSchemaType
  breadcrumbs?: readonly SchemaCrumb[]
  faqs?: readonly SchemaFaqItem[]
  project?: Project
  primaryImage?: SchemaImage
  service?: Service
  hubService?: { service: Service; region: Region }
  suburbService?: { service: Service; suburb: Suburb }
  article?: SchemaArticle
}) {
  const graph = buildPageGraph({
    path,
    name,
    description,
    pageType,
    breadcrumbs,
    faqs,
    project,
    primaryImage,
    service,
    hubService,
    suburbService,
    article,
  })

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: jsonLd(graph) }}
    />
  )
}
