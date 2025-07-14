document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".register-form");
    const emailInput = document.getElementById("register-email");
    const passwordInput = document.getElementById("register-password");
    const confirmInput = document.getElementById("register-confirm");

    form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();

    if (email === "") {
        alert("Email không được để trống.");
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.(com)$/i;
    if (!emailPattern.test(email)) {
        alert("Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: example@gmail.com).");
        emailInput.focus();
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        alert("Email đã được đăng ký. Vui lòng dùng email khác.");
        emailInput.focus();
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự.");
        passwordInput.focus();
        return;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
        alert("Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
        passwordInput.focus();
        return;
    }
    if (password !== confirm) {
        alert("Mật khẩu xác nhận không khớp.");
        confirmInput.focus();
        return;
    }
    const user = {
        email : email,
        password: password
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    form.reset();
    });
});