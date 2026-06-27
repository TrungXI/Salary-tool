'use client'
import { useMemo, useState } from 'react'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmtMoney = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

const BONUS_STEPS = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0] as const

export default function TetBonusCalc() {
  const [gross, setGross] = useState('15,000,000')
  const [bonusMonths, setBonusMonths] = useState<number>(1.0)
  const [monthsWorked, setMonthsWorked] = useState('12')

  const result = useMemo(() => {
    const grossN = parseInput(gross)
    const mw = Math.max(0, Math.min(12, parseFloat(monthsWorked) || 0))

    const prorated = mw < 12 ? mw / 12 : 1
    const tetBonus = grossN * bonusMonths * prorated
    const afterTax = tetBonus * 0.9 // ước tính ~10% thuế
    const decemberIncome = grossN + tetBonus

    return {
      grossN,
      monthsWorked: mw,
      prorated,
      tetBonus,
      afterTax,
      decemberIncome,
      hasInput: grossN > 0,
    }
  }, [gross, bonusMonths, monthsWorked])

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
          <label style={L}>Lương cơ bản gross / tháng (đồng)</label>
          <input
            placeholder="VD: 15,000,000"
            value={gross}
            onChange={e => setGross(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Lương gross trên hợp đồng làm cơ sở thưởng.</div>
        </div>

        <div>
          <label style={L}>Số tháng đã làm trong năm</label>
          <input
            type="number"
            min={0}
            max={12}
            step={1}
            value={monthsWorked}
            onChange={e => setMonthsWorked(e.target.value)}
          />
          <div style={H}>Nếu vào giữa năm, thưởng sẽ chia theo tỷ lệ.</div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <label style={L}>Số tháng thưởng Tết</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {BONUS_STEPS.map(m => {
            const active = bonusMonths === m
            return (
              <button
                key={m}
                type="button"
                onClick={() => setBonusMonths(m)}
                style={{
                  flex: '1 1 0',
                  minWidth: 72,
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
                {m.toFixed(1)} tháng
              </button>
            )
          })}
        </div>
        <div style={H}>Thường 1–2 tháng lương, tuỳ công ty và kết quả kinh doanh.</div>
      </div>

      {result.hasInput ? (
        <>
          <div
            style={{
              marginTop: 22,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            <Stat label="Thưởng Tết (gross)" value={fmtMoney(result.tetBonus)} accent />
            <Stat label="Sau thuế ~10% (ước tính)" value={fmtMoney(result.afterTax)} />
            <Stat label="Thu nhập tháng nhận thưởng" value={fmtMoney(result.decemberIncome)} />
          </div>

          {result.monthsWorked < 12 && result.monthsWorked > 0 && (
            <div
              style={{
                marginTop: 16,
                padding: '12px 14px',
                background: 'var(--warn-light)',
                border: '1px solid var(--warn)',
                borderRadius: 'var(--radius)',
                fontSize: 13,
                color: 'var(--warn)',
                lineHeight: 1.6,
              }}
            >
              Bạn mới làm <strong>{result.monthsWorked} / 12 tháng</strong> trong năm → thưởng được chia theo tỷ lệ{' '}
              <strong>{(result.prorated * 100).toFixed(0)}%</strong> mức đầy đủ.
            </div>
          )}

          <div
            style={{
              marginTop: 16,
              padding: '14px 16px',
              background: 'var(--surface2)',
              borderRadius: 'var(--radius)',
              fontSize: 13,
              color: 'var(--text)',
              lineHeight: 1.7,
            }}
          >
            <strong>Cách tính thuế thực tế:</strong> Thưởng Tết được cộng vào thu nhập của tháng nhận thưởng (thường
            tháng 12 hoặc tháng 1) và tính thuế TNCN theo biểu luỹ tiến từng phần. Bậc thuế bạn rơi vào tuỳ tổng thu nhập
            tháng đó — có thể từ 5% (thu nhập thấp) tới 35% (thu nhập rất cao). Mức 10% chỉ là ước tính trung bình.
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
          Nhập lương cơ bản gross / tháng để ước tính thưởng Tết.
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
        <strong style={{ color: 'var(--warn)' }}>Lưu ý:</strong> Thưởng Tết <strong>không bắt buộc</strong> theo Bộ luật
        Lao động 2019 (Điều 104 — thưởng là khoản tiền hoặc tài sản hoặc bằng hình thức khác mà người sử dụng lao động
        thưởng cho người lao động căn cứ vào kết quả sản xuất, kinh doanh, mức độ hoàn thành công việc). Mức thưởng do
        công ty quyết định và quy chế thưởng phải được công khai. Công cụ này chỉ để ước tính.
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
