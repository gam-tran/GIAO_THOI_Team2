# Workflows & Automation

Thư mục này mô tả các workflow n8n của GIAO THỜI, được tổ chức theo nhóm nghiệp vụ và vai trò trong hệ thống.

## Tài liệu chính

- [n8n Workflow Inventory](./n8n-workflow-inventory.md) – danh mục workflow, webhook trigger, endpoint, luồng nghiệp vụ và Data Tables.
- [Security and Reliability Review](../05_INTEGRATIONS/n8n-security-reliability-review.md) – đánh giá authentication, route, quyền automation, GA4 và scheduled publishing.

## Nhóm workflow

- **AI & Content:** AI Assistant, Content Studio, Campaign Planner, Marketing Insights.
- **Analytics & Dashboard:** Analytics API và Dashboard API.
- **Content Operations:** Content Library, Content Approval, Content Save và Calendar.
- **Publishing:** Facebook Auto Posting và Facebook Scheduled Publishing.
- **Automation Management:** Automation Center, Control, Run, Executions và Schedule Management.

## Cách đọc cấu hình workflow

Workflow inventory mô tả cấu trúc được thể hiện trong các JSON exports, bao gồm trigger, node, kết nối và endpoint. Trạng thái active trong một bản export là giá trị tại thời điểm xuất file; không đại diện cho trạng thái hiện tại của môi trường n8n. Việc xác nhận vận hành cần dựa trên cấu hình triển khai và execution tương ứng.
