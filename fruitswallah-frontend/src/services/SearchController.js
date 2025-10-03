import axios from "axios";
import useAuthStore from "../Stores/AuthStore";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const GetSearchedProducts = async (search, setProducts) => {
  const { token } = useAuthStore.getState();
    if (search === "") {
        return;
    }
    const res = await axios.get(`${BASE_URL}/api/Search/${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(res.data);
}