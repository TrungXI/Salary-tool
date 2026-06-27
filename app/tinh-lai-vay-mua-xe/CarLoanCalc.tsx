'use client'
import { useMemo, useState } from 'react'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmtMoney = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

function calcAmortization(principal: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12
  const n = months
  if (n <= 0 || principal <= 0) return { monthly: 0, totalPaid: 0, totalInterest: 0 }
  if (r === 0) return { monthly: principal / n, totalPaid: principal, totalInterest: 0 }
  const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPaid = monthly * n
  const totalInterest = totalPaid - principal
  return { monthly, totalPaid, totalInterest }
}

const TERM_OPTIONS = [12, 24, 36, 48, 60]

export default function CarLoanCalc() {
  const [carPrice, setCarPrice] = useState('600,000,000')
  const [downPayment, setDownPayment] = useState('180,000,000')
  const [annualRate, setAnnualRate] = useState('9.5')
  const [termMonths, setTermMonths] = useState('36')

  const result = useMemo(() => {
    const price = parseInput(carPrice)
    const down = parseInput(downPayment)
    const rate = parseFloat(annualRate) || 0
    const months = parseInt(termMonths) || 0
    const principal = Math.max(0, price - down)
    const amort = calcAmortization(principal, rate, months)
    return { principal, ...amort }
  }, [carPrice, downPayment, annualRate, termMonths])

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', marginBottom: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
        <div>
          <label style={L}>Giá xe (đồng)</label>
          <input
            placeholder="VD: 600,000,000"
            value={carPrice}
            onChange={e => setCarPrice(fmtInput(e.target.value))}
            inputMode="numeric"
          />
        </div>

        <div>
          <label style={L}>Tiền trả trước (đồng)</label>
          <input
            placeholder="VD: 180,000,000"
            value={downPayment}
            onChange={e => setDownPayment(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Thông thường 20 – 40% giá xe.</div>
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
          <label style={L}>Kỳ hạn vay (tháng)</label>
          <select value={termMonths} onChange={e => setTermMonths(e.target.value)}>
            {TERM_OPTIONS.map(m => (
              <option key={m} value={m}>{m} tháng</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        <Stat label="Số tiền vay" value={fmtMoney(result.principal)} />
        <Stat label="Trả góp hàng tháng" value={fmtMoney(result.monthly)} accent />
        <Stat label="Tổng tiền trả" value={fmtMoney(result.totalPaid)} />
        <Stat label="Tổng lãi phải trả" value={fmtMoney(result.totalInterest)} />
      </div>

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
