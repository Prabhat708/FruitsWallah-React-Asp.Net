import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import banana from "../assets/best-product-3.jpg";
import orange from "../assets/best-product-1.jpg";
import grapes from "../assets/best-product-5.jpg";
import mango from "../assets/mango.webp";
import pineapple from "../assets/pineApple.jpg";
import strawberries from "../assets/feature-2.jpg";
import Cauliflower from "../assets/Cauliflower.jpg";

import { useParams } from "react-router-dom";

const Product = () => {
 
  const { id } = useParams();
  const [showPopup, setShowPopup] =useState(false);

  const Items = [
    {
      id: 1,
      catagory: "Fruit",
      name: "Apple",
      price: 120,
      image: "/apple.jpg",
      discription: "Fresh and juicy apples, perfect for snacking and baking.",
    },
    {
      id: 2,
      catagory: "Fruit",
      name: "Banana",
      price: 60,
      image: banana,
      discription:
        "Sweet and creamy bananas, great for smoothies and desserts.",
    },
    {
      id: 3,
      catagory: "Fruit",
      name: "Orange",
      price: 80,
      image: orange,
      discription: "Citrusy and refreshing oranges, packed with vitamin C.",
    },
    {
      id: 4,
      catagory: "Fruit",
      name: "Grapes",
      price: 150,
      image: grapes,
      discription: "Plump and flavorful grapes, ideal for snacking and salads.",
    },
    {
      id: 5,
      catagory: "Fruit",
      name: "Mango",
      price: 200,
      image: mango,
      discription: "Ripe and fragrant mangoes, perfect for tropical treats.",
    },
    {
      id: 6,
      catagory: "Fruit",
      name: "Pineapple",
      price: 90,
      image: pineapple,
      discription:
        "Tangy and sweet pineapples, great for grilling and cocktails.",
    },
    {
      id: 7,
      catagory: "Fruit",
      name: "Strawberries",
      price: 250,
      image: strawberries,
      discription:
        "Juicy and vibrant strawberries, ideal for desserts and smoothies. Lorem ipsum dolor sit amet.",
    },
    {
      id: 8,
      catagory: "Vegetable",
      name: "Cauliflower",
      price: 40,
      image: Cauliflower,
      discription:
        "Fresh and healthy cauliflower, perfect for cooking and salads.",
    },
    {
      id: 9,
      catagory: "Vegetable",
      name: "Broccoli",
      price: 60,
      image: "/Broccoli.jpg",
      discription:
        "Crisp and nutritious broccoli, great for steaming and stir-fries.",
    },
    {
      id: 10,
      catagory: "Vegetable",
      name: "Carrots",
      price: 30,
      image: "/Carrots.webp",
      discription: "Sweet and crunchy carrots, packed with vitamins and fiber.",
    },
    {
      id: 11,
      catagory: "Vegetable",
      name: "Spinach",
      price: 50,
      image: "Spinach.jpg",
      discription: "Fresh and leafy spinach, ideal for salads and smoothies.",
    },
    {
      id: 12,
      catagory: "Vegetable",
      name: "Tomatoes",
      price: 70,
      image: "Tomatoes.jpg",
      discription: "Juicy and ripe tomatoes, perfect for sauces and salads.",
    },
  ];
 const [cart, setCart] = useState(() => {
   return JSON.parse(localStorage.getItem("cart")) || [];
 }); 
 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const item = Items.find((itm) => itm.id === parseInt(id));
  const handleAddToCart = () => {
   
     
     const existingItemIndex = cart.findIndex(
       (cartItem) => cartItem.id === item.id
     );

     if (existingItemIndex !== -1) {
       cart[existingItemIndex].quantity += 1;
     } else {
       cart.push({ ...item, quantity: 1 });
     }

     localStorage.setItem("cart", JSON.stringify(cart));
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
   };
  const minusPlus = (id, action) => {
  setCart((prevCart) => {
    const updatedCart = [...prevCart];
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === id
    );
    if (existingItemIndex !== -1) {
      if (action === "increment") {
        updatedCart[existingItemIndex].quantity += 1;
      } else if (
        action === "decrement" &&
        updatedCart[existingItemIndex].quantity > 1
      ) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else if (
        action === "decrement" &&
        updatedCart[existingItemIndex].quantity === 1
      ) {
        updatedCart.splice(existingItemIndex, 1);
      }
    }
    return updatedCart;
  });
};
  return (
    <>
      <Navbar />

      <div
        className="card border-0 mt-5 pt-5"
        style={{
          width: "80%",
          margin: "10%",
          marginTop: "7%",
        }}
      >
        {showPopup && (
          <div className="alert alert-success">✅ Item added successfully!</div>
        )}
        <div className="row g-0">
          <div className="col-md-6 d-flex justify-content-center">
            <span
              className="card-title bg-warning text-white rounded p-1 d-block fw-medium "
              style={{ width: "50%", height: "fit-content" }}
            >
              <center> {item.catagory}</center>
              <center>
                <img
                  src={item.image}
                  className="img-fluid rounded-start"
                  width={400}
                  height={400}
                  alt="..."
                />
              </center>
            </span>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <h6 className="card-text">{item.discription}</h6>
              <h5 className="card-text text-danger mt-3">
                &#8377; {item.price}/Kg
              </h5>
               {(cart || []).some((cartItem) => cartItem.id === item.id) ? (
              <div className="d-flex align-items-center">
                <button
                  className=" rounded text-success border-0 fw-bold"
                  onClick={() => {
                    minusPlus(item.id, "decrement");
                  }}
                >
                  -
                </button>
                <span className="mx-2 fw-bold text-success">
                  {
                    (cart || []).find((cartItem) => cartItem.id === item.id)
                      .quantity
                  }
                </span>
                <button
                  className=" rounded text-success border-0 fw-bold"
                  onClick={() => {
                    minusPlus(item.id, "increment");
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="btn btn-success text-white rounded-pill mt-3"
              >
                {" "}
                Add to Cart
              </button>
              )}
              
              <h5 className="card-text mt-4">Health Benefits:</h5>
              <ul>
                <li>Rich in fiber and antioxidants</li>
                <li>Supports heart health and digestion</li>
                <li>Boosts immune system with vitamin C</li>
                <li>Promotes healthy skin and weight management</li>
                <li>Versatile for snacking and cooking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
