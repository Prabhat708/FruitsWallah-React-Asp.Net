import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const UserId = localStorage.getItem("UserId");
export const HandleLogin = async (data, navigate, setShowPopup) => {
  const { email, password } = data;
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  } else if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }
  const res = await axios.get(
    `${BASE_URL}/api/Login/${email}/${password}`
  );

  if (res.data.name) {
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
    setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
    return { success: false, message: "Invalid Creditial" };
  }
};

export const HandleLogout = (navigate) => {
  localStorage.setItem("isLogin", false);
  localStorage.removeItem("UserId");
  localStorage.removeItem("isAdmin");
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
    const res = await axios.put(`${BASE_URL}/api/Login/${UserId},${Password},${newPassword}`);
    alert(res.data)
  }
};