# AI Agent Design Decisions

## 1. Mục tiêu thiết kế

GIAO THỜI Marketing AI Agent được thiết kế để hỗ trợ các công việc Marketing theo hướng có căn cứ, nhất quán với thương hiệu và có thể chuyển thành đầu việc cụ thể. Các quyết định dưới đây xác định cách tổ chức Agent, sử dụng dữ liệu, lựa chọn công cụ và kiểm soát đầu ra.

## 2. Các quyết định thiết kế trọng yếu

### Quyết định 1. Chia hệ thống thành ba workflow theo mục tiêu công việc

**Bài toán:** Các yêu cầu Marketing có bản chất khác nhau: hội thoại tư vấn tổng hợp, sáng tạo nội dung và lập kế hoạch chiến dịch. Một prompt duy nhất phải xử lý tất cả sẽ dễ dài, chồng chéo và khó duy trì cấu trúc đầu ra ổn định.

**Lựa chọn:**
- **AI Assistant:** tiếp nhận hội thoại và hỗ trợ các yêu cầu Marketing tổng hợp.
- **Content Studio:** tạo nội dung theo sản phẩm, nền tảng, định dạng, mục tiêu và giọng điệu.
- **Campaign Planner:** xây dựng kế hoạch chiến dịch dựa trên brief, đối tượng, thời gian, kênh và ngân sách.

**Lý do:** Mỗi workflow có bộ đầu vào, logic xử lý và cấu trúc đầu ra riêng. Tách theo nhiệm vụ giúp prompt bám sát mục tiêu, đồng thời cho phép tối ưu và kiểm thử từng luồng độc lập.

**Tác động:** Hạn chế xung đột chỉ dẫn; dễ bảo trì và mở rộng từng nghiệp vụ mà không phải thay đổi toàn bộ Agent.

### Quyết định 2. Phân lớp Central Instructions, Workflow Prompts và Skills/References

**Bài toán:** Instructions ban đầu trộn vai trò chung, quy tắc nghiệp vụ, hướng dẫn chuyên môn và đặc tả module; một số nội dung lặp lại hoặc mâu thuẫn.

**Lựa chọn:** Tổ chức hướng dẫn thành ba lớp có trách nhiệm riêng:

1. **Central Agent Instructions:** danh tính, bối cảnh GIAO THỜI, nguyên tắc chung, giới hạn quyền và định tuyến tác vụ.
2. **Workflow-specific Prompts:** mục tiêu từng workflow, biến đầu vào, cấu trúc đầu ra và quy tắc riêng.
3. **Skills/References:** phương pháp chuyên môn và hướng dẫn chi tiết có thể tái sử dụng.

**Lý do:** Quy tắc dùng chung được quản lý tập trung; hướng dẫn đặc thù đặt tại đúng workflow; kiến thức chuyên môn được tách thành tài liệu có thể tái sử dụng. Cách phân lớp này giảm lặp prompt và tránh để quy tắc của tác vụ này ảnh hưởng không phù hợp đến tác vụ khác.

**Tác động:** Cấu trúc rõ ràng, dễ cập nhật, dễ kiểm soát phiên bản và thuận tiện bổ sung nghiệp vụ mới.

### Quyết định 3. Định tuyến Tool và Skill theo nhu cầu, không gọi đồng loạt

**Bài toán:** Hệ thống có nhiều nguồn dữ liệu và công cụ phục vụ các mục tiêu khác nhau. Gọi toàn bộ công cụ cho mọi yêu cầu làm tăng dữ liệu thừa trong ngữ cảnh và có thể khiến Agent dựa vào nguồn không liên quan.

**Lựa chọn:** Chỉ gọi công cụ hoặc tải Skill/Reference khi nhiệm vụ thực sự cần nguồn đó:
- Tra cứu thông tin sản phẩm: Product Catalogue.
- Phân tích hiệu quả website: Google Analytics 4.
- Xác định định vị, khách hàng và giọng điệu: Brand Knowledge Base.
- Lập chiến lược nội dung, viết nội dung, lập chiến dịch hoặc thiết kế đo lường: Skill tương ứng.

**Lý do:** Mỗi công cụ có phạm vi dữ liệu và chức năng riêng. Định tuyến theo mục đích giúp giảm truy xuất dư thừa, tăng tính liên quan và tránh nhầm lẫn giữa các nguồn.

**Tác động:** Quy trình xử lý minh bạch hơn; Agent chỉ sử dụng dữ liệu và phương pháp phù hợp với yêu cầu đang giải quyết.

### Quyết định 4. Ưu tiên dữ liệu nguồn và phân biệt dữ kiện với nhận định

**Bài toán:** Thông tin sản phẩm và thương hiệu có thể thay đổi. Nếu AI dựa vào trí nhớ mô hình hoặc tự hoàn thiện các trường còn thiếu, nội dung có thể xuất hiện giá, chất liệu, xuất xứ, chính sách hoặc tuyên bố thương hiệu không có căn cứ.

**Lựa chọn:** Sử dụng Product Catalogue và Brand Knowledge Base làm nguồn tham chiếu; không tự tạo thông tin khi nguồn không cung cấp. Trong phân tích và báo cáo, phân biệt bốn loại nội dung:
- **FACT:** dữ kiện được nguồn hoặc công cụ xác nhận.
- **CALCULATION:** kết quả tính toán từ dữ liệu có căn cứ.
- **INSIGHT:** nhận định có lập luận dựa trên dữ kiện và phép tính.
- **HYPOTHESIS:** giả thuyết cần được kiểm chứng.

**Lý do:** Việc tách dữ kiện khỏi diễn giải giúp người sử dụng biết mức độ chắc chắn của từng kết luận và có thể truy ngược căn cứ.

