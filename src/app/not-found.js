import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', textAlign: 'center', padding: 24 }}>
      <div>
        <div style={{ fontSize: 'clamp(80px, 15vw, 160px)', fontFamily: 'var(--font-display)', fontWeight: 800, background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 24 }}>404</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', marginBottom: 16 }}>Page Not Found</h1>
        <p style={{ color: 'var(--text2)', fontSize: 17, marginBottom: 36 }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}>← Back to Home</Link>
      </div>
    </div>
  )
}
