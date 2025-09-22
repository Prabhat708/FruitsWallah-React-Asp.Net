import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SidePannel from "../components/SidePannel";
import { sidebarItems } from "../data/Sidebar";
import OrderTracking from "../components/orderTracking";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { GetOrders } from "../services/OrdersController";

const SingleOrderPage = () => {
  const { OrderId } = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
        const token= localStorage.getItem("Token");
        if (token==null) {
          navigate("/login");
        }
      }, []);
  useEffect(() => {
    GetOrders(setOrders); 
  }, []);
  const order = orders.find((or) => (or.orderId) == OrderId);
  const [activeItem, setActiveItem] = useState("View orders");

  return (
    <>
      <Navbar />
      <div
        className="d-flex min-vh-100 mt-5 pt-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <SidePannel
          sidebarItems={sidebarItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <div className="flex-grow-1 p-4">
          <div className="container-fluid" style={{ maxWidth: "1024px" }}>
            <div className="mb-4">
              <h1 className="h2 fw-bold text-dark mb-2">Order history</h1>
            </div>
            <div className="d-flex flex-column gap-4 fw-medium h5">
              Order Status
            </div>

            {order ? (
              <OrderTracking order={order} />
            ) : (
              <div className="text-muted mt-4">Loading order details...</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleOrderPage;
