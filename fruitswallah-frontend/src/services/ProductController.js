import axios from "axios"
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const GetProducts = async (setProducts) => {
    const res = await axios.get(`${BASE_URL}/api/Products`);
    if (res.data) {
        setProducts(res.data);
    }
}