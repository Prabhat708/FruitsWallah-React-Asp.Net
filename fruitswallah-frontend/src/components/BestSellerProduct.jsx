import BestProduct from "./BestProduct";
import BestProductLarge from "./BestProductLarge";
import { bestProducts, bestProductLarge } from "../data/Products";
  
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
