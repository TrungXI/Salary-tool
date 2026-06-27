'use client'
import { useMemo, useState } from 'react'

type WorkType = 'normal' | 'hazardous' | 'disabled'

const BASE_LEAVE: Record<WorkType, number> = {
  normal: 12,
  hazardous: 14,
  disabled: 14,
}

const TYPE_LABEL: Record<WorkType, string> = {
  normal: 'Công việc thông thường',
  hazardous: 'Làm việc nặng nhọc / độc hại / nguy hiểm',
  disabled: 'Người khuyết tật',
}

export default function LeaveCalc() {
  const [years, setYears] = useState('2')
  const [type, setType] = useState<WorkType>('normal')

  const result = useMemo(() => {
    const y = Math.max(0, parseFloat(years) || 0)
    const baseLeave = BASE_LEAVE[type]
    const bonusDays = Math.floor(y / 5)
    const totalLeave = baseLeave + bonusDays
    const monthlyLeave = totalLeave / 12

    return {
      years: y,
      baseLeave,
      bonusDays,
      totalLeave,
      monthlyLeave,
      nextMilestoneYears: (Math.floor(y / 5) + 1) * 5,
      hasInput: y >= 0,
    }
  }, [years, type])

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
        }}
      >
        <div>
          <label style={L}>Thâm niên (năm)</label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={years}
            onChange={e => setYears(e.target.value)}
          />
          <div style={H}>Số năm làm việc tại công ty hiện tại.</div>
        </div>

        <div>
          <label style={L}>Loại công việc</label>
          <select value={type} onChange={e => setType(e.target.value as WorkType)}>
            <option value="normal">{TYPE_LABEL.normal}</option>
            <option value="hazardous">{TYPE_LABEL.hazardous}</option>
            <option value="disabled">{TYPE_LABEL.disabled}</option>
          </select>
          <div style={H}>Quyết định phép cơ bản 12 hay 14 ngày.</div>
        </div>
      </div>

      {result.hasInput && (
        <>
          <div
            style={{
              marginTop: 22,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            <Stat label="Phép năm cơ bản" value={`${result.baseLeave} ngày`} />
            <Stat
              label="Thâm niên thêm"
              value={`+${result.bonusDays} ngày`}
              hint="Cứ đủ 5 năm +1 ngày"
            />
            <Stat
              label="Tổng phép năm"
              value={`${result.totalLeave} ngày / năm`}
              accent
            />
          </div>

          <div
            style={{
              marginTop: 18,
              padding: '14px 16px',
              background: 'var(--accent-light)',
              borderRadius: 'var(--radius)',
              borderLeft: '3px solid var(--accent)',
              fontSize: 14,
              color: 'var(--text)',
              lineHeight: 1.7,
            }}
          >
            Phép tính theo tháng (cộng dồn dần): <strong>{result.monthlyLeave.toFixed(2)} ngày / tháng</strong>{' '}
            (~{Math.round(result.monthlyLeave * 8)} giờ).
            {result.years > 0 && result.years < 50 && (
              <>
                <br />
                Mốc tiếp theo: <strong>{result.nextMilestoneYears} năm</strong> → {result.totalLeave + 1} ngày / năm.
              </>
            )}
          </div>
        </>
      )}

      <div
        style={{
          marginTop: 20,
          padding: '14px 16px',
          background: 'var(--surface2)',
          borderRadius: 'var(--radius)',
          fontSize: 13,
          color: 'var(--muted)',
          lineHeight: 1.7,
        }}
      >
        Căn cứ <strong>Điều 113 Bộ luật Lao động 2019</strong>: người lao động làm việc đủ 12 tháng có 12 ngày phép cho
        công việc thông thường, 14 ngày cho công việc nặng nhọc/độc hại/nguy hiểm hoặc người khuyết tật. Cứ đủ 5 năm
        làm việc cho cùng một người sử dụng lao động được thêm 1 ngày phép theo Điều 114.
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string
  value: string
  hint?: string
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
      {hint && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{hint}</div>}
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
