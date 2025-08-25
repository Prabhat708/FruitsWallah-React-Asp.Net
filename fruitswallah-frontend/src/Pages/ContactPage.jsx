import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import contactImg from "../assets/Contact-us-pana.svg";
import {Link} from 'react-router-dom';

const ContactPage = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNo: "",
    subject: "",
    desc: ""
  });
  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.orderNo || !contactData.subject || !contactData.desc) {
      alert("Please fill all fields");
      return;
    }
    alert(`Message sent successfully.\n Our team will contact you soon.`);
    setContactData({
      name: "",
      email: "",
      phone: "",
      orderNo: "",
      subject: "",
      desc: ""
    });
  };
  return (
    <>
      <Navbar />
      <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Contact Us</h1>
        <ol class="breadcrumb justify-content-center mb-0">
          <li class="breadcrumb-item">
            <Link to="/"className="text-white">Home</Link>
          </li>
          <li class="breadcrumb-item active text-primary">Contact Us</li>
        </ol>
      </div>
      <div className="container mb-4">
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
                      name="name"
                      className="form-control"
                      value={contactData.name}
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
                      name="email"
                      value={contactData.email}
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
                    <label htmlFor="name" className="">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      maxLength="10"
                      minLength="10"
                      value={contactData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Your Registered Number"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <label htmlFor="email" className="">
                      Your Order Number
                    </label>
                    <input
                      type="number"
                      id="OrderNo"
                      name="orderNo"
                      className="form-control"
                      placeholder="Enter Your order Number"
                      value={contactData.orderNo}
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
                      name="subject"
                      placeholder="Enter Your Subject"
                      value={contactData.subject}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-md-12">
                  <div className="md-form">
                    <label htmlFor="message">Your message</label>
                    <textarea
                      type="text"
                      id="desc"
                      name="desc"
                      rows="2"
                      className="form-control md-textarea"
                      placeholder="Discribe Your Problem"
                      value={contactData.desc}
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
            <img src={contactImg} alt="" srcset="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
