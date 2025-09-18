
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import Featurs from "../components/featurs";
import Fruits_shop from "../components/Fruits_shop";
import Other_Features from "../components/Other_Features";
import Vegetables from "../components/Vegetables";
import Banner from "../components/Banner";
import BestSellerProduct from "../components/BestSellerProduct";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Messeage from "../components/Messeage";
import { GetProducts } from "../services/ProductController";

const HomePage = () => {
  const [activeSearch, setActiveSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  useEffect(() => {
    GetProducts(setProducts);
    setActiveSearch(false);
  }, []);
  const location =useLocation();
  const [message, setMessage] = useState(location.state?.message || ""); 
  const username = location.state?.Username || "";
  const comingFrom = location.state?.comingFrom || "";
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        window.history.replaceState({}, document.title);
        setMessage("");
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [message]);

  const lastPost  = currentPage * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost= products.slice(firstPost,lastPost)

  return (
    <>
      <Navbar setProducts={setProducts} setActiveSearch={setActiveSearch} />
      {message && (
        <Messeage
          message={message}
          username={username}
          comingFrom={comingFrom}
        />
      )}
      {!activeSearch && (
        <Hero setProducts={setProducts} setActiveSearch={setActiveSearch} />
      )}
      {!activeSearch && <Featurs />}
      <Fruits_shop
        products={currentPost}
        postPerPage={postPerPage}
        allProducts={products.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Other_Features />
      <Vegetables products={products} />
      <Banner />
      <BestSellerProduct />
      <Testimonial />
      <Footer />
    </>
  );
}

export default HomePage
