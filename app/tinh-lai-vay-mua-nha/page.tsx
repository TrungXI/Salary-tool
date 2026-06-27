import type { Metadata } from 'next'
import Link from 'next/link'
import HomeLoanCalc from './HomeLoanCalc'

export const metadata: Metadata = {
  title: 'Tính lãi vay mua nhà 2026 | TínhLương.vn',
  description: 'Calculator tính lãi suất và số tiền trả góp mua nhà hàng tháng theo phương pháp dư nợ giảm dần.',
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

export default function Page() {
  return (
    <article>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Tính lãi vay mua nhà 2026
      </h1>
      <p style={pStyle}>
        Tính chính xác số tiền trả góp hàng tháng khi vay mua bất động sản theo phương pháp{' '}
        <strong>dư nợ giảm dần</strong> — phương pháp phổ biến nhất tại các ngân hàng Việt Nam. Hỗ trợ thêm{' '}
        <strong>lãi suất ưu đãi năm đầu</strong> để mô phỏng các gói vay thực tế.
      </p>

      <h2 style={h2Style}>Calculator vay mua nhà</h2>
      <HomeLoanCalc />

      <h2 style={h2Style}>Công thức dư nợ giảm dần</h2>
      <p style={pStyle}>
        Phương pháp dư nợ giảm dần tính lãi trên số dư nợ thực tế còn lại mỗi tháng, không phải trên số tiền vay gốc.
        Tiền trả hàng tháng <strong>cố định</strong>, nhưng tỷ lệ gốc / lãi thay đổi: những tháng đầu trả nhiều lãi, các tháng sau trả nhiều gốc hơn.
      </p>
      <p style={{ ...pStyle, fontFamily: 'monospace', fontSize: 13, background: 'var(--surface2)', padding: '10px 14px', borderRadius: 'var(--radius)' }}>
        Trả góp / tháng = P × r × (1 + r)^n / ((1 + r)^n − 1)
        <br />
        Trong đó: P = số tiền vay, r = lãi suất tháng (= lãi suất năm / 12), n = số tháng vay.
      </p>

      <div style={{ marginTop: 32, padding: '16px 18px', background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Bạn có đủ điều kiện vay theo lương?
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
          <Link href="/tinh-dti" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Kiểm tra điều kiện vay theo lương của bạn →
          </Link>
        </p>
      </div>
    </article>
  )
}
