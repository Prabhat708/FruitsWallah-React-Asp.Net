import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const BestProduct = ({ product }) => {
    const navigation = useNavigate();
  return (
    <>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img
                src={product.image}
                className="img-fluid rounded-circle w-100"
                alt=""
              />
            </div>
            <div className="col-6">
              <Link to="#" className="h5">
                {product.name}
              </Link>
              <div className="d-flex my-3">
                <FaStar className="text-success" />
                <FaStar className="text-success" />
                <FaStar className="text-success" />
                <FaStar className="text-success" />
                <FaStarHalfAlt className="text-success" />
              </div>
              <h4 className="mb-3">&#8377; {product.price}</h4>
              <button onClick={() =>{ navigation(`/product/${product.id}`);}}
                id="bp1"
                className="btn cart cart border border-secondary rounded-pill px-3 text-success"
              >
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestProduct;
