# GIAO THỜI – Website & AI Marketing Agent

Repository tổng hợp sản phẩm GIAO THỜI trong khuôn khổ dự án nhóm, bao gồm website, hệ thống AI hỗ trợ Marketing, các workflow tự động hóa và tài liệu kỹ thuật.

## Tổng quan dự án

GIAO THỜI giới thiệu và phân phối các sản phẩm mang chất liệu, kỹ thuật và dấu ấn thủ công truyền thống Việt Nam trong đời sống hiện đại. Dự án kết hợp nền tảng website với công cụ hỗ trợ hoạt động Marketing và quản trị nội dung.

**Website:** https://giaothoivn.netlify.app

## Thành phần dự án

| Thành phần | Nội dung |
|---|---|
| Website | Giới thiệu sản phẩm, bộ sưu tập, nội dung văn hóa và các chức năng tương tác |
| AI Marketing Agent | Central Instructions, workflow prompts, Skills, Agent và công cụ hỗ trợ Marketing |
| Admin Dashboard | Quản trị nội dung, lịch, phê duyệt và tự động hóa |
| Workflow Automation | Các workflow n8n phục vụ AI Assistant, Content Studio, Campaign Planner, Analytics và vận hành |
| Documentation | Kiến trúc, hướng dẫn kỹ thuật, tích hợp, bảo mật và tài liệu bàn giao |
| Report & Evidence | Báo cáo, hình ảnh và tài liệu minh chứng của dự án |

## Cấu trúc repository

- [01_WEBSITE](./01_WEBSITE/README.md) – website và tài liệu kỹ thuật.
- [02_AI_AGENT](./02_AI_AGENT/README.md) – Prompt Engineering, Marketing Skills, Agents, Workflows và Integrations.
- [03_ADMIN_DASHBOARD](./03_ADMIN_DASHBOARD/README.md) – chức năng và cấu trúc khu vực quản trị.
- [04_DOCUMENTATION](./04_DOCUMENTATION/README.md) – tài liệu kiến trúc và hướng dẫn dự án.
- [05_REPORT](./05_REPORT/README.md) – báo cáo và minh chứng.

## Repository nguồn

| Thành phần | Repository nguồn | Phạm vi |
|---|---|---|
| Website, Admin và tích hợp | [giao-thoi-website-v3](https://github.com/gam-tran/giao-thoi-website-v3) | Mã nguồn phát triển website và các chức năng quản trị |
| Website phiên bản đầu | [ReportWebsiteAnalytics-Team2/BuildWebsite](https://github.com/hangji1997-cpu/ReportWebsiteAnalytics-Team2/tree/main/BuildWebsite) | Phiên bản website ban đầu và các thành phần phân tích website |

Repository hiện tại tổng hợp các thành phần và tài liệu phục vụ quản lý, trình bày và bàn giao. Repository nguồn được giữ độc lập; thay đổi tại một repository không tự động đồng bộ sang repository còn lại.

## Kiến trúc tổng quan

```text
Khách truy cập / Người quản trị
             |
             v
       GIAO THỜI Website
             |
       +-----+------+
       |            |
       v            v
   Supabase     API trung gian
                    |
                    v
              n8n Workflows
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Gemini     GA4     Dịch vụ tích hợp
```

Sơ đồ mô tả các thành phần và hướng kết nối của hệ thống. Chi tiết triển khai và phạm vi từng workflow được trình bày trong tài liệu tương ứng.

## Nguyên tắc tài liệu và bảo mật

- Phân biệt mã nguồn, cấu hình, dữ liệu trả về và kết quả kiểm thử.
- Chỉ mô tả chức năng theo đúng phạm vi thể hiện trong mã nguồn hoặc tài liệu cấu hình.
- Không xem sự tồn tại của file, node hoặc credential reference là bằng chứng tích hợp đang chạy thành công.
- Không đưa API key, access token, mật khẩu, file môi trường hoặc webhook secret vào repository.
- Chỉ sử dụng file cấu hình mẫu đã loại bỏ thông tin bí mật khi hướng dẫn cài đặt.
