import { MdDelete } from "react-icons/md";
import { PlusMinusButton } from "../services/CartFeatures";
import React, { useEffect, useState } from "react";
const CartRow = ({ item, onDelete }) => {
  const [cart, setCart] = useState (() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
 
  return (
    <>
      <tr>
        <td>
          <img src={item.image} alt="" style={{ width: "50px" }} />
        </td>
        <td>{item.name}</td>
        <td>&#8377;{item.price}</td>
        <td>
          <div className="d-flex align-items-center">
            <button
              className={`rounded text-success border-0 fw-bold ${
                (cart || []).find((cartItem) => cartItem.id === item.id)
                  ?.quantity === 1
                  ? "disabled"
                  : ""
              }`}
              onClick={() => {
                const cartItem = (cart || []).find(
                  (cartItem) => cartItem.id === item.id
                );
                if (cartItem?.quantity > 1) {
                  PlusMinusButton(item.id, "decrement", setCart);
                }
              }}
              disabled={
                (cart || []).find((cartItem) => cartItem.id === item.id)
                  ?.quantity === 1
              }
            >
              -
            </button>

            <span className="mx-2 fw-bold text-success">
              {
                (cart || []).find((cartItem) => cartItem.id === item.id)
                  .quantity
              }
            </span>
            <button
              className=" rounded text-success border-0 fw-bold"
              onClick={() => {
                PlusMinusButton(item.id, "increment", setCart);
              }}
            >
              +
            </button>
          </div>
        </td>
        <td>
          &#8377;
          {item.price *
            (cart || []).find((cartItem) => cartItem.id === item.id).quantity}
        </td>
        <td>
          <button className="btn border-danger text-danger rounded-pill">
            <MdDelete onClick={() => onDelete(item.id)} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartRow;
