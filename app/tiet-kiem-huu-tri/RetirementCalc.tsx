'use client'
import { useMemo, useState } from 'react'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmtMoney = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

export default function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState('30')
  const [retirementAge, setRetirementAge] = useState('60')
  const [monthlySaving, setMonthlySaving] = useState('3,000,000')
  const [annualRate, setAnnualRate] = useState('7')
  const [initialSavings, setInitialSavings] = useState('0')

  const result = useMemo(() => {
    const curAge = parseFloat(currentAge) || 0
    const retAge = parseFloat(retirementAge) || 0
    const saving = parseInput(monthlySaving)
    const rate = parseFloat(annualRate) || 0
    const initial = parseInput(initialSavings)

    const years = Math.max(0, retAge - curAge)
    const months = years * 12
    const r = rate / 100 / 12

    if (months <= 0) {
      return {
        years, months,
        totalFV: initial,
        fvAnnuity: 0,
        fvInitial: initial,
        totalContributed: initial,
        totalGrowth: 0,
        monthlyIncome: initial / (25 * 12),
        valid: false,
      }
    }

    const fvAnnuity = r > 0
      ? saving * ((Math.pow(1 + r, months) - 1) / r)
      : saving * months

    const fvInitial = initial * Math.pow(1 + r, months)

    const totalFV = fvAnnuity + fvInitial
    const totalContributed = saving * months + initial
    const totalGrowth = totalFV - totalContributed
    const monthlyIncome = totalFV / (25 * 12)

    return {
      years, months,
      totalFV, fvAnnuity, fvInitial,
      totalContributed, totalGrowth,
      monthlyIncome,
      valid: true,
    }
  }, [currentAge, retirementAge, monthlySaving, annualRate, initialSavings])

  const contribPct = result.totalFV > 0 ? (result.totalContributed / result.totalFV) * 100 : 0

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', marginBottom: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
        <div>
          <label style={L}>Tuổi hiện tại</label>
          <input
            type="number"
            min={18}
            max={80}
            step={1}
            value={currentAge}
            onChange={e => setCurrentAge(e.target.value)}
          />
        </div>

        <div>
          <label style={L}>Tuổi về hưu</label>
          <input
            type="number"
            min={30}
            max={90}
            step={1}
            value={retirementAge}
            onChange={e => setRetirementAge(e.target.value)}
          />
          <div style={H}>Tuổi nghỉ hưu pháp luật hiện ~60 nam / 55 nữ.</div>
        </div>

        <div>
          <label style={L}>Tiết kiệm / đầu tư hàng tháng (đồng)</label>
          <input
            placeholder="VD: 3,000,000"
            value={monthlySaving}
            onChange={e => setMonthlySaving(fmtInput(e.target.value))}
            inputMode="numeric"
          />
        </div>

        <div>
          <label style={L}>Lãi suất kỳ vọng / năm (%)</label>
          <input
            type="number"
            min={0}
            max={30}
            step={0.5}
            value={annualRate}
            onChange={e => setAnnualRate(e.target.value)}
          />
          <div style={H}>Tiết kiệm ngân hàng ~5–6%, cổ phiếu/quỹ ~8–12%.</div>
        </div>

        <div>
          <label style={L}>Tiền đã có sẵn (đồng)</label>
          <input
            placeholder="VD: 0"
            value={initialSavings}
            onChange={e => setInitialSavings(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Vốn ban đầu, sẽ được cộng thêm lãi kép.</div>
        </div>
      </div>

      {result.valid ? (
        <>
          <div style={{
            marginTop: 24, padding: '20px 22px',
            background: 'var(--accent-light)', border: '1px solid var(--accent)',
            borderRadius: 'var(--radius)',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: 8 }}>
              TỔNG TÍCH LŨY KHI VỀ HƯU
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent)', lineHeight: 1.1, marginBottom: 6 }}>
              {fmtMoney(result.totalFV)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)' }}>
              Sau <strong>{result.years} năm</strong> tích lũy ({result.months.toLocaleString('vi-VN')} tháng).
            </div>
          </div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <Stat label="Vốn góp vào" value={fmtMoney(result.totalContributed)} />
            <Stat label="Lãi kép sinh ra" value={fmtMoney(result.totalGrowth)} highlight />
            <Stat
              label="Thu nhập ước tính / tháng sau khi nghỉ"
              value={fmtMoney(result.monthlyIncome)}
              accent
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8 }}>
              Tỷ lệ vốn góp vs lãi kép
            </div>
            <div style={{ display: 'flex', height: 24, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{
                width: `${contribPct}%`,
                background: 'var(--accent-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 11, fontWeight: 700,
              }}>
                {contribPct >= 12 ? `${contribPct.toFixed(0)}%` : ''}
              </div>
              <div style={{
                width: `${100 - contribPct}%`,
                background: 'var(--warn)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 11, fontWeight: 700,
              }}>
                {(100 - contribPct) >= 12 ? `${(100 - contribPct).toFixed(0)}%` : ''}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: 'var(--muted)' }}>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--accent-mid)', borderRadius: 2, marginRight: 6 }} />Vốn góp</span>
              <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--warn)', borderRadius: 2, marginRight: 6 }} />Lãi kép</span>
            </div>
          </div>
        </>
      ) : (
        <div style={{
          marginTop: 24, padding: '14px 16px',
          background: 'var(--surface2)', border: '1px dashed var(--border)',
          borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--muted)',
        }}>
          Tuổi về hưu phải lớn hơn tuổi hiện tại.
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
        Tính toán dựa trên lãi suất cố định. Thực tế có thể dao động. Thu nhập sau khi nghỉ hưu áp dụng <strong>quy tắc 4%</strong> (rút 4% / năm, ≈ tổng chia cho 25 năm × 12 tháng). Không phải tư vấn đầu tư.
      </div>
    </div>
  )
}

function Stat({ label, value, accent = false, highlight = false }: { label: string; value: string; accent?: boolean; highlight?: boolean }) {
  const bg = accent ? 'var(--accent-light)' : highlight ? 'var(--warn-light)' : 'var(--surface2)'
  const border = accent ? 'var(--accent)' : highlight ? 'var(--warn)' : 'var(--border)'
  const color = accent ? 'var(--accent)' : highlight ? 'var(--warn)' : 'var(--text)'
  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 'var(--radius)', padding: '14px 16px',
    }}>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, fontWeight: 500 }}>{label}</div>
      <div style={{
        fontSize: accent ? 22 : 18,
        fontWeight: accent ? 800 : 700,
        color,
      }}>
        {value}
      </div>
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
