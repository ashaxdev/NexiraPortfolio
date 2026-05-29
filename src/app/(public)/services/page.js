import Link from 'next/link'
import { FaArrowRight, FaWhatsapp, FaGlobe, FaRobot, FaCloud, FaShoppingCart, FaDatabase, FaBriefcase, FaComments, FaCheckCircle } from 'react-icons/fa'

export const metadata = {
  title: 'Services - Web Development, AI, ERP, SaaS | Nexira Solution',
  description: 'Nexira Solution offers website development, landing pages, ERP, SaaS, e-commerce, AI agents, and AI chatbots. Premium IT services in Chennai.',
}

// const services = [
//   {
//     icon: <FaGlobe size={32} />, title: 'Website & Landing Page', color: '#00aaff',
//     desc: 'High-converting, SEO-optimized websites and landing pages built with modern tech stacks for maximum performance.',
//     features: ['Responsive Design', 'SEO Optimized', 'CMS Integration', 'Fast Loading', 'Custom Domain', 'SSL Certificate'],
//     price: 'Starting ₹15,000',
//   },
//   {
//     icon: <FaBriefcase size={32} />, title: 'Portfolio Websites', color: '#7c3aed',
//     desc: 'Professional portfolio websites that showcase your skills and work to attract the right clients and employers.',
//     features: ['Custom Design', 'Project Gallery', 'Contact Forms', 'Social Links', 'Blog Section', 'Mobile Ready'],
//     price: 'Starting ₹8,000',
//   },
//   {
//     icon: <FaDatabase size={32} />, title: 'ERP Solutions', color: '#00ffd0',
//     desc: 'Complete Enterprise Resource Planning systems that unify finance, HR, inventory, sales, and operations.',
//     features: ['Multi-module', 'Real-time Reports', 'Role-based Access', 'Cloud Hosted', 'API Integration', 'Custom Workflow'],
//     price: 'Starting ₹80,000',
//   },
//   {
//     icon: <FaCloud size={32} />, title: 'SaaS Development', color: '#f59e0b',
//     desc: 'Scalable Software as a Service products with multi-tenant architecture and subscription billing.',
//     features: ['Multi-tenant', 'Subscription Billing', 'Analytics Dashboard', 'API First', 'Scalable Infra', 'Onboarding Flow'],
//     price: 'Starting ₹1,50,000',
//   },
//   {
//     icon: <FaShoppingCart size={32} />, title: 'E-Commerce', color: '#ef4444',
//     desc: 'Full-featured online stores with payment gateway, inventory management, and seamless checkout.',
//     features: ['Payment Gateway', 'Inventory Mgmt', 'Order Tracking', 'Admin Panel', 'Reviews & Ratings', 'Email Notifications'],
//     price: 'Starting ₹30,000',
//   },
//   {
//     icon: <FaRobot size={32} />, title: 'AI Agents', color: '#10b981',
//     desc: 'Intelligent AI agents that autonomously handle complex business workflows, decisions, and automation.',
//     features: ['Task Automation', 'Natural Language', 'API Integration', '24/7 Operation', 'Custom Training', 'Analytics'],
//     price: 'Starting ₹50,000',
//   },
//   {
//     icon: <FaComments size={32} />, title: 'AI Chatbots', color: '#ec4899',
//     desc: 'Smart conversational AI chatbots for customer support, lead generation, and engagement on your platforms.',
//     features: ['NLP Powered', 'Multi-platform', 'CRM Integration', 'Live Handoff', 'Analytics', 'Custom Training'],
//     price: 'Starting ₹25,000',
//   },
// ]

const iconMap = {
  FaGlobe,
  FaRobot,
  FaCloud,
  FaShoppingCart,
  FaDatabase,
  FaBriefcase,
  FaComments,
}
/* DEFAULT COLORS */
const defaultColors = [
  
  '#fac83d',
  
]

