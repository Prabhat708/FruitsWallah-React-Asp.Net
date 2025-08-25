import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from 'react-router-dom';

const SignUpPage = () => {
  const [data, setData] = useState({
    Username: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSignUp = (e) => {
    const { Username, email, mobile, password, cpassword } = data;
    if (!Username || !email || !mobile || !password || !cpassword) {
      alert("Please fill all fields");
      return;
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    } else if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    } else if (password === "password" && email === "Prabhat@gmail.com") {
      alert("username already exists");
      return;
    } else {
      alert("Account Created Successfully");
      setData({
        Username: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
      window.location.href = "/";
      return;
    }
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
                  name="email"
                  className="form-control"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobile"
                  className="form-control"
                  id="mobile"
                  value={data.mobile}
                  onChange={handleChange}
                  placeholder="Enter your Mobile Number"
                  maxLength={"10"}
                  minLength={10}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={showPasswordBtn ? "text" : "password"}
                  name="password"
                  className="form-control pe-5"
                  id="password"
                  value={data.password}
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

              <button type="submit" onClick={handleSignUp} className="btn btn-success w-100">
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
