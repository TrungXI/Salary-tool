import type { Metadata } from 'next'
import BudgetCalc from './BudgetCalc'

export const metadata: Metadata = {
  title: 'Quy tắc 50/30/20 chia ngân sách theo lương | TínhLương.vn',
  description: 'Chia lương Net theo quy tắc 50% nhu cầu thiết yếu / 30% mong muốn / 20% tiết kiệm. Tính ngay từ lương của bạn.',
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
        Quy tắc 50/30/20 — Chia ngân sách theo lương
      </h1>
      <p style={pStyle}>
        Quy tắc <strong>50/30/20</strong> (Elizabeth Warren, 2005) là cách chia ngân sách đơn giản nhất sau khi nhận lương:
        <strong> 50% cho nhu cầu thiết yếu</strong>, <strong>30% cho mong muốn cá nhân</strong>,
        <strong> 20% cho tiết kiệm và đầu tư</strong>. Áp dụng trên <strong>lương Net</strong> (sau thuế, sau BHXH).
      </p>

      <h2 style={h2Style}>Calculator 50/30/20</h2>
      <BudgetCalc />

      <h2 style={h2Style}>Vì sao là 50/30/20?</h2>
      <p style={pStyle}>
        Khi nhu cầu thiết yếu ≤ 50% lương Net, bạn còn dư cho cuộc sống và tích lũy. Nếu nhu cầu thiết yếu chiếm hơn 50%
        (thuê nhà quá đắt, vay tiêu dùng cao...), bạn sẽ không có đủ buffer cho tiết kiệm — đây là dấu hiệu cần xem lại chi phí cố định.
        20% tiết kiệm/đầu tư là mức tối thiểu để xây quỹ khẩn cấp, hưu trí, và mục tiêu dài hạn khác.
      </p>

      <h2 style={h2Style}>Khi nào cần điều chỉnh tỷ lệ?</h2>
      <p style={pStyle}>
        <strong>Thu nhập thấp</strong> (sinh viên mới ra trường, ở thành phố lớn) → có thể 60/25/15 ban đầu, tăng dần tỷ lệ tiết kiệm khi lương tăng.
        <br />
        <strong>Mục tiêu mua nhà / con cái</strong> → đẩy tiết kiệm lên 30–40%, cắt phần &ldquo;mong muốn&rdquo;.
        <br />
        <strong>Đã có quỹ khẩn cấp + hưu trí trên track</strong> → có thể giảm tiết kiệm xuống 15%, dùng phần dư cho trải nghiệm.
      </p>

      <h2 style={h2Style}>Phân biệt &ldquo;nhu cầu&rdquo; vs &ldquo;mong muốn&rdquo;</h2>
      <p style={pStyle}>
        <strong>Nhu cầu</strong> = thứ bạn không cắt được nếu không muốn mất chỗ ở, mất sức khỏe, mất việc. Tiền nhà, ăn uống cơ bản, đi lại đi làm, hóa đơn, bảo hiểm, học phí con.
        <br />
        <strong>Mong muốn</strong> = thứ bạn cắt được mà không hỏng cuộc sống cơ bản. Netflix, ăn nhà hàng, cà phê take-away, mua quần áo mới, du lịch, đồ điện tử nâng cấp.
      </p>
      <p style={pStyle}>
        Test: &ldquo;Nếu tháng này không tiêu khoản này, tôi vẫn có thể sống và đi làm bình thường không?&rdquo; Nếu CÓ → đó là mong muốn.
      </p>
    </article>
  )
}
