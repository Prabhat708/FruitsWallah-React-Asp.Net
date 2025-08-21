import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
      <>
          <Navbar />
      <div className="container mb-4 pt-5 mt-5">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact us
        </h2>
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
                  <div className="md-form mb-0">
                    <label htmlFor="name" className="">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
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
                      max="10"
                      pattern="/^-?\d+\.?\d*$/"
                      onKeyPress="if( this.value.length == 10 ) return false;"
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
                      type="text"
                      id="OrderNo"
                      name="OrderNo"
                      className="form-control"
                      placeholder="Enter Your order Number"
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
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>

            <div className="text-center text-md-left my-3">
              <button
                type="submit"
                className="btn btn-primary"
                onclick="document.getElementById('contact-form').submit();"
              >
                Send
              </button>
            </div>
          </div>

          <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
              <li>
                <i className="fas fa-map-marker-alt fa-2x"></i>
                <p>fruitsWallah office Address </p>
              </li>

              <li>
                <i className="fas fa-phone mt-4 fa-2x"></i>
                <p>+91 6389285501</p>
              </li>

              <li>
                <i className="fas fa-envelope mt-4 fa-2x"></i>
                <p>contact@fruitsWallah.in</p>
              </li>
            </ul>
          </div>
        </div>
          </div>
          <Footer />
    </>
  );
};

export default ContactPage;
