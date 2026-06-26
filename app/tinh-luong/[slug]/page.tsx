import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CalcForm from '@/components/CalcForm'
import FaqJsonLd from '@/components/FaqJsonLd'
import LegalBadge from '@/components/LegalBadge'
import { calculateSalary, REGION_NAMES, type Region } from '@/lib/salary'
import { SEO_SLUGS, findSeoSlug } from '@/lib/seoSlugs'
import { FAQ_TINH_LUONG_BY_SLUG } from '@/lib/faqs'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return SEO_SLUGS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const found = findSeoSlug(slug)
  if (!found) return {}
  const m = (found.gross / 1_000_000).toString()
  return {
    title: `Lương Gross ${m} triệu thì NET bao nhiêu? 2026 | TínhLương.vn`,
    description: `Tính lương gross ${m} triệu sang net theo luật Việt Nam 2026. BHXH, thuế TNCN, giảm trừ gia cảnh.`,
  }
}

const fmt = (n: number) => n.toLocaleString('vi-VN')

const cardStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '14px 16px',
}
const cardLabel: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginBottom: 4 }
const cardValue: React.CSSProperties = { fontSize: 18, fontWeight: 700, color: 'var(--text)' }
const cardAccent: React.CSSProperties = { ...cardValue, color: 'var(--accent)' }

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  overflow: 'hidden',
  marginBottom: 16,
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = findSeoSlug(slug)
  if (!found) notFound()

  const preview = calculateSalary({
    grossSalary: found.gross,
    dependants: 0,
    region: 1,
    allowances: 0,
    employeeType: 'full',
  })

  // 3-region comparison
  const regionResults = ([1, 2, 3] as Region[]).map(r => ({
    region: r,
    result: calculateSalary({
      grossSalary: found.gross,
      dependants: 0,
      region: r,
      allowances: 0,
      employeeType: 'full',
    }),
  }))

  const m = (found.gross / 1_000_000).toString()

  return (
    <div>
      <FaqJsonLd items={FAQ_TINH_LUONG_BY_SLUG(found.gross)} />

      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
        Lương Gross {m} triệu → Net bao nhiêu? (2026)
      </h1>

      <p style={pStyle}>
        Với lương Gross <strong>{fmt(found.gross)}đ/tháng</strong> (Vùng I, không có người phụ thuộc, hợp đồng chính thức),
        theo luật Việt Nam 2026 (Luật thuế TNCN 109/2025/QH15 + NĐ 293/2025/NĐ-CP), lương NET thực nhận
        khoảng <strong>{fmt(preview.netSalary)}đ</strong>.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={cardLabel}>Lương Gross</div>
          <div style={cardValue}>{fmt(preview.gross)}đ</div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabel}>Lương NET thực nhận</div>
          <div style={cardAccent}>{fmt(preview.netSalary)}đ</div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabel}>BHXH NLĐ đóng (10.5%)</div>
          <div style={cardValue}>{fmt(preview.totalInsuranceEmployee)}đ</div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabel}>Thuế TNCN</div>
          <div style={cardValue}>{fmt(preview.totalTax)}đ</div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabel}>Tổng chi phí DN</div>
          <div style={cardValue}>{fmt(preview.totalCostEmployer)}đ</div>
        </div>
      </div>

      <h2 style={h2Style}>Tính lương theo điều kiện của bạn</h2>
      <CalcForm initialGross={found.gross} />

      <h2 style={h2Style}>So sánh theo vùng lương tối thiểu</h2>
      <p style={pStyle}>
        Cùng mức lương Gross {fmt(found.gross)}đ, kết quả NET có thể khác nhau giữa các vùng do
        mức đóng BHXH tối thiểu khác nhau. Bảng dưới so sánh Vùng I, II, III.
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Vùng</th>
            <th style={thStyle}>BHXH NLĐ</th>
            <th style={thStyle}>Thuế TNCN</th>
            <th style={thStyle}>Lương NET</th>
          </tr>
        </thead>
        <tbody>
          {regionResults.map(({ region, result }) => (
            <tr key={region}>
              <td style={tdStyle}>{REGION_NAMES[region]}</td>
              <td style={tdStyle}>{fmt(result.totalInsuranceEmployee)}đ</td>
              <td style={tdStyle}>{fmt(result.totalTax)}đ</td>
              <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--accent)' }}>{fmt(result.netSalary)}đ</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 40, padding: '16px 18px', background: 'var(--surface2)', borderRadius: 'var(--radius)' }}>
        <LegalBadge />
      </div>
    </div>
  )
}
