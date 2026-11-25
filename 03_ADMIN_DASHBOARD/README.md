# Admin Dashboard

## Tổng quan

Khu vực Admin là giao diện quản trị của website GIAO THỜI, phục vụ quản lý nội dung và hỗ trợ vận hành các hoạt động Marketing. Mã nguồn giao diện nằm trong thư mục src/admin của BUILD_WEBSITE.

## Nhóm chức năng

- **Quản lý tài khoản và phân quyền:** xác thực Supabase và kiểm soát quyền theo vai trò.
- **Content Management:** quản lý nội dung và thư viện nội dung.
- **Content Calendar:** theo dõi và quản lý lịch nội dung.
- **Content Approval:** hỗ trợ quy trình kiểm duyệt nội dung.
- **AI Assistant:** giao diện trao đổi với trợ lý Marketing.
- **Automation Center:** quản lý workflow, executions, schedules và khởi chạy Content Studio/Campaign Planner.
- **Analytics:** giao diện theo dõi dữ liệu và báo cáo Marketing theo tích hợp hiện có.

## Công nghệ và kết nối

Admin được xây dựng trên React/TypeScript. Các chức năng cần dữ liệu hoặc workflow bên ngoài kết nối qua Supabase và API trung gian của website; các API automation chuyển tiếp đến n8n.

## Tài liệu và mã nguồn

- [Mã nguồn Admin](../01_WEBSITE/BUILD_WEBSITE/src/admin/)
- [Website README](../01_WEBSITE/README.md)
- [AI Agent System](../02_AI_AGENT/README.md)
- [n8n Integration Architecture](../02_AI_AGENT/05_INTEGRATIONS/n8n-integration-architecture.md)

Admin là một phần của website GIAO THỜI; cấu hình quyền và khả năng sử dụng từng chức năng phụ thuộc vào tài khoản và môi trường triển khai.
