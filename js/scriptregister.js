document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
// Lưu thông tin tài khoản đã đăng ký vào Local Storage
registerForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy giá trị từ các input
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra xem các trường input có được điền đầy đủ hay không
    if (!username || !phone || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    // Kiểm tra xem tên tài khoản có chứa "@gmail.com"
    if (!username.includes("@gmail.com")) {
        alert("Tên tài khoản phải chứa '@gmail.com'. Vui lòng nhập lại.");
        return;
    }

    // Kiểm tra số điện thoại chỉ chấp nhận số
    if (!/^\d+$/.test(phone)) {
        alert("Số điện thoại chỉ được nhập số. Vui lòng nhập lại.");
        return;
    }

    // Kiểm tra xem mật khẩu và mật khẩu xác nhận có khớp nhau không
    if (password !== confirmPassword) {
        alert("Mật khẩu và mật khẩu xác nhận không khớp!");
        return;
    }

    // Kiểm tra xem tên tài khoản đã tồn tại trong danh sách đã đăng ký hay chưa
    if (isUsernameExists(username)) {
        alert("Tên tài khoản đã tồn tại. Vui lòng chọn tên khác.");
        return;
    }

    // Thêm tên tài khoản mới vào danh sách đã đăng ký
    addNewUser({ username, phone, password });

    // Thông báo đăng ký thành công
    alert("Đăng ký thành công!");
    // Chuyển hướng sang trang đăng nhập
    window.location.href = "login.html";
});


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

    // Hàm thêm tên tài khoản mới vào danh sách đã đăng ký
    function addNewUser(user) {
        // Lấy danh sách tài khoản đã đăng ký từ Local Storage
        let registeredUsers = getRegisteredUsers();

        // Thêm tài khoản mới vào danh sách
        registeredUsers.push(user);

        // Lưu lại danh sách tài khoản đã đăng ký vào Local Storage
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
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
