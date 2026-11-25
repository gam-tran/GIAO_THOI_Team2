# Agents

## GIAO THỜI Marketing Assistant

Trong mã nguồn frontend hiện tại, chức năng AI được thể hiện dưới dạng một AI Assistant trong khu vực Admin. Chưa có bằng chứng đủ để tách thành nhiều Agent chuyên biệt độc lập.

### Vai trò được xác minh ở mức giao diện

- Nhận yêu cầu và lịch sử hội thoại từ Admin.
- Gửi request đến API `/api/n8n/giaothoi-ai-assistant`.
- Hiển thị nội dung phản hồi nhận từ webhook.

### Luồng kỹ thuật

```text
Admin
  -> src/admin/pages/AIAssistant.tsx
  -> POST /api/n8n/giaothoi-ai-assistant
  -> api/n8n/[route].ts
  -> N8N_BASE_URL/webhook/giaothoi-ai-assistant
  -> n8n workflow
  -> response content/message
  -> Admin UI
```

### API proxy

- Method: POST.
- Request body từ frontend: `{ messages: [...] }`.
- Frontend gửi tối đa 12 message gần nhất trong phiên component.
- API xác thực request Supabase trước khi chuyển tiếp.
- Route AI Assistant không có role mapping riêng trong cấu hình route đã kiểm tra; áp dụng role mặc định gồm admin, creator, approver và publisher.
- Header chuyển tiếp: `X-GIAO-THOI-KEY`, lấy từ `N8N_WEBHOOK_KEY`.
- Webhook path: `/webhook/giaothoi-ai-assistant`.

### Agent Builder configuration

- [Agent Builder Configuration](./agent-builder-configuration.md): ghi nhận model, Tools, Skills, Trigger và trạng thái Web search nhìn thấy trong ảnh chụp màn hình do người dùng cung cấp.
- [Marketing AI Agent Instructions (Draft)](../01_PROMPT_ENGINEERING/marketing-ai-agent-instructions-v1.md): bản prompt chuẩn hóa đề xuất, chưa được xác nhận là cấu hình production.

### Những gì chưa xác minh

Chưa có workflow export n8n hoặc bản export cấu hình Agent Builder nên chưa kết luận được model/runtime cuối cùng, system prompt đang hoạt động, memory, cấu hình chi tiết của Tools, cách nạp Skill và nguồn dữ liệu Agent thực sự truy cập.

### Tài liệu liên quan

- [Marketing Skills](../02_MARKETING_SKILLS/README.md)
- [Prompt Engineering](../01_PROMPT_ENGINEERING/README.md)
- [Workflows](../04_WORKFLOWS/README.md)
