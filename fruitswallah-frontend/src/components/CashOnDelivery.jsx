import React, { useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { PostOrders } from "../services/OrdersController";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { BsFillLightningChargeFill } from "react-icons/bs";

const CashOnDelivery = ({ setShowPopup, Amount }) => {
  const { setCartItems } = useCart();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirm = () => {
    PostOrders("COD", setShowPopup, navigate, setCartItems, Amount);
    setShowConfirmModal(false);
  };

  return (
    <div id="net-banking" className="tab-pane fade show active pt-3">
      <div className="form-group">
        <button
          type="button"
          className="btn btn-primary mt-2 ms-3"
          onClick={() => setShowConfirmModal(true)}
        >
          <FaMobileAlt /> Proceed Payment
        </button>
      </div>

      {showConfirmModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-success shadow">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Confirm Cash on Delivery</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="fw-semibold">
                  Are you sure you want to place this order with{" "}
                  <span className="text-success">Cash on Delivery</span>?
                </p>
                <div
                  className="alert alert-success d-flex align-items-start mt-3"
                  role="alert"
                >
                  
                  <div>
                  <BsFillLightningChargeFill className="me-2"/>
                    <strong>Faster Checkout Tip:</strong>
                    <br />
                    You can also pay online to the delivery agent via{" "}
                    <strong>UPI</strong> or <strong>QR Code </strong>
                     at the time of delivery!
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleConfirm}
                >
                  Yes, Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashOnDelivery;
