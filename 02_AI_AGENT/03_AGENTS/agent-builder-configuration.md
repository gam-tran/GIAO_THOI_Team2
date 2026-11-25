# Agent Builder Configuration – GIAO THỜI Marketing AI Agent

**Nguồn đối chiếu:** Ảnh chụp giao diện Build do nhóm cung cấp ngày 25/11/2026, kết hợp danh mục mô tả Tool và endpoint được cung cấp cho dự án.  
**Phạm vi:** Tài liệu hóa cấu hình hiển thị và phân biệt Agent Builder với các workflow n8n runtime.

## 1. Cấu hình hiển thị trên Agent Builder

| Khu vực | Giá trị quan sát được | Ý nghĩa |
|---|---|---|
| Agent name | GIAO THỜI – Marketing AI Agent | Tên Agent trên giao diện Build |
| Model | gemini-3.1-flash-lite | Model được hiển thị trong model selector |
| Instructions | Prompt hướng dẫn dài về Marketing Analytics, orchestration và các module | Lớp hướng dẫn cấp Agent |
| Skills | Khu vực Skills không hiển thị Skill đã gắn trong ảnh | Phân biệt với các tài nguyên có thể truy xuất qua HTTP Request |
| Trigger channel | n8n Chat | Kênh trigger được hiển thị |
| HTTP Request | 16 công cụ | Các endpoint đọc dữ liệu, truy xuất Skills/References và gọi GA4 theo mô tả cấu hình |
| Google analytics | Google analytics | Công cụ Analytics hiển thị riêng trong Capabilities |
| Web search | Off | Web search không được bật trong ảnh |

## 2. Skills và References trong thư viện lựa chọn

### Marketing Skills

- Content Strategy
- Social Content
- Copywriting
- Analytics Tracking
- Campaign Planning

### References

- Social Platforms
- Social Post Templates
- Social Reverse Engineering
- Copywriting Frameworks
- Natural Transitions
- Analytics Event Library
- GA4 Implementation
- GTM Implementation

Marketing Ideas Skill và Product Marketing Context có trong thư viện Git của dự án nhưng không nằm trong danh sách tài nguyên hiển thị ở khu vực lựa chọn của ảnh Builder được đối chiếu.

## 3. Danh mục 16 HTTP Request

Danh mục endpoint được cung cấp được phân nhóm như sau:

| Nhóm | Số lượng | Thành phần |
|---|---:|---|
| Product Catalogue | 1 | Đọc nguồn dữ liệu sản phẩm từ GitHub |
| GA4 Report | 1 | POST đến GA4 Data API, Property ID 557199346 |
| Brand Knowledge | 1 | Đọc tài liệu brand knowledge từ GitHub |
| Skill fetchers | 5 | Content Strategy, Social Content, Copywriting, Analytics Tracking, Campaign Planning |
| Reference fetchers | 8 | Ba Social Content, hai Copywriting và ba Analytics Tracking References |
| **Tổng** | **16** | |

GA4 Request Body Builder được mô tả như logic tạo request body cho báo cáo GA4. Thông tin cấu hình không xác định đây là HTTP Request thứ 17; do đó thành phần này không được cộng vào số lượng endpoint.

## 4. Phân biệt các lớp cấu hình

Agent Builder và n8n runtime là hai lớp riêng:

- **Agent Builder:** quản lý danh tính Agent, Instructions, model selector, trigger và các Tools/Skills được khai báo trên giao diện.
- **HTTP Request tools:** truy xuất các endpoint được cấu hình, bao gồm Product Catalogue, Brand Knowledge, Skills và References.
- **n8n workflows:** có webhook, node xử lý dữ liệu, prompt builder và Gemini Chat Model riêng theo từng workflow.

Việc một Skill có file trong Git không đồng nghĩa Skill được gắn vào khu vực Skills hoặc tự động được nạp vào mọi workflow. Tương tự, model hiển thị ở Builder không xác định model thực tế của từng Gemini Chat Model node trong n8n.

## 5. Giới hạn của bằng chứng cấu hình

Ảnh Builder và mô tả Tool cho phép ghi nhận tên hiển thị, nhóm chức năng và endpoint được khai báo. Chúng không tự chứng minh:

- Request đến endpoint đã thực thi thành công và trả đúng dữ liệu.
- Response của từng Skill/Reference được truyền vào model context.
- Google Analytics tool và GA4 workflow sử dụng cùng credential hoặc cùng cấu hình truy vấn.
- Tùy chọn Require approval đang bật cho từng Tool.
- Agent Builder gọi trực tiếp workflow AI Assistant hay sử dụng một luồng xử lý khác.
- Model selector và model node trong n8n đang sử dụng cùng phiên bản.

Các kết luận về vận hành cần dựa trên cấu hình runtime và execution tương ứng, không suy ra chỉ từ giao diện Builder.
