import axios from "axios";
import useAuthStore from "../Stores/AuthStore";
import { HandleLogout } from "./HandleLoginLogout";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const handleSignUp = async (data, setData) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/Users`, data);
    setData({
      Username: "",
      Email: "",
      PhoneNumber: "",
      Password: "",
      cpassword: "",
    })
    useAuthStore.getState().setAuthData(res.data);
    const Username=useAuthStore.getState().UserName;
     return {status:true,Username:Username}
  }
    catch (e) {
    console.log(e.response.data);
    return;
  }
};

export const handleDeleteAccount = async (navigate) => {
  const { UserId, token } = useAuthStore.getState();
  try {
    const res = await axios.delete(`${BASE_URL}/api/Users/${UserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    HandleLogout(navigate);
    return { status: false, message: res.data };
  } catch (e) {
    return { status: false, message: e.response.data };
  }
};

export const handleActiveAccount = async () => {
  const { UserId,token } = useAuthStore.getState();
  const res = await axios.put(`${BASE_URL}/api/Users/Activate/${UserId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export const handleInActiveAccount = async (navigate) => {
  const { UserId, token } = useAuthStore.getState();
  const res = await axios.put(`${BASE_URL}/api/Users/InActivate/${UserId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  HandleLogout(navigate);
  return res.data;
};


