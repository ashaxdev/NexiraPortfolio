import Link from 'next/link'

import { FaArrowRight, FaClock, FaUser } from 'react-icons/fa'

export const metadata = {
  title: 'Blog - Tech Insights & Guides | Nexira Solution',
  description:
    'Read expert articles on web development, AI, ERP, SaaS, digital marketing, and technology trends from the Nexira Solution team.',
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
        next: { revalidate: 60 },
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
          paddingTop: 140,
          paddingBottom: 80,
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
              fontSize: 'clamp(36px, 6vw, 64px)',
              marginBottom: 24,
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
              fontSize: 18,
              maxWidth: 600,
            }}
          >
            Expert articles on web development, AI, ERP, SaaS, and digital
            growth strategies.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ gap: 28 }}>
            {posts.map((p, i) => (
              <Link
                key={i}
                href={`/blog/${p.slug}`}
                style={{ display: 'block' }}
              >
                <article
                  className="card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      height: 12,
                      background: `linear-gradient(90deg, ${
                        catColors[p.category] || 'var(--primary)'
                      }, transparent)`,
                    }}
                  />

                  <div style={{ padding: 28 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          padding: '4px 12px',
                          borderRadius: 100,
                          background: `${
                            catColors[p.category] || 'var(--primary)'
                          }15`,
                          color:
                            catColors[p.category] || 'var(--primary)',
                          border: `1px solid ${
                            catColors[p.category] || 'var(--primary)'
                          }30`,
                          fontWeight: 600,
                        }}
                      >
                        {p.category}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: 18,
                        marginBottom: 12,
                        lineHeight: 1.4,
                      }}
                    >
                      {p.title}
                    </h2>

                    <p
                      style={{
                        color: 'var(--text2)',
                        fontSize: 14,
                        lineHeight: 1.7,
                        marginBottom: 20,
                      }}
                    >
                      {p.excerpt}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid var(--border)',
                        paddingTop: 16,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: 16,
                          color: 'var(--text3)',
                          fontSize: 13,
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <FaUser size={11} />
                          Nexira Team
                        </span>

                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <FaClock size={11} />
                          {p.readTime}
                        </span>
                      </div>

                      <span
                        style={{
                          color: 'var(--primary)',
                          fontSize: 13,
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        Read <FaArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div
            style={{
              marginTop: 80,
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
    </>
  )
}