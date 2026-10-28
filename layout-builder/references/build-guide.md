# Dựng website nhiều trang — ngay trong phiên chat

Mục tiêu: **một website hoàn chỉnh, nhiều trang, điều hướng thật, thiết kế nhất quán, ảnh đúng chủ đề** để show khách. HTML + Tailwind (CDN) + JS thuần, mở bằng `file://` được. Không biến mọi chủ đề thành một landing page dài.

Ký hiệu: `S` = `scripts/site.mjs` của skill (đường dẫn tuyệt đối), `P` = thư mục dự án, `WEB` = `P/web`. Lệnh script chạy bằng Bash: `node "S" <lệnh> "WEB" …`.

## Dựng mới

1. **Brief** — rút cấu hình từ tin nhắn theo [brief-template.md](brief-template.md). Chọn preset trong [presets-index.md](presets-index.md) rồi đọc **chỉ mục preset đó** trong [presets.md](presets.md) (Grep `### Preset:` lấy số dòng → Read đoạn đó). Chạy `node "S" fonts <lang> "<font display>" "<font body>"`. Ghi `P/docs/request.md`.
2. **Khung** — `node "S" init "WEB"`: chép `motion.js`, `ui.js`, `atmos.js` vào `WEB/assets/js/` (không sửa các file này), tạo `assets/css`, `assets/img`, `pages/`, `_build/partials/`.
3. Gọi skill `design-taste-frontend` (nếu có), rồi đọc [layout-guide.md](layout-guide.md), [sections.md](sections.md), [motion-guide.md](motion-guide.md), [ui-guide.md](ui-guide.md), [image-guide.md](image-guide.md) — mỗi file một lần. Hiệu ứng **chỉ dùng `motion.js` + `atmos.js` + `ui.js`**, không GSAP / Swiper / three.js… Preset thay cho "màu / font / mức chuyển động tự chọn" của taste skill; mục "Được phép" của preset ghi đè "Không dùng" của layout-guide.
4. **Sitemap trước khi viết HTML** → `WEB/_build/sitemap.json` (định dạng dưới):
   - Thường **4–7 trang**: Home + trang theo mục đích (About, Services, Projects, Collections, Gallery, Blog, FAQ, Contact…) + **2–3 trang chi tiết mẫu** khi có danh sách (service-…, project-…, article-…). Không website nào bắt buộc đủ mọi trang.
   - Chỉ dựng **một trang** khi người dùng nói rõ hoặc chủ đề là chiến dịch / sự kiện ngắn — ghi lý do vào `adjustments`.
   - Phân section vào **đúng trang**: trang chủ giữ hero + phần giới thiệu ngắn dẫn sang trang riêng. Không lặp nội dung giữa các trang. Mỗi trang một `purpose` rõ.
   - Chức năng cần backend (gửi form, đặt chỗ, thanh toán, đăng nhập) → giao diện demo, ghi vào `limitations`; **không giả vờ đã hoạt động**. Không tự thêm thương mại điện tử.
5. **Bản thiết kế** (trong đầu, không ghi file): khách mục tiêu, hành động chính, **một ý tưởng thị giác đặc trưng** xuyên suốt (`visualIdea`), biến thể section theo sections.md (không hai section liền nhau cùng nhóm bố cục), mức chuyển động, **3+ thành phần tương tác** hợp ngành (ui-guide). Thông tin chưa có → nội dung mẫu hợp ngành, nghe như thật, không bịa số liệu "đã xác nhận".
6. **Ảnh theo từng trang** (image-guide): `search` → `use` → mở xem → cập nhật sitemap, **trước khi** viết trang đó.
7. Ghi file — **mỗi file ghi một lần bằng Write** (không đọc lại file vừa ghi, không sửa vụn từng dòng). Thứ tự: `sitemap.json` → ảnh trang chủ → `tw-config.js` + `site.css` → partial (`head`, `header`, `footer`) → `index.html` → (ảnh → trang) cho từng trang còn lại → cập nhật `sitemap.json`.

   ```
   P/
   ├── info.json               # name, tagline, category, description, author (ghi ở bước 10)
   ├── docs/request.md         # brief (bước 1)
   ├── docs/README.md          # tổng kết (bước 10)
   └── web/
       ├── _build/sitemap.json # nội bộ
       ├── _build/partials/    # head.html, header.html, footer.html (+ scripts.html) — viết MỘT lần
       ├── index.html
       ├── pages/              # about.html, services.html, service-<slug>.html, contact.html … (một cấp)
       └── assets/
           ├── js/tw-config.js # tailwind.config dùng chung: màu (tên theo vai trò), fontFamily
           ├── css/site.css    # :root biến màu / font + style Tailwind không làm được
           ├── js/site.js      # chỉ khi cần logic riêng ui.js không có
           ├── js/motion.js, ui.js, atmos.js   # do init chép — không sửa
           └── img/            # do `use` tải, kèm CREDITS.md
   ```

   | Từ | Asset / ảnh | Trang chủ | Trang con khác |
   |---|---|---|---|
   | `index.html` | `assets/…` | `index.html` | `pages/about.html` |
   | `pages/*.html` | `../assets/…` | `../index.html` | `about.html` |

