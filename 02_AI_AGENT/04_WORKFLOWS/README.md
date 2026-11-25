# Workflows & Automation

Tài liệu workflow n8n được lập từ 19 JSON exports do người dùng cung cấp ngày 25/11/2026.

## Tài liệu
- [n8n Workflow Inventory](./n8n-workflow-inventory.md): danh mục 19 workflow, 20 webhook triggers, endpoint, luồng nghiệp vụ và Data Tables.
- [Security and Reliability Review](../05_INTEGRATIONS/n8n-security-reliability-review.md): authentication, route trùng, automation control, GA4 và scheduled publishing.

## Nhóm workflow
- AI Assistant, Content Studio, Campaign Planner, Marketing Insights.
- Analytics API và Dashboard API.
- Content Library, Content Approval, Content Save, Calendar.
- Facebook Auto Posting và Facebook Scheduled Publishing.
- Automation Center, Control, Run, Executions và Schedule Management.

## Lưu ý xác minh
- Cờ active trong JSON chỉ là trạng thái tại thời điểm export, không chứng minh trạng thái hiện tại.
- Workflow export không thay thế execution logs hoặc kiểm thử trực tiếp.
- 15/20 webhook trong export không khai báo authentication tại node Webhook; cần kiểm tra lớp API proxy/gateway.
- Có hai workflow cùng khai báo POST giaothoi-content-library-save; cần xác minh và xử lý duplicate route.
- Không commit raw export hoặc credentials trước khi rà soát thông tin nội bộ và bí mật.
