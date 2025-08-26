import React from "react";
import user from "../assets/user.png";
const CustomerReview = ({ review }) => {
  return (
    <>
      <div className="position-relative carousel-item active">
        <div className="mb-4 pb-4 border-bottom border-secondary">
          <p className="mb-0">{review.reviewContent}</p>
        </div>
        <div className="d-flex align-items-center flex-nowrap">
          <div className="bg-secondary rounded">
            <img src={user} className="img-fluid rounded" alt="" />
          </div>
          <div className="ms-4 d-block">
            <h4 className="text-dark">{review.customerName}</h4>
            <p className="m-0 pb-3">fruitsWallah Customer</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerReview;
