import axios from "axios";

const UserId = localStorage.getItem("UserId");
export const GetPaymentId = async (setPaymentId) => {
    const res = await axios.get(`https://localhost:7293/api/PaymentMethods/${UserId}`);
    setPaymentId(res.data.upi||'');
}
export const PostPaymentId = async (Paymentdata, setPaymentId, setShowPopup) => {
  const res = await axios.post(
    `https://localhost:7293/api/PaymentMethods`,
    Paymentdata
  );
    GetPaymentId(setPaymentId);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  return;
};