# Prompt Engineering

Thư mục này lưu các prompt và cấu trúc đầu vào có nguồn gốc kiểm chứng được hoặc được đánh dấu rõ là bản đề xuất trong quá trình phát triển GIAO THỜI AI.

## Prompt và tài liệu cấu hình

| Tài liệu | Nội dung | Trạng thái |
|---|---|---|
| [marketing-ai-agent-instructions-v1.md](./marketing-ai-agent-instructions-v1.md) | Bản Instructions chuẩn hóa đề xuất cho GIAO THỜI – Marketing AI Agent | Draft – cần kiểm thử trong Builder |
| [frontend-suggested-prompts.md](./frontend-suggested-prompts.md) | 4 prompt gợi ý hiển thị trong giao diện Marketing AI Assistant | Đã đối chiếu mã nguồn |
| [workflow-input-templates.md](./workflow-input-templates.md) | Các trường brief, giá trị mặc định và payload gửi từ Automation Center tới Content Studio/Campaign Planner | Đã đối chiếu mã nguồn |

## Chưa xác minh được

Chưa có bản export workflow n8n hoặc cấu hình node AI được cung cấp trong repository để xác minh:
- System Prompt thực tế của webhook `giaothoi-ai-assistant`.
- Prompt/template nằm bên trong các workflow Content Studio và Campaign Planner.
- Model, memory, tools và cơ chế nạp Marketing Skills tại runtime.

Bản Instructions trong thư mục này được chuẩn hóa từ nội dung prompt người dùng cung cấp và ảnh chụp Agent Builder. Nó là bản tài liệu hóa/đề xuất, không được mặc định là prompt production đang chạy.

## Cách bổ sung prompt runtime

Khi có quyền truy cập workflow n8n hoặc bản export cấu hình Agent Builder, cần trích xuất nội dung prompt từ đúng workflow/node và ghi kèm:
1. Tên workflow/Agent và node.
2. Loại prompt (System / Developer / User / template).
3. Nội dung đầy đủ sau khi loại bỏ credential, token, API key và dữ liệu cá nhân.
4. Biến đầu vào và cách mapping dữ liệu.
5. Model, Tools, Skills và cấu hình liên quan nếu được xác minh.
6. Ngày trích xuất, phiên bản và trạng thái (draft/test/production).

## Mã nguồn đối chiếu

- [AI Assistant frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [Automation Center frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AutomationCenter.tsx)
- [n8n API proxy](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)
