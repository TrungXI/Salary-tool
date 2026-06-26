export type LegalRefCategory = 'min_wage' | 'social_insurance' | 'pit' | 'family_deduction'

export interface LegalRef {
  code: string
  title: string
  category: LegalRefCategory
  effectiveDate: string  // ISO yyyy-mm-dd
  url: string
}

export const LEGAL_REFS: LegalRef[] = [
  {
    code: 'NĐ 293/2025/NĐ-CP',
    title: 'Nghị định 293/2025/NĐ-CP quy định mức lương tối thiểu vùng đối với người lao động làm việc theo hợp đồng lao động',
    category: 'min_wage',
    effectiveDate: '2026-01-01',
    url: 'https://xaydungchinhsach.chinhphu.vn/nghi-dinh-so-293-2025-nd-cp-quy-dinh-muc-luong-toi-thieu-doi-voi-nguoi-lao-dong-lam-viec-theo-hop-dong-lao-dong-119251110172808433.htm',
  },
  {
    code: 'Luật BHXH 41/2024/QH15',
    title: 'Luật Bảo hiểm xã hội số 41/2024/QH15',
    category: 'social_insurance',
    effectiveDate: '2025-07-01',
    url: 'https://thuvienphapluat.vn/van-ban/Bao-hiem/Luat-Bao-hiem-xa-hoi-2024-557190.aspx',
  },
  {
    code: 'Luật thuế TNCN 109/2025/QH15',
    title: 'Luật Thuế thu nhập cá nhân số 109/2025/QH15',
    category: 'pit',
    effectiveDate: '2026-01-01',
    url: 'https://thuvienphapluat.vn/van-ban/Thue-Phi-Le-Phi/Luat-Thue-thu-nhap-ca-nhan-2025-so-109-2025-QH15-665870.aspx',
  },
  {
    code: 'NQ 110/2025/UBTVQH15',
    title: 'Nghị quyết 110/2025/UBTVQH15 về điều chỉnh mức giảm trừ gia cảnh của thuế thu nhập cá nhân',
    category: 'family_deduction',
    effectiveDate: '2026-01-01',
    url: 'https://thuvienphapluat.vn/van-ban/Thue-Phi-Le-Phi/Nghi-quyet-110-2025-UBTVQH15-muc-giam-tru-gia-canh-thue-thu-nhap-ca-nhan-665865.aspx',
  },
]

export function getLatestLegalRef(): LegalRef {
  return [...LEGAL_REFS].sort((a, b) => b.effectiveDate.localeCompare(a.effectiveDate))[0]
}
