import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const navigation = useNavigate();
  // Manage cart in local storage using state and useEffect (no reload)
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const minusPlus = (id, action) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === id);
      if (existingItemIndex !== -1) {
        if (action === "increment") {
          updatedCart[existingItemIndex].quantity += 1;
        } else if (action === "decrement" && updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity -= 1;
        } else if (action === "decrement" && updatedCart[existingItemIndex].quantity === 1) {
          updatedCart.splice(existingItemIndex, 1);
        }
      }
      return updatedCart;
    });
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }

      return updatedCart;
    });
    alert("Item added to cart");
  };
  

  return (
    <>
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
                    minusPlus(item.id, "decrement");
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
                    minusPlus(item.id, "increment");
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
                  onClick={() => handleAddToCart(item)}
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
