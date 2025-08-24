import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt, FaRegUserCircle } from "react-icons/fa";
import {Link} from 'react-router-dom';
import bestProduct1 from "../assets/best-product-1.jpg";
import bestProduct2 from "../assets/best-product-2.jpg";
import bestProduct3 from "../assets/best-product-3.jpg";
import bestProduct4 from "../assets/best-product-4.jpg";
import bestProduct5 from "../assets/best-product-5.jpg";
import bestProduct6 from "../assets/best-product-6.jpg";

const BestSellerProduct = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5">
            <h1 className="display-4">Bestseller Products</h1>
            <p>
              Latin words, combined with a handful of model sentence structures,
              to generate Lorem Ipsum which looks reasonable.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-6">
                    <img
                      src={bestProduct1}
                      className="img-fluid rounded-circle w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <Link to="#" className="h5">
                      Organic Tomato
                    </Link>
                    <div className="d-flex my-3">
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStarHalfAlt className="text-success" />
                    </div>
                    <h4 className="mb-3">&#8377; 312</h4>
                    <button
                      id="bp1"
                      className="btn cart cart border border-secondary rounded-pill px-3 text-success"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-6">
                    <img
                      src={bestProduct2}
                      className="img-fluid rounded-circle w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <Link to="#" className="h5">
                      Organic Tomato
                    </Link>
                    <div className="d-flex my-3">
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStarHalfAlt className="text-success" />
                    </div>
                    <h4 className="mb-3">&#8377; 312</h4>
                    <button
                      id="bp2"
                      className="btn cart border border-secondary rounded-pill px-3 text-success"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-6">
                    <img
                      src={bestProduct3}
                      className="img-fluid rounded-circle w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <Link to="#" className="h5">
                      Organic Tomato
                    </Link>
                    <div className="d-flex my-3">
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStarHalfAlt className="text-success" />
                    </div>
                    <h4 className="mb-3">&#8377; 312</h4>
                    <button
                      id="bp3"
                      className="btn cart border border-secondary rounded-pill px-3 text-success"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-6">
                    <img
                      src={bestProduct4}
                      className="img-fluid rounded-circle w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <Link to="#" className="h5">
                      Organic Tomato
                    </Link>
                    <div className="d-flex my-3">
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStarHalfAlt className="text-success" />
                    </div>
                    <h4 className="mb-3">&#8377; 312</h4>
                    <button
                      id="bp4"
                      className="btn cart border border-secondary rounded-pill px-3 text-success"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-6">
                    <img
                      src={bestProduct5}
                      className="img-fluid rounded-circle w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <Link to="#" className="h5">
                      Organic Tomato
                    </Link>
                    <div className="d-flex my-3">
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStarHalfAlt className="text-success" />
                    </div>
                    <h4 className="mb-3">&#8377; 312</h4>
                    <button
                      id="bp5"
                      className="btn cart border border-secondary rounded-pill px-3 text-success"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
              <div className="p-4 rounded bg-light">
                <div className="row align-items-center">
                  <div className="col-6">
                    <img
                      src={bestProduct6}
                      className="img-fluid rounded-circle w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <Link to="#" className="h5">
                      Organic Tomato
                    </Link>
                    <div className="d-flex my-3">
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStar className="text-success" />
                      <FaStarHalfAlt className="text-success" />
                    </div>
                    <h4 className="mb-3">&#8377; 312</h4>
                    <button
                      id="bp6"
                      className="btn cart border border-secondary rounded-pill px-3 text-success"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="text-center">
                <img src={bestProduct1} className="img-fluid rounded" alt="" />
                <div className="py-4">
                  <Link to="#" className="h5">
                    Organic Tomato
                  </Link>
                  <div className="d-flex my-3 justify-content-center">
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStarHalfAlt className="text-success" />
                  </div>
                  <h4 className="mb-3">&#8377; 312</h4>
                  <button
                    id="bp7"
                    className="btn cart border border-secondary rounded-pill px-3 text-success"
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="text-center">
                <img src={bestProduct6} className="img-fluid rounded" alt="" />
                <div className="py-4">
                  <Link to="#" className="h5">
                    Organic Tomato
                  </Link>
                  <div className="d-flex my-3 justify-content-center">
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStarHalfAlt className="text-success" />
                  </div>
                  <h4 className="mb-3">&#8377; 312</h4>
                  <button
                    id="bp8"
                    className="btn cart border border-secondary rounded-pill px-3 text-success"
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="text-center">
                <img src={bestProduct3} className="img-fluid rounded" alt="" />
                <div className="py-4">
                  <Link to="#" className="h5">
                    Organic Tomato
                  </Link>
                  <div className="d-flex my-3 justify-content-center">
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStarHalfAlt className="text-success" />
                  </div>
                  <h4 className="mb-3">&#8377; 312</h4>

                  <button
                    id="bp9"
                    className="btn cart border border-secondary rounded-pill px-3 text-success"
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="text-center">
                <img src={bestProduct4} className="img-fluid rounded" alt="" />
                <div className="py-2">
                  <Link to="#" className="h5">
                    Organic Tomato
                  </Link>
                  <div className="d-flex my-3 justify-content-center">
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStar className="text-success" />
                    <FaStarHalfAlt className="text-success" />
                  </div>
                  <h4 className="mb-3">&#8377; 312</h4>
                  <button
                    id="bp10"
                    className="btn cart  border border-secondary rounded-pill px-3 text-success"
                  >
                    {" "}
                    Know More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="container-fluid">
        <div class="container">
          <div class="bg-light p-5 rounded">
            <div class="row g-4 justify-content-center">
              <div class="col-md-6 col-lg-6 col-xl-3">
                <div class="counter bg-white rounded p-5">
                  <FaRegUserCircle size={75} className="text-secondary"/>
                  <h4>satisfied customers</h4>
                  <h1>1963</h1>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-3">
                <div class="counter bg-white rounded p-5">
                  <FaRegUserCircle size={75} className="text-secondary"/>
                  <h4>quality of service</h4>
                  <h1>99%</h1>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-3">
                <div class="counter bg-white rounded p-5">
                  <FaRegUserCircle  size={75}className="text-secondary"/>
                  <h4>quality certificates</h4>
                  <h1>33</h1>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 col-xl-3">
                <div class="counter bg-white rounded p-5">
                  <FaRegUserCircle  size={75}className="text-secondary"/>
                  <h4>Available Products</h4>
                  <h1>789</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default BestSellerProduct;
