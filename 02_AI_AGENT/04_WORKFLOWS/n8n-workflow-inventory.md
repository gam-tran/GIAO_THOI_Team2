# n8n Workflow Inventory

> Nguồn: 19 workflow JSON do người dùng cung cấp trong ZIP ngày 25/11/2026. Đây là phân tích tĩnh từ export, không phải kiểm thử runtime.

## 1. Tổng quan

- 19 workflow export; 18 có `active: true`, 1 có `active: false` (Test Automation Control).
- 20 webhook triggers: 5 khai báo `headerAuth`, 15 không khai báo authentication ở node Webhook.
- Nhóm nghiệp vụ: AI/content, campaign, analytics/dashboard, content library/calendar, Facebook publishing, automation management.

Cờ active chỉ phản ánh nội dung export tại thời điểm tải xuống, không xác nhận trạng thái hiện tại trên n8n instance.

## 2. Danh mục workflow

| Workflow | Trigger / chức năng | Các node/chặng chính |
|---|---|---|
| AI Assistant API | POST `giaothoi-ai-assistant` | Get Product Data + Brand Knowledge → merge → lấy tối đa 12 message user/assistant → build prompt → Gemini → response |
| Marketing Insights API | POST `giaothoi-marketing-insights` | Gọi Analytics API → kiểm tra success → build insight prompt → Gemini → report |
| Analytics API | POST `giaothoi-analytics` | 6 GA4 runReport: overview, trend, acquisition, devices, pages, events |
| Dashboard API | GET `giaothoi-dashboard` | 3 GA4 runReport: overview, trend, acquisition → format dashboard JSON |
| Content Studio API | POST `giaothoi-content-studio`; Execute Workflow Trigger | Product + Brand context → marketing prompt → Gemini → content response |
| Campaign Planner API | POST `giaothoi-campaign-planner`; Execute Workflow Trigger | Product + Brand context → campaign prompt → Gemini → campaign response |
| Content Approval API | POST `giaothoi-content-approval` | Update Content Library/Data Table row |
| Content Library API | GET `giaothoi-content-library`; POST `giaothoi-content-library-save` | Get rows / Insert row |
| Content Save API | POST `giaothoi-content-library-save` | Insert row vào Content Library |
| Calendar API | GET/POST/PUT/DELETE calendar endpoints | Get, insert, update, delete rows |
| Facebook Scheduled Publishing | Schedule Trigger | Đọc calendar → lọc bài đến hạn → lấy content Approved → validate media → Facebook publish → update status/retry |
| Facebook Auto Posting | POST `giaothoi-facebook-post` | Facebook Graph API feed post |
| Automation Center API | GET `giaothoi-automation-workflows` | n8n API list workflows → format |
| Automation Control API | POST `giaothoi-automation-control` | Validate publish/unpublish → n8n API activate/deactivate |
| Automation Executions API | GET `giaothoi-automation-executions` | n8n API lấy tối đa 100 executions → format |
| Automation Run API | POST `giaothoi-automation-run` | Allowlist TEST/CONTENT_STUDIO/CAMPAIGN_PLANNER → execute workflow |
| Schedule Management API | GET `giaothoi-schedules` | List workflows → get workflow details → đọc schedule |
| Test Manual Run | Execute Workflow Trigger | Trả kết quả test, input và timestamp |
| Test Automation Control | Manual Trigger | Workflow test, inactive trong export |

## 3. Webhook/API endpoints

`None` nghĩa là node Webhook không khai báo authentication ở cấp node; chưa kết luận được lớp proxy/gateway có bảo vệ endpoint hay không.

| Method | Path | Workflow | Auth trong export |
|---|---|---|---|
| POST | `giaothoi-ai-assistant` | AI Assistant API | None |
| POST | `giaothoi-marketing-insights` | Marketing Insights API | None |
| POST | `giaothoi-analytics` | Analytics API | None |
| GET | `giaothoi-dashboard` | Dashboard API | None |
| POST | `giaothoi-content-studio` | Content Studio API | None |
| POST | `giaothoi-campaign-planner` | Campaign Planner API | None |
| POST | `giaothoi-content-approval` | Content Approval API | None |
| GET | `giaothoi-content-library` | Content Library API | None |
| POST | `giaothoi-content-library-save` | Content Library API | headerAuth |
| POST | `giaothoi-content-library-save` | Content Save API | None |
| GET | `giaothoi-calendar` | Calendar API | headerAuth |
| POST | `giaothoi-calendar-save` | Calendar API | headerAuth |
| PUT | `giaothoi-calendar-update` | Calendar API | headerAuth |
| DELETE | `giaothoi-calendar-delete` | Calendar API | headerAuth |
| POST | `giaothoi-facebook-post` | Facebook Auto Posting | None |
| GET | `giaothoi-automation-workflows` | Automation Center API | None |
| POST | `giaothoi-automation-control` | Automation Control API | None |
| GET | `giaothoi-automation-executions` | Automation Executions API | None |
| POST | `giaothoi-automation-run` | Automation Run API | None |
| GET | `giaothoi-schedules` | Schedule Management API | None |

