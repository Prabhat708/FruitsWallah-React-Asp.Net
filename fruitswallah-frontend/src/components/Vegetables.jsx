import React from "react";
import Cauliflower from "../assets/Cauliflower.jpg";
import {
  FaShoppingBag,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";
import ItemCard from "./ItemCard";

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
       discription:
         "Sweet and crunchy carrots, packed with vitamins and fiber.",
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
  return (
    <div className="container-fluid vesitable">
      <div className="container py-5">
        <h1 className="mb-4">Fresh Organic Vegetables</h1>
        <div
          id="vegetableCarousel"
          className="carousel slide pt-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {Vegetables.map((vegetable) => (
                
            <div className="carousel-item active" key={vegetable.id}>
              <div className="row">
                  <div
                    className="rounded  col-lg-3 col-md-4 col-sm-6 "
                      >
                        <ItemCard item={vegetable} />
                  </div>
              </div>
            </div>
                ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#vegetableCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon position-absolute start-0"
              aria-hidden="true"
            ></span>

            <FaArrowCircleLeft
              size={25}
              className="text-warning position-absolute start-0 "
            >
              Previous
            </FaArrowCircleLeft>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#vegetableCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon position-absolute end-0"
              aria-hidden="true"
            ></span>
            <FaArrowCircleRight
              size={25}
              className="text-warning position-absolute end-0"
            >
              Next
            </FaArrowCircleRight>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vegetables;
