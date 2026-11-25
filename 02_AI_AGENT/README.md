# 02 – AI Agent System

Thư mục này là nơi lưu trữ tài liệu và tài nguyên bàn giao của hệ thống AI Agent GIAO THỜI trong repository tổng hợp của nhóm.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| [01_PROMPT_ENGINEERING](./01_PROMPT_ENGINEERING/README.md) | System prompt, task prompt và prompt đã sử dụng; chỉ ghi nhận prompt có nguồn xác minh |
| [02_MARKETING_SKILLS](./02_MARKETING_SKILLS/README.md) | Brand/Product context, 6 Marketing Skills và tài liệu tham khảo đã chuyển từ repository nguồn |
| [03_AGENTS](./03_AGENTS/README.md) | Kiến trúc, vai trò, đầu vào/đầu ra và giới hạn của Agent |
| [04_WORKFLOWS](./04_WORKFLOWS/README.md) | Luồng tích hợp API và workflow n8n |
| [05_INTEGRATIONS](./05_INTEGRATIONS/README.md) | Model, dữ liệu, nền tảng và dịch vụ tích hợp |

## Nguồn mã nguồn

- [Repository website nguồn](https://github.com/gam-tran/giao-thoi-website-v3/tree/feature/ga4-ai-agent)
- Branch được rà soát: `feature/ga4-ai-agent`
- [AI Assistant frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [API n8n proxy](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)

## Trạng thái xác minh

- **Đã có trong Git:** giao diện AI Assistant, API proxy, Brand/Product context và 6 Marketing Skills cùng tài liệu tham khảo.
- **Có route tích hợp được khai báo:** webhook `giaothoi-ai-assistant` và các route n8n khác.
- **Chưa có bằng chứng cấu hình runtime:** workflow export của n8n, system prompt thực tế, model đang chạy, memory, tool connections và cơ chế Agent nạp Skills.

Tài liệu trong Git không tự chứng minh các thành phần đã được nạp hoặc đang chạy trong n8n. Mỗi mục cần được phân biệt giữa mã nguồn/tài liệu đã có, cấu hình đã khai báo và chức năng đã kiểm thử.
