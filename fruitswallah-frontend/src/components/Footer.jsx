import React from "react";
import { FaFacebook, FaRegArrowAltCircleUp, FaRegCopyright, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaLinkedin, FaT, FaY } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import payment from "../assets/payment.png";
const Footer = () => {
  const isAdmin = localStorage.getItem('isAdmin');
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
                <Link to="">
                  <h1 className="text-success mb-0">FruitsWallah</h1>
                  <p className="text-secondary mb-0">Fresh products</p>
                </Link>
              </div>
              <div className="col-lg-6">
                <div className="position-relative mx-auto">
                  <input
                    className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                    type="number"
                    placeholder="Your Email"
                    id="email"
                    name="email"
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
                  <Link
                    to=""
                    className="btn btn-outline-secondary  btn-md-square rounded-circle p-2 me-2"
                  >
                    <FaTwitter
                      size={30}
                      className="d-flex justify-content-center align-items-center "
                    />
                  </Link>
                  <Link
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle p-2"
                    to=""
                  >
                    <FaFacebook size={30} />
                  </Link>
                  <Link
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle p-2"
                    to=""
                  >
                    <FaYoutube size={30} />
                  </Link>
                  <Link
                    className="btn btn-outline-secondary btn-md-square rounded-circle p-2"
                    to=""
                  >
                    <FaLinkedin size={30} />
                  </Link>
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
                <Link className="btn-link" to="/aboutUs">
                  About Us
                </Link>
                <Link className="btn-link" to="/contact/">
                  Contact Us
                </Link>
                <Link className="btn-link" to="/policy">
                  Privacy Policy
                </Link>
                <Link className="btn-link" to="/t&c">
                  Terms & Condition
                </Link>
                <Link className="btn-link" to="/returnPolicy">
                  Return Policy
                </Link>
                <Link className="btn-link" to="/faqs">
                  FAQs & Help
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Account</h4>
                <Link className="btn-link" to="/profile">
                  My Account
                </Link>
                <Link className="btn-link" to="/products">
                  Products
                </Link>
                <Link className="btn-link" to="/cart">
                  Shopping Cart
                </Link>
                <Link className="btn-link" to="/orders">
                  Order History
                </Link>
                {isAdmin === "true" && (
                  <Link className="btn-link" to="/FruitsWAllahAdmin">
                    Admin Pannel
                  </Link>
                )}
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
                <Link to="/">
                  <FaRegCopyright className="text-light me-2"></FaRegCopyright>
                  <strong className="text-success"> FruitsWallah.in</strong>
                </Link>
                , All right reserved 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link
        to=""
        id="back-to-top"
        className="btn btn-success border-3 border-success rounded-circle back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaRegArrowAltCircleUp className="fa fa-arrow-up"></FaRegArrowAltCircleUp>
      </Link>
    </>
  );
};

export default Footer;
