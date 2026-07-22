'use client';
import Link from 'next/link'
import Image from 'next/image'
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaInstagram, FaGlobe } from 'react-icons/fa'

const services = ['Website Development', 'ERP Solutions', 'SaaS Development', 'E-Commerce', 'AI Agents', 'AI Chatbots', 'Portfolio Sites']
const company = [
  { href: '/about', label: 'About Us' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
  { href: '/tools', label: 'Free Tools' },
]

const legal = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/sitemap.xml', label: 'Sitemap' },
]

const socials = [
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/company/nexira-solution/?viewAsMember=true' },
  { icon: <FaFacebook />, href: 'https://www.facebook.com/profile.php?id=61574328572608' },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/nexira_solution/' },
]

export default function Footer() {
  const wa = `https://wa.me/919384155672?text=Hi Nexira Solution, I need your help!`
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', marginTop: 0 }}>
      {/* CTA Banner */}
      <div style={{ background: 'linear-gradient(135deg, #fcffc4, #fcffc4)', borderBottom: '1px solid var(--border)', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: 16 }}>🚀 Ready to Build?</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 16 }}>Let's Build Something Amazing Together</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 32, fontSize: 17 }}>Turn your ideas into powerful digital solutions with Nexira.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FaWhatsapp /> WhatsApp Us
            </a>
            <Link href="/contact" className="btn btn-outline">Get Free Quote</Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Nexira Solution"
                width={200}
                height={200}
                priority
                style={{
                  objectFit: 'contain',
                }}
              />
            </Link>

            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Transforming businesses through innovative technology solutions. Your trusted IT partner in Chennai.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text2)', fontSize: 15, transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Services</h4>
            <ul style={{ listStyle: 'none' }}>
              {services.map(s => (
                <li key={s} style={{ marginBottom: 10 }}>
                  <Link href="/services" style={{ color: 'var(--text2)', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text2)'}
                  >→ {s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Company</h4>
            <ul style={{ listStyle: 'none' }}>
              {company.map(c => (
                <li key={c.href} style={{ marginBottom: 10 }}>
                  <Link href={c.href} style={{ color: 'var(--text2)', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text2)'}
                  >→ {c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Contact</h4>
            {[
              { icon: <FaPhone />, text: '+91 9384155672', href: 'tel:+919384155672' },
              { icon: <FaWhatsapp />, text: 'WhatsApp Us', href: wa },
              { icon: <FaEnvelope />, text: 'nexirasolution@gmail.com', href: 'mailto:nexirasolution@gmail.com' },
              { icon: <FaGlobe />, text: 'www.nexirasolution.in', href: 'https://www.nexirasolution.in' },
              { icon: <FaMapMarkerAlt />, text: 'Chennai, Tamil Nadu, India', href: '#' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, color: 'var(--text2)', fontSize: 14, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
              >
                <span style={{ color: 'var(--primary)', marginTop: 3, flexShrink: 0 }}>{item.icon}</span>
                {item.text}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>© {year} Nexira Solution. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {legal.map(l => (
              <Link key={l.href} href={l.href} style={{ color: 'var(--text3)', fontSize: 13 }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}