import axios from "axios"
import { getCartItems } from "./CartFeatures";

const UserId=localStorage.getItem('UserId')
export const GetOrders = async (setOrders) => {
    const res = await axios.get(`https://localhost:7293/api/Orders/${UserId}`);
    setOrders(res.data)
}

export const PostOrders = async (PaymentMethod, setShowPopup, navigate,setCartItems) => {

    console.log(UserId, PaymentMethod);
    const OrderData = {
        UserID: UserId,
        TransactionType: PaymentMethod
    }
    const res = await axios.post("https://localhost:7293/api/Orders", OrderData);
    setShowPopup(true);
    getCartItems(setCartItems)
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    setTimeout(() => {
        navigate('/home');
    }, 2100);
    return;
}

export const GetAllOrders = async (setOrders) => {
    const res = await axios.get(`https://localhost:7293/api/Orders/`);
    setOrders(res.data);
};

export const UpdatesStatus = async (orderId,status) => {
    const res = await axios.put(`https://localhost:7293/api/OrderTrackers/${orderId},${status}`);
}