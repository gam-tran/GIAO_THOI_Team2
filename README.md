# GIAO THỜI – Website & AI Marketing Agent

Repository tổng hợp phục vụ lưu trữ, trình bày và phát triển sản phẩm GIAO THỜI trong khuôn khổ bài tập lớn.

## Tổng quan

GIAO THỜI là dự án thương mại điện tử giới thiệu và phân phối các sản phẩm mang chất liệu, kỹ thuật và bản sắc thủ công truyền thống Việt Nam trong đời sống hiện đại.

Repository này tổ chức các thành phần của dự án theo một cấu trúc thống nhất:
- Website thương mại điện tử.
- AI Prompt Engineering.
- Marketing Skills.
- AI Agent và các workflow tự động hóa.
- Admin Dashboard, Analytics và tài liệu dự án.

## Nguồn dự án hiện có

| Thành phần | Repository nguồn | Ghi chú |
|---|---|---|
| Website phiên bản đầu | [ReportWebsiteAnalytics-Team2/BuildWebsite](https://github.com/hangji1997-cpu/ReportWebsiteAnalytics-Team2/tree/main/BuildWebsite) | Mã nguồn website React/Vite, cấu hình GA4 và các thành phần thương mại điện tử |
| Website/Admin và AI Agent | [giao-thoi-website-v3](https://github.com/gam-tran/giao-thoi-website-v3/tree/fix/content-quality-gate-0f8e-base) | Phiên bản phát triển tiếp theo; nguồn để đối chiếu Admin, Skills và Automation |

> Repository này là bản tổng hợp tài liệu và thành phần được chọn lọc. Hai repository nguồn được giữ nguyên để bảo toàn lịch sử phát triển. Các thành phần mã nguồn sẽ được đưa vào đây theo từng đợt sau khi đối chiếu phiên bản và kiểm tra cấu hình bảo mật.

## Cấu trúc

- `01_WEBSITE/`: mã nguồn và tài liệu website.
- `02_AI_AGENT/`: Prompt, Skills, Agent và tích hợp.
- `03_ADMIN_DASHBOARD/`: các chức năng quản trị.
- `04_DOCUMENTATION/`: kiến trúc, hướng dẫn và tài liệu kỹ thuật.
- `05_REPORT/`: hình ảnh minh chứng và báo cáo.

## Trạng thái

Các thư mục hiện được khởi tạo để tiếp nhận thành phần từ hai repository nguồn. Những nội dung chưa được sao chép hoặc xác minh sẽ được ghi rõ, không xem là chức năng đã hoàn thiện.

## Nguyên tắc bảo mật

Không commit API key, access token, mật khẩu, file `.env` hoặc thông tin xác thực. Chỉ đưa file cấu hình mẫu đã loại bỏ thông tin bí mật vào repository.
