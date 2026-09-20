import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactSection } from '@/components/ContactSection'
import { PageHero } from '@/components/PageHero'
import { SchemaGraph } from '@/components/SchemaGraph'
import { buildMetadata } from '@/lib/metadata'
import { blogPosts, getBlogPost } from '@/lib/blog'
import { formatDayMonthYear } from '@/lib/dateLabels'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return buildMetadata({
    path: `/blog/${post.slug}/`,
    title: post.metaTitle ?? post.title,
    description: post.description,
    type: 'article',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        leads={[post.description]}
        facts={[
          { label: 'Published', value: formatDayMonthYear(post.published) },
          { label: 'Reading time', value: post.readTime },
        ]}
      />
      <main>
        <article className="et-section">
          <div className="et-container et-measure-wide">
            <p className="et-body-sm" style={{ marginBottom: 'var(--et-space-8)', color: 'var(--et-text-secondary)' }}>
              <Link href="/blog/" className="et-link">All advice</Link> / {post.category}
            </p>
            <div className="et-stack et-blog-prose">
              {post.quickAnswer ? (
                <section className="et-card et-card-tinted et-blog-quick-answer">
                  <h2 className="et-h2">{post.quickAnswer.heading}</h2>
                  {post.quickAnswer.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="et-body">{paragraph}</p>
                  ))}
                  <div className="et-table-wrap">
                    <table className="et-table">
                      <caption>{post.quickAnswer.table.caption}</caption>
                      <thead>
                        <tr>
                          {post.quickAnswer.table.columns.map((column) => (
                            <th key={column} scope="col">{column}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {post.quickAnswer.table.rows.map((row) => (
                          <tr key={row.label}>
                            <th scope="row">
                              {row.label}
                              <span className="et-body-sm et-table-note">{row.detail}</span>
                            </th>
                            <td>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="et-body-sm">{post.quickAnswer.note}</p>
                  <p>
                    <Link href={post.quickAnswer.cta.href} className="et-btn et-btn-primary et-btn-md">
                      {post.quickAnswer.cta.label}
                    </Link>
                  </p>
                </section>
              ) : null}
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="et-h2">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="et-body">{paragraph}</p>)}
                </section>
              ))}
            </div>
          </div>
        </article>
        <ContactSection title="Ready to talk about your bathroom?" intro="Bring your questions to a free on-site measure anywhere in Sydney. We will discuss the room and send a fixed-scope written quote." />
      </main>
      <SchemaGraph
        path={`/blog/${post.slug}/`}
        name={post.title}
        description={post.description}
        pageType="WebPage"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Advice', url: '/blog/' },
          { name: post.title, url: `/blog/${post.slug}/` },
        ]}
      />
    </>
  )
}
