# Integrations

Thư mục này mô tả các dịch vụ và giao thức kết nối với website, Admin và hệ thống AI Marketing của GIAO THỜI.

## Tài liệu

- [n8n Integration Architecture](./n8n-integration-architecture.md) – kiến trúc kết nối GitHub raw, Gemini, GA4, n8n REST API, Data Tables, Facebook Graph API và Supabase Storage.
- [Security and Reliability Review](./n8n-security-reliability-review.md) – đánh giá xác thực webhook, quyền automation, endpoint trùng và tính nhất quán của GA4.

## Thành phần tích hợp

| Thành phần | Vai trò trong kiến trúc |
|---|---|
| GitHub Raw Content | Cung cấp Product Data, Brand Knowledge, Skills và References qua các endpoint đọc nội dung |
| Google Gemini | Sinh phản hồi AI, nội dung Marketing và kế hoạch chiến dịch trong các workflow tương ứng |
| Google Analytics Data API | Truy vấn dữ liệu GA4 thông qua phương thức runReport |
| n8n REST API | Quản lý workflow, executions và schedules theo quyền được cấp |
| n8n Data Tables | Lưu trữ dữ liệu phục vụ Content Calendar và Content Library |
| Facebook Graph API | Tích hợp các thao tác đăng nội dung text, album ảnh hoặc video |
| Supabase Storage | Lưu trữ media và cung cấp signed URL theo cấu hình |

## Nguyên tắc bảo mật và vận hành

- Credentials được tham chiếu trong workflow không đồng nghĩa secret value được lưu trong export.
- Không đưa API key, access token, refresh token, webhook secret hoặc service-role key vào repository.
- Phân biệt cấu hình node với quyền truy cập thực tế và kết quả thực thi.
- Các thao tác có tác động đến khách hàng, nội dung công khai hoặc ngân sách cần được kiểm soát theo quyền và quy trình phê duyệt.
