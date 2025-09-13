import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCartItems } from '../services/CartFeatures';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems ] = useState([]);

  useEffect(() => {
    getCartItems(setCartItems);
  }, []);
    return (

        <CartContext.Provider value={{ cartItems, setCartItems }}>
          {children}
        </CartContext.Provider>

    );
};


