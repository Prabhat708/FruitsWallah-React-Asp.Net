import React from "react";
import {
  BsCheck,
  BsClipboard2Check,
  BsFillBoxSeamFill,
  BsFillHouseAddFill,
  BsFillTruckFrontFill,
} from "react-icons/bs";
import { RiEBike2Fill } from "react-icons/ri";
import { generateCustomInvoicePDF } from "../services/InvoiceDownload";
import { ImCross } from "react-icons/im";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const OrderPopup = ({ order, setShowOrderDetails }) => {
 
  const isCancelled = order.orderStatus.includes("Cancelled");
  const currentStep =
    order?.orderStatus?.length == 5
      ? order.orderStatus.length
      : order.orderStatus.length + 0.3;
  const steps = [
    {
      id: 1,
      title: "Order",
      subtitle: "Placed",
      icon: <BsClipboard2Check size={20} />,
    },
    {
      id: 2,
      title: "Order",
      subtitle: "Dispatched",
      icon: <BsFillBoxSeamFill size={20} />,
    },
    {
      id: 3,
      title: "Order",

      subtitle: "En Route",
      icon: <BsFillTruckFrontFill size={20} />,
    },

    {
      id: 4,
      title: "Order",
      subtitle: "Out For delivery",

      icon: <RiEBike2Fill />,
    },
    {
      id: 5,
      title: "Order",
      subtitle: "Delivered",
      icon: <BsFillHouseAddFill size={20} />,
    },
  ];
  const getStepClass = (stepId) => {
    if (stepId <= currentStep) {
      return "bg-success text-white";
    }
    return "bg-light text-muted border";
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-success shadow">
            <div className="modal-header bg-success text-white">
              <h5 className="mb-0 fw-bold">
                ORDER{" "}
                <span className={isCancelled ? "text-danger" : "text-warning"}>
                  #{order.orderId}
                </span>
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowOrderDetails(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="position-relative mb-4">
                <div className="d-flex justify-content-between align-items-center position-relative">
                  <div
                    className="position-absolute bg-light"
                    style={{
                      height: "4px",
                      left: "24px",
                      right: "24px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                    }}
                  ></div>

                  <div
                    className={`position-absolute ${
                      isCancelled ? "bg-danger" : "bg-success"
                    } progress-line`}
                    style={{
                      height: "4px",
                      left: "24px",
                      width: isCancelled
                        ? "calc(97% - 0px)"
                        : `calc(${
                            ((currentStep - 1) / (steps.length - 1)) * 97
                          }% - ${
                            24 - (24 * (currentStep - 1)) / (steps.length - 1)
                          }px)`,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                      transition: "width 0.3s ease",
                    }}
                  ></div>

                  {/* Step Circles */}
                  {!isCancelled &&
                    steps.map((step) => (
                      <div key={step.id} className="position-relative z-2">
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center ${getStepClass(
                            step.id
                          )}`}
                          style={{ width: "48px", height: "48px" }}
                        >
                          {step.id <= currentStep ? (
                            <BsCheck size={40} />
                          ) : (
                            step.icon
                          )}
                        </div>
                      </div>
                    ))}
                  {/* If cancelled, show a single cancel icon in the center */}
                  {isCancelled && (
                    <div className="w-100 d-flex justify-content-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center bg-white text-white"
                        style={{ width: "56px", height: "56px" }}
                        title="Order Cancelled"
                      >
                        <span className="text-danger">
                          <ImCross size={40} />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {isCancelled && (
                <div className="text-center my-4">
                  <span className="badge bg-danger fs-5 px-4 py-2">
                    Order Cancelled
                  </span>
                </div>
              )}
              {/* Product & Shipping Details */}
              <div className="mt-3">
                <h4>Product Details</h4>
                <div className="row">
                  <div className="col-4">
                    <img
                      src={BASE_URL + order.productImg}
                      alt={order.productName}
                      className="img-fluid"
                      width={200}
                    />
                  </div>
                  <div className="col-4 pt-2">
                    <h5>{order.productName}</h5>
                    <h6>Price: ₹ {order.productPrice}</h6>
                    <h6>Quantity: {order.productQty}</h6>
                    <h6>
                      Payment Method:{" "}
                      {order.transactionType == "COD" ? "COD" : "PREPAID"}
                    </h6>
                    <h6>Payment Status: {order.transactionStatus}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        generateCustomInvoicePDF(order.transactionOrderID);
                      }}
                    >
                      Get Invoice
                    </button>
                  </div>
                  <div className="col-4">
                    <h5>{order.userName}</h5>
                    <h6>
                      Address: {order.houseNo}, {order.locality},{" "}
                      {order.address}, {order.city}, {order.state} <br />
                      Landmark: {order.landMark}
                    </h6>
                    <h6>Pincode: {order.postalCode}</h6>
                    <h6>Mobile: {order.phoneNumber}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setShowOrderDetails(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPopup;
