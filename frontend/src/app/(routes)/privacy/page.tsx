export default function PrivacyPage() {
  return (
    <section className="py-20 sm:py-24 bg-primary">
      <div className="container-custom max-w-4xl">
        <span className="section-tag">Legal</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">Privacy Policy</h1>
        <p className="mt-4 text-text-secondary">
          We respect your privacy. This policy explains what data we collect and how we use it.
        </p>

        <div className="mt-8 space-y-6 text-text-secondary text-sm">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Information we collect</h2>
            <p className="mt-2">
              We may collect contact details, project information, and communication history when
              you reach out to us or book a call.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">How we use information</h2>
            <p className="mt-2">
              We use your information to respond to inquiries, deliver services, and improve our
              operations. We do not sell your data.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Data retention</h2>
            <p className="mt-2">
              We keep data only as long as necessary to provide services or meet legal requirements.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Contact</h2>
            <p className="mt-2">Email: asrvisualshelpline@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  )
}
