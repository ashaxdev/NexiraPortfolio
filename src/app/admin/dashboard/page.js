import { FaEnvelope, FaFileAlt, FaBriefcase, FaUsers, FaArrowRight, FaArrowUp } from 'react-icons/fa'
import Link from 'next/link'

async function getStats() {
  try {
    const base = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const [enq, blogs, portfolio, careers] = await Promise.all([
      fetch(`${base}/api/enquiries`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${base}/api/blogs`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${base}/api/portfolio`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${base}/api/careers`, { cache: 'no-store' }).then(r => r.json()),
    ])
    return {
      enquiries: Array.isArray(enq) ? enq.length : 0,
      newEnquiries: Array.isArray(enq) ? enq.filter(e => e.status === 'new').length : 0,
      blogs: Array.isArray(blogs) ? blogs.length : 0,
      portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
      careers: Array.isArray(careers) ? careers.length : 0,
      recentEnquiries: Array.isArray(enq) ? enq.slice(0, 5) : [],
    }
  } catch {
    return { enquiries: 0, newEnquiries: 0, blogs: 0, portfolio: 0, careers: 0, recentEnquiries: [] }
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Enquiries', value: stats.enquiries, sub: `${stats.newEnquiries} new`, icon: <FaEnvelope />, color: '#00aaff', href: '/admin/enquiries' },
    { label: 'Blog Posts', value: stats.blogs, sub: 'Published articles', icon: <FaFileAlt />, color: '#7c3aed', href: '/admin/blogs' },
    { label: 'Portfolio Items', value: stats.portfolio, sub: 'Projects showcased', icon: <FaBriefcase />, color: '#10b981', href: '/admin/portfolio' },
    { label: 'Job Openings', value: stats.careers, sub: 'Active positions', icon: <FaUsers />, color: '#f59e0b', href: '/admin/careers' },
  ]

  const statusColors = { new: '#00aaff', read: '#f59e0b', replied: '#10b981', closed: 'var(--text3)' }

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Dashboard</h1>
        <p style={{ color: 'var(--text2)' }}>Welcome back! Here's what's happening with your website.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 40 }}>
        {cards.map((c, i) => (
          <Link key={i} href={c.href} style={{ display: 'block' }}>
            <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}15`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, fontSize: 20 }}>{c.icon}</div>
                <FaArrowUp style={{ color: '#10b981', fontSize: 12 }} />
              </div>
              <div style={{ fontSize: 36, fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{c.value}</div>
              <div style={{ color: 'var(--text2)', fontSize: 13, marginTop: 6, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: c.color, fontSize: 12, fontWeight: 500 }}>{c.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 28, alignItems: 'start' }}>
        {/* Recent Enquiries */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18 }}>Recent Enquiries</h2>
            <Link href="/admin/enquiries" style={{ color: 'var(--primary)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>View all <FaArrowRight size={11} /></Link>
          </div>
          {stats.recentEnquiries.length === 0 ? (
            <p style={{ color: 'var(--text3)', textAlign: 'center', padding: '24px 0' }}>No enquiries yet</p>
          ) : stats.recentEnquiries.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < stats.recentEnquiries.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{e.name}</div>
                <div style={{ color: 'var(--text3)', fontSize: 12 }}>{e.email} · {e.service || 'General'}</div>
              </div>
              <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${statusColors[e.status]}15`, color: statusColors[e.status], border: `1px solid ${statusColors[e.status]}30`, textTransform: 'uppercase' }}>{e.status}</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <div className="card" style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, marginBottom: 20 }}>Quick Actions</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                { label: 'Write New Blog Post', href: '/admin/blogs', color: '#7c3aed' },
                { label: 'Add Portfolio Project', href: '/admin/portfolio', color: '#10b981' },
                { label: 'Post Job Opening', href: '/admin/careers', color: '#f59e0b' },
                { label: 'Add New Tool', href: '/admin/tools', color: '#00aaff' },
                { label: 'Manage Services', href: '/admin/services', color: '#ec4899' },
              ].map(a => (
                <Link key={a.href} href={a.href} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 10, background: 'var(--bg3)',
                  border: '1px solid var(--border)', color: '#fff', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.2s',
                }}>
                  {a.label}
                  <FaArrowRight style={{ color: a.color }} size={13} />
                </Link>
              ))}
            </div>
          </div>

          {/* Website Info */}
          <div className="card">
            <h2 style={{ fontSize: 16, marginBottom: 16 }}>Website Info</h2>
            {[
              { label: 'Domain', value: 'www.nexirasolution.in' },
              { label: 'Phone', value: '+91 9384155672' },
              { label: 'Location', value: 'Madurai, Tamil Nadu' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text3)' }}>{item.label}</span>
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
