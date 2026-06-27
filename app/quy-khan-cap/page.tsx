import type { Metadata } from 'next'
import Link from 'next/link'
import EmergencyFundCalc from './EmergencyFundCalc'

export const metadata: Metadata = {
  title: 'Tính quỹ khẩn cấp cần có | TínhLương.vn',
  description: 'Tính quỹ khẩn cấp 3–6 tháng chi phí sinh hoạt từ lương của bạn. Bước đầu tiên để tài chính lành mạnh.',
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
        Tính quỹ khẩn cấp cần có
      </h1>
      <p style={pStyle}>
        <strong>Quỹ khẩn cấp</strong> là khoản tiền dự phòng cho các tình huống bất ngờ — mất việc, ốm đau,
        sửa chữa lớn... Mục tiêu phổ biến là <strong>3–6 tháng chi phí sinh hoạt</strong>, để trống trong tài khoản tiết kiệm dễ rút.
        Đây là <strong>bước đầu tiên</strong> trước khi nghĩ đến đầu tư hay vay nợ.
      </p>

      <h2 style={h2Style}>Calculator quỹ khẩn cấp</h2>
      <EmergencyFundCalc />

      <h2 style={h2Style}>Bao nhiêu tháng là đủ?</h2>
      <p style={pStyle}>
        <strong>3 tháng</strong> — tối thiểu nếu bạn có công việc ổn định, hai vợ chồng cùng thu nhập, không có người phụ thuộc.
        <br />
        <strong>6 tháng</strong> — tiêu chuẩn phổ biến, phù hợp đa số người làm công ăn lương.
        <br />
        <strong>12 tháng</strong> — nếu bạn làm freelance, hoa hồng, hoặc thu nhập biến động lớn.
      </p>

      <h2 style={h2Style}>Để quỹ khẩn cấp ở đâu?</h2>
      <p style={pStyle}>
        Quỹ khẩn cấp ưu tiên <strong>tính thanh khoản</strong> — phải rút được trong 1–2 ngày, không bị mất gốc.
        Lựa chọn phổ biến: tài khoản tiết kiệm online lãi cao (Techcombank, VPBank, Cake...) hoặc chứng chỉ tiền gửi kỳ hạn ngắn 1–3 tháng.
        Tránh cổ phiếu, quỹ mở dài hạn, bất động sản — không phù hợp vì lúc khẩn cấp thường là lúc thị trường giảm.
      </p>

      <div style={{ marginTop: 32, padding: '16px 18px', background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Đã có quỹ khẩn cấp? Bước tiếp theo:
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.7 }}>
          <Link href="/50-30-20" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Chia ngân sách theo quy tắc 50/30/20 →
          </Link>
          <br />
          <Link href="/tiet-kiem-huu-tri" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Tính tiết kiệm hưu trí với lãi kép →
          </Link>
        </p>
      </div>
    </article>
  )
}
