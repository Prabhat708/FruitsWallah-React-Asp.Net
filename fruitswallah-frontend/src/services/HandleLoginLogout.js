import axios from "axios";
import jwt_decode from "jwt-decode";
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
  try {
    const res = await axios.get(`${BASE_URL}/api/Login/${email}/${password}`);
    console.log(res.data);
    const decode = jwt_decode(res.data);
    const userid = decode.UserId;
    const Name = decode.UserName;
    if (res.data) {
      navigate("/home", {
        state: {
          message: "Keep shoping from FruitsWallah",
          comingFrom: "login",
          Username: Name,
        },
      });

      localStorage.setItem("Token", res.data);
      localStorage.setItem("UserId", userid);
    }
  } catch(e) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { success: false, message: e.response.data };
  }
};

export const HandleLogout = (navigate) => {
  localStorage.clear();
  navigate("/home", {
    state: {
      message: "You have been logged out successfully...",
      comingFrom: "LogOut",
    },
  });
};

export const HandlePasswordChange = async (data) => {
  const token = localStorage.getItem("Token");
  const { Password, newPassword, confirmPassword } = data;
  if (newPassword != confirmPassword) {
    alert("Password not matched");
    return;
  } else if (newPassword.length < 6) {
    alert("Password must be 6 digit");
    return;
  } else {
    const res = await axios.put(
      `${BASE_URL}/api/Login/${UserId},${Password},${newPassword}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(res.data);
  }
};
