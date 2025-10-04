import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { GetProducts } from "../services/ProductController";
import {
  AddProducts,
  DeleteProduct,
  UpdateProduct,
} from "../services/AdminOperations";
import UpdateStatus from "../components/UpdateStatus";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../Stores/AuthStore";
import SetAdmin from "../components/SetAdmin";

const AdminPage = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [products, setProducts] = useState([]);
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

  const navigate = useNavigate();

  const isAdmin = useAuthStore((state) => state.isAdmin);
  
  
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
    GetProducts(setProducts);
  }, []);

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

  return (
    <>
      <Navbar />
      <div className="row mt-5 pt-5">
        <h1 className="text-center text-success">Welcome to Admin Page</h1>
        <div className="col-6" style={{ width: "40%" }}>
          <h3 className="text-center alert alert-info container ms-5">
            Your All Products
          </h3>
          <table className="table table-bordered ms-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.isActive)
                .map((product, index) => (
                  <tr key={product.productId}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={BASE_URL + product.productImg}
                        alt={product.productName}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.productCatagory}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.productStock}</td>
                    <td className="position-relative">
                      <button
                        className="text-primary border-0 bg-transparent position-absolute start-0"
                        onClick={() => handleEditClick(product)}
                      >
                        <FaEdit size={25} />
                      </button>
                      <button
                        className="text-danger border-0 bg-transparent position-absolute end-0"
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

        {/* Form Section */}
        <div className="col-6 container" style={{ width: "40%" }}>
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
              <label htmlFor="productDescription" className="form-label">
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
            {isEditMode && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
          <UpdateStatus />
        </div>
      </div>
            <SetAdmin/>
      <Footer />
    </>
  );
};

export default AdminPage;
