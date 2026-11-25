# GIAO THỜI – WEBSITE

## 1. Giới thiệu dự án

Website GIAO THỜI là nền tảng giới thiệu và phân phối các sản phẩm mang chất liệu, kỹ thuật và cảm hứng truyền thống Việt Nam trong đời sống hiện đại.

GIAO THỜI hoạt động theo mô hình phân phối trung gian, kết nối các sản phẩm truyền thống với khách hàng có nhu cầu sử dụng, trang trí hoặc tìm kiếm quà tặng mang dấu ấn văn hóa Việt.

Website được xây dựng nhằm:

- Giới thiệu thương hiệu, định hướng và câu chuyện GIAO THỜI.
- Trưng bày sản phẩm, bộ sưu tập và thông tin liên quan.
- Giúp khách hàng tìm hiểu đặc điểm, giá trị và tính ứng dụng của sản phẩm.
- Hỗ trợ khách hàng tiếp cận các kênh tư vấn và mua hàng.
- Cung cấp nền tảng quản trị, hỗ trợ hoạt động marketing và vận hành nội dung.

**Website:** https://giaothoivn.netlify.app

## 2. Các khu vực chức năng

### 2.1. Website dành cho khách hàng

- **Trang chủ (Home):** Giới thiệu thương hiệu, nội dung nổi bật và các sản phẩm được giới thiệu.
- **Sản phẩm (Products):** Hiển thị danh mục sản phẩm và thông tin chi tiết.
- **Bộ sưu tập (Collections):** Sắp xếp và giới thiệu sản phẩm theo các nhóm chủ đề.
- **Văn hóa (Culture):** Truyền tải nội dung liên quan đến chất liệu, kỹ thuật và giá trị văn hóa truyền thống.
- **Giới thiệu (About):** Cung cấp thông tin về thương hiệu và định hướng hoạt động.
- **Tương tác và mua hàng:** Hỗ trợ tìm kiếm, xem chi tiết sản phẩm, giỏ hàng và các thao tác đặt hàng theo chức năng được triển khai.

### 2.2. Khu vực quản trị (Admin)

Mã nguồn bao gồm khu vực quản trị riêng, được tổ chức trong `src/admin` và các API tương ứng.

Các thành phần đáng chú ý:

- Xác thực tài khoản thông qua Supabase.
- Kiểm tra vai trò và quyền truy cập của người dùng.
- Hỗ trợ các vai trò: Admin, Creator, Approver và Publisher.
- Hỗ trợ quy trình khôi phục và cập nhật mật khẩu.
- Quản lý các hoạt động liên quan đến nội dung, lịch nội dung và quy trình phê duyệt.
- Tích hợp API trung gian để kết nối workflow n8n.

Việc truy cập các chức năng quản trị phụ thuộc vào tài khoản, vai trò và cấu hình hệ thống.

## 3. Công nghệ và kiến trúc hệ thống

### 3.1. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | React 19, TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| UI / Icons | Lucide React |
| Animation | Motion |
| Authentication & Database | Supabase |
| AI integration | Google Gemini API |
| Workflow automation | n8n |
| Website hosting hiện tại | Netlify |
| Public access đến n8n | Cloudflare Quick Tunnel |
| Môi trường chạy n8n | Windows, PowerShell |
| Package management | npm |

### 3.2. Vai trò của từng thành phần

**Website (Netlify)**

- Frontend được xây dựng bằng React và Vite.
- Mã nguồn được build thành thư mục `dist/` trước khi triển khai.
- Website hiện được truy cập tại `https://giaothoivn.netlify.app`.

**Supabase**

- Xác thực tài khoản người dùng.
- Lưu trữ và truy vấn dữ liệu ứng dụng.
- Quản lý bảng vai trò `user_roles`, phục vụ kiểm tra quyền Admin, Creator, Approver và Publisher.

**API trung gian**

- Các endpoint được tổ chức trong thư mục `api/`.
- Tiếp nhận yêu cầu từ frontend, xác thực phiên Supabase và kiểm tra quyền người dùng.
- Gửi yêu cầu đến webhook n8n.
- Giữ `N8N_WEBHOOK_KEY` ở phía server thay vì đưa khóa này vào frontend.

