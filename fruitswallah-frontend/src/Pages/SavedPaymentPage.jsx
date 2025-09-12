import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Package, User, Lock, CreditCard, MapPin, LogOut } from "lucide-react";
import SidePannel from "../components/SidePannel";
import { GetPaymentId, PostPaymentId } from "../services/PaymentController";
const UserId = localStorage.getItem("UserId");

const SavedPaymentPage = () => {
  const [paymentId, setPaymentId] = useState('');
  const [data, setData] = useState({
    UserId: UserId,
    UPI:""
  });
  const [isActive,setIsActive]= useState(false)
  useEffect(() => {
    GetPaymentId(setPaymentId);
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleEditButton = async () => {
  setIsActive(!isActive)
}
  const sidebarItems = [
    { icon: Package, label: "View orders", href: "/orders" },
    {
      icon: User,
      label: "Personal details",
      href: "/profile",
    },
    {
      icon: Lock,
      label: "Change password",
      href: "/changePassword",
    },
    {
      icon: CreditCard,
      label: "Payment methods",
      href: "/payment",
      active: true,
    },
    { icon: MapPin, label: "Manage addresses", href: "/address" },
    { icon: LogOut, label: "Log out", href: "/logOut" },
  ];
  const [activeItem, setActiveItem] = useState("Payment methods");
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
              <h1 className="h2 fw-bold text-dark mb-2">Payment Methods</h1>
            </div>
            <div className="profile">
              <div className="nameSection">
                <span className="fw-medium name">Saved UPI</span>
                <span className="editButton" onClick={handleEditButton}>
                  Edit
                </span>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                PostPaymentId(data, setPaymentId);
                data 
              }}>
                <input
                  type="text"
                  className="ms-5 mt-2 p-3"
                  style={{ width: "40%" }}
                  name="UPI"
                  value={!isActive ? paymentId : data.UPI}
                  onChange={handleChange}
                  disabled={!isActive}
                />
                <button type="submit" className="btn btn-primary ms-2" disabled={!isActive}>Submit</button>
              </form>
              <div className="nameSection mt-5">
                <span className="fw-medium name">FAQs</span>
                <h6 className="ms-5 mt-3">
                  Why is my UPI being saved on fruitsWallah?
                </h6>
                <p className="ms-5">
                  It's quicker. You can save the hassle of typing in the
                  complete UPI information every time you shop at fruitsWallah
                  by saving your UPI details. You can make your payment by
                  selecting the saved UPI ID of your choice at checkout. While
                  this is obviously faster, it is also very secure.
                </p>
                <h6 className="ms-5 mt-3">
                  Is it safe to save my UPI on fruitsWallah?
                </h6>
                <p className="ms-5">
                  Absolutely. Your UPI ID information is 100 percent safe with
                  us. UPI ID details are non PCI compliant and are non
                  confidential data.
                </p>
                <h6 className="ms-5 mt-3">
                  What all UPI information does fruitsWallah store?
                </h6>
                <p className="ms-5">
                  FruitsWallah only stores UPI ID and payment provider details.
                  We do not store UPI PIN/MPIN.
                </p>
                <h6 className="ms-5 mt-3">Can I delete my saved UPI?</h6>
                <p className="ms-5">
                  Yes, you can delete your UPI ID at any given time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SavedPaymentPage;
