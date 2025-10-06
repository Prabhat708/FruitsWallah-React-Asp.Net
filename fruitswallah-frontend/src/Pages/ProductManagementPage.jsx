import React, { useEffect, useState } from "react";
import SidePannel from "../components/SidePannel";
import Navbar from "../components/Navbar";
import { adminSidebarItems } from "../data/Sidebar";
import { BsCheck } from "react-icons/bs";
import StatsCard from "../components/StatsCard";
import {
  FaBitcoin,
  FaClock,
  FaEdit,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { GetProducts } from "../services/ProductController";
import { MdDelete } from "react-icons/md";
import { AddProducts, UpdateProduct } from "../services/AdminOperations";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ProductManagementPage = () => {
  const [activeItem, setActiveItem] = useState("Manage Products");
  const [showAddEditProduct, setShowAddEditProduct] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [formData, setFormData] = useState({
    productCategory: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productStock: "",
    productImage: null,
    existingImage: "", // Track existing image during edit
  });

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    products: 120,
    activeProducts: 15,
    outofStock: 1,
    deleted: 5,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "productImage") {
      setFormData({ ...formData, productImage: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productPayload = {
      ProductCatagory: formData.productCategory,
      ProductName: formData.productName,
      ProductDescription: formData.productDescription,
      ProductPrice: formData.productPrice,
      ProductStock: formData.productStock,
    };

    if (formData.productImage) {
      productPayload.ProductImg = formData.productImage;
    }

    if (isEditMode && currentProduct) {
      await UpdateProduct(
        productPayload,
        currentProduct.productId,
        setProducts
      );
    } else {
      await AddProducts(productPayload, setProducts);
    }

    // Reset form
    setFormData({
      productCategory: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productStock: "",
      productImage: null,
      existingImage: "",
    });
    setIsEditMode(false);
    setCurrentProduct(null);
  };
  const handleEditClick = (product) => {
    setIsEditMode(true);
    setCurrentProduct(product);
    setFormData({
      productCategory: product.productCatagory,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productStock: product.productStock,
      productImage: null,
      existingImage: product.productImg,
    });
  };

  const handleCancelEdit = () => {
    setShowAddEditProduct(false);
    setIsEditMode(false);
    setCurrentProduct(null);
    setFormData({
      productCategory: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productStock: "",
      productImage: null,
      existingImage: "",
    });
  };

  useEffect(() => {
    GetProducts(setProducts);
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="d-flex min-vh-100 mt-5 pt-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <SidePannel
          sidebarItems={adminSidebarItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <div className="flex-grow-1 p-4">
          <div className="container-fluid" style={{ maxWidth: "1024px" }}>
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h1 className="h2 fw-bold text-dark mb-0">
                    Product Management
                  </h1>
                  <p className="text-muted mb-0">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <button
                  className="btn btn-outline-primary d-flex align-items-center ms-3"
                  style={{ height: "40px" }}
                  onClick={() => {
                    setShowAddEditProduct(true);
                  }}
                >
                  <BsCheck className="me-2" />
                  Add Product
                </button>
              </div>
              {showAddEditProduct && (
                <div className="container mb-2" style={{ width: "80%" }}>
                  <h3 className="text-center alert alert-info container ms-5">
                    {isEditMode ? "Edit Product" : "Add New Product"}
                  </h3>
                  <form className="w-75 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="productCategory" className="form-label">
                        Product Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productCategory"
                        value={formData.productCategory}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="productName" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="productDescription"
                        className="form-label"
                      >
                        Product Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="productPrice" className="form-label">
                        Product Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="productPrice"
                        value={formData.productPrice}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="productImage" className="form-label">
                        Select Product Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="productImage"
                        onChange={handleChange}
                      />
                      {formData.productImage && (
                        <img
                          src={URL.createObjectURL(formData.productImage)}
                          alt="New Preview"
                          width={80}
                          height={80}
                          className="mt-2"
                        />
                      )}
                      {!formData.productImage && formData.existingImage && (
                        <img
                          src={BASE_URL + formData.existingImage}
                          alt="Existing"
                          width={80}
                          height={80}
                          className="mt-2"
                        />
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="productStock" className="form-label">
                        Product Stock
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="productStock"
                        value={formData.productStock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">
                      {isEditMode ? "Save Product" : "Add Product"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}

              <div className="row g-3 align-items-center">
                <StatsCard
                  title="Total Products"
                  value={stats.products}
                  color="primary"
                  icon={<FaShoppingCart />}
                />
                <StatsCard
                  title="Active Products"
                  value={stats.activeProducts}
                  color="secondary"
                  icon={<FaClock />}
                />
                <StatsCard
                  title="Out Of Stock"
                  value={stats.outofStock}
                  color="secondary"
                  icon={<FaSignOutAlt />}
                />
                <StatsCard
                  title="Deleted Products"
                  value={stats.deleted}
                  color="danger"
                  icon={<FaBitcoin />}
                />
              </div>
              <div className="mt-4">
                <h3 className="h5 fw-bold text-dark mb-3">All Products</h3>
                {products.length === 0 ? (
                  <p className="text-muted">No products found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>S.NO.</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={product.productId}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={`${BASE_URL + product.productImg}`}
                                alt=""
                                width={50}
                              />
                            </td>
                            <td>{product.productName}</td>
                            <td>{product.productCatagory}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productStock}</td>
                            <td>
                              <span
                                className={`badge ${
                                  product.isActive && product.productStock != 0
                                    ? "bg-success"
                                    : product.productStock == 0
                                    ? "bg-warning text-dark"
                                    : "bg-danger"
                                }`}
                              >
                                {product.isActive && product.productStock != 0
                                  ? "Active"
                                  : product.productStock == 0
                                  ? "Out Of Stock"
                                  : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <button
                                className="text-primary border-0 bg-transparent "
                                onClick={() => {
                                  handleEditClick(product);
                                  setShowAddEditProduct(true);
                                }}
                              >
                                <FaEdit size={25} />
                              </button>
                              <button
                                className="text-danger border-0 bg-transparent"
                                onClick={() =>
                                  DeleteProduct(product.productId, setProducts)
                                }
                              >
                                <MdDelete size={25} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManagementPage;
