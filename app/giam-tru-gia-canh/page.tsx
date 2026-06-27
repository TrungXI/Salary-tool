import type { Metadata } from 'next'
import Link from 'next/link'
import QuickDeductionCalc from './QuickDeductionCalc'

export const metadata: Metadata = {
  title: 'Bảng giảm trừ gia cảnh 2026 | TínhLương.vn',
  description: 'Mức giảm trừ gia cảnh bản thân 15,5 triệu và người phụ thuộc 6,2 triệu/người theo Nghị quyết 110/2025/UBTVQH15. Tính ngay số thuế tiết kiệm được.',
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
const ulStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.8,
  color: 'var(--text)',
  margin: '0 0 12px',
  paddingLeft: 22,
}

export default function Page() {
  return (
    <article>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Bảng giảm trừ gia cảnh 2026
      </h1>
      <p style={pStyle}>
        Giảm trừ gia cảnh là khoản được trừ khỏi thu nhập trước khi tính thuế TNCN. Mức giảm trừ mới năm 2026 được điều
        chỉnh tăng theo <strong>Nghị quyết 110/2025/UBTVQH15</strong>, áp dụng cho kỳ tính thuế từ{' '}
        <strong>01/01/2026</strong>.
      </p>

      <h2 style={h2Style}>Bảng mức giảm trừ 2026</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Đối tượng</th>
            <th style={thStyle}>Mức giảm trừ / tháng</th>
            <th style={thStyle}>Căn cứ pháp lý</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Bản thân người nộp thuế</td>
            <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>15.500.000 đ</td>
            <td style={tdStyle}>Nghị quyết 110/2025/UBTVQH15</td>
          </tr>
          <tr>
            <td style={tdStyle}>Mỗi người phụ thuộc</td>
            <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>6.200.000 đ</td>
            <td style={tdStyle}>Nghị quyết 110/2025/UBTVQH15</td>
          </tr>
        </tbody>
      </table>
      <p style={{ ...pStyle, fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>
        So với mức cũ (11 triệu / 4,4 triệu), giảm trừ năm 2026 tăng khoảng 40% — phản ánh mức sống và chỉ số CPI đã thay đổi.
      </p>

      <h2 style={h2Style}>Ai được tính là người phụ thuộc?</h2>
      <p style={pStyle}>
        Theo Luật thuế TNCN 109/2025/QH15, các đối tượng sau được tính là người phụ thuộc nếu có thu nhập bình quân
        tháng <strong>không vượt 1.000.000 đ</strong>:
      </p>
      <ul style={ulStyle}>
        <li><strong>Con dưới 18 tuổi</strong> — gồm cả con đẻ, con nuôi hợp pháp, con ngoài giá thú, con riêng của vợ/chồng.</li>
        <li>
          <strong>Con từ 18 tuổi trở lên bị khuyết tật</strong>, không có khả năng lao động, hoặc đang theo học đại học,
          cao đẳng, trung cấp, dạy nghề không có thu nhập.
        </li>
        <li><strong>Vợ / chồng</strong> không có thu nhập hoặc thu nhập ≤ 1 triệu/tháng (gồm cả trường hợp đang nuôi con nhỏ, mất sức lao động).</li>
        <li>
          <strong>Bố mẹ đẻ, bố mẹ vợ, bố mẹ chồng, ông bà nội, ông bà ngoại</strong> ngoài độ tuổi lao động (nam ≥ 60, nữ ≥ 55)
          hoặc trong độ tuổi lao động nhưng bị khuyết tật, mất sức lao động.
        </li>
        <li>Các cá nhân khác không nơi nương tựa mà người nộp thuế đang trực tiếp nuôi dưỡng.</li>
      </ul>

      <h2 style={h2Style}>Tính nhanh số thuế tiết kiệm</h2>
      <p style={pStyle}>
        Nhập số người phụ thuộc để xem tổng giảm trừ và ước lượng số thuế bạn tiết kiệm được mỗi tháng:
      </p>
      <QuickDeductionCalc />

      <h2 style={h2Style}>Cách đăng ký người phụ thuộc</h2>
      <ul style={ulStyle}>
        <li>
          <strong>Lần đầu đăng ký:</strong> nộp mẫu <strong>02/ĐK-NPT-TNCN</strong> (kèm bản sao giấy tờ chứng minh)
          cho phòng kế toán / nhân sự công ty <strong>trước 31/12</strong> của năm tính thuế.
        </li>
        <li>
          <strong>Hồ sơ chứng minh:</strong> giấy khai sinh (với con), CCCD / CMND người phụ thuộc, giấy xác nhận khuyết tật,
          giấy xác nhận không có thu nhập của UBND xã / phường.
        </li>
        <li>
          <strong>Có thay đổi:</strong> khi người phụ thuộc có thu nhập vượt 1 triệu/tháng, đủ 18 tuổi (con), kết hôn,
          mất... bạn phải báo lại để dừng giảm trừ.
        </li>
        <li>
          <strong>Mỗi người phụ thuộc</strong> chỉ được tính giảm trừ cho <strong>một người nộp thuế</strong> trong cùng kỳ tính thuế.
        </li>
      </ul>

      <div style={{ marginTop: 32, padding: '16px 18px', background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Cần tính lương đầy đủ với giảm trừ này?
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
          Dùng{' '}
          <Link href="/tinh-luong" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            calculator lương Gross / Net 2026
          </Link>{' '}
          hoặc{' '}
          <Link href="/hoan-thue-tncn" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            calculator hoàn thuế TNCN
          </Link>{' '}
          để xem chi tiết.
        </p>
      </div>
    </article>
  )
}
