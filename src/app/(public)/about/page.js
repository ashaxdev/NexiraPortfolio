import Link from 'next/link'
import { FaArrowRight, FaCheckCircle, FaLightbulb, FaRocket, FaUsers, FaCode, FaMedal } from 'react-icons/fa'

// ─── Advanced On-Page SEO Metadata ───────────────────────────────────────────
export const metadata = {
  // Primary Meta
  title: 'About Nexira Solution | IT Company in Chennai – Our Story & Team',
  description:
    'Nexira Solution is Chennai\'s leading IT company. Learn about our story, mission, core values, expert team, and 150+ successful projects in web development, ERP, SaaS & AI.',
  keywords: [
    'IT company Chennai',
    'software company Chennai',
    'web development Chennai',
    'ERP solutions Chennai',
    'AI solutions Chennai',
    'digital transformation Chennai',
    'SaaS development India',
    'Nexira Solution',
    'about Nexira',
  ],

  // Canonical
  alternates: {
    canonical: 'https://www.nexirasolution.in/about',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: 'https://www.nexirasolution.in/about',
    title: 'About Nexira Solution | IT Company in Chennai – Our Story & Team',
    description:
      'Chennai\'s premier IT partner. 150+ projects, 80+ clients, 5+ years of excellence in web, ERP, SaaS & AI development.',
    siteName: 'Nexira Solution',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.nexirasolution.in/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexira Solution – IT Company in Chennai',
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: 'summary_large_image',
    site: '@nexirasolution',
    creator: '@nexirasolution',
    title: 'About Nexira Solution | IT Company in Chennai',
    description:
      'Chennai\'s premier IT partner delivering websites, ERP, SaaS & AI solutions. 150+ projects. 99% client satisfaction.',
    images: ['https://www.nexirasolution.in/og-about.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (add your own tokens)
  // verification: { google: 'YOUR_TOKEN', bing: 'YOUR_TOKEN' },

  // Other
  authors: [{ name: 'Nexira Solution', url: 'https://www.nexirasolution.in' }],
  creator: 'Nexira Solution',
  publisher: 'Nexira Solution',
  category: 'Technology',
}

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.nexirasolution.in/#organization',
  name: 'Nexira Solution',
  url: 'https://www.nexirasolution.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.nexirasolution.in/logo.png',
    width: 200,
    height: 60,
  },
  image: 'https://www.nexirasolution.in/og-about.jpg',
  description:
    'Nexira Solution is a Chennai-based IT company specializing in web development, ERP systems, SaaS platforms, e-commerce, and AI solutions.',
  foundingDate: '2019',
  foundingLocation: {
    '@type': 'Place',
    name: 'Chennai, Tamil Nadu, India',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-9384155672',
      contactType: 'customer service',
      areaServed: ['IN'],
      availableLanguage: ['English', 'Tamil'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/nexirasolution',
    'https://twitter.com/nexirasolution',
    // add more social profiles
  ],
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 20 },
  knowsAbout: [
    'Web Development',
    'ERP Systems',
    'SaaS Platforms',
    'E-commerce Solutions',
    'Artificial Intelligence',
    'Mobile App Development',
  ],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://www.nexirasolution.in/about/#webpage',
  url: 'https://www.nexirasolution.in/about',
  name: 'About Nexira Solution | IT Company in Chennai',
  description:
    'Learn about Nexira Solution — our story, mission, values, and the expert team behind Chennai\'s leading IT company.',
  isPartOf: { '@id': 'https://www.nexirasolution.in/#website' },
  about: { '@id': 'https://www.nexirasolution.in/#organization' },
  breadcrumb: { '@id': 'https://www.nexirasolution.in/about/#breadcrumb' },
  inLanguage: 'en-IN',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://www.nexirasolution.in/about/#breadcrumb',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.nexirasolution.in',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About Us',
      item: 'https://www.nexirasolution.in/about',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where is Nexira Solution located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nexira Solution is based in Chennai, Tamil Nadu, India, serving clients across India and globally.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does Nexira Solution offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nexira Solution offers web development, ERP systems, SaaS platforms, e-commerce stores, mobile apps, and AI/ML solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many projects has Nexira Solution completed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nexira Solution has successfully completed 150+ projects for 80+ clients with a 99% client satisfaction rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Nexira Solution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reach Nexira Solution at +91 9384155672 or visit www.nexirasolution.in to get in touch via the contact form.',
      },
    },
  ],
}

