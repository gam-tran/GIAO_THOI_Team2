# GIAO THỜI – Marketing Skills Library

Thư viện này tổ chức các tài liệu bối cảnh và hướng dẫn chuyên môn Marketing phục vụ việc xây dựng, vận hành và phát triển GIAO THỜI Marketing AI Agent.

## 1. Tài liệu bối cảnh

| Tài liệu | Vai trò |
|---|---|
| [Product Marketing Context](./product-marketing-context.md) | Tổng hợp bối cảnh mô hình kinh doanh, thương hiệu, sản phẩm, khách hàng mục tiêu, định vị và mục tiêu Marketing |

Product Marketing Context là tài liệu định hướng để cung cấp ngữ cảnh cho hoạt động Marketing. Các giả định hoặc thông tin chưa có nguồn xác nhận cần được phân biệt với dữ kiện sản phẩm và thương hiệu đã được kiểm chứng.

## 2. Danh sách Skills

### Chiến lược và sáng tạo nội dung

| Skill | Chức năng |
|---|---|
| [Content Strategy](./skills/content-strategy/SKILL.md) | Xây dựng chiến lược nội dung, mục tiêu, trụ cột và định hướng triển khai |
| [Social Content](./skills/social-content/SKILL.md) | Lập kế hoạch và phát triển nội dung trên các nền tảng mạng xã hội |
| [Copywriting](./skills/copywriting/SKILL.md) | Xây dựng thông điệp, nội dung quảng cáo, mô tả sản phẩm và nội dung chuyển đổi |
| [Marketing Ideas](./skills/marketing-ideas/SKILL.md) | Phát triển ý tưởng Marketing dựa trên mục tiêu, đối tượng và nguồn lực |

### Lập kế hoạch và đo lường

| Skill | Chức năng |
|---|---|
| [Campaign Planning](./skills/campaign-planning/SKILL.md) | Xây dựng kế hoạch chiến dịch, kênh triển khai, ngân sách, tiến độ và KPI |
| [Analytics Tracking](./skills/analytics-tracking/SKILL.md) | Thiết kế đo lường, sự kiện, chỉ số và triển khai GA4/GTM |

## 3. Tài liệu tham khảo chuyên môn

- **Social Content:** [Platforms](./skills/social-content/references/platforms.md), [Post Templates](./skills/social-content/references/post-templates.md), [Reverse Engineering](./skills/social-content/references/reverse-engineering.md).
- **Copywriting:** [Copy Frameworks](./skills/copywriting/references/copy-frameworks.md), [Natural Transitions](./skills/copywriting/references/natural-transitions.md).
- **Marketing Ideas:** [Ideas by Category](./skills/marketing-ideas/references/ideas-by-category.md).
- **Analytics Tracking:** [Event Library](./skills/analytics-tracking/references/event-library.md), [GA4 Implementation](./skills/analytics-tracking/references/ga4-implementation.md), [GTM Implementation](./skills/analytics-tracking/references/gtm-implementation.md).

## 4. Nguyên tắc sử dụng

1. Chọn Skill theo đúng mục tiêu công việc thay vì áp dụng toàn bộ hướng dẫn cho mọi yêu cầu.
2. Kết hợp phương pháp trong Skill với dữ liệu sản phẩm và bối cảnh thương hiệu có nguồn xác thực.
3. Không tự suy diễn giá, chất liệu, xuất xứ, chính sách hoặc đặc điểm sản phẩm khi tài liệu nguồn không cung cấp.
4. Phân biệt dữ kiện, phép tính, nhận định và giả thuyết trong các nội dung phân tích.
5. Cập nhật tài liệu theo phiên bản để duy trì tính nhất quán giữa các workflow và hoạt động Marketing.

## 5. Quan hệ với Agent runtime

Các Skills và References được lưu trong Git dưới dạng tài liệu Markdown. Trong cấu hình Agent Builder, các HTTP Request fetcher được khai báo cho năm Skills: Content Strategy, Social Content, Copywriting, Campaign Planning và Analytics Tracking; các Reference fetcher được khai báo riêng theo nhóm nội dung. Marketing Ideas có trong thư viện tài liệu nhưng không nằm trong danh sách năm Skill fetcher đã cấu hình.

Product Marketing Context là tài liệu bối cảnh trong thư viện; nguồn Brand Knowledge được truy xuất riêng qua endpoint tương ứng. Việc lưu tài liệu trong thư viện và việc một Agent nạp tài liệu vào ngữ cảnh xử lý là hai cơ chế khác nhau.
