export const dynamic = 'force-dynamic'
import Link from 'next/link'

import { FaArrowRight, FaClock, FaUser, FaImage } from 'react-icons/fa'

export const metadata = {
  title: 'Blog - Tech Insights & Guides | Nexira Solution',
  description:
    'Read expert articles on web development, AI, ERP, SaaS, digital marketing, and technology trends from the Nexira Solution team.',
  alternates: {
    canonical: 'https://www.nexirasolution.in/blog',
  },
}

const catColors = {
  AI: '#10b981',
  'Web Dev': '#00aaff',
  ERP: '#f59e0b',
  SaaS: '#7c3aed',
  SEO: '#ec4899',
  'E-Commerce': '#ef4444',
}

async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?published=true`,
      {
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch blogs')
    }

    return res.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogs()

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: 120,
          paddingBottom: 60,
          background:
            'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="orb orb-blue"
          style={{ width: 400, height: 400, top: -100, left: -100 }}
        />

        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>
            📝 Knowledge Hub
          </span>

          <h1
            style={{
              fontSize: 'clamp(30px, 6vw, 64px)',
              marginBottom: 20,
              maxWidth: 700,
            }}
          >
            Insights from the{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nexira Team
            </span>
          </h1>

          <p
            style={{
              color: 'var(--text2)',
              fontSize: 17,
              maxWidth: 600,
            }}
          >
            Expert articles on web development, AI, ERP, SaaS, and digital
            growth strategies.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          {posts.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 60 }}>
              <h2>No blog posts yet</h2>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map((p, i) => (
                <Link
                  key={p._id || i}
                  href={`/blog/${p.slug}`}
                  style={{ display: 'block' }}
                >
                  <article className="blog-card">
                    <div className="blog-img-frame">
                      {p.image ? (
                        <img src={p.image} alt={p.title} loading="lazy" />
                      ) : (
                        <div className="blog-img-placeholder">
                          <FaImage size={28} />
                        </div>
                      )}
                      <span
                        className="blog-category"
                        style={{
                          background: `${catColors[p.category] || 'var(--primary)'}15`,
                          color: catColors[p.category] || 'var(--primary)',
                          border: `1px solid ${catColors[p.category] || 'var(--primary)'}30`,
                        }}
                      >
                        {p.category}
                      </span>
                    </div>

                    <div className="blog-body">
                      <h2 className="blog-title">{p.title}</h2>
                      <p className="blog-excerpt">{p.excerpt}</p>

                      <div className="blog-meta">
                        <div className="blog-meta-left">
                          <span className="blog-meta-item">
                            <FaUser size={11} />
                            {p.author || 'Nexira Team'}
                          </span>
                          {p.readTime && (
                            <span className="blog-meta-item">
                              <FaClock size={11} />
                              {p.readTime}
                            </span>
                          )}
                        </div>

                        <span className="blog-read-link">
                          Read <FaArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter */}
          <div
            style={{
              marginTop: 60,
              background: 'var(--bg2)',
              border: '1px solid var(--border2)',
              borderRadius: 24,
              padding: 48,
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(22px, 3vw, 34px)',
                marginBottom: 16,
              }}
            >
              Stay Updated
            </h2>

            <p
              style={{
                color: 'var(--text2)',
                marginBottom: 28,
                fontSize: 16,
              }}
            >
              Get the latest tech insights delivered to your inbox — no spam,
              ever.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 12,
                maxWidth: 440,
                margin: '0 auto',
                flexWrap: 'wrap',
              }}
            >
              <input
                type="email"
                className="input"
                placeholder="your@email.com"
                style={{ flex: 1, minWidth: 200 }}
              />

              <button className="btn btn-primary">
                Subscribe <FaArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .blog-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .blog-card:hover {
          border-color: var(--primary);
          transform: translateY(-3px);
        }

        .blog-img-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: var(--bg3);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .blog-img-placeholder {
          color: var(--text2);
          opacity: 0.5;
        }

        .blog-category {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 100px;
          font-weight: 600;
        }

        .blog-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .blog-title {
          font-size: 18px;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .blog-excerpt {
          color: var(--text2);
          font-size: 14px;
          line-height: 1.65;
          margin-bottom: 20px;
          flex: 1;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 16px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .blog-meta-left {
          display: flex;
          gap: 16px;
          color: var(--text3);
          font-size: 13px;
          flex-wrap: wrap;
        }

        .blog-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .blog-read-link {
          color: var(--primary);
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .blog-body {
            padding: 18px;
          }

          .blog-title {
            font-size: 16px;
          }

          .blog-excerpt {
            font-size: 13.5px;
          }
        }
      `}</style>
    </>
  )
}