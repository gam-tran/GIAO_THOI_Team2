# GIAO THỜI – n8n Credentials Inventory

**Ngày kiểm kê:** 18/11/2026  
**Tổng số credentials được ghi nhận:** 10

## 1. Danh mục credentials

| STT | Tên credential | Loại xác thực |
|---:|---|---|
| 1 | GA4 Data API | OAuth2 API |
| 2 | GIAO THOI Supabase Authorization | Header Auth |
| 3 | GIAO THOI Supabase Storage Auth | Header Auth |
| 4 | GIAO THOI Calendar Webhook Auth | Header Auth |
| 5 | GIAO THOI Page Token New | Query Auth |
| 6 | Query Auth account | Query Auth |
| 7 | GIAO THOI Facebook Page Auth | Header Auth |
| 8 | Google Analytics account | Google Analytics OAuth2 API |
| 9 | Giao Thoi Admin API Auth | Header Auth |
| 10 | Google Gemini(PaLM) Api account | Google Gemini(PaLM) Api |

Danh mục ghi nhận tên và loại xác thực của credentials trong n8n tại thời điểm kiểm kê. Tên credential không thể hiện giá trị bí mật, phạm vi quyền hoặc trạng thái còn hiệu lực của token.

## 2. Lưu trữ và bảo vệ

Theo hồ sơ backup ngày 18/11/2026:

- Credentials được lưu trong cơ sở dữ liệu n8n.
- Bản sao lưu hệ thống bao gồm database và cấu hình mã hóa cần thiết để khôi phục credentials.
- File backup được mã hóa AES-256.
- Tài liệu kiểm kê không lưu API key, access token, refresh token, mật khẩu hoặc secret value.

## 3. Yêu cầu khôi phục

n8n sử dụng encryption key tương ứng để giải mã credential data. Khi khôi phục hệ thống, cần giữ nguyên encryption key đã dùng để mã hóa dữ liệu cùng với database tương ứng.

Encryption key và mật khẩu archive phải được bảo quản riêng, giới hạn người được phép truy cập và không lưu trong repository công khai hoặc cùng vị trí với bản backup. Không thay thế encryption key bằng một giá trị mới khi cần khôi phục credentials đã mã hóa.

## 4. Phạm vi và lưu ý bảo mật

- Danh mục phản ánh snapshot kiểm kê ngày 18/11/2026, không phải trạng thái cập nhật trực tiếp của instance n8n.
- Việc credential xuất hiện trong danh sách không chứng minh token còn hiệu lực hoặc workflow đang sử dụng credential đó thành công.
- Quyền OAuth scope, quyền truy cập Supabase, Facebook Page và Gemini cần được quản lý theo nguyên tắc đặc quyền tối thiểu.
- Khi thay đổi hoặc thu hồi credential, cần rà soát các workflow và dịch vụ phụ thuộc trước khi áp dụng.
- Không đưa giá trị bí mật, credential export, encryption key hoặc mật khẩu backup vào tài liệu này.
