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
const ProfilePage = () => {
  const sidebarItems = [
    { icon: Package, label: "View orders", href: "/orders" },
    { icon: User, label: "Personal details", href: "/profile", active: true },
    { icon: Lock, label: "Change password", href: "/changePassword" },
    { icon: CreditCard, label: "Payment methods", href: "payment" },
    { icon: MapPin, label: "Manage addresses", href: "/address" },
    { icon: Users, label: "Social accounts", href: "/socialMedia" },
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
                      className="ms-5"
                      name="firstName"
                      required=""
                      disabled
                      autocomplete="name"
                      tabindex="1"
                      value="Prabhat"
                    />
                  </div>
                  <div className="col-3">
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        disabled
                        autocomplete="name"
                        tabindex="2"
                        value="Verma"
                      />
                    </div>
                  </div>
                </div>
                <div className="fw-medium mt-2 ms-4"> Your Gender </div>
                <div className="row mt-2">
                  <label for="Male" className="col-3 d-flex ps-5">
                    <input
                      disabled
                      type="radio"
                      name="gender"
                      readonly=""
                      id="Male"
                      checked
                      className="col-3 ps-5"
                    />
                    <div>
                      <span disabled="" tabindex="3">
                        Male
                      </span>
                    </div>
                  </label>
                  <label for="Female" className="col-3 d-flex">
                    <input
                      disabled
                      type="radio"
                      name="gender"
                      readonly=""
                      id="Female"
                      className="col-3"
                    />
                    <div>
                      <span disabled tabindex="4">
                        Female
                      </span>
                    </div>
                  </label>
                </div>
              </form>
              <div className="nameSection mt-5">
                <span className="fw-medium name">Email</span>
                <span className="editButton">Edit</span>
              </div>
              <form>
                <input
                  type="email"
                  name="lastName"
                  disabled
                  autocomplete="name"
                
                  value="Prabhat@gmail.com"
                />
              </form>
              <div className="nameSection mt-5">
                <span className="fw-medium name">Mobile Number</span>
                <span className="editButton">Edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
