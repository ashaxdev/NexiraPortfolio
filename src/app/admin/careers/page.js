'use client'
import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'

const empty = { title: '', department: '', location: 'Madurai / Remote', type: 'Full-time', description: '', requirements: '', active: true }

export default function CareersAdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => fetch('/api/careers').then(r => r.json()).then(setItems).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit = item => { setForm({ ...item, requirements: Array.isArray(item.requirements) ? item.requirements.join('\n') : '' }); setEditing(item._id); setModal(true) }

  const save = async e => {
    e.preventDefault(); setSaving(true)
    const body = { ...form, requirements: form.requirements ? form.requirements.split('\n').map(r => r.trim()).filter(Boolean) : [] }
    const url = editing ? `/api/careers/${editing}` : '/api/careers'
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { toast.success('Saved!'); setModal(false); load() } else toast.error('Failed')
    setSaving(false)
  }

  const del = async id => { if (!confirm('Delete?')) return; await fetch(`/api/careers/${id}`, { method: 'DELETE' }); toast.success('Deleted'); load() }
  const h = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const typeColors = { 'Full-time': '#10b981', 'Part-time': '#f59e0b', 'Contract': '#7c3aed', 'Internship': '#00aaff' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div><h1 style={{ fontSize: 26, marginBottom: 4 }}>Careers</h1><p style={{ color: 'var(--text2)', fontSize: 14 }}>{items.length} open positions</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FaPlus /> Add Position</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--text2)' }}>Loading...</div> :
          items.length === 0 ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--text3)' }}>No job openings yet</div> :
          items.map((item, i) => (
            <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 11, background: `${typeColors[item.type]}15`, color: typeColors[item.type] }}>{item.type}</span>
                </div>
                <div style={{ color: 'var(--text3)', fontSize: 12 }}>{item.department} · {item.location}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
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
              <h2 style={{ fontSize: 22 }}>{editing ? 'Edit Position' : 'New Position'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: 20, cursor: 'pointer' }}><FaTimes /></button>
            </div>
            <form onSubmit={save}>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group"><label>Job Title *</label><input className="input" name="title" value={form.title} onChange={h} required /></div>
                <div className="form-group"><label>Department *</label><input className="input" name="department" value={form.department} onChange={h} required placeholder="Engineering" /></div>
              </div>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label>Type</label>
                  <select className="input" name="type" value={form.type} onChange={h} style={{ appearance: 'none' }}>
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Location</label><input className="input" name="location" value={form.location} onChange={h} /></div>
              </div>
              <div className="form-group"><label>Job Description *</label><textarea className="input" name="description" value={form.description} onChange={h} required rows={4} /></div>
              <div className="form-group"><label>Requirements (one per line)</label><textarea className="input" name="requirements" value={form.requirements} onChange={h} rows={4} placeholder="2+ years experience&#10;React knowledge&#10;Good communication" /></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>
                <input type="checkbox" name="active" checked={form.active} onChange={h} /> Show on website
              </label>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
