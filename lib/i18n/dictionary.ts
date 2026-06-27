import viDict from '@/messages/vi.json'
import enDict from '@/messages/en.json'
import type { Locale } from './config'

export type Dictionary = typeof viDict

const DICTS: Record<Locale, Dictionary> = {
  vi: viDict,
  en: enDict as Dictionary,
}

// Dev-only key-parity assertion. Runs once per server process.
if (process.env.NODE_ENV !== 'production') {
  const collectKeys = (obj: unknown, prefix = ''): string[] => {
    if (!obj || typeof obj !== 'object') return [prefix]
    const out: string[] = []
    for (const k of Object.keys(obj as Record<string, unknown>)) {
      const child = (obj as Record<string, unknown>)[k]
      const path = prefix ? `${prefix}.${k}` : k
      if (child && typeof child === 'object' && !Array.isArray(child)) {
        out.push(...collectKeys(child, path))
      } else {
        out.push(path)
      }
    }
    return out
  }
  const viKeys = collectKeys(viDict).sort()
  const enKeys = collectKeys(enDict).sort()
  const missingInEn = viKeys.filter(k => !enKeys.includes(k))
  const missingInVi = enKeys.filter(k => !viKeys.includes(k))
  if (missingInEn.length || missingInVi.length) {
    console.warn(
      '[i18n] Dictionary key mismatch.',
      missingInEn.length ? `Missing in en: ${missingInEn.join(', ')}` : '',
      missingInVi.length ? `Missing in vi: ${missingInVi.join(', ')}` : '',
    )
  }
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTS[locale] ?? DICTS.vi
}
