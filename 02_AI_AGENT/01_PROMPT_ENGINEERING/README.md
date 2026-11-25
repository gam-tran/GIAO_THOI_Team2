# Prompt Engineering

Thư mục này tổng hợp tài liệu thiết kế và hướng dẫn prompt cho GIAO THỜI Marketing AI Agent, từ cấp Agent đến các workflow chuyên biệt.

## 1. Thiết kế và định hướng

| Tài liệu | Nội dung |
|---|---|
| [Central Agent Instructions](./marketing-ai-agent-instructions-v1.md) | Vai trò Agent, bối cảnh GIAO THỜI, nguyên tắc sử dụng dữ liệu và công cụ, định tuyến tác vụ, quy tắc đầu ra và giới hạn quyền |
| [AI Agent Design Decisions](./ai-agent-design-decisions.md) | Các quyết định thiết kế trọng yếu, vấn đề đặt ra, phương án lựa chọn, cơ sở lựa chọn và tác động đến hệ thống |

## 2. Prompt theo từng workflow n8n

| Tài liệu | Workflow / node | Nội dung |
|---|---|---|
| [AI Assistant Runtime Prompt](./n8n-ai-assistant-runtime-prompt.md) | AI Assistant API / Build Assistant Prompt | Prompt hội thoại và hỗ trợ Marketing tổng hợp |
| [Campaign Planner Runtime Prompt](./n8n-campaign-planner-runtime-prompt.md) | Campaign Planner API / Build Campaign Prompt | Prompt lập kế hoạch chiến dịch theo brief, kênh, ngân sách và KPI |
| [Content Studio Runtime Prompt](./n8n-content-studio-runtime-prompt.md) | Content Studio API / Build Marketing Prompt | Prompt tạo nội dung theo sản phẩm, nền tảng, định dạng, mục tiêu và giọng điệu |
| [n8n Runtime Prompt Audit](./n8n-runtime-prompt-audit.md) | Đối chiếu ba workflow | So sánh cấu trúc prompt, đầu vào, nguồn dữ liệu và các quy tắc xử lý |

## 3. Prompt và cấu trúc đầu vào từ frontend

| Tài liệu | Nội dung |
|---|---|
| [Frontend Suggested Prompts](./frontend-suggested-prompts.md) | Các prompt gợi ý hiển thị trong giao diện Marketing AI Assistant |
| [Workflow Input Templates](./workflow-input-templates.md) | Brief, giá trị mặc định và payload gửi từ Automation Center tới Content Studio/Campaign Planner |

## 4. Kiến trúc phân lớp

- **Central Agent Instructions:** quản lý danh tính, bối cảnh thương hiệu, nguyên tắc chung, giới hạn quyền và định tuyến.
- **Workflow-specific Prompts:** quản lý nhiệm vụ, biến đầu vào, cấu trúc đầu ra và quy tắc riêng của từng workflow.
- **Skills/References:** cung cấp phương pháp Marketing và kiến thức chuyên sâu có thể tái sử dụng.

Cách phân lớp này giúp hạn chế trùng lặp, giữ đúng ngữ cảnh cho từng tác vụ và hỗ trợ cập nhật từng thành phần độc lập.

## 5. Nguồn mã nguồn đối chiếu

- [AI Assistant frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [Automation Center frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AutomationCenter.tsx)
- [n8n API proxy](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)

---

**Phạm vi tài liệu:** Các runtime prompt và phần đối chiếu workflow mô tả cấu trúc được thể hiện trong các JSON exports; Central Instructions và Design Decisions thống nhất nguyên tắc vận hành và logic thiết kế của Agent.
