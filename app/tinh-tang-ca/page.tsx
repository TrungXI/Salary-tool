import type { Metadata } from 'next'
import Link from 'next/link'
import OvertimeCalc from './OvertimeCalc'

export const metadata: Metadata = {
  title: 'Tính lương tăng ca 150% / 200% / 300% | TínhLương.vn',
  description:
    'Calculator tính lương tăng ca theo Luật Lao động 2019 — ngày thường 150%, ngày nghỉ 200%, ngày lễ 300%.',
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
        Tính lương tăng ca — 150% / 200% / 300%
      </h1>
      <p style={pStyle}>
        Tăng ca là thời gian làm việc ngoài giờ tiêu chuẩn (8 giờ/ngày, 48 giờ/tuần). Theo{' '}
        <strong>Điều 98 Bộ luật Lao động 2019</strong>, người lao động được trả lương cao hơn so với giờ làm việc bình
        thường: ngày thường <strong>≥ 150%</strong>, ngày nghỉ tuần <strong>≥ 200%</strong>, ngày lễ / Tết{' '}
        <strong>≥ 300%</strong>.
      </p>

      <h2 style={h2Style}>Calculator tăng ca theo giờ</h2>
      <OvertimeCalc />

      <h2 style={h2Style}>Công thức tính lương tăng ca</h2>
      <p style={pStyle}>Trước hết, xác định <strong>lương giờ bình thường</strong>:</p>
      <ul style={ulStyle}>
        <li>
          <strong>Lương ngày</strong> = Lương gross tháng ÷ Số ngày làm việc trong tháng (thường 26 hoặc 22 ngày).
        </li>
        <li>
          <strong>Lương giờ</strong> = Lương ngày ÷ 8.
        </li>
      </ul>
      <p style={pStyle}>Sau đó nhân với hệ số tăng ca:</p>
      <ul style={ulStyle}>
        <li>
          <strong>Tăng ca ngày thường (T2–T6, T7 nếu có làm):</strong> Lương giờ × Số giờ tăng ca × <strong>150%</strong>.
        </li>
        <li>
          <strong>Tăng ca ngày nghỉ tuần (T7/CN tuỳ lịch):</strong> Lương giờ × Số giờ × <strong>200%</strong>.
        </li>
        <li>
          <strong>Tăng ca ngày lễ, Tết, ngày nghỉ có hưởng lương:</strong> Lương giờ × Số giờ × <strong>300%</strong>.
        </li>
        <li>
          Tăng ca <strong>ban đêm</strong> (22:00–06:00) được cộng thêm <strong>≥ 30%</strong> lương giờ bình thường, và
          nếu trùng với ngày nghỉ / lễ thì cộng dồn các hệ số.
        </li>
      </ul>

      <h2 style={h2Style}>Giới hạn giờ tăng ca</h2>
      <p style={pStyle}>
        Theo <strong>Điều 107 BLLĐ 2019</strong>, doanh nghiệp không được huy động người lao động tăng ca vượt quá:
      </p>
      <ul style={ulStyle}>
        <li><strong>50% số giờ làm việc bình thường / ngày</strong> (tức tối đa 4 giờ tăng ca / ngày).</li>
        <li><strong>40 giờ / tháng</strong>.</li>
        <li><strong>200 giờ / năm</strong> — một số ngành đặc thù (dệt may, da giày, chế biến thuỷ sản, sản xuất linh kiện điện tử…) được phép tới <strong>300 giờ / năm</strong> theo Điều 107.2.</li>
      </ul>
      <p style={pStyle}>
        Vượt mức trên là vi phạm pháp luật — doanh nghiệp có thể bị phạt từ 5 triệu đến 75 triệu đồng theo Nghị định
        12/2022/NĐ-CP, tuỳ số lượng người lao động bị huy động sai quy định.
      </p>

      <h2 style={h2Style}>Tăng ca có chịu thuế TNCN và BHXH không?</h2>
      <p style={pStyle}>
        <strong>BHXH:</strong> Phần tiền tăng ca <strong>không</strong> tính vào lương đóng BHXH.
        <br />
        <strong>Thuế TNCN:</strong> Phần lương tăng ca tương ứng <strong>vượt mức bình thường</strong> (tức phần 50% với
        ngày thường, 100% với ngày nghỉ, 200% với ngày lễ) được <strong>miễn thuế</strong> theo Điểm i, Khoản 1, Điều 3
        Luật thuế TNCN. Phần còn lại (100% lương giờ bình thường) vẫn tính thuế như lương thường.
      </p>

      <div
        style={{
          marginTop: 32,
          padding: '16px 18px',
          background: 'var(--accent-light)',
          border: '1px solid var(--accent)',
          borderRadius: 'var(--radius)',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>Tính lương đầy đủ?</div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
          Dùng{' '}
          <Link href="/tinh-luong" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            calculator lương Gross / Net 2026
          </Link>{' '}
          để tính tổng thu nhập cả lương cơ bản và tăng ca, hoặc xem{' '}
          <Link href="/tinh-phep-nam" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            phép năm theo thâm niên
          </Link>
          .
        </p>
      </div>
    </article>
  )
}
