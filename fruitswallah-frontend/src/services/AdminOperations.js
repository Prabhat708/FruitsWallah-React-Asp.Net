import axios from "axios";
import { GetProducts } from "./ProductController";
import useAuthStore from "../Stores/AuthStore";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const AddProducts = async (NewProduct,setProducts) => {
    const formData = new FormData();
    formData.append("ProductCatagory", NewProduct.ProductCatagory);
    formData.append("ProductName", NewProduct.ProductName);
    formData.append("ProductDescription", NewProduct.ProductDescription);
    formData.append("ProductPrice", NewProduct.ProductPrice);
    formData.append("ProductImg", NewProduct.ProductImg);
    formData.append("ProductStock", NewProduct.ProductStock);

  const { token } = useAuthStore.getState();
  axios.post(`${BASE_URL}/api/Products`, formData, {
      headers: {
      "Content-Type": "multipart/form-data",
        Authorization:`Bearer ${token}`
      },
    });
    
    GetProducts(setProducts)
}


export const DeleteProduct = async (productId, setProducts) => {
  const { token } = useAuthStore.getState();
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
  formData.append("ProductStock", UpdatedProduct.ProductStock);

  // Only append ProductImg if a new image is selected
  if (UpdatedProduct.ProductImg) {
    formData.append("ProductImg", UpdatedProduct.ProductImg);
  }

  const { token } = useAuthStore.getState();
  await axios.put(`${BASE_URL}/api/Products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  GetProducts(setProducts);
};
