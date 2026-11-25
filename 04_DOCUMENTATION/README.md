# Documentation

Thư mục này tập hợp tài liệu kiến trúc, vận hành, bảo mật và hướng dẫn sử dụng các thành phần trong dự án GIAO THỜI.

## 1. Kiến trúc và phát triển

| Nhóm tài liệu | Nội dung |
|---|---|
| Website | Cấu trúc frontend, Admin, API trung gian và hướng dẫn triển khai – [Website README](../01_WEBSITE/BUILD_WEBSITE/README.md) |
| Prompt Engineering | Central Instructions, workflow prompts và quyết định thiết kế – [Prompt Engineering](../02_AI_AGENT/01_PROMPT_ENGINEERING/README.md) |
| Marketing Skills | Bối cảnh thương hiệu và hướng dẫn chuyên môn Marketing – [Marketing Skills](../02_AI_AGENT/02_MARKETING_SKILLS/README.md) |
| Agents | Cấu hình Agent Builder và mapping giữa frontend, Builder và runtime – [Agents](../02_AI_AGENT/03_AGENTS/README.md) |
| Workflows | Danh mục workflow và luồng xử lý – [Workflows](../02_AI_AGENT/04_WORKFLOWS/README.md) |
| Integrations | Kiến trúc tích hợp và đánh giá bảo mật – [Integrations](../02_AI_AGENT/05_INTEGRATIONS/README.md) |
| Admin Dashboard | Các nhóm chức năng quản trị – [Admin Dashboard](../03_ADMIN_DASHBOARD/README.md) |

## 2. Vận hành n8n

| Tài liệu | Nội dung |
|---|---|
| [n8n Credentials Inventory](./n8n-credentials-inventory.md) | Danh mục 10 credentials theo tên và loại xác thực được ghi nhận ngày 18/11/2026; không chứa secret values |
| [n8n Environment and Backup](./n8n-environment-and-backup.md) | Phiên bản runtime, phương thức cài đặt, cấu trúc lưu trữ, backup và nguyên tắc khôi phục theo snapshot ngày 18/11/2026 |

## 3. Nguyên tắc đọc và sử dụng tài liệu

- Tài liệu kiến trúc mô tả vai trò và luồng kết nối giữa các thành phần.
- Tài liệu workflow mô tả đầu vào, xử lý và đầu ra theo cấu hình được ghi nhận.
- Tài liệu prompt và Skills mô tả logic hướng dẫn AI.
- Tài liệu môi trường và backup ghi nhận thông tin tại thời điểm lập hồ sơ; không thay thế kiểm tra trực tiếp trên instance.
- Phân biệt cấu hình trong mã nguồn, cấu hình dịch vụ bên ngoài và kết quả thực thi.
- Không lưu credentials, encryption key, mật khẩu backup hoặc dữ liệu cá nhân trong repository.
