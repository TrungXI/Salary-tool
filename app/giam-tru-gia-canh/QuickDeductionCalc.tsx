'use client'
import { useState } from 'react'

const PERSONAL = 15_500_000
const DEPENDANT = 6_200_000
const fmt = (n: number) => n.toLocaleString('vi-VN') + ' đ'

export default function QuickDeductionCalc() {
  const [dep, setDep] = useState(0)

  const monthlyDeduction = PERSONAL + dep * DEPENDANT
  const annualDeduction = monthlyDeduction * 12

  // Số thuế tiết kiệm: phần giảm trừ nếu không có sẽ bị đánh thuế.
  // Hiển thị range: ở bậc thấp nhất 5% (tổng giảm trừ × 5%), cao nhất 35%.
  const savedLow = Math.round(monthlyDeduction * 0.05)
  const savedHigh = Math.round(monthlyDeduction * 0.35)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 22px' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 14 }}>
        QUICK CALC — TIẾT KIỆM THUẾ NHỜ GIẢM TRỪ
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }}>
            Số người phụ thuộc
          </label>
          <select value={dep} onChange={e => setDep(parseInt(e.target.value))}>
            {Array.from({ length: 11 }, (_, i) => i).map(n => (
              <option key={n} value={n}>{n === 0 ? 'Không có' : `${n} người`}</option>
            ))}
          </select>
        </div>

        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Tổng giảm trừ / tháng</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)' }}>{fmt(monthlyDeduction)}</div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Tổng giảm trừ / năm</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)' }}>{fmt(annualDeduction)}</div>
        </div>
      </div>

      <div style={{
        marginTop: 16, padding: '12px 14px', background: 'var(--accent-light)',
        borderRadius: 'var(--radius)', borderLeft: '3px solid var(--accent)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 4 }}>
          THUẾ TIẾT KIỆM ƯỚC TÍNH / THÁNG
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
          {fmt(savedLow)} — {fmt(savedHigh)}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, lineHeight: 1.5 }}>
          Tuỳ theo bậc thuế bạn đang ở (5% với thu nhập thấp, 35% với thu nhập trên 100 triệu/tháng).
        </div>
      </div>
    </div>
  )
}
