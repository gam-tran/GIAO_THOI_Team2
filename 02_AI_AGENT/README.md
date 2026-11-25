# 02 – AI Agent System

Thư mục này lưu tài liệu bàn giao và tài nguyên phát triển AI Agent GIAO THỜI.

## Cấu trúc
| Thư mục | Nội dung |
|---|---|
| [01_PROMPT_ENGINEERING](./01_PROMPT_ENGINEERING/README.md) | Prompt đã đối chiếu mã nguồn và bản Instructions đề xuất |
| [02_MARKETING_SKILLS](./02_MARKETING_SKILLS/README.md) | Brand/Product context, 6 Marketing Skills và references |
| [03_AGENTS](./03_AGENTS/README.md) | Vai trò Agent, Builder configuration và runtime mapping |
| [04_WORKFLOWS](./04_WORKFLOWS/README.md) | Danh mục workflow n8n, endpoints và luồng nghiệp vụ |
| [05_INTEGRATIONS](./05_INTEGRATIONS/README.md) | Sơ đồ tích hợp, dịch vụ và security/reliability review |

## Nguồn
- [Repository website nguồn](https://github.com/gam-tran/giao-thoi-website-v3/tree/feature/ga4-ai-agent)
- [AI Assistant frontend](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AIAssistant.tsx)
- [n8n API proxy](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)

## Mức độ xác minh
- **Mã nguồn Git:** frontend AI Assistant, API proxy, Product/Brand context và Marketing Skills.
- **Agent Builder screenshot:** model selector, trigger, Tools, Skills panel và Web search.
- **n8n exports:** 19 workflow JSON, 20 webhook triggers, node connections, prompt templates, credential references và cấu hình tích hợp.
- **Chưa xác minh runtime:** execution logs, cấu hình đang triển khai tại n8n, quyền thực tế của credentials, khả năng truy cập trực tiếp webhook và trạng thái production hiện tại.

Không coi file trong Git hoặc cờ active trong JSON export là bằng chứng tính năng đang chạy thành công. Không lưu credential, token, webhook secret hoặc dữ liệu cá nhân trong repository.
