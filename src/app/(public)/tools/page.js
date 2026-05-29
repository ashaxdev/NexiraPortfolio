export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { FaArrowRight, FaSearch, FaBolt, FaMagic, FaPalette, FaTag, FaFileInvoice, FaCheckCircle, FaGlobe, FaRobot, FaCloud, FaShoppingCart, FaDatabase, FaBriefcase, FaComments } from 'react-icons/fa'

export const metadata = {
  title: 'Free Online Tools - SEO, Speed Test, AI Content | Nexira Solution',
  description: 'Access free and premium online tools from Nexira Solution: SEO analyzer, website speed test, AI content generator, meta tag generator, and more.',
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

async function getTools() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tools`,{
      next: { revalidate: 60 },
      }
    )
    if (!res.ok) throw new Error('Failed to fetch Tools')
    return res.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function ToolsPage() {
  const tools = await getTools()
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-blue" style={{ width: 400, height: 400, top: -100, right: -100 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="badge" style={{ marginBottom: 20 }}>🛠️ Free Tools</span>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', marginBottom: 24, maxWidth: 700 }}>
            Powerful Tools for{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Digital Growth
            </span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 18, maxWidth: 600, marginBottom: 36 }}>
            Professional-grade online tools built by Nexira — many completely free, no signup required.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 15 }}>
              <FaCheckCircle style={{ color: 'var(--accent)' }} /> No Signup Required
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 15 }}>
              <FaCheckCircle style={{ color: 'var(--accent)' }} /> Instant Results
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section">
        <div className="container">
          {tools.length === 0 ? (
            <div
              className="card"
              style={{
                textAlign: 'center',
                padding: 60,
              }}
            >
              <h2>Coming Soon...</h2>
            </div>
          ) : (
          <div className="grid-3" style={{ gap: 28 }}>
            {tools.map((t, i) => {
              const IconComponent = iconMap[t.icon] || FaGlobe  // ✅ fixed: s → t
              return (
                <Link key={i} href={`/tools/${t.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <div className="card" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 16, right: 16 }}>
                      <span style={{ fontSize: 11, padding: '4px 12px', borderRadius: 100, background: t.free ? 'rgba(0,255,208,0.1)' : 'rgba(124,58,237,0.1)', color: t.free ? 'var(--accent)' : 'var(--accent2)', border: `1px solid ${t.free ? 'rgba(0,255,208,0.3)' : 'rgba(124,58,237,0.3)'}`, fontWeight: 700 }}>
                        {t.free ? '✓ FREE' : '★ PRO'}
                      </span>
                    </div>
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: `${t.color}15`, border: `1px solid ${t.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color, marginBottom: 20 }}>
                      <IconComponent size={32} />
                    </div>
                    <h3 style={{ fontSize: 20, marginBottom: 12 }}>{t.name}</h3>
                    <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{t.desc ?? t.description}</p>  {/* ✅ handles both field names */}
                    <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                      {t.features.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13, marginBottom: 8 }}>
                          <FaCheckCircle style={{ color: t.color, flexShrink: 0 }} /> {f}
                        </li>
                      ))}
                    </ul>
                    {/* ✅ "Use Tool" as its own visible link */}
                    <Link href={`/tools/${t.slug}`} style={{ color: t.color, fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                      Use Tool <FaArrowRight size={12} />
                    </Link>
                  </div>
                </Link>
              )
            })}
          </div>
          )}
        </div>
      </section>
    </>
  )
}