import axios from "axios"

const UserId=localStorage.getItem('UserId')
export const GetOrders = async (setOrders) => {
    const res = await axios.get(`https://localhost:7293/api/Orders/${UserId}`);
    setOrders(res.data)
}

export const PostOrders = async (PaymentMethod) => {
    console.log(UserId,PaymentMethod)
    
}

export const GetAllOrders = async (setOrders) => {
    const res = await axios.get(`https://localhost:7293/api/Orders/`);
    setOrders(res.data);
};

export const UpdatesStatus = async (orderId,status) => {
    console.log(orderId, status)
    const res = await axios.put(`https://localhost:7293/api/OrderTrackers/${orderId},${status}`);
}