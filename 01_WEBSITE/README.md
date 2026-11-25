# 01 – Website GIAO THỜI

## 1. Vai trò của thư mục

Thư mục `01_WEBSITE/` lưu trữ phần website GIAO THỜI trong repository tổng hợp của dự án nhóm. README này cung cấp thông tin tổng quan để người đọc hiểu website là gì, mã nguồn nằm ở đâu, có những thành phần chính nào và trạng thái bàn giao hiện tại.

Tài liệu này **không thay thế hướng dẫn kỹ thuật**. Cách cài đặt, chạy local, cấu hình biến môi trường và triển khai được trình bày riêng trong [README kỹ thuật của mã nguồn](./BUILD_WEBSITE/README.md).

## 2. Sản phẩm website

Website GIAO THỜI giới thiệu và hỗ trợ phân phối các sản phẩm mang chất liệu, kỹ thuật và cảm hứng truyền thống Việt Nam trong đời sống hiện đại. GIAO THỜI hoạt động theo mô hình phân phối trung gian, kết nối sản phẩm với khách hàng; không mặc định là đơn vị trực tiếp sản xuất.

**Website:** https://giaothoivn.netlify.app

Các khu vực chính của website:

- **Website dành cho khách hàng:** giới thiệu thương hiệu, sản phẩm, bộ sưu tập và nội dung văn hóa.
- **Khu vực quản trị (Admin):** hỗ trợ quản lý nội dung và các hoạt động marketing, với hệ thống đăng nhập và phân quyền.
- **Tích hợp tự động hóa:** kết nối một số chức năng quản trị với các workflow n8n thông qua API trung gian.

## 3. Cấu trúc thư mục

```text
01_WEBSITE/
├── README.md              # Tài liệu tổng quan của phần Website
└── BUILD_WEBSITE/         # Mã nguồn và tài liệu kỹ thuật của website
    ├── src/               # Frontend và khu vực Admin
    ├── public/            # Tài nguyên tĩnh
    ├── api/               # API handler gốc
    ├── netlify/           # Netlify Functions và thư viện dùng chung
    ├── docs/              # Tài liệu dự án
    └── README.md          # Hướng dẫn kỹ thuật, cài đặt và vận hành
```

Chi tiết cấu trúc bên trong `BUILD_WEBSITE/` được mô tả tại [README kỹ thuật](./BUILD_WEBSITE/README.md).

## 4. Công nghệ chính

| Thành phần | Công nghệ / dịch vụ |
|---|---|
| Frontend | React, TypeScript, Vite |
| Giao diện | Tailwind CSS, Lucide React, Motion |
| Xác thực và dữ liệu | Supabase |
| Tích hợp AI | Google Gemini API (dependency có trong dự án; phạm vi sử dụng cần xem theo từng chức năng) |
| Tự động hóa quy trình | n8n |
| Hosting website hiện tại | Netlify |
| Kết nối từ Internet đến n8n | Cloudflare Quick Tunnel |
| Môi trường chạy n8n trong cấu hình hiện tại | Windows, PowerShell |

## 5. Kiến trúc ở mức tổng quan

- Frontend website được build bằng Vite và hiện được cung cấp qua Netlify.
- Supabase được sử dụng cho xác thực và dữ liệu, bao gồm thông tin vai trò người dùng.
- Mã nguồn có các API handler gốc trong `api/` và các bản Netlify Functions trong `netlify/functions/`.
- Các API trung gian có nhiệm vụ kiểm tra phiên, vai trò rồi chuyển tiếp request đến webhook n8n.
- n8n hiện được cấu hình chạy trên máy Windows; Cloudflare Quick Tunnel cung cấp URL HTTPS để API có thể gọi đến n8n từ bên ngoài mạng nội bộ.

Luồng tích hợp dự kiến:

```text
Người dùng / Admin
        |
        v
Frontend website (Netlify)
        |                         |
        |                         +------> Supabase
        |                                  Xác thực / dữ liệu / vai trò
        v
API trung gian (Netlify Functions)
        |
        v
Cloudflare Quick Tunnel
        |
        v
n8n chạy trên máy Windows
        |
        v
Workflow tự động hóa
```

Sơ đồ thể hiện kiến trúc tích hợp được thiết kế trong mã nguồn, không phải bằng chứng rằng mọi API và workflow đều đang hoạt động ổn định trên production.

## 6. Nguồn mã và phạm vi bàn giao

- **Repository mã nguồn gốc:** [giao-thoi-website-v3](https://github.com/gam-tran/giao-thoi-website-v3/tree/fix/content-quality-gate-0f8e-base)
- **Nhánh mã nguồn được sử dụng:** `fix/content-quality-gate-0f8e-base`
- **Bản mã nguồn trong repository tổng hợp:** `01_WEBSITE/BUILD_WEBSITE/`

Repository tổng hợp phục vụ việc tập hợp và bàn giao sản phẩm trong dự án nhóm. Repository nguồn được giữ độc lập; các thay đổi trong repository tổng hợp không tự động cập nhật ngược về repository nguồn.

## 7. Trạng thái hiện tại và lưu ý

- Mã nguồn website và tài liệu kỹ thuật được lưu trong `BUILD_WEBSITE/`.
- Website có địa chỉ truy cập Netlify nêu tại mục 2.
- Cấu hình Netlify Functions và rewrite API đã được thêm vào bản mã nguồn trong repository tổng hợp.
- Việc thêm cấu hình vào repository **chưa xác nhận** rằng bản deploy Netlify đã sử dụng cấu hình mới hoặc các API đã được kiểm thử thành công.
- n8n và Cloudflare Quick Tunnel phụ thuộc vào máy Windows, tiến trình đang chạy và URL tunnel hiện hành.

Khi nghiệm thu hoặc bàn giao, cần phân biệt rõ giữa **mã nguồn đã có**, **cấu hình đã khai báo** và **chức năng đã được kiểm thử thực tế**. Không xem build frontend thành công là bằng chứng cho việc xác thực Admin, API, kết nối n8n hay toàn bộ workflow đã hoạt động.

## 8. Tài liệu kỹ thuật

Mở [`BUILD_WEBSITE/README.md`](./BUILD_WEBSITE/README.md) để xem:

- Yêu cầu môi trường và cách cài đặt dependencies.
- Cách chạy website local, build và kiểm tra TypeScript.
- Danh sách biến môi trường và lưu ý bảo mật.
- Cấu hình Netlify frontend và Netlify Functions.
- Cách khởi động n8n và Cloudflare Quick Tunnel.
- Luồng xử lý webhook và danh sách kiểm thử trước khi xác nhận vận hành.
