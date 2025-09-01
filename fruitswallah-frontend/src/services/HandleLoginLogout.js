export const HandleLogin = (data) => {
  
  const { email, password } = data;
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  } else if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  } else if (password === "password" && email === "Prabhat@gmail.com") {
    localStorage.setItem("isLogin", true);
    return { success: true };
  } else {
    alert("Invalid Credentials");
    return { success: false, message: "Invalid Credentials" };
  }
};

export const HandleLogout = (navigate) => {
  localStorage.setItem("isLogin",false);
  navigate("/home", {
    state: {
      message: "You have been logged out successfully...",
      comingFrom: "LogOut",
    },
  });
};
