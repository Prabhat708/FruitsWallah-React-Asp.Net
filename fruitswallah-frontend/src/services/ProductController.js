import axios from "axios"

export const GetProducts = async (setProducts) => {
    const res = await axios.get("https://localhost:7293/api/Products");
    if (res.data) {
        setProducts(res.data);
    }
}