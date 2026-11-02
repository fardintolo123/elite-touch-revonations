import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactSection } from '@/components/ContactSection'
import { PageHero } from '@/components/PageHero'
import { SchemaGraph } from '@/components/SchemaGraph'
import { buildMetadata } from '@/lib/metadata'
import { blogPosts, getBlogPost } from '@/lib/blog'
import { businessInfo } from '@/lib/businessInfo'
import { formatDayMonthYear } from '@/lib/dateLabels'
import { projectBySlug } from '@/lib/projects'
import { FaqList } from '@/components/FaqList'
import styles from '../blog.module.css'

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

  const heroProject = post.heroProject
    ? projectBySlug(post.heroProject.slug)
    : undefined

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        leads={[post.description]}
        facts={[
          { label: 'Published', value: formatDayMonthYear(post.published) },
          ...(post.updated
            ? [{ label: 'Updated', value: formatDayMonthYear(post.updated) }]
            : []),
          { label: 'Reading time', value: post.readTime },
        ]}
        image={
          heroProject
            ? { project: heroProject, imageIndex: post.heroProject?.imageIndex }
            : undefined
        }
      />
      <main>
        <article className="et-section et-band-surface">
          <div className="et-container">
            <div className={styles.articleContent}>
              <nav className={styles.postNavigation} aria-label="Blog post navigation">
                <Link href="/blog/" className="et-link">All guides</Link>
                <span aria-hidden="true">/</span>
                <span>{post.category}</span>
              </nav>
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
                    {section.paragraphs.map((paragraph, i) => <p key={i} className="et-body" dangerouslySetInnerHTML={{ __html: paragraph }} />)}
                  </section>
                ))}
                {post.faq && post.faq.length > 0 && (
                  <section>
                    <span className="et-eyebrow">FAQ</span>
                    <h2 className="et-h2">Frequently asked questions</h2>
                    <div style={{ marginTop: 'var(--et-space-4)' }}>
                      <FaqList items={post.faq} />
                    </div>
                  </section>
                )}
                {/*
                  Author/publisher attribution. The guides are published by the
                  business, not by a named individual, so the block names the
                  real people behind it and the real licence rather than
                  inventing a personal byline (CLAUDE.md Business Rules).

                  Keep the sentences short and the words plain: this renders on
                  every one of the blog posts, and a shared block with long
                  words is the documented way this site's Flesch gate has been
                  tanked before.
                */}
                <section className={styles.postByline} aria-labelledby="post-publisher">
                  <h2 id="post-publisher" className="et-h4">Who writes these guides</h2>
                  <p className="et-body-sm">
                    {`${businessInfo.name} is a family business in Sydney. Four of the Dawood family run it: Omar, Adam, Farah and Mohammed. We only work on bathrooms, ensuites, powder rooms and laundries.`}
                  </p>
                  <p className="et-body-sm">
                    {`Omar holds NSW Builder Licence ${businessInfo.builderLicence}. Adam is a licensed tiler with more than 25 years on site. Farah plans the layout and the finishes. Mohammed helps run the job.`}
                  </p>
                  <p className="et-body-sm">
                    {`We write these guides from the work we do. First published ${formatDayMonthYear(post.published)}.${post.updated ? ` Last revised ${formatDayMonthYear(post.updated)}.` : ''} `}
                    <Link href="/about-us/" className="et-link">Meet the team</Link>
                    {' or call us on '}
                    <a href={businessInfo.phone.href} className="et-link">
                      {businessInfo.phone.display}
                    </a>
                    .
                  </p>
                </section>
              </div>
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
          { name: 'Blogs', url: '/blog/' },
          { name: post.title, url: `/blog/${post.slug}/` },
        ]}
        faqs={post.faq}
        primaryImage={
          heroProject
            ? heroProject.images[post.heroProject?.imageIndex ?? 0]
            : undefined
        }
        article={{
          headline: post.title,
          description: post.description,
          datePublished: post.published,
          dateModified: post.updated,
          section: post.category,
        }}
      />
    </>
  )
}
