import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { PostOrders } from "../services/OrdersController";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CashOnDelivery = ({ setShowPopup }) => {
  const { setCartItems } = useCart();
  const navigate = useNavigate();
  return (
    <div id="net-banking" className="tab-pane fade show active pt-3">
      <div className="form-group ">
        <label htmlFor="Select Your Bank">
          <h6 className="text-danger"></h6>
        </label>
      </div>
      <div className="form-group">
        <p>
          {" "}
          <button
            type="button"
            className="btn btn-primary mt-2 ms-3"
            onClick={() => {
              PostOrders("COD", setShowPopup, navigate, setCartItems);
            }}
          >
            <FaMobileAlt /> Proceed Payment
          </button>{" "}
        </p>
      </div>
    </div>
  );
};

export default CashOnDelivery;
