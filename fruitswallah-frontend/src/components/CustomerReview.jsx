import React, { use } from "react";
import user from "../assets/user.png";
import jwt_Decode from "jwt-decode";
import { MdDeleteForever } from "react-icons/md";

const CustomerReview = ({ review }) => {
  const token = localStorage.getItem("Token");
  var UserId = null;
  if(token!=null){
    UserId = jwt_Decode(token)?.UserId || null;
  }
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
            {UserId == review.userId ? (
              <>
                <span className="badge bg-secondary">You</span>
                <button className="bg bg-transparent border-0 text-danger">
                  <MdDeleteForever size={20} />
                </button>
              </>
            ) : (
              <small className="text-muted">fruitsWallah Customer</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
