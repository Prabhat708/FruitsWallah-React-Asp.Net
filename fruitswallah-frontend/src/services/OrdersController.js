import axios from "axios"
import { getCartItems } from "./CartFeatures";
import { PostPayment } from "./payments";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const Gateway_Key = import.meta.env.VITE_KEY;
const UserId=localStorage.getItem('UserId')
export const GetOrders = async (setOrders) => {
    const res = await axios.get(`${BASE_URL}/api/Orders/${UserId}`);
    setOrders(res.data)
}

export const PostOrders = async (
  PaymentMethod,
  setShowPopup,
  navigate,
  setCartItems,
  Amount
) => {
   
    var OrderData;
    if (PaymentMethod == "COD") {
       OrderData = {
         UserID: UserId,
         TransactionType: PaymentMethod,
         Amount: Amount,
         currency:"NIR",
         razorpaySignature:"null",
         transactionId:'null',
         transactionOrderID:"null",
         transactionTime:new Date(),
       };
    }
    else {
      try {
        const paymentDeatils = await PostPayment(Amount);
        console.log(paymentDeatils)
        OrderData = await getPayment(paymentDeatils, PaymentMethod);
      }
      catch (e) {
        console.log(e)
        return;
      }
  }
  try {
    const res = await axios.post(`${BASE_URL}/api/Orders`, OrderData);
    setShowPopup(true);
    getCartItems(setCartItems);
    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
    setTimeout(() => {
      navigate("/home");
    }, 2600);
  
    return;
  } catch {
    return;
  }
};

export const GetAllOrders = async (setOrders) => {
    const res = await axios.get(`${BASE_URL}/api/Orders/`);
    setOrders(res.data);
};

export const UpdatesStatus = async (orderId,status,setShowPopup) => {
    const res = await axios.put(
      `${BASE_URL}/api/OrderTrackers/${orderId},${status}`
  );
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
}

const getPayment = async (paymentDeatils, PaymentMethod) => {
  const { orderId, amount, currency } = paymentDeatils;
  var OrderData;
  return new Promise((resolve, reject) => {
    const options = {
      key:Gateway_Key,
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