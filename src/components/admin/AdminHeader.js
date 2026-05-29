'use client'
import { useSession } from 'next-auth/react'
import { FaBell, FaUser } from 'react-icons/fa'

export default function AdminHeader() {
  const { data: session } = useSession()
  const now = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <header style={{
      height: 64, background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ color: 'var(--text2)', fontSize: 13 }}>{now}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15 }}>
          <FaBell />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
            {session?.user?.name?.[0] || 'A'}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{session?.user?.name || 'Admin'}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}
