import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BsThreeDotsVertical } from "react-icons/bs";
import SidePannel from "../components/SidePannel";
import {
  addAddress,
  getAddress,
  handleDeleteAddress,
  makePrimary,
} from "../services/ManageAddress";
import { sidebarItems } from "../data/Sidebar";
import AlertMessage from "../components/AlertMessage";
import { useNavigate } from "react-router-dom";

const ManageAddressPage = () => {
  const navigate = useNavigate();
  const [res,setRes]=useState({})
  const [showPopup, setShowPopup] = useState(false);
  const UserId = localStorage.getItem("UserId");
  const [data, setData] = useState({
    UserId: UserId,
    UserName: "",
    HouseNo: "",
    Locality: "",
    Address: "",
    City: "",
    AddressType: "",
    PhoneNumber: "",
    PostalCode: "",
    LandMark: "",
    State: "",
    IsPrimary: true,
  });
useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "false") {
      navigate("/login");
    }
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  const handleMenuToggle = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };
  const [hideForm, sethideForm] = useState(true);
  const handleAddressForm = () => {
    sethideForm(!hideForm);
  };
  
  const [activeItem, setActiveItem] = useState("Manage addresses");

  const [Addresses, setAddresses] = useState(null);

  useEffect(() => {
    getAddress(setAddresses);
  }, []);

  return (
    <>
      <Navbar />
      {showPopup && <AlertMessage status={res.status} message={res.message}/>}
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
              <h1 className="h2 fw-bold text-dark mb-2">Manage Address</h1>
            </div>
            <div className="profile">
              <button
                onClick={handleAddressForm}
                className={`border-0 bg-transparent text-primary ms-5 mb-4 ${
                  !hideForm ? "d-none" : null
                }`}
              >
                {" "}
                + Add New Address
              </button>
              <form
                className={`${hideForm ? "d-none" : null} mb-5`}
                onSubmit={async (e) => {
                  e.preventDefault();
                 setRes(await addAddress(data, setAddresses, setShowPopup));
                  sethideForm(!hideForm);
                }}
              >
                <div className="nameSection">
                  <div className="fw-bolder text-primary name">
                    Add New Address
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-3 ">
                    <label className="fw-medium ms-5" htmlFor="UserName">
                      Name
                    </label>
                    <input
                      type="text"
                      name="UserName"
                      className="ms-5 ps-2"
                      value={data.UserName}
                      onChange={handleChange}
                      required
                      id="UserName"
                      placeholder="Enter Your Name"
                      style={{ height: "50px" }}
                    />
                  </div>
                  <div className="col-3 ">
                    <label className="fw-medium ms-5" htmlFor="HouseNo">
                      House No.
                    </label>
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      value={data.HouseNo}
                      onChange={handleChange}
                      required
                      id="HouseNo"
                      name="HouseNo"
                      placeholder="Enter House No."
                      style={{ height: "50px" }}
                    />
                  </div>
                  <div className="col-3 ">
                    <label className="fw-medium ms-5" htmlFor="mobile">
                      Mobile
                    </label>
                    <input
                      type="number"
                      className="ms-5 ps-2"
                      id="mobile"
                      name="PhoneNumber"
                      required
                      value={data.PhoneNumber}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-3 ">
                    <label className="fw-medium ms-5" htmlFor="locality">
                      Locality
                    </label>
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      id="locality"
                      name="Locality"
                      value={data.Locality}
                      onChange={handleChange}
                      required
                      placeholder="Enter Locality"
                      style={{ height: "50px" }}
                    />
                  </div>
                  <div className="col-3 ">
                    <label className="fw-medium ms-5" htmlFor="LandMark">
                      LandMark
                    </label>
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      id="LandMark"
                      value={data.LandMark}
                      onChange={handleChange}
                      required
                      name="LandMark"
                      placeholder="Enter LandMark"
                      style={{ height: "50px" }}
                    />
                  </div>
                  <div className="col-3 ">
                    <label className="fw-medium ms-5" htmlFor="pincode">
                      Pincode
                    </label>
                    <input
                      type="number"
                      className="ms-5 ps-2"
                      id="pincode"
                      required
                      name="PostalCode"
                      value={data.PostalCode}
                      onChange={handleChange}
                      placeholder="Enter Pincode"
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>

                <div className="row pt-2 ">
                  <div className="col-6 ">
                    <label className="fw-medium ms-5" htmlFor="address">
                      Address
                    </label>
                    <textarea
                      className="ms-5 ps-2"
                      required
                      id="address"
                      name="Address"
                      rows={3}
                      value={data.Address}
                      onChange={handleChange}
                      placeholder="Enter Your complete Address"
                      style={{ height: "50px", width: "415px" }}
                    ></textarea>
                  </div>
                  <div className="col-3 ">
                    <label className="fw-medium ms-5" htmlFor="city">
                      City
                    </label>
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      id="city"
                      name="City"
                      value={data.City}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your City"
                      style={{ height: "50px" }}
                    />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-3">
                    <label className="fw-medium ms-5" htmlFor="State">
                      State
                    </label>
                    <input
                      type="text"
                      className="ms-5 ps-2"
                      id="State"
                      name="State"
                      value={data.State}
                      onChange={handleChange}
                      required
                      placeholder="Enter State"
                      style={{ height: "50px" }}
                    />
                  </div>
                  <div className="col-3 ">
                    <label className="fw-medium ms-5" htmlFor="addressTypehome">
                      Address Type{" "}
                    </label>
                    <div className="ms-5 pt-3">
                      <input
                        type="radio"
                        id="addressTypehome"
                        className="col-3 "
                        value={"HOME"}
                        name="AddressType"
                        onChange={handleChange}
                      />

                      <span>Home</span>

                      <input
                        type="radio"
                        id="addressType"
                        className="col-3 "
                        value={"WORK"}
                        name="AddressType"
                        onChange={handleChange}
                      />
                      <span>Work</span>
                    </div>
                  </div>
                  {/* <div className="col-2">
                    <label className="fw-medium ms-5" htmlFor="IsPrimary">
                      Primary
                    </label>
                    <input
                      type="Checkbox"
                      className="ms-5 ps-2"
                      id="IsPrimary"
                      name="IsPrimary"
                      value={data.IsPrimary}
                      onChange={handleChange}
                      required
                      style={{ height: "50px" }}
                    />
                  </div> */}
                </div>
                <button type="submit" className="btn btn-primary ms-5 mt-2">
                  SAVE
                </button>
                <button
                  onClick={handleAddressForm}
                  type="button"
                  className="btn border-0 bg-transparent text-primary"
                >
                  CANCEL
                </button>
              </form>
              {Addresses?.map((address, index) => {
                return (
                  <div
                    key={index}
                    className="position-relative p-3"
                    style={{ border: "1px solid #cfd6df" }}
                  >
                    <span className="Address-type">{address?.addressType}</span>
                    <span
                      className="btn position-absolute end-0 pe-4 border-0"
                      onClick={() => handleMenuToggle(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        className={`fw-medium text-dark ${
                          !address.isPrimary ? "d-none" : "d-block "
                        }`}
                      >
                        Primary
                      </span>
                      <BsThreeDotsVertical
                        className={`${
                          address.isPrimary ? "d-none" : "d-block "
                        }`}
                      />
                    </span>
                    {menuOpenIndex === index && (
                      <div
                        style={{
                          position: "absolute",
                          top: "45px",
                          right: "0px",
                          background: "#fff",
                          borderRadius: "4px",
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        <button
                          className={`btn text-secondary border-secondary mb-2 ${
                            address.isPrimary ? "d-none" : "d-block "
                          }`}
                          onClick={async () => {
                           setRes(await makePrimary(
                             address,
                             setAddresses,
                             setShowPopup
                           ));
                            setMenuOpenIndex(null);
                          }}
                        >
                          Primary
                        </button>
                        <button
                          className={`btn text-danger border-danger ${address.isPrimary ? "d-none" : "d-block "
                            }`}
                          onClick={async () => {

                          setRes(await handleDeleteAddress(
                              address?.addId,
                              setAddresses,
                              setShowPopup
                            ))
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    <br />
                    <span className="fw-medium">{address?.userName}</span>
                    <span className="fw-medium ms-5">
                      - {address?.phoneNumber}
                    </span>{" "}
                    <br />
                    <span>
                      {address?.houseNo +
                        " " +
                        address?.locality +
                        " " +
                        address?.address +
                        " " +
                        address?.city +
                        " " +
                        address?.state}
                    </span>{" "}
                    <br />
                    <span>{"Landmark : " + address?.landMark}</span> <br />
                    <span className="fw-medium">{address?.postalCode}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageAddressPage;
