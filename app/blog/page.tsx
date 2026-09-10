import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactSection } from '@/components/ContactSection'
import { PageHero } from '@/components/PageHero'
import { buildMetadata } from '@/lib/metadata'
import { blogPosts } from '@/lib/blog'

export const metadata: Metadata = buildMetadata({
  path: '/blog/',
  title: 'Bathroom Renovation Advice, Sydney',
  description: 'Practical bathroom renovation advice for Sydney homeowners, from Elite Touch Renovations.',
})

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Bathroom renovation journal"
        title="Clear advice before you renovate"
        leads={[
          'Practical answers about bathroom renovation costs, timelines, quotes and planning in Sydney.',
          'Use these guides to prepare better questions, then bring your room to us for a free on-site measure and fixed-scope written quote.',
        ]}
      />

      <main>
        <section className="et-section">
          <div className="et-container">
            <p className="et-lead et-measure" style={{ marginBottom: 'var(--et-space-10)' }}>
              Start here. Pick the guide that fits your job. Get clear facts, make a short list of questions, then talk to a team that can measure the room and set out the work in plain terms.
            </p>
            <div className="et-blog-grid">
              {blogPosts.map((post) => (
                <article key={post.slug} className="et-card et-blog-card">
                  <span className="et-eyebrow">{post.category}</span>
                  <h2 className="et-h3">
                    <Link href={`/blog/${post.slug}/`} className="et-link">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="et-body">{post.description}</p>
                  <p className="et-body-sm" style={{ color: 'var(--et-text-secondary)' }}>
                    {post.readTime}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ContactSection />
      </main>
    </>
  )
}
