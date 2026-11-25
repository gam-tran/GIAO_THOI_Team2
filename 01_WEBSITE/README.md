# 01 – Website GIAO THỜI

## Vai trò

Thư mục này lưu mã nguồn website GIAO THỜI và tài liệu kỹ thuật trong repository tổng hợp.

Website giới thiệu và hỗ trợ phân phối các sản phẩm mang chất liệu, kỹ thuật và cảm hứng truyền thống Việt Nam trong đời sống hiện đại. GIAO THỜI hoạt động theo mô hình phân phối trung gian, không mặc định là đơn vị trực tiếp sản xuất.

**Website:** https://giaothoivn.netlify.app

## Các khu vực chính

- **Website dành cho khách hàng:** trang chủ, sản phẩm, bộ sưu tập, nội dung văn hóa và giới thiệu thương hiệu.
- **Admin:** quản lý nội dung và hoạt động Marketing; truy cập theo tài khoản và vai trò.
- **Tích hợp tự động hóa:** kết nối một số chức năng quản trị với workflow n8n thông qua API trung gian.

## Cấu trúc

```text
01_WEBSITE/
├── README.md
└── BUILD_WEBSITE/
    ├── src/                 # Frontend và Admin
    ├── public/              # Tài nguyên tĩnh
    ├── api/                 # API handlers
    ├── netlify/             # Netlify Functions
    ├── docs/                # Tài liệu và kiến thức thương hiệu
    └── README.md            # Hướng dẫn kỹ thuật
```

## Công nghệ chính

| Thành phần | Công nghệ |
|---|---|
| Frontend | React, TypeScript, Vite |
| UI | Tailwind CSS, Lucide React, Motion |
| Xác thực và dữ liệu | Supabase |
| AI | Google Gemini |
| Workflow automation | n8n |
| Hosting website | Netlify |
| Kết nối n8n | Cloudflare Quick Tunnel |

## Kiến trúc tích hợp

Frontend giao tiếp với Supabase cho xác thực và dữ liệu. Các request cần thực thi workflow được chuyển qua API trung gian; API xác thực phiên và quyền trước khi chuyển tiếp đến webhook n8n thông qua Cloudflare Tunnel.

Chi tiết cấu hình, biến môi trường, lệnh chạy local, build và triển khai được trình bày trong [README kỹ thuật](./BUILD_WEBSITE/README.md).

## Repository nguồn

- [giao-thoi-website-v3](https://github.com/gam-tran/giao-thoi-website-v3/tree/fix/content-quality-gate-0f8e-base)
- Bản mã nguồn được lưu trong [BUILD_WEBSITE](./BUILD_WEBSITE/).

Repository tổng hợp và repository nguồn được quản lý độc lập; thay đổi ở một nơi không tự động cập nhật nơi còn lại.
