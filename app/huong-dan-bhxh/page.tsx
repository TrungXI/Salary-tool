import type { Metadata } from 'next'
import Link from 'next/link'
import { calculateSalary } from '@/lib/salary'
import LegalBadge from '@/components/LegalBadge'
import { LEGAL_REFS } from '@/lib/legalRefs'

export const metadata: Metadata = {
  title: 'Hướng dẫn tính BHXH, BHYT, BHTN 2026 | TínhLương.vn',
  description: 'Cách tính BHXH 8%, BHYT 1.5%, BHTN 1% cho người lao động theo Luật BHXH 41/2024/QH15.',
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

const fmt = (n: number) => n.toLocaleString('vi-VN')

export default function Page() {
  const bhxhRef = LEGAL_REFS.find(r => r.category === 'social_insurance')

  // Tính ví dụ với lương 20 triệu (server-side)
  const example = calculateSalary({
    grossSalary: 20_000_000,
    dependants: 0,
    region: 1,
    allowances: 0,
    employeeType: 'full',
  })

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
        Hướng dẫn tính BHXH 2026
      </h1>

      <p style={pStyle}>
        Theo <strong>Luật Bảo hiểm xã hội 41/2024/QH15</strong>, người lao động có hợp đồng lao động từ 1 tháng trở lên
        đều thuộc đối tượng tham gia BHXH bắt buộc. Mức đóng được tính trên tiền lương tháng làm căn cứ đóng BHXH.
      </p>

      <h2 style={h2Style}>Tỷ lệ đóng BHXH 2026</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Khoản đóng</th>
            <th style={thStyle}>Người lao động</th>
            <th style={thStyle}>Người sử dụng lao động</th>
            <th style={thStyle}>Tổng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>BHXH</td>
            <td style={tdStyle}>8%</td>
            <td style={tdStyle}>17.5%</td>
            <td style={{ ...tdStyle, fontWeight: 700 }}>25.5%</td>
          </tr>
          <tr>
            <td style={tdStyle}>BHYT</td>
            <td style={tdStyle}>1.5%</td>
            <td style={tdStyle}>3%</td>
            <td style={{ ...tdStyle, fontWeight: 700 }}>4.5%</td>
          </tr>
          <tr>
            <td style={tdStyle}>BHTN</td>
            <td style={tdStyle}>1%</td>
            <td style={tdStyle}>1%</td>
            <td style={{ ...tdStyle, fontWeight: 700 }}>2%</td>
          </tr>
          <tr style={{ background: 'var(--accent-light)' }}>
            <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>Tổng</td>
            <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>10.5%</td>
            <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>21.5%</td>
            <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>32%</td>
          </tr>
        </tbody>
      </table>

      <h2 style={h2Style}>Mức trần đóng BHXH</h2>
      <p style={pStyle}>
        Mức tiền lương tháng đóng BHXH bắt buộc <strong>tối đa bằng 20 lần mức tham chiếu</strong>.
        Hiện tại (2026), mức tham chiếu là 2.340.000đ → trần đóng BHXH/BHYT = <strong>46.800.000đ/tháng</strong>.
        Phần thu nhập vượt trần không phải đóng BHXH/BHYT.
      </p>
      <p style={pStyle}>
        Đồng thời, mức đóng BHXH <strong>không được thấp hơn lương tối thiểu vùng</strong>.
      </p>

      <h2 style={h2Style}>Thử việc đóng BHXH như thế nào?</h2>
      <p style={pStyle}>
        Người lao động <strong>đang trong thời gian thử việc</strong> không thuộc đối tượng đóng BHXH và BHTN bắt buộc.
        Tuy nhiên, nếu hợp đồng thử việc kèm hợp đồng lao động từ 3 tháng trở lên thì người lao động phải tham gia BHYT.
      </p>
      <p style={pStyle}>
        Sau khi ký hợp đồng lao động chính thức, doanh nghiệp có trách nhiệm đăng ký tham gia BHXH cho người lao động
        trong vòng 30 ngày kể từ ngày ký hợp đồng.
      </p>

      <h2 style={h2Style}>Tính ví dụ với lương 20 triệu</h2>
      <p style={pStyle}>
        Giả sử lương Gross 20.000.000đ/tháng, làm việc chính thức tại Vùng I, không có người phụ thuộc:
      </p>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={tdStyle}>BHXH NLĐ (8%)</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{fmt(example.bhxhEmployee)}đ</td>
          </tr>
          <tr>
            <td style={tdStyle}>BHYT NLĐ (1.5%)</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{fmt(example.bhytEmployee)}đ</td>
          </tr>
          <tr>
            <td style={tdStyle}>BHTN NLĐ (1%)</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{fmt(example.bhtnEmployee)}đ</td>
          </tr>
          <tr style={{ background: 'var(--surface2)' }}>
            <td style={{ ...tdStyle, fontWeight: 700 }}>Tổng NLĐ đóng (10.5%)</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: 'var(--accent)' }}>{fmt(example.totalInsuranceEmployee)}đ</td>
          </tr>
          <tr>
            <td style={tdStyle}>Tổng BHXH/BHYT/BHTN DN đóng (21.5%)</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{fmt(example.totalInsuranceEmployer)}đ</td>
          </tr>
          <tr>
            <td style={tdStyle}>Thuế TNCN</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600 }}>{fmt(example.totalTax)}đ</td>
          </tr>
          <tr style={{ background: 'var(--accent-light)' }}>
            <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>Lương NET thực nhận</td>
            <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 800, color: 'var(--accent)', fontSize: 16 }}>{fmt(example.netSalary)}đ</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: 40, padding: '20px 24px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
        <Link
          href="/"
          style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--accent)', color: 'white', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}
        >
          Dùng công cụ tính lương →
        </Link>
      </div>

      <div style={{ marginTop: 32, padding: '16px 18px', background: 'var(--surface2)', borderRadius: 'var(--radius)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <LegalBadge />
        {bhxhRef && (
          <a
            href={bhxhRef.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
          >
            Xem toàn văn {bhxhRef.code} →
          </a>
        )}
      </div>
    </div>
  )
}
