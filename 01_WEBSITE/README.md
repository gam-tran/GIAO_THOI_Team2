# 01 – Website

## Nguồn website

- [BuildWebsite – repository nguồn](https://github.com/hangji1997-cpu/ReportWebsiteAnalytics-Team2/tree/main/BuildWebsite)

Đã đưa vào repository tổng hợp một **bản snapshot mã nguồn một phần** từ thư mục `BuildWebsite`, giữ nguyên cấu trúc đường dẫn tương ứng trong `BUILD_WEBSITE/`. Đã bổ sung entry point, cấu hình, dữ liệu sản phẩm, context giỏ hàng, các trang chính, các modal mua hàng và nhiều component dùng chung.

### Những phần đã sao chép

- Cấu hình dự án: `package.json`, `vite.config.ts`, `tsconfig.json`.
- Entry point và giao diện gốc: `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`.
- Một số phần giao diện và logic: `src/context/ShopContext.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/ZaloChat.tsx`.
- Các trang: Home, Products, Collections, Culture và About.

### Trạng thái

**Đã sao chép một phần; đang trong quá trình hoàn thiện.**

Đây **chưa phải bản sao đầy đủ có thể cài đặt và chạy độc lập**. Cần tiếp tục bổ sung các component, dữ liệu, types, cấu hình và tài nguyên được những file hiện tại import tới; sau đó mới kiểm tra build. Không tự tạo file thay thế cho phần mã nguồn chưa tìm thấy.

### Lưu ý cấu hình

- `index.html` hiện chứa mã đo lường GA4 `G-3XQJ11PJ0L`, được giữ nguyên từ repository nguồn.
- Chưa sao chép file `.env` hay thông tin xác thực.
- Package có khai báo `@google/genai`; riêng việc có dependency này chưa đủ để kết luận website đang gọi Gemini trong luồng chạy thực tế.

Nguồn gốc và lịch sử của website vẫn được giữ tại repository ban đầu; repository này là bản tổng hợp phục vụ bài nộp nhóm.
