import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const UserId = localStorage.getItem("UserId");
const token = localStorage.getItem("Token");

export const GetPaymentId = async (setPaymentId) => {
    const res = await axios.get(`${BASE_URL}/api/PaymentMethods/${UserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPaymentId(res.data.upi||'');
}
export const PostPaymentId = async (Paymentdata, setPaymentId, setShowPopup) => {
  const res = await axios.post(`${BASE_URL}/api/PaymentMethods`, Paymentdata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    GetPaymentId(setPaymentId);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  return;
};