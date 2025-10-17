import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import Featurs from "../components/featurs";
import Fruits_shop from "../components/Fruits_shop";
import Other_Features from "../components/Other_Features";
import Vegetables from "../components/Vegetables";
import Banner from "../components/Banner";
import BestSellerProduct from "../components/BestSellerProduct";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Messeage from "../components/Messeage";
import { GetProducts } from "../services/ProductController";
import useAuthStore from "../Stores/AuthStore";
import { HandleLogout } from "../services/HandleLoginLogout";
import { handleActiveAccount } from "../services/Singup";
import { BsFillLightningChargeFill } from "react-icons/bs";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const navigate = useNavigate();
  useEffect(() => {
    useAuthStore.getState().initializeAuth();
    GetProducts(setProducts);
  }, []);
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");
  const username = location.state?.Username || "";
  const comingFrom = location.state?.comingFrom || "";
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        window.history.replaceState({}, document.title);
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const product = products?.filter((p) => p.isActive);
  const lastPost = currentPage * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = product?.slice(firstPost, lastPost);
  const { isActive, token } = useAuthStore();

  useEffect(() => {
    if (token && isActive === "False") {
      setShowConfirmModal(true);
    }
  }, [token, isActive]);
  const handleConfirm = async () => {
    handleActiveAccount();
    HandleLogout(navigate);
    navigate("/login");
    setShowConfirmModal(false);
  };
  return (
    <>
      <Navbar />
      {message && (
        <Messeage
          message={message}
          username={username}
          comingFrom={comingFrom}
        />
      )}
      {showConfirmModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-primary shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  Confirmation for Activate Account
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="fw-semibold">
                  Your Account is Inactive. Please activate your account to
                  continue for all services
                </p>
                <div
                  className="alert alert-secondary d-flex align-items-start mt-3"
                  role="alert"
                >
                  <div>
                    <BsFillLightningChargeFill className="me-2" />
                    <strong>Note: </strong>
                    <br />
                    if you activate your account then you can enjoy all features
                    and services of FruitsWallah without any restrictions.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    HandleLogout(navigate);
                    setShowConfirmModal(false);
                  }}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleConfirm}
                >
                  Yes, Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Hero />
      <Featurs />
      <Fruits_shop
        products={currentPost}
        postPerPage={postPerPage}
        allProducts={product.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Other_Features />
      <Vegetables products={products} />
      <Banner />
      <BestSellerProduct />
      <Testimonial />
      <Footer />
    </>
  );
};

export default HomePage;
