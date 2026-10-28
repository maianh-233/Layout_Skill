# Danh mục design preset

Mỗi preset là một bộ quy tắc thiết kế đầy đủ. Chọn preset qua [presets-index.md](presets-index.md), rồi chỉ đọc mục của preset đó ở đây.

### Preset: Dreamy / Ethereal / Anime (`dreamy`)
Bầu trời, ánh chiều, khoảnh khắc lặng — mơ màng như một khung phim hoạt hình.

**Hợp với:** dự án cá nhân / nghệ thuật, âm nhạc lofi, sự kiện cảm xúc, homestay mơ mộng
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `sky-dawn` #F6D8C8 · `sky-day` #A9C6E8 · `dusk` #2B3566 · `night` #0E1430 · `ink` #1E2340 · `paper` #FBF7F2 · `glow` #FFC98B · `sakura` #E8A6B8
**Font** (Google Fonts): display `Shippori Mincho:wght@500;700;800` · body `Zen Kaku Gothic New:wght@400;500;700` · nhãn `Zen Kaku Gothic New`

**Thành phần giao diện**
- Nút viền mảnh hoặc chữ + mũi tên trên nền trời, không khối đặc nặng
- Không thẻ có bóng; nội dung nổi trên cảnh, khối chữ nền giấy mờ khi cần tương phản
**Chữ**
- Tiêu đề Shippori Mincho (serif kiểu poster phim Nhật), cỡ rất lớn ở hero (clamp 3.5rem → 8rem), dòng chặt (leading-[0.95]), chữ thường xen chữ hoa.
- Nhãn nhỏ: chữ hoa, tracking-[0.3em], cỡ 11–12px — như phụ đề / số cảnh ("SCENE 02 — THE FIELD").
- Thân bài 17–18px, leading-relaxed, màu ink/80; câu ngắn, giàu hình ảnh, giọng tự sự.
**Bố cục**
- Hero toàn màn hình `min-h-[100dvh]`, tiêu đề đặt góc dưới-trái hoặc căn giữa trên bầu trời — được phép căn giữa.
- Mỗi section là một "cảnh": nền chuyển màu theo giờ trong ngày (sáng → chiều → đêm) khi cuộn xuống — dùng `data-sky` trên `<body>` và để section trong suốt.
- Xen kẽ cảnh rộng tràn viền với khối chữ hẹp (max-w-prose) đặt lệch trái / phải — nhiều khoảng trống bầu trời.
- Ít nhất một cảnh ghim theo cuộn (`story-pinned`) kể chuyện bằng 3 câu ngắn đổi lần lượt.
**Ảnh**
- Ảnh chụp thật: cánh đồng / ngọn đồi / ga tàu vắng / mặt hồ / đường quê / bầu trời mây lớn — một chủ thể nhỏ cô độc giữa khung rộng.
- Từ khóa gợi ý: "lone tree field clouds", "empty train station countryside", "summer clouds blue sky", "mountain lake dusk", "sunset grass field", "starry night sky".
- Xử lý ảnh bằng CSS cho tông phim hoạt hình: `saturate-[1.15] contrast-[1.05]` + lớp phủ gradient màu trời (mix-blend-soft-light), đáy ảnh hòa vào nền bằng gradient.
**Khoảng trắng:** Rất nhiều: section `py-28 lg:py-40`, chữ chiếm ≤ 40% khung, để bầu trời "thở".
**Chuyển động mặc định:** Level 3 — Advanced
- Hero: `data-clouds` (2–3 lớp) + `data-particles="dust"` hoặc `"fireflies"` (cảnh chiều / đêm) + tiêu đề `data-split="words"` chậm.
- Cảnh đêm: `data-particles="stars"`; cảnh ghim: `data-scene` + `data-step`.
- Ảnh lớn: `data-reveal="clip"`; lớp ảnh trong hero: `data-layers` với 2–3 `data-depth`.
- Nhịp chậm, êm; không tilt, không magnetic, không con trỏ tùy biến, không ripple.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-scene` → `story-letter` → `story-pinned` → `gallery-filmstrip` → `quote-full` → `cta-sky` → `footer-minimal`
**Được phép (ghi đè layout-guide mục 3):** gradient bầu trời (cam đào → xanh trời → tím đêm); quầng sáng mềm / hạt sáng; hero căn giữa; mây vẽ bằng gradient (trang trí trừu tượng, không giả ảnh chụp)
**Tránh:** gradient tím–xanh neon; thẻ bo góc có bóng đổ kiểu SaaS; icon dày đặc; phóng to / thu nhỏ ảnh tĩnh để giả nhân vật chuyển động

### Preset: Nature / Organic / Atmospheric (`nature`)
Rêu, gỗ, sương sớm — chất liệu tự nhiên, nhịp chậm.

**Hợp với:** nông sản / hữu cơ, trà / thảo mộc, homestay / retreat, spa thiên nhiên, du lịch sinh thái
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `moss` #3F5A3C · `fern` #6F8B5E · `mist` #F4F1EA · `sand` #E9E1D1 · `bark` #5A4636 · `sky` #BFD3D6 · `ochre` #C98A3D · `ink` #1F271D
**Font** (Google Fonts): display `Fraunces:opsz,wght@9..144,400;9..144,600` · body `Manrope:wght@400;500;700`

**Thành phần giao diện**
- Nút bo tròn mềm nền moss, chữ mist
- Ảnh bo lớn / vòm; thẻ nền sand không viền, bóng rất nhẹ
**Chữ**
- Tiêu đề Fraunces (serif mềm), một từ in nghiêng màu fern để nhấn ý.
- Thân bài Manrope 17px, màu ink/75; số liệu (độ cao, nhiệt độ, mùa) đặt thành nhãn nhỏ.
**Bố cục**
- Bố cục hữu cơ: ảnh bo góc lớn (rounded-[2rem]) hoặc vòm (rounded-t-full) xen ảnh vuông sắc cạnh.
- Lưới lệch nhịp 12 cột: ảnh chiếm 7 cột, chữ 4 cột lệch xuống; dải ảnh ngang kéo được.
- Nền mist / sand xen một dải moss đậm cho phần số liệu hoặc trích dẫn.
**Ảnh**
- Ảnh thật: rừng sương, lá cận cảnh, bàn tay làm việc, chất liệu gỗ / đá / vải lanh.
- Tông ấm hơi phai: `saturate-[.9] sepia-[.08]`.
**Khoảng trắng:** Rộng rãi, `py-24 lg:py-32`, khối chữ ngắn.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-reveal="clip"` cho ảnh lớn, `data-reveal-stagger` cho lưới, `data-parallax` 0.1–0.15 cho ảnh hero.
- Một section có `data-particles="dust"` (nắng xuyên rừng) hoặc `data-clouds` mỏng (sương) — không hơn.
- `data-float` rất nhẹ (6px) cho 1–2 chi tiết trang trí (lá, nhãn).
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-split` → `story-editorial` → `features-numbered` → `gallery-lookbook` → `stats-band` → `quote-full` → `contact-split` → `footer-big`
**Được phép (ghi đè layout-guide mục 3):** sương mỏng bằng gradient; hình vòm / bo lớn
**Tránh:** xanh lá tươi chói; icon lá cây clip-art; gradient đa màu

### Preset: Editorial / Magazine (`editorial`)
Như tạp chí in: chữ lớn, lưới bất đối xứng, rất ít màu.

**Hợp với:** thời trang, tạp chí / xuất bản, kiến trúc, thương hiệu cá nhân
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `paper` #F5F3EF · `ink` #111111 · `stone` #D9D4CB · `muted` #6B6760 · `bronze` #8C6A43
**Font** (Google Fonts): display `Instrument Serif:ital@0;1` · body `Geist:wght@300;400;500;600`
**Website tiếng Việt** — thay font thiếu dấu bằng: display `Noto Serif Display:ital,wght@0,400;1,400`

**Thành phần giao diện**
- Nút chữ + gạch chân chạy hoặc khung chữ nhật viền 1px, góc vuông
- Không thẻ; phân khối bằng đường kẻ mảnh và số mục "No. 01"
**Chữ**
- Tiêu đề Instrument Serif cực lớn (đến 10rem ở 2xl), một phần in nghiêng; tracking-tight.
- Thân Geist 16px; nhãn chữ hoa 11px tracking-[0.2em]; số trang / số mục kiểu tạp chí (No. 01).
**Bố cục**
- Lưới 12 cột với đường kẻ mảnh (border-ink/15) chia khối; căn trái tuyệt đối.
- Hero chữ là chính (`hero-type`), ảnh nhỏ đặt lệch; ảnh lớn xuất hiện ở section sau như trang đôi tạp chí.
- Không thẻ có bóng đổ; phân tách bằng đường kẻ và khoảng trắng.
**Ảnh**
- Ảnh studio / kiến trúc, nền trơn, nhiều khoảng trống; có thể đen trắng (`grayscale`) với 1 ảnh màu làm điểm nhấn.
**Khoảng trắng:** Rất rộng nhưng có kỷ luật: lề cố định, khối căn theo lưới.
**Chuyển động mặc định:** Level 1 — Basic
- Chỉ `data-reveal="fade"`/`"up"`, `data-reveal="clip"` cho 1–2 ảnh lớn, `data-split="words"` cho 1 tiêu đề.
- Hover: gạch chân chạy, ảnh phóng chậm 1.04. Không particles / clouds / tilt / cursor.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-type` → `story-editorial` → `gallery-lookbook` → `features-numbered` → `quote-full` → `cta-type` → `footer-big`
**Tránh:** bo góc lớn; bóng đổ; nhiều màu; icon trang trí

