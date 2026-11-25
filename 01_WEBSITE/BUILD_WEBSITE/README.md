# GIAO THỜI – WEBSITE

## 1. Giới thiệu dự án

Website GIAO THỜI là nền tảng giới thiệu và phân phối các sản phẩm mang chất liệu, kỹ thuật và cảm hứng truyền thống Việt Nam trong đời sống hiện đại.

GIAO THỜI hoạt động theo mô hình phân phối trung gian, kết nối các sản phẩm truyền thống với khách hàng có nhu cầu sử dụng, trang trí hoặc tìm kiếm quà tặng mang dấu ấn văn hóa Việt.

Website được xây dựng nhằm:

- Giới thiệu thương hiệu, định hướng và câu chuyện GIAO THỜI.
- Trưng bày sản phẩm, bộ sưu tập và thông tin liên quan.
- Giúp khách hàng tìm hiểu đặc điểm, giá trị và tính ứng dụng của sản phẩm.
- Hỗ trợ khách hàng tiếp cận kênh tư vấn và mua hàng.
- Cung cấp nền tảng quản trị và hỗ trợ các hoạt động marketing, vận hành nội dung.

Website: https://giaothoivn.netlify.app

## 2. Các khu vực chức năng

### 2.1. Website dành cho khách hàng

- **Trang chủ (Home):** Giới thiệu thương hiệu, nội dung nổi bật và các sản phẩm được giới thiệu.
- **Sản phẩm (Products):** Hiển thị danh mục sản phẩm và thông tin chi tiết.
- **Bộ sưu tập (Collections):** Sắp xếp và giới thiệu sản phẩm theo các nhóm chủ đề.
- **Văn hóa (Culture):** Truyền tải các nội dung liên quan đến chất liệu, kỹ thuật và giá trị văn hóa truyền thống.
- **Giới thiệu (About):** Cung cấp thông tin về thương hiệu và định hướng hoạt động.
- **Tương tác và mua hàng:** Hỗ trợ các thao tác tìm kiếm, xem chi tiết sản phẩm, giỏ hàng và quy trình đặt hàng theo chức năng được triển khai.

### 2.2. Khu vực quản trị (Admin)

Mã nguồn bao gồm khu vực quản trị riêng, được tổ chức trong `src/admin` và các API tương ứng.

Các thành phần đáng chú ý:

- Xác thực tài khoản quản trị thông qua Supabase.
- Kiểm tra vai trò và quyền truy cập của người dùng.
- Hỗ trợ các vai trò: Admin, Creator, Approver và Publisher.
- Hỗ trợ quy trình khôi phục và cập nhật mật khẩu.
- Tích hợp các API phục vụ hoạt động quản trị và kết nối workflow bên ngoài.

Việc truy cập các chức năng quản trị phụ thuộc vào tài khoản, vai trò và cấu hình hệ thống.

## 3. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | React 19, TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| UI / Icons | Lucide React |
| Animation | Motion |
| Backend API | Vercel Functions / Node.js |
| Authentication & Database | Supabase |
| AI integration | Google Gemini API |
| Workflow integration | n8n |
| Deployment | Vercel / các nền tảng hosting phù hợp |

Danh sách trên mô tả các công nghệ và tích hợp được khai báo trong mã nguồn; việc một chức năng hoạt động thực tế còn phụ thuộc vào cấu hình dịch vụ tương ứng.

## 4. Cấu trúc thư mục

```text
BUILD_WEBSITE/
├── api/                    # API endpoints và xử lý phía server
├── docs/                   # Tài liệu và kiến thức thương hiệu
├── public/                 # Tài nguyên tĩnh, hình ảnh
├── src/
│   ├── admin/              # Giao diện và logic quản trị
│   │   ├── pages/          # Các trang quản trị
│   │   └── utils/          # Tiện ích quản trị
│   ├── assets/             # Tài nguyên giao diện
│   ├── components/         # Các thành phần giao diện dùng chung
│   ├── config/             # Cấu hình ứng dụng
│   ├── context/            # Quản lý trạng thái và context
│   ├── data/               # Dữ liệu ứng dụng
│   ├── lib/                # Thư viện và kết nối dịch vụ
│   ├── pages/              # Các trang website
│   ├── types/              # Định nghĩa kiểu dữ liệu TypeScript
│   ├── App.tsx             # Thành phần ứng dụng chính
│   ├── main.tsx            # Entry point
│   └── index.css           # CSS toàn cục
├── .env.example            # Mẫu biến môi trường
├── index.html              # HTML entry point
├── package.json            # Dependencies và scripts
├── tsconfig.json           # Cấu hình TypeScript
└── vite.config.ts          # Cấu hình Vite
```

