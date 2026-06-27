import type { Metadata } from 'next'
import Link from 'next/link'
import TetBonusCalc from './TetBonusCalc'

export const metadata: Metadata = {
  title: 'Ước tính thưởng Tết 2026 | TínhLương.vn',
  description:
    'Ước tính thưởng Tết (tháng lương thứ 13) theo lương cơ bản và thâm niên. Thưởng Tết không bắt buộc theo luật nhưng phổ biến tại VN.',
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
        Ước tính thưởng Tết 2026
      </h1>
      <p style={pStyle}>
        Thưởng Tết — còn gọi là <strong>tháng lương thứ 13</strong> — là khoản tiền doanh nghiệp Việt Nam thường trả cho
        người lao động vào cuối năm âm lịch hoặc trước Tết Nguyên đán. Theo <strong>Điều 104 Bộ luật Lao động 2019</strong>,
        thưởng <strong>không bắt buộc</strong> theo luật, nhưng được quy định trong quy chế thưởng của từng công ty.
      </p>

      <h2 style={h2Style}>Calculator thưởng Tết</h2>
      <TetBonusCalc />

      <h2 style={h2Style}>Công thức ước tính</h2>
      <p style={pStyle}>Công thức phổ biến nhất tại Việt Nam:</p>
      <ul style={ulStyle}>
        <li>
          <strong>Đủ 12 tháng làm việc trong năm:</strong> Thưởng Tết = Lương cơ bản × số tháng thưởng (thường 1–2
          tháng).
        </li>
        <li>
          <strong>Chưa đủ 12 tháng (vào giữa năm):</strong> chia theo tỷ lệ — Thưởng = Lương × số tháng thưởng × (số
          tháng đã làm / 12).
        </li>
        <li>
          Một số công ty cộng thêm <strong>hệ số thâm niên</strong> hoặc <strong>hệ số đánh giá hiệu suất (KPI)</strong>{' '}
          — tuỳ quy chế thưởng nội bộ.
        </li>
      </ul>

      <h2 style={h2Style}>Thưởng Tết có chịu thuế TNCN không?</h2>
      <p style={pStyle}>
        <strong>Có</strong> — thưởng Tết được tính vào thu nhập chịu thuế TNCN của tháng nhận thưởng (thường là tháng 12
        hoặc tháng 1 năm sau). Vì cộng dồn vào một tháng nên thu nhập tháng đó có thể nhảy bậc thuế cao hơn lương bình
        thường, làm số thuế trên thưởng cao hơn mức 10% trung bình.
      </p>
      <p style={pStyle}>
        Nếu bạn đóng thuế cả năm theo bậc 2 (10%) thì thưởng Tết cộng vào tháng đó có thể bị tính theo bậc 3 (15%) hoặc
        bậc 4 (20%). Khi <strong>quyết toán thuế cuối năm</strong>, phần thuế đóng dư (nếu có) sẽ được hoàn lại — xem{' '}
        <Link href="/hoan-thue-tncn" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
          công cụ hoàn thuế TNCN
        </Link>
        .
      </p>

      <h2 style={h2Style}>Mức thưởng Tết trung bình tại Việt Nam</h2>
      <p style={pStyle}>
        Theo Bộ Lao động – Thương binh và Xã hội công bố hằng năm, mức thưởng Tết trung bình trong khối doanh nghiệp
        biến động lớn theo ngành nghề và quy mô:
      </p>
      <ul style={ulStyle}>
        <li>
          <strong>Doanh nghiệp FDI:</strong> trung bình khoảng <strong>1,5 – 2 tháng lương</strong>, một số tập đoàn lớn
          (Samsung, LG, Intel…) có thể tới <strong>3 – 5 tháng</strong>.
        </li>
        <li>
          <strong>Doanh nghiệp Nhà nước:</strong> trung bình <strong>1 – 1,5 tháng lương</strong>, ngành lợi nhuận cao
          (ngân hàng, viễn thông, dầu khí) cao hơn.
        </li>
        <li>
          <strong>Doanh nghiệp tư nhân trong nước:</strong> phổ biến <strong>0,5 – 1 tháng lương</strong>, công ty nhỏ
          có thể chỉ thưởng tượng trưng.
        </li>
      </ul>

      <h2 style={h2Style}>Khi nào người lao động không được thưởng Tết?</h2>
      <ul style={ulStyle}>
        <li>Công ty không có lợi nhuận hoặc kinh doanh lỗ — có thể không thưởng (nhưng phải thông báo công khai).</li>
        <li>Người lao động bị kỷ luật lao động — tuỳ quy chế nội bộ.</li>
        <li>Người lao động nghỉ việc trước thời điểm chi trả thưởng — tuỳ quy chế (một số công ty trả prorated theo tháng đã làm).</li>
        <li>Hợp đồng lao động dưới 1 tháng / hợp đồng thử việc — thường không thuộc đối tượng thưởng.</li>
      </ul>
      <p style={pStyle}>
        <strong>Quan trọng:</strong> Nếu quy chế thưởng của công ty đã cam kết mức thưởng Tết cụ thể, công ty <strong>buộc phải trả</strong>{' '}
        — đây là một phần của thoả thuận lao động. Người lao động có thể khiếu nại lên Sở LĐTBXH hoặc khởi kiện tại Toà
        án Lao động nếu công ty cố tình không trả.
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
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>Công cụ liên quan</div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
          <Link href="/tinh-luong" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Tính lương Gross / Net 2026 →
          </Link>
          <br />
          <Link href="/hoan-thue-tncn" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Hoàn thuế TNCN cuối năm →
          </Link>
          <br />
          <Link href="/bac-thue-tncn" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Bảng bậc thuế TNCN 2026 →
          </Link>
        </p>
      </div>
    </article>
  )
}
