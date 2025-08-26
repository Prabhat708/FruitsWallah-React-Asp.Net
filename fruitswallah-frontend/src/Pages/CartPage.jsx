import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import cartImg from "../assets/Cart.svg";
import { MdDelete } from "react-icons/md";
import {Link} from 'react-router-dom';
import CartRow from "../components/CartRow";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      image: "/apple.jpg",
      productName: "Apple",
      productPrice: 120,
      productQuantity: 1,
    },
    {
      id: 4,
      image: "/Carrots.webp",
      productName: "Carrots",
      productPrice: 40,
      productQuantity: 2,
    },
    {
      id: 3,
      image: "/Tomatoes.jpg",
      productName: "Tomatoes",
      productPrice: 60,
      productQuantity: 12,
    },
    {
      id: 2,
      image: "/Spinach.jpg",
      productName: "Spinach.",
      productPrice: 80,
      productQuantity: 5,
    },
  ];
  return (
    <>
      <Navbar />

      <div className="container-fluid mt-5 pt-2">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table " id="CartItem">
              <thead className="">
                <tr>
                  <th scope="col ">Products/Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item,index)=>
                  <CartRow key={index} item={item } />
                )}
               
              </tbody>
            </table>
            
          </div>

          <div className="row g-4 justify-content-end">
            <div className="col-8">
              <img src={cartImg} alt=""  />
            </div>
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4 mt-5 pt-5">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">
                 <span className="fw-normal">Review Your Cart To Proceed</span>
                  </h1>
                  <p className="pt-0">Shipping only in India.</p>
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0 me-4">Subtotal:</h5>
                    <p id="subtotal" className="mb-0">
                      120
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 me-4">Shipping Charge:</h5>
                    <div className="">
                      <p id="ship" className="mb-0">
                        20
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Total</h5>
                  <p id="total" className="mb-0 pe-4">
                    150
                  </p>
                </div>
                <Link to="/fruitWallah/checkout/">
                  {" "}
                  <button
                    className="btn border-warning bg-success rounded-pill position-relative start-50 px-4 py-3 text-white text-uppercase mb-4 "
                    type="button"
                  >
                    Proceed Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
