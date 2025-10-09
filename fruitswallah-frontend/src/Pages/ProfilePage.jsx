import React, { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { sidebarItems } from "../data/Sidebar";
import SidePannel from "../components/SidePannel";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getAddress } from "../services/ManageAddress";
import { getUserDeatails } from "../services/HandleLoginLogout";
import useAuthStore from "../Stores/AuthStore";
import { handleDeleteAccount, handleInActiveAccount } from "../services/Singup";
import AlertMessage from "../components/AlertMessage";
import { BsFillLightningChargeFill } from "react-icons/bs";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [address, setAddresses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeactivateConfirmModal, setShowDeactivateConfirmModal] = useState(false);
  const [res, setRes] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    useAuthStore.getState().initializeAuth();
    getUserDeatails(setUser);
    getAddress(setAddresses);
  }, []);

  const [activeItem, setActiveItem] = useState("Personal details");
  const add = address.filter((a) => a.isPrimary == true);
  const handleDelete = async () => {
    const response = await handleDeleteAccount(navigate);
    setRes(response);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    
  };
  const handleConfirm = async () => {
    handleDelete();
      setShowConfirmModal(false);
  };
  const handleDeactivateConfirm = async () => {
    handleInActiveAccount(navigate);
    setShowDeactivateConfirmModal(false);
  }
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
            {showDeactivateConfirmModal && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-danger shadow">
                    <div className="modal-header bg-danger text-white">
                      <h5 className="modal-title">
                        Confirmation for Deactivate Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => setShowConfirmModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p className="fw-semibold">
                        Are you sure you want to
                        <span className="text-danger"> Deactivate</span> Your
                        Account?
                      </p>
                      <div
                        className="alert alert-danger d-flex align-items-start mt-3"
                        role="alert"
                      >
                        <div>
                          <BsFillLightningChargeFill className="me-2" />
                          <strong>Note: </strong>
                          <br />
                          If you deactivate your account, your account details
                          will be kept safe and you can reactivate your account
                          anytime by logging in again. Your data will not be
                          deleted unless you choose to permanently delete your
                          account.
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowDeactivateConfirmModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeactivateConfirm}
                      >
                        Yes, Proceed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showConfirmModal && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-danger shadow">
                    <div className="modal-header bg-danger text-white">
                      <h5 className="modal-title">
                        Confirmation for Delete Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => setShowConfirmModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p className="fw-semibold">
                        Are you sure you want to
                        <span className="text-danger"> Delete</span> Your
                        Account?
                      </p>
                      <div
                        className="alert alert-danger d-flex align-items-start mt-3"
                        role="alert"
                      >
                        <div>
                          <BsFillLightningChargeFill className="me-2" />
                          <strong>Note: </strong>
                          <br />
                          If you delete the Account, all your personal data,
                          order history, and saved addresses will be permanently
                          removed from our system. This action cannot be undone.
                          Please ensure you have downloaded any important
                          information before proceeding. You will lose access to
                          all FruitsWallah services associated with this
                          account.
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleConfirm}
                      >
                        Yes, Proceed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              {showPopup && (
                <AlertMessage status={res.status} message={res.message} />
              )}
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
                <button
                  className="text-primary mb-3 border-0 bg-transparent"
                  onClick={() => {
                    setShowDeactivateConfirmModal(true);
                  }}
                >
                  Deactivate account
                </button>
                <br />
                <button
                  className="text-danger border-0 bg-transparent"
                  onClick={() => {
                    setShowConfirmModal(true);
                  }}
                >
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
