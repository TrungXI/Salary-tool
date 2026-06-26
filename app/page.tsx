import CalcForm from '@/components/CalcForm'
import ExitIntent from '@/components/ExitIntent'

export default function Home() {
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          Tính lương Gross / Net<br /><span style={{ color: 'var(--accent)' }}>theo luật Việt Nam 2026</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, margin: 0 }}>BHXH • BHYT • BHTN • Thuế TNCN lũy tiến • Giảm trừ gia cảnh</p>
      </div>

      <CalcForm />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 32 }}>
        {[
          { icon: '📋', t: 'Cập nhật 2026', d: 'NĐ 293/2025, NQ 110/2025, Luật thuế TNCN 109/2025 — hiệu lực từ 01/01/2026' },
          { icon: '🔒', t: 'Bảo mật tuyệt đối', d: 'Tính toán trên trình duyệt, không lưu dữ liệu lương' },
          { icon: '🧮', t: 'Thuế lũy tiến', d: 'Tính đúng theo Luật 109/2025/QH15, 5 bậc thuế mới từ 2026' },
        ].map(b => (
          <div key={b.t} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{b.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{b.t}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{b.d}</div>
          </div>
        ))}
      </div>

      <ExitIntent />
    </>
  )
}
