# AI Agent Runtime – n8n Export Findings

> Nguồn: AI Assistant, Content Studio, Campaign Planner, Marketing Insights workflow exports và ảnh Agent Builder. Tài liệu mô tả những gì export thể hiện; không đồng nghĩa Skills Builder được nạp vào runtime.

## 1. AI Assistant API

Workflow ID trong export: `R8WodfzrnKEdNdst`; webhook `giaothoi-ai-assistant`; cờ active trong export: true.

Luồng:
1. Nhận `messages` từ webhook body.
2. Đọc Product Data từ GitHub raw `src/data/products.ts`.
3. Đọc Brand Knowledge từ `docs/docs/marketing-skills/product-marketing-context.md`.
4. Merge source và chuẩn bị context.
5. Chỉ giữ role `user` hoặc `assistant`, content string không rỗng; lấy tối đa 12 message gần nhất.
6. Ghép conversation text, build Assistant Prompt, gọi Google Gemini Chat Model.
7. Trả `success`, `content`, `message`.

Prompt runtime yêu cầu tiếng Việt tự nhiên, lập luận thực tế; không bịa giá, nguồn gốc, chất liệu; GIAO THỜI là đơn vị phân phối; nêu rõ thiếu dữ liệu; phân biệt dữ liệu, giả định và đề xuất.

**Không thấy trong workflow export:** GA4 node, Marketing Skills loader, vector store, memory store hoặc sub-agent. Vì vậy không kết luận AI Assistant runtime tự gọi GA4, tự nạp Builder Skills hoặc có persistent memory. Workflow chỉ xử lý tối đa 12 messages trong request hiện tại.

## 2. Content Studio API

Workflow ID `SfgClDsh7BblZHzL`; webhook `giaothoi-content-studio`.

Prompt dùng fields: `product`, `platform`, `contentType`, `objective`, `tone`, `brief`. Defaults: Chưa xác định, Facebook, Social post, Tăng tương tác, Gần gũi/tự nhiên. Product + Brand context được đưa vào prompt. Không bịa sản phẩm, giá, xuất xứ, chất liệu, công dụng, đánh giá hoặc chính sách chưa có nguồn.

## 3. Campaign Planner API

Workflow ID `ZAz7EqRdeQJAKDtP`; webhook `giaothoi-campaign-planner`.

Prompt fields: `campaignName`, `product`, `objective`, `targetAudience`, `duration`, `budget`, `channels`, `brief`. Output sections: Campaign Overview, Strategy, Channel Plan, Budget Plan, Timeline, KPI Plan, Resource and Risk. Không tự thêm kênh; nếu không có ngân sách chỉ đề xuất tỷ trọng, không tự gán tiền.

## 4. Marketing Insights API

Workflow ID `a0x1mJzhTLo7drZd`; webhook `giaothoi-marketing-insights`.

Gọi Analytics API, kiểm tra success rồi đưa dữ liệu GA4 vào Gemini. Report sections: Executive Summary, Performance Analysis, Key Insights (3–5), Recommendations (3–5, có priority), Next Steps. Prompt cấm bịa số liệu/nguyên nhân/kết quả và yêu cầu nêu thiếu dữ liệu.

## 5. Đối chiếu Agent Builder

Ảnh Builder thể hiện model selector `gemini-3.1-flash-lite`, Trigger `n8n Chat`, Tools `16 HTTP Request` và `Google analytics`, Skills panel trống, Web search Off.

Workflow exports lại có Gemini Chat Model nodes, HTTP Request nodes, GA4 API calls và webhook workflows. Đây là hai lớp cấu hình khác nhau. Cần xác minh:
- Builder Agent gọi webhook AI Assistant API hay xử lý model trực tiếp?
- HTTP Request capability trỏ tới endpoint nào?
- Google analytics tool dùng cùng Property/credential với Analytics API workflow?
- Skills Builder có được nạp vào workflow n8n không?
- Model trong Gemini node thực tế có khớp model selector Builder không?

## 6. Tài liệu liên quan

- [Instructions Draft](../01_PROMPT_ENGINEERING/marketing-ai-agent-instructions-v1.md)
- [Builder configuration evidence](./agent-builder-configuration.md)
- [Workflow inventory](../04_WORKFLOWS/n8n-workflow-inventory.md)
- [Integration architecture](../05_INTEGRATIONS/n8n-integration-architecture.md)
- [Security review](../05_INTEGRATIONS/n8n-security-reliability-review.md)
