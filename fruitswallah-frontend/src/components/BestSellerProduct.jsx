import { GetBestProducts } from "../services/ProductController";
import BestProduct from "./BestProduct";
import { useEffect, useState } from "react";
  
const BestSellerProduct = () => {
  const [bestProducts, setBestProducts] = useState([]);
  useEffect(() => {
    GetBestProducts(setBestProducts);
  }, []);
 
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
            {bestProducts.map((product, index) => (
              <BestProduct key={index} product={product} />
            ))}

            {/* {bestProductLarge.map((product) => (
              <BestProductLarge key={product.id} product={product} />
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellerProduct;
