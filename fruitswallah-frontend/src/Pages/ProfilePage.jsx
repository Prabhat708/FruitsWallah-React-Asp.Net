import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { sidebarItems } from "../data/Sidebar";
import SidePannel from "../components/SidePannel";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAddress } from "../services/ManageAddress";


const ProfilePage = () => {
  const [user, setUser] = useState({})
  const [address,setAddresses]=useState([])
  const navigate = useNavigate();
  useEffect(() => {
        const token= localStorage.getItem("Token");
        if (token==null) {
          navigate("/login");
        }
      }, []);
  useEffect(() => {
    getUser()
    getAddress(setAddresses)
  }, []);
  const getUser = async () => {
    const UserId = localStorage.getItem("UserId")
    const res = await axios.get(`https://localhost:7293/api/Users/${UserId}`);
    setUser(res.data)
  }
  const [activeItem, setActiveItem] = useState("Personal details");
 const add = address.filter((a) => a.isPrimary == true);

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
                      value={user?.name || ""}
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>

                <div className="nameSection mt-3">
                  <span className="fw-medium name">Email</span>
                </div>

                <div className="mt-2">
                  <input
                    type="email"
                    name="lastName"
                    className="ms-5 ps-2"
                    disabled
                    style={{ height: "50px" }}
                    value={user?.email || ""}
                  />
                </div>

                <div className="nameSection mt-3">
                  <span className="fw-medium name">Mobile Number</span>
                </div>

                <div className="mt-2">
                  <input
                    type="number"
                    name="lastName"
                    className="ms-5 ps-2"
                    disabled
                    style={{ height: "50px" }}
                    value={user?.phoneNumber || ""}
                  />
                </div>
              </form>
              <div className="nameSection mt-3">
                <span className="fw-medium name">Primary Address</span>
                <span
                  className="editButton"
                  onClick={() => navigate("/address")}
                >
                  Edit
                </span>
              </div>
              <form>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    className="ms-5 ps-2"
                    disabled
                    style={{ height: "50px" }}
                    value={add[0]?.city || ""}
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
                  When will my FruitsWallah account be updated with the new
                  email address (or mobile number)?
                </h6>
                <p className="ms-5">
                  It happens as soon as you confirm the verification code sent
                  to your email (or mobile) and save the changes.
                </p>
                <h6 className="ms-5 mt-3">
                  What happens to my existing FruitsWallah account when I update
                  my email address (or mobile number)?
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
      <Footer />
    </>
  );
};

export default ProfilePage;
