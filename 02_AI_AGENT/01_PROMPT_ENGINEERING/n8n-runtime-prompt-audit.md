# n8n Runtime Prompt Architecture and Review

## 1. Phạm vi và nguồn đối chiếu

Tài liệu phân tích tĩnh ba workflow JSON export:

- GIAO THỜI – AI Assistant API
- GIAO THỜI – Campaign Planner API
- GIAO THỜI – Content Studio API

Phân tích tập trung vào node parameters, Code node, kết nối dữ liệu, prompt template và cấu trúc đầu vào/đầu ra. Thông tin Agent Builder được đối chiếu riêng với ảnh giao diện và danh mục mô tả Tool do nhóm cung cấp ngày 25/11/2026.

Các nhận định về workflow phản ánh nội dung trong export tại thời điểm xuất file. Cờ `active` trong JSON không phải bằng chứng độc lập về trạng thái triển khai hiện tại hoặc kết quả thực thi thành công.

## 2. So sánh ba workflow

| Tiêu chí | AI Assistant | Campaign Planner | Content Studio |
|---|---|---|---|
| Vai trò | Trợ lý Marketing tổng quát | Chuyên gia lập kế hoạch chiến dịch | Chuyên viên sáng tạo nội dung |
| Mục tiêu | Hỗ trợ hội thoại về Marketing, thương hiệu, nội dung và kinh doanh | Xây dựng kế hoạch Marketing có cấu trúc | Tạo nội dung theo nền tảng, định dạng, mục tiêu và giọng điệu |
| Product source | GitHub `products.ts` | GitHub `products.ts` | GitHub `products.ts` |
| Brand source | Product Marketing Context Markdown theo export | Cùng nguồn theo export | Cùng nguồn theo export |
| Lịch sử hội thoại | Tối đa 12 message user/assistant hợp lệ | Không thể hiện cơ chế hội thoại | Không thể hiện cơ chế hội thoại |
| Model ghi rõ trong export | Không có modelName tường minh | Không có modelName tường minh | `gemini-3.1-flash-lite` |
| Prompt builder | Code node | Code node | Code node |
| LLM input | `$json.prompt` | `$json.prompt` | `$json.prompt` |

## 3. Kiến trúc prompt

Ba workflow có prompt riêng vì mỗi workflow phục vụ một nhiệm vụ và có cấu trúc dữ liệu khác nhau.

### 3.1. Central Agent Instructions

Lớp hướng dẫn trung tâm quản lý:

- Danh tính và bối cảnh kinh doanh GIAO THỜI.
- Quy tắc về dữ liệu sản phẩm, thương hiệu và tính trung thực.
- Cách phân biệt dữ kiện, phép tính, nhận định và giả thuyết.
- Nguyên tắc bảo mật, quyền hạn và phê duyệt của con người.
- Phân loại yêu cầu và lựa chọn công cụ phù hợp.
- Phong cách giao tiếp và tiêu chuẩn chất lượng đầu ra.

### 3.2. Workflow-specific prompts

Mỗi workflow giữ lại các thành phần đặc thù:

- **AI Assistant:** lịch sử hội thoại, Product Data, Brand Knowledge và cách phản hồi yêu cầu tổng quát.
- **Campaign Planner:** thông tin chiến dịch, kênh, ngân sách, timeline, KPI và cấu trúc kế hoạch.
- **Content Studio:** sản phẩm, nền tảng, loại nội dung, mục tiêu, giọng điệu và brief.

Không gộp toàn bộ logic nghiệp vụ vào một prompt duy nhất vì sẽ làm mờ trách nhiệm của từng workflow và tăng nguy cơ áp dụng nhầm quy tắc.

## 4. Findings từ workflow exports

### 4.1. Nguồn Product Data và Brand Knowledge

Ba workflow lấy nội dung nguồn từ repository website `gam-tran/giao-thoi-website-v3`, branch `feature/ga4-ai-agent`, rồi đưa vào prompt qua Code node.

Cách tiếp cận này giúp prompt sử dụng dữ liệu nguồn thay vì nhúng cố định toàn bộ catalogue vào Instructions. Tuy nhiên, nội dung được tải phụ thuộc phiên bản file tại thời điểm request; workflow export không đóng gói snapshot của các file nguồn.

Các prompt cần giữ nguyên nguyên tắc: chỉ khẳng định thông tin sản phẩm có trong nguồn, không tự tạo giá, chất liệu, xuất xứ, công dụng, đánh giá hoặc chính sách.

### 4.2. AI Assistant

Workflow ID: `R8WodfzrnKEdNdst`.

Node `Prepare Assistant Context` yêu cầu `messages` là mảng không rỗng, chỉ giữ role `user` hoặc `assistant`, content dạng chuỗi không rỗng và giới hạn 12 message gần nhất. Node `Build Assistant Prompt` ghép Product Data, Brand Knowledge và conversation thành prompt gửi tới Gemini Chat Model.

Export không thể hiện node memory riêng, Skill loader, vector store hoặc tool-calling agent node trong workflow này. Vì vậy, không mô tả workflow này có persistent memory hoặc tự động nạp toàn bộ Skills của Agent Builder.

### 4.3. Campaign Planner

Workflow ID: `ZAz7EqRdeQJAKDtP`.

Đầu vào gồm `campaignName`, `product`, `objective`, `targetAudience`, `duration`, `budget`, `channels` và `brief`. Đầu ra được tổ chức thành Campaign Overview, Campaign Strategy, Channel Plan, Budget Plan, Timeline, KPI Plan và Resource and Risk.