// ─── Component Data ───────────────────────────────────────────────────────────
const values = [
  { icon: <FaLightbulb aria-hidden="true" />, title: 'Innovation First', desc: 'We embrace the latest technologies to deliver forward-thinking solutions.', color: '#f59e0b' },
  { icon: <FaMedal aria-hidden="true" />, title: 'Quality Driven', desc: 'Every line of code, every pixel — crafted to the highest standard.', color: '#00aaff' },
  { icon: <FaUsers aria-hidden="true" />, title: 'Client Centric', desc: 'Your success is our success. We build long-term partnerships.', color: '#10b981' },
  { icon: <FaRocket aria-hidden="true" />, title: 'Fast Delivery', desc: 'Agile methodology ensures we deliver on time, every time.', color: '#ec4899' },
]

const team = [
  { name: 'CEO & Founder', role: 'Visionary Leader', avatar: 'C', jobTitle: 'Chief Executive Officer' },
  { name: 'CTO', role: 'Technical Architect', avatar: 'T', jobTitle: 'Chief Technology Officer' },
  { name: 'Lead Designer', role: 'UX / UI Expert', avatar: 'D', jobTitle: 'Lead UX/UI Designer' },
  { name: 'AI Lead', role: 'ML / AI Specialist', avatar: 'A', jobTitle: 'AI/ML Engineer' },
]

const stats = [
  { n: '150+', l: 'Projects Delivered', label: 'Over 150 projects successfully delivered' },
  { n: '80+', l: 'Happy Clients', label: 'More than 80 satisfied clients' },
  { n: '5+', l: 'Years of Experience', label: 'Over 5 years in the industry' },
  { n: '99%', l: 'Client Satisfaction', label: '99 percent client satisfaction rate' },
]

const checklist = [
  'Expert team of developers & designers',
  'Proven track record with 150+ projects',
  'End-to-end digital transformation',
  'Post-launch support & maintenance',
]

