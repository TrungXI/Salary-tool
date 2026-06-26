import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { SidebarProvider } from './SidebarContext'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Header />
      <Sidebar />
      <main style={{
        marginLeft: 'var(--sidebar-w)',
        paddingTop: 'var(--header-h)',
        minHeight: '100vh',
        background: 'var(--bg)',
      }}>
        <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: '32px 20px 48px' }}>
          {children}
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  )
}
