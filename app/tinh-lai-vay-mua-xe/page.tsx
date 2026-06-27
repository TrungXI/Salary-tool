import type { Metadata } from 'next'
import Link from 'next/link'
import CarLoanCalc from './CarLoanCalc'

export const metadata: Metadata = {
  title: 'Tính lãi vay mua xe trả góp | TínhLương.vn',
  description: 'Calculator tính lãi suất và số tiền trả góp mua xe hàng tháng. Nhập giá xe, trả trước, lãi suất để tính ngay.',
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
        Tính lãi vay mua xe trả góp
      </h1>
      <p style={pStyle}>
        Tính nhanh số tiền trả góp hàng tháng khi mua xe trả góp. Nhập giá xe, tiền trả trước, lãi suất và kỳ hạn —
        kết quả tính theo phương pháp <strong>dư nợ giảm dần</strong>.
      </p>

      <h2 style={h2Style}>Calculator vay mua xe</h2>
      <CarLoanCalc />

      <h2 style={h2Style}>Lưu ý khi vay mua xe</h2>
      <p style={pStyle}>
        Đa số ngân hàng tại Việt Nam cho vay tối đa <strong>70 – 80%</strong> giá trị xe mới và{' '}
        <strong>50 – 60%</strong> giá trị xe cũ. Kỳ hạn phổ biến từ <strong>12 đến 60 tháng</strong>. Khoản vay càng dài,
        tổng lãi phải trả càng lớn.
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
