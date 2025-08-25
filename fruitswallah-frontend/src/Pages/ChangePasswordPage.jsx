import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Package,
  User,
  Lock,
  CreditCard,
  MapPin,
  LogOut,
} from "lucide-react";
import SidePannel from "../components/SidePannel";
import Footer from "../components/Footer";

const ChangePasswordPage = () => {
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
      active: true,
    },
    { icon: CreditCard, label: "Payment methods", href: "/payment" },
    { icon: MapPin, label: "Manage addresses", href: "/address" },
    { icon: LogOut, label: "Log out", href: "/logOut" },
  ];
  const [activeItem, setActiveItem] = useState("Change password");
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
              <h1 className="h2 fw-bold text-dark mb-2">Change Password</h1>
            </div>
            <div className="profile">
              <form>
                <div className="nameSection">
                  <span className="fw-medium name">Current Password</span>
                </div>
                <div className="row pt-2">
                  <div className="col-3 ">
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      name="currentPassword"
                      required
                      placeholder="Enter Current password"
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>
                <div className="nameSection mt-3">
                  <span className="fw-medium name">New Password</span>
                </div>
                <div className="row pt-2">
                  <div className="col-3 ">
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      name="currentPassword"
                      required
                      placeholder="Enter New password"
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>
                <div className="nameSection mt-3">
                  <span className="fw-medium name">Confirm Password</span>
                </div>
                <div className="row pt-2">
                  <div className="col-3 ">
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      name="currentPassword"
                      required
                      placeholder="Confirm password"
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>

                <button className="ms-5 mt-4 border-0 text-white bg-primary rounded ">
                  Change Password
                </button>
              </form>

              <div className="nameSection mt-5">
                <span className="fw-medium name">Rules</span>
              </div>
              <div className="ms-5">
                <h6>To create a strong password follow these rules:</h6>
                <ul>
                  <li>
                    Aim for a password that is at least 12-16 characters long.
                    The longer the password, the harder it is for attackers to
                    guess.
                  </li>
                  <li>
                    A strong password must include a mix of character types:
                    Uppercase letters (A-Z), Lowercase letters (a-z), Numbers
                    (0-9), Special characters (e.g., !, @, #, $, %).
                  </li>
                  <li>
                    Use a different strong password for each of your online
                    accounts. If one account is compromised, the others remain
                    secure.
                  </li>
                  <li>
                    Do not use any personally identifiable information that
                    could be easily found or guessed: Your name or initials,
                    Your children's or pets' names, Important dates (birthdays,
                    anniversaries), Your phone number or address.
                  </li>
                  <li>
                    Avoid Common Words and Patterns: Stay away from dictionary
                    words, common phrases, or keyboard patterns like "qwerty" or
                    "asdfgh".
                  </li>
                  <li>
                    Create a memorable sentence and take the first letter of
                    each word, incorporating numbers and symbols to make it
                    stronger.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
          </div>
          <Footer/>
    </>
  );
};

export default ChangePasswordPage;
