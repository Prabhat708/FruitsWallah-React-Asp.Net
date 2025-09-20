import axios from "axios"
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const SendMsg = async (contactData,setShowPopup) => {
    const res = await axios.post(
      `${BASE_URL}/api/Contact`,contactData
    );
    console.log(res.data)
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return {status: true,message:res.data}
}