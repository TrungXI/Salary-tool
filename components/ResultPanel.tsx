'use client'
import { type SalaryResult } from '@/lib/salary'
import SnapshotShare from './SnapshotShare'
import { useT } from '@/lib/i18n/LocaleProvider'

const fmt = (n: number) => n.toLocaleString('vi-VN')
const pct = (n: number) => n.toFixed(1) + '%'

interface Props {
  result: SalaryResult
  grossFromNet: number | null
  locked: boolean
  onUnlock: () => void
}

export default function ResultPanel({ result: r, grossFromNet, locked, onUnlock }: Props) {
  const netPct = r.gross > 0 ? (r.netSalary / r.gross * 100) : 0
  const t = useT()

  return (
    <div style={{ animation: 'fadeUp 0.35s ease' }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .blur-lock { filter: blur(5px); user-select: none; pointer-events: none; }
      `}</style>

      {/* Tóm tắt - luôn hiển thị */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
        <MetricCard label={t('resultPanel.metricGross')} value={fmt(r.gross) + 'đ'} accent={false} />
        <MetricCard label={t('resultPanel.metricNet')} value={fmt(r.netSalary) + 'đ'} accent={true} />
        <MetricCard label={t('resultPanel.metricEmployerCost')} value={fmt(r.totalCostEmployer) + 'đ'} accent={false} />
        <MetricCard label={t('resultPanel.metricTax')} value={fmt(r.totalTax) + 'đ'} accent={false} sub={t('resultPanel.metricTaxRate', { rate: pct(r.effectiveTaxRate) })} />
      </div>

      <SnapshotShare result={r} />

      {/* Progress bar */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--muted)' }}>{t('resultPanel.grossBreakdownHeading')}</div>
        <div style={{ display: 'flex', height: 28, borderRadius: 8, overflow: 'hidden', gap: 2, marginBottom: 12 }}>
          <BarChunk pct={r.totalInsuranceEmployee / r.gross * 100} color="#f59e0b" label="BHXH/BHYT/BHTN" />
          <BarChunk pct={r.totalTax / r.gross * 100} color="#ef4444" label="Thuế TNCN" />
          <BarChunk pct={netPct} color="#1e6b45" label="NET" />
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Legend color="#f59e0b" label={t('resultPanel.legendInsurance', { amount: fmt(r.totalInsuranceEmployee), pct: pct(r.totalInsuranceEmployee/r.gross*100) })} />
          <Legend color="#ef4444" label={t('resultPanel.legendTax', { amount: fmt(r.totalTax), pct: pct(r.totalTax/r.gross*100) })} />
          <Legend color="#1e6b45" label={t('resultPanel.legendNet', { amount: fmt(r.netSalary), pct: pct(netPct) })} />
        </div>
      </div>

      {/* Chi tiết — có blur lock */}
      <div style={{ position: 'relative' }}>
        <div className={locked ? 'blur-lock' : ''}>
          {/* BHXH NLĐ */}
          <Section title={t('resultPanel.sectionEmployeeInsurance')}>
            <Row label={t('resultPanel.rowBhxhEmployee')} val={fmt(r.bhxhEmployee) + 'đ'} base={t('resultPanel.rowInsuranceBase', { amount: fmt(r.insuranceBase) })} />
            <Row label={t('resultPanel.rowBhytEmployee')} val={fmt(r.bhytEmployee) + 'đ'} />
            <Row label={t('resultPanel.rowBhtnEmployee')} val={fmt(r.bhtnEmployee) + 'đ'} />
            <Row label={t('resultPanel.rowTotalEmployee')} val={fmt(r.totalInsuranceEmployee) + 'đ'} bold />
          </Section>

          {/* BHXH NSD */}
          <Section title={t('resultPanel.sectionEmployerInsurance')}>
            <Row label={t('resultPanel.rowBhxhEmployer')} val={fmt(r.bhxhEmployer) + 'đ'} base={t('resultPanel.rowBhxhEmployerNote')} />
            <Row label={t('resultPanel.rowBhytEmployer')} val={fmt(r.bhytEmployer) + 'đ'} />
            <Row label={t('resultPanel.rowBhtnEmployer')} val={fmt(r.bhtnEmployer) + 'đ'} />
            <Row label={t('resultPanel.rowTotalEmployer')} val={fmt(r.totalInsuranceEmployer) + 'đ'} bold />
          </Section>

          {/* Thuế TNCN */}
          <Section title={t('resultPanel.sectionTax')}>
            <Row label={t('resultPanel.rowTaxableIncome')} val={fmt(r.taxableIncome) + 'đ'} base={t('resultPanel.rowTaxableIncomeNote')} />
            <Row label={t('resultPanel.rowPersonalDeduction')} val={`−${fmt(r.personalDeduction)}đ`} base={t('resultPanel.rowPersonalDeductionNote')} />
            {r.dependantDeduction > 0 && (
              <Row label={t('resultPanel.rowDependantDeduction')} val={`−${fmt(r.dependantDeduction)}đ`} base={t('resultPanel.rowDependantDeductionNote')} />
            )}
            <Row label={t('resultPanel.rowTaxableNet')} val={fmt(r.taxableNet) + 'đ'} bold />
            {r.taxBreakdown.map((b, i) => (
              <Row key={i}
                label={t('resultPanel.rowBracketLabel', { n: i + 1, desc: b.description, rate: (b.rate * 100).toFixed(0) + '%' })}
                val={fmt(b.tax) + 'đ'}
                base={t('resultPanel.rowBracketApplied', { amount: fmt(b.taxableAmount) })}
                indent
              />
            ))}
            <Row label={t('resultPanel.rowTotalTax')} val={fmt(r.totalTax) + 'đ'} bold highlight />
          </Section>

          {/* Tổng kết */}
          <div style={{ background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: 14, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 14, letterSpacing: '0.05em' }}>{t('resultPanel.summaryHeading')}</div>
            {grossFromNet && (
              <Row label={t('resultPanel.rowGrossEquivalent')} val={fmt(grossFromNet) + 'đ'} bold />
            )}
            <Row label={t('resultPanel.rowGross')} val={fmt(r.gross) + 'đ'} />
            {r.allowances > 0 && <Row label={t('resultPanel.rowAllowance')} val={`+${fmt(r.allowances)}đ`} />}
            <Row label={t('resultPanel.rowInsurancePaid')} val={`−${fmt(r.totalInsuranceEmployee)}đ`} />
            <Row label={t('resultPanel.rowTaxPaid')} val={`−${fmt(r.totalTax)}đ`} />
            <div style={{ borderTop: '1.5px solid var(--accent)', marginTop: 12, paddingTop: 12 }}>
              <Row label={t('resultPanel.rowNetTotal')} val={fmt(r.netSalary) + 'đ'} bold big accent />
            </div>
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 10, paddingTop: 10 }}>
              <Row label={t('resultPanel.rowEmployerTotal')} val={fmt(r.totalCostEmployer) + 'đ'} bold />
            </div>
          </div>

          {/* Affiliate CTA */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{t('resultPanel.affiliateTitle')}</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
              {t('resultPanel.affiliateDesc')}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href="https://www.misa.vn/phan-mem/misa-amis-hrm/?ref=tinhluong" target="_blank" rel="noopener" style={ctaBtn('#1e6b45', 'white')}>
                {t('resultPanel.affiliateMisa')}
              </a>
              <a href="https://www.base.vn/?ref=tinhluong" target="_blank" rel="noopener" style={ctaBtn('var(--surface2)', 'var(--text)')}>
                {t('resultPanel.affiliateBase')}
              </a>
            </div>
          </div>
        </div>

        {/* Lock overlay */}
        {locked && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 14,
          }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16,
              padding: '28px 32px', textAlign: 'center', maxWidth: 380, width: '90%',
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📊</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t('resultPanel.lockTitle')}</div>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 20px' }}>
                {t('resultPanel.lockDesc')}
              </p>
              <button onClick={onUnlock} style={{
                width: '100%', padding: '12px', border: 'none', borderRadius: 10,
                background: 'var(--accent)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}>
                {t('resultPanel.lockCta')}
              </button>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
                {t('resultPanel.lockNote')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MetricCard({ label, value, accent, sub }: { label: string; value: string; accent: boolean; sub?: string }) {
  return (
    <div style={{
      background: accent ? 'var(--accent)' : 'var(--surface)',
      border: accent ? 'none' : '1px solid var(--border)',
      borderRadius: 12, padding: '14px 16px',
    }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: accent ? 'rgba(255,255,255,0.75)' : 'var(--muted)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: accent ? 'white' : 'var(--text)', lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: accent ? 'rgba(255,255,255,0.65)' : 'var(--muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 22px', marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  )
}

function Row({ label, val, base, bold, big, accent, highlight, indent }: {
  label: string; val: string; base?: string; bold?: boolean; big?: boolean; accent?: boolean; highlight?: boolean; indent?: boolean
}) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '6px 0', borderBottom: '0.5px solid var(--border)',
      paddingLeft: indent ? 16 : 0,
    }}>
      <div>
        <span style={{ fontSize: big ? 15 : 13, fontWeight: bold ? 700 : 400, color: accent ? 'var(--accent)' : 'var(--text)' }}>{label}</span>
        {base && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{base}</div>}
      </div>
      <span style={{
        fontSize: big ? 17 : 13, fontWeight: bold ? 700 : 500,
        color: highlight ? '#dc2626' : accent ? 'var(--accent)' : 'var(--text)',
      }}>{val}</span>
    </div>
  )
}

function BarChunk({ pct, color, label }: { pct: number; color: string; label: string }) {
  if (pct <= 0) return null
  return (
    <div title={`${label}: ${pct.toFixed(1)}%`} style={{ flex: pct, background: color, minWidth: 2, position: 'relative' }} />
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
      <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
      {label}
    </div>
  )
}

const ctaBtn = (bg: string, color: string): React.CSSProperties => ({
  padding: '8px 16px', borderRadius: 8, background: bg, color,
  fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block',
  border: bg === 'var(--surface2)' ? '1px solid var(--border)' : 'none',
})
