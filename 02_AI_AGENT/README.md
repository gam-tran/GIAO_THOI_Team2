# 02 – AI Agent System

Thư mục này là nơi lưu trữ tài liệu và tài nguyên bàn giao của hệ thống AI Agent GIAO THỜI trong repository tổng hợp của nhóm.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| [01_PROMPT_ENGINEERING](./01_PROMPT_ENGINEERING/README.md) | Prompt đã đối chiếu mã nguồn, bản Instructions đề xuất và tài liệu cấu hình prompt |
| [02_MARKETING_SKILLS](./02_MARKETING_SKILLS/README.md) | Brand/Product context, 6 Marketing Skills và tài liệu tham khảo đã chuyển từ repository nguồn |
| [03_AGENTS](./03_AGENTS/README.md) | Kiến trúc, vai trò, đầu vào/đầu ra, cấu hình Agent Builder và giới hạn của Agent |
| [04_WORKFLOWS](./04_WORKFLOWS/README.md) | Luồng tích hợp API và workflow n8n |
| [05_INTEGRATIONS](./05_INTEGRATIONS/README.md) | Model, dữ liệu, nền tảng và dịch vụ tích hợp |

## Nguồn mã nguồn

- [Repository website nguồn](https://github.com/gam-tran/giao-thoi-website-v3/tree/feature/ga4-ai-agent)
- Branch được rà soát: `feature/ga4-ai-agent`
- [AI Assistant frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [API n8n proxy](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)

## Trạng thái xác minh

- **Đã có trong Git:** giao diện AI Assistant, API proxy, Brand/Product context và 6 Marketing Skills cùng tài liệu tham khảo.
- **Đã quan sát trong Agent Builder:** model selector hiển thị `gemini-3.1-flash-lite`, Trigger `n8n Chat`, Tools `16 HTTP Request` và `Google analytics`; khu vực Skills đang trống trong ảnh.
- **Đã tài liệu hóa:** bản Instructions chuẩn hóa ở trạng thái Draft và ảnh chụp cấu hình Builder.
- **Chưa xác minh:** workflow export n8n, cấu hình chi tiết của Tools, memory, cơ chế Agent nạp Skills và trạng thái production sau khi thay prompt.

Tài liệu trong Git không tự chứng minh các thành phần đã được nạp hoặc đang chạy trong runtime. Mỗi mục cần được phân biệt giữa mã nguồn/tài liệu đã có, cấu hình nhìn thấy, cấu hình đã xác minh và chức năng đã kiểm thử.
