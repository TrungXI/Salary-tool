'use client'
import { useMemo, useState } from 'react'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmtMoney = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

type Row = {
  key: 'weekday' | 'weekend' | 'holiday'
  label: string
  hours: number
  rate: number
  amount: number
}

export default function OvertimeCalc() {
  const [gross, setGross] = useState('15,000,000')
  const [workingDays, setWorkingDays] = useState('26')
  const [hoursWeekday, setHoursWeekday] = useState('0')
  const [hoursWeekend, setHoursWeekend] = useState('0')
  const [hoursHoliday, setHoursHoliday] = useState('0')

  const result = useMemo(() => {
    const grossN = parseInput(gross)
    const days = parseFloat(workingDays) || 0
    const hW = parseFloat(hoursWeekday) || 0
    const hWE = parseFloat(hoursWeekend) || 0
    const hH = parseFloat(hoursHoliday) || 0

    const dailyRate = days > 0 ? grossN / days : 0
    const hourlyRate = dailyRate / 8

    const weekday = hW * hourlyRate * 1.5
    const weekend = hWE * hourlyRate * 2.0
    const holiday = hH * hourlyRate * 3.0
    const totalOT = weekday + weekend + holiday
    const totalIncome = grossN + totalOT
    const totalHours = hW + hWE + hH

    const rows: Row[] = [
      { key: 'weekday', label: 'Ngày thường', hours: hW, rate: 1.5, amount: weekday },
      { key: 'weekend', label: 'Ngày nghỉ tuần (T7/CN)', hours: hWE, rate: 2.0, amount: weekend },
      { key: 'holiday', label: 'Ngày lễ / Tết', hours: hH, rate: 3.0, amount: holiday },
    ]

    return {
      grossN,
      hourlyRate,
      dailyRate,
      rows,
      totalOT,
      totalIncome,
      totalHours,
      hasInput: grossN > 0 && days > 0,
      hasOT: totalHours > 0,
      warnLimit: totalHours > 40,
    }
  }, [gross, workingDays, hoursWeekday, hoursWeekend, hoursHoliday])

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20,
        }}
      >
        <div>
          <label style={L}>Lương gross / tháng (đồng)</label>
          <input
            placeholder="VD: 15,000,000"
            value={gross}
            onChange={e => setGross(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Để tính lương ngày và lương giờ bình thường.</div>
        </div>

        <div>
          <label style={L}>Số ngày làm việc / tháng</label>
          <input
            type="number"
            min={1}
            max={31}
            step={1}
            value={workingDays}
            onChange={e => setWorkingDays(e.target.value)}
          />
          <div style={H}>Mặc định 26 (T2–T7), có công ty dùng 22 (T2–T6).</div>
        </div>

        <div>
          <label style={L}>Giờ tăng ca — Ngày thường</label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={hoursWeekday}
            onChange={e => setHoursWeekday(e.target.value)}
          />
          <div style={H}>Hệ số 150%.</div>
        </div>

        <div>
          <label style={L}>Giờ tăng ca — Ngày nghỉ (T7/CN)</label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={hoursWeekend}
            onChange={e => setHoursWeekend(e.target.value)}
          />
          <div style={H}>Hệ số 200%.</div>
        </div>

        <div>
          <label style={L}>Giờ tăng ca — Ngày lễ / Tết</label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={hoursHoliday}
            onChange={e => setHoursHoliday(e.target.value)}
          />
          <div style={H}>Hệ số 300%.</div>
        </div>
      </div>

      {result.hasInput ? (
        <>
          <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <Stat label="Lương ngày bình thường" value={fmtMoney(result.dailyRate)} />
            <Stat label="Lương giờ bình thường" value={fmtMoney(result.hourlyRate)} />
          </div>

          <div style={{ marginTop: 22, overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  <th style={TH}>Loại ngày</th>
                  <th style={{ ...TH, textAlign: 'right' }}>Giờ tăng ca</th>
                  <th style={{ ...TH, textAlign: 'right' }}>Hệ số</th>
                  <th style={{ ...TH, textAlign: 'right' }}>Lương tăng ca</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map(r => (
                  <tr key={r.key}>
                    <td style={TD}>{r.label}</td>
                    <td style={{ ...TD, textAlign: 'right' }}>{r.hours || 0} giờ</td>
                    <td style={{ ...TD, textAlign: 'right' }}>{(r.rate * 100).toFixed(0)}%</td>
                    <td style={{ ...TD, textAlign: 'right', fontWeight: 600 }}>{fmtMoney(r.amount)}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...TD, fontWeight: 700, background: 'var(--surface2)' }}>Tổng lương tăng ca</td>
                  <td style={{ ...TD, textAlign: 'right', background: 'var(--surface2)' }}>{result.totalHours} giờ</td>
                  <td style={{ ...TD, background: 'var(--surface2)' }}></td>
                  <td
                    style={{
                      ...TD,
                      textAlign: 'right',
                      fontWeight: 800,
                      color: 'var(--accent)',
                      background: 'var(--surface2)',
                    }}
                  >
                    {fmtMoney(result.totalOT)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <Stat label="Tổng lương tăng ca" value={fmtMoney(result.totalOT)} accent />
            <Stat label="Tổng thu nhập tháng (gross + tăng ca)" value={fmtMoney(result.totalIncome)} accent />
          </div>

          {result.warnLimit && (
            <div
              style={{
                marginTop: 16,
                padding: '12px 14px',
                background: 'var(--warn-light)',
                border: '1px solid var(--warn)',
                borderRadius: 'var(--radius)',
                fontSize: 13,
                color: 'var(--warn)',
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              Tổng giờ tăng ca trong tháng đã vượt 40 giờ — trên ngưỡng tối đa theo Điều 107 BLLĐ 2019
              (trừ một số ngành đặc thù được phép tới 60 giờ/tháng).
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            marginTop: 24,
            padding: '14px 16px',
            background: 'var(--surface2)',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius)',
            fontSize: 13,
            color: 'var(--muted)',
          }}
        >
          Nhập lương gross và số ngày làm việc để tính lương tăng ca.
        </div>
      )}

      <div
        style={{
          marginTop: 20,
          padding: '14px 16px',
          background: 'var(--accent-light)',
          borderRadius: 'var(--radius)',
          borderLeft: '3px solid var(--accent)',
          fontSize: 13,
          color: 'var(--text)',
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: 'var(--accent)' }}>Căn cứ pháp lý:</strong> Theo Điều 98 Bộ luật Lao động 2019, lương
        tăng ca tối thiểu: ngày thường ≥ <strong>150%</strong>, ngày nghỉ tuần ≥ <strong>200%</strong>, ngày lễ / Tết
        ≥ <strong>300%</strong> tiền lương giờ làm việc bình thường. Tối đa <strong>40 giờ tăng ca / tháng</strong>,{' '}
        <strong>200 giờ / năm</strong> (một số ngành đặc thù được phép tới 300 giờ / năm theo Điều 107).
      </div>
    </div>
  )
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
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
      <div style={{ fontSize: accent ? 20 : 16, fontWeight: accent ? 800 : 700, color }}>{value}</div>
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
const TH: React.CSSProperties = {
  background: 'var(--surface2)',
  fontWeight: 600,
  padding: '10px 14px',
  borderBottom: '1px solid var(--border)',
  fontSize: 13,
  textAlign: 'left',
  color: 'var(--text)',
}
const TD: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid var(--border)',
  fontSize: 14,
  color: 'var(--text)',
}