**Tác động:** Hạn chế thông tin bịa đặt; tăng độ tin cậy của nội dung Marketing, phân tích và đề xuất.

### Quyết định 5. Kiểm soát phạm vi truy vấn GA4 theo schema hợp lệ

**Bài toán:** Các phiên bản Instructions trước có danh sách Metrics và Dimensions không thống nhất. Việc đưa thêm nhiều trường vào yêu cầu không đồng nghĩa truy vấn sẽ hợp lệ hoặc tạo ra báo cáo tốt hơn.

**Lựa chọn:** Xác định rõ ngày bắt đầu, ngày kết thúc và múi giờ Property; chỉ sử dụng Metrics, Dimensions và bộ lọc được GA4 Data API hỗ trợ. Danh sách tối thiểu được dùng làm cơ sở hướng dẫn gồm activeUsers, sessions, screenPageViews và các Dimensions date, sessionDefaultChannelGroup. Các trường mở rộng chỉ được sử dụng khi schema và tổ hợp truy vấn xác nhận hợp lệ.

**Lý do:** Tính hợp lệ của truy vấn phụ thuộc vào khả năng tương thích giữa Metrics, Dimensions và bộ lọc. Cần ưu tiên tính chính xác, nhất quán thay vì mở rộng số lượng chỉ số một cách hình thức.

**Tác động:** Giảm lỗi truy vấn và hạn chế diễn giải sai dữ liệu; báo cáo phản ánh đúng phạm vi đo lường của GA4.

### Quyết định 6. Giữ quyền phê duyệt của con người đối với hành động bên ngoài

**Bài toán:** Đầu ra Marketing có thể dẫn đến hành động ảnh hưởng trực tiếp đến khách hàng, ngân sách và hệ thống đang vận hành.

**Lựa chọn:** Agent thực hiện các công việc đọc dữ liệu, phân tích, tổng hợp, soạn nội dung và đề xuất kế hoạch. Các hành động như đăng bài, gửi tin nhắn, tạo hoặc chỉnh sửa quảng cáo, chi tiêu ngân sách và thay đổi cấu hình bên ngoài phải nằm trong phạm vi công cụ được cấp quyền và có sự phê duyệt phù hợp.

**Lý do:** AI hỗ trợ quá trình ra quyết định nhưng không thay thế trách nhiệm của người vận hành đối với các hành động có tác động thực tế.

**Tác động:** Duy trì quyền kiểm soát của nhóm Marketing, giảm nguy cơ thực hiện hành động ngoài ý muốn và tăng khả năng kiểm soát rủi ro.

### Quyết định 7. Kiểm tra dữ liệu đầu vào trước khi dựng prompt Campaign Planner

**Bài toán:** Trong Campaign Planner, trường channels được xử lý bằng phương thức join. Nếu trường bị thiếu hoặc không phải mảng, bước dựng prompt có thể phát sinh lỗi. Các trường đầu vào khác cũng cần được kiểm tra để tránh đưa brief không đầy đủ vào mô hình.

**Lựa chọn:** Quy định kiểm tra đầu vào trước khi dựng prompt:
- Kiểm tra các trường bắt buộc của Campaign Brief.
- Kiểm tra channels tồn tại, có kiểu mảng và các phần tử có kiểu dữ liệu hợp lệ.
- Với dữ liệu thiếu hoặc sai kiểu, trả thông báo lỗi cụ thể để người dùng điều chỉnh.
- Chỉ dựng prompt khi dữ liệu đáp ứng cấu trúc yêu cầu.

**Lý do:** Xác thực tại đầu vào giúp phát hiện lỗi sớm và có kiểm soát, thay vì để lỗi phát sinh bên trong bước xử lý prompt.

**Tác động:** Tăng độ ổn định của Campaign Planner, giúp thông báo lỗi dễ hiểu và bảo đảm kế hoạch được tạo từ brief có cấu trúc hợp lệ.

### Quyết định 8. Ràng buộc định dạng media cho bài đăng Facebook

**Bài toán:** Yêu cầu nội dung có thể đồng thời bao gồm ảnh và video, trong khi cấu trúc bài đăng được xác định cho luồng này là album nhiều ảnh hoặc một video riêng.

**Lựa chọn:** Một bài Facebook chỉ sử dụng một trong hai định dạng: album nhiều ảnh hoặc một video. Khi người dùng yêu cầu cả ảnh và video trong cùng một bài, Agent giải thích giới hạn và yêu cầu người dùng chọn định dạng; không tự ý tách thành hai bài đăng.

**Lý do:** Việc tự tách bài sẽ làm thay đổi số lượng nội dung và ý định ban đầu của người dùng. Yêu cầu xác nhận giúp giữ quyền quyết định định dạng và phạm vi nội dung ở người sử dụng.

**Tác động:** Đầu ra nhất quán với yêu cầu, hạn chế việc tạo nội dung ngoài phạm vi được lựa chọn.

## 3. Nguyên tắc xuyên suốt

Tám quyết định trên được liên kết bởi bốn nguyên tắc:

1. **Đúng nhiệm vụ:** mỗi yêu cầu được xử lý bởi workflow và phương pháp phù hợp.
2. **Đúng nguồn:** thông tin sản phẩm, thương hiệu và số liệu phải có căn cứ.
3. **Đúng phạm vi:** chỉ sử dụng công cụ, trường dữ liệu và hành động phù hợp với mục tiêu.
4. **Có kiểm soát:** các kết luận phải phân biệt dữ kiện với nhận định; hành động có tác động bên ngoài phải giữ quyền phê duyệt của con người.

Các nguyên tắc này là cơ sở thống nhất cho Central Instructions, workflow prompts, Skills/References và cách đánh giá đầu ra của GIAO THỜI Marketing AI Agent.
