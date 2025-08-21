import React from "react";
import Cauliflower from "../assets/Cauliflower.jpg";
import {
  FaShoppingBag,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";

const Vegetables = () => {
  return (
    <div className="container-fluid vesitable">
      <div className="container py-5">
        <h1 className="mb-4">Fresh Organic Vegetables</h1>
        <div
          id="vegetableCarousel"
          className="carousel slide pt-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row justify-content-center g-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="rounded vesitable-item col-lg-3 col-md-4 col-sm-6"
                  >
                    <div className="vesitable-img">
                      <img
                        src={Cauliflower}
                        className="product w-100 rounded-top"
                        alt="Cauliflower"
                      />
                    </div>
                    <div className="p-4 rounded-bottom border border-success border-top-0 position-relative">
                      <h4>Cauliflower</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Amet veritatis et distinctio harum no
                      </p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">
                          &#8377;80/ kg
                        </p>
                        <button className="btn cart border border-secondary rounded-pill px-3 text-success">
                          <FaShoppingBag size={30} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-item">
              <div className="row justify-content-center g-4">
                {[5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="rounded vesitable-item col-lg-3 col-md-4 col-sm-6 "
                  >
                    <div className="vesitable-img">
                      <img
                        src={Cauliflower}
                        className="product w-100 rounded-top"
                        alt="Cauliflower"
                      />
                    </div>
                    <div className="p-4 rounded-bottom border border-success border-top-0 position-relative">
                      <h4>Cauliflower</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Amet veritatis et distinctio harum no
                      </p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">
                          &#8377;80/ kg
                        </p>
                        <button className="btn cart border border-secondary rounded-pill px-3 text-success">
                          <FaShoppingBag size={30} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#vegetableCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon position-absolute start-0"
              aria-hidden="true"
                      ></span>
             
            <FaArrowCircleLeft size={25} className="text-warning position-absolute start-0 ">
              Previous
            </FaArrowCircleLeft>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#vegetableCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon position-absolute end-0"
              aria-hidden="true"
            ></span>
            <FaArrowCircleRight size={25} className="text-warning position-absolute end-0">Next</FaArrowCircleRight>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vegetables;
