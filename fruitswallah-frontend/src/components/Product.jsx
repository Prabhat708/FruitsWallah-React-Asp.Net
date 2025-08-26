import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <div
        className="card border-0"
        style={{
          width: "80%",
          margin: "10%",
          marginTop: "7%",
        }}
      >
        <div className="row g-0">
          <div className="col-md-6 d-flex justify-content-center">
            <span
              className="card-title bg-warning text-white rounded p-1 d-block fw-medium"
              style={{ width: "11%", height: "fit-content" }}
            >
              <center> Fruit</center>
            </span>
            <img
              src="/apple.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h4 className="card-title">Apple -Red Delicious, Economy,1 KG.</h4>
              <h6 className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolores doloribus soluta id, nisi vel nulla vero quos facere
                quibusdam obcaecati maxime autem. Nobis vitae adipisci unde
                culpa sunt veniam, possimus id quidem, optio, iste modi quo
                deserunt et laboriosam facilis obcaecati voluptas consectetur.
                Quia a exercitationem dolore libero ea unde cumque ullam quae
                ducimus architecto voluptates, molestias officia, recusandae
                          </h6>
                          
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