### Preset: Vintage / Retro / Film (`film`)
Hạt phim, màu phai, nhãn đánh máy — hoài niệm có chủ đích.

**Hợp với:** cà phê / quán xưa, cửa hàng đồ cũ, âm nhạc / đĩa than, nhạc cụ truyền thống, tiệm ảnh
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `cream` #EFE6D2 · `ink` #2A211B · `faded-red` #B4442F · `mustard` #D9A441 · `teal` #2F6F6A · `paper` #F7F1E3
**Font** (Google Fonts): display `Young Serif:wght@400` · body `Work Sans:wght@400;500;700` · nhãn `Courier Prime:wght@400;700`
**Website tiếng Việt** — thay font thiếu dấu bằng: display `Merriweather:wght@700;900` · label `Space Mono:wght@400;700`

**Thành phần giao diện**
- Nút khối màu phẳng (mustard / faded-red) viền kép, góc vuông
- Ảnh khung polaroid / dải phim; nhãn đánh máy như vé, tem
**Chữ**
- Tiêu đề Young Serif, cỡ lớn, có thể đặt trong khung viền kép như nhãn đĩa than.
- Nhãn / chú thích Courier Prime (đánh máy): số khung "FR. 24A", ngày tháng, giá.
**Bố cục**
- Ảnh khung polaroid / dải phim có lỗ (border-dashed), xoay nhẹ ±2° (`rotate-[-2deg]`).
- Khối màu phẳng (mustard, teal, faded-red) cắt ngang trang; đường kẻ đôi.
- Lớp hạt phim phủ toàn trang: một `<div>` fixed `pointer-events-none` với nhiễu bằng SVG feTurbulence, opacity .08.
**Ảnh**
- Ảnh thật tông ấm, phai: `sepia-[.25] saturate-[.85] contrast-[1.05]`; khung viền trắng dày.
**Khoảng trắng:** Vừa phải, nhịp dày hơn editorial; khối xếp chồng như sổ lưu niệm.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-reveal="up"` + `data-reveal-stagger` cho ảnh polaroid, `data-float` rất nhẹ cho 1 ảnh xoay.
- `data-marquee` cho dải chữ kiểu băng rôn; `data-drag-scroll` cho dải phim.
- Không particles kiểu lấp lánh; không blur.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-offset` → `story-letter` → `gallery-filmstrip` → `features-alternate` → `stats-band` → `cta-fullbleed` → `footer-minimal`
**Được phép (ghi đè layout-guide mục 3):** hạt nhiễu SVG feTurbulence làm lớp phủ; ảnh xoay nhẹ
**Tránh:** gradient hiện đại; glassmorphism; font sans hình học

