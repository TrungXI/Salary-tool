'use client'
import { useState } from 'react'
import Link from 'next/link'
import { calculateSalary, REGION_NAMES, type Region } from '@/lib/salary'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmt = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

interface Result {
  monthlyTax: number
  monthlyInsurance: number
  monthlyTaxableIncome: number
  monthlyNet: number
  annualTax: number
  annualNet: number
  delta: number // > 0 phải nộp thêm, < 0 được hoàn
}

export default function TaxRefundCalc() {
  const [gross, setGross] = useState('')
  const [months, setMonths] = useState('12')
  const [dependants, setDependants] = useState('0')
  const [region, setRegion] = useState('1')
  const [paidTax, setPaidTax] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')

  const handleCalc = () => {
    const grossVal = parseInput(gross)
    if (!grossVal || grossVal <= 0) {
      setError('Vui lòng nhập mức lương Gross hợp lệ')
      setResult(null)
      return
    }
    const monthsVal = parseInt(months) || 12
    if (monthsVal < 1 || monthsVal > 12) {
      setError('Số tháng phải từ 1 đến 12')
      setResult(null)
      return
    }
    setError('')

    const r = parseInt(region) as Region
    const dep = parseInt(dependants) || 0
    const paid = parseInput(paidTax)

    const monthly = calculateSalary({
      grossSalary: grossVal,
      dependants: dep,
      region: r,
      allowances: 0,
      employeeType: 'full',
    })

    const annualTax = monthly.totalTax * monthsVal
    const annualNet = monthly.netSalary * monthsVal
    const delta = annualTax - paid

    setResult({
      monthlyTax: monthly.totalTax,
      monthlyInsurance: monthly.totalInsuranceEmployee,
      monthlyTaxableIncome: monthly.taxableNet,
      monthlyNet: monthly.netSalary,
      annualTax,
      annualNet,
      delta,
    })
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, alignItems: 'start' }}>
        {/* Form */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 16 }}>
            THÔNG TIN THU NHẬP
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={L}>Lương Gross / tháng (đồng)</label>
              <input
                placeholder="VD: 25,000,000"
                value={gross}
                onChange={e => setGross(fmtInput(e.target.value))}
              />
              <div style={H}>Giả định lương cố định trong năm</div>
            </div>

            <div>
              <label style={L}>Số tháng làm việc trong năm</label>
              <select value={months} onChange={e => setMonths(e.target.value)}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n} tháng</option>
                ))}
              </select>
            </div>

            <div>
              <label style={L}>Số người phụ thuộc</label>
              <select value={dependants} onChange={e => setDependants(e.target.value)}>
                {Array.from({ length: 11 }, (_, i) => i).map(n => (
                  <option key={n} value={n}>{n === 0 ? 'Không có' : `${n} người`}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={L}>Vùng lương tối thiểu</label>
              <select value={region} onChange={e => setRegion(e.target.value)}>
                {([1, 2, 3, 4] as Region[]).map(r => (
                  <option key={r} value={r}>{REGION_NAMES[r]}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={L}>Thuế TNCN đã tạm khấu trừ cả năm (đồng)</label>
              <input
                placeholder="VD: 12,000,000"
                value={paidTax}
                onChange={e => setPaidTax(fmtInput(e.target.value))}
              />
              <div style={H}>Tổng số thuế công ty đã khấu trừ — xem chứng từ 02/CK-TNCN</div>
            </div>
          </div>

          {error && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: '#fef2f2', borderRadius: 8, color: '#dc2626', fontSize: 14 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleCalc}
            style={{
              marginTop: 20, width: '100%', padding: 13, border: 'none',
              borderRadius: 10, background: 'var(--accent)', color: 'white',
              fontSize: 16, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.01em',
            }}
          >
            Tính hoàn thuế →
          </button>
        </div>

        {/* Result */}
        <div>
          {result ? (
            <ResultView r={result} />
          ) : (
            <div style={{
              background: 'var(--surface2)', border: '1px dashed var(--border)',
              borderRadius: 16, padding: '40px 24px', textAlign: 'center',
              color: 'var(--muted)', fontSize: 14, lineHeight: 1.6,
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🧮</div>
              Nhập thông tin bên trái rồi bấm <strong>Tính hoàn thuế</strong> để xem kết quả.
            </div>
          )}
        </div>
      </div>

      <div style={{
        marginTop: 24, padding: '14px 18px', background: 'var(--surface2)',
        borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> Calculator giả định lương cố định trong năm và không tính
        các khoản thưởng, phụ cấp ngoài lương. Kết quả chính thức được xác định khi nộp tờ khai{' '}
        <strong>02/QTT-TNCN</strong> cho cơ quan thuế. Tham khảo trang{' '}
        <Link href="/quyet-toan-tncn" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
          hướng dẫn quyết toán
        </Link>.
      </div>
    </>
  )
}

function ResultView({ r }: { r: Result }) {
  const refunded = r.delta < 0
  const owed = r.delta > 0
  const even = r.delta === 0

  const verdictColor = refunded ? 'var(--accent)' : owed ? '#dc2626' : 'var(--muted)'
  const verdictBg = refunded ? 'var(--accent-light)' : owed ? '#fef2f2' : 'var(--surface2)'
  const verdictBorder = refunded ? 'var(--accent)' : owed ? '#dc2626' : 'var(--border)'
  const verdictLabel = refunded
    ? 'Bạn được HOÀN thuế'
    : owed
    ? 'Bạn phải NỘP THÊM thuế'
    : 'Đã nộp đúng — không hoàn, không thêm'
  const verdictAmount = even ? '0 đ' : fmt(Math.abs(r.delta))

  return (
    <div>
      {/* Verdict */}
      <div style={{
        background: verdictBg,
        border: `1.5px solid ${verdictBorder}`,
        borderRadius: 16, padding: '24px 24px', marginBottom: 16,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: verdictColor, letterSpacing: '0.06em', marginBottom: 8 }}>
          KẾT QUẢ QUYẾT TOÁN
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
          {verdictLabel}
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: verdictColor, lineHeight: 1.1 }}>
          {verdictAmount}
        </div>
        {!even && (
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>
            {refunded
              ? 'Nộp tờ khai 02/QTT-TNCN để được hoàn lại số tiền này.'
              : 'Bạn cần nộp bổ sung số thuế còn thiếu khi quyết toán.'}
          </div>
        )}
      </div>

      {/* Breakdown */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 22px', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 12 }}>
          ĐỐI CHIẾU CẢ NĂM
        </div>
        <Row label="Thuế TNCN phải đóng cả năm (lý thuyết)" val={fmt(r.annualTax)} bold />
        <Row label="Thuế TNCN đã tạm khấu trừ" val={fmt(r.annualTax - r.delta)} />
        <Row
          label={refunded ? 'Chênh lệch (được hoàn)' : owed ? 'Chênh lệch (phải nộp thêm)' : 'Chênh lệch'}
          val={(r.delta > 0 ? '+' : r.delta < 0 ? '−' : '') + fmt(Math.abs(r.delta))}
          bold
          color={verdictColor}
        />
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 22px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 12 }}>
          CHI TIẾT THEO THÁNG
        </div>
        <Row label="BHXH NLĐ đóng / tháng" val={fmt(r.monthlyInsurance)} />
        <Row label="Thu nhập tính thuế / tháng" val={fmt(r.monthlyTaxableIncome)} />
        <Row label="Thuế TNCN / tháng" val={fmt(r.monthlyTax)} />
        <Row label="NET thực nhận / tháng" val={fmt(r.monthlyNet)} bold />
        <Row label="NET cả năm" val={fmt(r.annualNet)} bold color="var(--accent)" />
      </div>
    </div>
  )
}

function Row({ label, val, bold, color }: { label: string; val: string; bold?: boolean; color?: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '7px 0', borderBottom: '0.5px solid var(--border)',
    }}>
      <span style={{ fontSize: 13, fontWeight: bold ? 700 : 400, color: 'var(--text)' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: bold ? 700 : 500, color: color ?? 'var(--text)' }}>{val}</span>
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
