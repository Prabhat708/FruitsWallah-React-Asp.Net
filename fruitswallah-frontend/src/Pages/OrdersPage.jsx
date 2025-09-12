import React, { useEffect, useState } from "react";
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
import SidePannel from "../components/SidePannel";
import OrderCard from "../components/OrderCard";
import { GetOrders } from "../services/OrdersController";
import { RiEBike2Fill } from "react-icons/ri";

const OrdersPage = () => {
 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    GetOrders(setOrders)
  }, []);
  const sidebarItems = [
    { icon: Package, label: "View orders", href: "/orders", active: true ,count:orders.length},
    { icon: User, label: "Personal details", href: "/profile" },
    { icon: Lock, label: "Change password", href: "/changePassword" },
    { icon: CreditCard, label: "Payment methods", href: "/payment" },
    { icon: MapPin, label: "Manage addresses", href: "/address" },
    { icon: LogOut, label: "Log out", href: "/logOut" },
  ];
  const getStatusIcon = (orderStatus ) => {
    if (orderStatus.at(-1).toLowerCase() === "dispatched")
      return <Truck className="text-primary" size={20} />;
    if (orderStatus.at(-1).toLowerCase() === "expected")
      return <Clock className="text-warning" size={20} />;
    if (orderStatus.at(-1).toLowerCase() === "delivered")
      return <CheckCircle className="text-success" size={20} />;
    if(orderStatus.at(-1).toLowerCase()=== "out for delivery")
      return <RiEBike2Fill className="text-success" size={20} />;
    return <Truck className="text-primary" size={20} />;
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
                if (order.orderStatus.at(-1).toLowerCase() === "dispatched")
                  borderColor = "#0d6efd";
                if (order.orderStatus.at(-1).toLowerCase() === "out for delivery")
                  borderColor = "#fd7e14";
                if (order.orderStatus.at(-1).toLowerCase() === "delivered")
                  borderColor = "#198754";
                

                return (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    borderColor={borderColor}
                    getStatusIcon={getStatusIcon}
                  />
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
