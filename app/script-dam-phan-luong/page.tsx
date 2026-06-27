import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Script đàm phán offer lương | TínhLương.vn',
  description: 'Mẫu câu và kịch bản đàm phán tăng lương khi nhận offer. Cách nói chuyện lương tự tin, không awkward.',
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
const liStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  color: 'var(--text)',
  marginBottom: 6,
}
const scriptStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderLeft: '3px solid var(--accent)',
  borderRadius: 'var(--radius)',
  padding: '16px 20px',
  fontSize: 15,
  lineHeight: 1.7,
  color: 'var(--text)',
  fontStyle: 'italic',
  margin: '12px 0 16px',
}

export default function Page() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Script đàm phán offer lương
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', margin: '0 0 24px' }}>
        Mẫu câu và kịch bản đàm phán khi nhận offer. Đàm phán lương không phải đối đầu —
        đó là một cuộc trao đổi để hai bên cùng có lợi. Chuẩn bị trước script sẽ giúp bạn
        nói chuyện tự tin, không awkward.
      </p>

      <h2 style={h2Style}>1. Nguyên tắc vàng trước khi đàm phán</h2>
      <ul style={{ paddingLeft: 20, margin: '0 0 12px' }}>
        <li style={liStyle}>
          <strong>Biết lương thị trường</strong> — tham khảo{' '}
          <Link href="/bang-luong-thi-truong" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            bảng lương theo ngành &amp; cấp bậc
          </Link>{' '}
          để có con số tham chiếu.
        </li>
        <li style={liStyle}>
          <strong>Biết lương NET của bạn</strong> — dùng{' '}
          <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            công cụ tính lương Gross/Net
          </Link>{' '}
          để biết chính xác bạn thực nhận bao nhiêu sau thuế và BHXH.
        </li>
        <li style={liStyle}>
          <strong>Không tiết lộ lương cũ trước</strong> — đây là thông tin riêng tư, bạn không có nghĩa vụ phải khai.
          Nói trước số sẽ neo (anchor) cuộc đàm phán vào con số đó.
        </li>
      </ul>

      <h2 style={h2Style}>2. Kịch bản 1 — Nhận offer và negotiate ngay</h2>
      <p style={pStyle}>
        Khi nhà tuyển dụng đưa offer đầu tiên, đừng vội trả lời ngay. Cảm ơn họ, ghi nhận, và phản hồi với mức kỳ vọng:
      </p>
      <div style={scriptStyle}>
        &ldquo;Cảm ơn anh/chị đã offer. Tôi rất hứng thú với vị trí này.
        Dựa trên kinh nghiệm [X năm] và nghiên cứu thị trường,
        tôi kỳ vọng mức gross khoảng [Y triệu].
        Chúng ta có thể thảo luận về mức này không?&rdquo;
      </div>
      <p style={pStyle}>
        Mẫu câu này giữ thái độ tích cực, đưa ra cơ sở dữ liệu (kinh nghiệm + thị trường) và mở cửa cho cuộc thảo luận
        thay vì &ldquo;chốt deal&rdquo; ngay.
      </p>

      <h2 style={h2Style}>3. Kịch bản 2 — Khi bị hỏi &ldquo;Lương hiện tại của bạn là bao nhiêu?&rdquo;</h2>
      <p style={pStyle}>
        Đây là câu hỏi phổ biến nhưng bạn không nên trả lời trực tiếp. Hướng cuộc trò chuyện về giá trị và mức kỳ vọng:
      </p>
      <div style={scriptStyle}>
        &ldquo;Tôi muốn tập trung vào giá trị tôi có thể mang lại cho vị trí này
        thay vì lương cũ. Dựa trên JD và trách nhiệm,
        tôi kỳ vọng khoảng [X] triệu gross.
        Đây có phải range mà công ty đang xem xét không?&rdquo;
      </div>
      <p style={pStyle}>
        Đảo ngược câu hỏi — yêu cầu họ cho range trước. Nhà tuyển dụng thường đã có sẵn budget cho vị trí này,
        bạn chỉ cần khiến họ tiết lộ trước.
      </p>

      <h2 style={h2Style}>4. Kịch bản 3 — Offer thấp hơn kỳ vọng</h2>
      <p style={pStyle}>
        Đừng từ chối ngay. Mở cửa đàm phán bằng cách nêu rõ lý do và đề xuất phương án thay thế:
      </p>
      <div style={scriptStyle}>
        &ldquo;Tôi appreciate offer này. Mức tôi kỳ vọng là [Y] triệu
        dựa trên [kinh nghiệm cụ thể].
        Có điều kiện nào để đạt mức đó không,
        hoặc có benefit khác như thưởng/stock option để bù đắp?&rdquo;
      </div>
      <p style={pStyle}>
        Đưa ra hai lựa chọn: hoặc tăng lương cứng, hoặc bù bằng benefit. Cách này tránh đối đầu &ldquo;có/không&rdquo;
        và mở rộng phạm vi đàm phán.
      </p>

      <h2 style={h2Style}>5. Các benefit khác cần đàm phán ngoài lương</h2>
      <p style={pStyle}>
        Khi công ty không thể tăng lương cứng, vẫn còn nhiều thứ đáng giá để đàm phán:
      </p>
      <ul style={{ paddingLeft: 20, margin: '0 0 12px' }}>
        <li style={liStyle}><strong>Review lương sau 6 tháng</strong> (thay vì 12 tháng) — rút ngắn chu kỳ tăng lương.</li>
        <li style={liStyle}><strong>Work from home policy</strong> — số ngày WFH/tuần, hoặc fully remote.</li>
        <li style={liStyle}><strong>Ngày phép năm</strong> — thêm 3–5 ngày phép so với mức tối thiểu (12 ngày/năm).</li>
        <li style={liStyle}><strong>Bảo hiểm sức khỏe bổ sung</strong> — gói gia đình, mức trần cao hơn.</li>
        <li style={liStyle}><strong>Budget training/học phí</strong> — chứng chỉ, khoá học, conference.</li>
      </ul>

      <h2 style={h2Style}>6. Những gì KHÔNG nên làm</h2>
      <ul style={{ paddingLeft: 20, margin: '0 0 12px' }}>
        <li style={liStyle}><strong>Tiết lộ con số cụ thể đầu tiên</strong> — ai nói trước thì người đó neo cuộc đàm phán.</li>
        <li style={liStyle}><strong>Chấp nhận ngay offer đầu tiên</strong> — gần như mọi offer đều có room để negotiate 5–15%.</li>
        <li style={liStyle}><strong>Đàm phán qua email</strong> — ngôn ngữ cơ thể và ngữ điệu quan trọng; gặp trực tiếp hoặc video call.</li>
        <li style={liStyle}><strong>Nói &ldquo;Tôi cần tiền vì...&rdquo;</strong> — đàm phán dựa trên giá trị bạn mang lại, không phải nhu cầu cá nhân.</li>
      </ul>

      <div style={{
        marginTop: 28,
        padding: '16px 18px',
        background: 'var(--accent-light)',
        borderRadius: 'var(--radius)',
        borderLeft: '3px solid var(--accent)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Chuẩn bị trước khi đàm phán
        </div>
        <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
          Kiểm tra{' '}
          <Link href="/bang-luong-thi-truong" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            lương thị trường theo ngành
          </Link>
          {' '}và{' '}
          <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            tính lương Net từ Gross
          </Link>
          {' '}trước khi bước vào phòng đàm phán.
        </div>
      </div>
    </div>
  )
}
