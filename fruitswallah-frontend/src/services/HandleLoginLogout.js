import axios from "axios";
export const HandleLogin = async ( data,navigate) => {
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
