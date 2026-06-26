import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { decodeSnapshot } from '@/lib/snapshot'
import { calculateSalary } from '@/lib/salary'
import CopyLinkButton from '@/components/CopyLinkButton'

export const runtime = 'edge'

const fmt = (n: number) => n.toLocaleString('vi-VN')

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const payload = decodeSnapshot(slug)
  if (!payload) return {}
  return {
    title: `Lương NET ${(payload.net / 1_000_000).toFixed(1)} triệu | TínhLương.vn`,
    description: `Kết quả tính lương từ TínhLương.vn`,
    openGraph: { images: [`/api/og?s=${encodeURIComponent(slug)}`] },
    twitter: { card: 'summary_large_image', images: [`/api/og?s=${encodeURIComponent(slug)}`] },
  }
}

const cardStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: '16px 18px',
}
const cardLabel: React.CSSProperties = { fontSize: 12, color: 'var(--muted)', marginBottom: 6 }
const cardValue: React.CSSProperties = { fontSize: 22, fontWeight: 800, color: 'var(--text)' }
const cardAccent: React.CSSProperties = { ...cardValue, color: 'var(--accent)' }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = decodeSnapshot(slug)
  if (!payload) notFound()

  const result = calculateSalary(payload.input)

  // Build a generic share URL — server-side we don't know the host,
  // so we let client-side share buttons use window.location via CopyLinkButton.
  // For Facebook/Zalo we use a relative-friendly approach via a small inline script trick:
  // simpler: render absolute URL placeholder using a known production host fallback.
  const shareUrl = `https://tinhluong.vn/snapshot/${slug}`
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  const zaloUrl = `https://sp.zalo.me/plugins/share?oaid=&url=${encodeURIComponent(shareUrl)}`

  // Bar chart proportions: net / tax / insurance
  const totalOut = result.gross + result.allowances
  const netW = totalOut > 0 ? (result.netSalary / totalOut) * 100 : 0
  const taxW = totalOut > 0 ? (result.totalTax / totalOut) * 100 : 0
  const insW = totalOut > 0 ? (result.totalInsuranceEmployee / totalOut) * 100 : 0

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Kết quả tính lương · Luật 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          Lương NET <span style={{ color: 'var(--accent)' }}>{fmt(result.netSalary)}đ</span>
        </h1>
        <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6 }}>
          Từ lương Gross {fmt(result.gross)}đ
        </div>
      </div>

      {/* 4-card summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        <div style={cardStyle}>
          <div style={cardLabel}>Lương Gross</div>
          <div style={cardValue}>{fmt(result.gross)}đ</div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabel}>Lương NET</div>
          <div style={cardAccent}>{fmt(result.netSalary)}đ</div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabel}>Thuế TNCN</div>
          <div style={cardValue}>{fmt(result.totalTax)}đ</div>
        </div>
        <div style={cardStyle}>
          <div style={cardLabel}>Tổng chi phí DN</div>
          <div style={cardValue}>{fmt(result.totalCostEmployer)}đ</div>
        </div>
      </div>

      {/* Bar chart */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>Phân bổ lương Gross</div>
        <div style={{ display: 'flex', height: 22, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div style={{ width: `${netW}%`, background: 'var(--accent)' }} title={`NET ${netW.toFixed(1)}%`} />
          <div style={{ width: `${insW}%`, background: 'var(--accent-mid)' }} title={`BHXH ${insW.toFixed(1)}%`} />
          <div style={{ width: `${taxW}%`, background: 'var(--warn)' }} title={`Thuế ${taxW.toFixed(1)}%`} />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
          <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--accent)', borderRadius: 2, marginRight: 6 }} />NET ({netW.toFixed(1)}%)</span>
          <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--accent-mid)', borderRadius: 2, marginRight: 6 }} />BHXH NLĐ ({insW.toFixed(1)}%)</span>
          <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--warn)', borderRadius: 2, marginRight: 6 }} />Thuế TNCN ({taxW.toFixed(1)}%)</span>
        </div>
      </div>

      {/* Share buttons */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 18px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text)' }}>Chia sẻ kết quả</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href={fbUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', textDecoration: 'none', color: 'var(--text)', fontSize: 13, fontWeight: 600 }}
          >
            Chia sẻ Facebook
          </a>
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', textDecoration: 'none', color: 'var(--text)', fontSize: 13, fontWeight: 600 }}
          >
            Chia sẻ Zalo
          </a>
          <CopyLinkButton url={shareUrl} />
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '20px 24px', background: 'var(--accent-light)', borderRadius: 'var(--radius)' }}>
        <Link
          href="/"
          style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--accent)', color: 'white', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}
        >
          ← Tính lại với số liệu của bạn
        </Link>
      </div>
    </div>
  )
}
