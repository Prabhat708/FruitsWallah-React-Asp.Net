import axios from "axios";
import useAuthStore from "../Stores/AuthStore";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const GetPaymentId = async (setPaymentId) => {
  const { token, UserId } = useAuthStore.getState();
    const res = await axios.get(`${BASE_URL}/api/PaymentMethods/${UserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPaymentId(res.data.upi||'');
}
export const PostPaymentId = async (Paymentdata, setPaymentId, setShowPopup) => {
  const { token, UserId } = useAuthStore.getState();
  const payload={
    UserId: UserId,
    UPI:Paymentdata.UPI
  }
  const res = await axios.post(`${BASE_URL}/api/PaymentMethods`, payload, {
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