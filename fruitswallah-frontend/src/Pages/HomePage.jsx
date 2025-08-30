
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
import { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Messeage from "../components/Messeage";

const HomePage = () => {
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
  return (
    <>
      <Navbar />
      {message && <Messeage message={message} username={username} comingFrom={comingFrom} />}
      <Hero />
      <Featurs />
      <Fruits_shop />
      <Other_Features />
      <Vegetables />
      <Banner />
      <BestSellerProduct />
      <Testimonial />
      <Footer />
    </>
  );
}

export default HomePage