**n8n**

- Chạy trực tiếp trên máy tính Windows trong cấu hình hiện tại.
- Được khởi động bằng PowerShell.
- Tiếp nhận webhook và thực thi các workflow tự động hóa.

**Cloudflare Quick Tunnel**

- Tạo URL HTTPS công khai chuyển tiếp yêu cầu đến n8n đang chạy tại `localhost:5678`.
- Cho phép API trung gian kết nối đến n8n từ bên ngoài mạng nội bộ.
- Quick Tunnel có thể tạo URL mới sau khi khởi động lại; khi đó cần cập nhật biến môi trường `N8N_BASE_URL`.

**PowerShell**

- Dùng để khởi động n8n và Cloudflare Tunnel.
- Duy trì các tiến trình trong thời gian cần vận hành workflow.

### 3.3. Luồng kết nối

```text
Người dùng / Admin
        |
        v
Website GIAO THỜI (Netlify)
        |
        +----------------------> Supabase
        |                         |
        |                         v
        |                 Authentication
        |                 Database / Roles
        |
        v
API trung gian (Node.js)
        |
        v
Cloudflare Quick Tunnel
        |
        v
n8n trên máy Windows
(localhost:5678)
        |
        v
Các workflow tự động hóa
        |
        v
Dịch vụ bên ngoài theo từng workflow
```

**Lưu ý về triển khai API:** Frontend đang được host trên Netlify, nhưng các file trong `api/` hiện được viết theo dạng Node.js handler sử dụng `req`, `res` và `process.env`. Cấu trúc này không tự động trở thành Netlify Functions chỉ vì thư mục có tên `api`. Repository hiện chưa có cấu hình Netlify Functions được xác nhận. Vì vậy, cần triển khai API trên một môi trường tương thích hoặc chuyển đổi sang định dạng Netlify Functions trước khi khẳng định toàn bộ chức năng Admin và proxy n8n hoạt động trên production.

Cloudflare Quick Tunnel chỉ tạo kết nối đến n8n; không thay thế nền tảng hosting frontend hoặc môi trường chạy API.

## 4. Cấu trúc thư mục

```text
BUILD_WEBSITE/
├── api/
│   ├── _lib/               # Hàm xác thực và tiện ích dùng chung phía server
│   ├── admin/              # API quản trị, ví dụ khôi phục mật khẩu
│   └── n8n/                # API trung gian kết nối các workflow n8n
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
├── .env.example            # Mẫu biến môi trường (hiện chưa liệt kê đầy đủ)
├── index.html              # HTML entry point
├── package.json            # Dependencies và scripts
├── tsconfig.json           # Cấu hình TypeScript
└── vite.config.ts          # Cấu hình Vite
```

## 5. Cài đặt và chạy website

### 5.1. Yêu cầu môi trường

- Windows.
- Node.js tương thích với Vite 8.
- npm.
- Git (nếu clone mã nguồn từ GitHub).
- PowerShell.

### 5.2. Cài đặt dependencies

Mở PowerShell hoặc Terminal tại thư mục `BUILD_WEBSITE` và chạy:

```powershell
npm install
```

### 5.3. Cấu hình biến môi trường

Tạo file `.env` tại thư mục gốc để chạy local. Không sử dụng file này để lưu hoặc chia sẻ thông tin bí mật trong repository.

Các biến được mã nguồn tham chiếu gồm:

