import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tính Lương Gross Net 2025 | Chính xác theo luật VN | TínhLương.vn',
  description: 'Tính lương gross sang net, net sang gross. Tính đầy đủ BHXH 8%, BHYT 1.5%, BHTN 1%, thuế TNCN lũy tiến, giảm trừ gia cảnh theo luật Việt Nam 2025.',
  keywords: 'tính lương net, tính lương gross, thuế tncn, bhxh, giảm trừ gia cảnh, lương tối thiểu vùng 2025',
  openGraph: {
    title: 'Tính Lương Gross ↔ Net 2025 | Chính xác, Miễn phí',
    description: 'Công cụ tính lương online chuẩn luật VN 2025. BHXH, thuế TNCN lũy tiến, giảm trừ gia cảnh.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
