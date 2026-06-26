// 2025 law constants for comparison table
export const LAW_2025 = {
  minWage: { 1: 4_960_000, 2: 4_410_000, 3: 3_860_000, 4: 3_450_000 },
  personalDeduction: 11_000_000,
  dependantDeduction: 4_400_000,
  taxBrackets: [
    { limit: 5_000_000, rate: 0.05, label: 'Đến 5 triệu' },
    { limit: 10_000_000, rate: 0.10, label: '5–10 triệu' },
    { limit: 18_000_000, rate: 0.15, label: '10–18 triệu' },
    { limit: 32_000_000, rate: 0.20, label: '18–32 triệu' },
    { limit: 52_000_000, rate: 0.25, label: '32–52 triệu' },
    { limit: 80_000_000, rate: 0.30, label: '52–80 triệu' },
    { limit: Infinity, rate: 0.35, label: 'Trên 80 triệu' },
  ],
  decrees: ['NĐ 74/2024/NĐ-CP', 'NQ 954/2020/UBTVQH14', 'Luật thuế TNCN 04/2007/QH12'],
}

// 2026 law constants — sources from lib/salary.ts
export const LAW_2026 = {
  minWage: { 1: 5_310_000, 2: 4_730_000, 3: 4_140_000, 4: 3_700_000 },
  personalDeduction: 15_500_000,
  dependantDeduction: 6_200_000,
  taxBrackets: [
    { limit: 10_000_000, rate: 0.05, label: 'Đến 10 triệu' },
    { limit: 30_000_000, rate: 0.10, label: '10–30 triệu' },
    { limit: 60_000_000, rate: 0.20, label: '30–60 triệu' },
    { limit: 100_000_000, rate: 0.30, label: '60–100 triệu' },
    { limit: Infinity, rate: 0.35, label: 'Trên 100 triệu' },
  ],
  decrees: ['NĐ 293/2025/NĐ-CP', 'NQ 110/2025/UBTVQH15', 'Luật thuế TNCN 109/2025/QH15', 'Luật BHXH 41/2024/QH15'],
}
