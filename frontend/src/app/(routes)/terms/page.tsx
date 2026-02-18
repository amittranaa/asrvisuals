export default function TermsPage() {
  return (
    <section className="py-20 sm:py-24 bg-primary">
      <div className="container-custom max-w-4xl">
        <span className="section-tag">Legal</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-text-primary">Terms of Service</h1>
        <p className="mt-4 text-text-secondary">
          These terms govern your use of the ASR Visuals website and services.
        </p>

        <div className="mt-8 space-y-6 text-text-secondary text-sm">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Services</h2>
            <p className="mt-2">
              We provide video editing and content services based on the scope agreed during
              onboarding or a signed proposal.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Payments</h2>
            <p className="mt-2">
              Payment terms are outlined per plan or proposal. Work begins after payment
              confirmation unless stated otherwise.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Revisions</h2>
            <p className="mt-2">
              Revisions are included per plan. Additional revisions may be billed separately.
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
