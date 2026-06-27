'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0

type Verdict = {
  level: 'good' | 'warn' | 'bad'
  icon: string
  title: string
  message: string
  bg: string
  border: string
  color: string
}

function judge(dti: number): Verdict {
  if (dti <= 40) {
    return {
      level: 'good',
      icon: '✅',
      title: 'Tốt',
      message: `Tỷ lệ nợ của bạn ${dti.toFixed(1)}%, ngân hàng thường chấp nhận DTI ≤ 40%.`,
      bg: 'var(--accent-light)',
      border: 'var(--accent)',
      color: 'var(--accent)',
    }
  }
  if (dti <= 50) {
    return {
      level: 'warn',
      icon: '⚠️',
      title: 'Cần cân nhắc',
      message: `DTI ${dti.toFixed(1)}%, một số ngân hàng có thể không chấp nhận.`,
      bg: 'var(--warn-light)',
      border: 'var(--warn)',
      color: 'var(--warn)',
    }
  }
  return {
    level: 'bad',
    icon: '❌',
    title: 'Rủi ro cao',
    message: `DTI ${dti.toFixed(1)}%, khó được phê duyệt khoản vay mới.`,
    bg: '#fef2f2',
    border: '#dc2626',
    color: '#dc2626',
  }
}

export default function DtiCalc() {
  const [income, setIncome] = useState('')
  const [currentDebt, setCurrentDebt] = useState('')
  const [newLoan, setNewLoan] = useState('')

  const { dti, verdict, showVerdict } = useMemo(() => {
    const inc = parseInput(income)
    const cur = parseInput(currentDebt)
    const neu = parseInput(newLoan)
    const totalDebt = cur + neu
    const dti = inc > 0 ? (totalDebt / inc) * 100 : 0
    return {
      dti,
      verdict: judge(dti),
      showVerdict: inc > 0 && totalDebt > 0,
    }
  }, [income, currentDebt, newLoan])

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', marginBottom: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
        <div>
          <label style={L}>Lương Net / tháng (đồng)</label>
          <input
            placeholder="VD: 30,000,000"
            value={income}
            onChange={e => setIncome(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>
            Chưa biết Net?{' '}
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
              Tính tại đây →
            </Link>
          </div>
        </div>

        <div>
          <label style={L}>Tổng trả nợ hiện tại / tháng (đồng)</label>
          <input
            placeholder="VD: 5,000,000"
            value={currentDebt}
            onChange={e => setCurrentDebt(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Nợ thẻ tín dụng, vay tiêu dùng, vay khác...</div>
        </div>

        <div>
          <label style={L}>Khoản vay mới dự kiến trả góp / tháng (đồng)</label>
          <input
            placeholder="VD: 12,000,000"
            value={newLoan}
            onChange={e => setNewLoan(fmtInput(e.target.value))}
            inputMode="numeric"
          />
          <div style={H}>Số tiền trả góp hàng tháng của khoản vay mới.</div>
        </div>
      </div>

      {showVerdict ? (
        <div style={{
          marginTop: 24, padding: '18px 20px',
          background: verdict.bg, border: `1px solid ${verdict.border}`,
          borderRadius: 'var(--radius)',
        }}>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, fontWeight: 500 }}>
            DTI của bạn
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: verdict.color, marginBottom: 10, lineHeight: 1 }}>
            {dti.toFixed(1)}%
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: verdict.color, marginBottom: 4 }}>
            {verdict.icon} {verdict.title}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
            {verdict.message}
          </div>
        </div>
      ) : (
        <div style={{
          marginTop: 24, padding: '14px 16px',
          background: 'var(--surface2)', border: '1px dashed var(--border)',
          borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--muted)',
        }}>
          Nhập lương Net và ít nhất một khoản nợ để xem kết quả DTI.
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
        <strong>DTI (Debt-to-Income ratio)</strong> là tỷ lệ tổng nghĩa vụ nợ / thu nhập hàng tháng.
        Hầu hết ngân hàng Việt Nam yêu cầu DTI ≤ 40% để phê duyệt khoản vay.
      </div>
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
