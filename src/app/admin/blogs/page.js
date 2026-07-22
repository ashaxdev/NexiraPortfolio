'use client'
import { useState, useEffect, useRef } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaTimes, FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'

const empty = { title: '', excerpt: '', content: '', image: '', category: 'General', tags: '', author: 'Nexira Team', published: false, seo: { title: '', description: '', keywords: '' } }

export default function BlogsAdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const load = () => fetch('/api/blogs').then(r => r.json()).then(setItems).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit = item => { setForm({ ...item, tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags, seo: item.seo || { title: '', description: '', keywords: '' } }); setEditing(item._id); setModal(true) }

  const save = async e => {
    e.preventDefault(); setSaving(true)
    const body = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] }
    const url = editing ? `/api/blogs/${editing}` : '/api/blogs'
    const method = editing ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { toast.success(editing ? 'Updated!' : 'Created!'); setModal(false); load() }
    else toast.error('Failed to save')
    setSaving(false)
  }

  const del = async id => { if (!confirm('Delete?')) return; await fetch(`/api/blogs/${id}`, { method: 'DELETE' }); toast.success('Deleted'); load() }
  const toggle = async item => { await fetch(`/api/blogs/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !item.published }) }); load() }

  const h = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const hs = e => setForm(p => ({ ...p, seo: { ...p.seo, [e.target.name]: e.target.value } }))

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
    e.target.value = ''
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
        <div><h1 style={{ fontSize: 26, marginBottom: 4 }}>Blog Posts</h1><p style={{ color: 'var(--text2)', fontSize: 14 }}>{items.length} posts</p></div>
        <button className="btn btn-primary" onClick={openCreate}><FaPlus /> New Post</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--text2)' }}>Loading...</div> :
          items.length === 0 ? <div style={{ padding: 32, textAlign: 'center', color: 'var(--text3)' }}>No blog posts yet. Create your first one!</div> :
          items.map((item, i) => (
            <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              {item.image && (
                <img src={item.image} alt={item.title} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{item.title}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 11, background: item.published ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)', color: item.published ? '#10b981' : 'var(--text3)', border: `1px solid ${item.published ? 'rgba(16,185,129,0.3)' : 'var(--border)'}` }}>{item.published ? 'Published' : 'Draft'}</span>
                </div>
                <div style={{ color: 'var(--text3)', fontSize: 12 }}>{item.category} · {new Date(item.createdAt).toLocaleDateString('en-IN')}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => toggle(item)} style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg3)', color: item.published ? '#10b981' : 'var(--text3)', cursor: 'pointer', fontSize: 13 }}>{item.published ? <FaEye /> : <FaEyeSlash />}</button>
                <button onClick={() => openEdit(item)} style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--primary)', cursor: 'pointer', fontSize: 13 }}><FaEdit /></button>
                <button onClick={() => del(item._id)} style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg3)', color: '#ef4444', cursor: 'pointer', fontSize: 13 }}><FaTrash /></button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, width: '100%', maxWidth: 700, padding: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontSize: 22 }}>{editing ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: 20, cursor: 'pointer' }}><FaTimes /></button>
            </div>
            <form onSubmit={save}>
              <div className="form-group"><label>Title *</label><input className="input" name="title" value={form.title} onChange={h} required placeholder="Blog post title" /></div>
              <div className="grid-2" style={{ gap: 16 }}>
                <div className="form-group"><label>Category</label><input className="input" name="category" value={form.category} onChange={h} placeholder="General" /></div>
                <div className="form-group"><label>Author</label><input className="input" name="author" value={form.author} onChange={h} /></div>
              </div>
              <div className="form-group"><label>Excerpt *</label><textarea className="input" name="excerpt" value={form.excerpt} onChange={h} required rows={2} placeholder="Short description" /></div>
              <div className="form-group"><label>Content *</label><textarea className="input" name="content" value={form.content} onChange={h} required rows={8} placeholder="Full blog content (HTML supported)" /></div>
              <div className="form-group"><label>Tags (comma separated)</label><input className="input" name="tags" value={form.tags} onChange={h} placeholder="web, development, react" /></div>

              {/* Image upload / drag & drop */}
              <div className="form-group">
                <label>Featured Image</label>
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
                      <FaSpinner style={{ fontSize: 24, animation: 'spin 1s linear infinite' }} />
                      <span style={{ fontSize: 13 }}>Uploading...</span>
                    </div>
                  ) : form.image ? (
                    <div style={{ position: 'relative' }}>
                      <img src={form.image} alt="preview" style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block', background: 'var(--bg3)' }} />
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

              <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, marginBottom: 16, color: 'var(--primary)' }}>SEO Settings</h3>
                <div className="form-group"><label>SEO Title</label><input className="input" name="title" value={form.seo?.title} onChange={hs} placeholder="SEO optimized title" /></div>
                <div className="form-group"><label>Meta Description</label><textarea className="input" name="description" value={form.seo?.description} onChange={hs} rows={2} placeholder="Meta description (150-160 chars)" /></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Keywords</label><input className="input" name="keywords" value={form.seo?.keywords} onChange={hs} placeholder="keyword1, keyword2" /></div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text2)', fontSize: 14 }}>
                  <input type="checkbox" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} /> Publish immediately
                </label>
                <div style={{ flex: 1 }} />
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving || uploading}>{saving ? 'Saving...' : editing ? 'Update Post' : 'Create Post'}</button>
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