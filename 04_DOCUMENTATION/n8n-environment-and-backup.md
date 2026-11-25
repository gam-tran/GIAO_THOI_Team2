# GIAO THỜI – n8n Environment and Backup

**Ngày ghi nhận môi trường:** 18/11/2026

## 1. Runtime environment

| Thành phần | Phiên bản / môi trường |
|---|---|
| n8n | 2.47.3 |
| Node.js | v24.22.2 |
| npm | 11.19.1 |
| Operating System | Windows |

## 2. Phương thức cài đặt và lưu trữ

| Hạng mục | Cấu hình |
|---|---|
| Installation method | Global npm installation |
| n8n installation directory | Global npm package directory |
| n8n user data directory | `%USERPROFILE%\.n8n` |
| Database | SQLite – `database.sqlite` |
| Encryption configuration | File `config` trong thư mục dữ liệu n8n |

Đường dẫn được biểu diễn theo biến môi trường người dùng để tránh gắn tài liệu với tên tài khoản hoặc đường dẫn cá nhân của một máy cụ thể.

## 3. Backup archive

| Hạng mục | Thông tin |
|---|---|
| Backup archive | `GIAO_THOI_N8N_BACKUP_2026-11-18.7z` |
| Backup format | 7z |
| Encryption | AES-256 |
| Archive integrity test | Passed |
| Google Drive destination | `GIAO THOI - FULL PROJECT BACKUP/02_N8N_SYSTEM_BACKUP` |

Bản backup hệ thống được ghi nhận có database n8n và file cấu hình mã hóa đi kèm. File backup được bảo vệ bằng mật khẩu; mật khẩu cần được lưu riêng với archive.

## 4. Recovery procedure

1. Cài đặt phiên bản n8n, Node.js và npm tương thích với môi trường backup.
2. Giải nén archive trong môi trường khôi phục được kiểm soát.
3. Khôi phục thư mục dữ liệu n8n, bao gồm SQLite database và file cấu hình mã hóa tương ứng.
4. Bảo toàn encryption key gốc để n8n có thể giải mã các credentials đã lưu.
5. Khởi động n8n trong môi trường riêng biệt và kiểm tra khả năng đọc workflow, credentials, Data Tables và các cấu hình liên quan.
6. Kiểm thử các tích hợp cần thiết bằng credentials phù hợp trước khi xem xét thay thế môi trường đang vận hành.

Không sử dụng một encryption key mới để thay thế key gốc khi khôi phục database có credentials đã mã hóa.

## 5. Bảo mật và phạm vi xác nhận

- Archive, mật khẩu archive và encryption key phải được quản lý tách biệt.
- Chỉ người được phân quyền mới được truy cập bản backup và thông tin khôi phục.
- Không commit archive, mật khẩu, encryption key hoặc file cấu hình chứa secret vào repository.
- Kết quả kiểm tra tính toàn vẹn archive (Passed) xác nhận archive vượt qua phép kiểm tra được ghi nhận; không tự động chứng minh toàn bộ hệ thống đã khôi phục và hoạt động.
- Tài liệu này ghi nhận môi trường tại thời điểm backup ngày 18/11/2026, không đại diện cho phiên bản runtime hiện tại nếu hệ thống đã được nâng cấp sau thời điểm đó.
