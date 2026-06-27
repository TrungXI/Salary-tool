'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type CSSProperties, type ReactNode } from 'react'
import { useSidebar } from './SidebarContext'
import { useIsMobile } from './useIsMobile'
import { useT, useLocalizedHref } from '@/lib/i18n/LocaleProvider'

const CalculatorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="9" x2="9" y2="9" />
    <line x1="15" y1="9" x2="15" y2="9" />
    <line x1="9" y1="15" x2="9" y2="15" />
    <line x1="15" y1="15" x2="15" y2="15" />
  </svg>
)

const RefundIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <polyline points="3 4 3 9 8 9" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <path d="M9.5 14.5c.5 1 1.5 1.5 2.5 1.5s2.5-.5 2.5-2-1.5-1.7-2.5-2-2.5-.5-2.5-2 1.5-2 2.5-2 2 .5 2.5 1.5" />
  </svg>
)

const HandshakeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12 L8 17 L12 14 L16 17 L21 12" />
    <rect x="10" y="12" width="4" height="4" />
    <line x1="3" y1="8" x2="6" y2="8" />
    <line x1="18" y1="8" x2="21" y2="8" />
  </svg>
)

const CoinsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="7" rx="8" ry="3" />
    <path d="M4 7 v4 c0 1.7 3.6 3 8 3 s8-1.3 8-3 v-4" />
    <path d="M4 11 v4 c0 1.7 3.6 3 8 3 s8-1.3 8-3 v-4" />
  </svg>
)

const PiggyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <line x1="10" y1="12" x2="14" y2="12" />
    <path d="M8 8 V6 a2 2 0 0 1 2-2 h4 a2 2 0 0 1 2 2 v2" />
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 16 14" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <path d="M12 3a14 14 0 0 1 0 18 a14 14 0 0 1 0-18" />
  </svg>
)

type MenuItem = {
  href: string
  labelKey: string
  placeholder?: boolean
}

type MenuSection = {
  id: string
  labelKey: string
  icon: ReactNode
  defaultOpen: boolean
  items: MenuItem[]
}

const SECTIONS: MenuSection[] = [
  {
    id: 'salary-tax',
    labelKey: 'sidebar.sections.salaryTax',
    icon: <CalculatorIcon />,
    defaultOpen: true,
    items: [
      { href: '/', labelKey: 'sidebar.items.calcGrossNet' },
      { href: '/luong-toi-thieu-vung', labelKey: 'sidebar.items.minWage2026' },
      { href: '/bac-thue-tncn', labelKey: 'sidebar.items.taxBrackets2026' },
      { href: '/so-sanh-luat', labelKey: 'sidebar.items.lawCompare2526' },
      { href: '/huong-dan-bhxh', labelKey: 'sidebar.items.bhxhGuide' },
    ],
  },
  {
    id: 'tax-refund',
    labelKey: 'sidebar.sections.taxRefund',
    icon: <RefundIcon />,
    defaultOpen: false,
    items: [
      { href: '/hoan-thue-tncn', labelKey: 'sidebar.items.taxRefund' },
      { href: '/quyet-toan-tncn', labelKey: 'sidebar.items.taxFinalization' },
      { href: '/giam-tru-gia-canh', labelKey: 'sidebar.items.deduction' },
    ],
  },
  {
    id: 'negotiation',
    labelKey: 'sidebar.sections.negotiation',
    icon: <HandshakeIcon />,
    defaultOpen: false,
    items: [
      { href: '/bang-luong-thi-truong', labelKey: 'sidebar.items.marketSalary' },
      { href: '/script-dam-phan-luong', labelKey: 'sidebar.items.negotiationScript' },
      { href: '/checklist-hop-dong', labelKey: 'sidebar.items.contractChecklist' },
    ],
  },
  {
    id: 'credit',
    labelKey: 'sidebar.sections.credit',
    icon: <CoinsIcon />,
    defaultOpen: false,
    items: [
      { href: '/tinh-lai-vay-mua-nha', labelKey: 'sidebar.items.homeLoan' },
      { href: '/tinh-lai-vay-mua-xe', labelKey: 'sidebar.items.carLoan' },
      { href: '/tinh-dti', labelKey: 'sidebar.items.dti' },
    ],
  },
  {
    id: 'savings',
    labelKey: 'sidebar.sections.savings',
    icon: <PiggyIcon />,
    defaultOpen: false,
    items: [
      { href: '/quy-khan-cap', labelKey: 'sidebar.items.emergencyFund' },
      { href: '/tiet-kiem-huu-tri', labelKey: 'sidebar.items.retirement' },
      { href: '/50-30-20', labelKey: 'sidebar.items.budget503020' },
    ],
  },
  {
    id: 'leave-bonus',
    labelKey: 'sidebar.sections.leaveBonus',
    icon: <ClockIcon />,
    defaultOpen: false,
    items: [
      { href: '/tinh-tang-ca', labelKey: 'sidebar.items.overtime' },
      { href: '/tinh-phep-nam', labelKey: 'sidebar.items.annualLeave' },
      { href: '/thuong-tet', labelKey: 'sidebar.items.tetBonus' },
    ],
  },
  {
    id: 'expat',
    labelKey: 'sidebar.sections.expat',
    icon: <GlobeIcon />,
    defaultOpen: false,
    items: [
      { href: '/thue-tncn-expat', labelKey: 'sidebar.items.expatTax' },
      { href: '/work-permit', labelKey: 'sidebar.items.workPermit' },
    ],
  },
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

const sectionHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  padding: '9px 12px',
  borderRadius: 'var(--radius)',
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--text)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
}

