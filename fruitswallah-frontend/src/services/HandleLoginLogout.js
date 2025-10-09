import axios from "axios";
import useAuthStore from "../Stores/AuthStore";
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



export const HandlePasswordChange = async (data) => {
  const { token, UserId } = useAuthStore.getState();
  if (token == null) {
    alert("User not found. Please login again.");
    return;
  }
 
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
 
  const { token,UserId } = useAuthStore.getState();
  const res = await axios.get(`${BASE_URL}/api/Users/${UserId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setUsers(res.data);
  return res.data;
};

