'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaWhatsapp, FaGlobe, FaRobot, FaCloud, FaShoppingCart, FaDatabase, FaBriefcase, FaComments, FaCheckCircle, FaStar, FaUsers, FaProjectDiagram, FaAward, FaTimes, FaUser, FaPhone, FaEnvelope, FaCommentDots } from 'react-icons/fa'

const WHATSAPP_NUMBER = '919384155672' // country code + number, no + or spaces

// Brand accents:
// --brand   : established site accent (amber) — kept for continuity with the rest of the site
// --signal  : new "system status" teal used only inside the console panel, the page's signature element
const BRAND = '#f59e0b'
const SIGNAL = '#2dd4bf'

const services = [
  { icon: <FaGlobe size={22} />, title: 'Website & Landing Page', desc: 'High-converting, blazing-fast websites built for results.', tag: 'web' },
  { icon: <FaBriefcase size={22} />, title: 'Portfolio Websites', desc: 'Stunning portfolios that get you hired and noticed.', tag: 'web' },
  { icon: <FaDatabase size={22} />, title: 'ERP Solutions', desc: 'Streamline your entire business with custom ERP.', tag: 'core' },
  { icon: <FaCloud size={22} />, title: 'SaaS Development', desc: 'Scalable multi-tenant SaaS products built for growth.', tag: 'core' },
  { icon: <FaShoppingCart size={22} />, title: 'E-Commerce', desc: 'Complete online stores with payment & inventory.', tag: 'core' },
  { icon: <FaRobot size={22} />, title: 'AI Agents', desc: 'Intelligent automation agents for your business.', tag: 'ai' },
  { icon: <FaComments size={22} />, title: 'AI Chatbots', desc: 'Smart chatbots for 24/7 customer engagement.', tag: 'ai' },
]

const stats = [
  { value: '150+', label: 'Projects shipped', icon: <FaProjectDiagram /> },
  { value: '80+', label: 'Active clients', icon: <FaUsers /> },
  { value: '5+', label: 'Years running', icon: <FaAward /> },
  { value: '99%', label: 'Would rehire', icon: <FaStar /> },
]

const testimonials = [
  { name: 'Raj Kumar', company: 'TechStartup India', text: 'Nexira built our entire SaaS platform. Exceptional quality, on time, and great support. Highly recommend!', rating: 5 },
  { name: 'Priya S.', company: 'FashionHub', text: 'Our e-commerce store saw 200% increase in conversions after Nexira redesigned it. Amazing work!', rating: 5 },
  { name: 'Mohammed A.', company: 'LogiCorp', text: 'The ERP they built transformed our operations. We saved 40% in operational costs. Outstanding!', rating: 5 },
]

const waLink = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=Hi, I am interested in your services!'

const MONO = "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace"