const placeholderDotStyle: CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: 'var(--warn)',
  marginRight: 4,
  flexShrink: 0,
}

export default function Sidebar() {
  const { open, setOpen } = useSidebar()
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const t = useT()
  const localize = useLocalizedHref()

  const close = () => setOpen(false)

  // Match a sidebar item to current pathname, accounting for /en/ prefix.
  const isItemActive = (itemHref: string) => pathname === localize(itemHref)

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    for (const s of SECTIONS) init[s.id] = false
    // accordion: prefer active section, fallback to defaultOpen section
    const activeSection = SECTIONS.find(s => s.items.some(it => isItemActive(it.href)))
    const defaultSection = SECTIONS.find(s => s.defaultOpen)
    const toOpen = activeSection ?? defaultSection
    if (toOpen) init[toOpen.id] = true
    return init
  })

  const toggle = (id: string) => {
    setOpenSections(prev => {
      const isCurrentlyOpen = prev[id]
      const next: Record<string, boolean> = {}
      for (const s of SECTIONS) next[s.id] = false
      if (!isCurrentlyOpen) next[id] = true
      return next
    })
  }

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
          {SECTIONS.map(section => {
            const isOpen = openSections[section.id]
            return (
              <div key={section.id} style={{ marginBottom: 4 }}>
                <button
                  type="button"
                  onClick={() => toggle(section.id)}
                  style={sectionHeaderStyle}
                  aria-expanded={isOpen}
                  aria-controls={`section-${section.id}`}
                >
                  {section.icon}
                  <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{t(section.labelKey)}</span>
                  <span style={{
                    fontSize: 10,
                    color: 'var(--muted)',
                    transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.15s ease',
                    display: 'inline-block',
                  }}>▼</span>
                </button>

                <div
                  id={`section-${section.id}`}
                  style={{ display: isOpen ? 'block' : 'none', paddingLeft: 6 }}
                >
                  {section.items.map(item => {
                    const href = localize(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={href}
                        onClick={isMobile ? close : undefined}
                        style={itemStyle(pathname === href)}
                      >
                        <span style={{ width: 16, display: 'inline-block' }} />
                        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{t(item.labelKey)}</span>
                        {item.placeholder && (
                          <span style={placeholderDotStyle} title={t('common.comingSoon')} />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />

          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', padding: '0 8px 6px' }}>
            {t('sidebar.popularHeading')}
          </div>

          {POPULAR_ITEMS.map(item => {
            const href = localize(item.href)
            return (
              <Link
                key={item.href}
                href={href}
                onClick={isMobile ? close : undefined}
                style={itemStyle(pathname === href)}
              >
                <span style={{ width: 16, display: 'inline-block' }} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
