'use client'
import { useEffect, useState } from 'react'
import { calculateSalary, calcGrossFromNet, REGION_NAMES, MIN_WAGES, type SalaryResult, type Region } from '@/lib/salary'
import ResultPanel from './ResultPanel'
import EmailGate from './EmailGate'

const fmtInput = (raw: string) => {
  const n = raw.replace(/[^\d]/g, '')
  return n ? parseInt(n).toLocaleString('vi-VN') : ''
}
const parseInput = (s: string) => parseFloat(s.replace(/\./g, '').replace(/,/g, '')) || 0

interface Props {
  initialGross?: number
  initialMode?: 'gross_to_net' | 'net_to_gross'
  initialRegion?: Region
  initialDependants?: number
  initialAllowances?: number
  initialEmpType?: 'full' | 'probation'
}

export default function CalcForm({
  initialGross,
  initialMode = 'gross_to_net',
  initialRegion = 1,
  initialDependants = 0,
  initialAllowances = 0,
  initialEmpType = 'full',
}: Props) {
  const [mode, setMode] = useState<'gross_to_net' | 'net_to_gross'>(initialMode)
  const [salary, setSalary] = useState(initialGross ? initialGross.toLocaleString('vi-VN') : '')
  const [dependants, setDependants] = useState(String(initialDependants))
  const [region, setRegion] = useState(String(initialRegion))
  const [allowances, setAllowances] = useState(initialAllowances ? initialAllowances.toLocaleString('vi-VN') : '')
  const [empType, setEmpType] = useState<'full' | 'probation'>(initialEmpType)
  const [result, setResult] = useState<SalaryResult | null>(null)
  const [grossFromNet, setGrossFromNet] = useState<number | null>(null)
  const [emailUnlocked, setEmailUnlocked] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [error, setError] = useState('')

  // Pre-compute result if initialGross is supplied (SEO landing pages).
  useEffect(() => {
    if (!initialGross) return
    const res = calculateSalary({
      grossSalary: initialGross,
      dependants: initialDependants ?? 0,
      region: (initialRegion ?? 1) as Region,
      allowances: initialAllowances ?? 0,
      employeeType: initialEmpType ?? 'full',
    })
    setResult(res)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <>
      {/* Mode toggle */}
      <div style={{ display: 'flex', background: 'var(--surface2)', borderRadius: 12, padding: 4, maxWidth: 380, margin: '0 auto 28px' }}>
        {[{ v: 'gross_to_net', l: 'Gross → Net' }, { v: 'net_to_gross', l: 'Net → Gross' }].map(m => (
          <button
            key={m.v}
            onClick={() => { setMode(m.v as typeof mode); setResult(null) }}
            style={{
              flex: 1, padding: '9px 0', border: 'none', borderRadius: 9, cursor: 'pointer', fontSize: 14,
              fontWeight: mode === m.v ? 700 : 400,
              background: mode === m.v ? 'var(--surface)' : 'transparent',
              color: mode === m.v ? 'var(--accent)' : 'var(--muted)',
              transition: 'all 0.15s',
            }}
          >
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
              {([1, 2, 3, 4] as Region[]).map(r => <option key={r} value={r}>{REGION_NAMES[r]}</option>)}
            </select>
          </div>

          <div>
            <label style={L}>Số người phụ thuộc</label>
            <select value={dependants} onChange={e => setDependants(e.target.value)}>
              {[0, 1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n === 0 ? 'Không có' : `${n} người (−${(n * 6200000).toLocaleString('vi-VN')}đ)`}</option>
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

        <button
          onClick={handleCalc}
          style={{
            marginTop: 24, width: '100%', padding: 13, border: 'none',
            borderRadius: 10, background: 'var(--accent)', color: 'white',
            fontSize: 16, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.01em',
          }}
        >
          Tính lương ngay →
        </button>
      </div>

      {result && (
        <ResultPanel result={result} grossFromNet={grossFromNet} locked={!emailUnlocked} onUnlock={() => setShowGate(true)} />
      )}

      {showGate && <EmailGate onSuccess={() => { setShowGate(false); setEmailUnlocked(true) }} onClose={() => setShowGate(false)} />}
    </>
  )
}

const L: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }
const H: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginTop: 5 }
