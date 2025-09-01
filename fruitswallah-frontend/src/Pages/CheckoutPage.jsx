import React from "react";
import Navbar from "../components/Navbar";
import {
  FaCreditCard,
  FaMobileAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
import CreditCard from "../components/CreditCard";
import UPI from "../components/Upi";
import NetBanking from "../components/NetBanking";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];    
    });
    let sum = 0;
    const [selectedPayment, setSelectedPayment] = useState('UPI');
    const [activeTab, setActiveTab] = useState('UPI');

    const handleTogglePaymentMethod = (method) => {
        if (method === "CreditCard") {
            setActiveTab('CreditCard');
        } else if (method === "UPI") {
            setActiveTab('UPI');    
        } else if (method === "NetBanking") {
            setActiveTab('NetBanking');
        } else if (method === "CashOnDelivery") {
            navigate('/home',{ state: { message: "Congratulations! Your order is successful. Now you can track your order." } });
            return;
        }
        setSelectedPayment(method);
    };

  return (
    <>
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="">Complete Payment</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className=" d-flex alert alert-info fw-medium justify-content-center">
              Overview of your order
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  sum = sum + item.price * item.quantity;
                  return (
                    <tr key={index}>
                      <td>
                        {item.name} x {item.quantity}
                      </td>
                      <td>&#8377; {item.price * item.quantity}</td>
                    </tr>
                  );
                })}
                <tr className="border-top-0 mt-5">
                  <td className="border-top-0">
                    <br /> <br />
                  </td>
                  <td className="border-top-0">
                    {" "}
                    <br /> <br />
                  </td>
                </tr>
                <tr className="fw-medium">
                  <td>Subtotal</td>
                  <td>&#8377; {sum}</td>
                </tr>
                <tr className="fw-medium">
                  <td>Shipping</td>
                  <td>&#8377; {sum > 300 ? 0 : 50}</td>
                </tr>
                <tr className="fw-bold">
                  <td>Total</td>
                  <td>&#8377; {sum > 300 ? sum : sum + 50}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-6 mx-auto">
            <div className="card ">
              <div className="card-header">
                <div className="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                  <ul
                    role="tablist"
                    className="nav bg-light nav-pills rounded nav-fill mb-3 p-1"
                  >
                    <li className="nav-item">
                      {" "}
                      <button
                        data-toggle="pill"
                        className={`nav-link ${
                          activeTab === "UPI" ? "active" : ""
                        }`}
                        onClick={() => handleTogglePaymentMethod("UPI")}
                      >
                        {" "}
                        <FaMoneyBillAlt /> UPI{" "}
                      </button>{" "}
                    </li>
                    <li className="nav-item">
                      {" "}
                      <button
                        data-toggle="pill"
                        className={`nav-link ${
                          activeTab === "CreditCard" ? "active" : ""
                        }`}
                        onClick={() => handleTogglePaymentMethod("CreditCard")}
                      >
                        {" "}
                        <FaCreditCard /> Credit Card/Debit Card
                      </button>{" "}
                    </li>
                    <li className="nav-item">
                      {" "}
                      <button
                        data-toggle="pill"
                        className={`nav-link ${
                          activeTab === "NetBanking" ? "active" : ""
                        }`}
                        onClick={() => handleTogglePaymentMethod("NetBanking")}
                      >
                        <FaMobileAlt /> Net Banking{" "}
                      </button>{" "}
                    </li>
                    <li className="nav-item">
                      {" "}
                      <button
                        data-toggle="pill"
                        className={`nav-link ${
                          activeTab === "CashOnDelivery" ? "active" : ""
                        }`}
                        onClick={() =>
                          handleTogglePaymentMethod("CashOnDelivery")
                        }
                      >
                        <FaMobileAlt /> Cash On Delivery
                      </button>{" "}
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  {selectedPayment === "UPI" && <UPI />}
                  {selectedPayment === "CreditCard" && <CreditCard />}
                  {selectedPayment === "NetBanking" && <NetBanking />}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
