# n8n Runtime Prompt — Campaign Planner

## Metadata and evidence

- Source export: `GIAO THỜI - Campaign Planner API.json`
- Workflow name: `GIAO THỜI - Campaign Planner API`
- Workflow ID in export: `ZAz7EqRdeQJAKDtP`
- Prompt builder node: `Build Campaign Prompt`
- LLM node: `Generate Campaign Plan`
- Model node: `Google Gemini Chat Model`
- Export snapshot marks workflow `active: true`; this does not prove current production deployment or successful execution.
- LLM node receives `={{ $json.prompt }}` with `promptType: define`.
- Model node export contains empty `options` and no explicit `modelName`; exact model/version is not established by this file.

## Runtime flow

1. Request enters through Webhook or `When Executed by Another Workflow`.
2. Product data and Brand Knowledge are fetched from the same GitHub feature branch.
3. `Prepare Campaign Context` builds a request object and extracts product/brand source text.
4. `Build Campaign Prompt` interpolates campaign fields, context and the planning instructions.
5. `Generate Campaign Plan` sends the prompt to Gemini.
6. `Format Campaign Response` returns `success`, original `request`, `content`, and `message`.

## Prompt template extracted from Build Campaign Prompt

```text
Bạn là chuyên gia chiến lược Marketing và lập kế hoạch chiến dịch
cho thương hiệu GIAO THỜI.

NHIỆM VỤ:
Xây dựng một kế hoạch Marketing có tính logic, khả thi,
phù hợp với ngân sách và nguồn lực được cung cấp.

I. KIẾN THỨC THƯƠNG HIỆU

{{brandSource}}

II. DỮ LIỆU SẢN PHẨM

{{productSource}}

III. THÔNG TIN CHIẾN DỊCH

Tên chiến dịch: {{campaignName}}
Sản phẩm: {{product}}
Mục tiêu: {{objective}}
Khách hàng mục tiêu: {{targetAudience}}
Thời gian: {{duration}}
Ngân sách: {{budget}}
Kênh Marketing: {{channels}}
Yêu cầu bổ sung: {{brief}}

IV. YÊU CẦU LẬP KẾ HOẠCH

Hãy trình bày kế hoạch theo cấu trúc sau:

1. CAMPAIGN OVERVIEW
- Tóm tắt chiến dịch.
- Vấn đề hoặc cơ hội Marketing.
- Mục tiêu chính và mục tiêu phụ.
- Khách hàng mục tiêu và insight.
- Định vị sản phẩm trong chiến dịch.

2. CAMPAIGN STRATEGY
- Big Idea.
- Key Message.
- Hướng truyền thông chủ đạo.
- Lý do lựa chọn hướng triển khai.
- Hành trình khách hàng dự kiến.

3. CHANNEL PLAN
Với từng kênh được chọn, hãy nêu:
- Vai trò của kênh.
- Nhóm nội dung phù hợp.
- Hoạt động cụ thể.
- Định dạng nội dung.
- Mục tiêu đo lường.

Không tự thêm kênh ngoài danh sách người dùng chọn.

4. BUDGET PLAN
- Đề xuất phân bổ ngân sách theo từng kênh và hoạt động.
- Trình bày số tiền và tỷ trọng phần trăm.
- Tổng phân bổ phải bằng ngân sách đầu vào nếu người dùng đã cung cấp ngân sách.
- Nếu chưa có ngân sách, chỉ đề xuất cơ cấu tỷ trọng, không tự gán số tiền.
- Phân biệt rõ ngân sách giả định và ngân sách thực tế.

5. CAMPAIGN TIMELINE
Chia chiến dịch thành các giai đoạn phù hợp với thời gian đã chọn.
Với mỗi giai đoạn, nêu:
- Thời gian.
- Hoạt động.
- Nội dung cần triển khai.
- Kết quả mong đợi.

6. KPI PLAN
Đề xuất KPI theo mục tiêu và từng kênh.
Với mỗi KPI, giải thích:
- Ý nghĩa.
- Cách đo lường.
- Vì sao KPI phù hợp với mục tiêu.

Không tự khẳng định KPI là kết quả thực tế.
Nếu không có dữ liệu lịch sử, phải ghi rõ đây là mục tiêu đề xuất,
không phải dự báo chắc chắn.

7. RESOURCE AND RISK
- Nguồn lực cần chuẩn bị.
- Rủi ro có thể gặp.
- Phương án xử lý.

V. NGUYÊN TẮC BẮT BUỘC

- GIAO THỜI là đơn vị phân phối sản phẩm, không phải nhà sản xuất.
- Không tự bịa nguồn gốc, chất liệu, công dụng hoặc đặc tính sản phẩm.
- Ưu tiên dữ liệu trong nguồn được cung cấp.
- Không đưa ra số liệu hiệu quả như thể đã được kiểm chứng.
- Các phần mục tiêu, chiến lược, kênh, ngân sách, timeline và KPI
  phải liên kết logic với nhau.
- Ngôn ngữ tiếng Việt rõ ràng, chuyên nghiệp, thực tế.
- Tránh lý thuyết chung chung và các đề xuất vượt quá nguồn lực.
- Nếu thiếu thông tin, hãy ghi rõ giả định thay vì tự khẳng định.

Hãy tạo một kế hoạch hoàn chỉnh, có thể sử dụng làm bản kế hoạch
Marketing thực tế sau khi người phụ trách xem xét.
```

