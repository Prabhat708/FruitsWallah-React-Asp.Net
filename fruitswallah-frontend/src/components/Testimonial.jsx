import React, { useState } from "react";
import user from "../assets/user.png";
import review from "../assets/review.png";
const Testimonial = () => {
  const [data, setData] = useState({
    name: "",
    comment: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, comment } = data;
    if (!name || !comment) {
      alert("Please fill all fields");
      return;
    }
    alert("Review submitted successfully");
    setData({ name: "", comment: "" });
  }


    return(
    <>
      <div className="container-fluid testimonial">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h1 className="text-success mb-2 display-7">Our Testimonial</h1>
            <h2 className="display-7 mb-5 text-dark">Our Client Saying!</h2>
          </div>
          <div
            id="testimonialCarousel"
            className="carousel slide pt-5"
            data-bs-ride="carousel"
          >
            <div className="testimonial-item img-border-radius bg-light rounded p-4 carousel-inner ">
              <div className="position-relative carousel-item active ">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute"></i>
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit, distinctio!
                  </p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src={user} className="img-fluid rounded" alt="" />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-dark">Lorem.</h4>
                    <p className="m-0 pb-3">fruitsWallah Customer</p>
                  </div>
                </div>
              </div>
              <div className="position-relative carousel-item">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute"></i>
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit, distinctio!
                  </p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src={user} className="img-fluid rounded" alt="" />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-dark">Lorem.</h4>
                    <p className="m-0 pb-3">fruitsWallah Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6 col-md-6">
            <img src={review} height="350px" alt="" />
          </div>
          <div className="col-lg-6 col-md-6">
            <h2 className="text-center mb-4">User Review Form</h2>
            <form action="" method="post" id="Review-form" name="Review-form">
              <div className="form-group my-2">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                    value={data.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="comment">Write something..</label>
                <textarea
                  className="form-control"
                  id="comment"
                  name="comment"
                  rows="3"
                  placeholder="Write your review here"
                    value={data.comment}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                  type="submit" 
                onClick={handleSubmit}
                className="btn btn-primary btn-block my-2 align-items-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
