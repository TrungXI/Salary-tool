'use client'
import { useMemo, useState } from 'react'
import { calculateSalary, REGION_NAMES, type Region } from '@/lib/salary'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmtMoney = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

type ResidencyStatus = 'resident' | 'non-resident'

export default function ExpatTaxCalc() {
  const [residency, setResidency] = useState<ResidencyStatus>('resident')
  const [gross, setGross] = useState('50,000,000')
  const [dependants, setDependants] = useState('0')
  const [region, setRegion] = useState<Region>(1)

  const result = useMemo(() => {
    const grossN = parseInput(gross)
    const deps = Math.max(0, parseInt(dependants) || 0)

    // Cư trú — dùng calculateSalary hiện tại
    const residentResult = calculateSalary({
      grossSalary: grossN,
      dependants: deps,
      region,
      allowances: 0,
      employeeType: 'full',
    })

    // Không cư trú — 20% flat trên gross, không BHXH, không giảm trừ
    const nonResidentTax = grossN * 0.2
    const nonResidentNet = grossN - nonResidentTax

    const residentEffRate = grossN > 0 ? (residentResult.totalTax / grossN) * 100 : 0
    const nonResidentEffRate = grossN > 0 ? 20 : 0

    return {
      grossN,
      deps,
      hasInput: grossN > 0,
      resident: {
        tax: residentResult.totalTax,
        insurance: residentResult.totalInsuranceEmployee,
        net: residentResult.netSalary,
        deduction: residentResult.totalDeduction,
        effRate: residentEffRate,
      },
      nonResident: {
        tax: nonResidentTax,
        insurance: 0,
        net: nonResidentNet,
        deduction: 0,
        effRate: nonResidentEffRate,
      },
    }
  }, [gross, dependants, region])

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '24px 28px',
        marginBottom: 16,
      }}
    >
      {/* Residency status */}
      <div style={{ marginBottom: 18 }}>
        <label style={L}>Trạng thái cư trú thuế</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(
            [
              { v: 'resident', label: 'Cư trú (≥183 ngày/năm tại VN)' },
              { v: 'non-resident', label: 'Không cư trú (<183 ngày/năm)' },
            ] as const
          ).map(opt => {
            const active = residency === opt.v
            return (
              <button
                key={opt.v}
                type="button"
                onClick={() => setResidency(opt.v)}
                style={{
                  flex: '1 1 220px',
                  padding: '10px 14px',
                  fontSize: 14,
                  fontWeight: 600,
                  background: active ? 'var(--accent)' : 'var(--surface)',
                  color: active ? '#fff' : 'var(--text)',
                  border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
        <div style={H}>
          Cư trú thuế tại VN nếu ở ≥ 183 ngày/năm hoặc có nơi ở thường xuyên tại VN (Điều 2 Luật thuế TNCN).
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20,
        }}
      >
        <div>
          <label style={L}>Thu nhập gross / tháng (đồng)</label>
          <input
            placeholder="VD: 50,000,000"
            value={gross}
            onChange={e => setGross(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Tổng thu nhập trước thuế và bảo hiểm.</div>
        </div>

        <div>
          <label style={L}>Số người phụ thuộc</label>
          <input
            type="number"
            min={0}
            max={10}
            step={1}
            value={dependants}
            onChange={e => setDependants(e.target.value)}
            disabled={residency === 'non-resident'}
            style={{
              opacity: residency === 'non-resident' ? 0.5 : 1,
              cursor: residency === 'non-resident' ? 'not-allowed' : 'text',
            }}
          />
          <div style={H}>
            {residency === 'non-resident'
              ? 'Người không cư trú không được áp dụng giảm trừ gia cảnh.'
              : 'Mỗi người phụ thuộc giảm trừ 6,2 triệu/tháng.'}
          </div>
        </div>

        <div>
          <label style={L}>Vùng lương (BHXH)</label>
          <select
            value={region}
            onChange={e => setRegion(parseInt(e.target.value) as Region)}
            disabled={residency === 'non-resident'}
            style={{
              opacity: residency === 'non-resident' ? 0.5 : 1,
              cursor: residency === 'non-resident' ? 'not-allowed' : 'pointer',
            }}
          >
            {([1, 2, 3, 4] as const).map(r => (
              <option key={r} value={r}>
                {REGION_NAMES[r]}
              </option>
            ))}
          </select>
          <div style={H}>
            {residency === 'non-resident'
              ? 'Người không cư trú thường không đóng BHXH.'
              : 'Ảnh hưởng đến mức sàn đóng BHXH bắt buộc.'}
          </div>
        </div>
      </div>

      {result.hasInput ? (
        <>
          <div style={{ marginTop: 22, overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14,
                minWidth: 520,
              }}
            >
              <thead>
                <tr style={{ background: 'var(--surface2)' }}>
                  <th style={th}>Chỉ tiêu</th>
                  <th style={{ ...th, color: residency === 'resident' ? 'var(--accent)' : 'var(--text)' }}>
                    Cư trú
                  </th>
                  <th style={{ ...th, color: residency === 'non-resident' ? 'var(--accent)' : 'var(--text)' }}>
                    Không cư trú
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>Phương pháp tính thuế</td>
                  <td style={td}>Lũy tiến 5 bậc (5–35%)</td>
                  <td style={td}>20% flat trên gross</td>
                </tr>
                <tr>
                  <td style={td}>BHXH/BHYT/BHTN người lao động</td>
                  <td style={td}>{fmtMoney(result.resident.insurance)} (10,5%)</td>
                  <td style={td}>Thường không đóng</td>
                </tr>
                <tr>
                  <td style={td}>Giảm trừ gia cảnh</td>
                  <td style={td}>{fmtMoney(result.resident.deduction)}/tháng</td>
                  <td style={td}>Không áp dụng</td>
                </tr>
                <tr>
                  <td style={td}>Thuế TNCN / tháng</td>
                  <td style={tdStrong(residency === 'resident')}>{fmtMoney(result.resident.tax)}</td>
                  <td style={tdStrong(residency === 'non-resident')}>{fmtMoney(result.nonResident.tax)}</td>
                </tr>
                <tr>
                  <td style={td}>Thuế suất thực tế</td>
                  <td style={td}>{result.resident.effRate.toFixed(2)}%</td>
                  <td style={td}>{result.nonResident.effRate.toFixed(2)}%</td>
                </tr>
                <tr style={{ background: 'var(--accent-light)' }}>
                  <td style={{ ...td, fontWeight: 700 }}>Lương NET ước tính</td>
                  <td style={tdStrong(residency === 'resident')}>{fmtMoney(result.resident.net)}</td>
                  <td style={tdStrong(residency === 'non-resident')}>{fmtMoney(result.nonResident.net)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: 18,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            <Stat
              label={`Thuế TNCN — ${residency === 'resident' ? 'Cư trú' : 'Không cư trú'}`}
              value={fmtMoney(residency === 'resident' ? result.resident.tax : result.nonResident.tax)}
              accent
            />
            <Stat
              label={`NET / tháng — ${residency === 'resident' ? 'Cư trú' : 'Không cư trú'}`}
              value={fmtMoney(residency === 'resident' ? result.resident.net : result.nonResident.net)}
            />
            <Stat
              label="Chênh lệch NET (cư trú − không cư trú)"
              value={fmtMoney(result.resident.net - result.nonResident.net)}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            marginTop: 22,
            padding: '14px 16px',
            background: 'var(--surface2)',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            color: 'var(--muted)',
          }}
        >
          Nhập thu nhập gross / tháng để so sánh thuế cư trú vs không cư trú.
        </div>
      )}

      <div
        style={{
          marginTop: 20,
          padding: '14px 16px',
          background: 'var(--warn-light)',
          borderRadius: 'var(--radius)',
          borderLeft: '3px solid var(--warn)',
          fontSize: 13,
          color: 'var(--text)',
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: 'var(--warn)' }}>Ghi chú pháp lý:</strong> Người cư trú thuế là người{' '}
        <strong>cư trú tại VN ≥ 183 ngày</strong> trong năm tính thuế (hoặc 12 tháng liên tục kể từ ngày đầu đến VN),
        hoặc có <strong>nơi ở thường xuyên</strong> tại VN (đăng ký thường trú hoặc thuê nhà ≥ 183 ngày trong năm).
        Theo <strong>Điều 2 Luật thuế TNCN</strong> sửa đổi bởi <strong>Luật 109/2025/QH15</strong>. Người không cư trú
        áp dụng thuế suất 20% trên thu nhập từ tiền lương, tiền công phát sinh tại VN.
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  const bg = accent ? 'var(--accent-light)' : 'var(--surface2)'
  const border = accent ? 'var(--accent)' : 'var(--border)'
  const color = accent ? 'var(--accent)' : 'var(--text)'
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 'var(--radius)',
        padding: '14px 16px',
      }}
    >
      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: accent ? 22 : 18, fontWeight: accent ? 800 : 700, color }}>{value}</div>
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: 13,
  fontWeight: 700,
  color: 'var(--text)',
  borderBottom: '1px solid var(--border)',
}

const td: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: 14,
  color: 'var(--text)',
  borderBottom: '1px solid var(--border)',
  verticalAlign: 'top',
}

function tdStrong(active: boolean): React.CSSProperties {
  return {
    ...td,
    fontWeight: 700,
    color: active ? 'var(--accent)' : 'var(--text)',
  }
}
