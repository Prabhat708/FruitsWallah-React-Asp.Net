import axios from "axios";
import jwt_Decode from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const token = localStorage.getItem("Token") || null;
var UserId;
if(token!=null){
  UserId = jwt_Decode(token)?.UserId || null;
}
export const GetPaymentId = async (setPaymentId) => {
    const res = await axios.get(`${BASE_URL}/api/PaymentMethods/${UserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPaymentId(res.data.upi||'');
}
export const PostPaymentId = async (Paymentdata, setPaymentId, setShowPopup) => {
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