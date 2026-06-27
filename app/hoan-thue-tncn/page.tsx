import type { Metadata } from 'next'
import TaxRefundCalc from './TaxRefundCalc'

export const metadata: Metadata = {
  title: 'Tính hoàn thuế TNCN 2026 | TínhLương.vn',
  description: 'Calculator hoàn thuế thu nhập cá nhân năm 2026 theo Luật 109/2025/QH15. Biết ngay bạn được hoàn hay phải nộp thêm thuế.',
}

export default function Page() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Tính hoàn thuế TNCN 2026
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', margin: '0 0 24px' }}>
        Ước lượng số tiền bạn được hoàn (hoặc phải nộp thêm) khi quyết toán thuế TNCN. Tính theo
        Luật thuế TNCN <strong>109/2025/QH15</strong> và mức giảm trừ gia cảnh{' '}
        <strong>Nghị quyết 110/2025/UBTVQH15</strong>, áp dụng từ kỳ tính thuế 2026.
      </p>
      <TaxRefundCalc />
    </div>
  )
}
