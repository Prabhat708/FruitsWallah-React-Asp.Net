import axios from "axios";
import jwt_decode from "jwt-decode";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const handleSignUp = async (data, setData) => {
  try {
    const { Username } = data;
    const res = await axios.post(`${BASE_URL}/api/Users`, data);
    setData({
      Username: "",
      Email: "",
      PhoneNumber: "",
      Password: "",
      cpassword: "",
    })
      localStorage.setItem("Token", res.data)
      const decode = jwt_decode(res.data);
      const userid = decode.UserId;
      localStorage.setItem("UserId", userid);
     return {status:true,Username:Username}
  }
    catch (e) {
      console.log(e.response.data)
      
    return;
  }
    
  
};


