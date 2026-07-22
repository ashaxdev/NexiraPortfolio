export const metadata = {
  title: 'Terms of Service | Nexira Solution',
  description: 'Terms and conditions for using Nexira Solution services.',
}

export default function TermsOfService() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 24 }}>Terms of Service</h1>
        <p style={{ color: 'var(--text2)', marginBottom: 32 }}>
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the Nexira Solution website or engaging our services, you agree to be bound by these Terms of Service.</p>

        <h2>2. Services</h2>
        <p>Nexira Solution provides website development, ERP solutions, SaaS development, e-commerce solutions, AI agents, AI chatbots, and portfolio websites. Specific project scope, timelines, and deliverables are agreed upon separately with each client before work begins.</p>

        <h2>3. Payments</h2>
        <p>Payment terms, including advance payments and milestones, will be communicated and agreed upon in a separate project agreement or invoice prior to commencement of work.</p>

        <h2>4. Intellectual Property</h2>
        <p>Upon full payment, clients receive ownership rights to the final deliverables as agreed in their project contract. Nexira Solution retains the right to showcase completed work in its portfolio unless otherwise agreed in writing.</p>

        <h2>5. Client Responsibilities</h2>
        <p>Clients are responsible for providing timely feedback, content, and access needed to complete the project as scheduled.</p>

        <h2>6. Limitation of Liability</h2>
        <p>Nexira Solution is not liable for indirect, incidental, or consequential damages arising from the use of our services or website.</p>

        <h2>7. Changes to Terms</h2>
        <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>

        <h2>8. Governing Law</h2>
        <p>These terms are governed by the laws of India, with jurisdiction in Chennai, Tamil Nadu.</p>

        <h2>9. Contact</h2>
        <p>Questions about these terms can be sent to nexirasolution@gmail.com.</p>
      </div>
    </section>
  )
}