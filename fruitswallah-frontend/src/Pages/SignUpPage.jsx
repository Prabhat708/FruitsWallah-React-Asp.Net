import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignUpPage = () => {
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
              <div class="mb-3">
                <label for="Username" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="Username"
                  class="form-control"
                  id="Username"
                  placeholder="Username" required
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
                  placeholder="Enter your email" required
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
                  placeholder="Enter your Mobile Number" maxLength={10} minLength={10} required
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control pe-5"
                  id="password"
                  placeholder="Enter your password" required
                />
                <button
                  type="button"
                  className="btn btn-sm btn-link text-success position-absolute top-50 end-0 translate-middle-y me-2 mt-3 text-decoration-none "
                  onClick={() => {
                    const input = document.getElementById("password");
                    input.type =
                      input.type === "password" ? "text" : "password";
                  }}
                >
                  Show
                </button>
              </div>
              <div class="mb-3 position-relative">
                <label for="cpassword" class="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm Password" required
                />
                <button
                  type="button"
                  className="btn btn-sm btn-link text-success position-absolute top-50 end-0 translate-middle-y me-2 mt-3 text-decoration-none "
                  onClick={() => {
                    const input = document.getElementById("cpassword");
                    input.type =
                      input.type === "password" ? "text" : "password";
                  }}
                >
                  Show
                </button>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Create Account
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Already have an account? <a href="/login">Login here</a>
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
