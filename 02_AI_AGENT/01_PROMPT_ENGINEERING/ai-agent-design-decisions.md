# AI Agent Design Decisions

> Mục đích: ghi lại các quyết định thiết kế quan trọng, vấn đề dẫn đến quyết định và tác động đến hệ thống. Tài liệu này giải thích logic thiết kế, không thay thế Central Instructions, runtime prompts hoặc tài liệu kiểm thử.
>
> **Phạm vi bằng chứng:** các quyết định dưới đây được tổng hợp từ Central Instructions, ba workflow JSON exports, ảnh Agent Builder và cấu hình Tool do nhóm cung cấp. Những nội dung mới chỉ được đề xuất trong tài liệu không được xem là đã triển khai hoặc kiểm thử trên hệ thống thật.

## 1. Tách hệ thống thành ba workflow theo mục tiêu công việc

**Vấn đề:** Các yêu cầu Marketing có bản chất và đầu ra khác nhau. Nếu dùng một prompt duy nhất cho mọi tác vụ, prompt dễ trở nên dài, chồng chéo và khó kiểm soát cấu trúc kết quả.

**Quyết định:** Duy trì ba workflow riêng:
- **AI Assistant:** hỗ trợ hội thoại và các yêu cầu Marketing tổng hợp.
- **Content Studio:** tạo nội dung theo sản phẩm, nền tảng, định dạng, mục tiêu và giọng điệu.
- **Campaign Planner:** lập kế hoạch chiến dịch theo brief, đối tượng, thời gian, kênh và ngân sách.

**Cơ sở lựa chọn:** Ba workflow có mục tiêu, biến đầu vào và yêu cầu đầu ra riêng trong các JSON exports. Tách theo nhiệm vụ giúp giữ đúng ngữ cảnh và quy tắc chuyên biệt của từng loại công việc.

**Tác động:** Có thể tối ưu prompt, kiểm tra đầu vào và kiểm thử từng workflow độc lập; thay đổi ở một workflow ít làm ảnh hưởng đến hai workflow còn lại.

**Trạng thái:** Đã thể hiện trong ba workflow exports được cung cấp; chưa xác minh trạng thái triển khai và thực thi hiện tại trên n8n.

## 2. Phân lớp Central Instructions, Workflow Prompts và Skills/References

**Vấn đề:** Instructions ban đầu có nhiều phần mô tả vai trò và module bị lặp, đồng thời trộn nguyên tắc chung với hướng dẫn nghiệp vụ và đặc tả giao diện.

**Quyết định:** Phân chia trách nhiệm thành ba lớp:
1. **Central Agent Instructions:** vai trò, bối cảnh GIAO THỜI, nguyên tắc chung, giới hạn quyền và định tuyến tác vụ.
2. **Workflow-specific prompts:** mục tiêu từng workflow, biến đầu vào, cấu trúc đầu ra và quy tắc riêng.
3. **Skills/References:** phương pháp chuyên môn và hướng dẫn chi tiết có thể tái sử dụng.

**Cơ sở lựa chọn:** Các quy tắc dùng chung chỉ cần quản lý tại một nơi; các yêu cầu đặc thù cần nằm gần workflow thực thi. Cách tổ chức này hạn chế lặp prompt và giảm nguy cơ quy tắc của tác vụ này vô tình chi phối tác vụ khác.

**Tác động:** Dễ bảo trì, cập nhật và kiểm thử theo từng lớp; khi thay đổi một phương pháp chuyên môn không nhất thiết phải viết lại toàn bộ Instructions.

**Trạng thái:** Đã chuẩn hóa trong tài liệu Central Instructions và tài liệu runtime prompt. Cần tiếp tục đối chiếu với cấu hình Builder thực tế.

## 3. Định tuyến Tool và Skill có chọn lọc

**Vấn đề:** Agent có nhiều HTTP Request và nguồn tham chiếu. Gọi tất cả công cụ cho mọi yêu cầu vừa không cần thiết, vừa có thể đưa dữ liệu không liên quan vào ngữ cảnh xử lý.

**Quyết định:** Chỉ gọi Tool/Skill/Reference khi nội dung yêu cầu cần đến nguồn đó và công cụ thực sự khả dụng. Ví dụ:
- Tra cứu thông tin sản phẩm: dùng Product Catalogue.
- Phân tích hành vi website: dùng GA4.
- Xây dựng định hướng thương hiệu: dùng Brand Knowledge Base.
- Viết nội dung hoặc lập chiến dịch: tải Skill tương ứng khi endpoint có sẵn.

