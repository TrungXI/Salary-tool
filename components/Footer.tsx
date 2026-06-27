'use client'
import Link from 'next/link'
import { LEGAL_REFS } from '@/lib/legalRefs'
import { useT, useLocalizedHref } from '@/lib/i18n/LocaleProvider'

const NAV_LINKS: { href: string; key: string }[] = [
  { href: '/', key: 'footer.nav.home' },
  { href: '/bac-thue-tncn', key: 'footer.nav.taxBrackets' },
  { href: '/luong-toi-thieu-vung', key: 'footer.nav.minWage' },
  { href: '/so-sanh-luat', key: 'footer.nav.lawCompare' },
  { href: '/huong-dan-bhxh', key: 'footer.nav.bhxhGuide' },
]

export default function Footer() {
  const t = useT()
  const localize = useLocalizedHref()
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: '24px 20px',
      marginTop: 40,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24,
      justifyContent: 'space-between',
      fontSize: 13,
      color: 'var(--muted)',
    }}>
      <div style={{ minWidth: 200 }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{t('footer.copyright')}</div>
        <div style={{ lineHeight: 1.5 }}>{t('footer.tagline')}</div>
      </div>

      <div>
        <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{t('footer.pagesHeading')}</div>
        {NAV_LINKS.map(l => (
          <Link
            key={l.href}
            href={localize(l.href)}
            style={{ color: 'var(--text)', textDecoration: 'none', display: 'block', padding: '2px 0' }}
          >
            {t(l.key)}
          </Link>
        ))}
      </div>

      <div>
        <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{t('footer.legalHeading')}</div>
        {LEGAL_REFS.map(ref => (
          <a
            key={ref.code}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            title={ref.title}
            style={{ color: 'var(--muted)', textDecoration: 'none', display: 'block', padding: '2px 0', fontSize: 12 }}
          >
            {ref.code}
          </a>
        ))}
      </div>
    </footer>
  )
}
