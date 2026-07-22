export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { FaArrowRight, FaWhatsapp, FaGlobe, FaRobot, FaCloud, FaShoppingCart, FaDatabase, FaBriefcase, FaComments, FaCheckCircle } from 'react-icons/fa'

export const metadata = {
  title: 'Services - Web Development, AI, ERP, SaaS | Nexira Solution',
  description: 'Nexira Solution offers website development, landing pages, ERP, SaaS, e-commerce, AI agents, and AI chatbots. Premium IT services in Chennai.',
  alternates: {
    canonical: 'https://www.nexirasolution.in/services',
  },
}

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

// Approximate INR -> USD rate. Update this periodically or wire it up to a live FX API if you want it always accurate.
const USD_RATE = 87

// Flat markup added to every converted USD price.
const USD_MARKUP = 1000

// Parses a string like "Starting ₹15,000" and returns both the original INR text
// and a formatted USD equivalent for visitors browsing from outside India.
function getPriceDisplay(price) {
  if (!price) return { inr: price, usd: null }

  const match = price.match(/[\d,]+/)
  if (!match) return { inr: price, usd: null }

  const num = parseInt(match[0].replace(/,/g, ''), 10)
  if (isNaN(num) || num <= 0) return { inr: price, usd: null }

  const usdValue = num / USD_RATE + USD_MARKUP
  let usdFormatted
  if (usdValue >= 1000) {
    usdFormatted = `$${(usdValue / 1000).toFixed(1)}k`
  } else {
    // round to nearest 5 for a cleaner-looking number
    usdFormatted = `$${(Math.round(usdValue / 5) * 5).toLocaleString('en-US')}`
  }

  return { inr: price, usd: usdFormatted }
}

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
              const IconComponent = iconMap[s.icon] || FaGlobe
              const serviceColor = s.color || defaultColors[i % defaultColors.length]
              const { inr, usd } = getPriceDisplay(s.price)

              return (
                <div
                  key={i}
                  className="card service-card"
                  style={{
                    border: `1px solid ${serviceColor}20`,
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  }}
                >
                  {/* LEFT */}
                  <div className="service-left">
                    {/* ICON */}
                    <div
                      className="service-icon"
                      style={{
                        background: `${serviceColor}15`,
                        border: `1px solid ${serviceColor}30`,
                        color: serviceColor,
                        boxShadow: `0 10px 30px ${serviceColor}20`,
                      }}
                    >
                      <IconComponent size={32} />
                    </div>

                    {/* CONTENT */}
                    <div className="service-content">
                      <h2 className="service-title">
                        {s.title}
                      </h2>

                      <p className="service-desc">
                        {s.description}
                      </p>

                      {/* FEATURES */}
                      <div className="service-features">
                        {s.features?.map((f) => (
                          <div
                            key={f}
                            className="service-feature-pill"
                            style={{
                              background: `${serviceColor}10`,
                              border: `1px solid ${serviceColor}20`,
                            }}
                          >
                            <FaCheckCircle style={{ color: serviceColor }} />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="service-right">
                    <div className="service-price" style={{ color: serviceColor }}>
                      {inr}
                    </div>
                    {usd && (
                      <div className="service-price-usd">
                        ~{usd} USD
                      </div>
                    )}

                    <a
                      href={`https://wa.me/919384155672?text=${encodeURIComponent(
                        `Hi, I'm interested in your *${s.title}* service!\n\n` +
                        `📦 *Service:* ${s.title}\n` +
                        `💰 *Price:* ${s.price}${usd ? ` (~${usd} USD)` : ''}\n` +
                        `Could you please provide more details?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary service-cta"
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

      <style>{`
        .service-card {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: center;
          padding: 32px;
          transition: 0.3s ease;
        }

        .service-left {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        .service-icon {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .service-content {
          flex: 1;
          min-width: 0;
        }

        .service-title {
          font-size: clamp(22px, 2.5vw, 30px);
          margin-bottom: 12px;
        }

        .service-desc {
          color: var(--text2);
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .service-features {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .service-feature-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 13px;
          color: var(--text2);
          white-space: nowrap;
        }

        .service-right {
          text-align: right;
          min-width: 180px;
        }

        .service-price {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .service-price-usd {
          font-size: 14px;
          font-weight: 600;
          color: var(--text2);
          opacity: 0.85;
          margin-bottom: 20px;
        }

        .service-cta {
          display: inline-flex;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .service-card {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 24px;
          }

          .service-right {
            text-align: left;
            min-width: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
          }

          .service-price-usd {
            margin-bottom: 0;
          }

          .service-cta {
            width: auto;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .service-card {
            padding: 20px;
            gap: 20px;
          }

          .service-left {
            gap: 16px;
          }

          .service-icon {
            width: 56px;
            height: 56px;
            border-radius: 16px;
          }

          .service-icon svg {
            width: 24px;
            height: 24px;
          }

          .service-title {
            margin-bottom: 8px;
          }

          .service-desc {
            font-size: 14px;
            margin-bottom: 16px;
          }

          .service-feature-pill {
            font-size: 12px;
            padding: 6px 12px;
          }

          .service-right {
            flex-direction: column;
            align-items: flex-start;
          }

          .service-price {
            font-size: 22px;
          }

          .service-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}