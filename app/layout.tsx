import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import AppShell from '@/components/AppShell'
import './globals.css'

export const metadata: Metadata = {
  title: 'TínhLương.vn — Tính lương Gross/Net 2026',
  description: 'Tính lương gross sang net, net sang gross theo luật Việt Nam 2026. Cập nhật theo NĐ 293/2025, NQ 110/2025, Luật thuế TNCN 109/2025.',
  keywords: 'tính lương net 2026, tính lương gross 2026, thuế tncn 2026, lương tối thiểu vùng 2026',
  openGraph: {
    title: 'TínhLương.vn — Tính lương Gross ↔ Net 2026',
    description: 'Công cụ tính lương online chuẩn luật VN 2026.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
