# n8n Security and Reliability Review

**Phạm vi:** Phân tích tĩnh 19 workflow JSON exports ngày 25/11/2026.  
**Cách tiếp cận:** Đánh giá node cấu hình, webhook triggers, Code nodes, endpoint và luồng dữ liệu thể hiện trong exports. Các phát hiện là rủi ro kiến trúc cần được kiểm soát; không phải bằng chứng hệ thống đã bị xâm nhập.

## 1. Webhook authentication

Trong các exports có 20 Webhook triggers: 5 khai báo `headerAuth`, 15 không khai báo authentication ở cấp Webhook node.

Các nhóm không khai báo authentication ở node gồm AI Assistant, Marketing Insights, Analytics, Dashboard, Content Studio, Campaign Planner, Content Approval, Content Library GET, Content Save, Facebook Auto Posting và các Automation endpoints.

Nếu webhook có thể được gọi trực tiếp từ Internet mà không qua lớp API proxy có xác thực, endpoint có thể bị gọi ngoài luồng website. Tác động tiềm tàng gồm phát sinh chi phí AI, truy cập hoặc thay đổi dữ liệu, đăng Facebook và điều khiển workflow.

**Kiểm soát cần áp dụng:**
- Xác thực phiên Supabase và kiểm tra role ở API proxy cho từng route.
- Bảo vệ webhook bằng authentication hoặc cơ chế ký request/gateway phù hợp.
- Không dựa duy nhất vào việc ẩn webhook URL ở frontend.
- Áp dụng kiểm soát chặt với Content Approval, Content Save, Facebook Auto Posting và Automation Control.
- Ghi log danh tính người gọi, thời điểm, hành động và kết quả.

## 2. Automation Control và quyền workflow

Code node `Validate Control Request` kiểm tra workflowId có tồn tại và action thuộc `publish/unpublish`. Trong phần code được phân tích không thể hiện allowlist workflowId trước khi gọi n8n REST API activate/deactivate.

Nếu endpoint bị gọi trực tiếp và không có lớp phân quyền bổ sung, người gọi có thể yêu cầu thay đổi trạng thái của workflow khác trong phạm vi quyền credential nội bộ.

**Kiểm soát cần áp dụng:** allowlist workflow IDs, kiểm tra role ở server, giới hạn action theo vai trò và ghi audit log cho mọi thao tác activate/deactivate. Không chỉ dựa vào frontend hoặc API proxy để giới hạn quyền.

## 3. Duplicate Content Library Save route

Hai workflow cùng khai báo POST path `giaothoi-content-library-save`:

- Content Library API: có `headerAuth`.
- Content Save API: không khai báo authentication tại Webhook node.

Việc trùng route tạo ra sự không rõ ràng về endpoint chuẩn và chính sách xác thực. Cần duy trì một route chuẩn, bảo đảm frontend gọi đúng route và loại bỏ hoặc đổi path route không sử dụng sau khi đối chiếu cấu hình triển khai.

## 4. Endpoint có tác động ghi hoặc hành động bên ngoài

Các workflow có hành động thay đổi trạng thái hoặc dữ liệu gồm:

| Nhóm chức năng | Tác động |
|---|---|
| Content Approval | Cập nhật Data Table |
| Content Save | Thêm bản ghi |
| Facebook Auto Posting | Đăng nội dung lên Facebook |
| Automation Control | Activate/deactivate workflow |
| Automation Run | Thực thi workflow |

Các thao tác này cần xác thực, phân quyền theo vai trò, kiểm tra payload, rate limit và audit log. Hành động publish cần gắn với trạng thái approval hợp lệ và người có quyền phê duyệt.

## 5. GA4 reporting period consistency

Analytics API sử dụng period động 7/28/90 ngày cho phần lớn truy vấn, trong khi GA4 Devices hard-code khoảng `7daysAgo–yesterday`. Dashboard API cũng trả kỳ cố định `7daysAgo–yesterday`.

Khi người dùng chọn 28 hoặc 90 ngày, báo cáo thiết bị có thể không cùng kỳ với các báo cáo còn lại.

**Nguyên tắc thống nhất:** dùng chung startDate/endDate cho các truy vấn trong một báo cáo và trả metadata kỳ dữ liệu thực tế để người đọc nhận biết phạm vi phân tích.

## 6. Scheduled Publishing reliability

Code trong workflow được phân tích có các đặc điểm:

- Mỗi lượt xử lý tối đa một bài.
- Bỏ qua bài đã có Facebook Post ID.
- Retry tối đa 3 lần, với retryAfter 5 phút rồi 15 phút.
- Cập nhật trạng thái Publishing trước khi gọi thao tác đăng.

Các tình huống rủi ro cần được xử lý trong thiết kế vận hành:

- Workflow dừng sau khi claim bài nhưng trước khi publish.
- Facebook publish thành công nhưng cập nhật Data Table thất bại.
- Signed URL hết hạn trước khi Facebook tải media.
- Request timeout dù Facebook đã nhận bài.
- Hai execution cùng xử lý một bản ghi.

Cơ chế phục hồi cần nhận diện trạng thái Publishing bị treo, kiểm tra post ID trước khi retry và hạn chế đăng trùng khi kết quả request không rõ ràng.

## 7. Timezone

Code lọc lịch kết hợp date/time theo UTC+7. Export không xác định đầy đủ timezone của toàn bộ n8n instance và từng workflow. Vì vậy, timezone cần được cấu hình nhất quán giữa instance, Schedule Trigger, dữ liệu lịch và cách hiển thị ở frontend. Các mốc sát thời điểm chuyển ngày cần được xử lý theo cùng một quy ước.

## 8. Credential và secret handling

Phân tích JSON exports không phát hiện literal key có tên phổ biến như `apiKey`, `accessToken`, `clientSecret`, `password` hoặc `authorization`. Exports có credential references nhưng không chứa secret values tương ứng.

Điều này không chứng minh credential an toàn tuyệt đối hoặc còn hiệu lực. Credential values, OAuth tokens, webhook secrets, encryption key và mật khẩu backup cần được lưu trong cơ chế quản lý secret phù hợp, không đưa vào Git.

## 9. Giới hạn của phân tích

Workflow exports không cung cấp execution logs và không đủ để kết luận:

- Webhook production có thể truy cập trực tiếp từ Internet hay chỉ qua API proxy.
- Credentials còn hiệu lực và có đúng phạm vi quyền hay không.
- Các request publish/analytics đã thực thi thành công trong môi trường thật.
- Cấu hình timezone hiện tại của toàn instance.
- Hệ thống phục hồi đúng trong mọi tình huống timeout hoặc lỗi một phần.

Các nội dung trên là giới hạn bằng chứng của phân tích tĩnh; không được diễn giải thành kết luận hệ thống đã xảy ra sự cố.
