import axios from "axios";

const UserId = localStorage.getItem('UserId');

export const getCartItems = async (setCartItems) => {
  const res = await axios.get(`https://localhost:7293/api/Carts/${UserId}`);
  if (res.data) {
    setCartItems(res.data);
  }
}

export const AddToCart = async (itemId, setCart, setShowPopup) => {
  const AddCart = {
    UserId: UserId,
    productId: itemId,
    productQuantity: 1
  };
  const res = await axios.post(`https://localhost:7293/api/Carts/`, AddCart);
  if (res.data) {
    setCart(res.data);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }
};

export const RemoveFromCart = async(
  cartId,
  setShowPopup,
) => {
  const res = await axios.delete(`https://localhost:7293/api/Carts/${cartId}`);
  if (res.status == 200) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }
};

export const PlusMinusButton = async (cartId, action, quantity) => {
      if (action === "increment") {
        quantity += 1;
      } else if (
        action === "decrement"
      ) {
          quantity -= 1;
  } 
  const res = await axios.put(`https://localhost:7293/api/Carts/${cartId},${quantity}`);
  };

