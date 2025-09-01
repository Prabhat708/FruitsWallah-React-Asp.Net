import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Products as Items } from "../data/Products";
import { AddToCart, PlusMinusButton } from "../services/CartFeatures";

import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const item = Items.find((itm) => itm.id === parseInt(id));

  return (
    <>
      <Navbar />

      <div
        className="card border-0 mt-5 pt-5"
        style={{
          width: "80%",
          margin: "10%",
          marginTop: "7%",
        }}
      >
        {showPopup && (
          <div className="alert alert-success">✅ Item added successfully!</div>
        )}
        <div className="row g-0">
          <div className="col-md-6 d-flex justify-content-center">
            <span
              className="card-title bg-warning text-white rounded p-2 d-block fw-medium "
              style={{ width: "50%", height: "fit-content" }}
            >
              <center> {item.catagory}</center>
              <center>
                <img
                  src={item.image}
                  className="img-fluid rounded-start"
                  width={500}
                  height={500}
                  alt="..."
                />
              </center>
            </span>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <h6 className="card-text">{item.discription}</h6>
              <h5 className="card-text text-danger mt-3">
                &#8377; {item.price}/Kg
              </h5>
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
                      PlusMinusButton(item.id, "increment", setCart);
                    }}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => AddToCart(item.id, setShowPopup)}
                  className="btn btn-success text-white rounded-pill mt-3"
                >
                  {" "}
                  Add to Cart
                </button>
              )}

              <h5 className="card-text mt-4">Health Benefits:</h5>
              <ul>
                <li>Rich in fiber and antioxidants</li>
                <li>Supports heart health and digestion</li>
                <li>Boosts immune system with vitamin C</li>
                <li>Promotes healthy skin and weight management</li>
                <li>Versatile for snacking and cooking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
