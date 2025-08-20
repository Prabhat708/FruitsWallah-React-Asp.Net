import React from "react";
import { FaRegArrowAltCircleUp, FaRegCopyright } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import payment from "../assets/payment.png";
const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-3">
                <a href="">
                  <h1 className="text-success mb-0">FruitsWallah</h1>
                  <p className="text-secondary mb-0">Fresh products</p>
                </a>
              </div>
              <div className="col-lg-6">
                <div className="position-relative mx-auto">
                  <input
                    className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                    type="number"
                    placeholder="Your Email"
                  />
                  <button
                    type="submit"
                    className="btn btn-success border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white top-0 end-0"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3">
                  <a
                    className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                    href=""
                  >
                    <FaLinkedin size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Why People Like us!</h4>
                <p className="mb-4">
                  typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the like Aldus PageMaker
                  including of Lorem Ipsum.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Shop Info</h4>
                <a className="btn-link" href="">
                  About Us
                </a>
                <a className="btn-link" href="/fruitwallah/contact/">
                  Contact Us
                </a>
                <a className="btn-link" href="">
                  Privacy Policy
                </a>
                <a className="btn-link" href="">
                  Terms & Condition
                </a>
                <a className="btn-link" href="">
                  Return Policy
                </a>
                <a className="btn-link" href="">
                  FAQs & Help
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Account</h4>
                <a className="btn-link" href="">
                  My Account
                </a>
                <a className="btn-link" href="/fruitwallah/shop-detail/">
                  Shop details
                </a>
                <a className="btn-link" href="/fruitwallah/cart/">
                  Shopping Cart
                </a>
                <a className="btn-link" href="">
                  Order History
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Contact</h4>
                <p>Address: Lucknow</p>
                <p>Email: Example@gmail.com</p>
                <p>Phone: +0123 4567 8910</p>
                <p>Payment Accepted</p>
                <img src={payment} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light">
                <a href="/fruitwallah/">
                  <FaRegCopyright className="text-light me-2"></FaRegCopyright>
                 <strong className="text-success"> FruitsWallah.in</strong>
                </a>
                , All right reserved 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      <a
        href=""
        className="btn btn-success border-3 border-success rounded-circle back-to-top"
      >
        <FaRegArrowAltCircleUp className="fa fa-arrow-up"></FaRegArrowAltCircleUp>
      </a>
    </>
  );
};

export default Footer;
