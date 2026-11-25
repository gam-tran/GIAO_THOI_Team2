# Frontend Suggested Prompts – Marketing AI Assistant

**Loại tài liệu:** Các prompt gợi ý (quick-start prompts) được khai báo trong giao diện frontend.  
**Nguồn:** `src/admin/pages/AIAssistant.tsx`, repository `gam-tran/giao-thoi-website-v3`, branch `feature/ga4-ai-agent`.

## 1. Vị trí và cách hoạt động

Khi người dùng chọn một thẻ gợi ý, frontend gọi `sendMessage(item.prompt)`. Nội dung được thêm vào hội thoại với role `user`, sau đó gửi tới endpoint `/api/n8n/giaothoi-ai-assistant`.

Frontend gửi tối đa 12 tin nhắn gần nhất theo cấu trúc `{ messages: [...] }`. Đây là prompt khởi đầu do giao diện cung cấp; không phải System Prompt hoặc prompt template bên trong n8n.

## 2. Bốn prompt gợi ý nguyên văn

### 2.1. Phân tích khách hàng

**Mô tả trên giao diện:** Xác định chân dung và nhu cầu khách hàng.

**Prompt:**

> Hãy phân tích nhóm khách hàng mục tiêu phù hợp với GIAO THỜI. Đề xuất chân dung khách hàng, nhu cầu, rào cản mua hàng và cách tiếp cận.

### 2.2. Lên ý tưởng Marketing

**Mô tả trên giao diện:** Tìm ý tưởng truyền thông cho sản phẩm.

**Prompt:**

> Hãy đề xuất 5 ý tưởng Marketing thực tế cho GIAO THỜI, ưu tiên tăng nhận diện thương hiệu và thu hút khách hàng tiềm năng.

### 2.3. Tìm kiếm insight

**Mô tả trên giao diện:** Tìm vấn đề và động cơ mua hàng.

**Prompt:**

> Hãy phân tích insight của khách hàng quan tâm đến sản phẩm thủ công và chất liệu truyền thống Việt Nam. Giải thích nhu cầu, động cơ và rào cản mua hàng.

### 2.4. Tư vấn thương hiệu

**Mô tả trên giao diện:** Định vị và phát triển thương hiệu.

**Prompt:**

> Hãy đánh giá định vị thương hiệu hiện tại của GIAO THỜI và đề xuất hướng truyền thông giúp thương hiệu khác biệt hơn.

## 3. Luồng gửi prompt

1. Người dùng chọn một prompt gợi ý hoặc tự nhập câu hỏi.
2. Frontend thêm nội dung vào lịch sử hội thoại với role `user`.
3. Frontend gửi tối đa 12 tin nhắn gần nhất tới `POST /api/n8n/giaothoi-ai-assistant`.
4. API proxy ánh xạ route tới webhook n8n `/webhook/giaothoi-ai-assistant`.
5. Workflow AI Assistant lọc các message hợp lệ, giữ tối đa 12 message user/assistant, kết hợp Product Data và Brand Knowledge, dựng prompt và gọi Google Gemini Chat Model.
6. Frontend đọc nội dung phản hồi từ `result.content` hoặc `result.message`.

## 4. Quan hệ với prompt runtime

Các prompt gợi ý chỉ là nội dung người dùng gửi vào cuộc hội thoại. Quy tắc xử lý, dữ liệu nguồn và cách tạo phản hồi được mô tả riêng trong [n8n AI Assistant Runtime Prompt](./n8n-ai-assistant-runtime-prompt.md) và [Central Agent Instructions](./marketing-ai-agent-instructions-v1.md).

Không có căn cứ từ các prompt gợi ý để kết luận một Skill cụ thể sẽ được gọi tự động hoặc AI Assistant có persistent memory hay nhiều Agent độc lập.

## 5. Nguồn

- [AIAssistant.tsx – source](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [API n8n proxy – source](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)