8. **Phần dùng chung viết một lần** trong `WEB/_build/partials/` — không chép header / footer vào từng trang:
   - `head.html`: Google Fonts `<link>` → `<script src="https://cdn.tailwindcss.com"></script>` → `<script src="{{root}}assets/js/tw-config.js"></script>` → `<link rel="stylesheet" href="{{root}}assets/css/site.css">` → `<script src="{{root}}assets/js/ui.js"></script>`.
   - `header.html`: logo chữ thương hiệu + menu (cùng thứ tự mọi trang) + menu điện thoại `data-menu-toggle` / `data-menu` của ui.js. `footer.html`: các trang + liên hệ + © thương hiệu.
   - `scripts.html` (tùy chọn): `site.js` (nếu có) → `motion.js` → `atmos.js` (chỉ khi Level ≥ 2).
   - Mọi đường dẫn trong partial bắt đầu bằng `{{root}}` (`{{root}}pages/about.html`, `{{root}}assets/…`) — script thay bằng `""` hoặc `"../"`. Link `#id` / `tel:` / `mailto:` / `https:` giữ nguyên.
   - **Không tự viết `aria-current`**: script gắn cho link trỏ đúng trang đang xem. Style active bằng `aria-[current=page]:text-… aria-[current=page]:after:scale-x-100`.
   - Trong trang chỉ đặt dấu, mỗi dấu một dòng: `<!-- @partial head -->` (trong `<head>`, sau `<title>` / meta description), `<!-- @partial header -->` (đầu `<body>`), `<!-- @partial footer -->`, `<!-- @partial scripts -->`.
   - Sau khi ghép, nội dung nằm giữa `<!-- @partial x -->` … `<!-- /@partial x -->` — **không sửa phần đó trong trang**; sửa `_build/partials/x.html` rồi chạy `assemble` lại.
9. Mỗi trang HTML:
   - `<!doctype html>`, `<html lang>` đúng brief, `<meta charset="utf-8">`, viewport, `<title>` "<Tên trang> — <Thương hiệu>" (trang chủ: thương hiệu + khẩu hiệu), `<meta name="description">`, rồi `<!-- @partial head -->`.
   - Mọi chữ hiển thị bằng **ngôn ngữ đã chọn**, không trộn.
   - `<body>`: `<!-- @partial header -->` → `<main>` → `<!-- @partial footer -->` → script.
   - Trang con có hero nhỏ (tiêu đề + một dòng dẫn + breadcrumb ở trang chi tiết), không lặp hero lớn.
   - Section `<section id data-section>` (id duy nhất trong trang), bố cục / responsive theo layout-guide.
   - **Mọi link / nút đều hoạt động**: tới trang có thật, `#id` có thật, mở modal, `tel:`, `mailto:`, sao chép số. Không `href="#"`, không link tới trang chưa tạo. Mục danh sách chưa có trang chi tiết thì không có link.
   - Form dùng `form[data-form]` của ui.js; ghi chú nhỏ cạnh nút gửi nói rõ là bản demo.
   - Không ES module `import`, không `fetch` file local, không thư viện JS khác.
10. **Ghép + kiểm + tự rà:**
    1. `node "S" check "WEB"` — tự ghép partial rồi kiểm tĩnh mọi trang (link chết, `href="#"`, neo sai, ảnh / script không tồn tại, ảnh link chưa kiểm, thiếu alt / lang / title, sitemap lệch). Sửa hết **LỖI**, chạy lại tới khi 0 lỗi.
    2. Có công cụ trình duyệt (ví dụ Playwright MCP `browser_navigate` / `browser_resize` / `browser_take_screenshot`) → mở `file:///…/WEB/index.html`, chụp toàn trang ở 1440 và 375, màn hình đầu 1–2 trang con ở 1440; xem console có lỗi JS không. Rà theo mục **Tự rà thẩm mỹ**, gom chỗ chưa đạt, sửa bằng Edit (lỗi header / footer → sửa partial rồi `assemble`), chụp lại khối vừa sửa. Tối đa **2 vòng**. Không có công cụ trình duyệt → bỏ qua, nói rõ trong câu trả lời.
