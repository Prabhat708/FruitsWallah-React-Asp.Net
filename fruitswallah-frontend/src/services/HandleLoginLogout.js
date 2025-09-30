import axios from "axios";
import jwt_decode from "jwt-decode";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


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
    const decode = jwt_decode(res.data);
    if (res.data) {
      navigate("/home", {
        state: {
          message: "Keep shoping from FruitsWallah",
          comingFrom: "login",
          Username: decode.UserName,
        },
      });

      localStorage.setItem("Token", res.data);
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

 const token = localStorage.getItem("Token") || null;
 var UserId;
 if (token != null) {
   UserId = jwt_decode(token)?.UserId || null;
}
 

export const HandlePasswordChange = async (data) => {
 
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

export const getUserDeatails = async (setUsers) => {
  const res = await axios.get(`${BASE_URL}/api/Users/${UserId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setUsers(res.data);
  return res.data;
};