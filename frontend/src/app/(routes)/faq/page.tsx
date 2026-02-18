const faqs = [
  {
    q: 'What does ASR Visuals do?',
    a: 'We provide premium video editing, content strategy, and performance-focused creative for growing brands.'
  },
  {
    q: 'What is your typical turnaround time?',
    a: 'Most edits are delivered within 48-72 hours, depending on scope and volume.'
  },
  {
    q: 'Do you handle revisions?',
    a: 'Yes, revisions are included in all plans. We keep feedback simple and fast.'
  },
  {
    q: 'Can you work with existing brand assets?',
    a: 'Absolutely. We follow your brand guidelines and maintain consistency across content.'
  },
  {
    q: 'How do we get started?',
    a: 'Book a call and we will map out your content goals and workflow.'
  }
]

export default function FAQPage() {
  return (
    <section className="py-20 sm:py-24 bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="section-tag">FAQ</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">FAQs</h1>
          <p className="mt-4 text-text-secondary">
            Answers to the most common questions about working with ASR Visuals.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((item) => (
            <div key={item.q} className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-text-primary">{item.q}</h2>
              <p className="mt-2 text-sm text-text-secondary">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
