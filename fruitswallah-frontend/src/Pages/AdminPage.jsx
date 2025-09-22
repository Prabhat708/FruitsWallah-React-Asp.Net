import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import banana from "../assets/best-product-3.jpg";
import { GetProducts } from "../services/ProductController";
import { AddProducts, DeleteProduct } from "../services/AdminOperations";
import UpdateStatus from "../components/UpdateStatus";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [products, setProducts] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    GetProducts(setProducts);
  }, []);
  useEffect(() => {
      const token= localStorage.getItem("Token");
      if (token==null) {
        navigate("/login");
      }
    }, []);
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      ProductCatagory: form.productCategory.value,
      ProductName: form.productName.value,
      ProductDescription: form.productDescription.value,
      ProductPrice: form.productPrice.value,
      ProductImg: form.productImage.files[0],
      ProductStock: form.productQuantity.value,
    };
      await AddProducts(newProduct,setProducts)
    form.reset();
    
    alert("Product Added Successfully");
  };

  return (
    <>
      <Navbar />
      <div className="row mt-5 pt-5 ">
        <h1 className="text-center text-success">Welcome to Admin Page</h1>
        <div className="col-6" style={{ width: "40%" }}>
          <h3 className="text-center alert alert-info container ms-5">
            Your All Products
          </h3>
          <table className="table table-bordered ms-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.filter((product) => product.isActive).map((product,index) => (
                <tr key={product.productId}>
                  <th scope="row">{index+1}</th>
                  <td>
                    <img
                      src={
                        BASE_URL +
                        product.productImg
                      }
                      alt={product.productName}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.productCatagory}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productStock}</td>

                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => {
                      DeleteProduct(product.productId,setProducts)
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
        <div className="col-6 container" style={{ width: "40%" }}>
          <h3 className="text-center alert alert-info container ms-5">
            Add New Product
          </h3>
          <form className="w-75 mx-auto" onSubmit={handleAddProduct}>
            <div className="mb-3">
              <label htmlFor="productCategory" className="form-label">
                Product Category
              </label>
              <input
                type="text"
                className="form-control"
                id="productCategory"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <input type="text" className="form-control" id="productName" />
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                Product Description
              </label>
              <input
                type="text"
                className="form-control"
                id="productDescription"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Product Price
              </label>
              <input type="number" className="form-control" id="productPrice" />
            </div>
            <div className="mb-3">
              <label htmlFor="productImage" className="form-label">
                Select Product Image
              </label>
              <input type="File" className="form-control" id="productImage" />
            </div>
            <div className="mb-3">
              <label htmlFor="productQuantity" className="form-label">
                Product Stock
              </label>
              <input
                type="number"
                className="form-control"
                id="productQuantity"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        <UpdateStatus/>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default AdminPage;
