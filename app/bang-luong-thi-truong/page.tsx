import type { Metadata } from 'next'
import Link from 'next/link'
import SalaryTable from './SalaryTable'

export const metadata: Metadata = {
  title: 'Bảng lương theo ngành & cấp bậc 2026 | TínhLương.vn',
  description: 'Benchmark lương theo ngành nghề và cấp bậc Junior/Mid/Senior tại Việt Nam 2026. Biết lương thị trường trước khi đàm phán offer.',
}

export default function Page() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Bảng lương theo ngành &amp; cấp bậc 2026
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', margin: '0 0 24px' }}>
        Benchmark lương Gross/Net theo ngành nghề và cấp bậc tại Việt Nam năm 2026.
        Biết mức lương thị trường trước khi đi phỏng vấn hoặc đàm phán offer.
      </p>

      <SalaryTable />

      <div style={{
        marginTop: 28,
        padding: '16px 18px',
        background: 'var(--accent-light)',
        borderRadius: 'var(--radius)',
        borderLeft: '3px solid var(--accent)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Tính lương của bạn
        </div>
        <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
          Đã biết mức gross thị trường?{' '}
          <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            Tính lương Net của bạn →
          </Link>
        </div>
      </div>
    </div>
  )
}
