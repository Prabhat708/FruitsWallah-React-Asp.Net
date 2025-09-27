import React, { useState } from "react";
import {
  SetNewPassword,
  validateForForgetPassword,
  VerifyOtp,
} from "../services/Verification";
import { useNavigate } from "react-router-dom";

const ForgetPassword = ({ setShowPopup, setRes, setForgetPassword }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [data, setData] = useState({
    password: "",
    CPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [bOtp, setBOtp] = useState("");
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleVerifyOtp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (VerifyOtp(bOtp, otp)) {
        setLoading(false);
        setIsOtpVerified(true);
        setRes({ status: true, message: "OTP Verified" });
      }
    } catch (e) {
      setRes({ status: false, message: "OTP Verification Failed" });
    } finally {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (data.password != data.CPassword) {
      setLoading(false);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      setRes({ status: false, message: "Password Not Matched" });
      return;
    }
    setRes(await SetNewPassword(data, email, setShowPopup));
    setLoading(false);
    setForgetPassword(false);
  };
  return (
    <>
      <h2 className="text-center mb-4 mt-5">Forget Password</h2>
      {!isOtpSent ? (
        <>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setRes(
                await validateForForgetPassword(
                  email,
                  setLoading,
                  setBOtp,
                  setIsOtpSent,
                  setShowPopup
                )
              );
            }}
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </>
      ) : !isOtpVerified ? (
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
      ) : (
        <>
          <form
            onSubmit={(e) => {
              handlePasswordReset(e);
            }}
          >
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter New Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              minLength={6}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Password"
              name="CPassword"
              value={data.CPassword}
              onChange={handleChange}
              minLength={6}
              required
            />
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Submit"}
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default ForgetPassword;
