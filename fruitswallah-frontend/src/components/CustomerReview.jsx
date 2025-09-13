import React from "react";
import user from "../assets/user.png";

const CustomerReview = ({ review }) => {
  return (
    <div className="carousel-item active">
      <div className="review-card card border-0 shadow-sm p-4 mb-5 bg-white rounded transition">
        <div className="mb-3">
          <p className="mb-0 text-muted" style={{ textAlign: "justify" }}>
            “{review.review}"
          </p>
        </div>
        <div className="d-flex align-items-center mt-4">
          <img
            src={user}
            alt="Customer"
            className="rounded-circle me-3"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <div>
            <h5 className="mb-1 text-dark">{review.name}</h5>
            <small className="text-muted">fruitsWallah Customer</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
