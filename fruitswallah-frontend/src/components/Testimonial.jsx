import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import review from "../assets/review.png";
import CustomerReview from "./CustomerReview";
import Carousel from "react-multi-carousel";
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
  const Reviews = [
    {
      customerName: "Lorem1",
      reviewContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eaque!",
    },
    {
      customerName: "Lorem2",
      reviewContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eaque!",
    },
    {
      customerName: "Lorem3",
      reviewContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eaque!",
    },
    {
      customerName: "Lorem4",
      reviewContent:
        "ng elit. Libero, eaque!",
    },
    {
      customerName: "Lorem5",
      reviewContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eaque!",
    },
  ];
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
                  {Reviews.map((review,index) => {
                    return <CustomerReview key={index} review={ review} />
                   
                  })}
                
              </Carousel>
            
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
