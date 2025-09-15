import { FaShoppingBag } from "react-icons/fa";
import ItemCard from "./ItemCard";
import { Link } from 'react-router-dom';

const Fruits_shop = ({products}) => {
  
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
                    <Link
                      className="d-flex m-2 py-2 bg-warning rounded-pill active p-3 text-decoration-none"
                      data-bs-toggle="pill"
                      to="#tab-1"
                    >
                      <span className="text-dark ">All Products</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="col-lg-12">
                  <div className="row g-4">
                    {products.length == 0 ? (
                      <h1 className="text-center mt-5 pt-5">
                        Sorry ! No Items found..
                      </h1>) :
                      (products?.map((fruit) => (fruit.isActive &&
                        <div
                          key={fruit.productId}
                          className="col-md-6 col-lg-4 col-xl-3"
                          id="v"
                        >
                          <ItemCard item={fruit} />
                        </div>
                      )))
                    }
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
