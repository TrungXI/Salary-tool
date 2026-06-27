# TínhLương.vn — Công cụ tính lương Gross/Net Việt Nam 2026

> Tính lương Gross → Net, Net → Gross chính xác theo luật Việt Nam 2026.
> Cập nhật theo Nghị định 293/2025/NĐ-CP, Nghị quyết 110/2025/UBTVQH15, Luật thuế TNCN 109/2025/QH15.

**Production:** https://salary-tool-hazel.vercel.app
**GitHub:** https://github.com/TrungXI/Salary-tool (private)

> **Phiên bản:** `main` branch tự động deploy lên Vercel sau mỗi push.

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

### Core Calculator
- **Gross → Net** và **Net → Gross** (binary search)
- Tính đầy đủ: BHXH 8%, BHYT 1.5%, BHTN 1% (NLĐ) + BHXH 17.5%, BHYT 3%, BHTN 1% (NSD)
- Thuế TNCN lũy tiến 5 bậc (Luật 109/2025/QH15)
- Giảm trừ gia cảnh: bản thân 15.5tr, người phụ thuộc 6.2tr/người
- 4 vùng lương tối thiểu, hỗ trợ thử việc vs chính thức
- Mức đóng BHXH tùy chỉnh

### SEO Pages (Salary & Tax)
| Route | Nội dung |
|---|---|
| `/luong-toi-thieu-vung` | Bảng 4 vùng, NĐ 293/2025, FAQ JSON-LD |
| `/bac-thue-tncn` | 5 bậc thuế + công thức rút gọn + calc pre-filled |
| `/so-sanh-luat` | Bảng so sánh 2025 vs 2026 (lương/thuế/BHXH) |
| `/huong-dan-bhxh` | Hướng dẫn BHXH 2026, ví dụ tính |
| `/tinh-luong/[slug]` | 7 trang: 10/15/20/25/30/40/50 triệu (SSG) |

### Domain Mở Rộng (6 domain mới, 18+ pages)

**Hoàn thuế & Quyết toán**
| Route | Nội dung |
|---|---|
| `/hoan-thue-tncn` | Tính hoàn thuế TNCN (so sánh thuế đã khấu trừ vs phải nộp) |
| `/quyet-toan-tncn` | Hướng dẫn quyết toán mẫu 02/QTT-TNCN |
| `/giam-tru-gia-canh` | Bảng giảm trừ gia cảnh nhanh |

**Đàm phán & Offer lương**
| Route | Nội dung |
|---|---|
| `/bang-luong-thi-truong` | Bảng lương thị trường theo ngành/chức vụ |
| `/script-dam-phan-luong` | Script đàm phán offer với ví dụ thực tế |
| `/checklist-hop-dong` | Checklist hợp đồng lao động 20+ điểm |

**Vay & Tín dụng**
| Route | Nội dung |
|---|---|
| `/tinh-lai-vay-mua-nha` | Tính lãi vay mua nhà (annuity formula) |
| `/tinh-lai-vay-mua-xe` | Tính lãi vay mua xe |
| `/tinh-dti` | DTI — Điều kiện vay (3 mức ≤40%/≤50%/>50%) |

**Tiết kiệm & Tài chính**
| Route | Nội dung |
|---|---|
| `/quy-khan-cap` | Tính quỹ khẩn cấp 3–6 tháng |
| `/tiet-kiem-huu-tri` | Tính tiết kiệm hưu trí (FV annuity) |
| `/50-30-20` | Ngân sách theo quy tắc 50/30/20 |

**Phép & Tăng ca**
| Route | Nội dung |
|---|---|
| `/tinh-tang-ca` | Tính tăng ca (Điều 98 BLLĐ: 150/200/300%) |
| `/tinh-phep-nam` | Phép năm & thâm niên (Điều 113 BLLĐ) |
| `/thuong-tet` | Ước tính thưởng Tết |

**Visa & Expat**
| Route | Nội dung |
|---|---|
| `/thue-tncn-expat` | Thuế TNCN cho người nước ngoài (resident vs non-resident) |
| `/work-permit` | Hướng dẫn Work Permit / Giấy phép lao động |

### UI & UX
- **Dark / Light theme** — toggle trong header, lưu vào `localStorage`, FOUC-safe (inline script trong `<head>`)
- **Left sidebar accordion** — 7 section collapsible, chỉ 1 section mở tại một thời điểm, auto-expand section active
- **i18n VI / EN** — route-based: `/` = VI, `/en/...` = EN; `/vi/...` redirect về canonical; LanguageSwitcher giữ nguyên path khi chuyển ngôn ngữ

### Growth Features
- **Salary Snapshot** — nút "Lưu & Chia sẻ" → URL `/snapshot/[slug]` với OG image (1200×630) để share Facebook/Zalo
- **Email Gate** — unlock chi tiết thuế sau khi nhập email → welcome email có đính kèm Excel template
- **Exit-intent modal** — khi chuột rời khỏi viewport (desktop), hiện email gate một lần/session
- **Vercel Analytics + Speed Insights** — tracking không cần consent banner

