export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { FaArrowRight, FaClock, FaUser } from 'react-icons/fa'

// ─── Advanced SEO Metadata ────────────────────────────────────────────────────
export const metadata = {
  title: 'Blog - Tech Insights & Developer Guides | Nexira Solution',
  description:
    'Expert articles on web development, AI, ERP, SaaS, digital marketing, and technology trends from the Nexira Solution team. Stay ahead with actionable guides.',
  keywords: [
    'web development blog',
    'AI articles',
    'ERP guides',
    'SaaS insights',
    'SEO tips',
    'e-commerce development',
    'Nexira Solution blog',
    'tech insights',
    'digital transformation',
    'software development tutorials',
  ],
  authors: [{ name: 'Nexira Team', url: 'https://nexirasolution.in/about' }],
  creator: 'Nexira Solution',
  publisher: 'Nexira Solution',
  category: 'Technology',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nexirasolution.in/blog',
  },
  openGraph: {
    title: 'Blog - Tech Insights & Developer Guides | Nexira Solution',
    description:
      'Expert articles on web development, AI, ERP, SaaS, digital marketing, and technology trends from the Nexira Solution team.',
    url: 'https://nexirasolution.in/blog',
    siteName: 'Nexira Solution',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nexirasolution.in/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexira Solution Blog – Tech Insights & Developer Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Tech Insights & Developer Guides | Nexira Solution',
    description:
      'Expert articles on web development, AI, ERP, SaaS, and digital marketing from the Nexira Solution team.',
    site: '@nexirasolution',
    creator: '@nexirasolution',
    images: ['https://nexirasolution.in/og-blog.jpg'],
  },
}

// ─── Category colour map ──────────────────────────────────────────────────────
const catColors = {
  AI: '#10b981',
  'Web Dev': '#00aaff',
  ERP: '#f59e0b',
  SaaS: '#7c3aed',
  SEO: '#ec4899',
  'E-Commerce': '#ef4444',
}

// ─── Data fetching ────────────────────────────────────────────────────────────
async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?published=true`,
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error('Failed to fetch blogs')
    return res.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

// ─── JSON-LD structured data helpers ─────────────────────────────────────────
function buildBlogListingJsonLd(posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Nexira Solution Blog',
    description:
      'Expert articles on web development, AI, ERP, SaaS, digital marketing, and technology trends.',
    url: 'https://nexirasolution.in/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Nexira Solution',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nexirasolution.in/logo.png',
      },
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      url: `https://nexirasolution.in/blog/${p.slug}`,
      author: {
        '@type': 'Organization',
        name: 'Nexira Team',
        url: 'https://nexirasolution.in/about',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Nexira Solution',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nexirasolution.in/logo.png',
        },
      },
      datePublished: p.publishedAt || p.createdAt,
      dateModified: p.updatedAt || p.publishedAt || p.createdAt,
      articleSection: p.category,
      timeRequired: p.readTime,
      ...(p.coverImage && {
        image: {
          '@type': 'ImageObject',
          url: p.coverImage,
          width: 1200,
          height: 630,
        },
      }),
    })),
  }
}

function buildBreadcrumbJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nexirasolution.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://nexirasolution.in/blog',
      },
    ],
  }
}

