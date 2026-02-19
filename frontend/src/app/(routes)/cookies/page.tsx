import { getContentBlock } from '@/lib/content'

type LegalSection = { title: string; text: string }

type CookiesPageContent = {
  title: string
  description: string
  sections: LegalSection[]
}

const defaultContent: CookiesPageContent = {
  title: 'Cookie Policy',
  description: 'This policy explains how we use cookies and similar technologies.',
  sections: [
    {
      title: 'What are cookies?',
      text: 'Cookies are small files stored on your device that help websites function and improve user experience.'
    },
    {
      title: 'How we use cookies',
      text: 'We use cookies for basic site functionality and analytics to understand page performance.'
    },
    {
      title: 'Managing cookies',
      text: 'You can control or delete cookies through your browser settings at any time.'
    }
  ]
}

export default async function CookiesPage() {
  const content = await getContentBlock('page.cookies', defaultContent)

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
        </div>
      </div>
    </section>
  )
}
