
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

const HomePage = () => {
  return (
    <>
      <Navbar />
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
