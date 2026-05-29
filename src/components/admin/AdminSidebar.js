'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaTachometerAlt, FaFileAlt, FaBriefcase, FaCog, FaUsers, FaBullhorn, FaTools, FaEnvelope, FaGlobe, FaSignOutAlt, FaChartLine } from 'react-icons/fa'
import { signOut } from 'next-auth/react'

const nav = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { href: '/admin/enquiries', label: 'Enquiries', icon: <FaEnvelope />, badge: true },
  { href: '/admin/blogs', label: 'Blog Posts', icon: <FaFileAlt /> },
  { href: '/admin/portfolio', label: 'Portfolio', icon: <FaBriefcase /> },
  { href: '/admin/services', label: 'Services', icon: <FaGlobe /> },
  { href: '/admin/careers', label: 'Careers', icon: <FaUsers /> },
  { href: '/admin/tools', label: 'Tools', icon: <FaTools /> },
  { href: '/admin/settings', label: 'Settings', icon: <FaCog /> },
]

export default function AdminSidebar() {
  const path = usePathname()

  return (
    <aside style={{
      width: 260, minHeight: '100vh', background: 'var(--bg2)',
      borderRight: '1px solid var(--border)', position: 'fixed',
      left: 0, top: 0, zIndex: 100, display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00aaff, #0044cc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff' }}>N</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff' }}>Nexira Admin</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Management Panel</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {nav.map(item => {
          const active = path === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', borderRadius: 10, marginBottom: 4,
              background: active ? 'var(--primary-glow)' : 'transparent',
              border: `1px solid ${active ? 'var(--border2)' : 'transparent'}`,
              color: active ? 'var(--primary)' : 'var(--text2)',
              fontSize: 14, fontWeight: active ? 600 : 400,
              transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
        <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', color: 'var(--text2)', fontSize: 14, marginBottom: 4 }}>
          <FaGlobe /> View Website
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/admin' })} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
          background: 'none', border: 'none', color: '#ef4444', fontSize: 14,
          cursor: 'pointer', width: '100%', borderRadius: 10,
          transition: 'background 0.2s',
        }}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </aside>
  )
}
