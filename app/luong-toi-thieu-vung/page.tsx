import type { Metadata } from 'next'
import { MIN_WAGES, REGION_NAMES, type Region } from '@/lib/salary'
import { LEGAL_REFS } from '@/lib/legalRefs'
import FaqJsonLd from '@/components/FaqJsonLd'
import LegalBadge from '@/components/LegalBadge'
import { FAQ_LUONG_TOI_THIEU } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Lương tối thiểu vùng 2026 | Nghị định 293/2025/NĐ-CP | TínhLương.vn',
  description: 'Bảng lương tối thiểu vùng 2026 theo Nghị định 293/2025/NĐ-CP, hiệu lực 01/01/2026. Vùng I: 5,310,000đ/tháng.',
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

export default function Page() {
  const minWageRef = LEGAL_REFS.find(r => r.category === 'min_wage')

  return (
    <div>
      <FaqJsonLd items={FAQ_LUONG_TOI_THIEU} />

      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
        Lương tối thiểu vùng 2026
      </h1>

      <p style={pStyle}>
        Theo <strong>Nghị định 293/2025/NĐ-CP</strong>, mức lương tối thiểu vùng năm 2026 được điều chỉnh tăng so với năm 2025,
        có hiệu lực từ <strong>01/01/2026</strong>. Đây là mức sàn dưới mà người sử dụng lao động không được trả thấp hơn cho người lao động
        làm công việc giản đơn trong điều kiện lao động bình thường.
      </p>

      <h2 style={h2Style}>Bảng lương tối thiểu vùng 2026</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Vùng</th>
            <th style={thStyle}>Phạm vi áp dụng</th>
            <th style={thStyle}>Mức lương tháng</th>
            <th style={thStyle}>Hiệu lực</th>
          </tr>
        </thead>
        <tbody>
          {([1, 2, 3, 4] as Region[]).map(r => (
            <tr key={r}>
              <td style={tdStyle}><strong>Vùng {['I', 'II', 'III', 'IV'][r - 1]}</strong></td>
              <td style={tdStyle}>{REGION_NAMES[r]}</td>
              <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>
                {MIN_WAGES[r].toLocaleString('vi-VN')} đ
              </td>
              <td style={tdStyle}>01/01/2026</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2Style}>Ai phải đóng theo mức nào?</h2>
      <p style={pStyle}>
        <strong>Vùng I</strong> áp dụng cho doanh nghiệp hoạt động trên địa bàn các quận và một số huyện của Hà Nội, TP.HCM
        cùng các quận, huyện giáp ranh — nơi mặt bằng giá sinh hoạt cao nhất cả nước.
      </p>
      <p style={pStyle}>
        <strong>Vùng II và Vùng III</strong> áp dụng cho các tỉnh, thành phố trực thuộc trung ương khác và các huyện còn lại.
        Doanh nghiệp xác định vùng dựa trên địa bàn nơi đặt trụ sở hoặc chi nhánh hoạt động.
      </p>
      <p style={pStyle}>
        <strong>Vùng IV</strong> áp dụng cho các huyện thuộc khu vực miền núi, vùng sâu, vùng xa và hải đảo —
        nơi mức lương tối thiểu thấp nhất do điều kiện kinh tế đặc thù.
      </p>

      <h2 style={h2Style}>Mức đóng BHXH theo lương tối thiểu</h2>
      <p style={pStyle}>
        Mức tiền lương đóng BHXH bắt buộc <strong>không được thấp hơn lương tối thiểu vùng</strong>.
        Người lao động làm công việc đòi hỏi đã qua đào tạo (kể cả tự đào tạo) phải được trả lương cao hơn ít nhất 7%
        so với mức lương tối thiểu vùng.
      </p>

      <div style={{ marginTop: 40, padding: '16px 18px', background: 'var(--surface2)', borderRadius: 'var(--radius)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <LegalBadge />
        {minWageRef && (
          <a
            href={minWageRef.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
          >
            Xem toàn văn {minWageRef.code} →
          </a>
        )}
      </div>
    </div>
  )
}
