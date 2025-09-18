import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import review from "../assets/review.png";
import CustomerReview from "./CustomerReview";
import Carousel from "react-multi-carousel";
import { GetReviews, PostReview } from "../services/ReviewController";
import SuccessMessage from "./SuccessMessage";
const Testimonial = () => {
   const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({
    comment: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  
  const [Reviews, setReviews] = useState([]);

  useEffect(() => {
    GetReviews(setReviews)
  }, []);
    
 const responsive = {
   superLargeDesktop: {
     breakpoint: { max: 4000, min: 1200 },
     items: 3,
     slidesToSlide: 1,
   },
   desktop: {
     breakpoint: { max: 1200, min: 992 },
     items: 3,
     slidesToSlide: 1,
   },
   tablet: {
     breakpoint: { max: 992, min: 576 },
     items: 2,
     slidesToSlide: 1,
   },
   mobile: {
     breakpoint: { max: 576, min: 0 },
     items: 1,
     slidesToSlide: 1,
   },
 };

    return (
      <>
        <div className="container-fluid testimonial">
          <div className="container py-5">
            <div className="testimonial-header text-center">
              <h1 className="text-success mb-2 display-7">Our Testimonial</h1>
              <h2 className="display-7 mb-5 text-dark">Our Client Saying!</h2>
            </div>
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              itemClass="px-2"
            >
              {Reviews.map((review, index) => {
                return <CustomerReview key={index} review={review} />;
              })}
            </Carousel>
          </div>
        </div>

        <div className="container py-5">
          {showPopup && (
            <SuccessMessage
              style={{ marginTop: "100px" }}
              message={"Thank You for Sharing Your Thoughts about me."}
            />
          )}
          <div className="row g-4 align-items-center">
            <div className="col-lg-6 col-md-6">
              <img src={review} height="350px" alt="" />
            </div>
            <div className="col-lg-6 col-md-6">
              <h2 className="text-center mb-4">User Review Form</h2>
              <form id="Review-form" name="Review-form">
                <div className="form-group my-2">
                  <label htmlFor="comment" className="fw-medium">
                    Share Your Thoughts about me...
                  </label>
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
                  onClick={(e) => {
                    e.preventDefault();
                    PostReview(data, setReviews, setShowPopup);
                  
                  }}
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
