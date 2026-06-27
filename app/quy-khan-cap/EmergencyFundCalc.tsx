'use client'
import { useMemo, useState } from 'react'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmtMoney = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

const MONTH_OPTIONS = [3, 6, 12] as const

export default function EmergencyFundCalc() {
  const [monthlyExpense, setMonthlyExpense] = useState('15,000,000')
  const [months, setMonths] = useState<3 | 6 | 12>(6)
  const [alreadySaved, setAlreadySaved] = useState('0')
  const [monthlyIncome, setMonthlyIncome] = useState('')

  const result = useMemo(() => {
    const exp = parseInput(monthlyExpense)
    const saved = parseInput(alreadySaved)
    const income = parseInput(monthlyIncome)

    const target = exp * months
    const remaining = Math.max(0, target - saved)
    const monthlySave = income * 0.2
    const monthsToTarget = income > 0 && monthlySave > 0 && remaining > 0
      ? Math.ceil(remaining / monthlySave)
      : null

    const progressPct = target > 0 ? Math.min(100, (saved / target) * 100) : 0

    return { target, remaining, monthlySave, monthsToTarget, savedAmount: saved, progressPct, hasInput: exp > 0 }
  }, [monthlyExpense, alreadySaved, monthlyIncome, months])

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', marginBottom: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
        <div>
          <label style={L}>Chi phí sinh hoạt / tháng (đồng)</label>
          <input
            placeholder="VD: 15,000,000"
            value={monthlyExpense}
            onChange={e => setMonthlyExpense(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Tiền thuê nhà, ăn uống, đi lại, hóa đơn...</div>
        </div>

        <div>
          <label style={L}>Đã tiết kiệm được (đồng)</label>
          <input
            placeholder="VD: 0"
            value={alreadySaved}
            onChange={e => setAlreadySaved(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Số tiền bạn đang để dành cho mục đích khẩn cấp.</div>
        </div>

        <div>
          <label style={L}>Lương Net / tháng — tuỳ chọn (đồng)</label>
          <input
            placeholder="VD: 25,000,000"
            value={monthlyIncome}
            onChange={e => setMonthlyIncome(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Nhập lương để biết bao lâu sẽ đủ quỹ.</div>
        </div>

        <div>
          <label style={L}>Tháng dự phòng</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MONTH_OPTIONS.map(m => {
              const active = months === m
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMonths(m)}
                  style={{
                    flex: '1 1 0',
                    minWidth: 64,
                    padding: '10px 12px',
                    fontSize: 14,
                    fontWeight: 700,
                    background: active ? 'var(--accent)' : 'var(--surface)',
                    color: active ? '#fff' : 'var(--text)',
                    border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {m} tháng
                </button>
              )
            })}
          </div>
          <div style={H}>3 tháng là tối thiểu, 6 tháng là tiêu chuẩn.</div>
        </div>
      </div>

      {result.hasInput ? (
        <>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <Stat label="Mục tiêu quỹ khẩn cấp" value={fmtMoney(result.target)} accent />
            <Stat label="Đã tiết kiệm" value={fmtMoney(result.savedAmount)} />
            <Stat label="Còn thiếu" value={fmtMoney(result.remaining)} highlight={result.remaining > 0} />
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Tiến độ</span>
              <span>{result.progressPct.toFixed(0)}%</span>
            </div>
            <div style={{ display: 'flex', height: 28, borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface2)' }}>
              <div style={{
                width: `${result.progressPct}%`,
                background: 'var(--accent)',
                transition: 'width 0.2s',
              }} />
              <div style={{
                width: `${100 - result.progressPct}%`,
                background: 'var(--surface2)',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: 'var(--muted)' }}>
              <span>Đã có: <strong style={{ color: 'var(--accent)' }}>{fmtMoney(result.savedAmount)}</strong></span>
              <span>Mục tiêu: <strong style={{ color: 'var(--text)' }}>{fmtMoney(result.target)}</strong></span>
            </div>
          </div>

          {result.monthsToTarget !== null && (
            <div style={{
              marginTop: 18, padding: '14px 16px',
              background: 'var(--accent-light)', borderRadius: 'var(--radius)',
              borderLeft: '3px solid var(--accent)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: 6 }}>
                LỘ TRÌNH TIẾT KIỆM
              </div>
              <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>
                Tiết kiệm <strong>20% lương / tháng</strong> (~{fmtMoney(result.monthlySave)}) → đủ quỹ sau{' '}
                <strong style={{ color: 'var(--accent)', fontSize: 16 }}>{result.monthsToTarget} tháng</strong>
                {result.monthsToTarget >= 12 ? ` (~${(result.monthsToTarget / 12).toFixed(1)} năm)` : ''}.
              </div>
            </div>
          )}

          {result.remaining === 0 && result.target > 0 && (
            <div style={{
              marginTop: 18, padding: '14px 16px',
              background: 'var(--accent-light)', border: '1px solid var(--accent)',
              borderRadius: 'var(--radius)',
              fontSize: 14, color: 'var(--accent)', fontWeight: 600,
            }}>
              ✅ Bạn đã đạt mục tiêu quỹ khẩn cấp {months} tháng. Hãy chuyển phần tiết kiệm sang các mục tiêu dài hạn khác.
            </div>
          )}
        </>
      ) : (
        <div style={{
          marginTop: 24, padding: '14px 16px',
          background: 'var(--surface2)', border: '1px dashed var(--border)',
          borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--muted)',
        }}>
          Nhập chi phí sinh hoạt / tháng để xem mục tiêu quỹ khẩn cấp.
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
        Lộ trình giả định tiết kiệm 20% lương / tháng. Bạn có thể điều chỉnh tỷ lệ trong thực tế.
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