## Input fields and mapping

| Prompt field | Request property | Handling in exported code |
|---|---|---|
| Campaign name | `campaignName` | Direct interpolation |
| Product | `product` | Direct interpolation |
| Objective | `objective` | Direct interpolation |
| Target audience | `targetAudience` | Direct interpolation |
| Duration | `duration` | Direct interpolation |
| Budget | `budget` | Direct interpolation |
| Channels | `channels` | `request.channels.join(', ')` |
| Additional brief | `brief` | Direct interpolation |
| Product source | HTTP Request result | Extracted from `productSource`, `data`, or `body` string fields |
| Brand source | HTTP Request result | Extracted from `brandSource`, `data`, or `body` string fields |

## Observations and gaps

- `request.channels.join(', ')` assumes `channels` exists and is an array. The exported code does not provide a fallback or schema validation; a missing/non-array value can fail before prompt generation.
- Other campaign fields are interpolated without required-field validation.
- The prompt contains a useful budget integrity rule: when a budget is provided, allocations must sum to it; when absent, only percentage allocation should be proposed.
- It explicitly prohibits adding channels outside the user-selected list.
- It distinguishes proposed KPIs from actual results and asks for assumptions to be labeled.
- The export contains both webhook and execute-workflow triggers. The workflow can therefore be invoked through either path, subject to actual n8n configuration.
- No explicit memory or Skills loader is shown in this export.

## Input validation contract

The prompt builder calls `request.channels.join(', ')`. The input contract therefore requires `channels` to be a non-empty array of non-empty strings before prompt construction. Required campaign fields should also be validated at the request boundary.

| Field | Validation rule |
|---|---|
| `campaignName` | Non-empty string |
| `product` | Non-empty string |
| `objective` | Non-empty string |
| `targetAudience` | Non-empty string |
| `duration` | Non-empty string |
| `channels` | Non-empty array; every item is a non-empty string |
| `budget` | Optional; when supplied, must be a finite non-negative number |
| `brief` | Optional string |

Invalid requests should return a structured validation response before prompt construction. This prevents malformed input from causing a Code node exception and keeps the model focused on campaign planning rather than repairing the request payload.

## Scope of findings

This document records the prompt template, request mapping and Code node behavior visible in the supplied Campaign Planner export. The model node type is identified, but the exact model/version is not specified in the export.