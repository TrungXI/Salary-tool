import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

// Thay bằng Resend API key thật: https://resend.com
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@tinhluong.vn'
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || process.env.FOUNDER_EMAIL || 'viettrung30101996@gmail.com'

async function loadExcelBase64(): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'bang-tinh-luong.xlsx')
    const buf = await readFile(filePath)
    return buf.toString('base64')
  } catch (e) {
    console.warn('bang-tinh-luong.xlsx not found, skipping attachment:', e)
    return null
  }
}

async function sendResendEmail(body: Record<string, unknown>) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function POST(req: NextRequest) {
  const { email, name } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 })
  }

  // Lưu lead vào database hoặc gửi email qua Resend
  // Trong MVP: chỉ gửi email thông báo
  if (RESEND_API_KEY) {
    try {
      const excelBase64 = await loadExcelBase64()

      // 1. Gửi email chào mừng cho user (T+0)
      const welcomeBody: Record<string, unknown> = {
        from: FROM_EMAIL,
        to: email,
        subject: 'Báo cáo lương của bạn từ TínhLương.vn',
        html: welcomeEmail(name || 'bạn'),
      }
      if (excelBase64) {
        welcomeBody.attachments = [
          { filename: 'bang-tinh-luong.xlsx', content: excelBase64 },
        ]
      }
      await sendResendEmail(welcomeBody)

      // 2. Thông báo cho founder
      await sendResendEmail({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `Lead mới: ${email}`,
        html: `<p>Email: ${email}</p><p>Tên: ${name || 'Không có'}</p>`,
      })

      // 3. Drip sequence — schedule T+3, T+7, T+30 emails via Resend scheduledAt.
      //    Wrap in try/catch so drip failures don't 500 the subscribe endpoint.
      try {
        const in3Days = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        const in7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        const in30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

        await sendResendEmail({
          from: FROM_EMAIL,
          to: email,
          subject: 'Đang tính lương cho nhiều nhân viên? Thử MISA HRM',
          html: dripMisaEmail(),
          scheduledAt: in3Days,
        })

        await sendResendEmail({
          from: FROM_EMAIL,
          to: email,
          subject: 'Phần mềm quản lý nhân sự nào phù hợp với bạn?',
          html: dripBaseEmail(),
          scheduledAt: in7Days,
        })

        await sendResendEmail({
          from: FROM_EMAIL,
          to: email,
          subject: '[TínhLương.vn] Nhắc nhở: Kiểm tra lại lương sau khi luật thay đổi',
          html: dripLawUpdateEmail(),
          scheduledAt: in30Days,
        })
      } catch (dripErr) {
        console.error('Drip schedule error:', dripErr)
      }
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
          <li>Bảng tính lương Excel cho team (đính kèm)</li>
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

function dripMisaEmail() {
  return `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
      <h2 style="color: #1e6b45;">Đang tính lương cho nhiều nhân viên?</h2>
      <p>Nếu bạn đang dùng Excel để tính lương hàng tháng cho team, đã đến lúc tự động hóa.</p>
      <p><strong>MISA AMIS HRM</strong> tích hợp tính lương tự động, xuất phiếu lương, nhắc đóng BHXH đúng hạn — miễn phí 30 ngày dùng thử.</p>
      <a href="https://www.misa.vn/phan-mem/misa-amis-hrm/?ref=tinhluong" style="display: inline-block; background: #1e6b45; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; margin: 16px 0;">Dùng thử miễn phí 30 ngày →</a>
      <p style="color: #999; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">TínhLương.vn</p>
    </div>
  `
}

function dripBaseEmail() {
  return `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
      <h2 style="color: #1e6b45;">Phần mềm nhân sự nào phù hợp?</h2>
      <p>Tuần trước chúng tôi giới thiệu MISA. Hôm nay là một lựa chọn khác cho startup và SME:</p>
      <p><strong>Base.vn</strong> — nền tảng quản lý nội bộ all-in-one: task, HR, payroll. Phù hợp với team 10-200 người.</p>
      <a href="https://www.base.vn/?ref=tinhluong" style="display: inline-block; background: #1e6b45; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; margin: 16px 0;">Xem Base.vn →</a>
      <p style="color: #999; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">TínhLương.vn · <a href="#" style="color: #999;">Hủy đăng ký</a></p>
    </div>
  `
}

function dripLawUpdateEmail() {
  return `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
      <h2 style="color: #1e6b45;">Nhắc nhở: Kiểm tra lại lương của bạn</h2>
      <p>Đã 1 tháng kể từ khi bạn tính lương tại TínhLương.vn.</p>
      <div style="background: #fef3c7; border-radius: 8px; padding: 14px 16px; margin: 16px 0;">
        <strong>Lưu ý:</strong> Từ 01/07/2026, mức trần đóng BHXH/BHYT sẽ tăng từ 46.8 triệu → 50.6 triệu/tháng.
      </div>
      <p>Tính lại để đảm bảo lương NET của bạn được tính đúng nhất:</p>
      <a href="https://salary-tool-hazel.vercel.app" style="display: inline-block; background: #1e6b45; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; margin: 16px 0;">Tính lại lương →</a>
      <p style="color: #999; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">TínhLương.vn · <a href="#" style="color: #999;">Hủy đăng ký</a></p>
    </div>
  `
}