### Preset: Futuristic / Sci-Fi (`futuristic`)
Nền tối, lưới kỹ thuật, ánh neon tiết chế — công nghệ tương lai.

**Hợp với:** công ty công nghệ / AI, game, nghệ thuật số, sự kiện công nghệ
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `void` #07080C · `panel` #10131B · `line` #232838 · `ink` #E8ECF5 · `muted` #8A93A6 · `acid` #C6FF3D · `cyan` #3DF2E0
**Font** (Google Fonts): display `Unbounded:wght@400;600;800` · body `IBM Plex Sans:wght@400;500;600` · nhãn `JetBrains Mono:wght@400;600`

**Thành phần giao diện**
- Nút viền 1px acid, chữ mono chữ hoa, góc cắt chéo (clip-path) hoặc vuông
- Panel viền line, nhãn chỉ số `[ 02 / MODULE ]`
**Chữ**
- Tiêu đề Unbounded, chữ hoa / thường trộn, cỡ lớn; nhãn JetBrains Mono kiểu chỉ số hệ thống `[ 02 / MODULE ]`.
**Bố cục**
- Nền void, lưới kẻ mảnh (background-image linear-gradient 1px) mờ 6%; khối panel viền line.
- Bento không đều cho tính năng; dải số liệu mono; con số lớn.
**Ảnh**
- Ảnh thật: kiến trúc đêm, ánh đèn, phần cứng cận cảnh — xử lý `grayscale contrast-125` + lớp phủ màu acid/cyan mix-blend-color.
**Khoảng trắng:** Đặc hơn: `py-20`, mật độ thông tin cao nhưng căn lưới chặt.
**Chuyển động mặc định:** Level 3 — Advanced
- `data-spotlight` cho panel, `data-scrub` cho chữ lớn, `data-particles="stars"` mật độ thấp ở hero, `data-gradient-shift` cho một dải CTA.
- `data-cursor="ring"` được phép; `data-tilt` nhẹ (4) cho thẻ.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-type` → `features-bento` → `stats-band` → `story-pinned` → `gallery-masonry` → `cta-sky` → `footer-big`
**Được phép (ghi đè layout-guide mục 3):** lưới kỹ thuật; quầng sáng neon nhỏ
**Tránh:** gradient tím–xanh; robot / não bộ clip-art; glassmorphism tràn lan

### Preset: Neo-Brutalism / Bold (`bold`)
Khối rõ, viền mạnh, chữ khổng lồ, tương phản nổi bật — phá lưới có kiểm soát.

**Hợp với:** agency sáng tạo, portfolio thiết kế, lễ hội / sự kiện trẻ, thương hiệu Gen Z
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `paper` #F2EFE6 · `ink` #0F0F0F · `signal` #FF4D1F · `cobalt` #2340FF · `acid` #E9FF3B
**Font** (Google Fonts): display `Bricolage Grotesque:opsz,wght@12..96,400;12..96,800` · body `Bricolage Grotesque:opsz,wght@12..96,400;12..96,500` · nhãn `Instrument Serif`
**Website tiếng Việt** — thay font thiếu dấu bằng: label `Playfair Display:ital@1`

**Thành phần giao diện**
- Nút khối màu viền 2–3px ink, bóng cứng lệch `shadow-[5px_5px_0_#0F0F0F]`, nhấn xuống khi bấm
- Thẻ viền dày góc vuông; nhãn dán (sticker) bo tròn
**Chữ**
- Một family Bricolage Grotesque: tiêu đề 800 cực lớn (tràn khung, chữ chạm mép), thân 400; điểm nhấn Instrument Serif nghiêng.
**Bố cục**
- Khối màu phẳng full-bleed đổi liên tục (signal → cobalt → paper); chữ khổng lồ chồng lên ảnh.
- Phá lưới có chủ đích: ảnh lệch, chữ xoay 90°, nhãn dán (sticker) bo tròn.
**Ảnh**
- Ảnh thật tương phản mạnh, cắt sát; có thể cắt khung hình tròn / pill.
**Khoảng trắng:** Ít hơn, dày đặc năng lượng nhưng mỗi section một ý.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-marquee` chữ lớn, `data-magnetic` CTA, `data-tilt` thẻ dự án, `data-split="chars"` cho 1 tiêu đề, `data-cursor="dot"` + `data-cursor-label`.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-offset` → `features-bento` → `gallery-masonry` → `stats-band` → `quote-full` → `cta-type` → `footer-big`
**Được phép (ghi đè layout-guide mục 3):** chữ xoay / chồng ảnh; khối màu bão hòa
**Tránh:** pastel nhạt nhòa; bố cục an toàn đối xứng

### Preset: Minimalist (`minimal`)
Tinh giản, khoảng trắng lớn, nội dung là trung tâm.

**Hợp với:** kiến trúc, nội thất, studio thiết kế, tư vấn, sản phẩm phần mềm
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `canvas` #FAFAF8 · `ink` #18181B · `muted` #71717A · `line` #E4E4E7 · `accent` #2F5D50
**Font** (Google Fonts): display `Inter Tight:wght@300;500;600` · body `Inter:wght@400;500`

**Thành phần giao diện**
- Nút chữ nhật bo 2px nền ink hoặc chỉ chữ + gạch chân
- Thẻ không viền, không bóng; đường kẻ 1px màu line
**Chữ**
- Tiêu đề Inter Tight 500, cỡ vừa-lớn (clamp 2.75rem → 5.5rem), tracking-tight; phân cấp bằng cỡ và màu, không bằng nhiều độ đậm.
- Thân 16–17px, leading-[1.7], màu ink/80; tối đa 2 cỡ chữ trong một section.
**Bố cục**
- Lưới 12 cột rộng, căn trái, để trống cả cột; hero-split ảnh lớn một bên.
- Section tách nhau bằng khoảng trắng, không nền màu xen kẽ; đúng một màu nhấn (accent) cho CTA và link.
**Ảnh**
- Ít ảnh nhưng lớn: nền trơn, ánh sáng tự nhiên, tỉ lệ cố định 4:5 / 3:2.
**Khoảng trắng:** Rất rộng: section `py-28 lg:py-40`, mỗi section một ý.
**Chuyển động mặc định:** Level 1 — Basic
- Chỉ `data-reveal="fade"`/`"up"`; hover gạch chân chạy; không parallax / particles / tilt.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-split` → `features-numbered` → `gallery-lookbook` → `quote-full` → `cta-type` → `footer-minimal`
**Tránh:** nhiều màu nhấn; bóng đổ; icon trang trí; khối chữ dày đặc

### Preset: East Asian Inspired (`east-asian`)
Giấy, mực, khoảng lặng — cảm hứng văn hóa Đông Á có chọn lọc.

**Hợp với:** trà đạo / quán trà, nhà hàng Nhật / Hàn / Hoa, văn hóa truyền thống, nhạc cụ dân tộc, ryokan / homestay
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `rice` #F3EEE3 · `ink` #1C1A17 · `sumi` #3A3632 · `vermilion` #B5402F · `jade` #5E7D6B · `gold` #B08D57
**Font** (Google Fonts): display `Shippori Mincho:wght@500;700` · body `Noto Sans:wght@400;500`

**Thành phần giao diện**
- Nút viền 1px ink, góc vuông, chữ giãn
- Con dấu tròn / vuông vermilion làm nhãn; thẻ nền giấy không bóng
**Chữ**
- Tiêu đề serif kiểu Minchō, nét mảnh, cỡ lớn với nhiều khoảng trống; nhãn ngắn có thể đặt dọc (`[writing-mode:vertical-rl]`) — không đặt dọc đoạn văn tiếng Việt / Latin.
- Thân Noto Sans 17px, leading-relaxed; con dấu vermilion làm điểm nhấn duy nhất.
**Bố cục**
- Bất đối xứng, khoảng lặng lớn (ma); ảnh đặt lệch trong lưới; đường kẻ mảnh như khung giấy.
- Dải ảnh ngang như cuộn tranh; khối chữ hẹp đặt cạnh ảnh dọc.
**Ảnh**
- Ảnh thật: chất liệu giấy, gỗ, gốm, trà, kiến trúc truyền thống, bàn tay nghệ nhân; tông ấm trầm, hơi phai.
**Khoảng trắng:** Rất rộng — khoảng trống là một phần của bố cục.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-reveal="clip"` cho ảnh, `data-split="words"` chậm cho 1 tiêu đề, `data-float` nhẹ cho con dấu.
- `data-particles="petals"` ở tối đa một section khi hợp mùa; không tilt / cursor / ripple.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-type` → `story-letter` → `gallery-filmstrip` → `features-numbered` → `quote-full` → `cta-type` → `footer-minimal`
**Được phép (ghi đè layout-guide mục 3):** nhãn chữ dọc ngắn; con dấu đỏ; họa tiết sóng / mây truyền thống nét mảnh làm trang trí trừu tượng
**Tránh:** rồng phượng clip-art; đỏ – vàng chói; font thư pháp giả cho đoạn văn; phủ họa tiết dày đặc

### Preset: Industrial (`industrial`)
Kỹ thuật, lưới rõ ràng, thép và bê tông — mạnh mẽ, đáng tin.

**Hợp với:** nhà máy / sản xuất, xây dựng / vật liệu, cơ khí / kỹ thuật, logistics
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `concrete` #E7E5E1 · `steel` #2B2F33 · `graphite` #121416 · `rust` #C4512B · `safety` #F2B705 · `line` #C9C6C0
**Font** (Google Fonts): display `Barlow Condensed:wght@600;800` · body `Barlow:wght@400;500;600` · nhãn `IBM Plex Mono:wght@400;600`

**Thành phần giao diện**
- Nút chữ nhật góc vuông, chữ hoa, nền rust hoặc graphite
- Thẻ viền 1px không bo; tag mono
**Chữ**
- Tiêu đề Barlow Condensed chữ hoa, rất đậm, khít dòng; nhãn mono kiểu mã kỹ thuật "SPEC 04 / CAPACITY".
- Số liệu (công suất, diện tích, năm) cỡ lớn, đơn vị nhỏ bên cạnh.
**Bố cục**
- Lưới kẻ rõ (border 1px) chia ô; khối thông số dạng bảng; ảnh tràn viền xen dải số liệu.
- Vạch an toàn (sọc chéo safety) chỉ làm điểm nhấn hiếm.
**Ảnh**
- Ảnh thật: nhà máy, máy móc, công trường, công nhân bảo hộ; tương phản cao, tông hơi lạnh.
**Khoảng trắng:** Vừa — mật độ thông tin cao nhưng căn lưới chặt.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-count-to` cho số liệu, `data-reveal="up"`, `data-marquee` cho dải đối tác / chứng nhận, `data-parallax` 0.1 cho ảnh lớn.
- Không particles / clouds / cursor.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-cinematic` → `stats-band` → `features-bento` → `timeline` → `gallery-masonry` → `marquee-band` → `contact-split` → `footer-big`
**Được phép (ghi đè layout-guide mục 3):** sọc chéo an toàn làm điểm nhấn; lưới kẻ hiện rõ
**Tránh:** pastel; bo góc lớn; font viết tay; ảnh văn phòng bóng bẩy

### Preset: Playful / Cartoon (`playful`)
Hình khối vui nhộn, màu tươi, chuyển động sinh động.

**Hợp với:** trường mầm non, trung tâm năng khiếu trẻ em, đồ chơi, kem / bánh kẹo, khu vui chơi
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `cream` #FFF8EC · `ink` #23202B · `berry` #FF5C8A · `sun` #FFC93C · `sky` #4CC3FF · `leaf` #4CD08A · `grape` #7B61FF
**Font** (Google Fonts): display `Baloo 2:wght@600;800` · body `Nunito:wght@400;600;700`

**Thành phần giao diện**
- Nút pill dày, viền ink, bóng cứng lệch `shadow-[4px_4px_0_#23202B]`, nhấn xuống khi bấm
- Thẻ bo 24px viền dày; nhãn dán tròn
**Chữ**
- Tiêu đề Baloo 2 đậm, có thể xoay ±2°; thân Nunito 17px dễ đọc, câu ngắn, giọng thân thiện.
**Bố cục**
- Khối bo lớn viền 2–3px ink, nền màu xen kẽ; hình blob trang trí; sticker nghiêng.
- Lưới lệch vui nhưng nội dung chính vẫn thẳng hàng, dễ đọc.
**Ảnh**
- Ảnh thật sáng sủa: trẻ em / hoạt động / sản phẩm, cắt khung bo tròn hoặc blob; hình khối chỉ để trang trí, không vẽ giả ảnh.
**Khoảng trắng:** Vừa — nhịp nhanh, nhiều nền màu xen kẽ.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-float` cho sticker / blob, `data-tilt="6"` cho thẻ, `data-ripple` cho nút, `data-reveal-stagger` cho lưới.
- Không cảnh ghim, không parallax nặng.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-offset` → `features-bento` → `gallery-masonry` → `timeline` → `quote-full` → `cta-fullbleed` → `footer-big`
**Được phép (ghi đè layout-guide mục 3):** hình blob / sticker trang trí; bóng đổ cứng; xoay nhẹ khối
**Tránh:** màu tối diện rộng; chữ mảnh nhỏ; nhân vật clip-art thay ảnh thật

### Preset: Glassmorphism (`glass`)
Lớp kính mờ trên nền màu sâu — bề mặt phân cấp rõ, có kiểm soát.

**Hợp với:** ứng dụng di động, fintech, SaaS, startup công nghệ
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `deep` #0B1026 · `indigo` #5B6CFF · `cyan` #22D3EE · `rose` #F472B6 · `frost` #E8ECFF · `ink` #F5F7FF · `muted` #A5ADCF
**Font** (Google Fonts): display `Plus Jakarta Sans:wght@500;700;800` · body `Inter:wght@400;500`

**Thành phần giao diện**
- Nút pill gradient indigo → cyan; nút phụ kính viền trắng 20%
- Thẻ kính bo 24px, viền sáng mảnh phía trên
**Chữ**
- Tiêu đề Plus Jakarta Sans 700; gradient chữ chỉ cho một từ; thân Inter màu ink/80, không chữ mảnh trên kính.
**Bố cục**
- Nền deep + 2–3 quầng màu mờ lớn (`blur-3xl`) cố định phía sau; thẻ kính `bg-white/[.06] backdrop-blur-xl border border-white/15`.
- Tối đa 2 cấp lớp kính; bento cho tính năng; ảnh màn hình app trong khung kính.
**Ảnh**
- Ảnh thật người dùng thiết bị / ánh sáng trừu tượng thật; khung bo 24px.
**Khoảng trắng:** Vừa — khối nổi trên nền sâu.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-spotlight` cho thẻ kính, `data-gradient-shift` cho dải CTA, `data-float` cho quầng sáng, `data-reveal="up"`.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-split` → `features-bento` → `stats-band` → `features-tabs` → `quote-full` → `cta-sky` → `footer-big`
**Được phép (ghi đè layout-guide mục 3):** quầng màu mờ nền; kính mờ backdrop-blur; gradient chữ cho một từ
**Tránh:** kính chồng quá 2 lớp; chữ thiếu tương phản trên kính; neon tím – xanh tràn lan

### Preset: Corporate / Professional (`corporate`)
Chuyên nghiệp, đáng tin, dễ đọc — thông tin rõ ràng.

**Hợp với:** tư vấn, luật, tài chính / bảo hiểm, công ty B2B, giới thiệu sản phẩm phần mềm
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `white` #FFFFFF · `mist` #F4F6F8 · `navy` #0F2A47 · `blue` #1F5FBF · `slate` #4A5868 · `line` #DCE2E8 · `gold` #C9A227
**Font** (Google Fonts): display `Lexend:wght@500;600;700` · body `Source Sans 3:wght@400;600`

**Thành phần giao diện**
- Nút chữ nhật bo 6px nền blue; nút phụ viền
- Thẻ trắng viền line bo 8px, bóng rất nhẹ; icon nét đơn
**Chữ**
- Tiêu đề Lexend 600 cỡ vừa phải (clamp 2.5rem → 4.5rem); thân Source Sans 3 17px; phân cấp H1 / H2 / H3 rõ, dòng ≤ 70 ký tự.
**Bố cục**
- Lưới 12 cột đều; hero-split chữ + ảnh người thật làm việc; dải số liệu tin cậy; logo đối tác.
- Nền trắng / mist xen kẽ; một dải navy cho số liệu hoặc CTA.
**Ảnh**
- Ảnh thật con người, văn phòng, buổi làm việc, ánh sáng tự nhiên; tránh ảnh bắt tay dàn dựng.
**Khoảng trắng:** Cân đối: `py-20 lg:py-28`.
**Chuyển động mặc định:** Level 1 — Basic
- `data-reveal="up"`, `data-count-to`, `data-header="shrink"`; hover nâng thẻ nhẹ. Không particles / cursor / tilt.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-split` → `features-numbered` → `stats-band` → `features-tabs` → `quote-full` → `contact-split` → `footer-big`
**Tránh:** hiệu ứng phô trương; màu bão hòa; font trang trí

### Preset: Art Gallery (`gallery`)
Hình ảnh lớn như phòng triển lãm — tác phẩm là trung tâm.

**Hợp với:** phòng tranh, nhiếp ảnh gia, nghệ sĩ, bảo tàng / triển lãm
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `wall` #F7F6F3 · `ink` #0E0E0E · `gray` #8A8780 · `line` #E2DFD8 · `accent` #9C2F2F
**Font** (Google Fonts): display `Cormorant Garamond:ital,wght@0,400;0,600;1,400` · body `Montserrat:wght@400;500`

**Thành phần giao diện**
- Nút chữ + mũi tên; không thẻ
- Đường kẻ mảnh; ảnh góc vuông
**Chữ**
- Tiêu đề Cormorant lớn; tên tác phẩm in nghiêng; nhãn Montserrat chữ hoa 11px như nhãn tường bảo tàng (tác giả · năm · chất liệu).
**Bố cục**
- Ảnh chiếm phần lớn khung, khoảng trắng quanh như vách trưng bày; nhãn tác phẩm nhỏ cạnh ảnh.
- Lightbox cho mọi tác phẩm; điều hướng tối giản, không che ảnh.
**Ảnh**
- Ảnh tác phẩm / chân dung nghệ sĩ / không gian triển lãm — không phủ màu, không lọc làm sai tác phẩm.
**Khoảng trắng:** Rất rộng quanh ảnh.
**Chuyển động mặc định:** Level 1 — Basic
- `data-reveal="clip"` cho ảnh, `data-lightbox`; `data-cursor-label="Xem"` trên ảnh tác phẩm.
- Không particles / parallax / tilt.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-type` → `gallery-lookbook` → `gallery-masonry` → `story-editorial` → `quote-full` → `cta-type` → `footer-minimal`
**Được phép (ghi đè layout-guide mục 3):** con trỏ có nhãn "Xem" trên ảnh tác phẩm
**Tránh:** lớp phủ màu lên tác phẩm; bo góc ảnh; hiệu ứng che tác phẩm

### Preset: Cinematic (`cinematic`)
Kể chuyện như một bộ phim: ảnh tràn khung, nhịp cuộn có chủ đích.

**Hợp với:** du lịch / lữ hành, khu nghỉ dưỡng, phim / sản xuất nội dung, điểm đến
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `black` #0A0A0A · `smoke` #1C1C1C · `bone` #EDE8DF · `ember` #E0723A · `haze` #9AA3A8
**Font** (Google Fonts): display `Oswald:wght@400;600` · body `Inter:wght@400;500` · nhãn `Roboto Mono:wght@400`

**Thành phần giao diện**
- Nút viền mảnh trắng, chữ hoa
- Không thẻ nền; nội dung chồng lên ảnh với gradient đáy
**Chữ**
- Tiêu đề Oswald chữ hoa, cao gầy; phụ đề kiểu khung phim mono "CHAPTER 02 — 05:42 AM"; câu ngắn, giàu hình ảnh.
**Bố cục**
- Ảnh 21:9 / tràn viền nối tiếp như các chương; letterbox đen trên – dưới cho hero.
- Ít nhất một cảnh ghim kể chuyện; chữ đặt trên ảnh với gradient đáy.
**Ảnh**
- Ảnh thật phong cảnh / hành trình rộng, giờ vàng, tương phản mạnh; grade nhẹ `contrast-[1.1] saturate-[.9]`.
**Khoảng trắng:** Ảnh lớn liên tiếp, chữ ít.
**Chuyển động mặc định:** Level 3 — Advanced
- `story-pinned` (`data-scene` + `data-step`), `data-scrub` cho ảnh phóng dần, `data-parallax` hero, `data-split="words"`.
- Không tilt / ripple / con trỏ tùy biến.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-cinematic` → `story-pinned` → `gallery-filmstrip` → `quote-full` → `stats-band` → `cta-fullbleed` → `footer-minimal`
**Được phép (ghi đè layout-guide mục 3):** letterbox đen cho hero; cảnh ghim theo cuộn
**Tránh:** thẻ bo góc kiểu SaaS; nền trắng sáng toàn trang; nhiều màu nhấn

### Preset: Luxury / Premium (`luxury`)
Tinh tế, khoảng trắng có chủ đích, chất liệu cao cấp.

**Hợp với:** khách sạn / biệt thự cao cấp, trang sức / đồng hồ, nước hoa, bất động sản cao cấp
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `ivory` #F6F1E9 · `onyx` #141210 · `taupe` #8C7B6B · `champagne` #C8A96A · `line` #E3D9CA
**Font** (Google Fonts): display `Playfair Display:ital,wght@0,400;0,600;1,400` · body `Manrope:wght@300;400;500`

**Thành phần giao diện**
- Nút viền mảnh, chữ hoa giãn; hover lấp nền chậm
- Không bo góc, không bóng
**Chữ**
- Tiêu đề Playfair Display mảnh, cỡ lớn, một phần in nghiêng; nhãn chữ hoa `tracking-[0.3em]` 11px; thân Manrope 300 / 400.
**Bố cục**
- Đối xứng có kiểm soát; ảnh lớn trong khung mảnh; đường kẻ champagne mảnh; nhịp chậm.
**Ảnh**
- Ảnh sản phẩm / không gian cao cấp, ánh sáng mềm, chi tiết chất liệu cận cảnh.
**Khoảng trắng:** Rất rộng, nhịp chậm.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-reveal="clip"` cho ảnh, `data-parallax` 0.1, `data-split="words"` cho 1 tiêu đề; chuyển động chậm, êm.
- Không particles / tilt / cursor / ripple.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-cinematic` → `story-editorial` → `gallery-lookbook` → `features-alternate` → `quote-full` → `cta-type` → `footer-big`
**Tránh:** vàng chói / gradient vàng; nhiều màu; icon dày; chữ đậm nặng

### Preset: Pastel / Soft (`pastel`)
Màu dịu, hình khối mềm, cảm giác thân thiện.

**Hợp với:** tiệm bánh / tráng miệng, tiệm hoa, mẹ và bé, làm đẹp / nail, cưới hỏi
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `cream` #FFF9F4 · `blush` #F7D6D0 · `peach` #FBE3C8 · `mint` #D5EFE3 · `lilac` #E3DDF6 · `cocoa` #4B3A36 · `rose` #C25E73
**Font** (Google Fonts): display `Quicksand:wght@500;700` · body `Nunito Sans:wght@400;600`

**Thành phần giao diện**
- Nút pill nền rose chữ trắng
- Thẻ trắng bo 24px, bóng mềm
**Chữ**
- Tiêu đề Quicksand 700 bo tròn; thân Nunito Sans màu cocoa — chữ luôn đậm màu, không pastel trên pastel.
**Bố cục**
- Khối bo lớn `rounded-[2rem]`, nền pastel xen kẽ; ảnh khung vòm / tròn; lưới thoáng.
**Ảnh**
- Ảnh thật sáng, tông kem / hồng; sản phẩm cận cảnh, ánh sáng tự nhiên.
**Khoảng trắng:** Rộng vừa, mềm mại.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-float` nhẹ, `data-reveal="up"`, hover nâng thẻ; `data-particles="petals"` tối đa một section khi hợp chủ đề.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-split` → `features-bento` → `gallery-masonry` → `quote-full` → `features-alternate` → `contact-split` → `footer-big`
**Được phép (ghi đè layout-guide mục 3):** hình vòm / tròn; nền pastel xen kẽ
**Tránh:** đen đậm diện rộng; góc vuông sắc; chữ pastel trên nền pastel

### Preset: Dark Premium (`dark-premium`)
Nền tối sâu, tương phản có kiểm soát, ánh sáng điểm nhấn.

**Hợp với:** quán bar / lounge, ô tô / xe cao cấp, rượu / cocktail, thiết bị âm thanh
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `night` #0B0B0D · `panel` #151518 · `line` #26262B · `ink` #ECEAE6 · `muted` #9A968F · `amber` #E2A04B
**Font** (Google Fonts): display `Space Grotesk:wght@400;600;700` · body `Inter:wght@400;500`

**Thành phần giao diện**
- Nút đặc amber chữ night; nút phụ viền line
- Thẻ panel bo 12px, `data-spotlight`
**Chữ**
- Tiêu đề Space Grotesk 600 lớn; số liệu lớn; thân Inter màu ink/75 (không xám quá mờ).
**Bố cục**
- Nền night, panel viền line; quầng sáng amber (radial gradient) sau tiêu đề / sản phẩm.
- Ảnh tối, chủ thể sáng; xen dải panel thông số.
**Ảnh**
- Ảnh low-key: nền tối, ánh sáng viền chủ thể, chi tiết sản phẩm.
**Khoảng trắng:** Rộng — ít khối mà nặng ký.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-spotlight` cho panel, `data-reveal="clip"`, `data-parallax` nhẹ, `data-count-to`.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-cinematic` → `features-bento` → `gallery-lookbook` → `stats-band` → `quote-full` → `cta-fullbleed` → `footer-big`
**Được phép (ghi đè layout-guide mục 3):** quầng sáng radial sau chủ thể
**Tránh:** #000 với chữ trắng tuyền (chói); neon nhiều màu; chữ xám quá mờ

### Preset: Artisan / Handmade (`artisan`)
Thủ công, chất liệu tự nhiên, cá tính của người làm.

**Hợp với:** gốm / làng nghề, cà phê rang xay, đồ da / đồ gỗ thủ công, tiệm bánh thủ công
**Bảng màu** (đưa vào `tailwind.config` dưới đúng các tên này): `kraft` #EDE3D2 · `clay` #A85A34 · `ink` #2D241D · `olive` #6B6B3A · `linen` #F8F3EA · `charcoal` #3B3631
**Font** (Google Fonts): display `Lora:ital,wght@0,500;0,700;1,500` · body `Work Sans:wght@400;500` · nhãn `Patrick Hand`

**Thành phần giao diện**
- Nút bo 6px nền clay
- Nhãn dạng tem / thẻ giấy; viền nét đứt
**Chữ**
- Tiêu đề Lora, một từ in nghiêng; chú thích ngắn viết tay bằng Patrick Hand (đủ dấu tiếng Việt); thân Work Sans.
**Bố cục**
- Như sổ tay xưởng: ảnh viền giấy, chú thích tay, đường kẻ nét đứt; khối lệch nhẹ.
- Quy trình làm tay theo bước (process) là phần kể chuyện chính.
**Ảnh**
- Ảnh thật: bàn tay nghệ nhân, dụng cụ, chất liệu cận cảnh, xưởng; tông ấm.
**Khoảng trắng:** Vừa, ấm, nhịp kể chuyện.
**Chuyển động mặc định:** Level 2 — Atmospheric
- `data-reveal="up"`, `data-reveal="clip"`, `data-float` nhẹ cho nhãn, `data-drag-scroll` cho dải ảnh xưởng.
**Section gợi ý (id trong sections.md, theo thứ tự):** `hero-offset` → `story-letter` → `process-steps` → `gallery-filmstrip` → `features-alternate` → `quote-full` → `contact-split` → `footer-minimal`
**Được phép (ghi đè layout-guide mục 3):** chú thích viết tay ngắn; viền nét đứt / tem giấy
**Tránh:** bóng bẩy công nghệ; gradient; font viết tay cho đoạn dài
