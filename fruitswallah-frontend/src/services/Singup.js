import axios from "axios";
import useAuthStore from "../Stores/AuthStore";

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
      console.log(e.response.data)
      
    return;
  }
};


