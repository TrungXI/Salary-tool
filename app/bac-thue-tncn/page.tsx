import type { Metadata } from 'next'
import CalcForm from '@/components/CalcForm'
import FaqJsonLd from '@/components/FaqJsonLd'
import LegalBadge from '@/components/LegalBadge'
import { LEGAL_REFS } from '@/lib/legalRefs'
import { FAQ_BAC_THUE } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Bậc thuế thu nhập cá nhân 2026 | Luật 109/2025/QH15 | TínhLương.vn',
  description: 'Bảng 5 bậc thuế TNCN lũy tiến theo Luật thuế TNCN 109/2025/QH15, áp dụng từ 01/01/2026. Bậc 1: 5%, Bậc 5: 35%.',
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  overflow: 'hidden',
  marginBottom: 24,
}
const thStyle: React.CSSProperties = {
  background: 'var(--surface2)',
  fontWeight: 600,
  padding: '12px 16px',
  borderBottom: '1px solid var(--border)',
  fontSize: 14,
  textAlign: 'left',
}
const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid var(--border)',
  fontSize: 14,
}
const h2Style: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  margin: '32px 0 12px',
  color: 'var(--text)',
}
const pStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  color: 'var(--text)',
  margin: '0 0 12px',
}

// Hardcoded — keep in sync with lib/salary.ts TAX_BRACKETS
const BRACKETS_2026 = [
  { bac: 1, range: 'Đến 10 triệu', rate: '5%', formula: 'TN × 5%' },
  { bac: 2, range: '10 – 30 triệu', rate: '10%', formula: 'TN × 10% − 500,000' },
  { bac: 3, range: '30 – 60 triệu', rate: '20%', formula: 'TN × 20% − 3,500,000' },
  { bac: 4, range: '60 – 100 triệu', rate: '30%', formula: 'TN × 30% − 9,500,000' },
  { bac: 5, range: 'Trên 100 triệu', rate: '35%', formula: 'TN × 35% − 14,500,000' },
]

export default function Page() {
  const taxRef = LEGAL_REFS.find(r => r.category === 'pit')

  return (
    <div>
      <FaqJsonLd items={FAQ_BAC_THUE} />

      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
        Bậc thuế TNCN 2026 — 5 bậc lũy tiến
      </h1>

      <p style={pStyle}>
        Theo <strong>Luật thuế thu nhập cá nhân 109/2025/QH15</strong>, biểu thuế lũy tiến từng phần áp dụng cho
        thu nhập từ tiền lương, tiền công được rút gọn từ 7 bậc xuống còn <strong>5 bậc</strong>, áp dụng từ kỳ tính thuế 2026
        (thu nhập phát sinh từ 01/01/2026).
      </p>

      <p style={pStyle}>
        Thuế lũy tiến từng phần nghĩa là: phần thu nhập rơi vào bậc nào sẽ chịu thuế suất của bậc đó —
        không phải toàn bộ thu nhập bị áp một mức duy nhất.
      </p>

      <h2 style={h2Style}>Bảng 5 bậc thuế TNCN 2026</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Bậc</th>
            <th style={thStyle}>Thu nhập tính thuế (TN)</th>
            <th style={thStyle}>Thuế suất</th>
            <th style={thStyle}>Công thức rút gọn</th>
          </tr>
        </thead>
        <tbody>
          {BRACKETS_2026.map(b => (
            <tr key={b.bac}>
              <td style={{ ...tdStyle, fontWeight: 700 }}>{b.bac}</td>
              <td style={tdStyle}>{b.range}</td>
              <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>{b.rate}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{b.formula}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2Style}>Thu nhập tính thuế (TN) được tính như thế nào?</h2>
      <p style={pStyle}>
        <strong>TN</strong> = Thu nhập chịu thuế − Các khoản giảm trừ
      </p>
      <p style={pStyle}>
        Trong đó: <strong>Thu nhập chịu thuế</strong> = Tổng lương Gross − BHXH/BHYT/BHTN người lao động đóng (10.5%) − Các khoản phụ cấp được miễn thuế theo quy định.
      </p>
      <p style={pStyle}>
        <strong>Giảm trừ gia cảnh 2026</strong> (theo Nghị quyết 110/2025/UBTVQH15):
      </p>
      <ul style={{ ...pStyle, paddingLeft: 24 }}>
        <li>Bản thân người nộp thuế: <strong>15.500.000đ/tháng</strong></li>
        <li>Mỗi người phụ thuộc: <strong>6.200.000đ/tháng</strong></li>
      </ul>

      <h2 style={h2Style}>Ví dụ tính thuế với thu nhập 25 triệu</h2>
      <p style={pStyle}>
        Giả sử thu nhập tính thuế TN = 25.000.000đ. Áp dụng công thức rút gọn bậc 2 (10–30 triệu):
        <br />
        Thuế phải nộp = 25.000.000 × 10% − 500.000 = <strong>2.000.000đ</strong>
      </p>

      <h2 style={h2Style}>Thử tính lương của bạn</h2>
      <CalcForm initialGross={25_000_000} />

      <div style={{ marginTop: 40, padding: '16px 18px', background: 'var(--surface2)', borderRadius: 'var(--radius)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <LegalBadge />
        {taxRef && (
          <a
            href={taxRef.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
          >
            Xem toàn văn {taxRef.code} →
          </a>
        )}
      </div>
    </div>
  )
}
