import React from "react";
import { FaShoppingBag } from "react-icons/fa";

const ItemCard = ({ item }) => {

  return (
    <>
      <div className="rounded position-relative fruite-item ">
        <div className="fruite-img">
          <img
            id={item.id}
            src={item.image}
            className="product img-fluid w-100 rounded-top"
            alt=""
          />
        </div>

        <div className="p-4  position-relative border border-warning border-top-0 rounded-bottom min-h-80 max-h-80">
                  <h4 id={`Namepr+${item.id}`} > {item.name }</h4>
          <p className="text-secondary mb-2" style={{ minHeight: "60px" }}>
                      {
                        item.discription.slice(0, 60) + (item.discription.length > 60 ? "..." : "")
                      }
          </p>
          <div className="d-flex justify-content-between flex-lg-wrap">
            <p id="pricepr{{i.id}}" className="text-dark fs-5 fw-bold mb-0">
              &#8377; {item.price}/ kg
            </p>
            <form method="POST" action="{% url 'addToCart' %}">
              <input type="hidden" name="product_id" value={item.id}/>
              <input type="hidden" name="quantity" value="1" />
              <button
                type="submit"
                className="btn cart border border-secondary rounded-pill px-3 text-success"
              >
                <FaShoppingBag
                  size={30}
                  className="text-success "
                ></FaShoppingBag>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
