import React from "react";
import Cauliflower from "../assets/Cauliflower.jpg";
import ItemCard from "./ItemCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Vegetables = () => {
  const Vegetables = [
    {
      id: 1,
      name: "Cauliflower",
      price: 40,
      image: Cauliflower,
      discription:
        "Fresh and healthy cauliflower, perfect for cooking and salads.",
    },
    {
      id: 2,
      name: "Broccoli",
      price: 60,
      image: "/Broccoli.jpg",
      discription:
        "Crisp and nutritious broccoli, great for steaming and stir-fries.",
    },
    {
      id: 3,
      name: "Carrots",
      price: 30,
      image: "Carrots.webp",
      discription: "Sweet and crunchy carrots, packed with vitamins and fiber.",
    },
    {
      id: 4,
      name: "Spinach",
      price: 50,
      image: "Spinach.jpg",
      discription: "Fresh and leafy spinach, ideal for salads and smoothies.",
    },
    {
      id: 5,
      name: "Tomatoes",
      price: 70,
      image: "Tomatoes.jpg",
      discription: "Juicy and ripe tomatoes, perfect for sauces and salads.",
    },
    {
      id: 6,
      name: "Cucumbers",
      price: 25,
      image: "Cucumbers.jpg",
      discription:
        "Cool and refreshing cucumbers, great for snacking and salads.",
    },
    {
      id: 7,
      name: "Bell Peppers",
      price: 80,
      image: "Bell-Peppers.jpg",
      discription:
        "Colorful and crunchy bell peppers, perfect for stir-fries and salads.",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 4,
      slidesToSlide: 1, 
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="container-fluid  fruite">
      <div className="container py-5">
        <h1 className="mb-4">Fresh Organic Vegetables</h1>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true} 
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="px-2"
        >
          {Vegetables.map((veg) => (
            <ItemCard key={veg.id} item={veg} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Vegetables;
