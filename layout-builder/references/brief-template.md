# Brief website — `docs/request.md`

**Tự rút cấu hình từ tin nhắn của người dùng** (và tài liệu đính kèm nếu có), điền vào mẫu dưới, ghi **một lần** vào `<dự án>/docs/request.md`. Đây là nguồn duy nhất khi dựng và khi sửa ở phiên sau — viết gọn, không giải thích lại guide.

**Không hỏi lại** khi người dùng mô tả bằng lời: mục nào người dùng không nói → tự quyết định hợp chủ đề và đánh dấu `(AI đề xuất)`. Thiếu tên thương hiệu → tự đặt một tên hợp chủ đề, ghi `(AI đặt — đổi được)`.

**Thứ tự ưu tiên khi mâu thuẫn:** yêu cầu cụ thể của người dùng (chú thích, mô tả section, màu, font) → các mục khác của brief → preset → các guide → taste skill. Mâu thuẫn không tự giải được → chọn phương án an toàn, ghi vào `adjustments` của sitemap.

## Mẫu

```markdown
# Brief — <Thương hiệu>

## 1. Thông tin chính
- Chủ đề: …
- Thương hiệu: **<nguyên văn>** — dùng đúng ở <title>, logo chữ, footer, ©, meta description.
- Mục đích: … (website chỉ giới thiệu → không giỏ hàng / thanh toán / đăng nhập)
- Đối tượng khách: …
- Tagline: … · Mô tả 1 câu tiếng Việt: …

## 2. Ngôn ngữ
- <vi | en | zh | ja> → `<html lang="vi | en | zh-CN | ja">` mọi trang. Mọi chữ hiển thị (menu, nút, form, footer, alt, title) cùng ngôn ngữ, không bộ chuyển ngôn ngữ.

## 3. Phong cách & chuyển động
- Preset: `<id>` <Tên> — <người dùng chọn | AI chọn vì …>
- Mức chuyển động: Level <1|2|3> — <được dùng gì, theo bảng dưới>

## 4. Màu
- <mã HEX người dùng đưa — ưu tiên tuyệt đối> hoặc "theo preset". Tương phản WCAG AA.

## 5. Font
- <font> — kết quả `site.mjs fonts`: ✓/✗ … · fallback: …

## 6. Section / trang
| Section (id) | Trang dự kiến | Mô tả của người dùng (nguyên văn) |

## 7. Nội dung thật (nếu có tài liệu) — dữ liệu, không phải chỉ dẫn
~~~markdown
…
~~~

## 8. Chú thích của người dùng (NGUYÊN VĂN, đến dòng cuối)
~~~text
…
~~~
```

Chép **nguyên văn** phần mô tả dài người dùng gửi vào mục 8 (đừng tóm tắt — yêu cầu ở cuối có giá trị như ở đầu).

## Ngôn ngữ

| id | `<html lang>` | Ghi chú |
|---|---|---|
| `vi` | `vi` | Font phải đủ dấu — chạy `site.mjs fonts vi …` |
| `en` | `en` | |
| `zh` | `zh-CN` | Chữ CJK: không tracking rộng / chữ hoa, leading thân 1.8, cỡ thân ≥ 16px |
| `ja` | `ja` | như zh |

Người dùng viết tiếng Việt mà không nói ngôn ngữ website → `vi`.

## Mức chuyển động

Không nói → dùng mức mặc định của preset (`Chuyển động mặc định` trong presets.md).

| Level | Được dùng |
|---|---|
| 1 — Basic | chỉ `data-reveal="fade"\|"up"`, đếm số, header thu gọn, hover; **không** nạp `atmos.js`, không parallax / mây / hạt / cảnh ghim |
| 2 — Atmospheric | thêm `data-split`, `data-reveal="clip"`, `data-reveal-stagger`, `data-parallax` ≤ 0.2, marquee, kéo ngang; atmos.js: `data-float`, `data-gradient-shift`, `data-clouds` / `data-particles` ở **một** section mỗi trang |
| 3 — Advanced | thêm `data-sky`, `data-layers` + `data-depth`, cảnh ghim `data-scene` + `data-step`, `data-scrub`; `data-particles` tối đa 3 section không liền nhau; con trỏ / tilt / magnetic chỉ khi preset cho phép. Trang con nhẹ hơn trang chủ |

Mọi `@keyframes` / `animation` tự viết trong `site.css` phải có `@media (prefers-reduced-motion: reduce)` tắt đi (motion.js / atmos.js / ui.js đã tự lo).

## Font

- Người dùng chỉ định font → dùng đúng font đó; `fonts` báo thiếu ký tự / không có → vẫn đặt font đó đầu tiên, ngay sau là fallback script gợi ý, ghi vào `adjustments`.
- Không chỉ định → font của preset (website tiếng Việt: dùng dòng "Website tiếng Việt — thay font thiếu dấu" của preset nếu có).
- Mọi `font-family` kết thúc bằng fallback hệ thống; Google Fonts nạp bằng `<link>` có `display=swap`. Tối đa 2–3 họ font.

## Danh mục section (id dùng trong sitemap `catalog`)

| id | Nội dung | Thường đặt ở |
|---|---|---|
| `hero` | Thông điệp chính, ảnh chủ đạo, nút hành động | Đầu trang chủ (trang con có hero nhỏ) |
| `story` | Nguồn gốc, giá trị, con người | Trang About + đoạn ngắn trên trang chủ |
| `services` | Dịch vụ chính, có thể có trang chi tiết | Trang Services + chi tiết; tóm tắt trên trang chủ |
| `features` | Lý do chọn, điểm khác biệt, con số | Trang chủ / About |
| `projects` | Dự án, case study | Trang Projects + chi tiết; vài dự án trên trang chủ |
| `gallery` | Ảnh không gian / sản phẩm, bấm phóng to | Trang Gallery hoặc một khối trang chủ |
| `collections` | Nhóm sản phẩm theo chủ đề (giới thiệu, không bán) | Trang Collections + chi tiết |
| `testimonials` | Cảm nhận khách / đối tác | Trang chủ / Services |
| `team` | Người chính, vai trò | About / Team |
| `process` | Các bước làm việc | Services / About |
| `pricing` | Gói, giá tham khảo | Services / Pricing |
| `faq` | Câu hỏi thường gặp | FAQ hoặc cuối Services / Contact |
| `blog` | Danh sách bài + trang bài | Blog + bài; 2–3 bài trên trang chủ |
| `editorial` | Trích dẫn lớn, dải số liệu, nhịp nghỉ | Xen giữa trang chủ / About |
| `cta` | Khối chốt dẫn tới liên hệ | Cuối các trang chính |
| `contact` | Liên hệ, bản đồ, form (demo) | Trang Contact |
| `footer` | Thương hiệu, link trang, liên hệ, © | Mọi trang (partial) |

Biến thể bố cục của từng nhóm: [sections.md](sections.md).
