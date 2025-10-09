import { useNavigate } from "react-router-dom";
import { CancelOrder } from "../services/OrdersController";
import { useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";

const OrderCard = ({ order, borderColor, getStatusIcon, setOrders }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigation = useNavigate();
  const handleConfirm = async () => {
    await CancelOrder(order.orderId, setOrders);
    setShowConfirmModal(false);
  };
  return (
    <>
      {showConfirmModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-danger shadow">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirmation for Delete Account</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="fw-semibold">
                  Are you sure? you want to
                  <span className="text-danger"> Cancel</span> this Order?
                </p>
                <div
                  className="alert alert-danger d-flex align-items-start mt-3"
                  role="alert"
                >
                  <div>
                    <BsFillLightningChargeFill className="me-2" />
                    <strong>Note: </strong>
                    <br />
                    Once cancelled, this action cannot be undone. Your order will be permanently removed and you will not be able to recover it but you can reorder.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirm}
                >
                  Yes, Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="card border-0 shadow-sm"
        style={{ borderLeft: `4px solid ${borderColor}` }}
      >
        <div className="card-body pt-4">
          <div className="d-flex align-items-start justify-content-between ">
            <div className="d-flex align-items-center gap-2">
              {getStatusIcon(order?.orderStatus)}
              <span className="fw-medium text-dark">
                {order.orderStatus.at(-1).toUpperCase()}
              </span>
            </div>
            {(order?.orderStatus.at(-1).toLowerCase() === "dispatched" ||
              order?.orderStatus.at(-1).toLowerCase() === "en route" ||
              order?.orderStatus.at(-1).toLowerCase() === "placed") && (
              <button
                className="btn btn-success btn-sm"
                onClick={() => navigation(`/order/${order.orderId}`)}
              >
                Track order
              </button>
            )}
          </div>

          {order?.orderDate && (
            <p className="text-muted small mb-3">
              Ordered On :{" "}
              {new Date(order?.orderDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          )}

          <div className="d-flex flex-column gap-3">
            <div
              key={order.orderId}
              className="d-flex align-items-center border-bottom border-secondry justify-content-between pb-1"
            >
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <img
                    src={BASE_URL + order.productImg}
                    alt={order.productName}
                    className="rounded border"
                    style={{
                      width: "64px",
                      height: "64px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <h6 className="fw-medium text-dark mb-0">
                    {order.productName}
                  </h6>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                {order?.orderStatus.at(-1).toLowerCase() === "placed" && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      setShowConfirmModal(true);
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigation(`/order/${order.orderId}`)}
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
