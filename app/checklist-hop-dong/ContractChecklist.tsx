'use client'
import { useMemo, useState } from 'react'

interface Item {
  id: string
  group: string
  text: string
}

const ITEMS: Item[] = [
  { id: 'loai-hd',   group: 'Loại hợp đồng',   text: 'Xác định loại HĐLĐ: xác định thời hạn / không xác định thời hạn / thử việc' },
  { id: 'luong-ghi', group: 'Lương & Phụ cấp',  text: 'Lương gross ghi trong HĐ khớp với offer (không phải lương NET thấp hơn)' },
  { id: 'phu-cap',   group: 'Lương & Phụ cấp',  text: 'Phụ cấp ghi rõ (xăng xe, ăn trưa, điện thoại) — không bị ẩn vào lương cứng' },
  { id: 'bhxh',      group: 'Bảo hiểm',         text: 'Công ty đóng BHXH theo đúng mức lương gross (không đóng theo lương cơ bản thấp hơn)' },
  { id: 'bhyt',      group: 'Bảo hiểm',         text: 'BHYT ghi rõ mức đóng và quyền lợi' },
  { id: 'phep-nam',  group: 'Nghỉ phép',        text: 'Số ngày phép năm ≥ 12 ngày (theo Luật LĐ 2019, Điều 113)' },
  { id: 'gio-lam',   group: 'Thời gian làm việc', text: 'Giờ làm việc ≤ 8h/ngày, ≤ 48h/tuần (Điều 105 BLLĐ)' },
  { id: 'tang-ca',   group: 'Thời gian làm việc', text: 'Tăng ca tối đa 40h/tháng, 200h/năm (hoặc 300h với ngành đặc biệt)' },
  { id: 'thu-viec',  group: 'Thử việc',          text: 'Thời gian thử việc: ≤ 60 ngày (chức vụ cao), ≤ 30 ngày (thông thường), ≤ 6 ngày (không lành nghề)' },
  { id: 'luong-tv',  group: 'Thử việc',          text: 'Lương thử việc ≥ 85% lương chính thức (Điều 27 BLLĐ)' },
  { id: 'nghi-viec', group: 'Chấm dứt HĐ',      text: 'Thời hạn báo trước khi nghỉ: HĐ xác định 3–60 ngày, không xác định 45 ngày' },
  { id: 'bi-mat',    group: 'Điều khoản đặc biệt', text: 'Điều khoản bảo mật thông tin (NDA) — phạm vi hợp lý, không quá rộng' },
  { id: 'cam-canh',  group: 'Điều khoản đặc biệt', text: 'Điều khoản non-compete (nếu có) — thời hạn và phạm vi địa lý cụ thể' },
  { id: 'thu-tuong', group: 'Điều khoản đặc biệt', text: 'Không có điều khoản "bồi thường đào tạo" bất hợp lý (thường gặp trong BĐS/MLM)' },
]

export default function ContractChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const groups = useMemo(() => {
    const map = new Map<string, Item[]>()
    for (const it of ITEMS) {
      if (!map.has(it.group)) map.set(it.group, [])
      map.get(it.group)!.push(it)
    }
    return Array.from(map.entries())
  }, [])

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const total = ITEMS.length
  const done = checked.size
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const allDone = done === total

  return (
    <div>
      {/* Progress */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '18px 22px',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            TIẾN ĐỘ KIỂM TRA
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: allDone ? 'var(--accent)' : 'var(--text)' }}>
            {done}/{total} mục đã kiểm tra
          </span>
        </div>
        <div style={{
          height: 8,
          background: 'var(--surface2)',
          borderRadius: 999,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${pct}%`,
            height: '100%',
            background: 'var(--accent)',
            transition: 'width 0.2s ease',
          }} />
        </div>
      </div>

      {allDone && (
        <div style={{
          background: 'var(--accent-light)',
          border: '1.5px solid var(--accent)',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
            Hợp đồng đã được kiểm tra đầy đủ!
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>
            Bạn đã rà soát toàn bộ các điều khoản quan trọng. Nếu vẫn còn điểm chưa rõ, hãy đề nghị HR/Legal giải thích bằng văn bản trước khi ký.
          </div>
        </div>
      )}

      {/* Groups */}
      {groups.map(([groupName, items]) => (
        <div key={groupName} style={{ marginBottom: 18 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--muted)',
            letterSpacing: '0.06em',
            marginBottom: 8,
            textTransform: 'uppercase',
          }}>
            {groupName}
          </div>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
          }}>
            {items.map((item, idx) => {
              const isChecked = checked.has(item.id)
              return (
                <label
                  key={item.id}
                  htmlFor={`chk-${item.id}`}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    padding: '14px 16px',
                    borderBottom: idx < items.length - 1 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    background: isChecked ? 'var(--accent-light)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  <input
                    id={`chk-${item.id}`}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(item.id)}
                    style={{
                      width: 18,
                      height: 18,
                      marginTop: 2,
                      flexShrink: 0,
                      accentColor: 'var(--accent)',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    opacity: isChecked ? 0.7 : 1,
                  }}>
                    {item.text}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: 24,
        padding: '14px 18px',
        background: 'var(--surface2)',
        borderRadius: 'var(--radius)',
        fontSize: 13,
        color: 'var(--muted)',
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--text)' }}>Lưu ý:</strong> Checklist tham khảo theo Bộ luật Lao động 2019.
        Trạng thái tick chỉ lưu trong phiên duyệt web (không gửi lên server, không lưu sau khi tải lại trang).
      </div>
    </div>
  )
}
