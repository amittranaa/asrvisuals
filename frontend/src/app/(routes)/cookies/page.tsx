export default function CookiesPage() {
  return (
    <section className="py-20 sm:py-24 bg-bg-primary">
      <div className="container-custom max-w-4xl">
        <span className="section-tag">Legal</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">Cookie Policy</h1>
        <p className="mt-4 text-text-secondary">
          This policy explains how we use cookies and similar technologies.
        </p>

        <div className="mt-8 space-y-6 text-text-secondary text-sm">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">What are cookies?</h2>
            <p className="mt-2">
              Cookies are small files stored on your device that help websites function and improve
              user experience.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">How we use cookies</h2>
            <p className="mt-2">
              We use cookies for basic site functionality and analytics to understand page
              performance.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Managing cookies</h2>
            <p className="mt-2">
              You can control or delete cookies through your browser settings at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
