import { getContentBlock } from '@/lib/content'

type LegalSection = { title: string; text: string }

type PrivacyPageContent = {
  title: string
  description: string
  sections: LegalSection[]
  contactEmail: string
}

const defaultContent: PrivacyPageContent = {
  title: 'Privacy Policy',
  description: 'We respect your privacy. This policy explains what data we collect and how we use it.',
  sections: [
    {
      title: 'Information we collect',
      text: 'We may collect contact details, project information, and communication history when you reach out to us or book a call.'
    },
    {
      title: 'How we use information',
      text: 'We use your information to respond to inquiries, deliver services, and improve our operations. We do not sell your data.'
    },
    {
      title: 'Data retention',
      text: 'We keep data only as long as necessary to provide services or meet legal requirements.'
    }
  ],
  contactEmail: 'asrvisualshelpline@gmail.com'
}

export default async function PrivacyPage() {
  const content = await getContentBlock('page.privacy', defaultContent)

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
