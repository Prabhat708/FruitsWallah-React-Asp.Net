import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  PlusMinusButton,
  AddToCart,
  getCartItems,
} from "../services/CartFeatures";

const ItemCard = ({ item }) => {
  const navigation = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [CartItems, setCartItems] = useState([]);

  useEffect(() => {
   
 getCartItems(setCartItems); 
  }, []);

  const cartItem = CartItems.find((ci) => ci.productId === item.productId);
  const quantity = cartItem?.productQuantity || 0;
  return (
    <>
      {showPopup && (
        <div className="alert alert-success">
          ✅ Item added successfully in Your Cart!
        </div>
      )}
      <div className="rounded position-relative fruite-item">
        <div className="fruite-img">
          <img
            id={item.productId}
            src={"https://localhost:7293" + item.productImg}
            className="product img-fluid w-100 rounded-top"
            alt={item.productName}
          />
        </div>

        <div className="p-4 position-relative border border-warning border-top-0 rounded-bottom min-h-80 max-h-80">
          <span
            onClick={() => navigation(`/product/${item.productId}`)}
            style={{ cursor: "pointer" }}
          >
            <h4 id={`Namepr+${item.productId}`}> {item.productName}</h4>
            <p className="text-secondary mb-2" style={{ minHeight: "60px" }}>
              {item.productDescription.slice(0, 60) +
                (item.productDescription.length > 60 ? "..." : "")}
            </p>
          </span>

          <div className="d-flex justify-content-between flex-lg-wrap">
            <p className="text-dark fs-5 fw-bold mb-0">
              ₹ {item.productPrice}/kg
            </p>

            {quantity > 0 ? (
              <div className="d-flex align-items-center">
                <button
                  className="rounded text-success border-0 fw-bold"
                  disabled={quantity === 1}
                  onClick={() =>
                    PlusMinusButton(
                      cartItem?.cartId,
                      "decrement",
                      cartItem?.productQuantity,
                      setCartItems
                    )
                  }
                >
                  -
                </button>
                <span className="mx-2 fw-bold text-success">{quantity}</span>
                <button
                  className="rounded text-success border-0 fw-bold"
                  onClick={() =>
                    PlusMinusButton(
                      cartItem?.cartId,
                      "increment",
                      cartItem?.productQuantity,
                      setCartItems
                    )
                  }
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="btn cart border border-secondary rounded-pill px-3 text-success"
                onClick={() =>
                  AddToCart(item.productId, setCartItems, setShowPopup)
                }
              >
                <FaShoppingBag size={30} className="text-success" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