**Cơ sở lựa chọn:** Mỗi nguồn có chức năng khác nhau. Việc chọn nguồn theo mục đích giúp câu trả lời bám sát dữ liệu cần thiết, tránh truy xuất dư thừa và tránh giả định rằng một Tool có chức năng chưa được xác minh.

**Tác động:** Quy trình gọi công cụ rõ ràng hơn; giảm nguy cơ dùng sai nguồn hoặc khẳng định đã tra cứu khi request chưa được thực hiện thành công.

**Lưu ý về bằng chứng:** Cấu hình HTTP Request được cung cấp cho thấy các endpoint fetch Skill/Reference, nhưng ảnh Builder cho thấy khu vực native Skills đang trống. Hai cơ chế này không đồng nghĩa. Chưa có bằng chứng xác nhận Marketing Ideas Skill hoặc Product Marketing Context có endpoint fetch riêng trong Builder.

**Trạng thái:** Quy tắc định tuyến đã được ghi trong Central Instructions; cần kiểm thử từng endpoint và xác nhận phản hồi thực tế.

## 4. Lấy dữ liệu sản phẩm và thương hiệu từ nguồn, không ghi cứng hoặc tự suy diễn

**Vấn đề:** Thông tin sản phẩm và thương hiệu có thể thay đổi. Nếu AI dựa vào trí nhớ mô hình hoặc nội dung ghi cứng trong prompt, có nguy cơ tạo ra giá, chất liệu, xuất xứ, chính sách hoặc thông tin thương hiệu không có căn cứ.

**Quyết định:** Khi nguồn khả dụng, truy xuất Product Catalogue và Brand Knowledge Base từ repository nguồn; yêu cầu Agent chỉ sử dụng thông tin thực tế trả về. Phân biệt rõ:
- **FACT:** thông tin được nguồn hoặc Tool xác nhận.
- **CALCULATION:** kết quả tính từ dữ liệu có căn cứ.
- **INSIGHT:** nhận định có lập luận từ dữ liệu.
- **HYPOTHESIS:** giả thuyết cần kiểm chứng.

**Cơ sở lựa chọn:** Dữ liệu nguồn giúp nội dung có thể đối chiếu và cập nhật; phân loại mức độ chắc chắn giúp người đọc nhận biết đâu là dữ kiện, đâu là diễn giải hoặc đề xuất.

**Tác động:** Hạn chế bịa thông tin sản phẩm và thương hiệu; tăng khả năng truy vết căn cứ cho nội dung Marketing và báo cáo.

**Trạng thái:** Quy tắc đã có trong Central Instructions và các runtime prompt. Cần kiểm thử tình huống nguồn trống, thiếu trường hoặc không tìm thấy sản phẩm.

## 5. Thận trọng với phạm vi truy vấn GA4

**Vấn đề:** Instructions ban đầu có hai danh sách Metrics/Dimensions không thống nhất: một phần nêu 3 Metrics và 2 Dimensions, phần khác mở rộng danh sách. Cấu hình/schema thực tế của Tool chưa được xác minh đầy đủ tại thời điểm rà soát.

**Quyết định:** Không mặc định toàn bộ trường mở rộng đều dùng được. Dùng danh sách tối thiểu được nêu trong Instructions làm cơ sở ban đầu; chỉ mở rộng khi GA4 Data API xác nhận trường và tổ hợp truy vấn hợp lệ. Khi truy vấn, xác định rõ date range và múi giờ Property nếu cần diễn giải ngày.

**Cơ sở lựa chọn:** Truy vấn chỉ hợp lệ khi Metrics, Dimensions và bộ lọc tương thích với schema API. Danh sách dài hơn không đồng nghĩa báo cáo chính xác hơn.

**Tác động:** Giảm nguy cơ lỗi truy vấn và diễn giải sai; bảo đảm kết quả báo cáo phản ánh dữ liệu thực tế thay vì trường tự giả định.

**Trạng thái:** Quy tắc thận trọng đã được ghi trong Central Instructions. Cần kiểm tra schema thực tế, cách truyền request body và chạy truy vấn thử trước khi xác nhận hoàn tất.

## 6. Giữ ranh giới giữa đề xuất của AI và hành động bên ngoài

