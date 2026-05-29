export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'

export const metadata = {
  title: 'Portfolio - Our Projects | Nexira Solution',
  description: 'Explore Nexira Solution\'s portfolio of websites, ERP systems, SaaS platforms, e-commerce stores, and AI projects delivered for clients.',
}

const categories = ['All', 'Web', 'E-Commerce', 'SaaS', 'ERP', 'AI', 'Mobile']

// const projects = [
//   { title: 'FashionHub E-Commerce', cat: 'E-Commerce', desc: 'Full-featured clothing store with payment gateway, inventory, and admin panel.', tags: ['Next.js', 'MongoDB', 'Stripe'], color: '#ef4444', emoji: '🛍️' },
//   { title: 'LogiCorp ERP', cat: 'ERP', desc: 'Enterprise resource planning for logistics with HR, finance, and inventory modules.', tags: ['React', 'Node.js', 'PostgreSQL'], color: '#f59e0b', emoji: '🏢' },
//   { title: 'TechHub SaaS', cat: 'SaaS', desc: 'Multi-tenant SaaS platform for project management with subscription billing.', tags: ['Next.js', 'Stripe', 'MongoDB'], color: '#7c3aed', emoji: '☁️' },
//   { title: 'SmartBot AI', cat: 'AI', desc: 'NLP-powered customer support chatbot with CRM integration and analytics.', tags: ['Python', 'OpenAI', 'FastAPI'], color: '#10b981', emoji: '🤖' },
//   { title: 'DesignStudio Portfolio', cat: 'Web', desc: 'Stunning portfolio for a design agency with animated gallery and contact.', tags: ['Next.js', 'Framer Motion'], color: '#00aaff', emoji: '🎨' },
//   { title: 'HealthCare Portal', cat: 'Web', desc: 'Patient management portal with appointment booking and health records.', tags: ['React', 'Node.js', 'MySQL'], color: '#ec4899', emoji: '🏥' },
//   { title: 'AutoAgent AI', cat: 'AI', desc: 'AI agent for e-commerce that handles orders, queries, and recommendations.', tags: ['Python', 'LangChain', 'FastAPI'], color: '#00ffd0', emoji: '⚡' },
//   { title: 'RealEstate Platform', cat: 'Web', desc: 'Property listing platform with search filters, maps, and inquiry forms.', tags: ['Next.js', 'Maps API', 'MongoDB'], color: '#f59e0b', emoji: '🏠' },
// ]

async function getPortfolio() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch portfolio')
    }

    return res.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function PortfolioPage() {
  const projects = await getPortfolio()



  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-purple" style={{ width: 400, height: 400, top: -100, right: -100 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>💼 Our Work</span>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: 24, maxWidth: 700 }}>
            Projects That{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Speak for Themselves
            </span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 600, marginBottom: 36 }}>
            150+ projects delivered. Here are some highlights from our journey in building digital excellence.
          </p>
        </div>
      </section>

      {/* Category Filter - Static for now, dynamic in admin */}
      {/* <section style={{ padding: '24px 0', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c} style={{
                padding: '8px 18px', borderRadius: 100,
                background: c === 'All' ? 'var(--primary)' : 'var(--bg3)',
                border: `1px solid ${c === 'All' ? 'var(--primary)' : 'var(--border)'}`,
                color: c === 'All' ? '#fff' : 'var(--text2)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Projects Grid */}
      <section className="section">
        <div className="container">
          {projects.length === 0 ? (
            <div
              className="card"
              style={{
                textAlign: 'center',
                padding: 60,
              }}
            >
              <h2>No projects found</h2>
            </div>
          ) : (
          <div className="grid-3" style={{ gap: 28 }}>
            {projects.map((p, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: 200, background: `linear-gradient(135deg, ${p.color}20, ${p.color}05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative', borderBottom: '1px solid var(--border)' }}>
                  {p.emoji}
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    <span className="tag">{p.category}</span>
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{p.description}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 6, background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <a href={p.liveUrl} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 14, fontWeight: 500 }}>
                      <FaExternalLinkAlt size={12} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 16 }}>Want to See Your Project Here?</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 32, fontSize: 17 }}>Let's build something remarkable together.</p>
          <Link href="/contact" className="btn btn-primary">Start Your Project <FaArrowRight /></Link>
        </div>
      </section>
    </>
  )
}
