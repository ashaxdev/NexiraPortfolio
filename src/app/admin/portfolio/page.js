'use client'
import { useState, useEffect, useRef } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaStar, FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'

const empty = { title: '', description: '', fullDescription: '', image: '', category: 'Web', tags: '', liveUrl: '', featured: false, order: 0 }
const cats = ['Web', 'E-Commerce', 'SaaS', 'ERP', 'AI', 'Mobile', 'Design']

export default function PortfolioAdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const load = () => fetch('/api/portfolio').then(r => r.json()).then(setItems).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit = item => { setForm({ ...item, tags: Array.isArray(item.tags) ? item.tags.join(', ') : '' }); setEditing(item._id); setModal(true) }

  const save = async e => {
    e.preventDefault(); setSaving(true)
    const body = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] }
    const url = editing ? `/api/portfolio/${editing}` : '/api/portfolio'
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { toast.success(editing ? 'Updated!' : 'Created!'); setModal(false); load() } else toast.error('Failed')
    setSaving(false)
  }

  const del = async id => { if (!confirm('Delete?')) return; await fetch(`/api/portfolio/${id}`, { method: 'DELETE' }); toast.success('Deleted'); load() }
  const h = e => setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const catColors = { Web: '#00aaff', 'E-Commerce': '#ef4444', SaaS: '#7c3aed', ERP: '#f59e0b', AI: '#10b981', Mobile: '#ec4899', Design: '#00ffd0' }

  // ---- Image upload logic ----
  const uploadFile = async file => {
    if (!file) return
    if (!file.type.startsWith('image/')) { toast.error('Only image files are allowed'); return }
    if (file.size > 5 * 1024 * 1024) { toast.error('File too large (max 5MB)'); return }

    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setForm(p => ({ ...p, image: data.url }))
        toast.success('Image uploaded!')
      } else {
        toast.error(data.error || 'Upload failed')
      }
    } catch (err) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = e => {
    const file = e.target.files?.[0]
    uploadFile(file)
    e.target.value = '' // allow re-selecting same file later
  }

  const handleDrop = e => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    uploadFile(file)
  }

  const handleDragOver = e => { e.preventDefault(); setDragActive(true) }
  const handleDragLeave = e => { e.preventDefault(); setDragActive(false) }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div><h1 style={{ fontSize: 26, marginBottom: 4 }}>Portfolio</h1><p style={{ color: 'var(--text2)', fontSize: 14 }}>{items.length} projects</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FaPlus /> Add Project</button>
      </div>

      <div className="grid-3" style={{ gap: 20 }}>
        {loading ? <div style={{ color: 'var(--text2)', gridColumn: '1/-1', textAlign: 'center', padding: 32 }}>Loading...</div> :
          items.map(item => (
            <div key={item._id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 140, background: item.image ? `url(${item.image}) center/cover` : `linear-gradient(135deg, ${catColors[item.category] || 'var(--primary)'}20, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, borderBottom: '1px solid var(--border)', position: 'relative' }}>
                {!item.image && '🖥️'}
                {item.featured && <span style={{ position: 'absolute', top: 10, right: 10, color: '#f59e0b' }}><FaStar /></span>}
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 100, background: `${catColors[item.category]}15`, color: catColors[item.category] || 'var(--primary)', border: `1px solid ${catColors[item.category]}30` }}>{item.category}</span>
                </div>
                <h3 style={{ fontSize: 15, marginBottom: 6 }}>{item.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 14, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.description}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(item)} style={{ flex: 1, padding: '7px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--primary)', cursor: 'pointer', fontSize: 13 }}><FaEdit /></button>
                  <button onClick={() => del(item._id)} style={{ flex: 1, padding: '7px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg3)', color: '#ef4444', cursor: 'pointer', fontSize: 13 }}><FaTrash /></button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, width: '100%', maxWidth: 600, padding: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontSize: 22 }}>{editing ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: 20, cursor: 'pointer' }}><FaTimes /></button>
            </div>
            <form onSubmit={save}>
              <div className="form-group"><label>Project Title *</label><input className="input" name="title" value={form.title} onChange={h} required /></div>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group">
                  <label>Category</label>
                  <select className="input" name="category" value={form.category} onChange={h} style={{ appearance: 'none' }}>
                    {cats.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Order</label><input className="input" name="order" type="number" value={form.order} onChange={h} /></div>
              </div>
              <div className="form-group"><label>Short Description *</label><textarea className="input" name="description" value={form.description} onChange={h} required rows={2} /></div>
              <div className="form-group"><label>Full Description</label><textarea className="input" name="fullDescription" value={form.fullDescription} onChange={h} rows={4} /></div>
              <div className="form-group"><label>Tags (comma separated)</label><input className="input" name="tags" value={form.tags} onChange={h} placeholder="react, nodejs, mongodb" /></div>

              {/* Image upload / drag & drop */}
              <div className="form-group">
                <label>Project Image</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  style={{
                    border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 12,
                    padding: form.image ? 0 : 24,
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: dragActive ? 'var(--bg3)' : 'transparent',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />

                  {uploading ? (
                    <div style={{ padding: 24, color: 'var(--text2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <FaSpinner className="spin" style={{ fontSize: 24, animation: 'spin 1s linear infinite' }} />
                      <span style={{ fontSize: 13 }}>Uploading...</span>
                    </div>
                  ) : form.image ? (
                    <div style={{ position: 'relative' }}>
                      <img src={form.image} alt="preview" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setForm(p => ({ ...p, image: '' })) }}
                        style={{
                          position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%',
                          border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ color: 'var(--text2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <FaCloudUploadAlt style={{ fontSize: 28 }} />
                      <span style={{ fontSize: 13 }}>Drag & drop an image, or click to select</span>
                      <span style={{ fontSize: 11, opacity: 0.7 }}>PNG, JPG up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group"><label>Live URL</label><input className="input" name="liveUrl" value={form.liveUrl} onChange={h} placeholder="https://..." /></div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>
                <input type="checkbox" name="featured" checked={form.featured} onChange={h} /> Featured Project
              </label>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving || uploading}>{saving ? 'Saving...' : editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}