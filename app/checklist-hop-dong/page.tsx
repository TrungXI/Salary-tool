import type { Metadata } from 'next'
import ContractChecklist from './ContractChecklist'

export const metadata: Metadata = {
  title: 'Checklist đọc hợp đồng lao động | TínhLương.vn',
  description: 'Checklist tương tác kiểm tra hợp đồng lao động trước khi ký. Đừng bỏ sót những điều khoản quan trọng.',
}

export default function Page() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Checklist đọc hợp đồng lao động
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', margin: '0 0 24px' }}>
        Trước khi đặt bút ký, hãy rà soát từng điều khoản theo checklist dưới đây.
        Tick từng mục bạn đã kiểm tra — đừng bỏ sót những điểm dễ bị &ldquo;lách&rdquo;
        như mức đóng BHXH, lương thử việc, và điều khoản bồi thường đào tạo.
      </p>

      <ContractChecklist />
    </div>
  )
}
