import { getContentBlock } from '@/lib/content'

type LegalSection = { title: string; text: string }

type TermsPageContent = {
  title: string
  description: string
  sections: LegalSection[]
  contactEmail: string
}

const defaultContent: TermsPageContent = {
  title: 'Terms of Service',
  description: 'These terms govern your use of the ASR Visuals website and services.',
  sections: [
    {
      title: 'Services',
      text: 'We provide video editing and content services based on the scope agreed during onboarding or a signed proposal.'
    },
    {
      title: 'Payments',
      text: 'Payment terms are outlined per plan or proposal. Work begins after payment confirmation unless stated otherwise.'
    },
    {
      title: 'Revisions',
      text: 'Revisions are included per plan. Additional revisions may be billed separately.'
    }
  ],
  contactEmail: 'asrvisualshelpline@gmail.com'
}

export default async function TermsPage() {
  const content = await getContentBlock('page.terms', defaultContent)

  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom max-w-4xl">
        <span className="section-tag">Legal</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">{content.title}</h1>
        <p className="mt-4 text-text-secondary">
          {content.description}
        </p>

        <div className="mt-8 space-y-6 text-text-secondary text-sm">
          {content.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-text-primary">{section.title}</h2>
              <p className="mt-2">{section.text}</p>
            </div>
          ))}
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Contact</h2>
            <p className="mt-2">Email: {content.contactEmail}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
