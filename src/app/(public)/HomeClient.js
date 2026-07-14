'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaWhatsapp, FaGlobe, FaRobot, FaCloud, FaShoppingCart, FaDatabase, FaBriefcase, FaComments, FaCheckCircle, FaStar, FaUsers, FaProjectDiagram, FaAward, FaTimes, FaUser, FaPhone, FaEnvelope, FaCommentDots, FaBolt, FaShieldAlt, FaRocket } from 'react-icons/fa'

const WHATSAPP_NUMBER = '919384155672' // country code + number, no + or spaces

const services = [
  { icon: <FaGlobe size={28} />, title: 'Website & Landing Page', desc: 'High-converting, blazing-fast websites built for results.', color: '#f59e0b' },
  { icon: <FaBriefcase size={28} />, title: 'Portfolio Websites', desc: 'Stunning portfolios that get you hired and noticed.', color: '#f59e0b' },
  { icon: <FaDatabase size={28} />, title: 'ERP Solutions', desc: 'Streamline your entire business with custom ERP.', color: '#f59e0b' },
  { icon: <FaCloud size={28} />, title: 'SaaS Development', desc: 'Scalable multi-tenant SaaS products built for growth.', color: '#f59e0b' },
  { icon: <FaShoppingCart size={28} />, title: 'E-Commerce', desc: 'Complete online stores with payment & inventory.', color: '#f59e0b' },
  { icon: <FaRobot size={28} />, title: 'AI Agents', desc: 'Intelligent automation agents for your business.', color: '#f59e0b' },
  { icon: <FaComments size={28} />, title: 'AI Chatbots', desc: 'Smart chatbots for 24/7 customer engagement.', color: '#f59e0b' },
]

const stats = [
  { value: '150+', label: 'Projects Delivered', icon: <FaProjectDiagram /> },
  { value: '80+', label: 'Happy Clients', icon: <FaUsers /> },
  { value: '5+', label: 'Years Experience', icon: <FaAward /> },
  { value: '99%', label: 'Client Satisfaction', icon: <FaStar /> },
]

const heroHighlights = [
  { icon: <FaBolt />, text: 'Blazing-fast delivery' },
  { icon: <FaShieldAlt />, text: 'Secure & scalable builds' },
  { icon: <FaRocket />, text: 'Launch-ready in weeks' },
]

const testimonials = [
  { name: 'Raj Kumar', company: 'TechStartup India', text: 'Nexira built our entire SaaS platform. Exceptional quality, on time, and great support. Highly recommend!', rating: 5 },
  { name: 'Priya S.', company: 'FashionHub', text: 'Our e-commerce store saw 200% increase in conversions after Nexira redesigned it. Amazing work!', rating: 5 },
  { name: 'Mohammed A.', company: 'LogiCorp', text: 'The ERP they built transformed our operations. We saved 40% in operational costs. Outstanding!', rating: 5 },
]

