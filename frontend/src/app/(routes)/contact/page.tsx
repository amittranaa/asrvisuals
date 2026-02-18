import Link from 'next/link'

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">Contact</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">Contact</h1>
          <p className="mt-4 text-text-secondary">
            Ready to grow? Book a call or send us a note. We usually respond within 24 hours.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary">Contact details</h2>
            <div className="mt-4 space-y-2 text-text-secondary text-sm">
              <p>Email:{' '}
                <a
                  href="mailto:asrvisualshelpline@gmail.com"
                  className="text-brand-red font-semibold hover:text-brand-red-hover transition-colors"
                >
                  asrvisualshelpline@gmail.com
                </a>
              </p>
              <p>Phone:{' '}
                <a
                  href="tel:+918102651176"
                  className="text-brand-red font-semibold hover:text-brand-red-hover transition-colors"
                >
                  +91 8102651176
                </a>
              </p>
              <p>
                Instagram:{' '}
                <a
                  href="https://www.instagram.com/asr_visuals_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-red font-semibold hover:text-brand-red-hover transition-colors"
                >
                  @asr_visuals_
                </a>
              </p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-text-primary">What to include</h2>
            <ul className="mt-4 space-y-2 text-text-secondary text-sm">
              <li>• Content goals and target audience</li>
              <li>• Current volume and turnaround needs</li>
              <li>• Links to existing content or references</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://cal.com/asrvisuals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-divider bg-brand-red text-white px-5 py-2 text-sm font-semibold hover:bg-brand-red-hover transition-colors"
          >
            Book a call
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border-divider bg-bg-secondary text-text-primary px-5 py-2 text-sm font-semibold hover:border-brand-red transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
