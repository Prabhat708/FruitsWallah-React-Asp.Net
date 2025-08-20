import { FaRegUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";
function Navbar() {
  return (
    <>
      <div className="container-fluid fixed-top">
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <a href="/home" className="navbar-brand">
              <h1 className="text-success display-6" id="logo">
                <strong>FruitsWallah</strong>
              </h1>
            </a>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="navbarCollapse"
            >
              <FaBars className="text-success"></FaBars>
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <a href="/home" className="nav-item nav-link active">
                  Home
                </a>
                <a href="/Products" className="nav-item nav-link">
                  Products
                </a>
                <a href="/Orders/" className="nav-item nav-link">
                  Orders
                </a>

                <a href="/contact/" className="nav-item nav-link">
                  Contact
                </a>
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

                <a href="/cart/" className="m-2">
                  <FaShoppingCart
                    size={30}
                    className="text-success pb-1"
                  ></FaShoppingCart>
                </a>
                <a href="/login/" className="m-2">
                  <FaRegUserCircle className="text-success pb-1" size={30} />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Navbar;
