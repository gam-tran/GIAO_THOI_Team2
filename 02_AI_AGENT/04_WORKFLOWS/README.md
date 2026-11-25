# Workflows & Automation

## Luồng AI Assistant

Frontend Admin gọi API `POST /api/n8n/giaothoi-ai-assistant`. API proxy xác thực người dùng, sau đó chuyển tiếp JSON đến webhook `/webhook/giaothoi-ai-assistant` trên n8n, kèm header `X-GIAO-THOI-KEY`.

Các thông tin này được xác minh từ frontend và API proxy trong repository nguồn. Chưa có JSON export workflow n8n để xác nhận node bên trong, model, prompt, memory hoặc tools.

## Các route n8n được khai báo trong API proxy

| Route | Webhook path | Method |
|---|---|---|
| giaothoi-dashboard | /webhook/giaothoi-dashboard | GET |
| giaothoi-ai-assistant | /webhook/giaothoi-ai-assistant | POST |
| giaothoi-content-studio | /webhook/giaothoi-content-studio | POST |
| giaothoi-campaign-planner | /webhook/giaothoi-campaign-planner | POST |
| giaothoi-analytics | /webhook/giaothoi-analytics | POST |
| giaothoi-marketing-insights | /webhook/giaothoi-marketing-insights | POST |
| giaothoi-content-library | /webhook/giaothoi-content-library | GET |
| giaothoi-content-library-save | /webhook/giaothoi-content-library-save | POST |
| giaothoi-content-approval | /webhook/giaothoi-content-approval | POST |
| giaothoi-automation-workflows | /webhook/giaothoi-automation-workflows | GET |
| giaothoi-automation-executions | /webhook/giaothoi-automation-executions | GET |
| giaothoi-schedules | /webhook/giaothoi-schedules | GET |
| giaothoi-automation-control | /webhook/giaothoi-automation-control | POST |
| giaothoi-automation-run | /webhook/giaothoi-automation-run | POST |

Danh sách trên chỉ là route được khai báo trong proxy, không xác nhận mọi workflow tương ứng đang tồn tại hoặc active trong n8n.

## Automation Center

[AutomationCenter.tsx](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AutomationCenter.tsx) cho thấy giao diện Admin có khả năng tải danh sách workflow, lịch chạy và lịch sử thực thi, cũng như gửi yêu cầu điều khiển automation. Cấu hình workflow thực tế cần đối chiếu trong n8n.

## Tài liệu cần bổ sung

- JSON export workflow AI Assistant đã loại credentials/secrets.
- JSON export các workflow liên quan Content Studio, Campaign Planner, Analytics và Automation Center.
- Sơ đồ node, trigger, input/output và error handling.
- Quy tắc phê duyệt trước các hành động xuất bản hoặc tác động ra nền tảng bên ngoài.

Không commit credential, token, webhook secret hoặc dữ liệu cá nhân.
