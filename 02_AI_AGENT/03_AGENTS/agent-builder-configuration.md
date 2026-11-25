# Agent Builder Configuration – GIAO THỜI Marketing AI Agent

> **Nguồn:** Ảnh chụp màn hình do người dùng cung cấp ngày 25/11/2026.  
> **Phạm vi:** Ghi nhận cấu hình nhìn thấy trên giao diện Build; không phải bản export cấu hình runtime.

## 1. Cấu hình nhìn thấy

| Khu vực | Giá trị quan sát được | Ghi chú |
|---|---|---|
| Agent name | GIAO THỜI – Marketing AI Agent | Hiển thị ở trang Build |
| Model | gemini-3.1-flash-lite | Tên model hiển thị trong selector |
| Instructions | Có prompt dài về Marketing Analytics, orchestration và các module | Nội dung prompt cũ cần được chuẩn hóa |
| Skills | Chưa thấy Skill nào được thêm vào khu vực Skills | Danh sách lựa chọn đang mở trong ảnh không đồng nghĩa đã cài |
| Trigger channel | n8n Chat | Hiển thị trong mục Triggers |
| Tool | 16 HTTP Request | Hiển thị trong Capabilities |
| Tool | Google analytics | Hiển thị trong Capabilities |
| Web search | Off | Trạng thái hiển thị trong ảnh |

## 2. Skills có trong danh sách lựa chọn

### Marketing Skills
- Content strategy skill
- Social content skill
- Copywriting skill
- Analytics tracking skill
- Campaign planning skill

### References
- Social platforms reference
- Social post templates reference
- Social reverse engineering reference
- Copywriting frameworks reference
- Natural transitions reference
- Analytics event library reference
- GA4 implementation reference
- GTM implementation reference

### Những tài nguyên đã có trong Git nhưng chưa thấy trong danh sách lựa chọn ở ảnh
- Marketing Ideas Skill
- Product Marketing Context

Không được suy luận rằng hai tài nguyên này đã được gắn vào Agent. Cần kiểm tra cấu hình thực tế hoặc bổ sung theo cơ chế được nền tảng hỗ trợ.

## 3. Tools và giới hạn xác minh

Ảnh cho thấy hai mục trong Capabilities: `16 HTTP Request` và `Google analytics`.

Ảnh không thể hiện:
- Chi tiết cấu hình từng HTTP Request.
- Endpoint, authentication hoặc payload thực tế.
- Property ID đang được Google Analytics tool sử dụng.
- Danh sách Metrics và Dimensions được tool chấp nhận.
- Tool có thể truy xuất Product Data hoặc Brand Knowledge hay không.

Vì vậy, không ghi nhận Product Data Tool là một công cụ đã kết nối chỉ dựa trên việc prompt cũ có nhắc tới nó. Tương tự, cần kiểm tra HTTP Request trước khi kết luận nó đang kết nối tới Brand Knowledge hoặc Product Data.

## 4. Prompt tài liệu hóa

Bản Instructions chuẩn hóa đề xuất được lưu tại:
- [marketing-ai-agent-instructions-v1.md](./marketing-ai-agent-instructions-v1.md)

Đây là bản Draft để rà soát và triển khai. Chỉ cập nhật trạng thái thành Active/Production sau khi thay prompt trong Builder, lưu cấu hình và kiểm thử thành công.

## 5. Việc cần xác minh trước khi nghiệm thu

- [ ] Thay Instructions bằng bản đã được duyệt.
- [ ] Thêm các Skills cần thiết trong khu vực Skills.
- [ ] Xác minh từng Reference được gắn đúng Skill hoặc Agent.
- [ ] Kiểm tra cấu hình HTTP Request và Google Analytics.
- [ ] Kiểm tra Property ID, Metrics, Dimensions và timezone thực tế.
- [ ] Kiểm thử truy vấn GA4 và một yêu cầu Marketing không cần GA4.
- [ ] Kiểm tra Agent không tuyên bố đã truy xuất nguồn hoặc gọi công cụ khi chưa thực hiện.
- [ ] Lưu lại ảnh chụp hoặc bản export cấu hình sau kiểm thử.

## 6. Lưu ý bảo mật

Không commit API key, OAuth token, webhook secret, thông tin xác thực, dữ liệu cá nhân hoặc payload có chứa dữ liệu khách hàng vào repository.
