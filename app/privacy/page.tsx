import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { ExternalLink } from '@/components/ExternalLink'
import { PageHero } from '@/components/PageHero'
import { formatMonthYear } from '@/lib/dateLabels'

/**
 * Privacy policy.
 *
 * Issue #37 / content audit C-1: the site runs a live enquiry form that
 * collects name, phone, email, suburb, service and a message, and there was no
 * privacy page and no notice near the form. Google's QRG lists a privacy policy
 * as a trust signal for any site collecting personal information.
 *
 * ⚠️ EVERY LINE HERE MUST STAY TRUE TO WHAT THE CODE ACTUALLY DOES. It is not
 * boilerplate. Sources:
 *   - `lib/actions.ts` — the enquiry action: office email + customer
 *     confirmation email via RESEND, best-effort copy to SUPABASE (`enquiries`
 *     table). Honeypot field `company` is discarded, not stored.
 *   - `app/layout.tsx` — Google Tag Manager loads Google Analytics 4
 *     (D-112 / D-32). One measurement path, GTM → Google tag → GA4.
 *   - Hosting is VERCEL (D-68), which keeps standard request logs.
 * If any of those change, change this page and bump
 * `businessInfo.legalPagesUpdated`.
 *
 * Plain language on purpose: this page is in `scripts/check-readability.mjs`
 * and must pass Flesch ≥ 60 like every other page (D-109). Short sentences,
 * common words — a privacy policy nobody can read is not a trust signal.
 *
 * Server component. Inherits `index, follow` from the root layout — that is
 * correct, we want this page found.
 */

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Elite Touch Renovations collects and uses the details you send through our enquiry form, who else handles them, and how to ask us to correct or delete them.',
  alternates: { canonical: '/privacy/' },
}

const updated = formatMonthYear(businessInfo.legalPagesUpdated)

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Privacy Policy', url: `${businessInfo.siteUrl}/privacy/` },
        ]}
      />
      <PageHero
        eyebrow="Privacy"
        title="Our privacy policy"
        cta={false}
        leads={[
          'This page explains what personal details we collect, why we collect them, and what we do with them. It covers the enquiry form on this website and the emails you send us.',
          `Last updated ${updated}.`,
        ]}
      />

      <section className="et-section et-band-canvas">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">What we collect</h2>
          <p className="et-body-sm et-measure">
            When you fill in the enquiry form, we ask for:
          </p>
          <ul className="et-checklist">
            <li className="et-body-sm">your name</li>
            <li className="et-body-sm">your phone number</li>
            <li className="et-body-sm">your email address</li>
            <li className="et-body-sm">your suburb, if you choose to add it</li>
            <li className="et-body-sm">
              which room you want to renovate, if you choose to pick one
            </li>
            <li className="et-body-sm">any message you choose to write</li>
          </ul>
          <p className="et-body-sm et-measure">
            We do not ask for anything else. We do not take payment details on
            this website.
          </p>
          <p className="et-body-sm et-measure">
            If you email or call us instead, we hold whatever you send us in that
            message or tell us on that call.
          </p>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Why we collect it</h2>
          <p className="et-body-sm et-measure">
            We use your details for one thing: to reply to your enquiry and
            arrange your free on-site measure. Your phone number and email are
            how we reach you. Your suburb tells us where the job is. Your message
            helps us come prepared.
          </p>
          <p className="et-body-sm et-measure">
            We do not use your details for marketing. We do not sell them or rent
            them to anyone.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Who else handles it</h2>
          <p className="et-body-sm et-measure">
            To run the enquiry form we use two other companies. They only handle
            the details you put in the form, and only to do the job we ask them
            to do.
          </p>
          <ul className="et-checklist">
            <li className="et-body-sm">
              <strong>
                <ExternalLink href="https://resend.com">Resend</ExternalLink>
              </strong>{' '}
              sends your enquiry to our office inbox, and sends you a
              confirmation email.
            </li>
            <li className="et-body-sm">
              <strong>
                <ExternalLink href="https://supabase.com">Supabase</ExternalLink>
              </strong>{' '}
              keeps a copy of your enquiry, so we still have it if an email goes
              missing.
            </li>
          </ul>
          <p className="et-body-sm et-measure">
            Our website is hosted by{' '}
            <strong>
              <ExternalLink href="https://vercel.com">Vercel</ExternalLink>
            </strong>
            , which keeps standard server logs, such as the pages requested and
            the browser type.
          </p>
          <p className="et-body-sm et-measure">
            We will also share your details if the law requires it.
          </p>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Analytics and cookies</h2>
          <p className="et-body-sm et-measure">
            This website uses Google Analytics, loaded through Google Tag
            Manager, to count visits and see which pages people use. It sets
            cookies in your browser and records things like the pages you view,
            roughly where you are, and the type of device you use.
          </p>
          <p className="et-body-sm et-measure">
            We use this to make the site better. We do not use it to work out who
            you are by name. Your browser settings let you block or delete
            cookies at any time.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">How long we keep it</h2>
          <p className="et-body-sm et-measure">
            We keep enquiry records for as long as we may need them for the job
            and for our normal business records. When we no longer need them, we
            delete them.
          </p>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Your choices</h2>
          <p className="et-body-sm et-measure">
            You can ask us what details we hold about you. You can ask us to
            correct them, or to delete them. Email{' '}
            <a
              className="et-link"
              href={`mailto:${businessInfo.email.primary}`}
            >
              {businessInfo.email.primary}
            </a>{' '}
            or call{' '}
            <a className="et-link" href={businessInfo.phone.href}>
              {businessInfo.phone.display}
            </a>{' '}
            and we will sort it out.
          </p>
          <p className="et-body-sm et-measure">
            You do not have to use the form. You can call or email us instead.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Changes to this policy</h2>
          <p className="et-body-sm et-measure">
            If we change how we handle your details, we will update this page and
            change the date at the top.
          </p>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Contact us</h2>
          <p className="et-body-sm et-measure">
            If you have a question about your privacy, or a complaint about how we
            have handled your details, contact us:
          </p>
          <ul className="et-stack-tight">
            <li className="et-body-sm">{businessInfo.legalName}</li>
            <li className="et-body-sm">ABN {businessInfo.abn}</li>
            <li className="et-body-sm">
              Email:{' '}
              <a
                className="et-link"
                href={`mailto:${businessInfo.email.primary}`}
              >
                {businessInfo.email.primary}
              </a>
            </li>
            <li className="et-body-sm">
              Phone:{' '}
              <a className="et-link" href={businessInfo.phone.href}>
                {businessInfo.phone.display}
              </a>
            </li>
            <li className="et-body-sm">
              Post: {businessInfo.address.suburb},{' '}
              {businessInfo.address.state} ({businessInfo.address.note})
            </li>
          </ul>
          <p className="et-body-sm et-measure">
            See also our{' '}
            <Link className="et-link" href="/terms/">
              website terms of use
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
