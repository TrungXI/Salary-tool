'use client'
import { useMemo, useState } from 'react'
import { calculateSalary } from '@/lib/salary'

interface Row {
  industry: string
  level: string
  grossMin: number
  grossMax: number
}

const DATA: Row[] = [
  // IT / Phần mềm
  { industry: 'IT / Phần mềm', level: 'Junior (0–2 năm)', grossMin: 10_000_000, grossMax: 18_000_000 },
  { industry: 'IT / Phần mềm', level: 'Mid (2–5 năm)',    grossMin: 18_000_000, grossMax: 35_000_000 },
  { industry: 'IT / Phần mềm', level: 'Senior (5+ năm)',  grossMin: 35_000_000, grossMax: 70_000_000 },

  // Tài chính / Kế toán
  { industry: 'Tài chính / Kế toán', level: 'Junior (0–2 năm)', grossMin: 8_000_000,  grossMax: 14_000_000 },
  { industry: 'Tài chính / Kế toán', level: 'Mid (2–5 năm)',    grossMin: 14_000_000, grossMax: 25_000_000 },
  { industry: 'Tài chính / Kế toán', level: 'Senior (5+ năm)',  grossMin: 25_000_000, grossMax: 50_000_000 },

  // Marketing / Truyền thông
  { industry: 'Marketing / Truyền thông', level: 'Junior (0–2 năm)', grossMin: 7_000_000,  grossMax: 12_000_000 },
  { industry: 'Marketing / Truyền thông', level: 'Mid (2–5 năm)',    grossMin: 12_000_000, grossMax: 22_000_000 },
  { industry: 'Marketing / Truyền thông', level: 'Senior (5+ năm)',  grossMin: 22_000_000, grossMax: 40_000_000 },

  // Kinh doanh / Sales
  { industry: 'Kinh doanh / Sales', level: 'Junior (0–2 năm)', grossMin: 8_000_000,  grossMax: 15_000_000 },
  { industry: 'Kinh doanh / Sales', level: 'Mid (2–5 năm)',    grossMin: 15_000_000, grossMax: 28_000_000 },
  { industry: 'Kinh doanh / Sales', level: 'Senior (5+ năm)',  grossMin: 28_000_000, grossMax: 55_000_000 },

  // Sản xuất / Kỹ thuật
  { industry: 'Sản xuất / Kỹ thuật', level: 'Junior (0–2 năm)', grossMin: 7_000_000,  grossMax: 13_000_000 },
  { industry: 'Sản xuất / Kỹ thuật', level: 'Mid (2–5 năm)',    grossMin: 13_000_000, grossMax: 22_000_000 },
  { industry: 'Sản xuất / Kỹ thuật', level: 'Senior (5+ năm)',  grossMin: 22_000_000, grossMax: 40_000_000 },

  // Y tế / Dược
  { industry: 'Y tế / Dược', level: 'Junior (0–2 năm)', grossMin: 7_000_000,  grossMax: 13_000_000 },
  { industry: 'Y tế / Dược', level: 'Mid (2–5 năm)',    grossMin: 13_000_000, grossMax: 24_000_000 },
  { industry: 'Y tế / Dược', level: 'Senior (5+ năm)',  grossMin: 24_000_000, grossMax: 45_000_000 },
]

const fmtVND = (n: number) => n.toLocaleString('vi-VN')

function netFromGross(gross: number): number {
  return calculateSalary({
    grossSalary: gross,
    dependants: 0,
    region: 1,
    allowances: 0,
    employeeType: 'full',
  }).netSalary
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
  verticalAlign: 'top',
}

export default function SalaryTable() {
  const [industry, setIndustry] = useState<string>('all')

  const industries = useMemo(() => {
    const set = new Set<string>()
    DATA.forEach(r => set.add(r.industry))
    return Array.from(set)
  }, [])

  const rows = useMemo(() => {
    if (industry === 'all') return DATA
    return DATA.filter(r => r.industry === industry)
  }, [industry])

  return (
    <div>
      <div style={{ marginBottom: 16, maxWidth: 360 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }}>
          Lọc theo ngành
        </label>
        <select value={industry} onChange={e => setIndustry(e.target.value)}>
          <option value="all">Tất cả ngành</option>
          {industries.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Ngành</th>
              <th style={thStyle}>Cấp bậc</th>
              <th style={thStyle}>Gross / tháng</th>
              <th style={thStyle}>Net ước tính</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const netMin = netFromGross(r.grossMin)
              const netMax = netFromGross(r.grossMax)
              return (
                <tr key={`${r.industry}-${r.level}-${i}`}>
                  <td style={tdStyle}>{r.industry}</td>
                  <td style={tdStyle}>{r.level}</td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                    {fmtVND(r.grossMin)} – {fmtVND(r.grossMax)} đ
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                    {fmtVND(Math.round(netMin))} – {fmtVND(Math.round(netMax))} đ
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p style={{
        marginTop: 14,
        fontSize: 13,
        color: 'var(--muted)',
        lineHeight: 1.6,
      }}>
        Số liệu tham khảo tổng hợp từ các nguồn tuyển dụng năm 2026. Mức lương thực tế phụ thuộc vào kỹ năng,
        quy mô công ty và khu vực địa lý. Net ước tính tính theo Vùng I, không người phụ thuộc, không phụ cấp,
        loại hợp đồng chính thức.
      </p>
    </div>
  )
}