**Vấn đề:** Các tác vụ Marketing có thể dẫn đến hành động ảnh hưởng khách hàng, ngân sách hoặc hệ thống đang vận hành.

**Quyết định:** Cho phép Agent đọc dữ liệu, phân tích, soạn nội dung và đề xuất kế hoạch; không tự đăng bài, gửi tin nhắn, tạo/sửa quảng cáo, chi tiêu ngân sách hoặc thay đổi cấu hình hệ thống khi chưa có sự cho phép phù hợp.

**Cơ sở lựa chọn:** Nội dung do AI tạo cần được con người xem xét trước khi trở thành hành động thực tế, đặc biệt với hoạt động có tác động đến khách hàng và chi phí.

**Tác động:** Duy trì quyền quyết định của người vận hành và giảm rủi ro hành động ngoài ý muốn.

**Trạng thái:** Đã ghi trong Central Instructions; cần xác minh các bước approval và quyền thực thi thực tế của từng công cụ.

## 7. Bổ sung kiểm soát đầu vào cho Campaign Planner

**Vấn đề:** Trong Campaign Planner Code node, trường `channels` được gọi bằng `.join()`. Nếu trường bị thiếu hoặc không phải mảng, bước dựng prompt có thể phát sinh lỗi. Các trường đầu vào khác cũng chưa thể hiện đầy đủ kiểm tra bắt buộc trong đoạn code export đã rà soát.

**Quyết định:** Bổ sung validation trước khi dựng prompt: kiểm tra trường bắt buộc, kiểu dữ liệu và cấu trúc `channels`; nếu không hợp lệ, trả lỗi đầu vào rõ ràng thay vì để workflow dừng do lỗi xử lý không kiểm soát.

**Cơ sở lựa chọn:** Kiểm tra đầu vào tại ranh giới workflow giúp phát hiện lỗi sớm, cho người dùng biết cần sửa gì và tránh gửi một brief thiếu dữ liệu vào LLM.

**Tác động:** Tăng độ ổn định và khả năng dự đoán của Campaign Planner; dễ kiểm thử các trường hợp thiếu, null hoặc sai kiểu.

**Trạng thái:** Đã xác định vấn đề và ghi remediation/test case trong audit. **Chưa có bằng chứng validation đã được triển khai vào workflow đang chạy.**

## 8. Ràng buộc định dạng media cho bài đăng Facebook

**Vấn đề:** Một yêu cầu tạo nội dung có thể chứa cả ảnh và video, trong khi quy tắc đăng bài của luồng Facebook được xác định là một bài chỉ dùng album nhiều ảnh hoặc một video riêng.

**Quyết định:** Không tạo một bài Facebook trộn ảnh và video. Nếu yêu cầu có cả hai loại media, Agent phải giải thích giới hạn và hỏi người dùng chọn định dạng; không tự tách thành hai bài đăng.

**Cơ sở lựa chọn:** Giữ đúng ý định và cấu trúc nội dung mà người dùng yêu cầu; tránh tự ý thay đổi số lượng bài đăng hoặc tạo nội dung ngoài phạm vi được duyệt.

**Tác động:** Giảm sai lệch giữa nội dung được yêu cầu, nội dung được duyệt và nội dung chuyển sang bước đăng tải.

**Trạng thái:** Đã ghi guardrail trong Central Instructions và tài liệu runtime prompt. **Chưa có bằng chứng kiểm tra ràng buộc này ở frontend/workflow hoặc kiểm thử end-to-end.**

## 9. Nguyên tắc đánh giá mức độ hoàn thành

Không đánh đồng việc viết tài liệu với việc triển khai thành công. Khi báo cáo tiến độ, phân biệt bốn mức:
1. **Đã phân tích:** vấn đề và nguyên nhân đã được xác định.
2. **Đã đặc tả:** quyết định hoặc phương án xử lý đã được ghi thành tài liệu/prompt.
3. **Đã triển khai:** thay đổi đã được cập nhật vào Builder, frontend hoặc workflow tương ứng.
4. **Đã kiểm thử:** có kết quả chạy thực tế chứng minh hành vi mong đợi.

Tại thời điểm lập tài liệu này, việc chuẩn hóa tài liệu và đặc tả một số biện pháp khắc phục đã hoàn thành; các bước cập nhật Builder/n8n và kiểm thử runtime vẫn cần được xác minh riêng.
