export const metadata = {
  title: 'Privacy Policy | Nexira Solution',
  description: 'How Nexira Solution collects, uses, and protects your data.',
}

export default function PrivacyPolicy() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 24 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text2)', marginBottom: 32 }}>
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2>1. Information We Collect</h2>
        <p>When you contact us through our website, WhatsApp, or contact forms, we may collect your name, phone number, email address, and any project details you share with us.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information you provide to respond to enquiries, prepare quotes, deliver services, and communicate with you about your project. We do not sell or rent your personal information to third parties.</p>

        <h2>3. WhatsApp Communication</h2>
        <p>Submitting our contact form sends your enquiry to our WhatsApp Business number so our team can respond quickly. Standard WhatsApp terms and privacy practices apply to messages sent through that platform.</p>

        <h2>4. Cookies</h2>
        <p>Our website may use basic cookies or local session storage to improve your browsing experience, such as remembering that you've seen a pop-up.</p>

        <h2>5. Data Security</h2>
        <p>We take reasonable technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>

        <h2>6. Third-Party Services</h2>
        <p>We may use third-party tools (such as analytics or hosting providers) that process data on our behalf, solely to operate and improve our website.</p>

        <h2>7. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at nexirasolution@gmail.com.</p>

        <h2>8. Contact Us</h2>
        <p>For any privacy-related questions, reach out to us at nexirasolution@gmail.com or +91 93841 55672.</p>
      </div>
    </section>
  )
}