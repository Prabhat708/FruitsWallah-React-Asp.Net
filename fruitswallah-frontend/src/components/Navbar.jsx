import { use, useEffect, useState } from "react";
import { FaRegUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";
import {Link} from 'react-router-dom';
function Navbar() {
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let numberOfItemsInCart1 = cart.reduce((total, item) => total + item.quantity, 0);
    setNumberOfItemsInCart(numberOfItemsInCart1);
  }, []);

 
  return (
    <>
      <div className="container-fluid fixed-top mb-5">
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/home" className="navbar-brand">
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
                <Link to="/contact/" className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <div className="d-flex m-3 me-0">
                <div className="position-relative mx-auto d-inline-block w-75">
                  <form method="get" action="/search" className="w-100">
                    <input
                      className="form-control border-2 top-50 border-success rounded-pill "
                      type="search"
                      name="search"
                      id="search"
                     
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="btn position-absolute top-50 end-0 translate-middle-y me-0 p-0 border-0 bg-transparent "
                    >
                      <IoSearchCircleSharp
                        size={50}
                        className="text-success search-btn"
                      />
                    </button>
                  </form>
                </div>

                <Link to="/cart/" className="m-2">
                <span className="position-absolute  rounded-circle d-flex align-items-center justify-content-center text-success fw-medium px-1 " style={{top:"20%",right:"3.5%"}}>{ numberOfItemsInCart}</span>
                  <FaShoppingCart
                    size={30}
                    className="text-success pb-1"
                  >
                  </FaShoppingCart>
                     
                </Link>
                <Link to="/login/" className="m-2">
                  <FaRegUserCircle className="text-success pb-1" size={30} />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Navbar;
