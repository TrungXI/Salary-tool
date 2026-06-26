import { NextRequest, NextResponse } from 'next/server'

// Thay bằng Resend API key thật: https://resend.com
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@tinhluong.vn'
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'your@email.com'

export async function POST(req: NextRequest) {
  const { email, name } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 })
  }

  // Lưu lead vào database hoặc gửi email qua Resend
  // Trong MVP: chỉ gửi email thông báo
  if (RESEND_API_KEY) {
    try {
      // 1. Gửi email chào mừng cho user
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: email,
          subject: 'Báo cáo lương của bạn từ TínhLương.vn',
          html: welcomeEmail(name || 'bạn'),
        }),
      })

      // 2. Thông báo cho founder
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: `Lead mới: ${email}`,
          html: `<p>Email: ${email}</p><p>Tên: ${name || 'Không có'}</p>`,
        }),
      })
    } catch (e) {
      console.error('Resend error:', e)
    }
  }

  return NextResponse.json({ success: true })
}

function welcomeEmail(name: string) {
  return `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
      <h2 style="color: #1e6b45;">Xin chào ${name}! 👋</h2>
      <p>Cảm ơn bạn đã dùng <strong>TínhLương.vn</strong>.</p>
      <p>Báo cáo chi tiết đã được mở khóa trên trình duyệt của bạn rồi nhé.</p>
      
      <div style="background: #e8f4ed; border-radius: 10px; padding: 16px; margin: 20px 0;">
        <p style="margin: 0; font-weight: 600; color: #1e6b45;">Bạn cũng sẽ nhận được:</p>
        <ul style="color: #2d4a3a; margin: 8px 0 0;">
          <li>Bảng tính lương Excel cho team (sẽ gửi trong 24h)</li>
          <li>Tips tối ưu lương thưởng hợp pháp</li>
          <li>Cập nhật khi luật BHXH/thuế thay đổi</li>
        </ul>
      </div>

      <p style="color: #666; font-size: 13px;">
        Muốn tự động hóa tính lương cho team?<br/>
        <a href="https://www.misa.vn/phan-mem/misa-amis-hrm/" style="color: #1e6b45;">Dùng thử MISA HRM miễn phí 30 ngày →</a>
      </p>

      <p style="color: #999; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
        TínhLương.vn · Hủy đăng ký: <a href="#">tại đây</a>
      </p>
    </div>
  `
}
