import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const token = localStorage.getItem("Token");
export const GetSearchedProducts = async (search, setProducts) => {
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