'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useT, useLocalizedHref } from '@/lib/i18n/LocaleProvider'

interface Props {
  title: string
  description: string
}

export default function ComingSoon({ title, description }: Props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const t = useT()
  const localize = useLocalizedHref()

  const submit = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error')
      setErrorMsg(t('comingSoon.errorInvalidEmail'))
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: title }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const d = await res.json().catch(() => ({}))
        setStatus('error')
        setErrorMsg(d.error || t('comingSoon.errorGeneric'))
      }
    } catch {
      // graceful degradation — pretend success in dev (matches EmailGate.tsx behavior)
      setStatus('success')
    }
  }

  return (
    <div>
      <div style={{
        display: 'inline-block',
        padding: '4px 12px',
        background: 'var(--warn-light)',
        color: 'var(--warn)',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.02em',
        marginBottom: 16,
      }}>
        {t('comingSoon.badge')}
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        {title}
      </h1>

      <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 28px', maxWidth: 640 }}>
        {description}
      </p>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '24px 28px',
        maxWidth: 520,
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
          {t('comingSoon.ctaHeading')}
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
          {t('comingSoon.ctaSub')}
        </p>

        {status === 'success' ? (
          <div style={{
            padding: '14px 16px',
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            borderRadius: 'var(--radius)',
            fontWeight: 600,
            fontSize: 14,
          }}>
            {t('comingSoon.success')}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="text"
                placeholder={t('comingSoon.namePlaceholder')}
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder={t('comingSoon.emailPlaceholder')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
              />
            </div>

            {status === 'error' && (
              <div style={{ marginTop: 10, fontSize: 13, color: '#dc2626' }}>{errorMsg}</div>
            )}

            <button
              onClick={submit}
              disabled={status === 'loading'}
              style={{
                marginTop: 14,
                width: '100%',
                padding: 13,
                border: 'none',
                borderRadius: 10,
                background: status === 'loading' ? '#6b9f85' : 'var(--accent)',
                color: 'white',
                fontSize: 15,
                fontWeight: 700,
                cursor: status === 'loading' ? 'default' : 'pointer',
              }}
            >
              {status === 'loading' ? t('comingSoon.submitLoading') : t('comingSoon.submitIdle')}
            </button>
          </>
        )}
      </div>

      <div style={{ marginTop: 32 }}>
        <Link
          href={localize('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--accent)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {t('comingSoon.backLink')}
        </Link>
      </div>
    </div>
  )
}
