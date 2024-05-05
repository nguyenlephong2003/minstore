document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    // Kiểm tra thông tin đăng nhập
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form

        // Lấy giá trị từ các input
        const loginUsername = document.getElementById("loginUsername").value;
        const loginPassword = document.getElementById("loginPassword").value;

        // Kiểm tra xem các trường input có được điền đầy đủ hay không
        if (!loginUsername || !loginPassword) {
            alert("Vui lòng điền đầy đủ thông tin tài khoản và mật khẩu.");
            return;
        }

        // Kiểm tra xem tên tài khoản đã tồn tại trong danh sách đã đăng ký hay không
        if (!isUsernameExists(loginUsername)) {
            alert("Tên tài khoản chưa được đăng ký. Vui lòng đăng ký trước khi đăng nhập.");
            return;
        }

        // Kiểm tra thông tin đăng nhập với thông tin đã lưu trong Local Storage
        if (checkLoginCredentials(loginUsername, loginPassword)) {
            // Đăng nhập thành công, chuyển hướng người dùng sang trang chính
            alert("Đăng nhập thành công!");
            window.location.href = "index.html";
        } else {
            // Đăng nhập không thành công, hiển thị thông báo lỗi
            alert("Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.");
        }
    });

    // Hàm kiểm tra xem tên tài khoản đã tồn tại trong danh sách đã đăng ký hay chưa
    function isUsernameExists(username) {
        // Lấy danh sách tài khoản đã đăng ký từ Local Storage
        const registeredUsers = getRegisteredUsers();
        return registeredUsers.some(user => user.username === username);
    }

    // Hàm kiểm tra thông tin đăng nhập với thông tin đã lưu trong Local Storage
    function checkLoginCredentials(username, password) {
        // Lấy danh sách tài khoản đã đăng ký từ Local Storage
        const registeredUsers = getRegisteredUsers();

        // Kiểm tra thông tin đăng nhập với từng tài khoản đã đăng ký
        return registeredUsers.some(user => user.username === username && user.password === password);
    }

    // Hàm lấy danh sách tài khoản đã đăng ký từ Local Storage
    function getRegisteredUsers() {
        // Đây chỉ là một hàm giả định để lấy danh sách tài khoản từ cơ chế lưu trữ
        // Trong trường hợp này, chúng ta giả sử danh sách tên tài khoản được lưu trong localStorage
        // Nếu không có danh sách, trả về một mảng trống
        return JSON.parse(localStorage.getItem("registeredUsers")) || [];
    }
});
