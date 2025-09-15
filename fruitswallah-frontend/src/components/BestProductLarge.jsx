import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const BestProductLarge = ({ product }) => {
    const navigation = useNavigate();
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-3">
        <div className="text-center">
          <img src={product.image} className="img-fluid rounded" alt="" />
          <div className="py-4">
            <Link to="#" className="h5">
              {product.name}
            </Link>
            <div className="d-flex my-3 justify-content-center">
              <FaStar className="text-success" />
              <FaStar className="text-success" />
              <FaStar className="text-success" />
              <FaStar className="text-success" />
              <FaStarHalfAlt className="text-success" />
            </div>
            <h4 className="mb-3">&#8377; {product.price}</h4>
            <button onClick={() =>{ navigation(`/product/${product.id}`);}}
              id="bp7"
              className="btn cart border border-secondary rounded-pill px-3 text-success"
            disabled>
              Know More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BestProductLarge
