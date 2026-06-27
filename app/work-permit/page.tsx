import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hướng dẫn Work Permit (Giấy phép lao động) Việt Nam | TínhLương.vn',
  description:
    'Quy trình xin giấy phép lao động cho người nước ngoài tại Việt Nam. Điều kiện, hồ sơ, thời hạn và các loại giấy phép.',
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
        Hướng dẫn Work Permit (Giấy phép lao động) Việt Nam
      </h1>
      <p style={pStyle}>
        Người nước ngoài muốn làm việc hợp pháp tại Việt Nam <strong>bắt buộc phải có Giấy phép lao động</strong>{' '}
        (Work Permit) trước khi bắt đầu công việc — trừ một số trường hợp được miễn. Quy định hiện hành theo{' '}
        <strong>Nghị định 152/2020/NĐ-CP</strong> (sửa đổi, bổ sung bởi <strong>Nghị định 70/2023/NĐ-CP</strong>).
      </p>

      <h2 style={h2Style}>Giấy phép lao động là gì?</h2>
      <ul style={ulStyle}>
        <li>
          Là văn bản do <strong>Sở Lao động – Thương binh và Xã hội</strong> cấp cho người lao động nước ngoài làm việc
          tại VN.
        </li>
        <li>
          Thời hạn tối đa <strong>2 năm</strong>, có thể <strong>gia hạn thêm 2 năm</strong> (tổng tối đa 4 năm theo
          giấy phép hiện hành; sau đó phải xin cấp lại).
        </li>
        <li>
          Bắt buộc phải có <strong>trước khi bắt đầu làm việc</strong> — không được làm việc trong thời gian chờ cấp.
        </li>
      </ul>

      <h2 style={h2Style}>Ai được miễn Giấy phép lao động?</h2>
      <p style={pStyle}>
        Theo <strong>Điều 7 Nghị định 152/2020/NĐ-CP</strong> (sửa đổi bởi NĐ 70/2023), các trường hợp được miễn gồm:
      </p>
      <ul style={ulStyle}>
        <li>
          <strong>Nhà đầu tư nước ngoài</strong> là chủ sở hữu, thành viên góp vốn của công ty TNHH, hoặc thành viên
          HĐQT công ty cổ phần có vốn góp từ 3 tỷ đồng trở lên.
        </li>
        <li>
          <strong>Người di chuyển nội bộ</strong> (intra-company transfer) trong 11 ngành dịch vụ Việt Nam đã cam kết
          mở cửa với WTO (thương mại, viễn thông, tài chính, vận tải…).
        </li>
        <li>
          <strong>Chuyên gia ngắn hạn:</strong> vào VN dưới 30 ngày và không quá 90 ngày tổng cộng trong 1 năm.
        </li>
        <li>
          <strong>Người kết hôn với công dân Việt Nam</strong> và đang sinh sống tại VN.
        </li>
        <li>
          Tình nguyện viên, trưởng văn phòng đại diện tổ chức phi chính phủ nước ngoài, luật sư nước ngoài có giấy
          phép hành nghề tại VN.
        </li>
      </ul>
      <p style={pStyle}>
        Người được miễn vẫn phải xin <strong>Văn bản xác nhận không thuộc diện cấp GPLĐ</strong> trước khi làm việc.
      </p>

      <h2 style={h2Style}>Điều kiện xin Giấy phép lao động</h2>
      <ul style={ulStyle}>
        <li>
          Có <strong>chuyên môn, kỹ thuật, kỹ năng đặc biệt</strong> — bằng đại học trở lên và ít nhất{' '}
          <strong>3 năm kinh nghiệm</strong> trong lĩnh vực được tuyển dụng (đối với chuyên gia).
        </li>
        <li>
          Không có <strong>tiền án, tiền sự</strong> — chứng minh bằng Lý lịch tư pháp.
        </li>
        <li>
          <strong>Đủ sức khỏe</strong> theo quy định của Bộ Y tế — giấy khám sức khỏe không quá 12 tháng.
        </li>
        <li>
          Đủ <strong>18 tuổi trở lên</strong>, có năng lực hành vi dân sự đầy đủ.
        </li>
        <li>
          Vị trí công việc thuộc đối tượng <strong>được phép tuyển dụng người nước ngoài</strong> (đã đăng ký nhu cầu
          tuyển dụng với Sở LĐTBXH trước khi tuyển).
        </li>
      </ul>

      <h2 style={h2Style}>Hồ sơ cần thiết</h2>
      <ul style={ulStyle}>
        <li>
          <strong>Đơn đề nghị cấp Giấy phép lao động</strong> theo Mẫu số 11/PLI ban hành kèm Nghị định 152/2020/NĐ-CP
          (do doanh nghiệp ký).
        </li>
        <li>
          <strong>Bằng cấp, chứng chỉ chuyên môn</strong> — phải được <strong>hợp pháp hóa lãnh sự</strong> (apostille
          nếu nước ký Công ước La Hay) và dịch công chứng sang tiếng Việt.
        </li>
        <li>
          <strong>Lý lịch tư pháp</strong> — không quá 6 tháng, cấp bởi cơ quan có thẩm quyền của nước nơi cư trú
          (hoặc Sở Tư pháp VN nếu đã ở VN ≥ 6 tháng).
        </li>
        <li>
          <strong>Giấy khám sức khỏe</strong> — không quá 12 tháng, do bệnh viện đủ điều kiện cấp (danh sách do Bộ Y
          tế ban hành).
        </li>
        <li>
          <strong>Ảnh thẻ 3×4 nền trắng</strong> — 2 ảnh, chụp không quá 6 tháng.
        </li>
        <li>
          <strong>Hộ chiếu</strong> còn hiệu lực ít nhất <strong>12 tháng</strong> tính từ ngày dự kiến cấp giấy phép —
          bản sao công chứng.
        </li>
        <li>
          <strong>Văn bản chấp thuận nhu cầu sử dụng lao động nước ngoài</strong> của Chủ tịch UBND cấp tỉnh (đăng ký
          trước ít nhất 15 ngày).
        </li>
      </ul>

      <h2 style={h2Style}>Quy trình và thời hạn xử lý</h2>
      <ul style={ulStyle}>
        <li>
          <strong>Bước 1:</strong> Doanh nghiệp đăng ký nhu cầu tuyển dụng lao động nước ngoài với{' '}
          <strong>Sở LĐTBXH</strong> tỉnh/TP nơi làm việc (ít nhất 15 ngày trước khi tuyển).
        </li>
        <li>
          <strong>Bước 2:</strong> UBND cấp tỉnh ra văn bản chấp thuận trong vòng <strong>10 ngày làm việc</strong>.
        </li>
        <li>
          <strong>Bước 3:</strong> Doanh nghiệp nộp hồ sơ xin cấp GPLĐ tại Sở LĐTBXH (trước ít nhất 15 ngày kể từ ngày
          dự kiến bắt đầu làm việc).
        </li>
        <li>
          <strong>Bước 4:</strong> Sở LĐTBXH cấp giấy phép trong vòng <strong>5–7 ngày làm việc</strong> kể từ ngày
          nhận đủ hồ sơ hợp lệ.
        </li>
        <li>
          <strong>Phí cấp:</strong> <strong>600.000 đồng / giấy phép</strong> (theo Nghị định 38/2021/NĐ-CP về phí và
          lệ phí).
        </li>
      </ul>

      <h2 style={h2Style}>Lưu ý quan trọng</h2>
      <ul style={ulStyle}>
        <li>
          <strong>Bắt buộc xin trước khi bắt đầu làm việc:</strong> Không được phép làm việc tại VN trong thời gian
          chờ cấp giấy phép. Vi phạm bị xử phạt hành chính.
        </li>
        <li>
          <strong>Mức phạt nếu làm việc không có GPLĐ:</strong> Người lao động bị phạt{' '}
          <strong>15–25 triệu đồng</strong>; doanh nghiệp bị phạt <strong>30–75 triệu đồng/người</strong> (hoặc cao
          hơn nếu tuyển nhiều lao động không phép — Nghị định 12/2022/NĐ-CP về xử phạt vi phạm trong lĩnh vực lao
          động).
        </li>
        <li>
          Người lao động có thể bị <strong>trục xuất khỏi VN</strong> nếu vi phạm — và bị cấm nhập cảnh trở lại.
        </li>
        <li>
          Cần xin <strong>thị thực lao động (visa LĐ)</strong> hoặc <strong>thẻ tạm trú (TRC)</strong> song song —
          GPLĐ là điều kiện cần để được cấp visa LĐ tại Cục Quản lý xuất nhập cảnh.
        </li>
        <li>
          GPLĐ chỉ có giá trị tại <strong>một doanh nghiệp và một vị trí công việc cụ thể</strong> — đổi công ty hoặc
          vị trí phải xin cấp lại.
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
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Đã có Work Permit? Tính thuế TNCN của bạn
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
          <Link href="/thue-tncn-expat" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Calculator thuế TNCN cho expat — cư trú vs không cư trú →
          </Link>
          <br />
          <Link href="/tinh-luong" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Tính lương Gross / Net 2026 →
          </Link>
          <br />
          <Link href="/huong-dan-bhxh" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Hướng dẫn BHXH cho người lao động →
          </Link>
        </p>
      </div>
    </article>
  )
}
