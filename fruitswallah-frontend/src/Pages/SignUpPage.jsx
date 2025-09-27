import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { handleSignUp } from "../services/Singup";
import { sendOtp, VerifyOtp } from "../services/Verification";
import AlertMessage from "../components/AlertMessage";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [res, setRes] = useState({});
  const [data, setData] = useState({
    Username: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    cpassword: "",
  });

  const [otp, setOtp] = useState("");
  const [bOtp, setBOtp] = useState("");
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

  const handleSignupAndOtp = async (data) => {
    const { Username, Email, PhoneNumber, Password, cpassword } = data;
    if (!Username || !Email || !PhoneNumber || !Password || !cpassword) {
      setRes({ status: false, message: "All fields Required" });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return;
    } else if (Password.length < 6) {
      setRes({
        status: false,
        message: "Password must be at least 6 characters long",
      });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return;
    } else if (Password !== cpassword) {
      setRes({ status: false, message: "Password Not matched" });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return;
    }
    else {
      setLoading(true);
      setRes(await sendOtp(Email, setBOtp, setIsOtpSent, setLoading));
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (VerifyOtp(bOtp, otp)) {
        const res1 = (await handleSignUp(data, navigate, setData));
        if (res1.status) {
          navigate("/home", {
            state: {
              message: "Your Account Created Successfully...",
              Username: res1.Username,
              comingFrom: "signup",
            },
          });
        }
      } else {
        setRes({ status: false, message: "OTP Not verified" });
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error)
      setRes({ status: false, message: "OTP verification failed" });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {showPopup && <AlertMessage status={res.status} message={res.message} />}
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSignupAndOtp(data);
                  }}
                >
                  <label htmlFor="Username" className="fw-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="Username"
                    name="Username"
                    className="form-control mb-3"
                    placeholder="Username"
                    value={data.Username}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="Email" className="fw-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={data.Email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="PhoneNumber" className="fw-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    className="form-control mb-3"
                    placeholder="Phone Number"
                    value={data.PhoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <div className="position-relative">
                    <label htmlFor="Password" className="fw-medium">
                      Password
                    </label>
                    <input
                      type={showPasswordBtn ? "text" : "password"}
                      name="Password"
                      id="Password"
                      className="form-control mb-3"
                      placeholder="Password"
                      value={data.Password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-success position-absolute top-50 end-0 translate-middle-y me-2 mt-2 text-decoration-none "
                      onClick={handleShowPassword}
                    >
                      {!showPasswordBtn ? "Show" : "Hide"}
                    </button>
                  </div>
                  <div className=" position-relative">
                    <label htmlFor="ConfirmPassword" className="fw-medium">
                      Confirm Password
                    </label>
                    <input
                      type={showConfirmPasswordBtn ? "text" : "password"}
                      name="cpassword"
                      id="ConfirmPassword"
                      className="form-control mb-3"
                      placeholder="Confirm Password"
                      value={data.cpassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-success position-absolute top-50 end-0 translate-middle-y me-2 mt-2 text-decoration-none "
                      onClick={handleShowConfirmPassword}
                    >
                      {!showConfirmPasswordBtn ? "Show" : "Hide"}
                    </button>
                  </div>
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