const wa = 'https://wa.me/919384155672?text=Hi, I want to discuss a project!'

async function getServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`,
      {
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch services')
    }

    return res.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

// export default async function PortfolioPage() {
  

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-blue" style={{ width: 400, height: 400, top: -100, right: -100 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>⚡ What We Offer</span>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: 24, maxWidth: 700 }}>
            Digital Services That{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Deliver Results
            </span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 600, marginBottom: 36 }}>
            From concept to launch and beyond — we cover every aspect of your digital journey with expertise and passion.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FaWhatsapp /> Get a Quote
            </a>
            <Link href="/portfolio" className="btn btn-outline">View Portfolio <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gap: 32 }}>
            {services.map((s, i) => {
              const IconComponent =
                iconMap[s.icon] || FaGlobe

              const serviceColor =
                s.color || defaultColors[i % defaultColors.length]

              return (
                <div
                  key={i}
                  className="card"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 32,
                    alignItems: 'center',
                    padding: '32px',
                    border: `1px solid ${serviceColor}20`,
                    background:
                      'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    transition: '0.3s ease',
                  }}
                >
                  {/* LEFT */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 24,
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* ICON */}
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 20,
                        background: `${serviceColor}15`,
                        border: `1px solid ${serviceColor}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: serviceColor,
                        flexShrink: 0,
                        boxShadow: `0 10px 30px ${serviceColor}20`,
                      }}
                    >
                      <IconComponent size={32} />
                    </div>

                    {/* CONTENT */}
                    <div style={{ flex: 1 }}>
                      <h2
                        style={{
                          fontSize: 'clamp(22px, 2.5vw, 30px)',
                          marginBottom: 12,
                        }}
                      >
                        {s.title}
                      </h2>

                      <p
                        style={{
                          color: 'var(--text2)',
                          fontSize: 15,
                          lineHeight: 1.8,
                          marginBottom: 24,
                        }}
                      >
                        {s.description}
                      </p>

                      {/* FEATURES */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 12,
                        }}
                      >
                        {s.features?.map((f) => (
                          <div
                            key={f}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '8px 14px',
                              borderRadius: 999,
                              background: `${serviceColor}10`,
                              border: `1px solid ${serviceColor}20`,
                              fontSize: 13,
                              color: 'var(--text2)',
                            }}
                          >
                            <FaCheckCircle
                              style={{ color: serviceColor }}
                            />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div
                    style={{
                      textAlign: 'right',
                      minWidth: 180,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 800,
                        color: serviceColor,
                        marginBottom: 20,
                      }}
                    >
                      {s.price}
                    </div>

                    <a
                      href={`https://wa.me/919384155672?text=${encodeURIComponent(
    `Hi, I'm interested in your *${s.title}* service!\n\n` +
    `📦 *Service:* ${s.title}\n` +
    `💰 *Price:* ${s.price}\n` +
    
    `Could you please provide more details?`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
  style={{
    background: serviceColor,
    border: 'none',
    whiteSpace: 'nowrap',
  }}
>
  Get Started <FaArrowRight size={12} />
</a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="section-label">
            <span className="badge">🔄 How We Work</span>
            <h2>Our Process</h2>
            <p>A proven 4-step process that ensures your project is delivered on time and exceeds expectations.</p>
          </div>
          <div className="grid-4">
            {[
              { step: '01', title: 'Discovery', desc: 'We understand your goals, audience, and requirements.' },
              { step: '02', title: 'Design', desc: 'We craft wireframes and visual designs for your approval.' },
              { step: '03', title: 'Development', desc: 'Our team builds with clean code and best practices.' },
              { step: '04', title: 'Launch & Support', desc: 'We deploy, test, and provide ongoing maintenance.' },
            ].map(p => (
              <div key={p.step} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--primary)', opacity: 0.4, marginBottom: 8 }}>{p.step}</div>
                <h3 style={{ fontSize: 20, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 14 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
