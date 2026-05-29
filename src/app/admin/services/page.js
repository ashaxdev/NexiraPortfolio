'use client'
import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaToggleOn, FaToggleOff } from 'react-icons/fa'
import toast from 'react-hot-toast'

const empty = { title: '', description: '', icon: 'FaCode', features: '', price: '', order: 0, active: true }

export default function ServicesAdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => fetch('/api/services').then(r => r.json()).then(setItems).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit = item => { setForm({ ...item, features: Array.isArray(item.features) ? item.features.join('\n') : '' }); setEditing(item._id); setModal(true) }

  const save = async e => {
    e.preventDefault(); setSaving(true)
    const body = { ...form, features: form.features ? form.features.split('\n').map(f => f.trim()).filter(Boolean) : [] }
    const url = editing ? `/api/services/${editing}` : '/api/services'
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { toast.success('Saved!'); setModal(false); load() } else toast.error('Failed')
    setSaving(false)
  }

  const del = async id => { if (!confirm('Delete?')) return; await fetch(`/api/services/${id}`, { method: 'DELETE' }); toast.success('Deleted'); load() }
  const h = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div><h1 style={{ fontSize: 26, marginBottom: 4 }}>Services</h1><p style={{ color: 'var(--text2)', fontSize: 14 }}>{items.length} services</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FaPlus /> Add Service</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--text2)' }}>Loading...</div> :
          items.map((item, i) => (
            <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-glow)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{item.order}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: 'var(--text3)', fontSize: 12 }}>{item.price || 'Price not set'} · {Array.isArray(item.features) ? item.features.length : 0} features</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 11, background: item.active ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)', color: item.active ? '#10b981' : 'var(--text3)' }}>{item.active ? 'Active' : 'Hidden'}</span>
                <button onClick={() => openEdit(item)} style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--primary)', cursor: 'pointer', fontSize: 13 }}><FaEdit /></button>
                <button onClick={() => del(item._id)} style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg3)', color: '#ef4444', cursor: 'pointer', fontSize: 13 }}><FaTrash /></button>
              </div>
            </div>
          ))
        }
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, width: '100%', maxWidth: 600, padding: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontSize: 22 }}>{editing ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: 20, cursor: 'pointer' }}><FaTimes /></button>
            </div>
            <form onSubmit={save}>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group"><label>Service Title *</label><input className="input" name="title" value={form.title} onChange={h} required /></div>
                <div className="form-group"><label>Price</label><input className="input" name="price" value={form.price} onChange={h} placeholder="Starting ₹15,000" /></div>
              </div>
              <div className="form-group"><label>Description *</label><textarea className="input" name="description" value={form.description} onChange={h} required rows={3} /></div>
              <div className="form-group"><label>Features (one per line)</label><textarea className="input" name="features" value={form.features} onChange={h} rows={5} placeholder="Responsive Design&#10;SEO Optimized&#10;Fast Loading" /></div>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group"><label>Icon Name</label><input className="input" name="icon" value={form.icon} onChange={h} placeholder="FaGlobe" /></div>
                <div className="form-group"><label>Order</label><input className="input" name="order" type="number" value={form.order} onChange={h} /></div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>
                <input type="checkbox" name="active" checked={form.active} onChange={h} /> Show on website
              </label>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Service'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
