# Ảnh trong website — ảnh thật, đúng chủ đề

`S` = đường dẫn tới `scripts/site.mjs` của skill, `WEB` = thư mục `web/` của dự án. Chạy bằng Bash: `node "S" <lệnh> "WEB" …`.

## Luật bắt buộc

1. **Lấy ảnh qua script, theo thứ tự:**
   - `search` (tìm) → `use` (tải về `assets/img/` + ghi nguồn vào `assets/img/CREDITS.md`). Dùng **đúng đường dẫn `use` in ra** (đuôi có thể là `.jpg` / `.webp` / `.png`).
   - **Dự phòng — link ảnh:** `use` không tải được thì script **tự** trả `LINK <url>` → dùng thẳng URL đó trong `<img src>`. `search` lỗi / không có ảnh hợp → tự tìm link ảnh bằng `WebSearch` / `WebFetch` (Pinterest `i.pinimg.com`, Wikimedia, trang ảnh, trang của thương hiệu…) rồi chạy `link "WEB" "<url>" "<trang — vị trí>"` để script kiểm link mở ra đúng file ảnh và ghi nguồn. Website demo nên link ngoài chấp nhận được.
2. **Cấm:** link ảnh tự nghĩ / đoán mã (kể cả `images.unsplash.com/photo-…`) chưa qua `link`, `picsum.photos`, `placehold.co`, `via.placeholder.com`, `dummyimage`, `loremflickr`, `source.unsplash.com`, ảnh AI tạo, ảnh `data:` base64, **hình vẽ SVG / CSS giả làm ảnh chụp** (tốn token, trông giả). Icon nét, logo chữ, hoa văn trừu tượng thì được. `site.mjs check` báo lỗi mọi ảnh link chưa kiểm.
3. **Đúng chủ đề của vị trí đặt:** ảnh khớp ngành, sản phẩm, bối cảnh **của trang và section đó** (hero tiệm bánh = bánh của tiệm; trang niềng răng = ca niềng răng, không phải bệnh viện chung chung). Ưu tiên bối cảnh châu Á / Việt Nam khi phù hợp.
4. **Không tuyên bố có ảnh khi chưa có:** sitemap ghi `"status": "ok"` chỉ khi `use` đã trả `OK <file>` và trang dùng file đó; `"status": "link"` khi dùng link đã qua `use` (LINK) / `link`.

## Cách làm — theo từng trang

1. **Lập danh sách vị trí cần ảnh từng trang** (ghi vào `images` của trang trong `_build/sitemap.json`):
   - Hero trang chủ: ảnh chủ đạo mang tinh thần thương hiệu. About: con người / nơi làm việc / câu chuyện.
   - Services / trang chi tiết: mỗi dịch vụ một ảnh đúng dịch vụ đó. Projects / Collections: ảnh từng dự án / bộ sưu tập.
   - Gallery: 6–10 ảnh đa dạng nhưng cùng tông. Contact: chỉ khi thật sự hợp.
   Không section nào bắt buộc có ảnh. Website nhiều trang thường **10–25 ảnh**.
2. `search "WEB" "<từ khóa>" [landscape|portrait|square]` — từ khóa **tiếng Anh, 2–4 từ, chủ thể chính đứng đầu**, viết riêng cho từng vị trí (`"glacier blue ice cave"`, `"tailor hands silk"`); hero / dải ngang → `landscape`, thẻ dọc → `portrait`. Không dùng một từ khóa chung cho cả website.
3. Đọc tiêu đề + tag, chọn id khớp nhất, ưu tiên ảnh đủ lớn (hero ≥ 1600px ngang). Ảnh `ĐÃ DÙNG` → chọn ảnh khác. Không khớp → tìm lại bằng từ khóa khác. **Tối đa 3 lần tìm cho một vị trí.**
4. `use "WEB" <id> <name> "<trang — vị trí>"` với `name` gợi nhớ (`about-xuong-may`, `service-nieng-rang`).
5. **Mở file ảnh vừa tải bằng Read** để kiểm nội dung đúng chủ đề, không chữ / logo / watermark lạ, chất lượng ổn. Sai → chọn id khác (ghi đè cùng `name`). Ảnh link không mở được — chọn theo tiêu đề / tag là đủ. Muốn tiết kiệm: chỉ mở ảnh hero và ảnh có tiêu đề mơ hồ.
6. HTML: `<img src="assets/img/about-xuong-may.webp" alt="<mô tả đúng nội dung ảnh, bằng ngôn ngữ website>" class="… object-cover" width height>` trong khung có `aspect-*` và **nền dự phòng** (màu thương hiệu nhạt); `loading="lazy"` trừ ảnh hero. Trang trong `pages/` dùng `../assets/img/…`. Ảnh link: `src` là nguyên URL, thêm `referrerpolicy="no-referrer"`.
7. Cập nhật `images[].file` / `status` trong sitemap.json.

## Khi tìm ảnh lỗi

- Script tự chuyển nguồn (Pexels → Unsplash → Openverse); lỗi nghĩa là **mọi nguồn** đều lỗi. Thử lại **một** lần với từ khóa khác; vẫn lỗi → **dừng `search`** cho cả lượt, chuyển sang link ảnh.
- **Tìm link ảnh:** `WebSearch` theo từ khóa của vị trí (thêm `pinterest`, `photo`, `jpg`) → lấy link **trực tiếp tới file ảnh** → `link`. Bị từ chối → link khác. Tối đa **3 link cho một vị trí**; gom nhiều vị trí trong một lượt WebSearch khi được.
- **Vẫn không có ảnh hợp** → không chèn ảnh sai chủ đề / ảnh tự tạo / hình vẽ giả ảnh: đổi vị trí đó sang khối chữ / số liệu / màu thương hiệu, ghi `"status": "none"` + từ khóa dự kiến trong sitemap.json và liệt kê trong `docs/README.md` mục "Cần ảnh thật từ khách".

Một ảnh dùng một lần trên toàn website.
