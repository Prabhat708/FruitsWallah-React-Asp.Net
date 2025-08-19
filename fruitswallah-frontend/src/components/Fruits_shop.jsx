import { FaShoppingBag } from "react-icons/fa";
const Fruits_shop = () => {
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
                    <a
                      className="d-flex m-2 py-2 bg-warning rounded-pill active p-3 text-decoration-none"
                      data-bs-toggle="pill"
                      href="#tab-1"
                    >
                      <span className="text-dark ">All Products</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="d-flex py-2 m-2 bg-warning rounded-pill p-3 text-decoration-none"
                      data-bs-toggle="pill"
                      href="#v"
                    >
                      <span className="text-dark ">Vegetables</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="d-flex m-2 py-2 bg-warning rounded-pill p-3 text-decoration-none"
                      data-bs-toggle="pill"
                      href="#f"
                    >
                      <span className="text-dark ">Fruits</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      <div className="col-md-6 col-lg-4 col-xl-3" id="v">
                        <div className="rounded position-relative fruite-item ">
                          <div className="fruite-img">
                            <img
                              src="/apple.jpg"
                              className="product img-fluid w-100 rounded-top"
                              alt=""
                            />
                          </div>

                          <div className="p-4  position-relative border border-warning border-top-0 rounded-bottom">
                            <h4 id="namepr"> Apple</h4>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Totam, iure.
                            </p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p
                                id="pricepr"
                                className="text-dark fs-5 fw-bold mb-0"
                              >
                                &#8377; 120/ kg
                              </p>
                              <form method="POST" action="">
                                <input
                                  type="hidden"
                                  name="product_id"
                                  value="1"
                                />
                                <input
                                  type="hidden"
                                  name="quantity"
                                  value="1"
                                />
                                <button
                                  type="submit"
                                  className="btn cart border border-secondary rounded-pill px-3 text-success"
                                >
                                  <FaShoppingBag
                                    size={30}
                                    className="text-success "
                                  ></FaShoppingBag>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3" id="v">
                        <div className="rounded position-relative fruite-item ">
                          <div className="fruite-img">
                            <img
                              id="imgpr{{i.id}}"
                              src="/apple.jpg"
                              className="product img-fluid w-100 rounded-top"
                              alt=""
                            />
                          </div>

                          <div className="p-4  position-relative border border-warning border-top-0 rounded-bottom">
                            <h4 id="namepr{{i.id}}"> Apple</h4>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Totam, iure.
                            </p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p
                                id="pricepr{{i.id}}"
                                className="text-dark fs-5 fw-bold mb-0"
                              >
                                &#8377; 120/ kg
                              </p>
                              <form
                                method="POST"
                                action="{% url 'addToCart' %}"
                              >
                                <input
                                  type="hidden"
                                  name="product_id"
                                  value="{{i.id}}"
                                />
                                <input
                                  type="hidden"
                                  name="quantity"
                                  value="1"
                                />
                                <button
                                  type="submit"
                                  className="btn cart border border-secondary rounded-pill px-3 text-success"
                                >
                                  <FaShoppingBag
                                    size={30}
                                    className="text-success "
                                  ></FaShoppingBag>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3" id="v">
                        <div className="rounded position-relative fruite-item ">
                          <div className="fruite-img">
                            <img
                              id="imgpr{{i.id}}"
                              src="/apple.jpg"
                              className="product img-fluid w-100 rounded-top"
                              alt=""
                            />
                          </div>

                          <div className="p-4  position-relative border border-warning border-top-0 rounded-bottom">
                            <h4 id="namepr{{i.id}}"> Apple</h4>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Totam, iure.
                            </p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p
                                id="pricepr{{i.id}}"
                                className="text-dark fs-5 fw-bold mb-0"
                              >
                                &#8377; 120/ kg
                              </p>
                              <form
                                method="POST"
                                action="{% url 'addToCart' %}"
                              >
                                <input
                                  type="hidden"
                                  name="product_id"
                                  value="{{i.id}}"
                                />
                                <input
                                  type="hidden"
                                  name="quantity"
                                  value="1"
                                />
                                <button
                                  type="submit"
                                  className="btn cart border border-secondary rounded-pill px-3 text-success"
                                >
                                  <FaShoppingBag
                                    size={30}
                                    className="text-success "
                                  ></FaShoppingBag>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3" id="v">
                        <div className="rounded position-relative fruite-item ">
                          <div className="fruite-img">
                            <img
                              id="imgpr{{i.id}}"
                              src="/apple.jpg"
                              className="product img-fluid w-100 rounded-top"
                              alt=""
                            />
                          </div>

                          <div className="p-4  position-relative border border-warning border-top-0 rounded-bottom">
                            <h4 id="namepr{{i.id}}"> Apple</h4>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Totam, iure.
                            </p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p
                                id="pricepr{{i.id}}"
                                className="text-dark fs-5 fw-bold mb-0"
                              >
                                &#8377; 120/ kg
                              </p>
                              <form
                                method="POST"
                                action="{% url 'addToCart' %}"
                              >
                                <input
                                  type="hidden"
                                  name="product_id"
                                  value="{{i.id}}"
                                />
                                <input
                                  type="hidden"
                                  name="quantity"
                                  value="1"
                                />
                                <button
                                  type="submit"
                                  className="btn cart border border-secondary rounded-pill px-3 text-success"
                                >
                                  <FaShoppingBag
                                    size={30}
                                    className="text-success "
                                  ></FaShoppingBag>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
