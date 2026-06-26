// ============================================================
// CƠ SỞ PHÁP LÝ — Việt Nam (cập nhật 2026)
// ------------------------------------------------------------
// 1. Nghị định 293/2025/NĐ-CP — Lương tối thiểu vùng
//    Hiệu lực: 01/01/2026
//    https://xaydungchinhsach.chinhphu.vn/nghi-dinh-so-293-2025-nd-cp-quy-dinh-muc-luong-toi-thieu-doi-voi-nguoi-lao-dong-lam-viec-theo-hop-dong-lao-dong-119251110172808433.htm
//
// 2. Luật Bảo hiểm xã hội 41/2024/QH15 — BHXH, BHYT, BHTN
//    Hiệu lực: 01/07/2025
//    https://thuvienphapluat.vn/van-ban/Bao-hiem/Luat-Bao-hiem-xa-hoi-2024-557190.aspx
//
// 3. Luật thuế TNCN 109/2025/QH15 — Thuế TNCN 5 bậc (áp dụng từ kỳ tính thuế 2026)
//    Hiệu lực: 01/07/2026 (luật); thu nhập lương áp dụng từ 01/01/2026
//    https://thuvienphapluat.vn/van-ban/Thue-Phi-Le-Phi/Luat-Thue-thu-nhap-ca-nhan-2025-so-109-2025-QH15-665870.aspx
//
// 4. Nghị quyết 110/2025/UBTVQH15 — Giảm trừ gia cảnh
//    Hiệu lực: 01/01/2026 (kỳ tính thuế 2026)
//    https://thuvienphapluat.vn/van-ban/Thue-Phi-Le-Phi/Nghi-quyet-110-2025-UBTVQH15-muc-giam-tru-gia-canh-thue-thu-nhap-ca-nhan-665865.aspx
// ============================================================

export type Region = 1 | 2 | 3 | 4

export interface SalaryInput {
  grossSalary: number        // Lương gross (đồng)
  dependants: number         // Số người phụ thuộc
  region: Region             // Vùng lương tối thiểu
  allowances: number         // Phụ cấp không tính BHXH (đồng)
  socialInsuranceBase?: number // Mức đóng BHXH (nếu khác gross)
  employeeType: 'full' | 'probation' // Chính thức hay thử việc
}

export interface SalaryResult {
  // Input
  gross: number
  allowances: number

  // BHXH / BHYT / BHTN - Người lao động đóng
  bhxhEmployee: number      // BHXH NLĐ: 8%
  bhytEmployee: number      // BHYT NLĐ: 1.5%
  bhtnEmployee: number      // BHTN NLĐ: 1%
  totalInsuranceEmployee: number // Tổng NLĐ: 10.5%

  // BHXH / BHYT / BHTN - Người sử dụng lao động đóng
  bhxhEmployer: number      // BHXH NSD: 17.5%
  bhytEmployer: number      // BHYT NSD: 3%
  bhtnEmployer: number      // BHTN NSD: 1%
  totalInsuranceEmployer: number // Tổng NSD: 21.5%

  // Thuế TNCN
  taxableIncome: number     // Thu nhập chịu thuế
  personalDeduction: number // Giảm trừ bản thân: 15.5 triệu
  dependantDeduction: number // Giảm trừ người phụ thuộc: 6.2tr/người
  totalDeduction: number    // Tổng giảm trừ
  taxableNet: number        // Thu nhập tính thuế
  taxBreakdown: TaxBracket[] // Chi tiết từng bậc thuế
  totalTax: number          // Tổng thuế TNCN

  // Kết quả
  netSalary: number         // Lương NET thực nhận
  totalCostEmployer: number // Tổng chi phí doanh nghiệp

  // Thông tin bổ sung
  minWage: number           // Lương tối thiểu vùng
  insuranceBase: number     // Mức đóng BHXH thực tế
  effectiveTaxRate: number  // Thuế suất thực tế (%)
}

export interface TaxBracket {
  bracket: number
  rate: number
  taxableAmount: number
  tax: number
  description: string
}

