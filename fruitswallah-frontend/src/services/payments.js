import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


export const PostPayment = async (amount,token) => {
    const payload = {
        Amount:amount
    }
    const res = await axios.post(
      `${BASE_URL}/api/Payment/create-order`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
}

export const VerifyPayment = async (payload,token) => {
  const res = await axios.post(
    `${BASE_URL}/api/Payment/verify-payment`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}