### Layout
- **Sticky header** (56px, z=100): logo, LanguageSwitcher, ThemeToggle, LegalBadge, "Luật 2026" pill
- **Left sidebar** (256px desktop, drawer mobile): 7 section accordion + 4 mức lương phổ biến
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
Không dùng thư viện i18n (next-intl, react-i18next...) — custom zero-dep implementation.

---

## Cấu trúc project

```
salary-tool/
├── middleware.ts                   # i18n routing: /vi/* → redirect, /en/* → rewrite
├── messages/
│   ├── vi.json                     # Từ điển VI (keys: common, header, sidebar, home, calcForm, ...)
│   └── en.json                     # Từ điển EN (cùng key set với vi.json)
├── app/
│   ├── layout.tsx                  # Root layout: đọc x-locale header, AppShell + Analytics
│   ├── page.tsx                    # Trang chủ VI (server component)
│   ├── globals.css                 # CSS variables + dark theme + layout tokens
│   ├── en/
│   │   └── page.tsx                # Trang chủ EN
│   ├── api/
│   │   ├── subscribe/route.ts      # Email gate API (Resend, runtime nodejs)
│   │   └── og/route.tsx            # OG image API (next/og, runtime edge)
│   ├── bac-thue-tncn/page.tsx
│   ├── luong-toi-thieu-vung/page.tsx
│   ├── so-sanh-luat/page.tsx
│   ├── huong-dan-bhxh/page.tsx
│   ├── tinh-luong/[slug]/page.tsx  # generateStaticParams: 7 slugs
│   ├── snapshot/[slug]/page.tsx    # Shareable result (edge runtime)
│   ├── hoan-thue-tncn/page.tsx
│   ├── quyet-toan-tncn/page.tsx
│   ├── giam-tru-gia-canh/page.tsx
│   ├── bang-luong-thi-truong/page.tsx
│   ├── script-dam-phan-luong/page.tsx
│   ├── checklist-hop-dong/page.tsx
│   ├── tinh-lai-vay-mua-nha/page.tsx
│   ├── tinh-lai-vay-mua-xe/page.tsx
│   ├── tinh-dti/page.tsx
│   ├── quy-khan-cap/page.tsx
│   ├── tiet-kiem-huu-tri/page.tsx
│   ├── 50-30-20/page.tsx
│   ├── tinh-tang-ca/page.tsx
│   ├── tinh-phep-nam/page.tsx
│   ├── thuong-tet/page.tsx
│   ├── thue-tncn-expat/page.tsx
│   └── work-permit/page.tsx
├── components/
│   ├── AppShell.tsx                # Layout wrapper: LocaleProvider + VietnameseOnlyNote logic
│   ├── Header.tsx                  # Sticky header: useT, LanguageSwitcher, ThemeToggle (client)
│   ├── Sidebar.tsx                 # Left nav: 7 section accordion + popular items (client)
│   ├── Footer.tsx                  # Footer với legal refs (client — dùng useT)
│   ├── ThemeToggle.tsx             # Dark/light toggle: moon/sun icon, localStorage (client)
│   ├── LanguageSwitcher.tsx        # VI/EN switcher, preserve path (client)
│   ├── VietnameseOnlyNote.tsx      # Banner "Vietnamese only" trên /en/<content> (client)
│   ├── SidebarContext.tsx          # open/setOpen context (client)
│   ├── useIsMobile.ts              # window.innerWidth hook
│   ├── CalcForm.tsx                # Main form + state, useT (client)
│   ├── ResultPanel.tsx             # Breakdown + charts, useT (client)
│   ├── ComingSoon.tsx              # Placeholder page, useT (client)
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
│   ├── faqs.ts                     # FAQ content cho JSON-LD
│   └── i18n/
│       ├── config.ts               # LOCALES = ['vi','en'], DEFAULT_LOCALE = 'vi'
│       ├── dictionary.ts           # getDictionary(locale): load từ messages/*.json
│       └── LocaleProvider.tsx      # LocaleProvider, useT(), useLocale(), useLocalizedHref()
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

| Key | Bắt buộc | Mô tả | Lấy từ đâu |
|---|---|---|---|
| `RESEND_API_KEY` | **Yes** | API key gửi email (email gate, welcome email) | [resend.com](https://resend.com) → API Keys → Create API Key |
| `FOUNDER_EMAIL` | No | Email nhận notify khi có lead mới | Điền email của bạn (VD: you@gmail.com) |

> **Lấy RESEND_API_KEY:**
> 1. Đăng ký tại https://resend.com (free tier: 100 email/ngày, 3000/tháng)
> 2. Vào **API Keys** → **Create API Key** → chọn quyền "Sending access"
> 3. Copy key dạng `re_...` vào `.env.local`

> **Cấu hình trên Vercel:**
> Dashboard → salary-tool → Settings → Environment Variables → thêm `RESEND_API_KEY`

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
