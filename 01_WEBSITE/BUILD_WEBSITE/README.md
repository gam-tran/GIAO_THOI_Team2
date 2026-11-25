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

**API trung gian (Netlify Functions)**

- Các API tương thích Netlify Functions được triển khai trong `netlify/functions/`.
- Xác thực phiên Supabase và kiểm tra vai trò người dùng trước khi xử lý request.
- Chuyển tiếp các yêu cầu hợp lệ đến webhook n8n.
- Giữ `N8N_WEBHOOK_KEY`, `SUPABASE_SECRET_KEY` và token đặt lại mật khẩu ở phía server.
- Các URL cũ dạng `/api/...` được giữ thông qua rewrite trong `netlify.toml` để hạn chế thay đổi frontend.

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
Netlify Functions (API Node.js)
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

**Triển khai API:** Các handler gốc trong `api/` sử dụng kiểu Node.js request/response (`req`, `res`). Các handler tương thích Netlify Functions được tổ chức trong `netlify/functions/` và các rewrite được khai báo trong `netlify.toml`. Cấu hình này cho phép giữ nguyên các đường dẫn `/api/...` mà frontend đang sử dụng. Khi triển khai, Netlify cần nhận đúng Base directory, Functions directory và các biến môi trường server tương ứng.

Cloudflare Quick Tunnel chỉ tạo kết nối HTTPS đến n8n đang chạy trên máy Windows; không thay thế nền tảng hosting frontend hoặc môi trường chạy API.

## 4. Cấu trúc thư mục

```text
BUILD_WEBSITE/
├── api/                    # Các API handler gốc được giữ làm mã nguồn tham chiếu
├── netlify/
│   ├── functions/           # Netlify Functions triển khai API serverless
│   │   ├── calendar.ts
│   │   ├── n8n-proxy.ts
│   │   └── admin-reset-password.ts
│   └── lib/
│       └── auth.ts          # Xác thực Supabase và tiện ích proxy n8n
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
├── .env.example            # Mẫu tên biến môi trường, không chứa secret thật
├── netlify.toml             # Build, Functions và rewrite API cho Netlify
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
| `SUPABASE_URL` | Server: URL Supabase |
| `SUPABASE_PUBLISHABLE_KEY` | Server: publishable key dùng để xác thực phiên và truy vấn vai trò |
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
- Khi deploy trên Netlify, khai báo biến server trong Netlify Environment Variables với scope bao gồm **Functions**. Chỉ bật thêm scope **Build** nếu quá trình build thực sự cần biến đó.
- Không commit file `.env`, private key, mật khẩu hoặc token lên repository.
- File `.env.example` cung cấp tên biến và giá trị placeholder để tham khảo. Cần đối chiếu với môi trường thực tế khi cấu hình; tuyệt đối không thay placeholder bằng secret thật rồi commit lên repository.

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

### 6.1. Triển khai website trên Netlify

Website hiện có địa chỉ truy cập Netlify. Khi triển khai từ repository tổng hợp, cấu hình build dự kiến là:

- **Base directory:** `01_WEBSITE/BUILD_WEBSITE`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Cần khai báo các biến frontend cần thiết trong phần Environment Variables của Netlify và chạy deploy lại sau khi thay đổi biến.

Cấu hình build xuất bản frontend từ `dist/`. Việc chạy API được khai báo riêng thông qua Netlify Functions trong `netlify/functions/` và các rewrite trong `netlify.toml`; cần kiểm tra deploy log để xác nhận Netlify đã nhận đúng cấu hình.

### 6.2. Triển khai API bằng Netlify Functions

Trong mã nguồn hiện tại, các API có bản triển khai tương thích Netlify Functions trong `netlify/functions/`:

- `/api/calendar` → Function `calendar`: kết nối các webhook lịch nội dung.
- `/api/n8n/*` → Function `n8n-proxy`: proxy dashboard, AI assistant, content studio, campaign planner, analytics, content library, content approval và automation.
- `/api/admin/reset-password` → Function `admin-reset-password`: đặt lại mật khẩu Admin theo cơ chế xác thực riêng.

Các rewrite được khai báo trong `netlify.toml`. Những đường dẫn `/api/...` được giữ nguyên để frontend hiện tại không phải đổi URL.

Khi cấu hình Netlify:

1. Đặt Base directory là `01_WEBSITE/BUILD_WEBSITE` nếu deploy từ repository tổng hợp.
2. Đặt Functions directory là `netlify/functions` (đã khai báo trong `netlify.toml`).
3. Đảm bảo biến môi trường server có scope **Functions**.
4. Deploy lại sau khi thêm hoặc thay đổi biến môi trường.
5. Kiểm tra từng endpoint API và log của Function sau deploy.

API và các chức năng quản trị sử dụng cơ chế xác thực, phân quyền và biến môi trường riêng. Việc truy cập endpoint được kiểm soát theo phiên Supabase, vai trò người dùng và cấu hình webhook n8n.

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

## 8. Điều kiện vận hành

Để các thành phần website, Admin và workflow hoạt động đồng bộ, môi trường triển khai cần đáp ứng các điều kiện sau:

- Website được build và triển khai với cấu hình Netlify phù hợp.
- Các biến môi trường frontend và server được khai báo đúng phạm vi sử dụng; secret chỉ được lưu ở phía server.
- Supabase cung cấp dịch vụ xác thực, dữ liệu và vai trò theo cấu hình ứng dụng.
- n8n được khởi động trên máy Windows và các workflow cần dùng được kích hoạt trong môi trường n8n.
- Cloudflare Quick Tunnel duy trì kết nối HTTPS đến n8n; giá trị `N8N_BASE_URL` phản ánh URL tunnel hiện hành.
- Webhook path, HTTP method và header xác thực giữa API trung gian và n8n được cấu hình thống nhất.
- Các dịch vụ ngoài như Gemini, GA4 và Facebook sử dụng credentials tương ứng được cấu hình trong môi trường thực thi.

Build frontend, triển khai API, xác thực người dùng và thực thi workflow là các lớp riêng biệt. Mỗi lớp sử dụng cấu hình và quyền truy cập tương ứng trong kiến trúc hệ thống.
