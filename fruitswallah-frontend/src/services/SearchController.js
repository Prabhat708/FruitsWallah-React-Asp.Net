import axios from "axios";

export const GetSearchedProducts = async (search,setProducts) => {
    const res = await axios.get(`https://localhost:7293/api/Search/${search}`);
    setProducts(res.data);
}