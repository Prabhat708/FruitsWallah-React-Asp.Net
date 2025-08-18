import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";
function Navbar() {
  return (
    <>
      <div className="container-fluid fixed-top">
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <a href="#" className="navbar-brand">
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
              <span className="fa fa-bars text-success"></span>
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <a href="#" className="nav-item nav-link active">
                  Home
                </a>
                <a href="/shop/" className="nav-item nav-link">
                  Shop
                </a>
                <a href="/shopdetail/" className="nav-item nav-link">
                  Shop Detail
                </a>
                <div className="nav-item dropdown">
                  <a
                    href=""
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <a href="/cart/" className="dropdown-item">
                      Cart
                    </a>
                    <a href="/checkout/" className="dropdown-item">
                      Checkout
                    </a>
                    <a href="/testimonial/" className="dropdown-item">
                      Testimonial
                    </a>
                    <a href="/tracker/" className="dropdown-item">
                      Order Tracker
                    </a>
                    <a href="/order/" className="dropdown-item">
                      My Orders
                    </a>
                  </div>
                </div>
                <a href="/contact/" className="nav-item nav-link">
                  Contact
                </a>
              </div>
              <div className="d-flex m-3 me-0">
                <div className="position-relative mx-auto">
                  <form
                    method="get"
                    action="/search"
                    className="form-inline my-2 my-lg-0"
                  >
                    <input
                      className="form-control border-2 border-success w-75  rounded-pill"
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="btn  px-4 position-absolute  text-white "
                    >
                      <IoSearchCircleSharp
                        size={30}
                        className="text-success display-inline"
                      ></IoSearchCircleSharp>
                    </button>
                  </form>
                </div>
                <a href="/cart/" className="m-2">
                  <FaShoppingCart
                    size={30}
                    className="text-success "
                  ></FaShoppingCart>
                </a>
                <a href="/login/" className="m-2">
                  <FaRegUserCircle className="text-success " size={30} />
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