| Biến | Phạm vi / mục đích |
|---|---|
| `VITE_SUPABASE_URL` | Frontend: URL dự án Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Frontend: publishable key dùng để khởi tạo Supabase client |
| `SUPABASE_URL` | Server: URL Supabase; API cũng có thể dùng `VITE_SUPABASE_URL` làm giá trị dự phòng |
| `SUPABASE_PUBLISHABLE_KEY` | Server: publishable key dùng để xác thực phiên và truy vấn vai trò; có thể dùng `VITE_SUPABASE_PUBLISHABLE_KEY` làm giá trị dự phòng |
| `SUPABASE_SECRET_KEY` | Server: khóa bí mật có quyền quản trị Supabase, chỉ dùng cho API đặt lại mật khẩu |
| `ADMIN_PASSWORD_RESET_EMAIL` | Server: email tài khoản Admin được phép sử dụng chức năng đặt lại mật khẩu đặc biệt |
| `ADMIN_PASSWORD_RESET_TOKEN` | Server: token xác thực riêng cho chức năng đặt lại mật khẩu; mã nguồn yêu cầu tối thiểu 32 ký tự |
| `N8N_BASE_URL` | Server: URL Cloudflare Tunnel đang chuyển tiếp đến n8n |
| `N8N_WEBHOOK_KEY` | Server: khóa gửi kèm request đến webhook n8n |
| `GEMINI_API_KEY` | Khóa Gemini; có trong `.env.example`, cần kiểm tra chức năng sử dụng trước khi cấu hình production |
| `APP_URL` | URL ứng dụng; có trong `.env.example`, cần đối chiếu nơi sử dụng khi triển khai |

**Lưu ý bảo mật:**

- Các biến có tiền tố `VITE_` được đưa vào bundle frontend khi build. Chỉ đặt ở đó các giá trị được phép công khai, chẳng hạn Supabase URL và publishable key.
- Không đặt `SUPABASE_SECRET_KEY`, `ADMIN_PASSWORD_RESET_TOKEN` hoặc `N8N_WEBHOOK_KEY` trong biến `VITE_` hay mã frontend.
- Các biến server phải được khai báo trong môi trường chạy API, không chỉ trong cấu hình build frontend.
- Không commit file `.env`, private key, mật khẩu hoặc token lên repository.
- File `.env.example` hiện chưa phản ánh đầy đủ các biến mà mã nguồn API yêu cầu; cần bổ sung mẫu tên biến và mô tả, tuyệt đối không điền giá trị bí mật thật.

### 5.4. Chạy website ở môi trường phát triển

```powershell
npm run dev
```

Vite được cấu hình chạy tại cổng `3000`.

Truy cập:

```text
http://localhost:3000
```

### 5.5. Build website

```powershell
npm run build
```

Thư mục kết quả được tạo tại `dist/`.

### 5.6. Xem thử bản build

Sau khi build thành công:

```powershell
npm run preview
```

### 5.7. Kiểm tra TypeScript

```powershell
npm run lint
```

Lệnh này chạy TypeScript compiler với chế độ kiểm tra kiểu dữ liệu, không thực hiện build production.

## 6. Triển khai và vận hành

### 6.1. Triển khai frontend trên Netlify

Website hiện được truy cập qua Netlify. Khi triển khai repository tổng hợp, cấu hình build dự kiến là:

- **Base directory:** `01_WEBSITE/BUILD_WEBSITE`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Cần khai báo các biến frontend cần thiết trong phần Environment Variables của Netlify và chạy deploy lại sau khi thay đổi biến.

Cấu hình trên chỉ mô tả việc build và xuất bản frontend. Nó không tự triển khai các API trong thư mục `api/`.

### 6.2. Triển khai API

Các API hiện có bao gồm:

- `/api/calendar`: kết nối các webhook lịch nội dung.
- `/api/n8n/[route]`: proxy các workflow như dashboard, AI assistant, content studio, campaign planner, analytics, content library, content approval và automation.
- `/api/n8n/giaothoi-dashboard`: endpoint dashboard.
- `/api/admin/reset-password`: endpoint đặt lại mật khẩu Admin theo cơ chế xác thực riêng.

Các handler sử dụng giao diện request/response kiểu Node.js. Khi triển khai, cần chọn nền tảng tương thích với cấu trúc handler này hoặc chuyển đổi chúng sang định dạng functions mà nền tảng yêu cầu.

Không coi các endpoint trên đã hoạt động production chỉ dựa vào việc frontend build thành công. Cần kiểm tra từng endpoint sau khi cấu hình môi trường chạy API.

