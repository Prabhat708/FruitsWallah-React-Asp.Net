import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import bestProduct1 from "../assets/best-product-1.jpg";
import bestProduct2 from "../assets/best-product-2.jpg";
import bestProduct3 from "../assets/best-product-3.jpg";
import bestProduct4 from "../assets/best-product-4.jpg";
import bestProduct5 from "../assets/best-product-5.jpg";
import bestProduct6 from "../assets/best-product-6.jpg";
import BestProduct from "./BestProduct";
import BestProductLarge from "./BestProductLarge";
const bestProducts = [
  {
    id: 1,
    name: "Orange",
    price: 312,
    image: bestProduct1,
  },
  {
    id: 2,
    name: "Fresh Banana",
    price: 145,
    image: bestProduct3,
  },
  {
    id: 3,
    name: "Red Raspberries",
    price: 225,
    image: bestProduct2,
  },
  {
    id: 4,
    name: "Green Grapes",
    price: 178,
    image: bestProduct5,
  },
  {
    id: 5,
    name: "Apricots",
    price: 250,
    image: bestProduct4,
  },
  {
    id: 6,
    name: "Apples",
    price: 199,
    image: bestProduct6,
  },
];
const bestProductLarge = [
  {
    id: 1,
    name: "Orange",
    price: 312,
    image: bestProduct1,
  },
  {
    id: 2,
    name: "Fresh Banana",
    price: 145,
    image: bestProduct3,
  },
  {
    id: 3,
    name: "Red Apple",
    price: 225,
    image: bestProduct6,
  },
  {
    id: 4,
    name: "Green Grapes",
    price: 178,
    image: bestProduct5,
  },
];

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
            {bestProducts.map((product) => (
              <BestProduct key={product.id} product={product} />  
            ))}
            
            {bestProductLarge.map((product) => (
              <BestProductLarge key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellerProduct;
