import axios from "axios";
import useAuthStore from "../Stores/AuthStore";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const HandleLogin = async (data, navigate, setShowPopup) => {
  const { email, password } = data;
  if (!email || !password) {
  
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { success: false, message: "Please fill all the fields" };

  } else if (password.length < 6) {
setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { success: false, message: "Password must be at least 6 characters long" };
  }
  const payload = {
    Email: email,
    Password: password,
  };

  try {
    const res = await axios.post(`${BASE_URL}/api/Login`, payload);
   useAuthStore.getState().setAuthData(res.data);
   const UserName = useAuthStore.getState().UserName;

    if (UserName) {
      navigate("/home", {
        state: {
          message: "Keep shoping from FruitsWallah",
          comingFrom: "login",
          Username: UserName,
        },
      });
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
  useAuthStore.getState().logout();
  navigate("/home", {
    state: {
      message: "You have been logged out successfully...",
      comingFrom: "LogOut",
    },
  });
};



export const HandlePasswordChange = async (data, setShowPopup) => {
  const { token, UserId } = useAuthStore.getState();
  if (token == null) {
setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { success: false, message: "User not found. Please login again." };
  }
 
  const { Password, newPassword, confirmPassword } = data;
  if (newPassword != confirmPassword) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { success: false, message: "New password and confirm password do not match." };
  
  } else if (newPassword.length < 6) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { success: false, message: "Password must be at least 6 characters long." };
    
  } else {
    try {
    const res = await axios.put(
      `${BASE_URL}/api/Login/${UserId},${Password},${newPassword}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { success: false, message: res.data};
  } catch (e) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { success: false, message: e.response.data };
  }
  }
};

export const getUserDeatails = async (setUsers) => {
 
  const { token,UserId } = useAuthStore.getState();
  const res = await axios.get(`${BASE_URL}/api/Users/${UserId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setUsers(res.data);
  return res.data;
};

