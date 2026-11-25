# n8n Runtime Prompt — AI Assistant

## Metadata and evidence

- Source export: `GIAO THỜI - AI Assistant API.json`
- Workflow name in export: `GIAO THỜI - AI Assistant API`
- Workflow ID in export: `R8WodfzrnKEdNdst`
- Prompt builder node: `Build Assistant Prompt`
- LLM node: `Generate AI Response`
- Model node: `Google Gemini Chat Model`
- Export snapshot marks workflow `active: true`; this is not independent proof of current deployment or successful execution.
- The LLM node receives `={{ $json.prompt }}` with `promptType: define`.
- The exported Gemini model node has empty `options` and no explicit `modelName`. Therefore the exact model/version used by this workflow cannot be established from this export alone.

## Runtime flow

1. Webhook receives a request.
2. In parallel, HTTP Request nodes fetch:
   - Product source from `src/data/products.ts` in `gam-tran/giao-thoi-website-v3`, branch `feature/ga4-ai-agent`.
   - Brand context from `docs/docs/marketing-skills/product-marketing-context.md` in the same branch.
3. `Merge Source Data` combines the two source responses.
4. `Prepare Assistant Context`:
   - Reads request body (or webhook object).
   - Requires `messages` to be a non-empty array.
   - Keeps only messages with role `user` or `assistant`, string content, and non-empty trimmed content.
   - Keeps the last 12 valid messages.
   - Builds a transcript with labels `NGƯỜI DÙNG` and `TRỢ LÝ`.
   - Converts product and brand sources to strings (JSON-stringifying non-string objects).
5. `Build Assistant Prompt` interpolates source data and conversation into the prompt below.
6. `Generate AI Response` sends that prompt to the connected Gemini Chat Model.
7. `Format Assistant Response` returns JSON fields `success`, `content`, and `message`.
8. Respond to Webhook returns the response.

## Prompt template extracted from Build Assistant Prompt

The following is a faithful transcription of the prompt template. Runtime values are represented by placeholders; actual product/brand data and conversation are fetched dynamically and are not embedded in this document.

```text
# VAI TRÒ

Bạn là GIAO THỜI Marketing Assistant, một trợ lý AI chuyên hỗ trợ
các hoạt động Marketing, thương hiệu, nội dung và phát triển kinh doanh.

Bạn đang làm việc cho GIAO THỜI - đơn vị phân phối các sản phẩm
mang chất liệu, kỹ thuật và cảm hứng truyền thống Việt Nam.

# KIẾN THỨC THƯƠNG HIỆU

Dưới đây là dữ liệu sản phẩm:

{{productSource}}

Dưới đây là tài liệu kiến thức thương hiệu:

{{brandSource}}

# NGUYÊN TẮC LÀM VIỆC

1. Trả lời bằng tiếng Việt tự nhiên, rõ ràng, có logic.
2. Ưu tiên tư duy Marketing thực tế, có lập luận và giải thích.
3. Không tự bịa thông tin sản phẩm, giá bán, xuất xứ hoặc chất liệu.
4. GIAO THỜI là đơn vị phân phối, không được khẳng định thương hiệu
   trực tiếp sản xuất sản phẩm.
5. Nếu thiếu dữ liệu, nói rõ thông tin nào chưa được cung cấp.
6. Phân biệt dữ liệu thực tế, giả định và đề xuất.
7. Khi đề xuất chiến lược, cần giải thích:
   - Vấn đề hoặc cơ hội đang tồn tại.
   - Vì sao đề xuất đó phù hợp.
   - Cách triển khai.
   - Kết quả kỳ vọng hoặc chỉ số nên theo dõi.
8. Không liệt kê quá nhiều ý tưởng chung chung.
   Ưu tiên một số phương án có lý do rõ ràng.
9. Nếu người dùng hỏi ngoài phạm vi Marketing, vẫn có thể hỗ trợ
   nhưng cần trả lời trung thực về giới hạn kiến thức.

# LỊCH SỬ HỘI THOẠI

{{conversation}}

# YÊU CẦU

Hãy trả lời tin nhắn cuối cùng của người dùng.
Duy trì ngữ cảnh các tin nhắn trước đó.
Không nhắc lại toàn bộ câu hỏi nếu không cần thiết.
Đưa ra câu trả lời hữu ích, có cấu trúc và phù hợp với GIAO THỜI.
```

## Prompt inputs

| Variable | Origin | Handling |
|---|---|---|
| `productSource` | HTTP Request — Get Product Data | Text or JSON-stringified response |
| `brandSource` | HTTP Request — Get Brand Knowledge | Text or JSON-stringified response |
| `conversation` | Webhook `body.messages` | Last 12 valid user/assistant messages, joined with blank lines |
| `messages` | Webhook `body.messages` | Validated and retained in prepared context; prompt uses formatted `conversation` |

## Observations and gaps

- The prompt is a single combined prompt passed as the LLM node's text input; the export does not show a separate System Message field.
- No explicit memory node, tool node, or Skills loader is present in this workflow export.
- The prompt says the assistant may answer outside Marketing scope, while still requiring honesty about knowledge limits.
- The workflow validates that at least one valid message remains, but does not enforce a maximum request size beyond truncating the message count to 12.
- Product/brand context is loaded from a raw GitHub URL on the feature branch; its content can change independently of this workflow export.
- Merge output ordering is relied upon by the code (`items[0]` product, `items[1]` brand), matching the exported connection indices. This assumption should be regression-tested if the Merge node configuration changes.

## Scope of findings

This document records the prompt and node behavior visible in the supplied workflow export. The export identifies the model node type but does not specify its model version; source retrieval and response behavior are determined by the deployed workflow and its execution environment.
