import {  useEffect, useState } from "react";
import { FaRegUserCircle, FaShoppingCart, FaBars, FaSignOutAlt } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import useAuthStore from "../Stores/AuthStore";

function Navbar() {
  const navigate = useNavigate();
  var [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const { isAdmin, isLoggedIn, logout } = useAuthStore();
  
  const { cartItems } = useCart();
  useEffect(() => {
    var total1 = 0;
    cartItems.map((cartitem) => {
      total1 = cartitem.productQuantity + total1;
    });
    setTotal(total1);
  }, [cartItems]);

  return (
    <>
      <div className="container-fluid fixed-top mb-5">
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <h1 className="text-success display-6" id="logo">
                <strong>FruitsWallah</strong>
              </h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <FaBars className="text-success"></FaBars>
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <Link to="/home" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/Products" className="nav-item nav-link">
                  Products
                </Link>
                <Link to="/Orders/" className="nav-item nav-link">
                  Orders
                </Link>
                {isAdmin == "True" ? (
                  <Link to="/FruitsWAllahAdmin" className="nav-item nav-link">
                    Admin Dashboard
                  </Link>
                ):
                (<Link to="/contact/" className="nav-item nav-link">
                  Contact
                </Link>)
}
              </div>
              <div className="d-flex align-items-center m-3 me-0">
                <div className="position-relative mx-auto">
                  <form
                    className="w-100"
                    onSubmit={(e) => {
                      e.preventDefault();
                      navigate(`/search/${search}`);
                    }}
                  >
                    <input
                      className="form-control border-2 border-success rounded-pill"
                      style={{ paddingRight: '2.5rem' }}
                      type="search"
                      name="search"
                      id="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                      style={{ right: '0.5rem' }}
                    >
                      <IoSearchCircleSharp
                        size={25}
                        className="text-success search-btn"
                      />
                    </button>
                  </form>
                </div>

                <Link to="/cart/" className="nav-item nav-link">
                  <div className="position-relative">
                    <FaShoppingCart
                      size={30}
                      className="text-success pb-1"
                    />
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-transparent text-success"
                      style={{ fontSize: "1rem" }}
                    >
                      {total}
                    </span>
                  </div>
                </Link>
                {isLoggedIn ? (
                  <Link to="/login" className="m-2" onClick={() => {
                    logout();
                    navigate('/login');
                  }}>
                    <FaSignOutAlt className="text-success pb-1" size={30} />
                  </Link>
                ) : (
                  <Link to="/login/" className="m-2">
                    <FaRegUserCircle className="text-success pb-1" size={30} />
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Navbar;
