# Integrations

Tài liệu tích hợp được cập nhật dựa trên mã nguồn website và 19 workflow n8n JSON exports.

## Tài liệu
- [n8n Integration Architecture](./n8n-integration-architecture.md): GitHub raw, Gemini, GA4, n8n REST API, Data Tables, Facebook Graph API và Supabase Storage.
- [Security and Reliability Review](./n8n-security-reliability-review.md): webhook authentication, quyền automation, duplicate endpoint và consistency GA4.

## Thành phần quan sát được
| Thành phần | Vai trò |
|---|---|
| GitHub raw | Nạp Product Data và Brand Knowledge |
| Google Gemini | AI Assistant, Content Studio, Campaign Planner, Marketing Insights |
| Google Analytics Data API | Báo cáo GA4 qua runReport |
| n8n REST API | Quản lý workflows, executions và schedules |
| n8n Data Tables | Content Calendar và Content Library |
| Facebook Graph API | Đăng bài text, album ảnh, video |
| Supabase Storage | Signed URL cho media |

## Bảo mật và xác minh
Export chỉ cho thấy tên credential được chọn, không chứa secret value. Không commit API keys, access tokens, refresh tokens, webhook secrets hoặc service-role keys. Không coi việc có node, dependency, credential reference hoặc tài liệu là bằng chứng tích hợp đã chạy thành công; cần kiểm tra quyền, cấu hình triển khai và execution logs.
