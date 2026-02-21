import Link from 'next/link'
import { getContentBlock } from '@/lib/content'

type PricingPlan = {
  _id?: string
  name: string
  price: string
  description: string
  paymentUrl?: string
}

type PricingPageContent = {
  title: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

const defaultContent: PricingPageContent = {
  title: 'Pricing',
  description: 'Simple plans for consistent content production. Custom options available for teams with unique needs.',
  primaryCtaLabel: 'Book a call',
  primaryCtaHref: 'https://cal.com/asrvisuals',
  secondaryCtaLabel: 'Get a custom plan',
  secondaryCtaHref: '/contact'
}

const getPricingPlans = async (): Promise<PricingPlan[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  if (!baseUrl) return []

  try {
    const response = await fetch(`${baseUrl}/pricing`, { next: { revalidate: 60 } })
    if (!response.ok) return []
    const json = await response.json()
    return (json.data || []) as PricingPlan[]
  } catch {
    return []
  }
}

const renderPaymentLink = (plan: PricingPlan) => {
  if (!plan.paymentUrl) return null

  if (plan.paymentUrl.startsWith('/')) {
    return (
      <Link
        href={plan.paymentUrl}
        className="inline-flex items-center justify-center mt-4 rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-hover transition-colors"
      >
        Pay now
      </Link>
    )
  }

  return (
    <a
      href={plan.paymentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center mt-4 rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-hover transition-colors"
    >
      Pay now
    </a>
  )
}

export default async function PricingPage() {
  const content = await getContentBlock('page.pricing', defaultContent)
  const plans = await getPricingPlans()

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">Pricing</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">
            {content.title}
          </h1>
          <p className="mt-4 text-text-secondary">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan._id || plan.name} className="bg-bg-secondary border border-border-divider rounded-lg p-6">
              <h2 className="text-xl font-semibold text-text-primary">{plan.name}</h2>
              <div className="mt-2 text-3xl font-bold text-brand-red">${plan.price}</div>
              <p className="mt-2 text-sm text-text-secondary">{plan.description}</p>
              {renderPaymentLink(plan)}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={content.primaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border-divider bg-brand-red px-5 py-2 text-sm font-semibold text-text-primary hover:bg-brand-red-hover transition-colors"
          >
            {content.primaryCtaLabel}
          </a>
          <Link
            href={content.secondaryCtaHref}
            className="inline-flex items-center gap-2 rounded-lg border border-border-divider bg-bg-secondary px-5 py-2 text-sm font-semibold text-text-primary hover:border-brand-red transition-colors"
          >
            {content.secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
