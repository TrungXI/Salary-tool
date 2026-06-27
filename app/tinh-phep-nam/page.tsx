import type { Metadata } from 'next'
import Link from 'next/link'
import LeaveCalc from './LeaveCalc'

export const metadata: Metadata = {
  title: 'Tính phép năm theo thâm niên | TínhLương.vn',
  description: 'Số ngày phép năm theo thâm niên làm việc theo Điều 113 Bộ luật Lao động 2019.',
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

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  overflow: 'hidden',
  fontSize: 14,
}
const thStyle: React.CSSProperties = {
  background: 'var(--surface2)',
  fontWeight: 600,
  padding: '10px 14px',
  borderBottom: '1px solid var(--border)',
  fontSize: 13,
  textAlign: 'left',
  color: 'var(--text)',
}
const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid var(--border)',
  fontSize: 14,
  color: 'var(--text)',
}

export default function Page() {
  return (
    <article>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Tính phép năm theo thâm niên
      </h1>
      <p style={pStyle}>
        Theo <strong>Điều 113 Bộ luật Lao động 2019</strong>, người lao động làm đủ 12 tháng cho một người sử dụng lao
        động được nghỉ phép có hưởng lương <strong>tối thiểu 12 ngày / năm</strong> với công việc thông thường,{' '}
        <strong>14 ngày / năm</strong> với công việc nặng nhọc/độc hại/nguy hiểm hoặc người khuyết tật. Cứ đủ{' '}
        <strong>5 năm thâm niên</strong> được thêm <strong>1 ngày phép / năm</strong> theo Điều 114.
      </p>

      <h2 style={h2Style}>Calculator phép năm</h2>
      <LeaveCalc />

      <h2 style={h2Style}>Bảng tham chiếu</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Thâm niên</th>
              <th style={thStyle}>Công việc thường</th>
              <th style={thStyle}>Nặng nhọc / Độc hại</th>
              <th style={thStyle}>Người khuyết tật</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>&lt; 5 năm</td>
              <td style={tdStyle}>12 ngày</td>
              <td style={tdStyle}>14 ngày</td>
              <td style={tdStyle}>14 ngày</td>
            </tr>
            <tr>
              <td style={tdStyle}>5 – 9 năm</td>
              <td style={tdStyle}>13 ngày</td>
              <td style={tdStyle}>15 ngày</td>
              <td style={tdStyle}>15 ngày</td>
            </tr>
            <tr>
              <td style={tdStyle}>10 – 14 năm</td>
              <td style={tdStyle}>14 ngày</td>
              <td style={tdStyle}>16 ngày</td>
              <td style={tdStyle}>16 ngày</td>
            </tr>
            <tr>
              <td style={tdStyle}>15 – 19 năm</td>
              <td style={tdStyle}>15 ngày</td>
              <td style={tdStyle}>17 ngày</td>
              <td style={tdStyle}>17 ngày</td>
            </tr>
            <tr>
              <td style={tdStyle}>≥ 20 năm</td>
              <td style={tdStyle}>16 ngày</td>
              <td style={tdStyle}>18 ngày</td>
              <td style={tdStyle}>18 ngày</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>Phép năm chưa nghỉ thì xử lý ra sao?</h2>
      <ul style={ulStyle}>
        <li>
          Người lao động <strong>nghỉ việc</strong> hoặc <strong>mất việc</strong> mà chưa nghỉ hết phép năm: được thanh
          toán bằng tiền theo tiền lương ngày bình thường tại thời điểm chấm dứt hợp đồng (Điều 113.3 BLLĐ 2019).
        </li>
        <li>
          Người lao động đang làm việc <strong>không có quyền yêu cầu thanh toán tiền</strong> phép chưa nghỉ — phải nghỉ
          theo lịch hoặc thoả thuận chuyển sang năm kế tiếp với công ty.
        </li>
        <li>
          Người sử dụng lao động phải <strong>thông báo lịch nghỉ phép hằng năm</strong> sau khi tham khảo ý kiến người
          lao động.
        </li>
      </ul>

      <h2 style={h2Style}>Phép năm vs nghỉ lễ Tết, nghỉ ốm, nghỉ thai sản</h2>
      <ul style={ulStyle}>
        <li>
          <strong>Phép năm (Điều 113)</strong> là ngày nghỉ hằng năm có lương — tính theo thâm niên.
        </li>
        <li>
          <strong>Nghỉ lễ, Tết (Điều 112)</strong> tách riêng — 11 ngày/năm (Tết Dương lịch, Tết Âm lịch 5 ngày, Giỗ
          tổ, 30/4, 1/5, 2/9 — 2 ngày), không trừ vào phép năm.
        </li>
        <li>
          <strong>Nghỉ việc riêng có lương (Điều 115)</strong>: kết hôn 3 ngày, con kết hôn 1 ngày, bố mẹ / vợ chồng /
          con mất 3 ngày — cũng không trừ vào phép năm.
        </li>
        <li>
          <strong>Nghỉ ốm / thai sản</strong> hưởng trợ cấp BHXH theo Luật BHXH, không thuộc phép năm.
        </li>
      </ul>

      <div
        style={{
          marginTop: 32,
          padding: '16px 18px',
          background: 'var(--accent-light)',
          border: '1px solid var(--accent)',
          borderRadius: 'var(--radius)',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>Công cụ liên quan</div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
          <Link href="/tinh-tang-ca" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Tính lương tăng ca 150/200/300% →
          </Link>
          <br />
          <Link href="/thuong-tet" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Ước tính thưởng Tết →
          </Link>
        </p>
      </div>
    </article>
  )
}
