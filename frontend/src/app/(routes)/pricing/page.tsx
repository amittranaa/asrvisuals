import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: '$899',
    text: 'For consistent monthly content and steady growth.'
  },
  {
    name: 'Pro',
    price: '$1,599',
    text: 'For teams scaling output and needing faster turnarounds.'
  },
  {
    name: 'Custom',
    price: 'Let’s talk',
    text: 'Custom volume, workflows, and dedicated support.'
  }
]

export default function PricingPage() {
  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">Pricing</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">Pricing</h1>
          <p className="mt-4 text-text-secondary">
            Simple plans for consistent content production. Custom options available for teams
            with unique needs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-bg-secondary border border-border-divider rounded-lg p-6">
              <h2 className="text-xl font-semibold text-text-primary">{plan.name}</h2>
              <div className="mt-2 text-3xl font-bold text-brand-red">{plan.price}</div>
              <p className="mt-2 text-sm text-text-secondary">{plan.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://cal.com/asrvisuals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border-divider bg-brand-red px-5 py-2 text-sm font-semibold text-text-primary hover:bg-brand-red-hover transition-colors"
          >
            Book a call
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border-divider bg-bg-secondary px-5 py-2 text-sm font-semibold text-text-primary hover:border-brand-red transition-colors"
          >
            Get a custom plan
          </Link>
        </div>
      </div>
    </section>
  )
}
