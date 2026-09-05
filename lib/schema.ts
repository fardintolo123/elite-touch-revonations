import { businessInfo, services, type Service } from '@/lib/businessInfo'
import type { Region } from '@/lib/locations'
import type { Project } from '@/lib/projects'

export type SchemaNode = Record<string, unknown>
export type PageSchemaType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage'

export type SchemaCrumb = { name: string; url: string }
export type SchemaFaqItem = { question: string; answer: string }

export function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  return `${businessInfo.siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

export const schemaIds = {
  business: absoluteUrl(businessInfo.schema.businessIdPath),
  website: absoluteUrl(businessInfo.schema.websiteIdPath),
  serviceCatalog: `${businessInfo.siteUrl}/#bathroom-renovation-services`,
  hubService: (service: Service, region: Region) =>
    `${absoluteUrl(`/services/${service.slug}/${region.slug}/`)}#service`,
  webpage: (pathOrUrl: string) => `${absoluteUrl(pathOrUrl)}#webpage`,
  breadcrumb: (pathOrUrl: string) => `${absoluteUrl(pathOrUrl)}#breadcrumb`,
  faq: (pathOrUrl: string) => `${absoluteUrl(pathOrUrl)}#faq`,
  creativeWork: (pathOrUrl: string) => `${absoluteUrl(pathOrUrl)}#creativework`,
  image: (pathOrUrl: string, index: number) =>
    `${absoluteUrl(pathOrUrl)}#image-${index + 1}`,
}

export const businessSchemaId = schemaIds.business
export const websiteSchemaId = schemaIds.website

export function schemaGraph(nodes: SchemaNode[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}

export function jsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, '\\u003c')
}

function warrantyPromise() {
  return {
    '@type': 'WarrantyPromise',
    durationOfWarranty: {
      '@type': 'QuantitativeValue',
      value: businessInfo.workmanshipWarrantyYears,
      unitCode: 'ANN',
    },
  }
}

export function buildServiceOfferCatalog(): SchemaNode {
  return {
    '@type': 'OfferCatalog',
    '@id': schemaIds.serviceCatalog,
    name: 'Bathroom renovation services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      name: service.title,
      url: absoluteUrl(`/services/${service.slug}/`),
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        serviceType: 'Bathroom renovation',
        provider: { '@id': schemaIds.business },
        areaServed: {
          '@type': 'City',
          name: businessInfo.serviceArea.city,
          address: {
            '@type': 'PostalAddress',
            addressRegion: businessInfo.serviceArea.state,
            addressCountry: businessInfo.serviceArea.country,
          },
        },
        url: absoluteUrl(`/services/${service.slug}/`),
      },
      warranty: warrantyPromise(),
    })),
  }
}

/**
 * Site identity graph. Same facts as the former root-layout JSON-LD, now with
 * stable `@id`s so page-level nodes can reference one entity instead of
 * floating as separate blocks.
 */
export function buildBusinessNode(): SchemaNode {
  return {
    '@id': schemaIds.business,
    '@type': ['HomeAndConstructionBusiness', 'Organization'],
    name: businessInfo.name,
    legalName: businessInfo.legalName,
    url: businessInfo.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(businessInfo.schema.logo.path),
      contentUrl: absoluteUrl(businessInfo.schema.logo.path),
      width: businessInfo.schema.logo.width,
      height: businessInfo.schema.logo.height,
    },
    image: businessInfo.schema.images.map((path) => absoluteUrl(path)),
    priceRange: businessInfo.schema.priceRange,
    telephone: businessInfo.phone.e164,
    email: businessInfo.email.primary,
    foundingDate: String(businessInfo.foundedYear),
    address: {
      '@type': 'PostalAddress',
      addressLocality: businessInfo.address.suburb,
      addressRegion: businessInfo.address.state,
      addressCountry: businessInfo.address.country,
    },
    areaServed: {
      '@type': 'City',
      name: businessInfo.serviceArea.city,
      address: {
        '@type': 'PostalAddress',
        addressRegion: businessInfo.serviceArea.state,
        addressCountry: businessInfo.serviceArea.country,
      },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.schema.geo.latitude,
      longitude: businessInfo.schema.geo.longitude,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: businessInfo.phone.e164,
      email: businessInfo.email.primary,
      contactType: 'sales',
      areaServed: businessInfo.serviceArea.country,
      availableLanguage: 'English',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '15:30',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Omar Dawood',
      jobTitle: 'Licensed Builder & Civil Engineer',
    },
    employee: businessInfo.principals.map((person) => ({
      '@type': 'Person',
      name: person.name,
      jobTitle: person.role,
    })),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'NSW Builder Licence',
      identifier: businessInfo.builderLicence,
    },
    hasOfferCatalog: buildServiceOfferCatalog(),
    ...(businessInfo.googleBusinessProfile.verifiedLive
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: businessInfo.googleBusinessProfile.ratingAtLastCheck,
            bestRating: 5,
            worstRating: 1,
            reviewCount:
              businessInfo.googleBusinessProfile.reviewCountAtLastCheck,
          },
        }
      : {}),
    identifier: [
      { '@type': 'PropertyValue', name: 'ABN', value: businessInfo.abn },
      { '@type': 'PropertyValue', name: 'ACN', value: businessInfo.acn },
    ],
    sameAs: [
      businessInfo.googleBusinessProfile.url,
      ...Object.values(businessInfo.socialProfiles),
    ],
  }
}

