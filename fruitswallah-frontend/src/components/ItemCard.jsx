import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PlusMinusButton ,AddToCart} from "../services/CartFeatures";

const ItemCard = ({ item }) => {
  const navigation = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  return (
    <>
      {showPopup && (
        <div className="alert alert-success">
          ✅ Item added successfully!
        </div>
      )}
      <div className="rounded position-relative fruite-item ">
        <div className="fruite-img">
          <img
            id={item.id}
            src={item.image}
            className="product img-fluid w-100 rounded-top"
            alt=""
          />
        </div>

        <div className="p-4  position-relative border border-warning border-top-0 rounded-bottom min-h-80 max-h-80">
          <span
            onClick={() => {
              navigation(`/product/${item.id}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <h4 id={`Namepr+${item.id}`}> {item.name}</h4>
            <p className="text-secondary mb-2" style={{ minHeight: "60px" }}>
              {item.discription.slice(0, 60) +
                (item.discription.length > 60 ? "..." : "")}
            </p>
          </span>
          <div className="d-flex justify-content-between flex-lg-wrap">
            <p id="pricepr{{i.id}}" className="text-dark fs-5 fw-bold mb-0">
              &#8377; {item.price}/ kg
            </p>
            {(cart || []).some((cartItem) => cartItem.id === item.id) ? (
              <div className="d-flex align-items-center">
                <button
                  className=" rounded text-success border-0 fw-bold"
                  onClick={() => {
                    PlusMinusButton(item.id, "decrement", setCart);
                  }}
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
                    PlusMinusButton(item.id, "increment",setCart);
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="btn cart border border-secondary rounded-pill px-3 text-success"
              >
                <FaShoppingBag
                  onClick={() => AddToCart(item.id ,setCart,setShowPopup)}
                  size={30}
                  className="text-success "
                ></FaShoppingBag>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
