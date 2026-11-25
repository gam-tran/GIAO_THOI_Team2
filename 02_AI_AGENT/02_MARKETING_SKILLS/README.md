# Marketing Skills

Thư mục này tập hợp bối cảnh GIAO THỜI, các hướng dẫn chuyên môn Marketing và tài liệu tham khảo được tổ chức để sử dụng nhất quán trong hệ thống AI Agent.

## 1. Bối cảnh GIAO THỜI

- [Product Marketing Context](./product-marketing-context.md) – tổng hợp mô hình kinh doanh, thương hiệu, khách hàng, sản phẩm, định vị và mục tiêu Marketing. Tài liệu đóng vai trò bối cảnh định hướng; các giả định cần được phân biệt với dữ kiện đã xác thực.
- [Brand Knowledge](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/docs/brand-knowledge.md) – nguồn kiến thức thương hiệu được truy xuất riêng trong workflow AI Assistant và các công cụ liên quan.

## 2. Danh sách Skills

| Skill | Chức năng |
|---|---|
| [Content Strategy](./skills/content-strategy/SKILL.md) | Xây dựng chiến lược và định hướng nội dung |
| [Social Content](./skills/social-content/SKILL.md) | Lập kế hoạch và sáng tạo nội dung mạng xã hội |
| [Copywriting](./skills/copywriting/SKILL.md) | Viết thông điệp, nội dung quảng cáo và nội dung chuyển đổi |
| [Marketing Ideas](./skills/marketing-ideas/SKILL.md) | Phát triển ý tưởng Marketing theo mục tiêu và nguồn lực |
| [Campaign Planning](./skills/campaign-planning/SKILL.md) | Lập kế hoạch chiến dịch, kênh, ngân sách, timeline và KPI |
| [Analytics Tracking](./skills/analytics-tracking/SKILL.md) | Thiết kế đo lường, sự kiện, GA4 và GTM |

## 3. Tài liệu tham khảo

- **Analytics Tracking:** [Event Library](./skills/analytics-tracking/references/event-library.md), [GA4 Implementation](./skills/analytics-tracking/references/ga4-implementation.md), [GTM Implementation](./skills/analytics-tracking/references/gtm-implementation.md).
- **Copywriting:** [Copy Frameworks](./skills/copywriting/references/copy-frameworks.md), [Natural Transitions](./skills/copywriting/references/natural-transitions.md).
- **Marketing Ideas:** [Ideas by Category](./skills/marketing-ideas/references/ideas-by-category.md).
- **Social Content:** [Platforms](./skills/social-content/references/platforms.md), [Post Templates](./skills/social-content/references/post-templates.md), [Reverse Engineering](./skills/social-content/references/reverse-engineering.md).

## 4. Quan hệ giữa thư viện tài liệu và Agent Builder

Các file Markdown trong thư mục này là thư viện tài liệu chuyên môn của dự án. Trong cấu hình Agent Builder, HTTP Request fetcher được khai báo cho năm Skills: Content Strategy, Social Content, Copywriting, Campaign Planning và Analytics Tracking. Các Reference fetcher được khai báo riêng cho tám tài liệu tham khảo thuộc Social Content, Copywriting và Analytics Tracking.

Marketing Ideas được lưu trong thư viện nhưng không nằm trong danh sách năm Skill fetcher đã cấu hình. Product Marketing Context cũng được lưu trong thư viện; không có endpoint fetcher riêng cho tài liệu này trong danh sách cấu hình được đối chiếu. Nguồn Brand Knowledge được truy xuất qua endpoint riêng.

Việc một tài liệu tồn tại trong Git không đồng nghĩa tài liệu đó tự động được nạp vào mọi Agent hoặc workflow. Phạm vi sử dụng phụ thuộc vào công cụ và luồng xử lý được cấu hình cho từng thành phần.
