import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const GetSearchedProducts = async (search,setProducts) => {
    const res = await axios.get(`${BASE_URL}/api/Search/${search}`);
    setProducts(res.data);
}