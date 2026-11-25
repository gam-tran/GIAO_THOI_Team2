# Prompt Engineering

Thư mục này lưu prompt theo từng lớp thực thi của GIAO THỜI AI, gồm prompt cấp Agent, prompt runtime trong n8n, cấu trúc đầu vào và bộ kiểm thử.

## 1. Central Agent Instructions

| Tài liệu | Nội dung | Trạng thái |
|---|---|---|
| [marketing-ai-agent-instructions-v1.md](./marketing-ai-agent-instructions-v1.md) | Central Instructions v2.0, đã chuẩn hóa theo ảnh Builder và nội dung Instructions người dùng gửi | Builder-aligned draft – chưa dán lại vào Builder hoặc kiểm thử runtime |

## 2. n8n runtime prompts — trích xuất từ workflow exports

| Tài liệu | Workflow / node | Trạng thái |
|---|---|---|
| [n8n-ai-assistant-runtime-prompt.md](./n8n-ai-assistant-runtime-prompt.md) | AI Assistant API / Build Assistant Prompt | Đã trích xuất tĩnh từ JSON |
| [n8n-campaign-planner-runtime-prompt.md](./n8n-campaign-planner-runtime-prompt.md) | Campaign Planner API / Build Campaign Prompt | Đã trích xuất tĩnh từ JSON |
| [n8n-content-studio-runtime-prompt.md](./n8n-content-studio-runtime-prompt.md) | Content Studio API / Build Marketing Prompt | Đã trích xuất tĩnh từ JSON |
| [n8n-runtime-prompt-audit.md](./n8n-runtime-prompt-audit.md) | So sánh 3 workflow, phát hiện, remediation notes và test matrix | Static review + remediation specs; runtime tests pending |

Các prompt runtime được xây dựng trong Code node rồi truyền vào LLM node qua `$json.prompt`. Chúng là các prompt riêng theo tác vụ, không phải một System Prompt duy nhất dùng chung.

## 3. Frontend prompts and input contracts

| Tài liệu | Nội dung | Trạng thái |
|---|---|---|
| [frontend-suggested-prompts.md](./frontend-suggested-prompts.md) | Prompt gợi ý hiển thị trong giao diện Marketing AI Assistant | Đã đối chiếu mã nguồn |
| [workflow-input-templates.md](./workflow-input-templates.md) | Brief, giá trị mặc định và payload gửi từ Automation Center tới Content Studio/Campaign Planner | Đã đối chiếu mã nguồn |

## 4. Kiến trúc phân lớp đề xuất

- **Central Agent Instructions:** danh tính, bối cảnh thương hiệu, nguyên tắc chung, giới hạn quyền, phân loại tác vụ và định tuyến.
- **Workflow-specific prompts:** nhiệm vụ, biến đầu vào, định dạng đầu ra và quy tắc riêng của từng workflow.
- **Skills/references:** phương pháp Marketing và kiến thức chuyên sâu có thể tái sử dụng.

Không gộp toàn bộ prompt tác vụ vào Central Instructions nếu điều đó tạo trùng lặp hoặc khiến biến đầu vào của workflow bị mất.

## 5. Việc còn phải xác minh

- Cấu hình đang triển khai thực tế trên n8n và execution logs.
- Model/version thực tế của AI Assistant và Campaign Planner (JSON export không khai báo rõ modelName).
- Xác minh endpoint/schema của 16 HTTP Request và phạm vi truy vấn thực tế của Google Analytics Tool.
- Kiểm thử end-to-end theo test matrix trong `n8n-runtime-prompt-audit.md`.
- Triển khai và kiểm thử deterministic validation cho Facebook mixed-media ở frontend/workflow (prompt guardrail đã được ghi nhận).
- Áp dụng input validation cho Campaign Planner Code node theo patch đề xuất (chưa deploy).

## 6. Nguồn mã nguồn đối chiếu

- [AI Assistant frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [Automation Center frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AutomationCenter.tsx)
- [n8n API proxy](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)

## 7. Phạm vi xác minh

Tài liệu runtime prompt phản ánh cấu hình có trong ba JSON exports được cung cấp. Cờ `active: true` trong file export không đủ để kết luận workflow hiện đang hoạt động hoặc chạy thành công. Không lưu credential, token, webhook secret hay dữ liệu cá nhân trong repository.
