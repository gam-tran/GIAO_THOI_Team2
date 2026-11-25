# Workflow Input Templates – Content Studio & Campaign Planner

**Loại tài liệu:** Cấu trúc đầu vào, giá trị mặc định và payload được khai báo trong frontend Automation Center.  
**Nguồn frontend:** `src/admin/pages/AutomationCenter.tsx`, repository `gam-tran/giao-thoi-website-v3`, branch `feature/ga4-ai-agent`.  
**Nguồn runtime:** Hai workflow exports Content Studio API và Campaign Planner API được đối chiếu riêng.

## 1. Content Studio

### 1.1. Trường đầu vào frontend

| Trường | Giá trị mặc định trên frontend |
|---|---|
| `product` | `Tranh Đông Hồ` |
| `platform` | `Facebook` |
| `contentType` | `Post` |
| `objective` | `Tăng tương tác` |
| `tone` | `Gần gũi, tự nhiên` |
| `brief` | `Giới thiệu tranh Đông Hồ và cách ứng dụng trong không gian sống hiện đại.` |

### 1.2. Lựa chọn giao diện

- **Nền tảng:** Facebook, TikTok, Instagram, Website, Zalo.
- **Loại nội dung:** Post, Caption, Video Script, Product Description, Content Ideas.
- **Mục tiêu:** Tăng tương tác, Tăng nhận diện thương hiệu, Tăng lượt truy cập website, Tăng tin nhắn tư vấn, Thúc đẩy mua hàng.
- **Giọng văn:** trường nhập tự do.

### 1.3. Payload frontend

```json
{
  "workflowId": "CONTENT_STUDIO",
  "payload": {
    "product": "Tranh Đông Hồ",
    "platform": "Facebook",
    "contentType": "Post",
    "objective": "Tăng tương tác",
    "tone": "Gần gũi, tự nhiên",
    "brief": "Giới thiệu tranh Đông Hồ và cách ứng dụng trong không gian sống hiện đại."
  }
}
```

Đây là payload mẫu theo giá trị mặc định của giao diện. Người dùng có thể thay đổi các trường trước khi chạy workflow.

### 1.4. Đối chiếu với Content Studio runtime

Workflow export sử dụng các trường cùng tên: `product`, `platform`, `contentType`, `objective`, `tone`, `brief`. Code node trong workflow có các giá trị mặc định riêng: `Chưa xác định`, `Facebook`, `Social post`, `Tăng tương tác`, `Gần gũi, tự nhiên` và chuỗi rỗng cho `brief`.

Như vậy, giá trị mặc định của frontend và runtime không hoàn toàn giống nhau ở `product`, `contentType` và `brief`. Khi frontend gửi đầy đủ payload, giá trị do người dùng chọn được đưa vào request; các giá trị mặc định runtime đóng vai trò dự phòng khi trường không được truyền.

## 2. Campaign Planner

### 2.1. Trường đầu vào frontend

| Trường | Giá trị mặc định |
|---|---|
| `campaignName` | `Quà Việt cho không gian sống hiện đại` |
| `product` | `Nón lá lụa` |
| `objective` | `Tăng nhận diện thương hiệu` |
| `targetAudience` | `Người trên 25 tuổi, nhân viên văn phòng, quan tâm đến sản phẩm mang bản sắc Việt và đồ trang trí` |
| `duration` | `30 ngày` |
| `budget` | `5000000` |
| `channels` | `Facebook`, `TikTok`, `Website` |
| `brief` | `Ưu tiên ngân sách tiết kiệm, nội dung gần gũi, nhấn mạnh tính ứng dụng và khả năng làm quà tặng.` |

### 2.2. Lựa chọn mục tiêu

- Tăng nhận diện thương hiệu.
- Tăng tương tác.
- Tăng lượt truy cập website.
- Tăng tin nhắn và đơn hàng.

### 2.3. Payload frontend

```json
{
  "workflowId": "CAMPAIGN_PLANNER",
  "payload": {
    "campaignName": "Quà Việt cho không gian sống hiện đại",
    "product": "Nón lá lụa",
    "objective": "Tăng nhận diện thương hiệu",
    "targetAudience": "Người trên 25 tuổi, nhân viên văn phòng, quan tâm đến sản phẩm mang bản sắc Việt và đồ trang trí",
    "duration": "30 ngày",
    "budget": "5000000",
    "channels": ["Facebook", "TikTok", "Website"],
    "brief": "Ưu tiên ngân sách tiết kiệm, nội dung gần gũi, nhấn mạnh tính ứng dụng và khả năng làm quà tặng."
  }
}
```

Frontend kiểm tra tên chiến dịch, sản phẩm, khách hàng mục tiêu và ít nhất một kênh trước khi gửi.

### 2.4. Đối chiếu với Campaign Planner runtime

Workflow export sử dụng cùng các trường: `campaignName`, `product`, `objective`, `targetAudience`, `duration`, `budget`, `channels` và `brief`. Prompt builder nội suy các trường này vào Campaign Prompt.

Code node gọi `request.channels.join(', ')`; vì vậy `channels` cần là mảng chuỗi không rỗng trước khi dựng prompt. Frontend kiểm tra một số trường bắt buộc, nhưng lớp kiểm tra ở workflow cần bảo đảm kiểu dữ liệu và tính đầy đủ của toàn bộ trường mà prompt sử dụng. Nếu thiếu hoặc sai kiểu, request cần được trả lỗi có cấu trúc trước khi gọi model.

## 3. Nguyên tắc sử dụng

- Payload mẫu mô tả dữ liệu frontend gửi, không phải bản sao prompt nội bộ của model.
- Prompt và logic xử lý runtime được trình bày trong [Content Studio Runtime Prompt](./n8n-content-studio-runtime-prompt.md) và [Campaign Planner Runtime Prompt](./n8n-campaign-planner-runtime-prompt.md).
- Cần phân biệt giá trị mặc định trên giao diện với giá trị dự phòng trong workflow.
- Không suy diễn kết quả AI hoặc hiệu quả chiến dịch từ payload đầu vào.

## 4. Nguồn

- [AutomationCenter.tsx – source](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AutomationCenter.tsx)
- [API n8n proxy – source](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)
- [n8n Workflow Inventory](../04_WORKFLOWS/n8n-workflow-inventory.md)
