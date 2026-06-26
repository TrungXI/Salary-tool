'use client'
import { useState } from 'react'
import { calculateSalary, calcGrossFromNet, REGION_NAMES, MIN_WAGES, type SalaryInput, type SalaryResult, type Region } from '@/lib/salary'
import ResultPanel from '@/components/ResultPanel'
import EmailGate from '@/components/EmailGate'
import LegalBadge from '@/components/LegalBadge'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0

export default function Home() {
  const [mode, setMode] = useState<'gross_to_net' | 'net_to_gross'>('gross_to_net')
  const [salary, setSalary] = useState('')
  const [dependants, setDependants] = useState('0')
  const [region, setRegion] = useState('1')
  const [allowances, setAllowances] = useState('')
  const [empType, setEmpType] = useState<'full' | 'probation'>('full')
  const [result, setResult] = useState<SalaryResult | null>(null)
  const [grossFromNet, setGrossFromNet] = useState<number | null>(null)
  const [emailUnlocked, setEmailUnlocked] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [error, setError] = useState('')

  const handleCalc = () => {
    const salaryVal = parseInput(salary)
    if (!salaryVal || salaryVal <= 0) { setError('Vui lòng nhập mức lương hợp lệ'); return }
    setError('')
    const r = parseInt(region) as Region
    const dep = parseInt(dependants)
    const allow = parseInput(allowances)

    let gross = salaryVal
    if (mode === 'net_to_gross') {
      gross = calcGrossFromNet(salaryVal, dep, r, allow)
      setGrossFromNet(gross)
    } else {
      setGrossFromNet(null)
    }

    const res = calculateSalary({ grossSalary: gross, dependants: dep, region: r, allowances: allow, employeeType: empType })
    setResult(res)
    if (!emailUnlocked) setTimeout(() => setShowGate(true), 700)
  }

  const minW = MIN_WAGES[parseInt(region) as Region]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>TínhLương.vn</span>
            <span style={{ fontSize: 11, background: 'var(--accent-light)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>Luật 2026</span>
            <LegalBadge style={{ marginLeft: 4 }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Miễn phí · Chính xác · Bảo mật</span>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
            Tính lương Gross / Net<br /><span style={{ color: 'var(--accent)' }}>theo luật Việt Nam 2026</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, margin: 0 }}>BHXH • BHYT • BHTN • Thuế TNCN lũy tiến • Giảm trừ gia cảnh</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', background: 'var(--surface2)', borderRadius: 12, padding: 4, maxWidth: 380, margin: '0 auto 28px' }}>
          {[{ v: 'gross_to_net', l: 'Gross → Net' }, { v: 'net_to_gross', l: 'Net → Gross' }].map(m => (
            <button key={m.v} onClick={() => { setMode(m.v as typeof mode); setResult(null) }}
              style={{ flex: 1, padding: '9px 0', border: 'none', borderRadius: 9, cursor: 'pointer', fontSize: 14,
                fontWeight: mode === m.v ? 700 : 400, background: mode === m.v ? 'var(--surface)' : 'transparent',
                color: mode === m.v ? 'var(--accent)' : 'var(--muted)', transition: 'all 0.15s' }}>
              {m.l}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>

            <div>
              <label style={L}>{mode === 'gross_to_net' ? 'Lương Gross (đồng/tháng)' : 'Lương Net mong muốn (đồng)'}</label>
              <input placeholder="VD: 15,000,000" value={salary} onChange={e => setSalary(fmtInput(e.target.value))} />
              <div style={H}>Lương tối thiểu vùng: {minW.toLocaleString('vi-VN')}đ</div>
            </div>

            <div>
              <label style={L}>Vùng lương tối thiểu</label>
              <select value={region} onChange={e => setRegion(e.target.value)}>
                {([1,2,3,4] as Region[]).map(r => <option key={r} value={r}>{REGION_NAMES[r]}</option>)}
              </select>
            </div>

            <div>
              <label style={L}>Số người phụ thuộc</label>
              <select value={dependants} onChange={e => setDependants(e.target.value)}>
                {[0,1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n === 0 ? 'Không có' : `${n} người (−${(n*6200000).toLocaleString('vi-VN')}đ)`}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={L}>Phụ cấp không tính BHXH (đồng)</label>
              <input placeholder="VD: 1,000,000" value={allowances} onChange={e => setAllowances(fmtInput(e.target.value))} />
              <div style={H}>Xăng xe, điện thoại, ăn ca...</div>
            </div>

            <div>
              <label style={L}>Loại hợp đồng</label>
              <select value={empType} onChange={e => setEmpType(e.target.value as 'full' | 'probation')}>
                <option value="full">Chính thức (đóng đủ BHXH)</option>
                <option value="probation">Thử việc (chỉ đóng BHYT)</option>
              </select>
            </div>
          </div>

          {error && <div style={{ marginTop: 14, padding: '10px 14px', background: '#fef2f2', borderRadius: 8, color: '#dc2626', fontSize: 14 }}>{error}</div>}

          <button onClick={handleCalc} style={{
            marginTop: 24, width: '100%', padding: 13, border: 'none',
            borderRadius: 10, background: 'var(--accent)', color: 'white',
            fontSize: 16, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.01em',
          }}>
            Tính lương ngay →
          </button>
        </div>

        {result && (
          <ResultPanel result={result} grossFromNet={grossFromNet} locked={!emailUnlocked} onUnlock={() => setShowGate(true)} />
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 32 }}>
          {[
            { icon: '📋', t: 'Cập nhật 2026', d: 'NĐ 293/2025, NQ 110/2025, Luật thuế TNCN 109/2025 — hiệu lực từ 01/01/2026' },
            { icon: '🔒', t: 'Bảo mật tuyệt đối', d: 'Tính toán trên trình duyệt, không lưu dữ liệu lương' },
            { icon: '🧮', t: 'Thuế lũy tiến', d: 'Tính đúng theo Điều 22 Luật thuế TNCN, từng bậc thuế' },
          ].map(b => (
            <div key={b.t} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{b.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{b.t}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{b.d}</div>
            </div>
          ))}
        </div>
      </main>

      {showGate && <EmailGate onSuccess={() => { setShowGate(false); setEmailUnlocked(true) }} onClose={() => setShowGate(false)} />}
    </div>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
