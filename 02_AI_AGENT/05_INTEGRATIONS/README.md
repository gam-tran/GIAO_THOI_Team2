# Integrations

Tài liệu này ghi nhận các tích hợp có bằng chứng từ mã nguồn và phân biệt với các kết nối runtime chưa được xác minh.

## Các thành phần

| Thành phần | Vai trò có thể xác minh | Trạng thái |
|---|---|---|
| Supabase | Frontend/API dùng xác thực và kiểm tra vai trò người dùng | Có tích hợp trong mã nguồn; cần kiểm thử môi trường triển khai |
| n8n | Nhận request webhook từ API proxy để xử lý các chức năng tự động hóa | Có endpoint và route được khai báo; workflow runtime chưa được export để kiểm tra |
| Cloudflare Tunnel | Cung cấp URL truy cập đến n8n chạy trong môi trường riêng | Được mô tả trong tài liệu vận hành; cần xác minh URL/tiến trình hiện hành |
| Gemini / Google GenAI | Repository có dependency liên quan Google GenAI | Chưa đủ căn cứ xác nhận model AI Assistant thực tế sử dụng |
| GA4 / GTM | Có Marketing Skill và tài liệu hướng dẫn tracking | Chưa đủ căn cứ xác nhận AI Agent có GA4 Data API tool hoặc quyền truy vấn property |
| Social platform APIs | Có các chức năng/workflow nội dung và xuất bản được khai báo ở mức ứng dụng | Cần kiểm tra credential, workflow và test thực tế theo từng nền tảng |

## Quy tắc bảo mật

- Không lưu API key, access token, refresh token, webhook secret hoặc service-role key trong Git.
- Dùng biến môi trường/secret store ở môi trường triển khai.
- Chỉ cấp quyền tối thiểu cần thiết cho từng integration.
- Không coi việc có dependency hoặc tài liệu hướng dẫn là bằng chứng kết nối đã hoạt động.
- Các hành động đăng bài, nhắn khách hàng, chạy quảng cáo hoặc thay đổi dữ liệu cần có kiểm soát và phê duyệt phù hợp.

## Cần xác minh khi bàn giao

1. Danh sách credentials và owner (không ghi giá trị secret).
2. Model/provider và phiên bản thực tế trong workflow AI.
3. GA4 property, Data API scopes, dimensions/metrics được phép truy vấn.
4. Supabase project, auth policies và role checks.
5. n8n webhook, workflow active status, retry và error handling.
6. Social API permissions, token lifecycle và cơ chế approval.
