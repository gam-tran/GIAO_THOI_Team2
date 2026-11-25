# Workflow Input Templates – Content Studio & Campaign Planner

> Loại tài liệu: cấu trúc đầu vào và giá trị mặc định được khai báo trong frontend Automation Center.  
> Trạng thái: đã đối chiếu mã nguồn; đây không phải prompt/template nội bộ của node AI n8n.

## 1. Content Studio

Nguồn: `src/admin/pages/AutomationCenter.tsx`, repository `gam-tran/giao-thoi-website-v3`, branch `feature/ga4-ai-agent`.

### Trường đầu vào và giá trị mặc định

| Trường | Giá trị mặc định |
|---|---|
| `product` | `Tranh Đông Hồ` |
| `platform` | `Facebook` |
| `contentType` | `Post` |
| `objective` | `Tăng tương tác` |
| `tone` | `Gần gũi, tự nhiên` |
| `brief` | `Giới thiệu tranh Đông Hồ và cách ứng dụng trong không gian sống hiện đại.` |

### Các lựa chọn giao diện được khai báo

- Nền tảng: Facebook, TikTok, Instagram, Website, Zalo.
- Loại nội dung: Post, Caption, Video Script, Product Description, Content Ideas.
- Mục tiêu: Tăng tương tác, Tăng nhận diện thương hiệu, Tăng lượt truy cập website, Tăng tin nhắn tư vấn, Thúc đẩy mua hàng.
- Giọng văn: trường nhập tự do.

### Payload frontend gửi

Cấu trúc được tạo trong mã nguồn:

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

## 2. Campaign Planner

### Trường đầu vào và giá trị mặc định

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

### Các lựa chọn mục tiêu được khai báo

- Tăng nhận diện thương hiệu.
- Tăng tương tác.
- Tăng lượt truy cập website.
- Tăng tin nhắn và đơn hàng.

### Payload frontend gửi

Cấu trúc được tạo trong mã nguồn:

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

Frontend kiểm tra các trường bắt buộc gồm tên chiến dịch, sản phẩm, khách hàng mục tiêu và ít nhất một kênh trước khi gửi.

## 3. Điều chưa thể kết luận

Mã nguồn frontend chỉ xác nhận tên trường, giá trị mặc định, lựa chọn giao diện và payload được gửi tới API. Chưa có workflow export để xác nhận:
- Node n8n nhận payload và mapping từng trường.
- Prompt hệ thống hoặc prompt template bên trong node AI.
- Cách xử lý ngân sách, thời lượng, kênh và brief.
- Model hoặc công cụ mà workflow sử dụng.

Không sử dụng các payload mẫu này để tuyên bố đã khôi phục được prompt nội bộ của Content Studio hoặc Campaign Planner.

## Nguồn

- [AutomationCenter.tsx – source](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/src/admin/pages/AutomationCenter.tsx)
- [API n8n proxy – source](https://github.com/gam-tran/giao-thoi-website-v3/blob/feature/ga4-ai-agent/api/n8n/%5Broute%5D.ts)
