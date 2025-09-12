import axios from "axios";

const UserId = localStorage.getItem("UserId");
export const HandleLogin = async (data, navigate) => {
  const { email, password } = data;
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  } else if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }
  const res = await axios.get(
    `https://localhost:7293/api/Login/${email}/${password}`
  );
  if (res.data) {
    navigate("/home", {
      state: {
        message: "Keep shoping from FruitsWallah",
        comingFrom: "login",
        Username: res.data.name,
      },
    });
    localStorage.setItem("isLogin", true);
    localStorage.setItem("UserId", res.data.userId);
    localStorage.setItem("isAdmin", res.data.isAdmin);
    localStorage.setItem("user", res.data.name);
  } else {
    return { success: false, message: "Invalid Creditial" };
  }
};

export const HandleLogout = (navigate) => {
  localStorage.setItem("isLogin", false);
  localStorage.removeItem("UserId");
  navigate("/home", {
    state: {
      message: "You have been logged out successfully...",
      comingFrom: "LogOut",
    },
  });
};


export const HandlePasswordChange = async (data) => {
  const { Password, newPassword, confirmPassword } = data;
  if (newPassword != confirmPassword) {
    alert("Password not matched");
    return;
  } else if (newPassword.length < 6) {
    alert("Password must be 6 digit");
    return;
  } else {
    const res = await axios.put(`https://localhost:7293/api/Login/${UserId},${Password},${newPassword}`);
    alert(res.data)
  }
};