import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import cartImg from "../assets/Cart.svg";
import { Link, useNavigate } from "react-router-dom";
import CartRow from "../components/CartRow";
import { RemoveFromCart,getCartItems } from "../services/CartFeatures";
import { useCart } from "../components/CartContext";


const CartPage = () => {
  const navigate = useNavigate();
    const { cartItems, setCartItems } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "false") {
      navigate("/login");
    }
  }, []);
  let sum = 0;
  return (
    <>
      
      <Navbar />

      {cartItems.length === 0 ? (
        <h1 className="text-center mt-5 pt-5">No items in cart</h1>
      ) : (
        <div className="container-fluid mt-5 pt-2">
          <div className="container py-5">
            {showPopup && (
              <div className="alert alert-danger">
                Item removed successfully!
              </div>
            )}
            <div className="table-responsive">
              <table className="table " id="CartItem">
                <thead className="">
                  <tr>
                    <th scope="col ">Products/Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item, index) => {
                    sum = sum + item.productPrice * item.productQuantity;
                    return (
                      <CartRow
                        key={index}
                        item={item}
                        setCartItems={setCartItems}
                        onDelete={() =>
                          RemoveFromCart(
                            item.cartId,
                            setShowPopup,
                            setCartItems
                          )
                        }


                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="row g-4 justify-content-end">
              <div className="col-8">
                <img src={cartImg} alt="" />
              </div>
              <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4 mt-5 pt-5">
                <div className="bg-light rounded">
                  <div className="p-4">
                    <h1 className="display-6 mb-4">
                      <span className="fw-normal">
                        Review Your Cart To Proceed
                      </span>
                    </h1>
                    <p className="pt-0">Shipping only in India.</p>
                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="mb-0 me-4 ">Subtotal:</h5>
                      <p id="subtotal " className="mb-0 fw-medium">
                        &#8377; {sum}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h5 className="mb-0 me-4">Shipping Charge:</h5>
                      <div className="">
                        <p id="ship" className="mb-0 fw-medium">
                          &#8377;
                          {sum >= 300 ? (
                            <>
                              <em>
                                <del> 50 </del>
                              </em>{" "}
                              <br />
                              <b> free</b>
                            </>
                          ) : (
                            50
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                    <p id="total" className="mb-0 pe-4 fw-bold">
                      &#8377; {sum >= 300 ? sum : sum + 50}
                    </p>
                  </div>
                  <Link to="/checkout/">
                    {" "}
                    <button
                      className="btn border-warning bg-success rounded-pill position-relative start-50 px-4 py-3 text-white text-uppercase mb-4 "
                      type="button"
                    >
                      Proceed Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CartPage;
