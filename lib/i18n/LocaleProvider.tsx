'use client'
import { createContext, useContext, useCallback, type ReactNode } from 'react'
import type { Dictionary } from './dictionary'
import type { Locale } from './config'

type Ctx = { locale: Locale; dict: Dictionary }

const LocaleContext = createContext<Ctx | null>(null)

function useCtx(): Ctx {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale/useT must be used inside <LocaleProvider>')
  return ctx
}

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: Dictionary
  children: ReactNode
}) {
  return (
    <LocaleContext.Provider value={{ locale, dict: dictionary }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): Locale {
  return useCtx().locale
}

export function useDictionary(): Dictionary {
  return useCtx().dict
}

export type TFn = (path: string, vars?: Record<string, string | number>) => string

export function useT(): TFn {
  const { dict } = useCtx()
  return useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const val = path.split('.').reduce<unknown>((o, k) => {
        if (o && typeof o === 'object') return (o as Record<string, unknown>)[k]
        return undefined
      }, dict)
      let str = typeof val === 'string' ? val : path
      if (vars) {
        str = str.replace(/{(\w+)}/g, (_, k) => {
          const v = vars[k]
          return v == null ? '' : String(v)
        })
      }
      return str
    },
    [dict],
  )
}

export function useLocalizedHref(): (href: string) => string {
  const locale = useLocale()
  return useCallback(
    (href: string) => {
      if (locale === 'vi') return href
      if (href === '/') return '/en'
      if (href.startsWith('/en/') || href === '/en') return href
      return '/en' + href
    },
    [locale],
  )
}
