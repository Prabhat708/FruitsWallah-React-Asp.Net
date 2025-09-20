import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import contactImg from "../assets/Contact-us-pana.svg";
import { SendMsg } from "../services/contactController";
import AlertMessage from "../components/AlertMessage";

const ContactPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [res, setRes] = useState({});
  const [contactData, setContactData] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    OrderNumber: "",
    Subject: "",
    Desc: "",
  });
  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.Name || !contactData.Email || !contactData.PhoneNumber || !contactData.OrderNumber || !contactData.Subject || !contactData.Desc) {
      alert("Please fill all fields");
      return;
    }
   
    setRes(await SendMsg(contactData,setShowPopup))
    setContactData({
      Name: "",
      Email: "",
      PhoneNumber: "",
      OrderNumber: 0,
      Subject: "",
      Desc: ""
    });
  };
  return (
    <>
      <Navbar />
      {showPopup && <AlertMessage status={res.status} message={res.message}/>}
      <div className="container mb-4 mt-5 pt-5">
        <h2 className="text-center mb-4">Get in Touch</h2>
        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>
        <div className="row">
          <div className="col-md-9 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" method="post">
              <div className="row my-2">
                <div className="col-md-6">
                  <div className="md-form mb-0 ">
                    <label htmlFor="name" className="">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="Name"
                      className="form-control"
                      value={contactData.Name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <label htmlFor="email" className="">
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="Email"
                      value={contactData.Email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Your Email id"
                    />
                  </div>
                </div>
              </div>

              <div className="row my-2">
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    
                    <label htmlFor="phone" className="">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="PhoneNumber"
                      maxLength="10"
                      minLength="10"
                      value={contactData.PhoneNumber}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Your Registered Number"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <label htmlFor="OrderNo" className="">
                      Your Order Number
                    </label>
                    <input
                      type="number"
                      id="OrderNo"
                      name="OrderNumber"
                      className="form-control"
                      placeholder="Enter Your order Number"
                      value={contactData.OrderNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-12">
                  <div className="md-form mb-0">
                    <label htmlFor="subject" className="">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="Subject"
                      placeholder="Enter Your Subject"
                      value={contactData.Subject}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-12">
                  <div className="md-form">
                    <label htmlFor="desc">Your message</label>
                    <textarea
                      type="text"
                      id="desc"
                      name="Desc"
                      rows="2"
                      className="form-control md-textarea"
                      placeholder="Discribe Your Problem"
                      value={contactData.Desc}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>

            <div className="text-center text-md-left my-3">
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>

          <div className="col-md-3 text-center">
            <img src={contactImg} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
