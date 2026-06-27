import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['vi', 'en'] as const
const DEFAULT_LOCALE = 'vi'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const segments = pathname.split('/')
  const maybeLocale = segments[1] ?? ''
  const isLocalePrefixed = (LOCALES as readonly string[]).includes(maybeLocale)

  // /vi or /vi/foo  ->  redirect to canonical (strip /vi prefix)
  if (isLocalePrefixed && maybeLocale === 'vi') {
    const stripped = '/' + segments.slice(2).join('/')
    const target = stripped === '/' || stripped === '' ? '/' : stripped.replace(/\/+$/, '') || '/'
    return NextResponse.redirect(new URL(target, req.url))
  }

  const locale = isLocalePrefixed ? maybeLocale : DEFAULT_LOCALE

  let rewritePath = pathname
  if (isLocalePrefixed && maybeLocale === 'en') {
    if (segments.length === 2) {
      // /en exactly  -> resolves to app/en/page.tsx (no rewrite)
      rewritePath = '/en'
    } else {
      // /en/foo  ->  rewrite to /foo (keep URL as /en/foo)
      const tail = segments.slice(2).join('/')
      rewritePath = '/' + tail
      if (rewritePath === '/') rewritePath = '/en'
    }
  }

  const res =
    rewritePath === pathname
      ? NextResponse.next()
      : NextResponse.rewrite(new URL(rewritePath, req.url))

  res.headers.set('x-locale', locale)
  res.headers.set('x-pathname', pathname)
  return res
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
