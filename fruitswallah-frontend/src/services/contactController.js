import axios from "axios"
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
import useAuthStore from "../Stores/AuthStore";
const token = useAuthStore.getState().token;
export const SendMsg = async (contactData, setShowPopup) => {
  
    const res = await axios.post(`${BASE_URL}/api/Contact`, contactData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return {status: true,message:res.data}
}