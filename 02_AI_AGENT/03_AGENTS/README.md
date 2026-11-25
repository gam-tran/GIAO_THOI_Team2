# Agents

## GIAO THỜI Marketing Assistant

Frontend thể hiện một AI Assistant trong Admin. n8n export bổ sung bằng chứng về prompt runtime và cách workflow xử lý hội thoại.

### Frontend/API proxy
- Frontend: src/admin/pages/AIAssistant.tsx.
- Route website: POST /api/n8n/giaothoi-ai-assistant.
- API proxy xác thực request Supabase trước khi chuyển tiếp.
- Request body: { messages: [...] }; frontend gửi tối đa 12 message gần nhất.
- Webhook n8n: /webhook/giaothoi-ai-assistant.
- Header proxy: X-GIAO-THOI-KEY, lấy từ N8N_WEBHOOK_KEY.

### n8n runtime được export
Workflow GIAO THỜI - AI Assistant API:
1. Lấy Product Data từ GitHub raw products.ts.
2. Lấy Brand Knowledge từ product-marketing-context.md.
3. Lọc tối đa 12 message role user/assistant.
4. Ghép lịch sử hội thoại vào prompt.
5. Gọi Google Gemini Chat Model.
6. Trả success/content/message.

Prompt runtime yêu cầu tiếng Việt, tư duy Marketing thực tế, không bịa dữ liệu sản phẩm và xác định GIAO THỜI là đơn vị phân phối.

### Tài liệu
- [Agent Builder Configuration](./agent-builder-configuration.md): model, Tools, Skills và Trigger quan sát từ ảnh Builder.
- [AI Agent Runtime and Tool Mapping](./ai-agent-runtime-and-tool-mapping.md): chi tiết workflow prompt và giới hạn đã xác minh.
- [Instructions Draft](../01_PROMPT_ENGINEERING/marketing-ai-agent-instructions-v1.md): bản Instructions đề xuất, chưa xác nhận là prompt production.
- [Marketing Skills](../02_MARKETING_SKILLS/README.md).

### Phân biệt hai cấu hình
Ảnh Agent Builder hiển thị model gemini-3.1-flash-lite, Trigger n8n Chat, Tools 16 HTTP Request và Google analytics; Skills panel trống. n8n export có Gemini Chat Model nodes và workflow riêng. Chưa đủ bằng chứng kết luận hai lớp cấu hình dùng chung một runtime hoặc Builder Skills tự động được nạp vào webhook workflow.

### Chưa xác minh
- Builder Agent gọi webhook AI Assistant API hay xử lý model trực tiếp.
- Model thực tế trong Gemini node.
- HTTP Request và Google Analytics Builder Tools đang trỏ tới đâu.
- Persistent memory hoặc Skill loader; không thấy các node này trong AI Assistant workflow export.
