import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const navigation = useNavigate();
  const handleAddToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
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
          <span onClick={() => {navigation(`/product/${item.id}`);}} style={{ cursor: "pointer" }}>
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

            <button
              type="submit"
              className="btn cart border border-secondary rounded-pill px-3 text-success"
            >
              <FaShoppingBag
                onClick={() =>handleAddToCart(item)}
                size={30}
                className="text-success "
              ></FaShoppingBag>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
