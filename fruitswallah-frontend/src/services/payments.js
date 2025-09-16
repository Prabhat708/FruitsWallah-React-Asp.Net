import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const PostPayment = async (amount) => {
    const payload = {
        Amount:amount
    }
    const res = await axios.post(
      `${BASE_URL}/api/Orders/create-order`,
      payload
    );
    return res.data;
}
