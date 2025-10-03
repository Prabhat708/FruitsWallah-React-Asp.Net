import { MdDelete } from "react-icons/md";
import { PlusMinusButton, RemoveFromCart } from "../services/CartFeatures";
import { useState } from "react";
const CartRow = ({ item, onDelete, setCartItems }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [showPopup, setShowPopup] = useState(false);
  // Remove item from cart if stock is 0  
  if (item.productStock === 0) {
    RemoveFromCart(item?.cartId, setShowPopup, setCartItems);
  }
  return (
    <>
      {showPopup ? <p>Item is out of Stock so removing from Cart</p> :
        <tr>
          <td>
            <img
              src={BASE_URL + item?.productImg}
              alt="No Img"
              style={{ width: "50px" }}
            />
          </td>
          <td>{item?.productName}</td>
          {item.productStock === 0 ? (
            <td className="text-danger">Out of stock</td>
          ) : (<td>&#8377;{item?.productPrice}</td>)}
        
          <td>
            <div className="d-flex align-items-center">
              <button
                className={`rounded text-success border-0 fw-bold ${item?.productQuantity === 1 ? "disabled" : ""
                  }`}
                onClick={() => {
                  PlusMinusButton(
                    item?.cartId,
                    "decrement",
                    item?.productQuantity,
                    setCartItems
                  );
                }}
                disabled={item?.productQuantity === 1}
              >
                -
              </button>

              <span className="mx-2 fw-bold text-success">
                {item?.productQuantity}
              </span>
              <button
                className=" rounded text-success border-0 fw-bold"
                onClick={() => {
                  PlusMinusButton(
                    item?.cartId,
                    "increment",
                    item?.productQuantity,
                    setCartItems
                  );
                }}
                disabled={item?.productQuantity >= item?.productStock}
              >
                +
              </button>
            </div>
          </td>
          <td>
            &#8377;
            {item?.productPrice * item?.productQuantity}
          </td>
          <td>
            <button className="btn border-danger text-danger rounded-pill">
              <MdDelete onClick={() => onDelete(item?.cartId, setCartItems)} />
            </button>
          </td>
        </tr>
      }
    </>
  );
};

export default CartRow;
