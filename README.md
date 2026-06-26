# TínhLương.vn — Công cụ tính lương Gross/Net Việt Nam 2026

> Tính lương Gross → Net, Net → Gross chính xác theo luật Việt Nam 2026.
> Cập nhật theo Nghị định 293/2025/NĐ-CP, Nghị quyết 110/2025/UBTVQH15, Luật thuế TNCN 109/2025/QH15.

**Production:** https://salary-tool-hazel.vercel.app
**GitHub:** https://github.com/TrungXI/Salary-tool

---

## Business Model

| Kênh | Cách kiếm tiền |
|---|---|
| **Affiliate** | CTA dẫn sang MISA HRM và Base.vn — hoa hồng theo referral link |
| **Email funnel** | Email gate unlock chi tiết thuế → gửi Excel template → drip affiliate |
| **SEO traffic** | 7 landing page tính sẵn (10/15/20/25/30/40/50 triệu) → organic leads |
| **Snapshot viral** | User chia sẻ kết quả lương → backlink tự nhiên → traffic mới |

**Target persona:** Người đi làm muốn biết NET thực nhận, HR/kế toán tính lương hàng tháng, người đang offer negotiate.

---

## Tính năng

### Core
- **Gross → Net** và **Net → Gross** (binary search)
- Tính đầy đủ: BHXH 8%, BHYT 1.5%, BHTN 1% (NLĐ) + BHXH 17.5%, BHYT 3%, BHTN 1% (NSD)
- Thuế TNCN lũy tiến 5 bậc (Luật 109/2025/QH15)
- Giảm trừ gia cảnh: bản thân 15.5tr, người phụ thuộc 6.2tr/người
- 4 vùng lương tối thiểu, hỗ trợ thử việc vs chính thức
- Mức đóng BHXH tùy chỉnh

### SEO Pages
| Route | Nội dung |
|---|---|
| `/luong-toi-thieu-vung` | Bảng 4 vùng, NĐ 293/2025, FAQ JSON-LD |
| `/bac-thue-tncn` | 5 bậc thuế + công thức rút gọn + calc pre-filled |
| `/so-sanh-luat` | Bảng so sánh 2025 vs 2026 (lương/thuế/BHXH) |
| `/huong-dan-bhxh` | Hướng dẫn BHXH 2026, ví dụ tính |
| `/tinh-luong/[slug]` | 7 trang: 10/15/20/25/30/40/50 triệu (SSG) |

### Growth Features
- **Salary Snapshot** — nút "Lưu & Chia sẻ" → URL `/snapshot/[slug]` với OG image (1200×630) để share Facebook/Zalo
- **Email Gate** — unlock chi tiết thuế sau khi nhập email → welcome email có đính kèm Excel template
- **Exit-intent modal** — khi chuột rời khỏi viewport (desktop), hiện email gate một lần/session
- **Vercel Analytics + Speed Insights** — tracking không cần consent banner

### Layout
- **Sticky header** (56px, z=100): logo, nav desktop, LegalBadge, "Luật 2026" pill
- **Left sidebar** (220px desktop, drawer mobile): 5 nav chính + 4 mức lương phổ biến
- **Footer**: copyright, nav links, 4 cơ sở pháp lý có link chính thức
- **Responsive**: mobile ≤768px — sidebar ẩn, hamburger mở drawer

---

## Cơ sở pháp lý

