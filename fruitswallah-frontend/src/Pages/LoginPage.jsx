import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LoginPage = () => {
  const[showButton, setShowButton] = useState(false);
  const handleShowPassword = () => {
    setShowButton(!showButton);

  }
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="text-center mb-4 mt-5">
              Welcome Back to{" "}
              <strong className="text-success">FruitsWallah.</strong>
            </h1>

            <h2 className="text-center mb-4 mt-2">
              Please! Login to your account.
            </h2>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={showButton ? "text" : "password"}
                  className="form-control pe-5" 
                  id="password"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-link text-success position-absolute top-50 end-0 translate-middle-y me-2 mt-3 text-decoration-none "
                  onClick={handleShowPassword}
                >
                  Show
                </button>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Login
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Don't have an account? <a href="/signup">Register here</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LoginPage
