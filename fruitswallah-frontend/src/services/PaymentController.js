import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const UserId = localStorage.getItem("UserId");
export const GetPaymentId = async (setPaymentId) => {
    const res = await axios.get(`${BASE_URL}/api/PaymentMethods/${UserId}`);
    setPaymentId(res.data.upi||'');
}
export const PostPaymentId = async (Paymentdata, setPaymentId, setShowPopup) => {
  const res = await axios.post(`${BASE_URL}/api/PaymentMethods`, Paymentdata);
    GetPaymentId(setPaymentId);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  return;
};