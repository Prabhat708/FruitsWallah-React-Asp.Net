import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from 'react-router-dom';
import {
  Package,
  User,
  Lock,
  CreditCard,
  MapPin,
  LogOut,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import banana from "../assets/best-product-3.jpg";
import orange from "../assets/best-product-1.jpg";
import grapes from "../assets/best-product-5.jpg";
import mango from "../assets/mango.webp";
import pineapple from "../assets/pineApple.jpg";
import strawberries from "../assets/feature-2.jpg";
import SidePannel from "../components/SidePannel";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {
  const sidebarItems = [
    { icon: Package, label: "View orders", href: "/orders", active: true ,count:3},
    { icon: User, label: "Personal details", href: "/profile" },
    { icon: Lock, label: "Change password", href: "/changePassword" },
    { icon: CreditCard, label: "Payment methods", href: "/payment" },
    { icon: MapPin, label: "Manage addresses", href: "/address" },
    { icon: LogOut, label: "Log out", href: "/logOut" },
  ];
  const orders = [
    {
      id: 1,
      status: "dispatched",
      deliveryDate: " - Delivery on Today",
      deliveryTime:
        "Your order is on the way and will be delivered between 3 PM and 5 PM.",
      items: [
        { name: "Fresh Apples", image: "/apple.jpg", quantity: 2 },
        { name: "Bananas", image: banana, quantity: 1 },
      ],
    },
    {
      id: 2,
      status: "expected",
      deliveryDate: " - Expected on Sep 28, 2025",
      items: [
        { name: "Oranges", image: orange, quantity: 3 },
        { name: "Grapes", image: grapes, quantity: 1 },
        { name: "Mangoes", image: mango, quantity: 2 },
      ],
    },
    {
      id: 3,
      status: "delivered",
      deliveryDate: " - Delivered on Sep 20, 2024",
      items: [
        { name: "Pineapple", image: pineapple, quantity: 1 },
        { name: "Strawberries", image: strawberries, quantity: 2 },
      ],
    },
  ];
  const getStatusIcon = (status) => {
    if (status === "dispatched")
      return <Truck className="text-primary" size={20} />;
    if (status === "expected")
      return <Clock className="text-warning" size={20} />;
    if (status === "delivered")
      return <CheckCircle className="text-success" size={20} />;
    return null;
  };
  const getStatusText = (status) => {
    if (status === "dispatched") return "Dispatched";
    if (status === "expected") return "Expected";
    if (status === "delivered") return "Delivered";
    return "";
  };
  const [activeItem, setActiveItem] = useState("View orders");
  return (
    <>
      <Navbar />
      
      <div className="d-flex min-vh-100 mt-5 pt-5" style={{ backgroundColor: "#f8f9fa" }}>
        <SidePannel sidebarItems={sidebarItems} activeItem={activeItem } setActiveItem={setActiveItem}/>

        <div className="flex-grow-1 p-4">
          <div className="container-fluid" style={{ maxWidth: "1024px" }}>
            <div className="mb-4">
              <h1 className="h2 fw-bold text-dark mb-2">Order history</h1>
              <p className="text-muted">{orders.length} orders</p>
            </div>

            <div className="d-flex flex-column gap-4">
              {orders.map((order) => {
                let borderColor = "#dee2e6";
                if (order.status === "dispatched") borderColor = "#0d6efd";
                if (order.status === "expected") borderColor = "#fd7e14";
                if (order.status === "delivered") borderColor = "#198754";

                return (
                 <OrderCard key={order.id} order={order} borderColor={borderColor} getStatusIcon={getStatusIcon} getStatusText={getStatusText} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6 col-md-6">
            <h2 className="text-success">Need Help?</h2>
            <p className="text-dark">
              If you have any questions regarding your orders, feel free to
              contact our support team.
            </p>
          </div>
          <div className="col-lg-6 col-md-6 text-end">
            <Link to="/contact" className="btn btn-success btn-md">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
