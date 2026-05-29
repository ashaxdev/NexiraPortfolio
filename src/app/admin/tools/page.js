'use client'
import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'

const empty = { name: '', description: '', icon: 'FaTools', url: '', category: 'General', free: true, active: true, order: 0 }
const cats = ['General', 'SEO', 'Performance', 'AI', 'Design', 'Business', 'Security']

export default function ToolsAdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = () => fetch('/api/tools').then(r => r.json()).then(setItems).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit = item => { setForm(item); setEditing(item._id); setModal(true) }

  const save = async e => {
    e.preventDefault(); setSaving(true)
    const url = editing ? `/api/tools/${editing}` : '/api/tools'
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { toast.success('Saved!'); setModal(false); load() } else toast.error('Failed')
    setSaving(false)
  }

  const del = async id => { if (!confirm('Delete?')) return; await fetch(`/api/tools/${id}`, { method: 'DELETE' }); toast.success('Deleted'); load() }
  const h = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div><h1 style={{ fontSize: 26, marginBottom: 4 }}>Tools</h1><p style={{ color: 'var(--text2)', fontSize: 14 }}>{items.length} tools</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FaPlus /> Add Tool</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--text2)' }}>Loading...</div> :
          items.map((item, i) => (
            <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 11, background: item.free ? 'rgba(0,255,208,0.1)' : 'rgba(124,58,237,0.1)', color: item.free ? 'var(--accent)' : 'var(--accent2)' }}>{item.free ? 'FREE' : 'PRO'}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 11, background: 'var(--bg3)', color: 'var(--text3)' }}>{item.category}</span>
                </div>
                <div style={{ color: 'var(--text3)', fontSize: 12 }}>{item.url}</div>
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
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, width: '100%', maxWidth: 560, padding: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontSize: 22 }}>{editing ? 'Edit Tool' : 'Add Tool'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: 20, cursor: 'pointer' }}><FaTimes /></button>
            </div>
            <form onSubmit={save}>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group"><label>Tool Name *</label><input className="input" name="name" value={form.name} onChange={h} required /></div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="input" name="category" value={form.category} onChange={h} style={{ appearance: 'none' }}>
                    {cats.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Description</label><textarea className="input" name="description" value={form.description} onChange={h} rows={3} /></div>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group"><label>URL/Path *</label><input className="input" name="url" value={form.url} onChange={h} required placeholder="/tools/my-tool" /></div>
                <div className="form-group"><label>Icon (react-icons)</label><input className="input" name="icon" value={form.icon} onChange={h} placeholder="FaSearch" /></div>
              </div>
              <div className="grid-2" style={{ gap: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text2)', fontSize: 14 }}>
                  <input type="checkbox" name="free" checked={form.free} onChange={h} /> Free Tool
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text2)', fontSize: 14 }}>
                  <input type="checkbox" name="active" checked={form.active} onChange={h} /> Active
                </label>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Tool'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
