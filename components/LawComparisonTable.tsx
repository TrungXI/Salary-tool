import { LAW_2025, LAW_2026 } from '@/lib/lawHistory'
import { LEGAL_REFS } from '@/lib/legalRefs'

const fmt = (n: number) => n.toLocaleString('vi-VN')
const fmtRate = (r: number) => `${(r * 100).toFixed(0)}%`

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 8 }
const thStyle: React.CSSProperties = {
  background: 'var(--surface2)',
  fontWeight: 600,
  padding: '10px 14px',
  borderBottom: '1px solid var(--border)',
  fontSize: 14,
  textAlign: 'left',
}
const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid var(--border)',
  fontSize: 14,
}
const changedStyle: React.CSSProperties = {
  ...tdStyle,
  background: 'var(--accent-light)',
  color: 'var(--accent)',
  fontWeight: 700,
}
const sectionStyle: React.CSSProperties = {
  marginBottom: 32,
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  overflow: 'hidden',
}
const sectionHeader: React.CSSProperties = {
  padding: '14px 18px',
  fontSize: 16,
  fontWeight: 700,
  background: 'var(--surface2)',
  borderBottom: '1px solid var(--border)',
}
const refStyle: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--muted)',
  padding: '10px 18px',
  borderTop: '1px solid var(--border)',
}

export default function LawComparisonTable() {
  const minWageRefs = LEGAL_REFS.filter(r => r.category === 'min_wage')
  const deductionRefs = LEGAL_REFS.filter(r => r.category === 'family_deduction')
  const taxRefs = LEGAL_REFS.filter(r => r.category === 'pit')

  return (
    <div>
      {/* Section 1: Lương tối thiểu vùng */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>Lương tối thiểu vùng (đồng/tháng)</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Vùng</th>
              <th style={thStyle}>2025</th>
              <th style={thStyle}>2026</th>
            </tr>
          </thead>
          <tbody>
            {([1, 2, 3, 4] as const).map(r => {
              const v25 = LAW_2025.minWage[r]
              const v26 = LAW_2026.minWage[r]
              return (
                <tr key={r}>
                  <td style={tdStyle}>Vùng {['I', 'II', 'III', 'IV'][r - 1]}</td>
                  <td style={tdStyle}>{fmt(v25)}đ</td>
                  <td style={changedStyle}>{fmt(v26)}đ</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={refStyle}>
          Căn cứ: {minWageRefs.map((r, i) => (
            <span key={r.code}>
              {i > 0 && ' · '}
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}>{r.code}</a>
            </span>
          ))}
        </div>
      </div>

      {/* Section 2: Giảm trừ gia cảnh */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>Giảm trừ gia cảnh (đồng/tháng)</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Khoản giảm trừ</th>
              <th style={thStyle}>2025</th>
              <th style={thStyle}>2026</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Bản thân</td>
              <td style={tdStyle}>{fmt(LAW_2025.personalDeduction)}đ</td>
              <td style={changedStyle}>{fmt(LAW_2026.personalDeduction)}đ</td>
            </tr>
            <tr>
              <td style={tdStyle}>Mỗi người phụ thuộc</td>
              <td style={tdStyle}>{fmt(LAW_2025.dependantDeduction)}đ</td>
              <td style={changedStyle}>{fmt(LAW_2026.dependantDeduction)}đ</td>
            </tr>
          </tbody>
        </table>
        <div style={refStyle}>
          Căn cứ: {deductionRefs.map((r, i) => (
            <span key={r.code}>
              {i > 0 && ' · '}
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}>{r.code}</a>
            </span>
          ))}
        </div>
      </div>

      {/* Section 3: Bậc thuế TNCN — side by side */}
      <div style={sectionStyle}>
        <div style={sectionHeader}>Bậc thuế TNCN lũy tiến từng phần</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ borderRight: '1px solid var(--border)' }}>
            <div style={{ padding: '10px 14px', fontWeight: 600, fontSize: 14, background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              2025 — 7 bậc
            </div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Thu nhập tính thuế</th>
                  <th style={thStyle}>Thuế suất</th>
                </tr>
              </thead>
              <tbody>
                {LAW_2025.taxBrackets.map((b, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{b.label}</td>
                    <td style={tdStyle}>{fmtRate(b.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div style={{ padding: '10px 14px', fontWeight: 600, fontSize: 14, background: 'var(--accent-light)', color: 'var(--accent)', borderBottom: '1px solid var(--border)' }}>
              2026 — 5 bậc
            </div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Thu nhập tính thuế</th>
                  <th style={thStyle}>Thuế suất</th>
                </tr>
              </thead>
              <tbody>
                {LAW_2026.taxBrackets.map((b, i) => (
                  <tr key={i}>
                    <td style={changedStyle}>{b.label}</td>
                    <td style={changedStyle}>{fmtRate(b.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={refStyle}>
          Căn cứ: {taxRefs.map((r, i) => (
            <span key={r.code}>
              {i > 0 && ' · '}
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}>{r.code}</a>
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