### 6.3. Khởi động n8n bằng PowerShell

n8n chạy trực tiếp trên máy Windows trong cấu hình hiện tại.

Mở một cửa sổ PowerShell và chạy:

```powershell
n8n.cmd start
```

Sau khi khởi động, giao diện n8n được truy cập tại:

```text
http://localhost:5678
```

Giữ cửa sổ PowerShell này mở trong thời gian cần sử dụng workflow.

### 6.4. Khởi động Cloudflare Quick Tunnel

Mở một cửa sổ PowerShell thứ hai và chạy:

```powershell
cloudflared tunnel --url http://localhost:5678
```

Nếu sử dụng file thực thi đã tải về trong thư mục hiện tại, chạy theo đúng tên file đã tải, ví dụ:

```powershell
.\cloudflared-windows-amd64.exe tunnel --url http://localhost:5678
```

Sau khi khởi động thành công, Cloudflare cung cấp URL HTTPS có dạng:

```text
https://<ten-tunnel>.trycloudflare.com
```

Cập nhật URL này vào biến môi trường server `N8N_BASE_URL` (không thêm đường dẫn webhook cụ thể vào biến nếu mã nguồn tự nối đường dẫn).

Cần lưu ý:

- Giữ cả hai cửa sổ PowerShell chạy n8n và Cloudflare Tunnel mở.
- Không tắt tiến trình n8n hoặc tunnel khi cần sử dụng workflow.
- Quick Tunnel có thể tạo URL mới sau khi khởi động lại.
- Khi URL thay đổi, cập nhật `N8N_BASE_URL` trong môi trường chạy API và khởi động lại hoặc redeploy API nếu cần.
- Không công khai webhook key hoặc thông tin xác thực.

### 6.5. Luồng xử lý webhook

1. Người dùng thực hiện thao tác trên website.
2. Frontend gửi request đến API trung gian.
3. API kiểm tra phiên Supabase và vai trò người dùng.
4. API gửi request đến webhook n8n thông qua Cloudflare Tunnel, kèm header xác thực `X-GIAO-THOI-KEY`.
5. n8n thực thi workflow tương ứng và trả kết quả về API.
6. API trả kết quả cho frontend.

Cần bảo đảm workflow n8n đã được kích hoạt và đường dẫn webhook, phương thức HTTP, header xác thực khớp với cấu hình trong mã nguồn.

## 7. Nguồn mã nguồn và tài liệu

**Repository nguồn:**

https://github.com/gam-tran/giao-thoi-website-v3/tree/fix/content-quality-gate-0f8e-base

**Repository tổng hợp của dự án:**

https://github.com/gam-tran/GIAO_THOI_Team2/tree/main/01_WEBSITE/BUILD_WEBSITE

**Tài liệu thương hiệu:**

`docs/brand-knowledge.md`

Repository tổng hợp lưu trữ mã nguồn website phục vụ việc quản lý, theo dõi và bàn giao sản phẩm trong khuôn khổ dự án nhóm. Repository nguồn được giữ nguyên độc lập.

## 8. Trạng thái kiểm thử

Mã nguồn website đã được đưa vào repository tổng hợp theo cấu trúc dự án.

Các nội dung cần kiểm thử để xác nhận khả năng vận hành đầy đủ gồm:

- Cài đặt dependencies và build production.
- Kiểm tra các trang giao diện dành cho khách hàng.
- Kiểm tra đăng nhập, khôi phục mật khẩu và cập nhật mật khẩu Admin.
- Kiểm tra phân quyền Admin, Creator, Approver và Publisher.
- Kiểm tra API trung gian và môi trường triển khai API.
- Kiểm tra kết nối Supabase.
- Kiểm tra kết nối API với webhook n8n qua Cloudflare Tunnel.
- Kiểm tra các workflow và dịch vụ bên ngoài có liên quan.

Build frontend thành công không đồng nghĩa API, xác thực Admin và các workflow bên ngoài đã hoạt động. Chỉ cập nhật trạng thái hoàn thành sau khi thực hiện kiểm thử tương ứng.
