import React, { createContext, use, useContext, useEffect, useState } from "react";
import { getCartItems } from "../services/CartFeatures";
import useAuthStore from "../Stores/AuthStore";


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const { token, UserId } = useAuthStore();

  useEffect(() => {
    if (!token || !UserId) {
      setCartItems([]);
      return;
    }

    const fetchCart = async () => {
      const data = await getCartItems(setCartItems);
      if (data) {
        setCartItems(data);
      }
    };

    fetchCart();
  }, [token, UserId]); 

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
