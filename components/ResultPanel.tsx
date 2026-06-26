'use client'
import { type SalaryResult } from '@/lib/salary'

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

  return (
    <div style={{ animation: 'fadeUp 0.35s ease' }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .blur-lock { filter: blur(5px); user-select: none; pointer-events: none; }
      `}</style>

      {/* Tóm tắt - luôn hiển thị */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
        <MetricCard label="Lương GROSS" value={fmt(r.gross) + 'đ'} accent={false} />
        <MetricCard label="Lương NET thực nhận" value={fmt(r.netSalary) + 'đ'} accent={true} />
        <MetricCard label="Tổng chi phí DN" value={fmt(r.totalCostEmployer) + 'đ'} accent={false} />
        <MetricCard label="Thuế TNCN" value={fmt(r.totalTax) + 'đ'} accent={false} sub={`Thuế suất TT: ${pct(r.effectiveTaxRate)}`} />
      </div>

      {/* Progress bar */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--muted)' }}>CƠ CẤU LƯƠNG GROSS</div>
        <div style={{ display: 'flex', height: 28, borderRadius: 8, overflow: 'hidden', gap: 2, marginBottom: 12 }}>
          <BarChunk pct={r.totalInsuranceEmployee / r.gross * 100} color="#f59e0b" label="BHXH/BHYT/BHTN" />
          <BarChunk pct={r.totalTax / r.gross * 100} color="#ef4444" label="Thuế TNCN" />
          <BarChunk pct={netPct} color="#1e6b45" label="NET nhận" />
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Legend color="#f59e0b" label={`Bảo hiểm: ${fmt(r.totalInsuranceEmployee)}đ (${pct(r.totalInsuranceEmployee/r.gross*100)})`} />
          <Legend color="#ef4444" label={`Thuế TNCN: ${fmt(r.totalTax)}đ (${pct(r.totalTax/r.gross*100)})`} />
          <Legend color="#1e6b45" label={`NET: ${fmt(r.netSalary)}đ (${pct(netPct)})`} />
        </div>
      </div>

      {/* Chi tiết — có blur lock */}
      <div style={{ position: 'relative' }}>
        <div className={locked ? 'blur-lock' : ''}>
          {/* BHXH NLĐ */}
          <Section title="BẢO HIỂM NGƯỜI LAO ĐỘNG ĐÓNG (10.5%)">
            <Row label="BHXH (8%)" val={fmt(r.bhxhEmployee) + 'đ'} base={`Mức đóng: ${fmt(r.insuranceBase)}đ`} />
            <Row label="BHYT (1.5%)" val={fmt(r.bhytEmployee) + 'đ'} />
            <Row label="BHTN (1%)" val={fmt(r.bhtnEmployee) + 'đ'} />
            <Row label="Tổng NLĐ đóng" val={fmt(r.totalInsuranceEmployee) + 'đ'} bold />
          </Section>

          {/* BHXH NSD */}
          <Section title="BẢO HIỂM DOANH NGHIỆP ĐÓNG THÊM (21.5%)">
            <Row label="BHXH (17.5%)" val={fmt(r.bhxhEmployer) + 'đ'} base="Bao gồm quỹ TNLĐ-BNN 0.5%" />
            <Row label="BHYT (3%)" val={fmt(r.bhytEmployer) + 'đ'} />
            <Row label="BHTN (1%)" val={fmt(r.bhtnEmployer) + 'đ'} />
            <Row label="Tổng DN đóng thêm" val={fmt(r.totalInsuranceEmployer) + 'đ'} bold />
          </Section>

          {/* Thuế TNCN */}
          <Section title="THUẾ THU NHẬP CÁ NHÂN (LŨY TIẾN)">
            <Row label="Thu nhập chịu thuế" val={fmt(r.taxableIncome) + 'đ'} base="Gross − Bảo hiểm NLĐ" />
            <Row label="Giảm trừ bản thân" val={`−${fmt(r.personalDeduction)}đ`} base="15,500,000đ/tháng" />
            {r.dependantDeduction > 0 && (
              <Row label="Giảm trừ người phụ thuộc" val={`−${fmt(r.dependantDeduction)}đ`} base="6,200,000đ × người" />
            )}
            <Row label="Thu nhập tính thuế" val={fmt(r.taxableNet) + 'đ'} bold />
            {r.taxBreakdown.map((b, i) => (
              <Row key={i}
                label={`Bậc ${i+1}: ${b.description} × ${(b.rate*100).toFixed(0)}%`}
                val={fmt(b.tax) + 'đ'}
                base={`Áp dụng cho: ${fmt(b.taxableAmount)}đ`}
                indent
              />
            ))}
            <Row label="Tổng thuế TNCN" val={fmt(r.totalTax) + 'đ'} bold highlight />
          </Section>

          {/* Tổng kết */}
          <div style={{ background: 'var(--accent-light)', border: '1.5px solid var(--accent)', borderRadius: 14, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 14, letterSpacing: '0.05em' }}>KẾT QUẢ CUỐI CÙNG</div>
            {grossFromNet && (
              <Row label="Lương Gross tương đương" val={fmt(grossFromNet) + 'đ'} bold />
            )}
            <Row label="Lương Gross" val={fmt(r.gross) + 'đ'} />
            {r.allowances > 0 && <Row label="Phụ cấp không tính BHXH" val={`+${fmt(r.allowances)}đ`} />}
            <Row label="Bảo hiểm NLĐ đóng" val={`−${fmt(r.totalInsuranceEmployee)}đ`} />
            <Row label="Thuế TNCN" val={`−${fmt(r.totalTax)}đ`} />
            <div style={{ borderTop: '1.5px solid var(--accent)', marginTop: 12, paddingTop: 12 }}>
              <Row label="NET THỰC NHẬN" val={fmt(r.netSalary) + 'đ'} bold big accent />
            </div>
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 10, paddingTop: 10 }}>
              <Row label="Tổng chi phí doanh nghiệp" val={fmt(r.totalCostEmployer) + 'đ'} bold />
            </div>
          </div>

          {/* Affiliate CTA */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Tự động hóa tính lương hàng tháng?</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
              Đang tính lương cho nhiều nhân viên? Phần mềm HRM sẽ tính tự động, xuất phiếu lương, nhắc deadline đóng BHXH.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href="https://www.misa.vn/phan-mem/misa-amis-hrm/?ref=tinhluong" target="_blank" rel="noopener" style={ctaBtn('#1e6b45', 'white')}>
                Dùng thử MISA HRM →
              </a>
              <a href="https://www.base.vn/?ref=tinhluong" target="_blank" rel="noopener" style={ctaBtn('var(--surface2)', 'var(--text)')}>
                Xem Base.vn
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
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Xem báo cáo đầy đủ</div>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 20px' }}>
                Nhập email để xem chi tiết từng bậc thuế, BHXH, tổng chi phí doanh nghiệp, và nhận bảng tính lương Excel miễn phí.
              </p>
              <button onClick={onUnlock} style={{
                width: '100%', padding: '12px', border: 'none', borderRadius: 10,
                background: 'var(--accent)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}>
                Nhận báo cáo miễn phí →
              </button>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
                Không spam. Hủy bất cứ lúc nào.
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
