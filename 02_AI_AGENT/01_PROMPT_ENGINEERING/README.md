# Prompt Engineering

Thư mục này dành cho các prompt có nguồn gốc kiểm chứng được trong quá trình phát triển và vận hành AI Agent GIAO THỜI.

## Phạm vi lưu trữ

- System prompt của Agent.
- Prompt cho từng tác vụ.
- Prompt dùng trong các node AI của workflow n8n.
- Phiên bản prompt, ngày cập nhật và ghi chú thay đổi.

## Trạng thái hiện tại

Chưa có bản export workflow n8n hoặc bản prompt runtime được cung cấp trong repository để xác minh nội dung System Prompt của webhook `giaothoi-ai-assistant`.

Vì vậy, hiện chưa ghi nhận prompt nào là System Prompt production. Không tự suy diễn prompt từ giao diện chat hoặc từ các Marketing Skills.

Khi có prompt thực tế, lưu thành file riêng, ghi rõ workflow/node sử dụng, phiên bản, ngày trích xuất và trạng thái (draft/test/production). Loại bỏ API key, token, credential và dữ liệu cá nhân trước khi commit.

## Nguồn liên quan

- [AI Assistant frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [Tài liệu kiến trúc Agent](../03_AGENTS/README.md)
