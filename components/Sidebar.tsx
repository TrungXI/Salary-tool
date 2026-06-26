'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { CSSProperties, ReactNode } from 'react'
import { useSidebar } from './SidebarContext'
import { useIsMobile } from './useIsMobile'

const CalculatorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="9" x2="9" y2="9" />
    <line x1="15" y1="9" x2="15" y2="9" />
    <line x1="9" y1="15" x2="9" y2="15" />
    <line x1="15" y1="15" x2="15" y2="15" />
  </svg>
)

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-8-7.5-8-12a8 8 0 1 1 16 0c0 4.5-8 12-8 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="9" />
    <rect x="10" y="7" width="4" height="14" />
    <rect x="17" y="3" width="4" height="18" />
  </svg>
)

const CompareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21" />
    <polyline points="6 9 3 12 6 15" />
    <polyline points="18 9 21 12 18 15" />
  </svg>
)

const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const NAV_ITEMS: { href: string; label: string; icon: ReactNode }[] = [
  { href: '/', label: 'Tính lương', icon: <CalculatorIcon /> },
  { href: '/luong-toi-thieu-vung', label: 'Lương tối thiểu vùng 2026', icon: <PinIcon /> },
  { href: '/bac-thue-tncn', label: 'Bậc thuế TNCN 2026', icon: <BarChartIcon /> },
  { href: '/so-sanh-luat', label: 'So sánh 2025 vs 2026', icon: <CompareIcon /> },
  { href: '/huong-dan-bhxh', label: 'Hướng dẫn BHXH', icon: <BookIcon /> },
]

const POPULAR_ITEMS = [
  { href: '/tinh-luong/10-trieu', label: '10 triệu' },
  { href: '/tinh-luong/15-trieu', label: '15 triệu' },
  { href: '/tinh-luong/20-trieu', label: '20 triệu' },
  { href: '/tinh-luong/30-trieu', label: '30 triệu' },
]

function itemStyle(active: boolean): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 12px',
    borderRadius: 'var(--radius)',
    fontSize: 14,
    textDecoration: 'none',
    background: active ? 'var(--accent-light)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--text)',
    fontWeight: active ? 600 : 400,
  }
}

export default function Sidebar() {
  const { open, setOpen } = useSidebar()
  const isMobile = useIsMobile()
  const pathname = usePathname()

  const close = () => setOpen(false)

  const desktopStyle: CSSProperties = {
    position: 'fixed',
    top: 'var(--header-h)',
    left: 0,
    bottom: 0,
    width: 'var(--sidebar-w)',
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    overflowY: 'auto',
    zIndex: 90,
    padding: '20px 12px',
  }

  const mobileStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: 260,
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    overflowY: 'auto',
    zIndex: 110,
    padding: '20px 12px',
    transform: open ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.2s ease',
  }

  return (
    <>
      {isMobile && open && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 109,
          }}
        />
      )}

      <aside style={isMobile ? mobileStyle : desktopStyle}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={isMobile ? close : undefined}
              style={itemStyle(pathname === item.href)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', padding: '0 8px 6px' }}>
            TRA LƯƠNG PHỔ BIẾN
          </div>

          {POPULAR_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={isMobile ? close : undefined}
              style={itemStyle(pathname === item.href)}
            >
              <span style={{ width: 16, display: 'inline-block' }} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
