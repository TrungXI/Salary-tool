import Link from 'next/link'
import { LEGAL_REFS } from '@/lib/legalRefs'

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/bac-thue-tncn', label: 'Bậc thuế TNCN' },
  { href: '/luong-toi-thieu-vung', label: 'Lương tối thiểu vùng' },
  { href: '/so-sanh-luat', label: 'So sánh luật' },
  { href: '/huong-dan-bhxh', label: 'Hướng dẫn BHXH' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: '24px 20px',
      marginTop: 40,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24,
      justifyContent: 'space-between',
      fontSize: 13,
      color: 'var(--muted)',
    }}>
      <div style={{ minWidth: 200 }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>© 2026 TínhLương.vn</div>
        <div style={{ lineHeight: 1.5 }}>Công cụ tính lương chính xác theo luật Việt Nam.</div>
      </div>

      <div>
        <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Trang</div>
        {NAV_LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            style={{ color: 'var(--text)', textDecoration: 'none', display: 'block', padding: '2px 0' }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div>
        <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Cơ sở pháp lý</div>
        {LEGAL_REFS.map(ref => (
          <a
            key={ref.code}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            title={ref.title}
            style={{ color: 'var(--muted)', textDecoration: 'none', display: 'block', padding: '2px 0', fontSize: 12 }}
          >
            {ref.code}
          </a>
        ))}
      </div>
    </footer>
  )
}