## 5. Cài đặt và chạy website

### 5.1. Yêu cầu môi trường

- Node.js tương thích với Vite 8.
- npm.
- Git (nếu clone mã nguồn từ GitHub).

### 5.2. Cài đặt dependencies

Mở terminal tại thư mục `BUILD_WEBSITE` và chạy:

```bash
npm install
```

### 5.3. Cấu hình biến môi trường

Tạo file `.env` tại thư mục gốc dựa trên `.env.example`.

Các biến môi trường cần được cấu hình tùy theo dịch vụ sử dụng:

| Biến | Mục đích |
|---|---|
| VITE_SUPABASE_URL | Địa chỉ dự án Supabase |
| VITE_SUPABASE_PUBLISHABLE_KEY | Public/publishable key của Supabase |
| GEMINI_API_KEY | Khóa truy cập Gemini API |
| APP_URL | URL triển khai ứng dụng |
| N8N_BASE_URL | Địa chỉ n8n |
| N8N_WEBHOOK_KEY | Khóa xác thực kết nối webhook n8n |

Một số biến được sử dụng ở phía server cần được cấu hình trong môi trường triển khai, không đưa trực tiếp vào mã nguồn frontend.

Không commit file `.env`, private key, mật khẩu hoặc thông tin xác thực lên repository công khai.

### 5.4. Chạy website ở môi trường phát triển

```bash
npm run dev
```

Vite mặc định được cấu hình chạy tại cổng `3000`.

Truy cập:

```text
http://localhost:3000
```

### 5.5. Build website

Để kiểm tra và tạo bản build production:

```bash
npm run build
```

Thư mục kết quả được tạo tại:

```text
dist/
```

### 5.6. Xem thử bản build

Sau khi build thành công, chạy:

```bash
npm run preview
```

### 5.7. Kiểm tra TypeScript

```bash
npm run lint
```

Lệnh này chạy TypeScript compiler với chế độ kiểm tra kiểu dữ liệu, không thực hiện build production.

## 6. Triển khai website

Dự án sử dụng Vite để build frontend và có các API endpoint phục vụ xử lý phía server.

Khi triển khai trên Vercel, cần lưu ý:

- Thiết lập đúng thư mục dự án là `01_WEBSITE/BUILD_WEBSITE` nếu triển khai từ repository tổng hợp.
- Cấu hình build command: `npm run build`.
- Cấu hình output directory: `dist`.
- Khai báo đầy đủ Environment Variables trên nền tảng triển khai.
- Kiểm tra cấu hình Supabase Authentication, quyền truy cập và các API liên quan.
- Kiểm tra kết nối n8n và các dịch vụ bên ngoài nếu chức năng tương ứng được sử dụng.

Việc build thành công không đồng nghĩa tất cả API, xác thực và tích hợp bên ngoài đã hoạt động. Cần kiểm thử các chức năng sau khi triển khai.

## 7. Nguồn mã nguồn và tài liệu

**Repository nguồn:**

https://github.com/gam-tran/giao-thoi-website-v3/tree/fix/content-quality-gate-0f8e-base

**Repository tổng hợp của dự án:**

https://github.com/gam-tran/GIAO_THOI_Team2/tree/main/01_WEBSITE/BUILD_WEBSITE

**Tài liệu thương hiệu:**

`docs/brand-knowledge.md`

Repository tổng hợp lưu trữ mã nguồn website phục vụ việc quản lý, theo dõi và bàn giao sản phẩm trong khuôn khổ dự án nhóm. Repository nguồn được giữ nguyên độc lập.

## 8. Trạng thái kiểm thử

Mã nguồn đã được đưa vào repository tổng hợp theo cấu trúc dự án. Các bước kiểm thử build production, xác thực Admin, phân quyền, API và tích hợp dịch vụ cần được thực hiện để xác nhận khả năng vận hành đầy đủ của phiên bản tại repository này.

Không sử dụng trạng thái "đã kiểm thử thành công" khi chưa thực hiện kiểm thử tương ứng.
