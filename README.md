# Layout Skill — tạo website ngay trong chat với Claude

Skill cho **Claude Code**: mô tả website bằng lời (hoặc đính kèm tài liệu SRS) → Claude dựng một website nhiều trang hoàn chỉnh (HTML + Tailwind + JS thuần), có ảnh thật, hiệu ứng, menu điện thoại, form demo. Không cần giao diện hay server, mọi thứ diễn ra trong phiên chat.

## Cần có

- **Claude Code** (CLI, extension VS Code hoặc app desktop) đã đăng nhập.
- **Node.js 18 trở lên**, kiểm bằng `node --version`. Chưa có thì tải ở https://nodejs.org. Script của skill chỉ dùng Node có sẵn, **không cần `npm install`**.

## Cài (một lần)

Windows: chuột phải `install.ps1` → **Run with PowerShell**, hoặc:

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

macOS / Linux / Git Bash:

```sh
sh install.sh
```

Script chép hai thư mục vào `~/.claude/skills/`:

| Thư mục | Vai trò |
|---|---|
| `layout-builder/` | Skill chính: quy trình dựng, 18 phong cách, thư viện hiệu ứng / tương tác, script tìm ảnh và kiểm lỗi |
| `design-taste-frontend/` | Skill thẩm mỹ mà layout-builder gọi khi dựng (giúp giao diện không bị "trông như AI") |

Muốn cài tay thì chép hai thư mục trên vào `C:\Users\<tên>\.claude\skills\` (Windows) hoặc `~/.claude/skills/` (macOS / Linux).

**Ảnh đẹp hơn (tùy chọn):** trong `~/.claude/skills/layout-builder/`, đổi `.env.example` thành `.env` rồi điền khóa Pexels hoặc Unsplash (đều miễn phí). Không điền thì skill dùng Openverse, cũng là ảnh thật nhưng ít lựa chọn hơn.

## Dùng

Mở Claude Code ở thư mục muốn chứa website rồi gõ:

```
/layout-builder Website cho tiệm bánh "Mây Bakery" ở Đà Lạt, phong cách ấm áp vintage, tiếng Việt, có trang menu, câu chuyện, liên hệ
```

Không cần gõ `/layout-builder`: nói "làm cho tui website giới thiệu …" là Claude cũng tự gọi skill.

Thiếu thông tin cũng không sao, Claude tự đề xuất phần còn thiếu và không hỏi lại. Có thể nói thêm:

- **Phong cách:** editorial, minimalist, nature, vintage, east-asian, futuristic, industrial, playful, dreamy, glassmorphism, corporate, art-gallery, neo-brutalism, cinematic, luxury, pastel, dark-premium, artisan
- **Ngôn ngữ website:** vi / en / zh / ja
- **Mức chuyển động:** 1 (nhẹ), 2 (vừa), 3 (nổi bật)
- Màu (mã HEX), font, danh sách trang / section, nơi lưu ("lưu vào D:\web\may-bakery")

**Từ tài liệu:** đính kèm hoặc chỉ đường dẫn file SRS / mô tả dự án (PDF, DOCX, XLSX, MD, TXT):

```
/layout-builder Làm website từ tài liệu D:\docs\srs-trung-tam-anh-ngu.docx
```

Claude đọc tài liệu, tóm tắt phần đã rõ, hỏi **một lần** (tối đa 6 câu, mỗi câu kèm đề xuất). Gõ `ok` để dùng đề xuất, rồi Claude dựng.

**Sửa sau khi dựng**, cùng phiên hay phiên sau đều được:

```
/layout-builder Sửa website ở ./may-bakery: hero tối quá, đổi ảnh hero sang bánh mì mới ra lò, thêm trang FAQ
```

## Kết quả

```
<tên-thương-hiệu>/
├── info.json          # tên, tagline, mô tả
├── docs/request.md    # brief Claude đã chốt (dùng lại khi sửa)
├── docs/README.md     # danh sách trang, ảnh cần thay, giới hạn
└── web/
    ├── index.html     # ← mở file này bằng trình duyệt
    ├── pages/*.html
    └── assets/        # css, js, img (+ CREDITS.md nguồn ảnh)
```

Ảnh dùng bằng link ngoài và form liên hệ chỉ là **bản demo**. Trước khi đưa lên web thật, thay ảnh bằng ảnh của khách và gắn backend cho form (`docs/README.md` liệt kê những chỗ cần làm).

## Mẹo

- Có Playwright MCP (plugin `playwright` của Claude Code) thì Claude tự chụp màn hình website ở cỡ máy tính và điện thoại để soát và sửa. Không có thì Claude chỉ kiểm lỗi bằng script, bạn tự mở `web/index.html` để xem.
- Một website 5–7 trang tốn khá nhiều lượt dùng. Muốn nhanh và tiết kiệm thì nói rõ "chỉ 1 trang landing" hoặc "3 trang".