// Lương tối thiểu vùng 2026 (Nghị định 293/2025/NĐ-CP, hiệu lực 01/01/2026)
export const MIN_WAGES: Record<Region, number> = {
  1: 5_310_000,  // Vùng I: Hà Nội, TP.HCM và các quận/huyện giáp ranh
  2: 4_730_000,  // Vùng II: Các tỉnh/TP trực thuộc TW khác
  3: 4_140_000,  // Vùng III: Các huyện còn lại thuộc vùng II
  4: 3_700_000,  // Vùng IV: Các tỉnh còn lại
}

export const REGION_NAMES: Record<Region, string> = {
  1: 'Vùng I (Hà Nội, TP.HCM)',
  2: 'Vùng II (Hải Phòng, Cần Thơ, Bình Dương...)',
  3: 'Vùng III (Các tỉnh còn lại)',
  4: 'Vùng IV (Miền núi, hải đảo)',
}

// Giảm trừ gia cảnh 2026 (Nghị quyết 110/2025/UBTVQH15, hiệu lực 01/01/2026)
const PERSONAL_DEDUCTION = 15_500_000    // Bản thân: 15.5 triệu (từ 01/01/2026)
const DEPENDANT_DEDUCTION = 6_200_000   // Mỗi người phụ thuộc: 6.2 triệu (từ 01/01/2026)

// Mức trần đóng BHXH/BHYT: 20 × mức tham chiếu (≠ lương tối thiểu vùng)
// Từ 01/01/2026 đến 30/06/2026: mức tham chiếu = 2,340,000 → trần = 46,800,000
// Từ 01/07/2026: mức tham chiếu = 2,530,000 → trần = 50,600,000 (Nghị định 161/2026 — VERIFY)
// Hiện tại (2026-06-27): dùng 46,800,000
const BHXH_REFERENCE_LEVEL = 2_340_000  // mức tham chiếu hiện tại
const MAX_BHXH_MONTHS = 20
const MAX_BHXH_BASE = BHXH_REFERENCE_LEVEL * MAX_BHXH_MONTHS // = 46,800,000

// Tỷ lệ đóng BHXH (người lao động)
const RATES_EMPLOYEE = {
  bhxh: 0.08,   // 8%
  bhyt: 0.015,  // 1.5%
  bhtn: 0.01,   // 1%
}

// Tỷ lệ đóng BHXH (người sử dụng lao động)
const RATES_EMPLOYER = {
  bhxh: 0.175,  // 17.5% (bao gồm quỹ TNLĐ-BNN 0.5%)
  bhyt: 0.03,   // 3%
  bhtn: 0.01,   // 1%
}

// Bậc thuế TNCN lũy tiến từng phần (Luật 109/2025/QH15, 5 bậc, áp dụng từ 01/01/2026)
const TAX_BRACKETS = [
  { limit: 10_000_000, rate: 0.05, label: 'Đến 10 triệu' },
  { limit: 30_000_000, rate: 0.10, label: '10–30 triệu' },
  { limit: 60_000_000, rate: 0.20, label: '30–60 triệu' },
  { limit: 100_000_000, rate: 0.30, label: '60–100 triệu' },
  { limit: Infinity,   rate: 0.35, label: 'Trên 100 triệu' },
]

