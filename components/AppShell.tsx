import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import VietnameseOnlyNote from './VietnameseOnlyNote'
import { SidebarProvider } from './SidebarContext'
import { LocaleProvider } from '@/lib/i18n/LocaleProvider'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionary'

// Pages where, when accessed via /en/*, we render a "Vietnamese only" banner.
// The /en/* shell is translated, but page content stays VI.
const EN_VI_CONTENT_PREFIXES = [
  '/en/bac-thue-tncn',
  '/en/luong-toi-thieu-vung',
  '/en/so-sanh-luat',
  '/en/huong-dan-bhxh',
  '/en/quyet-toan-tncn',
  '/en/giam-tru-gia-canh',
  '/en/hoan-thue-tncn',
  '/en/bang-luong-thi-truong',
  '/en/script-dam-phan-luong',
  '/en/checklist-hop-dong',
  '/en/tinh-lai-vay-mua-nha',
  '/en/tinh-lai-vay-mua-xe',
  '/en/tinh-dti',
  '/en/quy-khan-cap',
  '/en/tiet-kiem-huu-tri',
  '/en/50-30-20',
  '/en/tinh-tang-ca',
  '/en/tinh-phep-nam',
  '/en/thuong-tet',
  '/en/thue-tncn-expat',
  '/en/work-permit',
  '/en/tinh-luong/',
  '/en/snapshot/',
]

function shouldShowViOnlyNote(locale: Locale, pathname: string): boolean {
  if (locale !== 'en') return false
  // Exclude EN homepage exactly (/en, /en/)
  if (pathname === '/en' || pathname === '/en/') return false
  return EN_VI_CONTENT_PREFIXES.some(prefix =>
    prefix.endsWith('/') ? pathname.startsWith(prefix) : pathname === prefix || pathname.startsWith(prefix + '/'),
  )
}

interface Props {
  children: React.ReactNode
  locale: Locale
  dictionary: Dictionary
  pathname: string
}

export default function AppShell({ children, locale, dictionary, pathname }: Props) {
  const showViOnly = shouldShowViOnlyNote(locale, pathname)

  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
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
            {showViOnly && <VietnameseOnlyNote />}
            {children}
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </LocaleProvider>
  )
}
