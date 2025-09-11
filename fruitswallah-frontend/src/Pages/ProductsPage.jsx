import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from 'react-router-dom';
import featuredImg1 from "../assets/feature-1.jpg";
import featuredImg2 from "../assets/feature-2.jpg";
import featuredImg3 from "../assets/feature-3.jpg";
import bannerFruit from "../assets/banner-fruits.jpg";
import { FaSearch, FaStar } from "react-icons/fa";
import ItemCard from "../components/ItemCard";
import { GetProducts } from "../services/ProductController";
import { useEffect, useState } from "react";

const ProductsPage = () => {
 const [products, setProducts] = useState([]);
   useEffect(() => {
     GetProducts(setProducts)
   }, []);
  return (
    <>
      <Navbar />
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Products</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item ">
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active text-primary">Products</li>
        </ol>
      </div>
      <div className="container-fluid fruite ">
        <div className="container py-5">
          <h1 className="mb-4">Fresh fruits shop</h1>
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="col-xl-3">
                  <div className="input-group w-100 mx-auto d-flex">
                    <input
                      type="search"
                      className="form-control p-3"
                      placeholder="keywords"
                      aria-describedby="search-icon-1"
                    />
                    <span id="search-icon-1" className="input-group-text p-3">
                      <FaSearch className="text-secondary" />
                    </span>
                  </div>
                </div>
                <div className="col-6"></div>
                <div className="col-xl-3">
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="fruits">Default Sorting:</label>
                    <select
                      id="fruits"
                      name="fruitlist"
                      className="border-0 form-select-sm bg-light me-3"
                      form="fruitform"
                    >
                      <option value="volvo"> Nothing</option>
                      <option value="saab"> Popularity</option>
                      <option value="opel"> Organic</option>
                      <option value="audi"> Fantastic</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Categories</h4>
                        <ul className="list-unstyled fruite-categorie">
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <Link to="#">Apples</Link>
                              <span>(3)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <Link to="#">Oranges</Link>
                              <span>(5)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <Link to="#">Strawbery</Link>
                              <span>(2)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <Link to="#">Banana</Link>
                              <span>(8)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <Link to="#">Pumpkin</Link>
                              <span>(5)</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <h4 className="mb-3">Featured products</h4>
                      <div className="d-flex align-items-center justify-content-start">
                        <div
                          className="rounded me-4"
                          style={{ width: "100px", height: "100px" }}
                        >
                          <img
                            src={featuredImg1}
                            className="img-fluid rounded"
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-secondary"></FaStar>
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">&#8377;299 </h5>
                            <h5 className="text-danger text-decoration-line-through">
                              {" "}
                              &#8377;411
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div
                          className="rounded me-4"
                          style={{ width: "100px", height: "100px" }}
                        >
                          <img
                            src={featuredImg2}
                            className="img-fluid rounded"
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-secondary"></FaStar>
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">&#8377;299 </h5>
                            <h5 className="text-danger text-decoration-line-through">
                              &#8377;411{" "}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div
                          className="rounded me-4"
                          style={{ width: "100px", height: "100px" }}
                        >
                          <img
                            src={featuredImg3}
                            className="img-fluid rounded"
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-success"></FaStar>
                            <FaStar className=" text-secondary"></FaStar>
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">&#8377;299 </h5>
                            <h5 className="text-danger text-decoration-line-through">
                              &#8377;411{" "}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-4">
                        <Link
                          to="#"
                          className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                        >
                          Vew More
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <img
                          src={bannerFruit}
                          className="img-fluid w-100 rounded"
                          alt=""
                        />
                        <div
                          className="position-absolute"
                          style={{
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <h3 className="text-secondary fw-bold">
                            Fresh <br /> Fruits
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="tab-content">
                    <div id="tab-1" className="tab-pane fade show p-0 active">
                      <div className="col-lg-12">
                        <div className="row g-3">
                          {products.map((item) => ( item.isActive &&
                            <div
                              key={item.productId}
                              className="col-lg-4 col-md-6"
                            
                            >
                              <ItemCard item={item} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
