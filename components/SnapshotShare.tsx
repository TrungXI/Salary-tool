'use client'
import { useState } from 'react'
import type { SalaryResult } from '@/lib/salary'
import { encodeSnapshot, regionFromMinWage } from '@/lib/snapshot'
import Toast from './Toast'

export default function SnapshotShare({ result }: { result: SalaryResult }) {
  const [toast, setToast] = useState('')

  const handle = async () => {
    const slug = encodeSnapshot({
      input: {
        grossSalary: result.gross,
        dependants: Math.round(result.dependantDeduction / 6_200_000),
        region: regionFromMinWage(result.minWage),
        allowances: result.allowances,
        employeeType: result.bhxhEmployee === 0 ? 'probation' : 'full',
      },
      net: result.netSalary,
    })
    const url = `${window.location.origin}/snapshot/${slug}`
    try {
      await navigator.clipboard.writeText(url)
      setToast('Đã copy link!')
    } catch {
      setToast('Copy thất bại — link: ' + url)
    }
    setTimeout(() => setToast(''), 2200)
  }

  return (
    <>
      <button
        onClick={handle}
        style={{
          width: '100%',
          padding: '10px 16px',
          borderRadius: 'var(--radius)',
          background: 'var(--surface)',
          border: '1.5px solid var(--accent)',
          color: 'var(--accent)',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          marginBottom: 20,
        }}
      >
        📤 Lưu & Chia sẻ kết quả
      </button>
      <Toast message={toast} />
    </>
  )
}
