'use client'
import { usePathname } from 'next/navigation'
import { useLocale, useT } from '@/lib/i18n/LocaleProvider'

function toVi(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3) // '/en/foo' -> '/foo'
  return pathname
}

function toEn(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/en'
  if (pathname.startsWith('/en/') || pathname === '/en') return pathname
  return '/en' + pathname
}

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useT()

  const switchTo = (target: 'vi' | 'en') => {
    if (target === locale) return
    const next = target === 'vi' ? toVi(pathname) : toEn(pathname)
    // Full navigation — locale is resolved in the server layout from the
    // x-locale request header. Client-side router.push() would keep the stale
    // dictionary in LocaleProvider until a hard reload.
    window.location.href = next
  }

  const btn = (label: string, code: 'vi' | 'en') => {
    const active = locale === code
    return (
      <button
        key={code}
        type="button"
        onClick={() => switchTo(code)}
        aria-pressed={active}
        style={{
          padding: '4px 9px',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.04em',
          background: active ? 'var(--accent)' : 'transparent',
          color: active ? 'white' : 'var(--muted)',
          border: 'none',
          borderRadius: 999,
          cursor: active ? 'default' : 'pointer',
          transition: 'all 0.15s',
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div
      role="group"
      aria-label={t('common.switchLanguage')}
      style={{
        display: 'inline-flex',
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: 999,
        padding: 2,
        gap: 2,
      }}
    >
      {btn('VI', 'vi')}
      {btn('EN', 'en')}
    </div>
  )
}
