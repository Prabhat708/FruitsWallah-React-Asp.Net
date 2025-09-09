import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link, useNavigate} from 'react-router-dom';
import { handleSignUp } from "../services/Singup";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Username: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    cpassword: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
 
  const [showPasswordBtn, setShowPasswordBtn] = useState(false);
  const handleShowPassword = () => {
    setShowPasswordBtn(!showPasswordBtn);
  };
  const [showConfirmPasswordBtn, setShowConfirmPasswordBtn] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPasswordBtn(!showConfirmPasswordBtn);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="text-center mb-4 mt-5">
              Welcome in
              <strong className="text-success"> FruitsWallah </strong> Family.
            </h1>

            <h2 className="text-center mb-4 mt-2">Please! Register.</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="Username"
                  className="form-control"
                  id="Username"
                  value={data.Username}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="Email"
                  className="form-control"
                  id="Email"
                  value={data.Email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="PhoneNumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="PhoneNumber"
                  className="form-control"
                  id="PhoneNumber"
                  value={data.PhoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your Mobile Number"
                  maxLength={"10"}
                  minLength={10}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type={showPasswordBtn ? "text" : "password"}
                  name="Password"
                  className="form-control pe-5"
                  id="Password"
                  value={data.Password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-sm btn-link text-success position-absolute top-50 end-0 translate-middle-y me-2 mt-3 text-decoration-none "
                  onClick={handleShowPassword}
                >
                  Show
                </button>
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="cpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPasswordBtn ? "text" : "password"}
                  className="form-control"
                  name="cpassword"
                  value={data.cpassword}
                  onChange={handleChange}
                  id="cpassword"
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-sm btn-link text-success position-absolute top-50 end-0 translate-middle-y me-2 mt-3 text-decoration-none "
                  onClick={handleShowConfirmPassword}
                >
                  Show
                </button>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignUp(data, navigate, setData);
                }}
                className="btn btn-success w-100"
              >
                Create Account
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUpPage;
