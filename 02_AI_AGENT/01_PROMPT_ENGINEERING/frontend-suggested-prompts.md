# Frontend Suggested Prompts – Marketing AI Assistant

> Loại tài liệu: prompt gợi ý (quick-start prompts) được hard-code trong giao diện frontend.  
> Trạng thái: đã đối chiếu mã nguồn; không phải System Prompt và không chứng minh prompt runtime của n8n.

## Vị trí và cách hoạt động

Nguồn: `src/admin/pages/AIAssistant.tsx`, repository `gam-tran/giao-thoi-website-v3`, branch `feature/ga4-ai-agent`.

Khi người dùng chọn một thẻ gợi ý, frontend gọi `sendMessage(item.prompt)`. Nội dung này được thêm vào cuộc hội thoại như một tin nhắn của người dùng, sau đó gửi tới endpoint `/api/n8n/giaothoi-ai-assistant`.

Frontend gửi tối đa 12 tin nhắn gần nhất theo cấu trúc `{ messages: [...] }`. Đây là bằng chứng về dữ liệu frontend gửi đi; không đủ để kết luận n8n xử lý prompt, dùng model hay nạp Skills như thế nào.

## 4 prompt gợi ý nguyên văn

### 1. Phân tích khách hàng

**Mô tả trên giao diện:** Xác định chân dung và nhu cầu khách hàng.

**Prompt:**

> Hãy phân tích nhóm khách hàng mục tiêu phù hợp với GIAO THỜI. Đề xuất chân dung khách hàng, nhu cầu, rào cản mua hàng và cách tiếp cận.

### 2. Lên ý tưởng Marketing

**Mô tả trên giao diện:** Tìm ý tưởng truyền thông cho sản phẩm.

**Prompt:**

> Hãy đề xuất 5 ý tưởng Marketing thực tế cho GIAO THỜI, ưu tiên tăng nhận diện thương hiệu và thu hút khách hàng tiềm năng.

### 3. Tìm kiếm insight

**Mô tả trên giao diện:** Tìm vấn đề và động cơ mua hàng.

**Prompt:**

> Hãy phân tích insight của khách hàng quan tâm đến sản phẩm thủ công và chất liệu truyền thống Việt Nam. Giải thích nhu cầu, động cơ và rào cản mua hàng.

### 4. Tư vấn thương hiệu

**Mô tả trên giao diện:** Định vị và phát triển thương hiệu.

**Prompt:**

> Hãy đánh giá định vị thương hiệu hiện tại của GIAO THỜI và đề xuất hướng truyền thông giúp thương hiệu khác biệt hơn.

## Luồng gửi prompt được xác minh

1. Người dùng chọn một prompt gợi ý hoặc tự nhập câu hỏi.
2. Frontend thêm nội dung vào lịch sử hội thoại với role `user`.
3. Frontend gửi tối đa 12 tin nhắn gần nhất tới `POST /api/n8n/giaothoi-ai-assistant`.
4. Frontend đọc câu trả lời từ `result.content` hoặc `result.message`.

API proxy ánh xạ route này tới webhook n8n `/webhook/giaothoi-ai-assistant`. Phần xử lý bên trong workflow chưa được xác minh.

## Giới hạn tài liệu

- Đây là các câu hỏi khởi đầu để người dùng thao tác nhanh, không phải bộ chỉ dẫn hệ thống.
- Không có căn cứ để khẳng định các prompt này tự động gọi một Skill cụ thể.
- Không có căn cứ để khẳng định AI Assistant có memory hoặc nhiều Agent độc lập.
- Nội dung phản hồi phụ thuộc cấu hình workflow n8n chưa được trích xuất.

## Nguồn

- [AIAssistant.tsx – source](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [API n8n proxy – source](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)
