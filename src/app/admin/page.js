'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async e => {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await signIn('credentials', { ...form, redirect: false })
    if (res?.ok) router.push('/admin/dashboard')
    else setError('Invalid credentials. Please try again.')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-blue" style={{ width: 500, height: 500, top: -200, right: -200 }} />
      <div className="orb orb-purple" style={{ width: 400, height: 400, bottom: -200, left: -200 }} />

      <div style={{ width: '100%', maxWidth: 440, padding: 24, position: 'relative' }}>
        <div className="card" style={{ padding: 48 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #00aaff, #0044cc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#fff', margin: '0 auto 16px' }}>N</div>
            <h1 style={{ fontSize: 24, marginBottom: 8 }}>Admin Portal</h1>
            <p style={{ color: 'var(--text2)', fontSize: 14 }}>Nexira Solution Management</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: 14, marginBottom: 20, color: '#ef4444', fontSize: 14 }}>
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: 15 }} />
                <input className="input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="admin@nexirasolution.in" required style={{ paddingLeft: 44 }} />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <FaLock style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: 15 }} />
                <input className="input" type={show ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" required style={{ paddingLeft: 44, paddingRight: 44 }} />
                <button type="button" onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer' }}>
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: 16, marginTop: 8 }}>
              {loading ? 'Signing In...' : 'Sign In to Admin'}
            </button>
          </form>

          <p style={{ color: 'var(--text3)', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
            First time? Visit <code style={{ color: 'var(--primary)' }}>/api/seed</code> to initialize the database
          </p>
        </div>
      </div>
    </div>
  )
}
