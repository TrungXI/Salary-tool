import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hướng dẫn quyết toán thuế TNCN 02/QTT-TNCN 2026 | TínhLương.vn',
  description: 'Hướng dẫn từng bước nộp tờ khai quyết toán thuế TNCN 02/QTT-TNCN — hồ sơ, thời hạn, cách nộp online và tại cơ quan thuế.',
}

const h2Style: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  margin: '32px 0 12px',
  color: 'var(--text)',
}
const h3Style: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  margin: '20px 0 8px',
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
const cardStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '18px 22px',
  margin: '0 0 16px',
}

export default function Page() {
  return (
    <article>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Hướng dẫn quyết toán thuế TNCN 02/QTT-TNCN năm 2026
      </h1>

      <p style={pStyle}>
        Quyết toán thuế thu nhập cá nhân (TNCN) là thủ tục bắt buộc với người có thu nhập từ tiền lương, tiền công
        khi muốn được hoàn lại phần thuế nộp thừa hoặc khi có thu nhập từ nhiều nguồn. Bài viết này hướng dẫn bạn
        cách nộp tờ khai <strong>02/QTT-TNCN</strong> theo Thông tư{' '}
        <strong>80/2021/TT-BTC</strong> và quy định mới năm 2026.
      </p>

      <section>
        <h2 style={h2Style}>1. Khi nào cần quyết toán thuế TNCN?</h2>
        <p style={pStyle}>
          Bạn <strong>bắt buộc</strong> phải tự quyết toán thuế TNCN nếu rơi vào một trong các trường hợp:
        </p>
        <ul style={ulStyle}>
          <li>Có thu nhập từ tiền lương, tiền công <strong>từ 2 nơi trở lên</strong> trong năm tính thuế.</li>
          <li>Thuế tạm khấu trừ trong năm <strong>lớn hơn</strong> số thuế phải nộp thực tế — muốn được hoàn phần chênh lệch.</li>
          <li>Có <strong>người phụ thuộc</strong> đủ điều kiện nhưng chưa đăng ký giảm trừ trong kỳ tạm tính.</li>
          <li>Thu nhập từ tiền lương trung bình tháng <strong>vượt 5.000.000 đ</strong> và không thuộc diện ủy quyền cho công ty quyết toán thay.</li>
          <li>Đã nghỉ việc và chuyển sang đơn vị mới mà tổng thu nhập trong năm có chênh lệch thuế.</li>
        </ul>
        <p style={pStyle}>
          Nếu bạn chỉ làm việc tại một nơi cả năm và đã ủy quyền cho công ty quyết toán thay, công ty sẽ thực hiện
          quyết toán cho bạn và bạn <strong>không cần</strong> tự nộp tờ khai 02/QTT-TNCN.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>2. Thời hạn nộp quyết toán</h2>
        <div style={cardStyle}>
          <h3 style={{ ...h3Style, marginTop: 0 }}>Cá nhân tự quyết toán</h3>
          <p style={{ ...pStyle, margin: 0 }}>
            Trước <strong>30/4 của năm sau</strong>. Ví dụ: quyết toán cho kỳ tính thuế 2026 phải nộp trước{' '}
            <strong>30/4/2027</strong>.
          </p>
        </div>
        <div style={cardStyle}>
          <h3 style={{ ...h3Style, marginTop: 0 }}>Công ty quyết toán thay (ủy quyền)</h3>
          <p style={{ ...pStyle, margin: 0 }}>
            Công ty phải hoàn tất nộp tờ khai 05/QTT-TNCN trong khoảng <strong>28/3 đến 31/3</strong> của năm sau.
            Nhân viên cần ký giấy ủy quyền mẫu 08/UQ-QTT-TNCN trước thời điểm này.
          </p>
        </div>
      </section>

      <section>
        <h2 style={h2Style}>3. Hồ sơ cần chuẩn bị</h2>
        <ul style={ulStyle}>
          <li>
            <strong>Tờ khai 02/QTT-TNCN</strong> — mẫu theo Thông tư 80/2021/TT-BTC, kê khai tổng thu nhập, các khoản giảm trừ
            và số thuế đã nộp.
          </li>
          <li>
            <strong>Chứng từ khấu trừ thuế (02/CK-TNCN)</strong> — do công ty cấp, ghi nhận thu nhập và số thuế đã khấu trừ trong năm.
            Yêu cầu công ty cấp khi nghỉ việc hoặc đầu năm.
          </li>
          <li>
            <strong>Giấy tờ chứng minh người phụ thuộc</strong> (nếu có) — giấy khai sinh, CCCD, giấy xác nhận khuyết tật,
            xác nhận không có thu nhập...
          </li>
          <li>
            <strong>CMND / CCCD / Hộ chiếu</strong> của người nộp thuế.
          </li>
          <li>
            <strong>Mã số thuế cá nhân</strong> — kiểm tra tại{' '}
            <a
              href="https://tracuunnt.gdt.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
            >
              tracuunnt.gdt.gov.vn
            </a>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2 style={h2Style}>4. Cách nộp online (khuyến nghị)</h2>
        <p style={pStyle}>
          Nộp online qua cổng <strong>thuedientu.gdt.gov.vn</strong> là cách nhanh nhất, tránh phải đến trực tiếp
          cơ quan thuế. Trình tự:
        </p>
        <ol style={ulStyle}>
          <li>
            Đăng ký tài khoản thuế điện tử tại{' '}
            <a
              href="https://thuedientu.gdt.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
            >
              thuedientu.gdt.gov.vn
            </a>{' '}
            (cần CCCD gắn chip để xác thực).
          </li>
          <li>Đăng nhập, chọn <strong>Khai thuế → Thuế TNCN → 02/QTT-TNCN</strong>.</li>
          <li>Điền thông tin thu nhập, giảm trừ, người phụ thuộc theo đúng chứng từ.</li>
          <li>Upload chứng từ khấu trừ thuế (02/CK-TNCN) ở định dạng PDF / ảnh.</li>
          <li>Ký số bằng chữ ký số cá nhân hoặc xác thực qua VNeID.</li>
          <li>Nộp tờ khai. Hệ thống trả về mã giao dịch để tra cứu.</li>
        </ol>
        <p style={pStyle}>
          Nếu kết quả là <strong>được hoàn thuế</strong>, bạn cần điền thêm thông tin tài khoản ngân hàng để cơ quan
          thuế chuyển tiền hoàn lại — thông thường trong vòng <strong>40 ngày làm việc</strong> kể từ ngày nhận đủ hồ sơ.
        </p>
      </section>

      <section>
        <h2 style={h2Style}>5. Các lỗi thường gặp</h2>
        <ul style={ulStyle}>
          <li>
            <strong>Quên khai thu nhập từ công ty cũ</strong> trong cùng năm tính thuế — dẫn đến khai thiếu, bị truy thu và phạt.
          </li>
          <li>
            <strong>Nhập sai mã số thuế người phụ thuộc</strong> — không được giảm trừ, hệ thống từ chối.
          </li>
          <li>
            <strong>Không nộp đúng thời hạn</strong> — bị phạt <strong>0,05% / ngày</strong> trên số thuế nộp chậm,
            phạt vi phạm hành chính từ 2 đến 25 triệu đồng tuỳ mức độ (theo Nghị định 125/2020/NĐ-CP).
          </li>
          <li>
            <strong>Nhầm giữa tự quyết toán và ủy quyền</strong> — gửi cả hai dẫn đến trùng lặp, phải hủy tờ khai và làm lại.
          </li>
          <li>
            <strong>Sai cách tính thuế thu nhập từ thưởng Tết</strong> — thưởng Tết tính vào tháng nhận, không chia đều cả năm.
          </li>
        </ul>
      </section>

      <div style={{ marginTop: 32, padding: '16px 18px', background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Cần ước lượng trước số thuế được hoàn?
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
          Dùng{' '}
          <Link
            href="/hoan-thue-tncn"
            style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}
          >
            calculator hoàn thuế TNCN
          </Link>{' '}
          để biết bạn được hoàn hay phải nộp thêm trước khi nộp tờ khai chính thức.
        </p>
      </div>
    </article>
  )
}
