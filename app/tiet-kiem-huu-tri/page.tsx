import type { Metadata } from 'next'
import Link from 'next/link'
import RetirementCalc from './RetirementCalc'

export const metadata: Metadata = {
  title: 'Tính tiết kiệm hưu trí từ lương hiện tại | TínhLương.vn',
  description: 'Calculator tiết kiệm hưu trí với lãi suất kép. Nhập tuổi, lương, % tiết kiệm — biết ngay số tiền khi về hưu.',
}

const h2Style: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  margin: '32px 0 12px',
  color: 'var(--text)',
}
const pStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  color: 'var(--text)',
  margin: '0 0 12px',
}

export default function Page() {
  return (
    <article>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
        Tiết kiệm hưu trí — Tính từ lương hiện tại
      </h1>
      <p style={pStyle}>
        Khi bạn bắt đầu tiết kiệm sớm, <strong>lãi kép</strong> làm phần lớn công việc. Calculator này cho bạn thấy:
        nếu mỗi tháng bỏ ra một khoản đều đặn cho đến tuổi về hưu, bạn sẽ có bao nhiêu — và{' '}
        <strong>bao nhiêu trong đó là lãi sinh ra từ chính tiền của bạn.</strong>
      </p>

      <h2 style={h2Style}>Calculator hưu trí</h2>
      <RetirementCalc />

      <h2 style={h2Style}>Công thức lãi kép</h2>
      <p style={{ ...pStyle, fontFamily: 'monospace', fontSize: 13, background: 'var(--surface2)', padding: '12px 14px', borderRadius: 'var(--radius)' }}>
        FV<sub>annuity</sub> = PMT × [(1 + r)<sup>n</sup> − 1] / r
        <br />
        FV<sub>initial</sub> = P<sub>0</sub> × (1 + r)<sup>n</sup>
        <br />
        Trong đó: PMT = số tiền góp đều mỗi tháng, P<sub>0</sub> = vốn ban đầu, r = lãi tháng (= lãi năm / 12), n = số tháng.
      </p>
      <p style={pStyle}>
        Bí mật của lãi kép là <strong>thời gian</strong>. Bỏ vào 3 triệu/tháng từ tuổi 25 với 7% / năm → khi 60 tuổi bạn có ~5.4 tỷ
        (vốn góp 1.26 tỷ + lãi 4.14 tỷ). Nếu bắt đầu lúc 40 tuổi với cùng số tiền → chỉ ~1.5 tỷ. Cùng PMT, khác 15 năm — kết quả gấp 3.6 lần.
      </p>

      <h2 style={h2Style}>Quy tắc 4% rút hưu trí</h2>
      <p style={pStyle}>
        Quy tắc 4% (Bengen 1994): để tiền hưu trí <strong>không cạn trong 30 năm</strong>, mỗi năm rút tối đa 4% tổng số.
        Tức tổng tích lũy / 25 = thu nhập / năm. Calculator chia thêm cho 12 để ra thu nhập / tháng.
        Quy tắc giả định đầu tư trong danh mục hỗn hợp (cổ phiếu + trái phiếu) và lạm phát ~3%.
      </p>

      <div style={{ marginTop: 32, padding: '16px 18px', background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>
          Chưa có quỹ khẩn cấp? Đừng đầu tư vội.
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.7 }}>
          <Link href="/quy-khan-cap" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Tính quỹ khẩn cấp 3–6 tháng trước →
          </Link>
          <br />
          <Link href="/50-30-20" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Chia ngân sách theo quy tắc 50/30/20 →
          </Link>
        </p>
      </div>
    </article>
  )
}
