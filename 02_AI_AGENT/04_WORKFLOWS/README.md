# Workflows & Automation

Nguồn giao diện quản lý workflow:
- [AutomationCenter.tsx](https://github.com/gam-tran/giao-thoi-website-v3/blob/fix/content-quality-gate-0f8e-base/src/admin/pages/AutomationCenter.tsx)

File này cho thấy Admin có thể tải danh sách workflow, lịch chạy, lịch sử thực thi, điều khiển publish/unpublish và gọi các workflow Content Studio, Campaign Planner, Test thông qua API n8n.

Đây là bằng chứng về giao diện điều phối và tích hợp API; cấu hình workflow n8n thực tế cần được bổ sung riêng (ví dụ JSON export đã loại bỏ credentials).
