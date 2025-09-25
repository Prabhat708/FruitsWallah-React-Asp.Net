import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
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

  const [otp, setOtp] = useState("");
  const[bOtp,setBOtp]= useState("")
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [showPasswordBtn, setShowPasswordBtn] = useState(false);
  const [showConfirmPasswordBtn, setShowConfirmPasswordBtn] = useState(false);

  const handleShowPassword = () => setShowPasswordBtn(!showPasswordBtn);
  const handleShowConfirmPassword = () =>
    setShowConfirmPasswordBtn(!showConfirmPasswordBtn);

  const handleSignupAndOtp = async (e) => {
    e.preventDefault();

    if (data.Password !== data.cpassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const payload= {
        email:data.Email
      }
      const response = await axios.post(
        "https://localhost:7293/api/OTP", // ✅ Your signup endpoint
        payload
      );

      if (response.status === 200) {
        alert("OTP sent to your email!");
        setBOtp(response.data);
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(
        "Signup failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (bOtp==otp) {;
        handleSignUp(data,navigate,setData)
      }
    } catch (error) {
      console.error(
        "OTP verification error:",
        error.response?.data || error.message
      );
      alert(
        "OTP verification failed: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="text-center mb-4 mt-5">
              Welcome to
              <strong className="text-success"> FruitsWallah </strong> Family.
            </h1>

            {!isOtpSent ? (
              <>
                <h2 className="text-center mb-4 mt-2">Please Register</h2>
                <form onSubmit={handleSignupAndOtp}>
                  <input
                    type="text"
                    name="Username"
                    className="form-control mb-3"
                    placeholder="Username"
                    value={data.Username}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="Email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={data.Email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="PhoneNumber"
                    className="form-control mb-3"
                    placeholder="Phone Number"
                    value={data.PhoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type={showPasswordBtn ? "text" : "password"}
                    name="Password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={data.Password}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type={showConfirmPasswordBtn ? "text" : "password"}
                    name="cpassword"
                    className="form-control mb-3"
                    placeholder="Confirm Password"
                    value={data.cpassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Sign Up"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-center mb-4 mt-2">Verify Your Email</h2>
                <form onSubmit={handleVerifyOtp}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              </>
            )}

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
