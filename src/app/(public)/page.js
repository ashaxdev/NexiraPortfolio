import Link from 'next/link'
import { FaArrowRight, FaPlay, FaWhatsapp, FaGlobe, FaRobot, FaCloud, FaShoppingCart, FaDatabase, FaBriefcase, FaComments, FaCheckCircle, FaStar, FaUsers, FaProjectDiagram, FaAward, FaSearch, FaBolt, FaMagic, FaPalette, FaTag, FaFileInvoice } from 'react-icons/fa'

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

// const tools = [
//   { icon: <FaSearch />, name: 'SEO Analyzer', desc: 'Check your SEO score', href: '/tools/seo-analyzer', free: true },
//   { icon: <FaBolt />, name: 'Speed Test', desc: 'Test website performance', href: '/tools/speed-test', free: true },
//   { icon: <FaMagic />, name: 'AI Content', desc: 'Generate content with AI', href: '/tools/ai-content', free: false },
//   { icon: <FaPalette />, name: 'Color Palette', desc: 'Design beautiful palettes', href: '/tools/color-palette', free: true },
//   { icon: <FaTag />, name: 'Meta Generator', desc: 'Create SEO meta tags', href: '/tools/meta-tags', free: true },
//   { icon: <FaFileInvoice />, name: 'Invoice Builder', desc: 'Create professional invoices', href: '/tools/invoice', free: true },
// ]

const testimonials = [
  { name: 'Raj Kumar', company: 'TechStartup India', text: 'Nexira built our entire SaaS platform. Exceptional quality, on time, and great support. Highly recommend!', rating: 5 },
  { name: 'Priya S.', company: 'FashionHub', text: 'Our e-commerce store saw 200% increase in conversions after Nexira redesigned it. Amazing work!', rating: 5 },
  { name: 'Mohammed A.', company: 'LogiCorp', text: 'The ERP they built transformed our operations. We saved 40% in operational costs. Outstanding!', rating: 5 },
]

const wa = 'https://wa.me/919384155672?text=Hi, I am interested in your services!'

export const metadata = {
  title: 'Nexira Solution - IT Solutions | Web, AI, ERP & More | Chennai',
  description: 'Nexira Solution - Leading IT company in Chennai. We build websites, ERP, SaaS, e-commerce, AI agents, and chatbots. Transform your business today.',
}

export default function HomePage() {
  return (
    <>
      {/* HERO - Video Background */}
      {/* HERO - Video Background */}
<section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
  {/* Desktop Video */}
  <video
    autoPlay muted loop playsInline
    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
    className="video-desktop"
  >
    <source src="/videos/nexira1.mp4" type="video/mp4" />
  </video>

  {/* Mobile Video */}
  <video
    autoPlay muted loop playsInline
    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
    className="video-mobile"
  >
    <source src="/videos/nexira1.mp4" type="video/mp4" />
  </video>

  
</section>
      {/* STATS */}
      <section style={{ padding: '60px 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid-4">
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ color: 'var(--primary)', fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: 'var(--text2)', marginTop: 8, fontSize: 15 }}>{s.label}</div>
              </div>
            ))}
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

      {/* TOOLS */}
      {/* <section className="section" style={{ background: 'var(--bg2)' }} id="tools">
        <div className="container">
          <div className="section-label">
            <span className="badge">🛠️ Free Tools</span>
            <h2>Our Online Tools</h2>
            <p>Powerful tools to help grow your digital presence — many completely free.</p>
          </div>
          <div className="grid-3">
            {tools.map((t, i) => (
              <Link key={i} href={t.href} style={{ display: 'block' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-glow)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: 22, flexShrink: 0 }}>
                    {t.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <h3 style={{ fontSize: 17, margin: 0 }}>{t.name}</h3>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: t.free ? 'rgba(0,255,208,0.1)' : 'rgba(124,58,237,0.1)', color: t.free ? 'var(--accent)' : 'var(--accent2)', border: `1px solid ${t.free ? 'rgba(0,255,208,0.3)' : 'rgba(124,58,237,0.3)'}`, fontWeight: 700 }}>
                        {t.free ? 'FREE' : 'PRO'}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text2)', fontSize: 14, margin: 0 }}>{t.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/tools" className="btn btn-outline">Explore All Tools <FaArrowRight /></Link>
          </div>
        </div>
      </section> */}

      {/* PORTFOLIO PREVIEW */}
      {/* <section className="section">
        <div className="container">
          <div className="section-label">
            <span className="badge">💼 Our Work</span>
            <h2>Featured Projects</h2>
            <p>A glimpse into the digital experiences we have crafted for our clients.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { title: 'E-Commerce Platform', cat: 'E-Commerce', color: '#ef4444' },
              { title: 'SaaS Dashboard', cat: 'SaaS', color: '#7c3aed' },
              { title: 'AI Chatbot System', cat: 'AI', color: '#10b981' },
              { title: 'Corporate ERP', cat: 'ERP', color: '#f59e0b' },
            ].map((p, i) => (
              <div key={i} className="card" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ height: 180, background: `linear-gradient(135deg, ${p.color}20, ${p.color}05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, borderBottom: '1px solid var(--border)' }}>
                  🖥️
                </div>
                <div style={{ padding: 24 }}>
                  <span className="tag" style={{ marginBottom: 10 }}>{p.cat}</span>
                  <h3 style={{ fontSize: 18, marginTop: 10 }}>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/portfolio" className="btn btn-primary">See All Projects <FaArrowRight /></Link>
          </div>
        </div>
      </section> */}

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
              <Link href="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>
                Get Free Quote <FaArrowRight />
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25d366', color: '#fff', fontSize: 16, padding: '16px 32px', boxShadow: '0 0 30px rgba(37,211,102,0.3)' }}>
                <FaWhatsapp /> WhatsApp: 9384155672
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
