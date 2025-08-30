import React from 'react'
import Navbar from '../components/Navbar'
import banana from '../assets/best-product-3.jpg'


const AdminPage = () => {
    const Products = [
        { id: 1, name: "Apple", category: "Fruit", price: 100, quantity: 50,Image:"https://www.collinsdictionary.com/images/full/apple_158989157.jpg" },
        { id: 2, name: "Banana", category: "Fruit", price: 50, quantity: 100,Image: banana },
        { id: 3, name: "Carrot", category: "Vegetable", price: 30, quantity: 200,Image:'Carrots.webp' },
        { id: 4, name: "Broccoli", category: "Vegetable", price: 80, quantity: 75,Image:'Broccoli.jpg' },
    ];
    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const newProduct = {
            category: form.productCategory.value,
            name: form.productName.value,
            description: form.productDescription.value,
            price: form.productPrice.value,
            image: form.productImage.value,
            quantity: form.productQuantity.value,
        };
        console.log("New Product:", newProduct);
        form.reset();
        Products.push(newProduct);
        alert("Product Added Successfully");
    };
    const handleEditProduct = (productId) => {
        // Logic to edit product
        alert(`Edit Product with ID: ${productId}`);
    };
    const handleDeleteProduct = (productId) => {
        // Logic to delete product
        alert(`Delete Product with ID: ${productId}`);
    }

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
                              <th scope="col">Name</th>
                              <th scope="col">Category</th>
                              <th scope="col">Price</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Image</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {Products.map((product) => (
                                <tr key={product.id}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>

                                    <td><img src={product.Image} alt={product.name} width="50" height="50"/></td>
                                  <td>
                                      <button className="btn btn-sm btn-primary me-2">Edit</button>
                                      <button className="btn btn-sm btn-danger">Delete</button>
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
                Product Quantity
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
        </div>
      </div>
    </>
  );
}

export default AdminPage
