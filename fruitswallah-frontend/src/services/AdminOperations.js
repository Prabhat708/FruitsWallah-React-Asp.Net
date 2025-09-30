import axios from "axios";
import { GetProducts } from "./ProductController";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const token = localStorage.getItem("Token");
export const AddProducts = async (NewProduct,setProducts) => {
    const formData = new FormData();
    formData.append("ProductCatagory", NewProduct.ProductCatagory);
    formData.append("ProductName", NewProduct.ProductName);
    formData.append("ProductDescription", NewProduct.ProductDescription);
    formData.append("ProductPrice", NewProduct.ProductPrice);
    formData.append("ProductImg", NewProduct.ProductImg);
    formData.append("ProductStock", NewProduct.ProductStock);

  axios.post(`${BASE_URL}/api/Products`, formData, {
      headers: {
      "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${token}`
      },
    });
    
    GetProducts(setProducts)
}


export const DeleteProduct = async (productId, setProducts) => {
  const res = await axios.delete(`${BASE_URL}/api/Products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    GetProducts(setProducts)
}

export const UpdateProduct = async (UpdatedProduct, productId, setProducts) => {
  const formData = new FormData();
  formData.append("ProductCatagory", UpdatedProduct.ProductCatagory);
  formData.append("ProductName", UpdatedProduct.ProductName);
  formData.append("ProductDescription", UpdatedProduct.ProductDescription);
  formData.append("ProductPrice", UpdatedProduct.ProductPrice);
  formData.append("ProductImg", UpdatedProduct.ProductImg);
  formData.append("ProductStock", UpdatedProduct.ProductStock);
  const res = await axios.put(`${BASE_URL}/api/Products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
    GetProducts(setProducts)
}