11. **Tổng kết** — ghi `P/info.json` (`{"name","tagline","category","description","author"}`, tagline / mô tả tiếng Việt) và `P/docs/README.md` ngắn: danh sách trang + mục đích, preset / màu / font, số ảnh (tải về / link), **ảnh dùng link cần thay trước khi lên web thật**, vị trí "Cần ảnh thật từ khách", giới hạn (form demo…), cách mở (`web/index.html`).
12. Trả lời người dùng ngắn gọn: đường dẫn `web/index.html`, số trang, hướng thiết kế, số ảnh, kết quả `check`, những gì đã sửa sau khi tự xem.

### `_build/sitemap.json`

```json
{
  "brand": "AN NAM KÝ",
  "language": "vi",
  "preset": "editorial",
  "motionLevel": 2,
  "visualIdea": "Đường chỉ khâu chạy xuyên các trang như một sợi chỉ kể chuyện",
  "purposeInferred": "",
  "theme": { "tagline": "Lụa Việt may đo thủ công", "description": "Giao diện thương hiệu áo dài may đo." },
  "pages": [
    {
      "file": "index.html",
      "title": "Trang chủ",
      "purpose": "Giới thiệu thương hiệu, dẫn sang bộ sưu tập và câu chuyện",
      "sections": [
        { "id": "hero", "catalog": "hero", "variant": "hero-type", "source": "user", "note": "" },
        { "id": "story-teaser", "catalog": "story", "variant": "story-letter", "source": "ai", "note": "Đoạn ngắn, link sang pages/about.html" }
      ],
      "images": [
        { "slot": "hero", "query": "silk ao dai fabric detail", "file": "assets/img/hero-lua.jpg", "status": "ok" },
        { "slot": "story-teaser", "query": "tailor hands sewing", "file": null, "status": "none" }
      ]
    }
  ],
  "adjustments": ["Bỏ Pricing vì website chỉ giới thiệu thương hiệu"],
  "limitations": ["Form liên hệ là bản demo, chưa có backend"]
}
```
- `catalog`: id trong danh mục section (brief-template); `source`: `user` / `ai`. `file` tính từ gốc `WEB`.
- `images[].status`: `ok` (đã tải, đang dùng) / `link` (`file` = URL đã kiểm) / `none` (không có ảnh hợp → bố cục không ảnh).

## Tự rà thẩm mỹ (khi xem ảnh chụp)

- **Màn hình đầu** trang chủ (1440): 3 giây hiểu thương hiệu là ai, website để làm gì, bấm vào đâu. Tiêu đề đủ lớn, CTA nổi bật, ảnh hero rõ chủ thể, chữ không đè mặt người / chủ thể.
- **Nhất quán giữa các trang**: cùng header / footer, màu, font, nhịp khoảng trắng, kiểu nút.
- **Phân cấp chữ**: mỗi section một tiêu đề rõ; dòng ≤ 70 ký tự Latin; không khối chữ dày đặc.
- **Nhịp**: không quá 2 section liền nhau cùng kiểu; đổi bố cục / nền.
- **Màu & tương phản**: chữ đọc rõ trên nền và trên ảnh.
- **Ảnh**: đúng chủ đề của trang / section, không méo (`object-cover` + tỉ lệ cố định), không lặp.
- **Điện thoại (375)**: không tràn ngang, chữ ≥ 14px, nút ≥ 44px, menu thu vào nút.
- **Bề ngang (1920)**: nội dung trải ≥ 72% bề ngang, không một cột hẹp giữa trang.
- **Kết trang**: trang chính có khối CTA cuối trước footer.

## Sửa theo góp ý (cùng phiên hoặc phiên sau)

1. Phiên mới: đọc `P/docs/request.md` + `WEB/_build/sitemap.json` để nắm website; chỉ mở file cần sửa.
2. **Góp ý cho một section** → `Grep` `id="<section>"` trong đúng trang, `Read` đúng đoạn (offset / limit), sửa trong khối đó (giữ `id`). Không đọc cả trang, không gọi taste skill.
3. **Đổi phong cách cả website** ("sang hơn", "kiểu retro") → sửa màu / font trong `tw-config.js` + `site.css` theo preset tương ứng trước, rồi mới sửa từng section — không viết lại trang.
4. **Header / footer / menu / font chung** → sửa partial một lần rồi `assemble`.
5. **Thêm trang** → tạo trong `pages/` theo bước 7–9 (có dấu partial), thêm link vào `header.html` / `footer.html` và sitemap.
6. Ảnh → image-guide. Hiệu ứng → motion-guide, tăng / giảm bằng `data-*` (cần atmos mà trang chưa nạp → thêm script sau motion.js). Tương tác → ui-guide.
7. Sửa bằng Edit, giữ nguyên phần không bị góp ý. Thêm một dòng vào `docs/request.md` mục "Góp ý đã sửa". Chạy `check` lại; có trình duyệt thì chụp lại khối đã sửa.
