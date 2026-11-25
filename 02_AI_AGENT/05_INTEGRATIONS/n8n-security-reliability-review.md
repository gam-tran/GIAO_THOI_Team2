# n8n Security and Reliability Review

> Phân tích tĩnh 19 workflow JSON export ngày 25/11/2026. Đây là rủi ro cần xác minh, không phải bằng chứng hệ thống đã bị xâm nhập.

## 1. Webhook authentication – ưu tiên cao

20 webhook triggers trong export: 5 khai báo `headerAuth`, 15 không khai báo authentication ở cấp Webhook node. Các nhóm không khai báo auth bao gồm AI Assistant, Marketing Insights, Analytics, Dashboard, Content Studio, Campaign Planner, Content Approval, Content Library GET, Content Save, Facebook Auto Posting và Automation endpoints.

Nếu webhook production có thể gọi trực tiếp từ Internet, các endpoint có thể bị gọi ngoài luồng website, gây phát sinh chi phí AI, đọc/sửa dữ liệu, đăng Facebook hoặc điều khiển workflow.

Khuyến nghị:
1. Xác minh Supabase auth/role checks của API proxy cho từng route.
2. Không dựa duy nhất vào UI ẩn webhook URL.
3. Bật webhook auth hoặc server-side signature/gateway cho endpoint phù hợp.
4. Ưu tiên bảo vệ Content Approval, Content Save, Facebook Auto Posting và Automation Control.
5. Kiểm thử production URL bằng request thiếu credential và xác nhận bị từ chối.

## 2. Automation Control nhận workflowId tùy ý – ưu tiên rất cao

Code `Validate Control Request` chỉ kiểm tra workflowId có tồn tại và action thuộc `publish/unpublish`. Không thấy allowlist workflowId trước khi gọi n8n REST API activate/deactivate. Nếu webhook bị gọi trực tiếp không qua proxy, rủi ro là người gọi có thể kích hoạt hoặc tắt workflow bất kỳ mà credential nội bộ cho phép.

Khuyến nghị: allowlist workflow IDs và role authorization phía server; không chỉ dựa vào frontend/API proxy.

## 3. Duplicate Content Library Save route – ưu tiên cao

Hai workflow cùng khai báo POST `giaothoi-content-library-save`:
- Content Library API: headerAuth.
- Content Save API: không khai báo auth.

Cần chọn endpoint chuẩn, đổi hoặc loại bỏ route dư sau khi xác minh frontend gọi route nào. Không suy luận cách n8n định tuyến khi hai workflow cùng active chỉ từ export.

## 4. Endpoint tạo thay đổi/tác động ngoài

Content Approval cập nhật Data Table; Content Save chèn row; Facebook Auto Posting đăng bài; Automation Control activate/deactivate workflow; Automation Run thực thi workflow. Cần auth, role checks, payload validation, rate limit và audit log. Publish phải có approval hợp lệ.

## 5. GA4 kỳ dữ liệu không đồng nhất

Analytics API dùng period động 7/28/90 cho phần lớn truy vấn, nhưng GA4 Devices hard-code 7daysAgo–yesterday. Dashboard API ghi kỳ cố định 7daysAgo–yesterday. Nên dùng một startDate/endDate chung và trả metadata kỳ thực tế.

## 6. Scheduled Publishing reliability

Code chỉ lấy tối đa một bài mỗi lượt; bỏ qua bài đã có Facebook Post ID; retry tối đa 3 lần, retryAfter 5 phút rồi 15 phút; claim status Publishing trước khi đăng.

Cần test:
- Workflow dừng sau claim, trước publish.
- Facebook publish thành công nhưng update Data Table lỗi.
- Signed URL hết hạn.
- Timeout nhưng Facebook đã nhận bài.
- Hai execution chạy đồng thời.

Cân nhắc stale Publishing recovery và kiểm tra post ID trước retry để tránh đăng trùng.

## 7. Timezone

Code lọc lịch ghép date/time với UTC+7. Export không xác nhận timezone toàn instance/workflow. Kiểm tra timezone và test bài sát thời điểm đổi ngày.

## 8. Không thấy trong export

- Quét JSON không thấy literal key apiKey/accessToken/clientSecret/password/authorization.
- Credential references có tên/ID nhưng không có secret value.
- Không có execution logs nên chưa đánh giá được runtime success/error.
- Không thể xác nhận webhook public hay được proxy bảo vệ nếu chưa test production.

## 9. Checklist

- [ ] Test mọi webhook khi thiếu credential.
- [ ] Bảo vệ endpoint đọc/ghi dữ liệu và publish.
- [ ] Allowlist Automation Control workflow IDs.
- [ ] Giải quyết duplicate Content Library Save route.
- [ ] Đồng bộ kỳ GA4.
- [ ] Xác minh quyền credentials.
- [ ] Test retry/duplicate publish/stale Publishing.
- [ ] Xác nhận timezone.
- [ ] Bật audit log cho thao tác thay đổi trạng thái.
