import axios from "axios"

const UserId=localStorage.getItem('UserId')
export const GetOrders = async (setOrders) => {
    const res = await axios.get(`https://localhost:7293/api/Orders/${UserId}`);
    setOrders(res.data)
}

export const PostOrders = async () => {
    
}