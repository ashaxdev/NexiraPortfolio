'use client'
import { useState } from 'react'
import { FaSave, FaWhatsapp, FaGlobe, FaEnvelope, FaPhone } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [general, setGeneral] = useState({ siteName: 'Nexira Solution', tagline: 'IT Solutions & Digital Transformation', phone: '9384155672', email: 'info@nexirasolution.in', address: 'Madurai, Tamil Nadu, India', whatsapp: '919384155672', website: 'www.nexirasolution.in' })
  const [seo, setSeo] = useState({ title: 'Nexira Solution - IT Solutions | Web, AI, ERP & More', description: 'Leading IT company in Madurai offering websites, ERP, SaaS, AI agents, and chatbots.', keywords: 'IT company Madurai, web development, AI agents, ERP, SaaS' })
  const [social, setSocial] = useState({ linkedin: '', twitter: '', facebook: '', instagram: '' })
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    toast.success('Settings saved successfully!')
    setSaving(false)
  }

  const Section = ({ title, icon, children }) => (
    <div className="card" style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 18, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>{icon} {title}</h2>
      {children}
    </div>
  )

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div><h1 style={{ fontSize: 26, marginBottom: 4 }}>Settings</h1><p style={{ color: 'var(--text2)', fontSize: 14 }}>Manage your website configuration</p></div>
        <button className="btn btn-primary" onClick={save} disabled={saving}><FaSave /> {saving ? 'Saving...' : 'Save All'}</button>
      </div>

      <Section title="General Info" icon={<FaGlobe style={{ color: 'var(--primary)' }} />}>
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group"><label>Site Name</label><input className="input" value={general.siteName} onChange={e => setGeneral(p => ({ ...p, siteName: e.target.value }))} /></div>
          <div className="form-group"><label>Tagline</label><input className="input" value={general.tagline} onChange={e => setGeneral(p => ({ ...p, tagline: e.target.value }))} /></div>
          <div className="form-group"><label>Phone</label><input className="input" value={general.phone} onChange={e => setGeneral(p => ({ ...p, phone: e.target.value }))} /></div>
          <div className="form-group"><label>WhatsApp Number</label><input className="input" value={general.whatsapp} onChange={e => setGeneral(p => ({ ...p, whatsapp: e.target.value }))} placeholder="919384155672" /></div>
          <div className="form-group"><label>Email</label><input className="input" value={general.email} onChange={e => setGeneral(p => ({ ...p, email: e.target.value }))} /></div>
          <div className="form-group"><label>Website</label><input className="input" value={general.website} onChange={e => setGeneral(p => ({ ...p, website: e.target.value }))} /></div>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}><label>Address</label><input className="input" value={general.address} onChange={e => setGeneral(p => ({ ...p, address: e.target.value }))} /></div>
      </Section>

      <Section title="SEO Settings" icon={<span style={{ color: 'var(--primary)' }}>🔍</span>}>
        <div className="form-group"><label>Default Meta Title</label><input className="input" value={seo.title} onChange={e => setSeo(p => ({ ...p, title: e.target.value }))} /></div>
        <div className="form-group"><label>Default Meta Description</label><textarea className="input" value={seo.description} onChange={e => setSeo(p => ({ ...p, description: e.target.value }))} rows={3} /></div>
        <div className="form-group" style={{ marginBottom: 0 }}><label>Default Keywords</label><input className="input" value={seo.keywords} onChange={e => setSeo(p => ({ ...p, keywords: e.target.value }))} /></div>
      </Section>

      <Section title="Social Media" icon={<span style={{ color: 'var(--primary)' }}>🌐</span>}>
        <div className="grid-2" style={{ gap: 16 }}>
          {['linkedin', 'twitter', 'facebook', 'instagram'].map(s => (
            <div key={s} className="form-group">
              <label style={{ textTransform: 'capitalize' }}>{s}</label>
              <input className="input" value={social[s]} onChange={e => setSocial(p => ({ ...p, [s]: e.target.value }))} placeholder={`https://${s}.com/nexirasolution`} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="WhatsApp Integration" icon={<FaWhatsapp style={{ color: '#25d366' }} />}>
        <div style={{ background: 'rgba(37,211,102,0.05)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 8 }}>Current WhatsApp number: <strong style={{ color: '#25d366' }}>+91 {general.whatsapp}</strong></p>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>The floating WhatsApp button and all contact links use this number automatically.</p>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>WhatsApp Number (with country code)</label>
          <input className="input" value={general.whatsapp} onChange={e => setGeneral(p => ({ ...p, whatsapp: e.target.value }))} placeholder="919384155672" />
        </div>
      </Section>

      <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontSize: 16, color: '#ef4444', marginBottom: 8 }}>⚠️ Danger Zone</h3>
        <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 16 }}>These actions are irreversible. Please be certain.</p>
        <button className="btn" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', fontSize: 14 }} onClick={() => toast.error('Not implemented in demo')}>
          Reset All Data
        </button>
      </div>
    </div>
  )
}
