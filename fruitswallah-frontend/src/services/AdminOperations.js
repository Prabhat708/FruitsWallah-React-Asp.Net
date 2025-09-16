import axios from "axios";
import { GetProducts } from "./ProductController";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const AddProducts = async (NewProduct,setProducts) => {
    const formData = new FormData();
    formData.append("ProductCatagory", NewProduct.ProductCatagory);
    formData.append("ProductName", NewProduct.ProductName);
    formData.append("ProductDescription", NewProduct.ProductDescription);
    formData.append("ProductPrice", NewProduct.ProductPrice);
    formData.append("ProductImg", NewProduct.ProductImg); // Make sure this is the actual File object, not just a string!
    formData.append("ProductStock", NewProduct.ProductStock);

  axios.post(`${BASE_URL}/api/Products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    GetProducts(setProducts)
}


export const DeleteProduct = async (productId, setProducts) => {
    const res = await axios.delete(`${BASE_URL}/api/Products/${productId}`);
    GetProducts(setProducts)
}

