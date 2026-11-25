# 01 – Website GIAO THỜI

## 1. Giới thiệu

Thư mục này lưu trữ mã nguồn website GIAO THỜI trong repository tổng hợp của dự án nhóm.

Website giới thiệu và phân phối các sản phẩm mang chất liệu, kỹ thuật và cảm hứng truyền thống Việt Nam trong đời sống hiện đại. GIAO THỜI hoạt động theo mô hình phân phối trung gian, không phải đơn vị trực tiếp sản xuất toàn bộ sản phẩm.

**Website đang được sử dụng:** https://giaothoivn.netlify.app

## 2. Cấu trúc thư mục

- `BUILD_WEBSITE/`: mã nguồn website, giao diện khách hàng, khu vực Admin, API, tài liệu và cấu hình triển khai.
- `README.md`: tài liệu tổng quan của thư mục Website.

Tài liệu cài đặt, cấu trúc mã nguồn, biến môi trường và hướng dẫn vận hành chi tiết nằm trong [BUILD_WEBSITE/README.md](./BUILD_WEBSITE/README.md).

## 3. Nguồn mã nguồn

- **Repository nguồn:** [giao-thoi-website-v3](https://github.com/gam-tran/giao-thoi-website-v3/tree/fix/content-quality-gate-0f8e-base)
- **Nhánh nguồn:** `fix/content-quality-gate-0f8e-base`
- **Vị trí trong repository tổng hợp:** `01_WEBSITE/BUILD_WEBSITE/`

Mã nguồn được đưa vào repository tổng hợp để phục vụ quản lý, theo dõi và bàn giao bài làm nhóm. Repository nguồn được giữ nguyên độc lập, không bị thay thế bởi bản tổng hợp.

## 4. Công nghệ và các thành phần chính

| Thành phần | Công nghệ / dịch vụ |
|---|---|
| Frontend | React, TypeScript, Vite |
| Giao diện | Tailwind CSS, Lucide React, Motion |
| Xác thực và dữ liệu | Supabase |
| AI integration | Google Gemini API |
| Workflow automation | n8n |
| Hosting website hiện tại | Netlify |
| Kết nối công khai đến n8n | Cloudflare Quick Tunnel |
| Môi trường chạy n8n | Windows PowerShell |

### Kiến trúc vận hành tổng quát

```text
Người dùng
    |
    v
Website GIAO THỜI (Netlify)
    |
    +--------------------> Supabase
    |                       Xác thực / dữ liệu / vai trò
    |
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
Các workflow tự động hóa
```

Cloudflare Quick Tunnel tạo kết nối HTTPS từ Internet đến n8n đang chạy cục bộ. PowerShell được sử dụng để khởi động và duy trì các tiến trình n8n, Cloudflare Tunnel. Quick Tunnel có thể cấp URL khác sau khi khởi động lại.

## 5. Chức năng chính

### Website dành cho khách hàng

- Giới thiệu thương hiệu và câu chuyện GIAO THỜI.
- Trưng bày sản phẩm và bộ sưu tập.
- Chia sẻ nội dung về chất liệu, kỹ thuật và văn hóa truyền thống.
- Hỗ trợ khách hàng tìm hiểu sản phẩm và tiếp cận kênh tư vấn, mua hàng.

### Khu vực Admin

- Đăng nhập và xác thực thông qua Supabase.
- Phân quyền theo các vai trò Admin, Creator, Approver và Publisher.
- Quản lý nội dung và các bước trong quy trình sáng tạo, phê duyệt, xuất bản.
- Kết nối các workflow n8n thông qua API trung gian.

Các chức năng quản trị phụ thuộc vào cấu hình Supabase, biến môi trường server, API và workflow n8n tương ứng.

## 6. Trạng thái mã nguồn và triển khai

- Mã nguồn website đã được đưa vào thư mục `BUILD_WEBSITE/` trong repository tổng hợp.
- Frontend đang được truy cập qua Netlify.
- Các Netlify Functions và cấu hình rewrite API đã được bổ sung trong repository tổng hợp nhằm giữ các đường dẫn API mà frontend đang sử dụng.
- n8n tiếp tục chạy trên máy Windows và được công khai thông qua Cloudflare Quick Tunnel.

**Lưu ý:** Việc thêm mã nguồn Netlify Functions và cấu hình không đồng nghĩa các API đã được deploy và kiểm thử thành công trên môi trường production. Cần cấu hình đầy đủ Environment Variables trong Netlify, deploy lại và kiểm tra thực tế đăng nhập, phân quyền, các API và workflow n8n trước khi xác nhận toàn bộ hệ thống hoạt động.

## 7. Tài liệu chi tiết

Xem [README triển khai và vận hành website](./BUILD_WEBSITE/README.md) để biết:

- Cấu trúc thư mục và công nghệ.
- Cài đặt dependencies, chạy local và build.
- Cấu hình biến môi trường.
- Triển khai frontend và Netlify Functions.
- Khởi động n8n bằng PowerShell.
- Khởi động Cloudflare Quick Tunnel.
- Kiểm thử các chức năng tích hợp.
