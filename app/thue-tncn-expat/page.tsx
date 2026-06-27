import type { Metadata } from 'next'
import Link from 'next/link'
import ExpatTaxCalc from './ExpatTaxCalc'

export const metadata: Metadata = {
  title: 'Thuế TNCN cho người nước ngoài tại Việt Nam | TínhLương.vn',
  description:
    'Calculator thuế TNCN cho expat tại Việt Nam — cư trú (lũy tiến 5 bậc) vs không cư trú (20% flat). Theo Luật 109/2025/QH15.',
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
        Thuế TNCN cho người nước ngoài tại Việt Nam
      </h1>
      <p style={pStyle}>
        Người nước ngoài (expat) làm việc tại Việt Nam phải nộp thuế thu nhập cá nhân (TNCN) — nhưng cách tính
        <strong> phụ thuộc vào trạng thái cư trú thuế</strong>. Người <strong>cư trú</strong> nộp thuế lũy tiến 5 bậc
        như công dân VN; người <strong>không cư trú</strong> chịu thuế suất phẳng <strong>20%</strong> trên thu nhập
        phát sinh tại VN. Theo <strong>Luật thuế TNCN sửa đổi bởi Luật 109/2025/QH15</strong>.
      </p>

      <h2 style={h2Style}>Calculator so sánh cư trú vs không cư trú</h2>
      <ExpatTaxCalc />

      <h2 style={h2Style}>Ai là người cư trú thuế tại Việt Nam?</h2>
      <p style={pStyle}>
        Theo <strong>Điều 2 Luật thuế TNCN</strong>, một cá nhân được coi là cư trú thuế tại VN nếu thuộc{' '}
        <strong>một trong các trường hợp sau</strong>:
      </p>
      <ul style={ulStyle}>
        <li>
          Có mặt tại Việt Nam <strong>từ 183 ngày trở lên</strong> trong một năm dương lịch hoặc trong 12 tháng liên
          tục kể từ ngày đầu tiên đến VN.
        </li>
        <li>
          Có <strong>nơi ở thường xuyên</strong> tại VN — gồm: nơi đăng ký thường trú, hoặc có nhà thuê ở Việt Nam với
          thời hạn hợp đồng từ 183 ngày trở lên trong năm tính thuế.
        </li>
      </ul>
      <p style={pStyle}>
        Người <strong>không cư trú</strong> là cá nhân không thuộc các trường hợp trên — thường là expat sang VN làm
        việc ngắn hạn, công tác, dự án thời vụ.
      </p>

      <h2 style={h2Style}>Cách tính thuế chi tiết</h2>
      <p style={pStyle}>
        <strong>1. Người cư trú — Thuế lũy tiến từng phần (5 bậc):</strong>
      </p>
      <ul style={ulStyle}>
        <li>Áp dụng đúng biểu thuế lũy tiến như công dân VN — 5 bậc từ 5% đến 35%.</li>
        <li>
          Được giảm trừ gia cảnh: <strong>15,5 triệu/tháng</strong> cho bản thân và{' '}
          <strong>6,2 triệu/tháng</strong> cho mỗi người phụ thuộc (Nghị quyết 110/2025/UBTVQH15).
        </li>
        <li>
          Đóng BHXH/BHYT/BHTN bắt buộc <strong>10,5%</strong> theo Luật BHXH 41/2024/QH15 (nếu ký hợp đồng lao động
          ≥ 3 tháng tại VN).
        </li>
        <li>
          Thu nhập tính thuế trên <strong>toàn cầu</strong> (worldwide income) — bao gồm cả thu nhập ngoài Việt Nam.
        </li>
      </ul>
      <p style={pStyle}>
        <strong>2. Người không cư trú — Thuế phẳng 20%:</strong>
      </p>
      <ul style={ulStyle}>
        <li>
          Thuế TNCN = <strong>20% × thu nhập gross</strong> từ tiền lương, tiền công phát sinh tại VN — bất kể số
          tiền lớn hay nhỏ.
        </li>
        <li>
          <strong>Không được giảm trừ gia cảnh, không được trừ BHXH</strong> — tính trên gross.
        </li>
        <li>
          Chỉ tính thuế trên <strong>thu nhập phát sinh tại VN</strong> — thu nhập ở nước ngoài không bị đánh thuế.
        </li>
        <li>
          Thường <strong>không đóng BHXH bắt buộc</strong> tại VN trừ trường hợp có Hiệp định song phương về BHXH
          (hiện VN chưa ký nhiều — chủ yếu cho công dân Hàn Quốc theo Hiệp định 2023).
        </li>
      </ul>

      <h2 style={h2Style}>Khi nào nên là cư trú vs không cư trú?</h2>
      <p style={pStyle}>
        Không phải lúc nào cư trú cũng có lợi hơn — phụ thuộc vào mức thu nhập:
      </p>
      <ul style={ulStyle}>
        <li>
          <strong>Thu nhập thấp - trung bình (&lt; 80 triệu/tháng):</strong> Cư trú thường <strong>có lợi</strong> nhờ
          giảm trừ gia cảnh và biểu lũy tiến (bậc thấp 5–10%).
        </li>
        <li>
          <strong>Thu nhập rất cao (&gt; 150 triệu/tháng):</strong> Không cư trú với 20% flat có thể{' '}
          <strong>có lợi hơn</strong> so với cư trú (rơi vào bậc 30–35%).
        </li>
        <li>
          <strong>Lưu ý:</strong> Trạng thái cư trú không phải do chọn — mà do <strong>thời gian thực tế tại VN</strong>.
          Bạn không thể tự ý chọn để tối ưu thuế.
        </li>
      </ul>

      <h2 style={h2Style}>Hiệp định tránh đánh thuế hai lần (DTA)</h2>
      <p style={pStyle}>
        Việt Nam đã ký <strong>Hiệp định tránh đánh thuế hai lần</strong> với hơn 80 quốc gia (Hàn Quốc, Nhật Bản,
        Singapore, Anh, Đức, Pháp, Mỹ, Úc…). Nếu thu nhập của bạn đã bị đánh thuế ở nước sở tại, bạn có thể được{' '}
        <strong>khấu trừ thuế đã nộp ở nước ngoài</strong> khi quyết toán thuế tại VN. Cần nộp đơn đề nghị áp dụng
        Hiệp định (Form 02/HTQT) cho cơ quan thuế VN.
      </p>

      <h2 style={h2Style}>Quyết toán thuế cuối năm</h2>
      <ul style={ulStyle}>
        <li>
          <strong>Người cư trú:</strong> Quyết toán theo mẫu <strong>02/QTT-TNCN</strong> trước ngày 30/4 năm sau —
          được hoàn nếu nộp dư.
        </li>
        <li>
          <strong>Người không cư trú:</strong> Doanh nghiệp khấu trừ tại nguồn 20% và nộp thay — không phải quyết toán
          cá nhân.
        </li>
        <li>
          Nếu trạng thái cư trú thay đổi giữa năm (vào VN giữa năm và ở &gt; 183 ngày), phải tính lại theo phương pháp
          cư trú cho cả năm — và hoàn thuế phần đã nộp 20% nếu có dư.
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
          <Link href="/work-permit" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Hướng dẫn Work Permit (Giấy phép lao động) →
          </Link>
          <br />
          <Link href="/tinh-luong" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Tính lương Gross / Net 2026 →
          </Link>
          <br />
          <Link href="/bac-thue-tncn" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Bảng bậc thuế TNCN 2026 →
          </Link>
          <br />
          <Link href="/quyet-toan-tncn" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Quyết toán thuế 02/QTT-TNCN →
          </Link>
        </p>
      </div>
    </article>
  )
}
