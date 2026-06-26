import type { CSSProperties } from 'react'
import { getLatestLegalRef } from '@/lib/legalRefs'

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

interface Props {
  style?: CSSProperties
}

export default function LegalBadge({ style }: Props) {
  const ref = getLatestLegalRef()
  return (
    <a
      href={ref.url}
      target="_blank"
      rel="noopener noreferrer"
      title={ref.title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 11,
        color: 'var(--muted)',
        textDecoration: 'none',
        padding: '2px 8px',
        borderRadius: 20,
        border: '1px solid var(--border)',
        background: 'var(--surface2)',
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {`Cập nhật theo ${ref.code} · hiệu lực ${formatDate(ref.effectiveDate)}`}
    </a>
  )
}
