import {
  buildPageGraph,
  type PageSchemaType,
  type SchemaCrumb,
  type SchemaFaqItem,
} from '@/lib/schema'
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
}: {
  path: string
  name: string
  description?: string
  pageType?: PageSchemaType
  breadcrumbs?: readonly SchemaCrumb[]
  faqs?: readonly SchemaFaqItem[]
  project?: Project
  primaryImage?: string
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
  })

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