| Văn bản | Nội dung | Hiệu lực |
|---|---|---|
| [Nghị định 293/2025/NĐ-CP](https://xaydungchinhsach.chinhphu.vn/nghi-dinh-so-293-2025-nd-cp-quy-dinh-muc-luong-toi-thieu-doi-voi-nguoi-lao-dong-lam-viec-theo-hop-dong-lao-dong-119251110172808433.htm) | Lương tối thiểu vùng 2026 | 01/01/2026 |
| [Nghị quyết 110/2025/UBTVQH15](https://thuvienphapluat.vn/van-ban/Thue-Phi-Le-Phi/Nghi-quyet-110-2025-UBTVQH15-muc-giam-tru-gia-canh-thue-thu-nhap-ca-nhan-665865.aspx) | Giảm trừ gia cảnh 15.5tr/6.2tr | 01/01/2026 |
| [Luật thuế TNCN 109/2025/QH15](https://thuvienphapluat.vn/van-ban/Thue-Phi-Le-Phi/Luat-Thue-thu-nhap-ca-nhan-2025-so-109-2025-QH15-665870.aspx) | 5 bậc thuế lũy tiến | 01/01/2026 (thu nhập lương) |
| [Luật BHXH 41/2024/QH15](https://thuvienphapluat.vn/van-ban/Bao-hiem/Luat-Bao-hiem-xa-hoi-2024-557190.aspx) | BHXH, BHYT, BHTN | 01/07/2025 |

> **Lưu ý quan trọng:** Từ **01/07/2026**, trần BHXH/BHYT tăng từ 46,800,000đ → 50,600,000đ (mức tham chiếu 2,530,000đ theo NĐ 161/2026 — cần verify). Cần cập nhật `BHXH_REFERENCE_LEVEL` trong `lib/salary.ts`.

---

## Stack

```
Next.js 16.2.9 (App Router)
React 19.2.4
TypeScript 5
Resend 6  — email API
@vercel/analytics — page views
@vercel/speed-insights — core web vitals
next/og (built-in) — OG image generation
```

Không dùng CSS framework. Toàn bộ styling bằng inline styles + CSS variables.

---

## Cấu trúc project

```
salary-tool/
├── app/
│   ├── layout.tsx                  # Root layout: AppShell + Analytics
│   ├── page.tsx                    # Trang chủ (server component)
│   ├── globals.css                 # CSS variables + layout tokens
│   ├── api/
│   │   ├── subscribe/route.ts      # Email gate API (Resend, runtime nodejs)
│   │   └── og/route.tsx            # OG image API (next/og, runtime edge)
│   ├── bac-thue-tncn/page.tsx
│   ├── luong-toi-thieu-vung/page.tsx
│   ├── so-sanh-luat/page.tsx
│   ├── huong-dan-bhxh/page.tsx
│   ├── tinh-luong/[slug]/page.tsx  # generateStaticParams: 7 slugs
│   └── snapshot/[slug]/page.tsx    # Shareable result (edge runtime)
├── components/
│   ├── AppShell.tsx                # Layout wrapper (server)
│   ├── Header.tsx                  # Sticky header (client)
│   ├── Sidebar.tsx                 # Left nav + mobile drawer (client)
│   ├── Footer.tsx                  # Footer with legal refs (server)
│   ├── SidebarContext.tsx          # open/setOpen context (client)
│   ├── useIsMobile.ts              # window.innerWidth hook
│   ├── CalcForm.tsx                # Main form + state (client)
│   ├── ResultPanel.tsx             # Breakdown + charts (client)
│   ├── EmailGate.tsx               # Email capture modal (client)
│   ├── LegalBadge.tsx              # Law ref badge (server)
│   ├── SnapshotShare.tsx           # "Lưu & Chia sẻ" button (client)
│   ├── ExitIntent.tsx              # Exit-intent trigger (client)
│   ├── Toast.tsx                   # Notification toast (client)
│   ├── FaqJsonLd.tsx               # FAQ schema (server)
│   ├── LawComparisonTable.tsx      # 2025 vs 2026 table (server)
│   └── CopyLinkButton.tsx          # Clipboard button (client)
├── lib/
│   ├── salary.ts                   # Core calc engine + 2026 constants
│   ├── legalRefs.ts                # LEGAL_REFS array + getLatestLegalRef()
│   ├── snapshot.ts                 # encodeSnapshot / decodeSnapshot (base64url)
│   ├── seoSlugs.ts                 # 7 SEO slugs config
│   ├── lawHistory.ts               # LAW_2025 + LAW_2026 constants
│   └── faqs.ts                     # FAQ content cho JSON-LD
└── public/
    └── bang-tinh-luong.xlsx        # Excel template đính kèm email
```

---

## Chạy local

```bash
# Install dependencies
npm install

# Tạo file .env.local
cp .env.local.example .env.local
# Điền RESEND_API_KEY

# Dev server
npm run dev
# → http://localhost:3000

# Type check
npx tsc --noEmit

# Build
npm run build
npm start
```

### Biến môi trường

| Key | Bắt buộc | Mô tả |
|---|---|---|
| `RESEND_API_KEY` | Yes | API key từ resend.com |
| `FOUNDER_EMAIL` | No | Email nhận notify khi có lead mới |

---

## Deploy

### Auto-deploy (khuyến nghị)
Push lên `main` → Vercel tự build và deploy production.

```bash
git push origin main
```

### Manual deploy
```bash
vercel --prod
```

### Vercel project
- **Project:** `salary-tool` (`prj_a3Gh31eMCuXypksJlTqP7OSxOYLP`)
- **Org:** `trungxis-projects`
- **Production:** https://salary-tool-hazel.vercel.app
- **Dashboard:** https://vercel.com/trungxis-projects/salary-tool

---

## Cập nhật luật định kỳ

Khi có nghị định/thông tư mới, cập nhật các file sau:

| File | Thay đổi |
|---|---|
| `lib/salary.ts` | Constants: `MIN_WAGES`, `PERSONAL_DEDUCTION`, `DEPENDANT_DEDUCTION`, `TAX_BRACKETS`, `BHXH_REFERENCE_LEVEL` |
| `lib/legalRefs.ts` | Thêm entry mới vào `LEGAL_REFS` array |
| `lib/lawHistory.ts` | Thêm snapshot `LAW_20XX` cho trang so sánh |
| `app/layout.tsx` | Cập nhật metadata keywords nếu cần |

> Từ **01/07/2026**: cập nhật `BHXH_REFERENCE_LEVEL = 2_530_000` → `MAX_BHXH_BASE = 50_600_000`

---

## Roadmap (theo brainstorm)

- [ ] **Drip email sequence** — 4 email: T+0 welcome, T+3 MISA, T+7 Base, T+30 law update
- [ ] **Real Excel template** — file `.xlsx` thật với formulas (hiện tại là CSV stub)
- [ ] **Vietnam Salary Index** — aggregate tự nguyện (ngành + chức vụ) → báo cáo lương thị trường
- [ ] **BHXH ceiling 01/07/2026** — verify NĐ 161/2026 và update `BHXH_REFERENCE_LEVEL`