### Duplicate endpoint

Hai workflow cùng khai báo POST `giaothoi-content-library-save`: Content Library API có headerAuth, Content Save API không khai báo auth. Cần xác định workflow nào là endpoint chuẩn và đổi/xóa route dư sau khi kiểm tra frontend. Không thể kết luận route được xử lý thế nào khi cả hai cùng active chỉ từ export.

## 4. Các luồng chính

### AI Assistant
Website Admin → API proxy → `giaothoi-ai-assistant` → lấy `products.ts` và `product-marketing-context.md` từ GitHub raw → merge context → lọc tối đa 12 message user/assistant → build prompt → Google Gemini Chat Model → trả `success/content/message`.

Prompt runtime yêu cầu tiếng Việt tự nhiên, lập luận thực tế, không bịa giá/nguồn gốc/chất liệu; GIAO THỜI là đơn vị phân phối; phân biệt dữ liệu, giả định và đề xuất.

### Content Studio
Input prompt tham chiếu: `product`, `platform`, `contentType`, `objective`, `tone`, `brief`. Mặc định lần lượt: chưa xác định, Facebook, Social post, Tăng tương tác, Gần gũi/tự nhiên. Nạp Product + Brand context, gọi Gemini, trả nội dung.

### Campaign Planner
Input prompt tham chiếu: `campaignName`, `product`, `objective`, `targetAudience`, `duration`, `budget`, `channels`, `brief`. Output được yêu cầu: overview, strategy, channel plan, budget, timeline, KPI, resource/risk. Không tự thêm kênh ngoài lựa chọn; nếu chưa có ngân sách thì chỉ đề xuất tỷ trọng.

### Analytics
Analytics API nhận period 7/28/90 (mặc định 7), kết thúc hôm qua; trả overview, trend, acquisition, devices, pages, events. Marketing Insights API gọi Analytics API rồi dùng Gemini viết Executive Summary, Performance Analysis, Key Insights, Recommendations, Next Steps.

### Facebook Scheduled Publishing
Schedule Trigger → đọc Calendar → lọc Facebook post đến hạn hoặc retry đến hạn → lấy content có status Approved → validate media → claim Publishing → đăng → cập nhật Published/Failed.
- Nhiều ảnh trong một album hoặc một video trong một bài.
- Không cho phép một bài chứa đồng thời ảnh và video.
- Không cho phép nhiều video trong một bài.
- Không đăng lại nếu đã có Facebook Post ID.
- Tối đa 3 lần thử; retryAfter lần đầu 5 phút, lần sau 15 phút.

### Automation
Các API liệt kê workflow, đọc schedule/executions, chạy workflow allowlist và activate/deactivate workflow. Endpoint quản trị cần xác thực, phân quyền theo vai trò, allowlist workflow IDs và audit log cho thao tác làm thay đổi trạng thái.

## 5. Data Tables và tích hợp

- `GIAO THOI Content Calendar`: postId, contentId, platform, date/time, status, Facebook Post ID, publishedAt, publishError, retryCount, retryAfter.
- `GIAO THOI Content Library`: nội dung, trạng thái duyệt, media và thông tin được Scheduled Publishing dùng.
- Dịch vụ xuất hiện: GitHub raw files, Google Gemini, Google Analytics Data API, n8n REST API, n8n Data Tables, Facebook Graph API, Supabase Storage signed URLs.

## 6. Giới hạn

- Export không chứng minh workflow đang active hoặc chạy thành công hiện tại.
- Credential references chỉ cho biết tên credential, không xác nhận secret hay quyền.
- Không có execution logs nên chưa xác nhận end-to-end.
- Không commit raw exports khi chưa rà soát IDs, credential references, internal URLs và dữ liệu vận hành.
