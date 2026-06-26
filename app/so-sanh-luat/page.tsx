import type { Metadata } from 'next'
import LawComparisonTable from '@/components/LawComparisonTable'
import LegalBadge from '@/components/LegalBadge'
import { LEGAL_REFS } from '@/lib/legalRefs'

export const metadata: Metadata = {
  title: 'So sánh luật 2025 vs 2026 | Lương tối thiểu, BHXH, Thuế TNCN | TínhLương.vn',
  description: 'So sánh lương tối thiểu vùng, thuế TNCN, giảm trừ gia cảnh giữa luật 2025 và 2026.',
}

const pStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  color: 'var(--text)',
  margin: '0 0 24px',
}

export default function Page() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
        So sánh luật 2025 vs 2026
      </h1>

      <p style={pStyle}>
        Bảng so sánh nhanh các thay đổi chính giữa quy định 2025 và 2026 về lương tối thiểu vùng,
        giảm trừ gia cảnh và biểu thuế thu nhập cá nhân. Các giá trị mới của 2026 được highlight.
      </p>

      <LawComparisonTable />

      <div style={{ marginTop: 40, padding: '16px 18px', background: 'var(--surface2)', borderRadius: 'var(--radius)' }}>
        <div style={{ marginBottom: 10 }}>
          <LegalBadge />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text)' }}>Cơ sở pháp lý:</div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {LEGAL_REFS.map(r => (
            <li key={r.code} style={{ fontSize: 13, lineHeight: 1.6 }}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                {r.code}
              </a>
              <span style={{ color: 'var(--muted)' }}> — {r.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
