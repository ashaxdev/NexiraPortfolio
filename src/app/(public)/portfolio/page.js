export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { FaArrowRight, FaExternalLinkAlt, FaImage } from 'react-icons/fa'

export const metadata = {
  title: 'Portfolio - Our Projects | Nexira Solution',
  description: 'Explore Nexira Solution\'s portfolio of websites, ERP systems, SaaS platforms, e-commerce stores, and AI projects delivered for clients.',
  alternates: {
    canonical: 'https://www.nexirasolution.in/portfolio',
  },
}

async function getPortfolio() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio`,
      {
        cache: 'no-store',
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
      <section style={{ paddingTop: 120, paddingBottom: 60, background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-purple" style={{ width: 400, height: 400, top: -100, right: -100 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>💼 Our Work</span>
          <h1 style={{ fontSize: 'clamp(30px, 6vw, 64px)', marginBottom: 20, maxWidth: 700 }}>
            Projects That{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Speak for Themselves
            </span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 17, maxWidth: 600, marginBottom: 8 }}>
            150+ projects delivered. Here are some highlights from our journey in building digital excellence.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          {projects.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 60 }}>
              <h2>No projects found</h2>
            </div>
          ) : (
            <div className="portfolio-grid">
              {projects.map((p, i) => (
                <div key={p._id || i} className="portfolio-card">
                  <div className="portfolio-img-frame">
                    {p.image ? (
                      <img src={p.image} alt={p.title} loading="lazy" />
                    ) : (
                      <div className="portfolio-img-placeholder">
                        <FaImage size={32} />
                      </div>
                    )}
                    <span className="tag portfolio-category">{p.category}</span>
                    {p.featured && <span className="portfolio-featured">⭐ Featured</span>}
                  </div>

                  <div className="portfolio-body">
                    <h3 className="portfolio-title">{p.title}</h3>
                    <p className="portfolio-desc">{p.description}</p>

                    {p.tags?.length > 0 && (
                      <div className="portfolio-tags">
                        {p.tags.map(t => (
                          <span key={t} className="portfolio-tag">{t}</span>
                        ))}
                      </div>
                    )}

                    {p.liveUrl && (
                      
                       <a href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-link"
                      >
                        <FaExternalLinkAlt size={12} /> Live Demo
                      </a>
                    )}
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
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', marginBottom: 16 }}>Want to See Your Project Here?</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 32, fontSize: 16 }}>Let's build something remarkable together.</p>
          <Link href="/contact" className="btn btn-primary">Start Your Project <FaArrowRight /></Link>
        </div>
      </section>

      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .portfolio-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .portfolio-card:hover {
          border-color: var(--primary);
          transform: translateY(-3px);
        }

        .portfolio-img-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: var(--bg3);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portfolio-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .portfolio-img-placeholder {
          color: var(--text2);
          opacity: 0.5;
        }

        .portfolio-category {
          position: absolute;
          top: 12px;
          right: 12px;
        }

        .portfolio-featured {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #f59e0b;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
        }

        .portfolio-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .portfolio-title {
          font-size: 17px;
          margin-bottom: 8px;
        }

        .portfolio-desc {
          color: var(--text2);
          font-size: 14px;
          line-height: 1.55;
          margin-bottom: 14px;
          flex: 1;
        }

        .portfolio-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }

        .portfolio-tag {
          font-size: 11.5px;
          padding: 3px 9px;
          border-radius: 6px;
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--text2);
        }

        .portfolio-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
          font-size: 14px;
          font-weight: 500;
          width: fit-content;
        }

        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .portfolio-body {
            padding: 16px;
          }

          .portfolio-title {
            font-size: 16px;
          }

          .portfolio-desc {
            font-size: 13.5px;
          }
        }
      `}</style>
    </>
  )
}