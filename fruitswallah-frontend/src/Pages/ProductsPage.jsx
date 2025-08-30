import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link} from 'react-router-dom';
import featuredImg1 from "../assets/feature-1.jpg";
import featuredImg2 from "../assets/feature-2.jpg";
import featuredImg3 from "../assets/feature-3.jpg";
import bannerFruit from "../assets/banner-fruits.jpg";
import { FaSearch, FaStar } from "react-icons/fa";
import banana from "../assets/best-product-3.jpg";
import orange from "../assets/best-product-1.jpg";
import grapes from "../assets/best-product-5.jpg";
import mango from "../assets/mango.webp";
import pineapple from "../assets/pineApple.jpg";
import strawberries from "../assets/feature-2.jpg";
import ItemCard from "../components/ItemCard";
import Cauliflower from "../assets/Cauliflower.jpg";

const ProductsPage = () => {
  const Items = [
    {
      id: 1,
      name: "Apple",
      price: 120,
      image: "/apple.jpg",
      discription: "Fresh and juicy apples, perfect for snacking and baking.",
    },
    {
      id: 2,
      name: "Banana",
      price: 60,
      image: banana,
      discription:
        "Sweet and creamy bananas, great for smoothies and desserts.",
    },
    {
      id: 3,
      name: "Orange",
      price: 80,
      image: orange,
      discription: "Citrusy and refreshing oranges, packed with vitamin C.",
    },
    {
      id: 4,
      name: "Grapes",
      price: 150,
      image: grapes,
      discription: "Plump and flavorful grapes, ideal for snacking and salads.",
    },
    {
      id: 5,
      name: "Mango",
      price: 200,
      image: mango,
      discription: "Ripe and fragrant mangoes, perfect for tropical treats.",
    },
    {
      id: 6,
      name: "Pineapple",
      price: 90,
      image: pineapple,
      discription:
        "Tangy and sweet pineapples, great for grilling and cocktails.",
    },
    {
      id: 7,
      name: "Strawberries",
      price: 250,
      image: strawberries,
      discription:
        "Juicy and vibrant strawberries, ideal for desserts and smoothies. Lorem ipsum dolor sit amet.",
    },
    {
      id: 8,
      name: "Cauliflower",
      price: 40,
      image: Cauliflower,
      discription:
        "Fresh and healthy cauliflower, perfect for cooking and salads.",
    },
    {
      id: 9,
      name: "Broccoli",
      price: 60,
      image: "/Broccoli.jpg",
      discription:
        "Crisp and nutritious broccoli, great for steaming and stir-fries.",
    },
    {
      id: 10,
      name: "Carrots",
      price: 30,
      image: "/Carrots.webp",
      discription: "Sweet and crunchy carrots, packed with vitamins and fiber.",
    },
    {
      id: 11,
      name: "Spinach",
      price: 50,
      image: "Spinach.jpg",
      discription: "Fresh and leafy spinach, ideal for salads and smoothies.",
    },
    {
      id: 12,
      name: "Tomatoes",
      price: 70,
      image: "Tomatoes.jpg",
      discription: "Juicy and ripe tomatoes, perfect for sauces and salads.",
    },
  
  ];
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
                          {Items.map((item) => (
                            <div
                              key={item.id}
                              className="col-lg-4 col-md-6"
                              id="v"
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
