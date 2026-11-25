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
- Quản lý các hoạt động liên quan đến nội dung và quy trình phê duyệt.
- Tích hợp API và workflow bên ngoài để hỗ trợ hoạt động vận hành.

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
| Public website hosting | Netlify |
| Public access to local n8n | Cloudflare Quick Tunnel |
| Local operating environment | Windows PowerShell |
| Package management | npm |

### 3.2. Kiến trúc vận hành

Hệ thống sử dụng website, dịch vụ quản lý dữ liệu và workflow automation phối hợp với nhau.

**Website:**

- Frontend được xây dựng bằng React và Vite.
- Mã nguồn được build thành bản production trước khi triển khai.
- Website hiện được truy cập qua Netlify tại `https://giaothoivn.netlify.app`.

**Supabase:**

- Quản lý xác thực tài khoản.
- Hỗ trợ kiểm tra vai trò và phân quyền người dùng.
- Cung cấp kết nối đến dữ liệu của ứng dụng.

**n8n:**

- Chạy trực tiếp trên máy tính Windows, không sử dụng Docker trong cấu hình hiện tại.
- Được khởi động thông qua PowerShell.
- Tiếp nhận và xử lý các yêu cầu webhook từ những chức năng được tích hợp trên website.

**Cloudflare Quick Tunnel:**

- Tạo đường dẫn HTTPS công khai đến dịch vụ n8n đang chạy trên máy tính cá nhân.
- Cho phép website truy cập webhook của n8n thay vì gọi trực tiếp địa chỉ `localhost`.
- Sử dụng địa chỉ dạng `https://<tên-tunnel>.trycloudflare.com`.
- Đây là Quick Tunnel nên địa chỉ có thể thay đổi khi khởi động lại tunnel.

**PowerShell:**

- Sử dụng để khởi động n8n và Cloudflare Tunnel.
- Duy trì các tiến trình cần thiết trong thời gian hệ thống hoạt động.

### 3.3. Luồng kết nối tổng quát

```text
Khách hàng / Người quản trị
          |
          v
     Website GIAO THỜI
        (Netlify)
          |
          |--------------------> Supabase
          |                       |
          |                       v
          |                Authentication
          |                Database / Roles
          |
          v
   Cloudflare Quick Tunnel
          |
          v
     n8n trên máy Windows
       (localhost:5678)
          |
          v
     Workflow automation
          |
          v
   Các dịch vụ bên ngoài
   theo từng workflow
```

Lưu ý: Cloudflare Tunnel chỉ đóng vai trò tạo kết nối từ Internet đến dịch vụ n8n đang chạy cục bộ. Nó không thay thế Netlify để lưu trữ website và cũng không phải nơi chạy n8n trong cấu hình hiện tại.

## 4. Cấu trúc thư mục

