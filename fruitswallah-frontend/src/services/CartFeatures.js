import axios from "axios";
import useAuthStore from "../Stores/AuthStore";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getCartItems = async (setCartItems) => {
  const { token, UserId } = useAuthStore.getState(); 
  if (token==null) {
    return;
  }
  const res = await axios.get(`${BASE_URL}/api/Carts/${UserId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    setCartItems(res.data);
  }
};

export const AddToCart = async (itemId, setCartItems, setShowPopup) => {
  const { UserId } = useAuthStore.getState();
  if (UserId == null) {
    return;
  }
  const AddCart = {
    UserId: UserId,
    productId: itemId,
    productQuantity: 1,
  };
  const res = await axios.post(`${BASE_URL}/api/Carts/`, AddCart);
  getCartItems(setCartItems);
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
};

export const RemoveFromCart = async (cartId, setShowPopup, setCartItems) => {
  const { token } = useAuthStore.getState();
  try {
    const res = await axios.delete(`${BASE_URL}/api/Carts/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await getCartItems(setCartItems);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: false, message: res.data };
  } catch (e) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: false, message: e.response.data };
  }
};

export const PlusMinusButton = async (
  cartId,
  action,
  quantity,
  setCartItems
) => {
  if (action === "increment") {
    quantity += 1;
  } else if (action === "decrement") {
    quantity -= 1;
  }
  const res = await axios.put(`${BASE_URL}/api/Carts/${cartId},${quantity}`);
  await getCartItems(setCartItems);
};
