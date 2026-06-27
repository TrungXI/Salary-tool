import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import AppShell from '@/components/AppShell'
import { getDictionary } from '@/lib/i18n/dictionary'
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n/config'
import './globals.css'

async function readLocale(): Promise<Locale> {
  const h = await headers()
  const v = h.get('x-locale')
  return v && isLocale(v) ? v : DEFAULT_LOCALE
}

async function readPathname(): Promise<string> {
  const h = await headers()
  return h.get('x-pathname') ?? '/'
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await readLocale()
  const dict = getDictionary(locale)
  return {
    title: dict.metadata.rootTitle,
    description: dict.metadata.rootDescription,
    keywords: dict.metadata.rootKeywords,
    openGraph: {
      title: dict.metadata.ogTitle,
      description: dict.metadata.ogDescription,
      type: 'website',
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await readLocale()
  const pathname = await readPathname()
  const dictionary = getDictionary(locale)

  return (
    <html lang={locale}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body>
        <AppShell locale={locale} dictionary={dictionary} pathname={pathname}>
          {children}
        </AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
