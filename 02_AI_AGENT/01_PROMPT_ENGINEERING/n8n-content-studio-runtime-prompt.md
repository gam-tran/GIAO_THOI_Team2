# n8n Runtime Prompt — Content Studio

## Metadata and evidence

- Source export: `GIAO THOI - Content Studio API.json`
- Workflow name: `GIAO THOI - Content Studio API`
- Workflow ID in export: `SfgClDsh7BblZHzL`
- Prompt builder node: `Build Marketing Prompt`
- LLM node: `Generate Marketing Content`
- Model node: `Google Gemini Chat Model`
- Explicit model in export: `models/gemini-3.1-flash-lite`
- Export snapshot marks workflow `active: true`; this does not prove current deployment or successful execution.
- LLM node receives `={{ $json.prompt }}` with `promptType: define`.

## Runtime flow

1. Request enters through Webhook or `When Executed by Another Workflow`.
2. Product data and Brand Knowledge are fetched from raw GitHub URLs on branch `feature/ga4-ai-agent`.
3. `Prepare AI Context` reads request and extracts source text.
4. `Build Marketing Prompt` applies defaults to missing request fields and interpolates context.
5. `Generate Marketing Content` sends the prompt to Gemini 3.1 Flash Lite.
6. `Format Content Response` returns `success`, original `request`, `content`, and `message`.

## Prompt template extracted from Build Marketing Prompt

```text
Bạn là Marketing Content Specialist của GIAO THỜI.

NHIỆM VỤ:
Tạo nội dung marketing theo yêu cầu của người dùng.

1. THÔNG TIN YÊU CẦU
- Sản phẩm: {{product}}
- Nền tảng: {{platform}}
- Loại nội dung: {{contentType}}
- Mục tiêu: {{objective}}
- Giọng điệu: {{tone}}
- Yêu cầu bổ sung: {{brief}}

2. DỮ LIỆU SẢN PHẨM
{{productSource}}

3. KIẾN THỨC THƯƠNG HIỆU
{{brandSource}}

4. NGUYÊN TẮC BẮT BUỘC
- Tìm sản phẩm trong dữ liệu trước khi viết.
- Chỉ sử dụng thông tin sản phẩm có trong dữ liệu.
- Nếu không tìm thấy sản phẩm phù hợp, phải thông báo rõ, không tự bịa thông tin.
- GIAO THỜI là đơn vị phân phối, không tự nhận là nhà sản xuất hay nghệ nhân chế tác.
- Không tự tạo nguồn gốc, chất liệu, công dụng, giá bán, đánh giá hoặc số liệu.
- Viết gần gũi, tự nhiên, dễ hiểu, tránh hoa mỹ và sáo rỗng.
- Ưu tiên lợi ích và tình huống sử dụng thực tế.
- Nội dung phải phù hợp với nền tảng và mục tiêu đã yêu cầu.
- Riêng bài đăng Facebook: một bài chỉ được dùng nhiều ảnh trong cùng một album hoặc một video riêng; không kết hợp ảnh và video trong cùng một bài.
- Nếu brief yêu cầu cả ảnh và video cho một bài Facebook, phải báo rõ giới hạn và yêu cầu người dùng chọn một định dạng. Không tự tách thành hai bài đăng.
- Nếu là bài đăng mạng xã hội, có thể dùng emoji phù hợp.
- Không tự khẳng định chính sách giao hàng, đổi trả hoặc bảo hành khi chưa có dữ liệu.

5. ĐỊNH DẠNG ĐẦU RA
- Trả về nội dung hoàn chỉnh, có thể chỉnh sửa và sử dụng.
- Không trình bày quá trình suy luận.
- Nếu thiếu dữ liệu quan trọng, nêu rõ thông tin cần xác nhận.
```

## Input fields and defaults

| Field | Request property | Default in exported code |
|---|---|---|
| Product | `product` | `Chưa xác định` |
| Platform | `platform` | `Facebook` |
| Content type | `contentType` | `Social post` |
| Objective | `objective` | `Tăng tương tác` |
| Tone | `tone` | `Gần gũi, tự nhiên` |
| Additional brief | `brief` | Empty string |
| Product source | HTTP Request | Extracted from `productSource`, `data`, or `body` string fields |
| Brand source | HTTP Request | Extracted from `brandSource`, `data`, or `body` string fields |

## Observations and gaps

- Unlike Campaign Planner, Content Studio defines defaults for the six user-facing fields.
- The prompt instructs the model to search for the requested product in the provided product source before writing.
- It prohibits unsupported claims about origin, material, uses, prices, reviews, figures, shipping, returns and warranty.
- It frames GIAO THỜI as distributor, not manufacturer or craftsperson.
- The prompt now documents the Facebook mixed-media constraint: one post may contain an image album or one video, but not both. The model must not silently split a mixed request into two posts.
- This is a prompt-level guardrail in the documentation. The frontend/workflow still needs deterministic validation before media upload or publishing; this repository update does not deploy that code.
- No explicit memory or Skills loader is shown in this export.
- Source extraction can return an empty string when the expected fields are absent; there is no explicit stop/error for empty product or brand context in the shown code.

## Status

**Source-extracted, prompt guardrail documented.** Not runtime-tested or deployed. Test product matching, unsupported product names, platform-specific formatting, missing source data, and mixed image/video requests.