function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nexira Solution',
    url: 'https://nexirasolution.in',
    logo: 'https://nexirasolution.in/logo.png',
    sameAs: [
      'https://twitter.com/nexirasolution',
      'https://linkedin.com/company/nexirasolution',
    ],
  }
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default async function BlogPage() {
  const posts = await getBlogs()

  const blogListingJsonLd = buildBlogListingJsonLd(posts)
  const breadcrumbJsonLd = buildBreadcrumbJsonLd()
  const organizationJsonLd = buildOrganizationJsonLd()

  return (
    <>
      {/* ── Structured Data (JSON-LD) ──────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* ── Semantic Breadcrumb (visible + accessible) ─────────────────── */}
      <nav
        aria-label="Breadcrumb"
        style={{
          paddingTop: 100,
          paddingBottom: 0,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          style={{
            display: 'flex',
            gap: 8,
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: 13,
            color: 'var(--text3)',
          }}
        >
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href="/"
              itemProp="item"
              style={{ color: 'var(--text3)', textDecoration: 'none' }}
            >
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true">/</li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name" style={{ color: 'var(--primary)' }}>
              Blog
            </span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="blog-hero-heading"
        style={{
          paddingTop: 60,
          paddingBottom: 80,
          background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="orb orb-blue"
          style={{ width: 400, height: 400, top: -100, left: -100 }}
          aria-hidden="true"
        />

        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>
            📝 Knowledge Hub
          </span>

          {/* H1 – primary keyword-rich heading */}
          <h1
            id="blog-hero-heading"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              marginBottom: 24,
              maxWidth: 700,
            }}
          >
            Tech Insights &amp; Guides from the{' '}
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

          {/* Semantic description – supports E-E-A-T */}
          <p
            style={{
              color: 'var(--text2)',
              fontSize: 18,
              maxWidth: 600,
            }}
          >
            Expert articles on web development, AI, ERP, SaaS, and digital
            growth strategies — written by engineers and consultants who build
            these systems every day.
          </p>
        </div>
      </section>

      {/* ── Blog Grid ─────────────────────────────────────────────────────── */}
      <section
        className="section"
        aria-label="Blog posts"
        itemScope
        itemType="https://schema.org/Blog"
      >
        <div className="container">
          {/* Screen-reader-only count for accessibility */}
          <p className="sr-only" aria-live="polite">
            {posts.length} article{posts.length !== 1 ? 's' : ''} found
          </p>

          <div className="grid-3" style={{ gap: 28 }} role="list">
            {posts.map((p, i) => (
              <article
                key={p.slug || i}
                role="listitem"
                itemScope
                itemType="https://schema.org/BlogPosting"
                style={{ display: 'contents' }}
              >
                {/* Hidden machine-readable metadata per post */}
                <meta itemProp="headline" content={p.title} />
                <meta itemProp="description" content={p.excerpt} />
                <meta
                  itemProp="datePublished"
                  content={p.publishedAt || p.createdAt}
                />
                <meta
                  itemProp="dateModified"
                  content={p.updatedAt || p.publishedAt || p.createdAt}
                />
                <meta itemProp="articleSection" content={p.category} />
                <link
                  itemProp="url"
                  href={`https://nexirasolution.in/blog/${p.slug}`}
                />
                <span
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <meta itemProp="name" content="Nexira Team" />
                </span>
                <span
                  itemProp="publisher"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <meta itemProp="name" content="Nexira Solution" />
                </span>

                <Link
                  href={`/blog/${p.slug}`}
                  style={{ display: 'block' }}
                  aria-label={`Read article: ${p.title}`}
                >
                  <div
                    className="card"
                    style={{
                      padding: 0,
                      overflow: 'hidden',
                      height: '100%',
                    }}
                  >
                    {/* Decorative colour bar – category signal */}
                    <div
                      style={{
                        height: 12,
                        background: `linear-gradient(90deg, ${
                          catColors[p.category] || 'var(--primary)'
                        }, transparent)`,
                      }}
                      aria-hidden="true"
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
                        {/* Keyword-rich category tag */}
                        <span
                          aria-label={`Category: ${p.category}`}
                          style={{
                            fontSize: 12,
                            padding: '4px 12px',
                            borderRadius: 100,
                            background: `${
                              catColors[p.category] || 'var(--primary)'
                            }15`,
                            color: catColors[p.category] || 'var(--primary)',
                            border: `1px solid ${
                              catColors[p.category] || 'var(--primary)'
                            }30`,
                            fontWeight: 600,
                          }}
                        >
                          {p.category}
                        </span>
                      </div>

                      {/* H2 per card – correct heading hierarchy */}
                      <h2
                        itemProp="name"
                        style={{
                          fontSize: 18,
                          marginBottom: 12,
                          lineHeight: 1.4,
                        }}
                      >
                        {p.title}
                      </h2>

                      <p
                        itemProp="description"
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
                            <FaUser size={11} aria-hidden="true" />
                            <span itemProp="author">Nexira Team</span>
                          </span>

                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                            }}
                          >
                            <FaClock size={11} aria-hidden="true" />
                            <time
                              itemProp="timeRequired"
                              dateTime={p.readTime}
                              aria-label={`Reading time: ${p.readTime}`}
                            >
                              {p.readTime}
                            </time>
                          </span>
                        </div>

                        <span
                          aria-hidden="true"
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
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* ── Newsletter ──────────────────────────────────────────────────── */}
          <aside
            aria-label="Newsletter signup"
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
              Stay Updated on Tech Trends
            </h2>

            <p
              style={{
                color: 'var(--text2)',
                marginBottom: 28,
                fontSize: 16,
              }}
            >
              Get the latest web development, AI, and SaaS insights delivered
              to your inbox — no spam, ever.
            </p>

            {/* Use a real form for crawlability + accessibility */}
            <form
              action="/api/newsletter"
              method="POST"
              style={{
                display: 'flex',
                gap: 12,
                maxWidth: 440,
                margin: '0 auto',
                flexWrap: 'wrap',
              }}
              aria-label="Newsletter subscription form"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                className="input"
                placeholder="your@email.com"
                required
                autoComplete="email"
                aria-required="true"
                style={{ flex: 1, minWidth: 200 }}
              />

              <button
                type="submit"
                className="btn btn-primary"
                aria-label="Subscribe to newsletter"
              >
                Subscribe <FaArrowRight size={12} aria-hidden="true" />
              </button>
            </form>
          </aside>
        </div>
      </section>

      {/* ── Screen-reader utility class ──────────────────────────────────── */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </>
  )
}