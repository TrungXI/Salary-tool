'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from './SidebarContext'
import { useIsMobile } from './useIsMobile'
import LegalBadge from './LegalBadge'

const NAV_LINKS = [
  { href: '/', label: 'Tính lương' },
  { href: '/bac-thue-tncn', label: 'Bậc thuế' },
  { href: '/luong-toi-thieu-vung', label: 'Lương tối thiểu' },
  { href: '/so-sanh-luat', label: 'So sánh luật' },
]

export default function Header() {
  const { setOpen } = useSidebar()
  const isMobile = useIsMobile()
  const pathname = usePathname()

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 'var(--header-h)', background: 'var(--surface)',
      borderBottom: '1px solid var(--border)', zIndex: 100,
      display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12,
    }}>
      {isMobile && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Mở menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="19" y2="6" />
            <line x1="3" y1="11" x2="19" y2="11" />
            <line x1="3" y1="16" x2="19" y2="16" />
          </svg>
        </button>
      )}

      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text)' }}>
        <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: 15 }}>TínhLương.vn</span>
      </Link>

      {!isMobile && (
        <nav style={{ display: 'flex', marginLeft: 24, gap: 0 }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                color: pathname === l.href ? 'var(--accent)' : 'var(--muted)',
                fontWeight: pathname === l.href ? 600 : 400,
                textDecoration: 'none',
                padding: '0 12px',
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <LegalBadge />
        <span style={{ fontSize: 11, background: 'var(--accent-light)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
          Luật 2026
        </span>
      </div>
    </header>
  )
}