const waLink = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=Hi, I am interested in your services!'

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

    // Open WhatsApp with the pre-filled enquiry so it reaches 9384155672 instantly
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
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        // Higher than the navbar's own z-index so the popup overlay sits
        // above it instead of the navbar poking through on top.
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg2, #14161c)',
          border: '1px solid var(--border2, #2a2d36)',
          borderRadius: 20,
          maxWidth: 460,
          width: '100%',
          padding: 32,
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'transparent',
            border: 'none',
            color: 'var(--text2, #9a9ba5)',
            fontSize: 18,
            cursor: 'pointer',
          }}
        >
          <FaTimes />
        </button>

        {!submitted ? (
          <>
            <span
              className="badge"
              style={{
                display: 'inline-block',
                marginBottom: 16,
                fontSize: 13,
                padding: '4px 12px',
                borderRadius: 100,
                background: 'rgba(245,158,11,0.1)',
                color: '#f59e0b',
                border: '1px solid rgba(245,158,11,0.3)',
                fontWeight: 700,
              }}
            >
              🚀 Free Consultation
            </span>
            <h2 style={{ fontSize: 26, marginBottom: 8 }}>Let's Build Something Great</h2>
            <p style={{ color: 'var(--text2, #9a9ba5)', fontSize: 15, marginBottom: 24 }}>
              Share a few details and our team will reach out to you shortly.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}><FaUser size={12} /> Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}><FaPhone size={12} /> Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 98765 43210"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}><FaEnvelope size={12} /> Email (optional)</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}><FaCommentDots size={12} /> What do you need help with?</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your project..."
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              {error && (
                <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>{error}</div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '14px 0' }}
              >
                <FaWhatsapp /> Send Enquiry Now
              </button>
              <p style={{ color: 'var(--text2, #9a9ba5)', fontSize: 12, textAlign: 'center', marginTop: 12 }}>
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(37,211,102,0.15)',
                border: '1px solid rgba(37,211,102,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: 28,
                color: '#25d366',
              }}
            >
              <FaCheckCircle />
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 10 }}>Thank You, {form.name.split(' ')[0]}!</h2>
            <p style={{ color: 'var(--text2, #9a9ba5)', fontSize: 15, marginBottom: 24 }}>
              Our team will contact you soon. If WhatsApp didn't open automatically, tap below.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: '#25d366', color: '#fff', padding: '12px 28px', display: 'inline-flex' }}
            >
              <FaWhatsapp /> Open WhatsApp
            </a>
            <div style={{ marginTop: 16 }}>
              <button
                onClick={handleClose}
                style={{ background: 'transparent', border: 'none', color: 'var(--text2, #9a9ba5)', cursor: 'pointer', fontSize: 14, textDecoration: 'underline' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 13,
  color: 'var(--text2, #9a9ba5)',
  marginBottom: 6,
  fontWeight: 600,
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid var(--border2, #2a2d36)',
  background: 'var(--bg, #0c0d11)',
  color: 'var(--text, #fff)',
  fontSize: 15,
  outline: 'none',
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
  // Uses sessionStorage so it only shows once per browser session (won't
  // nag the visitor again if they navigate around the site or refresh).
  useEffect(() => {
    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(AUTO_POPUP_SESSION_KEY) === 'true'
    } catch (e) {
      // sessionStorage unavailable (e.g. privacy mode) — fall back to showing it once per load
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
    }, 4000) // 4 second delay before auto-popup appears

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* HERO - Redesigned: two-column layout, copy left / floating stat panel right */}
      <section
        style={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          // Clears any fixed/sticky navbar. If your navbar has a different height,
          // adjust the 96px value below (or set a --navbar-height CSS var globally
          // and this will pick it up automatically).
          paddingTop: 'calc(var(--navbar-height, 96px) + 24px)',
          paddingBottom: 40,
          background: 'radial-gradient(circle at 20% 20%, rgba(245,158,11,0.14), transparent 50%), radial-gradient(circle at 85% 75%, rgba(124,58,237,0.14), transparent 50%), var(--bg, #0c0d11)',
        }}
      >
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* LEFT: primary message + CTAs */}
          <div>
            <span
              className="badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
                fontSize: 13,
                padding: '6px 16px',
                borderRadius: 100,
                background: 'rgba(245,158,11,0.1)',
                color: '#f59e0b',
                border: '1px solid rgba(245,158,11,0.3)',
                fontWeight: 700,
              }}
            >
              ⚡ Trusted IT Partner in Chennai
            </span>

            <h1 style={{ fontSize: 'clamp(32px, 5.2vw, 56px)', lineHeight: 1.1, marginBottom: 22, fontWeight: 800 }}>
              We Build Websites, SaaS &amp; AI Solutions That <span style={{ color: '#f59e0b' }}>Grow Your Business</span>
            </h1>

            <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', color: 'var(--text2, #9a9ba5)', marginBottom: 32, maxWidth: 540 }}>
              From high-converting websites to custom ERP and AI chatbots — Nexira Solution delivers results-driven digital products for growing businesses.
            </p>

            {/* Quick highlight row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
              {heroHighlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text2, #9a9ba5)' }}>
                  <span style={{ color: '#f59e0b', fontSize: 15 }}>{h.icon}</span>
                  {h.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-primary"
                style={{ fontSize: 17, padding: '18px 36px', border: 'none', cursor: 'pointer' }}
              >
                Get Free Quote <FaArrowRight />
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ background: '#25d366', color: '#fff', fontSize: 17, padding: '18px 36px', boxShadow: '0 0 30px rgba(37,211,102,0.3)' }}
              >
                <FaWhatsapp /> Chat on WhatsApp
              </a>
            </div>

            <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text2, #9a9ba5)' }}>
              ✅ Free Consultation &nbsp;•&nbsp; ✅ Response within 24 hours &nbsp;•&nbsp; ✅ 150+ Projects Delivered
            </p>
          </div>

          {/* RIGHT: floating glass panel with stats + services teaser (no images) */}
          <div
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border2, #2a2d36)',
              borderRadius: 24,
              padding: 28,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Why Nexira
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {stats.map(s => (
                <div
                  key={s.label}
                  style={{
                    background: 'var(--bg2, #14161c)',
                    border: '1px solid var(--border, #2a2d36)',
                    borderRadius: 14,
                    padding: '16px 14px',
                  }}
                >
                  <div style={{ color: '#f59e0b', fontSize: 16, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ color: 'var(--text2, #9a9ba5)', fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {services.slice(0, 4).map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text2, #9a9ba5)' }}>
                  <FaCheckCircle style={{ color: '#25d366', flexShrink: 0 }} />
                  {s.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-label">
            <span className="badge">⚡ What We Build</span>
            <h2>Our Services</h2>
            <p>End-to-end IT solutions designed to accelerate your business in the digital age.</p>
          </div>
          <div className="grid-3" style={{ gap: 24 }}>
            {services.map((s, i) => (
              <Link key={i} href="/services" style={{ display: 'block' }}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginBottom: 20 }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: 20, marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: 15 }}>{s.desc}</p>
                  <div style={{ marginTop: 20, color: s.color, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    Learn More <FaArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/services" className="btn btn-primary">View All Services <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="section-label">
            <span className="badge">⭐ Testimonials</span>
            <h2>What Our Clients Say</h2>
            <p>Real feedback from real clients who trust Nexira with their digital success.</p>
          </div>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card">
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, j) => <FaStar key={j} style={{ color: '#f59e0b' }} />)}
                </div>
                <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-glow)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: 18 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                    <div style={{ color: 'var(--text2)', fontSize: 13 }}>{t.company}</div>
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
          <div style={{ background: 'linear-gradient(135deg, var(--bg2), var(--surface))', border: '1px solid var(--border2)', borderRadius: 24, padding: 'clamp(40px, 6vw, 80px)', position: 'relative', overflow: 'hidden' }}>
            <div className="orb orb-blue" style={{ width: 300, height: 300, top: -100, right: -100 }} />
            <span className="badge" style={{ marginBottom: 24 }}>📞 Get In Touch</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 20 }}>Ready to Start Your Project?</h2>
            <p style={{ color: 'var(--text2)', marginBottom: 36, fontSize: 18, maxWidth: 500, margin: '0 auto 36px' }}>
              Contact us today for a free consultation and project estimate.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-primary"
                style={{ fontSize: 16, padding: '16px 32px', border: 'none', cursor: 'pointer' }}
              >
                Get Free Quote <FaArrowRight />
              </button>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25d366', color: '#fff', fontSize: 16, padding: '16px 32px', boxShadow: '0 0 30px rgba(37,211,102,0.3)' }}>
                <FaWhatsapp /> WhatsApp: 9384155672
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating sticky Quote button — only visible once scrolled past the hero,
          sits well below the navbar's z-index so it never overlaps or fights it */}
      <button
        onClick={() => setModalOpen(true)}
        aria-hidden={!showFloatingCta}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 40,
          background: '#f59e0b',
          color: '#111',
          border: 'none',
          borderRadius: 100,
          padding: '13px 20px',
          fontWeight: 700,
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 8px 24px rgba(245,158,11,0.35)',
          cursor: 'pointer',
          opacity: showFloatingCta ? 1 : 0,
          transform: showFloatingCta ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showFloatingCta ? 'auto' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        Get Free Quote <FaArrowRight size={12} />
      </button>

      {/* Responsive fallback: stack hero columns on narrower screens */}
      <style jsx global>{`
        @media (max-width: 860px) {
          section > .container[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}