// ─── Page Component ───────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Breadcrumb Nav (visible + semantic) ── */}
      <nav aria-label="Breadcrumb" style={{ paddingTop: 100, paddingBottom: 0 }}>
        <div className="container">
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: 'var(--text2)' }}
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" style={{ color: 'var(--text2)', textDecoration: 'none' }}>
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true" style={{ opacity: 0.5 }}>/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" style={{ color: 'var(--primary)' }}>About Us</span>
              <meta itemProp="position" content="2" />
              <link itemProp="item" href="https://www.nexirasolution.in/about" />
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{ paddingTop: 60, paddingBottom: 80, background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)', position: 'relative', overflow: 'hidden' }}
        aria-labelledby="about-heading"
      >
        <div className="orb orb-blue" style={{ width: 500, height: 500, top: -100, right: -100 }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>👋 Who We Are</span>
          <h1
            id="about-heading"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: 24, maxWidth: 700 }}
          >
            Transforming Ideas Into{' '}
            <span
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Digital Reality
            </span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 620, marginBottom: 36 }}>
            Nexira Solution is a Chennai-based IT company passionate about building innovative digital
            products that help businesses thrive in a connected world.
          </p>
          <Link href="/contact" className="btn btn-primary" aria-label="Work with Nexira Solution – Contact us">
            Work With Us <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <div>
              <span className="badge" style={{ marginBottom: 16 }}>📖 Our Story</span>
              <h2 id="story-heading" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 20 }}>
                Built on Passion for Technology
              </h2>
              <p style={{ color: 'var(--text2)', marginBottom: 20, lineHeight: 1.8 }}>
                Founded in Chennai, Nexira Solution started with a simple vision: to make enterprise-grade
                technology accessible to businesses of all sizes. What began as a small web development
                studio has grown into a full-service IT powerhouse.
              </p>
              <p style={{ color: 'var(--text2)', marginBottom: 28, lineHeight: 1.8 }}>
                Today, we specialize in websites, ERP systems, SaaS platforms, e-commerce stores, and
                cutting-edge AI solutions — serving clients across India and globally.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} aria-label="Key highlights">
                {checklist.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <FaCheckCircle style={{ color: 'var(--accent)', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ color: 'var(--text2)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats block – microdata */}
            <div
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 24, padding: 40, position: 'relative' }}
              itemScope
              itemType="https://schema.org/Organization"
            >
              <meta itemProp="name" content="Nexira Solution" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {stats.map((s) => (
                  <div
                    key={s.l}
                    style={{ textAlign: 'center', padding: 24, background: 'var(--bg3)', borderRadius: 16, border: '1px solid var(--border)' }}
                    role="figure"
                    aria-label={s.label}
                  >
                    <div
                      style={{ fontSize: 36, fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--primary)' }}
                      aria-hidden="true"
                    >
                      {s.n}
                    </div>
                    <div style={{ color: 'var(--text2)', fontSize: 14, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, padding: 20, background: 'var(--primary-glow)', border: '1px solid var(--border2)', borderRadius: 14, textAlign: 'center' }}>
                <FaCode style={{ color: 'var(--primary)', fontSize: 28, marginBottom: 8 }} aria-hidden="true" />
                <p style={{ color: 'var(--text)', fontWeight: 600 }}>Chennai&apos;s Premier IT Partner</p>
                <p style={{ color: 'var(--text2)', fontSize: 13 }}>
                  <Link href="https://www.nexirasolution.in" itemProp="url" style={{ color: 'inherit' }}>
                    www.nexirasolution.in
                  </Link>{' '}
                  |{' '}
                  <a href="tel:+919384155672" itemProp="telephone" style={{ color: 'inherit' }}>
                    +91 9384155672
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section" style={{ background: 'var(--bg2)' }} aria-labelledby="values-heading">
        <div className="container">
          <div className="section-label">
            <span className="badge">💡 Our Values</span>
            <h2 id="values-heading">What Drives Us</h2>
            <p>The principles that guide every decision, every project, every interaction.</p>
          </div>
          <div className="grid-4" role="list">
            {values.map((v, i) => (
              <article
                key={i}
                className="card"
                style={{ textAlign: 'center' }}
                role="listitem"
                aria-label={v.title}
              >
                <div
                  style={{ width: 60, height: 60, borderRadius: '50%', background: `${v.color}15`, border: `1px solid ${v.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color, fontSize: 26, margin: '0 auto 20px' }}
                  aria-hidden="true"
                >
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 14 }}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section" aria-labelledby="team-heading">
        <div className="container">
          <div className="section-label">
            <span className="badge">👥 The Team</span>
            <h2 id="team-heading">Meet Our Experts</h2>
            <p>A talented team of developers, designers, and strategists behind your success.</p>
          </div>
          <div className="grid-4" role="list">
            {team.map((m, i) => (
              <article
                key={i}
                className="card"
                style={{ textAlign: 'center' }}
                role="listitem"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div
                  style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: '#fff', margin: '0 auto 20px' }}
                  role="img"
                  aria-label={`${m.name} avatar`}
                >
                  {m.avatar}
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }} itemProp="jobTitle">{m.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 500 }} itemProp="description">
                  {m.role}
                </p>
                <meta itemProp="worksFor" content="Nexira Solution" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="section" style={{ background: 'var(--bg2)' }} aria-labelledby="mission-heading">
        <div className="container">
          <div
            style={{ background: 'linear-gradient(135deg, var(--bg3), var(--surface))', border: '1px solid var(--border2)', borderRadius: 24, padding: 60, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <div className="orb orb-blue" style={{ width: 300, height: 300, top: -100, left: -100 }} aria-hidden="true" />
            <h2
              id="mission-heading"
              style={{ fontSize: 'clamp(24px, 4vw, 40px)', marginBottom: 20, position: 'relative' }}
            >
              Our Mission
            </h2>
            <p
              style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 700, margin: '0 auto 36px', lineHeight: 1.8, position: 'relative' }}
              itemScope
              itemType="https://schema.org/Organization"
            >
              <span itemProp="description">
                To empower every business — startup or enterprise — with technology that is powerful,
                accessible, and built for growth. We believe great software changes lives, and we&apos;re
                here to build it.
              </span>
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/services" className="btn btn-primary" aria-label="View all services offered by Nexira Solution">
                Our Services <FaArrowRight aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn btn-outline" aria-label="Contact Nexira Solution">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section (SEO – answers faqSchema questions visually too) ── */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="section-label">
            <span className="badge">❓ FAQ</span>
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            <p>Quick answers about Nexira Solution.</p>
          </div>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {faqSchema.mainEntity.map((faq, i) => (
              <div
                key={i}
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px' }}
              >
                <dt style={{ fontWeight: 700, marginBottom: 10, fontSize: 16 }}>{faq.name}</dt>
                <dd style={{ color: 'var(--text2)', margin: 0, lineHeight: 1.7 }}>
                  {faq.acceptedAnswer.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}