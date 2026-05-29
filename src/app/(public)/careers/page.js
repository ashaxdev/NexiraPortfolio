export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { FaArrowRight, FaWhatsapp, FaMapMarkerAlt, FaBriefcase, FaClock } from 'react-icons/fa'

export const metadata = {
  title: 'Careers - Join Nexira Solution | IT Jobs in Chennai',
  description: 'Join Nexira Solution — a fast-growing IT company in Chennai. Explore open positions in web development, AI, design, and more.',
}

// const openings = [
//   { title: 'Full Stack Developer', dept: 'Engineering', type: 'Full-time', loc: 'Madurai / Remote', desc: 'Build scalable web apps using Next.js, Node.js, and MongoDB. 2+ years experience required.', tags: ['Next.js', 'Node.js', 'MongoDB'] },
//   { title: 'UI/UX Designer', dept: 'Design', type: 'Full-time', loc: 'Madurai', desc: 'Design beautiful, user-centered interfaces for web and mobile applications.', tags: ['Figma', 'Tailwind', 'Prototyping'] },
//   { title: 'AI/ML Engineer', dept: 'AI', type: 'Full-time', loc: 'Remote', desc: 'Work on NLP models, AI agents, and intelligent chatbot systems.', tags: ['Python', 'LangChain', 'OpenAI'] },
//   { title: 'Digital Marketing Executive', dept: 'Marketing', type: 'Full-time', loc: 'Madurai', desc: 'Drive online growth through SEO, content marketing, and paid campaigns.', tags: ['SEO', 'Google Ads', 'Analytics'] },
//   { title: 'Business Development Executive', dept: 'Sales', type: 'Full-time', loc: 'Madurai', desc: 'Identify and acquire new clients for our IT services portfolio.', tags: ['Sales', 'CRM', 'Communication'] },
//   { title: 'React Native Developer', dept: 'Engineering', type: 'Contract', loc: 'Remote', desc: 'Build cross-platform mobile applications using React Native.', tags: ['React Native', 'TypeScript', 'REST APIs'] },
// ]

const typeColors = { 'Full-time': '#10b981', 'Part-time': '#f59e0b', 'Contract': '#7c3aed', 'Internship': '#00aaff' }

const wa = 'https://wa.me/919384155672?text=Hi, I want to apply for a position at Nexira!'


async function getCareers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/careers`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch careers')
    }

    return res.json()
  } catch (error) {
    console.log(error)
    return []
  }
}


export default async function CareersPage() {
  const openings = await getCareers()

  return (
    <>
      {/* Hero */}

        <section style={{ paddingTop: 140, paddingBottom: 80, background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-blue" style={{ width: 400, height: 400, top: -100, right: -100 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>🚀 Join Our Team</span>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: 24, maxWidth: 700 }}>
            Build the Future of{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Technology
            </span>{' '}With Us
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 600, marginBottom: 36 }}>
            We're looking for talented, passionate individuals who want to make a real impact. Join Nexira Solution and shape the digital future.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="section">
        <div className="container">
          <div className="section-label">
            <span className="badge">💡 Perks & Culture</span>
            <h2>Why Join Nexira?</h2>
          </div>
          <div className="grid-4">
            {[
              { emoji: '💰', title: 'Competitive Pay', desc: 'Industry-leading salaries and performance bonuses.' },
              { emoji: '🌍', title: 'Remote Friendly', desc: 'Flexible work from home options for most roles.' },
              { emoji: '📈', title: 'Growth Track', desc: 'Clear career paths and learning opportunities.' },
              { emoji: '🎯', title: 'Meaningful Work', desc: 'Work on projects that make a real difference.' },
            ].map(p => (
              <div key={p.title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.emoji}</div>
                <h3 style={{ fontSize: 18, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 14 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section
        id="jobs"
        className="section"
        style={{
          background: 'var(--bg2)',
        }}
      >
        <div className="container">
          <div className="section-label">
            <span className="badge">📋 Open Positions</span>

            <h2>Current Opportunities</h2>

            <p
              style={{
                color: 'var(--text2)',
              }}
            >
              {openings.length} positions available
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 24,
            }}
          >
            {openings.map((job, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 32,
                  borderRadius: 28,
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: '1px solid var(--border2)',
                  transition: '0.3s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 30,
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        flexWrap: 'wrap',
                        marginBottom: 14,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 28,
                          margin: 0,
                        }}
                      >
                        {job.title}
                      </h3>

                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: 100,
                          fontSize: 12,
                          fontWeight: 700,
                          background: `${typeColors[job.type]}15`,
                          color: typeColors[job.type],
                          border: `1px solid ${typeColors[job.type]}30`,
                        }}
                      >
                        {job.type}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: 20,
                        flexWrap: 'wrap',
                        marginBottom: 18,
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          color: 'var(--text2)',
                          fontSize: 14,
                        }}
                      >
                        <FaBriefcase size={12} />
                        {job.department}
                      </span>

                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          color: 'var(--text2)',
                          fontSize: 14,
                        }}
                      >
                        <FaMapMarkerAlt size={12} />
                        {job.location}
                      </span>

                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          color: 'var(--text2)',
                          fontSize: 14,
                        }}
                      >
                        <FaClock size={12} />
                        Active Hiring
                      </span>
                    </div>

                    <p
                      style={{
                        color: 'var(--text2)',
                        lineHeight: 1.9,
                        marginBottom: 22,
                        fontSize: 15,
                      }}
                    >
                      {job.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        flexWrap: 'wrap',
                      }}
                    >
                      {job.requirements?.map((item) => (
                        <span
                          key={item}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 100,
                            fontSize: 13,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border2)',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <a
                      href={`${wa} - ${job.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Apply Now
                      <FaArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 48, background: 'var(--bg)', border: '1px solid var(--border2)', borderRadius: 20, padding: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h3 style={{ fontSize: 22, marginBottom: 8 }}>Don't see your role?</h3>
              <p style={{ color: 'var(--text2)' }}>Send us your resume anyway — we're always looking for talented people.</p>
            </div>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FaWhatsapp /> Send Your Resume
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