/* ---------------- Contact Popup Form ---------------- */
function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Lock body scroll only while the modal is actually open, and close on Escape.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please enter your name and phone number.')
      return
    }
    setError('')

    const text =
      `New Enquiry from Website%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      (form.email ? `Email: ${encodeURIComponent(form.email)}%0A` : '') +
      `Message: ${encodeURIComponent(form.message || 'N/A')}`

    const sendUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`

    // Open WhatsApp with the pre-filled enquiry so it reaches the business number instantly
    window.open(sendUrl, '_blank', 'noopener,noreferrer')

    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setForm({ name: '', phone: '', email: '', message: '' })
    setError('')
    onClose()
  }

  return (
    <div className="nx-overlay" onClick={handleClose} role="presentation">
      <div
        className="nx-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
      >
        <button onClick={handleClose} aria-label="Close" className="nx-modal-close">
          <FaTimes />
        </button>

        <div className="nx-modal-scroll">
          {!submitted ? (
            <>
              <span className="badge nx-modal-badge">Free consultation</span>
              <h2 className="nx-modal-title">Let's build something great</h2>
              <p className="nx-modal-sub">
                Share a few details and our team will reach out to you shortly.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="nx-field">
                  <label className="nx-label"><FaUser size={12} /> Full name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="nx-input"
                    autoComplete="name"
                  />
                </div>
                <div className="nx-field">
                  <label className="nx-label"><FaPhone size={12} /> Phone number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 98765 43210"
                    className="nx-input"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
                <div className="nx-field">
                  <label className="nx-label"><FaEnvelope size={12} /> Email (optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="nx-input"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
                <div className="nx-field">
                  <label className="nx-label"><FaCommentDots size={12} /> What do you need help with?</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us briefly about your project..."
                    rows={3}
                    className="nx-input nx-textarea"
                  />
                </div>

                {error && <div className="nx-error">{error}</div>}

                <button type="submit" className="btn btn-primary nx-submit">
                  <FaWhatsapp /> Send enquiry now
                </button>
                <p className="nx-privacy">We respect your privacy. No spam, ever.</p>
              </form>
            </>
          ) : (
            <div className="nx-success">
              <div className="nx-success-icon"><FaCheckCircle /></div>
              <h2 className="nx-modal-title">Thank you, {form.name.split(' ')[0]}!</h2>
              <p className="nx-modal-sub">
                Our team will contact you soon. If WhatsApp didn't open automatically, tap below.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn nx-wa-btn"
              >
                <FaWhatsapp /> Open WhatsApp
              </a>
              <button onClick={handleClose} className="nx-close-link">Close</button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .nx-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 5, 8, 0.7);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .nx-modal {
          background: var(--bg2, #14161c);
          border: 1px solid var(--border2, #2a2d36);
          border-radius: 20px;
          max-width: 460px;
          width: 100%;
          max-height: min(88vh, 720px);
          padding: 32px;
          padding-top: 44px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          animation: nx-pop 0.22s ease;
        }
        .nx-modal-scroll {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        @keyframes nx-pop {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .nx-modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--text2, #9a9ba5);
          font-size: 18px;
          cursor: pointer;
          border-radius: 10px;
        }
        .nx-modal-close:hover { background: rgba(255,255,255,0.06); }
        .nx-modal-badge {
          display: inline-block;
          margin-bottom: 16px;
          font-size: 13px;
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(245,158,11,0.1);
          color: ${BRAND};
          border: 1px solid rgba(245,158,11,0.3);
          font-weight: 700;
        }
        .nx-modal-title { font-size: 24px; margin-bottom: 8px; line-height: 1.25; }
        .nx-modal-sub { color: var(--text2, #9a9ba5); font-size: 15px; margin-bottom: 24px; }
        .nx-field { margin-bottom: 16px; }
        .nx-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text2, #9a9ba5);
          margin-bottom: 6px;
          font-weight: 600;
        }
        .nx-input {
          width: 100%;
          padding: 13px 14px;
          min-height: 46px;
          border-radius: 10px;
          border: 1px solid var(--border2, #2a2d36);
          background: var(--bg, #0c0d11);
          color: var(--text, #fff);
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
        }
        .nx-input:focus { border-color: ${BRAND}; }
        .nx-textarea { resize: vertical; font-family: inherit; min-height: 80px; }
        .nx-error { color: #ef4444; font-size: 13px; margin-bottom: 16px; }
        .nx-submit {
          width: 100%;
          justify-content: center;
          font-size: 16px;
          padding: 15px 0;
          border: none;
          cursor: pointer;
        }
        .nx-privacy { color: var(--text2, #9a9ba5); font-size: 12px; text-align: center; margin-top: 12px; }
        .nx-success { text-align: center; padding: 12px 0 4px; }
        .nx-success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(37,211,102,0.15);
          border: 1px solid rgba(37,211,102,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 26px;
          color: #25d366;
        }
        .nx-wa-btn {
          background: #25d366;
          color: #fff;
          padding: 13px 28px;
          display: inline-flex;
          margin-top: 4px;
        }
        .nx-close-link {
          display: block;
          margin: 16px auto 0;
          background: transparent;
          border: none;
          color: var(--text2, #9a9ba5);
          cursor: pointer;
          font-size: 14px;
          text-decoration: underline;
        }

        /* --- Mobile: modal becomes a near full-screen sheet --- */
        @media (max-width: 560px) {
          .nx-overlay {
            padding: 0;
            align-items: flex-end;
          }
          .nx-modal {
            max-width: 100%;
            width: 100%;
            max-height: 92dvh;
            border-radius: 20px 20px 0 0;
            padding: 26px 20px calc(20px + env(safe-area-inset-bottom, 0px));
            animation: nx-sheet-up 0.24s ease;
          }
          @keyframes nx-sheet-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .nx-modal-close { top: 12px; right: 12px; }
          .nx-modal-title { font-size: 21px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nx-modal { animation: none; }
        }
      `}</style>
    </div>
  )
}

// Key used to remember (per browser tab session) that the auto-popup has already been shown,
// so it doesn't re-fire every time the user navigates between pages in the same visit.
const AUTO_POPUP_SESSION_KEY = 'nexira_auto_popup_shown'

/* ---------------- Page ---------------- */
export default function HomeClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [showFloatingCta, setShowFloatingCta] = useState(false)

  // Only reveal the floating button once the user scrolls past the hero,
  // so it never sits near/behind the navbar at the top of the page.
  useEffect(() => {
    const onScroll = () => setShowFloatingCta(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-open the contact popup a few seconds after the page loads.
  // Uses sessionStorage so it only shows once per browser session.
  useEffect(() => {
    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(AUTO_POPUP_SESSION_KEY) === 'true'
    } catch (e) {
      alreadyShown = false
    }

    if (alreadyShown) return

    const timer = setTimeout(() => {
      setModalOpen(true)
      try {
        sessionStorage.setItem(AUTO_POPUP_SESSION_KEY, 'true')
      } catch (e) {
        // ignore if storage isn't available
      }
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* HERO */}
      <section className="nx-hero">
        <div className="container nx-hero-grid">
          {/* LEFT: primary message + CTAs */}
          <div className="nx-hero-left">
            <span className="badge nx-eyebrow">Trusted IT partner in Chennai</span>

            <h1 className="nx-h1">
              We build websites, SaaS &amp; AI solutions that <span className="nx-accent">grow your business</span>
            </h1>

            <p className="nx-lede">
              From high-converting websites to custom ERP and AI chatbots — Nexira Solution delivers results-driven digital products for growing businesses.
            </p>

            <div className="nx-cta-row">
              <button onClick={() => setModalOpen(true)} className="btn btn-primary nx-cta-btn">
                Get free quote <FaArrowRight />
              </button>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn nx-wa-cta">
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>

            <p className="nx-microcopy">
              Free consultation &nbsp;·&nbsp; reply within 24 hours &nbsp;·&nbsp; 150+ projects delivered
            </p>
          </div>

          {/* RIGHT: signature "system status" console panel */}
          <div className="nx-console" aria-label="Company status overview">
            <div className="nx-console-bar">
              <span className="nx-dot" style={{ background: '#ff5f57' }} />
              <span className="nx-dot" style={{ background: '#febc2e' }} />
              <span className="nx-dot" style={{ background: '#28c840' }} />
              <span className="nx-console-path">nexira@status ~ </span>
            </div>
            <div className="nx-console-body">
              <p className="nx-console-line">
                <span className="nx-prompt">$</span> nexira --status<span className="nx-cursor">▍</span>
              </p>
              <p className="nx-console-line nx-console-ok">build: passing</p>
              <p className="nx-console-line nx-console-ok">uptime: 99.9%</p>

              <div className="nx-stat-grid">
                {stats.map(s => (
                  <div key={s.label} className="nx-stat">
                    <div className="nx-stat-icon">{s.icon}</div>
                    <div className="nx-stat-value">{s.value}</div>
                    <div className="nx-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="nx-modules">
                <div className="nx-modules-label">// modules loaded</div>
                {services.slice(0, 4).map((s, i) => (
                  <div key={i} className="nx-module-row">
                    <FaCheckCircle className="nx-module-check" />
                    {s.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-label">
            <span className="badge">What we build</span>
            <h2>Our services</h2>
            <p>End-to-end IT solutions designed to accelerate your business in the digital age.</p>
          </div>
          <div className="nx-services-grid">
            {services.map((s, i) => (
              <Link key={i} href="/services" className="nx-service-link">
                <div className="card nx-service-card">
                  <div className="nx-service-icon">{s.icon}</div>
                  <h3 className="nx-service-title">{s.title}</h3>
                  <p className="nx-service-desc">{s.desc}</p>
                  <div className="nx-service-cta">
                    Learn more <FaArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/services" className="btn btn-primary">View all services <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="section-label">
            <span className="badge">Testimonials</span>
            <h2>What our clients say</h2>
            <p>Real feedback from real clients who trust Nexira with their digital success.</p>
          </div>
          <div className="nx-testimonial-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="card nx-testimonial-card">
                <div className="nx-stars">
                  {[...Array(t.rating)].map((_, j) => <FaStar key={j} style={{ color: BRAND }} />)}
                </div>
                <p className="nx-testimonial-text">"{t.text}"</p>
                <div className="nx-testimonial-author">
                  <div className="nx-avatar">{t.name[0]}</div>
                  <div>
                    <div className="nx-author-name">{t.name}</div>
                    <div className="nx-author-company">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="nx-final-cta">
            <div className="orb orb-blue nx-final-orb" />
            <span className="badge nx-final-badge">Get in touch</span>
            <h2 className="nx-final-title">Ready to start your project?</h2>
            <p className="nx-final-sub">
              Contact us today for a free consultation and project estimate.
            </p>
            <div className="nx-final-row">
              <button onClick={() => setModalOpen(true)} className="btn btn-primary nx-cta-btn">
                Get free quote <FaArrowRight />
              </button>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn nx-wa-cta">
                <FaWhatsapp /> WhatsApp: 93841 55672
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating sticky Quote button — only visible once scrolled past the hero */}
      <button
        onClick={() => setModalOpen(true)}
        aria-hidden={!showFloatingCta}
        className="nx-floating-cta"
        style={{
          opacity: showFloatingCta ? 1 : 0,
          transform: showFloatingCta ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showFloatingCta ? 'auto' : 'none',
        }}
      >
        Get free quote <FaArrowRight size={12} />
      </button>

      <style jsx global>{`
        .nx-hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: calc(var(--navbar-height, 96px) + 24px);
          padding-bottom: 40px;
          background:
            radial-gradient(circle at 20% 20%, rgba(245,158,11,0.14), transparent 50%),
            radial-gradient(circle at 85% 75%, rgba(45,212,191,0.12), transparent 50%),
            var(--bg, #0c0d11);
        }
        .nx-hero-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
          gap: 48px;
          align-items: center;
        }
        .nx-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          font-size: 13px;
          padding: 6px 16px;
          border-radius: 100px;
          background: rgba(245,158,11,0.1);
          color: ${BRAND};
          border: 1px solid rgba(245,158,11,0.3);
          font-weight: 700;
        }
        .nx-h1 {
          font-size: clamp(30px, 5.2vw, 56px);
          line-height: 1.12;
          margin-bottom: 22px;
          font-weight: 800;
        }
        .nx-accent { color: ${BRAND}; }
        .nx-lede {
          font-size: clamp(16px, 1.6vw, 19px);
          color: var(--text2, #9a9ba5);
          margin-bottom: 32px;
          max-width: 540px;
        }
        .nx-cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
        .nx-cta-btn { font-size: 17px; padding: 18px 36px; border: none; cursor: pointer; }
        .nx-wa-cta {
          background: #25d366;
          color: #fff;
          font-size: 17px;
          padding: 18px 36px;
          box-shadow: 0 0 30px rgba(37,211,102,0.3);
        }
        .nx-microcopy { margin-top: 24px; font-size: 13px; color: var(--text2, #9a9ba5); }

        /* Signature console panel */
        .nx-console {
          position: relative;
          background: #0a0f14;
          border: 1px solid rgba(45,212,191,0.25);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(45,212,191,0.05);
          font-family: ${MONO};
        }
        .nx-console-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nx-dot { width: 10px; height: 10px; border-radius: 50%; opacity: 0.85; }
        .nx-console-path { margin-left: 8px; font-size: 12px; color: #6b7785; }
        .nx-console-body { padding: 20px 20px 24px; }
        .nx-console-line { font-size: 13px; color: #a8b3bf; margin: 0 0 6px; }
        .nx-prompt { color: ${SIGNAL}; margin-right: 6px; }
        .nx-console-ok { color: ${SIGNAL}; }
        .nx-cursor {
          display: inline-block;
          margin-left: 2px;
          color: ${SIGNAL};
          animation: nx-blink 1.1s steps(1) infinite;
        }
        @keyframes nx-blink { 50% { opacity: 0; } }

        .nx-stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 18px 0 22px;
        }
        .nx-stat {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 14px 12px;
        }
        .nx-stat-icon { color: ${SIGNAL}; font-size: 14px; margin-bottom: 6px; }
        .nx-stat-value { font-size: 22px; font-weight: 800; color: #eef1f5; line-height: 1; font-family: var(--font-display, inherit); }
        .nx-stat-label { color: #7c8794; font-size: 11px; margin-top: 4px; letter-spacing: 0.2px; }

        .nx-modules-label { font-size: 11px; color: #5c6673; margin-bottom: 10px; letter-spacing: 0.3px; }
        .nx-module-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #a8b3bf;
          padding: 6px 0;
          font-family: inherit;
        }
        .nx-module-check { color: ${SIGNAL}; flex-shrink: 0; font-size: 12px; }

        /* Services */
        .nx-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .nx-service-link { display: block; text-decoration: none; color: inherit; }
        .nx-service-card { height: 100%; }
        .nx-service-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${BRAND};
          margin-bottom: 18px;
        }
        .nx-service-title { font-size: 19px; margin-bottom: 10px; }
        .nx-service-desc { color: var(--text2); font-size: 15px; }
        .nx-service-cta {
          margin-top: 18px;
          color: ${BRAND};
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Testimonials */
        .nx-testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        .nx-stars { display: flex; gap: 4px; margin-bottom: 16px; }
        .nx-testimonial-text { color: var(--text2); font-size: 15px; line-height: 1.75; margin-bottom: 20px; font-style: italic; }
        .nx-testimonial-author { display: flex; align-items: center; gap: 12px; }
        .nx-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--primary-glow);
          border: 1px solid var(--border2);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-weight: 700; color: var(--primary); font-size: 18px;
        }
        .nx-author-name { font-weight: 600; font-size: 15px; }
        .nx-author-company { color: var(--text2); font-size: 13px; }

        /* Final CTA */
        .nx-final-cta {
          background: linear-gradient(135deg, var(--bg2), var(--surface));
          border: 1px solid var(--border2);
          border-radius: 24px;
          padding: clamp(36px, 6vw, 80px) clamp(20px, 6vw, 80px);
          position: relative;
          overflow: hidden;
        }
        .nx-final-orb { width: 300px; height: 300px; top: -100px; right: -100px; }
        .nx-final-badge { margin-bottom: 24px; }
        .nx-final-title { font-size: clamp(26px, 4vw, 48px); margin-bottom: 20px; }
        .nx-final-sub { color: var(--text2); margin-bottom: 36px; font-size: 18px; max-width: 500px; margin-left: auto; margin-right: auto; }
        .nx-final-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; }

        /* Floating CTA */
        .nx-floating-cta {
          position: fixed;
          bottom: 20px;
          right: 20px;
          bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          z-index: 40;
          background: ${BRAND};
          color: #111;
          border: none;
          border-radius: 100px;
          padding: 13px 20px;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(245,158,11,0.35);
          cursor: pointer;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        /* ---------------- Responsive breakpoints ---------------- */
        @media (max-width: 900px) {
          .nx-hero-grid { grid-template-columns: 1fr; }
          .nx-hero { min-height: auto; padding-top: calc(var(--navbar-height, 88px) + 20px); }
          .nx-console { max-width: 520px; }
        }

        @media (max-width: 640px) {
          .nx-cta-row { flex-direction: column; align-items: stretch; }
          .nx-cta-btn, .nx-wa-cta { justify-content: center; width: 100%; padding: 16px 24px; font-size: 15px; }
          .nx-final-row { flex-direction: column; align-items: stretch; }
          .nx-final-row .btn { justify-content: center; width: 100%; }
          .nx-stat-grid { grid-template-columns: 1fr 1fr; }
          .nx-services-grid { grid-template-columns: 1fr; }
          .nx-testimonial-grid { grid-template-columns: 1fr; }
          .nx-h1 { margin-bottom: 16px; }
          .nx-floating-cta { left: 16px; right: 16px; width: calc(100% - 32px); justify-content: center; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); }
        }

        @media (max-width: 400px) {
          .nx-console-body { padding: 16px 14px 20px; }
          .nx-stat { padding: 12px 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nx-cursor { animation: none; }
        }
      `}</style>
    </>
  )
}