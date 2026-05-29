import '../../styles/globals.css'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export const metadata = { title: 'Admin | Nexira Solution', robots: { index: false } }

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: 'var(--bg)' }}>
        <div style={{ display: 'flex' }}>
          <AdminSidebar />
          <div style={{ flex: 1, marginLeft: 260, minHeight: '100vh' }}>
            <AdminHeader />
            <main style={{ padding: '24px 32px' }}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
