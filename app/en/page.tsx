import CalcForm from '@/components/CalcForm'
import ExitIntent from '@/components/ExitIntent'
import { getDictionary } from '@/lib/i18n/dictionary'

export default function HomeEn() {
  const d = getDictionary('en').home
  const benefits = [
    { icon: '📋', t: d.benefits.updateTitle, desc: d.benefits.updateDesc },
    { icon: '🔒', t: d.benefits.secureTitle, desc: d.benefits.secureDesc },
    { icon: '🧮', t: d.benefits.progressiveTitle, desc: d.benefits.progressiveDesc },
  ]
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          {d.h1Line1}<br /><span style={{ color: 'var(--accent)' }}>{d.h1Line2}</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, margin: 0 }}>{d.subtitle}</p>
      </div>

      <CalcForm />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 32 }}>
        {benefits.map(b => (
          <div key={b.t} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{b.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{b.t}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{b.desc}</div>
          </div>
        ))}
      </div>

      <ExitIntent />
    </>
  )
}
