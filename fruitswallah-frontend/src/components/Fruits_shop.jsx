import { FaShoppingBag } from "react-icons/fa";
import ItemCard from "./ItemCard";
import banana from "../assets/best-product-3.jpg";
import orange from "../assets/best-product-1.jpg";
import grapes from "../assets/best-product-5.jpg";
import mango from "../assets/mango.webp";
import pineapple from "../assets/pineApple.jpg";
import strawberries from "../assets/feature-2.jpg";
const Fruits_shop = () => {
  const Fruits = [
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
  ];
  return (
    <>
      <div className="container-fluid fruite">
        <div className="container py-5">
          <div className="tab-className text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>Our Organic Products</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li className="nav-item">
                    <a
                      className="d-flex m-2 py-2 bg-warning rounded-pill active p-3 text-decoration-none"
                      data-bs-toggle="pill"
                      href="#tab-1"
                    >
                      <span className="text-dark ">All Products</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="d-flex py-2 m-2 bg-warning rounded-pill p-3 text-decoration-none"
                      data-bs-toggle="pill"
                      href="#v"
                    >
                      <span className="text-dark ">Vegetables</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="d-flex m-2 py-2 bg-warning rounded-pill p-3 text-decoration-none"
                      data-bs-toggle="pill"
                      href="#f"
                    >
                      <span className="text-dark ">Fruits</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="col-lg-12">
                    <div className="row g-4">
                {Fruits?.map((fruit) => (
                    <div key={fruit.id} className="col-md-6 col-lg-4 col-xl-3" id="v">
                    <ItemCard item={ fruit} />
                        </div>
                  ))}
                    </div>
                  </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fruits_shop;
