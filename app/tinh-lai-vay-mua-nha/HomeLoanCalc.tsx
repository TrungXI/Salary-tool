'use client'
import { useMemo, useState } from 'react'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmtMoney = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

function calcAmortization(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12
  const n = years * 12
  if (n <= 0 || principal <= 0) return { monthly: 0, totalPaid: 0, totalInterest: 0 }
  if (r === 0) return { monthly: principal / n, totalPaid: principal, totalInterest: 0 }
  const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPaid = monthly * n
  const totalInterest = totalPaid - principal
  return { monthly, totalPaid, totalInterest }
}

const TERM_OPTIONS = [5, 10, 15, 20, 25]

export default function HomeLoanCalc() {
  const [propertyValue, setPropertyValue] = useState('3,000,000,000')
  const [loanPercent, setLoanPercent] = useState('70')
  const [annualRate, setAnnualRate] = useState('8.5')
  const [termYears, setTermYears] = useState('20')
  const [promoRate, setPromoRate] = useState('') // optional

  const result = useMemo(() => {
    const value = parseInput(propertyValue)
    const pct = parseFloat(loanPercent) || 0
    const rate = parseFloat(annualRate) || 0
    const years = parseInt(termYears) || 0
    const principal = (value * pct) / 100

    const main = calcAmortization(principal, rate, years)

    const promo = parseFloat(promoRate)
    let firstYearMonthly: number | null = null
    let afterMonthly: number | null = null
    if (!Number.isNaN(promo) && promoRate.trim() !== '' && promo > 0) {
      // Năm đầu trả theo lãi suất ưu đãi (tính như khoản vay full term).
      // Đây là cách hiển thị tham khảo phổ biến: monthly nếu lãi giữ ở mức promo / vs lãi gốc.
      firstYearMonthly = calcAmortization(principal, promo, years).monthly
      afterMonthly = main.monthly
    }

    return { principal, ...main, firstYearMonthly, afterMonthly }
  }, [propertyValue, loanPercent, annualRate, termYears, promoRate])

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', marginBottom: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
        <div>
          <label style={L}>Giá trị bất động sản (đồng)</label>
          <input
            placeholder="VD: 3,000,000,000"
            value={propertyValue}
            onChange={e => setPropertyValue(fmtInput(e.target.value))}
            inputMode="numeric"
          />
        </div>

        <div>
          <label style={L}>Tỷ lệ vay (%)</label>
          <input
            type="number"
            min={1}
            max={100}
            step={1}
            value={loanPercent}
            onChange={e => setLoanPercent(e.target.value)}
          />
          <div style={H}>Số tiền vay = giá trị × tỷ lệ vay</div>
        </div>

        <div>
          <label style={L}>Lãi suất năm (%)</label>
          <input
            type="number"
            min={0}
            step={0.1}
            value={annualRate}
            onChange={e => setAnnualRate(e.target.value)}
          />
        </div>

        <div>
          <label style={L}>Kỳ hạn vay (năm)</label>
          <select value={termYears} onChange={e => setTermYears(e.target.value)}>
            {TERM_OPTIONS.map(y => (
              <option key={y} value={y}>{y} năm</option>
            ))}
          </select>
        </div>

        <div>
          <label style={L}>Lãi suất ưu đãi năm đầu (%) — tuỳ chọn</label>
          <input
            type="number"
            min={0}
            step={0.1}
            placeholder="VD: 6.5"
            value={promoRate}
            onChange={e => setPromoRate(e.target.value)}
          />
          <div style={H}>Để trống nếu không có lãi suất ưu đãi.</div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        <Stat label="Số tiền vay" value={fmtMoney(result.principal)} />
        <Stat
          label="Trả góp hàng tháng"
          value={fmtMoney(result.monthly)}
          accent
        />
        <Stat label="Tổng tiền trả" value={fmtMoney(result.totalPaid)} />
        <Stat label="Tổng lãi phải trả" value={fmtMoney(result.totalInterest)} />
      </div>

      {result.firstYearMonthly !== null && result.afterMonthly !== null && (
        <div style={{
          marginTop: 18, padding: '14px 16px',
          background: 'var(--accent-light)', borderRadius: 'var(--radius)',
          borderLeft: '3px solid var(--accent)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: 8 }}>
            LÃI SUẤT ƯU ĐÃI NĂM ĐẦU
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>Trả góp năm đầu</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>
                {fmtMoney(result.firstYearMonthly)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>Từ năm 2 trở đi</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>
                {fmtMoney(result.afterMonthly)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
        Kết quả mang tính tham khảo. Lãi suất thực tế theo ngân hàng và thời điểm vay.
      </div>
    </div>
  )
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{
      background: accent ? 'var(--accent-light)' : 'var(--surface2)',
      border: accent ? '1px solid var(--accent)' : '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '14px 16px',
    }}>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, fontWeight: 500 }}>{label}</div>
      <div style={{
        fontSize: accent ? 22 : 16,
        fontWeight: accent ? 800 : 700,
        color: accent ? 'var(--accent)' : 'var(--text)',
      }}>
        {value}
      </div>
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
