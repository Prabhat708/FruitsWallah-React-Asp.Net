import axios from "axios";
import { getCartItems } from "./CartFeatures";
import { PostPayment } from "./payments";
import { getAddress } from "./ManageAddress";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const Gateway_Key = import.meta.env.VITE_KEY;
const UserId = localStorage.getItem("UserId");
const token = localStorage.getItem("Token");
export const GetOrders = async (setOrders) => {
  if (!UserId) {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/api/Orders/${UserId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setOrders(res.data);
    return;
  } catch {
    return;
  }
};

export const PostOrders = async (
  PaymentMethod,
  setShowPopup,
  navigate,
  setCartItems,
  setAddress,
  Amount
) => {

 const res=await getAddress(setAddress)
  if (res.length == 0)
  {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return {
      status: false,
      message: "Address Not Found. Please Add Address before Order.",
    };
  }
  var OrderData;
  if (PaymentMethod == "COD") {
    OrderData = {
      UserID: UserId,
      TransactionType: PaymentMethod,
      Amount: Amount,
      currency: "NIR",
      razorpaySignature: "null",
      transactionId: "null",
      transactionOrderID: "null",
      transactionTime: new Date(),
    };
  } else {
    try {
      const paymentDeatils = await PostPayment(Amount,token);
      OrderData = await getPayment(paymentDeatils, PaymentMethod);
    } catch (e) {
      console.log(e);
      return;
    }
  }
  try {
    const res = await axios.post(`${BASE_URL}/api/Orders`, OrderData, {   
  headers: {
    Authorization: `Bearer ${token}`
  }
    });
    setShowPopup(true);
    getCartItems(setCartItems);
    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
    setTimeout(() => {
      navigate("/home");
    }, 2600);
    return {status:true,message:"Thank You! You Ordered Successfully. Now you can Track Your Order From Orders Page."};
  } catch (e) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return {status:false,message:e.response.data};
  }
};

export const GetAllOrders = async (setOrders) => {
  const res = await axios.get(`${BASE_URL}/api/Orders/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setOrders(res.data);
};

export const UpdatesStatus = async (orderId, status, setShowPopup) => {
  const res = await axios.put(
`${BASE_URL}/api/OrderTrackers/${orderId},${status}`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
};

const getPayment = async (paymentDeatils, PaymentMethod) => {
  const { orderId, amount, currency } = paymentDeatils;
  var OrderData;
  return new Promise((resolve, reject) => {
    const options = {
      key: Gateway_Key,
      amount: amount,
      currency: currency,
      name: "Fruitswallah",
      description: "Test Transaction",
      order_id: orderId,
      image: "/favicon.png",
      handler: function (response) {
        OrderData = {
          UserID: UserId,
          TransactionType: PaymentMethod,
          transactionId: response.razorpay_payment_id,
          transactionOrderID: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          currency: currency,
          Amount: amount,
          transactionTime: new Date(),
        };
        resolve(OrderData);
      },
      theme: {
        color: "#04492fff",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};
