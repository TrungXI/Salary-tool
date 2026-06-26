export interface FaqItem { q: string; a: string }

export const FAQ_LUONG_TOI_THIEU: FaqItem[] = [
  { q: 'Lương tối thiểu vùng 2026 áp dụng từ ngày nào?', a: 'Từ ngày 01/01/2026 theo Nghị định 293/2025/NĐ-CP.' },
  { q: 'Vùng I gồm những tỉnh thành nào?', a: 'Hà Nội, TP.HCM và các quận, huyện lân cận thuộc vùng I.' },
  { q: 'Lương tối thiểu vùng I năm 2026 là bao nhiêu?', a: '5.310.000 đồng/tháng.' },
  { q: 'Lương thử việc có phải bằng lương tối thiểu vùng không?', a: 'Lương thử việc ít nhất bằng 85% lương chính thức và không thấp hơn lương tối thiểu vùng.' },
]

export const FAQ_BAC_THUE: FaqItem[] = [
  { q: 'Thuế TNCN 2026 có bao nhiêu bậc?', a: 'Thuế TNCN 2026 có 5 bậc lũy tiến theo Luật 109/2025/QH15, áp dụng từ kỳ tính thuế 2026.' },
  { q: 'Bậc thuế TNCN thấp nhất là bao nhiêu?', a: 'Bậc 1: Thu nhập tính thuế đến 10 triệu/tháng chịu thuế suất 5%.' },
  { q: 'Bậc thuế TNCN cao nhất là bao nhiêu?', a: 'Bậc 5: Thu nhập tính thuế trên 100 triệu/tháng chịu thuế suất 35%.' },
  { q: 'Thu nhập tính thuế TNCN được tính như thế nào?', a: 'Thu nhập tính thuế = Thu nhập chịu thuế (Gross − BHXH NLĐ) − Giảm trừ gia cảnh (bản thân 15,5tr + người phụ thuộc 6,2tr/người).' },
]

export function FAQ_TINH_LUONG_BY_SLUG(gross: number): FaqItem[] {
  const m = (gross / 1_000_000).toFixed(0)
  return [
    { q: `Lương gross ${m} triệu thì net bao nhiêu?`, a: `Tùy thuộc vào số người phụ thuộc, vùng lương và phụ cấp. Dùng công cụ ở trên để tính chính xác.` },
    { q: 'Công ty phải đóng thêm bao nhiêu ngoài lương gross?', a: 'Doanh nghiệp đóng thêm 21.5% gồm BHXH 17.5%, BHYT 3%, BHTN 1% trên mức đóng BHXH.' },
    { q: 'Giảm trừ gia cảnh 2026 là bao nhiêu?', a: 'Bản thân: 15.500.000đ/tháng. Mỗi người phụ thuộc: 6.200.000đ/tháng. Theo Nghị quyết 110/2025/UBTVQH15.' },
  ]
}