export function buildWebsiteNode(): SchemaNode {
  return {
    '@id': schemaIds.website,
    '@type': 'WebSite',
    name: businessInfo.name,
    url: businessInfo.siteUrl,
    publisher: { '@id': schemaIds.business },
  }
}

export function buildWebPageNode({
  path,
  name,
  description,
  type = 'WebPage',
  hasBreadcrumb = false,
  primaryImage,
  mainEntityId,
  hasPartIds = [],
}: {
  path: string
  name: string
  description?: string
  type?: PageSchemaType
  hasBreadcrumb?: boolean
  primaryImage?: string
  mainEntityId?: string
  hasPartIds?: string[]
}): SchemaNode {
  const node: SchemaNode = {
    '@id': schemaIds.webpage(path),
    '@type': type,
    url: absoluteUrl(path),
    name,
    isPartOf: { '@id': schemaIds.website },
    about: { '@id': schemaIds.business },
  }

  if (description) node.description = description
  if (hasBreadcrumb) {
    node.breadcrumb = { '@id': schemaIds.breadcrumb(path) }
  }
  if (primaryImage) {
    node.primaryImageOfPage = { '@id': schemaIds.image(path, 0) }
  }
  if (mainEntityId) {
    node.mainEntity = { '@id': mainEntityId }
  }
  if (hasPartIds.length > 0) {
    node.hasPart = hasPartIds.map((id) => ({ '@id': id }))
  }

  return node
}

export function buildBreadcrumbNode({
  path,
  items,
}: {
  path: string
  items: readonly SchemaCrumb[]
}): SchemaNode {
  return {
    '@id': schemaIds.breadcrumb(path),
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildFaqNode({
  path,
  items,
}: {
  path: string
  items: readonly SchemaFaqItem[]
}): SchemaNode {
  return {
    '@id': schemaIds.faq(path),
    '@type': 'FAQPage',
    mainEntityOfPage: { '@id': schemaIds.webpage(path) },
    about: { '@id': schemaIds.business },
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildHubServiceNode({
  service,
  region,
}: {
  service: Service
  region: Region
}): SchemaNode {
  const path = `/services/${service.slug}/${region.slug}/`

  return {
    '@type': 'Service',
    '@id': schemaIds.hubService(service, region),
    name: `${service.title} ${region.name}`,
    description: service.summary,
    serviceType: 'Bathroom renovation',
    provider: { '@id': schemaIds.business },
    url: absoluteUrl(path),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${region.name}, Sydney`,
      containedInPlace: {
        '@type': 'City',
        name: businessInfo.serviceArea.city,
        address: {
          '@type': 'PostalAddress',
          addressRegion: businessInfo.serviceArea.state,
          addressCountry: businessInfo.serviceArea.country,
        },
      },
    },
  }
}

export function buildHubServiceSchema({
  service,
  region,
}: {
  service: Service
  region: Region
}) {
  return schemaGraph([
    buildBusinessNode(),
    buildWebsiteNode(),
    buildHubServiceNode({ service, region }),
  ])
}

export function buildProjectNode({
  path,
  project,
}: {
  path: string
  project: Project
}): SchemaNode {
  return {
    '@id': schemaIds.creativeWork(path),
    '@type': 'CreativeWork',
    name: project.name,
    description: project.blurb,
    dateCreated: String(project.completedByYear),
    mainEntityOfPage: { '@id': schemaIds.webpage(path) },
    creator: { '@id': schemaIds.business },
    image: project.images.map((image, index) => ({
      '@id': schemaIds.image(path, index),
      '@type': 'ImageObject',
      contentUrl: absoluteUrl(image.src),
      caption: image.alt,
      width: image.width,
      height: image.height,
      creator: { '@id': schemaIds.business },
      ...(index === 0 ? { representativeOfPage: true } : {}),
    })),
  }
}

export function buildPageGraph({
  path,
  name,
  description,
  pageType,
  breadcrumbs,
  faqs,
  project,
  primaryImage,
  hubService,
}: {
  path: string
  name: string
  description?: string
  pageType?: PageSchemaType
  breadcrumbs?: readonly SchemaCrumb[]
  faqs?: readonly SchemaFaqItem[]
  project?: Project
  primaryImage?: string
  hubService?: { service: Service; region: Region }
}) {
  const hasFaqs = Boolean(faqs && faqs.length > 0)
  const projectId = project ? schemaIds.creativeWork(path) : undefined
  const partIds = hasFaqs ? [schemaIds.faq(path)] : []

  return schemaGraph([
    buildBusinessNode(),
    buildWebsiteNode(),
    buildWebPageNode({
      path,
      name,
      description,
      type: pageType,
      hasBreadcrumb: Boolean(breadcrumbs),
      primaryImage,
      mainEntityId: projectId,
      hasPartIds: partIds,
    }),
    ...(breadcrumbs ? [buildBreadcrumbNode({ path, items: breadcrumbs })] : []),
    ...(faqs && faqs.length > 0 ? [buildFaqNode({ path, items: faqs })] : []),
    ...(hubService ? [buildHubServiceNode(hubService)] : []),
    ...(project ? [buildProjectNode({ path, project })] : []),
  ])
}
