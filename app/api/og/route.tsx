import { ImageResponse } from 'next/og'
import { decodeSnapshot } from '@/lib/snapshot'
import { calculateSalary } from '@/lib/salary'

export const runtime = 'edge'

const fmt = (n: number) => n.toLocaleString('vi-VN')

export async function GET(req: Request) {
  const url = new URL(req.url)
  const slug = url.searchParams.get('s') || ''
  const payload = decodeSnapshot(slug)

  const net = payload ? calculateSalary(payload.input).netSalary : 0
  const gross = payload?.input.grossSalary ?? 0

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f8f7f4',
          display: 'flex',
          flexDirection: 'column',
          padding: 60,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ color: '#1e6b45', fontSize: 36, fontWeight: 700, marginBottom: 40 }}>TínhLương.vn</div>
        {payload ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ color: '#6b6a66', fontSize: 28 }}>Lương NET thực nhận</div>
            <div style={{ color: '#1e6b45', fontSize: 88, fontWeight: 800, lineHeight: 1 }}>{fmt(net)} đ</div>
            <div style={{ color: '#6b6a66', fontSize: 24, marginTop: 8 }}>Từ Gross: {fmt(gross)} đ</div>
          </div>
        ) : (
          <div style={{ color: '#1a1916', fontSize: 48, fontWeight: 700, display: 'flex' }}>
            Tính lương Gross ↔ Net 2026
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 40, right: 60, color: '#6b6a66', fontSize: 20, display: 'flex' }}>
          Luật 2026 · tinhluong.vn
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
