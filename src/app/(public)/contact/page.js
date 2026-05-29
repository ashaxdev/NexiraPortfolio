'use client'
import { useState } from 'react'
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'

const services = ['Website / Landing Page', 'Portfolio', 'ERP Solution', 'SaaS Development', 'E-Commerce', 'AI Agents', 'AI Chatbot', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess(true)
        toast.success('Message sent! We\'ll contact you soon.')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
      } else toast.error('Failed to send. Please try again.')
    } catch { toast.error('Something went wrong.') }
    setLoading(false)
  }

  const wa = 'https://wa.me/919384155672?text=Hi Nexira Solution, I need a quote!'

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-blue" style={{ width: 400, height: 400, top: -100, right: -100 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>📞 Get In Touch</span>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: 24, maxWidth: 700 }}>
            Let&apos;s Build Something{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Amazing
            </span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 600 }}>
            Ready to transform your business? Contact us for a free consultation and project estimate.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="grid-2" style={{ gap: 60, alignItems: 'start' }}>
            {/* Form */}
            <div className="card">
              <h2 style={{ fontSize: 26, marginBottom: 8 }}>Send Us a Message</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 28, fontSize: 15 }}>Fill out the form and we'll get back to you within 24 hours.</p>

              {success && (
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, padding: 20, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <FaCheckCircle style={{ color: '#10b981', fontSize: 22 }} />
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Message Sent!</div>
                    <div style={{ color: 'var(--text2)', fontSize: 14 }}>We'll reach out within 24 hours. Or WhatsApp us for instant response.</div>
                  </div>
                </div>
              )}

              <form onSubmit={submit}>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input className="input" name="name" value={form.name} onChange={handle} placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input className="input" name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="form-group">
                    <label>Phone</label>
                    <input className="input" name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXXXXXXX" />
                  </div>
                  <div className="form-group">
                    <label>Service Required</label>
                    <select className="input" name="service" value={form.service} onChange={handle} style={{ appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea className="input" name="message" value={form.message} onChange={handle} placeholder="Tell us about your project, timeline, and budget..." required rows={5} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px' }}>
                  {loading ? 'Sending...' : 'Send Message'} <FaArrowRight />
                </button>
              </form>
            </div>

            {/* Info */}
            <div>
              <div className="card" style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, marginBottom: 20 }}>Contact Information</h3>
                {[
                  { icon: <FaPhone />, label: 'Phone', value: '+91 9384155672', href: 'tel:+919384155672', color: '#00aaff' },
                  { icon: <FaWhatsapp />, label: 'WhatsApp', value: 'Chat with us now', href: wa, color: '#25d366' },
                  { icon: <FaEnvelope />, label: 'Email', value: 'nexirasolution@gmail.com', href: 'mailto:nexirasolution@gmail.com', color: '#f59e0b' },
                  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Chennai, Tamil Nadu, India', href: '#', color: '#ec4899' },
                ].map((item, i) => (
                  <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', color: 'inherit', transition: 'all 0.2s' }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a href={wa} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                <div style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)', borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <FaWhatsapp style={{ fontSize: 40, color: '#fff', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>WhatsApp for Instant Reply</div>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>Get a response in minutes. +91 9384155672</div>
                  </div>
                </div>
              </a>

              {/* Hours */}
              <div className="card" style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 18, marginBottom: 16 }}>Working Hours</h3>
                {[
                  { day: 'Mon – Fri', time: '9:00 AM – 7:00 PM' },
                  { day: 'Saturday', time: '10:00 AM – 5:00 PM' },
                  { day: 'Sunday', time: 'WhatsApp Support' },
                ].map(h => (
                  <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                    <span style={{ color: 'var(--text2)' }}>{h.day}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
