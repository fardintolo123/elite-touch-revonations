import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactSection } from '@/components/ContactSection'
import { PageHero } from '@/components/PageHero'
import { SchemaGraph } from '@/components/SchemaGraph'
import { buildMetadata } from '@/lib/metadata'
import { blogTopics } from '@/lib/blog'
import styles from './blog.module.css'

export const metadata: Metadata = buildMetadata({
  path: '/blog/',
  title: 'Bathroom Renovation Advice, Sydney',
  description: 'Practical bathroom renovation advice for Sydney homeowners, from Elite Touch Renovations.',
})

export default function BlogIndexPage() {
  /* One array, two consumers: the visible trail and the BreadcrumbList (D-180). */
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '/blog/' },
  ] as const

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        title="Bathroom renovation guides for Sydney homeowners"
        leads={[
          'Start with the decision in front of you: price, scope, timing, layout, finishes or strata approval.',
          'Each guide helps you ask better questions before a free on-site measure and fixed-scope written quote.',
        ]}
      />

      <section className="et-section et-band-surface">
          <div className="et-container et-stack">
            <header className="et-stack-tight">
              <h2 className="et-h2">Browse renovation guides by topic</h2>
              <p className="et-body et-measure">
                Choose the topic that matches your next decision. Each guide includes its reading time.
              </p>
            </header>

            <nav className={styles.topicNavigation} aria-label="Blog guide topics">
              <ul className={styles.topicLinks}>
                {blogTopics.map((topic) => (
                  <li key={topic.id}>
                    <a href={`#${topic.id}`} className={styles.topicLink}>
                      <span>{topic.category}</span>
                      <span className={styles.topicCount}>
                        {topic.posts.length} {topic.posts.length === 1 ? 'guide' : 'guides'}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.topicSections}>
              {blogTopics.map((topic) => (
                <section
                  key={topic.id}
                  id={topic.id}
                  className={styles.topicSection}
                  aria-labelledby={`${topic.id}-heading`}
                >
                  <h2 id={`${topic.id}-heading`} className={`et-h3 ${styles.topicHeading}`}>
                    {topic.category}
                  </h2>
                  <ul className={styles.articleList}>
                    {topic.posts.map((post) => (
                      <li key={post.slug} className={styles.articleItem}>
                        <article className={styles.articleEntry}>
                          <p className={`et-body-sm ${styles.articleTime}`}>{post.readTime}</p>
                          <h3 className="et-h4">
                            <Link href={`/blog/${post.slug}/`} className="et-link">
                              {post.title}
                            </Link>
                          </h3>
                          <p className={`et-body-sm ${styles.articleDescription}`}>{post.description}</p>
                        </article>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
      </section>
      <ContactSection />
      {/*
        The index carried no structured data at all until 2026-11-02. It is a
        CollectionPage over the guides, and the breadcrumb matches the trail
        each post already emits.
      */}
      <SchemaGraph
        path="/blog/"
        name="Bathroom renovation guides for Sydney homeowners"
        description="Practical bathroom renovation advice for Sydney homeowners, from Elite Touch Renovations."
        pageType="CollectionPage"
        breadcrumbs={breadcrumbs}
      />
    </>
  )
}