function calcProgressiveTax(taxableIncome: number): { breakdown: TaxBracket[], total: number } {
  if (taxableIncome <= 0) return { breakdown: [], total: 0 }

  const breakdown: TaxBracket[] = []
  let remaining = taxableIncome
  let prev = 0
  let total = 0

  for (const b of TAX_BRACKETS) {
    if (remaining <= 0) break
    const limit = b.limit === Infinity ? Infinity : b.limit - prev
    const taxable = b.limit === Infinity ? remaining : Math.min(remaining, limit)
    const tax = taxable * b.rate
    breakdown.push({
      bracket: b.limit,
      rate: b.rate,
      taxableAmount: taxable,
      tax,
      description: b.label,
    })
    total += tax
    remaining -= taxable
    prev = b.limit === Infinity ? prev : b.limit
  }

  return { breakdown, total }
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { grossSalary, dependants, region, allowances, employeeType } = input
  const minWage = MIN_WAGES[region]

  // Mức đóng BHXH/BHYT (không vượt trần 46.8tr = 20×mức tham chiếu, không thấp hơn lương tối thiểu vùng)
  const rawBase = input.socialInsuranceBase ?? grossSalary
  const insuranceBase = Math.min(Math.max(rawBase, minWage), MAX_BHXH_BASE)

  // Thử việc: không đóng BHXH, BHTN (chỉ BHYT nếu ký HĐ ≥ 3 tháng)
  const isProbation = employeeType === 'probation'

  // BHXH người lao động
  const bhxhEmployee = isProbation ? 0 : Math.round(insuranceBase * RATES_EMPLOYEE.bhxh)
  const bhytEmployee = Math.round(insuranceBase * RATES_EMPLOYEE.bhyt)
  const bhtnEmployee = isProbation ? 0 : Math.round(insuranceBase * RATES_EMPLOYEE.bhtn)
  const totalInsuranceEmployee = bhxhEmployee + bhytEmployee + bhtnEmployee

  // BHXH người sử dụng lao động
  const bhxhEmployer = isProbation ? 0 : Math.round(insuranceBase * RATES_EMPLOYER.bhxh)
  const bhytEmployer = Math.round(insuranceBase * RATES_EMPLOYER.bhyt)
  const bhtnEmployer = isProbation ? 0 : Math.round(insuranceBase * RATES_EMPLOYER.bhtn)
  const totalInsuranceEmployer = bhxhEmployer + bhytEmployer + bhtnEmployer

  // Thu nhập chịu thuế = Gross - Bảo hiểm NLĐ (phụ cấp không tính thuế TNCN nếu đúng loại)
  // Allowances ở đây là phụ cấp KHÔNG chịu thuế (phụ cấp xăng xe, điện thoại, ăn ca theo quy định)
  const taxableIncome = grossSalary - totalInsuranceEmployee

  // Giảm trừ gia cảnh
  const personalDeduction = PERSONAL_DEDUCTION
  const dependantDeduction = dependants * DEPENDANT_DEDUCTION
  const totalDeduction = personalDeduction + dependantDeduction

  // Thu nhập tính thuế (sau giảm trừ)
  const taxableNet = Math.max(0, taxableIncome - totalDeduction)

  // Thuế TNCN lũy tiến
  const { breakdown: taxBreakdown, total: totalTax } = calcProgressiveTax(taxableNet)

  // Lương NET
  const netSalary = grossSalary + allowances - totalInsuranceEmployee - totalTax

  // Tổng chi phí doanh nghiệp
  const totalCostEmployer = grossSalary + allowances + totalInsuranceEmployer

  // Thuế suất thực tế
  const effectiveTaxRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0

  return {
    gross: grossSalary,
    allowances,
    bhxhEmployee,
    bhytEmployee,
    bhtnEmployee,
    totalInsuranceEmployee,
    bhxhEmployer,
    bhytEmployer,
    bhtnEmployer,
    totalInsuranceEmployer,
    taxableIncome,
    personalDeduction,
    dependantDeduction,
    totalDeduction,
    taxableNet,
    taxBreakdown,
    totalTax,
    netSalary,
    totalCostEmployer,
    minWage,
    insuranceBase,
    effectiveTaxRate,
  }
}

// Tính ngược: NET → GROSS
export function calcGrossFromNet(netTarget: number, dependants: number, region: Region, allowances: number): number {
  // Binary search
  let lo = netTarget, hi = netTarget * 2.5
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2
    const result = calculateSalary({ grossSalary: mid, dependants, region, allowances, employeeType: 'full' })
    if (result.netSalary < netTarget) lo = mid
    else hi = mid
  }
  return Math.round((lo + hi) / 2)
}
