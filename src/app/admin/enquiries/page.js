'use client'
import { useState, useEffect } from 'react'
import { FaTrash, FaEnvelope, FaWhatsapp, FaPhone, FaCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'

const statusColors = { new: '#00aaff', read: '#f59e0b', replied: '#10b981', closed: 'var(--text3)' }
const statuses = ['new', 'read', 'replied', 'closed']

export default function EnquiriesPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetch('/api/enquiries').then(r => r.json()).then(setItems).finally(() => setLoading(false)) }, [])

  const updateStatus = async (id, status) => {
    await fetch(`/api/enquiries/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    setItems(prev => prev.map(i => i._id === id ? { ...i, status } : i))
    if (selected?._id === id) setSelected(p => ({ ...p, status }))
    toast.success('Status updated')
  }

  const deleteItem = async id => {
    if (!confirm('Delete this enquiry?')) return
    await fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
    setItems(prev => prev.filter(i => i._id !== id))
    if (selected?._id === id) setSelected(null)
    toast.success('Deleted')
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Enquiries</h1>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>{items.filter(i => i.status === 'new').length} new · {items.length} total</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', ...statuses].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${filter === s ? 'var(--primary)' : 'var(--border)'}`, background: filter === s ? 'var(--primary-glow)' : 'var(--bg2)', color: filter === s ? 'var(--primary)' : 'var(--text2)', fontSize: 13, cursor: 'pointer', textTransform: 'capitalize' }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 24, alignItems: 'start' }}>
        {/* List */}
        <div className="card" style={{ padding: 0 }}>
          {loading ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--text2)' }}>Loading...</div> :
            filtered.length === 0 ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--text3)' }}>No enquiries found</div> :
            filtered.map((item, i) => (
              <div key={item._id} onClick={() => setSelected(item)} style={{
                padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer', background: selected?._id === item._id ? 'var(--primary-glow)' : 'transparent',
                transition: 'background 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>{item.name?.[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                      <div style={{ color: 'var(--text3)', fontSize: 12 }}>{item.email}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 10, fontWeight: 700, background: `${statusColors[item.status]}15`, color: statusColors[item.status], border: `1px solid ${statusColors[item.status]}30`, textTransform: 'uppercase' }}>{item.status}</span>
                    <button onClick={e => { e.stopPropagation(); deleteItem(item._id) }} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 13 }}><FaTrash /></button>
                  </div>
                </div>
                <p style={{ color: 'var(--text2)', fontSize: 13, marginLeft: 48, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.message}</p>
              </div>
            ))
          }
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="card" style={{ position: 'sticky', top: 88 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 17 }}>Enquiry Detail</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--primary-glow)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: 22, marginBottom: 16 }}>{selected.name?.[0]}</div>
            <h2 style={{ fontSize: 20, marginBottom: 4 }}>{selected.name}</h2>
            <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 20 }}>Enquired about: <strong>{selected.service || 'General'}</strong></p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <a href={`mailto:${selected.email}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: 13, padding: '10px' }}><FaEnvelope /> Email</a>
              {selected.phone && <a href={`https://wa.me/91${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn" style={{ flex: 1, justifyContent: 'center', fontSize: 13, padding: '10px', background: '#25d366', color: '#fff' }}><FaWhatsapp /></a>}
              {selected.phone && <a href={`tel:${selected.phone}`} className="btn btn-outline" style={{ justifyContent: 'center', fontSize: 13, padding: '10px 14px' }}><FaPhone /></a>}
            </div>

            <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7 }}>{selected.message}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8, display: 'block' }}>UPDATE STATUS</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {statuses.map(s => (
                  <button key={s} onClick={() => updateStatus(selected._id, s)} style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${selected.status === s ? statusColors[s] : 'var(--border)'}`, background: selected.status === s ? `${statusColors[s]}15` : 'var(--bg3)', color: selected.status === s ? statusColors[s] : 'var(--text2)', fontSize: 12, cursor: 'pointer', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {selected.status === s && <FaCheck size={10} />} {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'var(--text3)' }}>
              Received: {new Date(selected.createdAt).toLocaleString('en-IN')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
