'use client'
import { useT } from '@/lib/i18n/LocaleProvider'

export default function VietnameseOnlyNote() {
  const t = useT()
  return (
    <div
      role="note"
      style={{
        background: 'var(--warn-light)',
        color: 'var(--warn)',
        border: '1px solid var(--warn)',
        borderRadius: 'var(--radius)',
        padding: '10px 14px',
        fontSize: 13,
        margin: '16px 0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span aria-hidden style={{ fontSize: 14 }}>🇻🇳</span>
      <span>{t('common.vietnameseOnlyNote')}</span>
    </div>
  )
}
