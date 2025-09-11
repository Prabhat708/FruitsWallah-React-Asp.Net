import axios from "axios";
import { GetProducts } from "./ProductController";

export const AddProducts = async (NewProduct,setProducts) => {
    console.log(NewProduct);
    const formData = new FormData();
    formData.append("ProductCatagory", NewProduct.ProductCatagory);
    formData.append("ProductName", NewProduct.ProductName);
    formData.append("ProductDescription", NewProduct.ProductDescription);
    formData.append("ProductPrice", NewProduct.ProductPrice);
    formData.append("ProductImg", NewProduct.ProductImg); // Make sure this is the actual File object, not just a string!
    formData.append("ProductStock", NewProduct.ProductStock);

    axios.post("https://localhost:7293/api/Products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    GetProducts(setProducts)
}


export const DeleteProduct = async (productId, setProducts) => {
    const res = await axios.delete(`https://localhost:7293/api/Products/${productId}`);
    GetProducts(setProducts)
}

