import Link from 'next/link'
import { FaArrowRight, FaCheckCircle, FaLightbulb, FaRocket, FaUsers, FaCode, FaMedal } from 'react-icons/fa'

export const metadata = {
  title: 'About Us - Nexira Solution | IT Company in Chennai',
  description: 'Learn about Nexira Solution — our story, mission, values, and the team behind Chennai\'s leading IT company delivering digital transformation.',
}

const values = [
  { icon: <FaLightbulb />, title: 'Innovation First', desc: 'We embrace the latest technologies to deliver forward-thinking solutions.', color: '#f59e0b' },
  { icon: <FaMedal />, title: 'Quality Driven', desc: 'Every line of code, every pixel — crafted to the highest standard.', color: '#00aaff' },
  { icon: <FaUsers />, title: 'Client Centric', desc: 'Your success is our success. We build long-term partnerships.', color: '#10b981' },
  { icon: <FaRocket />, title: 'Fast Delivery', desc: 'Agile methodology ensures we deliver on time, every time.', color: '#ec4899' },
]

const team = [
  { name: 'CEO & Founder', role: 'Visionary Leader', avatar: 'C' },
  { name: 'CTO', role: 'Technical Architect', avatar: 'T' },
  { name: 'Lead Designer', role: 'UX / UI Expert', avatar: 'D' },
  { name: 'AI Lead', role: 'ML / AI Specialist', avatar: 'A' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-blue" style={{ width: 500, height: 500, top: -100, right: -100 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>👋 Who We Are</span>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: 24, maxWidth: 700 }}>
            Transforming Ideas Into{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Digital Reality
            </span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 620, marginBottom: 36 }}>
            Nexira Solution is a Chennai-based IT company passionate about building innovative digital products that help businesses thrive in a connected world.
          </p>
          <Link href="/contact" className="btn btn-primary">Work With Us <FaArrowRight /></Link>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <div>
              <span className="badge" style={{ marginBottom: 16 }}>📖 Our Story</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 20 }}>Built on Passion for Technology</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 20, lineHeight: 1.8 }}>
                Founded in Chennai, Nexira Solution started with a simple vision: to make enterprise-grade technology accessible to businesses of all sizes. What began as a small web development studio has grown into a full-service IT powerhouse.
              </p>
              <p style={{ color: 'var(--text2)', marginBottom: 28, lineHeight: 1.8 }}>
                Today, we specialize in websites, ERP systems, SaaS platforms, e-commerce stores, and cutting-edge AI solutions — serving clients across India and globally.
              </p>
              {['Expert team of developers & designers', 'Proven track record with 150+ projects', 'End-to-end digital transformation', 'Post-launch support & maintenance'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <FaCheckCircle style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text2)' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 24, padding: 40, position: 'relative' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                  { n: '150+', l: 'Projects' }, { n: '80+', l: 'Clients' },
                  { n: '5+', l: 'Years' }, { n: '99%', l: 'Satisfaction' },
                ].map(s => (
                  <div key={s.l} style={{ textAlign: 'center', padding: 24, background: 'var(--bg3)', borderRadius: 16, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 36, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--primary)' }}>{s.n}</div>
                    <div style={{ color: 'var(--text2)', fontSize: 14, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, padding: 20, background: 'var(--primary-glow)', border: '1px solid var(--border2)', borderRadius: 14, textAlign: 'center' }}>
                <FaCode style={{ color: 'var(--primary)', fontSize: 28, marginBottom: 8 }} />
                <p style={{ color: 'var(--text)', fontWeight: 600 }}>Chennai&apos;s Premier IT Partner</p>
                <p style={{ color: 'var(--text2)', fontSize: 13 }}>www.nexirasolution.in | +91 9384155672</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="section-label">
            <span className="badge">💡 Our Values</span>
            <h2>What Drives Us</h2>
            <p>The principles that guide every decision, every project, every interaction.</p>
          </div>
          <div className="grid-4">
            {values.map((v, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: `${v.color}15`, border: `1px solid ${v.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color, fontSize: 26, margin: '0 auto 20px' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 14 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-label">
            <span className="badge">👥 The Team</span>
            <h2>Meet Our Experts</h2>
            <p>A talented team of developers, designers, and strategists behind your success.</p>
          </div>
          <div className="grid-4">
            {team.map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: '#fff', margin: '0 auto 20px' }}>
                  {m.avatar}
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{m.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 500 }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, var(--bg3), var(--surface))', border: '1px solid var(--border2)', borderRadius: 24, padding: 60, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="orb orb-blue" style={{ width: 300, height: 300, top: -100, left: -100 }} />
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', marginBottom: 20, position: 'relative' }}>Our Mission</h2>
            <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 700, margin: '0 auto 36px', lineHeight: 1.8, position: 'relative' }}>
              To empower every business — startup or enterprise — with technology that is powerful, accessible, and built for growth. We believe great software changes lives, and we're here to build it.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/services" className="btn btn-primary">Our Services <FaArrowRight /></Link>
              <Link href="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
