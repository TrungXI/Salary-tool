import type { Metadata } from 'next'
import DtiCalc from './DtiCalc'

export const metadata: Metadata = {
  title: 'Tính DTI — Bạn có đủ điều kiện vay ngân hàng? | TínhLương.vn',
  description: 'Tính tỷ lệ nợ trên thu nhập (DTI) để biết bạn có đủ điều kiện vay ngân hàng. Thông thường ngân hàng yêu cầu DTI ≤ 40%.',
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  overflow: 'hidden',
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

const BANK_RATES = [
  { name: 'Vietcombank', first: '6.5 – 7.5%', after: '9.5 – 10.5%' },
  { name: 'BIDV',        first: '6.8 – 7.8%', after: '9.8 – 10.8%' },
  { name: 'Techcombank', first: '7.0 – 8.0%', after: '10.0 – 11.0%' },
  { name: 'VPBank',      first: '7.5 – 8.5%', after: '10.5 – 11.5%' },
  { name: 'TPBank',      first: '7.8 – 8.8%', after: '10.8 – 11.8%' },
]

export default function Page() {
  return (
    <article>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Tính DTI — Bạn có đủ điều kiện vay ngân hàng?
      </h1>
      <p style={pStyle}>
        <strong>DTI (Debt-to-Income ratio)</strong> là tỷ lệ tổng nghĩa vụ nợ / thu nhập hàng tháng.
        Hầu hết ngân hàng Việt Nam yêu cầu <strong>DTI ≤ 40%</strong> để phê duyệt khoản vay.
      </p>

      <h2 style={h2Style}>Calculator DTI</h2>
      <DtiCalc />

      <h2 style={h2Style}>Vì sao ngân hàng quan tâm DTI?</h2>
      <p style={pStyle}>
        DTI phản ánh khả năng trả nợ của bạn. Tỷ lệ thấp nghĩa là phần thu nhập sau khi trừ nghĩa vụ nợ còn đủ
        để chi tiêu sinh hoạt và đối phó rủi ro — ngược lại, DTI cao đồng nghĩa với việc bạn dễ rơi vào tình trạng
        mất khả năng thanh toán khi có biến động (giảm lương, mất việc, lãi suất tăng).
      </p>

      <h2 style={h2Style}>Lãi suất vay tham khảo 2026</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Ngân hàng</th>
            <th style={thStyle}>Lãi suất (năm đầu)</th>
            <th style={thStyle}>Lãi suất từ năm 2</th>
          </tr>
        </thead>
        <tbody>
          {BANK_RATES.map(b => (
            <tr key={b.name}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{b.name}</td>
              <td style={{ ...tdStyle, color: 'var(--accent)', fontWeight: 600 }}>{b.first}</td>
              <td style={tdStyle}>{b.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ ...pStyle, fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>
        Lãi suất tham khảo, thay đổi theo thời điểm.
      </p>
    </article>
  )
}
