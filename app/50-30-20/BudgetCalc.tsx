'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0
const fmtMoney = (n: number) => Math.round(n).toLocaleString('vi-VN') + ' đ'

const SAVE_BG = 'rgba(16,185,129,0.10)'
const SAVE_BORDER = '#10b981'
const SAVE_TEXT = '#047857'

export default function BudgetCalc() {
  const [salary, setSalary] = useState('')
  const [pctNeeds, setPctNeeds] = useState('50')
  const [pctWants, setPctWants] = useState('30')
  const [pctSave, setPctSave] = useState('20')

  const totals = useMemo(() => {
    const net = parseInput(salary)
    const n = parseFloat(pctNeeds) || 0
    const w = parseFloat(pctWants) || 0
    const s = parseFloat(pctSave) || 0
    const sum = n + w + s
    return {
      net,
      n, w, s, sum,
      needs: (net * n) / 100,
      wants: (net * w) / 100,
      save: (net * s) / 100,
      valid: Math.abs(sum - 100) < 0.01,
    }
  }, [salary, pctNeeds, pctWants, pctSave])

  const reset = () => {
    setPctNeeds('50')
    setPctWants('30')
    setPctSave('20')
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', marginBottom: 16 }}>
      <div>
        <label style={L}>Lương Net / tháng (đồng)</label>
        <input
          placeholder="VD: 25,000,000"
          value={salary}
          onChange={e => setSalary(fmtInput(e.target.value))}
          inputMode="numeric"
        />
        <div style={H}>
          Chưa biết Net?{' '}
          <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            Tính tại đây →
          </Link>
        </div>
      </div>

      {totals.net > 0 && totals.valid ? (
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          <Bucket
            pct={totals.n}
            title="Nhu cầu thiết yếu"
            amount={fmtMoney(totals.needs)}
            examples="Tiền nhà, ăn uống, đi lại, hóa đơn điện nước, bảo hiểm sức khỏe."
            bg="var(--accent-light)"
            border="var(--accent)"
            color="var(--accent)"
          />
          <Bucket
            pct={totals.w}
            title="Mong muốn cá nhân"
            amount={fmtMoney(totals.wants)}
            examples="Ăn ngoài, giải trí, mua sắm, du lịch, sở thích."
            bg="var(--warn-light)"
            border="var(--warn)"
            color="var(--warn)"
          />
          <Bucket
            pct={totals.s}
            title="Tiết kiệm & Đầu tư"
            amount={fmtMoney(totals.save)}
            examples="Quỹ khẩn cấp, hưu trí, cổ phiếu, gửi ngân hàng, trả nợ."
            bg={SAVE_BG}
            border={SAVE_BORDER}
            color={SAVE_TEXT}
          />
        </div>
      ) : totals.net > 0 && !totals.valid ? (
        <div style={{
          marginTop: 24, padding: '14px 16px',
          background: '#fef2f2', border: '1px solid #dc2626',
          borderRadius: 'var(--radius)', fontSize: 14, color: '#991b1b',
        }}>
          ⚠️ Tổng tỷ lệ phải bằng 100% — hiện đang là <strong>{totals.sum}%</strong>. Điều chỉnh ở phần &ldquo;Tùy chỉnh tỷ lệ&rdquo; bên dưới.
        </div>
      ) : (
        <div style={{
          marginTop: 24, padding: '14px 16px',
          background: 'var(--surface2)', border: '1px dashed var(--border)',
          borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--muted)',
        }}>
          Nhập lương Net / tháng để xem chia ngân sách.
        </div>
      )}

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
            Tùy chỉnh tỷ lệ
          </div>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 600,
              background: 'var(--surface2)',
              color: 'var(--muted)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
            }}
          >
            Reset 50/30/20
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          <PctInput label="Nhu cầu (%)" value={pctNeeds} onChange={setPctNeeds} color="var(--accent)" />
          <PctInput label="Mong muốn (%)" value={pctWants} onChange={setPctWants} color="var(--warn)" />
          <PctInput label="Tiết kiệm (%)" value={pctSave} onChange={setPctSave} color={SAVE_TEXT} />
        </div>
        <div style={{
          marginTop: 12,
          padding: '8px 12px',
          background: totals.valid ? 'var(--accent-light)' : '#fef2f2',
          border: `1px solid ${totals.valid ? 'var(--accent)' : '#dc2626'}`,
          borderRadius: 'var(--radius)',
          fontSize: 13,
          fontWeight: 600,
          color: totals.valid ? 'var(--accent)' : '#991b1b',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>Tổng tỷ lệ</span>
          <span>{totals.sum}% {totals.valid ? '✓' : '— phải = 100%'}</span>
        </div>
      </div>

      <div style={{ marginTop: 24, padding: '16px 18px', background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Bước tiếp theo
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.7 }}>
          <Link href="/quy-khan-cap" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Tính quỹ khẩn cấp từ 20% tiết kiệm →
          </Link>
          <br />
          <Link href="/tiet-kiem-huu-tri" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Tính tiết kiệm hưu trí với lãi kép →
          </Link>
        </p>
      </div>
    </div>
  )
}

function Bucket({
  pct, title, amount, examples, bg, border, color,
}: {
  pct: number; title: string; amount: string; examples: string;
  bg: string; border: string; color: string;
}) {
  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 'var(--radius)',
      padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>{pct}%</div>
        <div style={{ fontSize: 14, fontWeight: 700, color }}>{title}</div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8, lineHeight: 1.2 }}>
        {amount}
      </div>
      <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
        {examples}
      </div>
    </div>
  )
}

function PctInput({ label, value, onChange, color }: {
  label: string; value: string; onChange: (v: string) => void; color: string;
}) {
  return (
    <div>
      <label style={{ ...L, color }}>{label}</label>
      <input
        type="number"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
