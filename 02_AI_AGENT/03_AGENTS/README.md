# Agents

## GIAO THỜI Marketing Assistant

GIAO THỜI Marketing Assistant là giao diện trợ lý Marketing trong khu vực Admin. Frontend gửi lịch sử hội thoại đến API trung gian của website; API chuyển tiếp yêu cầu đến webhook AI Assistant trong n8n.

### Luồng xử lý

1. Người dùng gửi nội dung từ trang AI Assistant trong Admin.
2. Frontend gửi request đến route POST /api/n8n/giaothoi-ai-assistant.
3. API proxy xác thực phiên Supabase và chuyển tiếp request hợp lệ.
4. Webhook n8n nhận messages, lọc các message hợp lệ và giới hạn lịch sử ở 12 message gần nhất.
5. Workflow lấy Product Data và Brand Knowledge từ GitHub, dựng prompt hội thoại và gọi Google Gemini Chat Model.
6. Workflow trả nội dung phản hồi về frontend thông qua API proxy.

### Cấu hình Agent Builder

Ảnh cấu hình Builder được cung cấp thể hiện model gemini-3.1-flash-lite, trigger n8n Chat, nhóm Tools gồm HTTP Request và Google Analytics, cùng khu vực Skills. Đây là cấu hình giao diện Builder; nó được phân biệt với các Gemini Chat Model node bên trong workflow n8n.

### Tài liệu liên quan

- [Agent Builder Configuration](./agent-builder-configuration.md)
- [AI Agent Runtime and Tool Mapping](./ai-agent-runtime-and-tool-mapping.md)
- [Central Agent Instructions](../01_PROMPT_ENGINEERING/marketing-ai-agent-instructions-v1.md)
- [AI Agent Design Decisions](../01_PROMPT_ENGINEERING/ai-agent-design-decisions.md)
- [Marketing Skills](../02_MARKETING_SKILLS/README.md)

### Kiến trúc hai lớp

Agent Builder và n8n runtime là hai lớp cấu hình riêng. Builder quản lý trải nghiệm Agent, trigger và các Tools được khai báo trong giao diện. Các workflow n8n có prompt, node model và luồng xử lý riêng. Việc một Skill hoặc Tool xuất hiện trong tài liệu không tự động chứng minh nó đã được nạp vào workflow runtime.
