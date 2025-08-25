import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Package,
  User,
  Lock,
  CreditCard,
  MapPin,
  Users,
  LogOut,
} from "lucide-react";
import SidePannel from "../components/SidePannel";
import Footer from "../components/Footer";
const ProfilePage = () => {
  const sidebarItems = [
    { icon: Package, label: "View orders", href: "/orders" },
    { icon: User, label: "Personal details", href: "/profile", active: true },
    { icon: Lock, label: "Change password", href: "/changePassword" },
    { icon: CreditCard, label: "Payment methods", href: "/payment" },
    { icon: MapPin, label: "Manage addresses", href: "/address" },
    { icon: LogOut, label: "Log out", href: "/logOut" },
  ];
  const [activeItem, setActiveItem] = useState("Personal details");
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
              <h1 className="h2 fw-bold text-dark mb-2">
                Personal Information
              </h1>
            </div>
            <div className="profile">
              <div className="nameSection">
                <span className="fw-medium name">Profile Name</span>
                <span className="editButton">Edit</span>
              </div>
              <form>
                <div className="row pt-2">
                  <div className="col-3 ">
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      name="firstName"
                      required=""
                      disabled
                      value="Prabhat"
                      style={{ height: "50px" }}
                    />
                  </div>
                  <div className="col-3">
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        className="ps-2"
                        disabled
                        value="Verma"
                        style={{ height: "50px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="fw-medium mt-2 ms-4"> Your Gender </div>
                <div className="row mt-2">
                  <label htmlFor="Male" className="col-3 d-flex ps-5">
                    <input
                      disabled
                      type="radio"
                      name="gender"
                      id="Male"
                      checked
                      className="col-3 ps-5"
                    />
                    <div>
                      <span disabled>
                        Male
                      </span>
                    </div>
                  </label>
                  <label htmlFor="Female" className="col-3 d-flex">
                    <input
                      disabled
                      type="radio"
                      name="gender"
                      id="Female"
                      className="col-3"
                    />
                    <div>
                      <span disabled >
                        Female
                      </span>
                    </div>
                  </label>
                </div>
              </form>
              <div className="nameSection mt-3">
                <span className="fw-medium name">Email</span>
                <span className="editButton">Edit</span>
              </div>
              <form>
                <div className="mt-2">
                  <input
                    type="email"
                    name="lastName"
                    className="ms-5 ps-2"
                    disabled
                    style={{ height: "50px" }}
                    value="Prabhat@gmail.com"
                  />
                </div>
              </form>
              <div className="nameSection mt-3">
                <span className="fw-medium name">Mobile Number</span>
                <span className="editButton">Edit</span>
              </div>
              <form>
                <div className="mt-2">
                  <input
                    type="number"
                    name="lastName"
                    className="ms-5 ps-2"
                    disabled
                    style={{ height: "50px" }}
                    value="7084312912"
                  />
                </div>
              </form>
              <div className="nameSection mt-3">
                <span className="fw-medium name">Primary Address</span>
                <span className="editButton">Edit</span>
              </div>
              <form>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    className="ms-5 ps-2"
                    disabled
                    style={{ height: "50px" }}
                    value="Lucknow"
                  />
                </div>
              </form>
              <div className="nameSection mt-5">
                <span className="fw-medium name">FAQs</span>
                <h6 className="ms-5 mt-3">
                  What happens when I update my email address (or mobile
                  number)?
                </h6>
                <p className="ms-5">
                  Your login email id (or mobile number) changes, likewise.
                  You'll receive all your account related communication on your
                  updated email address (or mobile number).
                </p>
                <h6 className="ms-5 mt-3">
                  When will my FruitsWallah account be updated with the new email
                  address (or mobile number)?
                </h6>
                <p className="ms-5">
                  It happens as soon as you confirm the verification code sent
                  to your email (or mobile) and save the changes.
                </p>
                <h6 className="ms-5 mt-3">
                  What happens to my existing FruitsWallah account when I update my
                  email address (or mobile number)?
                </h6>
                <p className="ms-5">
                  Updating your email address (or mobile number) doesn't
                  invalidate your account. Your account remains fully
                  functional. You'll continue seeing your Order history, saved
                  information and personal details.
                </p>
                <h6 className="ms-5 mt-3">
                  Does my Seller account get affected when I update my email
                  address?
                </h6>
                <p className="ms-5">
                  FruitsWallah has a 'single sign-on' policy. Any changes will
                  reflect in your Seller account also.
                </p>
              </div>
              <div className="mt-5 ms-5">
                <button className="text-primary mb-3 border-0 bg-transparent">
                  Deactivate account
                </button>
                <br />
                <button className="text-danger border-0 bg-transparent">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProfilePage;
