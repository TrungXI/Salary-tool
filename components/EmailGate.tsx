'use client'
import { useState } from 'react'

interface Props {
  onSuccess: () => void
  onClose: () => void
}

export default function EmailGate({ onSuccess, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) { setError('Email không hợp lệ'); return }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      if (res.ok) {
        onSuccess()
      } else {
        const d = await res.json()
        setError(d.error || 'Có lỗi xảy ra, thử lại nhé')
      }
    } catch {
      // In dev/demo: just unlock without API
      onSuccess()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }}>
      <div style={{
        background: 'var(--surface)', borderRadius: 20, padding: '32px 36px',
        maxWidth: 420, width: '100%', position: 'relative',
        animation: 'popIn 0.2s ease',
      }}>
        <style>{`@keyframes popIn { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }`}</style>

        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, background: 'none',
          border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 20, lineHeight: 1,
        }}>×</button>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>📬</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>Nhận báo cáo đầy đủ</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
            Nhập email để xem chi tiết từng bậc thuế, và nhận ngay <strong>bảng tính lương Excel</strong> + tips tối ưu lương thưởng miễn phí.
          </p>
        </div>

        {/* Benefits */}
        <div style={{ background: 'var(--accent-light)', borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
          {[
            '✓ Báo cáo chi tiết từng bậc thuế TNCN',
            '✓ Bảng tính lương Excel cho team',
            '✓ Tips tối ưu lương thưởng hợp pháp',
            '✓ Cập nhật khi luật thay đổi',
          ].map(b => (
            <div key={b} style={{ fontSize: 13, color: 'var(--accent)', padding: '3px 0', fontWeight: 500 }}>{b}</div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <input
              type="text" placeholder="Tên của bạn (không bắt buộc)"
              value={name} onChange={e => setName(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <input
              type="email" placeholder="Email của bạn *"
              value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {error && <div style={{ marginTop: 10, fontSize: 13, color: '#dc2626' }}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading} style={{
          marginTop: 16, width: '100%', padding: 13, border: 'none',
          borderRadius: 10, background: loading ? '#6b9f85' : 'var(--accent)',
          color: 'white', fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
        }}>
          {loading ? 'Đang xử lý...' : 'Nhận báo cáo miễn phí →'}
        </button>

        <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 10 }}>
          Không spam. Hủy đăng ký bất cứ lúc nào.
        </div>
      </div>
    </div>
  )
}
