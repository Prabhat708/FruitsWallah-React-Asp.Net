import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  AddToCart,
  PlusMinusButton,
} from "../services/CartFeatures";

import { useParams } from "react-router-dom";
import { GetProducts } from "../services/ProductController";
import { useCart } from "./CartContext";

const Product = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const { cartItems, setCartItems } = useCart();
  useEffect(() => {
    GetProducts(setProducts);
  }, []);
  
  
  const item = products.find(it => it?.productId == id);
  const cartItem = cartItems.find((ci) => ci?.productId === item?.productId);
  const quantity = cartItem?.productQuantity || 0;
 
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
              <center> {item?.productCatagory}</center>
              <center>
                <img
                  src={"https://localhost:7293" + item?.productImg}
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
              <h4 className="card-title">{item?.productName}</h4>
              <h6 className="card-text">{item?.productDescription}</h6>
              <h5 className="card-text text-danger mt-3">
                &#8377; {item?.productPrice}/Kg
              </h5>
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
                    disabled={quantity == item?.productStock}
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
              ) : item?.productStock == 0 ? (
                <p className="text-danger fw-medium">Out of stock</p>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success text-white rounded-pill mt-3"
                  onClick={() =>
                    AddToCart(item?.productId, setCartItems, setShowPopup)
                  }
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
