import React, { useState } from "react";
import { Products as Items } from "../data/Products";

const cart = JSON.parse(localStorage.getItem("cart")) || [];
export const AddToCart = (itemId, setCart, setShowPopup) => {
  const item = Items.find((itm) => itm.id === parseInt(itemId));
  setCart((prevCart) => {
    const updatedCart = [...prevCart];
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.itemId
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }
    return updatedCart;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
};

export const RemoveFromCart = (
  itemId,
  setShowPopup,
  setCartItems,
  cartItems
) => {

  const updatedCart = cartItems.filter((cartItem) => cartItem.id !== itemId);
  setCartItems(updatedCart); // update state -> re-render
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
  return cartItems;
};

export const PlusMinusButton = (itemId, action, setCart) => {
  setCart((prevCart) => {
    const updatedCart = [...prevCart];
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === itemId
    );
    if (existingItemIndex !== -1) {
      if (action === "increment") {
        updatedCart[existingItemIndex].quantity += 1;
      } else if (
        action === "decrement" &&
        updatedCart[existingItemIndex].quantity > 1
      ) {
          updatedCart[existingItemIndex].quantity -= 1;
          
      } else if (
        action === "decrement" &&
        updatedCart[existingItemIndex].quantity === 1
      ) {
          updatedCart.splice(existingItemIndex, 1);
          
      }
    }
    return updatedCart;
  });
};