Code builder gọi `request.channels.join(', ')` mà không kiểm tra trước kiểu dữ liệu. Nếu `channels` bị thiếu hoặc không phải mảng, prompt có thể lỗi trước khi gọi model. Các trường chiến dịch khác cũng được nội suy trực tiếp mà không có lớp kiểm tra đầy đủ trường bắt buộc.

Quy tắc nghiệp vụ trong prompt yêu cầu không tự thêm kênh, tổng ngân sách phân bổ phải khớp ngân sách đầu vào và KPI không có dữ liệu lịch sử phải được ghi là mục tiêu đề xuất. Những quy tắc này cần đi cùng kiểm tra schema ở lớp nhận request; chỉ dẫn bằng ngôn ngữ tự nhiên không thể ngăn lỗi JavaScript trong Code node.

### 4.4. Content Studio

Workflow ID: `SfgClDsh7BblZHzL`.

Đầu vào gồm `product`, `platform`, `contentType`, `objective`, `tone` và `brief`. Code node có giá trị mặc định cho các trường chính. Model được ghi rõ trong export là `models/gemini-3.1-flash-lite`.

Prompt yêu cầu tra cứu sản phẩm trong nguồn trước khi viết, không bịa thông tin và định vị GIAO THỜI là đơn vị phân phối. Quy tắc media Facebook được chuẩn hóa: một bài có thể chứa album ảnh hoặc một video riêng; không kết hợp ảnh và video trong cùng bài. Khi brief yêu cầu cả hai định dạng, cần hỏi người dùng chọn một, không tự tách thành hai bài.

Quy tắc media là chỉ dẫn trong prompt. Việc chặn payload không hợp lệ trước upload hoặc publish cần được thực hiện ở lớp giao diện/workflow tương ứng.

## 5. Model configuration

Content Studio export ghi rõ model `gemini-3.1-flash-lite`. Hai workflow AI Assistant và Campaign Planner có node Google Gemini Chat Model nhưng export không ghi rõ `modelName` trong phần options.

Do đó, không kết luận cả ba workflow dùng cùng một model/version chỉ dựa trên các JSON exports. Model selector của Agent Builder cũng là cấu hình riêng, không thay thế bằng chứng về model được chọn trong từng Gemini node của n8n.

## 6. Agent Builder và 16 HTTP Request tools

Ảnh Builder ngày 25/11/2026 thể hiện model selector `gemini-3.1-flash-lite`, trigger `n8n Chat`, 16 HTTP Request tools, Google Analytics capability và Web search Off. Khu vực Skills không hiển thị Skill đã gắn trong ảnh.

Danh mục 16 HTTP Request được đối chiếu từ mô tả cấu hình:

| Nhóm | Số lượng | Nội dung |
|---|---:|---|
| Product Catalogue | 1 | GitHub raw product source |
| GA4 Report | 1 | GA4 Data API runReport cho Property 557199346 |
| Brand Knowledge | 1 | GitHub raw brand knowledge |
| Skill fetchers | 5 | Content Strategy, Social Content, Copywriting, Analytics Tracking, Campaign Planning |
| Reference fetchers | 8 | Social Content (3), Copywriting (2), Analytics Tracking (3) |
| **Tổng** | **16** | |

GA4 Request Body Builder được mô tả như logic chuẩn bị JSON body, không được tính thành HTTP Request thứ 17. Marketing Ideas Skill và Product Marketing Context có file trong Git nhưng không nằm trong danh sách fetch endpoint được ghi nhận.

HTTP Request fetcher là cơ chế truy xuất nội dung qua endpoint; nó không đồng nghĩa với native Skill attachment trong Builder. Việc một endpoint được khai báo cũng không tự chứng minh response đã được truyền vào model context.

## 7. Nguyên tắc thiết kế và kiểm soát

| Chủ đề | Nguyên tắc |
|---|---|
| Phân tầng prompt | Central Instructions quản lý quy tắc chung; workflow prompt quản lý nhiệm vụ cụ thể |
| Tool routing | Chỉ gọi công cụ cần thiết cho yêu cầu và khả dụng trong phiên |
| Source of truth | Dùng Product Catalogue và Brand Knowledge có nguồn; không tự điền dữ kiện thiếu |
| GA4 | Chỉ sử dụng Metrics/Dimensions hợp lệ theo GA4 Data API và tổ hợp truy vấn được hỗ trợ |
| Input validation | Kiểm tra trường bắt buộc, kiểu dữ liệu, mảng channels và ngân sách trước khi dựng prompt |
| Facebook media | Một bài là album ảnh hoặc một video; mixed media cần người dùng chọn định dạng |
| External actions | Đăng bài, gửi thông điệp, chi tiêu quảng cáo và thay đổi hệ thống phải có quyền và phê duyệt phù hợp |
| Evidence | Phân biệt cấu hình, nội dung response và execution thực tế |

## 8. Kết luận

Ba workflow có phạm vi nhiệm vụ khác nhau và nên tiếp tục sử dụng prompt chuyên biệt, đặt dưới một lớp quy tắc trung tâm thống nhất. Các điểm quan trọng về chất lượng nằm ở tính chính xác của nguồn dữ liệu, kiểm tra đầu vào trước prompt builder, sự nhất quán giữa Builder và n8n runtime, cùng cơ chế kiểm soát các hành động có tác động bên ngoài.

Tài liệu này là phân tích tĩnh từ workflow exports và cấu hình Builder được cung cấp. Kết luận về runtime, quyền credentials, trạng thái endpoint và hiệu quả thực thi cần được đối chiếu bằng cấu hình triển khai và execution tương ứng.