```text
BUILD_WEBSITE/
├── api/                    # Các API endpoint và xử lý phía server
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

Tạo file `.env` tại thư mục gốc dựa trên `.env.example`.

Các biến môi trường cần được cấu hình theo những dịch vụ mà ứng dụng sử dụng:

| Biến | Mục đích |
|---|---|
| `VITE_SUPABASE_URL` | Địa chỉ dự án Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public/publishable key của Supabase |
| `GEMINI_API_KEY` | Khóa truy cập Gemini API |
| `APP_URL` | URL triển khai ứng dụng |
| `N8N_BASE_URL` | Địa chỉ truy cập n8n qua Cloudflare Tunnel |
| `N8N_WEBHOOK_KEY` | Khóa xác thực kết nối webhook n8n |

Không phải mọi biến đều được sử dụng ở cùng một môi trường. Những biến cần thiết cho xử lý phía server phải được cấu hình trong môi trường chạy API tương ứng; không đưa private key hoặc thông tin xác thực nhạy cảm vào frontend.

Đối với `N8N_BASE_URL`, cần cập nhật địa chỉ Quick Tunnel hiện đang hoạt động nếu URL thay đổi sau khi khởi động lại Cloudflare Tunnel.

Không commit file `.env`, private key, mật khẩu hoặc thông tin xác thực lên repository công khai.

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

Thư mục kết quả được tạo tại:

```text
dist/
```

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

## 6. Triển khai và vận hành hệ thống

### 6.1. Triển khai website trên Netlify

Website hiện được triển khai trên Netlify.

Đối với repository tổng hợp, nếu triển khai trực tiếp từ repository này, cần cấu hình đúng thư mục dự án:

- **Base directory:** `01_WEBSITE/BUILD_WEBSITE`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Các biến môi trường cần thiết phải được khai báo trong phần cấu hình của nền tảng triển khai.

Sau khi cập nhật mã nguồn, cần thực hiện build và kiểm tra lại website trên đường dẫn production.

### 6.2. Khởi động n8n bằng PowerShell

n8n được chạy trực tiếp trên máy Windows.

Mở một cửa sổ PowerShell và thực hiện:

```powershell
n8n.cmd start
```

Sau khi khởi động, giao diện n8n được truy cập tại:

```text
http://localhost:5678
```

Giữ cửa sổ PowerShell này mở trong thời gian sử dụng n8n.

### 6.3. Khởi động Cloudflare Quick Tunnel

Mở một cửa sổ PowerShell thứ hai và chạy:

```powershell
cloudflared tunnel --url http://localhost:5678
```

Nếu sử dụng file thực thi đã tải về trong thư mục Downloads, có thể chạy:

```powershell
.\cloudflared-windows-amd64.exe tunnel --url http://localhost:5678
```

Sau khi khởi động thành công, Cloudflare sẽ cung cấp một URL HTTPS có dạng:

```text
https://<tên-tunnel>.trycloudflare.com
```

Đây là URL công khai để kết nối đến dịch vụ n8n đang chạy cục bộ.

Cần lưu ý:

- Giữ cả hai cửa sổ PowerShell chạy n8n và Cloudflare Tunnel mở.
- Không tắt tiến trình n8n hoặc tunnel khi cần sử dụng workflow.
- Quick Tunnel có thể tạo URL mới sau khi khởi động lại.
- Khi URL thay đổi, cần cập nhật địa chỉ kết nối trong cấu hình tương ứng của ứng dụng.
- Không đưa webhook key hoặc thông tin xác thực vào tài liệu công khai.

### 6.4. Kết nối website với n8n

Website sử dụng địa chỉ HTTPS do Cloudflare Tunnel cung cấp để gửi yêu cầu đến webhook n8n.

Luồng xử lý tổng quát:

1. Người dùng thực hiện thao tác trên website.
2. Website gửi dữ liệu đến webhook tương ứng.
3. Cloudflare Tunnel chuyển tiếp yêu cầu đến n8n trên máy Windows.
4. n8n tiếp nhận dữ liệu và chạy workflow đã cấu hình.
5. Workflow xử lý và kết nối với các dịch vụ bên ngoài theo từng chức năng.

Khi kiểm thử webhook, cần sử dụng đúng phương thức HTTP, đường dẫn webhook và trạng thái workflow tương ứng. Không mặc định webhook chỉ cần mở URL bằng trình duyệt là có thể hoạt động.

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
- Kiểm tra đăng nhập và khôi phục mật khẩu Admin.
- Kiểm tra phân quyền Admin, Creator, Approver và Publisher.
- Kiểm tra các API phía server.
- Kiểm tra kết nối Supabase.
- Kiểm tra kết nối website với webhook n8n qua Cloudflare Tunnel.
- Kiểm tra các workflow và dịch vụ bên ngoài có liên quan.

Build thành công không đồng nghĩa toàn bộ chức năng, API và tích hợp bên ngoài đã hoạt động. Chỉ cập nhật trạng thái hoàn thành sau khi thực hiện kiểm thử tương ứng.
